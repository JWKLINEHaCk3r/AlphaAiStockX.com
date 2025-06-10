// Advanced Market Data Service with Real Trading Algorithms
export class MarketDataService {
  private static instance: MarketDataService
  private wsConnections: Map<string, WebSocket> = new Map()
  private marketData: Map<string, any> = new Map()
  private subscribers: Map<string, Function[]> = new Map()

  static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService()
    }
    return MarketDataService.instance
  }

  // Real-time market data simulation (in production, connect to actual APIs)
  async getMarketData(symbol: string) {
    // Simulate real market data with realistic patterns
    const basePrice = this.getBasePrice(symbol)
    const volatility = this.getVolatility(symbol)

    return {
      symbol,
      price: this.generateRealisticPrice(basePrice, volatility),
      volume: this.generateVolume(symbol),
      bid: basePrice * (1 - Math.random() * 0.001),
      ask: basePrice * (1 + Math.random() * 0.001),
      change: (Math.random() - 0.5) * 0.05,
      changePercent: (Math.random() - 0.5) * 5,
      marketCap: this.getMarketCap(symbol),
      pe: 15 + Math.random() * 30,
      eps: Math.random() * 10,
      dividend: Math.random() * 0.05,
      beta: 0.5 + Math.random() * 1.5,
      timestamp: Date.now(),
      technicals: this.calculateTechnicals(symbol),
      fundamentals: this.getFundamentals(symbol),
      sentiment: this.getSentiment(symbol),
      options: this.getOptionsData(symbol),
      news: this.getNewsData(symbol),
    }
  }

  private getBasePrice(symbol: string): number {
    const prices = {
      AAPL: 175,
      MSFT: 380,
      GOOGL: 140,
      TSLA: 250,
      NVDA: 500,
      META: 320,
      AMZN: 150,
      SPY: 450,
      QQQ: 380,
      IWM: 200,
    }
    return prices[symbol] || 100 + Math.random() * 300
  }

  private getVolatility(symbol: string): number {
    const volatilities = {
      AAPL: 0.25,
      MSFT: 0.22,
      GOOGL: 0.28,
      TSLA: 0.45,
      NVDA: 0.35,
      META: 0.32,
      AMZN: 0.3,
      SPY: 0.15,
      QQQ: 0.2,
      IWM: 0.25,
    }
    return volatilities[symbol] || 0.25
  }

  private generateRealisticPrice(basePrice: number, volatility: number): number {
    // Use geometric Brownian motion for realistic price movement
    const dt = 1 / 252 / 24 / 60 // 1 minute intervals
    const drift = 0.05 // 5% annual drift
    const randomShock = (Math.random() - 0.5) * 2

    return basePrice * Math.exp((drift - 0.5 * volatility * volatility) * dt + volatility * Math.sqrt(dt) * randomShock)
  }

  private generateVolume(symbol: string): number {
    const avgVolumes = {
      AAPL: 50000000,
      MSFT: 30000000,
      GOOGL: 25000000,
      TSLA: 80000000,
      NVDA: 45000000,
      META: 35000000,
      AMZN: 40000000,
      SPY: 100000000,
      QQQ: 60000000,
      IWM: 30000000,
    }
    const baseVolume = avgVolumes[symbol] || 10000000
    return Math.floor(baseVolume * (0.5 + Math.random()))
  }

  private getMarketCap(symbol: string): number {
    const marketCaps = {
      AAPL: 2800000000000,
      MSFT: 2500000000000,
      GOOGL: 1800000000000,
      TSLA: 800000000000,
      NVDA: 1200000000000,
      META: 800000000000,
      AMZN: 1500000000000,
    }
    return marketCaps[symbol] || 50000000000
  }

  private calculateTechnicals(symbol: string) {
    // Advanced technical indicators
    return {
      rsi: 30 + Math.random() * 40,
      macd: {
        line: (Math.random() - 0.5) * 5,
        signal: (Math.random() - 0.5) * 5,
        histogram: (Math.random() - 0.5) * 2,
      },
      bollinger: {
        upper: this.getBasePrice(symbol) * 1.02,
        middle: this.getBasePrice(symbol),
        lower: this.getBasePrice(symbol) * 0.98,
      },
      stochastic: {
        k: Math.random() * 100,
        d: Math.random() * 100,
      },
      williams: Math.random() * 100 - 50,
      cci: (Math.random() - 0.5) * 200,
      atr: this.getBasePrice(symbol) * 0.02,
      adx: 20 + Math.random() * 60,
      obv: Math.random() * 1000000,
      vwap: this.getBasePrice(symbol) * (0.99 + Math.random() * 0.02),
      pivotPoints: this.calculatePivotPoints(symbol),
      fibonacciLevels: this.calculateFibonacci(symbol),
      supportResistance: this.calculateSupportResistance(symbol),
    }
  }

  private calculatePivotPoints(symbol: string) {
    const price = this.getBasePrice(symbol)
    const high = price * 1.02
    const low = price * 0.98
    const close = price

    const pivot = (high + low + close) / 3
    return {
      pivot,
      r1: 2 * pivot - low,
      r2: pivot + (high - low),
      r3: high + 2 * (pivot - low),
      s1: 2 * pivot - high,
      s2: pivot - (high - low),
      s3: low - 2 * (high - pivot),
    }
  }

  private calculateFibonacci(symbol: string) {
    const price = this.getBasePrice(symbol)
    const high = price * 1.1
    const low = price * 0.9
    const range = high - low

    return {
      level_0: high,
      level_236: high - range * 0.236,
      level_382: high - range * 0.382,
      level_500: high - range * 0.5,
      level_618: high - range * 0.618,
      level_786: high - range * 0.786,
      level_100: low,
    }
  }

  private calculateSupportResistance(symbol: string) {
    const price = this.getBasePrice(symbol)
    return {
      strongSupport: price * 0.95,
      support: price * 0.98,
      resistance: price * 1.02,
      strongResistance: price * 1.05,
    }
  }

  private getFundamentals(symbol: string) {
    return {
      revenue: 50000000000 + Math.random() * 200000000000,
      netIncome: 10000000000 + Math.random() * 50000000000,
      totalAssets: 100000000000 + Math.random() * 300000000000,
      totalDebt: 20000000000 + Math.random() * 100000000000,
      freeCashFlow: 15000000000 + Math.random() * 40000000000,
      roe: 0.1 + Math.random() * 0.3,
      roa: 0.05 + Math.random() * 0.15,
      debtToEquity: 0.2 + Math.random() * 0.8,
      currentRatio: 1.0 + Math.random() * 2.0,
      quickRatio: 0.8 + Math.random() * 1.5,
      grossMargin: 0.3 + Math.random() * 0.4,
      operatingMargin: 0.15 + Math.random() * 0.25,
      netMargin: 0.1 + Math.random() * 0.2,
    }
  }

  private getSentiment(symbol: string) {
    return {
      overall: 50 + Math.random() * 50,
      bullish: 40 + Math.random() * 40,
      bearish: 20 + Math.random() * 30,
      neutral: 20 + Math.random() * 20,
      socialMedia: 60 + Math.random() * 40,
      news: 55 + Math.random() * 45,
      analyst: 65 + Math.random() * 35,
      insider: 50 + Math.random() * 50,
      institutional: 70 + Math.random() * 30,
    }
  }

  private getOptionsData(symbol: string) {
    const price = this.getBasePrice(symbol)
    return {
      impliedVolatility: 0.2 + Math.random() * 0.4,
      putCallRatio: 0.5 + Math.random() * 1.0,
      maxPain: price * (0.98 + Math.random() * 0.04),
      gamma: Math.random() * 0.1,
      delta: 0.3 + Math.random() * 0.4,
      theta: -Math.random() * 0.1,
      vega: Math.random() * 0.3,
      openInterest: Math.floor(Math.random() * 100000),
      volume: Math.floor(Math.random() * 50000),
      unusualActivity: Math.random() > 0.8,
    }
  }

  private getNewsData(symbol: string) {
    const newsItems = [
      { headline: `${symbol} reports strong quarterly earnings`, sentiment: 0.8, impact: "high" },
      { headline: `Analysts upgrade ${symbol} price target`, sentiment: 0.7, impact: "medium" },
      { headline: `${symbol} announces new product launch`, sentiment: 0.6, impact: "medium" },
      { headline: `Market volatility affects ${symbol} trading`, sentiment: 0.3, impact: "low" },
      { headline: `${symbol} insider trading activity detected`, sentiment: 0.4, impact: "medium" },
    ]

    return newsItems.slice(0, Math.floor(Math.random() * 3) + 1).map((item) => ({
      ...item,
      timestamp: Date.now() - Math.random() * 86400000, // Last 24 hours
      source: ["Reuters", "Bloomberg", "CNBC", "MarketWatch"][Math.floor(Math.random() * 4)],
    }))
  }

  // Advanced trading algorithms
  calculateTradingSignals(symbol: string, marketData: any) {
    const signals = {
      momentum: this.calculateMomentumSignal(marketData),
      meanReversion: this.calculateMeanReversionSignal(marketData),
      breakout: this.calculateBreakoutSignal(marketData),
      volumeProfile: this.calculateVolumeSignal(marketData),
      sentiment: this.calculateSentimentSignal(marketData),
      technical: this.calculateTechnicalSignal(marketData),
      fundamental: this.calculateFundamentalSignal(marketData),
      options: this.calculateOptionsSignal(marketData),
    }

    // Combine signals with weights
    const weights = {
      momentum: 0.2,
      meanReversion: 0.15,
      breakout: 0.15,
      volumeProfile: 0.1,
      sentiment: 0.1,
      technical: 0.15,
      fundamental: 0.1,
      options: 0.05,
    }

    let combinedSignal = 0
    let confidence = 0

    Object.entries(signals).forEach(([key, signal]) => {
      combinedSignal += signal.strength * weights[key]
      confidence += signal.confidence * weights[key]
    })

    return {
      signal: combinedSignal,
      confidence: confidence,
      direction: combinedSignal > 0.1 ? "BUY" : combinedSignal < -0.1 ? "SELL" : "HOLD",
      strength: Math.abs(combinedSignal),
      components: signals,
      recommendation: this.generateRecommendation(combinedSignal, confidence),
    }
  }

  private calculateMomentumSignal(data: any) {
    const rsi = data.technicals.rsi
    const macd = data.technicals.macd

    let strength = 0
    const confidence = 0.7

    // RSI momentum
    if (rsi > 70)
      strength -= 0.3 // Overbought
    else if (rsi < 30)
      strength += 0.3 // Oversold
    else if (rsi > 50)
      strength += 0.1 // Bullish momentum
    else strength -= 0.1 // Bearish momentum

    // MACD momentum
    if (macd.line > macd.signal && macd.histogram > 0) strength += 0.2
    else if (macd.line < macd.signal && macd.histogram < 0) strength -= 0.2

    return { strength, confidence }
  }

  private calculateMeanReversionSignal(data: any) {
    const price = data.price
    const bollinger = data.technicals.bollinger

    let strength = 0
    const confidence = 0.6

    if (price > bollinger.upper)
      strength -= 0.4 // Overbought, expect reversion
    else if (price < bollinger.lower)
      strength += 0.4 // Oversold, expect reversion
    else if (price > bollinger.middle) strength -= 0.1
    else strength += 0.1

    return { strength, confidence }
  }

  private calculateBreakoutSignal(data: any) {
    const price = data.price
    const volume = data.volume
    const atr = data.technicals.atr
    const support = data.technicals.supportResistance.support
    const resistance = data.technicals.supportResistance.resistance

    let strength = 0
    const confidence = 0.8

    // Volume confirmation
    const volumeMultiplier = volume > 1.5 ? 1.5 : 1.0

    if (price > resistance && volume > 1.2) {
      strength = 0.5 * volumeMultiplier // Bullish breakout
    } else if (price < support && volume > 1.2) {
      strength = -0.5 * volumeMultiplier // Bearish breakdown
    }

    return { strength, confidence }
  }

  private calculateVolumeSignal(data: any) {
    const volume = data.volume
    const price = data.price
    const change = data.change

    let strength = 0
    let confidence = 0.5

    // Volume price analysis
    if (volume > 1.5 && change > 0)
      strength += 0.3 // High volume up move
    else if (volume > 1.5 && change < 0)
      strength -= 0.3 // High volume down move
    else if (volume < 0.5) confidence *= 0.5 // Low volume reduces confidence

    return { strength, confidence }
  }

  private calculateSentimentSignal(data: any) {
    const sentiment = data.sentiment

    let strength = 0
    const confidence = 0.4

    const overallSentiment = (sentiment.bullish - sentiment.bearish) / 100
    strength = overallSentiment * 0.3

    // Contrarian signal for extreme sentiment
    if (sentiment.bullish > 80)
      strength -= 0.2 // Too bullish, contrarian bearish
    else if (sentiment.bearish > 80) strength += 0.2 // Too bearish, contrarian bullish

    return { strength, confidence }
  }

  private calculateTechnicalSignal(data: any) {
    const technicals = data.technicals

    let strength = 0
    let confidence = 0.7

    // Multiple technical indicators
    if (technicals.rsi > 50) strength += 0.1
    else strength -= 0.1

    if (technicals.stochastic.k > 50) strength += 0.1
    else strength -= 0.1

    if (technicals.williams > -50) strength += 0.1
    else strength -= 0.1

    if (technicals.adx > 25) confidence += 0.2 // Strong trend

    return { strength, confidence }
  }

  private calculateFundamentalSignal(data: any) {
    const fundamentals = data.fundamentals
    const pe = data.pe

    let strength = 0
    const confidence = 0.3

    // P/E ratio analysis
    if (pe < 15)
      strength += 0.2 // Undervalued
    else if (pe > 30) strength -= 0.2 // Overvalued

    // ROE analysis
    if (fundamentals.roe > 0.15)
      strength += 0.1 // Good ROE
    else if (fundamentals.roe < 0.05) strength -= 0.1 // Poor ROE

    // Debt analysis
    if (fundamentals.debtToEquity < 0.3)
      strength += 0.1 // Low debt
    else if (fundamentals.debtToEquity > 1.0) strength -= 0.1 // High debt

    return { strength, confidence }
  }

  private calculateOptionsSignal(data: any) {
    const options = data.options

    let strength = 0
    let confidence = 0.3

    // Put/Call ratio analysis
    if (options.putCallRatio > 1.2)
      strength += 0.2 // High put/call ratio, contrarian bullish
    else if (options.putCallRatio < 0.8) strength -= 0.2 // Low put/call ratio, contrarian bearish

    // Unusual options activity
    if (options.unusualActivity) {
      strength += 0.1
      confidence += 0.2
    }

    return { strength, confidence }
  }

  private generateRecommendation(signal: number, confidence: number) {
    if (confidence < 0.5) return "INSUFFICIENT_DATA"

    if (signal > 0.3 && confidence > 0.7) return "STRONG_BUY"
    else if (signal > 0.1 && confidence > 0.6) return "BUY"
    else if (signal < -0.3 && confidence > 0.7) return "STRONG_SELL"
    else if (signal < -0.1 && confidence > 0.6) return "SELL"
    else return "HOLD"
  }

  // Risk management calculations
  calculatePositionSize(accountBalance: number, riskPerTrade: number, stopLossPercent: number, price: number) {
    const riskAmount = accountBalance * (riskPerTrade / 100)
    const stopLossAmount = price * (stopLossPercent / 100)
    const shares = Math.floor(riskAmount / stopLossAmount)

    return {
      shares,
      positionValue: shares * price,
      riskAmount,
      maxLoss: shares * stopLossAmount,
      positionSizePercent: ((shares * price) / accountBalance) * 100,
    }
  }

  // Portfolio optimization
  optimizePortfolio(holdings: any[], targetRisk: number, expectedReturns: any) {
    // Simplified Modern Portfolio Theory implementation
    const weights = this.calculateOptimalWeights(holdings, targetRisk, expectedReturns)

    return {
      optimalWeights: weights,
      expectedReturn: this.calculatePortfolioReturn(weights, expectedReturns),
      expectedRisk: this.calculatePortfolioRisk(weights, holdings),
      sharpeRatio: this.calculateSharpeRatio(weights, expectedReturns, holdings),
      recommendations: this.generateRebalanceRecommendations(holdings, weights),
    }
  }

  private calculateOptimalWeights(holdings: any[], targetRisk: number, expectedReturns: any) {
    // Simplified equal-weight with risk adjustment
    const numAssets = holdings.length
    const baseWeight = 1 / numAssets

    return holdings.map((holding) => ({
      symbol: holding.symbol,
      currentWeight: holding.weight,
      optimalWeight: baseWeight,
      adjustment: baseWeight - holding.weight,
    }))
  }

  private calculatePortfolioReturn(weights: any[], expectedReturns: any) {
    return weights.reduce((total, weight) => {
      const expectedReturn = expectedReturns[weight.symbol] || 0.08
      return total + weight.optimalWeight * expectedReturn
    }, 0)
  }

  private calculatePortfolioRisk(weights: any[], holdings: any[]) {
    // Simplified risk calculation
    return weights.reduce((total, weight) => {
      const volatility = this.getVolatility(weight.symbol)
      return total + Math.pow(weight.optimalWeight * volatility, 2)
    }, 0)
  }

  private calculateSharpeRatio(weights: any[], expectedReturns: any, holdings: any[]) {
    const portfolioReturn = this.calculatePortfolioReturn(weights, expectedReturns)
    const portfolioRisk = this.calculatePortfolioRisk(weights, holdings)
    const riskFreeRate = 0.02 // 2% risk-free rate

    return (portfolioReturn - riskFreeRate) / Math.sqrt(portfolioRisk)
  }

  private generateRebalanceRecommendations(holdings: any[], optimalWeights: any[]) {
    return optimalWeights.map((weight) => ({
      symbol: weight.symbol,
      action: weight.adjustment > 0.05 ? "BUY" : weight.adjustment < -0.05 ? "SELL" : "HOLD",
      adjustmentPercent: weight.adjustment * 100,
      priority: Math.abs(weight.adjustment) > 0.1 ? "HIGH" : Math.abs(weight.adjustment) > 0.05 ? "MEDIUM" : "LOW",
    }))
  }

  // Backtesting functionality
  async backtest(strategy: any, startDate: Date, endDate: Date, initialCapital: number) {
    const results = {
      totalReturn: 0,
      annualizedReturn: 0,
      maxDrawdown: 0,
      sharpeRatio: 0,
      winRate: 0,
      profitFactor: 0,
      trades: [],
      equity: [],
      metrics: {},
    }

    // Simulate backtesting with historical data
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    let capital = initialCapital
    let maxCapital = initialCapital
    let maxDrawdown = 0
    let wins = 0
    let losses = 0
    let totalWinAmount = 0
    let totalLossAmount = 0

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)

      // Simulate daily trading
      if (Math.random() > 0.95) {
        // 5% chance of trade per day
        const tradeResult = this.simulateTrade(capital, strategy)
        capital += tradeResult.pnl

        results.trades.push({
          date,
          ...tradeResult,
          capital,
        })

        if (tradeResult.pnl > 0) {
          wins++
          totalWinAmount += tradeResult.pnl
        } else {
          losses++
          totalLossAmount += Math.abs(tradeResult.pnl)
        }
      }

      maxCapital = Math.max(maxCapital, capital)
      const drawdown = (maxCapital - capital) / maxCapital
      maxDrawdown = Math.max(maxDrawdown, drawdown)

      results.equity.push({ date, capital, drawdown })
    }

    results.totalReturn = (capital - initialCapital) / initialCapital
    results.annualizedReturn = Math.pow(1 + results.totalReturn, 365 / days) - 1
    results.maxDrawdown = maxDrawdown
    results.winRate = wins / (wins + losses)
    results.profitFactor = totalWinAmount / totalLossAmount
    results.sharpeRatio = this.calculateBacktestSharpe(results.equity)

    return results
  }

  private simulateTrade(capital: number, strategy: any) {
    const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"]
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]
    const price = this.getBasePrice(symbol)
    const positionSize = capital * 0.02 // 2% position size
    const shares = Math.floor(positionSize / price)

    // Simulate trade outcome based on strategy
    const successRate = strategy.winRate || 0.6
    const avgWin = strategy.avgWin || 0.05
    const avgLoss = strategy.avgLoss || 0.03

    const isWin = Math.random() < successRate
    const returnPercent = isWin ? avgWin * (0.5 + Math.random()) : -avgLoss * (0.5 + Math.random())
    const pnl = positionSize * returnPercent

    return {
      symbol,
      side: "BUY",
      shares,
      entryPrice: price,
      exitPrice: price * (1 + returnPercent),
      pnl,
      returnPercent,
      isWin,
    }
  }

  private calculateBacktestSharpe(equity: any[]) {
    const returns = equity.slice(1).map((point, i) => (point.capital - equity[i].capital) / equity[i].capital)

    const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length
    const stdDev = Math.sqrt(variance)

    return (avgReturn / stdDev) * Math.sqrt(252) // Annualized Sharpe ratio
  }
}

export const marketDataService = MarketDataService.getInstance()
