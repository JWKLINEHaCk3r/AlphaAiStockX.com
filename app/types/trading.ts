import { Alert } from '../components/ui/alert';
// Common types for the trading application;
export interface Strategy { id: number,
    name: string,
    description: string,
    winRate: number,
    avgReturn: number,
    maxDrawdown: number,
    riskLevel: string;
  isActive?: boolean;
  complexity?: string;
  minCapital?: number;
  allocation?: number;
  timeframe?: string, status?: string























 }

export interface Trade {























  id: string,
    symbol: string,
    type: 'BUY' | 'SELL', side: 'BUY' | 'SELL',
    quantity: number,
    price: number,
    timestamp: number,
    status: string;
  profit?: number;
    pnl: number,
    strategy: string }

export interface BotStats {























  totalTrades: number,
    winRate: number,
    totalProfit: number,
    totalPnL: number,
    activeTrades: number,
    avgHoldTime: string,
    dailyPnL: number,
    sharpeRatio: number,
    maxDrawdown: number,
    accountBalance: number }

export interface BotSettings {























  maxPositionSize: number,
    maxDailyLoss: number,
    maxConcurrentTrades: number,
    emergencyStop: boolean,
    riskPerTrade: number,
    riskLevel: string,
    stopLossPercent: number,
    takeProfitPercent: number,
    maxLeverage: number }

export interface User {























  id: number,
    name: string,
    email: string,
    subscription: string,
    status: string,
    riskScore: number,
    lastActive: string,
    location: string,
    winRate: number,
    profitLoss: number,
    accountValue: number,
    totalTrades: number }

export interface Alert {























  id: number,
    type: string,
    message: string,
    timestamp: Date,
    severity: string }
