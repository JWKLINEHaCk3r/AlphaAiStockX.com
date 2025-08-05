import React from 'react';
"use client";


interface SportsTrade {
  event: string"
    prediction: string"
  confidence: string"
    odds: string
}

export default function SportsAlphaTrader() {
  const [loading, setLoading] = useState(false);
  const [trades, setTrades] = useState<SportsTrade[]>([]);

  const generateTrades = () => {
    setLoading(true);
    setTimeout(() => {
      setTrades([ {  event: 'Lakers vs Warriors',  prediction: 'Lakers +3.5',  confidence: '82%',  odds: '+110' 
        }, {  event: 'NFL: Chiefs vs Bills',  prediction: 'Over 47.5',  confidence: '75%',  odds: '-105' 
        }, {  event: 'Manchester United vs Arsenal',  prediction: 'Arsenal Win',  confidence: '68%',  odds: '+140' 
        }
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">Sports Alpha Trader</h2>
      <p className="text-slate-300 mb-4">
        AI-powered sports betting analysis and recommendations
      </p>
      
      <button 
        onClick={generateTrades}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Analyzing Sports Data...' : 'Generate AI Sports Picks'}
      </button>

      {trades.length > 0 && (
        <div className="space-y-4">
          {trades.map((trade, index) => (
            <div key={index} className="ai-insight-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-blue-300">{trade.event}</h3>
                  <p className="text-green-400 font-bold">{trade.prediction}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold">{trade.confidence}</p>
                  <p className="text-slate-300">{trade.odds}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
