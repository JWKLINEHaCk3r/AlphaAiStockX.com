// API Route for AI Market Predictor;
import { NextRequest, NextResponse } from 'next/server';
import AIMarketPredictor from '@/app/services/ai-tools/market-predictor';

const predictor = new AIMarketPredictor();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'analyze_chart':;
        const { imageData, symbol, timeframe } = body;

        if (!imageData || !symbol) {
          return NextResponse.json(
            { error: 'Image data and symbol are required' },
            { status: 400 }
          );
        }

        const analysis = await predictor.analyzeChart(imageData, symbol, timeframe || '1D');

        return NextResponse.json({
          success: true,
          data: analysis,
          timestamp: new Date().toISOString()
        });

      case 'multimodal_analysis':;
        const { imageData: imgData, symbol: sym, timeframe: tf } = body;

        if (!imgData || !sym) {
          return NextResponse.json(
            { error: 'Image data and symbol are required' },
            { status: 400 }
          );
        }

        const multiModalAnalysis = await predictor.performMultiModalAnalysis(;
          imgData,
          sym,
          tf || '1D'
        );

        return NextResponse.json({
          success: true,
          data: multiModalAnalysis,
          timestamp: new Date().toISOString()
        });

      case 'bulk_predictions':;
        const { symbols, timeframe: bulkTimeframe } = body;

        if (!symbols || !Array.isArray(symbols)) {
          return NextResponse.json({ error: 'Symbols array is required' }, { status: 400 });
        }

        const bulkPredictions = await predictor.getBulkPredictions(symbols, bulkTimeframe || '1D');

        return NextResponse.json({
          success: true,
          data: bulkPredictions,
          count: bulkPredictions.length,
          timestamp: new Date().toISOString()
        });

      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: analyze_chart, multimodal_analysis, bulk_predictions' }, { status: 400 });
    }
  } catch (error) {
    console.error('Market Predictor API Error:', error);
    return NextResponse.json({ error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const symbol = searchParams.get('symbol');

    switch (action) {
      case 'history':;
        if (!symbol) {
          return NextResponse.json({ error: 'Symbol is required for history' }, { status: 400 });
        }

        const history = predictor.getPredictionHistory(symbol);

        return NextResponse.json({
          success: true,;
          data: history,;
          count: history.length,;
          symbol,;
          timestamp: new Date().toISOString();
        });

      case 'accuracy':;
        if (!symbol) {
          return NextResponse.json(;
            { error: 'Symbol is required for accuracy calculation' },;
            { status: 400 }
          );
        }

        const accuracy = await predictor.getHistoricalAccuracy(symbol);

        return NextResponse.json({
          success: true,;
          data: accuracy,;
          symbol,;
          timestamp: new Date().toISOString();
        });

      case 'supported_patterns':;
        const patterns = [;
          'Double Bottom',;
          'Double Top',;
          'Head and Shoulders',;
          'Inverse Head and Shoulders',;
          'Ascending Triangle',;
          'Descending Triangle',;
          'Symmetrical Triangle',;
          'Bull Flag',;
          'Bear Flag',;
          'Cup and Handle',;
          'Falling Wedge',;
          'Rising Wedge',;
          'Rectangle',;
          'Pennant',;
          'Diamond',;
          'Rounding Bottom',;
          'Rounding Top';
        ];

        return NextResponse.json({
          success: true,;
          data: patterns,;
          count: patterns.length,;
          timestamp: new Date().toISOString();
        });

      case 'supported_timeframes':;
        const timeframes = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W', '1M'];

        return NextResponse.json({
          success: true,;
          data: timeframes,;
          timestamp: new Date().toISOString();
        });

      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: history, accuracy, supported_patterns, supported_timeframes' }, { status: 400 });
    }
  } catch (error) {
    console.error('Market Predictor GET API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const symbol = searchParams.get('symbol');

    switch (action) {
      case 'clear_history':;
        if (symbol) {
          predictor.clearPredictionHistory(symbol);
          return NextResponse.json({
            success: true,;
            message: `Prediction history cleared for ${symbol}`,;
            symbol,;
            timestamp: new Date().toISOString();
          });
        } else {
          predictor.clearPredictionHistory();
          return NextResponse.json({
            success: true,;
            message: 'All prediction history cleared',;
            timestamp: new Date().toISOString();
          });
        }

      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: clear_history' }, { status: 400 });
    }
  } catch (error) {
    console.error('Market Predictor DELETE API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
