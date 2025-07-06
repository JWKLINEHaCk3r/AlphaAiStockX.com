import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

// Mock market data endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols')?.split(',') || ['AAPL'];
    const interval = searchParams.get('interval') || '1m';
    const limit = parseInt(searchParams.get('limit') || '100');

    const marketData = symbols.map(symbol => {
      const basePrice = 150 + Math.random() * 300;
      const priceHistory = Array.from({ length: limit }, (_, i) => {
        const timestamp = new Date(Date.now() - (limit - i) * 60000);
        const volatility = 0.02;
        const price = basePrice + (Math.random() - 0.5) * basePrice * volatility;
        const volume = Math.floor(Math.random() * 1000000) + 100000;
        
        return {
          timestamp: timestamp.toISOString(),
          open: Math.round(price * 100) / 100,
          high: Math.round(price * 1.01 * 100) / 100,
          low: Math.round(price * 0.99 * 100) / 100,
          close: Math.round(price * 100) / 100,
          volume,
        };
      });

      const currentPrice = priceHistory[priceHistory.length - 1];
      const previousPrice = priceHistory[priceHistory.length - 2];
      const change = currentPrice.close - previousPrice.close;
      const changePercent = (change / previousPrice.close) * 100;

      return {
        symbol,
        price: currentPrice.close,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        volume: currentPrice.volume,
        high52w: Math.round(basePrice * 1.5 * 100) / 100,
        low52w: Math.round(basePrice * 0.5 * 100) / 100,
        marketCap: Math.floor(Math.random() * 2000000000000) + 100000000000,
        bid: Math.round((currentPrice.close - 0.01) * 100) / 100,
        ask: Math.round((currentPrice.close + 0.01) * 100) / 100,
        bidSize: Math.floor(Math.random() * 1000) + 100,
        askSize: Math.floor(Math.random() * 1000) + 100,
        lastTrade: currentPrice.timestamp,
        priceHistory: interval === '1m' ? priceHistory.slice(-50) : priceHistory,
        technicalIndicators: {
          rsi: Math.round((30 + Math.random() * 40) * 100) / 100,
          macd: Math.round((Math.random() - 0.5) * 2 * 100) / 100,
          ema20: Math.round(basePrice * (0.95 + Math.random() * 0.1) * 100) / 100,
          ema50: Math.round(basePrice * (0.9 + Math.random() * 0.2) * 100) / 100,
          bollinger: {
            upper: Math.round(basePrice * 1.05 * 100) / 100,
            middle: Math.round(basePrice * 100) / 100,
            lower: Math.round(basePrice * 0.95 * 100) / 100,
          },
          volume_sma: Math.floor(Math.random() * 500000) + 500000,
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString(),
      interval,
    });

  } catch (error) {
    console.error('Market data error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// WebSocket-like streaming endpoint for real-time updates
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, symbols } = body;

    if (action === 'subscribe') {
      // In a real implementation, this would set up WebSocket subscriptions
      return NextResponse.json({
        success: true,
        message: `Subscribed to real-time data for: ${symbols.join(', ')}`,
        subscriptions: symbols,
      });
    }

    if (action === 'unsubscribe') {
      return NextResponse.json({
        success: true,
        message: `Unsubscribed from real-time data for: ${symbols.join(', ')}`,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Market data subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
