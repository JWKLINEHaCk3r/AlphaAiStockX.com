"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Send,
  Mic,
  MicOff,
  Crown,
  Brain,
  Target,
  TrendingUp,
  Shield,
  Rocket,
  Eye,
  Sparkles,
  Activity,
  BarChart3,
  Flame,
  DogIcon as Wolf,
} from "lucide-react"

export default function PackLeaderAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [packLeaderMode, setPackLeaderMode] = useState("alpha")
  const [isTyping, setIsTyping] = useState(false)
  const [aiPersonality, setAiPersonality] = useState({
    confidence: 95,
    aggression: 80,
    wisdom: 90,
    loyalty: 100,
  })

  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  useEffect(() => {
    const initialMessage = {
      id: 1,
      type: "ai",
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
      mood: "confident",
      priority: "high",
    }
    setMessages([initialMessage])

    // Initialize speech recognition
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        if (event.results[current].isFinal) {
          setInputMessage(transcript)
          handleSendMessage(transcript)
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis
    }

    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse = await generatePackLeaderResponse(messageText.toLowerCase())
    const aiMessage = {
      id: Date.now() + 1,
      type: "ai",
      content: aiResponse.content,
      timestamp: new Date(),
      mood: aiResponse.mood,
      priority: aiResponse.priority,
      confidence: aiResponse.confidence,
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)

    if (voiceEnabled) {
      speakResponse(aiResponse.content)
    }
  }

  const generatePackLeaderResponse = async (input) => {
    // Enhanced AI response system with real market data simulation
    const responses = {
      market: {
        content: `🎯 **MARKET INTEL REPORT** 🎯

The markets are showing ${Math.random() > 0.5 ? "bullish" : "bearish"} signals, Alpha. Here's my tactical assessment:

**Current Market Sentiment:** ${(60 + Math.random() * 40).toFixed(0)}% Bullish
**Volatility Index:** ${(15 + Math.random() * 25).toFixed(1)} (${Math.random() > 0.5 ? "Opportunity" : "Caution"} Zone)
**Sector Rotation:** Technology leading, Energy following

**PACK LEADER STRATEGY:**
• Position size: 2-3% per trade maximum
• Stop loss: 8% below entry
• Target: 15-20% gains
• Time horizon: 2-4 weeks

*The alpha wolf strikes when the prey is weakest. Patience, then precision.*`,
        mood: "analytical",
        priority: "high",
        confidence: 88,
      },
      strategy: {
        content: `⚡ **ALPHA TRADING STRATEGY** ⚡

Listen up, trader. The Pack Leader's battle-tested approach:

**THE WOLF PACK METHOD:**
1. **Hunt in Packs** - Diversify across 5-8 positions
2. **Strike Fast** - Enter on breakouts with volume
3. **Protect the Pack** - Never risk more than 2% per trade
4. **Lead from Front** - Cut losses quickly, let winners run

**Current Opportunities:**
• ${["AAPL", "MSFT", "GOOGL", "TSLA", "NVDA"][Math.floor(Math.random() * 5)]} - Bullish breakout pattern
• ${["SPY", "QQQ", "IWM"][Math.floor(Math.random() * 3)]} - Momentum play
• Crypto sector showing strength

**Risk Level:** ${["Conservative", "Moderate", "Aggressive"][Math.floor(Math.random() * 3)]}

*A true leader doesn't follow trends - they create them.*`,
        mood: "strategic",
        priority: "high",
        confidence: 92,
      },
    }

    if (responses[input.includes("market") ? "market" : input.includes("strategy") ? "strategy" : "general"]) {
      return responses[input.includes("market") ? "market" : input.includes("strategy") ? "strategy" : "general"]
    }

    return {
      content: `🐺 **PACK LEADER RESPONSE** 🐺

I hear you, Alpha. Your question shows the mind of a true strategist.

The markets reward those who think like predators - patient, calculated, and decisive.

**My Recommendation:**
Focus on mastering one strategy before expanding your arsenal.

What specific aspect would you like the Pack Leader to analyze deeper?

*The alpha leads by example, not by words alone.*`,
      mood: "wise",
      priority: "medium",
      confidence: 90,
    }
  }

  const speakResponse = (text) => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true)
      const cleanText = text.replace(/[*#🐺⚡🎯🧠🛡️📊]/gu, "").replace(/\n/g, " ")

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.rate = packLeaderMode === "warrior" ? 1.1 : 0.9
      utterance.pitch = packLeaderMode === "alpha" ? 0.8 : 1.0
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      synthRef.current.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const getMoodIcon = (mood) => {
    const icons = {
      confident: Crown,
      analytical: BarChart3,
      strategic: Target,
      motivational: Rocket,
      protective: Shield,
      wise: Brain,
    }
    return icons[mood] || Sparkles
  }

  const getMoodColor = (mood) => {
    const colors = {
      confident: "text-yellow-400",
      analytical: "text-blue-400",
      strategic: "text-purple-400",
      motivational: "text-green-400",
      protective: "text-red-400",
      wise: "text-cyan-400",
    }
    return colors[mood] || "text-gray-400"
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-full w-20 h-20 shadow-2xl border-2 border-orange-400/30 animate-pulse"
        >
          <div className="flex flex-col items-center">
            <Wolf className="h-8 w-8 mb-1" />
            <span className="text-xs font-bold">PACK LEADER</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-[500px] h-[700px]">
      <Card className="bg-gradient-to-b from-gray-900/95 to-black/95 border-2 border-orange-500/50 backdrop-blur-xl shadow-2xl h-full flex flex-col">
        <CardHeader className="pb-3 border-b border-orange-500/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center text-xl">
              <div className="relative">
                <Wolf className="h-8 w-8 mr-3 text-orange-400 animate-pulse" />
                <Crown className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">
                  PACK LEADER
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-xs">
                    <Activity className="h-3 w-3 mr-1" />
                    ALPHA AI
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-xs animate-pulse">
                    <Eye className="h-3 w-3 mr-1" />
                    ONLINE
                  </Badge>
                </div>
              </div>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-3">
            <div className="text-center p-2 bg-orange-500/10 rounded border border-orange-500/30">
              <p className="text-xs text-orange-400">Confidence</p>
              <p className="text-sm font-bold text-orange-300">{aiPersonality.confidence}%</p>
            </div>
            <div className="text-center p-2 bg-red-500/10 rounded border border-red-500/30">
              <p className="text-xs text-red-400">Aggression</p>
              <p className="text-sm font-bold text-red-300">{aiPersonality.aggression}%</p>
            </div>
            <div className="text-center p-2 bg-blue-500/10 rounded border border-blue-500/30">
              <p className="text-xs text-blue-400">Wisdom</p>
              <p className="text-sm font-bold text-blue-300">{aiPersonality.wisdom}%</p>
            </div>
            <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/30">
              <p className="text-xs text-green-400">Loyalty</p>
              <p className="text-sm font-bold text-green-300">{aiPersonality.loyalty}%</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-gradient-to-r from-orange-800/60 to-red-800/60 text-gray-100 border border-orange-500/30"
                  }`}
                >
                  {message.type === "ai" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Wolf className="h-4 w-4 text-orange-400" />
                      <span className="text-orange-400 font-semibold text-sm">Pack Leader</span>
                      {message.mood && (
                        <Badge className={`text-xs ${getMoodColor(message.mood)} bg-transparent border-current`}>
                          {message.mood}
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-orange-800/60 to-red-800/60 p-4 rounded-lg border border-orange-500/30">
                  <div className="flex items-center space-x-2">
                    <Wolf className="h-4 w-4 text-orange-400 animate-pulse" />
                    <span className="text-orange-400 font-semibold text-sm">Pack Leader is thinking...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Market analysis")}
              className="text-xs border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Market Intel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Trading strategy")}
              className="text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
            >
              <Target className="h-3 w-3 mr-1" />
              Strategy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Risk management")}
              className="text-xs border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <Shield className="h-3 w-3 mr-1" />
              Risk Control
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage("Psychology training")}
              className="text-xs border-green-500/30 text-green-400 hover:bg-green-500/20"
            >
              <Brain className="h-3 w-3 mr-1" />
              Mindset
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                placeholder="Ask the Pack Leader anything about trading..."
                className="bg-gray-800/40 border-orange-500/30 text-white placeholder-gray-400 resize-none"
                rows={2}
              />
              <div className="flex flex-col space-y-1">
                <Button
                  onClick={() => handleSendMessage()}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant="outline"
                  className={`border-orange-500/30 ${isListening ? "text-red-400" : "text-orange-400"}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Voice:</span>
                  <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Mode:</span>
                  <select
                    value={packLeaderMode}
                    onChange={(e) => setPackLeaderMode(e.target.value)}
                    className="bg-gray-800/40 border border-orange-500/30 rounded px-2 py-1 text-orange-400 text-xs"
                  >
                    <option value="alpha">Alpha Leader</option>
                    <option value="mentor">Wise Mentor</option>
                    <option value="strategist">Master Strategist</option>
                    <option value="warrior">Trading Warrior</option>
                  </select>
                </div>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                <Flame className="h-3 w-3 mr-1" />
                Pack Leader AI
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
