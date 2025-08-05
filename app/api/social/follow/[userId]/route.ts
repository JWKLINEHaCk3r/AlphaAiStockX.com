import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
    // Mock follower status
    const followStatus = {
      userId: userId,
      isFollowing: Math.random() > 0.5,
      followerCount: Math.floor(Math.random() * 1000),
      followingCount: Math.floor(Math.random() * 500)
    };

    return NextResponse.json(followStatus);
  } catch (error) {
    console.error('[userId] GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { action } = body; // 'follow' or 'unfollow'
    
    // Mock follow/unfollow logic
    const result = {
      userId: userId,
      action: action,
      success: true,
      newFollowStatus: action === 'follow'
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('[userId] POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
