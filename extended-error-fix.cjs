#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 EXTENDED PROJECT ERROR FIXING');
console.log('==================================');

async function fixAllCorruptedFiles() {
  console.log('🧹 Fixing all remaining corrupted files...');
  
  // Fix error.tsx - needs "use client" directive
  const errorContent = `"use client";
import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-6">An error occurred while loading this page.</p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}`;

  // Fix page.tsx (homepage)
  const pageContent = `"use client";
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const aiStats = [
    { label: 'AI Trades Executed', value: '1,234,567,890' },
    { label: 'Avg. ROI (YTD)', value: '+38.2%' },
    { label: 'Active AI Agents', value: '50,000+' },
    { label: 'Success Rate', value: '94.7%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AlphaAI StockX
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Advanced AI-powered trading platform with quantum analytics
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {aiStats.map((stat, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/platform">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-lg px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Start Trading
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-gray-600 text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // Fix platform/page.tsx
  const platformContent = `"use client";
import React from 'react';
import Link from 'next/link';

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            AI Trading Platform
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience the future of algorithmic trading with our advanced AI system
          </p>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-400">Advanced market analysis using neural networks</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Auto Trading</h3>
                <p className="text-gray-400">Automated trading bots with risk management</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Portfolio Analytics</h3>
                <p className="text-gray-400">Real-time portfolio tracking and optimization</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/api/auth/signin">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-lg px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Sign In to Trade
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // Fix subscribe/page.tsx
  const subscribeContent = `"use client";
import React, { useState } from 'react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Add subscription logic here
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Subscribe to Updates
        </h1>
        <p className="text-gray-300 mb-8">
          Get the latest AI trading insights and platform updates
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}`;

  // Fix subscription/page.tsx
  const subscriptionContent = `"use client";
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
        'Advanced AI Analytics',
        'Multiple Trading Bots',
        'Risk Management Tools',
        'Priority Support',
        'API Access'
      ]
    },
    {
      name: 'Enterprise',
      price: 199,
      features: [
        'Custom AI Models',
        'Institutional Features',
        'Dedicated Support',
        'White Label Options',
        'Advanced Reporting'
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
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

  try {
    // Write all clean files
    fs.writeFileSync('app/error.tsx', errorContent);
    console.log('✅ Fixed error.tsx with "use client" directive');
    
    fs.writeFileSync('app/page.tsx', pageContent);
    console.log('✅ Fixed homepage page.tsx syntax');
    
    fs.writeFileSync('app/platform/page.tsx', platformContent);
    console.log('✅ Fixed platform/page.tsx syntax');
    
    fs.writeFileSync('app/subscribe/page.tsx', subscribeContent);
    console.log('✅ Fixed subscribe/page.tsx syntax');
    
    fs.writeFileSync('app/subscription/page.tsx', subscriptionContent);
    console.log('✅ Fixed subscription/page.tsx syntax');
    
    console.log('\\n🎉 All corrupted files have been recreated with clean syntax!');
    
  } catch (error) {
    console.error('❌ Error creating clean files:', error);
    process.exit(1);
  }
}

async function main() {
  await fixAllCorruptedFiles();
  console.log('\\n🚀 Extended project error fixing complete!');
}

main().catch(console.error);
