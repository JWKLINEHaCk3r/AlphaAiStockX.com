import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
"use client";
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Target, PieChart, Zap, Plus, Trash2 } from 'lucide-react';

interface PortfolioStock {

  symbol: string;
  weight: number;
  currentPrice: number;
  expectedReturn: number;
  risk: number;

}


interface OptimizationResult {

  expectedReturn: number;
  volatility: number;
  risk: number;
  sharpeRatio: number;
  maxDrawdown: number;
  diversificationScore: number;
  recommendations: Array<{
    action: string;
    symbol: string;
    suggestedWeight: number;
    reason: string;
    impact: string;
  
}>;
  allocations: Array<{
    symbol: string;
    currentWeight: number;
    optimizedWeight: number;
    allocation: number;
  }>;
  metrics: {
    portfolioValue: number;
    annualizedReturn: number;
    riskAdjustedReturn: number;
    diversificationRatio: number;
  };
}

export default function PortfolioOptimizer() {
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([]);
  const [newStock, setNewStock] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);

  useEffect(() => {
    // Initialize with sample portfolio;
    setPortfolio([;
      { symbol: 'AAPL', weight: 25, currentPrice: 175.43, expectedReturn: 12.5, risk: 18.2 },;
      { symbol: 'MSFT', weight: 20, currentPrice: 378.85, expectedReturn: 11.8, risk: 16.5 },;
      { symbol: 'GOOGL', weight: 15, currentPrice: 138.21, expectedReturn: 13.2, risk: 22.1 },;
      { symbol: 'TSLA', weight: 10, currentPrice: 248.5, expectedReturn: 15.8, risk: 35.4 },;
      { symbol: 'NVDA', weight: 15, currentPrice: 875.28, expectedReturn: 18.5, risk: 28.9 },;
      { symbol: 'AMZN', weight: 15, currentPrice: 155.89, expectedReturn: 14.2, risk: 24.7 },;
    ]);
  }, []);

  useEffect(() => {
    if (portfolio.length > 0) {
      // Calculate portfolio optimization;
      const totalWeight = portfolio.reduce((sum, stock) => sum + stock.weight, 0);
      const weightedReturn = portfolio.reduce(;
        (sum, stock) => sum + (stock.expectedReturn * stock.weight) / 100,;
        0;
      );
      const portfolioRisk = Math.sqrt(;
        portfolio.reduce((sum, stock) => sum + Math.pow((stock.risk * stock.weight) / 100, 2), 0);
      );
      const sharpeRatio = weightedReturn / portfolioRisk;

      setOptimization({
        expectedReturn: weightedReturn,;
        volatility: portfolioRisk,;
        risk: portfolioRisk,;
        sharpeRatio,;
        maxDrawdown: 12.5,;
        diversificationScore: 78,;
        recommendations: [;
          {
            action: 'Reduce',;
            symbol: 'TSLA',;
            suggestedWeight: 8,;
            reason: 'High volatility',;
            impact: 'Medium',;
          },;
          {
            action: 'Increase',;
            symbol: 'MSFT',;
            suggestedWeight: 22,;
            reason: 'Stable growth',;
            impact: 'High',;
          },;
          {
            action: 'Add',;
            symbol: 'VTI',;
            suggestedWeight: 5,;
            reason: 'Diversification',;
            impact: 'Low',;
          },;
        ],;
        allocations: portfolio.map(stock => ({
          symbol: stock.symbol,;
          currentWeight: stock.weight,;
          optimizedWeight: stock.weight, // Placeholder;
          allocation: (stock.weight / totalWeight) * 100,;
        })),;
        metrics: {
          portfolioValue: 100000, // Placeholder;
          annualizedReturn: 0, // Placeholder;
          riskAdjustedReturn: 0, // Placeholder;
          diversificationRatio: 0, // Placeholder;
        },;
      });
    }
  }, [portfolio]);

  const addStock = () => {
    if (newStock && newWeight) {
      const weight = Number.parseFloat(newWeight);
      if (weight > 0 && weight <= 100) {
        setPortfolio([;
          ...portfolio,;
          {
            symbol: newStock.toUpperCase(),;
            weight: weight,;
            currentPrice: 100 + Math.random() * 500,;
            expectedReturn: 8 + Math.random() * 15,;
            risk: 10 + Math.random() * 30,;
          },;
        ]);
        setNewStock('');
        setNewWeight('');
      }
    }
  };

  const removeStock = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const optimizePortfolio = () => {
    // Simulate AI optimization;
    const optimized = portfolio.map((stock: PortfolioStock) => ({
      ...stock,;
      weight: Math.max(5, Math.min(30, stock.weight + (Math.random() - 0.5) * 10)),;
    }));
    setPortfolio(optimized);
  };

  return (;
    <div className="space-y-6">;
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">;
        <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Expected Return</p>;
                <p className="text-2xl font-bold text-green-400">;
                  {optimization?.expectedReturn.toFixed(1)}%;
                </p>;
              </div>;
              <TrendingUp className="h-8 w-8 text-green-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Portfolio Risk</p>;
                <p className="text-2xl font-bold text-red-400">{optimization?.risk.toFixed(1)}%</p>;
              </div>;
              <Target className="h-8 w-8 text-red-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-black/20 border-blue-500/30 backdrop-blur-xl">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Sharpe Ratio</p>;
                <p className="text-2xl font-bold text-blue-400">;
                  {optimization?.sharpeRatio.toFixed(2)}
                </p>;
              </div>;
              <PieChart className="h-8 w-8 text-blue-400" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-400">Diversification</p>;
                <p className="text-2xl font-bold text-purple-400">;
                  {optimization?.diversificationScore}%;
                </p>;
              </div>;
              <DollarSign className="h-8 w-8 text-purple-400" />;
            </div>;
          </CardContent>;
        </Card>;
      </div>;
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
        {/* Current Portfolio */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardHeader>;
            <div className="flex items-center justify-between">;
              <CardTitle className="text-white">Current Portfolio</CardTitle>;
              <Button;
                onClick={optimizePortfolio}
                className="bg-gradient-to-r from-purple-500 to-pink-500";
              >;
                <Zap className="h-4 w-4 mr-2" />;
                AI Optimize;
              </Button>;
            </div>;
          </CardHeader>;
          <CardContent className="space-y-4">;
            {portfolio.map((stock, index) => (;
              <div key={index} className="p-3 bg-white/5 rounded-lg">;
                <div className="flex items-center justify-between mb-2">;
                  <div className="flex items-center space-x-3">;
                    <span className="text-white font-semibold">{stock.symbol}</span>;
                    <Badge variant="outline">{stock.weight}%</Badge>;
                  </div>;
                  <Button;
                    variant="ghost";
                    size="sm";
                    onClick={() => removeStock(index)}
                    className="text-red-400 hover:text-red-300";
                  >;
                    <Trash2 className="h-4 w-4" />;
                  </Button>;
                </div>;
                <div className="grid grid-cols-3 gap-2 text-sm">;
                  <div>;
                    <p className="text-gray-400">Price</p>;
                    <p className="text-white">${stock.currentPrice.toFixed(2)}</p>;
                  </div>;
                  <div>;
                    <p className="text-gray-400">Expected Return</p>;
                    <p className="text-green-400">{stock.expectedReturn.toFixed(1)}%</p>;
                  </div>;
                  <div>;
                    <p className="text-gray-400">Risk</p>;
                    <p className="text-red-400">{stock.risk.toFixed(1)}%</p>;
                  </div>;
                </div>;
                <Progress value={stock.weight} className="mt-2 h-2" />;
              </div>;
            ))}

            {/* Add New Stock */}
            <div className="p-3 bg-white/5 rounded-lg border-2 border-dashed border-gray-600">;
              <div className="flex space-x-2">;
                <Input;
                  placeholder="Stock Symbol";
                  value={newStock}
                  onChange={e => setNewStock(e.target.value)}
                  className="bg-black/20 border-gray-600 text-white";
                />;
                <Input;
                  placeholder="Weight %";
                  type="number";
                  value={newWeight}
                  onChange={e => setNewWeight(e.target.value)}
                  className="bg-black/20 border-gray-600 text-white";
                />;
                <Button onClick={addStock} className="bg-purple-500 hover:bg-purple-600">;
                  <Plus className="h-4 w-4" />;
                </Button>;
              </div>;
            </div>;
          </CardContent>;
        </Card>;
        {/* AI Recommendations */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">;
          <CardHeader>;
            <CardTitle className="text-white flex items-center">;
              <Zap className="h-5 w-5 mr-2 text-yellow-400" />;
              AI Recommendations;
            </CardTitle>;
          </CardHeader>;
          <CardContent className="space-y-4">;
            {optimization?.recommendations.map((rec, index) => (;
              <div;
                key={index}
                className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30";
              >;
                <div className="flex items-center justify-between mb-2">;
                  <Badge;
                    variant={
                      rec.action === 'Add';
                        ? 'default';
                        : rec.action === 'Increase';
                          ? 'secondary';
                          : 'destructive';
                    }
                  >;
                    {rec.action} {rec.symbol}
                  </Badge>;
                  <span className="text-xs text-gray-400">{rec.impact}</span>;
                </div>;
                <p className="text-sm text-gray-300">{rec.reason}</p>;
              </div>;
            ))}

            {/* Portfolio Allocation Chart */}
            <div className="mt-6">;
              <h4 className="text-white font-semibold mb-3">Allocation Breakdown</h4>;
              <div className="space-y-2">;
                {portfolio.map((stock, index) => (;
                  <div key={index} className="flex items-center justify-between">;
                    <span className="text-gray-300 text-sm">{stock.symbol}</span>;
                    <div className="flex items-center space-x-2">;
                      <div className="w-20 bg-gray-700 rounded-full h-2">;
                        <div;
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full";
                          data-weight={stock.weight}
                        ></div>;
                      </div>;
                      <span className="text-white text-sm w-8">{stock.weight}%</span>;
                    </div>;
                  </div>;
                ))}
              </div>;
            </div>;
          </CardContent>;
        </Card>;
      </div>;
    </div>;
  );
}
