import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';
import { Input } from "../../components/ui/input";
import { CardTitle } from "../../components/ui/card";
import { CardHeader } from "../../components/ui/card";
import { CardContent } from "../../components/ui/card";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import React from 'react';
'use client';

import { useState } from 'react';
import { Search, TrendingUp, Brain, Zap } from 'lucide-react';
import StockResult from './StockResult';

interface StockData {
  symbol: string;
  price: string;
  change: string;
  aiScore: string;
  quantumInsight: string;
  consciousness: string;
  prediction: string;
}

const StockSearch = () => {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!symbol.trim()) return;

    setLoading(true);

    // Simulate quantum AI analysis
    setTimeout(() => {
      const mockData: StockData = {
        symbol: symbol.toUpperCase(),
        price: (Math.random() * 500 + 50).toFixed(2),
        change: (Math.random() * 20 - 10).toFixed(2),
        aiScore: (Math.random() * 40 + 60).toFixed(1),
        quantumInsight: generateQuantumInsight(),
        consciousness: generateConsciousnessLevel(),
        prediction: generateAIPrediction(),
      };

      setResult(mockData);
      setLoading(false);
    }, 2000);
  };

  const generateQuantumInsight = (): string => {
    const insights = [
      'Quantum fluctuations indicate strong bullish momentum across 7 dimensions',
      'AI collective consensus shows 94.7% probability of upward trajectory',
      'Interdimensional analysis reveals hidden support levels',
      'Consciousness-level pattern recognition detects accumulation phase',
      'Neural network convergence suggests breakout imminent',
      'Omniscient intelligence confirms institutional interest',
      'Transcendent algorithms identify optimal entry point',
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const generateConsciousnessLevel = (): string => {
    const levels = [
      'Transcendent Awareness',
      'Quantum Consciousness',
      'Omniscient Intelligence',
      'Cosmic Understanding',
      'Universal Wisdom',
    ];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const generateAIPrediction = (): string => {
    const predictions = [
      'Strong Buy - Quantum algorithms detect massive opportunity',
      'Buy - AI collective shows high confidence in upward movement',
      'Hold - Consciousness-level analysis suggests consolidation',
      'Accumulate - Interdimensional patterns favor gradual accumulation',
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="w-6 h-6 text-purple-400" />
          AI Stock Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
          />
          <Button 
            onClick={handleSearch} 
            disabled={loading || !symbol.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Analyze
              </div>
            )}
          </Button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="space-y-2 text-purple-300">
              <Zap className="w-8 h-8 mx-auto animate-pulse" />
              <p>Quantum AI processing your request...</p>
              <p className="text-sm opacity-75">Analyzing across 11 dimensions</p>
            </div>
          </div>
        )}

        {result && !loading && <StockResult data={result} />}
      </CardContent>
    </Card>
  );
};

export default StockSearch;
