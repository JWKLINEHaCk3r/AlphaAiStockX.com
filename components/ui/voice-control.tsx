import { Card, CardContent } from './card';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, VolumeX } from 'lucide-react';

interface VoiceControlProps {
  className?: string;
}

export function VoiceControl({ className }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const startListening = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = event => {
      const last = event.results.length - 1;
      const result = event.results[last];
      if (result && result[0]) {
        const command = result[0].transcript.toLowerCase();
        setTranscript(command);
        handleVoiceCommand(command);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleVoiceCommand = (command: string) => {
    setIsSpeaking(true);

    let response = '';

    if (command.includes('portfolio') || command.includes('performance')) {
      response = 'Your portfolio is up 12.8% today with strong performance in tech stocks.';
    } else if (command.includes('buy') || command.includes('purchase')) {
      response = 'I can help you execute trades. What would you like to buy?';
    } else if (command.includes('market') || command.includes('status')) {
      response = 'Markets are currently bullish with our AI confidence at 94%.';
    } else if (command.includes('hello') || command.includes('hi')) {
      response = "Hello! I'm AlphaAI, your advanced trading assistant. How can I help you today?";
    } else {
      response = 'I heard you say: ' + command + '. How can I assist with your trading?';
    }

    // Text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.7;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`fixed bottom-8 left-8 z-50 ${className}`}>
      <Card className="glass-card neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={startListening}
              disabled={isListening || isSpeaking}
              className={`btn-quantum group transition-all duration-300 ${
                isListening ? 'animate-pulse-glow scale-110' : ''
              }`}
            >
              {isListening ? (
                <MicOff className="w-5 h-5 text-red-400 animate-pulse" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>

            {isSpeaking && (
              <Button size="lg" onClick={stopSpeaking} className="btn-quantum">
                <VolumeX className="w-5 h-5 text-orange-400" />
              </Button>
            )}

            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Voice AI'}
              </span>
              {transcript && (
                <span className="text-xs text-neon-cyan max-w-48 truncate">&quot;{transcript}&quot;</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AIAssistantIndicator() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-40">
      <div
        className={`w-3 h-3 rounded-full transition-all duration-1000 ${
          isActive ? 'bg-neon-green animate-pulse-glow' : 'bg-muted/50'
        }`}
      />
      <div className="text-xs text-muted-foreground mt-2 transform -rotate-90 origin-center whitespace-nowrap">
        AI Active
      </div>
    </div>
  );
}
