import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.js';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from './card';
import { Card, CardHeader, CardContent, CardTitle } from './card';
import { CardTitle } from "./card";
import { CardHeader } from "./card";
import { CardContent } from "./card";
import { Card } from "./card";
import { Button } from "./button";
'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { HolographicDisplay } from '@/components/ui/animated-effects';
import {
  TrendingUp,;
  TrendingDown,;
  DollarSign,;
  Brain,;
  Zap,;
  BarChart3,;
  Target,;
  Activity,;
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockData {







  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  aiScore: number;







}

interface MarketSentiment {







  bullish: number;
  bearish: number;
  neutral: number;
  aiConfidence: number;







}

const mockStocks: StockData[] = [;
  {
    symbol: 'AAPL',;
    price: 178.42,;
    change: 2.35,;
    changePercent: 1.33,;
    volume: 45231000,;
    aiScore: 87,;
  },;
  {
    symbol: 'NVDA',;
    price: 489.33,;
    change: -5.67,;
    changePercent: -1.15,;
    volume: 52341000,;
    aiScore: 94,;
  },;
  {
    symbol: 'TSLA',;
    price: 245.67,;
    change: 8.45,;
    changePercent: 3.56,;
    volume: 67894000,;
    aiScore: 79,;
  },;
  {
    symbol: 'MSFT',;
    price: 352.18,;
    change: 1.89,;
    changePercent: 0.54,;
    volume: 32156000,;
    aiScore: 91,;
  },;
];

function LiveChart({ className }: { className?: string }) {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoint = Math.sin(Date.now() * 0.001) * 20 + 50 + Math.random() * 10;
        return [...prev.slice(-29), newPoint];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...dataPoints);
  const minValue = Math.min(...dataPoints);

  return (;
    <div className={cn('h-32 relative overflow-hidden rounded-lg', className)}>;
      <svg className="w-full h-full" viewBox="0 0 300 128">;
        <defs>;
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">;
            <stop offset="0%" stopColor="hsl(142, 76%, 66%)" stopOpacity="0.8" />;
            <stop offset="100%" stopColor="hsl(142, 76%, 66%)" stopOpacity="0.1" />;
          </linearGradient>;
        </defs>;
        {dataPoints.length > 1 && (;
          <>;
            {/* Area under curve */}
            <path;
              d={`M 0 128 ${dataPoints;
                .map(;
                  (point, index) =>;
                    `L ${(index / (dataPoints.length - 1)) * 300} ${128 - ((point - minValue) / (maxValue - minValue)) * 128}`;
                );
                .join(' ')} L 300 128 Z`}
              fill="url(#chartGradient)";
            />;
            {/* Line */}
            <path;
              d={`M ${dataPoints;
                .map(;
                  (point, index) =>;
                    `${(index / (dataPoints.length - 1)) * 300} ${128 - ((point - minValue) / (maxValue - minValue)) * 128}`;
                );
                .join(' L ')}`}
              stroke="hsl(142, 76%, 66%)";
              strokeWidth="2";
              fill="none";
              filter="drop-shadow(0 0 6px hsl(142, 76%, 66%))";
            />;
            {/* Animated dots */}
            {dataPoints.slice(-5).map((point, index) => (;
              <circle;
                key={index}
                cx={((dataPoints.length - 5 + index) / (dataPoints.length - 1)) * 300}
                cy={128 - ((point - minValue) / (maxValue - minValue)) * 128}
                r="3";
                fill="hsl(142, 76%, 66%)";
                className="animate-pulse";
                filter="drop-shadow(0 0 4px hsl(142, 76%, 66%))";
              />;
            ))}
          </>;
        )}
      </svg>;
    </div>;
  );
}

function StockTicker({ stock }: { stock: StockData }) {
  const isPositive = stock.change >= 0;

  return (;
    <Card className="glass-card interactive-hover group">;
      <CardContent className="p-4">;
        <div className="flex items-center justify-between mb-3">;
          <div className="flex items-center gap-3">;
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />;
            <span className="font-mono font-bold text-lg">{stock.symbol}</span>;
          </div>;
          <div;
            className={cn(;
              'flex items-center gap-1 text-sm font-medium',;
              isPositive ? 'text-neon-green' : 'text-red-400';
            )}
          >;
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {stock.changePercent.toFixed(2)}%;
          </div>;
        </div>;
        <div className="flex items-center justify-between mb-3">;
          <div>;
            <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>;
            <div className={cn('text-sm', isPositive ? 'text-neon-green' : 'text-red-400')}>;
              {isPositive ? '+' : ''}
              {stock.change.toFixed(2)}
            </div>;
          </div>;
          <div className="text-right">;
            <div className="text-xs text-muted-foreground">AI Score</div>;
            <div className="text-lg font-bold text-neon-blue">{stock.aiScore}/100</div>;
          </div>;
        </div>;
        <LiveChart className="mb-3" />;
        <div className="flex items-center justify-between text-xs text-muted-foreground">;
          <span>Vol: {(stock.volume / 1000000).toFixed(1)}M</span>;
          <span className="flex items-center gap-1">;
            <Brain className="w-3 h-3" />;
            AI Active;
          </span>;
        </div>;
      </CardContent>;
    </Card>;
  );
}

function AIInsights() {
  const [sentiment, setSentiment] = useState<MarketSentiment>({
    bullish: 67,;
    bearish: 18,;
    neutral: 15,;
    aiConfidence: 92,;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(prev => ({
        bullish: Math.max(0, Math.min(100, prev.bullish + (Math.random() - 0.5) * 5)),;
        bearish: Math.max(0, Math.min(100, prev.bearish + (Math.random() - 0.5) * 3)),;
        neutral: Math.max(0, Math.min(100, prev.neutral + (Math.random() - 0.5) * 2)),;
        aiConfidence: Math.max(80, Math.min(100, prev.aiConfidence + (Math.random() - 0.5) * 2)),;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (;
    <Card className="glass-card neon-border">;
      <CardHeader>;
        <CardTitle className="flex items-center gap-2">;
          <Brain className="w-5 h-5 text-neon-purple animate-pulse-glow" />;
          AI Market Insights;
        </CardTitle>;
      </CardHeader>;
      <CardContent className="space-y-4">;
        <div className="grid grid-cols-3 gap-4">;
          <div className="text-center">;
            <div className="text-2xl font-bold text-neon-green">{sentiment.bullish}%</div>;
            <div className="text-xs text-muted-foreground">Bullish</div>;
          </div>;
          <div className="text-center">;
            <div className="text-2xl font-bold text-red-400">{sentiment.bearish}%</div>;
            <div className="text-xs text-muted-foreground">Bearish</div>;
          </div>;
          <div className="text-center">;
            <div className="text-2xl font-bold text-muted-foreground">{sentiment.neutral}%</div>;
            <div className="text-xs text-muted-foreground">Neutral</div>;
          </div>;
        </div>;
        <div className="space-y-2">;
          <div className="flex justify-between text-sm">;
            <span>AI Confidence</span>;
            <span className="text-neon-blue">{sentiment.aiConfidence}%</span>;
          </div>;
          <div className="w-full bg-muted/20 rounded-full h-2">;
            <div;
              className="h-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000";
              style={{ width: `${sentiment.aiConfidence}%` }}
            />;
          </div>;
        </div>;
        <div className="pt-4 border-t border-white/10">;
          <div className="flex items-center gap-2 text-sm text-neon-cyan">;
            <Zap className="w-4 h-4" />;
            <span>47 AI agents analyzing 2,847 data points</span>;
          </div>;
        </div>;
      </CardContent>;
    </Card>;
  );
}

export default function TradingDashboardDemo() {
  const [isLive, setIsLive] = useState(false);

  return (;
    <section className="py-24 px-6 relative overflow-hidden">;
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />;
      <div className="max-w-7xl mx-auto relative z-10">;
        <div className="text-center mb-16">;
          <HolographicDisplay intensity={1.5}>;
            <h2 className="text-4xl md:text-6xl font-bold mb-6">;
              <span className="neon-text">Live Trading</span> Dashboard;
            </h2>;
          </HolographicDisplay>;
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">;
            Experience real-time AI-powered trading with our advanced dashboard. Watch as our neural;
            networks analyze market data and execute trades with superhuman precision.;
          </p>;
          <Button;
            onClick={() => setIsLive(!isLive)}
            size="lg";
            className={cn('btn-primary group', isLive && 'animate-pulse-glow')}
          >;
            <Activity className="mr-2 w-5 h-5" />;
            {isLive ? 'Trading Live' : 'Start Live Demo'}
          </Button>;
        </div>;
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">;
          {/* Stock Tickers */}
          <div className="lg:col-span-2 space-y-6">;
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">;
              {mockStocks.map((stock, index) => (;
                <div;
                  key={stock.symbol}
                  className="animate-slide-up";
                  style={{ animationDelay: `${index * 100}ms` }}
                >;
                  <StockTicker stock={stock} />;
                </div>;
              ))}
            </div>;
            {/* Performance Metrics */}
            <Card className="glass-card">;
              <CardHeader>;
                <CardTitle className="flex items-center gap-2">;
                  <BarChart3 className="w-5 h-5 text-neon-green" />;
                  Portfolio Performance;
                </CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">;
                  <div className="text-center">;
                    <div className="text-2xl font-bold text-neon-green">+12.8%</div>;
                    <div className="text-sm text-muted-foreground">Today</div>;
                  </div>;
                  <div className="text-center">;
                    <div className="text-2xl font-bold text-neon-blue">+47.3%</div>;
                    <div className="text-sm text-muted-foreground">This Month</div>;
                  </div>;
                  <div className="text-center">;
                    <div className="text-2xl font-bold text-neon-purple">+156.7%</div>;
                    <div className="text-sm text-muted-foreground">YTD</div>;
                  </div>;
                  <div className="text-center">;
                    <div className="text-2xl font-bold text-neon-orange">0.003s</div>;
                    <div className="text-sm text-muted-foreground">Avg Exec</div>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
          </div>;
          {/* AI Insights Sidebar */}
          <div className="space-y-6">;
            <AIInsights />;
            <Card className="glass-card">;
              <CardHeader>;
                <CardTitle className="flex items-center gap-2">;
                  <Target className="w-5 h-5 text-neon-orange" />;
                  Trade Signals;
                </CardTitle>;
              </CardHeader>;
              <CardContent className="space-y-3">;
                {['AAPL', 'NVDA', 'TSLA'].map((symbol, index) => (;
                  <div;
                    key={symbol}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg";
                  >;
                    <div className="flex items-center gap-2">;
                      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />;
                      <span className="font-mono">{symbol}</span>;
                    </div>;
                    <div className="text-sm font-medium text-neon-green">BUY</div>;
                  </div>;
                ))}
              </CardContent>;
            </Card>;
          </div>;
        </div>;
      </div>;
    </section>;
  );
}
