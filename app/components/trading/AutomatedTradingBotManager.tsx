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
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Switch } from "../../../components/ui/switch";
import { Select } from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
'use client';
=======
import { Select } from '@/components/ui/select';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

import React, { useState, useEffect } from 'react';
import {
  Bot,
  Play,
  Pause,
  Settings,
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  Zap,
  Brain,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
} from 'lucide-react';

interface TradingBot {
  id: string;
  name: string;
  description: string;
  strategies: string[];
  status: 'active' | 'paused' | 'stopped';
  performance: {
    totalReturn: number;
    winRate: number;
    totalTrades: number;
    avgTradeTime: string;
    sharpeRatio: number;
    maxDrawdown: number;
  };
  settings: {
    maxPositionSize: number;
    stopLoss: number;
    takeProfit: number;
    riskLevel: 'low' | 'medium' | 'high';
    symbols: string[];
    capital: number;
  };
  lastSignal?: {
    symbol: string;
    action: string;
    confidence: number;
    timestamp: string;
  };
}

export default function AutomatedTradingBotManager() {
  const [bots, setBots] = useState<TradingBot[]>([
    {
      id: 'alpha-momentum',
      name: 'Alpha Momentum Master',
      description: 'Advanced momentum-based trading using ML and technical analysis',
      strategies: ['momentumBreakout', 'adaptiveTrend', 'macdMomentum'],
      status: 'active',
      performance: {
        totalReturn: 24.7,
        winRate: 73.2,
        totalTrades: 1247,
        avgTradeTime: '4.2h',
        sharpeRatio: 2.14,
        maxDrawdown: 8.3,
      },
      settings: {
        maxPositionSize: 10,
        stopLoss: 3,
        takeProfit: 8,
        riskLevel: 'medium',
        symbols: ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'GOOGL'],
        capital: 100000,
      },
      lastSignal: {
        symbol: 'AAPL',
        action: 'BUY',
        confidence: 94.7,
        timestamp: '2 minutes ago',
      },
    },
    {
      id: 'quantum-arbitrage',
      name: 'Quantum Arbitrage Hunter',
      description: 'Statistical arbitrage using quantum-inspired algorithms',
      strategies: ['statisticalArbitrage', 'triangularArbitrage', 'marketMaking'],
      status: 'active',
      performance: {
        totalReturn: 18.3,
        winRate: 82.1,
        totalTrades: 3421,
        avgTradeTime: '1.7h',
        sharpeRatio: 3.41,
        maxDrawdown: 4.2,
      },
      settings: {
        maxPositionSize: 5,
        stopLoss: 1.5,
        takeProfit: 3,
        riskLevel: 'low',
        symbols: ['SPY', 'QQQ', 'IWM', 'GLD', 'TLT'],
        capital: 250000,
      },
      lastSignal: {
        symbol: 'QQQ',
        action: 'SELL',
        confidence: 87.3,
        timestamp: '5 minutes ago',
      },
    },
    {
      id: 'neural-pattern',
      name: 'Neural Pattern Detector',
      description: 'Deep learning pattern recognition for complex market structures',
      strategies: ['patternRecognition', 'ensembleML', 'neuralEnsemble'],
      status: 'paused',
      performance: {
        totalReturn: 31.8,
        winRate: 68.9,
        totalTrades: 892,
        avgTradeTime: '6.1h',
        sharpeRatio: 1.97,
        maxDrawdown: 12.4,
      },
      settings: {
        maxPositionSize: 15,
        stopLoss: 5,
        takeProfit: 12,
        riskLevel: 'high',
        symbols: ['TSLA', 'AMZN', 'META', 'NFLX', 'AMD'],
        capital: 150000,
      },
    },
    {
      id: 'volume-master',
      name: 'Volume Profile Master',
      description: 'Advanced volume analysis and order flow trading',
      strategies: ['volumeProfile', 'onBalanceVolume', 'marketMicrostructure'],
      status: 'active',
      performance: {
        totalReturn: 16.2,
        winRate: 76.8,
        totalTrades: 2156,
        avgTradeTime: '2.8h',
        sharpeRatio: 2.73,
        maxDrawdown: 6.1,
      },
      settings: {
        maxPositionSize: 8,
        stopLoss: 2.5,
        takeProfit: 6,
        riskLevel: 'medium',
        symbols: ['BTC-USD', 'ETH-USD', 'SPX', 'NDX', 'CRUDE'],
        capital: 200000,
      },
      lastSignal: {
        symbol: 'BTC-USD',
        action: 'BUY',
        confidence: 91.2,
        timestamp: '1 minute ago',
      },
    },
  ]);

  const [selectedBot, setSelectedBot] = useState<TradingBot | null>(null);
  const [isCreatingBot, setIsCreatingBot] = useState(false);

  const toggleBotStatus = (botId: string) => {
    setBots(prev =>
      prev.map(bot => {
        if (bot.id === botId) {
          const newStatus = bot.status === 'active' ? 'paused' : 'active';
          return { ...bot, status: newStatus };
        }
        return bot;
      })
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'stopped':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const activeBots = bots.filter(bot => bot.status === 'active');
  const totalCapital = bots.reduce((sum, bot) => sum + bot.settings.capital, 0);
  const totalReturn = bots.reduce(
    (sum, bot) => sum + (bot.performance.totalReturn * bot.settings.capital) / 100,
    0
  );
  const avgWinRate = bots.reduce((sum, bot) => sum + bot.performance.winRate, 0) / bots.length;
  const totalTrades = bots.reduce((sum, bot) => sum + bot.performance.totalTrades, 0);

  return (
    <div className="space-y-6">
      {/* Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Bot className="w-8 h-8 text-blue-400" />
              <Badge className="bg-blue-500/20 text-blue-400">{activeBots.length} Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">{bots.length}</h3>
            <p className="text-gray-400">Trading Bots</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-500/20 text-green-400">
                +{((totalReturn / totalCapital) * 100).toFixed(1)}%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">${totalReturn.toLocaleString()}</h3>
            <p className="text-gray-400">Total Profit</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-400" />
              <Badge className="bg-purple-500/20 text-purple-400">Excellent</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">{avgWinRate.toFixed(1)}%</h3>
            <p className="text-gray-400">Average Win Rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-400" />
              <Badge className="bg-orange-500/20 text-orange-400">Live</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">{totalTrades.toLocaleString()}</h3>
            <p className="text-gray-400">Total Trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Bot Management */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="overview" className="text-white">
            Bot Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-white">
            Performance
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-white">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Trading Bots</h2>
            <Button
              onClick={() => setIsCreatingBot(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Bot className="w-4 h-4 mr-2" />
              Create New Bot
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bots.map(bot => (
              <Card key={bot.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(bot.status)}`} />
                      <div>
                        <CardTitle className="text-white">{bot.name}</CardTitle>
                        <p className="text-gray-400 text-sm">{bot.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={bot.status === 'active'}
                      onCheckedChange={() => toggleBotStatus(bot.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Total Return</p>
                      <p className="text-green-400 font-semibold">
                        +{bot.performance.totalReturn}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Win Rate</p>
                      <p className="text-blue-400 font-semibold">{bot.performance.winRate}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Trades</p>
                      <p className="text-white font-semibold">{bot.performance.totalTrades}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">Risk Level</p>
                      <p
                        className={`font-semibold capitalize ${getRiskLevelColor(bot.settings.riskLevel)}`}
                      >
                        {bot.settings.riskLevel}
                      </p>
                    </div>
                  </div>

                  {/* Strategies */}
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs">Active Strategies</p>
                    <div className="flex flex-wrap gap-1">
                      {bot.strategies.map(strategy => (
                        <Badge key={strategy} variant="outline" className="text-xs">
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Last Signal */}
                  {bot.lastSignal && (
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-medium">{bot.lastSignal.symbol}</span>
                          <Badge
                            className={`${bot.lastSignal.action === 'BUY' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                          >
                            {bot.lastSignal.action}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-semibold">
                            {bot.lastSignal.confidence}%
                          </p>
                          <p className="text-gray-400 text-xs">{bot.lastSignal.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBot(bot)}
                      className="flex-1"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bots.map(bot => (
                  <div key={bot.id} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(bot.status)}`} />
                      <h4 className="text-white font-medium">{bot.name}</h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Return</span>
                          <span className="text-green-400">+{bot.performance.totalReturn}%</span>
                        </div>
                        <Progress
                          value={Math.min(100, bot.performance.totalReturn * 2)}
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Win Rate</span>
                          <span className="text-blue-400">{bot.performance.winRate}%</span>
                        </div>
                        <Progress value={bot.performance.winRate} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Sharpe Ratio</span>
                          <span className="text-purple-400">{bot.performance.sharpeRatio}</span>
                        </div>
                        <Progress
                          value={Math.min(100, bot.performance.sharpeRatio * 25)}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {selectedBot ? (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Bot Configuration: {selectedBot.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Max Position Size (%)</Label>
                      <Input
                        type="number"
                        value={selectedBot.settings.maxPositionSize}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Stop Loss (%)</Label>
                      <Input
                        type="number"
                        value={selectedBot.settings.stopLoss}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Take Profit (%)</Label>
                      <Input
                        type="number"
                        value={selectedBot.settings.takeProfit}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Trading Capital</Label>
                      <Input
                        type="number"
                        value={selectedBot.settings.capital}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Risk Level</Label>
                      <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white">
                        <option value="low">Low Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="high">High Risk</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-white">Symbols (comma-separated)</Label>
                      <Input
                        value={selectedBot.settings.symbols.join(', ')}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  <Button variant="outline" onClick={() => setSelectedBot(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-12 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select a Bot to Configure</h3>
                <p className="text-gray-400">
                  Choose a trading bot from the overview tab to modify its settings
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
