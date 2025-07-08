import { Alert } from "@/components/ui/alert";
import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  VisionModel,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
  RiskAnalysis,
  SectorPerformance,
  BacktestStrategy,
  AIWhiteLabelMetrics,
  MarketClassification,
  TradingRecommendation,
  StockAnalysis,
  RealtimeData,
  VolumeProfile,
  AIAnalysisComponents,
  CryptoData,
  DeFiProtocol,
  NFTCollection,
  UserProfile,
  ThemeOption,
  AccentColor,
  SubscriptionPlan,
  TradingStrategy,
  ScanResult,
  SiteDiagnostic,
  Alert,
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  SocialPost,
  DeepLearningModel,
  MarketPattern,
} from '../../types/trading-types';

'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface EarningData {
  symbol: string;
  name: string;
  date: string;
  time: string;
  currentPrice: number;
  estimatedEPS: string;
  estimatedRevenue: string;
  aiPrediction: 'beat' | 'miss';
  confidenceScore: number;
  priceTarget: number;
  volatilityExpected: number;
  optionsActivity: 'high' | 'medium' | 'low';
  analystRating: 'buy' | 'hold' | 'sell';
}

interface EarningsAnalysisData {
  symbol: string;
  metric: string;
  impact: 'Critical' | 'High' | 'Medium';
  prediction: string;
  confidence: number;
  historicalAccuracy: number;
}

interface SurprisePrediction {
  symbol: string;
  type: string;
  probability: number;
  expectedMove: string;
  reasoning: string;
  riskLevel: 'High' | 'Medium' | 'Low';
}

// Add interface for company data
interface CompanyData {
  symbol: string;
  name: string;
  date: string;
  time: string;
}

export default function EarningsPredictor() {
  const [upcomingEarnings, setUpcomingEarnings] = useState<EarningData[]>([]);
  const [earningsAnalysis, setEarningsAnalysis] = useState<EarningsAnalysisData[]>([]);
  const [surprisePredictions, setSurprisePredictions] = useState<SurprisePrediction[]>([]);

  useEffect(() => {
    generateUpcomingEarnings();
    generateEarningsAnalysis();
    generateSurprisePredictions();
  }, []);

  const generateUpcomingEarnings = () => {
    const companies = [
      { symbol: 'AAPL', name: 'Apple Inc.', date: '2024-01-25', time: 'AMC' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', date: '2024-01-24', time: 'AMC' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', date: '2024-01-23', time: 'AMC' },
      { symbol: 'TSLA', name: 'Tesla Inc.', date: '2024-01-24', time: 'AMC' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', date: '2024-02-21', time: 'AMC' },
      { symbol: 'META', name: 'Meta Platforms', date: '2024-01-31', time: 'AMC' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', date: '2024-02-01', time: 'AMC' },
      { symbol: 'NFLX', name: 'Netflix Inc.', date: '2024-01-23', time: 'AMC' },
    ];

    const earnings: EarningData[] = companies.map((company: CompanyData) => ({
      ...company,
      currentPrice: 100 + Math.random() * 400,
      estimatedEPS: (Math.random() * 5 + 0.5).toFixed(2),
      estimatedRevenue: (Math.random() * 50 + 10).toFixed(1),
      aiPrediction: Math.random() > 0.5 ? 'beat' : 'miss',
      confidenceScore: 70 + Math.random() * 30,
      priceTarget: 0,
      volatilityExpected: 5 + Math.random() * 15,
      optionsActivity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      analystRating: Math.random() > 0.6 ? 'buy' : Math.random() > 0.3 ? 'hold' : 'sell',
    }));

    earnings.forEach(earning => {
      const multiplier =
        earning.aiPrediction === 'beat' ? 1.05 + Math.random() * 0.1 : 0.95 - Math.random() * 0.1;
      earning.priceTarget = earning.currentPrice * multiplier;
    });

    setUpcomingEarnings(earnings);
  };

  const generateEarningsAnalysis = () => {
    const analysis: EarningsAnalysisData[] = [
      {
        symbol: 'AAPL',
        metric: 'iPhone Sales',
        impact: 'High',
        prediction: 'Strong holiday sales expected',
        confidence: 85,
        historicalAccuracy: 78,
      },
      {
        symbol: 'MSFT',
        metric: 'Azure Growth',
        impact: 'High',
        prediction: 'Cloud revenue acceleration',
        confidence: 92,
        historicalAccuracy: 84,
      },
      {
        symbol: 'TSLA',
        metric: 'Delivery Numbers',
        impact: 'Critical',
        prediction: 'Q4 deliveries may disappoint',
        confidence: 76,
        historicalAccuracy: 71,
      },
      {
        symbol: 'NVDA',
        metric: 'AI Chip Demand',
        impact: 'Critical',
        prediction: 'Continued AI boom driving sales',
        confidence: 94,
        historicalAccuracy: 89,
      },
    ];

    setEarningsAnalysis(analysis);
  };

  const generateSurprisePredictions = () => {
    const surprises: SurprisePrediction[] = [
      {
        symbol: 'COIN',
        type: 'Positive Surprise',
        probability: 78,
        expectedMove: '+12%',
        reasoning: 'Crypto trading volume surge',
        riskLevel: 'Medium',
      },
      {
        symbol: 'SNAP',
        type: 'Negative Surprise',
        probability: 65,
        expectedMove: '-8%',
        reasoning: 'Ad revenue headwinds',
        riskLevel: 'High',
      },
      {
        symbol: 'ROKU',
        type: 'Positive Surprise',
        probability: 72,
        expectedMove: '+15%',
        reasoning: 'Streaming growth acceleration',
        riskLevel: 'Medium',
      },
    ];

    setSurprisePredictions(surprises);
  };

  const getPredictionColor = (prediction: string) => {
    return prediction === 'beat' ? 'text-emerald-400' : 'text-red-400';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical':
        return 'text-red-400';
      case 'High':
        return 'text-amber-400';
      default:
        return 'text-emerald-400';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'buy':
        return 'text-emerald-400';
      case 'sell':
        return 'text-red-400';
      default:
        return 'text-amber-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Earnings */}
      <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center">
            <span className="h-6 w-6 mr-2 text-emerald-400">📅</span>
            Upcoming Earnings with AI Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEarnings.map((earning, index) => (
              <div
                key={index}
                className="p-4 bg-stone-800/30 rounded-lg border border-stone-600/30 hover:border-stone-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-stone-100 font-bold">{earning.symbol}</span>
                        <Badge className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                          {earning.date}
                        </Badge>
                        <Badge className={getPredictionColor(earning.aiPrediction)}>
                          AI: {earning.aiPrediction}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-400">{earning.name}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-stone-400 text-sm">Current Price</p>
                      <p className="text-stone-100 font-semibold">
                        ${earning.currentPrice.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-stone-400 text-sm">Est. EPS</p>
                      <p className="text-stone-100 font-semibold">${earning.estimatedEPS}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-stone-400 text-sm">AI Target</p>
                      <p
                        className={`font-semibold ${earning.priceTarget > earning.currentPrice ? 'text-emerald-400' : 'text-red-400'}`}
                      >
                        ${earning.priceTarget.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-stone-400 text-sm">Confidence</p>
                      <div className="flex items-center">
                        <span className="text-emerald-400 font-bold">
                          {earning.confidenceScore.toFixed(0)}%
                        </span>
                        <span className="text-amber-400 ml-1">⭐</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={getRatingColor(earning.analystRating)}>
                      {earning.analystRating}
                    </Badge>
                    <p className="text-xs text-stone-400 mt-1">
                      Vol: {earning.volatilityExpected.toFixed(1)}%
                    </p>
                    <p className="text-xs text-stone-400">Options: {earning.optionsActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Metrics Analysis */}
        <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-stone-100 flex items-center">
              <span className="h-6 w-6 mr-2 text-purple-400">🧠</span>
              AI Key Metrics Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {earningsAnalysis.map((analysis, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-stone-100 font-bold">{analysis.symbol}</span>
                    <Badge className={getImpactColor(analysis.impact)}>
                      {analysis.impact} Impact
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">{analysis.confidence}%</p>
                    <p className="text-xs text-stone-400">Confidence</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Focus Metric:</span>
                    <span className="text-stone-200 font-medium">{analysis.metric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Historical Accuracy:</span>
                    <span className="text-amber-400 font-medium">
                      {analysis.historicalAccuracy}%
                    </span>
                  </div>
                  <p className="text-stone-300 text-sm mt-2">{analysis.prediction}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Surprise Predictions */}
        <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-stone-100 flex items-center">
              <span className="h-6 w-6 mr-2 text-amber-400">⚠️</span>
              Earnings Surprise Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {surprisePredictions.map((surprise, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-stone-100 font-bold">{surprise.symbol}</span>
                    <Badge
                      className={
                        surprise.type.includes('Positive')
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }
                    >
                      {surprise.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-semibold">{surprise.probability}%</p>
                    <p className="text-xs text-stone-400">Probability</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Expected Move:</span>
                    <span
                      className={`font-semibold ${
                        surprise.expectedMove.includes('+') ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {surprise.expectedMove}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Risk Level:</span>
                    <Badge
                      className={
                        surprise.riskLevel === 'High'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }
                    >
                      {surprise.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-stone-300 text-sm mt-2">{surprise.reasoning}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
