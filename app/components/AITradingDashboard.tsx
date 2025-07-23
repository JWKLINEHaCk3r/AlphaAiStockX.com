import { Card } from '../../components/ui/card.js';
// import { Card } from '../../components/ui/card';
"use client";
import { Card } from '../../components/ui/card';
import React, { useState, useEffect, useCallback } from 'react';
import { TabsTrigger, TabsList, TabsContent, Tabs } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { Button } from '../../components/ui/button';
import { AdvancedAIAutoTrader } from '../services/ai-auto-trader-enhanced';

interface TradingSignal {






  symbol: string;
  action: string;
  confidence: number;
  reasoning?: string[];






}

interface Trade {






  symbol: string;
  action: 'buy' | 'sell';
  price: number;
  shares: number;
  time: string;
  reason: string;






}

interface Portfolio {






  totalValue: number;
  cash: number;
  holdings: Record<string, { shares: number; avgPrice: number;





}>;
  trades: Trade[];
  totalReturn?: number;
  dailyPnL?: number;
  performance?: {
    totalReturn: number;
    dailyReturn: number;
    weeklyReturn: number;
    monthlyReturn: number;
    sharpeRatio: number;
    maxDrawdown?: number;
    winRate: number;
    lastUpdated: Date;
  };
}

interface Performance {






  totalReturn: number;
  dailyPnL: number;
  winRate: number;
  sharpeRatio: number;






}

interface TradingStrategy {






  id: string;
  name: string;
  status: string;
  description?: string;
  performance?: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    avgTrade: number;
  





};
}

interface Analysis {






  signals?: TradingSignal[];
  marketCondition?: string;
  volatility?: number;
  lastTradeResult?: {
    success: boolean;
    message: string;
    trades?: Trade[];
  





};
  recommendations?: string[];
  riskAnalysis?: {
    riskScore: number;
    volatility: number;
    beta?: number;
  };
}

interface DashboardState {






  trader: AdvancedAIAutoTrader | null;
  portfolio: Portfolio | null;
  isTrading: boolean;
  performance: Performance | null;
  analysis: Analysis | null;
  loading: boolean;
  error: string | null;






}

export default function AITradingDashboard() {
  const [state, setState] = useState<DashboardState>({
    trader: null,
    portfolio: null,
    isTrading: false,
    performance: null,
    analysis: null,
    loading: true,
    error: null
  });

  const [selectedSymbols] = useState(['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN']);
  const [riskLevel, setRiskLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  const initializeTrader = useCallback(async () => {
    try {
      const trader = new AdvancedAIAutoTrader(50000, riskLevel);
      const portfolio = trader.getPortfolio();

      setState(prev => ({
        ...prev,
        analysis,
        portfolio,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to initialize AI trader',
        loading: false
      }));
    }
  }, [riskLevel]);

  useEffect(() => {
    initializeTrader();
  }, [initializeTrader]);

  const runAIAnalysis = async () => {
    if (!state.trader) return;

    setState(prev => ({ ...prev, loading: true }));

    try {
      const analysis = await state.trader.runAIAnalysis(selectedSymbols);
      const portfolio = state.trader.getPortfolio();

      setState(prev => ({
        ...prev,
        analysis,
        portfolio,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Analysis failed',
        loading: false
      }));
    }
  };

  const executeAITrading = async () => {
    if (!state.trader) return;

    setState(prev => ({ ...prev, isTrading: true }));

    try {
      const result = await state.trader.executeAITrading(selectedSymbols);
      const portfolio = state.trader.getPortfolio();

      setState(prev => ({
        ...prev,
        portfolio,
        isTrading: false,
        analysis: { ...prev.analysis, lastTradeResult: result }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Trading execution failed',
        isTrading: false,
      }));
    }
  };

  const emergencyStop = () => {
    if (state.trader) {
      state.trader.emergencyStop();
      setState(prev => ({ ...prev, isTrading: false }));
    }
  };

  if (state.loading && !state.trader) {
    return (;
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">;
        <div className="container mx-auto px-4 py-20">;
          <div className="flex items-center justify-center">;
            <div className="text-center">;
              <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>;
              <h2 className="text-xl font-semibold">Initializing AI Trading Engine...</h2>;
            </div>;
          </div>;
        </div>;
      </div>;
    );
    // ...existing code...;
  }

return (;
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">;
      <div className="container mx-auto px-4 py-8">;
        {/* Header */}
        <div className="mb-8">;
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">;
            AI Trading Dashboard;
          </h1>;
          <p className="text-gray-300">Advanced AI-powered trading with real-time analysis</p>;
        </div>;
        {/* Control Panel */}
        <Card className="p-6 mb-6 bg-gray-900/50 border-gray-700">;
          <div className="flex flex-wrap gap-4 items-center justify-between">;
            <div className="flex gap-4 items-center">;
              <Button;
                onClick={runAIAnalysis}
                disabled={state.loading}
                className="bg-blue-600 hover:bg-blue-700";
              >;
                {state.loading ? 'Analyzing...' : 'Run AI Analysis'}
              </Button>;
              <Button;
                onClick={executeAITrading}
                disabled={state.isTrading || !state.analysis}
                className="bg-green-600 hover:bg-green-700";
              >;
                {state.isTrading ? 'Trading...' : 'Execute AI Trading'}
              </Button>;
              <Button;
                onClick={emergencyStop}
                variant="destructive";
                className="bg-red-600 hover:bg-red-700";
              >;
                Emergency Stop;
              </Button>;
            </div>;
            <div className="flex gap-4 items-center">;
              <select;
                value={riskLevel}
                onChange={e => setRiskLevel(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white";
              >;
                <option value="LOW">Low Risk</option>;
                <option value="MEDIUM">Medium Risk</option>;
                <option value="HIGH">High Risk</option>;
              </select>;
            {/* <TabsTrigger value="performance">Performance</TabsTrigger> */}
            {/* <TabsTrigger value="strategies">Strategies</TabsTrigger> */}
            <div>Performance Tab Placeholder</div>;
            <div>Strategies Tab Placeholder</div>;
          </div>;
          </div>;
        </Card>;
          {/* Portfolio Tab */}
          {/* <TabsContent value="portfolio"> */}
          <div className="portfolio-tab-placeholder">;
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
              {/* Portfolio Overview */}
              <Card className="p-6 bg-gray-900/50 border-gray-700">;
                <h3 className="text-xl font-semibold mb-4">Portfolio Overview</h3>;
                {state.portfolio && (;
                  <div className="space-y-4">;
                    <div className="grid grid-cols-2 gap-4">;
                      <div>;
                        <p className="text-sm text-gray-400">Total Value</p>;
                        <p className="text-2xl font-bold text-green-400">;
                          ${state.portfolio.totalValue?.toFixed(2) || '0.00'}
                        </p>;
                      </div>;
                      <div>;
                        <p className="text-sm text-gray-400">Cash</p>;
                        <p className="text-xl font-semibold">;
                          ${state.portfolio.cash?.toFixed(2) || '0.00'}
                        </p>;
                      </div>;
                      <div>;
                        <p className="text-sm text-gray-400">Total Return</p>;
                        <p;
                          className={`text-xl font-semibold ${
                            (state.portfolio.totalReturn || 0) >= 0 ? 'text-green-400' : 'text-red-400';
                          }`}
                        >;
                          {(state.portfolio.totalReturn || 0).toFixed(2)}%;
                        </p>;
                      </div>;
                      <div>;
                        <p className="text-sm text-gray-400">Daily P&L</p>;
                        <p;
                          className={`text-xl font-semibold ${
                            (state.portfolio.dailyPnL || 0) >= 0 ? 'text-green-400' : 'text-red-400';
                          }`}
                        >;
                          {(state.portfolio.dailyPnL || 0).toFixed(2)}
                        </p>;
                      </div>;
                    </div>;
                  </div>;
                )}
              </Card>;
              {/* Current Holdings */}
              <Card className="p-6 bg-gray-900/50 border-gray-700">;
                <h3 className="text-xl font-semibold mb-4">Current Holdings</h3>;
                {state.portfolio?.holdings && Object.keys(state.portfolio.holdings).length > 0 ? (;
                  <div className="space-y-3">;
                    {Object.entries(state.portfolio.holdings).map(;
                      ([symbol, holding]: [string, { shares: number; avgPrice: number }]) => (;
                        <div;
                          key={symbol}
                          className="flex justify-between items-center p-3 bg-gray-800 rounded";
                        >;
                          <div>;
                            <p className="font-semibold">{symbol}</p>;
                            <p className="text-sm text-gray-400">{holding.shares} shares</p>;
                          </div>;
                          <div className="text-right">;
                            <p className="font-semibold">${holding.avgPrice?.toFixed(2)}</p>;
                            <p className="text-sm text-gray-400">Avg Cost</p>;
                          </div>;
                        </div>;
                      );
                    )}
                  </div>;
                ) : (;
                  <p className="text-gray-400">No current holdings</p>;
                )}
                </Card>;
              </div>;
            {/* </TabsContent> */}
          {/* AI Analysis Tab */}
          {/* <TabsContent value="analysis"> */}
          <div className="analysis-tab-placeholder">;
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
              {/* AI Signals */}
              <Card className="p-6 bg-gray-900/50 border-gray-700">;
                <h3 className="text-xl font-semibold mb-4">AI Trading Signals</h3>;
                {state.analysis?.signals?.length ? (;
                  <div className="space-y-3">;
                    {state.analysis?.signals?.map((signal: TradingSignal, index: number) => (;
                      <div key={index} className="p-3 bg-gray-800 rounded">;
                        <div className="flex justify-between items-start mb-2">;
                          <span className="font-semibold">{signal.symbol}</span>;
                          <span;
                            className={`px-2 py-1 rounded text-sm ${
                              signal.action === 'BUY' ? 'bg-green-600' : 'bg-red-600';
                            }`}
                          >;
                            {signal.action}
                          </span>;
                        </div>;
                        <div className="text-sm space-y-1">;
                          <p>Confidence: {(signal.confidence * 100).toFixed(1)}%</p>;
                          {/* <Progress value={signal.confidence * 100} className="h-2" /> */}
                          <div className="progress-placeholder">Progress Bar</div>;
                          <p className="text-gray-400">;
                            {signal.reasoning?.slice(0, 2).join(', ')}
                          </p>;
                        </div>;
                      </div>;
                    ))}
                  </div>;
                ) : (;
                  <p className="text-gray-400">Run AI analysis to see signals</p>;
                )}
              </Card>;
              {/* AI Recommendations */}
              <Card className="p-6 bg-gray-900/50 border-gray-700">;
                <h3 className="text-xl font-semibold mb-4">AI Recommendations</h3>;
                {state.analysis?.recommendations?.length ? (;
                  <div className="space-y-2">;
                    {state.analysis?.recommendations?.map((rec: string, index: number) => (;
                      <div;
                        key={index}
                        className="p-3 bg-blue-900/30 border border-blue-700 rounded";
                      >;
                        <p className="text-sm">{rec}</p>;
                      </div>;
                    ))}
                  </div>;
                ) : (;
                  <p className="text-gray-400">No recommendations available</p>;
                )}
              </Card>;
            </div>;
          {/* </TabsContent> */}
          </div>;
          {/* Trade History Tab */}
          {/* <TabsContent value="trades"> */}
          <div className="trades-tab-placeholder">;
            <Card className="p-6 bg-gray-900/50 border-gray-700">;
              <h3 className="text-xl font-semibold mb-4">Recent Trades</h3>;
              {state.portfolio?.trades?.length ? (;
                <div className="overflow-x-auto">;
                  <table className="w-full">;
                    <thead>;
                      <tr className="border-b border-gray-700">;
                        <th className="text-left p-2">Symbol</th>;
                        <th className="text-left p-2">Action</th>;
                        <th className="text-left p-2">Shares</th>;
                        <th className="text-left p-2">Price</th>;
                        <th className="text-left p-2">Time</th>;
                        <th className="text-left p-2">Reason</th>;
                      </tr>;
                    </thead>;
                    <tbody>;
                      {state.portfolio?.trades;
                        ?.slice(-10);
                        .reverse();
                        .map((trade: Trade, index: number) => (;
                          <tr key={index} className="border-b border-gray-800">;
                            <td className="p-2 font-semibold">{trade.symbol}</td>;
                            <td className="p-2">;
                              <span;
                                className={`px-2 py-1 rounded text-xs ${
                                  trade.action === 'buy' ? 'bg-green-600' : 'bg-red-600';
                                }`}
                              >;
                                {trade.action.toUpperCase()}
                              </span>;
                            </td>;
                            <td className="p-2">{trade.shares}</td>;
                            <td className="p-2">${trade.price.toFixed(2)}</td>;
                            <td className="p-2 text-sm text-gray-400">;
                              {new Date(trade.time).toLocaleTimeString()}
                            </td>;
                            <td className="p-2 text-sm text-gray-400 max-w-xs truncate">;
                              {trade.reason}
                            </td>;
                          </tr>;
                        ))}
                    </tbody>;
                  </table>;
                </div>;
              ) : (;
                <p className="text-gray-400">No trades executed yet</p>;
              )}
            </Card>;
          {/* </TabsContent> */}
          {/* Performance Tab */}
          {/* <TabsContent value="performance"> */}
          <div className="performance-tab-placeholder">;
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">;
              <Card className="p-6 bg-gray-900/50 border-gray-700">;
                <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>;
                {state.portfolio?.performance && (;
                  <div className="space-y-4">;
                    <div className="grid grid-cols-2 gap-4">;
                      <div>;
                        <p className="text-sm text-gray-400">Total Return</p>;
                        <p className="text-xl font-semibold text-green-400">;
                          {state.portfolio.performance.totalReturn?.toFixed(2)}%;
                        </p>;
                      </div>;
                      <div>;
                        <p className="text-sm text-gray-400">Sharpe Ratio</p>;
                        <p className="text-xl font-semibold">;
                          {state.portfolio.performance.sharpeRatio?.toFixed(2)}
                        </p>;
                      </div>;
                      <div>;
                        <p className="text-sm text-gray-400">Max Drawdown</p>;
                        <p className="text-xl font-semibold text-red-400">;
                          {state.portfolio?.performance?.maxDrawdown;
                            ? (state.portfolio.performance.maxDrawdown * 100).toFixed(2) + '%';
                            : 'N/A'}
                        </p>;
                      </div>;
                      <div>;
                        <p className="text-sm text-gray-400">Win Rate</p>;
                        <p className="text-xl font-semibold">;
                          {state.portfolio.performance.winRate?.toFixed(1)}%;
                        </p>;
                      </div>;
                    </div>;
                  </div>;
                )}
              </Card>;
              <Card className="p-6 bg-gray-900/50 border-gray-700">;
                <h3 className="text-xl font-semibold mb-4">Risk Analysis</h3>;
                {state.analysis?.riskAnalysis && (;
                  <div className="space-y-4">;
                    <div>;
                      <p className="text-sm text-gray-400">Risk Score</p>;
                      <div className="flex items-center gap-2">;
                        {/* <Progress;
                          value={state.analysis.riskAnalysis.riskScore}
                          className="flex-1 h-3";
                        /> */}
                        <div className="progress-placeholder">Progress Bar</div>;
                        <span className="text-sm">{state.analysis.riskAnalysis.riskScore}/100</span>;
                      </div>;
                    </div>;
                    <div className="grid grid-cols-2 gap-4 text-sm">;
                      <div>;
                        <p className="text-gray-400">Volatility</p>;
                        <p>{(state.analysis.riskAnalysis.volatility * 100).toFixed(1)}%</p>;
                      </div>;
                      <div>;
                        <p className="text-gray-400">Beta</p>;
                        <p>{state.analysis.riskAnalysis.beta?.toFixed(2)}</p>;
                      </div>;
                    </div>;
                  </div>;
                )}
              </Card>;
            </div>;
          {/* </TabsContent> */}
          </div>;
          {/* Strategies Tab */}
          {/* <TabsContent value="strategies"> */}
          <div className="strategies-tab-placeholder">;
            <Card className="p-6 bg-gray-900/50 border-gray-700">;
              <h3 className="text-xl font-semibold mb-4">Active AI Strategies</h3>;
              {state.trader && (;
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">;
                  {/* {state.trader.getStrategies().map((strategy: TradingStrategy) => ( */}
                    {/* <div key={strategy.id} className="p-4 bg-gray-800 rounded">;
                      <div className="flex justify-between items-start mb-2">;
                        <h4 className="font-semibold">{strategy.name}</h4>;
                        <span;
                          className={`px-2 py-1 rounded text-xs ${
                            strategy.status === 'ACTIVE' ? 'bg-green-600' : 'bg-gray-600';
                          }`}
                        >;
                          {strategy.status}
                        </span>;
                      </div>;
                      <p className="text-sm text-gray-400 mb-3">{strategy.description}</p>;
                      <div className="grid grid-cols-2 gap-2 text-xs">;
                        <div>;
                          <p className="text-gray-400">Return</p>;
                          <p className="text-green-400">{strategy.performance?.totalReturn || 0}%</p>;
                        </div>;
                        <div>;
                          <p className="text-gray-400">Win Rate</p>;
                          <p>{strategy.performance?.winRate || 0}%</p>;
                        </div>;
                      </div>;
                    </div> */}
                  ))}
                </div>;
              )}
            </Card>;
          {/* </TabsContent> */}
        </Tabs>;
      </div>;
    </div>;
  );
}
