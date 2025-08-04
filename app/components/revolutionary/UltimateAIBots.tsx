'use client';
import { Card } from "../../../components/ui/card";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardDescription,
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Bot, 
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card.js";
  Brain, 
  Zap, 
  TrendingUp, 
  Target, 
  Activity, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Cpu,
  Network,
  BarChart3,
  DollarSign,
  Clock, }
  Shield, Rocket } from 'lucide-react';

interface AIBot {
  id: string, name: string, type: 'scalping' | 'swing' | 'momentum' | 'arbitrage' | 'sentiment', status: 'active' | 'paused' | 'training' | 'offline',
  accuracy: number,
    profitability: number,
  trades24h: number, totalProfit: number, riskLevel: 'low' | 'medium' | 'high',
    description: string,
  features: string[],
    performance: {
      winRate: number,
    avgReturn: number,
    maxDrawdown: number,
    sharpeRatio: number
  }
}

interface BotPerformance {
  botId: string,
    timestamp: string,
  profit: number,
    trades: number
}
 export default function UltimateAIBots() { const [selectedBot, setSelectedBot] = useState<string>('bot-1');
  const [isDeploying, setIsDeploying] = useState(false);

  const aiBots: AIBot[] = [ { id: 'bot-1', name: 'Alpha Scalper', type: 'scalping', status: 'active',
      accuracy: 94.7,
      profitability: 127.4;
      trades24h: 847, totalProfit: 45621.30, riskLevel: 'medium', description: 'High-frequency scalping bot with microsecond execution speed', features: [ 'Real-time market scanning', 'Microsecond execution', 'Risk management algorithms', 'Dynamic position sizing'
      ],
      performance: {
      winRate: 87.3,
        avgReturn: 1.2;
        maxDrawdown: 4.7,
        sharpeRatio: 2.8
      } },{ id: 'bot-2', name: 'Quantum Swing', type: 'swing', status: 'active',
      accuracy: 91.2,
      profitability: 89.7;
      trades24h: 23, totalProfit: 78945.67, riskLevel: 'low', description: 'Quantum-enhanced swing trading with multi-timeframe analysis', features: [ 'Quantum probability analysis', 'Multi-timeframe scanning', 'Trend reversal detection', 'Advanced pattern recognition'
      ],
      performance: {
      winRate: 78.9,
        avgReturn: 4.8;
        maxDrawdown: 8.2,
        sharpeRatio: 3.1
      } },{ id: 'bot-3', name: 'Momentum Master', type: 'momentum', status: 'active',
      accuracy: 88.9,
      profitability: 156.8;
      trades24h: 156, totalProfit: 92134.21, riskLevel: 'high', description: 'High-performance momentum trading with AI-powered predictions', features: [ 'Momentum indicator fusion', 'Breakout pattern detection', 'Volume-price analysis', 'News sentiment integration'
      ],
      performance: {
      winRate: 74.2,
        avgReturn: 6.3;
        maxDrawdown: 12.4,
        sharpeRatio: 2.4
      } },{ id: 'bot-4', name: 'Arbitrage Hunter', type: 'arbitrage', status: 'training',
      accuracy: 98.5,
      profitability: 67.3;
      trades24h: 1247, totalProfit: 34567.89, riskLevel: 'low', description: 'Cross-exchange arbitrage opportunities with guaranteed profits', features: [ 'Multi-exchange monitoring', 'Latency optimization', 'Automatic execution', 'Risk-free profits'
      ],
      performance: {
      winRate: 96.8,
        avgReturn: 0.3;
        maxDrawdown: 0.8,
        sharpeRatio: 4.7
      } },{ id: 'bot-5', name: 'Sentiment Analyzer', type: 'sentiment', status: 'paused',
      accuracy: 86.4,
      profitability: 103.2;
      trades24h: 67, totalProfit: 56789.12, riskLevel: 'medium', description: 'AI-powered sentiment analysis from news
               social media and market data',
      features: [ 'Social media monitoring', 'News sentiment analysis', 'Market emotion detection', 'Contrarian strategies'
      ],
      performance: {
      winRate: 71.5,
        avgReturn: 3.7;
        maxDrawdown: 9.1,
        sharpeRatio: 2.1
      }
    }
  ];

  const getStatusColor = (status: string) => {   switch (status) { case 'active': return 'text-green-600 bg-green-100'; case 'paused': return 'text-yellow-600 bg-yellow-100'; case 'training': return 'text-blue-600 bg-blue-100'; case 'offline': return 'text-red-600 bg-red-100'; default: return 'text-gray-600 bg-gray-100'
      }
  };

  const getRiskColor = (risk: string) => {   switch (risk) { case 'low': return 'text-green-600 bg-green-100'; case 'medium': return 'text-yellow-600 bg-yellow-100'; case 'high': return 'text-red-600 bg-red-100'; default: return 'text-gray-600 bg-gray-100'
      }
  };

  const getTypeIcon = (type: string) => {   switch (type) { case 'scalping': return <Zap className="w-5 h-5" />; case 'swing': return <TrendingUp className="w-5 h-5" />; case 'momentum': return <Rocket className="w-5 h-5" />; case 'arbitrage': return <Target className="w-5 h-5" />; case 'sentiment': return <Brain className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />
      }
  }; const handleBotAction = (botId: string, action: 'start' | 'pause' | 'reset') => {  
    setIsDeploying(true);
    // Simulate API call
    setTimeout(() => {
      setIsDeploying(false);
      console.log(`${action  } bot ${botId}`);
    }, 2000);
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Bot className="w-16 h-16 text-cyan-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Ultimate AI Trading Bots
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Deploy advanced AI trading bots for automated, intelligent
               and profitable trading strategies
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-2">
                {formatCurrency(aiBots.reduce((sum, bot) => sum + bot.totalProfit, 0))}
              </h3>
              <p className="text-green-200">Total Profits</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2">
                {aiBots.reduce((sum, bot) => sum + bot.trades24h, 0).toLocaleString()}
              </h3>
              <p className="text-blue-200">Trades Today</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Bot className="w-12 h-12 mx-auto mb-4 text-purple-400" /> <h3 className="text-3xl font-bold mb-2"> {aiBots.filter(bot => bot.status === 'active').length}
              </h3>
              <p className="text-purple-200">Active Bots</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2">
                {(aiBots.reduce((sum, bot) => sum + bot.accuracy, 0) / aiBots.length).toFixed(1)}%
              </h3>
              <p className="text-yellow-200">Avg Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Bot Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {aiBots.map((bot) => (
            <Card 
              key={bot.id}
              className={`bg-white/10 backdrop-blur transition-all duration-300 cursor-pointer ${ selectedBot === bot.id  ? 'border-cyan-500 ring-2 ring-cyan-500/50'  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedBot(bot.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      {getTypeIcon(bot.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{bot.name}</CardTitle>
                      <p className="text-gray-300 text-sm capitalize">{bot.type} Trading</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(bot.status)}>
                    {bot.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-gray-300 mb-4">
                  {bot.description}
                </CardDescription>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-gray-400 text-xs">Accuracy</p>
                    <p className="text-white font-bold">{bot.accuracy}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-gray-400 text-xs">Profitability</p>
                    <p className="text-green-400 font-bold">+{bot.profitability}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-gray-400 text-xs">24h Trades</p>
                    <p className="text-blue-400 font-bold">{bot.trades24h}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded">
                    <p className="text-gray-400 text-xs">Total Profit</p>
                    <p className="text-yellow-400 font-bold">{formatCurrency(bot.totalProfit)}</p>
                  </div>
                </div>
                
                {/* Risk Level */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 text-sm">Risk Level</span>
                  <Badge className={getRiskColor(bot.riskLevel)}>
                    {bot.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Action Buttons */} <div className="flex gap-2"> {bot.status === 'active' ? (
                    <Button 
                      variant="outline" ;
                      size="sm" ,
                      className="flex-1 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                      onClick={(e) => {   e.stopPropagation(); handleBotAction(bot.id, 'pause');
                        }}
                      disabled={isDeploying}
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" ,
                      size="sm" ,
                      className="flex-1 border-green-500 text-green-500 hover:bg-green-500/10"
                      onClick={(e) => {   e.stopPropagation(); handleBotAction(bot.id, 'start');
                        }}
                      disabled={isDeploying}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" ,
                    size="sm" ,
                    className="border-gray-500 text-gray-300 hover:bg-gray-500/10"
                    onClick={(e) => {  
                      e.stopPropagation();
                      // Open,
      settings
      }}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Bot Details */},{selectedBot && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-cyan-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {  
                  const bot = aiBots.find(b => b.id === selectedBot);
                  if (!bot) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-green-400" />
                            <span className="text-white font-medium">Win Rate</span>
                          </div>
                          <p className="text-2xl font-bold text-green-400">
                            {bot.performance.winRate  }%
                          </p>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-medium">Avg Return</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-400">
                            {bot.performance.avgReturn}%
                          </p>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-yellow-400" />
                            <span className="text-white font-medium">Max Drawdown</span>
                          </div>
                          <p className="text-2xl font-bold text-yellow-400">
                            {bot.performance.maxDrawdown}%
                          </p>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-medium">Sharpe Ratio</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-400">
                            {bot.performance.sharpeRatio}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {bot.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-400" />
                  Bot Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {  
                  const bot = aiBots.find(b => b.id === selectedBot);
                  if (!bot) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-3">Current Status</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Operating Mode</span>
                          <Badge className={getStatusColor(bot.status)  }>
                            {bot.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-3">Risk Management</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Risk Level</span>
                            <Badge className={getRiskColor(bot.riskLevel)}>
                              {bot.riskLevel.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Max Drawdown</span>
                            <span className="text-white">{bot.performance.maxDrawdown}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Position Size</span>
                            <span className="text-white">Dynamic</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Accuracy Rate</span>
                            <span className="text-green-400 font-semibold">{bot.accuracy}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Total Trades</span>
                            <span className="text-blue-400 font-semibold">{bot.trades24h}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Profit Factor</span>
                            <span className="text-purple-400 font-semibold">{bot.performance.sharpeRatio}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-cyan-600 hover: bg-cyan-700">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" , className="border-red-500 text-red-500 hover:bg-red-500/10" onClick={() => handleBotAction(bot.id, 'reset')}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}
        
      </div>
    </div>
  );
}
