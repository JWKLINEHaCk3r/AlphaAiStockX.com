'use client';

import { getAccount } from '../../services/alpaca-service';
import React from 'react';

export default function AnalyticsWidgets() {
  const [account, setAccount] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const acct = await getAccount();
        setAccount(acct);
      } catch (e: any) {
        setError(e?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-fuchsia-300">Loading analytics...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glassmorphic p-4 rounded-xl shadow-lg">
        <div className="text-fuchsia-300 font-bold">Performance</div>
        <div className="text-white text-2xl">
          {account?.portfolio_value ? `$${account.portfolio_value}` : '-'}
        </div>
      </div>
      <div className="glassmorphic p-4 rounded-xl shadow-lg">
        <div className="text-fuchsia-300 font-bold">Buying Power</div>
        <div className="text-white text-2xl">
          {account?.buying_power ? `$${account.buying_power}` : '-'}
        </div>
      </div>
      <div className="glassmorphic p-4 rounded-xl shadow-lg">
        <div className="text-fuchsia-300 font-bold">Status</div>
        <div className="text-white text-2xl">{account?.status || '-'}</div>
      </div>
    </div>
  );
}
