import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'AlphaAI StockX API',
    version: '2.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      stocks: '/api/stocks',
      portfolio: '/api/portfolio',
      trading: '/api/trading',
    },
  })
}
