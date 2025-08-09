// Global type definitions and declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL?: string;
      NEXTAUTH_SECRET?: string;
      DATABASE_URL?: string;
      OPENAI_API_KEY?: string;
      ALPHA_VANTAGE_API_KEY?: string;
    }
  }
}

// Common types for the trading platform
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total: number;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED';
  createdAt: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  positions: Position[];
}

export interface Position {
  id: string;
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface AISignal {
  id: string;
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reason: string;
  targetPrice?: number;
  stopLoss?: number;
  createdAt: Date;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  pe?: number;
  timestamp: Date;
}

// StockData alias for MarketData
export type StockData = MarketData;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface APIResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export {};
