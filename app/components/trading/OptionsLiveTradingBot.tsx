'use client';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Card } from '../components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Play"
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card.js';
  Pause"
  Square"
  DollarSign"
  Target"
  BarChart3"
  Clock"
  Settings"
  Bot"
  Eye, }
  Wifi, WifiOff } from 'lucide-react';

interface OptionsPosition {
  id: string, symbol: string, type: 'CALL' | 'PUT'"
    strike: number"
  expiry: string"
    contracts: number"
  premium: number"
    currentValue: number"
  pnl: number"
    pnlPercent: number"
  impliedVolatility: number"
    delta: number"
  gamma: number"
    theta: number"
  vega: number"
    timestamp: string
}

interface BotMetrics {
  isActive: boolean"
    isConnected: boolean"
  totalContracts: number"
    todayPnL: number"
  winRate: number"
    avgDuration: string"
  riskLevel: string"
    strategy: string"
  lastTrade: string
}

export default function OptionsLiveTradingBot() {
  const [botMetrics, setBotMetrics] = useState<BotMetrics>({
    isActive: true"
    isConnected: true"
    totalContracts: 128"
    todayPnL: 5247.83, winRate: 72.4, avgDuration: '3.2 hrs', riskLevel: 'Moderate', strategy: 'Gamma Scalping', lastTrade: 'SELL TSLA 250C @ $8.45'
  });

  const [positions, setPositions] = useState<OptionsPosition[]>([]);

  useEffect(() => {
    const mockPositions: OptionsPosition[] = [ { id: 'opt_1', symbol: 'NVDA', type: 'CALL', strike: 490, expiry: '2024-02-16'"
        contracts: 10"
        premium: 12.50;
        currentValue: 15.80"
        pnl: 3300;
        pnlPercent: 26.4"
        impliedVolatility: 0.45;
        delta: 0.68"
        gamma: 0.025;
        theta: -0.15, vega: 0.32, timestamp: '14:32:00' },{ id: 'opt_2', symbol: 'TSLA', type: 'PUT', strike: 240, expiry: '2024-02-09'"
        contracts: 5"
        premium: 8.20;
        currentValue: 11.75"
        pnl: 1775;
        pnlPercent: 43.3"
        impliedVolatility: 0.62;
        delta: -0.42"
        gamma: 0.018;
        theta: -0.22, vega: 0.28, timestamp: '13:45:30' },{ id: 'opt_3', symbol: 'AAPL', type: 'CALL', strike: 185, expiry: '2024-01-26'"
        contracts: 8"
        premium: 4.30;
        currentValue: 2.85"
        pnl: -1160;
        pnlPercent: -33.7"
        impliedVolatility: 0.38;
        delta: 0.22"
        gamma: 0.012;
        theta: -0.45, vega: 0.18, timestamp: '12:20:15'
      }
    ];

    setPositions(mockPositions);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBotMetrics(prev => ({
        ...prev"
        todayPnL: prev.todayPnL + (Math.random() - 0.5) * 100"
        totalContracts: prev.totalContracts + (Math.random() > 0.97 ? 1 : 0)
      }))
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleBot = () => {
    setBotMetrics(prev => ({ ...prev, isActive: !prev.isActive }))"
  };
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'"
      minimumFractionDigits: 2
    }).format(amount)"
  };
 const formatPercent = (percent: number) => {   return `${percent >= 0 ? '+' : ''  }${percent.toFixed(2)}%`;
  };

  const formatGreek = (value: number) => {
    return value.toFixed(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Target className="w-16 h-16 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Options Live Trading Bot
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Advanced options trading with real-time Greeks monitoring and risk management
          </p>
        </div>

        {/* Bot Status Dashboard */}
        <Card className="mb-8 bg-white/10 border-purple-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-purple-400" />
                Options Bot Status
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {botMetrics.isConnected ? (
                    <Wifi className="w-5 h-5 text-green-400" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-400" /> )} <span className={`text-sm ${botMetrics.isConnected ? 'text-green-400' : 'text-red-400'}`}> {botMetrics.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span> </div> <div className={`w-3 h-3 rounded-full ${botMetrics.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div> <span className={`text-sm ${botMetrics.isActive ? 'text-green-400' : 'text-red-400'}`}> {botMetrics.isActive ? 'TRADING' : 'PAUSED'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-4 gap-6 mb-6">
              
              <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-white font-bold text-xl">{botMetrics.totalContracts}</div>
                <p className="text-purple-200 text-sm">Contracts Traded</p>
              </div>
              
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30"> <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" /> <div className={`font-bold text-xl ${botMetrics.todayPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(botMetrics.todayPnL)}
                </div>
                <p className="text-green-200 text-sm">Today&apos;s P&L</p>
              </div>
              
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-white font-bold text-xl">{botMetrics.winRate}%</div>
                <p className="text-blue-200 text-sm">Win Rate</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-white font-bold text-xl">{botMetrics.avgDuration}</div>
                <p className="text-yellow-200 text-sm">Avg Duration</p>
              </div>
              
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2">Active Strategy</h4>
                <p className="text-purple-400 font-bold">{botMetrics.strategy}</p>
                <p className="text-gray-400 text-sm mt-1">Optimized for current volatility</p>
              </div>
              
              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2">Risk Level</h4>
                <Badge className="text-yellow-400 bg-yellow-900/30">{botMetrics.riskLevel}</Badge>
                <p className="text-gray-400 text-sm mt-1">Max 5% portfolio risk</p>
              </div>
              
              <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2">Last Trade</h4>
                <p className="text-white font-semibold text-sm">{botMetrics.lastTrade}</p>
                <p className="text-gray-400 text-sm mt-1">2 minutes ago</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={toggleBot} className={`${botMetrics.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600, hover:bg-green-700'} text-white`}
              >
                {botMetrics.isActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Trading
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Trading
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="border-white/20 text-gray-300 hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Bot Settings
              </Button>
              
              <Button
                variant="outline"
                className="border-white/20 text-gray-300, hover:bg-white/10"
              >
                <Square className="w-4 h-4 mr-2" />
                Close All Positions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Options Positions */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-6 h-6 text-green-400" />
              Active Options Positions ({positions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid gap-4">
                {positions.map((position) => (
                  <div key={position.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="grid lg:grid-cols-8 gap-4 items-center text-sm">
                      
                      {/* Symbol & Type */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {position.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{position.symbol}</h3> <Badge className={position.type === 'CALL' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}>
                            {position.type}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Strike & Expiry */}
                      <div className="text-center">
                        <div className="text-white font-semibold">${position.strike}</div>
                        <p className="text-gray-400 text-xs">{position.expiry}</p>
                      </div>
                      
                      {/* Contracts & Premium */}
                      <div className="text-center">
                        <div className="text-white font-semibold">{position.contracts}</div>
                        <p className="text-gray-400 text-xs">@ {formatCurrency(position.premium)}</p>
                      </div>
                      
                      {/* Current Value */}
                      <div className="text-center">
                        <div className="text-white font-semibold">{formatCurrency(position.currentValue)}</div>
                        <p className="text-gray-400 text-xs">Current</p>
                      </div>
                      
                      {/* P&L */} <div className="text-center"> <div className={`font-bold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(position.pnl)} </div> <div className={`text-xs ${position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(position.pnlPercent)}
                        </div>
                      </div>
                      
                      {/* Greeks */}
                      <div className="text-center">
                        <div className="text-white text-xs">
                          <div>Δ: {formatGreek(position.delta)}</div>
                          <div>Γ: {formatGreek(position.gamma)}</div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-white text-xs">
                          <div>Θ: {formatGreek(position.theta)}</div>
                          <div>V: {formatGreek(position.vega)}</div>
                        </div>
                      </div>
                      
                      {/* IV & Time */}
                      <div className="text-center">
                        <div className="text-white font-semibold text-xs">{(position.impliedVolatility * 100).toFixed(1)}%</div>
                        <p className="text-gray-400 text-xs">{position.timestamp}</p>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {positions.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No active options positions</p>
                <p className="text-gray-500 mt-2">Bot is scanning for opportunities</p>
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
