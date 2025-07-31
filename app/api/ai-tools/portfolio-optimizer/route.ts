// API Route for AI Portfolio Optimizer
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, investmentAmount, constraints, currentHoldings } = body;

    switch (action) {
      case 'optimize': {
        if (!investmentAmount || !constraints) {
          return NextResponse.json({ error: 'Investment amount and constraints are required' }, { status: 400 });
        }
        // Validate constraints
        const requiredConstraints = [
          'riskTolerance',
          'minWeight',
          'maxWeight',
          'maxSectorAllocation'
        ];
        for (const field of requiredConstraints) {
          if (constraints[field] === undefined) {
            return NextResponse.json({ error: `Missing required constraint: ${field}` }, { status: 400 });
          }
        }
        
        // Mock optimized portfolio
        const optimizedPortfolio = {
          allocations: [
            { symbol: 'AAPL', weight: 0.3, expectedReturn: 0.12 },
            { symbol: 'NVDA', weight: 0.2, expectedReturn: 0.18 },
            { symbol: 'MSFT', weight: 0.25, expectedReturn: 0.14 },
            { symbol: 'TSLA', weight: 0.15, expectedReturn: 0.22 },
            { symbol: 'BONDS', weight: 0.1, expectedReturn: 0.05 }
          ],
          expectedReturn: 0.142,
          risk: 0.18,
          sharpeRatio: 0.78
        };

        return NextResponse.json({
          success: true,
          data: optimizedPortfolio,
          timestamp: new Date().toISOString()
        });
      }
      case 'backtest': {
        const { allocations, timeframe } = body;
        if (!allocations) {
          return NextResponse.json({ error: 'Portfolio allocations are required for backtesting' }, { status: 400 });
        }
        
        // Mock backtest results
        const backtestResults = {
          totalReturn: 0.234,
          annualizedReturn: 0.145,
          volatility: 0.18,
          sharpeRatio: 0.81,
          maxDrawdown: -0.12,
          winRate: 0.68
        };

        return NextResponse.json({
          success: true,
          data: backtestResults,
          timeframe: timeframe || '1Y',
          timestamp: new Date().toISOString()
        });
      }
      case 'recommendations': {
        const { riskTolerance, investmentGoals } = body;
        if (!riskTolerance) {
          return NextResponse.json({ error: 'Risk tolerance is required for recommendations' }, { status: 400 });
        }
        
        // Mock recommendations
        const recommendations = [
          { symbol: 'AAPL', reason: 'Strong fundamentals', score: 95 },
          { symbol: 'NVDA', reason: 'AI growth potential', score: 92 },
          { symbol: 'MSFT', reason: 'Cloud dominance', score: 89 }
        ];

        return NextResponse.json({
          success: true,
          data: recommendations,
          count: recommendations.length,
          timestamp: new Date().toISOString()
        });
      }
      default: {
        return NextResponse.json({ error: 'Invalid action. Supported actions: optimize, backtest, recommendations' }, { status: 400 });
      }
    }
  } catch (error) {
    console.error('Portfolio Optimizer API Error:', error);
    return NextResponse.json({
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'assets': {
        const availableAssets = [
          { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
          { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology' },
          { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
          { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Cyclical' }
        ];
        
        return NextResponse.json({
          success: true,
          data: availableAssets,
          count: availableAssets.length,
          timestamp: new Date().toISOString()
        });
      }
      case 'sectors': {
        const sectors = ['Technology', 'Healthcare', 'Finance', 'Consumer Cyclical', 'Energy'];
        
        return NextResponse.json({
          success: true,
          data: sectors,
          count: sectors.length,
          timestamp: new Date().toISOString()
        });
      }
      case 'asset_classes': {
        const assetClasses = [
          'Large Cap Stocks',
          'Mid Cap Stocks',
          'Small Cap Stocks',
          'International Stocks',
          'Emerging Markets',
          'Bonds',
          'REITs',
          'Commodities',
          'Sector ETFs'
        ];
        
        return NextResponse.json({
          success: true,
          data: assetClasses,
          count: assetClasses.length,
          timestamp: new Date().toISOString()
        });
      }
      default: {
        return NextResponse.json({ error: 'Invalid action. Supported actions: assets, sectors, asset_classes' }, { status: 400 });
      }
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
      case 'add_asset': {
        if (!assetData) {
          return NextResponse.json({ error: 'Asset data is required' }, { status: 400 });
        }
        
        // Validate required fields
        const requiredFields = [
          'symbol',
          'name',
          'sector',
          'price',
          'expectedReturn',
          'volatility'
        ];
        
        for (const field of requiredFields) {
          if (assetData[field] === undefined) {
            return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
          }
        }
        
        return NextResponse.json({
          success: true,
          message: 'Custom asset added successfully',
          symbol: assetData.symbol,
          timestamp: new Date().toISOString()
        });
      }
      default: {
        return NextResponse.json({ error: 'Invalid action. Supported actions: add_asset' }, { status: 400 });
      }
    }
  } catch (error) {
    console.error('Portfolio Optimizer PUT API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
