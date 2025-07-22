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

import React, { memo, useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Cpu,
  Zap,
  Clock,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  activeConnections: number;
  responseTime: number;
  uptime: number;
  errors: number;
  successRate: number;
}

interface PerformanceMonitorProps {
  metrics: SystemMetrics;
  isLoading?: boolean;
  onRefresh?: () => void;
  className?: string;
}

const PerformanceMonitor = memo(
  ({ metrics, isLoading = false, onRefresh, className = '' }: PerformanceMonitorProps) => {
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
      setLastUpdate(new Date());
    }, [metrics]);

    const systemHealth = useMemo(() => {
      const scores = [
        100 - metrics.cpu,
        100 - metrics.memory,
        100 - metrics.disk,
        metrics.successRate,
      ];
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      if (average >= 90)
        return { status: 'excellent', color: 'text-green-400', bgColor: 'bg-green-500/20' };
      if (average >= 75)
        return { status: 'good', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
      if (average >= 50)
        return { status: 'warning', color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
      return { status: 'critical', color: 'text-red-400', bgColor: 'bg-red-500/20' };
    }, [metrics]);

    const formatUptime = (hours: number) => {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours.toFixed(1)}h`;
    };

    const getMetricColor = (value: number, isReverse = false) => {
      const threshold = isReverse ? 70 : 30;
      if (isReverse) {
        if (value >= 90) return 'text-green-400';
        if (value >= threshold) return 'text-yellow-400';
        return 'text-red-400';
      } else {
        if (value <= 30) return 'text-green-400';
        if (value <= threshold) return 'text-yellow-400';
        return 'text-red-400';
      }
    };

    return (
      <Card className={`bg-gray-900/60 border-gray-700/50 ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              System Performance
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={`${systemHealth.bgColor} ${systemHealth.color} border-0`}>
                {systemHealth.status.toUpperCase()}
              </Badge>
              <Button
                onClick={onRefresh}
                size="sm"
                variant="ghost"
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Resource Usage */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Resource Usage
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">CPU</span>
                  <span className={`text-sm font-medium ${getMetricColor(metrics.cpu)}`}>
                    {metrics.cpu.toFixed(1)}%
                  </span>
                </div>
                <Progress value={metrics.cpu} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Memory</span>
                  <span className={`text-sm font-medium ${getMetricColor(metrics.memory)}`}>
                    {metrics.memory.toFixed(1)}%
                  </span>
                </div>
                <Progress value={metrics.memory} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Disk I/O</span>
                  <span className={`text-sm font-medium ${getMetricColor(metrics.disk)}`}>
                    {metrics.disk.toFixed(1)}%
                  </span>
                </div>
                <Progress value={metrics.disk} className="h-2" />
              </div>
            </div>

            {/* Network & Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Network</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-white">
                    {metrics.activeConnections} connections
                  </div>
                  <div className={`text-xs ${getMetricColor(metrics.network)}`}>
                    {metrics.network.toFixed(1)}% usage
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-400">Response Time</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-white">{metrics.responseTime}ms</div>
                  <div
                    className={`text-xs ${metrics.responseTime < 100 ? 'text-green-400' : metrics.responseTime < 300 ? 'text-yellow-400' : 'text-red-400'}`}
                  >
                    {metrics.responseTime < 100
                      ? 'Excellent'
                      : metrics.responseTime < 300
                        ? 'Good'
                        : 'Slow'}
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                System Status
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-white font-medium">{formatUptime(metrics.uptime)}</div>
                  <div className="text-gray-400">Uptime</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-green-400 font-medium">
                    {metrics.successRate.toFixed(1)}%
                  </div>
                  <div className="text-gray-400">Success Rate</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-red-400 font-medium">{metrics.errors}</div>
                  <div className="text-gray-400">Errors/hr</div>
                </div>
              </div>
            </div>

            {/* Health Score */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Overall Health</span>
                <span className={`text-lg font-bold ${systemHealth.color}`}>
                  {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                System is{' '}
                {systemHealth.status === 'excellent'
                  ? 'performing optimally'
                  : systemHealth.status === 'good'
                    ? 'running smoothly'
                    : systemHealth.status === 'warning'
                      ? 'experiencing minor issues'
                      : 'requires immediate attention'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
