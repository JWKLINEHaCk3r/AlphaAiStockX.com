'use client'; import React, { useState } from 'react';

interface HeatmapData {
  region: string,
    trend: string,
  aiNote: string
}

export default function AIGlobalHeatmap() {
  const [loading, setLoading] = useState(false);
  const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);

  const fetchHeatmap = () => {
    setLoading(true);
    setTimeout(() => {
      setHeatmap([ {  region: 'US',  trend: '+1.8%',  aiNote: 'AI: Tech and AI sectors leading gains.' 
        }, {  region: 'Europe',  trend: '-0.7%',  aiNote: 'AI: Energy sector drag, mixed sentiment.' 
        }, {  region: 'Asia',  trend: '+2.3%',  aiNote: 'AI: Manufacturing and export growth.' 
        }, {  region: 'Emerging Markets',  trend: '+0.9%',  aiNote: 'AI: Commodity prices supporting growth.' 
        }
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Global Heatmap</h2>
      <p className="text-slate-300 mb-4">
        Real-time AI analysis of global market trends and regional performance
      </p>
      
      <button 
        onClick={fetchHeatmap}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Analyzing Global Markets...' : 'Generate AI Heatmap'}
      </button>

      {heatmap.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heatmap.map((item, index) => (
            <div key={index} className="ai-insight-card p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-blue-300">{item.region}</h3> <span className={`text-lg font-bold ${ item.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {item.trend}
                </span>
              </div>
              <p className="text-sm text-slate-300">{item.aiNote}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
