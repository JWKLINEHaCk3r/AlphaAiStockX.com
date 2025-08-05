import React from 'react';
"use client";


interface TradeSignal {
  symbol: string"
    action: string"
  confidence: string"
    aiNote: string
}

export default function AITradeCopilot() {
  const [loading, setLoading] = useState(false);
  const [signals, setSignals] = useState<TradeSignal[]>([]);

  const getSignals = () => {
    setLoading(true);
    setTimeout(() => {
      setSignals([ {  symbol: 'TSLA',  action: 'BUY',  confidence: '85%',  aiNote: 'AI: Strong momentum breakout with high volume confirmation.' 
        }, {  symbol: 'META',  action: 'HOLD',  confidence: '72%',  aiNote: 'AI: Consolidation phase, wait for clear direction.' 
        }, {  symbol: 'AMZN',  action: 'SELL',  confidence: '78%',  aiNote: 'AI: Overbought conditions, consider profit taking.' 
        }
      ]);
      setLoading(false);
    }, 1100);
  };

  const getActionColor = (action: string) => {   switch (action) { case 'BUY': return 'text-green-400'; case 'SELL': return 'text-red-400'; case 'HOLD': return 'text-yellow-400'; default: return 'text-gray-400';
      }
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Trade Copilot</h2>
      <p className="text-slate-300 mb-4">
        Real-time AI trading signals and recommendations powered by machine learning
      </p>
      
      <button 
        onClick={getSignals}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Generating AI Signals...' : 'Get AI Trade Signals'}
      </button>

      {signals.length > 0 && (
        <div className="space-y-4">
          {signals.map((signal, index) => (
            <div key={index} className="ai-insight-card p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-blue-300 text-lg">{signal.symbol}</span>
                  <span className={`font-bold text-xl ${getActionColor(signal.action)}`}>
                    {signal.action}
                  </span>
                </div>
                <span className="text-yellow-400 font-bold">{signal.confidence}</span>
              </div>
              <p className="text-sm text-slate-300">{signal.aiNote}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
