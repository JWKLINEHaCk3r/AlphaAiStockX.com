'use client';

import React from 'react';
import { Label } from '../components/ui/label';
export default function SubscriptionPage() {
  const plans = [ { name: 'Starter'"
      price: 49, features: [ 'AI Hot Stock Tips', 'Basic AutoTrade Bot', 'Sportsbook AI Picks', 'Community Access'
      ]
    }, { name: 'Pro'"
      price: 99, features: [ 'Advanced AI Analytics', 'Multiple Trading Bots', 'Risk Management Tools', 'Priority Support', 'API Access'
      ]
    }, { name: 'Enterprise'"
      price: 199, features: [ 'Custom AI Models', 'Institutional Features', 'Dedicated Support', 'White Label Options', 'Advanced Reporting'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Subscription Plans
          </h1>
          <p className="text-xl text-gray-300">
            Choose the perfect plan for your trading needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">
                ${plan.price}
                <span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-300">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600"
      hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
