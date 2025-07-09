<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
=======
import { Alert } from '@/components/ui/alert';
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
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

('use client');
import React from 'react';

import { useState, useEffect } from 'react';
<<<<<<< HEAD

<<<<<<< HEAD

=======
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
=======
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
import {
  Leaf,
  BarChart3,
  TrendingUp,
  Globe,
  Wind,
  Droplets,
  Sun,
  Sprout,
  TreePine,
  Recycle,
  Zap,
  AlertTriangle,
  ThumbsUp,
  Users,
  Building2,
} from 'lucide-react';

export default function SustainableInvesting() {
  const [esgData, setEsgData] = useState({
    portfolioScore: {
      overall: 87 + Math.random() * 5,
      environmental: 92 + Math.random() * 5,
      social: 84 + Math.random() * 5,
      governance: 86 + Math.random() * 5,
    },
    impactMetrics: {
      carbonOffset: 1247 + Math.random() * 100,
      renewableEnergy: 78 + Math.random() * 5,
      waterConservation: 1.5 + Math.random() * 0.5,
      sustainableMaterials: 82 + Math.random() * 5,
    },
    performance: {
      ytd: 14.7 + Math.random() * 3,
      oneYear: 24.8 + Math.random() * 5,
      threeYear: 67.9 + Math.random() * 10,
      fiveYear: 124.5 + Math.random() * 15,
    },
    sustainableAUM: 478000000 + Math.random() * 10000000,
    impactInvestments: 124000000 + Math.random() * 5000000,
  });

  const [esgStocks, setEsgStocks] = useState([
    {
      ticker: 'ENRG',
      name: 'CleanEnergy Solutions',
      sector: 'Renewable Energy',
      esgRating: 'AAA',
      price: 87.45 + Math.random() * 5,
      change: 3.7 + Math.random() * 2,
      marketCap: '47.8B',
      recommendation: 'Strong Buy',
    },
    {
      ticker: 'WATR',
      name: 'AquaPure Technologies',
      sector: 'Water Treatment',
      esgRating: 'AA',
      price: 124.78 + Math.random() * 8,
      change: 2.4 + Math.random() * 2,
      marketCap: '28.5B',
      recommendation: 'Buy',
    },
    {
      ticker: 'SOLR',
      name: 'SolarMax Industries',
      sector: 'Solar Energy',
      esgRating: 'AAA',
      price: 215.92 + Math.random() * 10,
      change: 4.8 + Math.random() * 2,
      marketCap: '65.2B',
      recommendation: 'Strong Buy',
    },
    {
      ticker: 'GRFM',
      name: 'GreenFarm Organics',
      sector: 'Sustainable Agriculture',
      esgRating: 'AA',
      price: 78.34 + Math.random() * 5,
      change: 1.9 + Math.random() * 2,
      marketCap: '12.7B',
      recommendation: 'Buy',
    },
  ]);

  const [impactFunds, setImpactFunds] = useState([
    {
      ticker: 'CLMT',
      name: 'Climate Action ETF',
      focus: 'Carbon Reduction',
      aum: '$2.4B',
      expense: '0.45%',
      ytdReturn: 18.7 + Math.random() * 5,
      rating: 5,
    },
    {
      ticker: 'SDGX',
      name: 'Sustainable Development Fund',
      focus: 'UN SDG Alignment',
      aum: '$1.8B',
      expense: '0.52%',
      ytdReturn: 15.4 + Math.random() * 5,
      rating: 4,
    },
    {
      ticker: 'OCNX',
      name: 'Ocean Conservation Fund',
      focus: 'Marine Ecosystems',
      aum: '$780M',
      expense: '0.58%',
      ytdReturn: 12.9 + Math.random() * 5,
      rating: 5,
    },
    {
      ticker: 'EQTX',
      name: 'Social Equity Portfolio',
      focus: 'Diversity & Inclusion',
      aum: '$1.2B',
      expense: '0.49%',
      ytdReturn: 14.2 + Math.random() * 5,
      rating: 4,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateESGData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateESGData = () => {
    setEsgData(prev => ({
      ...prev,
      portfolioScore: {
        ...prev.portfolioScore,
        overall: Math.min(100, prev.portfolioScore.overall + (Math.random() - 0.3) * 0.5),
        environmental: Math.min(
          100,
          prev.portfolioScore.environmental + (Math.random() - 0.3) * 0.5
        ),
        social: Math.min(100, prev.portfolioScore.social + (Math.random() - 0.3) * 0.5),
        governance: Math.min(100, prev.portfolioScore.governance + (Math.random() - 0.3) * 0.5),
      },
      impactMetrics: {
        ...prev.impactMetrics,
        carbonOffset: prev.impactMetrics.carbonOffset + (Math.random() - 0.3) * 5,
        renewableEnergy: Math.min(
          100,
          prev.impactMetrics.renewableEnergy + (Math.random() - 0.3) * 0.5
        ),
      },
    }));

    setEsgStocks(prev =>
      prev.map((stock: any) => ({
        ...stock,
        price: stock.price * (1 + (Math.random() - 0.45) * 0.01),
        change: stock.change * (1 + (Math.random() - 0.45) * 0.05),
      }))
    );

    setImpactFunds(prev =>
      prev.map((fund: any) => ({
        ...fund,
        ytdReturn: fund.ytdReturn * (1 + (Math.random() - 0.45) * 0.01),
      }))
    );
  };

  const getScoreColor = (score: any) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-emerald-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getChangeColor = (change: any) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getRatingStars = (rating: any) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="space-y-6">
      {/* ESG Portfolio Dashboard */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Leaf className="h-7 w-7 mr-3 text-green-400" />
            🌱 ESG & Sustainable Investing
            <Badge className="ml-3 bg-gradient-to-r from-green-400 to-emerald-500">
              <Globe className="h-4 w-4 mr-1" />
              CLIMATE POSITIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
              <div className="flex items-center justify-between mb-4">
                <Leaf className="h-8 w-8 text-green-400" />
                <Badge className="bg-green-500">ESG SCORE</Badge>
              </div>
              <div
                className={`text-3xl font-bold ${getScoreColor(esgData.portfolioScore.overall)} mb-2`}
              >
                {esgData.portfolioScore.overall.toFixed(1)}
              </div>
              <p className="text-green-400 font-semibold">Portfolio ESG Rating</p>
              <p className="text-gray-400 text-sm">Top 5% of all portfolios</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <div className="flex items-center justify-between mb-4">
                <Recycle className="h-8 w-8 text-blue-400" />
                <Badge className="bg-blue-500">CARBON</Badge>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {esgData.impactMetrics.carbonOffset.toFixed(0)} tons
              </div>
              <p className="text-blue-400 font-semibold">Carbon Offset</p>
              <p className="text-gray-400 text-sm">Through portfolio investments</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-400/30">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-400" />
                <Badge className="bg-emerald-500">RETURNS</Badge>
              </div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                +{esgData.performance.ytd.toFixed(1)}%
              </div>
              <p className="text-emerald-400 font-semibold">YTD Performance</p>
              <p className="text-gray-400 text-sm">Sustainable investments</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-400/30">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="h-8 w-8 text-yellow-400" />
                <Badge className="bg-yellow-500">AUM</Badge>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                ${(esgData.sustainableAUM / 1000000).toFixed(1)}M
              </div>
              <p className="text-yellow-400 font-semibold">Sustainable AUM</p>
              <p className="text-gray-400 text-sm">ESG-aligned assets</p>
            </div>
          </div>

          {/* ESG Score Breakdown */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-green-400" />
                ESG Score Breakdown
              </h3>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Leaf className="h-4 w-4 mr-2" />
                Improve Score
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <TreePine className="h-5 w-5 mr-2 text-green-400" />
                    <span className="text-white font-medium">Environmental</span>
                  </div>
                  <span
                    className={`font-bold ${getScoreColor(esgData.portfolioScore.environmental)}`}
                  >
                    {esgData.portfolioScore.environmental.toFixed(1)}
                  </span>
                </div>
                <Progress value={esgData.portfolioScore.environmental} className="h-2" />
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="text-center">
                    <div className="p-2 bg-green-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Recycle className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Carbon Footprint</p>
                    <p className="text-white font-medium">94.2</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-green-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Droplets className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Water Usage</p>
                    <p className="text-white font-medium">89.7</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-green-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Wind className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Clean Energy</p>
                    <p className="text-white font-medium">96.5</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="text-white font-medium">Social</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(esgData.portfolioScore.social)}`}>
                    {esgData.portfolioScore.social.toFixed(1)}
                  </span>
                </div>
                <Progress value={esgData.portfolioScore.social} className="h-2" />
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="text-center">
                    <div className="p-2 bg-blue-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Diversity</p>
                    <p className="text-white font-medium">87.3</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-blue-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <ThumbsUp className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Human Rights</p>
                    <p className="text-white font-medium">82.9</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-blue-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Globe className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Community</p>
                    <p className="text-white font-medium">84.6</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="text-white font-medium">Governance</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(esgData.portfolioScore.governance)}`}>
                    {esgData.portfolioScore.governance.toFixed(1)}
                  </span>
                </div>
                <Progress value={esgData.portfolioScore.governance} className="h-2" />
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div className="text-center">
                    <div className="p-2 bg-yellow-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Risk Management</p>
                    <p className="text-white font-medium">88.4</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-yellow-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Zap className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Ethics</p>
                    <p className="text-white font-medium">85.7</p>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-yellow-400/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                      <Building2 className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Board Structure</p>
                    <p className="text-white font-medium">83.9</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainable Investment Opportunities */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Sprout className="h-7 w-7 mr-3 text-blue-400" />
            💰 Sustainable Investment Opportunities
            <Badge className="ml-3 bg-gradient-to-r from-blue-400 to-cyan-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              AI CURATED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stocks" className="space-y-6">
            <TabsList className="bg-black/20 border-blue-400/30">
              <TabsTrigger value="stocks">ESG Stocks</TabsTrigger>
              <TabsTrigger value="funds">Impact Funds</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="stocks">
              <div className="space-y-4">
                <div className="grid grid-cols-6 text-sm font-medium text-gray-400 pb-2 border-b border-gray-700/50">
                  <div>Ticker</div>
                  <div className="col-span-2">Company</div>
                  <div>ESG Rating</div>
                  <div>Price</div>
                  <div>Change</div>
                </div>

                {esgStocks.map((stock, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 items-center py-3 border-b border-gray-800/50"
                  >
                    <div className="font-bold text-white">{stock.ticker}</div>
                    <div className="col-span-2">
                      <div className="text-white">{stock.name}</div>
                      <div className="text-gray-400 text-xs">{stock.sector}</div>
                    </div>
                    <div>
                      <Badge
                        className={
                          stock.esgRating === 'AAA'
                            ? 'bg-green-500'
                            : stock.esgRating === 'AA'
                              ? 'bg-emerald-500'
                              : 'bg-blue-500'
                        }
                      >
                        {stock.esgRating}
                      </Badge>
                    </div>
                    <div className="text-white">${stock.price.toFixed(2)}</div>
                    <div className={getChangeColor(stock.change)}>
                      {stock.change > 0 ? '+' : ''}
                      {stock.change.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Leaf className="h-4 w-4 mr-2" />
                  View All ESG Stocks
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="funds">
              <div className="space-y-4">
                {impactFunds.map((fund, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-white font-bold text-lg">{fund.ticker}</h4>
                          <span className="text-yellow-400 ml-2">
                            {getRatingStars(fund.rating)}
                          </span>
                        </div>
                        <p className="text-gray-300">{fund.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                            {fund.focus}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-2xl font-bold text-green-400">
                          +{fund.ytdReturn.toFixed(1)}%
                        </div>
                        <p className="text-gray-400 text-sm">YTD Return</p>
                        <div className="flex items-center justify-end space-x-4 mt-1">
                          <div>
                            <p className="text-gray-400 text-xs">AUM</p>
                            <p className="text-white">{fund.aum}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Expense</p>
                            <p className="text-white">{fund.expense}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Globe className="h-4 w-4 mr-2" />
                  View All Impact Funds
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                  <h3 className="text-white font-bold text-lg mb-4">ESG Portfolio Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">YTD Return</span>
                      <span className="text-green-400 font-bold">
                        +{esgData.performance.ytd.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">1 Year</span>
                      <span className="text-green-400 font-bold">
                        +{esgData.performance.oneYear.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">3 Year</span>
                      <span className="text-green-400 font-bold">
                        +{esgData.performance.threeYear.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">5 Year</span>
                      <span className="text-green-400 font-bold">
                        +{esgData.performance.fiveYear.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                  <h3 className="text-white font-bold text-lg mb-4">Impact Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Carbon Offset</span>
                        <span className="text-white font-bold">
                          {esgData.impactMetrics.carbonOffset.toFixed(0)} tons
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Renewable Energy</span>
                        <span className="text-white font-bold">
                          {esgData.impactMetrics.renewableEnergy.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={esgData.impactMetrics.renewableEnergy} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Water Conservation</span>
                        <span className="text-white font-bold">
                          {esgData.impactMetrics.waterConservation.toFixed(1)}M gallons
                        </span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Sustainable Materials</span>
                        <span className="text-white font-bold">
                          {esgData.impactMetrics.sustainableMaterials.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={esgData.impactMetrics.sustainableMaterials}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder for chart */}
              <div className="mt-6 h-64 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg border border-green-400/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-green-400 text-lg">
                    ESG vs. Traditional Portfolio Performance Chart
                  </p>
                </div>
                <svg
                  className="absolute bottom-0 w-full"
                  viewBox="0 0 1000 200"
                  preserveAspectRatio="none"
                  height="100%"
                  width="100%"
                >
                  <path
                    d="M0,150 C100,120 200,100 300,80 C400,60 500,50 600,30 C700,20 800,40 900,20 L900,200 L0,200 Z"
                    fill="url(#green-gradient)"
                    opacity="0.3"
                  ></path>
                  <path
                    d="M0,170 C100,160 200,140 300,130 C400,120 500,100 600,110 C700,120 800,100 900,90 L900,200 L0,200 Z"
                    fill="url(#blue-gradient)"
                    opacity="0.2"
                  ></path>
                  <defs>
                    <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Impact Investing */}
      <Card className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border-emerald-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Globe className="h-7 w-7 mr-3 text-emerald-400" />
            🌍 Impact Investing Dashboard
            <Badge className="ml-3 bg-gradient-to-r from-emerald-400 to-teal-500">
              <Sprout className="h-4 w-4 mr-1" />
              UN SDG ALIGNED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-400/30">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-400/20 rounded-lg mr-4">
                  <Sun className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-lg">Clean Energy</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Investments in renewable energy projects including solar, wind, and hydroelectric
                power generation.
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500">$47.8M INVESTED</Badge>
                <span className="text-green-400 font-bold">+24.7% ROI</span>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-400/20 rounded-lg mr-4">
                  <Droplets className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-lg">Water Solutions</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Investments in clean water access, conservation technologies, and ocean preservation
                initiatives.
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-500">$28.5M INVESTED</Badge>
                <span className="text-green-400 font-bold">+18.9% ROI</span>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-lg border border-green-400/30">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-400/20 rounded-lg mr-4">
                  <Sprout className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-lg">Sustainable Agriculture</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Investments in organic farming, regenerative agriculture, and sustainable food
                production systems.
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-500">$15.4M INVESTED</Badge>
                <span className="text-green-400 font-bold">+21.3% ROI</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-emerald-400" />
              UN Sustainable Development Goals Alignment
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30 text-center">
                <div className="p-3 bg-blue-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Droplets className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="text-white font-bold">SDG 6</h4>
                <p className="text-gray-400 text-sm mt-1">Clean Water & Sanitation</p>
                <Progress value={85} className="h-1 mt-2" />
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-400/30 text-center">
                <div className="p-3 bg-yellow-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Sun className="h-6 w-6 text-yellow-400" />
                </div>
                <h4 className="text-white font-bold">SDG 7</h4>
                <p className="text-gray-400 text-sm mt-1">Affordable & Clean Energy</p>
                <Progress value={92} className="h-1 mt-2" />
              </div>

              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30 text-center">
                <div className="p-3 bg-green-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Sprout className="h-6 w-6 text-green-400" />
                </div>
                <h4 className="text-white font-bold">SDG 13</h4>
                <p className="text-gray-400 text-sm mt-1">Climate Action</p>
                <Progress value={88} className="h-1 mt-2" />
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30 text-center">
                <div className="p-3 bg-purple-400/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="text-white font-bold">SDG 10</h4>
                <p className="text-gray-400 text-sm mt-1">Reduced Inequalities</p>
                <Progress value={78} className="h-1 mt-2" />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold px-8">
                <Globe className="h-5 w-5 mr-2" />
                View All 17 SDG Alignments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
