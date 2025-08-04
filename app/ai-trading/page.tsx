import React from 'react';
'use client';

import dynamic from 'next/dynamic';

const AITradingDashboard = dynamic(() => import('../components/AITradingDashboard'), {
  ssr: false
});

export default function AITradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <AITradingDashboard />
      </div>
    </div>
  );
}
