import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  VisionModel,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
  RiskAnalysis,
  SectorPerformance,
  BacktestStrategy,
  AIWhiteLabelMetrics,
  MarketClassification,
  TradingRecommendation,
  StockAnalysis,
  RealtimeData,
  VolumeProfile,
  AIAnalysisComponents,
  CryptoData,
  DeFiProtocol,
  NFTCollection,
  UserProfile,
  ThemeOption,
  AccentColor,
  SubscriptionPlan,
  TradingStrategy,
  ScanResult,
  SiteDiagnostic,
  Alert,
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  SocialPost,
  DeepLearningModel,
  MarketPattern,
} from '../../types/trading-types';\n\n"use client";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
// GPT-Trader Chatbot Component
import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  User,
  Send,
  MessageCircle,
  TrendingUp,
  DollarSign,
  BarChart3,
  Brain,
  Sparkles,
  Clock,
  Star,
  Target,
  AlertCircle,
} from 'lucide-react';

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

interface UserProfile {
  id: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[];
  timeHorizon: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  portfolioValue: number;
  preferredSectors: string[];
}

export default function GPTTraderChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userProfile] = useState<UserProfile>({
    id: 'user_1',
    riskTolerance: 'moderate',
    investmentGoals: ['Growth', 'Income'],
    timeHorizon: 'Long-term (5+ years)',
    experience: 'intermediate',
    portfolioValue: 100000,
    preferredSectors: ['Technology', 'Healthcare'],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = async () => {
    try {
      const response = await fetch('/api/ai-tools/gpt-trader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userProfile.id,
          action: 'initialize',
          userProfile,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMessages([result.data]);
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tools/gpt-trader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userProfile.id,
          action: 'message',
          message: inputMessage,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMessages(prev => [...prev, result.data]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    inputRef.current?.focus();
  };

  const clearChat = async () => {
    try {
      await fetch(`/api/ai-tools/gpt-trader?userId=${userProfile.id}&action=clear`);
      setMessages([]);
      setIsInitialized(false);
      initializeChat();
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';

    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isUser ? 'bg-blue-500' : 'bg-green-500'
              }`}
            >
              {isUser ? (
                <User className="h-4 w-4 text-white" />
              ) : (
                <Bot className="h-4 w-4 text-white" />
              )}
            </div>
          </div>

          <div
            className={`rounded-lg px-4 py-2 ${
              isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900 border'
            }`}
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>

            {/* Render recommendations if available */}
            {message.metadata?.recommendations && message.metadata.recommendations.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.metadata.recommendations.map((rec, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            rec.action === 'BUY'
                              ? 'default'
                              : rec.action === 'SELL'
                                ? 'destructive'
                                : 'secondary'
                          }
                        >
                          {rec.action}
                        </Badge>
                        <span className="font-semibold text-gray-900">{rec.symbol}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {(rec.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{rec.reasoning}</p>
                    {rec.targetPrice && (
                      <div className="mt-2 text-xs text-gray-600">
                        Target: ${rec.targetPrice.toFixed(2)}
                        {rec.stopLoss && ` | Stop Loss: $${rec.stopLoss.toFixed(2)}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs opacity-70 mt-2">{formatTimestamp(message.timestamp)}</div>
          </div>
        </div>
      </div>
    );
  };

  const quickActions = [
    'Analyze AAPL stock',
    'Recommend growth stocks',
    'Portfolio diversification tips',
    'Market outlook today',
    'Best tech stocks to buy',
    'Risk management strategies',
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GPT-Trader</h1>
              <p className="text-sm text-gray-600">Your AI Trading Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Risk Tolerance</p>
              <Badge variant="outline" className="capitalize">
                {userProfile.riskTolerance}
              </Badge>
            </div>

            <Button variant="outline" size="sm" onClick={clearChat}>
              Clear Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-blue-50 border-b px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span>Portfolio: ${userProfile.portfolioValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span>Experience: {userProfile.experience}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{userProfile.timeHorizon}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-600">Goals: {userProfile.investmentGoals.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            {messages.length === 0 && !isInitialized ? (
              <div className="text-center py-12">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Initializing GPT-Trader...
                </h3>
                <p className="text-gray-500">Setting up your personalized trading assistant</p>
              </div>
            ) : (
              <>
                {messages.map(renderMessage)}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="bg-white border-t px-6 py-4">
          <p className="text-sm text-gray-600 mb-3">Quick Actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {action}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex space-x-3">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Ask me about stocks, market analysis, or trading strategies..."
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Powered by GPT-4 • Real-time market data • Professional analysis</span>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-3 w-3" />
            <span>AI-generated content for educational purposes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
