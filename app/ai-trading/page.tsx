import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card-simple'
import { Button } from '@/components/ui/button-simple'
import { TradingCard } from '@/components/trading/TradingCard'
import { Bot, Zap, Shield, TrendingUp } from 'lucide-react'

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function AiTradingPage() {
  const aiRecommendations = [
    {
      symbol: 'AAPL',
      price: 175.43,
      change: 2.34,
      changePercent: 1.35,
      confidence: 89,
      outlook: 'bullish' as const,
      risk: 'medium' as const,
    },
    {
      symbol: 'NVDA',
      price: 432.12,
      change: 15.67,
      changePercent: 3.76,
      confidence: 94,
      outlook: 'bullish' as const,
      risk: 'high' as const,
    },
    {
      symbol: 'MSFT',
      price: 412.78,
      change: 7.89,
      changePercent: 1.95,
      confidence: 82,
      outlook: 'bullish' as const,
      risk: 'low' as const,
    },
    {
      symbol: 'TSLA',
      price: 248.67,
      change: -5.23,
      changePercent: -2.06,
      confidence: 76,
      outlook: 'bearish' as const,
      risk: 'high' as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AI Trading Engine
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced AI-powered trading recommendations based on real-time market analysis
          </p>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                AI Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Real-time market analysis using machine learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Speed</span>
                  <span className="text-blue-400 font-medium">&lt; 1ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Points</span>
                  <span className="text-green-400 font-medium">10M+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy Rate</span>
                  <span className="text-purple-400 font-medium">87.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Smart Execution
              </CardTitle>
              <CardDescription className="text-gray-300">
                Automated trade execution with optimal timing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Execution Time</span>
                  <span className="text-yellow-400 font-medium">0.02s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400 font-medium">94.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Slippage</span>
                  <span className="text-blue-400 font-medium">0.01%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Risk Management
              </CardTitle>
              <CardDescription className="text-gray-300">
                Advanced risk controls and portfolio protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Score</span>
                  <span className="text-yellow-400 font-medium">6.4/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Drawdown</span>
                  <span className="text-green-400 font-medium">-3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sharpe Ratio</span>
                  <span className="text-blue-400 font-medium">2.47</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Trading Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-400" />
            AI Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiRecommendations.map((stock, index) => (
              <TradingCard key={index} {...stock} />
            ))}
          </div>
        </div>

        {/* Trading Controls */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">AI Trading Controls</CardTitle>
            <CardDescription className="text-gray-300">
              Configure your AI trading preferences and risk parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="text-white font-medium mb-2">Auto Trading</div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Enabled
                </Button>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="text-white font-medium mb-2">Risk Level</div>
                <Button variant="outline" className="w-full border-yellow-500 text-yellow-400">
                  Medium
                </Button>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="text-white font-medium mb-2">Max Position</div>
                <Button variant="outline" className="w-full">
                  $10,000
                </Button>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="text-white font-medium mb-2">Stop Loss</div>
                <Button variant="outline" className="w-full border-red-500 text-red-400">
                  -5%
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
