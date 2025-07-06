import { NextRequest, NextResponse } from 'next/server';

// Mock trading analysis API endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'AAPL';

    // Generate mock stock data for demo purposes
    const stockData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString(),
      price: 150 + Math.random() * 50,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    }));

    // Generate mock recommendation
    const recommendations = ['buy', 'sell', 'hold'];
    const recommendation = {
      action: recommendations[Math.floor(Math.random() * recommendations.length)],
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
      reasons: [
        'Technical indicators show strong momentum',
        'Volume analysis suggests positive sentiment',
        'AI algorithm detected favorable patterns'
      ]
    };

    return NextResponse.json({
      symbol,
      stockData,
      recommendation,
      timestamp: new Date().toISOString(),
      status: 'success'
    });

  } catch (error) {
    console.error('Trading analysis API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze trading data',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
