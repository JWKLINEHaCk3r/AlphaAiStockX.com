"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, BarChart3, Activity, DollarSign } from "lucide-react"

export default function PerformanceMetrics({ botStats, recentTrades }) {
  const [performanceData, setPerformanceData] = useState({
    dailyReturns: [],
    monthlyReturns: [],
    drawdownPeriods: [],
    bestTrade: null,
    worstTrade: null,
    avgHoldTime: "2.5 hours",
    profitFactor: 1.85,
    calmarRatio: 2.3,
    sortinoRatio: 1.92,
  })

  useEffect(() => {
    // Calculate performance metrics from recent trades
    if (recentTrades.length > 0) {
      const sortedTrades = [...recentTrades].sort((a, b) => b.pnl - a.pnl)
      const bestTrade = sortedTrades[0]
      const worstTrade = sortedTrades[sortedTrades.length - 1]

      // Generate mock daily returns for chart
      const dailyReturns = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        return: (Math.random() - 0.4) * 5, // Slight positive bias
        cumulative: 0,
      }))

      // Calculate cumulative returns
      let cumulative = 0
      dailyReturns.forEach((day) => {
        cumulative += day.return
        day.cumulative = cumulative
      })

      setPerformanceData((prev) => ({
        ...prev,
        dailyReturns,
        bestTrade,
        worstTrade,
      }))
    }
  }, [recentTrades])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-400">{botStats.sharpeRatio.toFixed(2)}</p>
            <p className="text-xs text-gray-400">Sharpe Ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-400">{performanceData.sortinoRatio}</p>
            <p className="text-xs text-gray-400">Sortino Ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-400">{performanceData.calmarRatio}</p>
            <p className="text-xs text-gray-400">Calmar Ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-yellow-400">{performanceData.profitFactor}</p>
            <p className="text-xs text-gray-400">Profit Factor</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-6 w-6 text-red-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-red-400">{botStats.maxDrawdown.toFixed(1)}%</p>
            <p className="text-xs text-gray-400">Max Drawdown</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-cyan-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-cyan-400">{performanceData.avgHoldTime}</p>
            <p className="text-xs text-gray-400">Avg Hold Time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">30-Day Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-b from-purple-900/20 to-transparent rounded-lg p-4">
              <svg width="100%" height="100%" className="overflow-visible">
                {/* Chart Grid */}
                <defs>
                  <pattern id="perfGrid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#perfGrid)" />

                {/* Performance Line */}
                {performanceData.dailyReturns.length > 0 && (
                  <path
                    d={`M 0 ${120 + performanceData.dailyReturns[0]?.cumulative * 2} ${performanceData.dailyReturns
                      .map(
                        (point, i) =>
                          `L ${(i / performanceData.dailyReturns.length) * 400} ${120 + point.cumulative * 2}`,
                      )
                      .join(" ")}`}
                    fill="none"
                    stroke="url(#perfGradient)"
                    strokeWidth="3"
                  />
                )}

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="perfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Best/Worst Trades */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Trade Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceData.bestTrade && (
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default" className="bg-green-500">
                    Best Trade
                  </Badge>
                  <span className="text-green-400 font-bold">+{formatCurrency(performanceData.bestTrade.pnl)}</span>
                </div>
                <div className="text-sm text-gray-300">
                  <p>
                    {performanceData.bestTrade.side} {performanceData.bestTrade.symbol}
                  </p>
                  <p>
                    {performanceData.bestTrade.quantity} shares @ {formatCurrency(performanceData.bestTrade.price)}
                  </p>
                  <p className="text-xs text-gray-400">Strategy: {performanceData.bestTrade.strategy}</p>
                </div>
              </div>
            )}

            {performanceData.worstTrade && (
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="destructive">Worst Trade</Badge>
                  <span className="text-red-400 font-bold">{formatCurrency(performanceData.worstTrade.pnl)}</span>
                </div>
                <div className="text-sm text-gray-300">
                  <p>
                    {performanceData.worstTrade.side} {performanceData.worstTrade.symbol}
                  </p>
                  <p>
                    {performanceData.worstTrade.quantity} shares @ {formatCurrency(performanceData.worstTrade.price)}
                  </p>
                  <p className="text-xs text-gray-400">Strategy: {performanceData.worstTrade.strategy}</p>
                </div>
              </div>
            )}

            {/* Monthly Performance */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Monthly Returns</h4>
              {["January", "February", "March"].map((month, index) => {
                const return_ = (Math.random() - 0.3) * 15
                return (
                  <div key={month} className="flex items-center justify-between">
                    <span className="text-gray-300">{month}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${return_ >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {return_ >= 0 ? "+" : ""}
                        {return_.toFixed(1)}%
                      </span>
                      <Progress value={Math.abs(return_) * 2} className="w-16 h-2" />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
