import { Alert } from "../../../components/ui/alert";
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import {
  AIStockPrediction,;
  SportsEvent,;
  TradingOpportunity,;
  Trade,;
  Trader,;
  VisionModel,;
  AnalysisResult,;
  BankAccount,;
  Transaction,;
  TradingSignalData,;
  ChartPattern,;
  TechnicalIndicators,;
  RiskAnalysis,;
  SectorPerformance,;
  BacktestStrategy,;
  AIWhiteLabelMetrics,;
  MarketClassification,;
  TradingRecommendation,;
  StockAnalysis,;
  RealtimeData,;
  VolumeProfile,;
  AIAnalysisComponents,;
  CryptoData,;
  DeFiProtocol,;
  NFTCollection,;
  UserProfile,;
  ThemeOption,;
  AccentColor,;
  SubscriptionPlan,;
  TradingStrategy,;
  ScanResult,;
  SiteDiagnostic,;
  Alert,;
  NewsAnalysis,;
  SocialPlatform,;
  Influencer,;
  SocialPost,;
  DeepLearningModel,;
  MarketPattern,;
} from '../../types/trading-types';\n\nimport { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,;
  TrendingDown,;
  DollarSign,;
  Activity,;
  Brain,;
  Zap,;
  AlertTriangle,;
  CheckCircle,;
  Clock,;
  BarChart3,;
} from 'lucide-react';

interface TradingSignal {






















  symbol: string;
  signal: string;
  confidence: number;
  price: number;
  timestamp: string;
  indicators?: {
    rsi: number;
    macd: number;
    bb_position: number;
    volume_momentum: number;
  





















};
}

interface PortfolioStatus {






















  account_value: number;
  cash: number;
  total_pnl: number;
  total_pnl_percent: number;
  active_positions: number;
  total_trades: number;






















}

interface Position {






















  symbol: string;
  quantity: number;
  avg_price: number;
  market_value: number;
  unrealized_pnl: number;
  created_at: string;






















}

interface PerformanceMetrics {






















  total_signals_generated: number;
  total_trades_executed: number;
  successful_trades: number;
  failed_trades: number;
  win_rate: number;
  total_pnl: number;
  runtime_hours: number;
  signals_per_hour: number;






















}

export default function LiveAITradingDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [tradingActive, setTradingActive] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioStatus | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [recentSignals, setRecentSignals] = useState<TradingSignal[]>([]);
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [marketData, setMarketData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // WebSocket connection for real-time updates;
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/trading-updates');

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event: any) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'trading_update') {
          setPortfolio(data.portfolio_status);
          setPerformance(data.performance_metrics);
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error: any) => {
      setError('WebSocket connection failed');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Fetch initial data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch portfolio status;
        const portfolioResponse = await fetch('http://localhost:8000/api/status');
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          setPortfolio(portfolioData);
        }

        // Fetch positions;
        const positionsResponse = await fetch('http://localhost:8000/api/positions');
        if (positionsResponse.ok) {
          const positionsData = await positionsResponse.json();
          setPositions(positionsData);
        }

        // Fetch recent signals;
        const signalsResponse = await fetch('http://localhost:8000/api/signals/recent');
        if (signalsResponse.ok) {
          const signalsData = await signalsResponse.json();
          setRecentSignals(signalsData);
        }

        // Fetch performance metrics;
        const performanceResponse = await fetch('http://localhost:8000/api/performance');
        if (performanceResponse.ok) {
          const performanceData = await performanceResponse.json();
          setPerformance(performanceData);
        }

        setTradingActive(true);
      } catch (err) {
        setError('Failed to fetch trading data');
        console.error('Data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up polling for data that doesn't come through WebSocket;
    const interval = setInterval(() => {
      fetchData();
    }, 30000); // Update every 30 seconds;
    return () => clearInterval(interval);
  }, []);

  const handleStartTrading = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/system/start', {
        method: 'POST',;
      });

      if (response.ok) {
        setTradingActive(true);
      }
    } catch (err) {
      setError('Failed to start trading system');
    }
  };

  const handleStopTrading = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/system/stop', {
        method: 'POST',;
      });

      if (response.ok) {
        setTradingActive(false);
      }
    } catch (err) {
      setError('Failed to stop trading system');
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'STRONG_BUY':;
        return 'bg-green-500';
      case 'BUY':;
        return 'bg-green-400';
      case 'STRONG_SELL':;
        return 'bg-red-500';
      case 'SELL':;
        return 'bg-red-400';
      default:;
        return 'bg-gray-400';
    }
  };

  const getSignalIcon = (signal: string) => {
    return signal.includes('BUY') ? (;
      <TrendingUp className="w-4 h-4" />;
    ) : signal.includes('SELL') ? (;
      <TrendingDown className="w-4 h-4" />;
    ) : (;
      <Activity className="w-4 h-4" />;
    );
  };

  if (isLoading) {
    return (;
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">;
        <div className="max-w-7xl mx-auto">;
          <div className="flex items-center justify-center h-64">;
            <div className="text-center">;
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>;
              <p className="text-white text-lg">Loading AI Trading System...</p>;
            </div>;
          </div>;
        </div>;
      </div>;
    );
  }

  return (;
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">;
      <div className="max-w-7xl mx-auto space-y-6">;
        {/* Header */}
        <div className="flex justify-between items-start">;
          <div>;
            <h1 className="text-4xl font-bold text-white mb-2">🤖 AlphaAI Live Trading System</h1>;
            <p className="text-purple-200">;
              Advanced AI-powered automated trading with real-time market analysis;
            </p>;
          </div>;
          <div className="flex items-center space-x-4">;
            {/* System Status */}
            <div className="flex items-center space-x-2">;
              <div;
                className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}
              />;
              <span className="text-white text-sm">;
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>;
            </div>;
            {/* Trading Controls */}
            <Button;
              onClick={tradingActive ? handleStopTrading : handleStartTrading}
              className={
                tradingActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';
              }
            >;
              {tradingActive ? 'Stop Trading' : 'Start Trading'}
            </Button>;
          </div>;
        </div>;
        {/* Error Display */}
        {error && (;
          <Card className="border-red-500 bg-red-500/10">;
            <CardContent className="p-4">;
              <div className="flex items-center space-x-2 text-red-400">;
                <AlertTriangle className="w-5 h-5" />;
                <span>{error}</span>;
              </div>;
            </CardContent>;
          </Card>;
        )}

        {/* Portfolio Overview */}
        {portfolio && (;
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">;
            <Card className="bg-gray-800/50 border-gray-700">;
              <CardHeader className="pb-3">;
                <CardTitle className="text-white flex items-center space-x-2">;
                  <DollarSign className="w-5 h-5 text-green-400" />;
                  <span>Portfolio Value</span>;
                </CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="text-2xl font-bold text-white">;
                  ${portfolio.account_value.toLocaleString()}
                </div>;
                <div;
                  className={`text-sm ${portfolio.total_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >;
                  {portfolio.total_pnl >= 0 ? '+' : ''}${portfolio.total_pnl.toFixed(2)}(;
                  {portfolio.total_pnl_percent.toFixed(2)}%);
                </div>;
              </CardContent>;
            </Card>;
            <Card className="bg-gray-800/50 border-gray-700">;
              <CardHeader className="pb-3">;
                <CardTitle className="text-white flex items-center space-x-2">;
                  <Activity className="w-5 h-5 text-blue-400" />;
                  <span>Active Positions</span>;
                </CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="text-2xl font-bold text-white">{portfolio.active_positions}</div>;
                <div className="text-sm text-gray-400">Total Trades: {portfolio.total_trades}</div>;
              </CardContent>;
            </Card>;
            <Card className="bg-gray-800/50 border-gray-700">;
              <CardHeader className="pb-3">;
                <CardTitle className="text-white flex items-center space-x-2">;
                  <Brain className="w-5 h-5 text-purple-400" />;
                  <span>AI Performance</span>;
                </CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="text-2xl font-bold text-white">;
                  {performance ? `${(performance.win_rate * 100).toFixed(1)}%` : 'N/A'}
                </div>;
                <div className="text-sm text-gray-400">Win Rate</div>;
              </CardContent>;
            </Card>;
            <Card className="bg-gray-800/50 border-gray-700">;
              <CardHeader className="pb-3">;
                <CardTitle className="text-white flex items-center space-x-2">;
                  <Zap className="w-5 h-5 text-yellow-400" />;
                  <span>System Status</span>;
                </CardTitle>;
              </CardHeader>;
              <CardContent>;
                <div className="flex items-center space-x-2">;
                  {tradingActive ? (;
                    <>;
                      <CheckCircle className="w-5 h-5 text-green-400" />;
                      <span className="text-green-400">Active</span>;
                    </>;
                  ) : (;
                    <>;
                      <Clock className="w-5 h-5 text-yellow-400" />;
                      <span className="text-yellow-400">Inactive</span>;
                    </>;
                  )}
                </div>;
                <div className="text-sm text-gray-400">;
                  {performance;
                    ? `${performance.signals_per_hour.toFixed(1)} signals/hr`;
                    : 'No data'}
                </div>;
              </CardContent>;
            </Card>;
          </div>;
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
          {/* Recent AI Signals */}
          <Card className="bg-gray-800/50 border-gray-700">;
            <CardHeader>;
              <CardTitle className="text-white flex items-center space-x-2">;
                <Brain className="w-5 h-5 text-purple-400" />;
                <span>Recent AI Signals</span>;
              </CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="space-y-3">;
                {recentSignals.length > 0 ? (;
                  recentSignals.slice(0, 5).map((signal, index) => (;
                    <div;
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg";
                    >;
                      <div className="flex items-center space-x-3">;
                        <Badge;
                          className={`${getSignalColor(signal.action || signal.signal)} text-white`}
                        >;
                          {getSignalIcon(signal.action || signal.signal)}
                          <span className="ml-1">{signal.symbol}</span>;
                        </Badge>;
                        <div>;
                          <div className="text-white font-medium">;
                            {signal.action || signal.signal}
                          </div>;
                          <div className="text-sm text-gray-400">;
                            Confidence: {((signal.confidence || 0) * 100).toFixed(1)}%;
                          </div>;
                        </div>;
                      </div>;
                      <div className="text-right">;
                        <div className="text-white">${(signal.price || 0).toFixed(2)}</div>;
                        <div className="text-xs text-gray-400">;
                          {new Date(signal.timestamp).toLocaleTimeString()}
                        </div>;
                      </div>;
                    </div>;
                  ));
                ) : (;
                  <div className="text-center text-gray-400 py-8">;
                    <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />;
                    <p>No recent signals</p>;
                  </div>;
                )}
              </div>;
            </CardContent>;
          </Card>;
          {/* Current Positions */}
          <Card className="bg-gray-800/50 border-gray-700">;
            <CardHeader>;
              <CardTitle className="text-white flex items-center space-x-2">;
                <BarChart3 className="w-5 h-5 text-blue-400" />;
                <span>Current Positions</span>;
              </CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="space-y-3">;
                {positions.length > 0 ? (;
                  positions.map((position, index) => (;
                    <div;
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg";
                    >;
                      <div>;
                        <div className="text-white font-medium">{position.symbol}</div>;
                        <div className="text-sm text-gray-400">;
                          {position.quantity} shares @ ${position.avg_price.toFixed(2)}
                        </div>;
                      </div>;
                      <div className="text-right">;
                        <div className="text-white">${position.market_value.toFixed(2)}</div>;
                        <div;
                          className={`text-sm ${position.unrealized_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >;
                          {position.unrealized_pnl >= 0 ? '+' : ''}$;
                          {position.unrealized_pnl.toFixed(2)}
                        </div>;
                      </div>;
                    </div>;
                  ));
                ) : (;
                  <div className="text-center text-gray-400 py-8">;
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />;
                    <p>No active positions</p>;
                  </div>;
                )}
              </div>;
            </CardContent>;
          </Card>;
        </div>;
        {/* Performance Metrics */}
        {performance && (;
          <Card className="bg-gray-800/50 border-gray-700">;
            <CardHeader>;
              <CardTitle className="text-white flex items-center space-x-2">;
                <TrendingUp className="w-5 h-5 text-green-400" />;
                <span>AI Performance Analytics</span>;
              </CardTitle>;
            </CardHeader>;
            <CardContent>;
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">;
                <div className="text-center">;
                  <div className="text-2xl font-bold text-white">;
                    {performance.total_signals_generated}
                  </div>;
                  <div className="text-sm text-gray-400">Signals Generated</div>;
                </div>;
                <div className="text-center">;
                  <div className="text-2xl font-bold text-white">;
                    {performance.total_trades_executed}
                  </div>;
                  <div className="text-sm text-gray-400">Trades Executed</div>;
                </div>;
                <div className="text-center">;
                  <div className="text-2xl font-bold text-green-400">;
                    {performance.successful_trades}
                  </div>;
                  <div className="text-sm text-gray-400">Successful Trades</div>;
                </div>;
                <div className="text-center">;
                  <div className="text-2xl font-bold text-purple-400">;
                    {performance.runtime_hours.toFixed(1)}h;
                  </div>;
                  <div className="text-sm text-gray-400">Runtime</div>;
                </div>;
              </div>;
              <div className="mt-6">;
                <div className="flex justify-between items-center mb-2">;
                  <span className="text-white">Win Rate</span>;
                  <span className="text-white">{(performance.win_rate * 100).toFixed(1)}%</span>;
                </div>;
                <Progress value={performance.win_rate * 100} className="h-2" />;
              </div>;
            </CardContent>;
          </Card>;
        )}
      </div>;
    </div>;
  );
}
