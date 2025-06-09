"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

export default function MarketHeatmap() {
  const [sectors, setSectors] = useState([])

  useEffect(() => {
    // Generate mock sector data
    const sectorNames = [
      "Technology",
      "Healthcare",
      "Finance",
      "Energy",
      "Consumer",
      "Industrial",
      "Materials",
      "Utilities",
      "Real Estate",
      "Telecom",
    ]

    const sectorData = sectorNames.map((name) => ({
      name,
      change: (Math.random() - 0.5) * 8,
      marketCap: Math.random() * 500 + 100,
      volume: Math.random() * 10 + 1,
    }))

    setSectors(sectorData)
  }, [])

  const getColorIntensity = (change) => {
    const intensity = Math.min(Math.abs(change) / 4, 1)
    if (change > 0) {
      return `rgba(34, 197, 94, ${intensity})`
    } else {
      return `rgba(239, 68, 68, ${intensity})`
    }
  }

  return (
    <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-purple-400" />
          Market Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="relative p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all cursor-pointer"
              style={{ backgroundColor: getColorIntensity(sector.change) }}
            >
              <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1">{sector.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  {sector.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-300 mr-1" />
                  )}
                  <span className="text-white font-bold">
                    {sector.change > 0 ? "+" : ""}
                    {sector.change.toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs text-gray-300">
                  <p>Cap: ${sector.marketCap.toFixed(0)}B</p>
                  <p>Vol: {sector.volume.toFixed(1)}B</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-300">Gainers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-300">Losers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
            <span className="text-gray-300">Neutral</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
