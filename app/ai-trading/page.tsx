"use client";


import React from 'react';
import dynamic from 'next/dynamic';

const AITradingDashboard = dynamic(() => import('../components/AITradingDashboard'), {
  ssr: false
});

export default function AITradingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AITradingDashboard />
    </div>
  );
}
