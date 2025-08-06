import { NextRequest, NextResponse } from 'next/server'

// Mock stock data - replace with real API integration
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.25, change: 2.15, changePercent: 1.24 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.30, changePercent: -0.55 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.95, change: 8.75, changePercent: 2.12 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.60, change: 12.40, changePercent: 5.31 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.25, change: -22.15, changePercent: -0.65 },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const limit = searchParams.get('limit')

  try {
    if (symbol) {
      const stock = mockStocks.find(s => s.symbol.toLowerCase() === symbol.toLowerCase())
      if (!stock) {
        return NextResponse.json({ error: 'Stock not found' }, { status: 404 })
      }
      return NextResponse.json(stock)
    }

    const limitNum = limit ? parseInt(limit) : mockStocks.length
    const stocks = mockStocks.slice(0, limitNum)

    return NextResponse.json({
      stocks,
      total: mockStocks.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stocks' },
      { status: 500 }
    )
  }
}
