'use client';
import { Card } from "../../../components/ui/card";
import React, { useState } from 'react';
import { Card, CardHeader, CardContent,
      CardTitle }
    } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { TrendingUp, 
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Star,
  Trophy,
  Target,
  CheckCircle,
  ArrowRight, }
  Play, Rocket } from 'lucide-react';

interface PlatformFeature {
  id: string,
    title: string,
  description: string,
    icon: React.ReactNode;
  benefits: string[]
}

interface CompetitorComparison {
  feature: string,
    alphaAI: string | boolean,
  competitor1: string | boolean,
    competitor2: string | boolean
}
 export default function SuperiorTradingPlatform() { const [activeFeature, setActiveFeature] = useState<string>('ai-analysis');

  const platformFeatures: PlatformFeature[] = [ { id: 'ai-analysis', title: 'Advanced AI Analysis', description: 'Cutting-edge artificial intelligence provides deep market insights and predictions with 94% accuracy',
      icon: <Zap className="w-8 h-8" />, benefits: [ 'Real-time market sentiment analysis', 'Pattern recognition with neural networks', 'Predictive modeling for price movements', 'Risk assessment and portfolio optimization'
      ] },{ id: 'real-time-data', title: 'Lightning-Fast Data', description: 'Ultra-low latency market data feeds ensure you never miss a trading opportunity',
      icon: <BarChart3 className="w-8 h-8" />, benefits: [ 'Sub-millisecond data processing', 'Direct market data connections', 'Real-time price alerts and notifications', 'Historical data spanning 20+ years'
      ]
    }, { id: 'security', title: 'Bank-Grade Security', description: 'Military-grade encryption and security protocols protect your investments and data',
      icon: <Shield className="w-8 h-8" />, benefits: [ '256-bit SSL encryption', 'Two-factor authentication', 'Cold storage for digital assets', 'Regular security audits and compliance'
      ]
    }, { id: 'user-experience', title: 'Intuitive Interface', description: 'Clean modern interface designed for both beginners and professional traders',
      icon: <Users className="w-8 h-8" />, benefits: [ 'Customizable dashboards', 'Mobile-responsive design', 'One-click trading execution', 'Advanced charting tools'
      ]
    }
  ];

  const competitorComparison: CompetitorComparison[] = [ { feature: 'AI-Powered Analysis', alphaAI: '94% Accuracy', competitor1: 'Basic algorithms', competitor2: 'Manual analysis' },{ feature: 'Real-time Data', alphaAI: 'Sub-millisecond', competitor1: '1-2 seconds delay', competitor2: '5+ seconds delay' },{ feature: 'Mobile Trading',
      alphaAI: true,
      competitor1: true,
      competitor2: false },{ feature: 'Advanced Charting', alphaAI: '100+ indicators', competitor1: '20 indicators', competitor2: '10 indicators' },{ feature: 'API Access', alphaAI: 'Full REST & WebSocket', competitor1: 'Limited REST',
      competitor2: false },{ feature: '24/7 Support', alphaAI: true, competitor1: 'Business hours', competitor2: 'Email only' },{ feature: 'Commission-Free', alphaAI: 'All trades', competitor1: 'Limited trades', competitor2: '$9.99 per trade'
    }
  ];
 const renderComparisonValue = (value: string | boolean) => {   if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <span className="text-red-500">✗</span>
      );
      }
    return <span className="text-gray-800">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-16 h-16 text-yellow-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Superior Trading Platform
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Experience the future of trading with AI-powered insights
               lightning-fast execution
               and unmatched security
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover: from-blue-700,
      hover:to-purple-700 text-white text-lg px-8 py-4">
            <Rocket className="w-6 h-6 mr-2" />
            Start Trading Now
          </Button>
        </div>

        {/* Key Statistics */}
        <div className="grid md: grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
            <CardContent className="p-6 text-white text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">94.7%</h3>
              <p className="text-green-100">AI Prediction Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
            <CardContent className="p-6 text-white text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">&lt, 1ms</h3>
              <p className="text-blue-100">Order Execution</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0">
            <CardContent className="p-6 text-white text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">250K+</h3>
              <p className="text-purple-100">Active Traders</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 border-0">
            <CardContent className="p-6 text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">+127%</h3>
              <p className="text-yellow-100">Avg. Annual Return</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose AlphaAI StockX?
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feature Selection */}
            <div className="space-y-4">
              {platformFeatures.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 ${ activeFeature === feature.id  ? 'border-blue-500 bg-blue-500/10'  : 'border-gray-600 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4"> <div className={`w-16 h-16 rounded-full flex items-center justify-center ${ activeFeature === feature.id ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {feature.description}
                        </p>
                      </div> <ArrowRight className={`w-6 h-6 ${ activeFeature === feature.id ? 'text-blue-400' : 'text-gray-400'
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature Details */}
            <Card className="bg-white/5 border-blue-500">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  {platformFeatures.find(f => f.id === activeFeature)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  {platformFeatures.find(f => f.id === activeFeature)?.description}
                </p>
                
                <h4 className="text-white font-semibold mb-4">Key Benefits:</h4>
                <ul className="space-y-3">
                  {platformFeatures.find(f => f.id === activeFeature)?.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-6">
                  <Play className="w-4 h-4 mr-2" />
                  See Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Competitor Comparison */}
        <Card className="mb-16 bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Platform Comparison
            </CardTitle>
            <p className="text-center text-gray-600">
              See how AlphaAI StockX stacks up against the competition
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-4 px-4 font-semibold text-gray-800">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-800">
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="w-5 h-5" />
                        AlphaAI StockX
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600">
                      Competitor A
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600">
                      Competitor B
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-800">
                        {item.feature}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <Badge className="bg-blue-600">
                            {renderComparisonValue(item.alphaAI)}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderComparisonValue(item.competitor1)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {renderComparisonValue(item.competitor2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-12 text-white text-center">
            <Target className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Superior Trading?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful traders who have chosen AlphaAI StockX for its unmatched 
              performance, security
               and cutting-edge AI technology.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover: bg-gray-100 font-semibold px-8 py-4 text-lg">
                <Rocket className="w-6 h-6 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-white text-white, hover:bg-white/10 px-8 py-4 text-lg">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
