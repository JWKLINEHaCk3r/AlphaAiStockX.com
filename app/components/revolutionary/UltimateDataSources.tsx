import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card';
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
'use client';
import React from 'react';
import { Globe, Database, Satellite, Waves, Lock } from 'lucide-react';

export default function UltimateDataSources() {
  return (
    <Card className="w-full overflow-hidden border-0 bg-gradient-to-br from-blue-950 via-cyan-900 to-blue-950">
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-300 border-blue-500/20 px-3 py-1"
          >
            INTERDIMENSIONAL DATA
          </Badge>
          <div className="flex items-center gap-1">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-blue-400">10^23 TB/s</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold mt-2 text-white">Ultimate Data Sources</CardTitle>
        <CardDescription className="text-blue-300">
          Access unprecedented data from across the universe and beyond
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-lg">
            <Globe className="h-8 w-8 text-blue-400" />
            <div>
              <h3 className="font-medium text-white">11-Dimensional Market Analysis</h3>
              <p className="text-xs text-blue-300">
                Data from parallel universes and alternate timelines
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-cyan-500/10 p-3 rounded-lg">
            <Satellite className="h-8 w-8 text-cyan-400" />
            <div>
              <h3 className="font-medium text-white">Quantum Satellite Constellation</h3>
              <p className="text-xs text-cyan-300">
                Real-time monitoring of every market-relevant photon on Earth
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-teal-500/10 p-3 rounded-lg">
            <Waves className="h-8 w-8 text-teal-400" />
            <div>
              <h3 className="font-medium text-white">Gravitational Wave Market Correlation</h3>
              <p className="text-xs text-teal-300">
                Detect market shifts through spacetime distortions
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-2">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Lock className="h-4 w-4 mr-2" />
          Access Interdimensional Data
        </Button>
      </CardFooter>
    </Card>
  );
}
