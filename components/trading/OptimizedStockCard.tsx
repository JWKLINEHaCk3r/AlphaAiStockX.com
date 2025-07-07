'use client';

import React, { memo, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  aiScore: number;
  signals: {
    trend: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
    strength: number;
  };
}

interface OptimizedStockCardProps {
  stock: StockData;
  onTrade?: (symbol: string, action: 'buy' | 'sell') => void;
  onAnalyze?: (symbol: string) => void;
  className?: string;
}

const OptimizedStockCard = memo(({
  stock,
  onTrade,
  onAnalyze,
  className = '',
}: OptimizedStockCardProps) => {
  const handleBuy = useCallback(() => {
    onTrade?.(stock.symbol, 'buy');
  }, [onTrade, stock.symbol]);

  const handleSell = useCallback(() => {
    onTrade?.(stock.symbol, 'sell');
  }, [onTrade, stock.symbol]);

  const handleAnalyze = useCallback(() => {
    onAnalyze?.(stock.symbol);
  }, [onAnalyze, stock.symbol]);

  const isPositive = stock.change >= 0;
  const trendColor = useMemo(() => {
    switch (stock.signals.trend) {
      case 'bullish': return 'text-green-400';
      case 'bearish': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  }, [stock.signals.trend]);

  const aiScoreColor = useMemo(() => {
    if (stock.aiScore >= 80) return 'text-green-400 bg-green-500/20';
    if (stock.aiScore >= 60) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  }, [stock.aiScore]);

  return (
    <Card className={`bg-gray-900/60 border-gray-700/50 hover:border-neon-blue/50 transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-white">{stock.symbol}</CardTitle>
          <Badge className={`${aiScoreColor} border-0`}>
            AI: {stock.aiScore}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            ${stock.price.toLocaleString()}
          </div>
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Market Data */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Volume:</span>
              <div className="text-white font-medium">
                {(stock.volume / 1000000).toFixed(1)}M
              </div>
            </div>
            <div>
              <span className="text-gray-400">Market Cap:</span>
              <div className="text-white font-medium">{stock.marketCap}</div>
            </div>
          </div>

          {/* AI Signals */}
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">AI Signals</span>
              <span className={`text-sm font-medium ${trendColor}`}>
                {stock.signals.trend.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    stock.signals.confidence >= 70 ? 'bg-green-500' :
                    stock.signals.confidence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stock.signals.confidence}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {stock.signals.confidence}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleBuy}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Buy
            </Button>
            <Button
              onClick={handleSell}
              size="sm"
              variant="outline"
              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Sell
            </Button>
            <Button
              onClick={handleAnalyze}
              size="sm"
              variant="ghost"
              className="px-3"
            >
              <Activity className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedStockCard.displayName = 'OptimizedStockCard';

export default OptimizedStockCard;
