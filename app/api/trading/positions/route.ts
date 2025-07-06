import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { TradingService } from '@/lib/trading/trading-service';
import { SecurityAudit } from '@/lib/security';
import { z } from 'zod';

const positionsQuerySchema = z.object({
  portfolioId: z.string().optional(),
  symbol: z.string().optional(),
  includeMarketData: z.string().transform((val) => val === 'true').default('true'),
});

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
    const queryParams = positionsQuerySchema.parse(Object.fromEntries(searchParams));

    // Create trading service instance
    const tradingService = await TradingService.create(session.user.id, queryParams.portfolioId);

    if (queryParams.symbol) {
      // Get specific position
      const position = await tradingService.getPosition(queryParams.symbol);
      
      if (!position) {
        return NextResponse.json(
          { error: 'Position not found' },
          { status: 404 }
        );
      }

      // Log data access
      SecurityAudit.logDataAccess({
        userId: session.user.id,
        resource: 'position',
        action: 'read',
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        success: true,
      });

      return NextResponse.json({
        success: true,
        position,
      });
    } else {
      // Get all positions
      const positions = await tradingService.getPositions();

      // Log data access
      SecurityAudit.logDataAccess({
        userId: session.user.id,
        resource: 'positions',
        action: 'read',
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        success: true,
      });

      return NextResponse.json({
        success: true,
        positions,
        count: positions.length,
        totalMarketValue: positions.reduce((sum, pos) => sum + pos.marketValue, 0),
        totalUnrealizedPnL: positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0),
      });
    }

  } catch (error) {
    console.error('Positions fetch error:', error);
    
    // Log the error
    SecurityAudit.logSecurityEvent({
      type: 'data_access_error',
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      details: {
        action: 'positions_fetch_failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('No default portfolio')) {
      return NextResponse.json(
        { error: 'No trading portfolio found. Please create a portfolio first.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
}
