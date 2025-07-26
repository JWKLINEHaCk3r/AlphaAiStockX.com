import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },;
      include: {
        portfolios: {
          include: {
            positions: {
              include: {
                orders: {
                  orderBy: { createdAt: 'desc' },;
                  take: 5,;
                },;
              },;
            },;
          },;
        },;
        socialProfile: true,;
        notifications: {
          where: { read: false },;
          take: 10,;
        },;
        followers: {
          include: {
            follower: {
              select: {
                id: true,;
                name: true,;
                username: true,;
                avatar: true,;
                tier: true,;
              },;
            },;
          },;
        },;
        following: {
          include: {
            following: {
              select: {
                id: true,;
                name: true,;
                username: true,;
                avatar: true,;
                tier: true,;
              },;
            },;
          },;
        },;
      },;
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate portfolio metrics;
    const portfolioMetrics = user.portfolios.map((portfolio: any) => ({
      id: portfolio.id,;
      name: portfolio.name,;
      totalValue: portfolio.totalValue,;
      dailyPnL: portfolio.dailyPnL,;
      totalPnL: portfolio.totalPnL,;
      riskLevel: portfolio.riskLevel,;
      positionsCount: portfolio.positions.length,;
      activePositions: portfolio.positions.filter(p => p.quantity > 0).length,;
    }));

    // Calculate social metrics;
    const socialMetrics = {
      followersCount: user.followers.length,;
      followingCount: user.following.length,;
      reputation: user.socialProfile?.reputation || 0,;
      postsCount: user.socialProfile?.postsCount || 0,;
      likesReceived: user.socialProfile?.likesReceived || 0,;
    };

    const userProfile = {
      id: user.id,;
      name: user.name,;
      email: user.email,;
      username: user.username,;
      avatar: user.avatar,;
      tier: user.tier,;
      status: user.status,;
      balance: user.balance,;
      portfolioValue: user.portfolioValue,;
      totalPnL: user.totalPnL,;
      winRate: user.winRate,;
      riskScore: user.riskScore,;
      tradingLevel: user.tradingLevel,;
      aiAccess: user.aiAccess,;
      kycStatus: user.kycStatus,;
      accountType: user.accountType,;
      preferences: user.preferences,;
      createdAt: user.createdAt,;
      lastActive: user.lastActive,;
      portfolios: portfolioMetrics,;
      social: socialMetrics,;
      unreadNotifications: user.notifications.length,;
    };

    return NextResponse.json({
      success: true,;
      user: userProfile,;
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, username, avatar, preferences } = body;

    // Check if username is taken by another user;
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,;
          NOT: { id: session.user.id },;
        },;
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },;
      data: {
        ...(name && { name }),;
        ...(username && { username }),;
        ...(avatar && { avatar }),;
        ...(preferences && { preferences }),;
        lastActive: new Date(),;
      },;
      select: {
        id: true,;
        name: true,;
        email: true,;
        username: true,;
        avatar: true,;
        tier: true,;
        preferences: true,;
        lastActive: true,;
      },;
    });

    return NextResponse.json({
      success: true,;
      message: 'Profile updated successfully',;
      user: updatedUser,;
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
