'use client';

import { useState } from 'react';

export default function AITradeCopilot() {
  const [loading, setLoading] = useState(false);
  type Suggestion = {
    symbol: string;
    action: string;
    reason: string;
    simulation: string;
  } | null;

  const [suggestion, setSuggestion] = useState<Suggestion>(null);

  // Placeholder: Replace with real AI API call
  const getSuggestion = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestion({
        symbol: 'GOOGL',
        action: 'Buy',
        reason: 'AI: Strong earnings, bullish technicals, positive news flow.',
        simulation: '+7.2% gain in 30 days (simulated)',
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Trade Copilot</h2>
      <p className="text-slate-300 mb-4">
        Suggests, explains, and simulates trades based on all known market data.
      </p>
      <button
        className="holo-btn px-6 py-2 font-bold mb-4"
        onClick={getSuggestion}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Get Trade Suggestion'}
      </button>
      {suggestion && (
        <div className="mt-4 futuristic-card p-4 animated-neon-border">
          <div className="text-xl font-bold neon-text mb-1">{suggestion.symbol}</div>
          <div className="text-emerald-300 font-bold">Action: {suggestion.action}</div>
          <div className="text-fuchsia-300">{suggestion.reason}</div>
          <div className="text-cyan-300 mt-2">Simulation: {suggestion.simulation}</div>
        </div>
      )}
    </div>
  );
}
