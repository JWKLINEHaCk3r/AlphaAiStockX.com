import { Alert } from "@/components/ui/alert";
'use client';
import React from 'react';

import { useState } from 'react';

export default function AIInsiderUnusual() {
  const [loading, setLoading] = useState(false);
  type Alert = {
    symbol: string;
    type: string;
    amount: string;
    note: string;
  };
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Placeholder: Replace with real AI API call
  const scanUnusual = () => {
    setLoading(true);
    setTimeout(() => {
      setAlerts([
        {
          symbol: 'MSFT',
          type: 'Insider Buy',
          amount: '$12M',
          note: 'AI: CEO purchased shares, bullish signal.',
        },
        {
          symbol: 'TSLA',
          type: 'Dark Pool Spike',
          amount: '$8.5M',
          note: 'AI: Unusual dark pool activity detected.',
        },
        {
          symbol: 'NVDA',
          type: 'Block Trade',
          amount: '$20M',
          note: 'AI: Large block trade, possible institutional move.',
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Insider & Unusual Activity</h2>
      <p className="text-slate-300 mb-4">
        Detects and visualizes insider trades, dark pool, and block trades in real time.
      </p>
      <button
        className="holo-btn px-6 py-2 font-bold mb-4"
        onClick={scanUnusual}
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan Market'}
      </button>
      {alerts.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((a, i) => (
            <div key={i} className="futuristic-card p-4 animated-neon-border">
              <div className="text-xl font-bold neon-text mb-1">{a.symbol}</div>
              <div className="text-emerald-300 font-bold">{a.type}</div>
              <div className="text-fuchsia-300">Amount: {a.amount}</div>
              <div className="text-xs text-cyan-300 mt-2">{a.note}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
