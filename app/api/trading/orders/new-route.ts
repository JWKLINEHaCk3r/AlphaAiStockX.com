import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { TradingService } from '@/lib/trading/trading-service';
import { SecurityAudit } from '@/lib/security';
import { z } from 'zod';

const orderSchema = z;
  .object({
    symbol: z;
      .string();
      .min(1, 'Symbol is required');
      .max(10, 'Symbol too long');
      .regex(/^[A-Z]+$/, 'Invalid symbol format'),;
    side: z.enum(['buy', 'sell']),;
    type: z.enum(['market', 'limit', 'stop', 'stop_limit', 'trailing_stop']),;
    quantity: z;
      .number();
      .positive('Quantity must be positive');
      .max(10000, 'Quantity too large');
      .optional(),;
    notional: z;
      .number();
      .positive('Notional amount must be positive');
      .max(1000000, 'Notional amount too large');
      .optional(),;
    limitPrice: z.number().positive('Limit price must be positive').optional(),;
    stopPrice: z.number().positive('Stop price must be positive').optional(),;
    trailPrice: z.number().positive('Trail price must be positive').optional(),;
    trailPercent: z;
      .number();
      .positive('Trail percent must be positive');
      .max(50, 'Trail percent too large');
      .optional(),;
    timeInForce: z.enum(['day', 'gtc', 'ioc', 'fok']).default('day'),;
    extendedHours: z.boolean().default(false),;
    portfolioId: z.string().optional(),;
    takeProfitPrice: z.number().positive().optional(),;
    stopLossPrice: z.number().positive().optional(),;
    stopLossLimitPrice: z.number().positive().optional(),;
  });
  .refine(data => data.quantity || data.notional, {
    message: 'Either quantity or notional amount is required',;
  });
  .refine(;
    data => {
      if (data.type === 'limit' && !data.limitPrice) {
        return false;
      }
      return true;
    },;
    {
      message: 'Limit price is required for limit orders',;
    }
  );
  .refine(;
    data => {
      if ((data.type === 'stop' || data.type === 'stop_limit') && !data.stopPrice) {
        return false;
      }
      return true;
    },;
    {
      message: 'Stop price is required for stop orders',;
    }
  );

const orderQuerySchema = z.object({
  portfolioId: z.string().optional(),;
  status: z.enum(['open', 'closed', 'all']).optional(),;
  limit: z;
    .string();
    .transform(val => parseInt(val) || 50);
    .optional(),;
  after: z.string().optional(),;
  until: z.string().optional(),;
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const orderData = orderSchema.parse(body);

    // Log order placement attempt;
    SecurityAudit.logSecurityEvent({
      type: 'trading_activity',;
      userId: session.user.id,;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'order_placement_attempt',;
        symbol: orderData.symbol,;
        side: orderData.side,;
        type: orderData.type,;
        quantity: orderData.quantity,;
        notional: orderData.notional,;
      },;
    });

    // Create trading service instance;
    const tradingService = await TradingService.create(session.user.id, orderData.portfolioId);

    // Place the order through the trading service;
    const orderSummary = await tradingService.placeOrder({
      symbol: orderData.symbol.toUpperCase(),;
      quantity: orderData.quantity,;
      notional: orderData.notional,;
      side: orderData.side,;
      type: orderData.type,;
      timeInForce: orderData.timeInForce,;
      limitPrice: orderData.limitPrice,;
      stopPrice: orderData.stopPrice,;
      trailPrice: orderData.trailPrice,;
      trailPercent: orderData.trailPercent,;
      extendedHours: orderData.extendedHours,;
      takeProfitPrice: orderData.takeProfitPrice,;
      stopLossPrice: orderData.stopLossPrice,;
      stopLossLimitPrice: orderData.stopLossLimitPrice,;
    });

    return NextResponse.json(;
      {
        success: true,;
        order: orderSummary,;
        message: 'Order placed successfully',;
      },;
      { status: 201 }
    );
  } catch (error) {
    console.error('Order placement error:', error);

    // Log the error;
    SecurityAudit.logSecurityEvent({
      type: 'trading_error',;
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'order_placement_failed',;
        error: error instanceof Error ? error.message : 'Unknown error',;
      },;
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        {
          error: 'Invalid order data',;
          details: error.errors,;
        },;
        { status: 400 }
      );
    }

    // Handle specific trading errors;
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      if (errorMessage.includes('insufficient')) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      if (errorMessage.includes('kyc') || errorMessage.includes('not active')) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }

      if (errorMessage.includes('alpaca api') || errorMessage.includes('trading service')) {
        return NextResponse.json(;
          { error: 'Trading service temporarily unavailable' },;
          { status: 503 }
        );
      }

      if (errorMessage.includes('no default portfolio')) {
        return NextResponse.json(;
          { error: 'No trading portfolio found. Please create a portfolio first.' },;
          { status: 400 }
        );
      }
    }

    return NextResponse.json(;
      { error: 'Failed to place order. Please try again later.' },;
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryParams = orderQuerySchema.parse(Object.fromEntries(searchParams));

    // Create trading service instance;
    const tradingService = await TradingService.create(session.user.id, queryParams.portfolioId);

    // Get orders through the trading service;
    const orders = await tradingService.getOrders({
      status: queryParams.status,;
      limit: queryParams.limit,;
      after: queryParams.after,;
      until: queryParams.until,;
    });

    // Log data access;
    SecurityAudit.logDataAccess({
      userId: session.user.id,;
      resource: 'orders',;
      action: 'read',;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      success: true,;
    });

    return NextResponse.json({
      success: true,;
      orders,;
      count: orders.length,;
    });
  } catch (error) {
    console.error('Orders fetch error:', error);

    // Log the error;
    SecurityAudit.logSecurityEvent({
      type: 'data_access_error',;
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'orders_fetch_failed',;
        error: error instanceof Error ? error.message : 'Unknown error',;
      },;
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        { error: 'Invalid query parameters', details: error.errors },;
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// Cancel order endpoint;
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Create trading service instance;
    const tradingService = await TradingService.create(session.user.id);

    // Cancel the order;
    await tradingService.cancelOrder(orderId);

    return NextResponse.json({
      success: true,;
      message: 'Order canceled successfully',;
      orderId,;
    });
  } catch (error) {
    console.error('Order cancellation error:', error);

    // Log the error;
    SecurityAudit.logSecurityEvent({
      type: 'trading_error',;
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'order_cancellation_failed',;
        error: error instanceof Error ? error.message : 'Unknown error',;
      },;
    });

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ error: 'Order not found or already processed' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to cancel order' }, { status: 500 });
  }
}
