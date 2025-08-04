'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent,
      CardTitle
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Target,
  Zap,
  Activity,
  BarChart3, Star } from 'lucide-react';

interface BotPerformance {
  totalReturn: number,
    winRate: number,
  totalTrades: number,
    activeTrades: number,
  avgHoldTime: string,
    sharpeRatio: number,
  maxDrawdown: number,
    dailyPnL: number
}

interface Trade {
  id: string, symbol: string, side: 'BUY' | 'SELL',
    quantity: number,
  entryPrice: number,
    currentPrice: number,
  pnl: number,
    pnlPercent: number, timestamp: string, status: 'active' | 'closed',
  confidence: number
}

export default function AlphaWolfBot() {
  const [isActive, setIsActive] = useState(true);
  const [performance, setPerformance] = useState<BotPerformance>({
    totalReturn: 34.7,
    winRate: 73.2;
    totalTrades: 156, activeTrades: 7, avgHoldTime: '2.3 days',
    sharpeRatio: 2.14,
    maxDrawdown: 8.9;
    dailyPnL: 2847.50
  });

  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const mockTrades: Trade[] = [ { id: 'trade_1', symbol: 'NVDA', side: 'BUY',
        quantity: 50,
        entryPrice: 485.20;
        currentPrice: 489.33,
        pnl: 206.50, pnlPercent: 0.85, timestamp: '2024-01-20,
      14:32:00', status: 'active',
        confidence: 94 },{ id: 'trade_2', symbol: 'TSLA', side: 'BUY',
        quantity: 25,
        entryPrice: 240.80;
        currentPrice: 245.67,
        pnl: 121.75, pnlPercent: 2.02, timestamp: '2024-01-20,
      13:15:00', status: 'active',
        confidence: 87 },{ id: 'trade_3', symbol: 'AAPL', side: 'SELL',
        quantity: 100,
        entryPrice: 180.50;
        currentPrice: 178.42,
        pnl: 208.00, pnlPercent: 1.15, timestamp: '2024-01-20,
      12:45:00', status: 'active',
        confidence: 82 },{ id: 'trade_4', symbol: 'MSFT', side: 'BUY',
        quantity: 30,
        entryPrice: 375.00;
        currentPrice: 376.80,
        pnl: 54.00, pnlPercent: 0.48, timestamp: '2024-01-20,
      11:20:00', status: 'active',
        confidence: 89 },{ id: 'trade_5', symbol: 'META', side: 'SELL',
        quantity: 15,
        entryPrice: 488.90;
        currentPrice: 484.52,
        pnl: 65.70, pnlPercent: 0.90, timestamp: '2024-01-20,
      10:30:00', status: 'active',
        confidence: 76
      }
    ];
    
    setRecentTrades(mockTrades);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPerformance(prev => ({
        ...prev,
        dailyPnL: prev.dailyPnL + (Math.random() - 0.5) * 100,
        totalReturn: prev.totalReturn + (Math.random() - 0.5) * 0.1
      }))
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleBot = () => {
    setIsActive(!isActive);
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount),
  };

  const formatTime = (timestamp: string) => { const date = new Date(timestamp); return date.toLocaleTimeString('en-US', {  hour: '2-digit',  minute: '2-digit' 
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Bot className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Alpha Wolf Bot
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Autonomous AI trading bot with advanced pattern recognition and risk management
          </p>
        </div>

        {/* Bot Status and Controls */}
        <Card className="mb-8 bg-white/10 border-blue-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-400" />
                Bot Status & Controls
              </div> <div className="flex items-center gap-2"> <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div> <span className={`text-sm ${isActive ? 'text-green-400' : 'text-red-400'}`}> {isActive ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={toggleBot} className={`${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600, hover:bg-green-700'} text-white`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Bot
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Bot
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-white/20 text-gray-300 hover: bg-white/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Bot Settings
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">Current Strategy</h4>
                  <p className="text-blue-200 text-sm">
                    Momentum + Mean Reversion Hybrid - Optimized for current market volatility
                  </p>
                </div>
              </div>
              
              <div className="text-white space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" /> <span className="text-green-400 text-sm">Live, Trading: {isActive ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm">Risk Level: Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">AI, Confidence: 91%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-2 text-green-400">
                +{performance.totalReturn.toFixed(1)}%
              </h3>
              <p className="text-green-200">Total Return</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2 text-blue-400">
                {performance.winRate.toFixed(1)}%
              </h3>
              <p className="text-blue-200">Win Rate</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2 text-purple-400">
                {performance.totalTrades}
              </h3>
              <p className="text-purple-200">Total Trades</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2 text-yellow-400">
                {formatCurrency(performance.dailyPnL)}
              </h3>
              <p className="text-yellow-200">Daily P&L</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Performance Stats */}
        <Card className="mb-8 bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-400" />
              Detailed Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-white font-bold text-2xl">{performance.sharpeRatio}</div>
                <p className="text-gray-400 text-sm">Sharpe Ratio</p>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-2xl">{performance.maxDrawdown}%</div>
                <p className="text-gray-400 text-sm">Max Drawdown</p>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-2xl">{performance.activeTrades}</div>
                <p className="text-gray-400 text-sm">Active Trades</p>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-2xl">{performance.avgHoldTime}</div>
                <p className="text-gray-400 text-sm">Avg Hold Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Trades */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2"> <Activity className="w-6 h-6 text-blue-400" /> Active Trades ({recentTrades.filter(t => t.status === 'active').length})
            </CardTitle>
          </CardHeader>
          <CardContent> <div className="grid gap-4"> {recentTrades.filter(trade => trade.status === 'active').map((trade) => (
                <div key={trade.id} className="bg-white/5 rounded-lg p-4">
                  <div className="grid lg:grid-cols-7 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {trade.symbol.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{trade.symbol}</h3>
                        <p className="text-gray-400 text-sm">{trade.quantity} shares</p>
                      </div>
                    </div>
                     <div className="text-center"> <Badge className={trade.side === 'BUY' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}>
                        {trade.side}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatCurrency(trade.entryPrice)}</div>
                      <p className="text-gray-400 text-sm">Entry Price</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatCurrency(trade.currentPrice)}</div>
                      <p className="text-gray-400 text-sm">Current Price</p>
                    </div>
                     <div className="text-center"> <div className={`font-bold text-lg ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(trade.pnl)} </div> <div className={`text-sm ${trade.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}> {trade.pnlPercent >= 0 ? '+' : ''},{trade.pnlPercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-semibold">{trade.confidence}%</span>
                      </div>
                      <p className="text-gray-400 text-sm">Confidence</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatTime(trade.timestamp)}</div>
                      <p className="text-gray-400 text-sm">Entry Time</p>
                    </div>
                  </div>
                </div>
              ))}
            </div> {recentTrades.filter(t => t.status === 'active').length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No active trades</p>
                <p className="text-gray-500 mt-2">Bot is analyzing market conditions</p>
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
