import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card-simple'
import { Button } from '@/components/ui/button-simple'
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Target, Briefcase } from 'lucide-react'

// Disable static generation to avoid component resolution issues
export const dynamic = 'force-dynamic';

export default function PortfolioPage() {
  const portfolioData = {
    totalValue: '$124,350.67',
    dayChange: '+$2,134.89',
    dayChangePercent: '+1.75%',
    totalGain: '+$34,250.67',
    totalGainPercent: '+38.1%',
  }

  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 150,
      avgPrice: '$145.32',
      currentPrice: '$175.43',
      value: '$26,314.50',
      gain: '+$4,516.50',
      gainPercent: '+20.7%',
      positive: true,
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 75,
      avgPrice: '$380.45',
      currentPrice: '$432.12',
      value: '$32,409.00',
      gain: '+$3,875.25',
      gainPercent: '+13.6%',
      positive: true,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 80,
      avgPrice: '$385.67',
      currentPrice: '$412.78',
      value: '$33,022.40',
      gain: '+$2,168.80',
      gainPercent: '+7.0%',
      positive: true,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 120,
      avgPrice: '$148.92',
      currentPrice: '$142.56',
      value: '$17,107.20',
      gain: '-$763.20',
      gainPercent: '-4.3%',
      positive: false,
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 60,
      avgPrice: '$215.34',
      currentPrice: '$248.67',
      value: '$14,920.20',
      gain: '+$1,999.80',
      gainPercent: '+15.5%',
      positive: true,
    },
  ]

  const allocationData = [
    { sector: 'Technology', percentage: 72.5, color: 'bg-blue-500' },
    { sector: 'Healthcare', percentage: 12.3, color: 'bg-green-500' },
    { sector: 'Financial', percentage: 8.7, color: 'bg-purple-500' },
    { sector: 'Energy', percentage: 4.2, color: 'bg-yellow-500' },
    { sector: 'Consumer', percentage: 2.3, color: 'bg-red-500' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Portfolio Overview
          </h1>
          <p className="text-gray-400">Track your investments and performance</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">{portfolioData.totalValue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Today&apos;s Change</p>
                  <p className="text-2xl font-bold text-green-400">{portfolioData.dayChange}</p>
                  <p className="text-sm text-green-400">{portfolioData.dayChangePercent}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Gain/Loss</p>
                  <p className="text-2xl font-bold text-green-400">{portfolioData.totalGain}</p>
                  <p className="text-sm text-green-400">{portfolioData.totalGainPercent}</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Positions</p>
                  <p className="text-2xl font-bold text-white">{holdings.length}</p>
                  <p className="text-sm text-blue-400">Holdings</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Current Holdings</CardTitle>
                <CardDescription className="text-gray-400">
                  Your stock positions and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div
                      key={holding.symbol}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{holding.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{holding.symbol}</h3>
                            <p className="text-sm text-gray-400">{holding.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8 text-right">
                        <div>
                          <p className="text-white font-medium">{holding.shares} shares</p>
                          <p className="text-sm text-gray-400">@ {holding.avgPrice}</p>
                        </div>
                        
                        <div>
                          <p className="text-white font-medium">{holding.currentPrice}</p>
                          <p className="text-sm text-gray-400">Current</p>
                        </div>
                        
                        <div>
                          <p className="text-white font-bold">{holding.value}</p>
                          <div className={`text-sm ${holding.positive ? 'text-green-400' : 'text-red-400'}`}>
                            {holding.positive ? '+' : ''}{holding.gain} ({holding.gainPercent})
                          </div>
                        </div>

                        <div>
                          {holding.positive ? (
                            <TrendingUp className="h-5 w-5 text-green-400" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Allocation */}
          <div>
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Allocation</CardTitle>
                <CardDescription className="text-gray-400">
                  Sector distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocationData.map((sector) => {
                    const widthClass = sector.percentage >= 70 ? 'w-full' :
                      sector.percentage >= 50 ? 'w-4/5' :
                      sector.percentage >= 30 ? 'w-3/5' :
                      sector.percentage >= 20 ? 'w-2/5' :
                      sector.percentage >= 10 ? 'w-1/5' : 'w-1/12'
                    
                    return (
                      <div key={sector.sector} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{sector.sector}</span>
                          <span className="text-white font-medium">{sector.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className={`h-2 rounded-full ${sector.color} ${widthClass} transition-all duration-300`} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Buy More
                </Button>
                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                  <TrendingDown className="mr-2 h-4 w-4" />
                  Sell Position
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Rebalance
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                  <PieChart className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
