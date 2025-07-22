import { Card, CardContent } from '../../components/ui/card.js';
import { Card, CardContent } from '../../components/ui/card.js';
import { Card, CardContent } from '../../components/ui/card.js';
import { Card, CardContent } from '../../components/ui/card.tsx';
import { Card, CardContent } from '../../components/ui/card.tsx';
import { Card, CardContent } from '../../components/ui/card.tsx';
"use client";
import { Card, CardContent } from '../../components/ui/card';
import { Button } from "../../components/ui/button";
import React from 'react';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useSession } from 'next-auth/react';
import SuperiorTradingPlatform from '@/app/components/platform/SuperiorTradingPlatform';
import { Brain, TrendingUp, DollarSign, Shield } from 'lucide-react';
import Link from 'next/link';

export default function TradingPlatformPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading AlphaAI Trading Platform</h2>
          <p className="text-slate-400">Initializing AI systems and real-time data feeds...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Brain className="h-20 w-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to AlphaAI Trading Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Advanced AI-powered trading with real-time signals, social trading, and professional
            portfolio management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">AI Trading Signals</h3>
                <p className="text-slate-400">
                  Real-time AI-generated trading signals with confidence scoring
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Portfolio Management</h3>
                <p className="text-slate-400">
                  Professional-grade portfolio tracking and risk management
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Social Trading</h3>
                <p className="text-slate-400">Follow and copy trades from top-performing traders</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/api/auth/signin">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-lg px-8 py-4"
              >
                Sign In to Trade
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Create Account
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            Demo mode available • No real money required to explore
          </p>
        </div>
      </div>
    );
  }

  return <SuperiorTradingPlatform />;
}
