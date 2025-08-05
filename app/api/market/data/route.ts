import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock market data
    const marketData = {
      indices: {
        'S&P500': {
          value: 4756.50,
          change: 0.85,
          changePercent: 1.82
        },
        'NASDAQ': {
          value: 14845.30,
          change: 125.20,
          changePercent: 0.85
        },
        'DOW': {
          value: 37248.90,
          change: -45.80,
          changePercent: -0.12
        }
      },
      topGainers: [
        {
          symbol: 'NVDA',
          price: 875.30,
          change: 15.2,
          changePercent: 1.77
        },
        {
          symbol: 'AAPL',
          price: 189.50,
          change: 2.5,
          changePercent: 1.34
        }
      ],
      topLosers: [
        {
          symbol: 'META',
          price: 485.20,
          change: -8.90,
          changePercent: -1.80
        }
      ],
      volume: {
        total: 8420000000,
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json({ 
      success: true, 
      data: marketData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Market data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
