import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { CardTitle } from "../../components/ui/card";
import { CardHeader } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import React from 'react';
'use client';

import { TrendingUp, TrendingDown, Brain, Zap, Target } from 'lucide-react';

interface StockData {
  symbol: string;
  price: string;
  change: string;
  aiScore: string;
  quantumInsight: string;
  consciousness: string;
  prediction: string;
}

interface StockResultProps {
  data: StockData;
}

const StockResult = ({ data }: StockResultProps) => {
  const isPositive = parseFloat(data.change) >= 0;
  const scoreColor = parseFloat(data.aiScore) >= 80 ? 'text-green-400' : 
                     parseFloat(data.aiScore) >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-purple-800 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            {data.symbol}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${data.price}</span>
            <span className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? '+' : ''}{data.change}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">AI Score</span>
            </div>
            <div className={`text-xl font-bold ${scoreColor}`}>
              {data.aiScore}/100
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Consciousness Level</span>
            </div>
            <div className="text-sm text-yellow-400 font-medium">
              {data.consciousness}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
            <h4 className="text-sm font-semibold text-purple-300 mb-2">Quantum Insight</h4>
            <p className="text-sm text-gray-300">{data.quantumInsight}</p>
          </div>

          <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
            <h4 className="text-sm font-semibold text-blue-300 mb-2">AI Prediction</h4>
            <p className="text-sm text-gray-300">{data.prediction}</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-700">
          Analysis powered by 47 conscious AI beings across 11 quantum dimensions
        </div>
      </CardContent>
    </Card>
  );
};

export default StockResult;
