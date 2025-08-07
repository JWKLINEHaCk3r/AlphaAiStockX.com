'use client';

import React from 'react';

export default function SubscriptionPage() {
  const plans = [
    {
      name: 'Starter',
      price: 49,
      features: [
        'AI Hot Stock Tips',
        'Basic AutoTrade Bot',
        'Sportsbook AI Picks',
        'Community Access'
      ]
    },
    {
      name: 'Pro',
      price: 99,
      features: [
        'Advanced AI Analysis',
        'Premium AutoTrade Bot',
        'VIP Sportsbook Picks',
        'Priority Support',
        'Portfolio Analytics'
      ]
    },
    {
      name: 'Elite',
      price: 199,
      features: [
        'Elite AI Strategies',
        'Custom Trading Bots',
        'Exclusive Market Intel',
        'Personal Account Manager',
        'White-glove Service'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Select the perfect subscription plan for your trading goals.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-400 mb-6">
                  ${plan.price}<span className="text-lg text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
