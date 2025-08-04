'use client';

import React, { useState, useEffect } from 'react'; import Link from 'next/link';

export default function HomePage() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
   const aiStats = [ { label: 'AI Trades Executed', value: '1,234,567,890' }, { label: 'Avg. ROI (YTD)', value: '+38.2%' }, { label: 'Active AI Agents', value: '47' }, { label: 'Quantum Backtests', value: '8,900,000+' }, { label: 'Uptime', value: '99.9999%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex(i => (i + 1) % aiStats.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [aiStats.length]);

  const features = [ { title: 'AI Trading Bots', description: 'Advanced algorithms that trade 24/7', icon: '🤖'
    }, { title: 'Quantum Analytics', description: 'Real-time market analysis with quantum computing', icon: '⚛️'
    }, { title: 'Risk Management', description: 'AI-powered portfolio protection', icon: '🛡️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AlphaAI StockX
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The future of AI-powered trading is here. Join thousands of traders using advanced neural networks to maximize returns.
          </p>
          
          <div className="flex flex-col sm: flex-row gap-4 justify-center mb-16">
            <Link href="/platform">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-lg px-8 py-4 rounded-lg, hover:from-blue-600,
      hover: to-purple-700 transition-all duration-300">
                Start Trading
              </button>
            </Link>
            <Link href="/subscription">
              <button className="border border-gray-600 text-lg px-8 py-4 rounded-lg, hover:bg-gray-800 transition-all duration-300">
                View Plans
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
          {aiStats.map((stat, index) => (
            <div 
              key={index}  className={`bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center transition-all duration-500 ${ index === currentStatIndex ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-700 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your trading?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the AI trading revolution and let our advanced algorithms work for you.
          </p>
          <Link href="/contact">
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-lg px-8 py-4 rounded-lg hover: from-green-600,
      hover:to-blue-600 transition-all duration-300">
              Get Started Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
