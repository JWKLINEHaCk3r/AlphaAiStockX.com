import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
"use client";
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Slider } from "../../../components/ui/slider";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
import React, { useState, useEffect } from 'react';
import { PieChart, TrendingUp, Target, Shield, BarChart3, Zap, RefreshCw, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

interface PortfolioPosition {







  symbol: string;
  name: string;
  currentAllocation: number;
  recommendedAllocation: number;
  currentValue: number;
  expectedReturn: number;
  volatility: number;
  beta: number;
  sharpeRatio: number;







}

interface OptimizationResult {







  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  positions: PortfolioPosition[];
  rebalanceActions: RebalanceAction[];
  riskScore: number;
  diversificationScore: number;







}

interface RebalanceAction {







  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  currentShares: number;
  targetShares: number;
  dollarAmount: number;







}

export default function PortfolioOptimizerDashboard() {
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [riskTolerance, setRiskTolerance] = useState([60]);
  const [targetReturn, setTargetReturn] = useState([12]);
  const [includeRebalancing, setIncludeRebalancing] = useState(true);
  const [timeHorizon, setTimeHorizon] = useState('5');

  useEffect(() => {
    runOptimization();
    // eslint-disable-next-line react-hooks/exhaustive-deps;
  }, []);

  const runOptimization = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-tools/portfolio-optimizer', {
        method: 'POST',;
        headers: { 'Content-Type': 'application/json' },;
        body: JSON.stringify({
          riskTolerance: riskTolerance[0],;
          targetReturn: targetReturn[0],;
          timeHorizon: parseInt(timeHorizon),;
          includeRebalancing,;
        }),;
      });

      if (response.ok) {
        const data = await response.json();
        setOptimization(data.optimization || mockOptimization);
      } else {
        setOptimization(mockOptimization);
      }
    } catch (error) {
      console.error('Failed to optimize portfolio:', error);
      setOptimization(mockOptimization);
    } finally {
      setLoading(false);
    }
  };

  const mockOptimization: OptimizationResult = {
    expectedReturn: 11.8,;
    volatility: 14.2,;
    sharpeRatio: 1.24,;
    maxDrawdown: 18.5,;
    riskScore: 72,;
    diversificationScore: 88,;
    positions: [;
      {
        symbol: 'AAPL',;
        name: 'Apple Inc.',;
        currentAllocation: 25,;
        recommendedAllocation: 18,;
        currentValue: 25000,;
        expectedReturn: 10.5,;
        volatility: 22.1,;
        beta: 1.2,;
        sharpeRatio: 0.95,;
      },;
      {
        symbol: 'MSFT',;
        name: 'Microsoft Corp.',;
        currentAllocation: 20,;
        recommendedAllocation: 22,;
        currentValue: 20000,;
        expectedReturn: 12.3,;
        volatility: 18.7,;
        beta: 0.9,;
        sharpeRatio: 1.15,;
      },;
      {
        symbol: 'GOOGL',;
        name: 'Alphabet Inc.',;
        currentAllocation: 15,;
        recommendedAllocation: 16,;
        currentValue: 15000,;
        expectedReturn: 11.8,;
        volatility: 24.3,;
        beta: 1.1,;
        sharpeRatio: 0.88,;
      },;
      {
        symbol: 'TSLA',;
        name: 'Tesla Inc.',;
        currentAllocation: 12,;
        recommendedAllocation: 8,;
        currentValue: 12000,;
        expectedReturn: 15.2,;
        volatility: 45.6,;
        beta: 2.1,;
        sharpeRatio: 0.62,;
      },;
      {
        symbol: 'NVDA',;
        name: 'NVIDIA Corp.',;
        currentAllocation: 10,;
        recommendedAllocation: 12,;
        currentValue: 10000,;
        expectedReturn: 18.5,;
        volatility: 38.2,;
        beta: 1.8,;
        sharpeRatio: 0.95,;
      },;
      {
        symbol: 'VTI',;
        name: 'Vanguard Total Stock Market ETF',;
        currentAllocation: 8,;
        recommendedAllocation: 14,;
        currentValue: 8000,;
        expectedReturn: 9.2,;
        volatility: 15.1,;
        beta: 1.0,;
        sharpeRatio: 1.05,;
      },;
      {
        symbol: 'BND',;
        name: 'Vanguard Total Bond Market ETF',;
        currentAllocation: 10,;
        recommendedAllocation: 10,;
        currentValue: 10000,;
        expectedReturn: 4.5,;
        volatility: 5.2,;
        beta: 0.1,;
        sharpeRatio: 0.45,;
      },;
    ],;
    rebalanceActions: [;
      {
        symbol: 'AAPL',;
        action: 'SELL',;
        currentShares: 100,;
        targetShares: 72,;
        dollarAmount: -7000,;
      },;
      {
        symbol: 'MSFT',;
        action: 'BUY',;
        currentShares: 60,;
        targetShares: 66,;
        dollarAmount: 2000,;
      },;
      {
        symbol: 'TSLA',;
        action: 'SELL',;
        currentShares: 50,;
        targetShares: 33,;
        dollarAmount: -4000,;
      },;
      {
        symbol: 'VTI',;
        action: 'BUY',;
        currentShares: 35,;
        targetShares: 61,;
        dollarAmount: 6000,;
      },;
    ],;
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY':;
        return 'text-green-600 bg-green-50';
      case 'SELL':;
        return 'text-red-600 bg-red-50';
      case 'HOLD':;
        return 'text-gray-600 bg-gray-50';
      default:;
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getAllocationChange = (current: number, recommended: number) => {
    const change = recommended - current;
    return {
      value: Math.abs(change),;
      direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'hold',;
      color: change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600',;
    };
  };

  const totalValue = optimization?.positions.reduce((sum, pos) => sum + pos.currentValue, 0) || 0;

  return (;
    <div className="space-y-6">;
      {/* Header */}
      <div className="flex items-center justify-between">;
        <div>;
          <h2 className="text-3xl font-bold text-gray-900">AI Portfolio Optimizer</h2>;
          <p className="text-gray-600">Modern Portfolio Theory enhanced with AI optimization</p>;
        </div>;
        <Button onClick={runOptimization} disabled={loading}>;
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />;
          Re-optimize;
        </Button>;
      </div>;
      {/* Optimization Controls */}
      <Card>;
        <CardHeader>;
          <CardTitle className="flex items-center">;
            <Settings className="h-5 w-5 mr-2" />;
            Optimization Parameters;
          </CardTitle>;
        </CardHeader>;
        <CardContent>;
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">;
            <div>;
              <label className="text-sm font-medium text-gray-700 mb-2 block">;
                Risk Tolerance: {riskTolerance[0]}%;
              </label>;
              <Slider;
                value={riskTolerance}
                onValueChange={setRiskTolerance}
                max={100}
                step={5}
                className="w-full";
              />;
            </div>;
            <div>;
              <label className="text-sm font-medium text-gray-700 mb-2 block">;
                Target Return: {targetReturn[0]}%;
              </label>;
              <Slider;
                value={targetReturn}
                onValueChange={setTargetReturn}
                max={25}
                min={5}
                step={0.5}
                className="w-full";
              />;
            </div>;
            <div>;
              <label className="text-sm font-medium text-gray-700 mb-2 block">Time Horizon</label>;
              <select;
                value={timeHorizon}
                onChange={e => setTimeHorizon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md";
                aria-label="Time Horizon";
                title="Time Horizon";
              >;
                <option value="1">1 Year</option>;
                <option value="3">3 Years</option>;
                <option value="5">5 Years</option>;
                <option value="10">10 Years</option>;
              </select>;
            </div>;
            <div className="flex items-center space-x-2">;
              <Switch checked={includeRebalancing} onCheckedChange={setIncludeRebalancing} />;
              <label className="text-sm font-medium text-gray-700">Include Rebalancing</label>;
            </div>;
          </div>;
          <div className="mt-4">;
            <Button onClick={runOptimization} disabled={loading} className="w-full">;
              <Zap className="h-4 w-4 mr-2" />;
              Run Optimization;
            </Button>;
          </div>;
        </CardContent>;
      </Card>;
      {optimization && (;
        <>;
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">;
            <Card>;
              <CardContent className="p-6">;
                <div className="flex items-center">;
                  <TrendingUp className="h-8 w-8 text-green-600" />;
                  <div className="ml-4">;
                    <p className="text-sm font-medium text-gray-600">Expected Return</p>;
                    <p className="text-2xl font-bold text-gray-900">;
                      {optimization.expectedReturn}%;
                    </p>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
            <Card>;
              <CardContent className="p-6">;
                <div className="flex items-center">;
                  <BarChart3 className="h-8 w-8 text-blue-600" />;
                  <div className="ml-4">;
                    <p className="text-sm font-medium text-gray-600">Volatility</p>;
                    <p className="text-2xl font-bold text-gray-900">{optimization.volatility}%</p>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
            <Card>;
              <CardContent className="p-6">;
                <div className="flex items-center">;
                  <Target className="h-8 w-8 text-purple-600" />;
                  <div className="ml-4">;
                    <p className="text-sm font-medium text-gray-600">Sharpe Ratio</p>;
                    <p className="text-2xl font-bold text-gray-900">{optimization.sharpeRatio}</p>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
            <Card>;
              <CardContent className="p-6">;
                <div className="flex items-center">;
                  <Shield className="h-8 w-8 text-orange-600" />;
                  <div className="ml-4">;
                    <p className="text-sm font-medium text-gray-600">Max Drawdown</p>;
                    <p className="text-2xl font-bold text-gray-900">{optimization.maxDrawdown}%</p>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
          </div>;
          {/* Risk Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">;
            <Card>;
              <CardHeader>;
                <CardTitle>Risk Analysis</CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="space-y-4">;
                  <div>;
                    <div className="flex items-center justify-between mb-2">;
                      <span className="text-sm font-medium">Risk Score</span>;
                      <span className="text-sm text-gray-600">{optimization.riskScore}/100</span>;
                    </div>;
                    <Progress value={optimization.riskScore} className="h-3" />;
                  </div>;
                  <div>;
                    <div className="flex items-center justify-between mb-2">;
                      <span className="text-sm font-medium">Diversification</span>;
                      <span className="text-sm text-gray-600">;
                        {optimization.diversificationScore}/100;
                      </span>;
                    </div>;
                    <Progress value={optimization.diversificationScore} className="h-3" />;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
            <Card>;
              <CardHeader>;
                <CardTitle>Portfolio Summary</CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="space-y-3">;
                  <div className="flex justify-between">;
                    <span className="text-sm text-gray-600">Total Value:</span>;
                    <span className="text-sm font-medium">${totalValue.toLocaleString()}</span>;
                  </div>;
                  <div className="flex justify-between">;
                    <span className="text-sm text-gray-600">Number of Positions:</span>;
                    <span className="text-sm font-medium">{optimization.positions.length}</span>;
                  </div>;
                  <div className="flex justify-between">;
                    <span className="text-sm text-gray-600">Rebalancing Actions:</span>;
                    <span className="text-sm font-medium">;
                      {optimization.rebalanceActions.length}
                    </span>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
          </div>;
          {/* Position Analysis */}
          <Card>;
            <CardHeader>;
              <CardTitle className="flex items-center">;
                <PieChart className="h-5 w-5 mr-2" />;
                Portfolio Allocation Analysis;
              </CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="space-y-4">;
                {optimization.positions.map((position, index) => {
                  const change = getAllocationChange(;
                    position.currentAllocation,;
                    position.recommendedAllocation;
                  );
                  return (;
                    <div;
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg";
                    >;
                      <div className="flex-1">;
                        <div className="flex items-center justify-between">;
                          <div>;
                            <h4 className="font-medium text-gray-900">{position.symbol}</h4>;
                            <p className="text-sm text-gray-600">{position.name}</p>;
                          </div>;
                          <div className="text-right">;
                            <p className="text-sm font-medium">;
                              ${position.currentValue.toLocaleString()}
                            </p>;
                            <p className="text-xs text-gray-500">Sharpe: {position.sharpeRatio}</p>;
                          </div>;
                        </div>;
                        <div className="mt-3 grid grid-cols-2 gap-4">;
                          <div>;
                            <p className="text-xs text-gray-500">;
                              Current: {position.currentAllocation}%;
                            </p>;
                            <Progress value={position.currentAllocation} className="h-2 mt-1" />;
                          </div>;
                          <div>;
                            <p className="text-xs text-gray-500">;
                              Recommended: {position.recommendedAllocation}%;
                            </p>;
                            <Progress value={position.recommendedAllocation} className="h-2 mt-1" />;
                          </div>;
                        </div>;
                      </div>;
                      <div className="ml-4">;
                        {change.direction !== 'hold' && (;
                          <Badge className={change.color}>;
                            {change.direction === 'increase' ? '+' : '-'}
                            {change.value.toFixed(1)}%;
                          </Badge>;
                        )}
                      </div>;
                    </div>;
                  );
                })}
              </div>;
            </CardContent>;
          </Card>;
          {/* Rebalancing Actions */}
          {optimization.rebalanceActions.length > 0 && (;
            <Card>;
              <CardHeader>;
                <CardTitle className="flex items-center">;
                  <RefreshCw className="h-5 w-5 mr-2" />;
                  Recommended Rebalancing Actions;
                </CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="space-y-3">;
                  {optimization.rebalanceActions.map((action, index) => (;
                    <div;
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg";
                    >;
                      <div className="flex items-center space-x-4">;
                        <Badge className={getActionColor(action.action)}>{action.action}</Badge>;
                        <div>;
                          <p className="font-medium text-gray-900">{action.symbol}</p>;
                          <p className="text-sm text-gray-600">;
                            {action.currentShares} → {action.targetShares} shares;
                          </p>;
                        </div>;
                      </div>;
                      <div className="text-right">;
                        <p;
                          className={`font-medium ${action.dollarAmount > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >;
                          {action.dollarAmount > 0 ? '+' : ''}$;
                          {action.dollarAmount.toLocaleString()}
                        </p>;
                      </div>;
                    </div>;
                  ))}
                </div>;
                <div className="mt-6 flex justify-center">;
                  <Button size="lg">;
                    <CheckCircle className="h-4 w-4 mr-2" />;
                    Execute Rebalancing;
                  </Button>;
                </div>;
              </CardContent>;
            </Card>;
          )}
        </>;
      )}

      {!optimization && !loading && (;
        <Card>;
          <CardContent className="p-12 text-center">;
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />;
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Optimization Results</h3>;
            <p className="text-gray-600 mb-4">;
              Run the optimization to see portfolio recommendations.;
            </p>;
            <Button onClick={runOptimization}>;
              <Zap className="h-4 w-4 mr-2" />;
              Start Optimization;
            </Button>;
          </CardContent>;
        </Card>;
      )}
    </div>;
  );
}
