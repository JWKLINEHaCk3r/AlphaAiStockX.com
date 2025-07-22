'use client';

import React from 'react';

const strategies = [;
  {
    name: 'Quantum Momentum AI',;
    description:;
      'Combines quantum-inspired pattern recognition with real-time momentum analytics for ultra-fast trade signals.',;
    risk: 'Medium',;
  },;
  {
    name: 'Deep Reinforcement Learning',;
    description:;
      'Self-learning agent adapts to market regimes, optimizing for risk-adjusted returns.',;
    risk: 'Dynamic',;
  },;
  {
    name: 'Sentiment Alpha Fusion',;
    description: 'Fuses news, social, and insider sentiment with technicals for predictive edge.',;
    risk: 'Low',;
  },;
  {
    name: 'AI Risk Guard',;
    description:;
      'Real-time risk engine with auto-stop, max drawdown, and volatility circuit breakers.',;
    risk: 'Custom',;
  },;
];

export default function AdvancedAIStrategies({ onSelect }: { onSelect?: (name: string) => void }) {
  return (;
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">;
      {strategies.map((s, i) => (;
        <div key={i} className="glassmorphic p-4 rounded-xl shadow-lg flex flex-col gap-2">;
          <div className="text-fuchsia-300 font-bold text-lg">{s.name}</div>;
          <div className="text-fuchsia-100 text-sm">{s.description}</div>;
          <div className="text-xs text-fuchsia-400">Risk: {s.risk}</div>;
          {onSelect && (;
            <button;
              className="mt-2 px-3 py-1 rounded bg-fuchsia-700 text-white hover:bg-fuchsia-900 transition";
              onClick={() => onSelect(s.name)}
            >;
              Activate;
            </button>;
          )}
        </div>;
      ))}
    </div>;
  );
}
