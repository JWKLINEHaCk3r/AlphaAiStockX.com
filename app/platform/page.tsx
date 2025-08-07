'use client';

import React from 'react';
import Link from 'next/link';

export default function Platform() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AlphaAI Trading Platform
          </h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Experience the future of trading with our AI-powered platform. Get real-time market insights,
            automated trading strategies, and portfolio optimization tools.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400">Advanced machine learning algorithms analyze market patterns</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <div className="text-purple-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Automated Trading</h3>
              <p className="text-gray-400">Execute trades automatically based on AI recommendations</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <div className="text-green-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div>
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
}
