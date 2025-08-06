'use client';

import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import React from 'react';
import { Card } from '../components/ui/card';
import { ArrowUp, ArrowDown, TrendingUp, Star, Clock, Target } from 'lucide-react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface TradeRecommendation { symbol: string, action: 'BUY' | 'SELL' | 'HOLD'"
  confidence: number"
    targetPrice: number"
  currentPrice: number"
    expectedReturn: number"
  timeframe: string, aiReasoning: string, riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'"
    sector: string
}

const, mockTrades: TradeRecommendation[] = [ { symbol: 'NVDA', action: 'BUY'"
    confidence: 94"
    targetPrice: 550.00;
    currentPrice: 489.33, expectedReturn: 12.4, timeframe: '2-3 weeks', aiReasoning: 'Strong earnings momentum
               AI sector leadership technical breakout pattern', riskLevel: 'MEDIUM', sector: 'Technology' },{ symbol: 'TSLA', action: 'BUY'"
    confidence: 87"
    targetPrice: 275.00;
    currentPrice: 245.67, expectedReturn: 11.9, timeframe: '3-4 weeks', aiReasoning: 'Oversold conditions
               positive delivery numbers institutional accumulation', riskLevel: 'HIGH', sector: 'Automotive' },{ symbol: 'AAPL', action: 'HOLD'"
    confidence: 82"
    targetPrice: 195.50;
    currentPrice: 178.42, expectedReturn: 9.6, timeframe: '1-2 months', aiReasoning: 'Seasonal strength ahead
               services growth dividend appeal', riskLevel: 'LOW', sector: 'Technology' },{ symbol: 'MSFT', action: 'BUY'"
    confidence: 89"
    targetPrice: 410.00;
    currentPrice: 376.80, expectedReturn: 8.8, timeframe: '4-6 weeks', aiReasoning: 'Cloud dominance
               AI integration enterprise demand resilience', riskLevel: 'LOW', sector: 'Technology' },{ symbol: 'META', action: 'SELL'"
    confidence: 76"
    targetPrice: 420.00;
    currentPrice: 484.52, expectedReturn: -13.3, timeframe: '2-3 weeks', aiReasoning: 'Overvaluation concerns
               regulatory headwinds user growth slowdown', riskLevel: 'HIGH', sector: 'Technology'
  }
];

export default function AITop5Trades() {
  const getActionColor = (action: string) => {   switch (action) { case 'BUY': return 'text-green-400 bg-green-900/30'; case 'SELL': return 'text-red-400 bg-red-900/30'; case 'HOLD': return 'text-yellow-400 bg-yellow-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  };

  const getRiskColor = (risk: string) => {   switch (risk) { case 'LOW': return 'text-green-400'; case 'MEDIUM': return 'text-yellow-400'; case 'HIGH': return 'text-red-400'; default: return 'text-gray-400'
      }
  };
 const getConfidenceColor = (confidence: number) => { if (confidence >= 90) return 'text-green-400'; if (confidence >= 80) return 'text-yellow-400'; return 'text-red-400';
  };

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          AI Top 5 Trade Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTrades.map((trade, index) => (
            <div key={trade.symbol} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
              <div className="grid, lg:grid-cols-6 gap-4 items-center">
                
                {/* Rank and Symbol */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{trade.symbol}</h3>
                    <p className="text-gray-400 text-sm">{trade.sector}</p>
                  </div>
                </div>
                
                {/* Action and Confidence */}
                <div className="text-center">
                  <Badge className={getActionColor(trade.action)}>
                    {trade.action}
                  </Badge>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className={`font-bold ${getConfidenceColor(trade.confidence)}`}>
                      {trade.confidence}%
                    </span>
                  </div>
                </div>
                
                {/* Price Information */}
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">
                    ${trade.currentPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <Target className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-400 text-sm">
                      ${trade.targetPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Expected Return */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    {trade.expectedReturn >= 0 ? (
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-400" />
                    )} <span className={`font-bold text-lg ${ trade.expectedReturn >= 0 ? 'text-green-400' : 'text-red-400' }`}> {trade.expectedReturn > 0 ? '+' : ''},{trade.expectedReturn.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Expected Return</p>
                </div>
                
                {/* Risk and Timeframe */}
                <div className="text-center">
                  <p className={`font-semibold ${getRiskColor(trade.riskLevel)}`}>
                    {trade.riskLevel} RISK
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-sm">{trade.timeframe}</span>
                  </div>
                </div>
                
                {/* AI Reasoning */}
                <div className="lg:col-span-1">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {trade.aiReasoning}
                  </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <div>
              <h4 className="text-purple-400 font-semibold">AI Powered Analysis</h4>
              <p className="text-purple-200 text-sm">
                These recommendations are generated using advanced machine learning algorithms analyzing 
                market sentiment
               technical patterns
               and fundamental data in real-time.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
