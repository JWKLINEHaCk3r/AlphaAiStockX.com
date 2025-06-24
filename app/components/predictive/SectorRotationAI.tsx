'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, TrendingDown, Brain, Zap } from 'lucide-react';

export default function SectorRotationAI() {
  const [sectorData, setSectorData] = useState([]);
  const [rotationSignals, setRotationSignals] = useState([]);
  const [economicCycle, setEconomicCycle] = useState({});

  useEffect(() => {
    generateSectorData();
    generateRotationSignals();
    generateEconomicCycle();

    const interval = setInterval(() => {
      generateSectorData();
      generateRotationSignals();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const generateSectorData = () => {
    const sectors = [
      { name: 'Technology', symbol: 'XLK', weight: 28.5 },
      { name: 'Healthcare', symbol: 'XLV', weight: 13.2 },
      { name: 'Financials', symbol: 'XLF', weight: 11.8 },
      { name: 'Consumer Discretionary', symbol: 'XLY', weight: 10.9 },
      { name: 'Communication', symbol: 'XLC', weight: 8.7 },
      { name: 'Industrials', symbol: 'XLI', weight: 8.4 },
      { name: 'Consumer Staples', symbol: 'XLP', weight: 6.1 },
      { name: 'Energy', symbol: 'XLE', weight: 4.2 },
      { name: 'Utilities', symbol: 'XLU', weight: 2.8 },
      { name: 'Real Estate', symbol: 'XLRE', weight: 2.5 },
      { name: 'Materials', symbol: 'XLB', weight: 2.9 },
    ];

    const data = sectors.map(sector => ({
      ...sector,
      performance1D: (Math.random() - 0.5) * 4,
      performance1W: (Math.random() - 0.5) * 8,
      performance1M: (Math.random() - 0.5) * 15,
      momentum: 40 + Math.random() * 60,
      relativeStrength: 30 + Math.random() * 70,
      flowRating: Math.random() > 0.6 ? 'inflow' : Math.random() > 0.3 ? 'outflow' : 'neutral',
      aiScore: 50 + Math.random() * 50,
      volatility: 10 + Math.random() * 20,
      recommendation:
        Math.random() > 0.6 ? 'overweight' : Math.random() > 0.3 ? 'underweight' : 'neutral',
    }));

    setSectorData(data.sort((a, b) => b.aiScore - a.aiScore));
  };

  const generateRotationSignals = () => {
    const signals = [
      {
        from: 'Technology',
        to: 'Energy',
        strength: 85,
        timeframe: '2-4 weeks',
        catalyst: 'Rising oil prices & rate cuts',
        confidence: 78,
        historicalSuccess: 72,
      },
      {
        from: 'Growth',
        to: 'Value',
        strength: 72,
        timeframe: '1-3 months',
        catalyst: 'Economic cycle transition',
        confidence: 84,
        historicalSuccess: 68,
      },
      {
        from: 'Consumer Discretionary',
        to: 'Healthcare',
        strength: 68,
        timeframe: '3-6 weeks',
        catalyst: 'Defensive positioning',
        confidence: 71,
        historicalSuccess: 75,
      },
      {
        from: 'Small Cap',
        to: 'Large Cap',
        strength: 91,
        timeframe: '1-2 weeks',
        catalyst: 'Risk-off sentiment',
        confidence: 89,
        historicalSuccess: 81,
      },
    ];

    setRotationSignals(signals);
  };

  const generateEconomicCycle = () => {
    setEconomicCycle({
      currentPhase: 'Late Cycle',
      nextPhase: 'Recession',
      transitionProbability: 65,
      timeToTransition: '3-6 months',
      keyIndicators: [
        { name: 'Yield Curve', status: 'Inverted', impact: 'Negative' },
        { name: 'Employment', status: 'Strong', impact: 'Positive' },
        { name: 'Inflation', status: 'Moderating', impact: 'Positive' },
        { name: 'Fed Policy', status: 'Restrictive', impact: 'Negative' },
      ],
      recommendedSectors: ['Healthcare', 'Utilities', 'Consumer Staples'],
      avoidSectors: ['Technology', 'Consumer Discretionary', 'Real Estate'],
    });
  };

  const getFlowColor = flow => {
    switch (flow) {
      case 'inflow':
        return 'text-emerald-400';
      case 'outflow':
        return 'text-red-400';
      default:
        return 'text-amber-400';
    }
  };

  const getRecommendationColor = rec => {
    switch (rec) {
      case 'overweight':
        return 'text-emerald-400';
      case 'underweight':
        return 'text-red-400';
      default:
        return 'text-amber-400';
    }
  };

  const getPerformanceColor = perf => {
    return perf >= 0 ? 'text-emerald-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Economic Cycle Overview */}
      <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-400" />
            Economic Cycle Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-stone-200 font-semibold">Current Phase</span>
                  <Badge className="bg-purple-500">{economicCycle.currentPhase}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Next Phase:</span>
                    <span className="text-stone-200">{economicCycle.nextPhase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Transition Probability:</span>
                    <span className="text-amber-400 font-semibold">
                      {economicCycle.transitionProbability}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 text-sm">Time to Transition:</span>
                    <span className="text-stone-200">{economicCycle.timeToTransition}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-stone-200 font-semibold">Key Economic Indicators</h4>
                {economicCycle.keyIndicators?.map((indicator, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-stone-800/30 rounded-lg"
                  >
                    <span className="text-stone-300">{indicator.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-stone-600/30 text-stone-300">
                        {indicator.status}
                      </Badge>
                      <Badge
                        className={
                          indicator.impact === 'Positive' ? 'bg-emerald-500' : 'bg-red-500'
                        }
                      >
                        {indicator.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-stone-200 font-semibold mb-3">AI Recommended Sectors</h4>
                <div className="space-y-2">
                  {economicCycle.recommendedSectors?.map((sector, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-emerald-500/10 rounded border border-emerald-500/30"
                    >
                      <span className="text-emerald-400 font-medium">{sector}</span>
                      <Badge className="bg-emerald-500">Overweight</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-stone-200 font-semibold mb-3">Sectors to Avoid</h4>
                <div className="space-y-2">
                  {economicCycle.avoidSectors?.map((sector, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/30"
                    >
                      <span className="text-red-400 font-medium">{sector}</span>
                      <Badge className="bg-red-500">Underweight</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rotation Signals */}
      <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-amber-400" />
            Active Rotation Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rotationSignals.map((signal, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-stone-200 font-semibold">{signal.from}</span>
                      <TrendingDown className="h-4 w-4 text-red-400" />
                      <span className="text-stone-400">→</span>
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-stone-200 font-semibold">{signal.to}</span>
                    </div>
                    <Badge className="bg-amber-500">{signal.strength}% strength</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">{signal.confidence}%</p>
                    <p className="text-xs text-stone-400">Confidence</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-stone-400">Timeframe</p>
                    <p className="text-stone-200 font-medium">{signal.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-stone-400">Historical Success</p>
                    <p className="text-stone-200 font-medium">{signal.historicalSuccess}%</p>
                  </div>
                  <div>
                    <p className="text-stone-400">Catalyst</p>
                    <p className="text-stone-200 font-medium">{signal.catalyst}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sector Performance Matrix */}
      <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-stone-100 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-emerald-400" />
            Sector Performance & AI Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sectorData.map((sector, index) => (
              <div
                key={index}
                className="p-4 bg-stone-800/30 rounded-lg border border-stone-600/30 hover:border-stone-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-stone-100 font-bold">{sector.name}</span>
                        <Badge variant="outline" className="border-stone-600/30 text-stone-400">
                          {sector.symbol}
                        </Badge>
                        <Badge className={getRecommendationColor(sector.recommendation)}>
                          {sector.recommendation}
                        </Badge>
                      </div>
                      <p className="text-sm text-stone-400">Weight: {sector.weight}%</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-stone-400 text-xs">1D</p>
                        <p
                          className={`text-sm font-semibold ${getPerformanceColor(sector.performance1D)}`}
                        >
                          {sector.performance1D >= 0 ? '+' : ''}
                          {sector.performance1D.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-400 text-xs">1W</p>
                        <p
                          className={`text-sm font-semibold ${getPerformanceColor(sector.performance1W)}`}
                        >
                          {sector.performance1W >= 0 ? '+' : ''}
                          {sector.performance1W.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-400 text-xs">1M</p>
                        <p
                          className={`text-sm font-semibold ${getPerformanceColor(sector.performance1M)}`}
                        >
                          {sector.performance1M >= 0 ? '+' : ''}
                          {sector.performance1M.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-stone-400 text-xs">AI Score</p>
                      <p className="text-emerald-400 font-bold">{sector.aiScore.toFixed(0)}</p>
                      <Progress value={sector.aiScore} className="w-16 h-1 mt-1" />
                    </div>

                    <div className="text-center">
                      <p className="text-stone-400 text-xs">Momentum</p>
                      <p className="text-stone-200 font-semibold">{sector.momentum.toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={getFlowColor(sector.flowRating)}>{sector.flowRating}</Badge>
                    <p className="text-xs text-stone-400 mt-1">
                      Vol: {sector.volatility.toFixed(1)}%
                    </p>
                    <p className="text-xs text-stone-400">
                      RS: {sector.relativeStrength.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
