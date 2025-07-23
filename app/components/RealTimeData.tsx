import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { CardTitle } from "../../components/ui/card";
import { CardHeader } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import React from 'react';
'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp,;
  TrendingDown,;
  Activity,;
  DollarSign,;
  Users,;
  Zap,;
  ArrowUpRight,;
  ArrowDownRight;
} from 'lucide-react';

interface MarketData {






  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  aiScore: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';






}

interface MarketStats {






  totalMarketCap: string;
  activeTraders: number;
  dailyVolume: string;
  fearGreedIndex: number;
  volatilityIndex: number;
  aiConfidence: number;






}

export default function RealTimeData() {
  const [topStocks, setTopStocks] = useState<MarketData[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats>({
    totalMarketCap: '$45.2T',;
    activeTraders: 1234567,;
    dailyVolume: '$2.8T',;
    fearGreedIndex: 72,;
    volatilityIndex: 18.5,;
    aiConfidence: 89;
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time data updates;
    const generateMockData = () => {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'];
      const sentiments: ('bullish' | 'bearish' | 'neutral')[] = ['bullish', 'bearish', 'neutral'];
      
      return symbols.map(symbol => ({
        symbol,;
        price: 100 + Math.random() * 400,;
        change: (Math.random() - 0.5) * 20,;
        changePercent: (Math.random() - 0.5) * 8,;
        volume: Math.floor(Math.random() * 100000000),;
        marketCap: `$${(Math.random() * 3000 + 500).toFixed(0)}B`,;
        aiScore: Math.floor(Math.random() * 100),;
        sentiment: sentiments[Math.floor(Math.random() * sentiments.length)];
      }));
    };

    const updateData = () => {
      setTopStocks(generateMockData());
      setLastUpdate(new Date());
      
      // Update market stats with small random changes;
      setMarketStats(prev => ({
        ...prev,;
        fearGreedIndex: Math.max(0, Math.min(100, prev.fearGreedIndex + (Math.random() - 0.5) * 5)),;
        volatilityIndex: Math.max(0, prev.volatilityIndex + (Math.random() - 0.5) * 2),;
        aiConfidence: Math.max(0, Math.min(100, prev.aiConfidence + (Math.random() - 0.5) * 3));
      }));
    };

    updateData();
    const interval = setInterval(updateData, 3000); // Update every 3 seconds;
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const getFearGreedColor = (index: number) => {
    if (index >= 75) return 'text-green-400';
    if (index >= 50) return 'text-yellow-400';
    if (index >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSentimentIcon = (sentiment: string, change: number) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4 text-red-400" />;
    return <Activity className="w-4 h-4 text-gray-400" />;
  };

  return (;
    <div className="space-y-6">;
      {/* Market Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">;
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-blue-300 text-sm">Market Cap</p>;
                <p className="text-2xl font-bold text-white">{marketStats.totalMarketCap}</p>;
              </div>;
              <DollarSign className="w-8 h-8 text-blue-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-500/30">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-green-300 text-sm">Active Traders</p>;
                <p className="text-2xl font-bold text-white">{formatNumber(marketStats.activeTraders)}</p>;
              </div>;
              <Users className="w-8 h-8 text-green-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-purple-300 text-sm">Daily Volume</p>;
                <p className="text-2xl font-bold text-white">{marketStats.dailyVolume}</p>;
              </div>;
              <Activity className="w-8 h-8 text-purple-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-800/30 border-yellow-500/30">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-yellow-300 text-sm">Fear & Greed</p>;
                <p className={`text-2xl font-bold ${getFearGreedColor(marketStats.fearGreedIndex)}`}>;
                  {marketStats.fearGreedIndex}
                </p>;
              </div>;
              <TrendingUp className="w-8 h-8 text-yellow-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-500/30">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-red-300 text-sm">VIX</p>;
                <p className="text-2xl font-bold text-white">{marketStats.volatilityIndex.toFixed(1)}</p>;
              </div>;
              <Activity className="w-8 h-8 text-red-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 border-cyan-500/30">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-cyan-300 text-sm">AI Confidence</p>;
                <p className="text-2xl font-bold text-white">{marketStats.aiConfidence}%</p>;
              </div>;
              <Zap className="w-8 h-8 text-cyan-400" />;
            </div>;
          </CardContent>;
        </Card>;
      </div>;
      {/* Real-Time Stock Data */}
      <Card className="bg-black/60 border-white/10">;
        <CardHeader>;
          <div className="flex items-center justify-between">;
            <CardTitle className="text-white flex items-center space-x-2">;
              <Activity className="w-6 h-6 text-green-400" />;
              <span>Real-Time Market Data</span>;
            </CardTitle>;
            <div className="flex items-center space-x-2">;
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>;
              <span className="text-gray-400 text-sm">;
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>;
            </div>;
          </div>;
        </CardHeader>;
        <CardContent>;
          <div className="space-y-3">;
            {topStocks.map((stock, index) => (;
              <div;
                key={stock.symbol}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors";
              >;
                <div className="flex items-center space-x-4">;
                  <div className="text-center">;
                    <p className="text-white font-bold">{stock.symbol}</p>;
                    <Badge;
                      variant={stock.sentiment === 'bullish' ? 'default' : stock.sentiment === 'bearish' ? 'destructive' : 'secondary'}
                      className="text-xs";
                    >;
                      {stock.sentiment}
                    </Badge>;
                  </div>;
                  <div>;
                    <p className="text-white font-semibold">${stock.price.toFixed(2)}</p>;
                    <div className="flex items-center space-x-1">;
                      {getSentimentIcon(stock.sentiment, stock.change)}
                      <span className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>;
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%);
                      </span>;
                    </div>;
                  </div>;
                </div>;
                <div className="flex items-center space-x-6">;
                  <div className="text-right">;
                    <p className="text-gray-400 text-sm">Volume</p>;
                    <p className="text-white">{formatNumber(stock.volume)}</p>;
                  </div>;
                  <div className="text-right">;
                    <p className="text-gray-400 text-sm">Market Cap</p>;
                    <p className="text-white">{stock.marketCap}</p>;
                  </div>;
                  <div className="text-right">;
                    <p className="text-gray-400 text-sm">AI Score</p>;
                    <div className="flex items-center space-x-2">;
                      <Progress value={stock.aiScore} className="w-16 h-2" />;
                      <span className="text-white text-sm">{stock.aiScore}</span>;
                    </div>;
                  </div>;
                </div>;
              </div>;
            ))}
          </div>;
        </CardContent>;
      </Card>;
    </div>;
  );
}
