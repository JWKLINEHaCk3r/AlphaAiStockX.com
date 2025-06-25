// AI Auto-Trader Service (Demo)
// This service simulates an AI-driven auto-trader using live stock data APIs and user settings.
// Replace mock logic with real API calls and trading logic for production.

import axios from 'axios'; // Uncomment and configure for real API use

// Add support for real data providers (Alpha Vantage, IEX Cloud, Polygon.io)
// You can set your API key here for future upgrades
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || '';
const IEX_CLOUD_API_KEY = process.env.IEX_CLOUD_API_KEY || '';
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || '';
const ALPACA_API_KEY = process.env.ALPACA_API_KEY || 'your_alpaca_api_key';
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET || 'your_alpaca_api_secret';

export type Trade = {
  symbol: string;
  action: 'buy' | 'sell';
  price: number;
  shares: number;
  time: string;
  reason: string;
};

export type Portfolio = {
  cash: number;
  holdings: Record<string, { shares: number; avgPrice: number }>;
  trades: Trade[];
};

export class AIAutoTrader {
  portfolio: Portfolio;
  constructor(startingCash = 10000) {
    this.portfolio = {
      cash: startingCash,
      holdings: {},
      trades: [],
    };
  }

  async fetchPrice(_symbol: string): Promise<number> {
    // Try Alpha Vantage
    if (ALPHA_VANTAGE_API_KEY) {
      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${_symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const response = await axios.get(url);
        const price = parseFloat(response.data['Global Quote']['05. price']);
        if (!isNaN(price)) return price;
      } catch (err) {
        // Ignore and try next provider
      }
    }
    // Try IEX Cloud
    if (IEX_CLOUD_API_KEY) {
      try {
        const url = `https://cloud.iexapis.com/stable/stock/${_symbol}/quote?token=${IEX_CLOUD_API_KEY}`;
        const response = await axios.get(url);
        const price = response.data.latestPrice;
        if (typeof price === 'number') return price;
      } catch (err) {
        // Ignore and try next provider
      }
    }
    // Try Polygon.io
    if (POLYGON_API_KEY) {
      try {
        const url = `https://api.polygon.io/v1/last/stocks/${_symbol}?apiKey=${POLYGON_API_KEY}`;
        const response = await axios.get(url);
        const price = response.data.last.price;
        if (typeof price === 'number') return price;
      } catch (err) {
        // Ignore and fallback
      }
    }
    // Try Alpaca
    if (ALPACA_API_KEY && ALPACA_API_SECRET) {
      try {
        const url = `https://data.alpaca.markets/v2/stocks/${_symbol}/trades/latest`;
        const response = await axios.get(url, {
          headers: {
            'APCA-API-KEY-ID': ALPACA_API_KEY,
            'APCA-API-SECRET-KEY': ALPACA_API_SECRET,
          },
        });
        const price = response.data.trade?.p;
        if (typeof price === 'number') return price;
      } catch (err) {
        // Ignore and fallback
      }
    }
    // Fallback: Demo random price
    return 100 + Math.random() * 100;
  }

  async decideAndTrade(symbol: string) {
    const price = await this.fetchPrice(symbol);
    // Simple AI: Buy if not owned, sell if owned and price is up
    const holding = this.portfolio.holdings[symbol];
    if (!holding) {
      // Buy
      const shares = Math.floor(this.portfolio.cash / price / 2);
      if (shares > 0) {
        this.portfolio.cash -= shares * price;
        this.portfolio.holdings[symbol] = { shares, avgPrice: price };
        this.portfolio.trades.push({
          symbol,
          action: 'buy',
          price,
          shares,
          time: new Date().toISOString(),
          reason: 'AI: New opportunity detected.',
        });
      }
    } else if (price > holding.avgPrice * 1.05) {
      // Sell
      this.portfolio.cash += holding.shares * price;
      this.portfolio.trades.push({
        symbol,
        action: 'sell',
        price,
        shares: holding.shares,
        time: new Date().toISOString(),
        reason: 'AI: Target profit reached.',
      });
      delete this.portfolio.holdings[symbol];
    }
  }

  getPortfolio() {
    return this.portfolio;
  }
}

export async function getIEXCloudPrice({ symbol }: { symbol: string }): Promise<number> {
  if (!IEX_CLOUD_API_KEY) throw new Error('Missing IEX_CLOUD_API_KEY');
  const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`;
  const response = await axios.get(url);
  if (typeof response.data.latestPrice !== 'number') {
    throw new Error('Invalid response from IEX Cloud');
  }
  return response.data.latestPrice;
}
