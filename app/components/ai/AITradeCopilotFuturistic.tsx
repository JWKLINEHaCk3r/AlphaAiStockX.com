'use client';

import React, { useState, useEffect } from 'react';

// Mock API functions
const getAccount = async () => ({
  equity: '10000.00',
  last_equity: '9800.00',
  buying_power: '5000.00'
});

const getPositions = async () => ([]);

interface AIStrategy {
  name: string;
  description: string;
  run: (marketData: any, accountData: any) => Promise<{
    action: string;
    confidence: number;
    reason: string;
  }>;
}

const strategies: AIStrategy[] = [ { name: 'Momentum Hunter', description: 'Identifies stocks with strong momentum patterns', run: async (marketData, accountData) => ({ action: 'BUY', confidence: 0.85, reason: 'Strong upward momentum detected with high volume'
    })
  }, { name: 'Mean Reversion', description: 'Trades on price reversals to the mean', run: async (marketData, accountData) => ({ action: 'HOLD', confidence: 0.65, reason: 'Market volatility suggests waiting for clearer signals'
    })
  }, { name: 'AI Scalper', description: 'High-frequency micro-profit trading', run: async (marketData, accountData) => ({ action: 'SELL', confidence: 0.92, reason: 'Quick profit opportunity identified in volatility spikes'
    })
  }
];

export default function AITradeCopilotFuturistic() {
  const [running, setRunning] = useState(false); const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]); const [status, setStatus] = useState('Stopped');
  const [pnl, setPnl] = useState(0); const [confidence, setConfidence] = useState(0); const [aiReason, setAiReason] = useState('');
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout
              
     if (running) { setStatus('Running'); setLog(l => ['AI Bot started.', ...l]);
      interval = setInterval(async () => {
        try {
          const account = await getAccount();
          const positions = await getPositions();
          const marketData = { volatility: Math.random() * 0.6 };
          setPnl(Number(account?.equity) - Number(account?.last_equity || account?.equity));
          // Run selected AI strategy
          const result = await selectedStrategy.run(marketData, { account,
      positions
    });
          setConfidence(result.confidence);
          setAiReason(result.reason);
          setLog(l => [
            `[${selectedStrategy.name}] Action: ${result.action} | Confidence: ${result.confidence.toFixed(2)} | ${result.reason}`,
            ...l
          ]); } catch (error) { console.error('AI Strategy error:', error); setLog(l => ['Error in AI strategy execution', ...l]);
        }
      }, 3000); } else { setStatus('Stopped'); setLog(l => ['AI Bot stopped.', ...l]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, selectedStrategy]);

  return (
    <div className="glassmorphic neon-border rounded-2xl p-8 shadow-2xl flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          AI Trade Copilot
        </h3>
        <button
          className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${ running  ? 'bg-red-600 text-white hover: bg-red-700'  : 'bg-fuchsia-600 text-white, hover:bg-fuchsia-700'
          }`}
          onClick={() => setRunning(r => !r)} > {running ? 'Stop' : 'Start'} AI
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">AI Strategy:</label>
        <select
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
          value={selectedStrategy.name}
          onChange={(e) => {
            const strat = strategies.find(s => s.name === e.target.value);
            if (strat) setSelectedStrategy(strat);
          }}
        >
          {strategies.map(strategy => (
            <option key={strategy.name} value={strategy.name}>
              {strategy.name} - {strategy.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        Status: <span className="font-semibold text-cyan-300">{status}</span>
      </div>
       <div> P&L:{' '} <span className={`font-semibold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          ${pnl.toFixed(2)}
        </span>
      </div>
       <div> AI Confidence:{' '}
        <span className="font-semibold text-blue-400">
          {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      
      <div>
        AI Reason: <span className="text-gray-300">{aiReason}</span>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Activity Log:</h4>
        <div className="h-32 overflow-y-auto bg-gray-900 rounded-lg p-3 text-sm">
          {log.map((entry, i) => (
            <div key={i} className="mb-1 text-gray-300">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
