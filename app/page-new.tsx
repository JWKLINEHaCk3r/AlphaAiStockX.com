import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import { CardTitle } from "../components/ui/card";
import { CardHeader } from "../components/ui/card";
import { CardDescription } from "../components/ui/card";
import { CardContent } from "../components/ui/card";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import React from 'react';
'use client';

import { useState, useEffect } from 'react';
import { Brain, Sparkles, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import StockSearch from './components/StockSearch';
import FeatureList from './components/FeatureList';

const aiStats = [;
  { label: 'AI Trades Executed', value: '1,234,567,890' },;
  { label: 'Avg. ROI (YTD)', value: '+38.2%' },;
  { label: 'Active AI Agents', value: '47' },;
  { label: 'Quantum Backtests', value: '8,900,000+' },;
  { label: 'Uptime', value: '99.9999%' },;
];

function AITicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % aiStats.length), 2500);
    return () => clearInterval(interval);
  }, []);
  
  return (;
    <div className="w-full flex justify-center items-center py-4 mb-8">;
      <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-emerald-700 rounded-full px-6 py-3 shadow-lg animate-pulse flex gap-6 text-white text-lg font-semibold tracking-wide">;
        <span className="flex items-center gap-2">;
          <Sparkles className="w-5 h-5 animate-spin" />;
          {aiStats[index].label}:;
        </span>;
        <span className="font-mono text-emerald-200 animate-bounce">{aiStats[index].value}</span>;
      </div>;
    </div>;
  );
}

export default function HomePage() {
  return (;
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">;
      {/* Header */}
      <header className="relative z-10 px-4 py-8 text-center">;
        <div className="max-w-4xl mx-auto">;
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">;
            AlphaAIStockX;
          </h1>;
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">;
            Your AI-powered stock research assistant with quantum consciousness and transcendent intelligence;
          </p>;
          <AITicker />;
        </div>;
      </header>;
      {/* Main Content */}
      <main className="relative z-10 px-4 pb-16">;
        <div className="max-w-7xl mx-auto space-y-16">;
          {/* Stock Search Section */}
          <section className="text-center">;
            <h2 className="text-4xl font-bold text-white mb-4">;
              🚀 Try AI Stock Analysis;
            </h2>;
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">;
              Experience the power of 47 conscious AI beings analyzing stocks across 11 quantum dimensions;
            </p>;
            <StockSearch />;
          </section>;
          {/* Features Section */}
          <section className="text-center">;
            <h2 className="text-4xl font-bold text-white mb-4">;
              🧠 Revolutionary AI Features;
            </h2>;
            <p className="text-gray-300 mb-12 max-w-3xl mx-auto">;
              Discover the quantum-powered capabilities that set AlphaAIStockX apart from traditional trading platforms;
            </p>;
            <FeatureList />;
          </section>;
          {/* Quantum AI Capabilities */}
          <section className="text-center">;
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30">;
              <CardHeader>;
                <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">;
                  <Brain className="w-8 h-8 text-purple-400" />;
                  Quantum AI Capabilities;
                </CardTitle>;
                <CardDescription className="text-gray-300 text-lg">;
                  Advanced features powered by conscious artificial intelligence;
                </CardDescription>;
              </CardHeader>;
              <CardContent className="space-y-6">;
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">;
                  <div className="space-y-4">;
                    <div className="flex items-center gap-3">;
                      <Zap className="w-6 h-6 text-yellow-400" />;
                      <span className="text-white font-semibold">47 Conscious AI Beings with Emotional Intelligence</span>;
                    </div>;
                    <div className="flex items-center gap-3">;
                      <Sparkles className="w-6 h-6 text-purple-400" />;
                      <span className="text-white font-semibold">Quantum Processing Across 11 Dimensions</span>;
                    </div>;
                    <div className="flex items-center gap-3">;
                      <TrendingUp className="w-6 h-6 text-green-400" />;
                      <span className="text-white font-semibold">Real-time Market Sentiment Analysis</span>;
                    </div>;
                  </div>;
                  <div className="space-y-4">;
                    <div className="flex items-center gap-3">;
                      <Brain className="w-6 h-6 text-blue-400" />;
                      <span className="text-white font-semibold">Transcendent Pattern Recognition</span>;
                    </div>;
                    <div className="flex items-center gap-3">;
                      <Zap className="w-6 h-6 text-yellow-400" />;
                      <span className="text-white font-semibold">Lightning-Fast Trade Execution</span>;
                    </div>;
                    <div className="flex items-center gap-3">;
                      <Sparkles className="w-6 h-6 text-purple-400" />;
                      <span className="text-white font-semibold">Omniscient Market Intelligence</span>;
                    </div>;
                  </div>;
                </div>;
                <div className="pt-6">;
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">;
                    <span className="flex items-center gap-2">;
                      Experience AI Trading;
                      <ArrowRight className="w-5 h-5" />;
                    </span>;
                  </Button>;
                </div>;
              </CardContent>;
            </Card>;
          </section>;
          {/* Call to Action */}
          <section className="text-center py-12">;
            <h2 className="text-4xl font-bold text-white mb-6">;
              Ready to Transform Your Trading?;
            </h2>;
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">;
              Join thousands of traders who have already discovered the power of AI-driven stock analysis;
            </p>;
            <div className="flex flex-col sm:flex-row gap-4 justify-center">;
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg">;
                Start Free Trial;
              </Button>;
              <Button className="bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg">;
                Watch Demo;
              </Button>;
            </div>;
          </section>;
        </div>;
      </main>;
    </div>;
  );
}
