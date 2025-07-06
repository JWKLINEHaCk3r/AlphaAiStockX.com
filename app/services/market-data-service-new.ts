import {
  Position,
  TechnicalIndicators,
  VolumeProfile,
  BollingerBands,
  SupportResistance,
  OptimalAllocations,
  RebalanceAction,
} from '../types/trading-types';

// Advanced Market Data Service with Real-time capabilities

export class MarketDataService {
  private static instance: MarketDataService;
  private cache: Map<string, any> = new Map();
  private wsConnections: Map<string, WebSocket> = new Map();

  private getCurrentPrice(symbol: string): number {
    const prices: Record<string, number> = {
      AAPL: 180,
      MSFT: 380,
      GOOGL: 140,
      TSLA: 250,
      NVDA: 500,
      META: 320,
      AMZN: 150,
      SPY: 450,
      QQQ: 380,
      IWM: 200,
    };
    return prices[symbol] || 100 + Math.random() * 300;
  }

  private getMarketCap(symbol: string): number {
    const marketCaps: Record<string, number> = {
      AAPL: 2800000000000,
      MSFT: 2500000000000,
      GOOGL: 1800000000000,
      TSLA: 800000000000,
      NVDA: 1200000000000,
      META: 900000000000,
      AMZN: 1500000000000,
    };
    return marketCaps[symbol] || 50000000000;
  }

  static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService();
    }
    return MarketDataService.instance;
  }

  // Real-time market data simulation (in production, connect to actual APIs)
  async getMarketData(symbol: string) {
    // Simulate real market data with realistic patterns
    const basePrice = this.getBasePrice(symbol);
    const volatility = this.getVolatility(symbol);

    return {
      symbol,
      price: this.generateRealisticPrice(basePrice, volatility),
      volume: this.generateVolume(symbol),
      bid: basePrice * (1 - Math.random() * 0.001),
      ask: basePrice * (1 + Math.random() * 0.001),
      change: (Math.random() - 0.5) * 0.05,
      changePercent: (Math.random() - 0.5) * 5,
      marketCap: this.getMarketCap(symbol),
      pe: 15 + Math.random() * 30,
      eps: Math.random() * 10,
      dividend: Math.random() * 0.05,
      beta: 0.5 + Math.random() * 1.5,
      timestamp: Date.now(),
      technicals: this.calculateTechnicals(symbol),
      fundamentals: this.getFundamentals(symbol),
      sentiment: this.getSentiment(symbol),
      options: this.getOptionsData(symbol),
      news: this.getNewsData(symbol),
    };
  }

  private getBasePrice(symbol: string): number {
    const prices: Record<string, number> = {
      AAPL: 175,
      MSFT: 380,
      GOOGL: 140,
      TSLA: 250,
      NVDA: 500,
      META: 320,
      AMZN: 150,
      SPY: 450,
      QQQ: 380,
      IWM: 200,
    };
    return prices[symbol] || 100 + Math.random() * 300;
  }

  private getVolatility(symbol: string): number {
    const volatilities: Record<string, number> = {
      AAPL: 0.25,
      MSFT: 0.22,
      GOOGL: 0.28,
      TSLA: 0.45,
      NVDA: 0.35,
      META: 0.32,
      AMZN: 0.27,
      SPY: 0.15,
      QQQ: 0.18,
      IWM: 0.25,
    };
    return volatilities[symbol] || 0.25;
  }

  private generateRealisticPrice(basePrice: number, volatility: number): number {
    const dt = 1 / 252 / 24 / 60; // 1 minute intervals
    const drift = 0.05; // 5% annual drift
    const randomShock = (Math.random() - 0.5) * 2;

    return (
      basePrice *
      Math.exp(
        (drift - 0.5 * volatility * volatility) * dt + volatility * Math.sqrt(dt) * randomShock
      )
    );
  }

  private generateVolume(symbol: string): number {
    const avgVolumes: Record<string, number> = {
      AAPL: 50000000,
      MSFT: 30000000,
      GOOGL: 25000000,
      TSLA: 80000000,
      NVDA: 45000000,
      META: 35000000,
      AMZN: 40000000,
      SPY: 100000000,
      QQQ: 60000000,
      IWM: 30000000,
    };
    const baseVolume = avgVolumes[symbol] || 10000000;
    return Math.floor(baseVolume * (0.5 + Math.random()));
  }

  private calculateTechnicals(symbol: string) {
    return {
      rsi: 30 + Math.random() * 40,
      macd: {
        line: (Math.random() - 0.5) * 5,
        signal: (Math.random() - 0.5) * 5,
        histogram: (Math.random() - 0.5) * 2,
      },
      bollinger: {
        upper: this.getBasePrice(symbol) * 1.02,
        middle: this.getBasePrice(symbol),
        lower: this.getBasePrice(symbol) * 0.98,
      },
      stochastic: {
        k: Math.random() * 100,
        d: Math.random() * 100,
      },
      williams: Math.random() * 100 - 50,
      cci: (Math.random() - 0.5) * 200,
      atr: this.getBasePrice(symbol) * 0.02,
      adx: 20 + Math.random() * 60,
      obv: Math.random() * 1000000,
      vwap: this.getBasePrice(symbol) * (0.99 + Math.random() * 0.02),
    };
  }

  private getFundamentals(symbol: string) {
    return {
      revenue: 50000000000 + Math.random() * 200000000000,
      netIncome: 10000000000 + Math.random() * 50000000000,
      totalAssets: 100000000000 + Math.random() * 300000000000,
      totalDebt: 20000000000 + Math.random() * 100000000000,
      freeCashFlow: 15000000000 + Math.random() * 40000000000,
      roe: 0.1 + Math.random() * 0.3,
      roa: 0.05 + Math.random() * 0.15,
      debtToEquity: 0.2 + Math.random() * 0.8,
      currentRatio: 1.0 + Math.random() * 2.0,
      quickRatio: 0.8 + Math.random() * 1.5,
      grossMargin: 0.3 + Math.random() * 0.4,
      operatingMargin: 0.15 + Math.random() * 0.25,
      netMargin: 0.1 + Math.random() * 0.2,
    };
  }

  private getSentiment(symbol: string) {
    return {
      overall: 50 + Math.random() * 50,
      bullish: 40 + Math.random() * 40,
      bearish: 20 + Math.random() * 30,
      neutral: 20 + Math.random() * 20,
      socialMedia: 60 + Math.random() * 40,
      news: 55 + Math.random() * 45,
      analyst: 65 + Math.random() * 35,
      insider: 50 + Math.random() * 50,
      institutional: 70 + Math.random() * 30,
    };
  }

  private getOptionsData(symbol: string) {
    const price = this.getBasePrice(symbol);
    return {
      impliedVolatility: 0.2 + Math.random() * 0.4,
      putCallRatio: 0.5 + Math.random() * 1.0,
      maxPain: price * (0.98 + Math.random() * 0.04),
      gamma: Math.random() * 0.1,
      delta: 0.3 + Math.random() * 0.4,
      theta: -Math.random() * 0.1,
      vega: Math.random() * 0.3,
      openInterest: Math.floor(Math.random() * 100000),
      volume: Math.floor(Math.random() * 50000),
      unusualActivity: Math.random() > 0.8,
    };
  }

  private getNewsData(symbol: string) {
    const newsItems = [
      { headline: `${symbol} reports strong quarterly earnings`, sentiment: 0.8, impact: 'high' },
      { headline: `Analysts upgrade ${symbol} price target`, sentiment: 0.7, impact: 'medium' },
      { headline: `${symbol} announces new product launch`, sentiment: 0.6, impact: 'medium' },
      { headline: `Market volatility affects ${symbol} trading`, sentiment: 0.3, impact: 'low' },
      { headline: `${symbol} insider trading activity detected`, sentiment: 0.4, impact: 'medium' },
    ];

    return newsItems.slice(0, Math.floor(Math.random() * 3) + 1).map((item: any) => ({
      ...item,
      timestamp: Date.now() - Math.random() * 86400000,
      source: ['Reuters', 'Bloomberg', 'CNBC', 'MarketWatch'][Math.floor(Math.random() * 4)],
    }));
  }

  // Backtesting functionality with proper typing
  async backtest(strategy: any, startDate: Date, endDate: Date, initialCapital: number) {
    let winCount = 0;
    let lossCount = 0;
    let totalWinAmount = 0;
    let totalLossAmount = 0;
    let peakCapital = initialCapital;

    const results = {
      totalReturn: 0,
      annualizedReturn: 0,
      maxDrawdown: 0,
      sharpeRatio: 0,
      winRate: 0,
      profitFactor: 0,
      trades: [] as any[],
      equity: [] as any[],
      metrics: {},
      dailyReturns: [] as any[],
    };

    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let capital = initialCapital;
    let maxDrawdown = 0;

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);

      if (Math.random() > 0.95) {
        const tradeResult = this.simulateTrade(capital, strategy);
        capital += tradeResult.pnl;

        results.trades.push({
          date,
          ...tradeResult,
          capital,
        });

        if (tradeResult.pnl > 0) {
          winCount++;
          totalWinAmount += tradeResult.pnl;
        } else {
          lossCount++;
          totalLossAmount += Math.abs(tradeResult.pnl);
        }
      }

      peakCapital = Math.max(peakCapital, capital);
      const drawdown = (peakCapital - capital) / peakCapital;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }

      results.dailyReturns.push({
        date,
        capital,
        drawdown,
      });
    }

    results.totalReturn = (capital - initialCapital) / initialCapital;
    results.annualizedReturn = Math.pow(1 + results.totalReturn, 365 / days) - 1;
    results.maxDrawdown = maxDrawdown;
    results.sharpeRatio = results.annualizedReturn / 0.15;
    results.winRate = winCount / (winCount + lossCount) || 0;

    return results;
  }

  private simulateTrade(capital: number, strategy: string): any {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const side = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const entryPrice = this.getCurrentPrice(symbol);
    const shares = Math.floor((capital * 0.1) / entryPrice);
    const exitPrice = entryPrice * (1 + (Math.random() - 0.5) * 0.1);
    const pnl =
      side === 'BUY' ? (exitPrice - entryPrice) * shares : (entryPrice - exitPrice) * shares;

    return {
      symbol,
      side,
      shares,
      entryPrice,
      exitPrice,
      pnl,
      returnPercent: pnl / (entryPrice * shares),
      isWin: pnl > 0,
      date: new Date(),
    };
  }
}
