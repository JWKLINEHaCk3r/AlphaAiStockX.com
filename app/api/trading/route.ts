import { NextRequest, NextResponse } from 'next/server'

// Mock trading endpoints
const mockTradingData = {
  orders: [
    {
      id: 'order_001',
      symbol: 'AAPL',
      side: 'buy',
      quantity: 10,
      price: 175.25,
      status: 'filled',
      timestamp: '2025-08-06T10:30:00Z',
    },
    {
      id: 'order_002',
      symbol: 'MSFT',
      side: 'sell',
      quantity: 5,
      price: 420.95,
      status: 'pending',
      timestamp: '2025-08-06T11:15:00Z',
    },
  ],
  strategies: [
    {
      id: 'strategy_001',
      name: 'AI Momentum Strategy',
      status: 'active',
      performance: '+15.3%',
      trades: 45,
      winRate: '73%',
    },
    {
      id: 'strategy_002',
      name: 'Risk Parity Bot',
      status: 'active',
      performance: '+8.7%',
      trades: 28,
      winRate: '68%',
    },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const orderId = searchParams.get('orderId')

  try {
    if (type === 'orders') {
      if (orderId) {
        const order = mockTradingData.orders.find(o => o.id === orderId)
        if (!order) {
          return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }
        return NextResponse.json(order)
      }
      return NextResponse.json({ orders: mockTradingData.orders })
    }

    if (type === 'strategies') {
      return NextResponse.json({ strategies: mockTradingData.strategies })
    }

    return NextResponse.json(mockTradingData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trading data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, symbol, side, quantity, price, orderType = 'market' } = body

    if (action === 'place_order') {
      const orderId = `order_${Date.now()}`
      const order = {
        id: orderId,
        symbol,
        side,
        quantity,
        price,
        orderType,
        status: 'pending',
        timestamp: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        message: `Order placed successfully`,
        order,
      })
    }

    if (action === 'cancel_order') {
      const { orderId } = body
      return NextResponse.json({
        success: true,
        message: `Order ${orderId} cancelled successfully`,
        orderId,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process trading request' },
      { status: 500 }
    )
  }
}
