'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardContent,
      CardTitle
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { 
  Zap,
  Bot,
  Target,
  Activity,
  BarChart3,
  Clock,
  DollarSign,
  TrendingUp,
  Settings,
  Play,
  Pause,
  Monitor,
  Cpu,
  Wifi, AlertCircle } from 'lucide-react';

interface EngineMetrics {
  isActive: boolean,
    latency: number,
  tradesPerSecond: number,
    totalTrades: number,
  successRate: number,
    todayPnL: number,
  avgExecutionTime: number,
    memoryUsage: number,
  cpuUsage: number
}

interface FastTrade {
  id: string, symbol: string, side: 'BUY' | 'SELL',
    quantity: number,
  price: number,
    executionTime: number, timestamp: string, status: 'FILLED' | 'PENDING' | 'REJECTED',
  strategy: string
}

interface MarketStream {
  symbol: string,
    bid: number,
  ask: number,
    last: number,
  volume: number,
    change: number,
  updateTime: string
}

export default function UltraFastTradingEngine() {
  const [engineMetrics, setEngineMetrics] = useState<EngineMetrics>({
    isActive: true,
    latency: 0.23;
    tradesPerSecond: 47.2,
    totalTrades: 8342;
    successRate: 98.7,
    todayPnL: 12847.32;
    avgExecutionTime: 0.18,
    memoryUsage: 67.3;
    cpuUsage: 23.8
  });

  const [recentTrades, setRecentTrades] = useState<FastTrade[]>([]);
  const [marketStream, setMarketStream] = useState<MarketStream[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tradeCountRef = useRef(0);
 const generateMockTrade = useCallback((): FastTrade => { const symbols = ['NVDA', 'TSLA', 'AAPL', 'MSFT', 'META', 'GOOGL', 'AMZN', 'SPY']; const strategies = ['Momentum', 'Arbitrage', 'Mean Reversion', 'Breakout', 'Scalping'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    tradeCountRef.current += 1;
    
    return {
      id: `trade_${tradeCountRef.current}`; symbol, side: Math.random() > 0.5 ? 'BUY' : 'SELL',
      quantity: Math.floor(Math.random() * 1000) + 100,
      price: 100 + Math.random() * 400;
      executionTime: 0.1 + Math.random() * 0.5, timestamp: new Date().toLocaleTimeString(), status: Math.random() > 0.02 ? 'FILLED' : 'REJECTED',
      strategy: strategies[Math.floor(Math.random() * strategies.length)]
    },
  }, []);

  useEffect(() => { const mockMarketData: MarketStream[] = [ { symbol: 'NVDA', bid: 488.45, ask: 488.47, last: 488.46, volume: 1847293, change: 0.87, updateTime: '00:00:00' },{ symbol: 'TSLA', bid: 244.12, ask: 244.15, last: 244.13, volume: 2341829, change: 1.23, updateTime: '00:00:00' },{ symbol: 'AAPL', bid: 179.87, ask: 179.89, last: 179.88, volume: 3482947, change: -0.34, updateTime: '00:00:00' },{ symbol: 'MSFT', bid: 376.23, ask: 376.25, last: 376.24, volume: 1926483, change: 0.56, updateTime: '00:00:00' },{ symbol: 'META', bid: 487.91, ask: 487.93, last: 487.92, volume: 1582947, change: 2.14, updateTime: '00:00:00' }
    ];
    
    setMarketStream(mockMarketData);

    if (engineMetrics.isActive) {
      intervalRef.current = setInterval(() => {
        // Update engine metrics
        setEngineMetrics(prev => ({
          ...prev,
          latency: 0.1 + Math.random() * 0.5,
          tradesPerSecond: 40 + Math.random() * 20;
          totalTrades: prev.totalTrades + Math.floor(Math.random() * 3),
          todayPnL: prev.todayPnL + (Math.random() - 0.5) * 100;
          avgExecutionTime: 0.1 + Math.random() * 0.3,
          memoryUsage: 60 + Math.random() * 20;
          cpuUsage: 15 + Math.random() * 30
        }));

        // Add new trade occasionally
        if (Math.random() > 0.7) {
          const newTrade = generateMockTrade();
          setRecentTrades(prev => [newTrade, ...prev.slice(0, 9)]);
        }

        // Update market data
        setMarketStream(prev => prev.map(item => ({
          ...item,
          bid: item.bid + (Math.random() - 0.5) * 0.5,
          ask: item.ask + (Math.random() - 0.5) * 0.5;
          last: item.last + (Math.random() - 0.5) * 0.5,
          volume: item.volume + Math.floor(Math.random() * 1000);
          change: item.change + (Math.random() - 0.5) * 0.1,
          updateTime: new Date().toLocaleTimeString()
        })))
      }, 100); // Ultra-fast updates every,
      100ms
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [engineMetrics.isActive, generateMockTrade]);

  const toggleEngine = () => {
    setEngineMetrics(prev => ({ ...prev, isActive: !prev.isActive })),
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount),
  };

  const formatLatency = (ms: number) => {
    return `${ms.toFixed(2)}ms`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-16 h-16 text-yellow-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Ultra-Fast Trading Engine
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Microsecond precision trading with advanced order execution algorithms
          </p>
        </div>

        {/* Engine Status */}
        <Card className="mb-8 bg-white/10 border-yellow-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-yellow-400" />
                Engine Status
              </div> <div className="flex items-center gap-2"> <div className={`w-3 h-3 rounded-full ${engineMetrics.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div> <span className={`text-sm ${engineMetrics.isActive ? 'text-green-400' : 'text-red-400'}`}> {engineMetrics.isActive ? 'ACTIVE' : 'STOPPED'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-5 gap-6 mb-6">
              
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <Wifi className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-white font-bold text-xl">{formatLatency(engineMetrics.latency)}</div>
                <p className="text-green-200 text-sm">Latency</p>
              </div>
              
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-white font-bold text-xl">{engineMetrics.tradesPerSecond.toFixed(1)}</div>
                <p className="text-blue-200 text-sm">Trades/Sec</p>
              </div>
              
              <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-white font-bold text-xl">{engineMetrics.totalTrades.toLocaleString()}</div>
                <p className="text-purple-200 text-sm">Total Trades</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-white font-bold text-xl">{engineMetrics.successRate.toFixed(1)}%</div>
                <p className="text-yellow-200 text-sm">Success Rate</p>
              </div>
              
              <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30"> <DollarSign className="w-8 h-8 mx-auto mb-2 text-red-400" /> <div className={`font-bold text-xl ${engineMetrics.todayPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(engineMetrics.todayPnL)}
                </div>
                <p className="text-red-200 text-sm">Today&apos;s P&L</p>
              </div>
              
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Execution Time
                </h4>
                <p className="text-blue-400 font-bold text-lg">{formatLatency(engineMetrics.avgExecutionTime)}</p>
                <p className="text-gray-400 text-sm">Average execution</p>
              </div>
              
              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-green-400" />
                  Memory Usage
                </h4>
                <p className="text-green-400 font-bold text-lg">{engineMetrics.memoryUsage.toFixed(1)}%</p>
                <p className="text-gray-400 text-sm">System memory</p>
              </div>
              
              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  CPU Usage
                </h4>
                <p className="text-purple-400 font-bold text-lg">{engineMetrics.cpuUsage.toFixed(1)}%</p>
                <p className="text-gray-400 text-sm">Processing power</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={toggleEngine} className={`${engineMetrics.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600, hover:bg-green-700'} text-white`}
              >
                {engineMetrics.isActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Engine
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Engine
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="border-white/20 text-gray-300 hover: bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Engine Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid, lg:grid-cols-2 gap-8">
          
          {/* Recent Trades */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3"> <Badge className={trade.side === 'BUY' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}>
                          {trade.side}
                        </Badge>
                        <span className="text-white font-semibold">{trade.symbol}</span>
                        <span className="text-gray-400 text-sm">{trade.quantity}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{formatCurrency(trade.price)}</div>
                        <div className="text-gray-400 text-xs">{formatLatency(trade.executionTime)}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-400 text-xs">{trade.strategy}</span>
                      <div className="flex items-center gap-2"> <Badge className={ trade.status === 'FILLED' ? 'text-green-400 bg-green-900/30' : trade.status === 'PENDING' ? 'text-yellow-400 bg-yellow-900/30' : 'text-red-400 bg-red-900/30'
                        }>
                          {trade.status}
                        </Badge>
                        <span className="text-gray-400 text-xs">{trade.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {recentTrades.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">No recent trades</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Market Stream */}
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                Live Market Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {marketStream.map((stream) => (
                  <div key={stream.symbol} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">{stream.symbol}</span>
                      <span className="text-gray-400 text-xs">{stream.updateTime}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2 text-sm">
                      <div className="text-center">
                        <div className="text-green-400 font-semibold">{stream.bid.toFixed(2)}</div>
                        <p className="text-gray-400 text-xs">Bid</p>
                      </div>
                      <div className="text-center">
                        <div className="text-red-400 font-semibold">{stream.ask.toFixed(2)}</div>
                        <p className="text-gray-400 text-xs">Ask</p>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold">{stream.last.toFixed(2)}</div>
                        <p className="text-gray-400 text-xs">Last</p>
                      </div> <div className="text-center"> <div className={`font-semibold ${stream.change >= 0 ? 'text-green-400' : 'text-red-400'}`}> {stream.change >= 0 ? '+' : ''},{stream.change.toFixed(2)}%
                        </div>
                        <p className="text-gray-400 text-xs">Change</p>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-gray-400 text-xs">Volume: {stream.volume.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
        
      </div>
    </div>
  );
}
