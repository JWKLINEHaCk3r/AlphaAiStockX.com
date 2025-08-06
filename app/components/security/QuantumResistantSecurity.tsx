'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, 
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.js';
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Atom, 
  Binary, 
  Fingerprint, 
  Globe, 
  Network, 
  Settings, 
  RefreshCw"
  Activity"
  TrendingUp"
  BarChart3"
  Clock, }
  Target, AlertCircle } from 'lucide-react';

interface SecurityMetric {
  name: string, value: number, status: 'secure' | 'warning' | 'critical'"
    description: string
}
 interface QuantumThreat { level: 'low' | 'medium' | 'high' | 'critical'"
    probability: number"
  timeToThreat: string"
    affectedSystems: string[]
}

interface EncryptionProtocol { name: string, type: 'classical' | 'quantum' | 'hybrid', strength: number, status: 'active' | 'standby' | 'upgrading'"
  keySize: string
}

export default function QuantumResistantSecurity() {
  const [isScanning, setIsScanning] = useState(false);
  const [securityScore, setSecurityScore] = useState(97);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(new Date());

  const securityMetrics: SecurityMetric[] = [ { name: 'Quantum Key Distribution', value: 99, status: 'secure', description: 'Quantum-safe key exchange protocols active' },{ name: 'Lattice-based Cryptography', value: 96, status: 'secure', description: 'Post-quantum cryptographic algorithms deployed' },{ name: 'Multi-factor Authentication', value: 94, status: 'secure', description: 'Biometric and quantum-token verification' },{ name: 'Network Intrusion Detection', value: 88, status: 'warning', description: 'Advanced threat monitoring with AI analysis' },{ name: 'Data Encryption at Rest', value: 100, status: 'secure', description: 'AES-256 with quantum-resistant layers'
    }
  ];
 const quantumThreat: QuantumThreat = { level: 'low', probability: 12, timeToThreat: '15+ years', affectedSystems: ['Legacy RSA', 'ECC Signatures', 'DH Key Exchange']
  };

  const encryptionProtocols: EncryptionProtocol[] = [ { name: 'CRYSTALS-Kyber', type: 'quantum', strength: 98, status: 'active', keySize: '3168-bit' },{ name: 'CRYSTALS-Dilithium', type: 'quantum', strength: 97, status: 'active', keySize: '2592-bit' },{ name: 'FALCON', type: 'quantum', strength: 95, status: 'standby', keySize: '1793-bit' },{ name: 'AES-256-GCM', type: 'classical', strength: 89, status: 'active', keySize: '256-bit' },{ name: 'Hybrid Protocol', type: 'hybrid', strength: 99, status: 'active', keySize: 'Variable'
    }
  ];

  const startSecurityScan = async () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScanTime(new Date());
      // Simulate slight variations in security score
      setSecurityScore(95 + Math.random() * 5);
    }, 3000);
  };

  const getStatusColor = (status: string) => {   switch (status) { case 'secure': return 'text-green-400 bg-green-900/30'; case 'warning': return 'text-yellow-400 bg-yellow-900/30'; case 'critical': return 'text-red-400 bg-red-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  };

  const getThreatLevelColor = (level: string) => {   switch (level) { case 'low': return 'text-green-400'; case 'medium': return 'text-yellow-400'; case 'high': return 'text-orange-400'; case 'critical': return 'text-red-400'; default: return 'text-gray-400'
      }
  };

  const getProtocolTypeColor = (type: string) => {   switch (type) { case 'quantum': return 'text-purple-400 bg-purple-900/30'; case 'classical': return 'text-blue-400 bg-blue-900/30'; case 'hybrid': return 'text-cyan-400 bg-cyan-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  };

  const getProtocolStatusColor = (status: string) => {   switch (status) { case 'active': return 'text-green-400'; case 'standby': return 'text-yellow-400'; case 'upgrading': return 'text-blue-400'; default: return 'text-gray-400'
      }
  };

  // Simple progress bar component const ProgressBar = ({ value className = '' }: { value: number, className?: string }) => (
    <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
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
            <Atom className="w-16 h-16 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              Quantum-Resistant Security
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Next-generation cryptographic protection against quantum computing threats
          </p>
        </div>

        {/* Security Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-3xl font-bold mb-2">{securityScore.toFixed(1)}%</h3>
              <p className="text-green-200">Security Score</p>
              <ProgressBar value={securityScore} className="mt-3" />
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Atom className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2">5</h3>
              <p className="text-purple-200">Quantum Protocols</p>
              <p className="text-xs text-gray-400 mt-2">Active & Standby</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-blue-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-3xl font-bold mb-2">256+</h3>
              <p className="text-blue-200">Encryption Strength</p>
              <p className="text-xs text-gray-400 mt-2">Quantum-Safe</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-yellow-200">Years to Threat</p>
              <p className="text-xs text-gray-400 mt-2">Quantum Computing</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Scanner */}
        <Card className="mb-8 bg-white/10 border-purple-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-400" />
              Security Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={startSecurityScan}
                    disabled={isScanning}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Full Security Scan
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    variant="outline"
                    className="border-white/20 text-gray-300 hover:bg-white/10"
                  >
                    {showTechnicalDetails ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Details
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-white">
                <p className="text-sm text-gray-300">Last Scan:</p>
                <p className="font-semibold">{lastScanTime.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">All systems operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Metrics */}
        <Card className="mb-8 bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-400" />
              Security Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold">{metric.name}</h3>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2"> <span className="text-white font-bold text-lg">{metric.value}%</span> {metric.status === 'secure' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                  </div>
                  <ProgressBar value={metric.value} />
                  {showTechnicalDetails && (
                    <p className="text-gray-400 text-sm mt-2">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quantum Threat Assessment */}
        <Card className="mb-8 bg-white/10 border-red-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              Quantum Threat Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg: grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Threat, Level:</span>
                    <Badge className={`${getThreatLevelColor(quantumThreat.level)} bg-opacity-20`}>
                      {quantumThreat.level.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Probability:</span>
                    <span className="text-white font-semibold">{quantumThreat.probability}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Time to Threat:</span>
                    <span className="text-green-400 font-semibold">{quantumThreat.timeToThreat}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Affected Systems:</h4>
                <div className="space-y-2">
                  {quantumThreat.affectedSystems.map((system, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">{system}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encryption Protocols */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="w-6 h-6 text-cyan-400" />
              Active Encryption Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {encryptionProtocols.map((protocol, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="grid lg:grid-cols-5 gap-4 items-center">
                    <div>
                      <h3 className="text-white font-semibold">{protocol.name}</h3>
                      <p className="text-gray-400 text-sm">{protocol.keySize}</p>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={getProtocolTypeColor(protocol.type)}>
                        {protocol.type.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <span className={`font-semibold ${getProtocolStatusColor(protocol.status)}`}>
                        {protocol.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{protocol.strength}%</div>
                      <ProgressBar value={protocol.strength} />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        <Eye className="w-4 h-4" />
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
  );
}
