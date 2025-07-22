import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import { Button } from "../../../components/ui/button";
'use client';
import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaBolt,
  FaRobot,
  FaBrain,
  FaRocket,
  FaStar,
  FaGem,
} from 'react-icons/fa';

interface MembershipTiersProps {
  currentTier: string;
  onUpgrade: (tierId: string) => void;
}

interface TierFeatures {
  trades: string;
  executionSpeed: string;
  aiSignals: string;
  autoTrade: boolean | string;
  advancedOrders: boolean;
  realTimeData: boolean;
  portfolioValue: string;
  support: string;
  research: string;
  alerts: string;
  backtesting: boolean | string;
  apiAccess: boolean | string;
}

interface Tier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  popular: boolean;
  features: TierFeatures;
}

export default function MembershipTiers({ currentTier, onUpgrade }: MembershipTiersProps) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const tiers: Tier[] = [
    {
      id: 'free',
      name: 'Free Trader',
      description: 'Get started with basic trading',
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: FaStar,
      color: 'gray',
      features: {
        trades: '10 per day',
        executionSpeed: 'Standard (200-700ms)',
        aiSignals: '3 per day',
        autoTrade: false,
        advancedOrders: false,
        realTimeData: false,
        portfolioValue: 'Up to $1,000',
        support: 'Community',
        research: 'Basic',
        alerts: '5 per day',
        backtesting: false,
        apiAccess: false,
      },
      popular: false,
    },
    {
      id: 'basic',
      name: 'Alpha Trader',
      description: 'Enhanced trading with AI insights',
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      icon: FaBolt,
      color: 'blue',
      features: {
        trades: '100 per day',
        executionSpeed: 'Fast (50-150ms)',
        aiSignals: '10 per day',
        autoTrade: false,
        advancedOrders: true,
        realTimeData: true,
        portfolioValue: 'Up to $10,000',
        support: 'Email',
        research: 'Advanced',
        alerts: '25 per day',
        backtesting: 'Basic',
        apiAccess: false,
      },
      popular: false,
    },
    {
      id: 'pro',
      name: 'Alpha Wolf',
      description: 'Professional trading with automation',
      monthlyPrice: 99.99,
      yearlyPrice: 999.99,
      icon: FaRobot,
      color: 'purple',
      features: {
        trades: '500 per day',
        executionSpeed: 'Ultra-Fast (20-70ms)',
        aiSignals: '25 per day',
        autoTrade: true,
        advancedOrders: true,
        realTimeData: true,
        portfolioValue: 'Up to $100,000',
        support: 'Priority',
        research: 'Premium',
        alerts: '100 per day',
        backtesting: 'Advanced',
        apiAccess: 'Basic',
      },
      popular: true,
    },
    {
      id: 'ultimate',
      name: 'Alpha Apex',
      description: 'Ultimate trading machine with unlimited power',
      monthlyPrice: 299.99,
      yearlyPrice: 2999.99,
      icon: FaBolt,
      color: 'gold',
      features: {
        trades: 'Unlimited',
        executionSpeed: 'Lightning (5-15ms)',
        aiSignals: 'Unlimited',
        autoTrade: true,
        advancedOrders: true,
        realTimeData: true,
        portfolioValue: 'Unlimited',
        support: '24/7 Dedicated',
        research: 'Institutional',
        alerts: 'Unlimited',
        backtesting: 'Professional',
        apiAccess: 'Full',
      },
      popular: false,
    },
  ];

  const getPrice = (tier: Tier) => {
    return billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
  };

  const getSavings = (tier: Tier) => {
    if (tier.monthlyPrice === 0) return null;
    const monthly = tier.monthlyPrice * 12;
    const yearly = tier.yearlyPrice;
    const savings = monthly - yearly;
    const percentage = Math.round((savings / monthly) * 100);
    return { amount: savings.toFixed(2), percentage };
  };

  const getCardStyles = (tier: Tier) => {
    const isCurrentTier = currentTier === tier.id;
    const baseStyles = 'relative border-2 transition-all hover:scale-105';

    if (isCurrentTier) {
      return `${baseStyles} bg-gradient-to-b from-${tier.color}-500/20 to-${tier.color}-600/10 border-${tier.color}-500/50 shadow-lg shadow-${tier.color}-500/25`;
    }

    if (tier.popular) {
      return `${baseStyles} bg-gradient-to-b from-purple-500/10 to-pink-500/10 border-purple-500/50 shadow-lg shadow-purple-500/25`;
    }

    return `${baseStyles} bg-black/20 border-gray-700/50 hover:border-gray-600/50`;
  };

  const getButtonStyles = (tier: Tier) => {
    const isCurrentTier = currentTier === tier.id;

    if (isCurrentTier) {
      return 'bg-gray-700 text-gray-300 cursor-not-allowed';
    }

    switch (tier.id) {
      case 'free':
        return 'bg-gray-600 hover:bg-gray-700';
      case 'basic':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'pro':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600';
      case 'ultimate':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const featuresList = [
    { key: 'trades' as keyof TierFeatures, label: 'Daily Trades', icon: FaBolt },
    { key: 'executionSpeed' as keyof TierFeatures, label: 'Execution Speed', icon: FaBolt },
    { key: 'aiSignals' as keyof TierFeatures, label: 'AI Signals', icon: FaBrain },
    { key: 'autoTrade' as keyof TierFeatures, label: 'Auto-Trade Bot', icon: FaRobot },
    { key: 'advancedOrders' as keyof TierFeatures, label: 'Advanced Orders', icon: FaRocket },
    { key: 'realTimeData' as keyof TierFeatures, label: 'Real-time Data', icon: FaBolt },
    { key: 'portfolioValue' as keyof TierFeatures, label: 'Portfolio Limit', icon: FaGem },
    { key: 'support' as keyof TierFeatures, label: 'Support Level', icon: FaStar },
    { key: 'research' as keyof TierFeatures, label: 'Research Tools', icon: FaBrain },
    { key: 'alerts' as keyof TierFeatures, label: 'Price Alerts', icon: FaBolt },
    { key: 'backtesting' as keyof TierFeatures, label: 'Backtesting', icon: FaRocket },
    { key: 'apiAccess' as keyof TierFeatures, label: 'API Access', icon: FaBolt },
  ];

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Choose Your Alpha Level
        </h2>
        <p className="text-gray-400 text-center max-w-2xl">
          Unlock the power of AI-driven trading with lightning-fast execution and premium features
        </p>
        <div className="flex items-center space-x-4">
          <span
            className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}
          >
            Monthly
          </span>
          <Switch
            checked={billingCycle === 'yearly'}
            onCheckedChange={checked => setBillingCycle(checked ? 'yearly' : 'monthly')}
            className="data-[state=checked]:bg-purple-500"
          />
          <div className="flex items-center">
            <span
              className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}
            >
              Yearly
            </span>
            <Badge className="ml-2 bg-green-500 text-xs">Save up to 17%</Badge>
          </div>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map(tier => {
          const IconComponent = tier.icon;
          const isCurrentTier = currentTier === tier.id;
          const price = getPrice(tier);
          const savings = billingCycle === 'yearly' ? getSavings(tier) : null;

          return (
            <Card key={tier.id} className={getCardStyles(tier)}>
              {tier.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1">
                    <FaCrown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-${tier.color}-500/20`}>
                    <IconComponent className={`h-8 w-8 text-${tier.color}-400`} />
                  </div>
                </div>
                <CardTitle className="text-white text-xl">{tier.name}</CardTitle>
                <p className="text-gray-400 text-sm">{tier.description}</p>

                <div className="py-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {price === 0 ? 'Free' : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-400 ml-2">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && savings && (
                    <p className="text-sm text-green-400 mt-1">
                      Save ${savings.amount} ({savings.percentage}%)
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {featuresList.map(feature => {
                    const FeatureIcon = feature.icon;
                    const value = tier.features[feature.key];
                    const isBoolean = typeof value === 'boolean';

                    return (
                      <div key={feature.key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FeatureIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">{feature.label}</span>
                        </div>
                        <div className="flex items-center">
                          {isBoolean ? (
                            value ? (
                              <FaCheck className="h-4 w-4 text-green-400" />
                            ) : (
                              <FaTimes className="h-4 w-4 text-gray-500" />
                            )
                          ) : (
                            <span className="text-white text-sm font-medium">{String(value)}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  className={`w-full ${getButtonStyles(tier)} font-bold`}
                  onClick={() => onUpgrade(tier.id)}
                  disabled={isCurrentTier}
                >
                  {isCurrentTier
                    ? 'Current Plan'
                    : tier.id === 'free'
                      ? 'Get Started'
                      : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white text-center">Why Upgrade to Premium?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="p-4 bg-blue-500/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <FaBolt className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-bold">Lightning Speed</h3>
              <p className="text-gray-400 text-sm">
                Execute trades in as little as 5ms with our ultra-fast trading engine
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-purple-500/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <FaRobot className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-white font-bold">AI Automation</h3>
              <p className="text-gray-400 text-sm">
                Let our AI bot trade for you 24/7 with advanced algorithms
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-green-500/20 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <FaBrain className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-white font-bold">Smart Insights</h3>
              <p className="text-gray-400 text-sm">
                Get unlimited AI-powered trading signals and market predictions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
