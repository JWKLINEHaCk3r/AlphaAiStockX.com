import { Alert } from "@/components/ui/alert";
'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
<<<<<<< HEAD
import { Button } from '@/components/ui/button';
=======
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import { Progress } from '@/components/ui/progress';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Rocket,
  Satellite,
  Globe,
  Star,
  Orbit,
  Factory,
  Gem,
  Fuel,
  Radio,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function SpaceEconomyTrading() {
  const [spaceData, setSpaceData] = useState({
    marketCap: 847000000000 + Math.random() * 50000000000,
    dailyVolume: 12400000000 + Math.random() * 2000000000,
    activeAssets: 1247 + Math.floor(Math.random() * 100),
    spaceStations: 47 + Math.floor(Math.random() * 5),
    asteroidMines: 124 + Math.floor(Math.random() * 20),
    lunarBases: 8 + Math.floor(Math.random() * 3),
    marsColonies: 3 + Math.floor(Math.random() * 2),
  });

  const [spaceAssets, setSpaceAssets] = useState([
    {
      symbol: 'LUNA-H3',
      name: 'Lunar Helium-3 Mining',
      type: 'Resource Extraction',
      location: 'Moon - Mare Imbrium',
      price: 2847.5 + Math.random() * 200,
      change: 12.7 + Math.random() * 5,
      volume: '847M tons',
      operator: 'Luna Mining Corp',
      yield: '24.7%',
      risk: 'Medium',
    },
    {
      symbol: 'AST-PLT',
      name: 'Asteroid Platinum Mining',
      type: 'Precious Metals',
      location: 'Asteroid Belt - 16 Psyche',
      price: 15247.89 + Math.random() * 1000,
      change: 8.9 + Math.random() * 4,
      volume: '124K tons',
      operator: 'Deep Space Mining Inc',
      yield: '47.8%',
      risk: 'High',
    },
    {
      symbol: 'MARS-AG',
      name: 'Mars Agricultural Domes',
      type: 'Food Production',
      location: 'Mars - Chryse Planitia',
      price: 4578.23 + Math.random() * 300,
      change: 15.4 + Math.random() * 6,
      volume: '2.4M units',
      operator: 'Red Planet Farms',
      yield: '18.9%',
      risk: 'Medium',
    },
    {
      symbol: 'ORB-PWR',
      name: 'Orbital Solar Arrays',
      type: 'Energy Generation',
      location: 'Earth Orbit - L1 Lagrange',
      price: 8947.12 + Math.random() * 500,
      change: 6.8 + Math.random() * 3,
      volume: '15.7 TWh',
      operator: 'Orbital Energy Systems',
      yield: '12.4%',
      risk: 'Low',
    },
    {
      symbol: 'TIT-ICE',
      name: 'Titan Water Ice Harvesting',
      type: 'Water Resources',
      location: 'Titan - Kraken Mare',
      price: 1247.67 + Math.random() * 100,
      change: 22.3 + Math.random() * 8,
      volume: '847M liters',
      operator: 'Outer System Resources',
      yield: '34.7%',
      risk: 'Very High',
    },
  ]);

  const [spaceInfrastructure, setSpaceInfrastructure] = useState([
    {
      name: 'Alpha Station One',
      type: 'Manufacturing Hub',
      location: 'Earth-Moon L4',
      capacity: '2.4M units/year',
      utilization: 87 + Math.random() * 10,
      revenue: '$847M/year',
      status: 'Operational',
    },
    {
      name: 'Ceres Mining Base',
      type: 'Resource Processing',
      location: 'Ceres - Occator Crater',
      capacity: '124K tons/month',
      utilization: 92 + Math.random() * 5,
      revenue: '$1.2B/year',
      status: 'Operational',
    },
    {
      name: 'Europa Research Station',
      type: 'Scientific Research',
      location: 'Europa - Subsurface Ocean',
      capacity: '50 researchers',
      utilization: 78 + Math.random() * 15,
      revenue: '$247M/year',
      status: 'Under Construction',
    },
    {
      name: 'Phobos Fuel Depot',
      type: 'Refueling Station',
      location: 'Phobos - Stickney Crater',
      capacity: '10M liters',
      utilization: 65 + Math.random() * 20,
      revenue: '$578M/year',
      status: 'Operational',
    },
  ]);

  const [spaceMarkets, setSpaceMarkets] = useState([
    {
      market: 'Lunar Resources Exchange',
      location: 'Moon - Shackleton Crater',
      tradingVolume: '$2.4B',
      activeTraders: '1,247',
      topCommodity: 'Helium-3',
      marketHours: '24/7',
    },
    {
      market: 'Asteroid Belt Commodities',
      location: 'Ceres Station',
      tradingVolume: '$8.7B',
      activeTraders: '3,456',
      topCommodity: 'Platinum',
      marketHours: '24/7',
    },
    {
      market: 'Mars Colonial Exchange',
      location: 'New Olympia, Mars',
      tradingVolume: '$1.8B',
      activeTraders: '892',
      topCommodity: 'Food Supplies',
      marketHours: 'Sol-based',
    },
    {
      market: 'Orbital Manufacturing Hub',
      location: 'L5 Lagrange Point',
      tradingVolume: '$4.2B',
      activeTraders: '2,134',
      topCommodity: 'Zero-G Products',
      marketHours: '24/7',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSpaceData();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const updateSpaceData = () => {
    setSpaceData(prev => ({
      ...prev,
      marketCap: prev.marketCap * (1 + (Math.random() - 0.4) * 0.01),
      dailyVolume: prev.dailyVolume * (1 + (Math.random() - 0.4) * 0.02),
      activeAssets: prev.activeAssets + Math.floor((Math.random() - 0.3) * 5),
    }));

    setSpaceAssets(prev =>
      prev.map((asset: any) => ({
        ...asset,
        price: asset.price * (1 + (Math.random() - 0.45) * 0.02),
        change: asset.change * (1 + (Math.random() - 0.45) * 0.1),
      }))
    );

    setSpaceInfrastructure(prev =>
      prev.map((infra: any) => ({
        ...infra,
        utilization: Math.min(100, Math.max(50, infra.utilization + (Math.random() - 0.5) * 3)),
      }))
    );
  };

  const getChangeColor = (change: any) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getRiskColor = (risk: any) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-orange-500';
      case 'very high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-green-500';
      case 'under construction':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Space Economy Overview */}
      <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Rocket className="h-7 w-7 mr-3 text-indigo-400" />
            🚀 Space Economy Trading
            <Badge className="ml-3 bg-gradient-to-r from-indigo-400 to-purple-500">
              <Star className="h-4 w-4 mr-1" />
              INTERPLANETARY
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-400/30">
              <div className="flex items-center justify-between mb-4">
                <Globe className="h-8 w-8 text-indigo-400" />
                <Badge className="bg-indigo-500">MARKET CAP</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${(spaceData.marketCap / 1000000000000).toFixed(2)}T
              </div>
              <p className="text-indigo-400 font-semibold">Space Economy</p>
              <p className="text-gray-400 text-sm">Total market capitalization</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-purple-400" />
                <Badge className="bg-purple-500">VOLUME</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${(spaceData.dailyVolume / 1000000000).toFixed(1)}B
              </div>
              <p className="text-purple-400 font-semibold">Daily Volume</p>
              <p className="text-gray-400 text-sm">24h trading volume</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <div className="flex items-center justify-between mb-4">
                <Satellite className="h-8 w-8 text-blue-400" />
                <Badge className="bg-blue-500">ASSETS</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {spaceData.activeAssets.toLocaleString()}
              </div>
              <p className="text-blue-400 font-semibold">Active Assets</p>
              <p className="text-gray-400 text-sm">Tradeable space assets</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-lg border border-cyan-400/30">
              <div className="flex items-center justify-between mb-4">
                <Factory className="h-8 w-8 text-cyan-400" />
                <Badge className="bg-cyan-500">INFRASTRUCTURE</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{spaceData.spaceStations}</div>
              <p className="text-cyan-400 font-semibold">Space Stations</p>
              <p className="text-gray-400 text-sm">Operational facilities</p>
            </div>
          </div>

          {/* Space Infrastructure Stats */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center">
              <Orbit className="h-6 w-6 mr-2 text-indigo-400" />
              Space Infrastructure Overview
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                <Gem className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold text-white">{spaceData.asteroidMines}</div>
                <p className="text-blue-400 font-semibold">Asteroid Mines</p>
                <p className="text-gray-400 text-xs">Active mining operations</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold text-white">{spaceData.lunarBases}</div>
                <p className="text-yellow-400 font-semibold">Lunar Bases</p>
                <p className="text-gray-400 text-xs">Moon surface facilities</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-400/30">
                <Rocket className="h-8 w-8 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold text-white">{spaceData.marsColonies}</div>
                <p className="text-red-400 font-semibold">Mars Colonies</p>
                <p className="text-gray-400 text-xs">Red planet settlements</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                <Fuel className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold text-white">24</div>
                <p className="text-green-400 font-semibold">Fuel Depots</p>
                <p className="text-gray-400 text-xs">Refueling stations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Space Assets Trading */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Star className="h-7 w-7 mr-3 text-blue-400" />⭐ Space Assets Portfolio
            <Badge className="ml-3 bg-gradient-to-r from-blue-400 to-cyan-500">
              <Radio className="h-4 w-4 mr-1" />
              REAL-TIME
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assets" className="space-y-6">
            <TabsList className="bg-black/20 border-blue-400/30">
              <TabsTrigger value="assets">Space Assets</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="markets">Trading Markets</TabsTrigger>
            </TabsList>

            <TabsContent value="assets">
              <div className="space-y-4">
                <div className="grid grid-cols-7 text-sm font-medium text-gray-400 pb-2 border-b border-gray-700/50">
                  <div>Symbol</div>
                  <div className="col-span-2">Asset</div>
                  <div>Location</div>
                  <div>Price</div>
                  <div>Change</div>
                  <div>Yield</div>
                </div>

                {spaceAssets.map((asset, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 items-center py-4 border-b border-gray-800/50"
                  >
                    <div className="font-bold text-white">{asset.symbol}</div>
                    <div className="col-span-2">
                      <div className="text-white font-medium">{asset.name}</div>
                      <div className="text-gray-400 text-xs">{asset.type}</div>
                    </div>
                    <div className="text-gray-300 text-sm">{asset.location}</div>
                    <div className="text-white">${asset.price.toLocaleString()}</div>
                    <div className={getChangeColor(asset.change)}>
                      {asset.change > 0 ? '+' : ''}
                      {asset.change.toFixed(2)}%
                    </div>
                    <div className="text-green-400 font-bold">{asset.yield}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Rocket className="h-4 w-4 mr-2" />
                  View All Space Assets
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="infrastructure">
              <div className="space-y-4">
                {spaceInfrastructure.map((infra, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg">{infra.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                            {infra.type}
                          </Badge>
                          <Badge className={getStatusColor(infra.status)}>{infra.status}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">{infra.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">
                          {infra.utilization.toFixed(1)}%
                        </div>
                        <p className="text-gray-400 text-sm">Utilization</p>
                        <div className="mt-2">
                          <p className="text-white font-bold">{infra.revenue}</p>
                          <p className="text-gray-400 text-xs">Annual Revenue</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 text-sm">Capacity: {infra.capacity}</span>
                        <span className="text-blue-400 text-sm">
                          {infra.utilization.toFixed(1)}% utilized
                        </span>
                      </div>
                      <Progress value={infra.utilization} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="markets">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {spaceMarkets.map((market, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-bold text-lg">{market.market}</h3>
                      <Badge className="bg-purple-500">LIVE</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location</span>
                        <span className="text-white">{market.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trading Volume</span>
                        <span className="text-green-400 font-bold">{market.tradingVolume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active Traders</span>
                        <span className="text-blue-400">{market.activeTraders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Top Commodity</span>
                        <span className="text-yellow-400">{market.topCommodity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Hours</span>
                        <span className="text-cyan-400">{market.marketHours}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Trade Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-purple-400/30 text-purple-400"
                      >
                        View Market
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
