'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Crown,
  Rocket,
  Star,
  TrendingUp,
  Users,
  Shield,
  Globe,
  ChevronRight,
  Check,
} from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  originalPrice?: number;
  icon: React.ReactNode;
  badge?: string;
  features: string[];
  color: string;
  popular?: boolean;
}

export default function DynamicPricingGrid() {
  const [isYearly, setIsYearly] = useState(false);
  const [animatedPrices, setAnimatedPrices] = useState<Record<string, number>>({});

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: isYearly ? 29 : 39,
      originalPrice: isYearly ? 49 : 59,
      icon: <Zap className="h-6 w-6" />,
      badge: 'Most Popular',
      color: 'from-blue-500 to-purple-600',
      popular: true,
      features: [
        'Basic AI Trading Signals',
        'Real-time Market Data',
        '3 Portfolio Strategies',
        'Email Support',
        'Basic Analytics',
        'Mobile App Access',
      ],
    },
    {
      name: 'Professional',
      price: isYearly ? 79 : 99,
      originalPrice: isYearly ? 119 : 149,
      icon: <Crown className="h-6 w-6" />,
      badge: 'Best Value',
      color: 'from-purple-500 to-pink-600',
      features: [
        'Advanced AI Trading Bot',
        'Quantum Analysis Engine',
        'Unlimited Strategies',
        'Priority Support',
        'Advanced Analytics',
        'API Access',
        'Risk Management Tools',
        'Backtesting Suite',
      ],
    },
    {
      name: 'Enterprise',
      price: isYearly ? 199 : 249,
      originalPrice: isYearly ? 299 : 349,
      icon: <Rocket className="h-6 w-6" />,
      badge: 'Ultimate Power',
      color: 'from-orange-500 to-red-600',
      features: [
        'Full AI Trading Arsenal',
        'Custom Model Training',
        'Institutional Features',
        'Dedicated Support',
        'White-label Solutions',
        'Custom Integrations',
        'Advanced Risk Controls',
        'Multi-Account Management',
        'Priority Execution',
        'Custom Reporting',
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrices: Record<string, number> = {};
      pricingTiers.forEach(tier => {
        // Simulate small price fluctuations for dynamic effect
        const fluctuation = (Math.random() - 0.5) * 2;
        newPrices[tier.name] = tier.price + fluctuation;
      });
      setAnimatedPrices(newPrices);

      // Reset after animation
      setTimeout(() => setAnimatedPrices({}), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [isYearly]);

  const getDisplayPrice = (tier: PricingTier) => {
    return animatedPrices[tier.name] ? Math.round(animatedPrices[tier.name]) : tier.price;
  };

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <span className={`text-lg ${!isYearly ? 'text-white font-bold' : 'text-gray-400'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            isYearly ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              isYearly ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-lg ${isYearly ? 'text-white font-bold' : 'text-gray-400'}`}>
          Yearly
        </span>
        {isYearly && <Badge className="bg-green-500 text-white animate-pulse">Save 40%!</Badge>}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => (
          <Card
            key={tier.name}
            className={`relative overflow-hidden transition-all duration-500 hover:scale-105 ${
              tier.popular
                ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50'
                : 'bg-black/20 border-gray-700/50 hover:border-purple-500/30'
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-1 -right-1 z-10">
                <Badge className={`bg-gradient-to-r ${tier.color} text-white px-3 py-1 shadow-lg`}>
                  <Star className="h-3 w-3 mr-1" />
                  {tier.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center space-y-4">
              <div className={`mx-auto p-3 rounded-full bg-gradient-to-r ${tier.color} w-fit`}>
                {tier.icon}
              </div>

              <CardTitle className="text-2xl font-bold text-white">{tier.name}</CardTitle>

              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold text-white">${getDisplayPrice(tier)}</span>
                  <div className="text-left">
                    <div className="text-gray-400">/{isYearly ? 'year' : 'month'}</div>
                    {tier.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${tier.originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {tier.originalPrice && (
                  <div className="text-green-400 text-sm font-semibold">
                    Save ${tier.originalPrice - tier.price} {isYearly ? 'annually' : 'monthly'}!
                  </div>
                )}
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-bold py-3`}
              >
                Get Started
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3 text-gray-300">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Setup time:</span>
                  <span className="text-green-400">
                    {index === 0 ? '< 5 min' : index === 1 ? '< 10 min' : '< 30 min'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mt-1">
                  <span>Users:</span>
                  <span className="text-purple-400">
                    {index === 0 ? '10K+' : index === 1 ? '5K+' : '1K+'} active
                  </span>
                </div>
              </div>
            </CardContent>

            {/* Animated background effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-5 animate-pulse`}
            />
          </Card>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-700/30">
        <div className="text-center space-y-2">
          <Users className="h-8 w-8 text-purple-400 mx-auto" />
          <div className="text-2xl font-bold text-white">16K+</div>
          <div className="text-sm text-gray-400">Active Traders</div>
        </div>
        <div className="text-center space-y-2">
          <TrendingUp className="h-8 w-8 text-green-400 mx-auto" />
          <div className="text-2xl font-bold text-white">87%</div>
          <div className="text-sm text-gray-400">Success Rate</div>
        </div>
        <div className="text-center space-y-2">
          <Shield className="h-8 w-8 text-blue-400 mx-auto" />
          <div className="text-2xl font-bold text-white">$50M+</div>
          <div className="text-sm text-gray-400">Protected Assets</div>
        </div>
        <div className="text-center space-y-2">
          <Globe className="h-8 w-8 text-orange-400 mx-auto" />
          <div className="text-2xl font-bold text-white">24/7</div>
          <div className="text-sm text-gray-400">Global Markets</div>
        </div>
      </div>
    </div>
  );
}
