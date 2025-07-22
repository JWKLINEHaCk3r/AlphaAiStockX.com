import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { CardTitle } from "../ui/card";
import { CardHeader } from "../ui/card";
import { CardContent } from "../ui/card";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
'use client';

import React, { memo, useMemo, useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Play,
  Pause,
  Settings,
  BarChart3,
} from 'lucide-react';

interface AITradingBotProps {
  id: string;
  name: string;
  strategy: string;
  status: 'active' | 'paused' | 'stopped';
  performance: {
    totalReturn: number;
    winRate: number;
    sharpeRatio: number;
    maxDrawdown: number;
    trades: number;
  };
  currentPositions: number;
  riskLevel: 'low' | 'medium' | 'high';
  onToggle?: (id: string) => void;
  onConfigure?: (id: string) => void;
  className?: string;
}

const AITradingBot = memo(
  ({
    id,
    name,
    strategy,
    status,
    performance,
    currentPositions,
    riskLevel,
    onToggle,
    onConfigure,
    className = '',
  }: AITradingBotProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const statusConfig = useMemo(() => {
      switch (status) {
        case 'active':
          return {
            color: 'text-green-400',
            bgColor: 'bg-green-500/20',
            borderColor: 'border-green-500/30',
            icon: <Play className="w-4 h-4" />,
            label: 'ACTIVE',
          };
        case 'paused':
          return {
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/20',
            borderColor: 'border-yellow-500/30',
            icon: <Pause className="w-4 h-4" />,
            label: 'PAUSED',
          };
        default:
          return {
            color: 'text-red-400',
            bgColor: 'bg-red-500/20',
            borderColor: 'border-red-500/30',
            icon: <Pause className="w-4 h-4" />,
            label: 'STOPPED',
          };
      }
    }, [status]);

    const riskConfig = useMemo(() => {
      switch (riskLevel) {
        case 'low':
          return { color: 'text-green-400', label: 'Low Risk' };
        case 'medium':
          return { color: 'text-yellow-400', label: 'Medium Risk' };
        case 'high':
          return { color: 'text-red-400', label: 'High Risk' };
      }
    }, [riskLevel]);

    const handleToggle = async () => {
      if (isUpdating) return;
      setIsUpdating(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onToggle?.(id);
      setIsUpdating(false);
    };

    const handleConfigure = () => {
      onConfigure?.(id);
    };

    return (
      <Card
        className={`bg-gray-900/60 ${statusConfig.borderColor} hover:border-neon-blue/50 transition-all duration-300 ${className}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              {name}
            </CardTitle>
            <Badge
              className={`${statusConfig.bgColor} ${statusConfig.color} border-0 flex items-center gap-1`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </Badge>
          </div>
          <div className="text-sm text-gray-400">{strategy}</div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">Total Return</span>
                </div>
                <div
                  className={`text-lg font-bold ${performance.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {performance.totalReturn >= 0 ? '+' : ''}
                  {performance.totalReturn.toFixed(2)}%
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Win Rate</span>
                </div>
                <div className="text-lg font-bold text-blue-400">
                  {performance.winRate.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="text-gray-400">Sharpe</div>
                <div className="text-white font-medium">{performance.sharpeRatio.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Trades</div>
                <div className="text-white font-medium">{performance.trades}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Positions</div>
                <div className="text-white font-medium">{currentPositions}</div>
              </div>
            </div>

            {/* Risk Level */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Risk Level:</span>
              <span className={`text-sm font-medium ${riskConfig.color}`}>{riskConfig.label}</span>
            </div>

            {/* Drawdown Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Max Drawdown</span>
                <span className="text-sm text-red-400">{performance.maxDrawdown.toFixed(2)}%</span>
              </div>
              <Progress value={Math.abs(performance.maxDrawdown)} className="h-2" max={20} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleToggle}
                disabled={isUpdating}
                size="sm"
                className={`flex-1 ${status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isUpdating ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </>
                )}
              </Button>
              <Button
                onClick={handleConfigure}
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

AITradingBot.displayName = 'AITradingBot';

export default AITradingBot;
