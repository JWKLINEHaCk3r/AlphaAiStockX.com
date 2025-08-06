'use client';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Card } from '../components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardDescription"
      CardTitle }
    } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Database, 
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
  Globe, 
  TrendingUp, 
  BarChart3, 
  Wifi, 
  Activity, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Clock, 
  Server, 
  Network, 
  Gauge, 
  Eye, 
  Rss"
  Radio"
  Satellite, }
  Cloud, Shield } from 'lucide-react';

interface DataSource {
  id: string, name: string, type: 'market' | 'news' | 'social' | 'economic' | 'technical' | 'alternative', status: 'active' | 'inactive' | 'error' | 'maintenance'"
  latency: number"
    reliability: number"
  coverage: string"
    updateFrequency: string, dataPoints: number, cost: 'free' | 'premium' | 'enterprise'"
  description: string"
    features: string[]
}

interface DataMetrics {
  totalSources: number"
    activeSources: number"
  dataPointsPerSecond: number"
    averageLatency: number"
  totalCoverage: number
}
 export default function UltimateDataSources() { const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [metrics, setMetrics] = useState<DataMetrics>({
    totalSources: 0"
    activeSources: 0;
    dataPointsPerSecond: 0"
    averageLatency: 0;
    totalCoverage: 0
  });

  const dataSources: DataSource[] = [ { id: 'bloomberg-terminal', name: 'Bloomberg Terminal', type: 'market', status: 'active'"
      latency: 1.2, reliability: 99.9, coverage: 'Global', updateFrequency: 'Real-time', dataPoints: 2400000, cost: 'enterprise', description: 'Premium financial data terminal with comprehensive market coverage', features: [ 'Real-time market data', 'Historical price data', 'Company fundamentals', 'Economic indicators', 'News and analysis'
      ] },{ id: 'reuters-newswire', name: 'Reuters Newswire', type: 'news', status: 'active'"
      latency: 0.8, reliability: 99.7, coverage: 'Global', updateFrequency: 'Continuous', dataPoints: 150000, cost: 'premium', description: 'Real-time financial news and market-moving information', features: [ 'Breaking news alerts', 'Earnings announcements', 'Regulatory filings', 'Market analysis', 'Economic data releases'
      ] },{ id: 'twitter-firehose', name: 'Twitter Financial Feed', type: 'social', status: 'active'"
      latency: 2.1, reliability: 98.5, coverage: 'Global', updateFrequency: 'Real-time', dataPoints: 500000, cost: 'premium', description: 'Social sentiment analysis from financial Twitter discussions', features: [ 'Sentiment analysis', 'Trending topics', 'Influencer tracking', 'Volume analysis', 'Keyword monitoring'
      ] },{ id: 'fred-economic', name: 'FRED Economic Data', type: 'economic', status: 'active'"
      latency: 15.3, reliability: 99.8, coverage: 'US + International', updateFrequency: 'Daily/Weekly', dataPoints: 765000, cost: 'free', description: 'Federal Reserve Economic Data with comprehensive macroeconomic indicators', features: [ 'GDP data', 'Inflation metrics', 'Employment statistics', 'Interest rate data', 'International trade'
      ] },{ id: 'quandl-alternative', name: 'Quandl Alternative Data', type: 'alternative', status: 'active'"
      latency: 5.7, reliability: 97.2, coverage: 'Global', updateFrequency: 'Varies', dataPoints: 320000, cost: 'premium', description: 'Alternative datasets including satellite imagery credit card spending, etc.'"
      features: [ 'Satellite data', 'Credit card spending', 'Social media metrics', 'Web scraping data', 'ESG metrics'
      ] },{ id: 'alpha-architect', name: 'Alpha Architect Factors', type: 'technical', status: 'active'"
      latency: 3.4, reliability: 98.9, coverage: 'US Markets', updateFrequency: 'Daily', dataPoints: 180000, cost: 'premium', description: 'Quantitative factor models and risk analytics', features: [ 'Factor exposures', 'Risk analytics', 'Performance attribution', 'Style analysis', 'Portfolio optimization'
      ] },{ id: 'coinbase-crypto', name: 'Coinbase Pro API', type: 'market', status: 'maintenance'"
      latency: 12.8, reliability: 96.3, coverage: 'Cryptocurrency', updateFrequency: 'Real-time', dataPoints: 95000, cost: 'free', description: 'Cryptocurrency market data and trading information', features: [ 'Real-time prices', 'Order book data', 'Trade history', 'Volume metrics', 'Market depth'
      ] },{ id: 'refinitiv-eikon', name: 'Refinitiv Eikon', type: 'market', status: 'active'"
      latency: 1.8, reliability: 99.6, coverage: 'Global', updateFrequency: 'Real-time', dataPoints: 1800000, cost: 'enterprise', description: 'Comprehensive financial market data and analytics platform', features: [ 'Market data', 'Company research', 'Risk management', 'Trading tools', 'News and analysis'
      ]
    }
  ];

  // Calculate metrics useEffect(() => { const activeSources = dataSources.filter(source => source.status === 'active');
    const totalDataPoints = dataSources.reduce((sum, source) => sum + source.dataPoints, 0);
    const avgLatency = dataSources.reduce((sum, source) => sum + source.latency, 0) / dataSources.length;
    
    setMetrics({
      totalSources: dataSources.length"
      activeSources: activeSources.length;
      dataPointsPerSecond: Math.floor(totalDataPoints / 86400), // Convert daily to per second
      averageLatency: avgLatency"
      totalCoverage: dataSources.length * 12.5 // Approximate coverage;
      percentage
    });
  }, []);

  const getStatusColor = (status: string) => {   switch (status) { case 'active': return 'text-green-600 bg-green-100'; case 'inactive': return 'text-gray-600 bg-gray-100'; case 'error': return 'text-red-600 bg-red-100'; case 'maintenance': return 'text-yellow-600 bg-yellow-100'; default: return 'text-gray-600 bg-gray-100'
      }
  };

  const getCostColor = (cost: string) => {   switch (cost) { case 'free': return 'text-green-600 bg-green-100'; case 'premium': return 'text-blue-600 bg-blue-100'; case 'enterprise': return 'text-purple-600 bg-purple-100'; default: return 'text-gray-600 bg-gray-100'
      }
  };

  const getTypeIcon = (type: string) => {   switch (type) { case 'market': return <BarChart3 className="w-5 h-5" />; case 'news': return <Rss className="w-5 h-5" />; case 'social': return <Radio className="w-5 h-5" />; case 'economic': return <TrendingUp className="w-5 h-5" />; case 'technical': return <Activity className="w-5 h-5" />; case 'alternative': return <Satellite className="w-5 h-5" />;
      default: return <Database className="w-5 h-5" />
      }
  }; const filteredSources = selectedCategory === 'all' 
    ? dataSources 
    : dataSources.filter(source => source.type === selectedCategory)"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Database className="w-16 h-16 text-cyan-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Ultimate Data Sources
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Access comprehensive financial data from premium sources for superior trading insights
          </p>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-2">{metrics.totalSources}</h3>
              <p className="text-green-200">Total Sources</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Wifi className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2">{metrics.activeSources}</h3>
              <p className="text-blue-200">Active Sources</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2">{metrics.dataPointsPerSecond.toLocaleString()}</h3>
              <p className="text-purple-200">Data Points/Sec</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2">{metrics.averageLatency.toFixed(1)}ms</h3>
              <p className="text-yellow-200">Avg Latency</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */} <div className="flex flex-wrap justify-center gap-2 mb-8"> {['all', 'market', 'news', 'social', 'economic', 'technical', 'alternative'].map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${ selectedCategory === category ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-white/10, hover:bg-white/20 text-gray-300'
              } transition-colors`} > {category === 'all' ? (
                <Globe className="w-4 h-4 mr-2" />
              ) : (
                getTypeIcon(category)
              )},{category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Data Sources Grid */}
        <div className="grid lg: grid-cols-2"
      xl:grid-cols-3 gap-6 mb-12">
          {filteredSources.map((source) => (
            <Card 
              key={source.id}
              className="bg-white/10 backdrop-blur border-white/20 hover:border-cyan-500/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      {getTypeIcon(source.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{source.name}</CardTitle>
                      <p className="text-gray-300 text-sm capitalize">{source.type} Data</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(source.status)}>
                    {source.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-gray-300 mb-4">
                  {source.description}
                </CardDescription>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Latency</p>
                    <p className="text-white font-semibold">{source.latency}ms</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Reliability</p>
                    <p className="text-green-400 font-semibold">{source.reliability}%</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Coverage</p>
                    <p className="text-blue-400 font-semibold text-xs">{source.coverage}</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded text-center">
                    <p className="text-gray-400 text-xs">Update Freq</p>
                    <p className="text-purple-400 font-semibold text-xs">{source.updateFrequency}</p>
                  </div>
                </div>
                
                {/* Data Points and Cost */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-xs">Data Points</p>
                    <p className="text-white font-semibold">{source.dataPoints.toLocaleString()}</p>
                  </div>
                  <Badge className={getCostColor(source.cost)}>
                    {source.cost.toUpperCase()}
                  </Badge>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-2">Key Features</h4>
                  <div className="space-y-1">
                    {source.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-300">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))},{source.features.length > 3 && (
                      <p className="text-xs text-gray-400">+{source.features.length - 3} more...</p>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" "
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button> {source.status === 'active' ? (
                    <Button 
                      size="sm" ;
                      variant="outline" "
                      className="border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      size="sm" "
                      variant="outline" "
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Overview */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Data Flow Monitoring */}
          <Card className="bg-white/10 border-cyan-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-cyan-400" />
                Real-time Data Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Market Data Streams</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-semibold">Live</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">News Feeds</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-semibold">Live</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Social Sentiment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-semibold">Live</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Economic Data</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-yellow-400 font-semibold">Scheduled</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">System Performance</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Throughput</span>
                      <span className="text-blue-400">847 MB/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Latency</span>
                      <span className="text-green-400">{metrics.averageLatency.toFixed(1)}ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-purple-400">99.97%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Status */}
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Server className="w-6 h-6 text-purple-400" />
                Infrastructure Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Cloud className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">Cloud Infrastructure</span>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Optimal</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">CPU Usage</p>
                      <p className="text-blue-400 font-semibold">67%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Memory</p>
                      <p className="text-green-400 font-semibold">54%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Network className="w-6 h-6 text-cyan-400" />
                    <span className="text-white font-medium">Network Performance</span>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Excellent</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Bandwidth</p>
                      <p className="text-cyan-400 font-semibold">10 Gbps</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Packet Loss</p>
                      <p className="text-green-400 font-semibold">0.01%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-green-400" />
                    <span className="text-white font-medium">Security & Compliance</span>
                    <Badge className="bg-green-100 text-green-800 ml-auto">Secure</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-green-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>256-bit encryption</span>
                    </div>
                    <div className="flex items-center text-green-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>SOC 2 Type II compliant</span>
                    </div>
                    <div className="flex items-center text-green-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>24/7 monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  );
}
