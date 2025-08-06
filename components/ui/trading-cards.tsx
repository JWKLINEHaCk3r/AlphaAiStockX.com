import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from "./card.js";
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "./card.js"; import { Badge } from './badge'; import { Button } from './button'; import { Progress } from './progress';
import { TrendingUp, TrendingDown, Brain, Zap, DollarSign, Target } from 'lucide-react';

// AI Market Analysis Card;
export const AIMarketCard = ({
  symbol;
  price;
  change;
  aiConfidence;
  aiRecommendation;
  isLoading = false;
}: {
  symbol: string,
    price: number,
  change: number, aiConfidence: number, aiRecommendation: 'BUY' | 'SELL' | 'HOLD',
  isLoading?: boolean;
}) => {   const isPositive = change >= 0; const confidenceColor = aiConfidence > 80 ? 'green' : aiConfidence > 60 ? 'yellow' : 'red',
  
  return ( <Card className={[ 'relative overflow-hidden transition-all duration-500 hover:scale-105', isLoading ? 'animate-pulse' : '', aiRecommendation === 'BUY' ? 'border-green-500/50 shadow-green-500/25' :  aiRecommendation === 'SELL' ? 'border-red-500/50 shadow-red-500/25' :  'border-yellow-500/50 shadow-yellow-500/25'; 'shadow-lg'; ].join(' ')  }>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{symbol}</CardTitle> <Badge variant={ aiRecommendation === 'BUY' ? 'default' :  aiRecommendation === 'SELL' ? 'destructive' :  'secondary';
          }>
            <Brain className="w-3 h-3 mr-1" />
            {aiRecommendation}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2"> <DollarSign className="w-4 h-4" /> {'$' + price.toFixed(2)} <span className={[ 'flex items-center'; isPositive ? 'text-green-500' : 'text-red-500'; ].join(' ')}> {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />},{change > 0 ? '+' : ''},{change.toFixed(2)}%;
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>AI Confidence</span>
              <span className="font-medium">{aiConfidence}%</span>
            </div>
            <Progress value={aiConfidence} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="text-center">
              <div className="font-medium text-foreground">92%</div>
              <div>Success Rate</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">4.7s</div>
              <div>Avg Speed</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-foreground">+12.4%</div>
              <div>Today ROI</div>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="absolute top-2 right-2"> <div className={[ 'w-2 h-2 rounded-full'; confidenceColor === 'green' ? 'bg-green-500' :  confidenceColor === 'yellow' ? 'bg-yellow-500' :  'bg-red-500'; 'animate-pulse'; ].join(' ')}></div>
      </div>
    </Card>
  );
};

// AI Portfolio Performance Card;
export const AIPortfolioCard = ({ 
  totalValue;
  dailyChange;
  aiPerformance;
  activePositions = 0;
}: {
  totalValue: number,
    dailyChange: number,
  aiPerformance: number;
  activePositions?: number;
}) => (
  <Card className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border-purple-500/30">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-400" />
        AI Portfolio;
      </CardTitle>
      <CardDescription>Quantum-powered trading performance</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-300">
          ${totalValue.toLocaleString()} </div> <div className={`text-lg ${dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}> {dailyChange >= 0 ? '+' : ''}${Math.abs(dailyChange).toLocaleString()} ({((dailyChange/totalValue)*100).toFixed(2)}%);
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center p-3 bg-purple-900/30 rounded-lg">
          <div className="text-xl font-bold text-purple-300">{aiPerformance}%</div>
          <div className="text-purple-400">AI Performance</div>
        </div>
        <div className="text-center p-3 bg-indigo-900/30 rounded-lg">
          <div className="text-xl font-bold text-indigo-300">{activePositions}</div>
          <div className="text-indigo-400">Active Trades</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// AI Signal Strength Card;
export const AISignalCard = ({ 
  signalStrength;
  marketSentiment;
  nextAction;
  timeToAction = 0;
}: { signalStrength: number, marketSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL',
  nextAction: string;
  timeToAction?: number;
}) => (
  <Card className="bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border-cyan-500/30">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-cyan-400" />
        AI Signal Analysis;
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-cyan-300 mb-2">
          {signalStrength}%;
        </div> <Badge variant={ marketSentiment === 'BULLISH' ? 'default' :  marketSentiment === 'BEARISH' ? 'destructive' :  'secondary';
        }>
          {marketSentiment}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Next AI Action:</div>
        <div className="font-medium">{nextAction}</div>
        {timeToAction > 0 && (
          <div className="text-xs text-cyan-400">
            Executing in {timeToAction}s;
          </div>
        )}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-cyan-600 hover:bg-cyan-500">
        Execute AI Trade,
      </Button>
    </CardFooter>
  </Card>
);

// AI Risk Management Card;
export const AIRiskCard = ({ 
  riskLevel;
  stopLoss; maxDrawdown; riskAdjustment = 'OPTIMAL';
}: {
  riskLevel: number,
    stopLoss: number, maxDrawdown: number, riskAdjustment?: 'LOW' | 'OPTIMAL' | 'HIGH';
}) => ( <Card className={`border-2 transition-all duration-300 ${ riskLevel < 30 ? 'border-green-500/50 bg-green-950/20' :  riskLevel < 70 ? 'border-yellow-500/50 bg-yellow-950/20' :  'border-red-500/50 bg-red-950/20';
  }`}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5" />
        AI Risk Control;
      </CardTitle>
      <CardDescription>Quantum risk management system</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between"> <span>Risk Level</span> <Badge variant={riskLevel < 30 ? 'default' : riskLevel < 70 ? 'secondary' : 'destructive'}>
          {riskLevel}%;
        </Badge>
      </div>
      <Progress value={riskLevel} className="h-2" />
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-muted-foreground">Stop Loss</div>
          <div className="font-medium">{stopLoss}%</div>
        </div>
        <div>
          <div className="text-muted-foreground">Max Drawdown</div>
          <div className="font-medium">{maxDrawdown}%</div>
        </div>
      </div>
      <Badge variant="outline" className="w-full justify-center">
        Risk Adjustment: {riskAdjustment}
      </Badge>
    </CardContent>
  </Card>
);

export default trading-cards;