'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, 
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.js';
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  Clock, 
  Target, 
  Filter, 
  Settings"
  Play"
  RefreshCw"
  BarChart3"
  Zap"
  Eye"
  Star"
  AlertTriangle"
  CheckCircle"
  ArrowUpRight"
  ArrowDownRight, }
  Volume2, Percent } from 'lucide-react';

interface OptionsFlow {
  id: string, symbol: string, type: 'CALL' | 'PUT'"
    strike: number"
  expiry: string"
    volume: number, premium: number, sentiment: 'bullish' | 'bearish' | 'neutral', size: 'small' | 'medium' | 'large' | 'whale'"
    confidence: number"
  impliedMove: number"
    timeToExpiry: number, spotPrice: number, moneyness: 'ITM' | 'OTM' | 'ATM', flowType: 'buy_to_open' | 'sell_to_open' | 'buy_to_close' | 'sell_to_close'"
    timestamp: string
}

interface FlowFilter {
  minVolume: number"
    minPremium: number"
  maxDaysToExpiry: number"
    sentiment: string"
  size: string"
    type: string
}

export default function OptionsFlowScanner() { const [isScanning, setIsScanning] = useState(false); const [searchTerm, setSearchTerm] = useState(''); const [selectedFilter, setSelectedFilter] = useState('all');
  const [optionsFlow, setOptionsFlow] = useState<OptionsFlow[]>([]);
  const [flowFilter, setFlowFilter] = useState<FlowFilter>({
    minVolume: 100"
    minPremium: 1000, maxDaysToExpiry: 30, sentiment: 'all', size: 'all', type: 'all'
  });
 const generateOptionsFlow = (): OptionsFlow[] => {   const symbols = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'SPY', 'QQQ', 'AMZN', 'GOOGL'];
    const flow: OptionsFlow[] = symbols.map((symbol, index) => ({
      id: `flow_${index  }`; symbol, type: Math.random() > 0.5 ? 'CALL' : 'PUT', strike: Math.round((150 + Math.random() * 200) * 100) / 100, expiry: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]"
      volume: Math.round(100 + Math.random() * 5000), premium: Math.round((1000 + Math.random() * 50000) * 100) / 100, sentiment: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)] as 'bullish' | 'bearish' | 'neutral', size: ['small', 'medium', 'large', 'whale'][Math.floor(Math.random() * 4)] as 'small' | 'medium' | 'large' | 'whale'"
      confidence: Math.round(60 + Math.random() * 40)"
      impliedMove: Math.round((2 + Math.random() * 15) * 100) / 100;
      timeToExpiry: Math.round(1 + Math.random() * 30), spotPrice: Math.round((140 + Math.random() * 220) * 100) / 100, moneyness: ['ITM', 'OTM', 'ATM'][Math.floor(Math.random() * 3)] as 'ITM' | 'OTM' | 'ATM', flowType: ['buy_to_open', 'sell_to_open', 'buy_to_close', 'sell_to_close'][Math.floor(Math.random() * 4)] as 'buy_to_open' | 'sell_to_open' | 'buy_to_close' | 'sell_to_close'"
      timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString()
    }));

    // Add more realistic flows
    return [
      ...flow, { id: 'whale_1', symbol: 'TSLA', type: 'CALL', strike: 250.00, expiry: '2024-02-16'"
        volume: 2500, premium: 125000, sentiment: 'bullish', size: 'whale'"
        confidence: 92"
        impliedMove: 8.5;
        timeToExpiry: 27, spotPrice: 242.15, moneyness: 'OTM', flowType: 'buy_to_open'"
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() },{ id: 'whale_2', symbol: 'NVDA', type: 'PUT', strike: 480.00, expiry: '2024-01-26'"
        volume: 1800, premium: 98000, sentiment: 'bearish', size: 'whale'"
        confidence: 88"
        impliedMove: 6.2;
        timeToExpiry: 6, spotPrice: 489.33, moneyness: 'OTM', flowType: 'buy_to_open'"
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString()
      }
    ]"
  };

  useEffect(() => {
    setOptionsFlow(generateOptionsFlow());
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setOptionsFlow(generateOptionsFlow());
    }, 3500);
  };

  const getSentimentColor = (sentiment: string) => {   switch (sentiment) { case 'bullish': return 'text-green-400'; case 'bearish': return 'text-red-400'; default: return 'text-yellow-400'
      }
  };

  const getSizeColor = (size: string) => {   switch (size) { case 'whale': return 'text-purple-400 bg-purple-900/30'; case 'large': return 'text-blue-400 bg-blue-900/30'; case 'medium': return 'text-yellow-400 bg-yellow-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  };
 const getConfidenceColor = (confidence: number) => { if (confidence >= 85) return 'text-green-500'; if (confidence >= 70) return 'text-yellow-500'; return 'text-red-500';
  };

  const getFlowTypeColor = (flowType: string) => {   switch (flowType) { case 'buy_to_open': return 'text-green-400 bg-green-900/30'; case 'sell_to_open': return 'text-red-400 bg-red-900/30'; case 'buy_to_close': return 'text-blue-400 bg-blue-900/30'; default: return 'text-orange-400 bg-orange-900/30'
      }
  };

  const filteredFlow = optionsFlow.filter(flow => { const matchesSearch = flow.symbol.toLowerCase().includes(searchTerm.toLowerCase()); const matchesFilter = selectedFilter === 'all' || 
                         flow.sentiment === selectedFilter ||
                         flow.size === selectedFilter ||
                         flow.type.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter && 
           flow.volume >= flowFilter.minVolume &&
           flow.premium >= flowFilter.minPremium &&
           flow.timeToExpiry <= flowFilter.maxDaysToExpiry;
  });
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'"
      minimumFractionDigits: 0"
      maximumFractionDigits: 0
    }).format(amount)
  };

  const formatTime = (timestamp: string) => {  
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60)); if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes  }m ago`;
    return `${Math.floor(diffMinutes / 60)}h ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Activity className="w-16 h-16 text-indigo-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Options Flow Scanner
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Real-time options flow analysis to identify smart money movements and trading opportunities
          </p>
        </div>

        {/* Scanner Controls */}
        <Card className="mb-8 bg-white/10 border-indigo-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-indigo-400" />
              Flow Scanner Settings
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
                      placeholder="Search AAPL, TSLA, SPY..."
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Flow Filter
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                  >
                    <option value="all">All Flows</option>
                    <option value="call">Calls Only</option>
                    <option value="put">Puts Only</option>
                    <option value="bullish">Bullish Flows</option>
                    <option value="bearish">Bearish Flows</option>
                    <option value="whale">Whale Flows</option>
                    <option value="large">Large Flows</option>
                  </select>
                </div>
              </div>
              
              {/* Filter Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Min Volume
                  </label>
                  <Input
                    type="number"
                    value={flowFilter.minVolume}
                    onChange={(e) => setFlowFilter({
                      ...flowFilter"
                      minVolume: parseInt(e.target.value) || 0
                    })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Min Premium ($)
                  </label>
                  <Input
                    type="number"
                    value={flowFilter.minPremium}
                    onChange={(e) => setFlowFilter({
                      ...flowFilter;
                      minPremium: parseInt(e.target.value) || 0
                    })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="1000"
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-4">
                <Button
                  onClick={startScan}
                  disabled={isScanning}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Scan Flow
                    </>
                  )}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
              
                    className="border-white/20 text-gray-300 hover:bg-white/10"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Alerts
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
              
                    className="border-white/20 text-gray-300, hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Setup
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flow Summary */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredFlow.filter(f => f.sentiment === 'bullish').length}
              </h3>
              <p className="text-green-200">Bullish Flows</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-red-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingDown className="w-12 h-12 mx-auto mb-4 text-red-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredFlow.filter(f => f.sentiment === 'bearish').length}
              </h3>
              <p className="text-red-200">Bearish Flows</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredFlow.filter(f => f.size === 'whale').length}
              </h3>
              <p className="text-purple-200">Whale Flows</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2">
                {formatCurrency(filteredFlow.reduce((sum, f) => sum + f.premium, 0))}
              </h3>
              <p className="text-blue-200">Total Premium</p>
            </CardContent>
          </Card>
        </div>

        {/* Options Flow */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-400" />
              Live Options Flow ({filteredFlow.length} flows)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-spin" />
                  <p className="text-white text-xl">Scanning options flow...</p>
                  <p className="text-gray-400 mt-2">Analyzing unusual activity and smart money movements</p>
                </div>
              </div>
            ) : filteredFlow.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No flows found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or starting a new scan</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredFlow.map((flow) => (
                  <Card key={flow.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-7 gap-4 items-center">
                        {/* Symbol and Type */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">
                                {flow.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg">{flow.symbol}</h3> <div className="flex items-center gap-2"> {flow.type === 'CALL' ? (
                                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4 text-red-400" /> )} <span className={`text-sm font-semibold ${flow.type === 'CALL' ? 'text-green-400' : 'text-red-400'}`}>
                                  {flow.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Strike and Expiry */}
                        <div className="text-center">
                          <p className="text-white font-bold text-lg">${flow.strike}</p> <p className="text-gray-400 text-sm">{flow.expiry}</p> <Badge className={flow.moneyness === 'ITM' ? 'bg-green-900/30 text-green-400' :  flow.moneyness === 'ATM' ? 'bg-yellow-900/30 text-yellow-400' :  'bg-red-900/30 text-red-400'}>
                            {flow.moneyness}
                          </Badge>
                        </div>
                        
                        {/* Volume and Premium */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Volume2 className="w-4 h-4 text-blue-400" />
                            <span className="text-white font-semibold">{flow.volume.toLocaleString()}</span>
                          </div>
                          <p className="text-blue-400 font-bold">{formatCurrency(flow.premium)}</p>
                        </div>
                        
                        {/* Flow Type */}
                        <div className="text-center"> <Badge className={getFlowTypeColor(flow.flowType)}> {flow.flowType.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        {/* Size and Sentiment */}
                        <div className="text-center">
                          <Badge className={getSizeColor(flow.size)}>
                            {flow.size.toUpperCase()}
                          </Badge>
                          <p className={`text-sm font-semibold mt-1 ${getSentimentColor(flow.sentiment)}`}>
                            {flow.sentiment.toUpperCase()}
                          </p>
                        </div>
                        
                        {/* Confidence and Implied Move */}
                        <div className="text-center">
                          <p className={`text-lg font-bold ${getConfidenceColor(flow.confidence)}`}>
                            {flow.confidence}%
                          </p>
                          <p className="text-xs text-gray-400">Confidence</p>
                          <p className="text-white text-sm">±{flow.impliedMove}%</p>
                          <p className="text-xs text-gray-400">Implied Move</p>
                        </div>
                        
                        {/* Actions and Time */}
                        <div className="text-center">
                          <div className="flex justify-center gap-2 mb-2">
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
              
                              className="border-gray-500 text-gray-300"
                            >
                              <Star className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {formatTime(flow.timestamp)}
                            </span>
                          </div>
                        </div>
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
