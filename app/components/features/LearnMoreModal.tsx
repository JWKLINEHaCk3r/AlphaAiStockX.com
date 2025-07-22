import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { DialogTrigger } from "../../../components/ui/dialog";
import { DialogTitle } from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import { DialogContent } from "../../../components/ui/dialog";
import { Dialog } from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
'use client';
=======
import { DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

import React, { useState } from 'react';
import {
  CheckCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Shield,
  Zap,
  Target,
  BarChart3,
  Brain,
  ArrowRight,
  Star,
} from 'lucide-react';

interface FeatureDetails {
  overview: string;
  features: string[];
  benefits: string[];
  stats: {
    [key: string]: string | undefined;
  };
  pricing?: {
    basic: string;
    pro: string;
    enterprise: string;
  };
  testimonials?: {
    name: string;
    role: string;
    company: string;
    quote: string;
    rating: number;
  }[];
}

interface LearnMoreModalProps {
  feature: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    gradient: string;
    details: FeatureDetails;
  };
  children: React.ReactNode;
}

export default function LearnMoreModal({ feature, children }: LearnMoreModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border-slate-700">
        <DialogHeader className="border-b border-slate-700 pb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
              <div className="text-white">{feature.icon}</div>
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold text-white mb-2">
                {feature.title}
              </DialogTitle>
              <p className="text-slate-400 text-lg">{feature.desc}</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="stats">Performance</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">What is {feature.title}?</h3>
                <p className="text-slate-300 leading-relaxed mb-6">{feature.details.overview}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {feature.details.benefits.slice(0, 5).map((benefit, index) => (
                        <li key={index} className="text-slate-300 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                      Key Metrics
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(feature.details.stats)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-slate-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <Badge variant="outline" className="text-green-400 border-green-400/30">
                              {value}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.details.features.map((featureItem, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {featureItem.replace(
                            /^[🧠⚡📊🔄🎯📈🌐🔗🛡️⚖️🔍📋🔐🔑☁️⚛️🔬🚀🧬🌌🔮]+\s*/,
                            ''
                          )}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                          Advanced capability for enhanced trading performance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(feature.details.stats).map(([key, value]) => (
                <Card key={key} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{value}</div>
                    <div className="text-slate-400 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">Success Rate</span>
                      <span className="text-green-400 font-semibold">94.7%</span>
                    </div>
                    <Progress value={94.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">User Satisfaction</span>
                      <span className="text-green-400 font-semibold">98.2%</span>
                    </div>
                    <Progress value={98.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300">Market Coverage</span>
                      <span className="text-blue-400 font-semibold">87.5%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Starter</CardTitle>
                  <div className="text-3xl font-bold text-white">
                    $49<span className="text-lg text-slate-400">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Basic AI features
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />5 concurrent trades
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Email support
                    </li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">Professional</CardTitle>
                  <div className="text-3xl font-bold text-white">
                    $149<span className="text-lg text-slate-400">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Advanced AI features
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      50 concurrent trades
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Custom strategies
                    </li>
                  </ul>
                  <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Enterprise</CardTitle>
                  <div className="text-3xl font-bold text-white">Custom</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      All AI features
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Unlimited trades
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      24/7 dedicated support
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      White-label solution
                    </li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    30-Day Money-Back Guarantee
                  </h3>
                  <p className="text-slate-400">
                    Try {feature.title} risk-free. If you're not completely satisfied, get a full
                    refund within 30 days.
                  </p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm mt-2">
                    Rated 4.9/5 by 10,000+ traders worldwide
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="border-t border-slate-700 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
