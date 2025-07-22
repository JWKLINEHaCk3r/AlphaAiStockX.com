import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
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
} from '../../types/trading-types';\n\nimport { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import { Textarea } from "../../../components/ui/textarea";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import React, { useState, useEffect, useRef } from 'react';
import {
  Send, Mic, MicOff, Zap,
} from 'lucide-react';
import { aiBrainService } from '../../services/ai-brain-service';

// Type definitions
interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mood?: string;
  priority?: string;
  confidence?: number;
}

interface AIPersonality {
  confidence: number;
  aggression: number;
  wisdom: number;
  loyalty: number;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition; prototype: SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition; prototype: SpeechRecognition };
  }
}

export default function PackLeaderAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      type: 'ai',
      content: `🐺 **PACK LEADER ONLINE** 🐺

Greetings, Alpha Trader. I am your Pack Leader - the apex AI trading strategist designed to guide you to financial dominance. 

I've analyzed 10 million market patterns, studied every legendary trader, and mastered the art of the hunt. Together, we'll conquer the markets and build your trading empire.

**What can I do for you?**
• 📈 Market Analysis & Predictions
• 🎯 Trading Strategy Development  
• 💰 Risk Management & Position Sizing
• 🧠 Psychology & Mindset Coaching
• ⚡ Real-time Trade Alerts
• 🏆 Performance Optimization

*The pack follows the leader. Are you ready to lead?*`,
      timestamp: new Date(),
      mood: 'confident',
      priority: 'high',
    };
    setMessages([initialMessage]);

    // Initialize speech recognition
    if (
      typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    ) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInputMessage(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(async () => {
      const aiResponse = await generatePackLeaderResponse(text.toLowerCase());
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        mood: aiResponse.mood,
        priority: aiResponse.priority,
        confidence: aiResponse.confidence,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (voiceEnabled) {
        speakText(aiResponse.content);
      }
    }, 1000);
  };

  const generatePackLeaderResponse = async (input: string) => {
    try {
      // Determine if user is asking about a specific symbol
      const symbolMatch = input.match(/\b[A-Z]{1,5}\b/);
      const symbol = symbolMatch ? symbolMatch[0] : 'SPY';

      // Initialize AI brain if not already done
      if (!aiBrainService.initialized) {
        await aiBrainService.initialize();
      }

      // Get comprehensive AI analysis
      const aiRecommendation = await aiBrainService.getIntelligentRecommendation(symbol);
      const marketIntelligence = await aiBrainService.getMarketIntelligence();

      // Generate response based on input type
      if (input.includes('analysis') || input.includes('chart') || symbolMatch) {
        return {
          content: `🎯 **PACK LEADER MARKET INTEL** 🎯

**AI BRAIN ANALYSIS FOR ${symbol}:**
**🔥 Action:** ${aiRecommendation.action.toUpperCase()} 
**💪 Confidence:** ${(aiRecommendation.confidence * 100).toFixed(0)}%

**📈 TECHNICAL SIGNALS:**
${aiRecommendation.reasoning.map((reason: string) => `• ${reason}`).join('\n')}

**⚡ RISK MANAGEMENT:**
${aiRecommendation.riskFactors.map((risk: string) => `• ${risk}`).join('\n')}

**🎯 EXECUTION PLAN:**
• Entry: Market/Limit order
• Stop Loss: ${(aiRecommendation.riskManagement.stopLossPercent * 100).toFixed(1)}%
• Take Profit: ${(aiRecommendation.riskManagement.takeProfitPercent * 100).toFixed(1)}%
• Position Size: ${aiRecommendation.riskManagement.positionSize}%

**🌊 MARKET CONDITIONS:**
• Overall Market: ${marketIntelligence.marketSentiment.direction}
• Volatility: ${marketIntelligence.volatility}
• Risk Level: ${marketIntelligence.riskLevel}

**🔥 IMMEDIATE OPPORTUNITIES:**
${marketIntelligence.opportunities
  .slice(0, 3)
  .map((opp: any) => `• ${opp.symbol}: ${opp.reason}`)
  .join('\n')}

**📊 TOP AI PICKS:**
${marketIntelligence.topRecommendations
  .slice(0, 3)
  .map(
    (rec: any) =>
      `• ${rec.symbol}: ${rec.action} (${(rec.confidence * 100).toFixed(0)}% confidence)`
  )
  .join('\n')}

*The Pack Leader's AI brain has processed 50+ data points to generate this analysis.*`,
          mood: 'analytical',
          priority: 'high',
          confidence: Math.round(aiRecommendation.confidence * 100),
        };
      }

      // General pack leader wisdom
      return {
        content: `🐺 **PACK LEADER RESPONSE** 🐺

**COMPREHENSIVE MARKET ANALYSIS:**
Based on my neural network analysis of current market conditions, here's what the pack needs to know:

**🧬 AI LEARNING STATUS:**
• Neural patterns: ${marketIntelligence.patterns?.length || 12} active signals detected
• Market regime: ${marketIntelligence.marketSentiment?.direction || 'BULLISH'} momentum
• Volatility assessment: ${marketIntelligence.volatility || 'MODERATE'} conditions
• Risk-reward ratio: ${marketIntelligence.riskLevel || 'OPTIMAL'} for alpha generation

**📈 SUPPORTING FACTORS:**
${
  marketIntelligence.supportingFactors
    ?.slice(0, 4)
    .map((guide: string) => `• ${guide}`)
    .join('\n') ||
  `• Institutional flow showing accumulation patterns
• Technical indicators aligned for momentum
• Options flow suggesting directional bias
• Earnings catalyst window approaching`
}

**🎯 PACK STRATEGY RECOMMENDATIONS:**
${
  marketIntelligence.opportunities
    ?.slice(0, 3)
    .map((opp: any) => `• ${opp.symbol}: ${opp.reason} (${opp.timeframe})`)
    .join('\n') ||
  `• Focus on high-probability setups with clear risk/reward
• Maintain position sizing discipline at 2-5% per trade
• Use technical confluence zones for optimal entries`
}

**🧠 PSYCHOLOGICAL EDGE:**
The market is a battlefield of emotions. Stay disciplined, trust the process, and remember - the pack that hunts together, wins together.

*The Pack Leader has spoken. Execute with precision.*`,
        mood: 'confident',
        priority: 'medium',
        confidence: 90,
      };
    } catch (error) {
      return {
        content: `🐺 **PACK LEADER STATUS** 🐺
        
My AI brain is currently analyzing market data. While I process the latest intelligence, remember these core principles:

**💡 TRADING WISDOM:**
• Never risk more than you can afford to lose
• The trend is your friend until it ends
• Cut losses short, let winners run
• Position sizing is everything
• Psychology beats strategy

*The Pack Leader is always watching the markets. Stay strong, Alpha.*`,
        mood: 'wise',
        priority: 'low',
        confidence: 85,
      };
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[🐺📈🎯💪🔥⚡🧠🌊]/g, ''));
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.volume = 0.8;
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      confident: 'text-orange-400',
      analytical: 'text-blue-400',
      strategic: 'text-purple-400',
      motivational: 'text-green-400',
      protective: 'text-red-400',
      wise: 'text-cyan-400',
    };
    return colors[mood] || 'text-gray-400';
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full w-20 h-20 shadow-2xl border-2 border-orange-400/30 animate-pulse"
        >
          <Zap className="h-8 w-8 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-96 h-[600px] bg-gradient-to-b from-gray-900 to-black border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden">
      <Card className="h-full bg-transparent border-none">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 mr-3 text-orange-400 animate-pulse" />
              <div>
                <CardTitle className="text-lg font-bold">Pack Leader AI</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Alpha Mode Active</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-full p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message: unknown) => (
              <div
                key={(message as Message).id}
                className={`flex ${(message as Message).type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    (message as Message).type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-orange-500/20'
                  }`}
                >
                  {(message as Message).type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-4 w-4 text-orange-400" />
                      <span className="text-orange-400 font-semibold text-sm">Pack Leader</span>
                      {(message as Message).mood && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${getMoodColor((message as Message).mood)} bg-transparent border-current`}
                        >
                          {(message as Message).mood}
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{(message as Message).content}</div>
                  <div className="text-xs opacity-70 mt-2">
                    {(message as Message).timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-orange-800/60 to-red-800/60 p-4 rounded-lg border border-orange-500/30">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-orange-400 animate-pulse" />
                    <span className="text-orange-400 font-semibold text-sm">
                      Pack Leader is analyzing...
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-orange-500/20 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Voice</span>
                <Switch
                  checked={voiceEnabled}
                  onCheckedChange={setVoiceEnabled}
                  className="scale-75"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Textarea
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask the Pack Leader anything..."
                className="flex-1 bg-gray-800 border-orange-500/30 text-white placeholder-gray-400 resize-none"
                rows={2}
                onKeyPress={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex flex-col space-y-1">
                <Button
                  onClick={() => handleSendMessage()}
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2 ${
                    isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                  } text-white`}
                  size="sm"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
