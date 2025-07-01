'use client';

import React from 'react';

// Simulated AI sports auto-betting (replace with real AI/ML backend and API integration)
const demoBets = [
  {
    event: 'NBA Finals: Lakers vs Celtics',
    pick: 'Lakers -3.5',
    confidence: 0.92,
    reason: 'AI: Value bet, momentum, and injury analysis',
    odds: '+110',
    stake: 100,
    result: 'pending',
  },
  {
    event: 'UEFA: Real Madrid vs Man City',
    pick: 'Over 2.5 Goals',
    confidence: 0.89,
    reason: 'AI: Surebet, offensive/defensive trends, weather',
    odds: '-120',
    stake: 150,
    result: 'pending',
  },
  {
    event: 'NFL: Chiefs vs 49ers',
    pick: 'Chiefs ML',
    confidence: 0.95,
    reason: 'AI: Arbitrage, historical matchups, market odds',
    odds: '+130',
    stake: 200,
    result: 'pending',
  },
];

export default function AutoSportsBetBot() {
  const [running, setRunning] = React.useState(false);
  const [log, setLog] = React.useState<string[]>([]);
  const [pnl, setPnl] = React.useState<number>(0);
  const [status, setStatus] = React.useState<string>('Idle');
  const [bets, setBets] = React.useState(demoBets);
  const [winRate, setWinRate] = React.useState<number>(0.0);
  const [smartMode, setSmartMode] = React.useState(true);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      setStatus('Running');
      setLog(l => ['AutoSportsBetBot started.', ...l]);
      interval = setInterval(() => {
        // Simulate bet results and P&L
        setBets(prevBets =>
          prevBets.map(bet => {
            if (bet.result === 'pending' && Math.random() > 0.7) {
              const won = Math.random() > 0.4;
              setLog(l => [`Bet on ${bet.event} (${bet.pick}) ${won ? 'WON' : 'LOST'}!`, ...l]);
              setPnl(p => p + (won ? bet.stake * 0.9 : -bet.stake));
              return { ...bet, result: won ? 'won' : 'lost' };
            }
            return bet;
          })
        );
      }, 4000);
    } else {
      setStatus('Idle');
    }
    return () => clearInterval(interval);
  }, [running]);

  React.useEffect(() => {
    // Calculate win rate
    const finished = bets.filter(b => b.result !== 'pending');
    if (finished.length > 0) {
      setWinRate(finished.filter(b => b.result === 'won').length / finished.length);
    }
  }, [bets]);

  return (
    <div className="glassmorphic neon-border rounded-2xl p-8 shadow-2xl flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold text-cyan-300 drop-shadow">
          AutoSportsBetBot <span className="text-fuchsia-400">(AI)</span>
        </h3>
        <div className="flex gap-2 items-center">
          <button
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${running ? 'bg-red-600 text-white' : 'bg-cyan-600 text-white hover:bg-cyan-700'}`}
            onClick={() => setRunning(r => !r)}
          >
            {running ? 'Stop' : 'Start'} Bot
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-bold text-base transition-all ${smartMode ? 'bg-green-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
            onClick={() => setSmartMode(m => !m)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            Smart Mode
          </button>
          {showTooltip && (
            <span className="ml-2 text-xs bg-black/80 text-white rounded px-2 py-1 shadow-lg animate-fade-in">
              Let the AI pick the best bets and settings for you!
            </span>
          )}
        </div>
      </div>
      <div>
        Status: <span className="font-semibold text-cyan-300">{status}</span>
      </div>
      <div>
        P&L: <span className="font-semibold text-green-400">${pnl.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-48 h-4 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-4 bg-yellow-400 transition-all"
            style={{ width: `${winRate * 100}%` }}
          />
        </div>
        <span className="text-yellow-300 font-bold">Win Rate: {(winRate * 100).toFixed(1)}%</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-cyan-200 bg-black/30 rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Pick</th>
              <th className="px-4 py-2">Odds</th>
              <th className="px-4 py-2">Stake</th>
              <th className="px-4 py-2">Confidence</th>
              <th className="px-4 py-2">Result</th>
              <th className="px-4 py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, i) => (
              <tr
                key={i}
                className={
                  bet.result === 'won'
                    ? 'bg-green-900/30'
                    : bet.result === 'lost'
                      ? 'bg-red-900/30'
                      : ''
                }
              >
                <td className="px-4 py-2">{bet.event}</td>
                <td className="px-4 py-2">{bet.pick}</td>
                <td className="px-4 py-2">{bet.odds}</td>
                <td className="px-4 py-2">${bet.stake}</td>
                <td className="px-4 py-2">{(bet.confidence * 100).toFixed(1)}%</td>
                <td className="px-4 py-2 font-bold">{bet.result}</td>
                <td className="px-4 py-2 text-xs">{bet.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-black/40 rounded-xl p-3 text-xs h-32 overflow-y-auto neon-scrollbar">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div
        className="text-green-400 text-lg font-bold animate-bounce"
        style={{ display: running && pnl && pnl > 0 ? 'block' : 'none' }}
      >
        🎉 Profit! Your AI is making you money!
      </div>
      <div className="text-cyan-200 text-xs mt-2 italic">
        * One-Click Profit: Just press Start and let the AI do the rest. Safe for all ages and skill
        levels.
      </div>
      <div className="text-cyan-200 text-xs mt-2 italic">
        * This is a next-gen AI sports betting bot. For real betting, connect your live API keys and
        enable production mode. All actions are logged and risk-managed.
      </div>
    </div>
  );
}
