'use client';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import PortfolioSummary from './portfolio/PortfolioSummary';
import TradeHistoryTable from './trade-history/TradeHistoryTable';
import AnalyticsWidgets from './analytics/AnalyticsWidgets';
import AITradeCopilot from './algos/AITradeCopilot';
import AdvancedAIStrategies from './algos/AdvancedAIStrategies';
import HotStockTips from '../components/ai/HotStockTips';
import AutoTradeBotFuturistic from './algos/AutoTradeBotFuturistic';
import SportBeatBookieBot from './sportsbook/SportBeatBookieBot';

export default function Dashboard() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-fuchsia-400 drop-shadow-lg">Dashboard</h1>
      <Tabs defaultValue="portfolio">
        <TabsList className="mb-4">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="algos">Algorithm Selection</TabsTrigger>
          <TabsTrigger value="broker">Brokerage Connection</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="sportsbook">SportBeatBookie AI</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">
          {/* Portfolio section - will show live holdings, value, and charts */}
          <div id="portfolio-section" className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Your Portfolio</h2>
            {/* Portfolio summary, live value, and chart will go here */}
            <PortfolioSummary />
          </div>
        </TabsContent>
        <TabsContent value="trade-history">
          {/* Trade history table and filters */}
          <div id="trade-history-section" className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Trade History</h2>
            {/* Trade log table will go here */}
            <TradeHistoryTable />
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          {/* Analytics widgets and charts */}
          <div id="analytics-section" className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Analytics</h2>
            {/* Performance, risk, and AI insights will go here */}
            <AnalyticsWidgets />
          </div>
        </TabsContent>
        <TabsContent value="algos">
          {/* Algorithm selection and management */}
          <div
            id="algos-section"
            className="glassmorphic rounded-xl p-6 shadow-xl flex flex-col gap-8"
          >
            <h2 className="text-2xl font-semibold mb-2">Algorithm Selection & AI Trading</h2>
            <AITradeCopilot />
            <div>
              <h3 className="text-xl font-bold text-fuchsia-300 mb-2">Advanced AI Strategies</h3>
              <AdvancedAIStrategies onSelect={name => alert(`Activated: ${name}`)} />
            </div>
            <HotStockTips />
            <AutoTradeBotFuturistic />
          </div>
        </TabsContent>
        <TabsContent value="broker">
          {/* Brokerage connection and status */}
          <div id="broker-section" className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Brokerage Connection</h2>
            {/* Connect to broker, show status, manage API keys */}
          </div>
        </TabsContent>
        <TabsContent value="onboarding">
          {/* Onboarding steps and progress */}
          <div id="onboarding-section" className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Onboarding</h2>
            {/* Stepper, checklist, and guidance */}
          </div>
        </TabsContent>
        <TabsContent value="support">
          {/* Support and contact options */}
          <div id="support-section" className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Support</h2>
            {/* FAQ, live chat, contact form */}
          </div>
        </TabsContent>
        <TabsContent value="sportsbook">
          <div
            id="sportsbook-section"
            className="glassmorphic rounded-xl p-6 shadow-xl flex flex-col gap-8"
          >
            <h2 className="text-2xl font-semibold mb-2">SportBeatBookie AI</h2>
            <SportBeatBookieBot />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
