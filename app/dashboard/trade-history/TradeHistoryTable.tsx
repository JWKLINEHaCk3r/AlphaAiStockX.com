'use client';

import { getPositions } from '../../services/alpaca-service';
import React from 'react';

export default function TradeHistoryTable() {
  const [positions, setPositions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const pos = await getPositions();
        setPositions(pos);
      } catch (e: any) {
        setError(e?.message || 'Failed to load trade history');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-fuchsia-300">Loading trade history...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <table className="min-w-full text-left text-fuchsia-200 bg-black/30 rounded-xl overflow-hidden">
      <thead>
        <tr>
          <th className="px-4 py-2">Symbol</th>
          <th className="px-4 py-2">Qty</th>
          <th className="px-4 py-2">Avg Entry</th>
          <th className="px-4 py-2">Market Value</th>
          <th className="px-4 py-2">Unrealized P/L</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((p, i) => (
          <tr key={i}>
            <td className="px-4 py-2">{p.symbol}</td>
            <td className="px-4 py-2">{p.qty}</td>
            <td className="px-4 py-2">${p.avg_entry_price}</td>
            <td className="px-4 py-2">${p.market_value}</td>
            <td className="px-4 py-2">${p.unrealized_pl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
