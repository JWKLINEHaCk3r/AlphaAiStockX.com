'use client';
import React from 'react';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-background opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <Card className="glass-card neon-border w-full max-w-md relative z-10">
        <div className="text-center p-8">
          <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse-glow">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-4 holographic-text">
            System Error Detected
          </CardTitle>
          <CardDescription className="text-muted-foreground mb-6">
            Our quantum AI systems encountered an anomaly. Neural networks are recalibrating...
          </CardDescription>
        </div>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Error ID: {error.digest || 'Unknown'}
          </div>
          <Button
            onClick={reset}
            className="btn-primary w-full group"
            size="lg"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Restart AI Systems
          </Button>
          <div className="text-center text-xs text-gray-500 mt-6">
            AlphaAIStockX - Powered by Quantum AI
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
