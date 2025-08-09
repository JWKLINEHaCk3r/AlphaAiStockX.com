import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-simple';
import { TrendingUp, TrendingDown, Activity, Globe, Zap } from 'lucide-react';

interface MarketData {
  sp500: { value: number; change: number };
  nasdaq: { value: number; change: number };
  dow: { value: number; change: number };
}

interface MarketOverviewProps {
  marketData?: MarketData;
  aiMarketSentiment?: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  tradingVolume?: number;
  aiActiveSignals?: number;
}

// Real-time Market Overview Component
export const MarketOverview = ({ 
  marketData = {
    sp500: { value: 4750.23, change: 1.2 },
    nasdaq: { value: 14820.45, change: -0.8 },
    dow: { value: 35420.67, change: 0.5 }
  },
  aiMarketSentiment = 'BULLISH',
  tradingVolume = 2.8,
  aiActiveSignals = 47
}: MarketOverviewProps) => (
  <Card className="bg-gradient-to-br from-slate-950 to-slate-900 border-slate-800">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-blue-400" />
        Market Overview
        <Badge variant="outline" className="ml-auto">
          <Activity className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(marketData).map(([index, data]) => {  
          const isPositive = data.change >= 0;
          const name = index.toUpperCase();
          return (
            <div key={index} className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">{name}</div>
              <div className="font-bold">{data.value.toLocaleString()}</div>
              <div className={`text-sm flex items-center justify-center gap-1 ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? '+' : ''}{data.change}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-medium">AI Market Sentiment</div>
            <Badge variant={
              aiMarketSentiment === 'BULLISH' ? 'default' : 
              aiMarketSentiment === 'BEARISH' ? 'destructive' : 
              'secondary'
            }>
              {aiMarketSentiment}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Trading Volume</span>
            <span className="font-medium">{tradingVolume}B</span>
          </div>
          <Progress value={(tradingVolume / 5) * 100} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">AI Active Signals</span>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-yellow-400">{aiActiveSignals}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// AI Performance Metrics Component
export const AIPerformanceMetrics = ({ 
  winRate = 94.7,
  totalTrades = 2847,
  avgProfit = 12.4,
  aiUptime = 99.97
}: {
  winRate?: number;
  totalTrades?: number;
  avgProfit?: number;
  aiUptime?: number;
}) => (
  <Card className="bg-gradient-to-br from-purple-950 to-blue-950 border-purple-800">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-purple-400" />
        AI Performance
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{winRate}%</div>
          <div className="text-sm text-gray-400">Win Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{totalTrades}</div>
          <div className="text-sm text-gray-400">Total Trades</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{avgProfit}%</div>
          <div className="text-sm text-gray-400">Avg Profit</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">{aiUptime}%</div>
          <div className="text-sm text-gray-400">AI Uptime</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MarketOverview;
