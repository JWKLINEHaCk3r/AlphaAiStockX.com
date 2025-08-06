import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, BarChart3, DollarSign, Activity } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const stats = [
    {
      title: 'Portfolio Value',
      value: '$124,350',
      change: '+12.5%',
      icon: DollarSign,
      positive: true,
    },
    {
      title: 'AI Predictions',
      value: '87%',
      change: 'Accuracy',
      icon: Activity,
      positive: true,
    },
    {
      title: 'Active Trades',
      value: '23',
      change: '+5 today',
      icon: TrendingUp,
      positive: true,
    },
    {
      title: 'Market Insights',
      value: '156',
      change: 'New signals',
      icon: BarChart3,
      positive: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            AlphaAI StockX
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Revolutionary AI-powered trading platform that uses advanced machine learning to predict market movements and optimize your investment strategy.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/ai-trading">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Trading with AI
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className={`text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">AI Market Analysis</CardTitle>
              <CardDescription className="text-gray-300">
                Real-time market analysis powered by advanced machine learning algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Prediction Accuracy</span>
                  <span className="text-green-400 font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Markets Analyzed</span>
                  <span className="text-blue-400 font-medium">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Points</span>
                  <span className="text-purple-400 font-medium">10M+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Smart Portfolio</CardTitle>
              <CardDescription className="text-gray-300">
                Automated portfolio management with risk optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Risk Score</span>
                  <span className="text-yellow-400 font-medium">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Diversification</span>
                  <span className="text-green-400 font-medium">Optimal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance</span>
                  <span className="text-blue-400 font-medium">+12.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Live Trading</CardTitle>
              <CardDescription className="text-gray-300">
                Execute trades with AI recommendations and real-time monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Positions</span>
                  <span className="text-green-400 font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-blue-400 font-medium">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Profit</span>
                  <span className="text-purple-400 font-medium">$15,420</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
