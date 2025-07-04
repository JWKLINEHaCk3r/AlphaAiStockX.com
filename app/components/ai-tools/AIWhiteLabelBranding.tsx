'use client';

export type Account = {
  portfolio_value?: number | string;
  buying_power?: number | string;
  status?: string;
};

// Type definitions for props and state
export interface Trade {
  pnl: number;
  side: string;
  symbol: string;
  quantity: number;
  price: number;
  strategy: string;
}
export interface PerformanceData {
  dailyReturns: { date: Date; return: number; cumulative: number }[];
  monthlyReturns: any[];
  drawdownPeriods: any[];
  bestTrade: Trade | null;
  worstTrade: Trade | null;
  avgHoldTime: string;
  profitFactor: number;
  calmarRatio: number;
  sortinoRatio: number;
}
