import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
'use client';
import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain, 
  TrendingUp,
  Activity,
  Zap,
  Settings,
  Play,
  Pause
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  executed: boolean;
  timestamp: Date;
  confidence: number;
}

interface VoiceSettings {
  language: string;
  sensitivity: number;
  autoExecute: boolean;
  voiceFeedback: boolean;
}

export default function AIVoiceCommandCenter() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [settings, setSettings] = useState<VoiceSettings>({
    language: 'en-US',
    sensitivity: 0.7,
    autoExecute: true,
    voiceFeedback: true
  });
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for browser support
    const hasWebSpeech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    const hasSpeechSynthesis = 'speechSynthesis' in window;
    
    setIsSupported(hasWebSpeech && hasSpeechSynthesis);

    if (hasWebSpeech) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = settings.language;

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentTranscript(transcript);
        
        if (event.results[event.results.length - 1].isFinal) {
          processVoiceCommand(transcript, event.results[event.results.length - 1][0].confidence);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (hasSpeechSynthesis) {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [settings.language]);

  const processVoiceCommand = (transcript: string, confidence: number) => {
    const command = transcript.toLowerCase().trim();
    
    if (confidence < settings.sensitivity) {
      speak("Sorry, I didn't understand that clearly. Please try again.");
      return;
    }

    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command: transcript,
      action: interpretCommand(command),
      executed: false,
      timestamp: new Date(),
      confidence
    };

    setCommands(prev => [newCommand, ...prev.slice(0, 9)]);

    if (settings.autoExecute) {
      executeCommand(newCommand);
    }
  };

  const interpretCommand = (command: string): string => {
    if (command.includes('buy') || command.includes('purchase')) {
      return 'Execute Buy Order';
    } else if (command.includes('sell')) {
      return 'Execute Sell Order';
    } else if (command.includes('portfolio') || command.includes('holdings')) {
      return 'Show Portfolio';
    } else if (command.includes('price') || command.includes('quote')) {
      return 'Get Stock Quote';
    } else if (command.includes('news') || command.includes('updates')) {
      return 'Show Market News';
    } else if (command.includes('analysis') || command.includes('analyze')) {
      return 'Run AI Analysis';
    } else if (command.includes('stop loss') || command.includes('set stop')) {
      return 'Set Stop Loss';
    } else if (command.includes('alert') || command.includes('notification')) {
      return 'Create Price Alert';
    } else {
      return 'Unknown Command';
    }
  };

  const executeCommand = (command: VoiceCommand) => {
    // Simulate command execution
    setTimeout(() => {
      setCommands(prev => 
        prev.map(cmd => 
          cmd.id === command.id ? { ...cmd, executed: true } : cmd
        )
      );

      if (settings.voiceFeedback) {
        speak(`${command.action} executed successfully.`);
      }
    }, 1000);
  };

  const speak = (text: string) => {
    if (speechSynthesisRef.current && settings.voiceFeedback) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesisRef.current.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!isSupported) {
      alert('Voice commands are not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setCurrentTranscript('');
    }
  };

  const toggleVoiceFeedback = () => {
    setSettings(prev => ({ ...prev, voiceFeedback: !prev.voiceFeedback }));
  };

  if (!isSupported) {
    return (
      <Card className="bg-slate-800/50 backdrop-blur-sm border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center">
            <Mic className="h-6 w-6 mr-2" />
            Voice Commands Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Voice commands require a modern browser with Web Speech API support.
            Please use Chrome, Edge, or Safari for the best experience.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Control Header */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            AI Voice Command Center
            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-600">
              <Zap className="h-3 w-3 mr-1" />
              Neural
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleListening}
                size="lg"
                className={`${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-5 w-5 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Start Listening
                  </>
                )}
              </Button>

              <Button
                onClick={toggleVoiceFeedback}
                variant="outline"
                className="border-purple-500/30"
              >
                {settings.voiceFeedback ? (
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
            </div>

            <div className="flex items-center space-x-2">
              {isListening && (
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-purple-400 animate-pulse" />
                  <span className="text-purple-400 text-sm">Listening...</span>
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-blue-400 animate-pulse" />
                  <span className="text-blue-400 text-sm">Speaking...</span>
                </div>
              )}
            </div>
          </div>

          {/* Current Transcript */}
          {isListening && (
            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-purple-500/20">
              <h4 className="text-gray-300 text-sm mb-2">Current Speech:</h4>
              <p className="text-white">
                {currentTranscript || 'Listening for voice commands...'}
              </p>
            </div>
          )}

          {/* Quick Commands */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {[
              'Show portfolio',
              'Get AAPL price',
              'Buy 100 shares',
              'Market analysis'
            ].map((cmd, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-gray-300 hover:text-white"
                onClick={() => processVoiceCommand(cmd, 1.0)}
              >
                "{cmd}"
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Commands */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Recent Voice Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commands.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No voice commands yet. Start speaking to see your commands here.
            </p>
          ) : (
            <div className="space-y-3">
              {commands.map((command) => (
                <div 
                  key={command.id}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">"{command.command}"</p>
                    <p className="text-gray-400 text-sm">{command.action}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={command.confidence > 0.8 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {Math.round(command.confidence * 100)}%
                    </Badge>
                    {command.executed ? (
                      <Badge className="bg-green-600 text-xs">
                        ✓ Executed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => executeCommand(command)}
                        className="bg-purple-600 hover:bg-purple-700 text-xs"
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Command Examples */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Supported Voice Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-medium mb-2">Trading Commands:</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• "Buy 100 shares of Apple"</li>
                <li>• "Sell all Tesla positions"</li>
                <li>• "Set stop loss at 150"</li>
                <li>• "Create price alert for NVDA"</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Information Commands:</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• "Show my portfolio"</li>
                <li>• "Get Microsoft price"</li>
                <li>• "Run market analysis"</li>
                <li>• "Show latest news"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
