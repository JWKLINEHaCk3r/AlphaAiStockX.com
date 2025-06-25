'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  CalendarIcon,
  Play,
  BarChart3,
  TrendingUp,
  Target,
  DollarSign,
  Activity,
  Zap,
} from 'lucide-react';
import { format } from 'date-fns';

export default function BacktestingEngine() {
  const [backtestResults, setBacktestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backtestConfig, setBacktestConfig] = useState({
    strategy: 'ai-pattern-recognition',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2024-01-01'),
    initialCapital: 100000,
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'],
    timeframe: '1D',
    commission: 0.001,
    slippage: 0.001,
    maxPositionSize: 0.1,
    riskPerTrade: 0.02,
    stopLoss: 0.05,
    takeProfit: 0.1,
  });

  const strategies = [
    { id: 'ai-pattern-recognition', name: 'AI Pattern Recognition', type: 'AI', winRate: 73.5 },
    { id: 'momentum-breakout', name: 'Momentum Breakout', type: 'Technical', winRate: 68.2 },
    { id: 'mean-reversion', name: 'Mean Reversion', type: 'Statistical', winRate: 65.8 },
    { id: 'rsi-divergence', name: 'RSI Divergence', type: 'Technical', winRate: 71.3 },
    { id: 'bollinger-bands', name: 'Bollinger Bands', type: 'Technical', winRate: 64.7 },
    { id: 'macd-crossover', name: 'MACD Crossover', type: 'Technical', winRate: 62.4 },
    {
      id: 'fibonacci-retracement',
      name: 'Fibonacci Retracement',
      type: 'Technical',
      winRate: 69.1,
    },
    { id: 'support-resistance', name: 'Support/Resistance', type: 'Technical', winRate: 66.9 },
    { id: 'harmonic-patterns', name: 'Harmonic Patterns', type: 'Advanced', winRate: 78.2 },
    { id: 'elliott-wave', name: 'Elliott Wave', type: 'Advanced', winRate: 72.6 },
  ];

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            generateBacktestResults();
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const generateBacktestResults = () => {
    const strategy = strategies.find(s => s.id === backtestConfig.strategy);
    const totalTrades = Math.floor(Math.random() * 500) + 200;
    const winningTrades = Math.floor(totalTrades * (strategy.winRate / 100));
    const losingTrades = totalTrades - winningTrades;

    const avgWin = 0.08 + Math.random() * 0.12; // 8-20% average win
    const avgLoss = -(0.03 + Math.random() * 0.07); // 3-10% average loss

    const totalReturn = winningTrades * avgWin + losingTrades * avgLoss;
    const finalCapital = backtestConfig.initialCapital * (1 + totalReturn);

    const results = {
      strategy: strategy.name,
      period: `${format(backtestConfig.startDate, 'MMM dd, yyyy')} - ${format(backtestConfig.endDate, 'MMM dd, yyyy')}`,
      initialCapital: backtestConfig.initialCapital,
      finalCapital,
      totalReturn: totalReturn * 100,
      totalTrades,
      winningTrades,
      losingTrades,
      winRate: (winningTrades / totalTrades) * 100,
      avgWin: avgWin * 100,
      avgLoss: avgLoss * 100,
      profitFactor: Math.abs((winningTrades * avgWin) / (losingTrades * avgLoss)),
      sharpeRatio: 1.2 + Math.random() * 1.8,
      maxDrawdown: -(5 + Math.random() * 15),
      calmarRatio: 0.8 + Math.random() * 1.2,
      sortinoRatio: 1.5 + Math.random() * 2.0,
      volatility: 15 + Math.random() * 25,
      beta: 0.7 + Math.random() * 0.8,
      alpha: -2 + Math.random() * 8,
      tradingDays: 252,
      avgHoldingPeriod: 3 + Math.random() * 12,
      largestWin: 15 + Math.random() * 25,
      largestLoss: -(8 + Math.random() * 12),
      consecutiveWins: Math.floor(Math.random() * 8) + 3,
      consecutiveLosses: Math.floor(Math.random() * 5) + 2,
      monthlyReturns: Array.from({ length: 12 }, () => -10 + Math.random() * 25),
      equityCurve: Array.from({ length: 252 }, (_, i) => {
        const baseReturn = totalReturn / 252;
        const dailyReturn = baseReturn + (Math.random() - 0.5) * 0.02;
        return backtestConfig.initialCapital * Math.pow(1 + dailyReturn, i + 1);
      }),
    };

    setBacktestResults(results);
  };

  const runBacktest = () => {
    setIsRunning(true);
    setProgress(0);
    setBacktestResults(null);
  };

  const getReturnColor = value => {
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Backtesting Configuration */}
      <Card className="bg-gray-900/90 border-red-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-red-400" />
            Point-and-Click Backtesting Engine
            <Badge className="ml-3 bg-gradient-to-r from-red-500 to-orange-600">
              <Zap className="h-3 w-3 mr-1" />
              Advanced Analytics
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strategy Configuration */}
            <div className="space-y-4">
              <h3 className="text-gray-200 font-semibold">Strategy Configuration</h3>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Trading Strategy</label>
                <Select
                  value={backtestConfig.strategy}
                  onValueChange={value => setBacktestConfig(prev => ({ ...prev, strategy: value }))}
                >
                  <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {strategies.map(strategy => (
                      <SelectItem key={strategy.id} value={strategy.id}>
                        <div>
                          <div className="font-medium">{strategy.name}</div>
                          <div className="text-xs text-gray-400">
                            {strategy.type} • Win Rate: {strategy.winRate}%
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Timeframe</label>
                <Select
                  value={backtestConfig.timeframe}
                  onValueChange={value =>
                    setBacktestConfig(prev => ({ ...prev, timeframe: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="1M">1 Minute</SelectItem>
                    <SelectItem value="5M">5 Minutes</SelectItem>
                    <SelectItem value="15M">15 Minutes</SelectItem>
                    <SelectItem value="1H">1 Hour</SelectItem>
                    <SelectItem value="4H">4 Hours</SelectItem>
                    <SelectItem value="1D">1 Day</SelectItem>
                    <SelectItem value="1W">1 Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Initial Capital</label>
                <Input
                  type="number"
                  value={backtestConfig.initialCapital}
                  onChange={e =>
                    setBacktestConfig(prev => ({
                      ...prev,
                      initialCapital: Number.parseInt(e.target.value),
                    }))
                  }
                  className="bg-gray-800/30 border-red-500/30 text-gray-200"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-gray-200 font-semibold">Backtest Period</h3>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800/30 border-red-500/30 text-gray-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(backtestConfig.startDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
                    <Calendar
                      mode="single"
                      selected={backtestConfig.startDate}
                      onSelect={date => setBacktestConfig(prev => ({ ...prev, startDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800/30 border-red-500/30 text-gray-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(backtestConfig.endDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
                    <Calendar
                      mode="single"
                      selected={backtestConfig.endDate}
                      onSelect={date => setBacktestConfig(prev => ({ ...prev, endDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-gray-200 text-sm font-medium">Commission</label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={backtestConfig.commission}
                    onChange={e =>
                      setBacktestConfig(prev => ({
                        ...prev,
                        commission: Number.parseFloat(e.target.value),
                      }))
                    }
                    className="bg-gray-800/30 border-red-500/30 text-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-200 text-sm font-medium">Slippage</label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={backtestConfig.slippage}
                    onChange={e =>
                      setBacktestConfig(prev => ({
                        ...prev,
                        slippage: Number.parseFloat(e.target.value),
                      }))
                    }
                    className="bg-gray-800/30 border-red-500/30 text-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="space-y-4">
              <h3 className="text-gray-200 font-semibold">Risk Management</h3>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Max Position Size (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={backtestConfig.maxPositionSize * 100}
                  onChange={e =>
                    setBacktestConfig(prev => ({
                      ...prev,
                      maxPositionSize: Number.parseFloat(e.target.value) / 100,
                    }))
                  }
                  className="bg-gray-800/30 border-red-500/30 text-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Risk Per Trade (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={backtestConfig.riskPerTrade * 100}
                  onChange={e =>
                    setBacktestConfig(prev => ({
                      ...prev,
                      riskPerTrade: Number.parseFloat(e.target.value) / 100,
                    }))
                  }
                  className="bg-gray-800/30 border-red-500/30 text-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-gray-200 text-sm font-medium">Stop Loss (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={backtestConfig.stopLoss * 100}
                    onChange={e =>
                      setBacktestConfig(prev => ({
                        ...prev,
                        stopLoss: Number.parseFloat(e.target.value) / 100,
                      }))
                    }
                    className="bg-gray-800/30 border-red-500/30 text-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-200 text-sm font-medium">Take Profit (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={backtestConfig.takeProfit * 100}
                    onChange={e =>
                      setBacktestConfig(prev => ({
                        ...prev,
                        takeProfit: Number.parseFloat(e.target.value) / 100,
                      }))
                    }
                    className="bg-gray-800/30 border-red-500/30 text-gray-200"
                  />
                </div>
              </div>

              <Button
                onClick={runBacktest}
                disabled={isRunning}
                className="w-full bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? 'Running Backtest...' : 'Run Backtest'}
              </Button>

              {isRunning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backtest Results */}
      {backtestResults && (
        <>
          {/* Performance Overview */}
          <Card className="bg-gray-900/90 border-green-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-400" />
                Backtest Results - {backtestResults.strategy}
                <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-600">
                  {backtestResults.period}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Total Return</p>
                  <p className={`text-lg font-bold ${getReturnColor(backtestResults.totalReturn)}`}>
                    {backtestResults.totalReturn.toFixed(2)}%
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <Target className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <p className="text-lg font-bold text-blue-400">
                    {backtestResults.winRate.toFixed(1)}%
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <Activity className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Sharpe Ratio</p>
                  <p className="text-lg font-bold text-purple-400">
                    {backtestResults.sharpeRatio.toFixed(2)}
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <BarChart3 className="h-6 w-6 text-red-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Max Drawdown</p>
                  <p className="text-lg font-bold text-red-400">
                    {backtestResults.maxDrawdown.toFixed(2)}%
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Final Capital</p>
                  <p className="text-lg font-bold text-yellow-400">
                    ${backtestResults.finalCapital.toLocaleString()}
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <Target className="h-6 w-6 text-orange-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Total Trades</p>
                  <p className="text-lg font-bold text-orange-400">{backtestResults.totalTrades}</p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <Activity className="h-6 w-6 text-indigo-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Profit Factor</p>
                  <p className="text-lg font-bold text-indigo-400">
                    {backtestResults.profitFactor.toFixed(2)}
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-green-500/20">
                  <Zap className="h-6 w-6 text-pink-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Calmar Ratio</p>
                  <p className="text-lg font-bold text-pink-400">
                    {backtestResults.calmarRatio.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <Card className="bg-gray-900/90 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100">Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Trade Statistics */}
                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Trade Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Winning Trades:</span>
                      <span className="text-green-400 font-semibold">
                        {backtestResults.winningTrades}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Losing Trades:</span>
                      <span className="text-red-400 font-semibold">
                        {backtestResults.losingTrades}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Win:</span>
                      <span className="text-green-400 font-semibold">
                        {backtestResults.avgWin.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Loss:</span>
                      <span className="text-red-400 font-semibold">
                        {backtestResults.avgLoss.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Largest Win:</span>
                      <span className="text-green-400 font-semibold">
                        {backtestResults.largestWin.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Largest Loss:</span>
                      <span className="text-red-400 font-semibold">
                        {backtestResults.largestLoss.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Risk Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sortino Ratio:</span>
                      <span className="text-blue-400 font-semibold">
                        {backtestResults.sortinoRatio.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Volatility:</span>
                      <span className="text-yellow-400 font-semibold">
                        {backtestResults.volatility.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Beta:</span>
                      <span className="text-purple-400 font-semibold">
                        {backtestResults.beta.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Alpha:</span>
                      <span className={`font-semibold ${getReturnColor(backtestResults.alpha)}`}>
                        {backtestResults.alpha.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Consecutive Wins:</span>
                      <span className="text-green-400 font-semibold">
                        {backtestResults.consecutiveWins}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Consecutive Losses:</span>
                      <span className="text-red-400 font-semibold">
                        {backtestResults.consecutiveLosses}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trading Metrics */}
                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Trading Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trading Days:</span>
                      <span className="text-gray-200 font-semibold">
                        {backtestResults.tradingDays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Holding Period:</span>
                      <span className="text-gray-200 font-semibold">
                        {backtestResults.avgHoldingPeriod.toFixed(1)} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trades per Month:</span>
                      <span className="text-gray-200 font-semibold">
                        {(backtestResults.totalTrades / 12).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Initial Capital:</span>
                      <span className="text-gray-200 font-semibold">
                        ${backtestResults.initialCapital.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Final Capital:</span>
                      <span
                        className={`font-semibold ${getReturnColor(backtestResults.totalReturn)}`}
                      >
                        ${backtestResults.finalCapital.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Net Profit:</span>
                      <span
                        className={`font-semibold ${getReturnColor(backtestResults.totalReturn)}`}
                      >
                        $
                        {(
                          backtestResults.finalCapital - backtestResults.initialCapital
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
