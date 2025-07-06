import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const targetUserId = params.userId;

    if (targetUserId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot follow yourself' },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, name: true, username: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.userFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json(
        { error: 'Already following this user' },
        { status: 400 }
      );
    }

    // Create follow relationship
    await prisma.userFollow.create({
      data: {
        followerId: session.user.id,
        followingId: targetUserId,
      },
    });

    // Update social profiles
    await prisma.$transaction([
      // Update follower's following count
      prisma.socialProfile.upsert({
        where: { userId: session.user.id },
        update: { followingCount: { increment: 1 } },
        create: {
          userId: session.user.id,
          followingCount: 1,
          followersCount: 0,
          postsCount: 0,
          reputation: 0,
          likesReceived: 0,
          verified: false,
        },
      }),
      // Update target user's followers count
      prisma.socialProfile.upsert({
        where: { userId: targetUserId },
        update: { followersCount: { increment: 1 } },
        create: {
          userId: targetUserId,
          followingCount: 0,
          followersCount: 1,
          postsCount: 0,
          reputation: 0,
          likesReceived: 0,
          verified: false,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Now following ${targetUser.name}`,
    });

  } catch (error) {
    console.error('Follow user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const targetUserId = params.userId;

    // Remove follow relationship
    const deletedFollow = await prisma.userFollow.deleteMany({
      where: {
        followerId: session.user.id,
        followingId: targetUserId,
      },
    });

    if (deletedFollow.count === 0) {
      return NextResponse.json(
        { error: 'Not following this user' },
        { status: 400 }
      );
    }

    // Update social profiles
    await prisma.$transaction([
      // Update follower's following count
      prisma.socialProfile.updateMany({
        where: { userId: session.user.id },
        data: { followingCount: { decrement: 1 } },
      }),
      // Update target user's followers count
      prisma.socialProfile.updateMany({
        where: { userId: targetUserId },
        data: { followersCount: { decrement: 1 } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Unfollowed successfully',
    });

  } catch (error) {
    console.error('Unfollow user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
