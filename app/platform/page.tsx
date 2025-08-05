import React from 'react';
"use client";


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
            <div className="grid grid-cols-1 md: grid-cols-3 gap-6">
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
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-lg px-8 py-4 rounded-lg, hover:from-blue-600"
      hover:to-purple-700 transition-all duration-300">
                Sign In to Trade
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
