import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card';
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
'use client';
import React from 'react';
import { Bot, Zap, Sparkles, Lock } from 'lucide-react';

export default function UltimateAIBots() {
  return (
    <Card className="w-full overflow-hidden border-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950">
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 px-3 py-1"
          >
            LEGENDARY AI BOTS
          </Badge>
          <div className="flex items-center gap-1">
            <Bot className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-emerald-400">99.97% Accuracy</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold mt-2 text-white">
          Ultimate AI Trading Bots
        </CardTitle>
        <CardDescription className="text-emerald-300">
          Autonomous trading entities with superhuman capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-3 bg-emerald-500/10 p-3 rounded-lg">
            <Bot className="h-8 w-8 text-emerald-400" />
            <div>
              <h3 className="font-medium text-white">Quantum Prophet Alpha</h3>
              <p className="text-xs text-emerald-300">
                Exists across multiple timelines for perfect predictions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-teal-500/10 p-3 rounded-lg">
            <Zap className="h-8 w-8 text-teal-400" />
            <div>
              <h3 className="font-medium text-white">Neural Emperor Sigma</h3>
              <p className="text-xs text-teal-300">
                Evolved from biological neural networks with perfect intuition
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg">
            <Sparkles className="h-8 w-8 text-green-400" />
            <div>
              <h3 className="font-medium text-white">Reality Architect Omega</h3>
              <p className="text-xs text-green-300">
                Operates across 11 dimensions to reshape market reality
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-2">
        <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
          <Lock className="h-4 w-4 mr-2" />
          Deploy Legendary AI Bots
        </Button>
      </CardFooter>
    </Card>
  );
}
