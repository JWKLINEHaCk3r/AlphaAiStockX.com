import React from 'react';
// Global type definitions for AlphaAIStockX platform;
export interface User {
















  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  subscription: SubscriptionTier;
  createdAt: Date;
  lastLogin?: Date;
















}

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface StockData {
















  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  pe?: number;
  eps?: number;
  dividend?: number;
  lastUpdated: Date;
















}

export interface AISignal {
















  id: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  reasoning: string;
  timestamp: Date;
  aiModel: string;
















}

export interface Portfolio {
















  id: string;
  userId: string;
  name: string;
  totalValue: number;
  cash: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  positions: Position[];
  createdAt: Date;
  updatedAt: Date;
















}

export interface Position {
















  id: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  dayChange: number;
  dayChangePercent: number;
  openedAt: Date;
















}

export interface Trade {
















  id: string;
  userId: string;
  portfolioId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  totalValue: number;
  fees: number;
  status: 'pending' | 'filled' | 'canceled' | 'rejected';
  orderId?: string;
  executedAt?: Date;
  createdAt: Date;
















}

export interface AIAnalysis {
















  symbol: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  riskScore: number;
  technicalIndicators: {
    rsi: number;
    macd: number;
    bollinger: {
      upper: number;
      middle: number;
      lower: number;
    















};
    support: number;
    resistance: number;
  };
  fundamentalScore: number;
  priceTarget: number;
  timeHorizon: '1d' | '1w' | '1m' | '3m' | '6m' | '1y';
  reasoning: string;
  generatedAt: Date;
}

export interface MarketData {
















  symbol: string;
  price: number;
  bid: number;
  ask: number;
  spread: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: Date;
















}

export interface ChartData {
















  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
















}

export interface NewsArticle {
















  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  sentiment: number; // -1 to 1;
  relevantSymbols: string[];
  aiSummary?: string;
















}

export interface WatchlistItem {
















  id: string;
  userId: string;
  symbol: string;
  addedAt: Date;
  notes?: string;
  alertRules?: AlertRule[];
















}

export interface AlertRule {
















  id: string;
  type: 'price_above' | 'price_below' | 'volume_spike' | 'ai_signal';
  value: number;
  isActive: boolean;
  createdAt: Date;
















}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Component prop types;
export interface BaseComponentProps {
















  className?: string;
  children?: React.ReactNode;
















}

export interface StockCardProps extends BaseComponentProps {
  stock: StockData;
  showDetails?: boolean;
  onSelect?: (symbol: string) => void;
}

export interface ChartProps extends BaseComponentProps {
  data: ChartData[];
  symbol: string;
  timeframe: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
  type?: 'line' | 'candlestick' | 'area';
  height?: number;
}

// Utility types;
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type SortDirection = 'asc' | 'desc';

export type TimeFrame = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w';

export type MarketStatus = 'open' | 'closed' | 'pre_market' | 'after_hours';

// AI Model types;
export interface AIModel {
















  id: string;
  name: string;
  version: string;
  description: string;
  accuracy: number;
  specialization: string[];
  isActive: boolean;
















}

export interface AIAgentStatus {
















  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastUpdate: Date;
  tasksCompleted: number;
  accuracy: number;
















}

// Error types;
export class APIError extends Error {
  constructor(;
    message: string,;
    public statusCode: number,;
    public code?: string;
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends Error {
  constructor(;
    message: string,;
    public field?: string;
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Event types;
export interface SystemEvent {
















  type: 'trade_executed' | 'signal_generated' | 'alert_triggered' | 'market_status_change';
  data: any;
  timestamp: Date;
  userId?: string;
















}

// WebSocket message types;
export interface WSMessage {
















  type: string;
  data: any;
  timestamp: Date;
















}

export interface WSStockUpdate extends WSMessage {
  type: 'stock_update';
  data: StockData;
}

export interface WSTradeUpdate extends WSMessage {
  type: 'trade_update';
  data: Trade;
}

// Configuration types;
export interface AppConfig {
















  apiUrl: string;
  wsUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    voiceControl: boolean;
    darkMode: boolean;
    advancedCharts: boolean;
    aiTrading: boolean;
  















};
}

// Theme types;
export interface ThemeConfig {
















  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  















};
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
