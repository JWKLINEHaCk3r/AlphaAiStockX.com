import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

const socialPostSchema = z.object({
  content: z.string().min(1).max(500),;
  type: z.enum(['POST', 'TRADE_IDEA', 'MARKET_ANALYSIS', 'NEWS_SHARE']),;
  attachments: z.array(z.string()).optional(),;
  tradingData: z.object({
    symbol: z.string().optional(),;
    action: z.enum(['BUY', 'SELL', 'HOLD']).optional(),;
    price: z.number().optional(),;
    confidence: z.number().optional(),;
  }).optional(),;
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const userId = searchParams.get('userId');

    // Get social feed posts;
    const posts = await prisma.socialPost.findMany({
      where: {
        ...(type && { type: type as any }),;
        ...(userId && { authorId: userId }),;
      },;
      include: {
        author: {
          select: {
            id: true,;
            name: true,;
            username: true,;
            avatar: true,;
            tier: true,;
            socialProfile: {
              select: {
                reputation: true,;
                verified: true,;
              },;
            },;
          },;
        },;
        likes: {
          select: {
            userId: true,;
          },;
        },;
        comments: {
          include: {
            author: {
              select: {
                id: true,;
                name: true,;
                username: true,;
                avatar: true,;
                tier: true,;
              },;
            },;
          },;
          orderBy: { createdAt: 'desc' },;
          take: 5,;
        },;
        _count: {
          select: {
            likes: true,;
            comments: true,;
            shares: true,;
          },;
        },;
      },;
      orderBy: { createdAt: 'desc' },;
      take: limit,;
    });

    const feedPosts = posts.map((post: any) => ({
      id: post.id,;
      content: post.content,;
      type: post.type,;
      attachments: post.attachments,;
      tradingData: post.tradingData,;
      createdAt: post.createdAt,;
      author: {
        ...post.author,;
        reputation: post.author.socialProfile?.reputation || 0,;
        verified: post.author.socialProfile?.verified || false,;
      },;
      engagement: {
        likes: post._count.likes,;
        comments: post._count.comments,;
        shares: post._count.shares,;
        userLiked: post.likes.some(like => like.userId === session.user.id),;
      },;
      comments: post.comments.slice(0, 3), // Show only first 3 comments;
    }));

    return NextResponse.json({
      success: true,;
      posts: feedPosts,;
    });
  } catch (error) {
    console.error('Social feed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const postData = socialPostSchema.parse(body);

    // Create social post;
    const post = await prisma.socialPost.create({
      data: {
        authorId: session.user.id,;
        content: postData.content,;
        type: postData.type,;
        attachments: postData.attachments || [],;
        tradingData: postData.tradingData,;
      },;
      include: {
        author: {
          select: {
            id: true,;
            name: true,;
            username: true,;
            avatar: true,;
            tier: true,;
            socialProfile: {
              select: {
                reputation: true,;
                verified: true,;
              },;
            },;
          },;
        },;
      },;
    });

    // Update user's social profile post count;
    await prisma.socialProfile.upsert({
      where: { userId: session.user.id },;
      update: {
        postsCount: { increment: 1 },;
      },;
      create: {
        userId: session.user.id,;
        postsCount: 1,;
        reputation: 0,;
        likesReceived: 0,;
        verified: false,;
      },;
    });

    return NextResponse.json({
      success: true,;
      message: 'Post created successfully',;
      post: {
        ...post,;
        author: {
          ...post.author,;
          reputation: post.author.socialProfile?.reputation || 0,;
          verified: post.author.socialProfile?.verified || false,;
        },;
        engagement: {
          likes: 0,;
          comments: 0,;
          shares: 0,;
          userLiked: false,;
        },;
        comments: [],;
      },;
    });
  } catch (error) {
    console.error('Social post creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        { error: 'Validation failed', details: error.errors },;
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
