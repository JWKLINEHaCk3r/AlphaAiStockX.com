'use client';
import React from 'react';

import { Brain, TrendingUp, Activity } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Central core */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple animate-spin">
          <div className="absolute inset-2 rounded-full bg-background"></div>
        </div>
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute -top-2 left-1/2 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 -left-2 w-2 h-2 bg-neon-orange rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 -right-2 w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Text */}
        <div className="mt-8 text-center">
          <div className="holographic-text text-xl font-bold animate-pulse">
            Initializing AI Systems...
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Quantum processors warming up
          </div>
        </div>
      </div>
    </div>
  );
}
