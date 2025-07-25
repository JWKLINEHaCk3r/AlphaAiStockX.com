// Removed unused imports from trading-types;
import { OpenAI } from 'openai';
// AI Market Predictor - Vision + LLM Fusion for Market Analysis;
interface ChartAnalysis {




















  id: string;
  imageUrl: string;
  symbol: string;
  timeframe: string;
  patterns: TechnicalPattern[];
  trendDirection: 'BULLISH' | 'BEARISH' | 'NEUTRAL' | 'SIDEWAYS';
  strength: number; // 1-10;
  confidence: number; // 0-1;
  keyLevels: PriceLevel[];
  prediction: MarketPrediction;
  reasoning: string;
  timestamp: string;




















}

interface TechnicalPattern {




















  name: string;
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  description: string;
  target?: number;
  stopLoss?: number;




















}

interface PriceLevel {




















  level: number;
  type: 'SUPPORT' | 'RESISTANCE' | 'PIVOT';
  strength: number;
  description: string;




















}

interface MarketPrediction {




















  direction: 'UP' | 'DOWN' | 'SIDEWAYS';
  timeframe: '1D' | '1W' | '1M' | '3M';
  targetPrice?: number;
  probability: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  keyFactors: string[];
  stopLoss?: number;
  takeProfit?: number;




















}

interface MarketContext {




















  vixLevel: number;
  marketSentiment: 'FEAR' | 'GREED' | 'NEUTRAL';
  sectorRotation: { [sector: string]: number;



















};
  economicIndicators: EconomicIndicator[];
  newsEvents: NewsEvent[];
}

interface EconomicIndicator {




















  name: string;
  value: number;
  change: number;
  impact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  description: string;




















}

interface NewsEvent {




















  title: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  sentiment: number; // -1 to 1;
  timestamp: string;




















}

interface MultiModalAnalysis {




















  visualAnalysis: ChartAnalysis;
  fundamentalFactors: string[];
  marketContext: MarketContext;
  combinedPrediction: MarketPrediction;
  reasoning: string;
  riskFactors: string[];
  opportunities: string[];




















}

export class AIMarketPredictor {
  private openai: OpenAI;
  private predictionHistory: Map<string, ChartAnalysis[]> = new Map();
  private patternDatabase: Map<string, TechnicalPattern[]> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,;
    });
    this.initializePatternDatabase();
  }

  private initializePatternDatabase() {
    // Common technical patterns for recognition;
    const patterns: { [key: string]: TechnicalPattern[] } = {
      bullish: [;
        {
          name: 'Double Bottom',;
          type: 'BULLISH',;
          confidence: 0.8,;
          description: 'Price forms two low points at similar levels, indicating strong support',;
        },;
        {
          name: 'Ascending Triangle',;
          type: 'BULLISH',;
          confidence: 0.75,;
          description: 'Series of higher lows with consistent resistance level',;
        },;
        {
          name: 'Cup and Handle',;
          type: 'BULLISH',;
          confidence: 0.85,;
          description: 'U-shaped recovery followed by small consolidation',;
        },;
        {
          name: 'Bull Flag',;
          type: 'BULLISH',;
          confidence: 0.7,;
          description: 'Strong upward move followed by small consolidation',;
        },;
      ],;
      bearish: [;
        {
          name: 'Double Top',;
          type: 'BEARISH',;
          confidence: 0.8,;
          description:;
            'Price forms two high points at similar levels, indicating strong resistance',;
        },;
        {
          name: 'Descending Triangle',;
          type: 'BEARISH',;
          confidence: 0.75,;
          description: 'Series of lower highs with consistent support level',;
        },;
        {
          name: 'Head and Shoulders',;
          type: 'BEARISH',;
          confidence: 0.85,;
          description: 'Three peaks with middle peak higher than the other two',;
        },;
        {
          name: 'Bear Flag',;
          type: 'BEARISH',;
          confidence: 0.7,;
          description: 'Strong downward move followed by small consolidation',;
        },;
      ],;
    };

    Object.entries(patterns).forEach(([key, patternList]) => {
      this.patternDatabase.set(key, patternList);
    });
  }

  async analyzeChart(;
    imageFile: File | string,;
    symbol: string,;
    timeframe: string = '1D';
  ): Promise<ChartAnalysis> {
    try {
      let imageUrl: string;

      if (typeof imageFile === 'string') {
        imageUrl = imageFile;
      } else {
        // Convert file to base64 for analysis;
        imageUrl = await this.convertFileToBase64(imageFile);
      }

      // Get current market context;
      const marketContext = await this.getMarketContext();

      // Analyze chart using GPT-4 Vision;
      const visualResult = await this.performVisualAnalysis(imageUrl, symbol, timeframe);

      // Build a minimal ChartAnalysis object for downstream compatibility;
      const minimalAnalysis: ChartAnalysis = {
        id: `temp_${Date.now()}`,;
        imageUrl,;
        symbol,;
        timeframe,;
        patterns: [],;
        trendDirection: 'NEUTRAL',;
        strength: 5,;
        confidence: visualResult.confidence,;
        keyLevels: [],;
        prediction: {
          direction: 'SIDEWAYS',;
          timeframe: ['1D', '1W', '1M', '3M'].includes(timeframe) ? (timeframe as '1D' | '1W' | '1M' | '3M') : '1D',;
          probability: visualResult.confidence,;
          keyFactors: [],;
          riskLevel: 'MODERATE',;
        },;
        reasoning: visualResult.reasoning,;
        timestamp: new Date().toISOString(),;
      };

      // Enhance with technical pattern recognition;
      const patterns = await this.recognizePatterns(visualResult.reasoning || '');

      // Generate price levels;
      const keyLevels = this.identifyKeyLevels(minimalAnalysis);

      // Create market prediction;
      const prediction = await this.generateMarketPrediction(;
        minimalAnalysis,;
        patterns,;
        keyLevels,;
        marketContext,;
        symbol,;
        timeframe;
      );

      const analysis: ChartAnalysis = {
        ...minimalAnalysis,;
        patterns,;
        trendDirection: this.determineTrendDirection(minimalAnalysis, patterns),;
        strength: this.calculateTrendStrength(patterns, minimalAnalysis),;
        confidence: prediction.probability,;
        keyLevels,;
        prediction,;
        timestamp: new Date().toISOString(),;
      };

      // Store in history;
      this.addToHistory(symbol, analysis);

      return analysis;
    } catch {
      console.error('Chart analysis error');
      throw new Error(`Failed to analyze chart for ${symbol}`);
    }
  }

  private async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private async performVisualAnalysis(imageUrl: string, symbol: string, timeframe: string) {
    const prompt = `;
    Analyze this stock chart for ${symbol} (${timeframe} timeframe) and provide detailed technical analysis:;
    Focus on:;
    1. Overall trend direction (bullish, bearish, sideways);
    2. Key support and resistance levels;
    3. Chart patterns (triangles, flags, head & shoulders, etc.);
    4. Volume patterns if visible;
    5. Momentum indicators if present;
    6. Price action near important levels;
    7. Breakout or breakdown potential;
    Provide specific price levels and percentage probability for your predictions.;
    Be precise about entry points, stop losses, and target prices.;
    Consider the timeframe when making predictions.;
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o', // GPT-4 with vision capabilities;
        messages: [;
          {
            role: 'user',;
            content: [;
              {
                type: 'text',;
                text: prompt,;
              },;
              {
                type: 'image_url',;
                image_url: {
                  url: imageUrl,;
                  detail: 'high',;
                },;
              },;
            ],;
          },;
        ],;
        max_tokens: 1000,;
        temperature: 0.3,;
      });

      const content = response.choices[0].message.content || '';

      return {
        description: content,;
        reasoning: content,;
        confidence: this.extractConfidenceFromText(content),;
      };
    } catch {
      // Fallback analysis without vision;
      return {
        description: `Technical analysis for ${symbol}: Chart shows mixed signals with key levels to watch. Current market conditions suggest cautious optimism with attention to support/resistance zones.`,;
        reasoning: 'Fallback analysis due to vision API limitations',;
        confidence: 0.6,;
      };
    }
  }

  private extractConfidenceFromText(text: string): number {
    // Extract confidence percentage from AI response;
    const confidenceMatch = text.match(/(\d+)%\s*(?:confidence|probability|chance)/i);
    if (confidenceMatch) {
      return parseInt(confidenceMatch[1]) / 100;
    }

    // Look for confidence keywords;
    const highConfidenceWords = ['strong', 'clear', 'obvious', 'definite'];
    const mediumConfidenceWords = ['likely', 'probable', 'expected'];
    const lowConfidenceWords = ['possible', 'uncertain', 'mixed', 'unclear'];

    const lowerText = text.toLowerCase();

    if (highConfidenceWords.some(word => lowerText.includes(word))) {
      return 0.8;
    } else if (mediumConfidenceWords.some(word => lowerText.includes(word))) {
      return 0.65;
    } else if (lowConfidenceWords.some(word => lowerText.includes(word))) {
      return 0.4;
    }

    return 0.6; // Default confidence;
  }

  private async recognizePatterns(description: string): Promise<TechnicalPattern[]> {
    const patterns: TechnicalPattern[] = [];
    const lowerDesc = description.toLowerCase();

    // Check for bullish patterns;
    const bullishPatterns = this.patternDatabase.get('bullish') || [];
    bullishPatterns.forEach(pattern => {
      const patternName = pattern.name.toLowerCase();
      if (lowerDesc.includes(patternName.replace(/\s+/g, '')) || lowerDesc.includes(patternName)) {
        patterns.push({
          ...pattern,;
          confidence: pattern.confidence * this.getPatternConfidenceMultiplier(lowerDesc),;
        });
      }
    });

    // Check for bearish patterns;
    const bearishPatterns = this.patternDatabase.get('bearish') || [];
    bearishPatterns.forEach(pattern => {
      const patternName = pattern.name.toLowerCase();
      if (lowerDesc.includes(patternName.replace(/\s+/g, '')) || lowerDesc.includes(patternName)) {
        patterns.push({
          ...pattern,;
          confidence: pattern.confidence * this.getPatternConfidenceMultiplier(lowerDesc),;
        });
      }
    });

    // If no specific patterns found, infer from description;
    if (patterns.length === 0) {
      patterns.push(...this.inferPatternsFromDescription(lowerDesc));
    }

    return patterns;
  }

  private getPatternConfidenceMultiplier(description: string): number {
    if (description.includes('clear') || description.includes('strong')) {
      return 1.1;
    } else if (description.includes('weak') || description.includes('unclear')) {
      return 0.8;
    }
    return 1.0;
  }

  private inferPatternsFromDescription(description: string): TechnicalPattern[] {
    const patterns: TechnicalPattern[] = [];

    if (;
      description.includes('bullish') ||;
      description.includes('upward') ||;
      description.includes('rising');
    ) {
      patterns.push({
        name: 'Bullish Trend',;
        type: 'BULLISH',;
        confidence: 0.6,;
        description: 'General bullish momentum observed',;
      });
    }

    if (;
      description.includes('bearish') ||;
      description.includes('downward') ||;
      description.includes('falling');
    ) {
      patterns.push({
        name: 'Bearish Trend',;
        type: 'BEARISH',;
        confidence: 0.6,;
        description: 'General bearish momentum observed',;
      });
    }

    if (;
      description.includes('sideways') ||;
      description.includes('consolidation') ||;
      description.includes('range');
    ) {
      patterns.push({
        name: 'Consolidation',;
        type: 'NEUTRAL',;
        confidence: 0.7,;
        description: 'Price moving in sideways range',;
      });
    }

    return patterns;
  }

  private identifyKeyLevels(visualAnalysis: ChartAnalysis): PriceLevel[] {
    // Extract price levels from AI analysis;
    const levels: PriceLevel[] = [];
    // Look for price numbers in the reasoning (since description does not exist);
    const reasoning = visualAnalysis.reasoning || '';
    const priceMatches = reasoning.match(/\$?(\d+(?:\.\d{2})?)/g);
    if (priceMatches) {
      priceMatches.slice(0, 6).forEach((match, index) => {
        const price = parseFloat(match.replace('$', ''));
        levels.push({
          level: price,;
          type: index % 2 === 0 ? 'SUPPORT' : 'RESISTANCE',;
          strength: 0.7 + Math.random() * 0.3,;
          description: `${index % 2 === 0 ? 'Support' : 'Resistance'} level identified from chart analysis`,;
        });
      });
    }
    return levels;
  }

  private async generateMarketPrediction(;
    visualAnalysis: ChartAnalysis,;
    patterns: TechnicalPattern[],;
    keyLevels: PriceLevel[],;
    marketContext: MarketContext,;
    symbol: string,;
    timeframe: string;
  ): Promise<MarketPrediction> {
    // Calculate prediction based on patterns and analysis;
    const bullishPatterns = patterns.filter(p => p.type === 'BULLISH');
    const bearishPatterns = patterns.filter(p => p.type === 'BEARISH');

    let direction: MarketPrediction['direction'];
    let probability: number;

    if (bullishPatterns.length > bearishPatterns.length) {
      direction = 'UP';
      probability = Math.min(0.9, 0.6 + bullishPatterns.length * 0.1);
    } else if (bearishPatterns.length > bullishPatterns.length) {
      direction = 'DOWN';
      probability = Math.min(0.9, 0.6 + bearishPatterns.length * 0.1);
    } else {
      direction = 'SIDEWAYS';
      probability = 0.5;
    }

    // Adjust based on market context;
    if (marketContext.marketSentiment === 'FEAR' && direction === 'UP') {
      probability *= 0.8;
    } else if (marketContext.marketSentiment === 'GREED' && direction === 'DOWN') {
      probability *= 0.8;
    }

    const riskLevel = probability > 0.75 ? 'LOW' : probability > 0.6 ? 'MODERATE' : 'HIGH';

    return {
      direction,;
      timeframe: timeframe as MarketPrediction['timeframe'],;
      probability,;
      riskLevel,;
      keyFactors: [;
        ...patterns.map(p => p.name),;
        `Market sentiment: ${marketContext.marketSentiment}`,;
        `VIX level: ${marketContext.vixLevel.toFixed(1)}`,;
      ],;
      targetPrice: this.calculateTargetPrice(keyLevels, direction),;
      stopLoss: this.calculateStopLoss(keyLevels, direction),;
      takeProfit: this.calculateTakeProfit(keyLevels, direction),;
    };
  }

  private calculateTargetPrice(levels: PriceLevel[], direction: string): number | undefined {
    if (levels.length === 0) return undefined;

    const resistanceLevels = levels;
      .filter(l => l.type === 'RESISTANCE');
      .sort((a, b) => a.level - b.level);
    const supportLevels = levels;
      .filter(l => l.type === 'SUPPORT');
      .sort((a, b) => b.level - a.level);

    if (direction === 'UP' && resistanceLevels.length > 0) {
      return resistanceLevels[0].level;
    } else if (direction === 'DOWN' && supportLevels.length > 0) {
      return supportLevels[0].level;
    }

    return undefined;
  }

  private calculateStopLoss(levels: PriceLevel[], direction: string): number | undefined {
    if (levels.length === 0) return undefined;

    const supportLevels = levels;
      .filter(l => l.type === 'SUPPORT');
      .sort((a, b) => b.level - a.level);
    const resistanceLevels = levels;
      .filter(l => l.type === 'RESISTANCE');
      .sort((a, b) => a.level - b.level);

    if (direction === 'UP' && supportLevels.length > 0) {
      return supportLevels[0].level * 0.98; // 2% below support;
    } else if (direction === 'DOWN' && resistanceLevels.length > 0) {
      return resistanceLevels[0].level * 1.02; // 2% above resistance;
    }

    return undefined;
  }

  private calculateTakeProfit(levels: PriceLevel[], direction: string): number | undefined {
    const target = this.calculateTargetPrice(levels, direction);
    return target ? target * (direction === 'UP' ? 1.05 : 0.95) : undefined;
  }

  private determineTrendDirection(;
    visualAnalysis: ChartAnalysis,;
    patterns: TechnicalPattern[];
  ): ChartAnalysis['trendDirection'] {
    const description = (visualAnalysis.reasoning || '').toLowerCase();

    const bullishPatterns = patterns.filter(p => p.type === 'BULLISH');
    const bearishPatterns = patterns.filter(p => p.type === 'BEARISH');

    if (bullishPatterns.length > bearishPatterns.length || description.includes('bullish')) {
      return 'BULLISH';
    } else if (bearishPatterns.length > bullishPatterns.length || description.includes('bearish')) {
      return 'BEARISH';
    } else if (description.includes('sideways') || description.includes('consolidation')) {
      return 'SIDEWAYS';
    }

    return 'NEUTRAL';
  }

  private calculateTrendStrength(patterns: TechnicalPattern[], visualAnalysis: ChartAnalysis): number {
    const avgConfidence =;
      patterns.length > 0;
        ? patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length;
        : 0.5;

    const baseStrength = avgConfidence * 10;

    // Adjust based on description keywords;
    const description = (visualAnalysis.reasoning || '').toLowerCase();
    let strengthMultiplier = 1.0;

    if (description.includes('strong') || description.includes('clear')) {
      strengthMultiplier = 1.2;
    } else if (description.includes('weak') || description.includes('unclear')) {
      strengthMultiplier = 0.8;
    }

    return Math.max(1, Math.min(10, baseStrength * strengthMultiplier));
  }

  private async getMarketContext(): Promise<MarketContext> {
    // In production, fetch real market data;
    return {
      vixLevel: 18 + Math.random() * 20,;
      marketSentiment: Math.random() > 0.6 ? 'GREED' : Math.random() > 0.3 ? 'NEUTRAL' : 'FEAR',;
      sectorRotation: {
        Technology: (Math.random() - 0.5) * 20,;
        Healthcare: (Math.random() - 0.5) * 15,;
        'Financial Services': (Math.random() - 0.5) * 18,;
        Energy: (Math.random() - 0.5) * 25,;
      },;
      economicIndicators: [;
        {
          name: 'GDP Growth',;
          value: 2.1,;
          change: 0.1,;
          impact: 'POSITIVE',;
          description: 'Steady economic growth',;
        },;
        {
          name: 'Inflation Rate',;
          value: 3.2,;
          change: -0.2,;
          impact: 'NEUTRAL',;
          description: 'Inflation moderating',;
        },;
      ],;
      newsEvents: [;
        {
          title: 'Fed signals potential rate cuts',;
          impact: 'HIGH',;
          sentiment: 0.3,;
          timestamp: new Date().toISOString(),;
        },;
      ],;
    };
  }

  private addToHistory(symbol: string, analysis: ChartAnalysis): void {
    const history = this.predictionHistory.get(symbol) || [];
    history.push(analysis);

    // Keep only last 50 analyses;
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }

    this.predictionHistory.set(symbol, history);
  }

  // Multi-modal analysis combining vision + fundamental + market data;
  async performMultiModalAnalysis(;
    imageFile: File | string,;
    symbol: string,;
    timeframe: string = '1D';
  ): Promise<MultiModalAnalysis> {
    try {
      // Visual chart analysis;
      const visualAnalysis = await this.analyzeChart(imageFile, symbol, timeframe);

      // Get market context;
      const marketContext = await this.getMarketContext();

      // Generate combined analysis using all data points;
      const combinedAnalysis = await this.generateCombinedAnalysis(;
        visualAnalysis,;
        marketContext;
      );

      return {
        visualAnalysis,;
        fundamentalFactors: this.getFundamentalFactors(),;
        marketContext,;
        combinedPrediction: combinedAnalysis.prediction,;
        reasoning: combinedAnalysis.reasoning,;
        riskFactors: combinedAnalysis.riskFactors,;
        opportunities: combinedAnalysis.opportunities,;
      };
    } catch {
      console.error('Multi-modal analysis error');
      throw new Error(`Failed to perform multi-modal analysis for ${symbol}`);
    }
  }

  private async generateCombinedAnalysis(;
    visualAnalysis: ChartAnalysis,;
    marketContext: MarketContext,;
    // symbol: string // Unused;
  ) {
    const prompt = `;
    Perform comprehensive market analysis combining technical, fundamental, and macro factors:;
    TECHNICAL ANALYSIS:;
    - Trend: ${visualAnalysis.trendDirection}
    - Patterns: ${visualAnalysis.patterns.map(p => p.name).join(', ')}
    - Confidence: ${(visualAnalysis.confidence * 100).toFixed(1)}%;
    - Key Levels: ${visualAnalysis.keyLevels.map(l => `${l.type}: $${l.level}`).join(', ')}

    MARKET CONTEXT:;
    - VIX: ${marketContext.vixLevel.toFixed(1)}
    - Sentiment: ${marketContext.marketSentiment}
    - Sector Performance: ${Object.entries(marketContext.sectorRotation);
      .map(([s, p]) => `${s}: ${p.toFixed(1)}%`);
      .join(', ')}

    ECONOMIC INDICATORS:;
    ${marketContext.economicIndicators.map(ind => `- ${ind.name}: ${ind.value}% (${ind.impact})`).join('\n')}

    Provide:;
    1. Combined prediction with specific probability;
    2. Key risk factors to monitor;
    3. Potential opportunities;
    4. Comprehensive reasoning;
    5. Specific entry/exit strategy;
    Be precise and actionable.;
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',;
        messages: [;
          {
            role: 'system',;
            content:;
              'You are an expert market analyst combining technical, fundamental, and macro analysis for comprehensive market predictions.',;
          },;
          {
            role: 'user',;
            content: prompt,;
          },;
        ],;
        max_tokens: 800,;
        temperature: 0.3,;
      });

      const content = response.choices[0].message.content || '';

      return {
        prediction: {
          ...visualAnalysis.prediction,;
          probability: this.extractConfidenceFromText(content),;
        },;
        reasoning: content,;
        riskFactors: this.extractRiskFactors(content),;
        opportunities: this.extractOpportunities(content),;
      };
    } catch {
      return {
        prediction: visualAnalysis.prediction,;
        reasoning: 'Combined analysis of technical patterns and market conditions',;
        riskFactors: ['Market volatility', 'Economic uncertainty'],;
        opportunities: ['Technical breakout potential', 'Sector rotation benefits'],;
      };
    }
  }

  private getFundamentalFactors(): string[] {
    // Mock fundamental factors - in production, fetch real data;
    return [;
      'Strong earnings growth',;
      'Expanding profit margins',;
      'Growing market share',;
      'Solid balance sheet',;
      'Increasing dividend yield',;
    ];
  }

  private extractRiskFactors(content: string): string[] {
    const risks: any[] = [];
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('volatility')) risks.push('Market volatility');
    if (lowerContent.includes('economic')) risks.push('Economic uncertainty');
    if (lowerContent.includes('regulatory')) risks.push('Regulatory changes');
    if (lowerContent.includes('competition')) risks.push('Competitive pressure');
    if (lowerContent.includes('interest rate')) risks.push('Interest rate risk');

    return risks.length > 0 ? risks : ['General market risk', 'Sector-specific risks'];
  }

  private extractOpportunities(content: string): string[] {
    const opportunities: any[] = [];
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('breakout')) opportunities.push('Technical breakout potential');
    if (lowerContent.includes('support')) opportunities.push('Strong support levels');
    if (lowerContent.includes('momentum')) opportunities.push('Positive momentum building');
    if (lowerContent.includes('volume')) opportunities.push('Increasing volume confirmation');

    return opportunities.length > 0;
      ? opportunities;
      : ['Pattern completion potential', 'Market timing opportunity'];
  }

  // Public API methods;
  async getHistoricalAccuracy(symbol: string): Promise<number | null> {
    const history = this.predictionHistory.get(symbol) || [];

    if (history.length < 5) {
      return 0;
    }
    // Simplified accuracy calculation;
    const correctPredictions = Math.floor(history.length * 0.68); // Mock 68% accuracy;
    return Number(((correctPredictions / history.length) * 100).toFixed(1));
  }

  async getBulkPredictions(symbols: string[], timeframe: string = '1D'): Promise<ChartAnalysis[]> {
    const predictions: any[] = [];

    for (const symbol of symbols) {
      try {
        // For bulk analysis, use simulated chart data;
        const mockChart = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
        const analysis = await this.analyzeChart(mockChart, symbol, timeframe);
        predictions.push(analysis);
      } catch (error) {
        console.error(`Error analyzing ${symbol}:`, error);
      }
    }

    return predictions;
  }

  getPredictionHistory(symbol: string): ChartAnalysis[] {
    return this.predictionHistory.get(symbol) || [];
  }

  clearPredictionHistory(symbol?: string): void {
    if (symbol) {
      this.predictionHistory.delete(symbol);
    } else {
      this.predictionHistory.clear();
    }
  }
}

export default AIMarketPredictor;
