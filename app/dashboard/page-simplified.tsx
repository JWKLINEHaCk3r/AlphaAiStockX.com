import { Card } from '../../components/ui/card';
import Navigation from 'components/ui/navigation/index.tsx';
<<<<<<< HEAD
import { Card } from '../../components/ui/card';
import { Tabs } from "../../components/ui/tabs";
import { Card } from "../../components/ui/card";
'use client';
=======
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

import React, { useState, useEffect, useMemo } from 'react';

// Component imports
import AnalyticsWidgets from './analytics/AnalyticsWidgets';
import AITradeCopilot from './algos/AITradeCopilot';
import AdvancedAIStrategies from './algos/AdvancedAIStrategies';
import HotStockTips from '../components/ai/HotStockTips';
import AutoTradeBotFuturistic from './algos/AutoTradeBotFuturistic';
import SportBeatBookieBot from './sportsbook/SportBeatBookieBot';
import PortfolioSummary from './portfolio/PortfolioSummary';
import TradeHistoryTable from './trade-history/TradeHistoryTable';

// Type definitions
interface MarketStock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface AIBeing {
  id: number;
  name: string;
  status: 'active' | 'idle' | 'analyzing';
  profits: number;
  accuracy: number;
  trades: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [marketData, setMarketData] = useState<MarketStock[]>([
    { symbol: 'AAPL', price: 175.43, change: 2.15, changePercent: 1.24 },
    { symbol: 'TSLA', price: 238.59, change: -5.23, changePercent: -2.15 },
    { symbol: 'GOOGL', price: 2847.23, change: 15.67, changePercent: 0.55 },
    { symbol: 'MSFT', price: 378.92, change: 8.45, changePercent: 2.28 },
    { symbol: 'NVDA', price: 456.78, change: 12.34, changePercent: 2.78 },
  ]);

  const [portfolioValue, setPortfolioValue] = useState(125000);
  const [dailyPnL, setDailyPnL] = useState(2850);
  const [activeSignals, setActiveSignals] = useState(12);

  const [aiBeings] = useState<AIBeing[]>([
    { id: 1, name: 'Alpha Prime', status: 'active', profits: 15420, accuracy: 89.5, trades: 145 },
    {
      id: 2,
      name: 'Beta Sentinel',
      status: 'analyzing',
      profits: 12350,
      accuracy: 92.1,
      trades: 123,
    },
    { id: 3, name: 'Gamma Nexus', status: 'active', profits: 18750, accuracy: 87.8, trades: 167 },
  ]);

  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Simulate real-time market updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev =>
        prev.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: stock.change + (Math.random() - 0.5) * 0.5,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.1,
        }))
      );

      setPortfolioValue(prev => prev + (Math.random() - 0.4) * 500);
      setDailyPnL(prev => prev + (Math.random() - 0.4) * 100);
      setActiveSignals(prev => Math.max(0, prev + Math.floor((Math.random() - 0.5) * 3)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Computed values
  const averageAccuracy = useMemo(() => {
    return aiBeings.reduce((sum, being) => sum + being.accuracy, 0) / aiBeings.length;
  }, [aiBeings]);

  const activeAICount = useMemo(() => {
    return aiBeings.filter(b => b.status === 'active').length;
  }, [aiBeings]);

  const handleVoiceToggle = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled && typeof speechSynthesis !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(
        'Voice announcements activated. Alpha AI is now speaking.'
      );
      speechSynthesis.speak(utterance);
    } else if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
  };

  const TabButton = ({ id, label, isActive }: { id: string; label: string; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        isActive
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  const Card = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`bg-black/30 border border-purple-500/20 rounded-xl p-6 shadow-xl backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );

  const StatCard = ({
    title,
    value,
    subtitle,
    color,
  }: {
    title: string;
    value: string;
    subtitle: string;
    color: string;
  }) => (
    <Card>
      <div className={`text-${color} text-sm mb-2 font-medium`}>{title}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </Card>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Alpha AI Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleVoiceToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isVoiceEnabled
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 border border-gray-600'
              }`}
            >
              <span className="text-lg">{isVoiceEnabled ? '🔊' : '🔇'}</span>
              Voice AI
            </button>

            <div className="bg-green-500/20 border border-green-400 px-3 py-2 rounded-lg text-green-400 font-medium">
              {activeAICount} AI Active
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8">
          <TabButton id="portfolio" label="Portfolio" isActive={activeTab === 'portfolio'} />
          <TabButton id="trade-history" label="Trades" isActive={activeTab === 'trade-history'} />
          <TabButton id="analytics" label="Analytics" isActive={activeTab === 'analytics'} />
          <TabButton id="algos" label="AI Strategies" isActive={activeTab === 'algos'} />
          <TabButton id="broker" label="Broker" isActive={activeTab === 'broker'} />
          <TabButton id="onboarding" label="Setup" isActive={activeTab === 'onboarding'} />
          <TabButton id="support" label="Support" isActive={activeTab === 'support'} />
          <TabButton id="sportsbook" label="SportsBet" isActive={activeTab === 'sportsbook'} />
        </div>

        {/* Content Areas */}
        <div className="space-y-6">
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-3xl font-bold mb-6 text-white">Your Portfolio</h2>
                <PortfolioSummary />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <StatCard
                    title="Portfolio Value"
                    value={`$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    subtitle={`${dailyPnL >= 0 ? '+' : ''}$${dailyPnL.toFixed(2)} today`}
                    color="green-400"
                  />

                  <StatCard
                    title="Active Signals"
                    value={activeSignals.toString()}
                    subtitle="Market opportunities"
                    color="blue-400"
                  />

                  <StatCard
                    title="AI Accuracy"
                    value={`${averageAccuracy.toFixed(1)}%`}
                    subtitle="Average across all AIs"
                    color="orange-400"
                  />
                </div>
              </Card>

              {/* Market Overview */}
              <Card>
                <h3 className="text-xl font-bold text-white mb-4">Market Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {marketData.map(stock => (
                    <div key={stock.symbol} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="font-bold text-white text-lg">{stock.symbol}</div>
                      <div className="text-2xl font-bold text-white">${stock.price.toFixed(2)}</div>
                      <div
                        className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {stock.change >= 0 ? '+' : ''}
                        {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'trade-history' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">Trade History</h2>
              <TradeHistoryTable />
            </Card>
          )}

          {activeTab === 'analytics' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">Analytics & Performance</h2>
              <AnalyticsWidgets />
            </Card>
          )}

          {activeTab === 'algos' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">AI Trading Strategies</h2>

              <div className="space-y-8">
                <AITradeCopilot />

                <div>
                  <h3 className="text-xl font-bold text-fuchsia-300 mb-4">
                    Advanced AI Strategies
                  </h3>
                  <AdvancedAIStrategies onSelect={(name: string) => alert(`Activated: ${name}`)} />
                </div>

                <HotStockTips />

                <AutoTradeBotFuturistic />
              </div>
            </Card>
          )}

          {activeTab === 'broker' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">Brokerage Connection</h2>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg">
                  Connect your brokerage account to enable live trading.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-green-400 text-xl font-bold mb-2">Alpaca Markets</h3>
                    <p className="text-gray-400 mb-4">Commission-free stock trading API</p>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                      Connect Alpaca
                    </button>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-blue-400 text-xl font-bold mb-2">Interactive Brokers</h3>
                    <p className="text-gray-400 mb-4">Professional trading platform</p>
                    <button className="w-full border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white py-3 rounded-lg font-medium transition-colors">
                      Connect IBKR
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'onboarding' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">Getting Started</h2>
              <div className="space-y-4">
                {[
                  { text: 'Account created', completed: true },
                  { text: 'Dashboard accessed', completed: true },
                  { text: 'Connect brokerage account', completed: false },
                  { text: 'Configure risk settings', completed: false },
                  { text: 'Activate AI trading strategies', completed: false },
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        step.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                      }`}
                    >
                      {step.completed ? '✓' : '○'}
                    </span>
                    <span className="text-white text-lg">{step.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'support' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">Support & Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-fuchsia-300">Quick Help</h3>
                  <div className="space-y-3">
                    {['Settings & Configuration', 'Security & Privacy', 'AI Strategy Guide'].map(
                      item => (
                        <button
                          key={item}
                          className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-fuchsia-300">Contact Us</h3>
                  <div className="space-y-3">
                    {['Live Chat Support', 'Email Support', 'Schedule Call'].map((item, index) => (
                      <button
                        key={item}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                          index === 0
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'sportsbook' && (
            <Card>
              <h2 className="text-3xl font-bold mb-6 text-white">SportBeatBookie AI</h2>
              <SportBeatBookieBot />
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
