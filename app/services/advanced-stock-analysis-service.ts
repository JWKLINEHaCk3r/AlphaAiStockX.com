import { aiBrainService } from "./ai-brain-service"

export class AdvancedStockAnalysisService {
  private static instance: AdvancedStockAnalysisService
  private stockDatabase: Map<string, any> = new Map()
  private historicalData: Map<string, any> = new Map()
  private patternRecognition: Map<string, any> = new Map()
  private volumeAnalysis: Map<string, any> = new Map()

  static getInstance(): AdvancedStockAnalysisService {
    if (!AdvancedStockAnalysisService.instance) {
      AdvancedStockAnalysisService.instance = new AdvancedStockAnalysisService()
    }
    return AdvancedStockAnalysisService.instance
  }

  async initialize() {
    await this.loadStockDatabase()
    await this.loadHistoricalData()
    this.initializePatternRecognition()
    this.startRealTimeAnalysis()
  }

  private async loadStockDatabase() {
    // Load comprehensive stock database with IPO dates, fundamentals, etc.
    const stocks = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        sector: "Technology",
        industry: "Consumer Electronics",
        ipoDate: "1980-12-12",
        ipoPrice: 22.0,
        marketCap: 3000000000000,
        employees: 164000,
        headquarters: "Cupertino, CA",
        ceo: "Tim Cook",
        founded: "1976-04-01",
        description:
          "Designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        sector: "Technology",
        industry: "Software",
        ipoDate: "1986-03-13",
        ipoPrice: 21.0,
        marketCap: 2800000000000,
        employees: 221000,
        headquarters: "Redmond, WA",
        ceo: "Satya Nadella",
        founded: "1975-04-04",
        description: "Develops, licenses, and supports software, services, devices, and solutions worldwide.",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        sector: "Technology",
        industry: "Internet Services",
        ipoDate: "2004-08-19",
        ipoPrice: 85.0,
        marketCap: 1700000000000,
        employees: 190000,
        headquarters: "Mountain View, CA",
        ceo: "Sundar Pichai",
        founded: "1998-09-04",
        description: "Provides online advertising services and cloud computing services worldwide.",
      },
      {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        sector: "Consumer Discretionary",
        industry: "Automotive",
        ipoDate: "2010-06-29",
        ipoPrice: 17.0,
        marketCap: 800000000000,
        employees: 140000,
        headquarters: "Austin, TX",
        ceo: "Elon Musk",
        founded: "2003-07-01",
        description:
          "Designs, develops, manufactures, leases, and sells electric vehicles and energy generation and storage systems.",
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        sector: "Technology",
        industry: "Semiconductors",
        ipoDate: "1999-01-22",
        ipoPrice: 12.0,
        marketCap: 1800000000000,
        employees: 29600,
        headquarters: "Santa Clara, CA",
        ceo: "Jensen Huang",
        founded: "1993-04-05",
        description: "Provides graphics, and compute and networking solutions worldwide.",
      },
    ]

    stocks.forEach((stock) => {
      this.stockDatabase.set(stock.symbol, stock)
    })
  }

  private async loadHistoricalData() {
    // Generate comprehensive historical data for each stock
    const symbols = Array.from(this.stockDatabase.keys())

    for (const symbol of symbols) {
      const stock = this.stockDatabase.get(symbol)
      const ipoDate = new Date(stock.ipoDate)
      const today = new Date()
      const daysSinceIPO = Math.floor((today.getTime() - ipoDate.getTime()) / (1000 * 60 * 60 * 24))

      const historicalData = this.generateHistoricalData(symbol, stock.ipoPrice, daysSinceIPO)
      this.historicalData.set(symbol, historicalData)
    }
  }

  private generateHistoricalData(symbol: string, ipoPrice: number, days: number) {
    const data = []
    let currentPrice = ipoPrice
    let volume = 1000000 + Math.random() * 10000000

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i))

      // Simulate realistic price movement with trends
      const dailyReturn = (Math.random() - 0.48) * 0.05 // Slight upward bias
      const volatility = 0.02 + Math.random() * 0.03
      const priceChange = currentPrice * dailyReturn * volatility

      currentPrice = Math.max(currentPrice + priceChange, 0.01)
      volume = volume * (0.8 + Math.random() * 0.4) // Volume variation

      const high = currentPrice * (1 + Math.random() * 0.03)
      const low = currentPrice * (1 - Math.random() * 0.03)
      const open = low + Math.random() * (high - low)
      const close = currentPrice

      data.push({
        date: date.toISOString().split("T")[0],
        open,
        high,
        low,
        close,
        volume: Math.floor(volume),
        adjustedClose: close,
        dividends: i % 90 === 0 ? close * 0.01 : 0, // Quarterly dividends
        splits: i % 1000 === 0 ? 2 : 1, // Occasional stock splits
      })
    }

    return data
  }

  private initializePatternRecognition() {
    const patterns = [
      {
        name: "Head and Shoulders",
        type: "reversal",
        bearish: true,
        minPeriods: 20,
        reliability: 0.75,
      },
      {
        name: "Double Top",
        type: "reversal",
        bearish: true,
        minPeriods: 15,
        reliability: 0.7,
      },
      {
        name: "Double Bottom",
        type: "reversal",
        bearish: false,
        minPeriods: 15,
        reliability: 0.7,
      },
      {
        name: "Cup and Handle",
        type: "continuation",
        bearish: false,
        minPeriods: 30,
        reliability: 0.8,
      },
      {
        name: "Ascending Triangle",
        type: "continuation",
        bearish: false,
        minPeriods: 10,
        reliability: 0.72,
      },
      {
        name: "Descending Triangle",
        type: "continuation",
        bearish: true,
        minPeriods: 10,
        reliability: 0.72,
      },
      {
        name: "Symmetrical Triangle",
        type: "continuation",
        bearish: null,
        minPeriods: 10,
        reliability: 0.65,
      },
      {
        name: "Flag",
        type: "continuation",
        bearish: null,
        minPeriods: 5,
        reliability: 0.68,
      },
      {
        name: "Pennant",
        type: "continuation",
        bearish: null,
        minPeriods: 5,
        reliability: 0.68,
      },
      {
        name: "Wedge",
        type: "reversal",
        bearish: null,
        minPeriods: 15,
        reliability: 0.65,
      },
    ]

    patterns.forEach((pattern) => {
      this.patternRecognition.set(pattern.name, pattern)
    })
  }

  private startRealTimeAnalysis() {
    setInterval(() => {
      this.updateRealTimeData()
      this.analyzePatterns()
      this.updateVolumeAnalysis()
    }, 5000) // Update every 5 seconds
  }

  private updateRealTimeData() {
    const symbols = Array.from(this.stockDatabase.keys())

    symbols.forEach((symbol) => {
      const historical = this.historicalData.get(symbol)
      if (historical && historical.length > 0) {
        const lastData = historical[historical.length - 1]
        const currentPrice = lastData.close * (1 + (Math.random() - 0.5) * 0.02)
        const currentVolume = lastData.volume * (0.8 + Math.random() * 0.4)

        // Add real-time data point
        const now = new Date()
        const realTimeData = {
          date: now.toISOString().split("T")[0],
          time: now.toTimeString().split(" ")[0],
          price: currentPrice,
          volume: Math.floor(currentVolume),
          change: currentPrice - lastData.close,
          changePercent: ((currentPrice - lastData.close) / lastData.close) * 100,
        }

        // Store real-time data
        if (!this.stockDatabase.get(symbol).realTime) {
          this.stockDatabase.get(symbol).realTime = []
        }
        this.stockDatabase.get(symbol).realTime.push(realTimeData)

        // Keep only last 100 real-time data points
        if (this.stockDatabase.get(symbol).realTime.length > 100) {
          this.stockDatabase.get(symbol).realTime.shift()
        }
      }
    })
  }

  private analyzePatterns() {
    const symbols = Array.from(this.stockDatabase.keys())

    symbols.forEach((symbol) => {
      const historical = this.historicalData.get(symbol)
      if (historical && historical.length >= 30) {
        const recentData = historical.slice(-50) // Last 50 days
        const detectedPatterns = this.detectPatterns(recentData)

        this.stockDatabase.get(symbol).patterns = detectedPatterns
      }
    })
  }

  private detectPatterns(data: any[]) {
    const patterns = []

    // Simplified pattern detection (in reality, this would be much more sophisticated)
    if (data.length >= 20) {
      // Head and Shoulders detection
      if (this.detectHeadAndShoulders(data)) {
        patterns.push({
          name: "Head and Shoulders",
          confidence: 0.7 + Math.random() * 0.2,
          type: "reversal",
          bearish: true,
          target: this.calculatePatternTarget(data, "head_and_shoulders"),
          timeframe: "2-4 weeks",
        })
      }

      // Double Bottom detection
      if (this.detectDoubleBottom(data)) {
        patterns.push({
          name: "Double Bottom",
          confidence: 0.65 + Math.random() * 0.25,
          type: "reversal",
          bearish: false,
          target: this.calculatePatternTarget(data, "double_bottom"),
          timeframe: "3-6 weeks",
        })
      }

      // Cup and Handle detection
      if (this.detectCupAndHandle(data)) {
        patterns.push({
          name: "Cup and Handle",
          confidence: 0.75 + Math.random() * 0.2,
          type: "continuation",
          bearish: false,
          target: this.calculatePatternTarget(data, "cup_and_handle"),
          timeframe: "4-8 weeks",
        })
      }
    }

    return patterns
  }

  private detectHeadAndShoulders(data: any[]) {
    // Simplified detection - look for three peaks with middle one highest
    const peaks = this.findPeaks(data)
    if (peaks.length >= 3) {
      const lastThree = peaks.slice(-3)
      return lastThree[1].high > lastThree[0].high && lastThree[1].high > lastThree[2].high
    }
    return false
  }

  private detectDoubleBottom(data: any[]) {
    // Look for two similar lows
    const troughs = this.findTroughs(data)
    if (troughs.length >= 2) {
      const lastTwo = troughs.slice(-2)
      const diff = Math.abs(lastTwo[0].low - lastTwo[1].low) / lastTwo[0].low
      return diff < 0.03 // Within 3%
    }
    return false
  }

  private detectCupAndHandle(data: any[]) {
    // Look for U-shaped pattern followed by small consolidation
    if (data.length < 30) return false

    const firstHalf = data.slice(0, Math.floor(data.length / 2))
    const secondHalf = data.slice(Math.floor(data.length / 2))

    const firstHalfTrend = this.calculateTrend(firstHalf)
    const secondHalfTrend = this.calculateTrend(secondHalf)

    return firstHalfTrend < -0.1 && secondHalfTrend > 0.1 // Down then up
  }

  private findPeaks(data: any[]) {
    const peaks = []
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i].high > data[i - 1].high && data[i].high > data[i + 1].high) {
        peaks.push(data[i])
      }
    }
    return peaks
  }

  private findTroughs(data: any[]) {
    const troughs = []
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i].low < data[i - 1].low && data[i].low < data[i + 1].low) {
        troughs.push(data[i])
      }
    }
    return troughs
  }

  private calculateTrend(data: any[]) {
    if (data.length < 2) return 0
    const start = data[0].close
    const end = data[data.length - 1].close
    return (end - start) / start
  }

  private calculatePatternTarget(data: any[], patternType: string) {
    const currentPrice = data[data.length - 1].close

    switch (patternType) {
      case "head_and_shoulders":
        return currentPrice * 0.9 // 10% decline target
      case "double_bottom":
        return currentPrice * 1.15 // 15% upside target
      case "cup_and_handle":
        return currentPrice * 1.2 // 20% upside target
      default:
        return currentPrice
    }
  }

  private updateVolumeAnalysis() {
    const symbols = Array.from(this.stockDatabase.keys())

    symbols.forEach((symbol) => {
      const historical = this.historicalData.get(symbol)
      if (historical && historical.length >= 20) {
        const recentData = historical.slice(-20)
        const volumeAnalysis = this.analyzeVolume(recentData)

        this.volumeAnalysis.set(symbol, volumeAnalysis)
      }
    })
  }

  private analyzeVolume(data: any[]) {
    const volumes = data.map((d) => d.volume)
    const avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length
    const currentVolume = volumes[volumes.length - 1]

    const volumeRatio = currentVolume / avgVolume
    const volumeTrend = this.calculateVolumeTrend(data)

    return {
      currentVolume,
      averageVolume: avgVolume,
      volumeRatio,
      volumeTrend,
      analysis: this.interpretVolumeAnalysis(volumeRatio, volumeTrend),
    }
  }

  private calculateVolumeTrend(data: any[]) {
    const volumes = data.map((d) => d.volume)
    const firstHalf = volumes.slice(0, Math.floor(volumes.length / 2))
    const secondHalf = volumes.slice(Math.floor(volumes.length / 2))

    const firstAvg = firstHalf.reduce((sum, vol) => sum + vol, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, vol) => sum + vol, 0) / secondHalf.length

    return (secondAvg - firstAvg) / firstAvg
  }

  private interpretVolumeAnalysis(volumeRatio: number, volumeTrend: number) {
    if (volumeRatio > 2 && volumeTrend > 0.2) {
      return "Strong buying interest - High volume with increasing trend"
    } else if (volumeRatio > 1.5) {
      return "Above average volume - Increased interest"
    } else if (volumeRatio < 0.5) {
      return "Below average volume - Low interest"
    } else if (volumeTrend > 0.3) {
      return "Volume increasing - Growing interest"
    } else if (volumeTrend < -0.3) {
      return "Volume decreasing - Waning interest"
    } else {
      return "Normal volume activity"
    }
  }

  // Public API Methods
  async getComprehensiveStockAnalysis(symbol: string) {
    const stock = this.stockDatabase.get(symbol)
    if (!stock) {
      throw new Error(`Stock ${symbol} not found`)
    }

    const historical = this.historicalData.get(symbol)
    const volumeAnalysis = this.volumeAnalysis.get(symbol)
    const aiAnalysis = await aiBrainService.getIntelligentRecommendation(symbol)

    // Calculate comprehensive metrics
    const metrics = this.calculateComprehensiveMetrics(historical)
    const technicalIndicators = this.calculateTechnicalIndicators(historical)
    const buyScore = await this.calculateBuyScore(symbol, aiAnalysis, metrics, technicalIndicators)
    const marketClassification = this.classifyMarketCondition(historical, metrics)

    return {
      stock,
      currentPrice: this.getCurrentPrice(symbol),
      historical: historical.slice(-252), // Last year of data
      realTimeData: stock.realTime || [],
      patterns: stock.patterns || [],
      volumeAnalysis,
      metrics,
      technicalIndicators,
      aiAnalysis,
      buyScore,
      marketClassification,
      tradingSignals: this.generateTradingSignals(symbol, metrics, technicalIndicators, aiAnalysis),
      riskAssessment: this.assessRisk(symbol, metrics, technicalIndicators),
      priceTargets: this.calculatePriceTargets(symbol, metrics, technicalIndicators, aiAnalysis),
      entryExitPoints: this.calculateEntryExitPoints(symbol, technicalIndicators, aiAnalysis),
      performanceSinceIPO: this.calculatePerformanceSinceIPO(symbol),
      keyEvents: this.identifyKeyEvents(symbol, historical),
      competitorAnalysis: this.getCompetitorAnalysis(symbol),
      analystConsensus: this.generateAnalystConsensus(symbol, metrics),
      recommendation: this.generateFinalRecommendation(symbol, buyScore, aiAnalysis, marketClassification),
    }
  }

  private getCurrentPrice(symbol: string) {
    const stock = this.stockDatabase.get(symbol)
    if (stock.realTime && stock.realTime.length > 0) {
      return stock.realTime[stock.realTime.length - 1].price
    }

    const historical = this.historicalData.get(symbol)
    return historical[historical.length - 1].close
  }

  private calculateComprehensiveMetrics(historical: any[]) {
    if (!historical || historical.length === 0) return {}

    const prices = historical.map((d) => d.close)
    const volumes = historical.map((d) => d.volume)
    const highs = historical.map((d) => d.high)
    const lows = historical.map((d) => d.low)

    // Performance metrics
    const currentPrice = prices[prices.length - 1]
    const yearAgoPrice = prices.length >= 252 ? prices[prices.length - 252] : prices[0]
    const monthAgoPrice = prices.length >= 21 ? prices[prices.length - 21] : prices[0]
    const weekAgoPrice = prices.length >= 5 ? prices[prices.length - 5] : prices[0]

    // Volatility calculations
    const returns = []
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
    }

    const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length
    const volatility = Math.sqrt(variance) * Math.sqrt(252) // Annualized

    // Support and resistance levels
    const recent50 = historical.slice(-50)
    const supportLevel = Math.min(...recent50.map((d) => d.low))
    const resistanceLevel = Math.max(...recent50.map((d) => d.high))

    // 52-week high/low
    const year52High = Math.max(...highs.slice(-252))
    const year52Low = Math.min(...lows.slice(-252))

    return {
      performance: {
        ytd: ((currentPrice - yearAgoPrice) / yearAgoPrice) * 100,
        month: ((currentPrice - monthAgoPrice) / monthAgoPrice) * 100,
        week: ((currentPrice - weekAgoPrice) / weekAgoPrice) * 100,
        day: returns[returns.length - 1] * 100,
      },
      volatility: {
        annualized: volatility * 100,
        daily: Math.sqrt(variance) * 100,
      },
      levels: {
        support: supportLevel,
        resistance: resistanceLevel,
        year52High,
        year52Low,
        distanceFromHigh: ((currentPrice - year52High) / year52High) * 100,
        distanceFromLow: ((currentPrice - year52Low) / year52Low) * 100,
      },
      volume: {
        average: volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length,
        current: volumes[volumes.length - 1],
        trend: this.calculateVolumeTrend(historical.slice(-20)),
      },
    }
  }

  private calculateTechnicalIndicators(historical: any[]) {
    if (!historical || historical.length < 50) return {}

    const prices = historical.map((d) => d.close)
    const highs = historical.map((d) => d.high)
    const lows = historical.map((d) => d.low)
    const volumes = historical.map((d) => d.volume)

    // Moving Averages
    const sma20 = this.calculateSMA(prices, 20)
    const sma50 = this.calculateSMA(prices, 50)
    const sma200 = this.calculateSMA(prices, 200)
    const ema12 = this.calculateEMA(prices, 12)
    const ema26 = this.calculateEMA(prices, 26)

    // RSI
    const rsi = this.calculateRSI(prices, 14)

    // MACD
    const macd = this.calculateMACD(prices)

    // Bollinger Bands
    const bollingerBands = this.calculateBollingerBands(prices, 20, 2)

    // Stochastic
    const stochastic = this.calculateStochastic(highs, lows, prices, 14)

    // ATR
    const atr = this.calculateATR(highs, lows, prices, 14)

    // Volume indicators
    const obv = this.calculateOBV(prices, volumes)

    return {
      movingAverages: {
        sma20: sma20[sma20.length - 1],
        sma50: sma50[sma50.length - 1],
        sma200: sma200[sma200.length - 1],
        ema12: ema12[ema12.length - 1],
        ema26: ema26[ema26.length - 1],
      },
      momentum: {
        rsi: rsi[rsi.length - 1],
        macd: {
          line: macd.line[macd.line.length - 1],
          signal: macd.signal[macd.signal.length - 1],
          histogram: macd.histogram[macd.histogram.length - 1],
        },
        stochastic: {
          k: stochastic.k[stochastic.k.length - 1],
          d: stochastic.d[stochastic.d.length - 1],
        },
      },
      volatility: {
        bollingerBands: {
          upper: bollingerBands.upper[bollingerBands.upper.length - 1],
          middle: bollingerBands.middle[bollingerBands.middle.length - 1],
          lower: bollingerBands.lower[bollingerBands.lower.length - 1],
        },
        atr: atr[atr.length - 1],
      },
      volume: {
        obv: obv[obv.length - 1],
      },
      trends: {
        shortTerm: this.determineTrend(sma20, sma50),
        mediumTerm: this.determineTrend(sma50, sma200),
        longTerm: this.determineTrend(prices.slice(-200), sma200),
      },
    }
  }

  private calculateSMA(prices: number[], period: number) {
    const sma = []
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
      sma.push(sum / period)
    }
    return sma
  }

  private calculateEMA(prices: number[], period: number) {
    const ema = []
    const multiplier = 2 / (period + 1)

    // Start with SMA for first value
    const firstSMA = prices.slice(0, period).reduce((a, b) => a + b, 0) / period
    ema.push(firstSMA)

    for (let i = period; i < prices.length; i++) {
      const emaValue = (prices[i] - ema[ema.length - 1]) * multiplier + ema[ema.length - 1]
      ema.push(emaValue)
    }

    return ema
  }

  private calculateRSI(prices: number[], period: number) {
    const gains = []
    const losses = []

    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1]
      gains.push(change > 0 ? change : 0)
      losses.push(change < 0 ? Math.abs(change) : 0)
    }

    const rsi = []
    for (let i = period - 1; i < gains.length; i++) {
      const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
      const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period

      if (avgLoss === 0) {
        rsi.push(100)
      } else {
        const rs = avgGain / avgLoss
        rsi.push(100 - 100 / (1 + rs))
      }
    }

    return rsi
  }

  private calculateMACD(prices: number[]) {
    const ema12 = this.calculateEMA(prices, 12)
    const ema26 = this.calculateEMA(prices, 26)

    const macdLine = []
    const startIndex = Math.max(0, ema26.length - ema12.length)

    for (let i = 0; i < ema12.length - startIndex; i++) {
      macdLine.push(ema12[i + startIndex] - ema26[i])
    }

    const signalLine = this.calculateEMA(macdLine, 9)
    const histogram = []

    for (let i = 0; i < signalLine.length; i++) {
      histogram.push(macdLine[i + macdLine.length - signalLine.length] - signalLine[i])
    }

    return {
      line: macdLine,
      signal: signalLine,
      histogram,
    }
  }

  private calculateBollingerBands(prices: number[], period: number, stdDev: number) {
    const sma = this.calculateSMA(prices, period)
    const upper = []
    const lower = []

    for (let i = 0; i < sma.length; i++) {
      const slice = prices.slice(i, i + period)
      const mean = sma[i]
      const variance = slice.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / period
      const standardDeviation = Math.sqrt(variance)

      upper.push(mean + standardDeviation * stdDev)
      lower.push(mean - standardDeviation * stdDev)
    }

    return {
      upper,
      middle: sma,
      lower,
    }
  }

  private calculateStochastic(highs: number[], lows: number[], closes: number[], period: number) {
    const k = []

    for (let i = period - 1; i < closes.length; i++) {
      const highestHigh = Math.max(...highs.slice(i - period + 1, i + 1))
      const lowestLow = Math.min(...lows.slice(i - period + 1, i + 1))
      const currentClose = closes[i]

      const kValue = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100
      k.push(kValue)
    }

    const d = this.calculateSMA(k, 3)

    return { k, d }
  }

  private calculateATR(highs: number[], lows: number[], closes: number[], period: number) {
    const trueRanges = []

    for (let i = 1; i < highs.length; i++) {
      const tr1 = highs[i] - lows[i]
      const tr2 = Math.abs(highs[i] - closes[i - 1])
      const tr3 = Math.abs(lows[i] - closes[i - 1])

      trueRanges.push(Math.max(tr1, tr2, tr3))
    }

    return this.calculateSMA(trueRanges, period)
  }

  private calculateOBV(prices: number[], volumes: number[]) {
    const obv = [volumes[0]]

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        obv.push(obv[obv.length - 1] + volumes[i])
      } else if (prices[i] < prices[i - 1]) {
        obv.push(obv[obv.length - 1] - volumes[i])
      } else {
        obv.push(obv[obv.length - 1])
      }
    }

    return obv
  }

  private determineTrend(data1: number[], data2: number[]) {
    if (!data1 || !data2 || data1.length === 0 || data2.length === 0) return "neutral"

    const current1 = data1[data1.length - 1]
    const current2 = data2[data2.length - 1]

    if (current1 > current2) return "bullish"
    if (current1 < current2) return "bearish"
    return "neutral"
  }

  private async calculateBuyScore(symbol: string, aiAnalysis: any, metrics: any, technicalIndicators: any) {
    let score = 50 // Start with neutral score

    // Technical Analysis Score (30 points)
    const technical = technicalIndicators

    // RSI scoring
    if (technical.momentum?.rsi) {
      if (technical.momentum.rsi < 30)
        score += 8 // Oversold
      else if (technical.momentum.rsi > 70)
        score -= 8 // Overbought
      else if (technical.momentum.rsi >= 40 && technical.momentum.rsi <= 60) score += 3 // Neutral zone
    }

    // MACD scoring
    if (technical.momentum?.macd) {
      if (technical.momentum.macd.line > technical.momentum.macd.signal) score += 5
      if (technical.momentum.macd.histogram > 0) score += 3
    }

    // Moving Average scoring
    if (technical.movingAverages) {
      const currentPrice = this.getCurrentPrice(symbol)
      if (currentPrice > technical.movingAverages.sma20) score += 3
      if (currentPrice > technical.movingAverages.sma50) score += 4
      if (currentPrice > technical.movingAverages.sma200) score += 5
      if (technical.movingAverages.sma20 > technical.movingAverages.sma50) score += 3
      if (technical.movingAverages.sma50 > technical.movingAverages.sma200) score += 4
    }

    // Trend scoring
    if (technical.trends) {
      if (technical.trends.shortTerm === "bullish") score += 4
      if (technical.trends.mediumTerm === "bullish") score += 5
      if (technical.trends.longTerm === "bullish") score += 6
    }

    // Performance Score (20 points)
    if (metrics.performance) {
      if (metrics.performance.week > 0) score += 2
      if (metrics.performance.month > 0) score += 3
      if (metrics.performance.ytd > 0) score += 5
      if (metrics.performance.week > 5) score += 3 // Strong weekly performance
      if (metrics.performance.month > 10) score += 4 // Strong monthly performance
      if (metrics.performance.ytd > 20) score += 3 // Strong yearly performance
    }

    // Volume Score (10 points)
    const volumeAnalysis = this.volumeAnalysis.get(symbol)
    if (volumeAnalysis) {
      if (volumeAnalysis.volumeRatio > 1.5) score += 4 // High volume
      if (volumeAnalysis.volumeTrend > 0.2) score += 3 // Increasing volume
      if (volumeAnalysis.volumeRatio > 2) score += 3 // Very high volume
    }

    // AI Analysis Score (25 points)
    if (aiAnalysis) {
      if (aiAnalysis.action === "BUY") {
        score += Math.floor(aiAnalysis.confidence * 15)
      } else if (aiAnalysis.action === "SELL") {
        score -= Math.floor(aiAnalysis.confidence * 15)
      }

      if (aiAnalysis.strength > 0.8) score += 5
      if (aiAnalysis.supportingFactors && aiAnalysis.supportingFactors.length > 3) score += 3
      if (aiAnalysis.riskFactors && aiAnalysis.riskFactors.length < 2) score += 2
    }

    // Pattern Score (10 points)
    const stock = this.stockDatabase.get(symbol)
    if (stock.patterns && stock.patterns.length > 0) {
      stock.patterns.forEach((pattern) => {
        if (!pattern.bearish && pattern.confidence > 0.7) {
          score += 4
        } else if (pattern.bearish && pattern.confidence > 0.7) {
          score -= 4
        }
      })
    }

    // Support/Resistance Score (5 points)
    if (metrics.levels) {
      const currentPrice = this.getCurrentPrice(symbol)
      const distanceFromSupport = (currentPrice - metrics.levels.support) / metrics.levels.support
      const distanceFromResistance = (metrics.levels.resistance - currentPrice) / currentPrice

      if (distanceFromSupport < 0.05) score += 3 // Near support
      if (distanceFromResistance > 0.1) score += 2 // Far from resistance
    }

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score))

    return {
      overall: score,
      rating: this.getScoreRating(score),
      components: {
        technical: Math.min(30, Math.max(0, score * 0.3)),
        performance: Math.min(20, Math.max(0, score * 0.2)),
        volume: Math.min(10, Math.max(0, score * 0.1)),
        ai: Math.min(25, Math.max(0, score * 0.25)),
        patterns: Math.min(10, Math.max(0, score * 0.1)),
        levels: Math.min(5, Math.max(0, score * 0.05)),
      },
    }
  }

  private getScoreRating(score: number) {
    if (score >= 80) return "STRONG BUY"
    if (score >= 65) return "BUY"
    if (score >= 55) return "WEAK BUY"
    if (score >= 45) return "HOLD"
    if (score >= 35) return "WEAK SELL"
    if (score >= 20) return "SELL"
    return "STRONG SELL"
  }

  private classifyMarketCondition(historical: any[], metrics: any) {
    const prices = historical.map((d) => d.close)
    const currentPrice = prices[prices.length - 1]

    // Calculate trend over different periods
    const trend20 = this.calculateTrendStrength(prices.slice(-20))
    const trend50 = this.calculateTrendStrength(prices.slice(-50))
    const trend200 = this.calculateTrendStrength(prices.slice(-200))

    // Volume analysis
    const volumeAnalysis = this.volumeAnalysis.get(historical[0]?.symbol)

    // Determine bull or bear market based on multiple factors
    let bullishFactors = 0
    let bearishFactors = 0

    // Price trend factors
    if (trend20 > 0.05) bullishFactors++
    if (trend50 > 0.1) bullishFactors++
    if (trend200 > 0.15) bullishFactors++

    if (trend20 < -0.05) bearishFactors++
    if (trend50 < -0.1) bearishFactors++
    if (trend200 < -0.15) bearishFactors++

    // Performance factors
    if (metrics.performance?.month > 5) bullishFactors++
    if (metrics.performance?.ytd > 10) bullishFactors++

    if (metrics.performance?.month < -5) bearishFactors++
    if (metrics.performance?.ytd < -10) bearishFactors++

    // Volume factors
    if (volumeAnalysis?.volumeTrend > 0.2) bullishFactors++
    if (volumeAnalysis?.volumeTrend < -0.2) bearishFactors++

    // 52-week position
    if (metrics.levels?.distanceFromHigh > -10) bullishFactors++
    if (metrics.levels?.distanceFromLow > 50) bullishFactors++

    if (metrics.levels?.distanceFromHigh < -20) bearishFactors++
    if (metrics.levels?.distanceFromLow < 20) bearishFactors++

    // Determine classification
    let classification = "NEUTRAL"
    let confidence = 0.5

    if (bullishFactors > bearishFactors + 2) {
      classification = "BULL MARKET"
      confidence = Math.min(0.95, 0.6 + (bullishFactors - bearishFactors) * 0.1)
    } else if (bearishFactors > bullishFactors + 2) {
      classification = "BEAR MARKET"
      confidence = Math.min(0.95, 0.6 + (bearishFactors - bullishFactors) * 0.1)
    } else if (bullishFactors > bearishFactors) {
      classification = "BULLISH TREND"
      confidence = 0.6
    } else if (bearishFactors > bullishFactors) {
      classification = "BEARISH TREND"
      confidence = 0.6
    }

    return {
      classification,
      confidence,
      bullishFactors,
      bearishFactors,
      trends: {
        short: trend20 > 0 ? "UP" : "DOWN",
        medium: trend50 > 0 ? "UP" : "DOWN",
        long: trend200 > 0 ? "UP" : "DOWN",
      },
      description: this.getMarketDescription(classification, bullishFactors, bearishFactors),
    }
  }

  private calculateTrendStrength(prices: number[]) {
    if (prices.length < 2) return 0
    const start = prices[0]
    const end = prices[prices.length - 1]
    return (end - start) / start
  }

  private getMarketDescription(classification: string, bullishFactors: number, bearishFactors: number) {
    switch (classification) {
      case "BULL MARKET":
        return `Strong upward trend with ${bullishFactors} bullish indicators. Characterized by sustained price increases, high investor confidence, and strong economic fundamentals.`
      case "BEAR MARKET":
        return `Significant downward trend with ${bearishFactors} bearish indicators. Marked by declining prices, negative sentiment, and potential economic headwinds.`
      case "BULLISH TREND":
        return `Positive momentum with ${bullishFactors} bullish factors. Shows signs of upward movement but not yet a confirmed bull market.`
      case "BEARISH TREND":
        return `Negative momentum with ${bearishFactors} bearish factors. Showing signs of weakness but not yet a confirmed bear market.`
      default:
        return "Market is in a neutral state with mixed signals. No clear directional bias at this time."
    }
  }

  private generateTradingSignals(symbol: string, metrics: any, technicalIndicators: any, aiAnalysis: any) {
    const signals = []
    const currentPrice = this.getCurrentPrice(symbol)

    // RSI signals
    if (technicalIndicators.momentum?.rsi) {
      if (technicalIndicators.momentum.rsi < 30) {
        signals.push({
          type: "BUY",
          indicator: "RSI",
          strength: "STRONG",
          description: "RSI indicates oversold conditions",
          confidence: 0.8,
        })
      } else if (technicalIndicators.momentum.rsi > 70) {
        signals.push({
          type: "SELL",
          indicator: "RSI",
          strength: "STRONG",
          description: "RSI indicates overbought conditions",
          confidence: 0.8,
        })
      }
    }

    // MACD signals
    if (technicalIndicators.momentum?.macd) {
      const macd = technicalIndicators.momentum.macd
      if (macd.line > macd.signal && macd.histogram > 0) {
        signals.push({
          type: "BUY",
          indicator: "MACD",
          strength: "MEDIUM",
          description: "MACD bullish crossover",
          confidence: 0.7,
        })
      } else if (macd.line < macd.signal && macd.histogram < 0) {
        signals.push({
          type: "SELL",
          indicator: "MACD",
          strength: "MEDIUM",
          description: "MACD bearish crossover",
          confidence: 0.7,
        })
      }
    }

    // Moving average signals
    if (technicalIndicators.movingAverages) {
      const ma = technicalIndicators.movingAverages
      if (currentPrice > ma.sma20 && ma.sma20 > ma.sma50 && ma.sma50 > ma.sma200) {
        signals.push({
          type: "BUY",
          indicator: "Moving Averages",
          strength: "STRONG",
          description: "Price above all major moving averages",
          confidence: 0.85,
        })
      }
    }

    // Support/Resistance signals
    if (metrics.levels) {
      const distanceFromSupport = (currentPrice - metrics.levels.support) / metrics.levels.support
      const distanceFromResistance = (metrics.levels.resistance - currentPrice) / currentPrice

      if (distanceFromSupport < 0.02) {
        signals.push({
          type: "BUY",
          indicator: "Support Level",
          strength: "MEDIUM",
          description: "Price near strong support level",
          confidence: 0.7,
        })
      }

      if (distanceFromResistance < 0.02) {
        signals.push({
          type: "SELL",
          indicator: "Resistance Level",
          strength: "MEDIUM",
          description: "Price near strong resistance level",
          confidence: 0.7,
        })
      }
    }

    // AI signals
    if (aiAnalysis && aiAnalysis.confidence > 0.7) {
      signals.push({
        type: aiAnalysis.action,
        indicator: "AI Analysis",
        strength: aiAnalysis.confidence > 0.8 ? "STRONG" : "MEDIUM",
        description: `AI recommends ${aiAnalysis.action} with ${(aiAnalysis.confidence * 100).toFixed(0)}% confidence`,
        confidence: aiAnalysis.confidence,
      })
    }

    return signals
  }

  private assessRisk(symbol: string, metrics: any, technicalIndicators: any) {
    let riskScore = 50 // Start with medium risk

    // Volatility risk
    if (metrics.volatility?.annualized > 30) riskScore += 15
    else if (metrics.volatility?.annualized < 15) riskScore -= 10

    // Beta risk (simulated)
    const beta = 0.8 + Math.random() * 0.8 // 0.8 to 1.6
    if (beta > 1.3) riskScore += 10
    else if (beta < 0.8) riskScore -= 5

    // Technical risk
    if (technicalIndicators.momentum?.rsi > 80) riskScore += 10
    if (technicalIndicators.momentum?.rsi < 20) riskScore += 5

    // Position relative to 52-week range
    if (metrics.levels?.distanceFromHigh > -5) riskScore += 8 // Near highs
    if (metrics.levels?.distanceFromLow < 10) riskScore += 5 // Near lows

    // Ensure score is between 0 and 100
    riskScore = Math.max(0, Math.min(100, riskScore))

    let riskLevel = "MEDIUM"
    if (riskScore > 70) riskLevel = "HIGH"
    else if (riskScore < 40) riskLevel = "LOW"

    return {
      score: riskScore,
      level: riskLevel,
      factors: {
        volatility: metrics.volatility?.annualized || 20,
        beta: beta,
        technicalRisk: technicalIndicators.momentum?.rsi > 70 || technicalIndicators.momentum?.rsi < 30,
        positionRisk: metrics.levels?.distanceFromHigh > -10,
      },
      recommendation: this.getRiskRecommendation(riskLevel, riskScore),
    }
  }

  private getRiskRecommendation(riskLevel: string, riskScore: number) {
    switch (riskLevel) {
      case "HIGH":
        return "High risk investment. Consider smaller position sizes and tight stop losses. Suitable for aggressive investors only."
      case "LOW":
        return "Low risk investment. Suitable for conservative investors. Consider larger position sizes with appropriate diversification."
      default:
        return "Medium risk investment. Suitable for moderate investors. Use standard position sizing and risk management."
    }
  }

  private calculatePriceTargets(symbol: string, metrics: any, technicalIndicators: any, aiAnalysis: any) {
    const currentPrice = this.getCurrentPrice(symbol)
    const volatility = metrics.volatility?.annualized || 20

    // Technical targets
    const resistance = metrics.levels?.resistance || currentPrice * 1.1
    const support = metrics.levels?.support || currentPrice * 0.9

    // AI targets
    const aiTarget = aiAnalysis?.priceTargets?.moderate || currentPrice

    // Calculate targets based on multiple methods
    const targets = {
      conservative: Math.min(resistance, currentPrice * 1.05),
      moderate: Math.min(resistance * 1.1, currentPrice * 1.15),
      aggressive: currentPrice * 1.25,
      ai: aiTarget,
      stopLoss: Math.max(support, currentPrice * 0.92),
      timeframe: "3-6 months",
    }

    return targets
  }

  private calculateEntryExitPoints(symbol: string, technicalIndicators: any, aiAnalysis: any) {
    const currentPrice = this.getCurrentPrice(symbol)

    // Entry points based on technical levels
    const entryPoints = []
    const exitPoints = []

    // Support level entry
    if (technicalIndicators.volatility?.bollingerBands?.lower) {
      entryPoints.push({
        price: technicalIndicators.volatility.bollingerBands.lower,
        type: "Support Entry",
        confidence: 0.7,
        description: "Entry near Bollinger Band lower support",
      })
    }

    // Moving average entry
    if (technicalIndicators.movingAverages?.sma20) {
      entryPoints.push({
        price: technicalIndicators.movingAverages.sma20,
        type: "MA Entry",
        confidence: 0.6,
        description: "Entry on pullback to 20-day moving average",
      })
    }

    // Resistance exit
    if (technicalIndicators.volatility?.bollingerBands?.upper) {
      exitPoints.push({
        price: technicalIndicators.volatility.bollingerBands.upper,
        type: "Resistance Exit",
        confidence: 0.7,
        description: "Exit near Bollinger Band upper resistance",
      })
    }

    // AI-based entry/exit
    if (aiAnalysis?.priceTargets) {
      exitPoints.push({
        price: aiAnalysis.priceTargets.moderate,
        type: "AI Target",
        confidence: aiAnalysis.confidence || 0.6,
        description: "AI-calculated price target",
      })
    }

    return {
      entry: entryPoints,
      exit: exitPoints,
      currentPrice,
      recommendation: this.getEntryExitRecommendation(currentPrice, entryPoints, exitPoints),
    }
  }

  private getEntryExitRecommendation(currentPrice: number, entryPoints: any[], exitPoints: any[]) {
    const bestEntry = entryPoints.reduce(
      (best, point) => (point.confidence > best.confidence ? point : best),
      entryPoints[0] || { confidence: 0 },
    )

    const bestExit = exitPoints.reduce(
      (best, point) => (point.confidence > best.confidence ? point : best),
      exitPoints[0] || { confidence: 0 },
    )

    if (bestEntry && currentPrice > bestEntry.price * 1.02) {
      return `Consider waiting for pullback to ${bestEntry.price.toFixed(2)} (${bestEntry.type})`
    } else if (bestEntry && currentPrice <= bestEntry.price * 1.02) {
      return `Good entry opportunity near ${bestEntry.price.toFixed(2)} (${bestEntry.type})`
    } else {
      return "Monitor for better entry opportunities"
    }
  }

  private calculatePerformanceSinceIPO(symbol: string) {
    const stock = this.stockDatabase.get(symbol)
    const historical = this.historicalData.get(symbol)

    if (!stock || !historical || historical.length === 0) return null

    const ipoPrice = stock.ipoPrice
    const currentPrice = this.getCurrentPrice(symbol)
    const totalReturn = ((currentPrice - ipoPrice) / ipoPrice) * 100

    const ipoDate = new Date(stock.ipoDate)
    const today = new Date()
    const yearsListed = (today.getTime() - ipoDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    const annualizedReturn = Math.pow(currentPrice / ipoPrice, 1 / yearsListed) - 1

    return {
      ipoPrice,
      currentPrice,
      totalReturn,
      annualizedReturn: annualizedReturn * 100,
      yearsListed,
      ipoDate: stock.ipoDate,
      milestones: this.identifyPriceMilestones(symbol, historical),
    }
  }

  private identifyPriceMilestones(symbol: string, historical: any[]) {
    const milestones = []
    const prices = historical.map((d) => d.close)

    // Find all-time high
    const allTimeHigh = Math.max(...prices)
    const athIndex = prices.indexOf(allTimeHigh)
    milestones.push({
      type: "All-Time High",
      price: allTimeHigh,
      date: historical[athIndex].date,
      significance: "Highest price ever reached",
    })

    // Find major price levels (multiples of 10, 50, 100)
    const currentPrice = prices[prices.length - 1]
    const majorLevels = [10, 25, 50, 100, 200, 500, 1000]

    majorLevels.forEach((level) => {
      if (currentPrice > level) {
        const firstCrossIndex = prices.findIndex((p) => p >= level)
        if (firstCrossIndex !== -1) {
          milestones.push({
            type: `$${level} Milestone`,
            price: level,
            date: historical[firstCrossIndex].date,
            significance: `First time crossing $${level}`,
          })
        }
      }
    })

    return milestones.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  private identifyKeyEvents(symbol: string, historical: any[]) {
    const events = []
    const prices = historical.map((d) => d.close)
    const volumes = historical.map((d) => d.volume)

    // Find significant price movements
    for (let i = 1; i < historical.length; i++) {
      const priceChange = (prices[i] - prices[i - 1]) / prices[i - 1]
      const volumeRatio =
        volumes[i] / (volumes.slice(Math.max(0, i - 20), i).reduce((a, b) => a + b, 0) / Math.min(20, i))

      if (Math.abs(priceChange) > 0.1 && volumeRatio > 2) {
        // 10%+ move with high volume
        events.push({
          date: historical[i].date,
          type: priceChange > 0 ? "Major Rally" : "Major Decline",
          priceChange: priceChange * 100,
          volume: volumes[i],
          significance: `${Math.abs(priceChange * 100).toFixed(1)}% ${priceChange > 0 ? "gain" : "loss"} on high volume`,
        })
      }
    }

    // Add simulated corporate events
    const corporateEvents = [
      { type: "Earnings Beat", impact: "positive" },
      { type: "Stock Split", impact: "neutral" },
      { type: "Dividend Increase", impact: "positive" },
      { type: "Product Launch", impact: "positive" },
      { type: "Regulatory Approval", impact: "positive" },
    ]

    // Add a few random corporate events
    for (let i = 0; i < 3; i++) {
      const randomEvent = corporateEvents[Math.floor(Math.random() * corporateEvents.length)]
      const randomDate = historical[Math.floor(Math.random() * historical.length)].date

      events.push({
        date: randomDate,
        type: randomEvent.type,
        impact: randomEvent.impact,
        significance: `Corporate event: ${randomEvent.type}`,
      })
    }

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)
  }

  private getCompetitorAnalysis(symbol: string) {
    const stock = this.stockDatabase.get(symbol)
    if (!stock) return null

    // Simulated competitor data based on sector
    const competitors = {
      Technology: ["AAPL", "MSFT", "GOOGL", "NVDA", "META"],
      "Consumer Discretionary": ["TSLA", "AMZN", "NFLX", "NKE", "SBUX"],
      Healthcare: ["JNJ", "PFE", "UNH", "ABBV", "TMO"],
      Financial: ["JPM", "BAC", "WFC", "GS", "MS"],
    }

    const sectorCompetitors = competitors[stock.sector] || []
    const relevantCompetitors = sectorCompetitors.filter((comp) => comp !== symbol).slice(0, 4)

    return {
      sector: stock.sector,
      competitors: relevantCompetitors.map((comp) => ({
        symbol: comp,
        name: this.stockDatabase.get(comp)?.name || comp,
        marketCap: this.stockDatabase.get(comp)?.marketCap || 1000000000,
        performance: (Math.random() - 0.5) * 20, // Random performance
        valuation: "Fair", // Simplified
      })),
      sectorPerformance: (Math.random() - 0.5) * 15,
      marketPosition: Math.floor(Math.random() * 5) + 1,
      competitiveAdvantages: this.getCompetitiveAdvantages(stock),
    }
  }

  private getCompetitiveAdvantages(stock: any) {
    const advantages = {
      AAPL: ["Brand loyalty", "Ecosystem integration", "Premium pricing power"],
      MSFT: ["Cloud dominance", "Enterprise relationships", "Recurring revenue"],
      GOOGL: ["Search monopoly", "Data advantages", "AI capabilities"],
      TSLA: ["EV leadership", "Vertical integration", "Innovation culture"],
      NVDA: ["GPU dominance", "AI acceleration", "CUDA ecosystem"],
    }

    return advantages[stock.symbol] || ["Market position", "Technology", "Brand recognition"]
  }

  private generateAnalystConsensus(symbol: string, metrics: any) {
    // Simulated analyst consensus
    const ratings = ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"]
    const weights = [0.2, 0.3, 0.35, 0.1, 0.05] // Typical distribution

    const consensus = []
    for (let i = 0; i < ratings.length; i++) {
      consensus.push({
        rating: ratings[i],
        count: Math.floor(weights[i] * 20), // Assume 20 analysts
        percentage: weights[i] * 100,
      })
    }

    const avgRating = ratings[1] // Typically "Buy"
    const priceTarget = this.getCurrentPrice(symbol) * (1 + (Math.random() - 0.3) * 0.3) // ±30% variation

    return {
      consensus,
      averageRating: avgRating,
      averagePriceTarget: priceTarget,
      analystCount: 20,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
  }

  private generateFinalRecommendation(symbol: string, buyScore: any, aiAnalysis: any, marketClassification: any) {
    const currentPrice = this.getCurrentPrice(symbol)

    let action = "HOLD"
    let confidence = 0.5
    const reasoning = []

    // Determine action based on buy score
    if (buyScore.overall >= 70) {
      action = "BUY"
      confidence = Math.min(0.95, buyScore.overall / 100)
    } else if (buyScore.overall <= 30) {
      action = "SELL"
      confidence = Math.min(0.95, (100 - buyScore.overall) / 100)
    }

    // Add reasoning based on analysis
    if (buyScore.overall >= 70) {
      reasoning.push(`Strong buy score of ${buyScore.overall}/100`)
    }

    if (aiAnalysis.confidence > 0.7) {
      reasoning.push(
        `AI analysis supports ${aiAnalysis.action} with ${(aiAnalysis.confidence * 100).toFixed(0)}% confidence`,
      )
    }

    if (marketClassification.classification.includes("BULL")) {
      reasoning.push("Stock is in a bull market trend")
    } else if (marketClassification.classification.includes("BEAR")) {
      reasoning.push("Stock is in a bear market trend - exercise caution")
    }

    // Risk considerations
    const riskFactors = aiAnalysis.riskFactors || []
    if (riskFactors.length > 3) {
      reasoning.push("Multiple risk factors identified - consider reduced position size")
    }

    return {
      action,
      confidence,
      reasoning,
      timeframe: aiAnalysis.timeframe || "3-6 months",
      positionSize: this.recommendPositionSize(buyScore.overall, confidence),
      stopLoss: currentPrice * 0.92,
      takeProfit: currentPrice * (action === "BUY" ? 1.15 : 0.85),
      keyFactors: reasoning.slice(0, 3),
      riskLevel: buyScore.overall > 70 ? "MEDIUM" : buyScore.overall < 30 ? "HIGH" : "MEDIUM",
    }
  }

  private recommendPositionSize(score: number, confidence: number) {
    const baseSize = 0.05 // 5% base position
    const scoreMultiplier = score / 100
    const confidenceMultiplier = confidence

    const recommendedSize = baseSize * scoreMultiplier * confidenceMultiplier

    if (recommendedSize > 0.08) return "Large (8-10%)"
    if (recommendedSize > 0.05) return "Medium (5-8%)"
    if (recommendedSize > 0.02) return "Small (2-5%)"
    return "Very Small (1-2%)"
  }

  // Public API for getting all stocks with scores
  async getAllStocksWithScores() {
    const symbols = Array.from(this.stockDatabase.keys())
    const stocksWithScores = []

    for (const symbol of symbols) {
      try {
        const analysis = await this.getComprehensiveStockAnalysis(symbol)
        stocksWithScores.push({
          symbol,
          name: analysis.stock.name,
          sector: analysis.stock.sector,
          currentPrice: analysis.currentPrice,
          buyScore: analysis.buyScore,
          marketClassification: analysis.marketClassification,
          recommendation: analysis.recommendation,
          performance: analysis.metrics.performance,
          volume: analysis.volumeAnalysis,
        })
      } catch (error) {
        console.error(`Error analyzing ${symbol}:`, error)
      }
    }

    return stocksWithScores.sort((a, b) => b.buyScore.overall - a.buyScore.overall)
  }

  // Search and filter stocks
  searchStocks(query: string, filters: any = {}) {
    const symbols = Array.from(this.stockDatabase.keys())
    let results = symbols.map((symbol) => this.stockDatabase.get(symbol))

    // Text search
    if (query) {
      results = results.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase()) ||
          stock.sector.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply filters
    if (filters.sector) {
      results = results.filter((stock) => stock.sector === filters.sector)
    }

    if (filters.minMarketCap) {
      results = results.filter((stock) => stock.marketCap >= filters.minMarketCap)
    }

    if (filters.maxMarketCap) {
      results = results.filter((stock) => stock.marketCap <= filters.maxMarketCap)
    }

    return results
  }
}

export const advancedStockAnalysisService = AdvancedStockAnalysisService.getInstance()
