import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
"use client";
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, Clock } from 'lucide-react';

interface AIInsightsProps {
  selectedStock: string;
}

interface Sentiment {
  bullish: number;
  bearish: number;
  neutral: number;
}

interface TechnicalAnalysis {
  rsi: number;
  macd: string;
  movingAverage: string;
  support: number;
  resistance: number;
  bollinger?: string;
}

interface FundamentalAnalysis {
  pe: number;
  roe: number;
  revenueGrowth: number;
}

interface RiskFactor {
  factor: string;
  severity: string;
  level: string;
  impact: number;
}

interface MarketCatalyst {
  event: string;
  impact: string;
  probability: number;
  date: string;
}

interface Prediction {
  timeframe: string;
  direction: string;
  probability: number;
  target: number;
  priceTarget: number;
}

interface AIInsightsData {
  overallScore: number;
  sentiment: Sentiment;
  technicalAnalysis: TechnicalAnalysis;
  fundamentalAnalysis: FundamentalAnalysis;
  aiPredictions: Prediction[];
  riskFactors: RiskFactor[];
  marketCatalysts: MarketCatalyst[];
}

export default function AIInsights({ selectedStock }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsightsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setInsights({
        overallScore: 78 + Math.random() * 20,
        sentiment: {
          bullish: 65 + Math.random() * 20,
          bearish: 15 + Math.random() * 15,
          neutral: 20 + Math.random() * 10,
        },
        technicalAnalysis: {
          rsi: 45 + Math.random() * 30,
          macd: Math.random() > 0.5 ? 'bullish' : 'bearish',
          movingAverage: Math.random() > 0.6 ? 'above' : 'below',
          support: 165.5,
          resistance: 185.75,
        },
        fundamentalAnalysis: {
          pe: 28.5,
          roe: 15.6,
          revenueGrowth: 8.3,
        },
        aiPredictions: [
          {
            timeframe: '1 Week',
            direction: 'bullish',
            probability: 72,
            target: 182.5,
            priceTarget: 182.5,
          },
          {
            timeframe: '1 Month',
            direction: 'bullish',
            probability: 68,
            target: 195.0,
            priceTarget: 195.0,
          },
          {
            timeframe: '3 Months',
            direction: 'neutral',
            probability: 55,
            target: 175.0,
            priceTarget: 175.0,
          },
        ],
        riskFactors: [
          { factor: 'Market Volatility', severity: 'Medium', level: 'Medium', impact: 65 },
          { factor: 'Sector Rotation', severity: 'Low', level: 'Low', impact: 30 },
          { factor: 'Economic Indicators', severity: 'High', level: 'High', impact: 80 },
        ],
        marketCatalysts: [
          { event: 'Earnings Report', date: '2024-01-25', impact: 'High', probability: 85 },
          { event: 'Product Launch', date: '2024-02-15', impact: 'Medium', probability: 70 },
          { event: 'Fed Meeting', date: '2024-01-31', impact: 'High', probability: 95 },
        ],
      });
      setLoading(false);
    }, 2000);
  }, [selectedStock]);

  if (loading) {
    return (
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-white">AI is analyzing {selectedStock}...</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-purple-500/20 rounded animate-pulse"></div>
            <div className="h-2 bg-purple-500/20 rounded animate-pulse"></div>
            <div className="h-2 bg-purple-500/20 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white">Unable to load AI insights for {selectedStock}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall AI Score */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-400" />
            AI Analysis Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl font-bold text-white">
              {insights?.overallScore.toFixed(0)}/100
            </span>
            <Badge
              className={`text-lg px-4 py-2 ${
                (insights?.overallScore ?? 0) >= 80
                  ? 'bg-green-500'
                  : (insights?.overallScore ?? 0) >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
            >
              {(insights?.overallScore ?? 0) >= 80
                ? 'Strong Buy'
                : (insights?.overallScore ?? 0) >= 60
                  ? 'Hold'
                  : 'Sell'}
            </Badge>
          </div>
          <Progress value={insights?.overallScore ?? 0} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Market Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-400 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Bullish
                </span>
                <span className="text-white">{insights?.sentiment.bullish.toFixed(0)}%</span>
              </div>
              <Progress value={insights?.sentiment.bullish ?? 0} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-red-400 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Bearish
                </span>
                <span className="text-white">{insights?.sentiment.bearish.toFixed(0)}%</span>
              </div>
              <Progress value={insights?.sentiment.bearish ?? 0} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Neutral</span>
                <span className="text-white">{insights?.sentiment.neutral.toFixed(0)}%</span>
              </div>
              <Progress value={insights?.sentiment.neutral ?? 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Technical Analysis */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Technical Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">RSI</p>
                <p className="text-white font-semibold">
                  {insights?.technicalAnalysis.rsi.toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">MACD</p>
                <Badge
                  variant={
                    insights?.technicalAnalysis.macd === 'bullish' ? 'default' : 'destructive'
                  }
                >
                  {insights?.technicalAnalysis.macd}
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Support</p>
                <p className="text-green-400 font-semibold">
                  ${insights?.technicalAnalysis.support}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Resistance</p>
                <p className="text-red-400 font-semibold">
                  ${insights?.technicalAnalysis.resistance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Predictions */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-yellow-400" />
              AI Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights?.aiPredictions.map((prediction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">{prediction.timeframe}</p>
                  <p className="text-sm text-gray-400">{prediction.probability}% confidence</p>
                </div>
                <div className="text-right">
                  <Badge variant={prediction.direction === 'bullish' ? 'default' : 'secondary'}>
                    {prediction.direction}
                  </Badge>
                  <p className="text-sm text-gray-300 mt-1">${prediction.priceTarget}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-400" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights?.riskFactors.map((risk, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white">{risk.factor}</span>
                  <Badge
                    variant={
                      risk.level === 'High'
                        ? 'destructive'
                        : risk.level === 'Medium'
                          ? 'secondary'
                          : 'default'
                    }
                  >
                    {risk.level}
                  </Badge>
                </div>
                <Progress value={risk.impact} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Catalysts */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-400" />
            Upcoming Catalysts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights?.marketCatalysts.map((catalyst, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{catalyst.event}</h4>
                  <Badge
                    variant={
                      catalyst.impact === 'High'
                        ? 'destructive'
                        : catalyst.impact === 'Medium'
                          ? 'secondary'
                          : 'default'
                    }
                  >
                    {catalyst.impact}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">{catalyst.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
