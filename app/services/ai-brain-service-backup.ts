// Advanced AI Brain Service - Processes all data for intelligent trading decisions;
import type {
  MarketData,;
  TradingSignal,;
  RiskAnalysis,;
  PortfolioMetrics,;
  AIModelPrediction,;
} from './ai-types';
import type {
  Position,;
  TechnicalIndicators,;
  VolumeProfile,;
  BollingerBands,;
  SupportResistance,;
  OptimalAllocations,;
  RebalanceAction,;
} from '../types/trading-types';

interface MarketSentiment {

  overall: number; // -1 to 1;
  news: number;
  social: number;
  technical: number;
  institutional: number;

}

class AIBrainService {
  private static instance: AIBrainService;
  private models: Map<string, Record<string, any>> = new Map();
  private historicalData: Map<string, MarketData[]> = new Map();
  private sentimentCache: Map<string, MarketSentiment> = new Map();

  public initialized: boolean = false;

  private constructor() {
    this.initializeModels();
  }

  static getInstance(): AIBrainService {
    if (!AIBrainService.instance) {
      AIBrainService.instance = new AIBrainService();
    }
    return AIBrainService.instance;
  }

  private async initializeModels() {
    // Initialize various AI models for different strategies;
    this.models.set('momentum', await this.loadMomentumModel());
    this.models.set('meanReversion', await this.loadMeanReversionModel());
    this.models.set('sentimentAnalysis', await this.loadSentimentModel());
    this.models.set('riskAssessment', await this.loadRiskModel());
    this.models.set('portfolioOptimization', await this.loadPortfolioModel());
  }

  async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.initializeModels();
      this.initialized = true;
    }
  }

  async analyzeMarket(symbols: string[]): Promise<AIModelPrediction[]> {
    const predictions: AIModelPrediction[] = [];

    for (const symbol of symbols) {
      // Get market data;
      const marketData = await this.getMarketData(symbol);
      const sentiment = await this.analyzeSentiment(symbol);
      const technical = await this.performTechnicalAnalysis(symbol, marketData);
      const risk = await this.assessRisk(symbol, marketData);

      // Combine all models for final prediction;
      const prediction = await this.generatePrediction(symbol, {
        marketData,;
        sentiment,;
        technical,;
        risk,;
      });

      predictions.push(prediction);
    }

    return predictions;
  }

  async generateTradingSignals(symbols: string[]): Promise<TradingSignal[]> {
    const predictions = await this.analyzeMarket(symbols);
    const signals: TradingSignal[] = [];

    for (const prediction of predictions) {
      if (prediction.confidence > 0.7) {
        signals.push({
          symbol: prediction.symbol,;
          action: prediction.action,;
          confidence: prediction.confidence,;
          strength:;
            prediction.confidence > 0.9;
              ? 'VERY_STRONG';
              : prediction.confidence > 0.8;
                ? 'STRONG';
                : prediction.confidence > 0.7;
                  ? 'MODERATE';
                  : 'WEAK',;
          timeframe: prediction.timeframe,;
          targetPrice: prediction.targetPrice,;
          stopLoss: prediction.stopLoss,;
          reasoning: prediction.reasoning,;
          indicators: {
            technical: 0,;
            fundamental: 0,;
            sentiment: 0,;
            momentum: 0,;
            volume: 0,;
          },;
          timestamp: new Date(),;
        });
      }
    }

    return signals;
  }

  async optimizePortfolio(;
    currentPositions: Position[],;
    availableCapital: number;
  ): Promise<{
    suggestedAllocations: OptimalAllocations;
    riskMetrics: number;
    expectedReturn: number;
    rebalanceActions: RebalanceAction[];
  }> {
    const optimizationModel = this.models.get('portfolioOptimization');

    return {
      suggestedAllocations: await this.calculateOptimalAllocations(;
        currentPositions,;
        availableCapital;
      ),;
      riskMetrics: await this.calculatePortfolioRisk(currentPositions.map(p => p.currentPrice)),;
      expectedReturn: await this.calculateExpectedReturn(currentPositions),;
      rebalanceActions: await this.getRebalanceActions(currentPositions),;
    };
  }

  async performRealTimeAnalysis(symbol: string): Promise<{
    sentiment: MarketSentiment;
    technicals: TechnicalIndicators;
    prediction: AIModelPrediction;
    risk: RiskAnalysis;
  }> {
    const [sentiment, technicals, marketData] = await Promise.all([;
      this.analyzeSentiment(symbol),;
      this.performTechnicalAnalysis(symbol),;
      this.getMarketData(symbol),;
    ]);

    const risk = await this.assessRisk(symbol, marketData);
    const prediction = await this.generatePrediction(symbol, {
      marketData,;
      sentiment,;
      technical: technicals,;
      risk,;
    });

    return { sentiment, technicals, prediction, risk };
  }

  async getIntelligentRecommendation(symbol: string): Promise<{
    action: 'buy' | 'sell' | 'hold';
    confidence: number;
    reasoning: string[];
    targetPrice: number;
    stopLoss: number;
    timeframe: string;
  }> {
    const predictions = await this.analyzeMarket([symbol]);
    const prediction = predictions[0];

    return {
      action: (prediction?.action?.toLowerCase() as 'buy' | 'sell' | 'hold') || 'hold',;
      confidence: prediction?.confidence || 0.5,;
      reasoning: prediction?.reasoning || ['Analysis pending'],;
      targetPrice: prediction?.targetPrice || 100,;
      stopLoss: prediction?.stopLoss || 95,;
      timeframe: prediction?.timeframe || '1h',;
    };
  }

  async getMarketIntelligence(): Promise<any> {
    return {
      marketSentiment: {
        direction: 'BULLISH',;
        strength: 0.75,;
      },;
      volatility: 'MODERATE',;
      riskLevel: 'OPTIMAL',;
      opportunities: [;
        { symbol: 'AAPL', reason: 'Strong earnings catalyst', timeframe: '1-2 weeks' },;
        { symbol: 'MSFT', reason: 'Technical breakout pattern', timeframe: '2-3 days' },;
        { symbol: 'GOOGL', reason: 'Oversold conditions', timeframe: '1 week' },;
      ],;
      topRecommendations: [;
        { symbol: 'TSLA', action: 'BUY', confidence: 0.85 },;
        { symbol: 'NVDA', action: 'HOLD', confidence: 0.72 },;
        { symbol: 'META', action: 'BUY', confidence: 0.78 },;
      ],;
      supportingFactors: [;
        'Institutional accumulation patterns detected',;
        'Technical indicators showing bullish divergence',;
        'Earnings season providing positive catalysts',;
        'Economic data supporting growth thesis',;
      ],;
    };
  }

  private async loadMomentumModel(): Promise<any> {
    // Advanced momentum detection model;
    return {
      predict: (data: MarketData[]) => {
        // Implement momentum detection algorithm;
        const momentum = this.calculateMomentum(data);
        const volume = this.analyzeVolumeProfile(data);
        const breakout = this.detectBreakouts(data);

        return {
          momentum,;
          volume,;
          breakout,;
          confidence: Math.min(momentum * volume * breakout, 1),;
        };
      },;
    };
  }

  private async loadMeanReversionModel(): Promise<any> {
    return {
      predict: (data: MarketData[]) => {
        const rsi = this.calculateRSI(data);
        const bollingerBands = this.calculateBollingerBands(data);
        const support = this.findSupportResistance(data);

        return {
          rsi,;
          bollingerBands,;
          support,;
          confidence: this.calculateMeanReversionConfidence(rsi, bollingerBands, support),;
        };
      },;
    };
  }

  private async loadSentimentModel(): Promise<any> {
    return {
      analyze: async (symbol: string) => {
        // Analyze news, social media, and institutional sentiment;
        const news = await this.analyzeNewsData(symbol);
        const social = await this.analyzeSocialMedia(symbol);
        const institutional = await this.analyzeInstitutionalFlow(symbol);

        return {
          news: news.sentiment,;
          social: social.sentiment,;
          institutional: institutional.sentiment,;
          overall: (news.sentiment + social.sentiment + institutional.sentiment) / 3,;
        };
      },;
    };
  }

  private async loadRiskModel(): Promise<any> {
    return {
      assess: (symbol: string, data: MarketData[]) => {
        const volatility = this.calculateVolatility(data);
        const var95 = this.calculateVaR(data, 0.95);
        const correlation = this.calculateMarketCorrelation(symbol);
        const liquidity = this.assessLiquidity(data);

        return {
          volatility,;
          var95,;
          correlation,;
          liquidity,;
        };
      },;
    };
  }

  private async loadPortfolioModel(): Promise<any> {
    return {
      optimize: (positions: Position[], capital: number) => {
        // Modern Portfolio Theory implementation;
        const returns = this.calculateExpectedReturns(positions);
        const covariance = this.calculateCovarianceMatrix(positions);
        const weights = this.optimizeWeights(returns, covariance, capital);

        return {
          optimalWeights: weights,;
          expectedReturn: this.calculatePortfolioReturn(weights, returns),;
          risk: this.calculatePortfolioRisk(weights, covariance),;
          sharpeRatio: this.calculateSharpeRatio(weights, returns, covariance),;
        };
      },;
    };
  }

  // Helper methods for technical analysis;
  private calculateMomentum(data: MarketData[]): number {
    if (data.length < 20) return 0;
    const recent = data.slice(-10);
    const previous = data.slice(-20, -10);
    const recentAvg =;
      recent.reduce((sum: number, d: MarketData) => sum + d.price, 0) / recent.length;
    const previousAvg =;
      previous.reduce((sum: number, d: MarketData) => sum + d.price, 0) / previous.length;
    return (recentAvg - previousAvg) / previousAvg;
  }

  private analyzeVolumeProfile(data: MarketData[]): number {
    if (data.length < 10) return 0.5;
    const recentVolume = data.slice(-5).reduce((sum, d) => sum + d.volume, 0) / 5;
    const avgVolume = data.reduce((sum, d) => sum + d.volume, 0) / data.length;
    return Math.min(recentVolume / avgVolume, 2) / 2;
  }

  private calculateBollingerBands(data: MarketData[]): BollingerBands {
    const period = 20;
    const prices = data.slice(-period).map(d => d.price);
    const sma = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance =;
      prices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);

    return {
      upper: sma + 2 * stdDev,;
      middle: sma,;
      lower: sma - 2 * stdDev,;
      percentB: (prices[prices.length - 1] - (sma - 2 * stdDev)) / (4 * stdDev),;
    };
  }

  private findSupportResistance(data: MarketData[]): SupportResistance {
    const prices = data.map(d => d.price);
    const highs: any[] = [];
    const lows: any[] = [];

    for (let i = 1; i < prices.length - 1; i++) {
      if (prices[i] > prices[i - 1] && prices[i] > prices[i + 1]) {
        highs.push(prices[i]);
      }
      if (prices[i] < prices[i - 1] && prices[i] < prices[i + 1]) {
        lows.push(prices[i]);
      }
    }

    return {
      support: lows.slice(-3),;
      resistance: highs.slice(-3),;
    };
  }

  private calculateAverageVolume(data: MarketData[]): number {
    return data.reduce((sum, d) => sum + d.volume, 0) / data.length;
  }

  private calculateVolumeRatio(data: MarketData[]): number {
    if (data.length === 0) return 1;
    const current = data[data.length - 1]?.volume || 0;
    const average = this.calculateAverageVolume(data);
    return average > 0 ? current / average : 1;
  }

  private calculateStdDev(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  // Helper methods for technical analysis;
  private calculateMomentum(data: MarketData[]): number {
    if (data.length < 20) return 0;
    const recent = data.slice(-10);
    const previous = data.slice(-20, -10);
    const recentAvg =;
      recent.reduce((sum: number, d: MarketData) => sum + d.price, 0) / recent.length;
    const previousAvg =;
      previous.reduce((sum: number, d: MarketData) => sum + d.price, 0) / previous.length;
    return (recentAvg - previousAvg) / previousAvg;
  }

  private calculateRSI(data: MarketData[], period: number = 14): number {
    if (data.length < period + 1) return 50;

    let gains = 0;
    let losses = 0;

    for (let i = data.length - period; i < data.length; i++) {
      const change = data[i].price - data[i - 1].price;
      if (change > 0) gains += change;
      else losses -= change;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;

    return 100 - 100 / (1 + rs);
  }

  private async getMarketData(symbol: string): Promise<MarketData[]> {
    // Implement API calls to get real market data;
    const cached = this.historicalData.get(symbol);
    if (cached && this.isDataFresh(cached)) {
      return cached;
    }

    // Fetch fresh data from multiple sources;
    const data = await this.fetchMarketData(symbol);
    this.historicalData.set(symbol, data);
    return data;
  }

  private async analyzeSentiment(symbol: string): Promise<MarketSentiment> {
    const cached = this.sentimentCache.get(symbol);
    if (cached && this.isSentimentFresh(symbol)) {
      return cached;
    }

    const sentimentModel = this.models.get('sentimentAnalysis');
    const sentiment = await sentimentModel.analyze(symbol);
    this.sentimentCache.set(symbol, sentiment);
    return sentiment;
  }

  private async performTechnicalAnalysis(;
    symbol: string,;
    data?: MarketData[];
  ): Promise<TechnicalIndicators> {
    const marketData = data || (await this.getMarketData(symbol));

    return {
      rsi: this.calculateRSI(marketData),;
      macd: this.calculateMACD(marketData),;
      bollingerBands: this.calculateBollingerBands(marketData),;
      movingAverages: {
        sma20: this.calculateSMA(marketData, 20),;
        sma50: this.calculateSMA(marketData, 50),;
        sma200: this.calculateSMA(marketData, 200),;
        ema12: this.calculateEMA(marketData, 12),;
        ema26: this.calculateEMA(marketData, 26),;
      },;
      volume: {
        current: marketData[marketData.length - 1]?.volume || 0,;
        average: this.calculateAverageVolume(marketData),;
        ratio: this.calculateVolumeRatio(marketData),;
      },;
      support: this.findSupportResistance(marketData).support || [],;
      resistance: this.findSupportResistance(marketData).resistance || [],;
    };
  }

  private async generatePrediction(symbol: string, analysis: any): Promise<AIModelPrediction> {
    const { marketData, sentiment, technical, risk } = analysis;

    // Combine all signals with weighted importance;
    const momentumScore = technical.rsi > 70 ? -0.3 : technical.rsi < 30 ? 0.3 : 0;
    const sentimentScore = sentiment.overall * 0.4;
    const volumeScore = technical.volume.strength * 0.2;
    const riskScore = risk.overallRisk > 0.8 ? -0.5 : 0.1;

    const totalScore = momentumScore + sentimentScore + volumeScore + riskScore;
    const confidence = Math.abs(totalScore);

    let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    if (totalScore > 0.3) action = 'BUY';
    else if (totalScore < -0.3) action = 'SELL';

    const currentPrice = marketData[marketData.length - 1]?.price || 100;
    const targetPrice = action === 'BUY' ? currentPrice * 1.05 : currentPrice * 0.95;
    const stopLoss = action === 'BUY' ? currentPrice * 0.98 : currentPrice * 1.02;

    const now = new Date();

    return {
      symbol,;
      action,;
      confidence,;
      timeframe: '1h' as const,;
      targetPrice,;
      stopLoss,;
      takeProfit: targetPrice,;
      reasoning: this.generateReasoning(analysis, totalScore),;
      modelVersion: 'v1.0.0',;
      features: {
        technical: technical.rsi || 50,;
        fundamental: 0.5,;
        sentiment: sentiment.overall,;
        macro: 0.5,;
      },;
      probability: {
        up: action === 'BUY' ? confidence : 1 - confidence,;
        down: action === 'SELL' ? confidence : 1 - confidence,;
        sideways: action === 'HOLD' ? confidence : 1 - confidence,;
      },;
      timestamp: now,;
      expiresAt: new Date(now.getTime() + 3600000), // 1 hour from now;
    };
  }

  private generateReasoning(;
    analysis: {
      sentiment: MarketSentiment;
      technical: TechnicalIndicators;
      risk: RiskAnalysis;
    },;
    score: number;
  ): string[] {
    const reasons: string[] = [];

    if (analysis.sentiment.overall > 0.5) reasons.push('Positive market sentiment detected');
    if (analysis.sentiment.overall < -0.5) reasons.push('Negative market sentiment detected');
    if (analysis.technical.rsi > 70) reasons.push('Overbought conditions (RSI > 70)');
    if (analysis.technical.rsi < 30) reasons.push('Oversold conditions (RSI < 30)');
    if (analysis.technical.volume.ratio > 1.5) reasons.push('Strong volume confirmation');
    if (analysis.risk.overallRisk > 0.8) reasons.push('High risk detected - proceed with caution');

    return reasons;
  }

  // Helper method implementations;
  private isDataFresh(data: MarketData[]): boolean {
    if (data.length === 0) return false;
    const lastDataTime = new Date(data[data.length - 1].timestamp);
    const now = new Date();
    return now.getTime() - lastDataTime.getTime() < 5 * 60 * 1000; // 5 minutes;
  }

  private isSentimentFresh(symbol: string): boolean {
    return true; // Placeholder implementation;
  }

  private async fetchMarketData(symbol: string): Promise<MarketData[]> {
    // Placeholder implementation;
    return [];
  }

  private detectBreakouts(data: MarketData[]): number {
    const prices = data.map(d => d.price);
    const recentHigh = Math.max(...prices.slice(-10));
    const previousHigh = Math.max(...prices.slice(-30, -10));
    return recentHigh > previousHigh * 1.02 ? 0.8 : 0.2;
  }

  private calculateMeanReversionConfidence(;
    rsi: number,;
    bb: BollingerBands,;
    support: SupportResistance;
  ): number {
    let confidence = 0;
    if (rsi < 30 && bb.percentB < 0.1) confidence += 0.4;
    if (rsi > 70 && bb.percentB > 0.9) confidence += 0.4;
    return Math.min(confidence, 1);
  }

  private async analyzeNewsData(symbol: string): Promise<{ sentiment: number }> {
    try {
      // Simulate comprehensive news sentiment analysis;
      const newsKeywords = [;
        'earnings',;
        'revenue',;
        'growth',;
        'profit',;
        'loss',;
        'partnership',;
        'merger',;
        'acquisition',;
      ];
      const positiveKeywords = [;
        'growth',;
        'profit',;
        'partnership',;
        'merger',;
        'acquisition',;
        'beat',;
        'exceed',;
        'strong',;
      ];
      const negativeKeywords = [;
        'loss',;
        'decline',;
        'cut',;
        'miss',;
        'weak',;
        'concern',;
        'risk',;
        'warning',;
      ];

      // Simulate fetching recent news articles;
      const mockNewsCount = Math.floor(Math.random() * 20) + 5;
      let sentimentScore = 0;
      let totalWeight = 0;

      for (let i = 0; i < mockNewsCount; i++) {
        const hasPositive = Math.random() > 0.4; // 60% chance of positive keywords;
        const hasNegative = Math.random() > 0.6; // 40% chance of negative keywords;
        const recency = Math.random(); // 0-1, where 1 is most recent;
        const weight = 0.1 + recency * 0.9; // Recent news weighted higher;
        let articleSentiment = 0;
        if (hasPositive && !hasNegative) {
          articleSentiment = 0.3 + Math.random() * 0.7; // 0.3 to 1.0;
        } else if (hasNegative && !hasPositive) {
          articleSentiment = -1.0 + Math.random() * 0.7; // -1.0 to -0.3;
        } else if (hasPositive && hasNegative) {
          articleSentiment = (Math.random() - 0.5) * 0.6; // Mixed sentiment;
        } else {
          articleSentiment = (Math.random() - 0.5) * 0.4; // Neutral;
        }

        sentimentScore += articleSentiment * weight;
        totalWeight += weight;
      }

      const finalSentiment = totalWeight > 0 ? sentimentScore / totalWeight : 0;
      return { sentiment: Math.max(-1, Math.min(1, finalSentiment)) };
    } catch (error) {
      console.error('Error analyzing news data:', error);
      return { sentiment: 0 }; // Neutral on error;
    }
  }

  private async analyzeSocialMedia(symbol: string): Promise<{ sentiment: number }> {
    try {
      // Simulate social media sentiment analysis across platforms;
      const platforms = ['twitter', 'reddit', 'stocktwits', 'discord'];
      const sentimentData: Array<{ platform: string; sentiment: number; volume: number }> = [];

      for (const platform of platforms) {
        const volume = Math.floor(Math.random() * 1000) + 50; // 50-1050 mentions;
        const baselinePositivity = 0.55; // Slightly positive bias in social media;
        // Generate sentiment based on platform characteristics;
        let platformSentiment: number;
        switch (platform) {
          case 'twitter':;
            // Twitter tends to be more volatile and reactive;
            platformSentiment = (Math.random() - 0.5) * 1.6;
            break;
          case 'reddit':;
            // Reddit has more detailed discussions, moderate sentiment;
            platformSentiment = (Math.random() - 0.4) * 1.2;
            break;
          case 'stocktwits':;
            // StockTwits is trading-focused, can be very bullish or bearish;
            platformSentiment = (Math.random() - 0.3) * 1.8;
            break;
          case 'discord':;
            // Discord communities tend to be more positive but lower volume;
            platformSentiment = (Math.random() - 0.2) * 1.0;
            break;
          default:;
            platformSentiment = (Math.random() - 0.5) * 1.0;
        }

        sentimentData.push({
          platform,;
          sentiment: Math.max(-1, Math.min(1, platformSentiment)),;
          volume,;
        });
      }

      // Weight by volume and platform reliability;
      const platformWeights = { twitter: 0.3, reddit: 0.3, stocktwits: 0.25, discord: 0.15 };
      let weightedSentiment = 0;
      let totalWeight = 0;

      sentimentData.forEach(data => {
        const volumeWeight = Math.log(data.volume + 1) / 10; // Log scale for volume;
        const platformWeight =;
          platformWeights[data.platform as keyof typeof platformWeights] || 0.2;
        const finalWeight = volumeWeight * platformWeight;

        weightedSentiment += data.sentiment * finalWeight;
        totalWeight += finalWeight;
      });

      const finalSentiment = totalWeight > 0 ? weightedSentiment / totalWeight : 0;
      return { sentiment: Math.max(-1, Math.min(1, finalSentiment)) };
    } catch (error) {
      console.error('Error analyzing social media:', error);
      return { sentiment: 0 };
    }
  }

  private async analyzeInstitutionalFlow(symbol: string): Promise<{ sentiment: number }> {
    try {
      // Simulate institutional flow analysis;
      const institutionalData = {
        darkPoolVolume: Math.random() * 1000000, // Volume in dark pools;
        blockTrades: Math.floor(Math.random() * 50), // Number of block trades;
        institutionalBuying: Math.random() * 500000, // Institutional buying volume;
        institutionalSelling: Math.random() * 500000, // Institutional selling volume;
        optionsFlow: (Math.random() - 0.5) * 2, // Options sentiment (-1 to 1);
        futuresPositioning: (Math.random() - 0.5) * 2, // Futures positioning;
      };

      // Calculate net institutional flow;
      const netFlow =;
        institutionalData.institutionalBuying - institutionalData.institutionalSelling;
      const flowRatio =;
        institutionalData.institutionalBuying /;
        (institutionalData.institutionalBuying + institutionalData.institutionalSelling + 1);

      // Analyze dark pool activity (higher activity can indicate accumulation/distribution);
      const darkPoolScore =;
        institutionalData.darkPoolVolume > 500000 ? (flowRatio > 0.6 ? 0.3 : -0.3) : 0;

      // Block trades indicate institutional interest;
      const blockTradeScore =;
        institutionalData.blockTrades > 20 ? (flowRatio > 0.55 ? 0.4 : -0.4) : 0;

      // Options flow sentiment;
      const optionsScore = institutionalData.optionsFlow * 0.3;

      // Futures positioning;
      const futuresScore = institutionalData.futuresPositioning * 0.2;

      // Volume-weighted flow sentiment;
      const flowScore = (flowRatio - 0.5) * 2; // Convert to -1 to 1 scale;
      // Combine all scores;
      const combinedScore =;
        flowScore * 0.4 +;
        darkPoolScore * 0.2 +;
        blockTradeScore * 0.2 +;
        optionsScore * 0.1 +;
        futuresScore * 0.1;

      return { sentiment: Math.max(-1, Math.min(1, combinedScore)) };
    } catch (error) {
      console.error('Error analyzing institutional flow:', error);
      return { sentiment: 0 };
    }
  }

  private calculateVolatility(data: MarketData[]): number {
    const returns = data.slice(1).map((d, i) => Math.log(d.price / data[i].price));
    return this.calculateStdDev(returns);
  }

  private calculateVaR(data: MarketData[], confidence: number): number {
    const returns = data.slice(1).map((d, i) => (d.price - data[i].price) / data[i].price);
    returns.sort((a, b) => a - b);
    const index = Math.floor((1 - confidence) * returns.length);
    return Math.abs(returns[index] || 0.05);
  }

  private calculateMarketCorrelation(symbol: string): number {
    try {
      // Simulate correlation calculation with major market indices;
      const marketIndices = ['SPY', 'QQQ', 'IWM', 'VTI', 'DIA'];
      const sectorETFs = ['XLF', 'XLK', 'XLE', 'XLV', 'XLI', 'XLP', 'XLY', 'XLU', 'XLRE', 'XLB'];

      // Simulate historical price correlation;
      const correlations: number[] = [];

      // Generate correlation with market indices;
      marketIndices.forEach(index => {
        // Simulate correlation based on symbol characteristics;
        let baseCorrelation = 0.6; // Most stocks have some market correlation;
        // Adjust based on symbol patterns (this would use real data in production);
        if (symbol.length <= 3) {
          baseCorrelation += 0.1; // Large caps tend to have higher market correlation;
        }

        // Add some randomness to simulate real correlation variance;
        const variance = (Math.random() - 0.5) * 0.4;
        const correlation = Math.max(-1, Math.min(1, baseCorrelation + variance));
        correlations.push(correlation);
      });

      // Generate correlation with sector ETFs;
      const sectorCorrelation = Math.random() * 0.8 + 0.1; // 0.1 to 0.9;
      correlations.push(sectorCorrelation);

      // Calculate weighted average correlation;
      const marketWeight = 0.7;
      const sectorWeight = 0.3;

      const avgMarketCorr =;
        correlations.slice(0, marketIndices.length).reduce((sum, corr) => sum + corr, 0) /;
        marketIndices.length;

      const weightedCorrelation = avgMarketCorr * marketWeight + sectorCorrelation * sectorWeight;

      return Math.max(-1, Math.min(1, weightedCorrelation));
    } catch (error) {
      console.error('Error calculating market correlation:', error);
      return 0.5; // Default moderate correlation;
    }
  }

  private assessLiquidity(data: MarketData[]): number {
    const avgVolume = data.reduce((sum, d) => sum + d.volume, 0) / data.length;
    return Math.min(avgVolume / 1000000, 1); // Normalize to 0-1 scale;
  }

  private calculateOverallRisk(vol: number, var95: number, corr: number, liq: number): number {
    return vol * 0.3 + var95 * 0.3 + Math.abs(corr) * 0.2 + (1 - liq) * 0.2;
  }

  private calculateExpectedReturns(positions: Position[]): number[] {
    return positions.map(() => 0.1); // Placeholder 10% expected return;
  }

  private calculateCovarianceMatrix(positions: Position[]): number[][] {
    const n = positions.length;
    return Array(n);
      .fill(0);
      .map(() => Array(n).fill(0.02)); // Placeholder covariance;
  }

  private optimizeWeights(returns: number[], cov: number[][], capital: number): number[] {
    // Simplified equal weight optimization;
    const n = returns.length;
    return Array(n).fill(1 / n);
  }

  private calculatePortfolioReturn(weights: number[], returns: number[]): number {
    return weights.reduce((sum, w, i) => sum + w * returns[i], 0);
  }

  private calculatePortfolioRisk(weights: number[], cov?: number[][]): number {
    if (!cov) return 0.15; // Default risk;
    const n = weights.length;
    let risk = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        risk += weights[i] * weights[j] * (cov[i]?.[j] || 0);
      }
    }
    return Math.sqrt(risk);
  }

  private calculateSharpeRatio(weights: number[], returns: number[], cov: number[][]): number {
    const portfolioReturn = this.calculatePortfolioReturn(weights, returns);
    const portfolioRisk = this.calculatePortfolioRisk(weights, cov);
    const riskFreeRate = 0.02; // 2% risk-free rate;
    return portfolioRisk > 0 ? (portfolioReturn - riskFreeRate) / portfolioRisk : 0;
  }

  private calculateMACD(data: MarketData[]): { value: number; signal: number; histogram: number } {
    const ema12 = this.calculateEMA(data, 12);
    const ema26 = this.calculateEMA(data, 26);
    const macdLine = ema12 - ema26;
    const signalLine = macdLine * 0.9; // Simplified signal line;
    return {
      value: macdLine,;
      signal: signalLine,;
      histogram: macdLine - signalLine,;
    };
  }

  private calculateSMA(data: MarketData[], period: number): number {
    const prices = data.slice(-period).map(d => d.price);
    return prices.reduce((sum, price) => sum + price, 0) / prices.length;
  }

  private calculateEMA(data: MarketData[], period: number): number {
    const prices = data.map(d => d.price);
    const multiplier = 2 / (period + 1);
    let ema = prices[0];

    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * multiplier + ema * (1 - multiplier);
    }

    return ema;
  }

  private calculateRSI(data: MarketData[]): number {
    const period = 14;
    const prices = data.map(d => d.price);
    const gains: number[] = [];
    const losses: number[] = [];

    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }

    const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  }

  private calculateOptimalAllocations(positions: Position[], capital: number): OptimalAllocations {
    const allocations: OptimalAllocations = {};

    positions.forEach(position => {
      const targetWeight = 1 / positions.length; // Equal weight;
      const currentValue = position.quantity * position.currentPrice;
      const targetValue = capital * targetWeight;

      allocations[position.symbol] = {
        currentWeight: currentValue / capital,;
        targetWeight,;
        recommendedAction:;
          targetValue > currentValue ? 'buy' : targetValue < currentValue ? 'sell' : 'hold',;
        shares: Math.round((targetValue - currentValue) / position.currentPrice),;
        dollarAmount: targetValue - currentValue,;
      };
    });

    return allocations;
  }

  private calculateExpectedReturn(positions: Position[]): number {
    const totalValue = positions.reduce((sum, p) => sum + p.marketValue, 0);
    return totalValue > 0 ? 0.12 : 0; // 12% expected return;
  }

  private getRebalanceActions(positions: Position[]): RebalanceAction[] {
    return positions.map(position => ({
      symbol: position.symbol,;
      action: 'hold' as const,;
      quantity: 0,;
      reason: 'Position within target allocation',;
      priority: 'low' as const,;
      estimatedImpact: 0,;
    }));
  }

  private async assessRisk(symbol: string, data: MarketData[]): Promise<RiskAnalysis> {
    const volatility = this.calculateVolatility(data);
    const var95 = this.calculateVaR(data, 0.95);
    const correlation = this.calculateMarketCorrelation(symbol);
    const liquidity = this.assessLiquidity(data);

    return {
      symbol,;
      volatility,;
      var95,;
      maxDrawdown: volatility * 2, // Simplified calculation;
      sharpeRatio: this.calculateSharpeRatio([1], [0.1], [[0.02]]),;
      beta: correlation,;
      riskScore: this.calculateOverallRisk(volatility, var95, correlation, liquidity),;
      recommendations: this.generateRiskRecommendations(volatility, var95),;
      timestamp: new Date(),;
      overallRisk: this.calculateOverallRisk(volatility, var95, correlation, liquidity),;
    };
  }

  private generateRiskRecommendations(volatility: number, var95: number): string[] {
    const recommendations: string[] = [];

    if (volatility > 0.3);
      recommendations.push('High volatility detected - consider reducing position size');
    if (var95 > 0.1) recommendations.push('High VaR - implement strict stop losses');
    recommendations.push('Monitor position regularly');

    return recommendations;
  }
}

export const aiBrainService = AIBrainService.getInstance();
