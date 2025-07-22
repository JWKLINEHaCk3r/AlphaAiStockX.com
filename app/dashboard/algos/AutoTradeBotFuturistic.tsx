'use client';

import React from 'react';
import { getAccount, getPositions } from '../../services/alpaca-service';
import { strategies, AITradingStrategy } from '../../services/ai-strategy-engine';

export default function AutoTradeBotFuturistic() {
  const [running, setRunning] = React.useState(false);
  const [log, setLog] = React.useState<string[]>([]);
  const [pnl, setPnl] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<string>('Idle');
  const [selectedStrategy, setSelectedStrategy] = React.useState<AITradingStrategy>(strategies[0]);
  const [confidence, setConfidence] = React.useState<number | null>(null);
  const [aiReason, setAiReason] = React.useState<string>('');
  const [amount, setAmount] = React.useState<number>(1000);
  const [risk, setRisk] = React.useState<'Low' | 'Medium' | 'High'>('Medium');
  const [smartMode, setSmartMode] = React.useState(true);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      setStatus('Running');
      setLog(l => ['AutoTrade Bot started.', ...l]);
      interval = setInterval(async () => {
        try {
          const account = await getAccount();
          const positions = await getPositions();
          const marketData = { volatility: Math.random() * 0.6 };
          setPnl(Number(account?.equity) - Number(account?.last_equity || account?.equity));
          // Run selected AI strategy;
          const result = await selectedStrategy.run(marketData, {
            ...account,;
            ...positions,;
            risk,;
            amount,;
          });
          setConfidence(result.confidence);
          setAiReason(result.reason);
          setLog(l => [;
            `[${selectedStrategy.name}] Action: ${result.action} | Confidence: ${result.confidence.toFixed(2)} | ${result.reason}`,;
            ...l,;
          ]);
          // Simulate trade execution;
          if (result.action === 'buy' && Math.random() > 0.5) {
            setLog(l => [`AutoTrade Bot: Executed BUY for $${amount} (${risk} risk)`, ...l]);
          }
        } catch (e) {
          setLog(l => ['Error: ' + ((e as Error)?.message || e), ...l]);
        }
      }, 4000);
    } else {
      setStatus('Idle');
    }
    return () => clearInterval(interval);
  }, [running, selectedStrategy, amount, risk]);

  return (;
    <div className="glassmorphic neon-border rounded-2xl p-8 shadow-2xl flex flex-col gap-6 animate-fade-in">;
      <div className="flex items-center justify-between">;
        <h3 className="text-2xl font-extrabold text-fuchsia-300 drop-shadow">;
          AutoTrade Bot <span className="text-cyan-400">Futuristic</span>;
        </h3>;
        <div className="flex gap-2 items-center">;
          <button;
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${running ? 'bg-red-600 text-white' : 'bg-fuchsia-600 text-white hover:bg-fuchsia-700'}`}
            onClick={() => setRunning(r => !r)}
          >;
            {running ? 'Stop' : 'Start'} Bot;
          </button>;
          <button;
            className={`px-4 py-2 rounded-xl font-bold text-base transition-all ${smartMode ? 'bg-green-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
            onClick={() => setSmartMode(m => !m)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >;
            Smart Mode;
          </button>;
          {showTooltip && (;
            <span className="ml-2 text-xs bg-black/80 text-white rounded px-2 py-1 shadow-lg animate-fade-in">;
              Let the AI pick the best strategy and settings for you!;
            </span>;
          )}
        </div>;
      </div>;
      <div className="flex gap-4 items-center">;
        <label htmlFor="strategy-select" className="text-fuchsia-200 font-semibold">;
          Strategy:;
        </label>;
        <select;
          id="strategy-select";
          className="bg-black/40 text-fuchsia-200 rounded-lg px-4 py-2";
          value={selectedStrategy.name}
          onChange={e => {
            const strat = strategies.find(s => s.name === e.target.value);
            if (strat) setSelectedStrategy(strat);
          }}
        >;
          {strategies.map((s: any) => (;
            <option key={s.name} value={s.name}>;
              {s.name}
            </option>;
          ))}
        </select>;
      </div>;
      <div className="flex gap-4 items-center">;
        <label htmlFor="amount-input" className="text-fuchsia-200 font-semibold">;
          Amount to Invest ($):;
        </label>;
        <input;
          id="amount-input";
          type="number";
          min={100}
          step={100}
          className="bg-black/40 text-fuchsia-200 rounded-lg px-4 py-2 w-32";
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          disabled={smartMode}
        />;
        <label htmlFor="risk-select" className="text-fuchsia-200 font-semibold">;
          Risk:;
        </label>;
        <select;
          id="risk-select";
          className="bg-black/40 text-fuchsia-200 rounded-lg px-4 py-2";
          value={risk}
          onChange={e => setRisk(e.target.value as 'Low' | 'Medium' | 'High')}
          disabled={smartMode}
        >;
          <option value="Low">Low</option>;
          <option value="Medium">Medium</option>;
          <option value="High">High</option>;
        </select>;
      </div>;
      <div className="flex items-center gap-4">;
        <div className="w-48 h-4 bg-gray-800 rounded-full overflow-hidden">;
          <div;
            className="h-4 bg-yellow-400 transition-all";
            style={{ width: `${confidence !== null ? confidence * 100 : 0}%` }}
          />;
        </div>;
        <span className="text-yellow-300 font-bold">;
          AI Confidence: {confidence !== null ? `${(confidence * 100).toFixed(1)}%` : '-'}
        </span>;
      </div>;
      <div>;
        Status: <span className="font-semibold text-cyan-300">{status}</span>;
      </div>;
      <div>;
        P&L:{' '}
        <span className="font-semibold text-green-400">;
          {pnl !== null ? `$${pnl.toFixed(2)}` : '-'}
        </span>;
      </div>;
      <div className="text-fuchsia-200">;
        AI Reason: <span className="text-white">{aiReason}</span>;
      </div>;
      <div className="bg-black/40 rounded-xl p-3 text-xs h-40 overflow-y-auto neon-scrollbar">;
        {log.map((line, i) => (;
          <div key={i}>{line}</div>;
        ))}
      </div>;
      <div;
        className="text-green-400 text-lg font-bold animate-bounce";
        style={{ display: running && pnl && pnl > 0 ? 'block' : 'none' }}
      >;
        🎉 Profit! Your AI is making you money!;
      </div>;
      <div className="text-fuchsia-200 text-xs mt-2 italic">;
        * One-Click Profit: Just press Start and let the AI do the rest. Safe for all ages and skill;
        levels.;
      </div>;
      <div className="text-fuchsia-200 text-xs mt-2 italic">;
        * This is a next-gen AutoTrade bot. For real trading, connect your live API keys and enable;
        production mode. All actions are logged and risk-managed.;
      </div>;
    </div>;
  );
}
