import { NextRequest, NextResponse } from 'next/server'

// Mock portfolio data
const mockPortfolio = {
  totalValue: 124350.75,
  totalGainLoss: 15642.25,
  totalGainLossPercent: 12.5,
  positions: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 150,
      averagePrice: 165.30,
      currentPrice: 175.25,
      marketValue: 26287.50,
      gainLoss: 1492.50,
      gainLossPercent: 6.02,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 10,
      averagePrice: 2800.00,
      currentPrice: 2750.80,
      marketValue: 27508.00,
      gainLoss: -492.00,
      gainLossPercent: -1.76,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      shares: 75,
      averagePrice: 400.25,
      currentPrice: 420.95,
      marketValue: 31571.25,
      gainLoss: 1552.50,
      gainLossPercent: 5.17,
    },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  try {
    if (symbol) {
      const position = mockPortfolio.positions.find(
        p => p.symbol.toLowerCase() === symbol.toLowerCase()
      )
      if (!position) {
        return NextResponse.json({ error: 'Position not found' }, { status: 404 })
      }
      return NextResponse.json(position)
    }

    return NextResponse.json(mockPortfolio)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, symbol, shares, price } = body

    // Mock portfolio update logic
    if (action === 'buy' || action === 'sell') {
      return NextResponse.json({
        success: true,
        message: `Successfully ${action === 'buy' ? 'bought' : 'sold'} ${shares} shares of ${symbol}`,
        transaction: {
          id: `txn_${Date.now()}`,
          action,
          symbol,
          shares,
          price,
          timestamp: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process portfolio update' },
      { status: 500 }
    )
  }
}
