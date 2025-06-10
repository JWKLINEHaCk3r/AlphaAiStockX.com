"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Shield,
  Rocket,
  Eye,
  Activity,
  BarChart3,
  Target,
  Zap,
  Crown,
  Star,
  Flame,
  Atom,
  Bot,
} from "lucide-react"

// Import all components
import PackLeaderAI from "./components/ai/PackLeaderAI"
import QuantumResistantSecurity from "./components/security/QuantumResistantSecurity"
import NeuralMarketAnalysis from "./components/ai/NeuralMarketAnalysis"
import AutomatedTradingSystem from "./components/trading/AutomatedTradingSystem"
import LiveTradingBot from "./components/trading/LiveTradingBot"
import UltraFastTradingEngine from "./components/trading/UltraFastTradingEngine"
import OptionsLiveTradingBot from "./components/trading/OptionsLiveTradingBot"
import AIStockScanner from "./components/scanners/AIStockScanner"
import AdvancedPatternScanner from "./components/scanners/AdvancedPatternScanner"
import OptionsFlowScanner from "./components/scanners/OptionsFlowScanner"
import EarningsPredictor from "./components/predictive/EarningsPredictor"
import SectorRotationAI from "./components/predictive/SectorRotationAI"
import AIStockTips from "./components/ai/AIStockTips"
import StockChart from "./components/StockChart"
import TechnicalIndicators from "./components/TechnicalIndicators"
import TradingStrategies from "./components/TradingStrategies"
import RiskAnalyzer from "./components/RiskAnalyzer"
import PerformanceMetrics from "./components/PerformanceMetrics"
import TradeHistory from "./components/TradeHistory"

// Import services
import { marketDataService } from "./services/market-data-service"
import { aiTradingEngine } from "./services/ai-trading-engine"

export default function AlphaAIStockX() {
  const [user] = useState({
    name: "Alpha Trader",
    membershipLevel: "ultimate", // free, basic, pro, ultimate, owner, investor
    accountBalance: 250000,
    totalProfit: 45000,
    winRate: 78.5,
  })

  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [marketData, setMarketData] = useState({})
  const [aiAnalysis, setAiAnalysis] = useState({})
  const [activeStrategies, setActiveStrategies] = useState([])
  const [recentTrades, setRecentTrades] = useState([])
  const [botStats, setBotStats] = useState({
    totalTrades: 1247,
    winRate: 78.5,
    sharpeRatio: 2.34,
    maxDrawdown: 8.2,
    profitFactor: 2.1,
  })

  useEffect(() => {
    // Initialize real-time data feeds
    const initializeData = async () => {
      try {
        const data = await marketDataService.getMarketData(selectedStock)
        setMarketData(data)

        const analysis = await aiTradingEngine.analyzeMarket()
        setAiAnalysis(analysis)

        // Generate sample trades
        const trades = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          symbol: ["AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"][Math.floor(Math.random() * 5)],
          side: Math.random() > 0.5 ? "BUY" : "SELL",
          quantity: Math.floor(Math.random() * 500) + 100,
          price: 100 + Math.random() * 400,
          pnl: (Math.random() - 0.3) * 1000, // Slight positive bias
          timestamp: new Date(Date.now() - Math.random() * 86400000),
          strategy: ["AI Momentum", "Mean Reversion", "Breakout", "News Sentiment"][Math.floor(Math.random() * 4)],
        }))
        setRecentTrades(trades)

        // Initialize strategies
        setActiveStrategies([
          {
            id: 1,
            name: "AI Momentum",
            allocation: 30,
            winRate: 72.5,
            avgReturn: 2.3,
            maxDrawdown: 8.5,
            status: "active",
          },
          {
            id: 2,
            name: "Mean Reversion",
            allocation: 25,
            winRate: 68.2,
            avgReturn: 1.8,
            maxDrawdown: 5.2,
            status: "active",
          },
        ])
      } catch (error) {
        console.error("Error initializing data:", error)
      }
    }

    initializeData()

    // Set up real-time updates
    const interval = setInterval(async () => {
      try {
        const data = await marketDataService.getMarketData(selectedStock)
        setMarketData(data)
      } catch (error) {
        console.error("Error updating market data:", error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedStock])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Atom className="h-8 w-8 text-cyan-400 animate-pulse" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AlphaAIStockX
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                <Crown className="h-3 w-3 mr-1" />
                {user.membershipLevel.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Account Balance</p>
                <p className="text-xl font-bold text-green-400">${user.accountBalance.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Profit</p>
                <p className="text-xl font-bold text-cyan-400">+${user.totalProfit.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Win Rate</p>
                <p className="text-xl font-bold text-purple-400">{user.winRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 bg-gray-900/50 border border-gray-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-500/20">
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-green-500/20">
              <Bot className="h-4 w-4 mr-2" />
              AI Trading
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-500/20">
              <Brain className="h-4 w-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="scanners" className="data-[state=active]:bg-blue-500/20">
              <Eye className="h-4 w-4 mr-2" />
              Scanners
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-orange-500/20">
              <Target className="h-4 w-4 mr-2" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-yellow-500/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-500/20">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="premium" className="data-[state=active]:bg-pink-500/20">
              <Star className="h-4 w-4 mr-2" />
              Premium
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockChart selectedStock={selectedStock} />
              </div>
              <div>
                <AIStockTips membershipLevel={user.membershipLevel} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TechnicalIndicators selectedStock={selectedStock} />
              <RiskAnalyzer />
            </div>
          </TabsContent>

          {/* AI Trading Tab */}
          <TabsContent value="trading" className="space-y-6">
            <AutomatedTradingSystem user={user} membershipLevel={user.membershipLevel} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveTradingBot />
              <OptionsLiveTradingBot />
            </div>
            <UltraFastTradingEngine user={user} membershipLevel={user.membershipLevel} />
            <TradingStrategies
              activeStrategies={activeStrategies}
              setActiveStrategies={setActiveStrategies}
              botStatus="running"
            />
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <NeuralMarketAnalysis />
          </TabsContent>

          {/* Scanners Tab */}
          <TabsContent value="scanners" className="space-y-6">
            <AIStockScanner />
            <AdvancedPatternScanner />
            <OptionsFlowScanner />
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <EarningsPredictor />
            <SectorRotationAI />
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <PerformanceMetrics botStats={botStats} recentTrades={recentTrades} />
            <TradeHistory />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <QuantumResistantSecurity />
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-2xl">
                  <Crown className="h-8 w-8 mr-3 text-yellow-400" />
                  Premium Features Unlocked
                  <Badge className="ml-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black animate-pulse">
                    <Star className="h-3 w-3 mr-1" />
                    ULTIMATE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                    <Rocket className="h-12 w-12 text-green-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Automated Trading</h3>
                    <p className="text-gray-300 text-sm">AI-powered automated trading with guaranteed profits</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                    <Brain className="h-12 w-12 text-blue-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Neural Analysis</h3>
                    <p className="text-gray-300 text-sm">Advanced neural network market analysis</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                    <Shield className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Quantum Security</h3>
                    <p className="text-gray-300 text-sm">Post-quantum cryptography protection</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30">
                    <Zap className="h-12 w-12 text-orange-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Ultra-Fast Execution</h3>
                    <p className="text-gray-300 text-sm">Lightning-fast trade execution (5-15ms)</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
                    <Target className="h-12 w-12 text-yellow-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Pattern Recognition</h3>
                    <p className="text-gray-300 text-sm">150+ advanced chart patterns detected</p>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/30">
                    <Flame className="h-12 w-12 text-pink-400 mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">Pack Leader AI</h3>
                    <p className="text-gray-300 text-sm">Personal AI trading coach and strategist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Pack Leader AI - Always Available */}
      <PackLeaderAI />
    </div>
  )
}
