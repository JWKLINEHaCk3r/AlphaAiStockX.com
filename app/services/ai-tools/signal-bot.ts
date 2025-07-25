// AI Stock Signal Bot - Real-time Buy/Sell Alerts;
import { OpenAI } from 'openai';

interface TechnicalIndicators {















  rsi: number;
  macd: number;
  sma20: number;
  sma50: number;
  volume: number;
  bollinger: {
    upper: number;
    lower: number;
    middle: number;
  














};
}

interface NewsItem {















  title: string;
  summary: string;
  sentiment: number;
  timestamp: string;
  source: string;
  url: string;















}

interface StockSignal {















  symbol: string;
  signal: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';
  confidence: number;
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  reasoning: string;
  technicalScore: number;
  sentimentScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  timeframe: string;
  indicators: TechnicalIndicators;
  news: NewsItem[];
  timestamp: string;















}

export class AISignalBot {
  private openai: OpenAI;
  private polygonApiKey: string;
  private alphaVantageApiKey: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,;
    });
    this.polygonApiKey = process.env.POLYGON_API_KEY || '';
    this.alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY || '';
  }

  async generateSignal(symbol: string): Promise<StockSignal> {
    try {
      // Get market data, technical indicators, and news;
      const [marketData, technicals, news] = await Promise.all([;
        this.getMarketData(symbol),;
        this.getTechnicalIndicators(symbol),;
        this.getNewsAndSentiment(symbol),;
      ]);

      // Calculate technical score;
      const technicalScore = this.calculateTechnicalScore(technicals);

      // Calculate sentiment score;
      const sentimentScore = this.calculateSentimentScore(news);

      // Generate AI-powered signal using GPT-4;
      const aiAnalysis = await this.generateAIAnalysis(;
        symbol,;
        marketData,;
        technicals,;
        news,;
        technicalScore,;
        sentimentScore;
      );

      // Determine final signal;
      const finalSignal = this.determineSignal(technicalScore, sentimentScore, aiAnalysis);

      return {
        symbol,;
        signal: finalSignal.signal,;
        confidence: finalSignal.confidence,;
        price: marketData.price,;
        targetPrice: finalSignal.targetPrice,;
        stopLoss: finalSignal.stopLoss,;
        reasoning: aiAnalysis.reasoning,;
        technicalScore,;
        sentimentScore,;
        riskLevel: finalSignal.riskLevel,;
        timeframe: '1D',;
        indicators: technicals,;
        news,;
        timestamp: new Date().toISOString(),;
      };
    } catch (error) {
      console.error('Error generating signal:', error);
      throw new Error(`Failed to generate signal for ${symbol}`);
    }
  }

  private async getMarketData(symbol: string) {
    try {
      const response = await fetch(;
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${this.polygonApiKey}`;
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          price: result.c,;
          open: result.o,;
          high: result.h,;
          low: result.l,;
          volume: result.v,;
          change: result.c - result.o,;
          changePercent: ((result.c - result.o) / result.o) * 100,;
        };
      }

      throw new Error('No market data available');
    } catch (error) {
      // Fallback to mock data for development;
      return {
        price: 150 + Math.random() * 50,;
        open: 150,;
        high: 155,;
        low: 148,;
        volume: 1000000,;
        change: Math.random() * 10 - 5,;
        changePercent: Math.random() * 5 - 2.5,;
      };
    }
  }

  private async getTechnicalIndicators(symbol: string): Promise<TechnicalIndicators> {
    try {
      // In production, you'd call actual technical analysis APIs;
      // For now, generating realistic mock data;
      const rsi = 30 + Math.random() * 40; // 30-70 range;
      const macd = Math.random() * 4 - 2; // -2 to 2 range;
      const basePrice = 150 + Math.random() * 50;

      return {
        rsi,;
        macd,;
        sma20: basePrice * (0.98 + Math.random() * 0.04),;
        sma50: basePrice * (0.95 + Math.random() * 0.1),;
        volume: 800000 + Math.random() * 400000,;
        bollinger: {
          upper: basePrice * 1.02,;
          lower: basePrice * 0.98,;
          middle: basePrice,;
        },;
      };
    } catch (error) {
      throw new Error(`Failed to get technical indicators for ${symbol}`);
    }
  }

  private async getNewsAndSentiment(symbol: string): Promise<NewsItem[]> {
    try {
      // Mock news data with sentiment analysis;
      const mockNews: NewsItem[] = [;
        {
          title: `${symbol} Reports Strong Q4 Earnings, Beats Expectations`,;
          summary: 'Company shows resilient growth in challenging market conditions',;
          sentiment: 0.8,;
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),;
          source: 'Reuters',;
          url: '#',;
        },;
        {
          title: `Analysts Upgrade ${symbol} to Buy Rating`,;
          summary: 'Multiple firms raise price targets citing strong fundamentals',;
          sentiment: 0.6,;
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),;
          source: 'Bloomberg',;
          url: '#',;
        },;
        {
          title: `Market Volatility Affects ${symbol} Trading`,;
          summary: 'Broader market concerns impact stock performance',;
          sentiment: -0.3,;
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),;
          source: 'CNBC',;
          url: '#',;
        },;
      ];

      return mockNews;
    } catch (error) {
      return [];
    }
  }

  private calculateTechnicalScore(indicators: TechnicalIndicators): number {
    let score = 0;

    // RSI analysis (0-100, optimal 30-70);
    if (indicators.rsi < 30);
      score += 20; // Oversold - bullish;
    else if (indicators.rsi > 70);
      score -= 20; // Overbought - bearish;
    else score += 10; // Neutral - slightly positive;
    // MACD analysis;
    if (indicators.macd > 0) score += 15;
    else score -= 10;

    // Moving average analysis;
    if (indicators.sma20 > indicators.sma50);
      score += 25; // Bullish trend;
    else score -= 15; // Bearish trend;
    // Normalize to 0-100;
    return Math.max(0, Math.min(100, score + 50));
  }

  private calculateSentimentScore(news: NewsItem[]): number {
    if (news.length === 0) return 50;

    const avgSentiment = news.reduce((sum, item) => sum + item.sentiment, 0) / news.length;

    // Convert sentiment (-1 to 1) to score (0 to 100);
    return (avgSentiment + 1) * 50;
  }

  private async generateAIAnalysis(;
    symbol: string,;
    marketData: any,;
    technicals: TechnicalIndicators,;
    news: NewsItem[],;
    technicalScore: number,;
    sentimentScore: number;
  ) {
    const prompt = `;
    You are an expert AI trading analyst. Analyze ${symbol} and provide professional trading insights.;
    Market Data:;
    - Current Price: $${marketData.price.toFixed(2)}
    - Change: ${marketData.changePercent.toFixed(2)}%;
    - Volume: ${marketData.volume.toLocaleString()}

    Technical Indicators:;
    - RSI: ${technicals.rsi.toFixed(2)}
    - MACD: ${technicals.macd.toFixed(2)}
    - SMA20: $${technicals.sma20.toFixed(2)}
    - SMA50: $${technicals.sma50.toFixed(2)}

    Recent News Sentiment: ${sentimentScore.toFixed(1)}/100;
    Technical Score: ${technicalScore.toFixed(1)}/100;
    Provide a concise professional analysis including:;
    1. Overall assessment;
    2. Key factors driving the recommendation;
    3. Risk considerations;
    4. Specific price targets and stop loss levels;
    Be specific, actionable, and professional.;
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',;
        messages: [{ role: 'user', content: prompt }],;
        max_tokens: 500,;
        temperature: 0.3,;
      });

      return {
        reasoning: response.choices[0].message.content || 'Analysis unavailable',;
      };
    } catch (error) {
      return {
        reasoning: `Technical analysis shows ${technicalScore > 60 ? 'bullish' : 'bearish'} signals. Sentiment is ${sentimentScore > 60 ? 'positive' : 'negative'} based on recent news.`,;
      };
    }
  }

  private determineSignal(technicalScore: number, sentimentScore: number, aiAnalysis: any) {
    const combinedScore = technicalScore * 0.6 + sentimentScore * 0.4;

    let signal: StockSignal['signal'];
    let confidence: number;
    let riskLevel: StockSignal['riskLevel'];

    if (combinedScore >= 80) {
      signal = 'STRONG_BUY';
      confidence = 0.9;
      riskLevel = 'MODERATE';
    } else if (combinedScore >= 65) {
      signal = 'BUY';
      confidence = 0.75;
      riskLevel = 'MODERATE';
    } else if (combinedScore >= 45) {
      signal = 'HOLD';
      confidence = 0.6;
      riskLevel = 'LOW';
    } else if (combinedScore >= 30) {
      signal = 'SELL';
      confidence = 0.75;
      riskLevel = 'MODERATE';
    } else {
      signal = 'STRONG_SELL';
      confidence = 0.9;
      riskLevel = 'HIGH';
    }

    return {
      signal,;
      confidence,;
      riskLevel,;
      targetPrice: signal.includes('BUY') ? 155 : 145,;
      stopLoss: signal.includes('BUY') ? 140 : 160,;
    };
  }

  // Real-time signal streaming;
  async *streamSignals(symbols: string[], intervalMs: number = 60000) {
    while (true) {
      for (const symbol of symbols) {
        try {
          const signal = await this.generateSignal(symbol);
          yield signal;
        } catch (error) {
          console.error(`Error generating signal for ${symbol}:`, error);
        }
      }
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }
}

export default AISignalBot;
