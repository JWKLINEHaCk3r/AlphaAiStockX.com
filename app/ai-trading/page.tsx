'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Bot, 
  Activity, 
  DollarSign,
  Clock,
  Users,
  Shield,
  Rocket,
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Star,
  Cpu,
  Database,
  Globe,
  Eye,
  Atom
} from 'lucide-react';
import Link from 'next/link';
import LiveAITradingDashboard from '@/app/components/trading/LiveAITradingDashboard';
import AutomatedTradingBotManager from '@/app/components/trading/AutomatedTradingBotManager';

const aiAgents = [
  {
    name: 'Alpha Signal Bot',
    description: 'Advanced pattern recognition for high-probability trading signals',
    accuracy: 94.7,
    trades: '1.2M+',
    status: 'active',
    color: 'blue'
  },
  {
    name: 'Quantum Portfolio AI',
    description: 'Dynamic portfolio optimization using quantum-inspired algorithms',
    accuracy: 92.3,
    trades: '850K+',
    status: 'active',
    color: 'purple'
  },
  {
    name: 'Risk Guardian',
    description: 'Real-time risk assessment and position sizing optimization',
    accuracy: 96.1,
    trades: '2.1M+',
    status: 'active',
    color: 'red'
  },
  {
    name: 'Market Sentiment AI',
    description: 'Social media and news sentiment analysis for market timing',
    accuracy: 89.4,
    trades: '650K+',
    status: 'active',
    color: 'green'
  },
  {
    name: 'Execution Optimizer',
    description: 'Smart order routing for optimal trade execution',
    accuracy: 98.2,
    trades: '3.5M+',
    status: 'active',
    color: 'orange'
  },
  {
    name: 'Arbitrage Hunter',
    description: 'Cross-exchange arbitrage opportunity detection',
    accuracy: 91.8,
    trades: '450K+',
    status: 'active',
    color: 'cyan'
  }
];

const performanceMetrics = [
  { label: 'Total Return (YTD)', value: '+38.2%', change: '+5.1%', trend: 'up' },
  { label: 'Sharpe Ratio', value: '2.14', change: '+0.23', trend: 'up' },
  { label: 'Max Drawdown', value: '-8.3%', change: '-1.2%', trend: 'down' },
  { label: 'Win Rate', value: '72.6%', change: '+2.8%', trend: 'up' },
  { label: 'Avg Trade Duration', value: '4.2h', change: '-0.8h', trend: 'down' },
  { label: 'Risk-Adjusted Alpha', value: '0.18', change: '+0.04', trend: 'up' }
];

const tradingStrategies = [
  {
    name: 'Momentum Breakout',
    description: 'Captures strong directional moves with AI-confirmed breakouts',
    performance: '+42.1%',
    trades: '1,247',
    winRate: '68.5%',
    active: true
  },
  {
    name: 'Mean Reversion',
    description: 'Exploits temporary price dislocations in trending markets',
    performance: '+28.7%',
    trades: '2,156',
    winRate: '74.2%',
    active: true
  },
  {
    name: 'Pair Trading',
    description: 'Market-neutral strategies based on statistical relationships',
    performance: '+19.3%',
    trades: '891',
    winRate: '76.8%',
    active: true
  },
  {
    name: 'News Event Trading',
    description: 'AI-powered reaction to earnings, economic data, and events',
    performance: '+51.6%',
    trades: '423',
    winRate: '82.1%',
    active: true
  }
];

export default function AITradingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setIsLive(!isLive);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Trading Engine</h1>
                <p className="text-slate-400">47 Active AI Agents • $2.3B+ Under Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${isLive ? 'bg-green-500' : 'bg-slate-500'} text-white`}>
                <div className={`w-2 h-2 rounded-full bg-white mr-2 ${isLive ? 'animate-pulse' : ''}`} />
                {isLive ? 'LIVE' : 'UPDATING'}
              </Badge>
              <Link href="/platform">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">{metric.label}</span>
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.change}
                    <TrendingUp className={`ml-1 h-3 w-3 ${
                      metric.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Trading
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Strategies
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-400" />
                    AI Engine Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Active Agents</span>
                    <Badge className="bg-blue-500 text-white">47</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Processing Speed</span>
                    <span className="text-green-400 font-mono">2.3ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Daily Signals</span>
                    <span className="text-white font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Success Rate</span>
                    <span className="text-green-400 font-semibold">94.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Live Trading Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Today's P&L</span>
                    <span className="text-green-400 font-semibold">+$47,823</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Active Positions</span>
                    <span className="text-white font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Portfolio Value</span>
                    <span className="text-white font-semibold">$2.34M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Available Buying Power</span>
                    <span className="text-blue-400 font-semibold">$856K</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Recent AI Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['AAPL BUY Signal - 95.2% Confidence', 'TSLA SELL Signal - 87.6% Confidence', 'NVDA BUY Signal - 92.1% Confidence'].map((signal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-white">{signal}</span>
                      <Badge className="bg-green-500 text-white">ACTIVE</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Trading Tab */}
          <TabsContent value="live" className="space-y-6">
            <LiveAITradingDashboard />
          </TabsContent>

          {/* AI Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiAgents.map((agent, index) => (
                <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                      <Badge className={`bg-${agent.color}-500 text-white`}>
                        {agent.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-300 text-sm">{agent.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-400 text-sm">Accuracy</span>
                          <span className="text-green-400 font-semibold">{agent.accuracy}%</span>
                        </div>
                        <Progress value={agent.accuracy} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Total Trades</span>
                        <span className="text-white font-semibold">{agent.trades}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Strategies Tab */}
          <TabsContent value="strategies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tradingStrategies.map((strategy, index) => (
                <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{strategy.name}</CardTitle>
                      <Badge className={strategy.active ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}>
                        {strategy.active ? 'ACTIVE' : 'PAUSED'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-300">{strategy.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-green-400 font-bold text-lg">{strategy.performance}</div>
                        <div className="text-slate-400 text-sm">Performance</div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">{strategy.trades}</div>
                        <div className="text-slate-400 text-sm">Trades</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-bold text-lg">{strategy.winRate}</div>
                        <div className="text-slate-400 text-sm">Win Rate</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300">
                        Configure
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                        Optimize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <Activity className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Advanced Analytics Dashboard</h3>
              <p className="text-slate-400 mb-6">Detailed performance analytics, risk metrics, and AI model insights</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Eye className="mr-2 h-4 w-4" />
                View Full Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-500/20 mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start AI Trading?</h3>
            <p className="text-slate-300 mb-6">
              Join thousands of traders using our AI technology to maximize their returns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/platform">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
