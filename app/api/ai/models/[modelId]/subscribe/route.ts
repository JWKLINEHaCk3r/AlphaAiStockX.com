import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { modelId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const modelId = params.modelId;

    // Check if model exists and is public
    const model = await prisma.aIModel.findUnique({
      where: { id: modelId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    if (!model.isPublic && model.creatorId !== session.user.id) {
      return NextResponse.json({ error: 'Model is not public' }, { status: 403 });
    }

    // Check if already subscribed
    const existingSubscription = await prisma.aIModelSubscription.findUnique({
      where: {
        userId_modelId: {
          userId: session.user.id,
          modelId,
        },
      },
    });

    if (existingSubscription) {
      return NextResponse.json({ error: 'Already subscribed to this model' }, { status: 400 });
    }

    // Create subscription
    const subscription = await prisma.aIModelSubscription.create({
      data: {
        userId: session.user.id,
        modelId,
        isActive: true,
      },
    });

    // Start training job for user's custom instance
    const trainingJob = await prisma.trainingJob.create({
      data: {
        modelId,
        userId: session.user.id,
        status: 'QUEUED',
        progress: 0,
        logs: ['Training job queued'],
        config: model.parameters,
      },
    });

    // Simulate training job start (in real implementation, this would trigger actual training)
    setTimeout(async () => {
      try {
        await simulateTrainingProgress(trainingJob.id);
      } catch (error) {
        console.error('Training simulation error:', error);
      }
    }, 1000);

    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to ${model.name}`,
      subscription,
      trainingJob,
    });
  } catch (error) {
    console.error('Model subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { modelId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const modelId = params.modelId;

    // Delete subscription
    const deletedSubscription = await prisma.aIModelSubscription.deleteMany({
      where: {
        userId: session.user.id,
        modelId,
      },
    });

    if (deletedSubscription.count === 0) {
      return NextResponse.json({ error: 'Not subscribed to this model' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from model',
    });
  } catch (error) {
    console.error('Model unsubscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to simulate training progress
async function simulateTrainingProgress(trainingJobId: string) {
  const stages = [
    { progress: 10, status: 'RUNNING', log: 'Initializing training environment' },
    { progress: 25, status: 'RUNNING', log: 'Loading and preprocessing data' },
    { progress: 40, status: 'RUNNING', log: 'Training model - Epoch 1/10' },
    { progress: 55, status: 'RUNNING', log: 'Training model - Epoch 3/10' },
    { progress: 70, status: 'RUNNING', log: 'Training model - Epoch 6/10' },
    { progress: 85, status: 'RUNNING', log: 'Training model - Epoch 9/10' },
    { progress: 95, status: 'RUNNING', log: 'Validating model performance' },
    { progress: 100, status: 'COMPLETED', log: 'Training completed successfully' },
  ];

  for (const stage of stages) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

    await prisma.trainingJob.update({
      where: { id: trainingJobId },
      data: {
        progress: stage.progress,
        status: stage.status,
        logs: {
          push: stage.log,
        },
        ...(stage.status === 'COMPLETED' && {
          completedAt: new Date(),
          metrics: {
            accuracy: 0.85 + Math.random() * 0.1,
            loss: Math.random() * 0.1,
            valAccuracy: 0.82 + Math.random() * 0.1,
            valLoss: Math.random() * 0.15,
            epochs: 10,
            trainingTime: 120 + Math.random() * 60,
          },
        }),
      },
    });
  }
}
