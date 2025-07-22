import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
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
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  DeepLearningModel,
  MarketPattern,
  SocialPost,
} from '../../types/trading-types';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { AvatarImage } from "../../../components/ui/avatar";

import { AvatarFallback } from "../../../components/ui/avatar";
import { Avatar } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
// Next-Generation AI Trading Platform - Comprehensive Multi-User Platform

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useTradingContext } from '@/app/contexts/TradingContext';
import type { AISignal } from '@/app/types/socket';
import AIToolsDashboard from '@/app/components/ai-tools/AIToolsDashboard';
import {
  Brain,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Shield,
  Target,
  Bot,
  Activity,
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

// Advanced Interfaces for Next-Gen Trading Platform
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
  verified: boolean;
  portfolioValue: number;
  totalPnL: number;
  riskScore: number;
  tradingLevel: number;
  balance: number;
  joinDate: Date;
  lastActive: Date;
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
  timeframe: string;
  reasoning: string[];
  sentiment: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: Date;
  author?: User;
  likes: number;
  comments: number;
  copies: number;
  performance?: number;
  price: number;
  currentPrice: number;
}

interface SocialPost {
  id: string;
  author: User;
  content: string;
  signals?: TradingSignal[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  symbols: string[];
  tradingIdea?: {
    symbol: string;
    action: string;
    targetPrice: number;
    reasoning: string;
  };
}

interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  allTimeReturn: number;
  positions: Position[];
  riskScore: number;
  pnl: number;
  pnlPercent: number;
}

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  allocation: number;
}

interface AIModel {
  id: string;
  name: string;
  type: 'LSTM' | 'Transformer' | 'GAN' | 'Ensemble';
  accuracy: number;
  performance: number;
  status: 'running' | 'training' | 'optimizing';
  author: User;
  subscribers: number;
  price: number;
}

interface NextGenPlatformProps {
  initialUser?: User;
}

export default function SuperiorTradingPlatform({ initialUser }: NextGenPlatformProps) {
  const { data: session } = useSession();
  const {
    user,
    portfolios,
    activePortfolio,
    positions,
    orders,
    aiSignals,
    socialFeed,
    marketData,
    isConnected,
    isLoading,
    refreshUserData,
    refreshPortfolios,
    placeOrder,
    subscribeToSymbols,
    setActivePortfolio,
  } = useTradingContext();

  // UI State
  const [activeTab, setActiveTab] = useState('social');
  const [isLiveTrading, setIsLiveTrading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Additional state for platform data
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tradingSignals, setTradingSignals] = useState<TradingSignal[]>([]);
  const [platformSocialFeed, setSocialFeed] = useState<SocialPost[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const ws = useRef<WebSocket | null>(null);

  // Use context data or fallback to local state
  const displayUser = user || currentUser || initialUser;
  const displayPortfolio = activePortfolio || portfolio;
  const displaySocialFeed = socialFeed || platformSocialFeed;
  const displaySignals = aiSignals || tradingSignals;

  // Type-safe access with fallbacks for missing properties
  const userFollowers = (displayUser as any)?.followers ?? 0;
  const userFollowing = (displayUser as any)?.following ?? 0;
  const userReputation = (displayUser as any)?.reputation ?? 0;

  const portfolioDayChange =
    (displayPortfolio as any)?.dayChange ?? (displayPortfolio as any)?.dailyPnL ?? 0;
  const portfolioDayChangePercent =
    (displayPortfolio as any)?.dayChangePercent ?? (displayPortfolio as any)?.dailyPnLPercent ?? 0;
  const portfolioPnlPercent =
    (displayPortfolio as any)?.pnlPercent ?? (displayPortfolio as any)?.totalPnLPercent ?? 0;
  const portfolioRiskScore = (displayPortfolio as any)?.riskScore ?? 0;

  useEffect(() => {
    if (session?.user && !user) {
      refreshUserData();
    }
    initializePlatform();
  }, [session, user, refreshUserData]);

  const initializePlatform = () => {
    // Initialize with mock data if user provided
    if (initialUser) {
      setCurrentUser(initialUser);
      loadMockData();
    } else if (session?.user) {
      // Load actual user data
      loadUserData();
    }
  };

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const userData = await response.json();
      setCurrentUser(userData);
      loadTradingData();
    } catch (error) {
      console.error('Failed to load user data:', error);
      // Fallback to mock data
      loadMockData();
    }
  };

  const loadMockData = () => {
    // Mock user data
    const mockUser: User = {
      id: '1',
      username: 'alex_trader',
      email: 'alex@example.com',
      name: 'Alex Chen',
      avatar: '/avatars/alex.jpg',
      tier: 'ultimate',
      status: 'online',
      reputation: 9847,
      followers: 1247,
      following: 89,
      totalTrades: 1567,
      winRate: 78.9,
      roi: 67.4,
      aiCredits: 2500,
      badges: ['AI_MASTER', 'HIGH_PERFORMER', 'RISK_MANAGER'],
      verified: true,
      portfolioValue: 847250,
      totalPnL: 67834.21,
      riskScore: 6.7,
      tradingLevel: 47,
      balance: 125000,
      joinDate: new Date('2023-01-15'),
      lastActive: new Date(),
    };
    setCurrentUser(mockUser);

    // Mock social feed
    const mockFeed: SocialPost[] = [
      {
        id: '1',
        author: {
          id: '2',
          username: 'sarah_trades',
          name: 'Sarah Kim',
          avatar: '/avatars/sarah.jpg',
          tier: 'pro',
          reputation: 8750,
          followers: 2340,
          verified: true,
        } as User,
        content:
          'Just spotted a massive bullish divergence on $AAPL RSI. My AI model is showing 94% confidence for a breakout above $180. 🚀',
        symbols: ['AAPL'],
        likes: 47,
        comments: 8,
        shares: 12,
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
        author: {
          id: '3',
          username: 'mike_quant',
          name: 'Mike Rodriguez',
          avatar: '/avatars/mike.jpg',
          tier: 'ultimate',
          reputation: 12450,
          followers: 5670,
          verified: true,
        } as User,
        content:
          'My quantitative model just triggered a SELL signal on $TSLA. Expected pullback to $235 support level.',
        symbols: ['TSLA'],
        likes: 89,
        comments: 15,
        shares: 23,
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        tradingIdea: {
          symbol: 'TSLA',
          action: 'SELL',
          targetPrice: 235,
          reasoning: 'Quantitative momentum analysis',
        },
      },
    ];
    setSocialFeed(mockFeed);

    // Mock trading signals
    const mockSignals: TradingSignal[] = [
      {
        id: '1',
        symbol: 'AAPL',
        action: 'BUY',
        confidence: 94,
        aiModel: 'AlphaNet-Pro-v3.2',
        strategy: 'Neural Ensemble',
        targetPrice: 185,
        stopLoss: 172,
        timeframe: '1D',
        reasoning: ['Strong bullish momentum with RSI divergence pattern detected'],
        sentiment: 0.8,
        riskLevel: 'MEDIUM',
        timestamp: new Date(),
        likes: 23,
        comments: 5,
        copies: 156,
        price: 178.25,
        currentPrice: 178.25,
      },
      {
        id: '2',
        symbol: 'TSLA',
        action: 'SELL',
        confidence: 87,
        aiModel: 'TrendMaster-AI',
        strategy: 'Momentum Reversal',
        targetPrice: 235,
        stopLoss: 255,
        timeframe: '4H',
        reasoning: ['Overbought conditions with negative sentiment shift'],
        sentiment: -0.6,
        riskLevel: 'HIGH',
        timestamp: new Date(),
        likes: 18,
        comments: 3,
        copies: 89,
        price: 248.5,
        currentPrice: 248.5,
      },
    ];
    setTradingSignals(mockSignals);

    // Mock portfolio
    const mockPortfolio: Portfolio = {
      id: '1',
      name: 'Main Portfolio',
      totalValue: 847250,
      dayChange: 12450,
      dayChangePercent: 1.49,
      allTimeReturn: 67.4,
      riskScore: 6.7,
      pnl: 67834.21,
      pnlPercent: 8.7,
      positions: [
        {
          symbol: 'AAPL',
          quantity: 150,
          avgPrice: 165.5,
          currentPrice: 178.25,
          pnl: 1912.5,
          pnlPercent: 7.71,
          allocation: 25.3,
        },
        {
          symbol: 'TSLA',
          quantity: 75,
          avgPrice: 220.0,
          currentPrice: 248.5,
          pnl: 2137.5,
          pnlPercent: 12.95,
          allocation: 18.7,
        },
      ],
    };
    setPortfolio(mockPortfolio);

    // Mock AI models
    const mockAIModels: AIModel[] = [
      {
        id: '1',
        name: 'AlphaNet Pro',
        type: 'LSTM',
        accuracy: 94.2,
        performance: 23.7,
        status: 'running',
        author: mockUser,
        subscribers: 1247,
        price: 99,
      },
      {
        id: '2',
        name: 'Quantum Predictor',
        type: 'Ensemble',
        accuracy: 91.8,
        performance: 31.2,
        status: 'optimizing',
        author: mockUser,
        subscribers: 892,
        price: 149,
      },
    ];
    setAiModels(mockAIModels);
  };

  const loadTradingData = async () => {
    try {
      // Load various data endpoints
      const [portfolioRes, signalsRes, socialRes, modelsRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/signals/latest'),
        fetch('/api/social/feed'),
        fetch('/api/ai/models'),
      ]);

      if (portfolioRes.ok) setPortfolio(await portfolioRes.json());
      if (signalsRes.ok) setTradingSignals(await signalsRes.json());
      if (socialRes.ok) setSocialFeed(await socialRes.json());
      if (modelsRes.ok) setAiModels(await modelsRes.json());
    } catch (error) {
      console.error('Failed to load trading data:', error);
    }
  };

  const setupWebSocket = () => {
    try {
      ws.current = new WebSocket('ws://localhost:8000/ws/platform');

      ws.current.onopen = () => {
        console.log('Connected to trading platform');
        if (displayUser) {
          ws.current?.send(
            JSON.stringify({
              type: 'subscribe',
              user: displayUser.id,
              channels: ['signals', 'social', 'portfolio'],
            })
          );
        }
      };

      ws.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        handleRealtimeUpdate(data);
      };

      ws.current.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to setup WebSocket:', error);
    }
  };

  const handleRealtimeUpdate = (data: any) => {
    switch (data.type) {
      case 'new_signal':
        setTradingSignals(prev => [data.signal, ...prev.slice(0, 19)]);
        break;
      case 'social_post':
        setSocialFeed(prev => [data.post, ...prev.slice(0, 49)]);
        break;
      case 'portfolio_update':
        setPortfolio(data.portfolio);
        break;
      case 'notification':
        setNotifications(prev => [data.notification, ...prev]);
        break;
    }
  };

  const followUser = async (userId: string) => {
    try {
      await fetch('/api/users/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      // Update UI optimistically
      setNotifications(prev => [
        {
          id: Date.now().toString(),
          type: 'success',
          message: 'User followed successfully!',
          timestamp: new Date(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const copyTrade = async (signal: TradingSignal) => {
    try {
      await fetch('/api/trades/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signalId: signal.id }),
      });
      setNotifications(prev => [
        {
          id: Date.now().toString(),
          type: 'success',
          message: `Copied ${signal.symbol} trade - ${signal.action} at $${signal.price}`,
          timestamp: new Date(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error('Failed to copy trade:', error);
    }
  };

  const subscribeToAIModel = async (modelId: string) => {
    try {
      await fetch('/api/ai/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId }),
      });
    } catch (error) {
      console.error('Failed to subscribe to AI model:', error);
    }
  };

  const handleCopyTrade = async (signal: TradingSignal | AISignal) => {
    try {
      // Convert AISignal to TradingSignal format if needed
      const tradingSignal: TradingSignal =
        'likes' in signal
          ? signal
          : {
              id: signal.id,
              symbol: signal.symbol,
              action: signal.action,
              confidence: signal.confidence,
              aiModel: 'Unknown',
              strategy: signal.strategy,
              targetPrice: signal.targetPrice,
              stopLoss: 0,
              timeframe: '1D',
              reasoning: [],
              sentiment: 0,
              riskLevel: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
              timestamp: new Date(signal.timestamp),
              likes: 0,
              comments: 0,
              copies: 0,
              price: signal.currentPrice,
              currentPrice: signal.currentPrice,
            };

      const success = await placeOrder({
        symbol: tradingSignal.symbol,
        side: tradingSignal.action,
        type: 'MARKET',
        quantity: 10, // Default quantity, should be configurable
        portfolioId: displayPortfolio?.id,
      });

      if (success) {
        setNotifications(prev => [
          {
            id: Date.now().toString(),
            type: 'success',
            message: `Successfully copied ${tradingSignal.symbol} ${tradingSignal.action} trade`,
            timestamp: new Date(),
          },
          ...prev,
        ]);
      } else {
        setNotifications(prev => [
          {
            id: Date.now().toString(),
            type: 'error',
            message: `Failed to copy ${tradingSignal.symbol} trade`,
            timestamp: new Date(),
          },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error('Failed to copy trade:', error);
      setNotifications(prev => [
        {
          id: Date.now().toString(),
          type: 'error',
          message: 'Failed to execute trade',
          timestamp: new Date(),
        },
        ...prev,
      ]);
    }
  };

  const toggleLiveTrading = () => {
    setIsLiveTrading(!isLiveTrading);
    setNotifications(prev => [
      {
        id: Date.now().toString(),
        type: 'info',
        message: `Live trading ${!isLiveTrading ? 'enabled' : 'disabled'}`,
        timestamp: new Date(),
      },
      ...prev,
    ]);
  };

  // Helper functions
  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'free':
        return 'bg-gray-500';
      case 'basic':
        return 'bg-blue-500';
      case 'pro':
        return 'bg-purple-500';
      case 'ultimate':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'owner':
        return 'bg-gradient-to-r from-pink-500 to-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
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

  // Render functions for different tabs
  const renderSocialFeed = () => (
    <div className="space-y-6">
      {/* Social Trading Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Social Trading Network</h2>
              <p className="text-gray-300">Connect with top traders and copy their strategies</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {userFollowers?.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {userFollowing?.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {userReputation?.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Reputation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Post Interface */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={displayUser?.avatar} />
              <AvatarFallback>{displayUser?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                placeholder="Share your trading insights, analysis, or predictions..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-4 text-white resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-3">
                  <Input
                    placeholder="Add symbols (e.g., AAPL, TSLA)"
                    className="w-56 bg-slate-700/50 border-slate-600"
                  />
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Chart
                  </Button>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Share Idea</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Feed */}
      <div className="space-y-4">
        {displaySocialFeed.map(post => (
          <Card key={post.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h4 className="font-semibold text-white">{post.author.name}</h4>
                    <span className="text-slate-400">@{post.author.username}</span>
                    <Badge className={getTierColor(post.author.tier)}>
                      {post.author.tier.toUpperCase()}
                    </Badge>
                    {post.author.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                    <span className="text-slate-500 text-sm">
                      {post.timestamp.toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-slate-200 mb-3">{post.content}</p>

                  {post.symbols.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.symbols.map((symbol: string) => (
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
                    <div className="bg-slate-700/50 rounded-lg p-4 mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-white font-medium">
                            Trading Idea: {post.tradingIdea.symbol}
                          </h5>
                          <p className="text-slate-400 text-sm">{post.tradingIdea.reasoning}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              post.tradingIdea.action === 'BUY' ? 'bg-green-600' : 'bg-red-600'
                            }
                          >
                            {post.tradingIdea.action}
                          </Badge>
                          <p className="text-white font-medium mt-1">
                            Target: {formatCurrency(post.tradingIdea.targetPrice)}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() =>
                          copyTrade({
                            id: post.id,
                            symbol: post.tradingIdea!.symbol,
                            action: post.tradingIdea!.action as 'BUY' | 'SELL',
                            price: post.tradingIdea!.targetPrice,
                          } as TradingSignal)
                        }
                      >
                        Copy This Trade
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center space-x-6 text-slate-400">
                    <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                      <Share className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </button>
                    <Button size="sm" variant="outline" onClick={() => followUser(post.author.id)}>
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLiveSignals = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Zap className="h-6 w-6 text-yellow-400" />
            <span>Live AI Trading Signals</span>
            <Badge className="bg-red-500">{displaySignals.length} Active</Badge>
            {isConnected && <Badge className="bg-green-500">Live</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {displaySignals.map(signal => (
              <div key={signal.id} className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge className={signal.action === 'BUY' ? 'bg-green-600' : 'bg-red-600'}>
                      {signal.action}
                    </Badge>
                    <span className="text-2xl font-bold text-white">{signal.symbol}</span>
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-slate-400">{signal.aiModel}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getConfidenceColor(signal.confidence)}`}>
                      {Math.round(signal.confidence * 100)}%
                    </div>
                    <div className="text-sm text-slate-400">confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-400">Current Price</div>
                    <div className="text-lg font-semibold text-white">
                      {formatCurrency(signal.currentPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Target Price</div>
                    <div className="text-lg font-semibold text-green-400">
                      {formatCurrency(signal.targetPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Stop Loss</div>
                    <div className="text-lg font-semibold text-red-400">
                      {signal.stopLoss ? formatCurrency(signal.stopLoss) : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Timeframe</div>
                    <div className="text-lg font-semibold text-white">{signal.timeframe}</div>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">
                  {signal.reasoning && signal.reasoning.length > 0
                    ? signal.reasoning.join('. ')
                    : 'AI analysis indicates favorable trading opportunity'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge
                      className={`bg-${signal.riskLevel.toLowerCase()}-500/20 text-${signal.riskLevel.toLowerCase()}-400`}
                    >
                      {signal.riskLevel} RISK
                    </Badge>
                    <span className="text-sm text-slate-400">{signal.strategy}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleCopyTrade(signal)}
                      disabled={!isConnected}
                    >
                      Copy Trade
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {displaySignals.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Zap className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No Active Signals</h3>
                <p>AI models are analyzing the market. New signals will appear here.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIHub = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Bot className="h-6 w-6 text-purple-400" />
            <span>AI Model Hub</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiModels.map((model: AIModel) => (
              <Card key={model.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Cpu className="h-5 w-5 text-purple-400" />
                      <span>{model.name}</span>
                    </CardTitle>
                    <Badge
                      className={model.status === 'running' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-400">Accuracy</div>
                      <div className="text-lg font-semibold text-green-400">{model.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Performance</div>
                      <div className="text-lg font-semibold text-blue-400">
                        +{model.performance}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={model.author.avatar} />
                      <AvatarFallback>{model.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-slate-300">{model.author.username}</span>
                    <Badge className={getTierColor(model.author.tier)}>{model.author.tier}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-300">
                        {model.subscribers} subscribers
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-white">${model.price}/mo</div>
                  </div>

                  <Button className="w-full" onClick={() => subscribeToAIModel(model.id)}>
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      {displayPortfolio && (
        <>
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <Badge className="bg-green-500/20 text-green-400">
                    {formatPercentage(portfolioDayChangePercent)}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {formatCurrency(displayPortfolio.totalValue)}
                </h3>
                <p className="text-slate-400">Total Portfolio Value</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                  <Badge className="bg-green-500/20 text-green-400">Today</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {formatCurrency(portfolioDayChange)}
                </h3>
                <p className="text-slate-400">Day Change</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-purple-400" />
                  <Badge className="bg-purple-500/20 text-purple-400">All Time</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {formatPercentage(portfolioPnlPercent)}
                </h3>
                <p className="text-slate-400">Total Return</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="h-8 w-8 text-orange-400" />
                  <Badge className="bg-orange-500/20 text-orange-400">Risk</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white">{portfolioRiskScore}</h3>
                <p className="text-slate-400">Risk Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Positions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <PieChart className="h-6 w-6 text-blue-400" />
                <span>Current Positions ({positions.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-xl text-white">{position.symbol}</span>
                      <span className="text-slate-400">
                        {position.quantity} shares @ {formatCurrency(position.averagePrice)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold ${position.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {formatCurrency(position.unrealizedPnL)} (
                        {formatPercentage(position.unrealizedPnLPercent)})
                      </div>
                      <div className="text-sm text-slate-400">
                        Current: {formatCurrency(position.currentPrice)} • Market Value:{' '}
                        {formatCurrency(position.marketValue)}
                      </div>
                    </div>
                  </div>
                ))}
                {positions.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <PieChart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No positions currently held</p>
                    <p className="text-sm">Start trading to see your positions here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="h-6 w-6 text-blue-400" />
                <span>Recent Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge className={order.side === 'BUY' ? 'bg-green-600' : 'bg-red-600'}>
                        {order.side}
                      </Badge>
                      <span className="font-medium text-white">{order.symbol}</span>
                      <span className="text-slate-400">{order.quantity} shares</span>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          order.status === 'FILLED'
                            ? 'border-green-500 text-green-400'
                            : order.status === 'PENDING'
                              ? 'border-yellow-500 text-yellow-400'
                              : 'border-red-500 text-red-400'
                        }
                      >
                        {order.status}
                      </Badge>
                      <div className="text-sm text-slate-400 mt-1">
                        {order.executionPrice
                          ? formatCurrency(order.executionPrice)
                          : formatCurrency(order.price || 0)}
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="text-center py-6 text-slate-400">
                    <Activity className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No recent orders</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  if (!session && !initialUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex items-center justify-center">
        <Card className="w-96 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-white">Welcome to AlphaAI Trading</CardTitle>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AlphaAI Trading
                </span>
              </div>
              {displayUser && (
                <Badge className={`${getTierColor(displayUser.tier)} text-white`}>
                  {displayUser.tier.toUpperCase()}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {displayPortfolio && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-lg font-semibold">
                    {formatCurrency(displayPortfolio.totalValue)}
                  </span>
                  <span
                    className={`text-sm ${portfolioDayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    ({formatPercentage(portfolioDayChangePercent)})
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div
                  className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
                />
                <span className="text-sm text-slate-400">
                  {isConnected ? 'Live' : 'Disconnected'}
                </span>
              </div>

              <Button
                onClick={toggleLiveTrading}
                className={`${isLiveTrading ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isLiveTrading ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isLiveTrading ? 'Stop Trading' : 'Start Trading'}
              </Button>

              {displayUser && (
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={displayUser.avatar} />
                    <AvatarFallback>{displayUser.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{displayUser.username || displayUser.name}</span>
                  <Badge className={getTierColor(displayUser.tier)}>
                    {displayUser.tier?.toUpperCase()}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Social Trading</span>
            </TabsTrigger>
            <TabsTrigger value="signals" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Live Signals</span>
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Tools</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>AI Hub</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social">{renderSocialFeed()}</TabsContent>

          <TabsContent value="signals">{renderLiveSignals()}</TabsContent>

          <TabsContent value="ai-tools">
            <AIToolsDashboard />
          </TabsContent>

          <TabsContent value="ai">{renderAIHub()}</TabsContent>

          <TabsContent value="portfolio">{renderPortfolio()}</TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-slate-400">
                Coming in the next phase - Advanced performance analytics and AI model insights
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-2xl"
          onClick={() => setActiveTab('signals')}
        >
          <Zap className="h-5 w-5 mr-2" />
          Quick Trade
        </Button>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 space-y-2 z-50">
          {notifications.slice(0, 3).map(notification => (
            <Alert key={notification.id} className="bg-slate-800 border-slate-600">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-white">{notification.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
