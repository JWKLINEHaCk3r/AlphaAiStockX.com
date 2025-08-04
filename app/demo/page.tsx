'use client'; import React from 'react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            AI Trading Demo
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience the power of our AI trading system with live demos
          </p>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Demo Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Live Trading Simulation</h3>
                <p className="text-gray-400">See our AI make real-time trading decisions</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Portfolio Analysis</h3>
                <p className="text-gray-400">Watch AI optimize your portfolio in real-time</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                <p className="text-gray-400">See how AI calculates and manages risk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
