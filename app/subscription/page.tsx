'use client';

import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: 49,
    features: [
      'AI Hot Stock Tips',
      'Basic AutoTrade Bot',
      'Sportsbook AI Picks',
      'Community Access',
    ],
  },
  {
    name: 'Pro',
    price: 149,
    features: [
      'All Starter Features',
      'Advanced AutoTrade Bot',
      'Smart Mode & Risk Controls',
      'Priority Support',
    ],
  },
  {
    name: 'Elite',
    price: 499,
    features: [
      'All Pro Features',
      'Full API Access',
      'White-Label Branding',
      'Early Access to New AI',
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <main className="max-w-4xl mx-auto p-8 glassmorphic rounded-xl shadow-2xl mt-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-fuchsia-400 mb-4 drop-shadow">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan: any) => (
          <div key={plan.name} className="bg-black/30 rounded-xl p-6 flex flex-col gap-4 shadow-lg">
            <h2 className="text-2xl font-bold text-fuchsia-300">{plan.name}</h2>
            <div className="text-4xl font-extrabold text-white mb-2">
              ${plan.price}
              <span className="text-fuchsia-400 text-lg font-normal">/mo</span>
            </div>
            <ul className="text-fuchsia-200 flex-1 space-y-2">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-2">
              Subscribe
            </button>
          </div>
        ))}
      </div>
      <div className="text-xs text-fuchsia-300 mt-6 italic">
        * All plans auto-renew monthly. Cancel anytime. Payment integration coming soon.
      </div>
    </main>
  );
}
