import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { TradingService } from '@/lib/trading/trading-service';
import { SecurityAudit } from '@/lib/security';
import { z } from 'zod';

const portfolioQuerySchema = z.object({
  portfolioId: z.string().optional(),;
  includePositions: z;
    .string();
    .transform(val => val === 'true');
    .optional(),;
  includePerformance: z;
    .string();
    .transform(val => val === 'true');
    .optional(),;
});

const createPortfolioSchema = z.object({
  name: z.string().min(1, 'Portfolio name is required').max(100, 'Name too long'),;
  description: z.string().max(500, 'Description too long').optional(),;
  type: z.enum(['PERSONAL', 'RETIREMENT', 'MARGIN', 'CRYPTO']).default('PERSONAL'),;
  initialDeposit: z;
    .number();
    .positive('Initial deposit must be positive');
    .max(10000000, 'Amount too large');
    .optional(),;
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),;
  autoTrading: z.boolean().default(false),;
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryParams = portfolioQuerySchema.parse(Object.fromEntries(searchParams));

    if (queryParams.portfolioId) {
      // Get specific portfolio with trading data;
      const tradingService = await TradingService.create(session.user.id, queryParams.portfolioId);

      // Get comprehensive portfolio summary;
      const portfolioSummary = await tradingService.getPortfolioSummary();

      // Get portfolio metadata from database;
      const portfolioData = await prisma.portfolio.findFirst({
        where: {
          id: queryParams.portfolioId,;
          userId: session.user.id,;
        },;
        include: {
          user: {
            select: {
              name: true,;
              email: true,;
            },;
          },;
        },;
      });

      if (!portfolioData) {
        return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
      }

      // Combine database data with live trading data;
      const response = {
        id: portfolioData.id,;
        name: portfolioData.name,;
        description: portfolioData.description,;
        type: portfolioData.type,;
        riskLevel: portfolioData.riskLevel,;
        autoTrading: portfolioData.autoTrading,;
        createdAt: portfolioData.createdAt,;
        updatedAt: portfolioData.updatedAt,;
        // Live trading data;
        totalValue: portfolioSummary.totalValue,;
        cash: portfolioSummary.cash,;
        buyingPower: portfolioSummary.buyingPower,;
        dayPnL: portfolioSummary.dayPnL,;
        dayPnLPercent: portfolioSummary.dayPnLPercent,;
        totalPnL: portfolioSummary.totalPnL,;
        totalPnLPercent: portfolioSummary.totalPnLPercent,;
        equity: portfolioSummary.equity,;
        longMarketValue: portfolioSummary.longMarketValue,;
        shortMarketValue: portfolioSummary.shortMarketValue,;
        // Include positions if requested;
        ...(queryParams.includePositions && {
          positions: portfolioSummary.positions,;
        }),;
      };

      // Log data access;
      SecurityAudit.logDataAccess({
        userId: session.user.id,;
        resource: 'portfolio',;
        action: 'read',;
        ip: request.headers.get('x-forwarded-for') || 'unknown',;
        success: true,;
      });

      return NextResponse.json({
        success: true,;
        portfolio: response,;
      });
    } else {
      // Get all portfolios for user;
      const portfolios = await prisma.portfolio.findMany({
        where: { userId: session.user.id },;
        orderBy: { createdAt: 'desc' },;
      });

      // Get summary data for each portfolio;
      const portfoliosWithSummary = await Promise.all(;
        portfolios.map(async portfolio => {
          try {
            const tradingService = await TradingService.create(session.user.id, portfolio.id);
            const summary = await tradingService.getPortfolioSummary();

            return {
              id: portfolio.id,;
              name: portfolio.name,;
              description: portfolio.description,;
              type: portfolio.type,;
              riskLevel: portfolio.riskLevel,;
              autoTrading: portfolio.autoTrading,;
              createdAt: portfolio.createdAt,;
              updatedAt: portfolio.updatedAt,;
              totalValue: summary.totalValue,;
              dayPnL: summary.dayPnL,;
              dayPnLPercent: summary.dayPnLPercent,;
              totalPnL: summary.totalPnL,;
              totalPnLPercent: summary.totalPnLPercent,;
              positionCount: summary.positions.length,;
            };
          } catch (error) {
            // Return basic portfolio data if trading service fails;
            return {
              id: portfolio.id,;
              name: portfolio.name,;
              description: portfolio.description,;
              type: portfolio.type,;
              riskLevel: portfolio.riskLevel,;
              autoTrading: portfolio.autoTrading,;
              createdAt: portfolio.createdAt,;
              updatedAt: portfolio.updatedAt,;
              totalValue: portfolio.totalValue || 0,;
              dayPnL: portfolio.dailyPnL || 0,;
              dayPnLPercent: 0,;
              totalPnL: portfolio.totalPnL || 0,;
              totalPnLPercent: 0,;
              positionCount: 0,;
              error: 'Unable to fetch live data',;
            };
          }
        });
      );

      // Log data access;
      SecurityAudit.logDataAccess({
        userId: session.user.id,;
        resource: 'portfolios',;
        action: 'read',;
        ip: request.headers.get('x-forwarded-for') || 'unknown',;
        success: true,;
      });

      return NextResponse.json({
        success: true,;
        portfolios: portfoliosWithSummary,;
        count: portfoliosWithSummary.length,;
      });
    }
  } catch (error) {
    console.error('Portfolio fetch error:', error);

    // Log the error;
    SecurityAudit.logSecurityEvent({
      type: 'data_access_error',;
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'portfolio_fetch_failed',;
        error: error instanceof Error ? error.message : 'Unknown error',;
      },;
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        { error: 'Invalid query parameters', details: error.errors },;
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const portfolioData = createPortfolioSchema.parse(body);

    // Check user's portfolio limit;
    const portfolioCount = await prisma.portfolio.count({
      where: { userId: session.user.id },;
    });

    const maxPortfolios = 10; // You can make this configurable based on user tier;
    if (portfolioCount >= maxPortfolios) {
      return NextResponse.json(;
        { error: `Maximum of ${maxPortfolios} portfolios allowed` },;
        { status: 400 }
      );
    }

    // Create portfolio in database;
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: session.user.id,;
        name: portfolioData.name,;
        description: portfolioData.description,;
        type: portfolioData.type,;
        riskLevel: portfolioData.riskLevel,;
        autoTrading: portfolioData.autoTrading,;
        totalValue: portfolioData.initialDeposit || 0,;
        cashBalance: portfolioData.initialDeposit || 0,;
        dailyPnL: 0,;
        totalPnL: 0,;
      },;
    });

    // Log portfolio creation;
    SecurityAudit.logSecurityEvent({
      type: 'portfolio_management',;
      userId: session.user.id,;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'portfolio_created',;
        portfolioId: portfolio.id,;
        name: portfolio.name,;
        type: portfolio.type,;
        initialDeposit: portfolioData.initialDeposit,;
      },;
    });

    return NextResponse.json(;
      {
        success: true,;
        portfolio: {
          id: portfolio.id,;
          name: portfolio.name,;
          description: portfolio.description,;
          type: portfolio.type,;
          riskLevel: portfolio.riskLevel,;
          autoTrading: portfolio.autoTrading,;
          totalValue: portfolio.totalValue,;
          cashBalance: portfolio.cashBalance,;
          createdAt: portfolio.createdAt,;
        },;
        message: 'Portfolio created successfully',;
      },;
      { status: 201 }
    );
  } catch (error) {
    console.error('Portfolio creation error:', error);

    // Log the error;
    SecurityAudit.logSecurityEvent({
      type: 'portfolio_management_error',;
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',;
      ip: request.headers.get('x-forwarded-for') || 'unknown',;
      details: {
        action: 'portfolio_creation_failed',;
        error: error instanceof Error ? error.message : 'Unknown error',;
      },;
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        { error: 'Invalid portfolio data', details: error.errors },;
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}
