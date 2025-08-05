import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock user profile data
    const profile = {
      id: 'user123',
      username: 'ai_trader_pro',
      email: 'trader@alphaai.com',
      fullName: 'Alpha Trader',
      bio: 'Professional AI trader using machine learning for market analysis',
      avatar: '/default-avatar.png',
      joinedDate: '2024-01-15',
      verified: true,
      totalTrades: 145,
      successRate: 87.5,
      totalProfit: 45230.75
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.error('User profile GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, fullName, bio, avatar } = body;
    
    // Mock profile update
    const updatedProfile = {
      id: 'user123',
      username: username || 'ai_trader_pro',
      fullName: fullName || 'Alpha Trader',
      bio: bio || 'Professional AI trader using machine learning for market analysis',
      avatar: avatar || '/default-avatar.png',
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('User profile PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
