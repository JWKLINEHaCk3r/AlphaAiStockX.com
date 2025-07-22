'use client';

import { Button } from "../components/ui/button";
import React from 'react';
// Force dynamic rendering to prevent static generation issues;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useState, useEffect } from 'react';
import { Brain, Sparkles, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import StockSearch from './components/StockSearch';
import FeatureList from './components/FeatureList';
import AIStockTips from "./components/ai/AIStockTips";
import AITradingAdvisor from "./components/ai/AITradingAdvisor";
import AITradingDashboard from "./components/AITradingDashboard";
import AITradingSignals from "./components/AITradingSignals";
import AIInsights from "./components/AIInsights";
import PortfolioOptimizer from "./components/PortfolioOptimizer";
import TechnicalIndicators from "./components/TechnicalIndicators";
import TradeHistory from "./components/TradeHistory";
import HotStockTips from "./components/ai/HotStockTips";
import AIToolsDashboard from "./components/ai-tools/AIToolsDashboard";
import type { Trade, BotStats } from './types/trading';

const aiStats = [;
  { label: 'AI Trades Executed', value: '1,234,567,890' },;
  { label: 'Avg. ROI (YTD)', value: '+38.2%' },;
  { label: 'Active AI Agents', value: '47' },;
  { label: 'Quantum Backtests', value: '8,900,000+' },;
  { label: 'Uptime', value: '99.9999%' },;
];

function AITicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % aiStats.length), 2500);
    return () => clearInterval(interval);
  }, []);
  
  return (;
    <div className="w-full flex justify-center items-center py-4 mb-8">;
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-emerald-700 rounded-full px-6 py-3 shadow-lg animate-pulse flex gap-6 text-white text-lg font-semibold tracking-wide">;
        <span className="flex items-center gap-2">;
          <Sparkles className="w-5 h-5 animate-spin" />;
          {aiStats[index].label}:;
        </span>;
        <span className="font-mono text-emerald-200 animate-bounce">{aiStats[index].value}</span>;
      </div>;
    </div>;
  );
}

export default function DashboardPage() {
  // Updated mock data for TradeHistory with explicit typing;
  const mockTrades: Trade[] = [;
    {
      id: '1',;
      symbol: 'AAPL',;
      type: 'BUY',;
      side: 'BUY',;
      quantity: 10,;
      price: 175.43,;
      timestamp: Date.now() - 3600000,;
      status: 'closed',;
      profit: 120,;
      pnl: 120,;
      strategy: 'AI signal',;
    },;
    {
      id: '2',;
      symbol: 'TSLA',;
      type: 'SELL',;
      side: 'SELL',;
      quantity: 5,;
      price: 720.12,;
      timestamp: Date.now() - 1800000,;
      status: 'closed',;
      profit: 80,;
      pnl: 80,;
      strategy: 'Profit target',;
    },;
  ];
  const mockBotStats: BotStats = {
    totalTrades: 120,;
    winRate: 72.5,;
    totalProfit: 15400,;
    totalPnL: 15400,;
    activeTrades: 2,;
    avgHoldTime: '2h 15m',;
    dailyPnL: 320,;
    sharpeRatio: 1.8,;
    maxDrawdown: 4.2,;
    accountBalance: 50000,;
  };
  const defaultStock = { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43 };

  return (;
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">;
      <div className="max-w-7xl mx-auto space-y-10">;
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">;
          <AIStockTips membershipLevel="pro" />;
          <AITradingAdvisor />;
        </div>;
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">;
          <AITradingSignals />;
          <AIInsights selectedStock="AAPL" />;
        </div>;
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">;
          <PortfolioOptimizer />;
          <TechnicalIndicators selectedStock={defaultStock} />;
        </div>;
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">;
          <TradeHistory recentTrades={mockTrades} botStats={mockBotStats} />;
          <HotStockTips />;
        </div>;
        <div>;
          <AIToolsDashboard />;
        </div>;
      </div>;
    </div>;
  );
}
