import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock social feed data
    const feed = [
      {
        id: 1,
        username: 'trader_pro',
        content: 'Just made 15% profit on $AAPL using AI signals!',
        timestamp: new Date().toISOString(),
        likes: 42,
        shares: 8
      },
      {
        id: 2,
        username: 'market_maven',
        content: 'The new AI trading bot is incredible. Consistent gains!',
        timestamp: new Date().toISOString(),
        likes: 31,
        shares: 12
      }
    ];

    return NextResponse.json({ 
      success: true, 
      feed 
    });
  } catch (error) {
    console.error('Social feed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch social feed' },
      { status: 500 }
    );
  }
}
