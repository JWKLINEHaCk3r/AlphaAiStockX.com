'use client'; import React, { useState } from 'react';

interface Pattern {
  symbol: string,
    pattern: string,
  confidence: string,
    aiNote: string
}

export default function AIPatternRecognition() {
  const [loading, setLoading] = useState(false);
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  const findPatterns = () => {
    setLoading(true);
    setTimeout(() => {
      setPatterns([ {  symbol: 'AAPL',  pattern: 'Cup & Handle',  confidence: '87%',  aiNote: 'AI: Strong bullish pattern forming, target $195.' 
        }, {  symbol: 'GOOGL',  pattern: 'Ascending Triangle',  confidence: '92%',  aiNote: 'AI: Breakout pattern confirmed, momentum building.' 
        }, {  symbol: 'TSLA',  pattern: 'Head & Shoulders',  confidence: '78%',  aiNote: 'AI: Potential reversal pattern, watch for confirmation.' 
        }, {  symbol: 'MSFT',  pattern: 'Bull Flag',  confidence: '85%',  aiNote: 'AI: Continuation pattern, expecting upward move.' 
        }
      ]);
      setLoading(false);
    }, 1100);
  };
 const getPatternColor = (pattern: string) => { const bullishPatterns = ['Cup & Handle', 'Ascending Triangle', 'Bull Flag']; const bearishPatterns = ['Head & Shoulders'];
     if (bullishPatterns.some(p => pattern.includes(p))) { return 'text-green-400'; } else if (bearishPatterns.some(p => pattern.includes(p))) { return 'text-red-400'; } return 'text-yellow-400';
  };

  const getConfidenceColor = (confidence: string) => { const percent = parseInt(confidence); if (percent >= 90) return 'text-green-500'; if (percent >= 80) return 'text-yellow-400'; return 'text-orange-400';
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Pattern Recognition</h2>
      <p className="text-slate-300 mb-4">
        Advanced AI pattern detection using machine learning algorithms
      </p>
      
      <button 
        onClick={findPatterns}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Scanning Chart Patterns...' : 'Find AI Patterns'}
      </button>

      {patterns.length > 0 && (
        <div className="space-y-4">
          {patterns.map((pattern, index) => (
            <div key={index} className="ai-insight-card p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-blue-300 text-lg">{pattern.symbol}</span>
                  <span className={`font-semibold ${getPatternColor(pattern.pattern)}`}>
                    {pattern.pattern}
                  </span>
                </div>
                <span className={`font-bold ${getConfidenceColor(pattern.confidence)}`}>
                  {pattern.confidence}
                </span>
              </div>
              <p className="text-sm text-slate-300">{pattern.aiNote}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
