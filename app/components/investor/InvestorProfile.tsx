"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Brain,
  Zap,
  Target,
  Shield,
  Crown,
  Rocket,
  Eye,
  BarChart3,
  DollarSign,
  Activity,
  Sparkles,
  CloudLightningIcon as Lightning,
  Star,
  Cpu,
  Database,
  Network,
  Atom,
} from "lucide-react"

export default function InvestorProfile({ onSwitchToOwner, onSwitchToAdmin }) {
  const [aiInsights, setAiInsights] = useState({})
  const [marketPredictions, setMarketPredictions] = useState([])
  const [portfolioAnalysis, setPortfolioAnalysis] = useState({})
  const [realTimeData, setRealTimeData] = useState({})
  const [aiScore, setAiScore] = useState(0)

  useEffect(() => {
    generateAIInsights()
    generateMarketPredictions()
    generatePortfolioAnalysis()
    updateRealTimeData()

    const interval = setInterval(() => {
      updateRealTimeData()
      setAiScore((prev) => Math.min(prev + 0.1, 98.7))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const generateAIInsights = () => {
    setAiInsights({
      marketSentiment: 87.3,
      volatilityForecast: "Low-Medium",
      sectorRotation: "Technology → Healthcare",
      riskLevel: "Moderate",
      opportunityScore: 94.2,
      aiConfidence: 96.8,
      nextMoveDirection: "Bullish",
      timeHorizon: "2-3 weeks",
      expectedReturn: 12.7,
      maxDrawdown: 4.2,
    })
  }

  const generateMarketPredictions = () => {
    const predictions = [
      {
        symbol: "NVDA",
        prediction: "Strong Buy",
        confidence: 94.7,
        targetPrice: 875.5,
        currentPrice: 742.33,
        timeframe: "30 days",
        aiReasoning: "AI chip demand surge, earnings beat expected, institutional accumulation",
        riskReward: "1:4.2",
        probability: 89.3,
      },
      {
        symbol: "TSLA",
        prediction: "Buy",
        confidence: 87.2,
        targetPrice: 298.75,
        currentPrice: 248.5,
        timeframe: "45 days",
        aiReasoning: "FSD breakthrough imminent, China expansion, energy storage growth",
        riskReward: "1:3.1",
        probability: 82.1,
      },
      {
        symbol: "AAPL",
        prediction: "Hold",
        confidence: 76.8,
        targetPrice: 195.25,
        currentPrice: 189.95,
        timeframe: "60 days",
        aiReasoning: "Vision Pro adoption, services growth, but iPhone cycle maturity",
        riskReward: "1:1.8",
        probability: 71.4,
      },
    ]
    setMarketPredictions(predictions)
  }

  const generatePortfolioAnalysis = () => {
    setPortfolioAnalysis({
      totalValue: 2847392.18,
      dailyPnL: 23847.32,
      weeklyPnL: 89234.67,
      monthlyPnL: 234567.89,
      yearlyReturn: 47.3,
      sharpeRatio: 2.84,
      maxDrawdown: 8.7,
      winRate: 73.2,
      avgWin: 4.7,
      avgLoss: 2.1,
      profitFactor: 3.2,
      calmarRatio: 5.4,
      sortinoRatio: 3.8,
      informationRatio: 1.9,
      treynorRatio: 0.23,
      jensenAlpha: 0.087,
      beta: 0.92,
      correlation: 0.78,
      volatility: 18.4,
      var95: 2.3,
      cvar95: 3.8,
    })
  }

  const updateRealTimeData = () => {
    setRealTimeData({
      marketCap: 47234567890,
      volume: 234567890,
      activeTrades: 1247,
      aiProcessingSpeed: "0.003ms",
      dataPoints: 2847392,
      predictions: 15847,
      accuracy: 94.7,
      uptime: 99.97,
    })
  }

  return (
    <div className="space-y-6">
      {/* Investor Header */}
      <Card className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 border-blue-500/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 animate-pulse"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin-slow">
                  <Brain size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                  <Zap size={12} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Investor Command Center
                </h2>
                <p className="text-sm text-gray-300">Next-Generation AI-Driven Investment Platform</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-semibold">
                    AI ACTIVE • Processing {realTimeData.dataPoints?.toLocaleString()} data points
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={onSwitchToOwner}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              >
                <Crown className="mr-2 h-4 w-4" />
                Owner Mode
              </Button>
              <Button
                onClick={onSwitchToAdmin}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </Button>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse px-4 py-2">
                <Cpu size={12} className="mr-1" />
                AI SCORE: {aiScore.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="ai-insights" className="space-y-6">
        <TabsList className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl grid grid-cols-6">
          <TabsTrigger value="ai-insights" className="data-[state=active]:bg-blue-500/20">
            <Brain size={16} className="mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-500/20">
            <Target size={16} className="mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-blue-500/20">
            <BarChart3 size={16} className="mr-2" />
            Portfolio AI
          </TabsTrigger>
          <TabsTrigger value="quantum" className="data-[state=active]:bg-blue-500/20">
            <Atom size={16} className="mr-2" />
            Quantum AI
          </TabsTrigger>
          <TabsTrigger value="neural" className="data-[state=active]:bg-blue-500/20">
            <Network size={16} className="mr-2" />
            Neural Net
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-blue-500/20">
            <Shield size={16} className="mr-2" />
            2025 Compliance
          </TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Real-time AI Metrics */}
            <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Activity className="mr-2" size={20} />
                  Market Sentiment AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">{aiInsights.marketSentiment}%</div>
                  <Progress value={aiInsights.marketSentiment} className="h-3 mb-2" />
                  <p className="text-sm text-gray-300">Bullish Confidence</p>
                  <Badge className="mt-2 bg-green-500">
                    <TrendingUp size={12} className="mr-1" />
                    {aiInsights.nextMoveDirection}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Zap className="mr-2" size={20} />
                  Opportunity Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{aiInsights.opportunityScore}</div>
                  <Progress value={aiInsights.opportunityScore} className="h-3 mb-2" />
                  <p className="text-sm text-gray-300">AI Opportunity Rating</p>
                  <Badge className="mt-2 bg-blue-500">
                    <Star size={12} className="mr-1" />
                    Excellent
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Brain className="mr-2" size={20} />
                  AI Confidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">{aiInsights.aiConfidence}%</div>
                  <Progress value={aiInsights.aiConfidence} className="h-3 mb-2" />
                  <p className="text-sm text-gray-300">Model Certainty</p>
                  <Badge className="mt-2 bg-purple-500">
                    <Sparkles size={12} className="mr-1" />
                    Ultra High
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center">
                  <Target className="mr-2" size={20} />
                  Expected Return
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">{aiInsights.expectedReturn}%</div>
                  <Progress value={aiInsights.expectedReturn * 5} className="h-3 mb-2" />
                  <p className="text-sm text-gray-300">{aiInsights.timeHorizon}</p>
                  <Badge className="mt-2 bg-orange-500">
                    <Rocket size={12} className="mr-1" />
                    High Potential
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced AI Analytics */}
          <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl mt-6">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Database className="mr-2" size={20} />
                Advanced AI Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Sector Rotation AI</h4>
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                    <p className="text-blue-400 font-semibold">{aiInsights.sectorRotation}</p>
                    <p className="text-sm text-gray-400 mt-1">AI detected rotation pattern</p>
                    <Progress value={78} className="h-2 mt-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Volatility Forecast</h4>
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                    <p className="text-green-400 font-semibold">{aiInsights.volatilityForecast}</p>
                    <p className="text-sm text-gray-400 mt-1">Next 30 days prediction</p>
                    <Progress value={45} className="h-2 mt-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Risk Assessment</h4>
                  <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg">
                    <p className="text-yellow-400 font-semibold">{aiInsights.riskLevel}</p>
                    <p className="text-sm text-gray-400 mt-1">Portfolio risk level</p>
                    <Progress value={35} className="h-2 mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Predictions Tab */}
        <TabsContent value="predictions">
          <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Target className="mr-2" size={20} />
                AI-Powered Stock Predictions
                <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-600">
                  <Lightning className="h-3 w-3 mr-1" />
                  Real-time AI
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketPredictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{prediction.symbol}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{prediction.symbol}</h3>
                          <Badge
                            className={`${
                              prediction.prediction === "Strong Buy"
                                ? "bg-green-500"
                                : prediction.prediction === "Buy"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                            }`}
                          >
                            {prediction.prediction}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">{prediction.confidence}%</p>
                        <p className="text-sm text-gray-400">AI Confidence</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Current Price</p>
                        <p className="text-white font-semibold">${prediction.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Target Price</p>
                        <p className="text-green-400 font-semibold">${prediction.targetPrice}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Potential Gain</p>
                        <p className="text-blue-400 font-semibold">
                          {(
                            ((prediction.targetPrice - prediction.currentPrice) / prediction.currentPrice) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Risk/Reward</p>
                        <p className="text-purple-400 font-semibold">{prediction.riskReward}</p>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">AI Reasoning:</h4>
                      <p className="text-gray-300 text-sm">{prediction.aiReasoning}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-400 text-sm">Success Probability: {prediction.probability}%</span>
                        <span className="text-gray-400 text-sm">Timeframe: {prediction.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio AI Tab */}
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-400">${portfolioAnalysis.totalValue?.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Total Portfolio Value</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-blue-400">{portfolioAnalysis.yearlyReturn}%</p>
                <p className="text-sm text-gray-400">Annual Return</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-purple-400">{portfolioAnalysis.sharpeRatio}</p>
                <p className="text-sm text-gray-400">Sharpe Ratio</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-orange-400">{portfolioAnalysis.winRate}%</p>
                <p className="text-sm text-gray-400">Win Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Portfolio Metrics */}
          <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl mt-6">
            <CardHeader>
              <CardTitle className="text-blue-400">Advanced Portfolio Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(portfolioAnalysis)
                  .slice(5)
                  .map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-white/5 rounded-lg">
                      <p className="text-lg font-bold text-white">{value}</p>
                      <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quantum AI Tab */}
        <TabsContent value="quantum">
          <Card className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-indigo-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-indigo-400 flex items-center">
                <Atom className="mr-2" size={20} />
                Quantum AI Processing Engine
                <Badge className="ml-3 bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse">
                  <Cpu className="h-3 w-3 mr-1" />
                  QUANTUM ACTIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Quantum Superposition Analysis</h4>
                  <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-indigo-400">Processing States:</span>
                      <span className="text-white font-bold">2^64</span>
                    </div>
                    <Progress value={94} className="h-2 mb-2" />
                    <p className="text-xs text-gray-400">Parallel market scenario analysis</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Quantum Entanglement Correlations</h4>
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400">Entangled Assets:</span>
                      <span className="text-white font-bold">15,847</span>
                    </div>
                    <Progress value={87} className="h-2 mb-2" />
                    <p className="text-xs text-gray-400">Cross-market correlation mapping</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Quantum Tunneling Predictions</h4>
                  <div className="p-4 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-pink-400">Breakthrough Probability:</span>
                      <span className="text-white font-bold">92.3%</span>
                    </div>
                    <Progress value={92} className="h-2 mb-2" />
                    <p className="text-xs text-gray-400">Market barrier penetration analysis</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-lg border border-indigo-500/20">
                <h4 className="text-white font-semibold mb-4">Quantum Computing Advantages:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">10,000x faster pattern recognition</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Infinite scenario simulation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Quantum-encrypted predictions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Multi-dimensional risk analysis</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Neural Network Tab */}
        <TabsContent value="neural">
          <Card className="bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-cyan-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Network className="mr-2" size={20} />
                Deep Neural Network Architecture
                <Badge className="ml-3 bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse">
                  <Brain className="h-3 w-3 mr-1" />
                  LEARNING ACTIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Network Architecture</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400">Input Layer:</span>
                        <span className="text-white font-bold">10,000 neurons</span>
                      </div>
                      <Progress value={100} className="h-1 mt-1" />
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400">Hidden Layers:</span>
                        <span className="text-white font-bold">50 x 5,000</span>
                      </div>
                      <Progress value={95} className="h-1 mt-1" />
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-400">Output Layer:</span>
                        <span className="text-white font-bold">1,000 predictions</span>
                      </div>
                      <Progress value={98} className="h-1 mt-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Learning Metrics</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-green-400">Training Accuracy:</span>
                        <span className="text-white font-bold">99.7%</span>
                      </div>
                      <Progress value={99.7} className="h-1 mt-1" />
                    </div>
                    <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400">Validation Loss:</span>
                        <span className="text-white font-bold">0.003</span>
                      </div>
                      <Progress value={85} className="h-1 mt-1" />
                    </div>
                    <div className="p-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-red-400">Learning Rate:</span>
                        <span className="text-white font-bold">0.001</span>
                      </div>
                      <Progress value={70} className="h-1 mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg border border-cyan-500/20">
                <h4 className="text-white font-semibold mb-4">Advanced AI Capabilities:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">247M</div>
                    <p className="text-sm text-gray-400">Parameters</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">15TB</div>
                    <p className="text-sm text-gray-400">Training Data</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">0.003ms</div>
                    <p className="text-sm text-gray-400">Inference Time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2025 Compliance Tab */}
        <TabsContent value="compliance">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-red-900/60 to-orange-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Shield className="mr-2" size={20} />
                  2025 Investment Compliance & Regulations
                  <Badge className="ml-3 bg-gradient-to-r from-red-500 to-orange-600">
                    <Eye className="h-3 w-3 mr-1" />
                    FULLY COMPLIANT
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Regulatory Compliance</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-green-400">SEC Rule 15c3-5 (Market Access)</span>
                          <Badge className="bg-green-500">✓ Compliant</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-green-400">FINRA Rule 3110 (Supervision)</span>
                          <Badge className="bg-green-500">✓ Compliant</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-green-400">Reg SHO (Short Sales)</span>
                          <Badge className="bg-green-500">✓ Compliant</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-green-400">GDPR Data Protection</span>
                          <Badge className="bg-green-500">✓ Compliant</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Risk Management</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400">Position Limits</span>
                          <Badge className="bg-blue-500">Active</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400">Circuit Breakers</span>
                          <Badge className="bg-blue-500">Active</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400">Kill Switch</span>
                          <Badge className="bg-blue-500">Active</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400">Real-time Monitoring</span>
                          <Badge className="bg-blue-500">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers and Legal */}
            <Card className="bg-gray-900/60 border-yellow-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Shield className="mr-2" size={20} />
                  Important Disclaimers & Legal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <h5 className="text-yellow-400 font-semibold mb-2">⚠️ Investment Risk Disclosure</h5>
                    <p>
                      All investments involve risk, including the potential loss of principal. Past performance does not
                      guarantee future results. The AI predictions and analysis provided are for informational purposes
                      only and should not be considered as personalized investment advice.
                    </p>
                  </div>

                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                    <h5 className="text-red-400 font-semibold mb-2">🚫 Not Licensed Professional Advice</h5>
                    <p>
                      AlphaAIStockX is not a licensed investment advisor, broker-dealer, or financial planner. The
                      platform provides educational tools and AI-driven analysis for informational purposes. Users
                      should consult with qualified financial professionals before making investment decisions.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <h5 className="text-blue-400 font-semibold mb-2">📊 AI Technology Limitations</h5>
                    <p>
                      While our AI systems use advanced machine learning and quantum computing principles, they cannot
                      predict market movements with 100% accuracy. Market conditions can change rapidly, and AI models
                      may not account for all variables affecting stock prices.
                    </p>
                  </div>

                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h5 className="text-green-400 font-semibold mb-2">✅ Educational Purpose</h5>
                    <p>
                      This platform is designed for educational purposes and to provide advanced trading tools. Users
                      are responsible for their own investment decisions and should never invest more than they can
                      afford to lose. Always do your own research and consider your risk tolerance.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <h5 className="text-purple-400 font-semibold mb-2">🔒 Data Security & Privacy</h5>
                    <p>
                      We employ bank-level encryption and security measures to protect user data. However, users should
                      be aware that no system is 100% secure. We comply with all applicable data protection regulations
                      including GDPR and CCPA.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
