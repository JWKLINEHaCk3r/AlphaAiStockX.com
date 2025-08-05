import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // AI models data
    const models = [
      {
        id: 'gpt-trader-v1',
        name: 'GPT Trader v1',
        description: 'Advanced language model for trading decisions',
        accuracy: 94.7,
        available: true
      },
      {
        id: 'quantum-analyst',
        name: 'Quantum Market Analyst',
        description: 'Quantum computing powered market analysis',
        accuracy: 97.2,
        available: true
      },
      {
        id: 'neural-predictor',
        name: 'Neural Price Predictor',
        description: 'Deep learning model for price forecasting',
        accuracy: 89.3,
        available: true
      },
      {
        id: 'sentiment-analyzer',
        name: 'Market Sentiment Analyzer',
        description: 'AI-powered sentiment analysis for market trends',
        accuracy: 91.8,
        available: true
      }
    ];

    return NextResponse.json({
      success: true,
      models,
      total: models.length
    });

  } catch (error) {
    console.error('AI models API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch AI models' },
      { status: 500 }
    );
  }
}
