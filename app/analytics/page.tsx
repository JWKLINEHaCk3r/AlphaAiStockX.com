'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('performance')

  const performanceData = [
    { period: '1 Day', return: '+1.42%', value: '$125,430.50', benchmark: '+0.89%' },
    { period: '1 Week', return: '+5.23%', value: '$129,840.25', benchmark: '+3.12%' },
    { period: '1 Month', return: '+12.84%', value: '$139,245.80', benchmark: '+8.45%' },
    { period: '3 Months', return: '+28.92%', value: '$155,672.30', benchmark: '+18.23%' },
    { period: '1 Year', return: '+87.45%', value: '$189,234.90', benchmark: '+52.18%' }
  ]

  const riskMetrics = [
    { metric: 'Beta', value: '1.23', description: 'Market sensitivity' },
    { metric: 'Sharpe Ratio', value: '2.14', description: 'Risk-adjusted returns' },
    { metric: 'Max Drawdown', value: '-8.42%', description: 'Largest peak-to-trough decline' },
    { metric: 'Volatility', value: '18.5%', description: 'Standard deviation of returns' },
    { metric: 'VaR (95%)', value: '-$4,250', description: 'Value at Risk' }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            📊 Advanced Analytics
          </h1>
          <p className="text-gray-400">Deep dive into your portfolio performance and risk metrics</p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
            {[
              { id: 'performance', label: '📈 Performance' },
              { id: 'risk', label: '⚠️ Risk Analysis' },
              { id: 'allocation', label: '🥧 Asset Allocation' },
              { id: 'predictions', label: '🔮 AI Predictions' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {performanceData.map((item) => (
                    <div key={item.period} className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-2">{item.period}</h3>
                      <p className="text-xl font-bold text-green-400 mb-1">{item.return}</p>
                      <p className="text-sm text-gray-300 mb-2">{item.value}</p>
                      <p className="text-xs text-gray-500">vs {item.benchmark} benchmark</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {riskMetrics.map((metric) => (
                <Card key={metric.metric} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-cyan-400">{metric.metric}</h3>
                    <p className="text-2xl font-bold text-white mb-2">{metric.value}</p>
                    <p className="text-sm text-gray-400">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Sector Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { sector: 'Technology', percentage: 45.2, value: '$56,694.58' },
                    { sector: 'Healthcare', percentage: 18.7, value: '$23,455.51' },
                    { sector: 'Finance', percentage: 15.3, value: '$19,190.87' },
                    { sector: 'Consumer', percentage: 12.1, value: '$15,177.09' },
                    { sector: 'Energy', percentage: 8.7, value: '$10,912.45' }
                  ].map((sector) => (
                    <div key={sector.sector} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-medium">{sector.sector}</span>
                          <span className="text-gray-400">{sector.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300 progress-bar"
                            data-width={sector.percentage}
                            style={
                              {
                                '--progress-width': `${sector.percentage}%`,
                                width: `var(--progress-width)`
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>
                      <span className="text-white font-semibold ml-4">{sector.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-purple-400">AI Confidence</h3>
                  <p className="text-3xl font-bold text-white mb-2">87%</p>
                  <p className="text-sm text-gray-400">Model accuracy rate</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-green-400">30-Day Outlook</h3>
                  <p className="text-3xl font-bold text-white mb-2">+8.3%</p>
                  <p className="text-sm text-gray-400">Predicted return</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Risk Score</h3>
                  <p className="text-3xl font-bold text-white mb-2">Medium</p>
                  <p className="text-sm text-gray-400">Current risk level</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
