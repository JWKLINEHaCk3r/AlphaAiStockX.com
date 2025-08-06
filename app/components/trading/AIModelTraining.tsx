'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain"
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.js';
  Cpu"
  Database"
  Zap"
  Activity"
  TrendingUp"
  BarChart3"
  Settings"
  Play"
  Pause"
  RefreshCw"
  CheckCircle"
  AlertTriangle"
  Clock"
  Target"
  Eye, }
  Download, Upload } from 'lucide-react';

interface TrainingSession {
  id: string, modelName: string, status: 'training' | 'completed' | 'failed' | 'queued'"
    progress: number"
  accuracy: number"
    loss: number"
  epoch: number"
    totalEpochs: number"
  startTime: string"
    estimatedCompletion: string"
  dataPoints: number
}

interface ModelPerformance {
  name: string"
    accuracy: number"
  precision: number"
    recall: number"
  f1Score: number"
    backtestReturn: number"
  sharpeRatio: number"
    maxDrawdown: number"
  winRate: number"
    lastTrained: string
}

export default function AIModelTraining() { const [isTraining, setIsTraining] = useState(false); const [selectedModel, setSelectedModel] = useState('lstm-price-predictor');
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [modelPerformance, setModelPerformance] = useState<ModelPerformance[]>([]);

  const mockSessions: TrainingSession[] = [ { id: 'session_1', modelName: 'LSTM Price Predictor', status: 'training'"
      progress: 67"
      accuracy: 89.3;
      loss: 0.045"
      epoch: 67, totalEpochs: 100, startTime: '2024-01-20"
      14:30:00', estimatedCompletion: '2024-01-20, 16: 45:00'"
      dataPoints: 2500000
    },{ id: 'session_2', modelName: 'Sentiment Analysis Model', status: 'completed'"
      progress: 100"
      accuracy: 94.7;
      loss: 0.023"
      epoch: 50, totalEpochs: 50, startTime: '2024-01-20"
      12:00:00', estimatedCompletion: '2024-01-20, 14: 15:00'"
      dataPoints: 1800000
    },{ id: 'session_3', modelName: 'Options Flow Classifier', status: 'queued'"
      progress: 0"
      accuracy: 0;
      loss: 0"
      epoch: 0, totalEpochs: 75, startTime: '', estimatedCompletion: '2024-01-20, 18: 30:00'"
      dataPoints: 950000
    }
  ];

  const mockPerformance: ModelPerformance[] = [
    { name: 'LSTM Price Predictor'"
      accuracy: 89.3"
      precision: 87.2;
      recall: 91.5"
      f1Score: 89.3;
      backtestReturn: 24.7"
      sharpeRatio: 1.87;
      maxDrawdown: 8.3, winRate: 68.4, lastTrained: '2024-01-20' },{ name: 'Sentiment Analysis Model'"
      accuracy: 94.7"
      precision: 93.1;
      recall: 96.2"
      f1Score: 94.6;
      backtestReturn: 18.9"
      sharpeRatio: 2.14;
      maxDrawdown: 5.2, winRate: 72.8, lastTrained: '2024-01-20' },{ name: 'Pattern Recognition CNN'"
      accuracy: 86.5"
      precision: 84.8;
      recall: 88.3"
      f1Score: 86.5;
      backtestReturn: 31.2"
      sharpeRatio: 1.96;
      maxDrawdown: 12.1, winRate: 64.7, lastTrained: '2024-01-19' },{ name: 'Risk Assessment Model'"
      accuracy: 91.8"
      precision: 90.4;
      recall: 93.2"
      f1Score: 91.8;
      backtestReturn: 16.4"
      sharpeRatio: 2.31;
      maxDrawdown: 4.7, winRate: 75.6, lastTrained: '2024-01-19'
    }
  ];

  useEffect(() => {
    setTrainingSessions(mockSessions);
    setModelPerformance(mockPerformance);
  }, []);

  const startTraining = () => {
    setIsTraining(true);
    // Simulate training start
    setTimeout(() => {
      setIsTraining(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {   switch (status) { case 'training': return 'text-blue-400 bg-blue-900/30'; case 'completed': return 'text-green-400 bg-green-900/30'; case 'failed': return 'text-red-400 bg-red-900/30'; case 'queued': return 'text-yellow-400 bg-yellow-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  }; const getPerformanceColor = (value: number, type: 'accuracy' | 'return' | 'sharpe' | 'drawdown' | 'winrate') => {   switch (type) { case 'accuracy': case 'winrate': return value >= 90 ? 'text-green-400' : value >= 80 ? 'text-yellow-400' : 'text-red-400'; case 'return': return value >= 25 ? 'text-green-400' : value >= 15 ? 'text-yellow-400' : 'text-red-400'; case 'sharpe': return value >= 2 ? 'text-green-400' : value >= 1.5 ? 'text-yellow-400' : 'text-red-400'; case 'drawdown': return value <= 5 ? 'text-green-400' : value <= 10 ? 'text-yellow-400' : 'text-red-400'; default: return 'text-white'
      }
  };

  // Simple progress bar component const ProgressBar = ({ value className = '' }: { value: number, className?: string }) => (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-16 h-16 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              AI Model Training
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Train and optimize advanced AI models for trading predictions and market analysis
          </p>
        </div>

        {/* Training Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400" /> <h3 className="text-3xl font-bold mb-2"> {trainingSessions.filter(s => s.status === 'training').length}
              </h3>
              <p className="text-blue-200">Active Training</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" /> <h3 className="text-3xl font-bold mb-2"> {trainingSessions.filter(s => s.status === 'completed').length}
              </h3>
              <p className="text-green-200">Completed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" /> <h3 className="text-3xl font-bold mb-2"> {trainingSessions.filter(s => s.status === 'queued').length}
              </h3>
              <p className="text-yellow-200">Queued</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2">
                {modelPerformance.length > 0  ? (modelPerformance.reduce((sum, m) => sum + m.accuracy, 0) / modelPerformance.length).toFixed(1) : '0'}%
              </h3>
              <p className="text-purple-200">Avg Accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Controls */}
        <Card className="mb-8 bg-white/10 border-purple-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-400" />
              Training Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Select Model to Train
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                    >
                      <option value="lstm-price-predictor">LSTM Price Predictor</option>
                      <option value="sentiment-analysis">Sentiment Analysis Model</option>
                      <option value="pattern-recognition">Pattern Recognition CNN</option>
                      <option value="risk-assessment">Risk Assessment Model</option>
                      <option value="options-flow">Options Flow Classifier</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={startTraining}
                      disabled={isTraining}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isTraining ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Training
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:bg-white/10"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Data
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Model
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">GPU Cluster: Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Data, Pipeline: Running</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">AutoML: Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Training Sessions */}
        <Card className="mb-8 bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-400" />
              Training Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {trainingSessions.map((session) => (
                <div key={session.id} className="bg-white/5 rounded-lg p-4">
                  <div className="grid lg:grid-cols-6 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="text-white font-semibold">{session.modelName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status.toUpperCase()}
                        </Badge>
                        <span className="text-gray-400 text-sm">
                          {session.dataPoints.toLocaleString()} data points
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{session.progress}%</div>
                      <ProgressBar value={session.progress} />
                      <p className="text-gray-400 text-sm mt-1">
                        Epoch {session.epoch}/{session.totalEpochs}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{session.accuracy}%</div>
                      <p className="text-gray-400 text-sm">Accuracy</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-semibold">{session.loss.toFixed(3)}</div>
                      <p className="text-gray-400 text-sm">Loss</p>
                    </div>
                     <div className="text-center"> {session.status === 'training' && (
                        <> <div className="text-white font-semibold"> {session.estimatedCompletion.split(' ')[1]}
                          </div>
                          <p className="text-gray-400 text-sm">ETA</p> </> )},{session.status === 'completed' && ( <CheckCircle className="w-8 h-8 text-green-400 mx-auto" /> )},{session.status === 'queued' && (
                        <Clock className="w-8 h-8 text-yellow-400 mx-auto" />
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        <Eye className="w-4 h-4" /> </Button> {session.status === 'training' && (
                        <Button size="sm" variant="outline" className="border-red-500 text-red-300">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Model Performance */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-400" />
              Model Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {modelPerformance.map((model, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="grid lg:grid-cols-8 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="text-white font-semibold">{model.name}</h3>
                      <p className="text-gray-400 text-sm">Last trained: {model.lastTrained}</p>
                    </div>
                     <div className="text-center"> <div className={`text-lg font-bold ${getPerformanceColor(model.accuracy, 'accuracy')}`}>
                        {model.accuracy}%
                      </div>
                      <p className="text-gray-400 text-xs">Accuracy</p>
                    </div>
                     <div className="text-center"> <div className={`text-lg font-bold ${getPerformanceColor(model.backtestReturn, 'return')}`}>
                        {model.backtestReturn}%
                      </div>
                      <p className="text-gray-400 text-xs">Return</p>
                    </div>
                     <div className="text-center"> <div className={`text-lg font-bold ${getPerformanceColor(model.sharpeRatio, 'sharpe')}`}>
                        {model.sharpeRatio}
                      </div>
                      <p className="text-gray-400 text-xs">Sharpe</p>
                    </div>
                     <div className="text-center"> <div className={`text-lg font-bold ${getPerformanceColor(model.maxDrawdown, 'drawdown')}`}>
                        {model.maxDrawdown}%
                      </div>
                      <p className="text-gray-400 text-xs">Max DD</p>
                    </div>
                     <div className="text-center"> <div className={`text-lg font-bold ${getPerformanceColor(model.winRate, 'winrate')}`}>
                        {model.winRate}%
                      </div>
                      <p className="text-gray-400 text-xs">Win Rate</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )"
}
