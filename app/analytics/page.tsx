import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target } from 'lucide-react'

export default function AnalyticsPage() {
  const performanceData = [
    { period: '1D', return: '+2.3%', positive: true },
    { period: '1W', return: '+8.7%', positive: true },
    { period: '1M', return: '+15.2%', positive: true },
    { period: '3M', return: '+32.1%', positive: true },
    { period: '1Y', return: '+127.5%', positive: true },
  ]

  const topStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', change: '+3.2%', price: '$175.43', positive: true },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', change: '+5.8%', price: '$432.12', positive: true },
    { symbol: 'MSFT', name: 'Microsoft Corp.', change: '+1.9%', price: '$412.78', positive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', change: '-1.2%', price: '$142.56', positive: false },
    { symbol: 'TSLA', name: 'Tesla Inc.', change: '+7.3%', price: '$248.67', positive: true },
  ]

  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: '$124,350.67',
      change: '+12.5%',
      icon: TrendingUp,
      description: 'vs last month',
    },
    {
      title: 'AI Prediction Accuracy',
      value: '87.3%',
      change: '+2.1%',
      icon: Target,
      description: 'Success rate',
    },
    {
      title: 'Active Positions',
      value: '23',
      change: '+5',
      icon: PieChart,
      description: 'Current trades',
    },
    {
      title: 'Risk Score',
      value: '6.4/10',
      change: 'Medium',
      icon: Activity,
      description: 'Portfolio risk',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive analysis of your AI-powered trading performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {metric.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-medium">
                      {metric.change}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {metric.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Performance Overview
              </CardTitle>
              <CardDescription className="text-gray-300">
                Your portfolio returns across different time periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-gray-300 font-medium">{data.period}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${data.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {data.return}
                      </span>
                      {data.positive ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Stocks */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Top Performing Stocks
              </CardTitle>
              <CardDescription className="text-gray-300">
                Best performers in your portfolio today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStocks.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-bold">{stock.symbol}</div>
                      <div className="text-gray-400 text-sm">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{stock.price}</div>
                      <div className={`text-sm font-medium ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              AI Market Insights
            </CardTitle>
            <CardDescription className="text-gray-300">
              Latest predictions and recommendations from our AI models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-green-400 text-2xl font-bold mb-2">BUY</div>
                <div className="text-white font-medium mb-1">Tech Sector</div>
                <div className="text-gray-400 text-sm">AI Confidence: 92%</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-yellow-400 text-2xl font-bold mb-2">HOLD</div>
                <div className="text-white font-medium mb-1">Energy Sector</div>
                <div className="text-gray-400 text-sm">AI Confidence: 76%</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="text-red-400 text-2xl font-bold mb-2">WATCH</div>
                <div className="text-white font-medium mb-1">Banking Sector</div>
                <div className="text-gray-400 text-sm">AI Confidence: 68%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
