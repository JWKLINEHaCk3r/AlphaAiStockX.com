import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock open orders
    const orders = [
      {
        orderId: 'ORD-PENDING-001',
        symbol: 'AAPL',
        action: 'BUY',
        quantity: 50,
        orderType: 'LIMIT',
        limitPrice: 182.00,
        status: 'PENDING',
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        orderId: 'ORD-PENDING-002',
        symbol: 'TSLA',
        action: 'SELL',
        quantity: 25,
        orderType: 'STOP_LOSS',
        stopPrice: 240.00,
        status: 'PENDING',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];

    return NextResponse.json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('orders GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, action, quantity, orderType, price, stopPrice } = body;
    
    // Mock order creation
    const order = {
      orderId: `ORD-${Date.now()}`,
      symbol: symbol,
      action: action,
      quantity: quantity,
      orderType: orderType,
      price: price,
      stopPrice: stopPrice,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('orders POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
