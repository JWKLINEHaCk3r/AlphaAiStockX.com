import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "./card.js";
import { Card } from "./card.js";
import React from 'react'; import { Badge } from './badge'; import { Progress } from './progress';
import { TrendingUp, TrendingDown, Activity, Globe, Zap } from 'lucide-react';

// Real-time Market Overview Component;
export const MarketOverview = ({ 
  marketData = {
    sp500: {
      value: 4750.23, change: 1.2 },
    nasdaq: {
      value: 14820.45, change: -0.8 },
    dow: {
      value: 35420.67, change: 0.5 } }; aiMarketSentiment = 'BULLISH';
  tradingVolume = 2.8;
  aiActiveSignals = 47;
}: {
  marketData?: {
    sp500: {
      value: number, change: number },
    nasdaq: {
      value: number, change: number },
    dow: {
      value: number, change: number }, }; aiMarketSentiment?: 'BULLISH' | 'BEARISH' | 'NEUTRAL',
  tradingVolume?: number;
  aiActiveSignals?: number;
}) => (
  <Card className="bg-gradient-to-br from-slate-950 to-slate-900 border-slate-800">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-blue-400" />
        Market Overview;
        <Badge variant="outline" className="ml-auto">
          <Activity className="w-3 h-3 mr-1" />
          Live;
        </Badge>
      </CardTitle>
      <CardDescription>Real-time market data powered by AlphaAI</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(marketData).map(([index, data]) => {  
          const isPositive = data.change >= 0;
          const name = index.toUpperCase();
          return (
            <div key={index  } className="text-center p-3 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">{name}</div>
              <div className="font-bold">{data.value.toLocaleString()}</div> <div className={`text-sm flex items-center justify-center gap-1 ${ isPositive ? 'text-green-400' : 'text-red-400'; }`}> {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />},{isPositive ? '+' : ''},{data.change}%;
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between py-3 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <div>
            <div className="font-medium">AI Market Sentiment</div> <Badge variant={ aiMarketSentiment === 'BULLISH' ? 'default' :  aiMarketSentiment === 'BEARISH' ? 'destructive' :  'secondary';
            }>
              {aiMarketSentiment}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">AI Signals Active</div>
          <div className="text-xl font-bold text-blue-400">{aiActiveSignals}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Trading Volume</span>
          <span className="font-medium">{tradingVolume}B</span>
        </div>
        <Progress value={(tradingVolume / 5) * 100} className="h-2" />
      </div>
    </CardContent>
  </Card>
);

// AI Performance Metrics Card;
export const AIPerformanceCard = ({
  winRate = 94.7;
  totalTrades = 2847;
  avgProfit = 12.4;
  aiUptime = 99.97;
}: {
  winRate?: number;
  totalTrades?: number;
  avgProfit?: number;
  aiUptime?: number;
}) => (
  <Card className="bg-gradient-to-br from-emerald-950/50 to-green-950/50 border-emerald-500/30">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        AI Performance;
      </CardTitle>
      <CardDescription>47 AI beings working around the clock</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-emerald-900/30 rounded-lg">
          <div className="text-2xl font-bold text-emerald-300">{winRate}%</div>
          <div className="text-sm text-emerald-400">Win Rate</div>
        </div>
        <div className="text-center p-4 bg-green-900/30 rounded-lg">
          <div className="text-2xl font-bold text-green-300">{totalTrades.toLocaleString()}</div>
          <div className="text-sm text-green-400">Total Trades</div>
        </div>
        <div className="text-center p-4 bg-emerald-900/30 rounded-lg">
          <div className="text-2xl font-bold text-emerald-300">+{avgProfit}%</div>
          <div className="text-sm text-emerald-400">Avg Profit</div>
        </div>
        <div className="text-center p-4 bg-green-900/30 rounded-lg">
          <div className="text-2xl font-bold text-green-300">{aiUptime}%</div>
          <div className="text-sm text-green-400">AI Uptime</div>
        </div>
      </div>
    </CardContent>
  </Card>
);
export default market-overview;