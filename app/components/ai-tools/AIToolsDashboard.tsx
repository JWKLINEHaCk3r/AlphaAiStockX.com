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
import { TabsTrigger, TabsList, TabsContent, Tabs } from "../../../components/ui/tabs";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import React, { useState, useEffect } from 'react';
import { Brain, Zap, TrendingUp, BarChart3, Target, MessageCircle, PieChart, Upload, Settings, Activity, Sparkles, ArrowRight, Play } from 'lucide-react';
import AISignalBotDashboard from './AISignalBotDashboard';
import GPTTraderChatbot from './GPTTraderChatbot';
import IPORadarDashboard from './IPORadarDashboard';
import PortfolioOptimizerDashboard from './PortfolioOptimizerDashboard';
import MarketPredictorDashboard from './MarketPredictorDashboard';

interface AIToolStats {















  signalsGenerated: number;
  chatMessages: number;
  iposAnalyzed: number;
  portfoliosOptimized: number;
  predictionsAccuracy: number;















}

interface QuickAction {















  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;















}

export default function AIToolsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AIToolStats>({
    signalsGenerated: 0,;
    chatMessages: 0,;
    iposAnalyzed: 0,;
    portfoliosOptimized: 0,;
    predictionsAccuracy: 0,;
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    // Mock stats loading - in production, fetch from APIs;
    setStats({
      signalsGenerated: 127,;
      chatMessages: 89,;
      iposAnalyzed: 15,;
      portfoliosOptimized: 8,;
      predictionsAccuracy: 73.2,;
    });
  };

  const quickActions: QuickAction[] = [;
    {
      id: 'generate-signal',;
      title: 'Generate AI Signal',;
      description: 'Get instant buy/sell recommendations',;
      icon: <Zap className="h-6 w-6" />,;
      action: () => setActiveTab('signal-bot'),;
      badge: 'Popular',;
    },;
    {
      id: 'chat-trader',;
      title: 'Chat with AI Trader',;
      description: 'Ask trading questions and get insights',;
      icon: <MessageCircle className="h-6 w-6" />,;
      action: () => setActiveTab('gpt-trader'),;
    },;
    {
      id: 'analyze-ipo',;
      title: 'Analyze IPO',;
      description: 'Get IPO success predictions',;
      icon: <TrendingUp className="h-6 w-6" />,;
      action: () => setActiveTab('ipo-radar'),;
      badge: 'New',;
    },;
    {
      id: 'optimize-portfolio',;
      title: 'Optimize Portfolio',;
      description: 'AI-powered portfolio optimization',;
      icon: <PieChart className="h-6 w-6" />,;
      action: () => setActiveTab('portfolio-optimizer'),;
    },;
    {
      id: 'predict-market',;
      title: 'Market Prediction',;
      description: 'Upload chart for AI analysis',;
      icon: <Upload className="h-6 w-6" />,;
      action: () => setActiveTab('market-predictor'),;
    },;
  ];

  const aiTools = [;
    {
      id: 'signal-bot',;
      name: 'AI Signal Bot',;
      description: 'Real-time AI-powered buy/sell signals with sentiment analysis',;
      icon: <Zap className="h-8 w-8 text-blue-500" />,;
      status: 'Active',;
      lastUsed: '2 minutes ago',;
      accuracy: '89%',;
      features: ['Real-time alerts', 'Technical analysis', 'News sentiment', 'Risk scoring'],;
    },;
    {
      id: 'gpt-trader',;
      name: 'GPT-Trader Chatbot',;
      description: 'Conversational AI assistant for trading advice and education',;
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,;
      status: 'Active',;
      lastUsed: '5 minutes ago',;
      accuracy: '92%',;
      features: ['Natural language', 'Portfolio advice', 'Market education', 'Risk assessment'],;
    },;
    {
      id: 'ipo-radar',;
      name: 'AI IPO Radar',;
      description: 'Predictive analysis for upcoming IPO success probability',;
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,;
      status: 'Active',;
      lastUsed: '1 hour ago',;
      accuracy: '76%',;
      features: ['IPO scanning', 'Success prediction', 'Risk analysis', 'Market timing'],;
    },;
    {
      id: 'portfolio-optimizer',;
      name: 'Portfolio Optimizer',;
      description: 'Modern Portfolio Theory enhanced with AI insights',;
      icon: <PieChart className="h-8 w-8 text-orange-500" />,;
      status: 'Active',;
      lastUsed: '3 hours ago',;
      accuracy: '85%',;
      features: ['Risk optimization', 'Diversification', 'Rebalancing', 'Asset allocation'],;
    },;
    {
      id: 'market-predictor',;
      name: 'Market Predictor',;
      description: 'Chart pattern recognition with multi-modal AI analysis',;
      icon: <BarChart3 className="h-8 w-8 text-red-500" />,;
      status: 'Active',;
      lastUsed: '6 hours ago',;
      accuracy: '73%',;
      features: ['Chart analysis', 'Pattern recognition', 'Price prediction', 'Risk assessment'],;
    },;
  ];

  const renderOverview = () => (;
    <div className="space-y-6">;
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-600">Signals Generated</p>;
                <p className="text-2xl font-bold text-blue-600">{stats.signalsGenerated}</p>;
              </div>;
              <Zap className="h-8 w-8 text-blue-500" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-600">Chat Messages</p>;
                <p className="text-2xl font-bold text-green-600">{stats.chatMessages}</p>;
              </div>;
              <MessageCircle className="h-8 w-8 text-green-500" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-600">IPOs Analyzed</p>;
                <p className="text-2xl font-bold text-purple-600">{stats.iposAnalyzed}</p>;
              </div>;
              <TrendingUp className="h-8 w-8 text-purple-500" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-600">Portfolios Optimized</p>;
                <p className="text-2xl font-bold text-orange-600">{stats.portfoliosOptimized}</p>;
              </div>;
              <PieChart className="h-8 w-8 text-orange-500" />;
            </div>;
          </CardContent>;
        </Card>;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-600">Avg Accuracy</p>;
                <p className="text-2xl font-bold text-emerald-600">{stats.predictionsAccuracy}%</p>;
              </div>;
              <Target className="h-8 w-8 text-emerald-500" />;
            </div>;
          </CardContent>;
        </Card>;
      </div>;
      {/* Quick Actions */}
      <Card>;
        <CardHeader>;
          <CardTitle className="flex items-center">;
            <Sparkles className="h-5 w-5 mr-2" />;
            Quick Actions;
          </CardTitle>;
        </CardHeader>;
        <CardContent>;
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">;
            {quickActions.map(action => (;
              <div;
                key={action.id}
                onClick={action.action}
                className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-blue-300 group";
              >;
                <div className="flex items-start justify-between mb-3">;
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">;
                    {action.icon}
                  </div>;
                  {action.badge && (;
                    <Badge variant="secondary" className="text-xs">;
                      {action.badge}
                    </Badge>;
                  )}
                </div>;
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>;
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>;
                <div className="flex items-center text-blue-600 text-sm">;
                  <span>Try now</span>;
                  <ArrowRight className="h-4 w-4 ml-1" />;
                </div>;
              </div>;
            ))}
          </div>;
        </CardContent>;
      </Card>;
      {/* AI Tools Grid */}
      <Card>;
        <CardHeader>;
          <CardTitle className="flex items-center">;
            <Brain className="h-5 w-5 mr-2" />;
            AI Tools Overview;
          </CardTitle>;
        </CardHeader>;
        <CardContent>;
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
            {aiTools.map(tool => (;
              <div;
                key={tool.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow";
              >;
                <div className="flex items-start justify-between mb-4">;
                  <div className="flex items-center space-x-3">;
                    {tool.icon}
                    <div>;
                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>;
                      <p className="text-sm text-gray-600">{tool.description}</p>;
                    </div>;
                  </div>;
                  <Badge variant="outline" className="text-green-600 border-green-200">;
                    {tool.status}
                  </Badge>;
                </div>;
                <div className="grid grid-cols-2 gap-4 mb-4">;
                  <div>;
                    <p className="text-sm text-gray-500">Last Used</p>;
                    <p className="text-sm font-medium">{tool.lastUsed}</p>;
                  </div>;
                  <div>;
                    <p className="text-sm text-gray-500">Accuracy</p>;
                    <p className="text-sm font-medium text-green-600">{tool.accuracy}</p>;
                  </div>;
                </div>;
                <div className="mb-4">;
                  <p className="text-sm text-gray-500 mb-2">Features</p>;
                  <div className="flex flex-wrap gap-1">;
                    {tool.features.map((feature, index) => (;
                      <Badge key={index} variant="secondary" className="text-xs">;
                        {feature}
                      </Badge>;
                    ))}
                  </div>;
                </div>;
                <Button onClick={() => setActiveTab(tool.id)} className="w-full" variant="outline">;
                  <Play className="h-4 w-4 mr-2" />;
                  Open {tool.name}
                </Button>;
              </div>;
            ))}
          </div>;
        </CardContent>;
      </Card>;
    </div>;
  );

  return (;
    <div className="p-6">;
      <div className="mb-6">;
        <div className="flex items-center justify-between">;
          <div>;
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">;
              <Brain className="h-8 w-8 mr-3 text-blue-600" />;
              AI Trading Tools;
            </h1>;
            <p className="text-gray-600 mt-2">;
              Advanced AI-powered tools for professional trading and investment analysis;
            </p>;
          </div>;
          <div className="flex items-center space-x-4">;
            <Badge variant="outline" className="text-green-600 border-green-200">;
              <Activity className="h-3 w-3 mr-1" />;
              All Systems Active;
            </Badge>;
            <Button variant="outline" size="sm">;
              <Settings className="h-4 w-4 mr-2" />;
              Settings;
            </Button>;
          </div>;
        </div>;
      </div>;
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">;
        <TabsList className="grid w-full grid-cols-6">;
          <TabsTrigger value="overview" className="flex items-center">;
            <BarChart3 className="h-4 w-4 mr-2" />;
            Overview;
          </TabsTrigger>;
          <TabsTrigger value="signal-bot" className="flex items-center">;
            <Zap className="h-4 w-4 mr-2" />;
            Signal Bot;
          </TabsTrigger>;
          <TabsTrigger value="gpt-trader" className="flex items-center">;
            <MessageCircle className="h-4 w-4 mr-2" />;
            GPT-Trader;
          </TabsTrigger>;
          <TabsTrigger value="ipo-radar" className="flex items-center">;
            <TrendingUp className="h-4 w-4 mr-2" />;
            IPO Radar;
          </TabsTrigger>;
          <TabsTrigger value="portfolio-optimizer" className="flex items-center">;
            <PieChart className="h-4 w-4 mr-2" />;
            Portfolio;
          </TabsTrigger>;
          <TabsTrigger value="market-predictor" className="flex items-center">;
            <Target className="h-4 w-4 mr-2" />;
            Predictor;
          </TabsTrigger>;
        </TabsList>;
        <TabsContent value="overview" className="space-y-6">;
          {renderOverview()}
        </TabsContent>;
        <TabsContent value="signal-bot" className="space-y-6">;
          <AISignalBotDashboard />;
        </TabsContent>;
        <TabsContent value="gpt-trader" className="space-y-6">;
          <div className="h-[calc(100vh-200px)]">;
            <GPTTraderChatbot />;
          </div>;
        </TabsContent>;
        <TabsContent value="ipo-radar" className="space-y-6">;
          <IPORadarDashboard />;
        </TabsContent>;
        <TabsContent value="portfolio-optimizer" className="space-y-6">;
          <PortfolioOptimizerDashboard />;
        </TabsContent>;
        <TabsContent value="market-predictor" className="space-y-6">;
          <MarketPredictorDashboard />;
        </TabsContent>;
      </Tabs>;
    </div>;
  );
}
