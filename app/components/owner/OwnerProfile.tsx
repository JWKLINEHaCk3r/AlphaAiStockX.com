'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Crown,
  Infinity,
  Zap,
  Shield,
  Brain,
  Bot,
  TrendingUp,
  Users,
  Settings,
  Star,
  Sparkles,
  Target,
  Award,
  Gem,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
  joinDate: string;
}

interface OwnerProfileProps {
  user: User;
  onSwitchToAdmin: () => void;
}

export default function OwnerProfile({ user, onSwitchToAdmin }: OwnerProfileProps) {
  const [activeFeatures, setActiveFeatures] = useState({
    ultraFastTrading: true,
    aiAutoPilot: true,
    unlimitedSignals: true,
    premiumSupport: true,
    advancedAnalytics: true,
    customStrategies: true,
    whiteLabel: true,
    apiAccess: true,
  });

  const ownerFeatures = [
    {
      icon: Infinity,
      title: 'Unlimited Everything',
      description: 'No limits on trades, signals, or features',
      status: 'active',
      color: 'text-yellow-400',
    },
    {
      icon: Zap,
      title: 'Lightning Speed (1ms)',
      description: 'Fastest execution speeds available',
      status: 'active',
      color: 'text-blue-400',
    },
    {
      icon: Brain,
      title: 'AI Autopilot',
      description: 'Fully automated AI trading with custom models',
      status: 'active',
      color: 'text-purple-400',
    },
    {
      icon: Bot,
      title: 'Custom Trading Bots',
      description: 'Build and deploy unlimited custom bots',
      status: 'active',
      color: 'text-green-400',
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 dedicated support team',
      status: 'active',
      color: 'text-red-400',
    },
    {
      icon: Star,
      title: 'White Label Access',
      description: 'Brand the platform as your own',
      status: 'active',
      color: 'text-orange-400',
    },
    {
      icon: Target,
      title: 'Advanced Analytics',
      description: 'Deep insights and custom reporting',
      status: 'active',
      color: 'text-cyan-400',
    },
    {
      icon: Gem,
      title: 'API Access',
      description: 'Full API access for integrations',
      status: 'active',
      color: 'text-pink-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Owner Header */}
      <Card className="bg-gradient-to-r from-yellow-900/90 via-orange-900/90 to-red-900/90 border-yellow-500/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Crown size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Infinity size={12} className="text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    OWNER ACCESS
                  </h2>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 animate-bounce">
                    <Sparkles size={12} className="mr-1" />
                    UNLIMITED
                  </Badge>
                </div>
                <p className="text-gray-300">Supreme Alpha Wolf • Platform Owner</p>
                <p className="text-sm text-yellow-400 font-semibold">
                  Free Forever • All Features Unlocked
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={onSwitchToAdmin}
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </Button>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-400">∞</p>
                <p className="text-xs text-gray-400">Unlimited Balance</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Owner Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Infinity size={24} className="text-yellow-400 mx-auto mb-2 animate-pulse" />
            <p className="text-lg font-bold text-yellow-400">∞</p>
            <p className="text-xs text-gray-400">Daily Trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Zap size={24} className="text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-400">1ms</p>
            <p className="text-xs text-gray-400">Execution Speed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Brain size={24} className="text-green-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-400">∞</p>
            <p className="text-xs text-gray-400">AI Signals</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Award size={24} className="text-purple-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-400">100%</p>
            <p className="text-xs text-gray-400">All Features</p>
          </CardContent>
        </Card>
      </div>

      {/* Owner Features */}
      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">
          <TabsTrigger value="features" className="data-[state=active]:bg-yellow-500/20">
            <Star className="h-4 w-4 mr-2" />
            Premium Features
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-yellow-500/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Advanced Analytics
          </TabsTrigger>
          <TabsTrigger value="management" className="data-[state=active]:bg-yellow-500/20">
            <Settings className="h-4 w-4 mr-2" />
            Platform Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownerFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 border-yellow-500/30 backdrop-blur-xl hover:border-yellow-400/50 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                          <IconComponent size={24} className={feature.color} />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{feature.title}</h3>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600">
                        <Sparkles size={12} className="mr-1" />
                        ACTIVE
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-900/60 to-black/60 border-yellow-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 text-yellow-400" />
                  Owner Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-gray-300">Total Profit</span>
                    <span className="text-green-400 font-bold text-xl">+$2,847,392</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <span className="text-gray-300">Win Rate</span>
                    <span className="text-blue-400 font-bold text-xl">94.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <span className="text-gray-300">Profit Factor</span>
                    <span className="text-purple-400 font-bold text-xl">8.42</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <span className="text-gray-300">Max Drawdown</span>
                    <span className="text-yellow-400 font-bold text-xl">-2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/60 to-black/60 border-yellow-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 text-yellow-400" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <span className="text-gray-300">Total Users</span>
                    <span className="text-blue-400 font-bold text-xl">15,847</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-gray-300">Monthly Revenue</span>
                    <span className="text-green-400 font-bold text-xl">$1.2M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <span className="text-gray-300">Active Subscriptions</span>
                    <span className="text-purple-400 font-bold text-xl">12,341</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                    <span className="text-gray-300">Platform Uptime</span>
                    <span className="text-orange-400 font-bold text-xl">99.97%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-gray-900/60 to-black/60 border-yellow-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  <Shield className="mx-auto mb-2 text-red-400" size={32} />
                  Admin Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={onSwitchToAdmin}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                >
                  Access Admin Panel
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/60 to-black/60 border-yellow-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  <Settings className="mx-auto mb-2 text-blue-400" size={32} />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Configure Platform
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/60 to-black/60 border-yellow-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  <TrendingUp className="mx-auto mb-2 text-green-400" size={32} />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
