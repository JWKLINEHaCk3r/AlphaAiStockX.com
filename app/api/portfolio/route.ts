import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock portfolio data
    const portfolio = {
      totalValue: 125000.00,
      dayChange: 2350.50,
      dayChangePercent: 1.92,
      holdings: [
        {
          symbol: 'AAPL',
          shares: 100,
          avgPrice: 180.50,
          currentPrice: 185.25,
          value: 18525.00,
          change: 475.00,
          changePercent: 2.63
        },
        {
          symbol: 'NVDA',
          shares: 50,
          avgPrice: 420.00,
          currentPrice: 435.80,
          value: 21790.00,
          change: 790.00,
          changePercent: 3.76
        },
        {
          symbol: 'TSLA',
          shares: 75,
          avgPrice: 250.00,
          currentPrice: 248.90,
          value: 18667.50,
          change: -82.50,
          changePercent: -0.44
        }
      ]
    };

    return NextResponse.json({ 
      success: true, 
      portfolio 
    });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
