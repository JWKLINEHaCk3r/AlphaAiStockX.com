'use client';

import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, 
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.js';
  TrendingDown, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  AlertTriangle"
  Target"
  CheckCircle"
  Clock"
  Zap, }
  Brain, LineChart } from 'lucide-react';

interface EarningsData {
  symbol: string"
    companyName: string"
  reportDate: string"
    estimatedEPS: number"
  predictedEPS: number"
    confidence: number"
  priceTarget: number"
    currentPrice: number, expectedMove: number, sentiment: 'bullish' | 'bearish' | 'neutral', risk: 'low' | 'medium' | 'high'
}

interface AIStockPrediction { symbol: string, prediction: 'buy' | 'sell' | 'hold'"
  confidence: number"
    targetPrice: number"
  timeframe: string"
    factors: string[]
}
export default function EarningsPredictor() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');
  const [predictions, setPredictions] = useState<AIStockPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const upcomingEarnings: EarningsData[] = [
    {
      symbol: 'AAPL'"
      companyName: 'Apple Inc.'"
      reportDate: '2024-01-25'"
      estimatedEPS: 2.18"
      predictedEPS: 2.23"
      confidence: 87"
      priceTarget: 195.50"
      currentPrice: 188.30"
      expectedMove: 4.2"
      sentiment: 'bullish'"
      risk: 'low'
    }"
    {
      symbol: 'MSFT'"
      companyName: 'Microsoft Corporation'"
      reportDate: '2024-01-24'"
      estimatedEPS: 2.78"
      predictedEPS: 2.85"
      confidence: 91"
      priceTarget: 385.00"
      currentPrice: 376.20"
      expectedMove: 3.8"
      sentiment: 'bullish'"
      risk: 'low'
    }"
    {
      symbol: 'GOOGL'"
      companyName: 'Alphabet Inc.'"
      reportDate: '2024-01-30'"
      estimatedEPS: 1.65"
      predictedEPS: 1.72"
      confidence: 83"
      priceTarget: 155.00"
      currentPrice: 142.80"
      expectedMove: 5.1"
      sentiment: 'bullish'"
      risk: 'medium'
    }"
    {
      symbol: 'TSLA'"
      companyName: 'Tesla Inc.'"
      reportDate: '2024-01-24'"
      estimatedEPS: 0.74"
      predictedEPS: 0.68"
      confidence: 76"
      priceTarget: 220.00"
      currentPrice: 238.50"
      expectedMove: 8.3"
      sentiment: 'bearish'"
      risk: 'high'
    }"
    {
      symbol: 'NVDA'"
      companyName: 'NVIDIA Corporation'"
      reportDate: '2024-02-21'"
      estimatedEPS: 4.12"
      predictedEPS: 4.28"
      confidence: 89"
      priceTarget: 920.00"
      currentPrice: 875.40"
      expectedMove: 6.7"
      sentiment: 'bullish'"
      risk: 'medium'
    }
  ];

  const generatePredictions = (symbol: string) => {  
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const earningsData = upcomingEarnings.find(e => e.symbol === symbol);
      if (earningsData) {
        const newPredictions: AIStockPrediction[] = [
          { symbol: symbol, prediction: earningsData.sentiment === 'bullish' ? 'buy' : earningsData.sentiment === 'bearish' ? 'sell' : 'hold'"
            confidence: earningsData.confidence, targetPrice: earningsData.priceTarget, timeframe: '1-2 weeks post-earnings', factors: [ 'Historical earnings accuracy', 'Revenue growth trends', 'Market sentiment analysis', 'Technical indicators', 'Institutional activity'
            ]
            }
        ];
        setPredictions(newPredictions);
      }
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    generatePredictions(selectedSymbol);
  }, [selectedSymbol]);

  const getSentimentColor = (sentiment: string) => {  
    switch (sentiment) {
      case 'bullish':
        return 'text-green-600 bg-green-100';
      case 'bearish':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
      }
  };

  const getRiskColor = (risk: string) => {  
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
      }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short'"
      day: 'numeric'"
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">
              AI Earnings Predictor
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered earnings predictions with real-time analysis and sentiment tracking
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Target className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-700">87.3%</h3>
              <p className="text-green-600">Prediction Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-700">247</h3>
              <p className="text-blue-600">Companies Tracked</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <Zap className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-700">Real-time</h3>
              <p className="text-purple-600">Data Processing</p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <LineChart className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-orange-700">+23.4%</h3>
              <p className="text-orange-600">Avg. Return</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Earnings */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="w-7 h-7 text-blue-600" />
              Upcoming Earnings Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {upcomingEarnings.map((earnings) => (
                <Card 
                  key={earnings.symbol} className={`cursor-pointer transition-all duration-200 hover:shadow-md ${ selectedSymbol === earnings.symbol ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedSymbol(earnings.symbol)}
                >
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-bold text-lg text-gray-800">{earnings.symbol}</h3>
                        <p className="text-sm text-gray-600">{earnings.companyName}</p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(earnings.reportDate)}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Estimated EPS</p>
                        <p className="font-semibold text-gray-800">${earnings.estimatedEPS}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-500">AI Predicted</p>
                        <p className="font-semibold text-blue-600">${earnings.predictedEPS}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Confidence</p>
                        <div className="flex items-center justify-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{width: `${earnings.confidence}%`}}
                            />
                          </div>
                          <span className="text-sm font-semibold">{earnings.confidence}%</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={getSentimentColor(earnings.sentiment)}>
                          {earnings.sentiment.toUpperCase()}
                        </Badge>
                        <Badge className={`${getRiskColor(earnings.risk)} ml-2`}>
                          {earnings.risk.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Prediction Details */},{selectedSymbol && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Selected Company Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  {selectedSymbol} Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {  
                  const selectedEarnings = upcomingEarnings.find(e => e.symbol === selectedSymbol);
                  if (!selectedEarnings) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Price</p>
                          <p className="text-xl font-bold text-gray-800">
                            ${selectedEarnings.currentPrice  }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price Target</p>
                          <p className="text-xl font-bold text-blue-600">
                            ${selectedEarnings.priceTarget}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Expected Move</p>
                          <p className="text-lg font-semibold text-purple-600">
                            ±{selectedEarnings.expectedMove}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Upside Potential</p>
                          <p className="text-lg font-semibold text-green-600">
                            {(((selectedEarnings.priceTarget - selectedEarnings.currentPrice) / selectedEarnings.currentPrice) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold text-gray-800 mb-3">EPS Comparison</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Analyst Estimate:</span>
                            <span className="font-semibold">${selectedEarnings.estimatedEPS}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">AI Prediction:</span>
                            <span className="font-semibold text-blue-600">${selectedEarnings.predictedEPS}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Difference:</span>
                            <span className={`font-semibold ${ selectedEarnings.predictedEPS > selectedEarnings.estimatedEPS  ? 'text-green-600'  : 'text-red-600' }`}> {selectedEarnings.predictedEPS > selectedEarnings.estimatedEPS ? '+' : ''}
                              ${(selectedEarnings.predictedEPS - selectedEarnings.estimatedEPS).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* AI Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Analyzing data...</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge  className={ prediction.prediction === 'buy'  ? 'bg-green-100 text-green-800'  : prediction.prediction === 'sell' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {prediction.prediction.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Confidence: {prediction.confidence}%
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Target Price</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${prediction.targetPrice}
                          </p>
                          <p className="text-sm text-gray-500">{prediction.timeframe}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Factors</h4>
                          <ul className="space-y-1">
                            {prediction.factors.map((factor, factorIndex) => (
                              <li key={factorIndex} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => generatePredictions(selectedSymbol)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Refresh Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )},{/* Risk Warning */}
        <Alert className="mt-8 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <div className="ml-2">
            <h4 className="font-semibold text-yellow-800">Investment Risk Disclosure</h4>
            <p className="text-yellow-700 text-sm mt-1">
              AI predictions are based on historical data and market analysis. Past performance does not guarantee future results. 
              Always conduct your own research and consider consulting with a financial advisor before making investment decisions.
            </p>
          </div>
        </Alert>
        
      </div>
    </div>
  );
}
