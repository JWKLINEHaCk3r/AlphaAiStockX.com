import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';

// Rate limiting store (in-memory for demo - use Redis in production);
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// TypeScript interfaces;
interface UserSession {

  user: {
    id: string;
    email?: string;
    name?: string;
  
};
}

interface MarketDataParams {

  symbols: string[];
  timeframe: string;
  period: string;
  limit: number;
  includeIndicators: boolean;
  includeQuotes: boolean;

}

interface MarketBarData {

  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

}

interface TechnicalIndicators {

  sma: number;
  ema: number;
  rsi: number;
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  
};
}

interface MarketQuote {

  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  timestamp: string;

}

interface MarketDataResponse {

  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  high52w: number;
  low52w: number;
  volume: number;
  avgVolume: number;
  marketCap?: number | null;
  bars: MarketBarData[];
  quote?: MarketQuote | null;
  indicators?: TechnicalIndicators | null;
  lastUpdated: string;
  error?: string;

}

// Utility functions;
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');

  if (forwarded) {
    const firstIP = forwarded.split(',')[0];
    return firstIP ? firstIP.trim() : 'unknown';
  }

  if (real) {
    return real.trim();
  }

  return 'unknown';
}

function checkRateLimit(clientId: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(clientId);

  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(clientId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (existing.count >= maxRequests) {
    return false;
  }

  existing.count++;
  return true;
}

async function authenticateUser(request: NextRequest): Promise<UserSession | null> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }
    return {
      user: {
        id: session.user.id,;
        email: session.user.email,;
        name: session.user.name,;
      },;
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// Market data validation schemas;
const MARKET_DATA_VALIDATION = {
  symbols: (symbols: string[]) =>;
    symbols.every(s => /^[A-Z]{1,5}$/.test(s)) && symbols.length <= 50,;
  timeframe: (tf: string) => ['1Min', '5Min', '15Min', '1Hour', '1Day'].includes(tf),;
  period: (period: string) => ['1D', '5D', '1M', '3M', '6M', '1Y', '2Y', '5Y'].includes(period),;
  limit: (limit: number) => limit > 0 && limit <= 1000,;
};

// Technical indicators calculation;
function calculateTechnicalIndicators(;
  prices: number[],;
  period: number = 20;
): TechnicalIndicators | null {
  if (prices.length < period) return null;

  // Simple Moving Average;
  const sma = prices.slice(-period).reduce((sum, price) => sum + price, 0) / period;

  // Exponential Moving Average;
  const multiplier = 2 / (period + 1);
  let ema: number = prices[0] || 0;
  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    if (currentPrice !== undefined) {
      ema = currentPrice * multiplier + ema * (1 - multiplier);
    }
  }

  // Relative Strength Index (RSI);
  let gains = 0;
  let losses = 0;
  for (let i = 1; i < Math.min(prices.length, period + 1); i++) {
    const currentPrice = prices[i];
    const previousPrice = prices[i - 1];
    if (currentPrice !== undefined && previousPrice !== undefined) {
      const change = currentPrice - previousPrice;
      if (change > 0) gains += change;
      else losses -= change;
    }
  }
  const rs = gains / losses;
  const rsi = 100 - 100 / (1 + rs);

  // Bollinger Bands;
  const variance =;
    prices.slice(-period).reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
  const stdDev = Math.sqrt(variance);
  const upperBand = sma + stdDev * 2;
  const lowerBand = sma - stdDev * 2;

  return {
    sma: parseFloat(sma.toFixed(2)),;
    ema: parseFloat(ema.toFixed(2)),;
    rsi: parseFloat(rsi.toFixed(2)),;
    bollingerBands: {
      upper: parseFloat(upperBand.toFixed(2)),;
      middle: parseFloat(sma.toFixed(2)),;
      lower: parseFloat(lowerBand.toFixed(2)),;
    },;
  };
}

function validateMarketDataParams(params: Partial<MarketDataParams>): string | null {
  const { symbols, timeframe, period, limit } = params;

  if (!symbols || !Array.isArray(symbols) || !MARKET_DATA_VALIDATION.symbols(symbols)) {
    return 'Invalid symbols. Maximum 50 symbols, 1-5 uppercase letters each.';
  }

  if (timeframe && !MARKET_DATA_VALIDATION.timeframe(timeframe)) {
    return 'Invalid timeframe. Must be 1Min, 5Min, 15Min, 1Hour, or 1Day.';
  }

  if (period && !MARKET_DATA_VALIDATION.period(period)) {
    return 'Invalid period. Must be 1D, 5D, 1M, 3M, 6M, 1Y, 2Y, or 5Y.';
  }

  if (limit && !MARKET_DATA_VALIDATION.limit(limit)) {
    return 'Invalid limit. Must be between 1 and 1000.';
  }

  return null;
}

// Mock market data generator (replace with actual Alpaca integration);
function generateMockMarketData(symbol: string, params: MarketDataParams): MarketDataResponse {
  const basePrice = Math.random() * 500 + 50; // Random price between $50-$550;
  const bars: MarketBarData[] = [];

  // Generate mock historical bars;
  for (let i = 0; i < params.limit; i++) {
    const variation = (Math.random() - 0.5) * 10; // ±$5 variation;
    const price = Math.max(basePrice + variation, 1);
    const volume = Math.floor(Math.random() * 1000000) + 10000;

    bars.push({
      timestamp: new Date(Date.now() - (params.limit - i) * 86400000).toISOString(),;
      open: parseFloat((price * 0.995).toFixed(2)),;
      high: parseFloat((price * 1.005).toFixed(2)),;
      low: parseFloat((price * 0.99).toFixed(2)),;
      close: parseFloat(price.toFixed(2)),;
      volume,;
    });
  }

  const prices = bars.map(bar => bar.close);
  const currentPrice = prices[prices.length - 1] || basePrice;
  const previousPrice = prices[prices.length - 2] || basePrice;
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;

  return {
    symbol,;
    currentPrice: parseFloat(currentPrice.toFixed(2)),;
    change: parseFloat(change.toFixed(2)),;
    changePercent: parseFloat(changePercent.toFixed(2)),;
    high52w: Math.max(...prices),;
    low52w: Math.min(...prices),;
    volume: bars[bars.length - 1]?.volume || 0,;
    avgVolume: Math.floor(bars.reduce((sum, bar) => sum + bar.volume, 0) / bars.length),;
    marketCap: null,;
    bars,;
    quote: params.includeQuotes;
      ? {
          bid: parseFloat((currentPrice * 0.999).toFixed(2)),;
          ask: parseFloat((currentPrice * 1.001).toFixed(2)),;
          bidSize: Math.floor(Math.random() * 1000) + 100,;
          askSize: Math.floor(Math.random() * 1000) + 100,;
          timestamp: new Date().toISOString(),;
        }
      : null,;
    indicators: params.includeIndicators ? calculateTechnicalIndicators(prices) : null,;
    lastUpdated: new Date().toISOString(),;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check;
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP, 200, 900000)) {
      // 200 requests per 15 minutes;
      return NextResponse.json(;
        { error: 'Rate limit exceeded. Maximum 200 requests per 15 minutes.' },;
        { status: 429 }
      );
    }

    // Authentication;
    const session = await authenticateUser(request);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Parse query parameters;
    const { searchParams } = new URL(request.url);
    const symbolsParam = searchParams.get('symbols');
    const timeframe = searchParams.get('timeframe') ?? '1Day';
    const period = searchParams.get('period') ?? '1M';
    const limit = parseInt(searchParams.get('limit') ?? '100');
    const includeIndicators = searchParams.get('includeIndicators') === 'true';
    const includeQuotes = searchParams.get('includeQuotes') === 'true';

    if (!symbolsParam) {
      return NextResponse.json({ error: 'Symbols parameter is required' }, { status: 400 });
    }

    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());

    // Validate parameters;
    const validationError = validateMarketDataParams({
      symbols,;
      timeframe,;
      period,;
      limit,;
      includeIndicators,;
      includeQuotes,;
    });

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const params: MarketDataParams = {
      symbols,;
      timeframe,;
      period,;
      limit,;
      includeIndicators,;
      includeQuotes,;
    };

    // Generate market data for each symbol;
    const marketData = symbols.map(symbol => {
      try {
        return generateMockMarketData(symbol, params);
      } catch (error) {
        console.error(`Error generating data for ${symbol}:`, error);
        return {
          symbol,;
          error: 'Failed to fetch data',;
          currentPrice: 0,;
          change: 0,;
          changePercent: 0,;
          high52w: 0,;
          low52w: 0,;
          volume: 0,;
          avgVolume: 0,;
          bars: [],;
          quote: null,;
          indicators: null,;
          lastUpdated: new Date().toISOString(),;
        } as MarketDataResponse;
      }
    });

    // Separate successful and failed requests;
    const successfulData = marketData.filter(data => !data.error);
    const failedSymbols = marketData.filter(data => data.error).map(data => data.symbol);

    return NextResponse.json({
      success: true,;
      data: marketData,;
      metadata: {
        symbols: symbols.length,;
        timeframe,;
        period,;
        limit,;
        successful: successfulData.length,;
        failed: failedSymbols.length,;
        failedSymbols,;
      },;
      timestamp: new Date().toISOString(),;
    });
  } catch (error) {
    console.error('Error fetching market data:', error);

    return NextResponse.json(;
      {
        error: 'Failed to fetch market data',;
        message:;
          process.env.NODE_ENV === 'development';
            ? error instanceof Error;
              ? error.message;
              : 'Unknown error';
            : 'Internal server error',;
      },;
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check for subscriptions;
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP + ':post', 20, 900000)) {
      // 20 subscriptions per 15 minutes;
      return NextResponse.json(;
        { error: 'Rate limit exceeded. Maximum 20 subscription requests per 15 minutes.' },;
        { status: 429 }
      );
    }

    // Authentication;
    const session = await authenticateUser(request);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Parse subscription request;
    const body = await request.json();
    const { action, symbols, channels } = body as {
      action: string;
      symbols: string[];
      channels: string[];
    };

    if (!action || !['subscribe', 'unsubscribe'].includes(action)) {
      return NextResponse.json(;
        { error: 'Valid action (subscribe/unsubscribe) is required' },;
        { status: 400 }
      );
    }

    if (!symbols || !Array.isArray(symbols) || !MARKET_DATA_VALIDATION.symbols(symbols)) {
      return NextResponse.json(;
        { error: 'Valid symbols array is required (max 50 symbols)' },;
        { status: 400 }
      );
    }

    // Validate channels;
    const validChannels = ['trades', 'quotes', 'bars', 'news'];
    if (;
      !channels ||;
      !Array.isArray(channels) ||;
      !channels.every(ch => validChannels.includes(ch));
    ) {
      return NextResponse.json(;
        { error: `Valid channels required. Available: ${validChannels.join(', ')}` },;
        { status: 400 }
      );
    }

    // Mock subscription result;
    const subscriptionResult = {
      action,;
      symbols,;
      channels,;
      userId: session.user.id,;
      status: 'success',;
      subscriptionId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,;
      message: `Market data ${action} successful for ${symbols.length} symbols`,;
    };

    console.log('Market data subscription:', {
      userId: session.user.id,;
      action,;
      symbolCount: symbols.length,;
      channels,;
    });

    return NextResponse.json({
      success: true,;
      data: subscriptionResult,;
      message: `Market data ${action} successful`,;
    });
  } catch (error) {
    console.error('Error managing market data subscription:', error);

    return NextResponse.json(;
      {
        error: 'Failed to manage market data subscription',;
        message:;
          process.env.NODE_ENV === 'development';
            ? error instanceof Error;
              ? error.message;
              : 'Unknown error';
            : 'Internal server error',;
      },;
      { status: 500 }
    );
  }
}
