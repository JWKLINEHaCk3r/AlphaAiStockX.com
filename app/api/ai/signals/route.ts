import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock AI trading signals
    const signals = [
      {
        id: 1,
        symbol: 'AAPL',
        signal: 'BUY',
        confidence: 85.7,
        targetPrice: 195.00,
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        symbol: 'TSLA',
        signal: 'HOLD',
        confidence: 72.3,
        targetPrice: 180.00,
        timestamp: new Date().toISOString()
      },
      {
        id: 3,
        symbol: 'NVDA',
        signal: 'SELL',
        confidence: 91.2,
        targetPrice: 320.00,
        timestamp: new Date().toISOString()
      }
    ];

    return NextResponse.json(signals);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch signals' },
      { status: 500 }
    );
  }
}
