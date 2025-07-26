// Type definitions for data aggregation service;
export interface MarketData {






















  symbol: string;
  price: number;
  volume: number;
  bid: number;
  ask: number;
  timestamp: Date;
  source: string;






















}

export interface NewsItem {






















  id: string;
  title: string;
  content: string;
  sentiment: number;
  impact: 'high' | 'medium' | 'low';
  category: 'earnings' | 'corporate' | 'analyst' | 'regulatory' | 'monetary' | 'general';
  priority: 'high' | 'medium' | 'low';
  symbols: string[];
  source: string;
  timestamp: Date;






















}

export interface SocialSentiment {






















  symbol: string;
  sentiment: number;
  source: string;
  mentions: number;
  timestamp: Date;






















}

export interface EconomicData {






















  name: string;
  value: number;
  previous: number;
  forecast: number;
  surprise: 'high' | 'medium' | 'low';
  impact: 'very_high' | 'high' | 'medium' | 'low';
  timestamp: Date;






















}

export interface TradingPattern {






















  id: string;
  name: string;
  symbol: string;
  type: string;
  confidence: number;
  reliability: number;
  direction: 'bullish' | 'bearish';
  target: number;
  stopLoss: number;
  timestamp: Date;






















}

export interface AISignal {






















  id: string;
  symbol: string;
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  strength: number;
  source: string;
  reasoning: string;
  timestamp: Date;






















}

export interface MockWebSocket {






















  url: string;
  connected: boolean;
  lastUpdate: Date;
  dataPoints: number;






















}

export interface NewsTemplate {






















  title: string;
  category: string;
  impact: string;
  symbols: string[];






















}

export interface SocialSource {






















  name: string;
  url: string;
  weight: number;






















}

export interface EconomicIndicator {






















  name: string;
  frequency: 'quarterly' | 'monthly' | 'meeting';
  impact: string;






















}

export interface ComprehensiveAnalysis {






















  symbol: string;
  sentimentScore: number;
  impactScore: number;
  patterns: TradingPattern[];
  signals: AISignal[];
  marketData: MarketData;
  confidence: number;
  timestamp: Date;






















}
