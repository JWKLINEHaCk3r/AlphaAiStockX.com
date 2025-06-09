"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Bot, User, Sparkles } from "lucide-react"

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI trading assistant. Ask me anything about market analysis, stock recommendations, or trading strategies.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on current market conditions, I recommend diversifying your portfolio with a mix of growth and value stocks.",
        "The technical indicators suggest a bullish trend for tech stocks in the short term.",
        "Consider adding some defensive stocks to hedge against market volatility.",
        "The AI analysis shows strong momentum in the semiconductor sector.",
        "Current market sentiment is positive, but watch for potential resistance levels.",
      ]

      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    }, 1000)

    setInputMessage("")
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full w-16 h-16 shadow-lg border border-cyan-400/30"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="bg-gray-900/95 border-cyan-500/30 backdrop-blur-xl shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Bot className="h-5 w-5 mr-2 text-cyan-400" />
              AI Assistant
              <Badge className="ml-2 bg-gradient-to-r from-cyan-500 to-blue-500">
                <Sparkles className="h-3 w-3 mr-1" />
                Live
              </Badge>
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
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="h-64 overflow-y-auto space-y-3 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-gray-800/60 text-gray-100 border border-cyan-500/20"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "ai" && <Bot className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />}
                    {message.type === "user" && <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about stocks, analysis, or strategies..."
              className="bg-gray-800/40 border-cyan-500/30 text-white placeholder-gray-400"
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Analyze AAPL")}
              className="text-xs border-cyan-500/30 text-gray-300 hover:text-white"
            >
              Analyze AAPL
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Market outlook")}
              className="text-xs border-cyan-500/30 text-gray-300 hover:text-white"
            >
              Market Outlook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputMessage("Portfolio tips")}
              className="text-xs border-cyan-500/30 text-gray-300 hover:text-white"
            >
              Portfolio Tips
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
