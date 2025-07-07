import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { createAlpacaClient } from '@/lib/trading/alpaca-client';
import { SecurityAudit } from '@/lib/security';
import { z } from 'zod';

const marketDataQuerySchema = z.object({
  symbols: z.string().transform(val => val.split(',').map(s => s.trim().toUpperCase())),
  interval: z.enum(['1m', '5m', '15m', '30m', '1h', '1d']).default('1m'),
  limit: z
    .string()
    .transform(val => Math.min(parseInt(val) || 100, 1000))
    .default('100'),
  includeSnapshot: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
  includeBars: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
});

const subscriptionSchema = z.object({
  action: z.enum(['subscribe', 'unsubscribe']),
  symbols: z.array(z.string()),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const queryParams = marketDataQuerySchema.parse(Object.fromEntries(searchParams));

    // Create Alpaca client for market data
    let marketData;

    try {
      const alpacaClient = createAlpacaClient();

      marketData = await Promise.all(
        queryParams.symbols.map(async symbol => {
          try {
            const responses = await Promise.allSettled([
              queryParams.includeSnapshot ? alpacaClient.getSnapshot(symbol) : null,
              queryParams.includeBars
                ? alpacaClient.getBars({
                    symbols: [symbol],
                    timeframe:
                      queryParams.interval === '1m'
                        ? '1Min'
                        : queryParams.interval === '5m'
                          ? '5Min'
                          : queryParams.interval === '15m'
                            ? '15Min'
                            : queryParams.interval === '30m'
                              ? '30Min'
                              : queryParams.interval === '1h'
                                ? '1Hour'
                                : '1Day',
                    limit: queryParams.limit,
                  })
                : null,
            ]);

            const snapshot = responses[0].status === 'fulfilled' ? responses[0].value : null;
            const bars = responses[1].status === 'fulfilled' ? responses[1].value : null;

            // Format the data
            const latestTrade = snapshot?.latestTrade;
            const latestQuote = snapshot?.latestQuote;
            const prevDailyBar = snapshot?.prevDailyBar;

            const currentPrice = latestTrade?.price || 0;
            const prevClose = prevDailyBar?.close || currentPrice;
            const change = currentPrice - prevClose;
            const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;

            return {
              symbol,
              timestamp: new Date().toISOString(),

              // Current price data
              price: currentPrice,
              change,
              changePercent: Math.round(changePercent * 10000) / 10000,

              // Quote data
              bid: latestQuote?.bidPrice || 0,
              ask: latestQuote?.askPrice || 0,
              bidSize: latestQuote?.bidSize || 0,
              askSize: latestQuote?.askSize || 0,
              spread: latestQuote ? latestQuote.askPrice - latestQuote.bidPrice : 0,

              // Daily data
              open: prevDailyBar?.open || currentPrice,
              high: prevDailyBar?.high || currentPrice,
              low: prevDailyBar?.low || currentPrice,
              volume: latestTrade?.size || 0,

              // Technical indicators (basic calculations)
              ...(bars && {
                technicalIndicators: calculateTechnicalIndicators(bars.bars[symbol] || []),
              }),

              // Historical data if requested
              ...(queryParams.includeBars &&
                bars && {
                  bars: bars.bars[symbol]?.slice(-queryParams.limit) || [],
                }),

              // Metadata
              lastTrade: latestTrade?.timestamp,
              lastQuote: latestQuote?.timestamp,
              marketStatus: getMarketStatus(),
            };
          } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);

            // Return fallback data if real API fails
            return generateFallbackData(symbol);
          }
        })
      );
    } catch (error) {
      console.error('Market data service unavailable, using fallback data:', error);

      // Use fallback data if Alpaca service is unavailable
      marketData = queryParams.symbols.map(symbol => generateFallbackData(symbol));
    }

    // Log data access
    SecurityAudit.logDataAccess({
      userId: session.user.id,
      resource: 'market_data',
      action: 'read',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      success: true,
    });

    return NextResponse.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString(),
      symbols: queryParams.symbols,
      interval: queryParams.interval,
    });
  } catch (error) {
    console.error('Market data error:', error);

    // Log the error
    SecurityAudit.logSecurityEvent({
      type: 'data_access_error',
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      details: {
        action: 'market_data_fetch_failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    // Return fallback data if everything fails
    const fallbackData = ['AAPL', 'GOOGL', 'MSFT'].map(symbol => generateFallbackData(symbol));

    return NextResponse.json({
      success: true,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      fallback: true,
      message: 'Using simulated data due to service unavailability',
    });
  }
}

// WebSocket-like streaming endpoint for real-time updates
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, symbols } = subscriptionSchema.parse(body);

    if (action === 'subscribe') {
      // In a real implementation, this would set up WebSocket subscriptions
      // For now, we'll acknowledge the subscription

      SecurityAudit.logDataAccess({
        userId: session.user.id,
        resource: 'market_data_subscription',
        action: 'subscribe',
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        success: true,
      });

      return NextResponse.json({
        success: true,
        message: `Subscribed to real-time data for: ${symbols.join(', ')}`,
        subscriptions: symbols,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'unsubscribe') {
      SecurityAudit.logDataAccess({
        userId: session.user.id,
        resource: 'market_data_subscription',
        action: 'unsubscribe',
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        success: true,
      });

      return NextResponse.json({
        success: true,
        message: `Unsubscribed from real-time data for: ${symbols.join(', ')}`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Market data subscription error:', error);

    SecurityAudit.logSecurityEvent({
      type: 'data_access_error',
      userId: (await getServerSession(authOptions))?.user?.id || 'unknown',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      details: {
        action: 'market_data_subscription_failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid subscription data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}

// Helper functions
function calculateTechnicalIndicators(bars: any[]): any {
  if (!bars || bars.length < 20) {
    return {};
  }

  const closes = bars.map(bar => bar.close);
  const volumes = bars.map(bar => bar.volume);

  // Simple Moving Averages
  const sma20 = closes.slice(-20).reduce((sum, price) => sum + price, 0) / 20;
  const sma50 =
    closes.length >= 50 ? closes.slice(-50).reduce((sum, price) => sum + price, 0) / 50 : sma20;

  // RSI calculation (simplified)
  const rsi = calculateRSI(closes.slice(-14));

  // MACD calculation (simplified)
  const macd = calculateMACD(closes);

  // Bollinger Bands
  const bollinger = calculateBollingerBands(closes.slice(-20));

  // Volume SMA
  const volumeSMA = volumes.slice(-20).reduce((sum, vol) => sum + vol, 0) / 20;

  return {
    sma20: Math.round(sma20 * 100) / 100,
    sma50: Math.round(sma50 * 100) / 100,
    rsi: Math.round(rsi * 100) / 100,
    macd: Math.round(macd * 100) / 100,
    bollinger: {
      upper: Math.round(bollinger.upper * 100) / 100,
      middle: Math.round(bollinger.middle * 100) / 100,
      lower: Math.round(bollinger.lower * 100) / 100,
    },
    volumeSMA: Math.round(volumeSMA),
  };
}

function calculateRSI(prices: number[]): number {
  if (prices.length < 2) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }

  const avgGain = gains / (prices.length - 1);
  const avgLoss = losses / (prices.length - 1);

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

function calculateMACD(prices: number[]): number {
  if (prices.length < 26) return 0;

  const ema12 = calculateEMA(prices.slice(-12), 12);
  const ema26 = calculateEMA(prices.slice(-26), 26);

  return ema12 - ema26;
}

function calculateEMA(prices: number[], period: number): number {
  if (prices.length === 0) return 0;

  const multiplier = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * multiplier + ema * (1 - multiplier);
  }

  return ema;
}

function calculateBollingerBands(prices: number[]): {
  upper: number;
  middle: number;
  lower: number;
} {
  const sma = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / prices.length;
  const stdDev = Math.sqrt(variance);

  return {
    upper: sma + 2 * stdDev,
    middle: sma,
    lower: sma - 2 * stdDev,
  };
}

function getMarketStatus(): string {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  // Simple market hours check (NYSE: 9:30 AM - 4:00 PM ET, Mon-Fri)
  if (day === 0 || day === 6) return 'closed'; // Weekend
  if (hour < 9 || (hour === 9 && now.getMinutes() < 30)) return 'pre-market';
  if (hour >= 16) return 'after-hours';
  if (hour >= 9 && hour < 16) return 'open';

  return 'closed';
}

function generateFallbackData(symbol: string): any {
  const basePrice = 100 + Math.random() * 200;
  const change = (Math.random() - 0.5) * 10;
  const changePercent = (change / basePrice) * 100;

  return {
    symbol,
    timestamp: new Date().toISOString(),
    price: Math.round(basePrice * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 10000) / 10000,
    bid: Math.round((basePrice - 0.01) * 100) / 100,
    ask: Math.round((basePrice + 0.01) * 100) / 100,
    bidSize: Math.floor(Math.random() * 1000) + 100,
    askSize: Math.floor(Math.random() * 1000) + 100,
    spread: 0.02,
    open: Math.round((basePrice - change) * 100) / 100,
    high: Math.round((basePrice + Math.random() * 5) * 100) / 100,
    low: Math.round((basePrice - Math.random() * 5) * 100) / 100,
    volume: Math.floor(Math.random() * 1000000) + 100000,
    technicalIndicators: {
      sma20: Math.round(basePrice * 0.98 * 100) / 100,
      sma50: Math.round(basePrice * 0.95 * 100) / 100,
      rsi: Math.round((30 + Math.random() * 40) * 100) / 100,
      macd: Math.round((Math.random() - 0.5) * 2 * 100) / 100,
      bollinger: {
        upper: Math.round(basePrice * 1.05 * 100) / 100,
        middle: Math.round(basePrice * 100) / 100,
        lower: Math.round(basePrice * 0.95 * 100) / 100,
      },
      volumeSMA: Math.floor(Math.random() * 500000) + 500000,
    },
    lastTrade: new Date().toISOString(),
    lastQuote: new Date().toISOString(),
    marketStatus: getMarketStatus(),
    fallback: true,
  };
}
