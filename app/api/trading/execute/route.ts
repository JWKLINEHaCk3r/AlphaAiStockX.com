import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, action, quantity, orderType, price } = body;
    
    // Mock trade execution
    const execution = {
      orderId: `ORD-${Date.now()}`,
      symbol: symbol,
      action: action, // BUY or SELL
      quantity: quantity,
      orderType: orderType || 'MARKET',
      price: price || null,
      status: 'FILLED',
      executionPrice: orderType === 'MARKET' ? 
        (symbol === 'AAPL' ? 185.25 : 435.80) : price,
      timestamp: new Date().toISOString(),
      commission: 0.99
    };

    return NextResponse.json({
      success: true,
      execution: execution
    });
  } catch (error) {
    console.error('execute POST error:', error);
    return NextResponse.json(
      { error: 'Trade execution failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Mock recent executions
    const executions = [
      {
        orderId: 'ORD-1725486123',
        symbol: 'AAPL',
        action: 'BUY',
        quantity: 10,
        executionPrice: 185.25,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'FILLED'
      },
      {
        orderId: 'ORD-1725486098',
        symbol: 'NVDA',
        action: 'SELL',
        quantity: 5,
        executionPrice: 435.80,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'FILLED'
      }
    ];

    return NextResponse.json({
      success: true,
      executions: executions
    });
  } catch (error) {
    console.error('execute GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch executions' },
      { status: 500 }
    );
  }
}
