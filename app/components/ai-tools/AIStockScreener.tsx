'use client'; import React, { useState } from 'react';

interface Stock {
  symbol: string,
    price: string,
  change: string,
    aiScore: string
}

export default function AIStockScreener() {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const runScreener = () => {
    setLoading(true);
    setTimeout(() => { setStocks([ { symbol: 'AAPL', price: '$185.20', change: '+2.1%', aiScore: '8.5/10' }, { symbol: 'NVDA', price: '$420.15', change: '+3.4%', aiScore: '9.2/10' }, { symbol: 'MSFT', price: '$310.85', change: '+1.8%', aiScore: '8.1/10' }, { symbol: 'GOOGL', price: '$125.40', change: '+2.7%', aiScore: '8.8/10' }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Stock Screener</h2>
      <p className="text-slate-300 mb-4">
        AI-powered stock screening based on technical and fundamental analysis
      </p>
      
      <button 
        onClick={runScreener}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Screening Stocks...' : 'Run AI Stock Screen'}
      </button>

      {stocks.length > 0 && (
        <div className="space-y-3">
          {stocks.map((stock, index) => (
            <div key={index} className="ai-insight-card p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-blue-300 text-lg">{stock.symbol}</span>
                <span className="text-slate-300">{stock.price}</span>
                <span className="text-green-400 font-semibold">{stock.change}</span>
              </div>
              <span className="text-yellow-400 font-bold">{stock.aiScore}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
