import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { CardTitle } from "../../components/ui/card";
import { CardHeader } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
'use client';
import React from 'react';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { TrendingUp, TrendingDown, Brain, Zap } from 'lucide-react';

interface StockInfo {
  symbol: string;
  price: number;
  change: number;
  aiScore: number;
  volume: string;
  marketCap: string;
  pe: number;
  confidence: number;
  timeframe: string;
  direction: string;
  targetPrice: number;
}

interface AIFrediction {
  direction: string;
  confidence: number;
  targetPrice: number;
  timeframe: string;
=======
import { TrendingUp, TrendingDown, Brain, Zap } from 'lucide-react';

interface StockChartProps {
  selectedStock: string;
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
}

interface ChartDataPoint {
  time: number;
  price: number;
  volume: number;
}

<<<<<<< HEAD
interface StockChartProps {
  selectedStock: string;
=======
interface StockInfo {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  aiScore: number;
}

interface AIPrediction {
  direction: string;
  confidence: number;
  timeframe: string;
  targetPrice: number;
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
}

export default function StockChart({ selectedStock }: StockChartProps) {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
<<<<<<< HEAD
  const [aiPrediction, setAiPrediction] = useState<AIFrediction | null>(null);
=======
  const [aiPrediction, setAiPrediction] = useState<AIPrediction | null>(null);
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)

  useEffect(() => {
    // Simulate real-time stock data
    const generateData = () => {
      const data = [];
      let price = 150 + Math.random() * 100;

      for (let i = 0; i < 100; i++) {
        price += (Math.random() - 0.5) * 5;
        data.push({
          time: i,
          price: Math.max(price, 50),
          volume: Math.random() * 1000000,
        });
      }
      return data;
    };

    setChartData(generateData());
    setStockInfo({
      symbol: selectedStock,
      price: 175.43 + Math.random() * 20,
      change: (Math.random() - 0.5) * 10,
      volume: '45.2M',
      marketCap: '2.8T',
      aiScore: 85 + Math.random() * 15,
      confidence: 75 + Math.random() * 20,
      timeframe: '30 days',
      direction: Math.random() > 0.5 ? 'bullish' : 'bearish',
      targetPrice: 180 + Math.random() * 40,
    });

    setAiPrediction({
      direction: Math.random() > 0.5 ? 'bullish' : 'bearish',
      confidence: 75 + Math.random() * 20,
      targetPrice: 180 + Math.random() * 40,
      timeframe: '30 days',
    });
  }, [selectedStock]);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  return (
    <Card className="bg-gray-900/60 border-cyan-500/30 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-2xl">{stockInfo?.symbol}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-3xl font-bold text-white">${stockInfo?.price.toFixed(2)}</span>
              <span
                className={`flex items-center text-lg font-medium ${
<<<<<<< HEAD
                  (stockInfo?.change || 0) > 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {(stockInfo?.change || 0) > 0 ? (
=======
                  (stockInfo?.change ?? 0) > 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {(stockInfo?.change ?? 0) > 0 ? (
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
<<<<<<< HEAD
                {(stockInfo?.change || 0) > 0 ? '+' : ''}
                {(stockInfo?.change || 0).toFixed(2)}%
=======
                {(stockInfo?.change ?? 0) > 0 ? '+' : ''}
                {(stockInfo?.change ?? 0).toFixed(2)}%
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
              </span>
            </div>
          </div>

          <div className="text-right">
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 mb-2">
              <Brain className="h-3 w-3 mr-1" />
              AI Score: {stockInfo?.aiScore.toFixed(0)}
            </Badge>
            <div className="text-sm text-gray-400">
              <p>Volume: {stockInfo?.volume}</p>
              <p>Market Cap: {stockInfo?.marketCap}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Timeframe Selector */}
        <div className="flex space-x-2 mb-6">
          {timeframes.map((tf: string) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={
                timeframe === tf
                  ? 'bg-cyan-500 hover:bg-cyan-600'
                  : 'border-cyan-500/30 text-gray-300'
              }
            >
              {tf}
            </Button>
          ))}
        </div>

        {/* Chart Visualization */}
        <div className="h-64 bg-gradient-to-b from-cyan-900/20 to-transparent rounded-lg p-4 mb-6">
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Chart Grid */}
            <defs>
              <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Price Line */}
            <path
              d={`M 0 ${200 - (chartData[0]?.price || 150)} ${chartData
                .map((point, i) => `L ${(i / chartData.length) * 600} ${200 - point.price}`)
                .join(' ')}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* AI Prediction */}
        {aiPrediction && (
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                    AI Prediction
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">
                    {aiPrediction.confidence.toFixed(0)}% confidence • {aiPrediction.timeframe}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={aiPrediction.direction === 'bullish' ? 'success' : 'destructive'}
                    className="mb-1"
                  >
                    {aiPrediction.direction.toUpperCase()}
                  </Badge>
                  <p className="text-sm text-gray-300">
                    Target: ${aiPrediction.targetPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
