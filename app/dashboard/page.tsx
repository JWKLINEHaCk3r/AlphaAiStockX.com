import React from 'react';
'use client';
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trading Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Monitor your AI-powered trading portfolio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Portfolio Value</h3>
            <div className="text-3xl font-bold text-green-400">$125,847.92</div>
            <div className="text-sm text-green-400">+1.02% Today</div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Active Trades</h3>
            <div className="text-3xl font-bold text-blue-400">12</div>
            <div className="text-sm text-gray-400">AI Managed</div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
            <div className="text-3xl font-bold text-purple-400">94.7%</div>
            <div className="text-sm text-gray-400">Last 30 Days</div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span>AI Bot bought 50 shares of AAPL</span>
              <span className="text-green-400">+$247.50</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span>Quantum Analyzer sold 25 shares of TSLA</span>
              <span className="text-green-400">+$1,205.75</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Neural Network bought 100 shares of NVDA</span>
              <span className="text-green-400">+$3,420.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
