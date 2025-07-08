import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { CardTitle } from "../../components/ui/card";
import { CardHeader } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import React from 'react';
'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Bell, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Star
} from 'lucide-react';

interface TradingSignal {
  id: string;
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  timeframe: string;
  entry: number;
  target: number;
  stopLoss: number;
  riskReward: number;
  aiModel: string;
  reasoning: string[];
  timestamp: Date;
  status: 'active' | 'triggered' | 'closed';
  pnl?: number;
}

export default function AITradingSignals() {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [filter, setFilter] = useState<'all' | 'BUY' | 'SELL' | 'HOLD'>('all');

  useEffect(() => {
    // Generate mock trading signals
    const generateSignals = () => {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'CRM'];
      const actions: ('BUY' | 'SELL' | 'HOLD')[] = ['BUY', 'SELL', 'HOLD'];
      const timeframes = ['1H', '4H', '1D', '1W'];
      const aiModels = ['Neural Alpha', 'Quantum Predictor', 'Deep Momentum', 'Pattern Master'];
      const statuses: ('active' | 'triggered' | 'closed')[] = ['active', 'triggered', 'closed'];

      return Array.from({ length: 12 }, (_, i) => {
        const action = actions[Math.floor(Math.random() * actions.length)];
        const price = 100 + Math.random() * 300;
        const targetMultiplier = action === 'BUY' ? 1 + Math.random() * 0.1 : 1 - Math.random() * 0.1;
        const stopLossMultiplier = action === 'BUY' ? 1 - Math.random() * 0.05 : 1 + Math.random() * 0.05;
        
        return {
          id: `signal-${i}`,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          action,
          confidence: 60 + Math.random() * 40,
          timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
          entry: price,
          target: price * targetMultiplier,
          stopLoss: price * stopLossMultiplier,
          riskReward: 1 + Math.random() * 3,
          aiModel: aiModels[Math.floor(Math.random() * aiModels.length)],
          reasoning: [
            'Strong bullish momentum detected',
            'Volume surge above 20-day average',
            'RSI showing oversold conditions',
            'Pattern recognition: ascending triangle'
          ].slice(0, 2 + Math.floor(Math.random() * 3)),
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          pnl: Math.random() > 0.5 ? (Math.random() - 0.5) * 1000 : undefined
        };
      });
    };

    setSignals(generateSignals());
    
    // Update signals every 10 seconds
    const interval = setInterval(() => {
      setSignals(prev => prev.map(signal => ({
        ...signal,
        confidence: Math.max(50, Math.min(100, signal.confidence + (Math.random() - 0.5) * 5))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY': return 'bg-green-500';
      case 'SELL': return 'bg-red-500';
      case 'HOLD': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'triggered': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'closed': return <Target className="w-4 h-4 text-gray-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-400" />;
    }
  };

  const filteredSignals = signals.filter(signal => 
    filter === 'all' || signal.action === filter
  );

  const timeframes = ['1H', '4H', '1D', '1W', '1M'];

  return (
    <div className="space-y-6">
      {/* AI Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-white">78.5%</p>
              </div>
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Avg R:R</p>
                <p className="text-2xl font-bold text-white">2.4:1</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Active Signals</p>
                <p className="text-2xl font-bold text-white">{signals.filter(s => s.status === 'active').length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm">Total Profit</p>
                <p className="text-2xl font-bold text-white">+$47,892</p>
              </div>
              <Star className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-black/60 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-400" />
              <span>AI Trading Signals</span>
            </CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Bell className="w-4 h-4 mr-2" />
              Enable Alerts
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Timeframe Filter */}
            <div className="flex space-x-2">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  variant={selectedTimeframe === tf ? 'default' : 'outline'}
                  className="text-sm"
                >
                  {tf}
                </Button>
              ))}
            </div>

            {/* Action Filter */}
            <div className="flex space-x-2">
              {['all', 'BUY', 'SELL', 'HOLD'].map((f) => (
                <Button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  variant={filter === f ? 'default' : 'outline'}
                  className="text-sm"
                >
                  {f.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Signals List */}
          <div className="space-y-4">
            {filteredSignals.map((signal) => (
              <Card key={signal.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-center">
                        <p className="text-white font-bold text-lg">{signal.symbol}</p>
                        <Badge className={`${getActionColor(signal.action)} text-white`}>
                          {signal.action}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(signal.status)}
                          <span className="text-gray-300 text-sm">{signal.status}</span>
                          <Badge variant="outline" className="text-xs">
                            {signal.timeframe}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {signal.aiModel}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <span className="text-gray-400">Entry: </span>
                            <span className="text-white font-semibold">${signal.entry.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Target: </span>
                            <span className="text-green-400 font-semibold">${signal.target.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Stop: </span>
                            <span className="text-red-400 font-semibold">${signal.stopLoss.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">R:R: </span>
                            <span className="text-white font-semibold">{signal.riskReward.toFixed(1)}:1</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {signal.reasoning.map((reason, idx) => (
                            <p key={idx} className="text-gray-400 text-xs">• {reason}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div>
                        <p className="text-gray-400 text-sm">Confidence</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={signal.confidence} className="w-20 h-2" />
                          <span className="text-white text-sm">{signal.confidence.toFixed(0)}%</span>
                        </div>
                      </div>

                      {signal.pnl !== undefined && (
                        <div>
                          <p className="text-gray-400 text-sm">P&L</p>
                          <p className={`font-bold ${signal.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {signal.pnl >= 0 ? '+' : ''}${signal.pnl.toFixed(0)}
                          </p>
                        </div>
                      )}

                      <p className="text-gray-400 text-xs">
                        {signal.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
