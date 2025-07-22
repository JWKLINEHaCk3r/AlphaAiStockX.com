import {
  Position,
  TechnicalIndicators,
  VolumeProfile,
  BollingerBands,
  SupportResistance,
  OptimalAllocations,
  RebalanceAction,
} from '../types/trading-types';\n\n// GPT-Trader Chatbot - Conversational Trading Assistant
import { OpenAI } from 'openai';

interface UserProfile {
  id: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  portfolioValue: number;
  preferredSectors: string[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    symbols?: string[];
    recommendations?: TradeRecommendation[];
    analysis?: any;
  };
}

interface TradeRecommendation {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  quantity: number;
  reasoning: string;
  confidence: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  targetPrice?: number;
  stopLoss?: number;
  timeframe: string;
}

interface PortfolioSimulation {
  currentValue: number;
  projectedValue: number;
  expectedReturn: number;
  risk: number;
  diversificationScore: number;
  recommendations: TradeRecommendation[];
}

export class GPTTraderChatbot {
  private openai: OpenAI;
  private conversationHistory: Map<string, ChatMessage[]> = new Map();
  private userProfiles: Map<string, UserProfile> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async initializeChat(userId: string, userProfile?: UserProfile): Promise<ChatMessage> {
    if (userProfile) {
      this.userProfiles.set(userId, userProfile);
    }

    const welcomeMessage: ChatMessage = {
      id: this.generateMessageId(),
      role: 'assistant',
      content: `👋 Welcome to GPT-Trader! I'm your AI trading assistant.

I can help you with:
• 📊 Stock analysis and recommendations
• 💼 Portfolio optimization
• 📈 Market trend analysis
• 🎯 Risk assessment
• 📚 Trading education

${userProfile ? `I see you're a ${userProfile.experience} investor with ${userProfile.riskTolerance} risk tolerance. ` : ''}

What would you like to explore today? You can ask me about specific stocks, request portfolio advice, or get market insights!`,
      timestamp: new Date().toISOString(),
    };

    this.addMessageToHistory(userId, welcomeMessage);
    return welcomeMessage;
  }

  async processMessage(userId: string, userMessage: string): Promise<ChatMessage> {
    const userChatMessage: ChatMessage = {
      id: this.generateMessageId(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    this.addMessageToHistory(userId, userChatMessage);

    try {
      // Analyze user intent and extract relevant information
      const intent = await this.analyzeUserIntent(userMessage);

      // Get relevant market data if needed
      const marketContext = await this.getMarketContext(intent.symbols);

      // Generate AI response
      const response = await this.generateAIResponse(userId, userMessage, intent, marketContext);

      const assistantMessage: ChatMessage = {
        id: this.generateMessageId(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        metadata: {
          symbols: intent.symbols,
          recommendations: response.recommendations,
          analysis: response.analysis,
        },
      };

      this.addMessageToHistory(userId, assistantMessage);
      return assistantMessage;
    } catch (error) {
      console.error('Error processing message:', error);

      const errorMessage: ChatMessage = {
        id: this.generateMessageId(),
        role: 'assistant',
        content:
          "I apologize, but I'm experiencing some technical difficulties. Please try again or rephrase your question.",
        timestamp: new Date().toISOString(),
      };

      this.addMessageToHistory(userId, errorMessage);
      return errorMessage;
    }
  }

  private async analyzeUserIntent(message: string) {
    const symbolRegex = /\b[A-Z]{1,5}\b/g;
    const symbols = message.match(symbolRegex) || [];

    // Filter out common words that might match the pattern
    const filteredSymbols = symbols.filter(
      symbol =>
        ![
          'THE',
          'AND',
          'FOR',
          'ARE',
          'BUT',
          'NOT',
          'YOU',
          'ALL',
          'CAN',
          'HAD',
          'HER',
          'WAS',
          'ONE',
          'OUR',
          'OUT',
          'DAY',
          'GET',
          'USE',
          'MAN',
          'NEW',
          'NOW',
          'OLD',
          'SEE',
          'HIM',
          'TWO',
          'HOW',
          'ITS',
          'WHO',
          'OIL',
          'SIT',
          'SET',
          'RUN',
          'EAT',
          'FAR',
          'SEA',
          'EYE',
          'RED',
          'TOP',
          'ARM',
          'TOO',
          'WHY',
          'LET',
          'PUT',
          'END',
          'GOT',
          'LOT',
          'WAY',
          'SUN',
          'CAR',
          'BAD',
          'WIN',
          'BIG',
          'YES',
          'TRY',
          'BUY',
          'FUN',
        ].includes(symbol)
    );

    return {
      type: this.determineIntentType(message),
      symbols: filteredSymbols,
      isPortfolioQuery: message.toLowerCase().includes('portfolio'),
      isAnalysisRequest:
        message.toLowerCase().includes('analyz') || message.toLowerCase().includes('research'),
      isRecommendationRequest:
        message.toLowerCase().includes('recommend') || message.toLowerCase().includes('suggest'),
      isEducationalQuery:
        message.toLowerCase().includes('learn') || message.toLowerCase().includes('explain'),
      riskQuery: message.toLowerCase().includes('risk'),
    };
  }

  private determineIntentType(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) return 'buy_intent';
    if (lowerMessage.includes('sell')) return 'sell_intent';
    if (lowerMessage.includes('portfolio')) return 'portfolio_query';
    if (lowerMessage.includes('analyz') || lowerMessage.includes('research'))
      return 'analysis_request';
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest'))
      return 'recommendation_request';
    if (lowerMessage.includes('learn') || lowerMessage.includes('explain'))
      return 'educational_query';
    if (lowerMessage.includes('market') || lowerMessage.includes('trend')) return 'market_query';

    return 'general_query';
  }

  private async getMarketContext(symbols: string[]) {
    if (symbols.length === 0) return null;

    try {
      // In production, fetch real market data
      const marketData = symbols.map(symbol => ({
        symbol,
        price: 150 + Math.random() * 100,
        change: Math.random() * 10 - 5,
        changePercent: Math.random() * 5 - 2.5,
        volume: Math.floor(Math.random() * 10000000),
        marketCap: Math.floor(Math.random() * 1000000000000),
        pe: 15 + Math.random() * 20,
        sector: this.getSectorForSymbol(symbol),
      }));

      return marketData;
    } catch (error) {
      return null;
    }
  }

  private getSectorForSymbol(symbol: string): string {
    const sectorMap: { [key: string]: string } = {
      AAPL: 'Technology',
      MSFT: 'Technology',
      GOOGL: 'Technology',
      AMZN: 'Consumer Discretionary',
      TSLA: 'Consumer Discretionary',
      NVDA: 'Technology',
      META: 'Technology',
      JPM: 'Financial Services',
      JNJ: 'Healthcare',
      V: 'Financial Services',
    };

    return sectorMap[symbol] || 'Technology';
  }

  private async generateAIResponse(
    userId: string,
    userMessage: string,
    intent: any,
    marketContext: any
  ) {
    const userProfile = this.userProfiles.get(userId);
    const chatHistory = this.conversationHistory.get(userId) || [];

    // Build context for GPT
    const contextPrompt = this.buildContextPrompt(userProfile, chatHistory, intent, marketContext);

    const prompt = `${contextPrompt}

User Message: "${userMessage}"

Provide a helpful, professional response as an AI trading assistant. Include:
1. Direct answer to the user's question
2. Relevant market insights
3. Specific recommendations if appropriate
4. Risk considerations
5. Educational context when helpful

Be conversational, informative, and always consider the user's risk tolerance and experience level.
Use emojis appropriately to make the response engaging.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are GPT-Trader, an expert AI trading assistant. You provide professional, helpful, and educational trading advice while always emphasizing risk management.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.7,
      });

      const content =
        response.choices[0].message.content ||
        'I apologize, but I cannot provide a response at the moment.';

      // Generate recommendations if applicable
      const recommendations =
        intent.isRecommendationRequest && intent.symbols.length > 0
          ? await this.generateRecommendations(intent.symbols, userProfile)
          : [];

      return {
        content,
        recommendations,
        analysis: marketContext,
      };
    } catch (error) {
      return {
        content: `I understand you're asking about ${intent.symbols.length > 0 ? intent.symbols.join(', ') : 'trading'}. Let me provide some general guidance based on current market conditions.

📊 **Market Analysis**: The current market environment requires careful consideration of risk and diversification.

💡 **Key Recommendations**:
• Focus on diversification across sectors
• Consider your risk tolerance before making decisions
• Always do additional research before investing
• Consider dollar-cost averaging for long-term positions

Would you like me to elaborate on any specific aspect?`,
        recommendations: [],
        analysis: marketContext,
      };
    }
  }

  private buildContextPrompt(
    userProfile: UserProfile | undefined,
    chatHistory: ChatMessage[],
    intent: any,
    marketContext: any
  ): string {
    let context = 'TRADING ASSISTANT CONTEXT:\n\n';

    if (userProfile) {
      context += `User Profile:
- Experience: ${userProfile.experience}
- Risk Tolerance: ${userProfile.riskTolerance}
- Investment Goals: ${userProfile.investmentGoals.join(', ')}
- Time Horizon: ${userProfile.timeHorizon}
- Portfolio Value: $${userProfile.portfolioValue.toLocaleString()}
- Preferred Sectors: ${userProfile.preferredSectors.join(', ')}

`;
    }

    if (marketContext && marketContext.length > 0) {
      context += 'Current Market Data:\n';
      marketContext.forEach((stock: any) => {
        context += `- ${stock.symbol}: $${stock.price.toFixed(2)} (${stock.changePercent.toFixed(2)}%)\n`;
      });
      context += '\n';
    }

    if (chatHistory.length > 1) {
      context += 'Recent Conversation:\n';
      const recentMessages = chatHistory.slice(-6); // Last 6 messages
      recentMessages.forEach(msg => {
        if (msg.role !== 'system') {
          context += `${msg.role}: ${msg.content.substring(0, 200)}...\n`;
        }
      });
      context += '\n';
    }

    return context;
  }

  private async generateRecommendations(
    symbols: string[],
    userProfile?: UserProfile
  ): Promise<TradeRecommendation[]> {
    const recommendations: TradeRecommendation[] = [];

    for (const symbol of symbols) {
      const recommendation: TradeRecommendation = {
        symbol,
        action: Math.random() > 0.5 ? 'BUY' : 'HOLD',
        quantity: Math.floor(Math.random() * 100) + 10,
        reasoning: `Based on technical analysis and current market conditions, ${symbol} shows ${Math.random() > 0.5 ? 'positive' : 'neutral'} signals.`,
        confidence: 0.6 + Math.random() * 0.3,
        riskLevel: userProfile?.riskTolerance === 'aggressive' ? 'HIGH' : 'MODERATE',
        targetPrice: 150 + Math.random() * 50,
        stopLoss: 140 + Math.random() * 20,
        timeframe: '1-3 months',
      };

      recommendations.push(recommendation);
    }

    return recommendations;
  }

  async simulatePortfolio(userId: string, holdings: Record<string, unknown>[]): Promise<PortfolioSimulation> {
    const userProfile = this.userProfiles.get(userId);

    // Calculate portfolio metrics
    const currentValue = holdings.reduce(
      (sum, holding) => sum + holding.quantity * holding.price,
      0
    );
    const projectedValue = currentValue * (1 + (Math.random() * 0.2 - 0.05)); // -5% to +15%
    const expectedReturn = ((projectedValue - currentValue) / currentValue) * 100;

    // Calculate diversification score
    const sectors = new Set(holdings.map(h => h.sector));
    const diversificationScore = Math.min(100, (sectors.size / 11) * 100); // Max 11 sectors

    return {
      currentValue,
      projectedValue,
      expectedReturn,
      risk:
        userProfile?.riskTolerance === 'aggressive'
          ? 75
          : userProfile?.riskTolerance === 'moderate'
            ? 50
            : 25,
      diversificationScore,
      recommendations: await this.generateRecommendations(
        holdings.map(h => h.symbol).slice(0, 3),
        userProfile
      ),
    };
  }

  getChatHistory(userId: string): ChatMessage[] {
    return this.conversationHistory.get(userId) || [];
  }

  clearChatHistory(userId: string): void {
    this.conversationHistory.delete(userId);
  }

  private addMessageToHistory(userId: string, message: ChatMessage): void {
    const history = this.conversationHistory.get(userId) || [];
    history.push(message);

    // Keep only last 50 messages to manage memory
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }

    this.conversationHistory.set(userId, history);
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default GPTTraderChatbot;
