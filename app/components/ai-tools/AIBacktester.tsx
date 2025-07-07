'use client';
import React from 'react';

import { useState } from 'react';

type BacktestResults = {
  strategy: string;
  period: string;
  trades: number;
  winRate: string;
  totalReturn: string;
  aiNote: string;
};

export default function AIBacktester() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BacktestResults | null>(null);

  // Placeholder: Replace with real AI API call
  const runBacktest = () => {
    setLoading(true);
    setTimeout(() => {
      setResults({
        strategy: 'AI Momentum + News',
        period: '2022-2025',
        trades: 124,
        winRate: '72.6%',
        totalReturn: '+184%',
        aiNote: 'AI: Outperformed S&P 500 by 4.2x. Most gains from tech and AI sectors.',
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Backtester</h2>
      <p className="text-slate-300 mb-4">
        Lightning-fast, multi-strategy backtesting with explainable AI results.
      </p>
      <button
        className="holo-btn px-6 py-2 font-bold mb-4"
        onClick={runBacktest}
        disabled={loading}
      >
        {loading ? 'Backtesting...' : 'Run Backtest'}
      </button>
      {results && (
        <div className="mt-4 futuristic-card p-4 animated-neon-border">
          <div className="text-xl font-bold neon-text mb-1">{results.strategy}</div>
          <div className="text-emerald-300 font-bold">Period: {results.period}</div>
          <div className="text-cyan-300">Trades: {results.trades}</div>
          <div className="text-fuchsia-300">Win Rate: {results.winRate}</div>
          <div className="text-emerald-300 font-bold">Total Return: {results.totalReturn}</div>
          <div className="text-xs text-cyan-300 mt-2">{results.aiNote}</div>
        </div>
      )}
    </div>
  );
}
