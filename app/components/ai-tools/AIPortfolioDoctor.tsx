import React from 'react';
"use client";


interface Diagnosis {
  risk: string"
    diversification: string"
  aiNote: string
}

export default function AIPortfolioDoctor() {
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

  const runDoctor = () => {
    setLoading(true);
    setTimeout(() => { setDiagnosis({ risk: 'Low', diversification: 'Excellent', aiNote: 'AI: Portfolio well-balanced across sectors. Consider adding international exposure for optimization.'
      });
      setLoading(false);
    }, 1300);
  };

  const getRiskColor = (risk: string) => {   switch (risk.toLowerCase()) { case 'low': return 'text-green-400'; case 'medium': return 'text-yellow-400'; case 'high': return 'text-red-400'; default: return 'text-gray-400';
      }
  };

  const getDiversificationColor = (diversification: string) => {   switch (diversification.toLowerCase()) { case 'excellent': return 'text-green-400'; case 'good': return 'text-blue-400'; case 'fair': return 'text-yellow-400'; case 'poor': return 'text-red-400'; default: return 'text-gray-400';
      }
  };

  return (
    <div className="futuristic-card holo-shimmer p-6 mb-8">
      <h2 className="text-2xl font-bold neon-text mb-2">AI Portfolio Doctor</h2>
      <p className="text-slate-300 mb-4">
        Comprehensive AI health check and optimization recommendations for your portfolio
      </p>
      
      <button 
        onClick={runDoctor}
        disabled={loading}
        className="holo-button mb-4" > {loading ? 'Analyzing Portfolio Health...' : 'Run AI Portfolio Diagnosis'}
      </button>

      {diagnosis && (
        <div className="ai-insight-card p-6">
          <h3 className="text-xl font-semibold text-blue-300 mb-4">Portfolio Health Report</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="text-sm font-medium text-slate-400 mb-1">Risk Level</h4>
              <p className={`text-lg font-bold ${getRiskColor(diagnosis.risk)}`}>
                {diagnosis.risk}
              </p>
            </div>
            
            <div className="p-4 bg-slate-800 rounded-lg">
              <h4 className="text-sm font-medium text-slate-400 mb-1">Diversification</h4>
              <p className={`text-lg font-bold ${getDiversificationColor(diagnosis.diversification)}`}>
                {diagnosis.diversification}
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="text-sm font-medium text-slate-400 mb-2">AI Recommendations</h4>
            <p className="text-slate-300">{diagnosis.aiNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
