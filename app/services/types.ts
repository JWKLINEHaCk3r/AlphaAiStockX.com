// Types and interfaces for the AI trading engine and services;
export interface Trade {















  symbol: string;
  action: 'buy' | 'sell';
  quantity: number;
  confidence: number; // 0-1;
  expectedReturn: number; // profit/loss estimate;
  price: number;















}

export interface TradeResult extends Trade {
  executed: boolean;
  timestamp: number;
}

export interface MarketData {















  symbol: string;
  price: number;
  volume: number;
  indicators: Record<string, number>;
  history: Array<{ date: string; price: number; volume: number;














}>;
}

export interface RiskProfile {















  level: 'low' | 'medium' | 'high';
  maxDrawdown: number;
  maxPositionSize: number;
  stopLoss: number;















}

export interface Strategy {















  name: string;
  description: string;
  generateSignals: (marketData: MarketData, risk: RiskProfile) => Promise<Trade[]>;















}
