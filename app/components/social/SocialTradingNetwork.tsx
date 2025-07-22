import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Alert } from "../../../components/ui/alert";
import { AvatarImage } from "../../../components/ui/avatar";
import { AvatarFallback } from "../../../components/ui/avatar";
import { Avatar } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
=======
import { Alert } from '@/components/ui/alert';
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
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
} from '../../types/trading-types';

('use client');
import React from 'react';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import {
  Users,
  TrendingUp,
  Star,
  MessageCircle,
  Heart,
  Share2,
  Trophy,
  Target,
  Zap,
  Crown,
  Eye,
  Copy,
  BarChart3,
  DollarSign,
} from 'lucide-react';

// Type definitions for social trading network
interface Trader {
  id: number;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: number;
  winRate: number;
  totalReturn: number;
  monthlyReturn: number;
  copiers: number;
  riskScore: number;
  specialty: string;
  badge: string;
}

interface SocialPost {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  trade?: {
    symbol: string;
    action: string;
    profit: number | null;
    amount: number;
  };
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  return: number;
  badge: string;
}

interface SocialStats {
  totalCopiers: number;
  totalVolume: number;
  averageReturn: number;
  activeTraders: number;
  successRate?: number;
  activeTrades?: number;
}

export default function SocialTradingNetwork() {
  const [topTraders, setTopTraders] = useState<Trader[]>([]);
  const [socialFeed, setSocialFeed] = useState<SocialPost[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [socialStats, setSocialStats] = useState<SocialStats>({
    totalCopiers: 0,
    totalVolume: 0,
    averageReturn: 0,
    activeTraders: 0,
  });

  useEffect(() => {
    initializeTopTraders();
    generateSocialFeed();
    updateCopyTradingStats();
    generateLeaderboard();

    const interval = setInterval(() => {
      generateSocialFeed();
      updateCopyTradingStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initializeTopTraders = () => {
    const traders = [
      {
        id: 1,
        name: 'Alex Chen',
        username: '@alextrader',
        avatar: 'https://github.com/shadcn.png',
        verified: true,
        followers: 45672,
        winRate: 94.7,
        totalReturn: 287.5,
        monthlyReturn: 23.8,
        copiers: 2847,
        riskScore: 6.2,
        specialty: 'Tech Stocks',
        badge: 'Diamond',
      },
      {
        id: 2,
        name: 'Sarah Williams',
        username: '@sarahwins',
        avatar: 'https://github.com/shadcn.png',
        verified: true,
        followers: 38291,
        winRate: 91.3,
        totalReturn: 245.2,
        monthlyReturn: 19.4,
        copiers: 1923,
        riskScore: 4.8,
        specialty: 'Crypto',
        badge: 'Platinum',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        username: '@mikej_trades',
        avatar: 'https://github.com/shadcn.png',
        verified: true,
        followers: 29847,
        winRate: 89.6,
        totalReturn: 198.7,
        monthlyReturn: 16.2,
        copiers: 1456,
        riskScore: 5.5,
        specialty: 'Options',
        badge: 'Gold',
      },
    ];

    setTopTraders(traders);
  };

  const generateSocialFeed = () => {
    const posts = [
      {
        id: Date.now() + Math.random(),
        user: {
          name: 'Alex Chen',
          username: '@alextrader',
          avatar: 'https://github.com/shadcn.png',
          verified: true,
        },
        content:
          'Just closed my NVDA position with +15.7% gain! 🚀 The AI chip sector is on fire. Next target: AMD at $142.',
        timestamp: new Date(Date.now() - Math.random() * 3600000),
        likes: 247,
        comments: 38,
        shares: 15,
        trade: {
          symbol: 'NVDA',
          action: 'SELL',
          profit: 15.7,
          amount: 25000,
        },
      },
      {
        id: Date.now() + Math.random() + 1,
        user: {
          name: 'Sarah Williams',
          username: '@sarahwins',
          avatar: 'https://github.com/shadcn.png',
          verified: true,
        },
        content:
          'Bitcoin breaking through $45K resistance! 📈 This could be the start of the next bull run. Added to my position.',
        timestamp: new Date(Date.now() - Math.random() * 7200000),
        likes: 189,
        comments: 52,
        shares: 23,
        trade: {
          symbol: 'BTC',
          action: 'BUY',
          profit: null,
          amount: 50000,
        },
      },
      {
        id: Date.now() + Math.random() + 2,
        user: {
          name: 'Mike Johnson',
          username: '@mikej_trades',
          avatar: 'https://github.com/shadcn.png',
          verified: true,
        },
        content:
          "SPY puts printing money today! 💰 Market volatility is a trader's best friend. Risk management is key!",
        timestamp: new Date(Date.now() - Math.random() * 1800000),
        likes: 156,
        comments: 29,
        shares: 8,
        trade: {
          symbol: 'SPY',
          action: 'PUT',
          profit: 28.3,
          amount: 15000,
        },
      },
    ];

    setSocialFeed(posts);
  };

  const updateCopyTradingStats = () => {
    setSocialStats({
      totalCopiers: 15847,
      totalVolume: 247500000,
      averageReturn: 18.7,
      activeTraders: 2847,
    });
  };

  const generateLeaderboard = () => {
    const leaders = [
      { rank: 1, name: 'Alex Chen', return: 287.5, badge: '🏆' },
      { rank: 2, name: 'Sarah Williams', return: 245.2, badge: '🥈' },
      { rank: 3, name: 'Mike Johnson', return: 198.7, badge: '🥉' },
      { rank: 4, name: 'Emma Davis', return: 176.4, badge: '⭐' },
      { rank: 5, name: 'David Kim', return: 165.8, badge: '⭐' },
    ];

    setLeaderboard(leaders);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Diamond':
        return 'from-cyan-400 to-blue-500';
      case 'Platinum':
        return 'from-gray-300 to-gray-500';
      case 'Gold':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Social Trading Overview */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Users className="h-7 w-7 mr-3 text-purple-400" />
            👥 Social Trading Network
            <Badge className="ml-3 bg-gradient-to-r from-purple-400 to-pink-500">
              <Star className="h-4 w-4 mr-1" />
              COMMUNITY POWERED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {socialStats.totalCopiers?.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm">Active Copiers</p>
            </div>

            <div className="p-4 bg-green-500/10 rounded-lg border border-green-400/30 text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                ${(socialStats.totalVolume / 1000000)?.toFixed(0)}M
              </div>
              <p className="text-gray-400 text-sm">Copy Volume</p>
            </div>

            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30 text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {socialStats.averageReturn?.toFixed(1)}%
              </div>
              <p className="text-gray-400 text-sm">Avg Return</p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/30 text-center">
              <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {socialStats.successRate?.toFixed(1)}%
              </div>
              <p className="text-gray-400 text-sm">Success Rate</p>
            </div>

            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/30 text-center">
              <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">
                {socialStats.activeTrades?.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm">Active Trades</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Traders */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Trophy className="h-7 w-7 mr-3 text-cyan-400" />
            🏆 Top Performing Traders
            <Badge className="ml-3 bg-gradient-to-r from-cyan-400 to-blue-500">
              <Crown className="h-4 w-4 mr-1" />
              ELITE TRADERS
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTraders.map((trader: any) => (
              <div
                key={trader.id}
                className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-400/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-cyan-400/50">
                      <AvatarImage src={trader.avatar || '/placeholder.svg'} />
                      <AvatarFallback>
                        {trader.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-bold text-lg">{trader.name}</h3>
                        {trader.verified && <Star className="h-5 w-5 text-yellow-400" />}
                        <Badge
                          className={`bg-gradient-to-r ${getBadgeColor(trader.badge)} text-black`}
                        >
                          {trader.badge}
                        </Badge>
                      </div>
                      <p className="text-gray-400">{trader.username}</p>
                      <p className="text-cyan-400 text-sm">Specialty: {trader.specialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-gray-400 text-sm">Win Rate</p>
                      <p className="text-green-400 font-bold">{trader.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Return</p>
                      <p className="text-yellow-400 font-bold">{trader.totalReturn}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Return</p>
                      <p className="text-blue-400 font-bold">{trader.monthlyReturn}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Copiers</p>
                      <p className="text-purple-400 font-bold">{trader.copiers.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Trader
                    </Button>
                    <Button variant="outline" className="border-cyan-400/30 text-cyan-400">
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Feed */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <MessageCircle className="h-7 w-7 mr-3 text-green-400" />
            💬 Trading Social Feed
            <Badge className="ml-3 bg-gradient-to-r from-green-400 to-emerald-500">
              <Zap className="h-4 w-4 mr-1" />
              LIVE FEED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {socialFeed.map((post: any) => (
              <div
                key={post.id}
                className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-green-400/50">
                    <AvatarImage src={post.user.avatar || '/placeholder.svg'} />
                    <AvatarFallback>
                      {post.user.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-bold">{post.user.name}</h4>
                      {post.user.verified && <Star className="h-4 w-4 text-yellow-400" />}
                      <span className="text-gray-400 text-sm">{post.user.username}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{post.content}</p>

                    {post.trade && (
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600/30 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge
                              className={
                                post.trade.action === 'BUY' || post.trade.action === 'SELL'
                                  ? 'bg-blue-500'
                                  : 'bg-purple-500'
                              }
                            >
                              {post.trade.action}
                            </Badge>
                            <span className="text-white font-bold">{post.trade.symbol}</span>
                            <span className="text-gray-400">
                              ${post.trade.amount.toLocaleString()}
                            </span>
                          </div>
                          {post.trade.profit && (
                            <div className="text-right">
                              <span className="text-green-400 font-bold">
                                +{post.trade.profit}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-6 text-gray-400">
                      <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                        <Heart className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span>{post.shares}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                        <Copy className="h-5 w-5" />
                        <span>Copy Trade</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/30">
            <h3 className="text-white font-bold mb-4">📝 Share Your Trade</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="What's your trading insight today?"
                className="bg-black/20 border-blue-400/30 text-white"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="Symbol (e.g., AAPL)"
                    className="bg-black/20 border-blue-400/30 text-white w-32"
                  />
                  <Input
                    placeholder="Action"
                    className="bg-black/20 border-blue-400/30 text-white w-24"
                  />
                  <Input
                    placeholder="Amount"
                    className="bg-black/20 border-blue-400/30 text-white w-32"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
                  Share Trade
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <BarChart3 className="h-7 w-7 mr-3 text-yellow-400" />
            📊 Monthly Leaderboard
            <Badge className="ml-3 bg-gradient-to-r from-yellow-400 to-orange-500">
              <Trophy className="h-4 w-4 mr-1" />
              TOP PERFORMERS
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((leader: any) => (
              <div
                key={leader.rank}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{leader.badge}</div>
                  <div className="text-2xl font-bold text-yellow-400">#{leader.rank}</div>
                  <div>
                    <h4 className="text-white font-bold">{leader.name}</h4>
                    <p className="text-gray-400 text-sm">Professional Trader</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">+{leader.return}%</div>
                  <p className="text-gray-400 text-sm">Total Return</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30 text-center">
            <h3 className="text-white font-bold mb-2">🎯 Join the Competition!</h3>
            <p className="text-gray-300 mb-4">
              Compete with top traders and win monthly prizes up to $50,000
            </p>
            <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold">
              Enter Competition
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
