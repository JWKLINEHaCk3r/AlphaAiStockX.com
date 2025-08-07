import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AlphaAI StockX
          </h1>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            The future of trading is here. AI-powered insights, automated strategies, 
            and real-time market analysis in one revolutionary platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/platform" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-lg transition-all duration-300 font-semibold">
              Explore Platform
            </Link>
            <Link href="/subscribe" className="border-2 border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white text-lg px-8 py-4 rounded-lg transition-all duration-300 font-semibold">
              Get Started
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">AI Trading Bot</h3>
              <p className="text-gray-400">Automated trading with machine learning algorithms</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Market Analysis</h3>
              <p className="text-gray-400">Real-time insights and predictive analytics</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Portfolio Manager</h3>
              <p className="text-gray-400">Intelligent portfolio optimization and risk management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
