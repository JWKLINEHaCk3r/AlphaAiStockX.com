import { SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
// AI Model Laboratory - Create, Train, and Deploy Custom AI Models
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Brain,
  Cpu,
  Network,
  Atom,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  Square,
  Settings,
  Eye,
  Download,
  Upload,
  Share,
  Award,
  Trophy,
  Medal,
  Star,
  Rocket,
  Activity,
  Database,
  Cloud,
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  description: string;
  type: 'LSTM' | 'Transformer' | 'GAN' | 'Ensemble' | 'CNN' | 'RNN';
  architecture: string;
  status: 'draft' | 'training' | 'testing' | 'deployed' | 'failed';
  accuracy: number;
  performance: number;
  backtestResults: BacktestResult;
  trainingData: TrainingDataConfig;
  hyperparameters: Hyperparameters;
  author: User;
  createdAt: Date;
  lastTrained: Date;
  subscribers: number;
  rating: number;
}

interface BacktestResult {
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  avgHoldingPeriod: number;
  volatility: number;
  alpha: number;
  beta: number;
}

interface TrainingDataConfig {
  symbols: string[];
  timeframe: string;
  startDate: Date;
  endDate: Date;
  features: string[];
  lookbackPeriod: number;
  predictionHorizon: number;
}

interface Hyperparameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  hiddenLayers: number;
  dropout: number;
  regularization: number;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  tier: string;
}

interface TrainingJob {
  id: string;
  modelId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  currentEpoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  estimatedTimeRemaining: number;
  startedAt: Date;
}

export default function AIModelLaboratory() {
  // State Management
  const [models, setModels] = useState<AIModel[]>([]);
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [activeTab, setActiveTab] = useState('create');
  const [isCreating, setIsCreating] = useState(false);

  // Model Creation Form State
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    type: 'LSTM' as const,
    symbols: ['AAPL', 'GOOGL', 'MSFT'],
    timeframe: '1D',
    features: ['price', 'volume', 'technical_indicators'],
    hyperparameters: {
      learningRate: 0.001,
      batchSize: 32,
      epochs: 100,
      hiddenLayers: 3,
      dropout: 0.2,
      regularization: 0.01,
    },
  });

  useEffect(() => {
    loadModels();
    loadTrainingJobs();

    // Setup real-time updates for training jobs
    const interval = setInterval(updateTrainingProgress, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadModels = async () => {
    try {
      const response = await fetch('/api/ai/models');
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error('Failed to load models:', error);
      // Fallback to mock data
      setModels([
        {
          id: '1',
          name: 'AlphaNet Pro',
          description: 'Advanced LSTM model with attention mechanism for high-frequency trading',
          type: 'LSTM',
          architecture: '4-layer LSTM with attention',
          status: 'deployed',
          accuracy: 94.2,
          performance: 23.7,
          backtestResults: {
            totalReturn: 127.5,
            sharpeRatio: 2.84,
            maxDrawdown: -8.3,
            winRate: 78.9,
            totalTrades: 1247,
            avgHoldingPeriod: 2.5,
            volatility: 15.2,
            alpha: 12.4,
            beta: 0.85,
          },
          trainingData: {
            symbols: ['AAPL', 'GOOGL', 'MSFT', 'TSLA'],
            timeframe: '1H',
            startDate: new Date('2020-01-01'),
            endDate: new Date('2024-12-31'),
            features: ['price', 'volume', 'technical_indicators', 'sentiment'],
            lookbackPeriod: 60,
            predictionHorizon: 1,
          },
          hyperparameters: {
            learningRate: 0.001,
            batchSize: 64,
            epochs: 500,
            hiddenLayers: 4,
            dropout: 0.3,
            regularization: 0.01,
          },
          author: {
            id: '1',
            username: 'alex_trader',
            avatar: '/avatars/alex.jpg',
            tier: 'ultimate',
          },
          createdAt: new Date('2024-01-15'),
          lastTrained: new Date('2024-12-20'),
          subscribers: 1247,
          rating: 4.8,
        },
        {
          id: '2',
          name: 'Quantum Predictor',
          description: 'Ensemble model combining multiple algorithms for maximum accuracy',
          type: 'Ensemble',
          architecture: 'LSTM + Transformer + CNN ensemble',
          status: 'training',
          accuracy: 91.8,
          performance: 31.2,
          backtestResults: {
            totalReturn: 89.3,
            sharpeRatio: 2.15,
            maxDrawdown: -12.1,
            winRate: 72.4,
            totalTrades: 892,
            avgHoldingPeriod: 3.2,
            volatility: 18.7,
            alpha: 8.9,
            beta: 1.12,
          },
          trainingData: {
            symbols: ['SPY', 'QQQ', 'IWM'],
            timeframe: '1D',
            startDate: new Date('2019-01-01'),
            endDate: new Date('2024-12-31'),
            features: ['price', 'volume', 'options_flow', 'news_sentiment'],
            lookbackPeriod: 30,
            predictionHorizon: 5,
          },
          hyperparameters: {
            learningRate: 0.0005,
            batchSize: 128,
            epochs: 200,
            hiddenLayers: 6,
            dropout: 0.4,
            regularization: 0.02,
          },
          author: {
            id: '2',
            username: 'quantum_dev',
            avatar: '/avatars/quantum.jpg',
            tier: 'pro',
          },
          createdAt: new Date('2024-02-10'),
          lastTrained: new Date('2024-12-22'),
          subscribers: 892,
          rating: 4.6,
        },
      ]);
    }
  };

  const loadTrainingJobs = async () => {
    try {
      const response = await fetch('/api/ai/training-jobs');
      const data = await response.json();
      setTrainingJobs(data);
    } catch (error) {
      console.error('Failed to load training jobs:', error);
      // Mock training job
      setTrainingJobs([
        {
          id: '1',
          modelId: '2',
          status: 'running',
          progress: 67,
          currentEpoch: 134,
          totalEpochs: 200,
          loss: 0.0234,
          accuracy: 91.8,
          estimatedTimeRemaining: 2340000, // 39 minutes
          startedAt: new Date(Date.now() - 3600000), // 1 hour ago
        },
      ]);
    }
  };

  const updateTrainingProgress = async () => {
    // Update training job progress
    setTrainingJobs(prev =>
      prev.map(job => {
        if (job.status === 'running') {
          const newProgress = Math.min(job.progress + Math.random() * 2, 100);
          const newEpoch = Math.floor((newProgress / 100) * job.totalEpochs);
          return {
            ...job,
            progress: newProgress,
            currentEpoch: newEpoch,
            loss: job.loss * (1 - Math.random() * 0.01),
            accuracy: job.accuracy + Math.random() * 0.1,
            estimatedTimeRemaining: Math.max(job.estimatedTimeRemaining - 5000, 0),
          };
        }
        return job;
      })
    );
  };

  const createModel = async () => {
    setIsCreating(true);
    try {
      const response = await fetch('/api/ai/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModel),
      });

      if (response.ok) {
        const model = await response.json();
        setModels(prev => [model, ...prev]);
        setActiveTab('models');
      }
    } catch (error) {
      console.error('Failed to create model:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const startTraining = async (modelId: string) => {
    try {
      const response = await fetch(`/api/ai/models/${modelId}/train`, {
        method: 'POST',
      });

      if (response.ok) {
        const job = await response.json();
        setTrainingJobs(prev => [job, ...prev]);
      }
    } catch (error) {
      console.error('Failed to start training:', error);
    }
  };

  const deployModel = async (modelId: string) => {
    try {
      const response = await fetch(`/api/ai/models/${modelId}/deploy`, {
        method: 'POST',
      });

      if (response.ok) {
        setModels(prev =>
          prev.map(model => (model.id === modelId ? { ...model, status: 'deployed' } : model))
        );
      }
    } catch (error) {
      console.error('Failed to deploy model:', error);
    }
  };

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case 'LSTM':
        return <Network className="h-5 w-5" />;
      case 'Transformer':
        return <Atom className="h-5 w-5" />;
      case 'GAN':
        return <Zap className="h-5 w-5" />;
      case 'Ensemble':
        return <Brain className="h-5 w-5" />;
      case 'CNN':
        return <Eye className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-600';
      case 'training':
        return 'bg-yellow-600';
      case 'testing':
        return 'bg-blue-600';
      case 'failed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const renderCreateModel = () => (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-400" />
            <span>Create New AI Model</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Model Name</label>
                <Input
                  value={newModel.name}
                  onChange={e => setNewModel(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., AlphaNet Pro v2"
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Model Type</label>
                <Select
                  value={newModel.type}
                  onValueChange={(value: any) => setNewModel(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LSTM">LSTM Neural Network</SelectItem>
                    <SelectItem value="Transformer">Transformer</SelectItem>
                    <SelectItem value="GAN">Generative Adversarial Network</SelectItem>
                    <SelectItem value="Ensemble">Ensemble Model</SelectItem>
                    <SelectItem value="CNN">Convolutional Neural Network</SelectItem>
                    <SelectItem value="RNN">Recurrent Neural Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Timeframe</label>
                <Select
                  value={newModel.timeframe}
                  onValueChange={value => setNewModel(prev => ({ ...prev, timeframe: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="15m">15 Minutes</SelectItem>
                    <SelectItem value="1H">1 Hour</SelectItem>
                    <SelectItem value="1D">1 Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Description</label>
                <Textarea
                  value={newModel.description}
                  onChange={e => setNewModel(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your model's strategy and approach..."
                  className="bg-slate-700 border-slate-600 h-32"
                />
              </div>
            </div>
          </div>

          {/* Trading Symbols */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Trading Symbols</label>
            <Input
              value={newModel.symbols.join(', ')}
              onChange={e =>
                setNewModel(prev => ({
                  ...prev,
                  symbols: e.target.value.split(',').map(s => s.trim().toUpperCase()),
                }))
              }
              placeholder="AAPL, GOOGL, MSFT, TSLA"
              className="bg-slate-700 border-slate-600"
            />
          </div>

          {/* Features */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Input Features</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['price', 'volume', 'technical_indicators', 'sentiment', 'options_flow', 'news'].map(
                feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newModel.features.includes(feature)}
                      onChange={e => {
                        if (e.target.checked) {
                          setNewModel(prev => ({ ...prev, features: [...prev.features, feature] }));
                        } else {
                          setNewModel(prev => ({
                            ...prev,
                            features: prev.features.filter(f => f !== feature),
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{feature.replace('_', ' ')}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Hyperparameters */}
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader>
              <CardTitle className="text-lg">Hyperparameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Learning Rate</label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={newModel.hyperparameters.learningRate}
                    onChange={e =>
                      setNewModel(prev => ({
                        ...prev,
                        hyperparameters: {
                          ...prev.hyperparameters,
                          learningRate: Number(e.target.value),
                        },
                      }))
                    }
                    className="bg-slate-600 border-slate-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Batch Size</label>
                  <Input
                    type="number"
                    value={newModel.hyperparameters.batchSize}
                    onChange={e =>
                      setNewModel(prev => ({
                        ...prev,
                        hyperparameters: {
                          ...prev.hyperparameters,
                          batchSize: Number(e.target.value),
                        },
                      }))
                    }
                    className="bg-slate-600 border-slate-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Epochs</label>
                  <Input
                    type="number"
                    value={newModel.hyperparameters.epochs}
                    onChange={e =>
                      setNewModel(prev => ({
                        ...prev,
                        hyperparameters: {
                          ...prev.hyperparameters,
                          epochs: Number(e.target.value),
                        },
                      }))
                    }
                    className="bg-slate-600 border-slate-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Hidden Layers</label>
                  <Slider
                    value={[newModel.hyperparameters.hiddenLayers]}
                    onValueChange={value =>
                      setNewModel(prev => ({
                        ...prev,
                        hyperparameters: { ...prev.hyperparameters, hiddenLayers: value[0] },
                      }))
                    }
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-center text-sm text-slate-400 mt-1">
                    {newModel.hyperparameters.hiddenLayers}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Dropout Rate</label>
                  <Slider
                    value={[newModel.hyperparameters.dropout]}
                    onValueChange={value =>
                      setNewModel(prev => ({
                        ...prev,
                        hyperparameters: { ...prev.hyperparameters, dropout: value[0] },
                      }))
                    }
                    max={0.5}
                    min={0}
                    step={0.01}
                    className="mt-2"
                  />
                  <div className="text-center text-sm text-slate-400 mt-1">
                    {newModel.hyperparameters.dropout.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Regularization</label>
                  <Slider
                    value={[newModel.hyperparameters.regularization]}
                    onValueChange={value =>
                      setNewModel(prev => ({
                        ...prev,
                        hyperparameters: { ...prev.hyperparameters, regularization: value[0] },
                      }))
                    }
                    max={0.1}
                    min={0}
                    step={0.001}
                    className="mt-2"
                  />
                  <div className="text-center text-sm text-slate-400 mt-1">
                    {newModel.hyperparameters.regularization.toFixed(3)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Button */}
          <Button
            onClick={createModel}
            disabled={isCreating || !newModel.name || !newModel.description}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isCreating ? 'Creating Model...' : 'Create AI Model'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderModels = () => (
    <div className="space-y-6">
      {/* Training Jobs */}
      {trainingJobs.length > 0 && (
        <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-orange-400" />
              <span>Active Training Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingJobs.map(job => (
                <div key={job.id} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">Model #{job.modelId}</h4>
                      <Badge className="bg-yellow-600">{job.status}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        {job.progress.toFixed(1)}%
                      </div>
                      <div className="text-sm text-slate-400">
                        Epoch {job.currentEpoch}/{job.totalEpochs}
                      </div>
                    </div>
                  </div>

                  <Progress value={job.progress} className="mb-3" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Loss</div>
                      <div className="font-semibold">{job.loss.toFixed(4)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Accuracy</div>
                      <div className="font-semibold">{job.accuracy.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Time Remaining</div>
                      <div className="font-semibold">{formatTime(job.estimatedTimeRemaining)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Started</div>
                      <div className="font-semibold">{job.startedAt.toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map(model => (
          <Card
            key={model.id}
            className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getModelTypeIcon(model.type)}
                  <span>{model.name}</span>
                </CardTitle>
                <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm">{model.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400">Accuracy</div>
                  <div className="text-xl font-bold text-green-400">{model.accuracy}%</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Performance</div>
                  <div className="text-xl font-bold text-blue-400">+{model.performance}%</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-slate-400">Sharpe Ratio</div>
                  <div className="font-semibold">{model.backtestResults.sharpeRatio}</div>
                </div>
                <div>
                  <div className="text-slate-400">Win Rate</div>
                  <div className="font-semibold">{model.backtestResults.winRate}%</div>
                </div>
                <div>
                  <div className="text-slate-400">Max DD</div>
                  <div className="font-semibold text-red-400">
                    {model.backtestResults.maxDrawdown}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={model.author.avatar}
                    alt={model.author.username}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="text-sm">{model.author.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">{model.rating}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {model.status === 'draft' && (
                  <Button size="sm" onClick={() => startTraining(model.id)} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start Training
                  </Button>
                )}
                {model.status === 'testing' && (
                  <Button
                    size="sm"
                    onClick={() => deployModel(model.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Deploy
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => setSelectedModel(model)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBacktest = () => (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            <span>Backtesting Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Advanced Backtesting</h3>
            <p className="text-slate-400 mb-6">
              Test your models against historical data with professional-grade analytics
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Coming Soon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-purple-400" />
            <span>AI Model Marketplace</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Medal className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Model Marketplace</h3>
            <p className="text-slate-400 mb-6">
              Buy, sell, and license AI trading models from top developers worldwide
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Coming Soon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI Model Laboratory
          </h1>
          <p className="text-slate-400 text-lg">
            Create, train, and deploy custom AI trading models with professional-grade tools
          </p>
        </div>

        {/* Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="create" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Create Model</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>My Models</span>
            </TabsTrigger>
            <TabsTrigger value="backtest" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Backtest</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Marketplace</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">{renderCreateModel()}</TabsContent>

          <TabsContent value="models">{renderModels()}</TabsContent>

          <TabsContent value="backtest">{renderBacktest()}</TabsContent>

          <TabsContent value="marketplace">{renderMarketplace()}</TabsContent>
        </Tabs>

        {/* Model Details Modal */}
        {selectedModel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    {getModelTypeIcon(selectedModel.type)}
                    <span>{selectedModel.name}</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedModel(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-300">{selectedModel.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="text-sm text-slate-400">Total Return</div>
                    <div className="text-xl font-bold text-green-400">
                      +{selectedModel.backtestResults.totalReturn}%
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="text-sm text-slate-400">Sharpe Ratio</div>
                    <div className="text-xl font-bold">
                      {selectedModel.backtestResults.sharpeRatio}
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="text-sm text-slate-400">Win Rate</div>
                    <div className="text-xl font-bold">
                      {selectedModel.backtestResults.winRate}%
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="text-sm text-slate-400">Total Trades</div>
                    <div className="text-xl font-bold">
                      {selectedModel.backtestResults.totalTrades}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Model Architecture</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Type</div>
                      <div>{selectedModel.type}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Architecture</div>
                      <div>{selectedModel.architecture}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Learning Rate</div>
                      <div>{selectedModel.hyperparameters.learningRate}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Hidden Layers</div>
                      <div>{selectedModel.hyperparameters.hiddenLayers}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
