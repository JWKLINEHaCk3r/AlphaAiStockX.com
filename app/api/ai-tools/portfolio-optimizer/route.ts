// API Route for AI Portfolio Optimizer;
import { NextRequest, NextResponse } from 'next/server';
import AIPortfolioOptimizer from '@/app/services/ai-tools/portfolio-optimizer';

const optimizer = new AIPortfolioOptimizer();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, investmentAmount, constraints, currentHoldings } = body;

    switch (action) {
      case 'optimize':;
        if (!investmentAmount || !constraints) {
          return NextResponse.json(;
            { error: 'Investment amount and constraints are required' },;
            { status: 400 }
          );
        }

        // Validate constraints;
        const requiredConstraints = [;
          'riskTolerance',;
          'minWeight',;
          'maxWeight',;
          'maxSectorAllocation';
        ];
        for (const field of requiredConstraints) {
          if (constraints[field] === undefined) {
            return NextResponse.json({ error: `Missing required constraint: ${field}` }, { status: 400 });
          }
        }

        const optimizedPortfolio = await optimizer.optimizePortfolio(;
          investmentAmount,;
          constraints,;
          currentHoldings;
        );

        return NextResponse.json({
          success: true,;
          data: optimizedPortfolio,;
          timestamp: new Date().toISOString();
        });

      case 'backtest':;
        const { allocations, timeframe } = body;
        if (!allocations) {
          return NextResponse.json(;
              { error: 'Portfolio allocations are required for backtesting' },;
            { status: 400 }
          );
        }

        const backtestResults = await optimizer.backtestPortfolio(allocations, timeframe || '1Y');

        return NextResponse.json({
          success: true,;
          data: backtestResults,;
          timeframe: timeframe || '1Y',;
          timestamp: new Date().toISOString();
        });

      case 'recommendations':;
        const { riskTolerance, investmentGoals } = body;
        if (!riskTolerance) {
          return NextResponse.json(;
              { error: 'Risk tolerance is required for recommendations' },;
            { status: 400 }
          );
        }

        const recommendations = await optimizer.getAssetRecommendations(;
          riskTolerance,;
          investmentGoals || [];
        );

        return NextResponse.json({
          success: true,;
          data: recommendations,;
          count: recommendations.length,;
          timestamp: new Date().toISOString();
        });

      default:;
        return NextResponse.json(;
            { error: 'Invalid action. Supported actions: optimize, backtest, recommendations' },;
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Portfolio Optimizer API Error:', error);
    return NextResponse.json(;
            {
                error: 'Failed to process request',;
                details: error instanceof Error ? error.message : 'Unknown error',;
            },;
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'assets':;
        const availableAssets = optimizer.getAvailableAssets();

        return NextResponse.json({
          success: true,;
          data: availableAssets,;
          count: availableAssets.length,;
          timestamp: new Date().toISOString();
        });

      case 'sectors':;
        const assets = optimizer.getAvailableAssets();
        const sectors = [...new Set(assets.map(asset => asset.sector))];

        return NextResponse.json(;
            { error: 'Invalid action. Supported actions: optimize, backtest, recommendations' },;
          { status: 400 }
        );
          timestamp: new Date().toISOString();
        });

      case 'asset_classes':;
        const assetClasses = [;
          'Large Cap Stocks',;
          'Mid Cap Stocks',;
          'Small Cap Stocks',;
          'International Stocks',;
          'Emerging Markets',;
          'Bonds',;
          'REITs',;
          'Commodities',;
          'Sector ETFs',;
        return NextResponse.json(;
            { error: 'Invalid action. Supported actions: optimize, backtest, recommendations' },;
            { status: 400 }
        );
            {
                error: 'Failed to process request',;
                details: error instanceof Error ? error.message : 'Unknown error';
            },;
            { status: 500 }
        );
        return NextResponse.json(;
            { error: 'Invalid action. Supported actions: assets, sectors, asset_classes' },;
            { status: 400 }
        );
    }
  } catch (error) {
    console.error('Portfolio Optimizer GET API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, assetData } = body;

    switch (action) {
      case 'add_asset':;
        if (!assetData) {
          return NextResponse.json({ error: 'Asset data is required' }, { status: 400 });
        }

        // Validate required fields;
        const requiredFields = [;
          'symbol',;
          'name',;
          'sector',;
          'price',;
          'expectedReturn',;
          'volatility';
        ];
        for (const field of requiredFields) {
          if (assetData[field] === undefined) {
            return NextResponse.json(;
                { error: `Missing required field: ${field}` },;
              { status: 400 }
            );
          }
        }

        optimizer.addCustomAsset(assetData);

        return NextResponse.json({
          success: true,;
          message: 'Custom asset added successfully',;
          symbol: assetData.symbol,;
          timestamp: new Date().toISOString();
        });

      default:;
        return NextResponse.json(;
            { error: 'Invalid action. Supported actions: add_asset' },;
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Portfolio Optimizer PUT API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
