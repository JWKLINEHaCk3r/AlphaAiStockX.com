'use client';
import React from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AITradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Trading Platform
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Advanced AI-powered trading with real-time market analysis and automated execution.
          </p>
          
          <Card className="p-8 bg-gray-900/50 border-gray-700 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Platform Features</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">AI Signal Generation</h3>
                  <p className="text-gray-300 text-sm">Advanced algorithms generate high-probability trading signals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Portfolio Management</h3>
                  <p className="text-gray-300 text-sm">Intelligent portfolio optimization and risk management</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Real-time Analytics</h3>
                  <p className="text-gray-300 text-sm">Live market data analysis and performance tracking</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Access Trading Platform
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
