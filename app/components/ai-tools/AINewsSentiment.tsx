'use client'; import React, { useState } from 'react';

interface NewsItem {
  headline: string,
    impact: string,
  sentiment: string,
    aiNote: string
}

export default function AINewsSentiment() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);

  const fetchSentiment = () => {
    setLoading(true);
    setTimeout(() => {
      setNews([ {  headline: 'Fed Hints at Rate Pause',  impact: '+2.1%',  sentiment: 'Bullish',  aiNote: 'AI: Macro event positive for tech sectors.' 
        }, {  headline: 'Major Hack at Oil Giant',  impact: '-1.7%',  sentiment: 'Bearish',  aiNote: 'AI: Cybersecurity concerns affecting energy sector.' 
        }, {  headline: 'AI Chip Breakthrough Announced',  impact: '+4.3%',  sentiment: 'Very Bullish',  aiNote: 'AI: Revolutionary tech could disrupt semiconductor industry.' 
        }, {  headline: 'Trade Tensions Escalate',  impact: '-0.8%',  sentiment: 'Bearish',  aiNote: 'AI: Global supply chain concerns affecting manufacturing.' 
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const getSentimentColor = (sentiment: string) => {  
    switch (sentiment) {
      case 'Very Bullish': return 'text-green-500';
      case 'Bullish': return 'text-green-400';
      case 'Bearish': return 'text-red-400';
      case 'Very Bearish': return 'text-red-500';
      default: return 'text-gray-400';
      }
  };
  
  const getImpactColor = (impact: string) => {
    return impact.startsWith('+') ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI News Sentiment</h2>
      <p className="text-slate-300 mb-4">
        Real-time AI analysis of breaking news and market sentiment impact
      </p>
      
      <button 
        onClick={fetchSentiment}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Analyzing Market News...' : 'Get AI Sentiment Analysis'}
      </button>

      {news.length > 0 && (
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="ai-insight-card p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-blue-300 mb-2">{item.headline}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${getSentimentColor(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                  <span className={`font-bold ${getImpactColor(item.impact)}`}>
                    {item.impact}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300">{item.aiNote}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
