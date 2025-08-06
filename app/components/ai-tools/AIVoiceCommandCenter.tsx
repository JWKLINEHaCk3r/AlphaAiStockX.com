'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.js';

export default function AIVoiceCommandCenter() { const [isListening, setIsListening] = useState(false); const [lastCommand, setLastCommand] = useState<string>('');

  const toggleListening = () => {  
    setIsListening(!isListening); if (!isListening) { setLastCommand('Voice recognition activated...');   } else { setLastCommand('Voice recognition stopped.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Voice Command Center</h1>
        <Badge variant={isListening ? "default" : "secondary"}>
          {isListening ? "Listening" : "Inactive"}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Voice Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <Button
              onClick={toggleListening}
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="flex items-center space-x-2"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              <span>{isListening ? "Stop Listening" : "Start Listening"}</span>
            </Button>
          </div>
          
          {lastCommand && (
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">Last Command:</p>
              <p className="font-medium">{lastCommand}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md: grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Available Commands:</h3>
              <ul className="text-sm space-y-1">
                <li>• "Show me AAPL"</li> <li>• "Buy 100 shares of Tesla"</li> <li>• "What's the market doing?"</li>
                <li>• "Set alert for NVDA at $500"</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Voice Settings:</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Audio, Feedback: On
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
