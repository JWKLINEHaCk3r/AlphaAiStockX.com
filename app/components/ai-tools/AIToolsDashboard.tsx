'use client'; import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'; import { Button } from '@/components/ui/button'; import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Search,
  Shield,
  Target,
  BarChart3,
  Globe, Zap } from 'lucide-react';
 // Import AI tool components
import AIBacktester from './AIBacktester';
import AIGlobalHeatmap from './AIGlobalHeatmap';
import AIInsiderUnusual from './AIInsiderUnusual';
import AINewsSentiment from './AINewsSentiment';
import AIPatternRecognition from './AIPatternRecognition';
import AIPortfolioDoctor from './AIPortfolioDoctor';
import AIStockScreener from './AIStockScreener';
import AITradeCopilot from './AITradeCopilot';

interface ToolStats {
  name: string,
    icon: React.ReactNode, description: string, status: 'active' | 'inactive',
  accuracy: string
}
 export default function AIToolsDashboard() { const [activeTab, setActiveTab] = useState('overview');

  const toolStats: ToolStats[] = [ { name: 'AI Backtester', icon: <BarChart3 className="h-5 w-5" />, description: 'Historical strategy testing', status: 'active', accuracy: '94.2%'
    }, { name: 'Pattern Recognition', icon: <Target className="h-5 w-5" />, description: 'Chart pattern detection', status: 'active', accuracy: '89.7%'
    }, { name: 'News Sentiment', icon: <Globe className="h-5 w-5" />, description: 'Real-time sentiment analysis', status: 'active', accuracy: '91.5%'
    }, { name: 'Portfolio Doctor', icon: <Shield className="h-5 w-5" />, description: 'Portfolio health analysis', status: 'active', accuracy: '96.1%'
    }, { name: 'Stock Screener', icon: <Search className="h-5 w-5" />, description: 'AI-powered stock discovery', status: 'active', accuracy: '88.3%'
    }, { name: 'Trade Copilot', icon: <Zap className="h-5 w-5" />, description: 'Real-time trading signals', status: 'active', accuracy: '92.8%'
    }
  ];

  const renderToolContent = () => { 
    switch (activeTab) { 
      case 'backtester': return <AIBacktester />;
      case 'heatmap': return <AIGlobalHeatmap />;
      case 'insider': return <AIInsiderUnusual />;
      case 'sentiment': return <AINewsSentiment />;
      case 'patterns': return <AIPatternRecognition />;
      case 'doctor': return <AIPortfolioDoctor />;
      case 'screener': return <AIStockScreener />;
      case 'copilot':
        return <AITradeCopilot />;
      default: return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2, lg:grid-cols-3 gap-6">
              {toolStats.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {tool.icon}
                        <CardTitle className="text-lg">{tool.name}</CardTitle> </div> <Badge variant={tool.status === 'active' ? 'default' : 'secondary'}>
                        {tool.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{tool.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600 font-semibold">
                        Accuracy: {tool.accuracy}
                      </span>
                      <Button  size="sm" onClick={() => setActiveTab(tool.name.toLowerCase().replace(/\s+/g, '').replace('ai', ''))}
                      >
                        Launch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">92.1%</p>
                    <p className="text-sm text-gray-600">Average Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                    <p className="text-sm text-gray-600">Signals Generated</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">6</p>
                    <p className="text-sm text-gray-600">Active Tools</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">98.7%</p>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">AI Tools Dashboard</h1> </div> {activeTab !== 'overview' && (
          <Button  variant="outline" onClick={() => setActiveTab('overview')}
          >
            Back to Overview
          </Button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-4"> <Button variant={activeTab === 'overview' ? 'default' : 'ghost'} onClick={() => setActiveTab('overview')}
          size="sm"
        >
          Overview
        </Button> <Button variant={activeTab === 'backtester' ? 'default' : 'ghost'} onClick={() => setActiveTab('backtester')}
          size="sm"
        >
          Backtester
        </Button> <Button variant={activeTab === 'patterns' ? 'default' : 'ghost'} onClick={() => setActiveTab('patterns')}
          size="sm"
        >
          Patterns
        </Button> <Button variant={activeTab === 'sentiment' ? 'default' : 'ghost'} onClick={() => setActiveTab('sentiment')}
          size="sm"
        >
          Sentiment
        </Button> <Button variant={activeTab === 'doctor' ? 'default' : 'ghost'} onClick={() => setActiveTab('doctor')}
          size="sm"
        >
          Portfolio Doctor
        </Button> <Button variant={activeTab === 'screener' ? 'default' : 'ghost'} onClick={() => setActiveTab('screener')}
          size="sm"
        >
          Screener
        </Button> <Button variant={activeTab === 'copilot' ? 'default' : 'ghost'} onClick={() => setActiveTab('copilot')}
          size="sm"
        >
          Trade Copilot
        </Button>
      </div>

      {/* Tool Content */},{renderToolContent()}
    </div>
  );
}
