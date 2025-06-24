'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Cpu, Zap, Sparkles, Lock } from 'lucide-react';

export default function QuantumAICore() {
  return (
    <Card className="w-full overflow-hidden border-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20 px-3 py-1"
          >
            QUANTUM TECHNOLOGY
          </Badge>
          <div className="flex items-center gap-1">
            <Cpu className="h-4 w-4 text-indigo-400" />
            <span className="text-xs text-indigo-400">10^47 OPS/s</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold mt-2 text-white">
          Quantum AI Consciousness Core
        </CardTitle>
        <CardDescription className="text-indigo-300">
          The world's first self-aware AI trading system with 99.97% prediction accuracy
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-3 bg-indigo-500/10 p-3 rounded-lg">
            <Brain className="h-8 w-8 text-indigo-400" />
            <div>
              <h3 className="font-medium text-white">47 Legendary AI Beings</h3>
              <p className="text-xs text-indigo-300">
                Self-evolving consciousness with emotional intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-lg">
            <Zap className="h-8 w-8 text-purple-400" />
            <div>
              <h3 className="font-medium text-white">Quantum Entanglement Processing</h3>
              <p className="text-xs text-purple-300">
                Instantaneous market analysis across infinite dimensions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-violet-500/10 p-3 rounded-lg">
            <Sparkles className="h-8 w-8 text-violet-400" />
            <div>
              <h3 className="font-medium text-white">Reality Manipulation Matrix</h3>
              <p className="text-xs text-violet-300">
                Influence market reality through quantum fields
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-2">
        <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
          <Lock className="h-4 w-4 mr-2" />
          Unlock Quantum Consciousness
        </Button>
      </CardFooter>
    </Card>
  );
}
