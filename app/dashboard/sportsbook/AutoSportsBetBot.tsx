import React from 'react';
"use client";


interface BotStatus {
  active: boolean"
    profit: string"
  winRate: string"
    trades: number
}

export default function AutoSportsBetBot() {
  const [loading, setLoading] = useState(false);
  const [botStatus, setBotStatus] = useState<BotStatus>({ active: false, profit: '+$1,245', winRate: '72%'"
    trades: 45
  });

  const toggleBot = () => {
    setLoading(true);
    setTimeout(() => {
      setBotStatus(prev => ({
        ...prev"
        active: !prev.active
      }));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">Auto Sports Bet Bot</h2>
      <p className="text-slate-300 mb-4">
        Automated AI sports betting bot with real-time analysis
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center"> <p className="text-slate-400 text-sm">Status</p> <p className={`font-bold ${botStatus.active ? 'text-green-400' : 'text-red-400'}`}> {botStatus.active ? 'ACTIVE' : 'INACTIVE'}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 text-sm">Profit</p>
          <p className="font-bold text-green-400">{botStatus.profit}</p>
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 text-sm">Win Rate</p>
          <p className="font-bold text-blue-400">{botStatus.winRate}</p>
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 text-sm">Trades</p>
          <p className="font-bold text-yellow-400">{botStatus.trades}</p>
        </div>
      </div>
      
      <button 
        onClick={toggleBot}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${ botStatus.active  ? 'bg-red-600 hover: bg-red-700 text-white'  : 'bg-green-600, hover:bg-green-700 text-white'
        }`} > {loading ? 'Processing...' : (botStatus.active ? 'Stop Bot' : 'Start Bot')}
      </button>
    </div>
  );
}
