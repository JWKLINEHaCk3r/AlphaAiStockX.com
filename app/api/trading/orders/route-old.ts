import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { TradingService } from '@/lib/trading/trading-service';
import { withApiSecurity } from '@/lib/api-security';
import { z } from 'zod';

const orderSchema = z
  .object({
    symbol: z
      .string()
      .min(1, 'Symbol is required')
      .max(10, 'Symbol too long')
      .regex(/^[A-Z]+$/, 'Invalid symbol format'),
    side: z.enum(['buy', 'sell']),
    type: z.enum(['market', 'limit', 'stop', 'stop_limit', 'trailing_stop']),
    quantity: z
      .number()
      .positive('Quantity must be positive')
      .max(10000, 'Quantity too large')
      .optional(),
    notional: z
      .number()
      .positive('Notional amount must be positive')
      .max(1000000, 'Notional amount too large')
      .optional(),
    limitPrice: z.number().positive('Limit price must be positive').optional(),
    stopPrice: z.number().positive('Stop price must be positive').optional(),
    trailPrice: z.number().positive('Trail price must be positive').optional(),
    trailPercent: z
      .number()
      .positive('Trail percent must be positive')
      .max(50, 'Trail percent too large')
      .optional(),
    timeInForce: z.enum(['day', 'gtc', 'ioc', 'fok']).default('day'),
    extendedHours: z.boolean().default(false),
    portfolioId: z.string().optional(),
    takeProfitPrice: z.number().positive().optional(),
    stopLossPrice: z.number().positive().optional(),
    stopLossLimitPrice: z.number().positive().optional(),
  })
  .refine(data => data.quantity || data.notional, {
    message: 'Either quantity or notional amount is required',
  })
  .refine(
    data => {
      if (data.type === 'limit' && !data.limitPrice) {
        return false;
      }
      return true;
    },
    {
      message: 'Limit price is required for limit orders',
    }
  )
  .refine(
    data => {
      if ((data.type === 'stop' || data.type === 'stop_limit') && !data.stopPrice) {
        return false;
      }
      return true;
    },
    {
      message: 'Stop price is required for stop orders',
    }
  );

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const orderData = orderSchema.parse(body);

    // Get user's default portfolio if not specified
    let portfolioId = orderData.portfolioId;
    if (!portfolioId) {
      const defaultPortfolio = await prisma.portfolio.findFirst({
        where: {
          userId: session.user.id,
          type: 'PERSONAL',
        },
      });

      if (!defaultPortfolio) {
        return NextResponse.json({ error: 'No portfolio found' }, { status: 400 });
      }

      portfolioId = defaultPortfolio.id;
    }

    // Verify portfolio belongs to user
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: portfolioId,
        userId: session.user.id,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found or unauthorized' }, { status: 403 });
    }

    // Get current market price (mock for demo)
    const currentPrice = orderData.price || 150 + Math.random() * 50;
    const orderValue = orderData.quantity * currentPrice;

    // Check buying power for BUY orders
    if (orderData.side === 'BUY' && portfolio.cashBalance < orderValue) {
      return NextResponse.json({ error: 'Insufficient buying power' }, { status: 400 });
    }

    // Check position for SELL orders
    if (orderData.side === 'SELL') {
      const position = await prisma.position.findFirst({
        where: {
          portfolioId,
          symbol: orderData.symbol,
        },
      });

      if (!position || position.quantity < orderData.quantity) {
        return NextResponse.json({ error: 'Insufficient shares to sell' }, { status: 400 });
      }
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        portfolioId,
        symbol: orderData.symbol,
        side: orderData.side,
        type: orderData.type,
        quantity: orderData.quantity,
        price: orderData.price,
        stopPrice: orderData.stopPrice,
        timeInForce: orderData.timeInForce,
        status: 'PENDING',
        submittedAt: new Date(),
      },
    });

    // For demo purposes, immediately fill market orders
    if (orderData.type === 'MARKET') {
      const filledOrder = await executeOrder(order.id, currentPrice);
      return NextResponse.json({
        success: true,
        message: 'Order executed successfully',
        order: filledOrder,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully',
      order,
    });
  } catch (error) {
    console.error('Order creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get('portfolioId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get user's portfolios
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: session.user.id },
      select: { id: true },
    });

    const portfolioIds = portfolios.map(p => p.id);

    const orders = await prisma.order.findMany({
      where: {
        portfolioId: portfolioId ? portfolioId : { in: portfolioIds },
        ...(status && { status: status as any }),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        portfolio: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to execute orders (demo implementation)
async function executeOrder(orderId: string, executionPrice: number) {
  return await prisma.$transaction(async tx => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { portfolio: true },
    });

    if (!order) throw new Error('Order not found');

    // Update order status
    const filledOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        status: 'FILLED',
        filledAt: new Date(),
        executionPrice,
        executedQuantity: order.quantity,
      },
    });

    // Update portfolio cash balance
    const cashChange =
      order.side === 'BUY' ? -(order.quantity * executionPrice) : order.quantity * executionPrice;

    await tx.portfolio.update({
      where: { id: order.portfolioId },
      data: {
        cashBalance: {
          increment: cashChange,
        },
      },
    });

    // Create or update position
    const existingPosition = await tx.position.findFirst({
      where: {
        portfolioId: order.portfolioId,
        symbol: order.symbol,
      },
    });

    if (existingPosition) {
      const newQuantity =
        order.side === 'BUY'
          ? existingPosition.quantity + order.quantity
          : existingPosition.quantity - order.quantity;

      if (newQuantity === 0) {
        await tx.position.delete({
          where: { id: existingPosition.id },
        });
      } else {
        const newAvgPrice =
          order.side === 'BUY'
            ? (existingPosition.averagePrice * existingPosition.quantity +
                executionPrice * order.quantity) /
              newQuantity
            : existingPosition.averagePrice;

        await tx.position.update({
          where: { id: existingPosition.id },
          data: {
            quantity: newQuantity,
            averagePrice: newAvgPrice,
            currentPrice: executionPrice,
            marketValue: newQuantity * executionPrice,
            lastUpdated: new Date(),
          },
        });
      }
    } else if (order.side === 'BUY') {
      await tx.position.create({
        data: {
          portfolioId: order.portfolioId,
          symbol: order.symbol,
          quantity: order.quantity,
          averagePrice: executionPrice,
          currentPrice: executionPrice,
          marketValue: order.quantity * executionPrice,
          side: 'LONG',
        },
      });
    }

    return filledOrder;
  });
}
