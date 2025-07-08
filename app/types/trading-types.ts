import { Alert } from "../../components/ui/alert";
// Comprehensive TypeScript interfaces for the AlphaAiStockX platform

export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  side: 'long' | 'short';
  entryDate: Date;
  stopLoss?: number;
  takeProfit?: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    sma200: number;
    ema12: number;
    ema26: number;
  };
  volume: {
    current: number;
    average: number;
    ratio: number;
  };
  support: number[];
  resistance: number[];
}

export interface VolumeProfile {
  avgVolume: number;
  volumeTrend: 'increasing' | 'decreasing' | 'stable';
  volumeSpikes: boolean;
  institutionalFlow: number;
}

export interface BollingerBands {
  upper: number;
  middle: number;
  lower: number;
  bandwidth: number;
  percentB: number;
}

export interface SupportResistance {
  support: number[];
  resistance: number[];
  pivotPoints: number[];
  strength: number;
}

export interface OptimalAllocations {
  [symbol: string]: {
    currentWeight: number;
    targetWeight: number;
    recommendedAction: 'buy' | 'sell' | 'hold';
    shares: number;
    dollarAmount: number;
  };
}

export interface RebalanceAction {
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  quantity: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: number;
}

export interface EarningData {
  symbol: string;
  companyName: string;
  earningsDate: Date;
  estimatedEPS: number;
  actualEPS?: number;
  surprise?: number;
  surprisePercent?: number;
  revenue: number;
  revenueEstimate: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  permissions: AdminPermissions;
  settings: AdminSettings;
  lastLogin: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export interface AdminPermissions {
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canManageContent: boolean;
  canAccessLogs: boolean;
  canManageSettings: boolean;
}

export interface AdminSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  emailAlerts: boolean;
  language: string;
  timezone: string;
}

export interface AIStockPrediction {
  symbol: string;
  prediction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  timeframe: '1d' | '1w' | '1m' | '3m';
  targetPrice: number;
  reasoning: string[];
  technicalScore: number;
  fundamentalScore: number;
  sentimentScore: number;
}

export interface SectorPerformance {
  sector: string;
  performance: {
    '1d': number;
    '1w': number;
    '1m': number;
    '3m': number;
    '1y': number;
  };
  momentum: number;
  outlook: 'positive' | 'negative' | 'neutral';
  topStocks: string[];
}

export interface BacktestStrategy {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, number | string | boolean>;
  returns: {
    total: number;
    annual: number;
    maxDrawdown: number;
    sharpeRatio: number;
    winRate: number;
  };
  trades: number;
  period: string;
}

export interface PerformanceMetrics {
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
}

export interface AIWhiteLabelMetrics {
  totalUsers: number;
  activeUsers: number;
  monthlyReturns: MonthlyReturn[];
  drawdownPeriods: DrawdownPeriod[];
  performanceStats: PerformanceMetrics;
}

export interface MonthlyReturn {
  month: string;
  return: number;
  benchmark: number;
}

export interface DrawdownPeriod {
  start: Date;
  end: Date;
  peak: number;
  trough: number;
  drawdown: number;
  recovery: Date | null;
}

export interface MarketClassification {
  trend: 'bullish' | 'bearish' | 'sideways';
  volatility: 'low' | 'medium' | 'high';
  phase: 'accumulation' | 'markup' | 'distribution' | 'markdown';
  strength: number;
}

export interface TradingRecommendation {
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  timeframe: string;
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  reasoning: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface StockAnalysis {
  symbol: string;
  currentPrice: number;
  historical: MarketData[];
  realTimeData: RealtimeData;
  patterns: ChartPattern[];
  volumeAnalysis: VolumeProfile;
  metrics: TechnicalIndicators;
}

export interface RealtimeData {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  timestamp: Date;
}

export interface ChartPattern {
  type: string;
  confidence: number;
  target: number;
  timeframe: string;
  status: 'forming' | 'confirmed' | 'broken';
  description: string;
}

export interface AIAnalysisComponents {
  sentiment: number;
  technical: number;
  fundamental: number;
  momentum: number;
  risk: number;
}

export interface TradingSignalData {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  strength: number;
  confidence: number;
  reason: string;
  timestamp: Date;
  targetPrice: number;
  stopLoss: number;
  timeframe: string;
}

export interface Trade {
  id: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  strategy: string;
  confidence: number;
  timestamp: Date;
  pnl: number;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
  stopLoss: number;
  takeProfit: number;
}

export interface TradeHistoryItem {
  id: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  strategy: string;
  confidence: number;
  entryTime: Date;
  exitTime: Date;
  pnl: number;
  status: 'COMPLETED' | 'STOPPED';
}

export interface BotStats {
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  tradingDays: number;
}

export interface BotSettings {
  maxPositionSize: number;
  maxDailyLoss: number;
  maxConcurrentTrades: number;
  riskPerTrade: number;
  aiConfidenceThreshold: number;
  tradingHours: boolean;
  emergencyStop: boolean;
}

export interface MarketAnalysis {
  [symbol: string]: {
    trend: string;
    confidence: number;
    signals: string[];
    priceTarget: number;
  };
}

export interface SportsEvent {
  id: number;
  type: string;
  teams: string;
  time: string;
  markets: string[];
  volatility: string;
  opportunities: number;
}

export interface TradingOpportunity {
  id: number;
  eventId: number;
  eventName: string;
  sportType: string;
  marketType: string;
  bookA: string;
  bookB: string;
  oddsA: number;
  oddsB: number;
  spreadValue: number;
  confidence: number;
  maxStake: number;
  expectedReturn: number;
  expectedValue: string;
  timeWindow: string;
  timestamp: Date;
  expiryTime: Date;
  status: string;
  profitPotential: number;
  risk: string;
}

export interface ActiveTrade {
  id: number;
  eventName: string;
  sportType: string;
  marketType: string;
  bookA: string;
  bookB: string;
  oddsA: number;
  oddsB: number;
  spreadValue: number;
  entryTime: Date;
  status: string;
  stake: number;
  currentPnL: number;
  expectedPnL: number;
  confidence: number;
}

export interface ProfitStats {
  totalProfit: number;
  dailyProfit: number;
  winRate: number;
  avgSpread: number;
  maxProfit: number;
  riskRatio: number;
}

export interface ExpandedSections {
  realTime: boolean;
  adaptive: boolean;
  profit: boolean;
  risk: boolean;
  interface: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  status: 'active' | 'training' | 'inactive';
  lastUpdated: Date;
  description: string;
}

export interface AnalysisResult {
  id: string;
  symbol: string;
  type: string;
  confidence: number;
  prediction: string;
  timestamp: Date;
  model: string;
}

export interface DeepLearningModel {
  id: string;
  name: string;
  architecture: string;
  accuracy: number;
  trainingData: number;
  status: 'active' | 'training' | 'testing';
  performance: PerformanceMetrics;
}

export interface MarketPattern {
  id: string;
  type: string;
  confidence: number;
  timeframe: string;
  symbols: string[];
  description: string;
  probability: number;
}

export interface NewsAnalysis {
  id: string;
  title: string;
  source: string;
  sentiment: number;
  relevance: number;
  impact: 'high' | 'medium' | 'low';
  symbols: string[];
  publishedAt: Date;
  summary: string;
}

export interface SocialPlatform {
  name: string;
  sentiment: number;
  mentions: number;
  engagement: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Influencer {
  name: string;
  platform: string;
  followers: number;
  sentiment: number;
  influence: number;
  recentPosts: number;
}

export interface Trader {
  id: string;
  username: string;
  avatar: string;
  totalReturn: number;
  winRate: number;
  followers: number;
  verified: boolean;
  rank: number;
}

export interface SocialPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  symbols: string[];
  sentiment: number;
}

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  supply: number;
}

export interface DeFiProtocol {
  name: string;
  tvl: number;
  apr: number;
  category: string;
  risk: 'low' | 'medium' | 'high';
  tokens: string[];
}

export interface NFTCollection {
  name: string;
  floorPrice: number;
  volume24h: number;
  owners: number;
  items: number;
  change24h: number;
}

export interface BankAccount {
  id: string;
  type: 'checking' | 'savings' | 'money-market';
  balance: number;
  accountNumber: string;
  routingNumber: string;
  interestRate?: number;
  minimumBalance?: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  fromAccount?: string;
  toAccount?: string;
}

export interface InterestTransaction {
  id: string;
  amount: number;
  rate: number;
  period: string;
  timestamp: Date;
  compounding: 'daily' | 'monthly' | 'quarterly';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: UserPreferences;
  portfolio: Position[];
  watchlist: string[];
  subscriptionTier: 'free' | 'premium' | 'professional';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  emailAlerts: boolean;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  tradingStyle: 'day' | 'swing' | 'position';
  language: string;
  timezone: string;
}

export interface ThemeOption {
  id: string;
  name: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export interface AccentColor {
  name: string;
  value: string;
  preview: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  description: string;
  stripePriceId?: string;
}

export interface TradingStrategy {
  id: string;
  name: string;
  type: string;
  winRate: number;
}

export interface ScanResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  score: number;
  signal: 'buy' | 'sell' | 'neutral';
  reason: string;
  confidence: number;
}

export interface PatternAccuracy {
  [patternType: string]: {
    total: number;
    successful: number;
    accuracy: number;
    avgReturn: number;
  };
}

export interface SiteDiagnostic {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  description: string;
  solution?: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: 'price' | 'volume' | 'news' | 'technical' | 'system';
  title: string;
  message: string;
  symbol?: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  read: boolean;
  action?: string;
}

export interface BacktestResult {
  strategy: string;
  period: string;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  sharpeRatio: number;
  maxDrawdown: number;
  calmarRatio: number;
  sortinoRatio: number;
  volatility: number;
  beta: number;
  alpha: number;
  profitFactor: number;
  maxConsecutiveWins: number;
  maxConsecutiveLosses: number;
  avgDaysInTrade: number;
  totalCommissions: number;
  netProfit: number;
  grossProfit: number;
  grossLoss: number;
  equityCurve: number[];
  largestWin: number;
  largestLoss: number;
  consecutiveWins: number;
  consecutiveLosses: number;
  tradingDays: number;
  avgHoldingPeriod: number;
}

export interface BacktestSettings {
  symbol?: string;
  strategy: string;
  startDate: Date;
  endDate: Date;
  initialCapital: number;
  commissionPerTrade?: number;
  slippagePercent?: number;
  symbols?: string[];
  timeframe?: string;
  commission?: number;
  slippage?: number;
  maxPositionSize?: number;
  riskPerTrade?: number;
  stopLoss?: number;
  takeProfit?: number;
}
