export interface TechnicalIndicator {

  calculate: (...args: any[]) => number | object;

}
// Extended types for AI trading engine;
export interface HistoricalDataPoint {

  price: number;
  volume: number;
  timestamp: string | Date;
  technicals?: {
    rsi?: number;
    macd?: {
      line?: number;
      signal?: number;
      histogram?: number;
    
};
    atr?: number;
    adx?: number;
    bollinger?: {
      upper?: number;
      middle?: number;
      lower?: number;
    };
    ema?: {
      short?: number;
      long?: number;
    };
    stochastic?: {
      k?: number;
      d?: number;
    };
  };
  sentiment?: {
    overall?: number;
    news?: number;
    social?: number;
    institutional?: number;
  };
  fundamentals?: {
    pe?: number;
    eps?: number;
    revenue?: number;
    marketCap?: number;
    bookValue?: number;
    debtToEquity?: number;
    roe?: number;
  };
  options?: {
    impliedVolatility?: number;
    putCallRatio?: number;
    openInterest?: number;
    gamma?: number;
    delta?: number;
    theta?: number;
    vega?: number;
  };
  change?: number;
  changePercent?: number;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
}

export interface MarketData {

  symbol: string;
  price: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  averageVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  beta?: number;
  dividendYield?: number;
  pe?: number;
  eps?: number;
  timestamp: Date;
  sector?: string;
  industry?: string;
  close?: number;

}

export interface TradingSignal {

  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number; // 0-100;
  strength: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG';
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';
  strategy?: string;
  price?: number;
  targetPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  riskReward?: number;
  reasoning: string[];
  indicators: {
    technical: number; // -100 to 100;
    fundamental: number;
    sentiment: number;
    momentum: number;
    volume: number;
  
};
  timestamp: Date;
  validUntil?: Date;
}

export interface RiskAnalysis {

  symbol: string;
  riskScore: number; // 0-100 (higher = riskier);
  volatility: number;
  beta: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
  var95?: number; // Value at Risk 95%;
  expectedReturn?: number;
  correlations?: { [symbol: string]: number 
};
  sectorRisk?: number;
  liquidityRisk?: number;
  concentrationRisk?: number;
  recommendations: string[];
  timestamp: Date;
}

export interface PortfolioMetrics {

  totalValue: number;
  totalCash: number;
  totalEquity: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  allocations: {
    [symbol: string]: {
      shares: number;
      value: number;
      weight: number;
      averageCost: number;
      unrealizedPnL: number;
      unrealizedPnLPercent: number;
    
};
  };
  diversification: {
    sectorWeights: { [sector: string]: number };
    topHoldings: string[];
    concentration: number;
  };
  risk: {
    beta: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    var95: number;
  };
  performance: {
    last1d: number;
    last1w: number;
    last1m: number;
    last3m: number;
    last6m: number;
    last1y: number;
    inception: number;
  };
  timestamp: Date;
}

export interface AIModelPrediction {

  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  targetPrice: number;
  stopLoss: number;
  takeProfit?: number;
  reasoning: string[];
  modelVersion: string;
  features: {
    technical: number;
    fundamental: number;
    sentiment: number;
    macro: number;
  
};
  probability: {
    up: number;
    down: number;
    sideways: number;
  };
  timestamp: Date;
  expiresAt: Date;
}

export interface MarketSentiment {

  symbol?: string;
  overall: number; // -1 to 1;
  news: number;
  social: number;
  technical: number;
  institutional: number;
  retail: number;
  sources: {
    reddit: number;
    twitter: number;
    news: number;
    analyst: number;
    insider: number;
  
};
  trending: boolean;
  volume: number;
  timestamp: Date;
}

export interface TradingStrategy {

  id: string;
  name: string;
  description: string;
  type: 'MOMENTUM' | 'MEAN_REVERSION' | 'ARBITRAGE' | 'TREND_FOLLOWING' | 'PAIRS' | 'ML_BASED';
  status: 'ACTIVE' | 'INACTIVE' | 'BACKTESTING';
  parameters: { [key: string]: any 
};
  performance: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    avgTrade: number;
  };
  risk: {
    maxPosition: number;
    stopLoss: number;
    takeProfit: number;
    maxDailyLoss: number;
  };
  filters: {
    minVolume?: number;
    minPrice?: number;
    maxPrice?: number;
    sectors?: string[];
    marketCap?: { min?: number; max?: number };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {

  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  value: number;
  status: 'PENDING' | 'FILLED' | 'PARTIAL' | 'CANCELLED' | 'REJECTED';
  orderType: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT';
  timeInForce: 'DAY' | 'GTC' | 'IOC' | 'FOK';
  strategyId?: string;
  signalId?: string;
  commission: number;
  timestamp: Date;
  filledAt?: Date;
  filledPrice?: number;
  filledQuantity?: number;
  reason?: string;
  metadata?: { [key: string]: any 
};
}

export interface AlertConfig {

  id: string;
  type: 'PRICE' | 'VOLUME' | 'TECHNICAL' | 'NEWS' | 'PORTFOLIO';
  symbol?: string;
  condition: {
    operator: '>' | '<' | '=' | '>=' | '<=';
    value: number;
    field: string;
  
};
  frequency: 'REAL_TIME' | 'DAILY' | 'WEEKLY';
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'WEBHOOK')[];
  active: boolean;
  createdAt: Date;
  triggeredAt?: Date;
  triggerCount: number;
}

export interface BacktestResult {

  strategyId: string;
  period: {
    start: Date;
    end: Date;
  
};
  performance: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    volatility: number;
    winRate: number;
    profitFactor: number;
    calmarRatio: number;
    sortinoRatio: number;
  };
  trades: Trade[];
  equity: { date: Date; value: number }[];
  drawdowns: { date: Date; value: number }[];
  monthlyReturns: { [month: string]: number };
  statistics: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    avgWin: number;
    avgLoss: number;
    maxWin: number;
    maxLoss: number;
    avgHoldingPeriod: number;
  };
  riskMetrics: {
    var95: number;
    cvar95: number;
    beta: number;
    alpha: number;
    correlation: number;
  };
}

export interface NewsArticle {

  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  author?: string;
  publishedAt: Date;
  symbols: string[];
  sentiment: number; // -1 to 1;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string[];
  url: string;
  imageUrl?: string;
  relevanceScore: number;

}

export interface EconomicIndicator {

  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  unit: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  releaseDate: Date;
  nextReleaseDate?: Date;
  importance: 'LOW' | 'MEDIUM' | 'HIGH';
  country: string;
  category: string;
  impact: number; // -1 to 1;

}
