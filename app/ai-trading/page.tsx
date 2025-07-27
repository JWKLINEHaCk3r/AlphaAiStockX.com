
'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const AITradingDashboard = dynamic(() => import('../components/AITradingDashboard'), { ssr: false });

// Force dynamic rendering to prevent static generation issues;
export const dynamicMode = 'force-dynamic';
export const revalidate = 0;

export default function AITradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <AITradingDashboard />
      </div>
    </div>
  );
}
