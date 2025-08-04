import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
'use client';
import { Card } from "../../../components/ui/card";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent,
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Bot, 
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Activity,
  Target,
  Zap,
  BarChart3,
  Clock,
  Star, }
  Wifi, WifiOff } from 'lucide-react';

interface BotStatus {
  isActive: boolean,
    isConnected: boolean,
  uptime: string,
    totalTrades: number,
  todayPnL: number,
    winRate: number,
  avgTradeTime: string,
    lastAction: string
}

interface Position { symbol: string, side: 'LONG' | 'SHORT',
  size: number,
    entryPrice: number,
  currentPrice: number,
    pnl: number,
  pnlPercent: number,
    timestamp: string
}

export default function LiveTradingBot() {
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isActive: true, isConnected: true, uptime: '12h 34m',
    totalTrades: 47,
    todayPnL: 3420.75, winRate: 68.1, avgTradeTime: '2.4 min', lastAction: 'BUY NVDA @ $489.32'
  });

  const [positions, setPositions] = useState<Position[]>([]);
  const [marketData, setMarketData] = useState({
    sp500: {
      price: 5847.25, change: 0.23  }, nasdaq: {
      price: 19123.45, change: 0.15  }, vix: {
      price: 15.67, change: -2.45 }
  });

  useEffect(() => {
    const mockPositions: Position[] = [ { symbol: 'NVDA', side: 'LONG',
        size: 50,
        entryPrice: 485.20;
        currentPrice: 489.32,
        pnl: 206.00, pnlPercent: 0.85, timestamp: '14:32:15' },{ symbol: 'TSLA', side: 'LONG',
        size: 25,
        entryPrice: 240.80;
        currentPrice: 245.67,
        pnl: 121.75, pnlPercent: 2.02, timestamp: '13:15:42' },{ symbol: 'AAPL', side: 'SHORT',
        size: 100,
        entryPrice: 180.50;
        currentPrice: 178.42,
        pnl: 208.00, pnlPercent: 1.15, timestamp: '12:45:20'
      }
    ];
    
    setPositions(mockPositions);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBotStatus(prev => ({
        ...prev,
        todayPnL: prev.todayPnL + (Math.random() - 0.5) * 50,
        totalTrades: prev.totalTrades + (Math.random() > 0.98 ? 1 : 0)
      }));

      setMarketData(prev => ({
        sp500: { 
          ...prev.sp500; 
          price: prev.sp500.price + (Math.random() - 0.5) * 2  }, nasdaq: { 
          ...prev.nasdaq; 
          price: prev.nasdaq.price + (Math.random() - 0.5) * 10  }, vix: { 
          ...prev.vix; 
          price: prev.vix.price + (Math.random() - 0.5) * 0.5 
        }
      })),
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleBot = () => {
    setBotStatus(prev => ({ ...prev, isActive: !prev.isActive })),
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount),
  };
 const formatPercent = (percent: number) => {   return `${percent >= 0 ? '+' : ''  }${percent.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Bot className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Live Trading Bot
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Real-time autonomous trading with advanced AI algorithms
          </p>
        </div>

        {/* Status Overview */}
        <Card className="mb-8 bg-white/10 border-blue-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                Bot Status
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {botStatus.isConnected ? (
                    <Wifi className="w-5 h-5 text-green-400" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-400" /> )} <span className={`text-sm ${botStatus.isConnected ? 'text-green-400' : 'text-red-400'}`}> {botStatus.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span> </div> <div className={`w-3 h-3 rounded-full ${botStatus.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div> <span className={`text-sm ${botStatus.isActive ? 'text-green-400' : 'text-red-400'}`}> {botStatus.isActive ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-5 gap-6">
              
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-white font-bold text-xl">{botStatus.uptime}</div>
                <p className="text-blue-200 text-sm">Uptime</p>
              </div>
              
              <div className="text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-white font-bold text-xl">{botStatus.totalTrades}</div>
                <p className="text-green-200 text-sm">Total Trades</p>
              </div>
              
              <div className="text-center"> <DollarSign className="w-8 h-8 mx-auto mb-2 text-yellow-400" /> <div className={`font-bold text-xl ${botStatus.todayPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(botStatus.todayPnL)}
                </div>
                <p className="text-yellow-200 text-sm">Today&apos;s P&L</p>
              </div>
              
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-white font-bold text-xl">{botStatus.winRate}%</div>
                <p className="text-purple-200 text-sm">Win Rate</p>
              </div>
              
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-white font-bold text-xl">{botStatus.avgTradeTime}</div>
                <p className="text-orange-200 text-sm">Avg Trade Time</p>
              </div>
              
            </div>
            
            <div className="mt-6 flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
              <div>
                <p className="text-gray-400 text-sm">Last Action:</p>
                <p className="text-white font-semibold">{botStatus.lastAction}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={toggleBot} className={`${botStatus.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600, hover:bg-green-700'} text-white`}
                >
                  {botStatus.isActive ? (
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
                  className="border-white/20 text-gray-300 hover:bg-white/10"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">S&P 500</h3>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {marketData.sp500.price.toFixed(2)}
              </div> <div className={`text-sm ${marketData.sp500.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercent(marketData.sp500.change)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">NASDAQ</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">
                {marketData.nasdaq.price.toFixed(2)} </div> <div className={`text-sm ${marketData.nasdaq.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercent(marketData.nasdaq.change)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">VIX</h3>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {marketData.vix.price.toFixed(2)} </div> <div className={`text-sm ${marketData.vix.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercent(marketData.vix.change)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Positions */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Active Positions ({positions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {positions.map((position, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="grid lg:grid-cols-7 gap-4 items-center">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {position.symbol.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{position.symbol}</h3>
                        <p className="text-gray-400 text-sm">{position.size} shares</p>
                      </div>
                    </div>
                     <div className="text-center"> <Badge className={position.side === 'LONG' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}>
                        {position.side}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatCurrency(position.entryPrice)}</div>
                      <p className="text-gray-400 text-sm">Entry</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{formatCurrency(position.currentPrice)}</div>
                      <p className="text-gray-400 text-sm">Current</p>
                    </div>
                     <div className="text-center"> <div className={`font-bold text-lg ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(position.pnl)} </div> <div className={`text-sm ${position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(position.pnlPercent)}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-semibold">AI</span>
                      </div>
                      <p className="text-gray-400 text-sm">Auto Trade</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{position.timestamp}</div>
                      <p className="text-gray-400 text-sm">Entry Time</p>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
            
            {positions.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No active positions</p>
                <p className="text-gray-500 mt-2">Bot is scanning for opportunities</p>
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
