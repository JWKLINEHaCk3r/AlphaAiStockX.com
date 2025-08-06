'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Holding {
  symbol: string
  name: string
  shares: number
  price: number
  change: number
  changePercent: number
}

export default function PortfolioPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [holdings, setHoldings] = useState<Holding[]>([])

  // Simulate data loading
  useEffect(() => {
    const loadPortfolioData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockHoldings: Holding[] = [
          { symbol: 'AAPL', name: 'Apple Inc.', shares: 150, price: 175.84, change: 2.45, changePercent: 1.42 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 75, price: 2831.23, change: -15.32, changePercent: -0.54 },
          { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 200, price: 378.85, change: 4.22, changePercent: 1.13 },
          { symbol: 'TSLA', name: 'Tesla Inc.', shares: 100, price: 248.50, change: -3.15, changePercent: -1.25 },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 80, price: 3421.15, change: 12.75, changePercent: 0.37 }
        ]
        
        setHoldings(mockHoldings)
      } catch (err) {
        setError('Failed to load portfolio data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolioData()
  }, [selectedTimeframe])

  const getTotalValue = () => {
    return holdings.reduce((total, holding) => total + (holding.shares * holding.price), 0)
  }

  const getTotalChange = () => {
    return holdings.reduce((total, holding) => total + (holding.shares * holding.change), 0)
  }

  const LoadingCard = () => (
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
          <div className="h-8 bg-gray-700 rounded w-32"></div>
        </div>
      </CardContent>
    </Card>
  )

  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-white mb-2">Error Loading Portfolio</h3>
      <p className="text-gray-400 mb-4">{error}</p>
      <Button 
        onClick={() => window.location.reload()} 
        className="bg-blue-600 hover:bg-blue-700"
      >
        🔄 Retry
      </Button>
    </div>
  )

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-7xl mx-auto">
          <ErrorState />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
            📊 Portfolio Dashboard
          </h1>
          <p className="text-gray-400">Track your investments and portfolio performance</p>
        </header>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            <>
              <Card className="bg-gray-900 border-gray-700 hover:border-green-500 transition-colors duration-300">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Total Value</h3>
                  <p className="text-2xl font-bold text-white">
                    ${getTotalValue().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Day Change</h3>
                  <p className={`text-2xl font-bold ${getTotalChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {getTotalChange() >= 0 ? '+' : ''}${getTotalChange().toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors duration-300">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Holdings</h3>
                  <p className="text-2xl font-bold text-white">{holdings.length}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-colors duration-300">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Cash Balance</h3>
                  <p className="text-2xl font-bold text-white">$12,450.00</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">📅 Time Range</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Portfolio timeframes">
            {['1D', '1W', '1M', '3M', '1Y'].map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                disabled={isLoading}
                className={`
                  transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
                  ${selectedTimeframe === timeframe 
                    ? 'bg-blue-600 text-white shadow-md border-blue-500' 
                    : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                role="button"
                aria-pressed={selectedTimeframe === timeframe}
                aria-describedby="timeframe-description"
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>

        {/* Holdings Table */}
        <Card className="bg-gray-900 border-gray-700" id="portfolio-content">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              📋 Current Holdings
              {isLoading && (
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4">
                      <div className="h-4 bg-gray-700 rounded w-16"></div>
                      <div className="h-4 bg-gray-700 rounded w-32"></div>
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-700 rounded w-28"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="w-full" role="table" aria-label="Portfolio holdings">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-400" scope="col">Symbol</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400" scope="col">Company</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400" scope="col">Shares</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400" scope="col">Price</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400" scope="col">Change</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400" scope="col">Market Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) => (
                      <tr 
                        key={holding.symbol} 
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-150 focus-within:bg-gray-800/50"
                        tabIndex={0}
                        role="row"
                      >
                        <td className="py-4 px-4" role="gridcell">
                          <span className="font-semibold text-white">{holding.symbol}</span>
                        </td>
                        <td className="py-4 px-4 text-gray-300" role="gridcell">{holding.name}</td>
                        <td className="py-4 px-4 text-right text-white" role="gridcell">{holding.shares.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right text-white" role="gridcell">${holding.price.toFixed(2)}</td>
                        <td className={`py-4 px-4 text-right ${holding.change >= 0 ? 'text-green-400' : 'text-red-400'}`} role="gridcell">
                          <span className="flex flex-col items-end">
                            <span>{holding.change >= 0 ? '+' : ''}${holding.change.toFixed(2)}</span>
                            <span className="text-sm">({holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%)</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right text-white font-semibold" role="gridcell">
                          ${(holding.shares * holding.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
            disabled={isLoading}
          >
            🛒 Buy Stocks
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            disabled={isLoading}
          >
            💰 Sell Stocks
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
            disabled={isLoading}
          >
            📈 Add to Watchlist
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
            disabled={isLoading}
          >
            📊 Generate Report
          </Button>
        </div>
      </div>
    </div>
  )
}
