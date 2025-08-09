import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Brain, Zap, DollarSign, Target } from 'lucide-react';

// AI Market Analysis Card
export const AIMarketCard = ({
  symbol,
  price,
  change,
  aiConfidence,
  aiRecommendation,
  isLoading = false
}: {
  symbol: string;
  price: number;
  change: number;
  aiConfidence: number;
  aiRecommendation: 'BUY' | 'SELL' | 'HOLD';
  isLoading?: boolean;
}) => {
  const isPositive = change >= 0;

  return (
    <Card className={`relative overflow-hidden transition-all duration-500 hover:scale-105 ${
      isLoading ? 'animate-pulse' : ''
    } ${
      aiRecommendation === 'BUY' ? 'border-green-500/50 shadow-green-500/20' :
      aiRecommendation === 'SELL' ? 'border-red-500/50 shadow-red-500/20' :
      'border-yellow-500/50 shadow-yellow-500/20'
    } shadow-lg`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{symbol}</CardTitle>
          <Badge variant={
            aiRecommendation === 'BUY' ? 'default' :
            aiRecommendation === 'SELL' ? 'destructive' :
            'secondary'
          }>
            <Brain className="w-3 h-3 mr-1" />
            {aiRecommendation}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${price.toFixed(2)}</span>
            <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="ml-1">{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">AI Confidence</span>
              <span className="text-sm font-medium">{aiConfidence}%</span>
            </div>
            <Progress value={aiConfidence} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
