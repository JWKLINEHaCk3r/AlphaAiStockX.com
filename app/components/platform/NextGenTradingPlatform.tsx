import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  VisionModel,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
  RiskAnalysis,
  SectorPerformance,
  BacktestStrategy,
  AIWhiteLabelMetrics,
  MarketClassification,
  TradingRecommendation,
  StockAnalysis,
  RealtimeData,
  VolumeProfile,
  AIAnalysisComponents,
  CryptoData,
  DeFiProtocol,
  NFTCollection,
  UserProfile,
  ThemeOption,
  AccentColor,
  SubscriptionPlan,
  TradingStrategy,
  ScanResult,
  SiteDiagnostic,
  Alert,
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  SocialPost,
  DeepLearningModel,
  MarketPattern,
} from '../../types/trading-types';\n\nimport { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import Navigation from 'components/ui/navigation/index.tsx';
import { SelectValue } from "../../../components/ui/select";
import { SelectTrigger } from "../../../components/ui/select";
import { SelectItem } from "../../../components/ui/select";
import { SelectContent } from "../../../components/ui/select";
import { Select } from "../../../components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { Alert } from "../../../components/ui/alert";
import { AvatarImage } from "../../../components/ui/avatar";
import { AvatarFallback } from "../../../components/ui/avatar";
import { Avatar } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Slider } from "../../../components/ui/slider";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
// Next-Generation AI Trading Platform - Surpasses Robinhood by 20 Years
// The most advanced multi-user social trading platform with AI-powered automation
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Zap,
  Shield,
  Target,
  Bot,
  Activity,
  Crown,
  Sparkles,
  Infinity,
  Globe,
  Star,
  PieChart,
  BarChart3,
  LineChart,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Share,
  Heart,
  MessageCircle,
  Eye,
  ThumbsUp,
  Rocket,
  Layers,
  Database,
  Cloud,
  Lock,
  Award,
  Trophy,
  Medal,
  Diamond,
  Gem,
  Play,
  Pause,
  Square,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Camera,
  Mic,
  Bookmark,
  Gift,
  Unlock,
  Cpu,
  Network,
  Atom,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Advanced Interfaces for Next-Gen Multi-User Trading Platform
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  tier: 'free' | 'basic' | 'pro' | 'ultimate' | 'owner';
  status: 'online' | 'trading' | 'offline' | 'away';
  reputation: number;
  followers: number;
  following: number;
  totalTrades: number;
  winRate: number;
  roi: number;
  aiCredits: number;
  badges: string[];
  location?: string;
  joinDate: Date;
  verified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  portfolioValue: number;
  totalPnL: number;
  riskScore: number;
  tradingLevel: number;
  permissions: string[];
  socialScore: number;
  copiedTrades: number;
  copyTraders: number;
  balance: number;
  preferences: any;
  achievements: Record<string, unknown>[];
  posts: number;
  lastActive: string;
}

interface TradingSignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  aiModel: string;
  strategy: string;
  targetPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  reasoning: string;
  technicalAnalysis: TechnicalData;
  sentiment: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  expectedReturn: number;
  timestamp: Date;
  author?: User;
  likes: number;
  comments: number;
  copies: number;
  performance?: number;
  isLive: boolean;
  price: number;
}

interface TechnicalData {
  rsi: number;
  macd: number;
  bollinger: { upper: number; middle: number; lower: number };
  volume: number;
  support: number;
  resistance: number;
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  momentum: number;
}

interface SocialPost {
  id: string;
  author: User;
  content: string;
  signals?: TradingSignal[];
  images?: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: Date;
  tags: string[];
  performance?: {
    return: number;
    followers: number;
    accuracy: number;
  };
  type: 'signal' | 'analysis' | 'education' | 'discussion';
  visibility: 'public' | 'followers' | 'premium';
  user: User;
  symbols: string[];
  sentiment: number;
  tradingIdea?: {
    symbol: string;
    action: string;
    targetPrice: number;
    reasoning: string;
  };
}

interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  cash: number;
  dayChange: number;
  dayChangePercent: number;
  allTimeReturn: number;
  positions: Position[];
  watchlist: WatchlistItem[];
  aiModels: string[];
  riskScore: number;
  diversificationScore: number;
  sharpeRatio: number;
  maxDrawdown: number;
  alpha: number;
  beta: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  allocation: any;
  riskLevel: string;
}

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  allocation: number;
  dayChange: number;
  dividendYield?: number;
  sector: string;
  marketCap: number;
  aiRating: number;
}

interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  aiSignals: number;
  socialMentions: number;
  alerts: Alert[];
}

interface Alert {
  id: string;
  type: 'price' | 'technical' | 'ai' | 'social';
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

interface AIModel {
  id: string;
  name: string;
  type: 'LSTM' | 'Transformer' | 'GAN' | 'Ensemble' | 'Quantum' | 'Neural';
  accuracy: number;
  performance: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
  status: 'running' | 'training' | 'optimizing' | 'paused';
  author: User;
  subscribers: number;
  price: number;
  description: string;
  strategies: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframes: string[];
  assets: string[];
  backtestedReturns: number;
  realTimePerformance: number;
}

interface LiveMarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  open: number;
  marketCap: number;
  pe: number;
  eps: number;
  dividendYield: number;
  timestamp: Date;
}

interface TradingRoom {
  id: string;
  name: string;
  host: User;
  participants: User[];
  isLive: boolean;
  topic: string;
  signals: TradingSignal[];
  chat: ChatMessage[];
  tier: 'free' | 'premium' | 'elite';
}

interface ChatMessage {
  id: string;
  author: User;
  message: string;
  timestamp: Date;
  reactions: Reaction[];
}

interface Reaction {
  emoji: string;
  users: User[];
}

interface NextGenPlatformProps {
  user: User;
}

interface AISignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  strategy: string;
  timeframe: string;
  timestamp: Date;
  aiModel: string;
}

interface Portfolio {
  id: string;
  name: string;
  value: number;
  pnl: number;
  pnlPercent: number;
  positions: Record<string, unknown>[];
  allocation: any;
  riskLevel: string;
}

interface SocialPost {
  id: string;
  user: User;
  content: string;
  symbols: string[];
  sentiment: number;
  likes: number;
  shares: number;
  comments: number;
  timestamp: Date;
  images?: string[];
  tradingIdea?: {
    symbol: string;
    action: string;
    targetPrice: number;
    reasoning: string;
  };
}

export default function NextGenTradingPlatform() {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tradingSignals, setTradingSignals] = useState<TradingSignal[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [socialFeed, setSocialFeed] = useState<SocialPost[]>([]);
  const [marketData, setMarketData] = useState<any>({});
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoTrading, setAutoTrading] = useState(false);
  const [riskLevel, setRiskLevel] = useState<number[]>([5]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);

  // Initialize platform data
  useEffect(() => {
    if (session?.user) {
      loadUserData();
      loadTradingData();
      loadSocialFeed();
      startRealTimeUpdates();
    }
  }, [session]);

  const loadUserData = async () => {
    // Mock user data - replace with actual API call
    const userData: User = {
      id: session?.user?.id || '1',
      name: session?.user?.name || 'Alex Chen',
      email: session?.user?.email || 'alex@example.com',
      username: 'alexchen_trader',
      avatar: session?.user?.image || '/avatars/alex.jpg',
      tier: 'ultimate',
      status: 'active',
      balance: 125000,
      portfolioValue: 847250,
      totalPnL: 67834.21,
      winRate: 78.9,
      riskScore: 6.7,
      tradingLevel: 47,
      followers: 1247,
      following: 89,
      posts: 156,
      reputation: 9847,
      joinDate: '2023-01-15',
      lastActive: 'Now',
      badges: ['AI_MASTER', 'HIGH_PERFORMER', 'RISK_MANAGER', 'SOCIAL_TRADER'],
      achievements: [],
      preferences: {},
    };
    setCurrentUser(userData);
  };

  const loadTradingData = async () => {
    // Mock trading signals
    const signals: TradingSignal[] = [
      {
        id: '1',
        symbol: 'AAPL',
        action: 'BUY',
        confidence: 0.94,
        price: 178.25,
        targetPrice: 185.0,
        stopLoss: 172.0,
        strategy: 'Neural Ensemble',
        timeframe: '1D',
        timestamp: new Date(),
        aiModel: 'AlphaNet-Pro-v3.2',
      },
      {
        id: '2',
        symbol: 'TSLA',
        action: 'SELL',
        confidence: 0.87,
        price: 248.5,
        targetPrice: 235.0,
        stopLoss: 255.0,
        strategy: 'Momentum Reversal',
        timeframe: '4H',
        timestamp: new Date(),
        aiModel: 'TrendMaster-AI',
      },
      {
        id: '3',
        symbol: 'NVDA',
        action: 'BUY',
        confidence: 0.91,
        price: 445.8,
        targetPrice: 475.0,
        stopLoss: 425.0,
        strategy: 'Pattern Recognition',
        timeframe: '1D',
        timestamp: new Date(),
        aiModel: 'PatternNet-Elite',
      },
    ];
    setTradingSignals(signals);

    // Mock portfolios
    const portfolioData: Portfolio[] = [
      {
        id: '1',
        name: 'AI Growth Portfolio',
        value: 347250,
        pnl: 23470,
        pnlPercent: 7.25,
        positions: [],
        allocation: { stocks: 70, crypto: 20, bonds: 10 },
        riskLevel: 'moderate',
      },
      {
        id: '2',
        name: 'Conservative Income',
        value: 250000,
        pnl: 12500,
        pnlPercent: 5.26,
        positions: [],
        allocation: { stocks: 40, bonds: 50, cash: 10 },
        riskLevel: 'conservative',
      },
      {
        id: '3',
        name: 'Crypto Moonshot',
        value: 150000,
        pnl: 45000,
        pnlPercent: 42.86,
        positions: [],
        allocation: { crypto: 80, stocks: 20 },
        riskLevel: 'aggressive',
      },
    ];
    setPortfolios(portfolioData);
  };

  const loadSocialFeed = async () => {
    // Mock social feed data
    const feed: SocialPost[] = [
      {
        id: '1',
        user: {
          id: '2',
          name: 'Sarah Kim',
          username: 'sarahk_trades',
          avatar: '/avatars/sarah.jpg',
          tier: 'pro',
          reputation: 8750,
          followers: 2340,
        } as User,
        content:
          'Just spotted a massive bullish divergence on $AAPL RSI. My AI model is showing 94% confidence for a breakout above $180. 🚀',
        symbols: ['AAPL'],
        sentiment: 0.8,
        likes: 47,
        shares: 12,
        comments: 8,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        tradingIdea: {
          symbol: 'AAPL',
          action: 'BUY',
          targetPrice: 185,
          reasoning: 'Technical analysis + AI confirmation',
        },
      },
      {
        id: '2',
        user: {
          id: '3',
          name: 'Mike Rodriguez',
          username: 'mike_quant',
          avatar: '/avatars/mike.jpg',
          tier: 'ultimate',
          reputation: 12450,
          followers: 5670,
        } as User,
        content:
          'My quantitative model just triggered a SELL signal on $TSLA. Expected pullback to $235 support level. Risk/reward looks good here.',
        symbols: ['TSLA'],
        sentiment: -0.6,
        likes: 89,
        shares: 23,
        comments: 15,
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        tradingIdea: {
          symbol: 'TSLA',
          action: 'SELL',
          targetPrice: 235,
          reasoning: 'Quantitative momentum analysis',
        },
      },
    ];
    setSocialFeed(feed);
  };

  const startRealTimeUpdates = () => {
    // WebSocket connection for real-time updates
    const ws = new WebSocket('wss://api.alphaaistockx.com/ws');

    ws.onmessage = event => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'signal':
          setTradingSignals(prev => [data.signal, ...prev.slice(0, 19)]);
          break;
        case 'market_data':
          setMarketData(prev => ({ ...prev, [data.symbol]: data.data }));
          break;
        case 'notification':
          setNotifications(prev => [data.notification, ...prev]);
          break;
        case 'social_post':
          setSocialFeed(prev => [data.post, ...prev.slice(0, 49)]);
          break;
      }
    };

    return () => ws.close();
  };

  const getTierColor = (tier: string) => {
    const colors = {
      free: 'bg-gray-500',
      basic: 'bg-blue-500',
      pro: 'bg-purple-500',
      ultimate: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      owner: 'bg-gradient-to-r from-pink-500 to-red-500',
    };
    return colors[tier as keyof typeof colors] || colors.free;
  };

  const getTierIcon = (tier: string) => {
    const icons = {
      free: Star,
      basic: Target,
      pro: Crown,
      ultimate: Diamond,
      owner: Infinity,
    };
    const IconComponent = icons[tier as keyof typeof icons] || Star;
    return <IconComponent className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-500/20 text-green-400">+{formatPercentage(8.7)}</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {formatCurrency(currentUser?.portfolioValue || 0)}
            </h3>
            <p className="text-gray-400">Total Portfolio Value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-500/20 text-green-400">Today</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {formatCurrency(currentUser?.totalPnL || 0)}
            </h3>
            <p className="text-gray-400">Total P&L</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-400" />
              <Badge className="bg-purple-500/20 text-purple-400">{currentUser?.winRate}%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">{currentUser?.tradingLevel}</h3>
            <p className="text-gray-400">Trading Level</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="w-8 h-8 text-orange-400" />
              <Badge className="bg-orange-500/20 text-orange-400">AI Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">{tradingSignals.length}</h3>
            <p className="text-gray-400">Active Signals</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Trading Controls */}
      <Card className="bg-gray-900/50 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            AI Trading Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">AI Trading</label>
              <div className="flex items-center space-x-2">
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
                <span className="text-gray-400">{aiEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Auto-Execute</label>
              <div className="flex items-center space-x-2">
                <Switch checked={autoTrading} onCheckedChange={setAutoTrading} />
                <span className="text-gray-400">{autoTrading ? 'Auto' : 'Manual'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm font-medium">
                Risk Level: {riskLevel[0]}/10
              </label>
              <Slider
                value={riskLevel}
                onValueChange={setRiskLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live AI Signals */}
      <Card className="bg-gray-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400" />
            Live AI Trading Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tradingSignals.slice(0, 5).map(signal => (
              <div
                key={signal.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${signal.action === 'BUY' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}
                  ></div>
                  <div>
                    <h4 className="text-white font-medium">{signal.symbol}</h4>
                    <p className="text-gray-400 text-sm">{signal.strategy}</p>
                  </div>
                </div>

                <div className="text-center">
                  <Badge
                    className={
                      signal.action === 'BUY'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }
                  >
                    {signal.action}
                  </Badge>
                  <p className="text-gray-400 text-sm mt-1">{formatCurrency(signal.price)}</p>
                </div>

                <div className="text-center">
                  <div className="text-white font-medium">
                    {Math.round(signal.confidence * 100)}%
                  </div>
                  <Progress value={signal.confidence * 100} className="w-16 h-2 mt-1" />
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Execute
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-6 h-6 text-blue-400" />
              Portfolio Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolios.map(portfolio => (
                <div key={portfolio.id} className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{portfolio.name}</h4>
                    <Badge
                      className={
                        portfolio.pnl >= 0
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }
                    >
                      {formatPercentage(portfolio.pnlPercent)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Value: {formatCurrency(portfolio.value)}</span>
                    <span
                      className={`font-medium ${portfolio.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {portfolio.pnl >= 0 ? '+' : ''}
                      {formatCurrency(portfolio.pnl)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Win Rate</span>
                <div className="flex items-center space-x-2">
                  <Progress value={currentUser?.winRate || 0} className="w-24" />
                  <span className="text-white">{currentUser?.winRate}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Risk Score</span>
                <div className="flex items-center space-x-2">
                  <Progress value={(currentUser?.riskScore || 0) * 10} className="w-24" />
                  <span className="text-white">{currentUser?.riskScore}/10</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sharpe Ratio</span>
                <span className="text-white">2.47</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Max Drawdown</span>
                <span className="text-white">-8.3%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Alpha</span>
                <span className="text-green-400">+12.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSocialTrading = () => (
    <div className="space-y-6">
      {/* Social Trading Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Social Trading Network</h2>
              <p className="text-gray-300">Connect, share, and learn from top traders worldwide</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentUser?.followers}</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentUser?.following}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{currentUser?.reputation}</div>
                <div className="text-gray-400 text-sm">Reputation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Post */}
      <Card className="bg-gray-900/50 border-gray-700/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                placeholder="Share your trading insights, ideas, or analysis..."
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-white resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Add symbols (e.g., AAPL, TSLA)"
                    className="w-48 bg-gray-800/50 border-gray-600"
                  />
                  <Button variant="outline" size="sm">
                    Add Chart
                  </Button>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Post Idea
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Feed */}
      <div className="space-y-4">
        {socialFeed.map(post => (
          <Card key={post.id} className="bg-gray-900/50 border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-white">{post.user.name}</h4>
                    <span className="text-gray-400">@{post.user.username}</span>
                    <Badge className={getTierColor(post.user.tier)}>
                      {getTierIcon(post.user.tier)}
                      <span className="ml-1">{post.user.tier.toUpperCase()}</span>
                    </Badge>
                    <span className="text-gray-500 text-sm">
                      {post.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-3">{post.content}</p>

                  {post.symbols.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.symbols.map(symbol => (
                        <Badge
                          key={symbol}
                          variant="outline"
                          className="text-blue-400 border-blue-500"
                        >
                          ${symbol}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {post.tradingIdea && (
                    <Card className="bg-gray-800/30 border-gray-600/50 mb-3">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-white font-medium">
                              Trading Idea: {post.tradingIdea.symbol}
                            </h5>
                            <p className="text-gray-400 text-sm">{post.tradingIdea.reasoning}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                post.tradingIdea.action === 'BUY'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }
                            >
                              {post.tradingIdea.action}
                            </Badge>
                            <p className="text-white font-medium mt-1">
                              Target: {formatCurrency(post.tradingIdea.targetPrice)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex items-center space-x-6 text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Follow Trade</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardContent className="p-8">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback className="text-2xl">{currentUser?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{currentUser?.name}</h1>
                <Badge className={getTierColor(currentUser?.tier || 'free')}>
                  {getTierIcon(currentUser?.tier || 'free')}
                  <span className="ml-1">{currentUser?.tier?.toUpperCase()}</span>
                </Badge>
              </div>
              <p className="text-gray-300 mb-4">@{currentUser?.username}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">{currentUser?.tradingLevel}</div>
                  <div className="text-gray-400 text-sm">Trading Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{currentUser?.followers}</div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{currentUser?.winRate}%</div>
                  <div className="text-gray-400 text-sm">Win Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{currentUser?.reputation}</div>
                  <div className="text-gray-400 text-sm">Reputation</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <Button className="mb-2">Edit Profile</Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      <Card className="bg-gray-900/50 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentUser?.badges.map((badge, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/30"
              >
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="text-white font-medium text-sm">{badge.replace('_', ' ')}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <LineChart className="w-6 h-6 text-green-400" />
              Trading Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total P&L</span>
                <span className="text-green-400 font-bold">
                  {formatCurrency(currentUser?.totalPnL || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Best Month</span>
                <span className="text-green-400 font-bold">+{formatCurrency(23470)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Worst Month</span>
                <span className="text-red-400 font-bold">-{formatCurrency(5680)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Monthly Return</span>
                <span className="text-white font-bold">+8.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-400" />
              Activity Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Trades</span>
                <span className="text-white font-bold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Posts Created</span>
                <span className="text-white font-bold">{currentUser?.posts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Ideas Shared</span>
                <span className="text-white font-bold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white font-bold">{currentUser?.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="w-96 bg-gray-900/80 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-center text-white">Welcome to AlphaAI StockX</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation Header */}
      <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-cyan-400" />
                <span className="text-xl font-bold text-white">AlphaAI StockX</span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Pro</Badge>
              </div>

              <div className="hidden md:flex space-x-1">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('dashboard')}
                  className="text-white"
                >
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === 'trading' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('trading')}
                  className="text-white"
                >
                  Trading
                </Button>
                <Button
                  variant={activeTab === 'social' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('social')}
                  className="text-white"
                >
                  Social
                </Button>
                <Button
                  variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('portfolio')}
                  className="text-white"
                >
                  Portfolio
                </Button>
                <Button
                  variant={activeTab === 'ai' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('ai')}
                  className="text-white"
                >
                  AI Lab
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search stocks, users, ideas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white w-64"
                />
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-400" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>{currentUser?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-white text-sm">
                  <div className="font-medium">{currentUser?.name}</div>
                  <div className="text-gray-400 text-xs">
                    {formatCurrency(currentUser?.portfolioValue || 0)}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-gray-400 hover:text-white"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>

          <TabsContent value="social">{renderSocialTrading()}</TabsContent>

          <TabsContent value="profile">{renderProfile()}</TabsContent>

          <TabsContent value="trading">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Advanced Trading Interface</h2>
              <p className="text-gray-400">Coming in next phase...</p>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Portfolio Management</h2>
              <p className="text-gray-400">Coming in next phase...</p>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">AI Model Laboratory</h2>
              <p className="text-gray-400">Coming in next phase...</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
