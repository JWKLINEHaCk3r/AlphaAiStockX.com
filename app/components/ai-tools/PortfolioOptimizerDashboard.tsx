import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
'use client';
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import React, { useState } from 'react';
import { PieChart, BarChart3, TrendingUp, Shield } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";

interface OptimizationResult {
  asset: string,
    currentAllocation: number,
  recommendedAllocation: number,
    reason: string
}

interface PortfolioMetrics {
  currentRisk: string,
    optimizedRisk: string,
  expectedReturn: string,
    sharpeRatio: string
}

export default function PortfolioOptimizerDashboard() {
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const runOptimization = () => {
    setLoading(true);
    setTimeout(() => {
      setOptimizationResults([ { asset: 'US Stocks',
          currentAllocation: 65, recommendedAllocation: 55, reason: 'Reduce overexposure to domestic equities'
        }, { asset: 'International Stocks',
          currentAllocation: 15, recommendedAllocation: 25, reason: 'Increase diversification benefits'
        }, { asset: 'Bonds',
          currentAllocation: 15, recommendedAllocation: 15, reason: 'Maintain current allocation'
        }, { asset: 'REITs',
          currentAllocation: 5, recommendedAllocation: 5, reason: 'Appropriate allocation for risk level'
        }
      ]);
 setMetrics({ currentRisk: '12.8%', optimizedRisk: '11.2%', expectedReturn: '9.4%', sharpeRatio: '0.84'
      });

      setLoading(false);
    }, 2000);
  };

  const getAllocationChange = (current: number, recommended: number) => {  
    const change = recommended - current;
    if (change > 0) return { text: `+${change  }%`, color: 'text-green-600' };
    if (change < 0) return { text: `${change}%`, color: 'text-red-600' };
    return { text: '0%', color: 'text-gray-600' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <PieChart className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Portfolio Optimizer Dashboard</h1>
        </div>
        <Badge variant="outline">AI Optimization</Badge>
      </div>

      <Button 
        onClick={runOptimization}
        disabled={loading}
        className="w-full" > {loading ? 'Optimizing Portfolio...' : 'Run AI Portfolio Optimization'}
      </Button>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Risk</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.currentRisk}</div>
              <p className="text-xs text-muted-foreground">Portfolio volatility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Optimized Risk</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metrics.optimizedRisk}</div>
              <p className="text-xs text-muted-foreground">Reduced by 1.6%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expected Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{metrics.expectedReturn}</div>
              <p className="text-xs text-muted-foreground">Annual return</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{metrics.sharpeRatio}</div>
              <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
            </CardContent>
          </Card>
        </div>
      )}, {optimizationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimizationResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{result.asset}</h3>
                    <Badge variant="outline">
                      {getAllocationChange(result.currentAllocation, result.recommendedAllocation).text}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Current Allocation</p>
                      <p className="text-xl font-bold">{result.currentAllocation}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recommended Allocation</p>
                      <p className={`text-xl font-bold ${ result.recommendedAllocation > result.currentAllocation  ? 'text-green-600'  : result.recommendedAllocation < result.currentAllocation ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {result.recommendedAllocation}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.recommendedAllocation}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    <strong>Recommendation:</strong> {result.reason}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
