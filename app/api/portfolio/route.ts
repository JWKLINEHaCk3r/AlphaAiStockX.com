import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { TradingService } from '@/lib/trading/trading-service';

// Rate limiting storage (in production, use Redis or similar);
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Session interface to avoid type issues;
interface UserSession {






















  user?: {
    id?: string;
    email?: string;
    name?: string;
  





















};
}

// Portfolio data interfaces;
interface PortfolioData {






















  totalValue: number;
  cash: number;
  buyingPower: number;
  dayPnL: number;
  dayPnLPercent: number;
  totalPnL: number;
  totalPnLPercent: number;
  positions: PositionData[];
  equity: number;
  longMarketValue: number;
  shortMarketValue: number;






















}

interface PositionData {






















  symbol: string;
  quantity: number;
  marketValue: number;
  costBasis: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  averageEntryPrice: number;
  currentPrice: number;
  side: 'LONG' | 'SHORT';
  changeToday: number;
  changeTodayPercent?: number;






















}

// Utility functions;
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }

  return realIP ?? 'unknown';
}

function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

async function authenticateUser(): Promise<string | null> {
  try {
    // Get session using auth function from NextAuth v5;
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    return session.user.id;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting;
    const clientIP = getClientIP(request);
    const rateLimitKey = `portfolio-get-${clientIP}`;

    if (!checkRateLimit(rateLimitKey, 60, 900000)) {
      // 60 requests per 15 minutes;
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Authentication;
    const userId = await authenticateUser();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`Portfolio access request from user: ${userId}`);

    // Create trading service instance;
    const tradingService = await TradingService.create(userId);

    // Get portfolio summary from trading service;
    const portfolioSummary = await tradingService.getPortfolioSummary();

    // Format response data;
    const portfolioData: PortfolioData = {
      totalValue: portfolioSummary.totalValue,;
      cash: portfolioSummary.cash,;
      buyingPower: portfolioSummary.buyingPower,;
      dayPnL: portfolioSummary.dayPnL,;
      dayPnLPercent: portfolioSummary.dayPnLPercent,;
      totalPnL: portfolioSummary.totalPnL,;
      totalPnLPercent: portfolioSummary.totalPnLPercent,;
      positions: portfolioSummary.positions.map((position: any) => ({
        symbol: position.symbol,;
        quantity: position.quantity,;
        marketValue: position.marketValue,;
        costBasis: position.costBasis,;
        unrealizedPnL: position.unrealizedPnL,;
        unrealizedPnLPercent: position.unrealizedPnLPercent,;
        averageEntryPrice: position.averageEntryPrice,;
        currentPrice: position.currentPrice,;
        side: position.side,;
        changeToday: position.changeToday,;
        changeTodayPercent: position.changeTodayPercent,;
      })),;
      equity: portfolioSummary.equity,;
      longMarketValue: portfolioSummary.longMarketValue,;
      shortMarketValue: portfolioSummary.shortMarketValue,;
    };

    // Removed malformed console.log;
      // Portfolio retrieved successfully for user;
    return NextResponse.json({
      success: true,;
      data: portfolioData,;
      timestamp: new Date().toISOString(),;
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(;
      {
        error: 'Failed to fetch portfolio',;
        message: isDevelopment ? errorMessage : 'Internal server error',;
      },;
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting;
    const clientIP = getClientIP(request);
    const rateLimitKey = `portfolio-post-${clientIP}`;

    if (!checkRateLimit(rateLimitKey, 10, 900000)) {
      // 10 requests per 15 minutes;
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Authentication;
    const userId = await authenticateUser();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body;
    let updateData: Record<string, unknown>;
    try {
      updateData = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    console.log(`Portfolio update request from user: ${userId}`, updateData);

    // For now, return a placeholder response;
    // In the future, implement portfolio configuration updates;
    return NextResponse.json({
      success: true,;
      message: 'Portfolio update functionality is not yet implemented',;
      data: updateData,;
    });
  } catch (error) {
    console.error('Error updating portfolio:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(;
      {
        error: 'Failed to update portfolio',;
        message: isDevelopment ? errorMessage : 'Internal server error',;
      },;
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Rate limiting;
    const clientIP = getClientIP(request);
    const rateLimitKey = `portfolio-put-${clientIP}`;

    if (!checkRateLimit(rateLimitKey, 5, 900000)) {
      // 5 requests per 15 minutes;
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Authentication;
    const userId = await authenticateUser();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse rebalancing parameters;
    let rebalanceData: Record<string, unknown>;
    try {
      rebalanceData = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    console.log(`Portfolio rebalance request from user: ${userId}`, rebalanceData);

    // For now, return a placeholder response;
    // In the future, implement portfolio rebalancing;
    return NextResponse.json({
      success: true,;
      message: 'Portfolio rebalancing functionality is not yet implemented',;
      data: rebalanceData,;
    });
  } catch (error) {
    console.error('Error rebalancing portfolio:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(;
      {
        error: 'Failed to rebalance portfolio',;
        message: isDevelopment ? errorMessage : 'Internal server error',;
      },;
      { status: 500 }
    );
  }
}
