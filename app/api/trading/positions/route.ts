import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock trading positions
    const positions = [
      {
        id: 'POS-001',
        symbol: 'AAPL',
        quantity: 100,
        avgPrice: 180.50,
        currentPrice: 185.25,
        marketValue: 18525.00,
        unrealizedPnL: 475.00,
        unrealizedPnLPercent: 2.63,
        side: 'LONG'
      },
      {
        id: 'POS-002',
        symbol: 'NVDA',
        quantity: 50,
        avgPrice: 420.00,
        currentPrice: 435.80,
        marketValue: 21790.00,
        unrealizedPnL: 790.00,
        unrealizedPnLPercent: 3.76,
        side: 'LONG'
      },
      {
        id: 'POS-003',
        symbol: 'TSLA',
        quantity: -25,
        avgPrice: 250.00,
        currentPrice: 248.90,
        marketValue: -6222.50,
        unrealizedPnL: 27.50,
        unrealizedPnLPercent: 0.44,
        side: 'SHORT'
      }
    ];

    return NextResponse.json({
      success: true,
      positions: positions,
      totalValue: 34092.50,
      totalPnL: 1292.50
    });
  } catch (error) {
    console.error('positions GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body; // 'close_all', 'close_position', etc.
    
    if (action === 'close_all') {
      return NextResponse.json({
        success: true,
        message: 'All positions closed successfully',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Position action completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('positions POST error:', error);
    return NextResponse.json(
      { error: 'Position action failed' },
      { status: 500 }
    );
  }
}
