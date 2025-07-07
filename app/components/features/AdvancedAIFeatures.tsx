'use client';
import React from 'react';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Cpu,
  Database,
  Eye,
  Radar,
  Settings,
  Target,
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  Shield,
  CheckCircle,
  Clock,
} from 'lucide-react';

export default function AdvancedAIFeatures() {
  const [activeFeature, setActiveFeature] = useState('quantum-ai');
  const [isProcessing, setIsProcessing] = useState(false);

  const runFeatureDemo = (feature: string) => {
    setActiveFeature(feature);
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  const aiFeatures = [
    {
      id: 'quantum-ai',
      title: 'Quantum AI Engine',
      description: '247M parameter neural network with quantum processing',
      icon: Brain,
      accuracy: 94.7,
      speed: '5-15ms',
      status: 'active',
      color: 'blue',
    },
    {
      id: 'neural-network',
      title: 'Deep Neural Networks',
      description: '50-layer deep learning with real-time adaptation',
      icon: Cpu,
      accuracy: 92.3,
      speed: '10-25ms',
      status: 'active',
      color: 'purple',
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition',
      description: 'Advanced pattern detection with 96.8% confidence',
      icon: Eye,
      accuracy: 96.8,
      speed: '8-20ms',
      status: 'active',
      color: 'green',
    },
    {
      id: 'sentiment-analysis',
      title: 'Market Sentiment AI',
      description: 'Real-time sentiment analysis across 10,000+ sources',
      icon: Activity,
      accuracy: 89.4,
      speed: '15-30ms',
      status: 'active',
      color: 'yellow',
    },
    {
      id: 'risk-analyzer',
      title: 'Quantum Risk Analysis',
      description: 'Multi-dimensional risk assessment with quantum tunneling',
      icon: Shield,
      accuracy: 91.7,
      speed: '12-28ms',
      status: 'active',
      color: 'red',
    },
    {
      id: 'prediction-engine',
      title: 'Predictive Analytics',
      description: 'Future market prediction with 94.2% accuracy',
      icon: Target,
      accuracy: 94.2,
      speed: '6-18ms',
      status: 'active',
      color: 'indigo',
    },
  ];

  const liveMetrics = {
    totalPredictions: 2847392,
    successfulTrades: 2694847,
    activeModels: 247,
    dataPointsPerSecond: 15847392,
    quantumStates: 1024,
    neuralConnections: 247000000,
  };

  return (
    <div className="space-y-8">
      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map(feature => {
          const IconComponent = feature.icon;
          return (
            <Card
              key={feature.id}
              className={`bg-black/20 border-${feature.color}-500/30 backdrop-blur-xl hover:border-${feature.color}-400/50 transition-all cursor-pointer ${
                activeFeature === feature.id ? `ring-2 ring-${feature.color}-400/50` : ''
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <IconComponent className={`h-8 w-8 text-${feature.color}-400`} />
                  <Badge
                    variant="outline"
                    className={`border-${feature.color}-500/30 text-${feature.color}-400`}
                  >
                    {feature.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Accuracy</span>
                    <span className={`text-${feature.color}-400 font-bold`}>
                      {feature.accuracy}%
                    </span>
                  </div>
                  <Progress value={feature.accuracy} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Speed</span>
                    <span className={`text-${feature.color}-400 font-bold`}>{feature.speed}</span>
                  </div>

                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      runFeatureDemo(feature.id);
                    }}
                    className={`w-full bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 hover:from-${feature.color}-600 hover:to-${feature.color}-700`}
                    disabled={isProcessing && activeFeature === feature.id}
                  >
                    {isProcessing && activeFeature === feature.id ? (
                      <>
                        <Cpu className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Run Demo
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Live AI Metrics */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Database className="h-6 w-6 mr-3 text-purple-400" />
            Live AI Processing Metrics
          </CardTitle>
          <CardDescription>Real-time quantum AI performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <p className="text-purple-400 text-3xl font-bold">
                {liveMetrics.totalPredictions.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Total Predictions</p>
            </div>
            <div className="text-center">
              <p className="text-green-400 text-3xl font-bold">
                {liveMetrics.successfulTrades.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Successful Trades</p>
            </div>
            <div className="text-center">
              <p className="text-blue-400 text-3xl font-bold">{liveMetrics.activeModels}</p>
              <p className="text-gray-400 text-sm">Active AI Models</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-400 text-3xl font-bold">
                {(liveMetrics.dataPointsPerSecond / 1000000).toFixed(1)}M
              </p>
              <p className="text-gray-400 text-sm">Data Points/sec</p>
            </div>
            <div className="text-center">
              <p className="text-indigo-400 text-3xl font-bold">{liveMetrics.quantumStates}</p>
              <p className="text-gray-400 text-sm">Quantum States</p>
            </div>
            <div className="text-center">
              <p className="text-pink-400 text-3xl font-bold">
                {(liveMetrics.neuralConnections / 1000000).toFixed(0)}M
              </p>
              <p className="text-gray-400 text-sm">Neural Connections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Feature Demo */}
      {activeFeature && (
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Radar className="h-6 w-6 mr-3 text-purple-400" />
              {aiFeatures.find(f => f.id === activeFeature)?.title} - Live Demo
            </CardTitle>
            <CardDescription>Real-time AI processing demonstration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Demo Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Processing Pipeline</h4>
                  <div className="space-y-3">
                    {[
                      { step: 'Data Ingestion', status: 'complete', time: '2ms' },
                      {
                        step: 'Neural Processing',
                        status: isProcessing ? 'processing' : 'complete',
                        time: '8ms',
                      },
                      {
                        step: 'Quantum Analysis',
                        status: isProcessing ? 'processing' : 'complete',
                        time: '12ms',
                      },
                      {
                        step: 'Pattern Recognition',
                        status: isProcessing ? 'pending' : 'complete',
                        time: '15ms',
                      },
                      {
                        step: 'Prediction Output',
                        status: isProcessing ? 'pending' : 'complete',
                        time: '18ms',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {item.status === 'complete' && (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          )}
                          {item.status === 'processing' && (
                            <Clock className="h-5 w-5 text-yellow-400 animate-spin" />
                          )}
                          {item.status === 'pending' && <Clock className="h-5 w-5 text-gray-400" />}
                          <span className="text-white">{item.step}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Live Results</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-semibold">Prediction Confidence</span>
                        <span className="text-green-400 text-xl font-bold">94.7%</span>
                      </div>
                      <Progress value={94.7} className="mt-2" />
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 font-semibold">Market Signal</span>
                        <Badge className="bg-green-500 text-white">STRONG BUY</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        AI recommends immediate position entry
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-semibold">Risk Assessment</span>
                        <span className="text-yellow-400 font-bold">LOW</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        Quantum risk analysis: 12% volatility expected
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Execute AI Trade
                </Button>
                <Button variant="outline" className="border-purple-500/30">
                  <Settings className="h-4 w-4 mr-2" />
                  Adjust Parameters
                </Button>
                <Button variant="outline" className="border-blue-500/30">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Technology Stack */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Cpu className="h-6 w-6 mr-3 text-purple-400" />
            Advanced AI Technology Stack
          </CardTitle>
          <CardDescription>Cutting-edge technologies powering AlphaAIStockX</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Quantum Computing', version: 'v2.1', status: 'Operational', icon: Cpu },
              { name: 'Neural Networks', version: 'v3.7', status: 'Optimized', icon: Brain },
              { name: 'Deep Learning', version: 'v4.2', status: 'Enhanced', icon: Database },
              { name: 'Pattern Recognition', version: 'v2.9', status: 'Advanced', icon: Eye },
            ].map((tech, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-3 mb-3">
                  <tech.icon className="h-6 w-6 text-purple-400" />
                  <div>
                    <p className="text-white font-semibold">{tech.name}</p>
                    <p className="text-gray-400 text-sm">{tech.version}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500/30 text-green-400">
                  {tech.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
