'use client';

import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Card } from '../components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, 
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card.js';
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Zap, 
  Eye, 
  Filter, 
  Settings"
  Play"
  Pause"
  RefreshCw"
  CheckCircle"
  AlertTriangle"
  Star"
  Clock"
  DollarSign, }
  Percent, Activity } from 'lucide-react';

interface PatternMatch {
  id: string"
    symbol: string"
  pattern: string"
    confidence: number, timeframe: string, direction: 'bullish' | 'bearish' | 'neutral'"
  probability: number"
    targetPrice: number"
  currentPrice: number"
    volume: number"
  lastUpdated: string
}

interface ScannerConfig {
  patterns: string[]"
    timeframes: string[]"
  minConfidence: number"
    minVolume: number"
  markets: string[]
}

export default function AdvancedPatternScanner() { const [isScanning, setIsScanning] = useState(false); const [searchTerm, setSearchTerm] = useState(''); const [selectedPattern, setSelectedPattern] = useState('all');
  const [patternMatches, setPatternMatches] = useState<PatternMatch[]>([]); const [scannerConfig, setScannerConfig] = useState<ScannerConfig>({ patterns: ['all'], timeframes: ['1h', '4h', '1d']"
    minConfidence: 75, minVolume: 100000, markets: ['stocks', 'crypto', 'forex']
  });
 const patterns = [ 'Head and Shoulders', 'Double Top', 'Double Bottom', 'Triangle', 'Flag', 'Pennant', 'Cup and Handle', 'Inverse Head and Shoulders', 'Wedge', 'Rectangle', 'Channel', 'Support/Resistance Break'
  ];

  const sampleMatches: PatternMatch[] = [ { id: '1', symbol: 'AAPL', pattern: 'Cup and Handle', confidence: 87.3, timeframe: '4h', direction: 'bullish'"
      probability: 78.4"
      targetPrice: 195.50;
      currentPrice: 188.30, volume: 2847000, lastUpdated: '2024-01-20"
      14:32:00' },{ id: '2', symbol: 'TSLA', pattern: 'Double Bottom', confidence: 92.1, timeframe: '1d', direction: 'bullish'"
      probability: 83.7"
      targetPrice: 265.80;
      currentPrice: 242.15, volume: 1924000, lastUpdated: '2024-01-20"
      14:28:00' },{ id: '3', symbol: 'NVDA', pattern: 'Triangle', confidence: 79.6, timeframe: '1h', direction: 'neutral'"
      probability: 65.2"
      targetPrice: 920.00;
      currentPrice: 875.40, volume: 3156000, lastUpdated: '2024-01-20"
      14:35:00' },{ id: '4', symbol: 'MSFT', pattern: 'Head and Shoulders', confidence: 84.9, timeframe: '4h', direction: 'bearish'"
      probability: 71.8"
      targetPrice: 350.20;
      currentPrice: 376.80, volume: 1567000, lastUpdated: '2024-01-20"
      14:30:00' },{ id: '5', symbol: 'GOOGL', pattern: 'Flag', confidence: 88.7, timeframe: '1d', direction: 'bullish'"
      probability: 76.3"
      targetPrice: 155.40;
      currentPrice: 142.90, volume: 1834000, lastUpdated: '2024-01-20"
      14:33:00'
    }
  ];

  useEffect(() => {
    setPatternMatches(sampleMatches);
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Update with new matches
      setPatternMatches([...sampleMatches]);
    }, 3000);
  };

  const getDirectionColor = (direction: string) => {   switch (direction) { case 'bullish': return 'text-green-600 bg-green-100'; case 'bearish': return 'text-red-600 bg-red-100'; default: return 'text-yellow-600 bg-yellow-100'
      }
  };
 const getConfidenceColor = (confidence: number) => { if (confidence >= 85) return 'text-green-600'; if (confidence >= 70) return 'text-yellow-600'; return 'text-red-600';
  };

  const filteredMatches = patternMatches.filter(match => {
    const matchesSearch = match.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || match.pattern.toLowerCase().includes(searchTerm.toLowerCase()); const matchesPattern = selectedPattern === 'all' || match.pattern === selectedPattern;
    return matchesSearch && matchesPattern;
  });
 const formatCurrency = (amount: number) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'"
      minimumFractionDigits: 2
    }).format(amount)"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Search className="w-16 h-16 text-cyan-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Advanced Pattern Scanner
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            AI-powered pattern recognition for identifying profitable trading opportunities
          </p>
        </div>

        {/* Scanner Controls */}
        <Card className="mb-8 bg-white/10 border-cyan-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-cyan-400" />
              Scanner Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Search and Filters */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Search Symbols or Patterns
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search AAPL, TSLA
               or Head and Shoulders..."
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Pattern Filter
                  </label>
                  <select
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                  >
                    <option value="all">All Patterns</option>
                    {patterns.map((pattern) => (
                      <option key={pattern} value={pattern}>{pattern}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Scanner Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Min Confidence
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={scannerConfig.minConfidence}
                      onChange={(e) => setScannerConfig({
                        ...scannerConfig"
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
                    value={scannerConfig.minVolume}
                    onChange={(e) => setScannerConfig({
                      ...scannerConfig;
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
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Scan
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

        {/* Scan Results */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-2">{filteredMatches.length}</h3>
              <p className="text-green-200">Patterns Found</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredMatches.filter(m => m.direction === 'bullish').length}
              </h3>
              <p className="text-blue-200">Bullish Signals</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-red-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingDown className="w-12 h-12 mx-auto mb-4 text-red-400" /> <h3 className="text-3xl font-bold mb-2"> {filteredMatches.filter(m => m.direction === 'bearish').length}
              </h3>
              <p className="text-red-200">Bearish Signals</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2">
                {filteredMatches.length > 0  ? (filteredMatches.reduce((sum, m) => sum + m.confidence, 0) / filteredMatches.length).toFixed(1) : '0'}%
              </h3>
              <p className="text-purple-200">Avg Confidence</p>
            </CardContent>
          </Card>
        </div>

        {/* Pattern Matches */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-cyan-400" />
              Pattern Matches ({filteredMatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
                  <p className="text-white text-xl">Scanning markets for patterns...</p>
                  <p className="text-gray-400 mt-2">Analyzing price action and volume data</p>
                </div>
              </div>
            ) : filteredMatches.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No patterns found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or starting a new scan</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMatches.map((match) => (
                  <Card key={match.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-6 gap-4 items-center">
                        {/* Symbol and Pattern */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">
                                {match.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg">{match.symbol}</h3>
                              <p className="text-gray-300 text-sm">{match.pattern}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Direction and Confidence */}
                        <div className="text-center">
                          <Badge className={getDirectionColor(match.direction)}>
                            {match.direction.toUpperCase()}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">Direction</p>
                        </div>
                        
                        <div className="text-center">
                          <p className={`text-xl font-bold ${getConfidenceColor(match.confidence)}`}>
                            {match.confidence}%
                          </p>
                          <p className="text-xs text-gray-400">Confidence</p>
                        </div>
                        
                        {/* Prices */}
                        <div className="text-center">
                          <p className="text-white font-semibold">
                            {formatCurrency(match.currentPrice)}
                          </p>
                          <p className="text-cyan-400 text-sm">
                            Target: {formatCurrency(match.targetPrice)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {((match.targetPrice - match.currentPrice) / match.currentPrice * 100).toFixed(1)}%
                          </p>
                        </div>
                        
                        {/* Volume and Timeframe */}
                        <div className="text-center">
                          <p className="text-white font-semibold">{formatVolume(match.volume)}</p>
                          <p className="text-gray-400 text-sm">{match.timeframe}</p>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {new Date(match.lastUpdated).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-cyan-600 hover:bg-cyan-700 flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
              
                            className="border-gray-500 text-gray-300, hover:bg-gray-500/10"
                          >
                            <Star className="w-4 h-4" />
                          </Button>
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
  )"
}
