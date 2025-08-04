import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
'use client';
import { Card } from "../../../components/ui/card";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent,
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Search, 
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Star, 
  AlertCircle, 
  Zap, 
  Eye, 
  Filter, 
  Settings,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  BarChart3,
  LineChart,
  DollarSign,
  Percent, }
  Clock, Target } from 'lucide-react';

interface Stock {
  symbol: string,
    price: number,
  change: number,
    changePercent: number,
  volume: number, aiConfidence: number, aiRecommendation: 'BUY' | 'SELL' | 'HOLD',
    aiScore: number, patterns: string[], sentiment: 'bullish' | 'bearish' | 'neutral', riskLevel: 'low' | 'medium' | 'high',
    targetPrice: number,
  stopLoss: number,
    timeframe: string,
  lastUpdated: string
}

interface ScannerSettings {
  minConfidence: number,
    maxRisk: string,
  minVolume: number,
    sectors: string[],
  priceRange: [number, number];
  marketCap: string
}

export default function AIStockScanner() { const [isScanning, setIsScanning] = useState(false); const [searchTerm, setSearchTerm] = useState(''); const [selectedFilter, setSelectedFilter] = useState('all');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [scannerSettings, setScannerSettings] = useState<ScannerSettings>({ minConfidence: 70, maxRisk: 'medium', minVolume: 100000, sectors: ['technology', 'healthcare', 'finance'], priceRange: [10, 1000], marketCap: 'all'
  });

  const mockStocks: Stock[] = [ { symbol: 'AAPL',
      price: 178.42,
      change: 2.35;
      changePercent: 1.33,
      volume: 52847000, aiConfidence: 87, aiRecommendation: 'BUY', aiScore: 9.2, patterns: ['Cup and Handle', 'Breakout'], sentiment: 'bullish', riskLevel: 'low',
      targetPrice: 195.50, stopLoss: 165.20, timeframe: '1-3 months', lastUpdated: '2024-01-20, 14:32:00'
    },{ symbol: 'NVDA',
      price: 489.33,
      change: -5.67;
      changePercent: -1.15,
      volume: 41234000, aiConfidence: 94, aiRecommendation: 'BUY', aiScore: 9.8, patterns: ['Bull Flag', 'Support Hold'], sentiment: 'bullish', riskLevel: 'medium',
      targetPrice: 550.00, stopLoss: 445.00, timeframe: '2-4 weeks', lastUpdated: '2024-01-20, 14:35:00'
    },{ symbol: 'TSLA',
      price: 245.67,
      change: 8.45;
      changePercent: 3.56,
      volume: 78523000, aiConfidence: 79, aiRecommendation: 'HOLD', aiScore: 7.4, patterns: ['Triangle', 'Consolidation'], sentiment: 'neutral', riskLevel: 'high',
      targetPrice: 275.00, stopLoss: 220.00, timeframe: '3-6 weeks', lastUpdated: '2024-01-20, 14:28:00'
    },{ symbol: 'MSFT',
      price: 376.80,
      change: -2.15;
      changePercent: -0.57,
      volume: 24156000, aiConfidence: 82, aiRecommendation: 'BUY', aiScore: 8.6, patterns: ['Double Bottom', 'Recovery'], sentiment: 'bullish', riskLevel: 'low',
      targetPrice: 410.00, stopLoss: 350.00, timeframe: '1-2 months', lastUpdated: '2024-01-20, 14:30:00'
    },{ symbol: 'GOOGL',
      price: 142.90,
      change: 1.85;
      changePercent: 1.31,
      volume: 31789000, aiConfidence: 75, aiRecommendation: 'HOLD', aiScore: 7.8, patterns: ['Ascending Triangle', 'Volume Increase'], sentiment: 'bullish', riskLevel: 'medium',
      targetPrice: 160.00, stopLoss: 130.00, timeframe: '4-8 weeks', lastUpdated: '2024-01-20, 14:33:00'
    },{ symbol: 'META',
      price: 484.52,
      change: -8.23;
      changePercent: -1.67,
      volume: 19845000, aiConfidence: 68, aiRecommendation: 'SELL', aiScore: 6.2, patterns: ['Head and Shoulders', 'Resistance'], sentiment: 'bearish', riskLevel: 'high',
      targetPrice: 420.00, stopLoss: 510.00, timeframe: '2-3 weeks', lastUpdated: '2024-01-20, 14:25:00'
    }
  ];

  useEffect(() => {
    setStocks(mockStocks);
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    // Simulate AI scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Shuffle and update stocks with new AI predictions
      const shuffledStocks = [...mockStocks].sort(() => Math.random() - 0.5);
      setStocks(shuffledStocks);
    }, 4000);
  };

  const getRecommendationColor = (recommendation: string) => {  
    switch (recommendation) { case 'BUY': return 'text-green-600 bg-green-100'; case 'SELL': return 'text-red-600 bg-red-100'; default: return 'text-yellow-600 bg-yellow-100'
      }
  };

  const getSentimentColor = (sentiment: string) => {   switch (sentiment) { case 'bullish': return 'text-green-400'; case 'bearish': return 'text-red-400'; default: return 'text-yellow-400'
      }
  };

  const getRiskColor = (risk: string) => {   switch (risk) { case 'low': return 'text-green-500'; case 'medium': return 'text-yellow-500'; default: return 'text-red-500'
      }
  };
 const getConfidenceColor = (confidence: number) => { if (confidence >= 85) return 'text-green-500'; if (confidence >= 70) return 'text-yellow-500'; return 'text-red-500';
  };

  const filteredStocks = stocks.filter(stock => { const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()); const matchesFilter = selectedFilter === 'all' || 
                         stock.aiRecommendation.toLowerCase() === selectedFilter ||
                         stock.sentiment === selectedFilter ||
                         stock.riskLevel === selectedFilter;
    return matchesSearch && matchesFilter;
  });
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount),
  };

  const formatVolume = (volume: number) => {  
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)  }M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)}K`;
    }
    return volume.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-16 h-16 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              AI Stock Scanner
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Advanced AI algorithms analyze market data to identify high-probability trading opportunities
          </p>
        </div>

        {/* Scanner Controls */}
        <Card className="mb-8 bg-white/10 border-purple-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-400" />
              AI Scanner Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Search and Filters */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Search Symbols
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search AAPL, NVDA, TSLA..."
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Filter Results
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                  >
                    <option value="all">All Stocks</option>
                    <option value="buy">Buy Recommendations</option>
                    <option value="sell">Sell Recommendations</option>
                    <option value="hold">Hold Recommendations</option>
                    <option value="bullish">Bullish Sentiment</option>
                    <option value="bearish">Bearish Sentiment</option>
                    <option value="low">Low Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>
              </div>
              
              {/* Scanner Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Min AI Confidence
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={scannerSettings.minConfidence}
                      onChange={(e) => setScannerSettings({
                        ...scannerSettings,
                        minConfidence: parseInt(e.target.value) || 0
                      })}
                      className="bg-white/10 border-white/20 text-white"
                      min="0"
              
                      max="100"
                    />
                    <Percent className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Min Volume
                  </label>
                  <Input
                    type="number"
                    value={scannerSettings.minVolume}
                    onChange={(e) => setScannerSettings({
                      ...scannerSettings;
                      minVolume: parseInt(e.target.value) || 0
                    })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="100000"
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-4">
                <Button
                  onClick={startScan}
                  disabled={isScanning}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      AI Scanning...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start AI Scan
                    </>
                  )}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
              
                    className="border-white/20 text-gray-300 hover: bg-white/10"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
              
                    className="border-white/20 text-gray-300, hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan Results Summary */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredStocks.filter(s => s.aiRecommendation === 'BUY').length}
              </h3>
              <p className="text-green-200">Buy Signals</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-red-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingDown className="w-12 h-12 mx-auto mb-4 text-red-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredStocks.filter(s => s.aiRecommendation === 'SELL').length}
              </h3>
              <p className="text-red-200">Sell Signals</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2">
                {filteredStocks.length > 0  ? (filteredStocks.reduce((sum, s) => sum + s.aiConfidence, 0) / filteredStocks.length).toFixed(1) : '0'}%
              </h3>
              <p className="text-blue-200">Avg Confidence</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2">
                {filteredStocks.length > 0  ? (filteredStocks.reduce((sum, s) => sum + s.aiScore, 0) / filteredStocks.length).toFixed(1) : '0'}
              </h3>
              <p className="text-purple-200">Avg AI Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Stock Results */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              AI Stock Analysis ({filteredStocks.length} stocks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                  <p className="text-white text-xl">AI analyzing market data...</p>
                  <p className="text-gray-400 mt-2">Processing patterns, sentiment
               and risk factors</p>
                </div>
              </div>
            ) : filteredStocks.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No stocks found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or starting a new scan</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredStocks.map((stock) => (
                  <Card key={stock.symbol} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-6 gap-4 items-center">
                        {/* Symbol and Price */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {stock.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-xl">{stock.symbol}</h3> <p className="text-white font-semibold">{formatCurrency(stock.price)}</p> <p className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}> {stock.change >= 0 ? '+' : ''},{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* AI Recommendation */}
                        <div className="text-center">
                          <Badge className={getRecommendationColor(stock.aiRecommendation)}>
                            {stock.aiRecommendation}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">AI Recommendation</p>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-white text-sm font-semibold">{stock.aiScore}/10</span>
                          </div>
                        </div>
                        
                        {/* Confidence and Risk */}
                        <div className="text-center">
                          <p className={`text-xl font-bold ${getConfidenceColor(stock.aiConfidence)}`}>
                            {stock.aiConfidence}%
                          </p>
                          <p className="text-xs text-gray-400">Confidence</p>
                          <p className={`text-sm font-semibold mt-1 ${getRiskColor(stock.riskLevel)}`}>
                            {stock.riskLevel.toUpperCase()} RISK
                          </p>
                        </div>
                        
                        {/* Targets */}
                        <div className="text-center">
                          <p className="text-green-400 font-semibold">
                            {formatCurrency(stock.targetPrice)}
                          </p>
                          <p className="text-xs text-gray-400">Target</p>
                          <p className="text-red-400 text-sm">
                            Stop: {formatCurrency(stock.stopLoss)}
                          </p>
                          <p className="text-xs text-gray-400">{stock.timeframe}</p>
                        </div>
                        
                        {/* Sentiment and Volume */}
                        <div className="text-center">
                          <p className={`font-semibold ${getSentimentColor(stock.sentiment)}`}>
                            {stock.sentiment.toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-400">Sentiment</p>
                          <p className="text-white text-sm font-semibold">{formatVolume(stock.volume)}</p>
                          <p className="text-xs text-gray-400">Volume</p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            className="bg-purple-600 hover: bg-purple-700"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Analyze
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
              
                            className="border-gray-500 text-gray-300, hover:bg-gray-500/10"
                          >
                            <Star className="w-4 h-4 mr-1" />
                            Watch
                          </Button>
                        </div>
                      </div>
                      
                      {/* Patterns */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stock.patterns.map((pattern, index) => (
                          <Badge key={index} variant="outline" className="text-purple-300 border-purple-300/50">
                            {pattern}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
