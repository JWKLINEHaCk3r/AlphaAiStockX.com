'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MarketData {
  portfolioValue: string;
  dayChange: string;
  positions: number;
  cashBalance: string;
  symbols: string[];
  prices: number[];
  changes: number[];
  performance: number[];
}

export default function AITradingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [marketData, setMarketData] = useState<MarketData | null>(null)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false)
      setMarketData({
        portfolioValue: '$125,430.50',
        dayChange: '+2.34%',
        positions: 12,
        cashBalance: '$8,245.30',
        symbols: ['AAPL', 'GOOGL', 'MSFT', 'TSLA'],
        prices: [175.84, 2831.23, 378.85, 248.50],
        changes: [2.45, -15.32, 4.22, -3.15],
        performance: [12.5, -2.3, 8.7, 15.2]
      })
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading AI Trading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            🤖 AI Trading Dashboard
          </h1>
          <p className="text-gray-400">Real-time AI-powered trading insights and analytics</p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-white">$125,430.50</p>
                    <p className="text-green-400">+$2,340.20 (1.89%)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">AAPL</span>
                      <span className="text-white">$18,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">GOOGL</span>
                      <span className="text-white">$34,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">MSFT</span>
                      <span className="text-white">$52,800</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700 h-96">
              <CardHeader>
                <CardTitle className="text-white">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-gray-400">Interactive trading chart</p>
                    <p className="text-sm text-gray-500 mt-2">Chart.js integration coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-green-400">AI Recommendation</h3>
              <p className="text-2xl font-bold text-white mb-2">BUY</p>
              <p className="text-sm text-gray-400">AAPL - Strong momentum detected</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Risk Level</h3>
              <p className="text-2xl font-bold text-white mb-2">Low</p>
              <p className="text-sm text-gray-400">Portfolio diversification optimal</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-purple-400">AI Confidence</h3>
              <p className="text-2xl font-bold text-white mb-2">94%</p>
              <p className="text-sm text-gray-400">High probability predictions</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 text-cyan-400">Active Trades</h3>
              <p className="text-2xl font-bold text-white mb-2">12</p>
              <p className="text-sm text-gray-400">AI-managed positions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
