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
'use client';
import React, { useState, useEffect } from 'react';

// Types;
interface ValueAtRisk {






















  oneDay: number;
  oneWeek: number;
  oneMonth: number;






















}

interface StressTest {






















  scenario: string;
  portfolioImpact: number;
  probability: number;






















}

interface CorrelationRisk {






















  asset1: string;
  asset2: string;
  correlation: number;
  risk: 'High' | 'Medium' | 'Low';






















}

interface RiskFactor {






















  factor: string;
  score: number;
  description: string;






















}

interface HedgingStrategy {






















  strategy: string;
  cost: string;
  protection: string;
  effectiveness: number;






















}

interface RiskMetrics {






















  overallRisk: number;
  riskLevel: string;
  valueAtRisk: ValueAtRisk;
  stressTests: StressTest[];
  correlationRisks: CorrelationRisk[];
  riskFactors: RiskFactor[];
  hedgingStrategies: HedgingStrategy[];






















}

interface ValueAtRisk {






















  oneDay: number;
  oneWeek: number;
  oneMonth: number;






















}

interface StressTest {






















  scenario: string;
  portfolioImpact: number;
  probability: number;






















}

interface CorrelationRisk {






















  asset1: string;
  asset2: string;
  correlation: number;
  risk: string;






















}

interface RiskFactor {






















  factor: string;
  level: string;
  impact: number;
  description: string;
  score: number;






















}

interface HedgingStrategy {






















  strategy: string;
  effectiveness: number;
  cost: string;
  description: string;
  protection: string;






















}

interface RiskMetrics {






















  overallRisk: number;
  riskLevel: string;
  valueAtRisk: ValueAtRisk;
  stressTests: StressTest[];
  correlationRisks: CorrelationRisk[];
  riskFactors: RiskFactor[];
  recommendations: string[];
  hedgingStrategies: HedgingStrategy[];






















}

export default function RiskAnalyzer() {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null);

  useEffect(() => {
    // Simulate risk analysis data;
    setRiskMetrics({
      overallRisk: 68,;
      riskLevel: 'Medium-High',;
      valueAtRisk: {
        oneDay: 2.3,;
        oneWeek: 5.8,;
        oneMonth: 12.4,;
      },;
      stressTests: [;
        { scenario: 'Market Crash (-20%)', portfolioImpact: -18.5, probability: 5 },;
        { scenario: 'Interest Rate Spike', portfolioImpact: -12.3, probability: 15 },;
        { scenario: 'Sector Rotation', portfolioImpact: -8.7, probability: 25 },;
        { scenario: 'Inflation Surge', portfolioImpact: -6.2, probability: 20 },;
      ],;
      correlationRisks: [;
        { asset1: 'AAPL', asset2: 'MSFT', correlation: 0.78, risk: 'High' },;
        { asset1: 'TSLA', asset2: 'NVDA', correlation: 0.65, risk: 'Medium' },;
        { asset1: 'GOOGL', asset2: 'AMZN', correlation: 0.72, risk: 'High' },;
      ],;
      riskFactors: [;
        {
          factor: 'Concentration Risk',;
          level: 'High',;
          impact: 75,;
          score: 75,;
          description: 'Portfolio concentrated in tech sector',;
        },;
        { 
          factor: 'Volatility Risk',;
          level: 'Medium-High',;
          impact: 68,;
          score: 68,;
          description: 'High individual stock volatilities';
        },;
        { 
          factor: 'Market Risk',;
          level: 'Medium',;
          impact: 55,;
          score: 55,;
          description: 'Exposure to market downturns';
        },;
        { 
          factor: 'Liquidity Risk',;
          level: 'Low',;
          impact: 25,;
          score: 25,;
          description: 'All holdings are highly liquid';
        },;
        { 
          factor: 'Currency Risk',;
          level: 'Low',;
          impact: 15,;
          score: 15,;
          description: 'Minimal foreign exposure';
        },;
      ],;
      hedgingStrategies: [;
        {
          strategy: 'Put Options on QQQ',;
          cost: '1.2% of portfolio',;
          protection: '15-20% downside',;
          effectiveness: 85,;
          description: 'Provides downside protection through put options',;
        },;
        {
          strategy: 'VIX Calls',;
          cost: '0.8% of portfolio',;
          protection: 'Volatility spikes',;
          effectiveness: 70,;
          description: 'Hedges against volatility increases',;
        },;
        {
          strategy: 'Treasury Bonds',;
          cost: 'Opportunity cost',;
          protection: 'Market correlation',;
          effectiveness: 60,;
          description: 'Provides portfolio diversification',;
        },;
      ],;
      recommendations: [;
        'Consider reducing tech sector concentration',;
        'Implement stop-loss orders at -15% levels',;
        'Add defensive sectors (utilities, consumer staples)',;
        'Increase cash position to 10-15%',;
        'Consider hedging with put options',;
      ],;
    });
  }, []);

  const getRiskColor = (score: number): string => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskBadgeVariant = (level: string): string => {
    switch (level) {
      case 'High':;
        return 'bg-red-500/20 text-red-400';
      case 'Medium':;
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Low':;
        return 'bg-green-500/20 text-green-400';
      default:;
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (!riskMetrics) {
    return (;
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
        <CardContent className="p-8 text-center">;
          <span className="text-6xl text-orange-400 mb-4 block animate-pulse">⚠️</span>;
          <p className="text-white">Analyzing portfolio risks...</p>;
        </CardContent>;
      </Card>;
    );
  }

  return (;
    <div className="space-y-6">;
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">;
        <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">;
          <CardContent className="p-6 text-center">;
            <span className="text-6xl text-red-400 mb-4 block">⚠️</span>;
            <p className="text-3xl font-bold text-red-400 mb-2">{riskMetrics.overallRisk}</p>;
            <p className="text-gray-300">Overall Risk Score</p>;
            <Badge className="mt-2 bg-red-500/20 text-red-400">{riskMetrics.riskLevel}</Badge>;
          </CardContent>;
        </Card>;
        <Card className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">;
          <CardContent className="p-6 text-center">;
            <span className="text-6xl text-yellow-400 mb-4 block">📉</span>;
            <p className="text-3xl font-bold text-yellow-400 mb-2">;
              {riskMetrics.valueAtRisk.oneDay}%;
            </p>;
            <p className="text-gray-300">1-Day VaR (95%)</p>;
            <p className="text-xs text-gray-400 mt-2">Maximum expected loss</p>;
          </CardContent>;
        </Card>;
        <Card className="bg-black/20 border-blue-500/30 backdrop-blur-xl">;
          <CardContent className="p-6 text-center">;
            <span className="text-6xl text-blue-400 mb-4 block">🛡️</span>;
            <p className="text-3xl font-bold text-blue-400 mb-2">3</p>;
            <p className="text-gray-300">Hedge Strategies</p>;
            <p className="text-xs text-gray-400 mt-2">Available options</p>;
          </CardContent>;
        </Card>;
      </div>;
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
        {/* Value at Risk */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardHeader>;
            <CardTitle className="text-white flex items-center">;
              <span className="text-xl mr-2 text-orange-400">📊</span>;
              Value at Risk Analysis;
            </CardTitle>;
          </CardHeader>;
          <CardContent className="space-y-4">;
            <div className="space-y-3">;
              <div className="flex justify-between items-center">;
                <span className="text-gray-300">1 Day (95% confidence)</span>;
                <span className="text-red-400 font-bold">{riskMetrics.valueAtRisk.oneDay}%</span>;
              </div>;
              <Progress value={riskMetrics.valueAtRisk.oneDay * 4} className="h-2" />;
              <div className="flex justify-between items-center">;
                <span className="text-gray-300">1 Week (95% confidence)</span>;
                <span className="text-red-400 font-bold">{riskMetrics.valueAtRisk.oneWeek}%</span>;
              </div>;
              <Progress value={riskMetrics.valueAtRisk.oneWeek * 2} className="h-2" />;
              <div className="flex justify-between items-center">;
                <span className="text-gray-300">1 Month (95% confidence)</span>;
                <span className="text-red-400 font-bold">{riskMetrics.valueAtRisk.oneMonth}%</span>;
              </div>;
              <Progress value={riskMetrics.valueAtRisk.oneMonth} className="h-2" />;
            </div>;
          </CardContent>;
        </Card>;
        {/* Risk Factors */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardHeader>;
            <CardTitle className="text-white flex items-center">;
              <span className="text-xl mr-2 text-purple-400">🎯</span>;
              Risk Factor Breakdown;
            </CardTitle>;
          </CardHeader>;
          <CardContent className="space-y-4">;
            {riskMetrics.riskFactors.map((factor, index) => (;
              <div key={index} className="space-y-2">;
                <div className="flex justify-between items-center">;
                  <span className="text-white font-medium">{factor.factor}</span>;
                  <span className={`font-bold ${getRiskColor(factor.score)}`}>{factor.score}</span>;
                </div>;
                <Progress value={factor.score} className="h-2" />;
                <p className="text-xs text-gray-400">{factor.description}</p>;
              </div>;
            ))}
          </CardContent>;
        </Card>;
        {/* Stress Tests */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardHeader>;
            <CardTitle className="text-white flex items-center">;
              <span className="text-xl mr-2 text-red-400">📈</span>;
              Stress Test Scenarios;
            </CardTitle>;
          </CardHeader>;
          <CardContent className="space-y-3">;
            {riskMetrics.stressTests.map((test, index) => (;
              <div key={index} className="p-3 bg-white/5 rounded-lg">;
                <div className="flex justify-between items-center mb-2">;
                  <span className="text-white font-medium">{test.scenario}</span>;
                  <Badge className="text-xs bg-gray-500/20 text-gray-400">;
                    {test.probability}% chance;
                  </Badge>;
                </div>;
                <div className="flex justify-between items-center">;
                  <span className="text-red-400 font-bold">{test.portfolioImpact}%</span>;
                  <Progress value={Math.abs(test.portfolioImpact) * 2} className="w-24 h-2" />;
                </div>;
              </div>;
            ))}
          </CardContent>;
        </Card>;
        {/* Hedging Strategies */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardHeader>;
            <CardTitle className="text-white flex items-center">;
              <span className="text-xl mr-2 text-green-400">🛡️</span>;
              Recommended Hedges;
            </CardTitle>;
          </CardHeader>;
          <CardContent className="space-y-3">;
            {riskMetrics.hedgingStrategies.map((hedge, index) => (;
              <div;
                key={index}
                className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/30";
              >;
                <div className="flex justify-between items-center mb-2">;
                  <span className="text-white font-medium">{hedge.strategy}</span>;
                  <Badge className="bg-green-500/20 text-green-400">;
                    {hedge.effectiveness}% effective;
                  </Badge>;
                </div>;
                <div className="text-sm text-gray-300 space-y-1">;
                  <p>Cost: {hedge.cost}</p>;
                  <p>Protection: {hedge.protection}</p>;
                </div>;
              </div>;
            ))}
          </CardContent>;
        </Card>;
      </div>;
      {/* Correlation Matrix */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
        <CardHeader>;
          <CardTitle className="text-white">Asset Correlation Risks</CardTitle>;
        </CardHeader>;
        <CardContent>;
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">;
            {riskMetrics.correlationRisks.map((corr, index) => (;
              <div key={index} className="p-4 bg-white/5 rounded-lg">;
                <div className="flex justify-between items-center mb-2">;
                  <span className="text-white font-medium">;
                    {corr.asset1} - {corr.asset2}
                  </span>;
                  <Badge className={getRiskBadgeVariant(corr.risk)}>{corr.risk}</Badge>;
                </div>;
                <div className="flex items-center space-x-2">;
                  <span className="text-gray-300 text-sm">Correlation:</span>;
                  <span className="text-white font-bold">{corr.correlation}</span>;
                  <Progress value={corr.correlation * 100} className="flex-1 h-2" />;
                </div>;
              </div>;
            ))}
          </div>;
        </CardContent>;
      </Card>;
    </div>;
  );
}
