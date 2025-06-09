"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, Zap, BarChart3 } from "lucide-react"

export default function OptionsFlowScanner() {
  const [optionsFlow, setOptionsFlow] = useState([])
  const [unusualActivity, setUnusualActivity] = useState([])
  const [darkPools, setDarkPools] = useState([])

  useEffect(() => {
    // Simulate real-time options flow data
    const interval = setInterval(() => {
      generateOptionsFlow()
      generateUnusualActivity()
      generateDarkPoolData()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const generateOptionsFlow = () => {
    const symbols = ["AAPL", "MSFT", "TSLA", "NVDA", "SPY", "QQQ", "AMZN", "GOOGL"]
    const flow = symbols.map((symbol) => ({
      symbol,
      type: Math.random() > 0.5 ? "CALL" : "PUT",
      strike: Math.round((100 + Math.random() * 400) / 5) * 5,
      expiry: ["1DTE", "2DTE", "1W", "2W", "1M", "2M"][Math.floor(Math.random() * 6)],
      premium: Math.random() * 10 + 0.5,
      volume: Math.floor(Math.random() * 5000) + 100,
      openInterest: Math.floor(Math.random() * 10000) + 500,
      sentiment: Math.random() > 0.6 ? "bullish" : Math.random() > 0.3 ? "bearish" : "neutral",
      size: Math.random() > 0.8 ? "whale" : Math.random() > 0.5 ? "large" : "medium",
      timestamp: new Date(),
      notionalValue: 0,
    }))

    flow.forEach((trade) => {
      trade.notionalValue = trade.premium * trade.volume * 100
    })

    setOptionsFlow(flow.sort((a, b) => b.notionalValue - a.notionalValue))
  }

  const generateUnusualActivity = () => {
    const activities = [
      {
        symbol: "AAPL",
        activity: "Massive Call Buying",
        description: "10,000+ calls bought at $180 strike",
        impact: "Bullish",
        confidence: 92,
        timeDetected: "2 minutes ago",
      },
      {
        symbol: "TSLA",
        activity: "Put Wall Building",
        description: "Heavy put volume at $240 strike",
        impact: "Support Level",
        confidence: 87,
        timeDetected: "5 minutes ago",
      },
      {
        symbol: "NVDA",
        activity: "Gamma Squeeze Setup",
        description: "High call OI near current price",
        impact: "Bullish",
        confidence: 78,
        timeDetected: "8 minutes ago",
      },
    ]
    setUnusualActivity(activities)
  }

  const generateDarkPoolData = () => {
    const pools = [
      {
        symbol: "SPY",
        volume: 2.5,
        sentiment: "Accumulation",
        price: 445.67,
        size: "Institutional",
        timeframe: "Last Hour",
      },
      {
        symbol: "QQQ",
        volume: 1.8,
        sentiment: "Distribution",
        price: 378.23,
        size: "Whale",
        timeframe: "Last 30min",
      },
    ]
    setDarkPools(pools)
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "bullish":
        return "text-emerald-400"
      case "bearish":
        return "text-red-400"
      default:
        return "text-amber-400"
    }
  }

  const getSizeColor = (size) => {
    switch (size) {
      case "whale":
        return "text-purple-400"
      case "large":
        return "text-blue-400"
      default:
        return "text-stone-400"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="flow" className="space-y-6">
        <TabsList className="bg-stone-900/40 border-emerald-500/30">
          <TabsTrigger value="flow" className="data-[state=active]:bg-emerald-500/20">
            <Activity className="h-4 w-4 mr-2" />
            Options Flow
          </TabsTrigger>
          <TabsTrigger value="unusual" className="data-[state=active]:bg-emerald-500/20">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Unusual Activity
          </TabsTrigger>
          <TabsTrigger value="darkpool" className="data-[state=active]:bg-emerald-500/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dark Pools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flow">
          <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-stone-100 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-emerald-400" />
                Live Options Flow
                <Badge className="ml-3 bg-gradient-to-r from-emerald-500 to-green-600">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optionsFlow.map((trade, index) => (
                  <div
                    key={index}
                    className="p-4 bg-stone-800/30 rounded-lg border border-stone-600/30 hover:border-stone-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-stone-100 font-bold">{trade.symbol}</span>
                            <Badge variant={trade.type === "CALL" ? "default" : "destructive"}>{trade.type}</Badge>
                            <Badge className={getSizeColor(trade.size)}>{trade.size}</Badge>
                          </div>
                          <p className="text-sm text-stone-400">
                            ${trade.strike} • {trade.expiry}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Premium</p>
                          <p className="text-stone-100 font-semibold">${trade.premium.toFixed(2)}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Volume</p>
                          <p className="text-stone-100 font-semibold">{trade.volume.toLocaleString()}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Notional</p>
                          <p className="text-emerald-400 font-semibold">
                            ${(trade.notionalValue / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={getSentimentColor(trade.sentiment)}>{trade.sentiment}</Badge>
                        <p className="text-xs text-stone-400 mt-1">OI: {trade.openInterest.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unusual">
          <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-stone-100 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-amber-400" />
                Unusual Options Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unusualActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-stone-100 font-bold text-lg">{activity.symbol}</span>
                        <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                          {activity.activity}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Badge className={activity.impact === "Bullish" ? "bg-emerald-500" : "bg-blue-500"}>
                          {activity.impact}
                        </Badge>
                        <p className="text-xs text-stone-400 mt-1">{activity.timeDetected}</p>
                      </div>
                    </div>
                    <p className="text-stone-300 mb-2">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-400">Confidence Level</span>
                      <span className="text-emerald-400 font-semibold">{activity.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="darkpool">
          <Card className="bg-stone-900/40 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-stone-100 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-purple-400" />
                Dark Pool Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {darkPools.map((pool, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-stone-100 font-bold text-lg">{pool.symbol}</span>
                            <Badge className="bg-purple-500">{pool.size}</Badge>
                          </div>
                          <p className="text-sm text-stone-400">@ ${pool.price}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Volume</p>
                          <p className="text-stone-100 font-semibold">{pool.volume}M</p>
                        </div>

                        <div className="text-center">
                          <p className="text-stone-400 text-sm">Sentiment</p>
                          <p
                            className={`font-semibold ${
                              pool.sentiment === "Accumulation" ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {pool.sentiment}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-stone-400 text-sm">{pool.timeframe}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
