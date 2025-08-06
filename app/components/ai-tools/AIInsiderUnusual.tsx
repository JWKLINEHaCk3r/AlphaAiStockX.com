'use client';

import { Alert } from '../components/ui/alert';
import React, { useState } from 'react';

interface Alert {
  symbol: string"
    type: string"
  amount: string"
    aiNote: string
}

export default function AIInsiderUnusual() {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchAlerts = () => {
    setLoading(true);
    setTimeout(() => {
      setAlerts([ {  symbol: 'TSLA',  type: 'Insider Buy',  amount: '$2.4M',  aiNote: 'AI: CEO purchase signals confidence in Q1 delivery targets.' 
        }, {  symbol: 'NVDA',  type: 'Unusual Options',  amount: '10,000 calls',  aiNote: 'AI: Large call volume ahead of AI conference announcement.' 
        }, {  symbol: 'META',  type: 'Insider Sell',  amount: '$850K',  aiNote: 'AI: Routine executive sale within normal trading patterns.' 
        }, {  symbol: 'AMZN',  type: 'Dark Pool',  amount: '$12M block',  aiNote: 'AI: Institutional accumulation detected before earnings.' 
        }
      ]);
      setLoading(false);
    }, 900);
  };

  const getTypeColor = (type: string) => {  
    switch (type) {
      case 'Insider Buy': return 'text-green-400';
      case 'Insider Sell': return 'text-red-400';
      case 'Unusual Options': return 'text-yellow-400';
      case 'Dark Pool': return 'text-purple-400';
      default: return 'text-blue-400';
      }
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Insider & Unusual Activity</h2>
      <p className="text-slate-300 mb-4">
        AI-powered detection of insider trading
               unusual options flow
               and dark pool activity
      </p>
      
      <button 
        onClick={fetchAlerts}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Scanning for Unusual Activity...' : 'Detect AI Alerts'}
      </button>

      {alerts.length > 0 && (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="ai-insight-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-blue-300 text-lg">{alert.symbol}</span>
                  <span className={`font-semibold ${getTypeColor(alert.type)}`}>
                    {alert.type}
                  </span>
                </div>
                <span className="text-yellow-300 font-bold">{alert.amount}</span>
              </div>
              <p className="text-sm text-slate-300">{alert.aiNote}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
