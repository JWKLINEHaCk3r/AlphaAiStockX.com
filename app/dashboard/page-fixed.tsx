<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../components/ui/card';
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
'use client';
=======
import { TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@/components/ui/tabs';
import { TabsContent } from '@/components/ui/tabs';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CardTitle } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  BarChart3,
  Zap,
  TrendingUp,
  TrendingDown,
  Shield,
  Atom,
  Infinity,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  ChevronDown,
  Star,
  Rocket,
  Target,
  Globe,
  DollarSign,
  Activity,
  Eye,
  Settings,
  Volume2,
  VolumeX,
  Maximize,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Network,
  Layers,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Slider } from '../../components/ui/slider';

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

export default function Dashboard(): JSX.Element {
  const [marketData, setMarketData] = useState<MarketStock[]>([
    { symbol: 'AAPL', price: 175.43, change: 2.15, changePercent: 1.24 },
    { symbol: 'TSLA', price: 238.59, change: -5.23, changePercent: -2.15 },
    { symbol: 'GOOGL', price: 2847.23, change: 15.67, changePercent: 0.55 },
    { symbol: 'MSFT', price: 378.92, change: 8.45, changePercent: 2.28 },
    { symbol: 'NVDA', price: 456.78, change: 12.34, changePercent: 2.78 },
  ]);

  const [portfolioValue, setPortfolioValue] = useState<number>(125000);
  const [dailyPnL, setDailyPnL] = useState<number>(2850);
  const [activeSignals, setActiveSignals] = useState<number>(12);

  const [aiBeings, setAiBeings] = useState<AIBeing[]>([
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

  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('portfolio');

  // Simulate real-time market updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev: MarketStock[]) =>
        prev.map((stock: MarketStock) => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: stock.change + (Math.random() - 0.5) * 0.5,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.1,
        }))
      );

      setPortfolioValue((prev: number) => prev + (Math.random() - 0.4) * 500);
      setDailyPnL((prev: number) => prev + (Math.random() - 0.4) * 100);
      setActiveSignals((prev: number) => Math.max(0, prev + Math.floor((Math.random() - 0.5) * 3)));

      // Update AI beings activity
      setAiBeings((prev: AIBeing[]) =>
        prev.map((being: AIBeing) => ({
          ...being,
          status: Math.random() > 0.7 ? 'analyzing' : 'active',
          profits: being.profits + Math.random() * 50,
          accuracy: Math.min(100, being.accuracy + (Math.random() - 0.5) * 0.5),
          trades: being.trades + (Math.random() > 0.8 ? 1 : 0),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Voice announcements
  useEffect(() => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const interval = setInterval(() => {
        const messages = [
          'Alpha AI detected profitable opportunity in tech sector',
          '47 AI beings currently analyzing 2,847 market signals',
          'Portfolio up 2.3% today. Risk levels optimal.',
          'New arbitrage opportunity identified. Executing trade.',
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const utterance = new SpeechSynthesisUtterance(randomMessage);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isVoiceEnabled]);

  // Computed values
  const totalAIProfits = useMemo(() => {
    return aiBeings.reduce((sum: number, being: AIBeing) => sum + being.profits, 0);
  }, [aiBeings]);

  const averageAccuracy = useMemo(() => {
    return (
      aiBeings.reduce((sum: number, being: AIBeing) => sum + being.accuracy, 0) / aiBeings.length
    );
  }, [aiBeings]);

  const handleVoiceToggle = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        'Voice announcements activated. Alpha AI is now speaking.'
      );
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-fuchsia-400 drop-shadow-lg">Dashboard</h1>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleVoiceToggle}
            variant={isVoiceEnabled ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            Voice AI
          </Button>

          <Badge variant="outline" className="text-green-400 border-green-400">
            {aiBeings.filter(b => b.status === 'active').length} AI Active
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="algos">AI Strategies</TabsTrigger>
          <TabsTrigger value="broker">Broker</TabsTrigger>
          <TabsTrigger value="onboarding">Setup</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="sportsbook">SportsBet AI</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Portfolio</h2>
            <PortfolioSummary />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-black/20 border-purple-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400">Portfolio Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {dailyPnL >= 0 ? '+' : ''}${dailyPnL.toFixed(2)} today
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-blue-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400">Active Signals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{activeSignals}</div>
                  <div className="text-sm text-gray-400">Market opportunities</div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-orange-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-orange-400">AI Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{averageAccuracy.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Average across all AIs</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trade-history" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Trade History</h2>
            <TradeHistoryTable />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Analytics & Performance</h2>
            <AnalyticsWidgets />
          </div>
        </TabsContent>

        <TabsContent value="algos" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl space-y-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">AI Trading Strategies</h2>

            <div className="space-y-6">
              <AITradeCopilot />

              <div>
                <h3 className="text-xl font-bold text-fuchsia-300 mb-4">Advanced AI Strategies</h3>
                <AdvancedAIStrategies onSelect={(name: string) => alert(`Activated: ${name}`)} />
              </div>

              <HotStockTips />

              <AutoTradeBotFuturistic />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="broker" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Brokerage Connection</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Connect your brokerage account to enable live trading.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-black/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400">Alpaca Markets</CardTitle>
                    <CardDescription>Commission-free stock trading API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Connect Alpaca</Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Interactive Brokers</CardTitle>
                    <CardDescription>Professional trading platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Connect IBKR
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Getting Started</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Account created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Dashboard accessed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Connect brokerage account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Configure risk settings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Activate AI trading strategies</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">Support & Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-fuchsia-300">Quick Help</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings & Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security & Privacy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Strategy Guide
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-fuchsia-300">Contact Us</h3>
                <div className="space-y-2">
                  <Button className="w-full">Live Chat Support</Button>
                  <Button variant="outline" className="w-full">
                    Email Support
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sportsbook" className="space-y-4">
          <div className="glassmorphic rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">SportBeatBookie AI</h2>
            <SportBeatBookieBot />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
