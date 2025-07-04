'use client';
import { useState } from 'react';
import { AIAutoTrader } from '../services/ai-auto-trader';

export default function AutoTraderDemo() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    setLoading(true);
    setError(null);
    try {
      const trader = new AIAutoTrader(10000);
      await trader.decideAndTrade('AAPL');
      await trader.decideAndTrade('TSLA');
      await trader.decideAndTrade('MSFT');
      setPortfolio(trader.getPortfolio());
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">AI Auto-Trader Demo</h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={runDemo}
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Demo'}
      </button>
      {error && <div className="text-red-600 mt-4">Error: {error}</div>}
      {portfolio && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Portfolio</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
            {JSON.stringify(portfolio, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
