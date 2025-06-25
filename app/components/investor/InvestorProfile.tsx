'use client';

import { useState } from 'react';
import { ntent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  TrendingUp,
  Zap,
  Target,
  Shield,
  Crown,
  Activity,
  BarChart3,
  Cpu,
  Database,
  Gauge,
  PieChart,
  CheckCircle,
  Clock,
  Wifi,
} from 'lucide-react';
import AdvancedAIFeatures from '../features/AdvancedAIFeatures';
import ComplianceCenter from '../compliance/ComplianceCenter';

interface InvestorProfileProps {
  onSwitchToOwner?: () => void;
  onSwitchToAdmin?: () => void;
}

export default function InvestorProfile({
  onSwitchToOwner,
  onSwitchToAdmin,
}: InvestorProfileProps) {
  const [activeDemo, setActiveDemo] = useState('quantum-ai');
  const [isProcessing, setIsProcessing] = useState(false);

  const runDemo = (demoType: string) => {
    setActiveDemo(demoType);
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  const aiMetrics = {
    accuracy: 94.7,
    processing: 2847392,
    predictions: 15847,
    confidence: 96.8,
    uptime: 99.97,
    trades: 847392,
  };

  const portfolioData = [
    { symbol: 'AAPL', position: 1250, value: 234750, change: 2.4, ai_score: 94 },
    { symbol: 'TSLA', position: 500, value: 127500, change: -1.2, ai_score: 87 },
    { symbol: 'NVDA', position: 300, value: 89400, change: 5.7, ai_score: 98 },
    { symbol: 'MSFT', position: 800, value: 267200, change: 1.8, ai_score: 91 },
    { symbol: 'GOOGL', position: 200, value: 54600, change: 0.9, ai_score: 89 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Investor Command Center
          </h1>
          <p className="text-gray-400 mt-2">Revolutionary AI-Powered Investment Platform</p>
        </div>
        <div className="flex space-x-3">
          {onSwitchToOwner && (
            <Button onClick={onSwitchToOwner} variant="outline" className="border-yellow-500/30">
              <Crown className="h-4 w-4 mr-2" />
              Owner View
            </Button>
          )}
          {onSwitchToAdmin && (
            <Button onClick={onSwitchToAdmin} variant="outline" className="border-red-500/30">
              <Shield className="h-4 w-4 mr-2" />
              Admin Panel
            </Button>
          )}
        </div>
      </div>

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">AI Accuracy</p>
                <p className="text-3xl font-bold text-white">{aiMetrics.accuracy}%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <Progress value={aiMetrics.accuracy} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Data Points/sec</p>
                <p className="text-3xl font-bold text-white">
                  {aiMetrics.processing.toLocaleString()}
                </p>
              </div>
              <Database className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center mt-3">
              <Wifi className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm">Live Processing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">AI Predictions</p>
                <p className="text-3xl font-bold text-white">
                  {aiMetrics.predictions.toLocaleString()}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex items-center mt-3">
              <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
              <span className="text-purple-400 text-sm">{aiMetrics.confidence}% Confidence</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Total Trades</p>
                <p className="text-3xl font-bold text-white">{aiMetrics.trades.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="flex items-center mt-3">
              <Activity className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 text-sm">{aiMetrics.uptime}% Uptime</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Platform Tabs */}
      <Tabs defaultValue="ai-features" className="space-y-6">
        <TabsList className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <TabsTrigger value="ai-features" className="data-[state=active]:bg-purple-500/20">
            <Brain className="h-4 w-4 mr-2" />
            AI Features
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-500/20">
            <PieChart className="h-4 w-4 mr-2" />
            Smart Portfolio
          </TabsTrigger>
          <TabsTrigger value="trading" className="data-[state=active]:bg-purple-500/20">
            <Zap className="h-4 w-4 mr-2" />
            Live Trading
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-purple-500/20">
            <Shield className="h-4 w-4 mr-2" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-features">
          <AdvancedAIFeatures />
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <PieChart className="h-5 w-5 mr-2 text-purple-400" />
                  AI-Optimized Portfolio
                </CardTitle>
                <CardDescription>Real-time AI analysis and optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map(stock => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">{stock.symbol}</p>
                          <p className="text-gray-400 text-sm">{stock.position} shares</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${stock.value.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                          >
                            {stock.change >= 0 ? '+' : ''}
                            {stock.change}%
                          </span>
                          <Badge variant="outline" className="text-xs">
                            AI: {stock.ai_score}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                  Performance Analytics
                </CardTitle>
                <CardDescription>AI-driven performance insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Total Portfolio Value</span>
                      <span className="text-white font-bold">$773,450</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">AI Optimization Score</span>
                      <span className="text-green-400 font-bold">92/100</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Risk Level</span>
                      <span className="text-yellow-400 font-bold">Moderate</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                      <p className="text-green-400 text-2xl font-bold">+24.7%</p>
                      <p className="text-gray-400 text-sm">YTD Return</p>
                    </div>
                    <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <p className="text-blue-400 text-2xl font-bold">0.89</p>
                      <p className="text-gray-400 text-sm">Sharpe Ratio</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trading">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Ultra-Fast Trading Engine
                </CardTitle>
                <CardDescription>Quantum-speed execution with AI optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg">
                      <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-400 text-2xl font-bold">5-15ms</p>
                      <p className="text-gray-400 text-sm">Execution Speed</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg">
                      <Gauge className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 text-2xl font-bold">99.97%</p>
                      <p className="text-gray-400 text-sm">Success Rate</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg">
                      <Cpu className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-purple-400 text-2xl font-bold">247M</p>
                      <p className="text-gray-400 text-sm">AI Parameters</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => runDemo('quantum-trading')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Cpu className="h-4 w-4 mr-2 animate-spin" />
                          Processing Quantum Trade...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Execute Quantum Trade Demo
                        </>
                      )}
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="border-green-500/30 text-green-400">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        AI Buy Signal
                      </Button>
                      <Button variant="outline" className="border-red-500/30 text-red-400">
                        <TrendingUp className="h-4 w-4 mr-2 rotate-180" />
                        AI Sell Signal
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="h-5 w-5 mr-2 text-green-400" />
                  Live Market Feed
                </CardTitle>
                <CardDescription>Real-time AI market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { symbol: 'SPY', price: 445.67, change: 1.23, signal: 'BUY' },
                    { symbol: 'QQQ', price: 378.45, change: -0.87, signal: 'HOLD' },
                    { symbol: 'IWM', price: 198.23, change: 2.14, signal: 'BUY' },
                    { symbol: 'VIX', price: 16.78, change: -3.45, signal: 'SELL' },
                  ].map(item => (
                    <div
                      key={item.symbol}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-semibold">{item.symbol}</p>
                        <p className="text-gray-400 text-sm">${item.price}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {item.change >= 0 ? '+' : ''}
                          {item.change}%
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.signal === 'BUY'
                              ? 'border-green-500/30 text-green-400'
                              : item.signal === 'SELL'
                                ? 'border-red-500/30 text-red-400'
                                : 'border-yellow-500/30 text-yellow-400'
                          }`}
                        >
                          {item.signal}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceCenter />
        </TabsContent>
      </Tabs>

      {/* Platform Status */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Platform Status: OPERATIONAL</h3>
                <p className="text-green-400">
                  All systems running optimally • 47,892 active traders
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-2xl">$2.8B</p>
              <p className="text-green-400 text-sm">Assets Under Management</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
