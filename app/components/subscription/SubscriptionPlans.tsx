import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../../../components/ui/card';
<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../../../components/ui/card';
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardDescription } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
=======
import { Alert } from '@/components/ui/alert';
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  VisionModel,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
  RiskAnalysis,
  SectorPerformance,
  BacktestStrategy,
  AIWhiteLabelMetrics,
  MarketClassification,
  TradingRecommendation,
  StockAnalysis,
  RealtimeData,
  VolumeProfile,
  AIAnalysisComponents,
  CryptoData,
  DeFiProtocol,
  NFTCollection,
  UserProfile,
  ThemeOption,
  AccentColor,
  SubscriptionPlan,
  TradingStrategy,
  ScanResult,
  SiteDiagnostic,
  Alert,
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  SocialPost,
  DeepLearningModel,
  MarketPattern,
} from '../../types/trading-types';

('use client');
import React from 'react';

import { useState } from 'react';
<<<<<<< HEAD

=======
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import { X, Check, Star, Zap, Crown, Building } from 'lucide-react';

interface SubscriptionPlansProps {
  currentPlan: string;
  onSelectPlan: (plan: string) => void;
}

export default function SubscriptionPlans({ currentPlan, onSelectPlan }: SubscriptionPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      icon: Star,
      color: 'bg-slate-600',
      description: 'Get started with basic features',
      features: [
        'Basic education content',
        'Limited stock analysis (5/day)',
        'Community access',
        'Basic market data',
        'Email support',
      ],
      limitations: [
        'No real-time alerts',
        'Limited AI recommendations',
        'No advanced patterns',
        'No portfolio integration',
      ],
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      icon: Zap,
      color: 'bg-blue-600',
      description: 'Perfect for individual traders',
      popular: false,
      features: [
        'Full education access',
        'Advanced stock analysis (50/day)',
        'Email alerts',
        'Technical indicators',
        'Pattern recognition',
        'Priority support',
        'Mobile app access',
      ],
      limitations: ['No real-time alerts', 'Limited portfolio tools', 'No API access'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 79,
      icon: Crown,
      color: 'bg-purple-600',
      description: 'For serious traders and investors',
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited AI analysis',
        'Real-time alerts',
        'Advanced pattern recognition',
        'Portfolio optimization',
        'Risk management tools',
        'Custom watchlists',
        'Advanced charting',
        'Phone support',
      ],
      limitations: ['No API access', 'No custom models'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      icon: Building,
      color: 'bg-gold-600',
      description: 'For institutions and power users',
      popular: false,
      features: [
        'Everything in Premium',
        'API access',
        'Custom AI models',
        'White-label options',
        'Dedicated support',
        'Advanced compliance',
        'Team management',
        'Custom integrations',
        'SLA guarantee',
      ],
      limitations: [],
    },
  ];

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSelectPlan(planId);
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
          <p className="text-slate-400">Unlock the full power of AI-driven trading analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan: any) => (
            <Card
              key={plan.id}
              className={`relative bg-slate-700/50 border-2 transition-all ${
                plan.popular
                  ? 'border-purple-500 scale-105'
                  : currentPlan === plan.id
                    ? 'border-blue-500'
                    : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
              )}

              {currentPlan === plan.id && (
                <Badge className="absolute -top-3 right-4 bg-green-600">Current Plan</Badge>
              )}

              <CardHeader className="text-center">
                <div
                  className={`w-12 h-12 rounded-full ${plan.color} flex items-center justify-center mx-auto mb-3`}
                >
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-slate-400">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm">Included:</h4>
                  {plan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-slate-400 font-semibold text-sm">Not included:</h4>
                    {plan.limitations.map((limitation: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                  variant={currentPlan === plan.id ? 'outline' : 'default'}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading || currentPlan === plan.id}
                >
                  {loading && selectedPlan === plan.id
                    ? 'Processing...'
                    : currentPlan === plan.id
                      ? 'Current Plan'
                      : plan.price === 0
                        ? 'Get Started'
                        : 'Subscribe'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left text-white font-semibold p-3">Feature</th>
                  {plans.map((plan: any) => (
                    <th key={plan.id} className="text-center text-white font-semibold p-3">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Stock Analysis per Day',
                    values: ['5', '50', 'Unlimited', 'Unlimited'],
                  },
                  {
                    feature: 'Real-time Alerts',
                    values: [false, false, true, true],
                  },
                  {
                    feature: 'Advanced Patterns',
                    values: [false, true, true, true],
                  },
                  {
                    feature: 'Portfolio Tools',
                    values: [false, false, true, true],
                  },
                  {
                    feature: 'API Access',
                    values: [false, false, false, true],
                  },
                  {
                    feature: 'Custom AI Models',
                    values: [false, false, false, true],
                  },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="text-slate-300 p-3">{row.feature}</td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} className="text-center p-3">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="h-4 w-4 text-green-400 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-white">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Can I change plans anytime?</h4>
                <p className="text-slate-400 text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect
                  immediately.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-slate-400 text-sm">
                  Our Free plan gives you access to basic features. Premium plans offer 7-day free
                  trials.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-slate-400 text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Is my data secure?</h4>
                <p className="text-slate-400 text-sm">
                  Yes, we use enterprise-grade encryption and comply with all financial data
                  regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
