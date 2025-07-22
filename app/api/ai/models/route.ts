import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

const aiModelSchema = z.object({
  name: z.string().min(1, 'Model name is required'),;
  description: z.string().min(1, 'Description is required'),;
  type: z.enum(['LSTM', 'TRANSFORMER', 'GAN', 'ENSEMBLE', 'CNN', 'RNN']),;
  parameters: z.object({
    learningRate: z.number().positive(),;
    epochs: z.number().int().positive(),;
    batchSize: z.number().int().positive(),;
    layers: z.number().int().positive(),;
    neurons: z.number().int().positive(),;
    dropout: z.number().min(0).max(1),;
    optimizer: z.string(),;
    lossFunction: z.string(),;
  }),;
  trainingData: z.object({
    symbols: z.array(z.string()),;
    timeframe: z.string(),;
    features: z.array(z.string()),;
    startDate: z.string(),;
    endDate: z.string(),;
  }),;
  isPublic: z.boolean().default(false),;
  subscriptionPrice: z.number().min(0).optional(),;
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const isPublic = searchParams.get('public') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');

    const models = await prisma.aIModel.findMany({
      where: {
        ...(type && { type: type as any }),;
        ...(isPublic ? { isPublic: true } : { creatorId: session.user.id }),;
      },;
      include: {
        creator: {
          select: {
            id: true,;
            name: true,;
            username: true,;
            avatar: true,;
            tier: true,;
          },;
        },;
        trainingJobs: {
          orderBy: { createdAt: 'desc' },;
          take: 1,;
          select: {
            status: true,;
            progress: true,;
            metrics: true,;
            completedAt: true,;
          },;
        },;
        subscriptions: {
          select: {
            userId: true,;
          },;
        },;
        _count: {
          select: {
            subscriptions: true,;
            backtests: true,;
          },;
        },;
      },;
      orderBy: { createdAt: 'desc' },;
      take: limit,;
    });

    const modelData = models.map(model => ({
      id: model.id,;
      name: model.name,;
      description: model.description,;
      type: model.type,;
      parameters: model.parameters,;
      trainingData: model.trainingData,;
      performance: model.performance,;
      status: model.status,;
      isPublic: model.isPublic,;
      subscriptionPrice: model.subscriptionPrice,;
      createdAt: model.createdAt,;
      lastUpdated: model.lastUpdated,;
      creator: model.creator,;
      latestTraining: model.trainingJobs[0] || null,;
      subscribers: model._count.subscriptions,;
      backtests: model._count.backtests,;
      isSubscribed: model.subscriptions.some(sub => sub.userId === session.user.id),;
    }));

    return NextResponse.json({
      success: true,;
      models: modelData,;
    });
  } catch (error) {
    console.error('AI models fetch error:', error);
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
    const modelData = aiModelSchema.parse(body);

    // Create AI model;
    const model = await prisma.aIModel.create({
      data: {
        creatorId: session.user.id,;
        name: modelData.name,;
        description: modelData.description,;
        type: modelData.type,;
        parameters: modelData.parameters,;
        trainingData: modelData.trainingData,;
        status: 'DRAFT',;
        isPublic: modelData.isPublic,;
        subscriptionPrice: modelData.subscriptionPrice,;
        performance: {
          accuracy: 0,;
          precision: 0,;
          recall: 0,;
          f1Score: 0,;
          sharpeRatio: 0,;
          maxDrawdown: 0,;
          totalReturn: 0,;
          winRate: 0,;
        },;
      },;
      include: {
        creator: {
          select: {
            id: true,;
            name: true,;
            username: true,;
            avatar: true,;
            tier: true,;
          },;
        },;
      },;
    });

    return NextResponse.json({
      success: true,;
      message: 'AI model created successfully',;
      model,;
    });
  } catch (error) {
    console.error('AI model creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        { error: 'Validation failed', details: error.errors },;
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
