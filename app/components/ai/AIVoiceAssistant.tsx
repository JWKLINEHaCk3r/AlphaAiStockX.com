'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardCoCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Brain, MessageCircle, Zap, Settings } from 'lucide-react';

interface ConversationItem {
  id: number;
  role: string;
  message: string;
  timestamp: Date;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [aiPersonality, setAiPersonality] = useState('professional');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Add initial greeting
    addToConversation(
      'assistant',
      "Hello! I'm your AI trading assistant. Ask me about market analysis, stock recommendations, or trading strategies."
    );
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = async (command: string) => {
    addToConversation('user', command);

    // Simulate AI processing
    const aiResponse = await generateAIResponse(command.toLowerCase());
    addToConversation('assistant', aiResponse);

    if (voiceEnabled) {
      speakResponse(aiResponse);
    }
  };

  const generateAIResponse = async (command: string) => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Enhanced AI response generation
    if (command.includes('price') || command.includes('stock')) {
      const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
      const stock = stocks[Math.floor(Math.random() * stocks.length)];
      const price = (150 + Math.random() * 200).toFixed(2);
      const change = (Math.random() - 0.5) * 10;
      return `${stock} is currently trading at $${price}, ${change >= 0 ? 'up' : 'down'} ${Math.abs(change).toFixed(2)}% today.`;
    }

    if (command.includes('market') || command.includes('outlook')) {
      const sentiment = Math.random() > 0.5 ? 'bullish' : 'bearish';
      const confidence = (70 + Math.random() * 30).toFixed(0);
      return `Current market sentiment is ${sentiment} with ${confidence}% confidence.`;
    }

    // Default responses
    const responses = [
      "That's an excellent question. My AI models are analyzing multiple data points.",
      'Based on my analysis, I can provide specific recommendations tailored to your goals.',
      'My algorithms are processing real-time market data to identify opportunities.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakResponse = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = aiPersonality === 'energetic' ? 1.2 : 0.9;
      utterance.pitch = aiPersonality === 'friendly' ? 1.1 : 1.0;
      utterance.volume = 0.8;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    }
  };

  const addToConversation = (role: string, message: string) => {
    const newMessage = {
      id: Date.now(),
      role,
      message,
      timestamp: new Date(),
    };
    setConversation(prev => [newMessage, ...prev.slice(0, 19)]);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            AI Voice Trading Assistant
            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500">
              <Zap className="h-3 w-3 mr-1" />
              NEURAL POWERED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                className={`w-full ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Listening
                  </>
                )}
              </Button>
              {isListening && (
                <div className="text-center">
                  <Badge className="bg-red-500 animate-pulse">LISTENING</Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Button
                onClick={toggleVoice}
                variant="outline"
                className={`w-full border-purple-500/30 ${
                  voiceEnabled ? 'text-purple-400' : 'text-gray-400'
                }`}
              >
                {voiceEnabled ? (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Voice On
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4 mr-2" />
                    Voice Off
                  </>
                )}
              </Button>
              {isSpeaking && (
                <div className="text-center">
                  <Badge className="bg-blue-500 animate-pulse">SPEAKING</Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <select
                value={aiPersonality}
                onChange={e => setAiPersonality(e.target.value)}
                className="w-full bg-gray-800 border border-purple-500/30 rounded px-3 py-2 text-white"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="energetic">Energetic</option>
              </select>
              <div className="text-center">
                <Badge className="bg-purple-500">AI PERSONALITY</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-center p-2 bg-gray-800/50 rounded">
                <div className="text-green-400 font-bold">ONLINE</div>
                <div className="text-xs text-gray-400">AI Ready</div>
              </div>
              <div className="text-center">
                <Badge className="bg-green-500">CONNECTED</Badge>
              </div>
            </div>
          </div>

          {transcript && (
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-purple-500/30">
              <div className="text-purple-400 text-sm font-medium mb-1">Current Input:</div>
              <div className="text-white">{transcript}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
            Conversation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {conversation.map(message => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500/20 border border-blue-500/30 ml-8'
                    : 'bg-purple-500/20 border border-purple-500/30 mr-8'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge className={message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'}>
                    {message.role === 'user' ? 'YOU' : 'AI ASSISTANT'}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-white text-sm">{message.message}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2 text-purple-400" />
            Quick Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'Check AAPL stock price',
              'Market outlook today',
              'Portfolio allocation advice',
              'Risk analysis',
              'Trading opportunities',
              'Sector recommendations',
            ].map((command, index) => (
              <Button
                key={index}
                onClick={() => processVoiceCommand(command)}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
              >
                {command}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
