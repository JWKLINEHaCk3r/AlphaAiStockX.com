import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TradingCard } from '@/components/trading/TradingCard'

export default function HomePage() {
  const features = [
    {
      title: '🤖 AI Trading',
      description: 'Advanced AI algorithms for automated trading with real-time market analysis and intelligent decision making.',
      href: '/ai-trading',
      stats: { accuracy: '94%', trades: '12 Active', returns: '+18.5%' }
    },
    {
      title: '📊 Portfolio Management',
      description: 'Comprehensive portfolio tracking with detailed analytics, risk assessment, and performance monitoring.',
      href: '/portfolio',
      stats: { value: '$125.4K', holdings: '8 Stocks', change: '+2.3%' }
    },
    {
      title: '📈 Advanced Analytics',
      description: 'Deep market insights with predictive analytics, risk metrics, and performance benchmarking.',
      href: '/analytics',
      stats: { confidence: '87%', outlook: '+8.3%', risk: 'Medium' }
    }
  ]

  const marketStats = [
    { label: 'Portfolio Value', value: '$125,430.50', change: '+2.34%', positive: true },
    { label: 'Active Trades', value: '12', change: '+3', positive: true },
    { label: 'AI Accuracy', value: '94.2%', change: '+1.2%', positive: true },
    { label: 'Monthly Return', value: '+18.5%', change: '+4.2%', positive: true }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden" role="banner">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black" aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            AlphaAI StockX
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in-delay">
            Revolutionary AI-powered trading platform that combines advanced machine learning with real-time market analytics for professional-grade investment management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link href="/ai-trading">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Start AI Trading - Navigate to AI Trading page"
              >
                🚀 Start AI Trading
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="View Portfolio - Navigate to Portfolio page"
              >
                📊 View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Live Performance Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.label}</h3>
                  <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                  <p className={`text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change} today
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Platform Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <TradingCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Powered by Advanced AI Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Machine Learning</h3>
              <p className="text-gray-400">Advanced neural networks analyze millions of data points to identify profitable trading opportunities.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Real-Time Analysis</h3>
              <p className="text-gray-400">Lightning-fast market data processing with microsecond-level trade execution capabilities.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Risk Management</h3>
              <p className="text-gray-400">Sophisticated risk assessment algorithms protect your portfolio from market volatility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Trading?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders who have already discovered the power of AI-driven investment strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-trading">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                🎯 Launch AI Trading
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4">
                📊 Explore Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
