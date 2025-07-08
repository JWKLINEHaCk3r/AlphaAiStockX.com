import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { TabsTrigger } from "../../../components/ui/tabs";
import { TabsList } from "../../../components/ui/tabs";
import { TabsContent } from "../../../components/ui/tabs";
import { Tabs } from "../../../components/ui/tabs";
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  AIStockPrediction,
  SportsEvent,
  TradingOpportunity,
  Trade,
  Trader,
  VisionModel,
  AnalysisResult,
  BankAccount,
  Transaction,
  TradingSignalData,
  ChartPattern,
  TechnicalIndicators,
  RiskAnalysis,
  SectorPerformance,
  BacktestStrategy,
  AIWhiteLabelMetrics,
  MarketClassification,
  TradingRecommendation,
  StockAnalysis,
  RealtimeData,
  VolumeProfile,
  AIAnalysisComponents,
  CryptoData,
  DeFiProtocol,
  NFTCollection,
  UserProfile,
  ThemeOption,
  AccentColor,
  SubscriptionPlan,
  TradingStrategy,
  ScanResult,
  SiteDiagnostic,
  Alert,
  NewsAnalysis,
  SocialPlatform,
  Influencer,
  SocialPost,
  DeepLearningModel,
  MarketPattern,
} from '../../types/trading-types';

'use client';
import React from 'react';

import { useState, useEffect } from 'react';
<<<<<<< HEAD


=======
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import {
  Lock,
  Zap,
  Globe,
  Shield,
  Network,
  Atom,
  Key,
  Radio,
  Cpu,
  Eye,
  Activity,
} from 'lucide-react';

export default function QuantumInternetTrading() {
  const [quantumNetworkData, setQuantumNetworkData] = useState({
    networkStatus: 'Quantum Entangled',
    entanglementFidelity: 99.7 + Math.random() * 0.3,
    quantumNodes: 2847 + Math.floor(Math.random() * 100),
    globalLatency: 0.001 + Math.random() * 0.0005,
    securityLevel: 'Quantum Cryptographic',
    dataTransmissionRate: 847.5 + Math.random() * 50,
    quantumStates: {
      superposition: 94.7 + Math.random() * 3,
      entanglement: 97.2 + Math.random() * 2,
      coherence: 92.8 + Math.random() * 4,
      decoherence: 2.3 + Math.random() * 1,
    },
    tradingMetrics: {
      instantaneousExecutions: 15789 + Math.floor(Math.random() * 1000),
      quantumArbitrage: 247.8 + Math.random() * 50,
      simultaneousMarkets: 847 + Math.floor(Math.random() * 50),
      quantumAdvantage: 2847 + Math.random() * 200,
    },
  });

  const [quantumNodes, setQuantumNodes] = useState([
    {
      id: 'QN-NYC-001',
      location: 'New York',
      type: 'Primary Hub',
      entanglement: 99.8 + Math.random() * 0.2,
      connections: 247,
      latency: '0.001ms',
      status: 'Optimal',
    },
    {
      id: 'QN-LON-002',
      location: 'London',
      type: 'Primary Hub',
      entanglement: 99.6 + Math.random() * 0.3,
      connections: 189,
      latency: '0.001ms',
      status: 'Optimal',
    },
    {
      id: 'QN-TOK-003',
      location: 'Tokyo',
      type: 'Primary Hub',
      entanglement: 99.7 + Math.random() * 0.2,
      connections: 156,
      latency: '0.001ms',
      status: 'Optimal',
    },
    {
      id: 'QN-SIN-004',
      location: 'Singapore',
      type: 'Regional Hub',
      entanglement: 99.4 + Math.random() * 0.4,
      connections: 134,
      latency: '0.001ms',
      status: 'Optimal',
    },
    {
      id: 'QN-FRA-005',
      location: 'Frankfurt',
      type: 'Regional Hub',
      entanglement: 99.5 + Math.random() * 0.3,
      connections: 178,
      latency: '0.001ms',
      status: 'Optimal',
    },
  ]);

  const [quantumTrades, setQuantumTrades] = useState([
    {
      id: 'QT-001',
      symbol: 'AAPL',
      type: 'Quantum Arbitrage',
      markets: ['NYSE', 'NASDAQ', 'LSE', 'TSE'],
      execution: 'Instantaneous',
      profit: 12847.5,
      entanglementUsed: '4-way',
      timestamp: '0.001ms ago',
    },
    {
      id: 'QT-002',
      symbol: 'MSFT',
      type: 'Multi-dimensional Trade',
      markets: ['NYSE', 'XETRA', 'TSE'],
      execution: 'Instantaneous',
      profit: 8947.23,
      entanglementUsed: '3-way',
      timestamp: '0.002ms ago',
    },
    {
      id: 'QT-003',
      symbol: 'GOOGL',
      type: 'Quantum Hedge',
      markets: ['NASDAQ', 'LSE'],
      execution: 'Instantaneous',
      profit: 15247.89,
      entanglementUsed: '2-way',
      timestamp: '0.001ms ago',
    },
  ]);

  const [quantumSecurity, setQuantumSecurity] = useState({
    encryptionLevel: 'Quantum Key Distribution',
    keyDistributionRate: '1M keys/second',
    eavesdroppingDetection: '100%',
    quantumRandomness: 'True Random',
    securityBreaches: 0,
    lastSecurityAudit: 'Continuous',
    quantumSignatures: 'Verified',
    entanglementVerification: 'Real-time',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateQuantumNetworkData();
      simulateQuantumTrades();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const updateQuantumNetworkData = () => {
    setQuantumNetworkData(prev => ({
      ...prev,
      entanglementFidelity: Math.min(
        100,
        Math.max(99, prev.entanglementFidelity + (Math.random() - 0.5) * 0.1)
      ),
      quantumNodes: prev.quantumNodes + Math.floor((Math.random() - 0.3) * 5),
      globalLatency: Math.max(0.0005, prev.globalLatency + (Math.random() - 0.5) * 0.0001),
      dataTransmissionRate: prev.dataTransmissionRate + (Math.random() - 0.5) * 10,
      quantumStates: {
        superposition: Math.min(
          100,
          Math.max(90, prev.quantumStates.superposition + (Math.random() - 0.5) * 1)
        ),
        entanglement: Math.min(
          100,
          Math.max(95, prev.quantumStates.entanglement + (Math.random() - 0.5) * 0.5)
        ),
        coherence: Math.min(
          100,
          Math.max(88, prev.quantumStates.coherence + (Math.random() - 0.5) * 1)
        ),
        decoherence: Math.min(
          5,
          Math.max(1, prev.quantumStates.decoherence + (Math.random() - 0.5) * 0.3)
        ),
      },
      tradingMetrics: {
        ...prev.tradingMetrics,
        instantaneousExecutions:
          prev.tradingMetrics.instantaneousExecutions + Math.floor(Math.random() * 100),
        quantumArbitrage: prev.tradingMetrics.quantumArbitrage + (Math.random() - 0.3) * 10,
      },
    }));

    setQuantumNodes(prev =>
      prev.map((node: any) => ({
        ...node,
        entanglement: Math.min(100, Math.max(99, node.entanglement + (Math.random() - 0.5) * 0.1)),
        connections: node.connections + Math.floor((Math.random() - 0.5) * 5),
      }))
    );
  };

  const simulateQuantumTrades = () => {
    if (Math.random() > 0.6) {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META'];
      const tradeTypes = [
        'Quantum Arbitrage',
        'Multi-dimensional Trade',
        'Quantum Hedge',
        'Entangled Portfolio',
      ];
      const markets = [
        ['NYSE', 'NASDAQ'],
        ['NYSE', 'LSE', 'TSE'],
        ['NASDAQ', 'XETRA'],
        ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'XETRA'],
      ];

      const newTrade = {
        id: `QT-${Date.now()}`,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        type: tradeTypes[Math.floor(Math.random() * tradeTypes.length)],
        markets: markets[Math.floor(Math.random() * markets.length)],
        execution: 'Instantaneous',
        profit: 5000 + Math.random() * 15000,
        entanglementUsed: `${Math.floor(Math.random() * 4) + 2}-way`,
        timestamp: 'Just now',
      };

      setQuantumTrades(prev => [newTrade, ...prev.slice(0, 4)]);
    }
  };

  const getStatusColor = (status: any) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'text-green-400';
      case 'good':
        return 'text-blue-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getNodeTypeColor = (type: any) => {
    switch (type) {
      case 'Primary Hub':
        return 'bg-purple-500';
      case 'Regional Hub':
        return 'bg-blue-500';
      case 'Local Node':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantum Internet Status */}
      <Card className="bg-gradient-to-r from-violet-900/20 to-purple-900/20 border-violet-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Atom className="h-7 w-7 mr-3 text-violet-400" />
            ⚛️ Quantum Internet Trading Network
            <Badge className="ml-3 bg-gradient-to-r from-violet-400 to-purple-500">
              <Network className="h-4 w-4 mr-1" />
              QUANTUM ENTANGLED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-400/30">
              <div className="flex items-center justify-between mb-4">
                <Atom className="h-8 w-8 text-violet-400" />
                <Badge className="bg-violet-500">FIDELITY</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumNetworkData.entanglementFidelity.toFixed(2)}%
              </div>
              <p className="text-violet-400 font-semibold">Entanglement Fidelity</p>
              <p className="text-gray-400 text-sm">Quantum connection quality</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
              <div className="flex items-center justify-between mb-4">
                <Network className="h-8 w-8 text-purple-400" />
                <Badge className="bg-purple-500">NODES</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumNetworkData.quantumNodes.toLocaleString()}
              </div>
              <p className="text-purple-400 font-semibold">Quantum Nodes</p>
              <p className="text-gray-400 text-sm">Global network size</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <div className="flex items-center justify-between mb-4">
                <Zap className="h-8 w-8 text-blue-400" />
                <Badge className="bg-blue-500">LATENCY</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumNetworkData.globalLatency.toFixed(3)}ms
              </div>
              <p className="text-blue-400 font-semibold">Global Latency</p>
              <p className="text-gray-400 text-sm">Instantaneous transmission</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-lg border border-cyan-400/30">
              <div className="flex items-center justify-between mb-4">
                <Radio className="h-8 w-8 text-cyan-400" />
                <Badge className="bg-cyan-500">RATE</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumNetworkData.dataTransmissionRate.toFixed(1)} Qbps
              </div>
              <p className="text-cyan-400 font-semibold">Transmission Rate</p>
              <p className="text-gray-400 text-sm">Quantum bits per second</p>
            </div>
          </div>

          {/* Quantum States */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl flex items-center">
                <Activity className="h-6 w-6 mr-2 text-violet-400" />
                Quantum State Monitoring
              </h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 text-sm">Quantum Coherent</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-lg border border-violet-400/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Superposition</span>
                  <span className="text-violet-400 font-bold">
                    {quantumNetworkData.quantumStates.superposition.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={quantumNetworkData.quantumStates.superposition}
                  className="h-2 mb-2"
                />
                <p className="text-gray-400 text-xs">Quantum state overlap</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Entanglement</span>
                  <span className="text-blue-400 font-bold">
                    {quantumNetworkData.quantumStates.entanglement.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={quantumNetworkData.quantumStates.entanglement}
                  className="h-2 mb-2"
                />
                <p className="text-gray-400 text-xs">Quantum correlation strength</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Coherence</span>
                  <span className="text-green-400 font-bold">
                    {quantumNetworkData.quantumStates.coherence.toFixed(1)}%
                  </span>
                </div>
                <Progress value={quantumNetworkData.quantumStates.coherence} className="h-2 mb-2" />
                <p className="text-gray-400 text-xs">Quantum phase stability</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-400/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Decoherence</span>
                  <span className="text-red-400 font-bold">
                    {quantumNetworkData.quantumStates.decoherence.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={quantumNetworkData.quantumStates.decoherence}
                  className="h-2 mb-2"
                />
                <p className="text-gray-400 text-xs">Quantum state decay</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantum Trading & Network Nodes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl">
              <Zap className="h-6 w-6 mr-2 text-blue-400" />⚡ Quantum Trading Executions
              <Badge className="ml-3 bg-blue-500">INSTANTANEOUS</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quantumTrades.map((trade, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">{trade.symbol}</span>
                        <Badge className="bg-blue-500">{trade.type}</Badge>
                        <Badge variant="outline" className="border-cyan-400/30 text-cyan-400">
                          {trade.entanglementUsed}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Markets: {trade.markets.join(', ')}
                      </p>
                      <p className="text-gray-400 text-xs">{trade.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">
                        +${trade.profit.toLocaleString()}
                      </div>
                      <p className="text-gray-400 text-xs">{trade.execution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {quantumNetworkData.tradingMetrics.instantaneousExecutions.toLocaleString()}
                  </div>
                  <p className="text-gray-400 text-sm">Total Executions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    ${quantumNetworkData.tradingMetrics.quantumArbitrage.toFixed(1)}M
                  </div>
                  <p className="text-gray-400 text-sm">Arbitrage Profits</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-xl">
              <Globe className="h-6 w-6 mr-2 text-purple-400" />
              🌐 Global Quantum Nodes
              <Badge className="ml-3 bg-purple-500">ENTANGLED</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quantumNodes.map((node, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">{node.id}</span>
                        <Badge className={getNodeTypeColor(node.type)}>{node.type}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{node.location}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-gray-400 text-xs">
                          {node.connections} connections
                        </span>
                        <span className="text-gray-400 text-xs">{node.latency} latency</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getStatusColor(node.status)}`}>
                        {node.entanglement.toFixed(2)}%
                      </div>
                      <p className="text-gray-400 text-xs">Entanglement</p>
                      <Badge className="mt-1 bg-green-500">{node.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quantum Security */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Shield className="h-7 w-7 mr-3 text-green-400" />
            🔒 Quantum Cryptographic Security
            <Badge className="ml-3 bg-gradient-to-r from-green-400 to-emerald-500">
              <Lock className="h-4 w-4 mr-1" />
              UNBREAKABLE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="security" className="space-y-6">
            <TabsList className="bg-black/20 border-green-400/30">
              <TabsTrigger value="security">Security Status</TabsTrigger>
              <TabsTrigger value="encryption">Quantum Encryption</TabsTrigger>
              <TabsTrigger value="monitoring">Threat Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="security">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30 text-center">
                  <Key className="h-8 w-8 mx-auto mb-3 text-green-400" />
                  <h3 className="text-white font-bold">Quantum Key Distribution</h3>
                  <p className="text-green-400 font-semibold mt-2">
                    {quantumSecurity.keyDistributionRate}
                  </p>
                  <p className="text-gray-400 text-sm">Key generation rate</p>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30 text-center">
                  <Eye className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                  <h3 className="text-white font-bold">Eavesdropping Detection</h3>
                  <p className="text-blue-400 font-semibold mt-2">
                    {quantumSecurity.eavesdroppingDetection}
                  </p>
                  <p className="text-gray-400 text-sm">Detection accuracy</p>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30 text-center">
                  <Cpu className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                  <h3 className="text-white font-bold">Quantum Randomness</h3>
                  <p className="text-purple-400 font-semibold mt-2">
                    {quantumSecurity.quantumRandomness}
                  </p>
                  <p className="text-gray-400 text-sm">Entropy source</p>
                </div>

                <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
                  <h3 className="text-white font-bold">Security Breaches</h3>
                  <p className="text-yellow-400 font-semibold mt-2">
                    {quantumSecurity.securityBreaches}
                  </p>
                  <p className="text-gray-400 text-sm">Total incidents</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="encryption">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                  <h3 className="text-white font-bold text-lg mb-4">Encryption Protocols</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Primary Encryption</span>
                      <span className="text-green-400 font-bold">QKD-256</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Backup Protocol</span>
                      <span className="text-blue-400 font-bold">Post-Quantum RSA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Key Refresh Rate</span>
                      <span className="text-purple-400 font-bold">Every 1ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quantum Signatures</span>
                      <span className="text-cyan-400 font-bold">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                  <h3 className="text-white font-bold text-lg mb-4">Security Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Encryption Strength</span>
                        <span className="text-white font-bold">Quantum Secure</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Key Distribution</span>
                        <span className="text-white font-bold">99.99% Uptime</span>
                      </div>
                      <Progress value={99.99} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Threat Detection</span>
                        <span className="text-white font-bold">Real-time</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring">
              <div className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-400/30">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center">
                  <Activity className="h-6 w-6 mr-2 text-red-400" />
                  Real-time Threat Monitoring
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                    <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="text-white font-bold">Network Secure</h4>
                    <p className="text-green-400 font-semibold mt-2">All Clear</p>
                    <p className="text-gray-400 text-sm">No threats detected</p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                    <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Eye className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="text-white font-bold">Monitoring Active</h4>
                    <p className="text-blue-400 font-semibold mt-2">24/7 Surveillance</p>
                    <p className="text-gray-400 text-sm">Quantum sensors online</p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
                    <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="h-6 w-6 text-purple-400" />
                    </div>
                    <h4 className="text-white font-bold">Quantum Secured</h4>
                    <p className="text-purple-400 font-semibold mt-2">Unbreakable</p>
                    <p className="text-gray-400 text-sm">Quantum cryptography</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-8">
                    <Shield className="h-5 w-5 mr-2" />
                    View Security Dashboard
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
