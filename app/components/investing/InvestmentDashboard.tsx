import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
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

import { useState } from 'react';
<<<<<<< HEAD
=======
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Search,
  Star,
  Plus,
  Eye,
  Target,
  BarChart3,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  balance?: number;
}

interface PortfolioItem {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  dayChange: number;
  change: number;
  price: number;
  totalReturn: number;
}

interface InvestmentDashboardProps {
  user: User;
  onUpdatePortfolio: (portfolio: PortfolioItem[]) => void;
}

export default function InvestmentDashboard({ user, onUpdatePortfolio }: InvestmentDashboardProps) {
  const [portfolio] = useState<PortfolioItem[]>([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      avgPrice: 150.25,
      currentPrice: 175.43,
      value: 8771.5,
      dayChange: 2.34,
      totalReturn: 1259,
      change: 1.5,
      price: 175.43,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 25,
      avgPrice: 320.5,
      currentPrice: 378.85,
      value: 9471.25,
      dayChange: -1.23,
      totalReturn: 1458.75,
      change: -0.5,
      price: 378.85,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 30,
      avgPrice: 125.75,
      currentPrice: 138.21,
      value: 4146.3,
      dayChange: 4.56,
      totalReturn: 373.8,
      change: 3.5,
      price: 138.21,
    },
  ]);

  const [watchlist] = useState([
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.5, change: -3.21 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.28, change: 15.67 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.89, change: 1.45 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.32, change: 2.87 },
  ]);

  const [trending] = useState([
    { symbol: 'PLTR', name: 'Palantir Technologies', price: 25.67, change: 8.45 },
    { symbol: 'RIVN', name: 'Rivian Automotive', price: 12.34, change: -5.23 },
    { symbol: 'COIN', name: 'Coinbase Global', price: 89.45, change: 12.67 },
    { symbol: 'HOOD', name: 'Robinhood Markets', price: 15.78, change: 6.89 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<PortfolioItem | null>(null);
  const [orderType, setOrderType] = useState('buy');
  const [orderAmount, setOrderAmount] = useState('');

  const totalPortfolioValue = portfolio.reduce((sum, stock) => sum + stock.value, 0);
  const totalReturn = portfolio.reduce((sum, stock) => sum + stock.totalReturn, 0);
  const totalReturnPercent = ((totalReturn / (totalPortfolioValue - totalReturn)) * 100).toFixed(2);

  const handleStockSelect = (stock: PortfolioItem) => {
    setSelectedStock(stock);
  };

  const handleOrder = () => {
    if (selectedStock && orderAmount) {
      // Simulate order execution
      console.log(`${orderType} ${orderAmount} shares of ${selectedStock.symbol}`);
      setOrderAmount('');
      setSelectedStock(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-bold text-green-400">
                  ${totalPortfolioValue.toLocaleString()}
                </p>
              </div>
              <PieChart className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Return</p>
                <p className="text-2xl font-bold text-blue-400">+${totalReturn.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Return %</p>
                <p className="text-2xl font-bold text-purple-400">+{totalReturnPercent}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Buying Power</p>
                <p className="text-2xl font-bold text-yellow-400">
                  ${user.balance?.toLocaleString() || '0'}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="bg-black/20 border-purple-500/30">
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-500/20">
            <PieChart className="h-4 w-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="trade" className="data-[state=active]:bg-purple-500/20">
            <Target className="h-4 w-4 mr-2" />
            Trade
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="data-[state=active]:bg-purple-500/20">
            <Eye className="h-4 w-4 mr-2" />
            Watchlist
          </TabsTrigger>
          <TabsTrigger value="discover" className="data-[state=active]:bg-purple-500/20">
            <Search className="h-4 w-4 mr-2" />
            Discover
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Your Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolio.map((stock: PortfolioItem) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-500/20 rounded-full">
                        <BarChart3 className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-400">{stock.name}</p>
                        <p className="text-xs text-gray-500">
                          {stock.shares} shares @ ${stock.avgPrice}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${stock.value.toLocaleString()}</p>
                      <p
                        className={`text-sm ${stock.dayChange > 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {stock.dayChange > 0 ? '+' : ''}
                        {stock.dayChange}%
                      </p>
                      <p
                        className={`text-xs ${stock.totalReturn > 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {stock.totalReturn > 0 ? '+' : ''}${stock.totalReturn.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trade">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Trade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/20 border-purple-500/30 text-white"
                  />
                </div>

                {selectedStock && (
                  <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-white">{selectedStock.symbol}</p>
                        <p className="text-sm text-gray-400">{selectedStock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          ${selectedStock.price || selectedStock.currentPrice}
                        </p>
                        <p
                          className={`text-sm ${(selectedStock.change || selectedStock.dayChange) > 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {(selectedStock.change || selectedStock.dayChange) > 0 ? '+' : ''}
                          {selectedStock.change || selectedStock.dayChange}%
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Button
                        variant={orderType === 'buy' ? 'default' : 'outline'}
                        onClick={() => setOrderType('buy')}
                        className={
                          orderType === 'buy'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'border-green-500/30 text-green-400'
                        }
                      >
                        Buy
                      </Button>
                      <Button
                        variant={orderType === 'sell' ? 'default' : 'outline'}
                        onClick={() => setOrderType('sell')}
                        className={
                          orderType === 'sell'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'border-red-500/30 text-red-400'
                        }
                      >
                        Sell
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Number of shares"
                        value={orderAmount}
                        onChange={e => setOrderAmount(e.target.value)}
                        className="bg-black/20 border-purple-500/30 text-white"
                      />
                      <p className="text-sm text-gray-400">
                        Estimated cost: $
                        {(
                          (selectedStock.price || selectedStock.currentPrice) *
                          (Number(orderAmount) || 0)
                        ).toLocaleString()}
                      </p>
                    </div>

                    <Button
                      onClick={handleOrder}
                      disabled={!orderAmount}
                      className={`w-full ${
                        orderType === 'buy'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                          : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                      }`}
                    >
                      {orderType === 'buy' ? 'Buy' : 'Sell'} {orderAmount || 0} shares
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Market Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trending.map((stock: any) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
                      onClick={() => handleStockSelect(stock)}
                    >
                      <div>
                        <p className="font-medium text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-400">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">${stock.price}</p>
                        <p
                          className={`text-sm ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {stock.change > 0 ? '+' : ''}
                          {stock.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Your Watchlist</span>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stock
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {watchlist.map((stock: any) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-yellow-500/20 rounded-full">
                        <Star className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-400">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${stock.price}</p>
                      <p
                        className={`text-sm ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {stock.change > 0 ? '+' : ''}
                        {stock.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Trending Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trending.map((stock: any) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-all cursor-pointer"
                      onClick={() => handleStockSelect(stock)}
                    >
                      <div>
                        <p className="font-medium text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-400">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">${stock.price}</p>
                        <Badge
                          className={
                            stock.change > 0
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }
                        >
                          {stock.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {stock.change > 0 ? '+' : ''}
                          {stock.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolio.slice(0, 3).map((stock: any) => (
                    <div
                      key={stock.symbol}
                      className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">{stock.symbol}</p>
                        <Badge className="bg-green-500/20 text-green-400">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          BUY
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">AI Confidence: 87%</p>
                      <p className="text-xs text-gray-500">
                        Strong technical indicators and positive earnings outlook suggest continued
                        upward momentum.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
