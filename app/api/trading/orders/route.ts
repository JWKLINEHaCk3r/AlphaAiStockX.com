import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

const orderSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  side: z.enum(['BUY', 'SELL']),
  type: z.enum(['MARKET', 'LIMIT', 'STOP', 'STOP_LIMIT']),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive').optional(),
  stopPrice: z.number().positive('Stop price must be positive').optional(),
  timeInForce: z.enum(['DAY', 'GTC', 'IOC', 'FOK']).default('DAY'),
  portfolioId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
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
        return NextResponse.json(
          { error: 'No portfolio found' },
          { status: 400 }
        );
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
      return NextResponse.json(
        { error: 'Portfolio not found or unauthorized' },
        { status: 403 }
      );
    }

    // Get current market price (mock for demo)
    const currentPrice = orderData.price || (150 + Math.random() * 50);
    const orderValue = orderData.quantity * currentPrice;

    // Check buying power for BUY orders
    if (orderData.side === 'BUY' && portfolio.cashBalance < orderValue) {
      return NextResponse.json(
        { error: 'Insufficient buying power' },
        { status: 400 }
      );
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
        return NextResponse.json(
          { error: 'Insufficient shares to sell' },
          { status: 400 }
        );
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

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to execute orders (demo implementation)
async function executeOrder(orderId: string, executionPrice: number) {
  return await prisma.$transaction(async (tx) => {
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
    const cashChange = order.side === 'BUY' 
      ? -(order.quantity * executionPrice)
      : (order.quantity * executionPrice);

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
      const newQuantity = order.side === 'BUY'
        ? existingPosition.quantity + order.quantity
        : existingPosition.quantity - order.quantity;

      if (newQuantity === 0) {
        await tx.position.delete({
          where: { id: existingPosition.id },
        });
      } else {
        const newAvgPrice = order.side === 'BUY'
          ? ((existingPosition.averagePrice * existingPosition.quantity) + (executionPrice * order.quantity)) / newQuantity
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
