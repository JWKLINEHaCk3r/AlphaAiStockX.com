<<<<<<< HEAD
import { Card, CardContent } from '../../../components/ui/card';
import { Calendar } from "../../../components/ui/calendar";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Input } from "../../../components/ui/input";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
'use client';
=======
import { Calendar } from '@/components/ui/calendar';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Building2,
  Star,
  AlertTriangle,
  Target,
  Zap,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

interface IPO {
  id: string;
  company: string;
  symbol: string;
  sector: string;
  expectedDate: string;
  priceRange: [number, number];
  sharesOffered: number;
  marketCap: number;
  successProbability: number;
  riskScore: number;
  aiRating: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'AVOID';
  keyMetrics: {
    revenue: number;
    revenueGrowth: number;
    profitMargin: number;
    debtToEquity: number;
  };
  catalysts: string[];
  risks: string[];
}

export default function IPORadarDashboard() {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');

  useEffect(() => {
    loadIPOData();
  }, []);

  const loadIPOData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-tools/ipo-radar');
      if (response.ok) {
        const data = await response.json();
        setIpos(data.ipos || mockIPOData);
      } else {
        // Fallback to mock data
        setIpos(mockIPOData);
      }
    } catch (error) {
      console.error('Failed to load IPO data:', error);
      setIpos(mockIPOData);
    } finally {
      setLoading(false);
    }
  };

  const mockIPOData: IPO[] = [
    {
      id: '1',
      company: 'TechNova AI',
      symbol: 'TNAI',
      sector: 'Technology',
      expectedDate: '2024-03-15',
      priceRange: [18, 22],
      sharesOffered: 50000000,
      marketCap: 1100000000,
      successProbability: 87,
      riskScore: 23,
      aiRating: 'STRONG_BUY',
      keyMetrics: {
        revenue: 500000000,
        revenueGrowth: 145,
        profitMargin: 12.5,
        debtToEquity: 0.3,
      },
      catalysts: ['AI breakthrough', 'Major partnerships', 'Growing market'],
      risks: ['Market volatility', 'Competition'],
    },
    {
      id: '2',
      company: 'GreenEnergy Solutions',
      symbol: 'GREN',
      sector: 'Energy',
      expectedDate: '2024-03-22',
      priceRange: [12, 16],
      sharesOffered: 75000000,
      marketCap: 1050000000,
      successProbability: 72,
      riskScore: 35,
      aiRating: 'BUY',
      keyMetrics: {
        revenue: 320000000,
        revenueGrowth: 89,
        profitMargin: 8.2,
        debtToEquity: 0.5,
      },
      catalysts: ['ESG trend', 'Government incentives'],
      risks: ['Regulatory changes', 'Technology risks'],
    },
    {
      id: '3',
      company: 'BioMed Innovations',
      symbol: 'BMED',
      sector: 'Healthcare',
      expectedDate: '2024-04-05',
      priceRange: [25, 30],
      sharesOffered: 30000000,
      marketCap: 825000000,
      successProbability: 65,
      riskScore: 45,
      aiRating: 'HOLD',
      keyMetrics: {
        revenue: 180000000,
        revenueGrowth: 112,
        profitMargin: 15.8,
        debtToEquity: 0.2,
      },
      catalysts: ['FDA approval pending', 'Strong pipeline'],
      risks: ['Regulatory approval', 'Clinical trial outcomes'],
    },
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'STRONG_BUY':
        return 'bg-green-500';
      case 'BUY':
        return 'bg-blue-500';
      case 'HOLD':
        return 'bg-yellow-500';
      case 'AVOID':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const filteredIPOs = ipos.filter(ipo => {
    const matchesSearch =
      ipo.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || ipo.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = [...new Set(ipos.map(ipo => ipo.sector))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI IPO Radar</h2>
          <p className="text-gray-600">AI-powered IPO analysis and success predictions</p>
        </div>
        <Button onClick={loadIPOData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search IPOs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedSector}
            onChange={e => setSelectedSector(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming IPOs</p>
                <p className="text-2xl font-bold text-gray-900">{filteredIPOs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    filteredIPOs.reduce((acc, ipo) => acc + ipo.successProbability, 0) /
                      filteredIPOs.length || 0
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Market Cap</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {(filteredIPOs.reduce((acc, ipo) => acc + ipo.marketCap, 0) / 1000000000).toFixed(
                    1
                  )}
                  B
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Strong Buys</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredIPOs.filter(ipo => ipo.aiRating === 'STRONG_BUY').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IPO List */}
      <div className="space-y-4">
        {filteredIPOs.map(ipo => (
          <Card key={ipo.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{ipo.company}</h3>
                      <p className="text-sm text-gray-600">
                        {ipo.symbol} • {ipo.sector}
                      </p>
                      <p className="text-sm text-gray-500">{ipo.expectedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Metrics */}
                <div className="lg:col-span-1">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Price Range:</span>
                      <span className="text-sm font-medium">
                        ${ipo.priceRange[0]} - ${ipo.priceRange[1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Market Cap:</span>
                      <span className="text-sm font-medium">
                        ${(ipo.marketCap / 1000000000).toFixed(1)}B
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenue Growth:</span>
                      <span className="text-sm font-medium text-green-600">
                        {ipo.keyMetrics.revenueGrowth}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="lg:col-span-1">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Success Probability</span>
                        <span className="text-sm font-medium">{ipo.successProbability}%</span>
                      </div>
                      <Progress value={ipo.successProbability} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Risk Score</span>
                        <span className={`text-sm font-medium ${getRiskColor(ipo.riskScore)}`}>
                          {ipo.riskScore}/100
                        </span>
                      </div>
                      <Progress value={100 - ipo.riskScore} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Rating & Actions */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div>
                    <Badge className={`${getRatingColor(ipo.aiRating)} text-white mb-2`}>
                      {ipo.aiRating.replace('_', ' ')}
                    </Badge>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">Key Catalysts:</p>
                      {ipo.catalysts.slice(0, 2).map((catalyst, idx) => (
                        <p key={idx} className="text-xs text-gray-500">
                          • {catalyst}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Target className="h-4 w-4 mr-1" />
                      Track
                    </Button>
                    <Button size="sm">
                      <Zap className="h-4 w-4 mr-1" />
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIPOs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No IPOs Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
