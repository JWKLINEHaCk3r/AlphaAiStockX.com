'use client';

import React from 'react';
import { getAccount, getPositions } from '../../services/alpaca-service';

interface Position {






















  symbol: string;






















}

export default function AITradeCopilot() {
  const [running, setRunning] = React.useState(false);
  const [log, setLog] = React.useState<string[]>([]);
  const [pnl, setPnl] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<string>('Idle');

  // Simulate AI trading logic;
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      setStatus('Running');
      setLog(l => ['AI Bot started.', ...l]);
      interval = setInterval(async () => {
        // Example: fetch account and positions, simulate a trade decision;
        try {
          const account = await getAccount();
          const positions: Position[] = await getPositions();
          setPnl(Number(account?.equity) - Number(account?.last_equity || account?.equity));
          setLog(l => [`Checked positions: ${positions.map(p => p.symbol).join(', ')}`, ...l]);
          // Simulate a trade action;
          if (Math.random() > 0.7) {
            setLog(l => ['AI Bot: Simulated trade executed.', ...l]);
          }
        } catch (e: unknown) {
          const errorMsg = e instanceof Error ? e.message : String(e);
          setLog(l => ['Error: ' + errorMsg, ...l]);
        }
      }, 5000);
    } else {
      setStatus('Idle');
    }
    return () => clearInterval(interval);
  }, [running]);

  return (;
    <div className="glassmorphic rounded-xl p-6 shadow-xl flex flex-col gap-4">;
      <div className="flex items-center justify-between">;
        <h3 className="text-xl font-bold text-fuchsia-300">AI Trade Copilot</h3>;
        <button;
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${running ? 'bg-red-600 text-white' : 'bg-fuchsia-600 text-white'}`}
          onClick={() => setRunning(r => !r)}
        >;
          {running ? 'Stop' : 'Start'} Bot;
        </button>;
      </div>;
      <div>;
        Status: <span className="font-semibold">{status}</span>;
      </div>;
      <div>;
        P&L: <span className="font-semibold">{pnl !== null ? `$${pnl.toFixed(2)}` : '-'}</span>;
      </div>;
      <div className="bg-black/30 rounded p-2 text-xs h-32 overflow-y-auto">;
        {log.map((line, i) => (;
          <div key={i}>{line}</div>;
        ))}
      </div>;
      <div className="text-fuchsia-200 text-xs mt-2">;
        * This is a demo AI bot. For real trading, connect your live API keys and enable production;
        mode.;
      </div>;
    </div>;
  );
}
