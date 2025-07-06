import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const portfolioId = searchParams.get('portfolioId');

    // Get user's portfolios
    const portfolios = await prisma.portfolio.findMany({
      where: { 
        userId: session.user.id,
        ...(portfolioId && { id: portfolioId }),
      },
      include: {
        positions: {
          where: {
            quantity: { gt: 0 },
          },
          orderBy: { lastUpdated: 'desc' },
        },
      },
    });

    // Calculate portfolio metrics
    const portfolioData = await Promise.all(
      portfolios.map(async (portfolio) => {
        // Get current market prices (mock for demo)
        const updatedPositions = portfolio.positions.map(position => {
          const currentPrice = 150 + Math.random() * 50; // Mock price
          const marketValue = position.quantity * currentPrice;
          const unrealizedPnL = marketValue - (position.quantity * position.averagePrice);
          const unrealizedPnLPercent = (unrealizedPnL / (position.quantity * position.averagePrice)) * 100;

          return {
            ...position,
            currentPrice,
            marketValue,
            unrealizedPnL,
            unrealizedPnLPercent,
          };
        });

        const totalMarketValue = updatedPositions.reduce((sum, pos) => sum + pos.marketValue, 0);
        const totalUnrealizedPnL = updatedPositions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0);
        const totalValue = portfolio.cashBalance + totalMarketValue;
        const totalPnL = totalUnrealizedPnL + portfolio.realizedPnL;
        const totalPnLPercent = portfolio.initialValue > 0 ? (totalPnL / portfolio.initialValue) * 100 : 0;

        // Calculate daily P&L (mock calculation)
        const previousValue = totalValue - (totalValue * 0.02 * (Math.random() - 0.5)); // Mock previous value
        const dailyPnL = totalValue - previousValue;
        const dailyPnLPercent = previousValue > 0 ? (dailyPnL / previousValue) * 100 : 0;

        return {
          id: portfolio.id,
          name: portfolio.name,
          description: portfolio.description,
          type: portfolio.type,
          cashBalance: portfolio.cashBalance,
          totalValue,
          totalMarketValue,
          totalPnL,
          totalPnLPercent,
          dailyPnL,
          dailyPnLPercent,
          riskLevel: portfolio.riskLevel,
          autoTrading: portfolio.autoTrading,
          positions: updatedPositions,
          positionsCount: updatedPositions.length,
          lastUpdated: new Date(),
        };
      })
    );

    return NextResponse.json({
      success: true,
      portfolios: portfolioData,
    });

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, type = 'PERSONAL', initialDeposit = 0 } = body;

    // Create new portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: session.user.id,
        name,
        description,
        type,
        totalValue: initialDeposit,
        cashBalance: initialDeposit,
        initialValue: initialDeposit,
        realizedPnL: 0,
        dailyPnL: 0,
        totalPnL: 0,
        riskLevel: 'MEDIUM',
        autoTrading: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Portfolio created successfully',
      portfolio,
    });

  } catch (error) {
    console.error('Portfolio creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
