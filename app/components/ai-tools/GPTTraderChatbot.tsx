"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";

interface ChatMessage { id: string, type: 'user' | 'bot'"
  content: string"
    timestamp: Date
}

interface GPTUserProfile {
  id: string"
    riskTolerance: string"
  investmentGoals: string[]"
    portfolioValue: string
}

export default function GPTTraderChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([ { id: '1', type: 'bot', content: 'Hello! I\'m your AI trading assistant. How can I help you with your investments today?'"
      timestamp: new Date()
    } ]); const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); const [userProfile] = useState<GPTUserProfile>({ id: 'user_1', riskTolerance: 'moderate', investmentGoals: ['Growth', 'Income'], portfolioValue: '$50,000'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), type: 'user'"
      content: inputMessage"
      timestamp: new Date()
    };
 setMessages(prev => [...prev, userMessage]); setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = { id: (Date.now() + 1).toString(), type: 'bot'"
        content: generateBotResponse(inputMessage)"
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {  
    const input = userInput.toLowerCase(); if (input.includes('portfolio') || input.includes('holdings')) { return 'Based on your moderate risk tolerance, I recommend diversifying across tech, healthcare and index funds. Your current allocation looks balanced.';
      } if (input.includes('buy') || input.includes('purchase')) { return 'Before making any purchases, let me analyze the current market conditions and your risk profile. What specific stock or sector interests you?';
    } if (input.includes('market') || input.includes('trend')) { return 'Current market sentiment is cautiously optimistic. I\'m seeing strong momentum in AI and healthcare sectors. Would you like me to provide specific recommendations?';
    } if (input.includes('risk')) { return 'Given your moderate risk tolerance, I suggest maintaining 60% stocks, 30% bonds and 10% alternative investments. This provides good growth potential with manageable downside.';
    } return 'I understand your question. Let me analyze the current market data and provide you with a personalized recommendation based on your investment profile.';
  };
 const handleKeyPress = (e: React.KeyboardEvent) => {   if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">GPT Trader Chatbot</h1>
        </div>
        <Badge variant="outline">AI Assistant</Badge>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Risk Tolerance</p>
              <p className="font-semibold">{userProfile.riskTolerance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Portfolio Value</p>
              <p className="font-semibold">{userProfile.portfolioValue}</p>
            </div>
            <div> <p className="text-sm text-gray-600">Goals</p> <p className="font-semibold">{userProfile.investmentGoals.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Chat with AI Trader</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Messages */}
            <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${ message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  > <div className="flex items-center space-x-2 mb-1"> {message.type === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))},{isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about stocks
               portfolio advice
               market trends..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm" onClick={() => setInputMessage('What stocks should I buy?')}
              >
                Stock Recommendations
              </Button>
              <Button
                variant="outline"
                size="sm" onClick={() => setInputMessage('Analyze my portfolio risk')}
              >
                Portfolio Analysis
              </Button>
              <Button
                variant="outline"
                size="sm" onClick={() => setInputMessage('What are the market trends?')}
              >
                Market Trends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
