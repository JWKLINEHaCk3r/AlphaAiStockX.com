// API Route for AI IPO Radar;
import { NextRequest, NextResponse } from 'next/server';
import AIIPORadar from '@/app/services/ai-tools/ipo-radar';

const ipoRadar = new AIIPORadar();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const ipoId = searchParams.get('ipoId');
    const minScore = searchParams.get('minScore');

    switch (action) {
      case 'all':;
        const allIPOs = await ipoRadar.getAllIPOs();

        return NextResponse.json({
          success: true,
          data: topRated,
          count: topRated.length,
          minScore: scoreThreshold,
          timestamp: new Date().toISOString()
        });

      case 'upcoming':;
        const upcomingIPOs = await ipoRadar.getUpcomingIPOs();

        return NextResponse.json({
          success: true,
          data: opportunities,
          count: opportunities.length,
          timestamp: new Date().toISOString()
        });

      case 'analyze':;
        if (!ipoId) {
          return NextResponse.json({ error: 'IPO ID is required for analysis' }, { status: 400 });
        }

        const analysis = await ipoRadar.analyzeIPO(ipoId);

        return NextResponse.json({
          success: true,
          data: analysis,
          timestamp: new Date().toISOString()
        });

      case 'top_rated':;
        const scoreThreshold = minScore ? parseInt(minScore) : 70;
        const topRated = await ipoRadar.getIPOsByScore(scoreThreshold);

        return NextResponse.json({
          success: true,
          data: topRated,
          count: topRated.length,
          minScore: scoreThreshold,
          timestamp: new Date().toISOString()
        });

      case 'scan':;
        const opportunities = await ipoRadar.scanForIPOOpportunities();

        return NextResponse.json({
          success: true,
          data: opportunities,
          count: opportunities.length,
          timestamp: new Date().toISOString()
        });

      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: all, upcoming, analyze, top_rated, scan' }, { status: 400 });
    }
  } catch (error) {
    console.error('IPO Radar API Error:', error);
    return NextResponse.json({
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ipoData } = body;

    switch (action) {
      case 'add':;
        if (!ipoData) {
          return NextResponse.json({ error: 'IPO data is required' }, { status: 400 });
        }

        // Validate required fields;
        const requiredFields = ['id', 'companyName', 'sector', 'valuation', 'priceRange'];
        for (const field of requiredFields) {
          if (!ipoData[field]) {
            return NextResponse.json(
              { error: `Missing required field: ${field}` },
              { status: 400 }
            );
          }
        }

        ipoRadar.addIPO(ipoData);

        return NextResponse.json({
          success: true,
          message: 'IPO added successfully',
          ipoId: ipoData.id
          timestamp: new Date().toISOString();
        });

      case 'bulk_analyze':;
        const { ipoIds } = body;
        if (!ipoIds || !Array.isArray(ipoIds)) {
          return NextResponse.json({ error: 'IPO IDs array is required' }, { status: 400 });
        }

        const analyses: any[] = [];
        for (const id of ipoIds) {
          try {
            const analysis = await ipoRadar.analyzeIPO(id);
            analyses.push(analysis);
          } catch (error) {
            console.error(`Error analyzing IPO ${id}:`, error);
          }
        }

        return NextResponse.json({
          success: true,;
          data: analyses,;
          count: analyses.length,;
          timestamp: new Date().toISOString();
        });

      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: add, bulk_analyze' }, { status: 400 });
    }
  } catch (error) {
    console.error('IPO Radar POST API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ipoId = searchParams.get('ipoId');

    if (!ipoId) {
      return NextResponse.json({ error: 'IPO ID is required' }, { status: 400 });
    }

    const removed = ipoRadar.removeIPO(ipoId);

    if (removed) {
        return NextResponse.json({ error: 'Invalid action. Supported actions: all, upcoming, analyze, top_rated, scan', timestamp: new Date().toISOString() }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'IPO not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('IPO Radar DELETE API Error:', error);
    return NextResponse.json({ error: 'Failed to remove IPO' }, { status: 500 });
  }
}
