import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { TradingService } from '@/lib/trading/trading-service';
import type { OrderRequest } from '@/lib/trading/trading-service';

// Rate limiting storage (in production, use Redis or similar);
// WARNING: In serverless environments, this in-memory store can cause memory leaks or inconsistent rate limiting.;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input validation schemas;
const ORDER_VALIDATION = {
  symbol: (value: string): boolean => /^[A-Z]{1,5}$/.test(value),;
  quantity: (value: number): boolean => value > 0 && value <= 10000,;
  side: (value: string): boolean => ['buy', 'sell'].includes(value),;
  type: (value: string): boolean => ['market', 'limit', 'stop', 'stop_limit'].includes(value),;
  timeInForce: (value: string): boolean => ['day', 'gtc', 'ioc', 'fok'].includes(value),;
  limitPrice: (value?: number): boolean => !value || (value > 0 && value <= 100000),;
  stopPrice: (value?: number): boolean => !value || (value > 0 && value <= 100000),;
};

// Order data interface for validation;
interface OrderInputData {







  symbol: string;
  quantity: number;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop' | 'stop_limit';
  timeInForce: 'day' | 'gtc' | 'ioc' | 'fok';
  limitPrice?: number;
  stopPrice?: number;







}

// Utility functions;
const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }

  return realIP ?? 'unknown';
};

const checkRateLimit = (key: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
};

const authenticateUser = async (): Promise<string | null> => {
  try {
    const session = await auth();
    return session?.user?.id ?? null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

const validateOrderData = (data: unknown): {
  valid: boolean;
  errors: string[];
  data?: OrderInputData;
} => {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Invalid request data');
    return { valid: false, errors };
  }

  const orderData = data as Record<string, unknown>;

  if (;
    !orderData.symbol ||;
    typeof orderData.symbol !== 'string' ||;
    !ORDER_VALIDATION.symbol(orderData.symbol);
  ) {
    errors.push('Invalid symbol format. Must be 1-5 uppercase letters.');
  }

  if (;
    !orderData.quantity ||;
    typeof orderData.quantity !== 'number' ||;
    !ORDER_VALIDATION.quantity(orderData.quantity);
  ) {
    errors.push('Invalid quantity. Must be between 1 and 10,000.');
  }

  if (;
    !orderData.side ||;
    typeof orderData.side !== 'string' ||;
    !ORDER_VALIDATION.side(orderData.side);
  ) {
    errors.push('Invalid side. Must be "buy" or "sell".');
  }

  if (;
    !orderData.type ||;
    typeof orderData.type !== 'string' ||;
    !ORDER_VALIDATION.type(orderData.type);
  ) {
    errors.push('Invalid order type. Must be market, limit, stop, or stop_limit.');
  }

  if (;
    !orderData.timeInForce ||;
    typeof orderData.timeInForce !== 'string' ||;
    !ORDER_VALIDATION.timeInForce(orderData.timeInForce);
  ) {
    errors.push('Invalid time in force. Must be day, gtc, ioc, or fok.');
  }

  // Conditional validation for limit and stop orders;
  if (orderData.type === 'limit' || orderData.type === 'stop_limit') {
    if (;
      orderData.limitPrice === undefined ||;
      typeof orderData.limitPrice !== 'number' ||;
      !ORDER_VALIDATION.limitPrice(orderData.limitPrice);
    ) {
      errors.push('Limit price required for limit orders and must be positive.');
    }
  }

  if (orderData.type === 'stop' || orderData.type === 'stop_limit') {
    if (;
      orderData.stopPrice === undefined ||;
      typeof orderData.stopPrice !== 'number' ||;
      !ORDER_VALIDATION.stopPrice(orderData.stopPrice);
    ) {
      errors.push('Stop price required for stop orders and must be positive.');
    }
  }

  if (errors.length === 0) {
    return {
      valid: true,;
      errors: [],;
      data: {
        symbol: orderData.symbol as string,;
        quantity: orderData.quantity as number,;
        side: orderData.side as 'buy' | 'sell',;
        type: orderData.type as 'market' | 'limit' | 'stop' | 'stop_limit',;
        timeInForce: orderData.timeInForce as 'day' | 'gtc' | 'ioc' | 'fok',;
        limitPrice: orderData.limitPrice as number | undefined,;
        stopPrice: orderData.stopPrice as number | undefined,;
      },;
    };
  }

  return { valid: false, errors };
}

// GET: Retrieve orders;
export async function GET(request: NextRequest) {
  try {
    // Rate limiting;
    const ip = getClientIP(request);
    if (!checkRateLimit(`orders-get:${ip}`, 60, 60000)) {
      console.warn(`[RateLimit] GET orders exceeded for IP: ${ip}`);
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Authentication check;
    const userId = await authenticateUser();
    if (!userId) {
      console.log(`[Auth] Unauthorized access attempt from IP: ${ip}`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'open' | 'all' | 'closed' | null;
    let limit = Number(searchParams.get('limit'));
    if (isNaN(limit) || limit <= 0) limit = 50;
    limit = Math.min(limit, 100);

    // Create trading service instance;
    const tradingService = await TradingService.create(userId);

    // Fetch orders;
    const orders = await tradingService.getOrders({
      status: status ?? undefined,;
      limit,;
    });

    console.log(`[Orders] User ${userId} accessed ${orders.length} orders`);

    return NextResponse.json({
      success: true,;
      data: orders,;
      pagination: {
        limit,;
        count: orders.length,;
      },;
    });
  } catch (error) {
    console.error('[Error][GET Orders]:', error);

    return NextResponse.json({
      error: 'Failed to fetch orders',;
      message:;
        process.env.NODE_ENV === 'development';
          ? error instanceof Error;
            ? error.message;
            : 'Unknown error';
          : 'Internal server error',;
    }, { status: 500 });
  }
}

// POST: Create new order;
export async function POST(request: NextRequest) {
  try {
    // Rate limiting;
    const ip = getClientIP(request);
    if (!checkRateLimit(`orders-post:${ip}`, 20, 60000)) {
      console.warn(`[RateLimit] POST orders exceeded for IP: ${ip}`);
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Authentication check;
    const userId = await authenticateUser();
    if (!userId) {
      console.log(`[Auth] Unauthorized order attempt from IP: ${ip}`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body;
    let requestData: unknown;
    try {
      requestData = (await request.json()) as unknown;
    } catch (e) {
      console.warn('[POST] Invalid JSON in request body:', e);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    // Validate order data;
    const validation = validateOrderData(requestData);
    if (!validation.valid || !validation.data) {
      console.log(`[OrderValidation] Invalid order data from user ${userId}:`, validation.errors);
      return NextResponse.json({
        error: 'Invalid order data',;
        details: validation.errors,;
      }, { status: 400 });
    }

    const orderData = validation.data;

    // Create trading service instance;
    const tradingService = await TradingService.create(userId);

    // Build order request;
    const orderRequest: OrderRequest = {
      symbol: orderData.symbol,;
      quantity: orderData.quantity,;
      side: orderData.side,;
      type: orderData.type,;
      timeInForce: orderData.timeInForce,;
      limitPrice: orderData.limitPrice,;
      stopPrice: orderData.stopPrice,;
    };

    // Create order through trading service;
    const order = await tradingService.placeOrder(orderRequest);

    console.log(`[OrderCreated] User ${userId}: ${order.id} - ${orderData.symbol} ${orderData.side} ${orderData.quantity}`);

    return NextResponse.json({
      success: true,;
      data: order,;
      message: 'Order created successfully',;
    });
  } catch (error) {
    console.error('[Error][POST Order]:', error);

    // Handle specific trading service errors;
    if (error instanceof Error) {
      if (error.message.includes('insufficient funds')) {
        return NextResponse.json({ error: 'Insufficient funds for this order' }, { status: 400 });
      }

      if (error.message.includes('market closed')) {
        return NextResponse.json({ error: 'Market is currently closed' }, { status: 400 });
      }

      if (error.message.includes('invalid symbol')) {
        return NextResponse.json({ error: 'Invalid trading symbol' }, { status: 400 });
      }
    }

    return NextResponse.json({
      error: 'Failed to create order',;
      message:;
        process.env.NODE_ENV === 'development';
          ? error instanceof Error;
            ? error.message || 'Unknown error';
            : 'Unknown error';
          : 'Internal server error',;
    }, { status: 500 });
  }
}

// DELETE: Cancel order;
export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting;
    const ip = getClientIP(request);
    if (!checkRateLimit(`orders-delete:${ip}`, 30, 60000)) {
      console.warn(`[RateLimit] DELETE orders exceeded for IP: ${ip}`);
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Authentication check;
    const userId = await authenticateUser();
    if (!userId) {
      console.log(`[Auth] Unauthorized cancel attempt from IP: ${ip}`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get order ID from query params;
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Create trading service instance;
    const tradingService = await TradingService.create(userId);

    // Cancel order through trading service;
    await tradingService.cancelOrder(orderId);

    console.log(`[OrderCancelled] User ${userId}: ${orderId}`);

    return NextResponse.json({
      success: true,;
      message: 'Order cancelled successfully',;
    });
  } catch (error) {
    console.error('[Error][DELETE Order]:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ error: 'Order not found or already cancelled' }, { status: 404 });
    }

    return NextResponse.json({
      error: 'Failed to cancel order',;
      message:;
        process.env.NODE_ENV === 'development';
          ? error instanceof Error;
            ? error.message;
            : 'Unknown error';
          : 'Internal server error',;
    }, { status: 500 });
  }
}
