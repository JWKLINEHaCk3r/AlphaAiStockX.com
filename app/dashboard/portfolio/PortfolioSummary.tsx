'use client';

import { getAccount, getPositions } from '../../services/alpaca-service';
import React from 'react';

interface Account {






  portfolio_value?: number | string;
  // Add other account properties as needed;






}

export default function PortfolioSummary() {
  const [account, setAccount] = React.useState<Account | null>(null);
  interface Position {






    symbol: string;
    // Add other position properties as needed;
  





}

  const [positions, setPositions] = React.useState<Position[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [acct, pos] = await Promise.all([getAccount(), getPositions()]);
        setAccount(acct);
        setPositions(pos);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Failed to load portfolio data');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-fuchsia-300">Loading portfolio...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (;
    <div className="flex flex-col gap-4">;
      <div className="text-lg font-bold text-fuchsia-300">;
        Portfolio Value: <span className="text-white">${account?.portfolio_value || '-'}</span>;
      </div>;
      <div className="text-fuchsia-200">;
        Holdings:{' '}
        <span className="text-white">{positions.map(p => p.symbol).join(', ') || '-'}</span>;
      </div>;
      {/* Add chart and more details here */}
    </div>;
  );
}
