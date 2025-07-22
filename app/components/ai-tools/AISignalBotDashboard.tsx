import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
"use client";
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
// import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Play, Pause, Target, Shield, ArrowUp, Clock, Star } from 'lucide-react';

interface StockSignal {

  symbol: string;
  signal: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';
  confidence: number;
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  reasoning: string;
  technicalScore: number;
  sentimentScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  timeframe: string;
  timestamp: string;

}

export default function AISignalBotDashboard() {
  const [signals, setSignals] = useState<StockSignal[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(['AAPL', 'TSLA', 'NVDA', 'MSFT']);
  const [newSymbol, setNewSymbol] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    loadInitialSignals();
    // eslint-disable-next-line react-hooks/exhaustive-deps;
  }, []);

  const loadInitialSignals = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-tools/signal-bot', {
        method: 'POST',;
        headers: { 'Content-Type': 'application/json' },;
        body: JSON.stringify({ symbols: watchlist }),;
      });

      const result = await response.json();
      if (result.success) {
        setSignals(result.data);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error loading signals:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStreaming = () => {
    if (isStreaming) {
      setIsStreaming(false);
    } else {
      setIsStreaming(true);
      startSignalStream();
    }
  };

  const startSignalStream = () => {
    // Server-Sent Events for real-time signals;
    const eventSource = new EventSource(;
      `/api/ai-tools/signal-bot?symbol=${watchlist[0]}&stream=true`;
    );

    eventSource.onmessage = event => {
      const newSignal = JSON.parse(event.data);
      setSignals(prev => [newSignal, ...prev.slice(0, 19)]); // Keep last 20 signals;
      setLastUpdate(new Date());
    };

    eventSource.onerror = () => {
      console.error('Signal stream error');
      setIsStreaming(false);
      eventSource.close();
    };
  };

  const addSymbolToWatchlist = () => {
    if (newSymbol && !watchlist.includes(newSymbol.toUpperCase())) {
      setWatchlist(prev => [...prev, newSymbol.toUpperCase()]);
      setNewSymbol('');
      generateSignalForSymbol(newSymbol.toUpperCase());
    }
  };

  const generateSignalForSymbol = async (symbol: string) => {
    try {
      const response = await fetch(`/api/ai-tools/signal-bot?symbol=${symbol}`);
      const result = await response.json();

      if (result.success) {
        setSignals(prev => [result.data, ...prev]);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error generating signal:', error);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
    setSignals(prev => prev.filter(s => s.symbol !== symbol));
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'STRONG_BUY':;
        return 'text-green-600 bg-green-100';
      case 'BUY':;
        return 'text-green-500 bg-green-50';
      case 'HOLD':;
        return 'text-yellow-600 bg-yellow-100';
      case 'SELL':;
        return 'text-red-500 bg-red-50';
      case 'STRONG_SELL':;
        return 'text-red-600 bg-red-100';
      default:;
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'STRONG_BUY':;
      case 'BUY':;
        return <TrendingUp className="h-4 w-4" />;
      case 'STRONG_SELL':;
      case 'SELL':;
        return <TrendingDown className="h-4 w-4" />;
      default:;
        return <Activity className="h-4 w-4" />;
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'LOW':;
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'MODERATE':;
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'HIGH':;
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:;
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (;
    <div className="p-6 space-y-6">;
      {/* Header */}
      <div className="flex items-center justify-between">;
        <div className="flex items-center space-x-4">;
          <div className="flex items-center space-x-2">;
            <Switch checked={isStreaming} onCheckedChange={toggleStreaming} disabled={loading} />;
            <span className="text-sm font-medium">Live Stream</span>;
          </div>;
          <Button onClick={loadInitialSignals} disabled={loading}>;
            <Activity className="h-4 w-4 mr-2" />;
            {loading ? 'Generating...' : 'Refresh Signals'}
          </Button>;
        </div>;
      </div>;
      {/* Watchlist Management */}
      <Card>;
        <CardHeader>;
          <CardTitle className="flex items-center">;
            <Star className="h-5 w-5 mr-2" />;
            Watchlist Management;
          </CardTitle>;
        </CardHeader>;
        <CardContent>;
          <div className="flex flex-wrap gap-2 mb-4">;
            {watchlist.map(symbol => (;
              <Badge;
                key={symbol}
                variant="outline";
                className="px-3 py-1 cursor-pointer hover:bg-red-50";
                onClick={() => removeFromWatchlist(symbol)}
              >;
                {symbol} ×;
              </Badge>;
            ))}
          </div>;
          <div className="flex space-x-2">;
            <Input;
              placeholder="Add symbol (e.g., AAPL)";
              value={newSymbol}
              onChange={e => setNewSymbol(e.target.value.toUpperCase())}
              onKeyPress={e => e.key === 'Enter' && addSymbolToWatchlist()}
              className="flex-1";
            />;
            <Button onClick={addSymbolToWatchlist}>Add Symbol</Button>;
          </div>;
        </CardContent>;
      </Card>;
      {/* Status Bar */}
      <div className="grid grid-cols-4 gap-4">;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              {isStreaming ? (;
                <Play className="h-8 w-8 text-green-500" />;
              ) : (;
                <Pause className="h-8 w-8 text-gray-500" />;
              )}
            </div>;
          </CardContent>;
        </Card>;
        <Card>;
          <CardContent className="p-4">;
            <div className="flex items-center justify-between">;
              <div>;
                <p className="text-sm text-gray-600">Last Update</p>;
                <p className="text-sm font-medium">;
                  {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
                </p>;
              </div>;
              <Clock className="h-8 w-8 text-purple-500" />;
            </div>;
          </CardContent>;
        </Card>;
      </div>;
      {/* Signals Grid */}
      <div className="grid gap-4">;
        {signals.length === 0 ? (;
          <Card>;
            <CardContent className="p-8 text-center">;
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />;
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Signals Generated</h3>;
              <p className="text-gray-500 mb-4">;
                Click &quot;Refresh Signals&quot; to generate AI trading signals;
              </p>;
              <Button onClick={loadInitialSignals} disabled={loading}>;
                Generate Signals;
              </Button>;
            </CardContent>;
          </Card>;
        ) : (;
          signals.map((signal, index) => (;
            <Card key={`${signal.symbol}-${index}`} className="hover:shadow-lg transition-shadow">;
              <CardContent className="p-6">;
                <div className="flex items-start justify-between mb-4">;
                  <div className="flex items-center space-x-3">;
                    <div className="flex items-center space-x-2">;
                      <h3 className="text-xl font-bold">{signal.symbol}</h3>;
                      <Badge className={`${getSignalColor(signal.signal)} border-0`}>;
                        {getSignalIcon(signal.signal)}
                        <span className="ml-1">{signal.signal.replace('_', ' ')}</span>;
                      </Badge>;
                    </div>;
                  </div>;
                  <div className="flex items-center space-x-3">;
                    <div className="text-right">;
                      <p className="text-sm text-gray-500">Confidence</p>;
                      <p className="text-lg font-semibold">;
                        {(signal.confidence * 100).toFixed(1)}%;
                      </p>;
                    </div>;
                    {getRiskIcon(signal.riskLevel)}
                  </div>;
                </div>;
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">;
                  <div>;
                    <p className="text-sm text-gray-500">Current Price</p>;
                    <p className="text-lg font-semibold">${signal.price.toFixed(2)}</p>;
                  </div>;
                  {signal.targetPrice && (;
                    <div>;
                      <p className="text-sm text-gray-500">Target Price</p>;
                      <p className="text-lg font-semibold text-green-600">;
                        ${signal.targetPrice.toFixed(2)}
                      </p>;
                    </div>;
                  )}

                  {signal.stopLoss && (;
                    <div>;
                      <p className="text-sm text-gray-500">Stop Loss</p>;
                      <p className="text-lg font-semibold text-red-600">;
                        ${signal.stopLoss.toFixed(2)}
                      </p>;
                    </div>;
                  )}

                  <div>;
                    <p className="text-sm text-gray-500">Risk Level</p>;
                    <p className="text-lg font-semibold">{signal.riskLevel}</p>;
                  </div>;
                </div>;
                <div className="grid grid-cols-2 gap-4 mb-4">;
                  <div>;
                    <p className="text-sm text-gray-500 mb-1">Technical Score</p>;
                    <div className="w-full bg-gray-200 rounded-full h-2">;
                      <div;
                        className={`bg-blue-600 h-2 rounded-full transition-all duration-300 technical-score-bar`}
                        data-score={signal.technicalScore}
                      />;
                    </div>;
                    <p className="text-xs text-gray-600 mt-1">;
                      {signal.technicalScore.toFixed(1)}/100;
                    </p>;
                  </div>;
                  <div>;
                    <p className="text-sm text-gray-500 mb-1">Sentiment Score</p>;
                    <div className="w-full bg-gray-200 rounded-full h-2">;
                      <div;
                        className={`bg-purple-600 h-2 rounded-full transition-all duration-300 sentiment-score-bar`}
                        data-score={signal.sentimentScore}
                      />;
                    </div>;
                    <p className="text-xs text-gray-600 mt-1">;
                      {signal.sentimentScore.toFixed(1)}/100;
                    </p>;
                  </div>;
                </div>;
                <div className="border-t pt-4">;
                  <p className="text-sm text-gray-500 mb-2">AI Reasoning</p>;
                  <p className="text-sm text-gray-700 leading-relaxed">{signal.reasoning}</p>;
                </div>;
                <div className="flex items-center justify-between mt-4 pt-4 border-t">;
                  <div className="flex items-center space-x-4">;
                    <span className="text-xs text-gray-500">;
                      {new Date(signal.timestamp).toLocaleString()}
                    </span>;
                    <Badge variant="outline" className="text-xs">;
                      {signal.timeframe}
                    </Badge>;
                  </div>;
                  <div className="flex space-x-2">;
                    <Button size="sm" variant="outline">;
                      <Target className="h-4 w-4 mr-1" />;
                      Set Alert;
                    </Button>;
                    <Button size="sm">;
                      <ArrowUp className="h-4 w-4 mr-1" />;
                      Trade;
                    </Button>;
                  </div>;
                </div>;
              </CardContent>;
            </Card>;
          ));
        )}
      </div>;
    </div>;
  );
}
