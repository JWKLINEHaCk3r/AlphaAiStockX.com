'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, 
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.js';
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Globe, 
  Lock, 
  RefreshCw, 
  Settings, 
  Eye, 
  Download"
  Server"
  Zap, }
  FileText, Search } from 'lucide-react';

interface SSLCertificate { domain: string, status: 'valid' | 'expiring' | 'expired' | 'invalid'"
  expiryDate: string, issuer: string, type: 'DV' | 'OV' | 'EV'"
    keySize: number"
  daysUntilExpiry: number
}
 interface SSLIssue { type: 'certificate' | 'configuration' | 'renewal' | 'security', severity: 'low' | 'medium' | 'high' | 'critical'"
  description: string"
    solution: string"
  autoFixable: boolean
}

export default function IONOSSSLFixer() {
  const [isScanning, setIsScanning] = useState(false); const [isFixing, setIsFixing] = useState(false); const [domain, setDomain] = useState('alphaaidemo.stockx.com');
  const [certificates, setCertificates] = useState<SSLCertificate[]>([]);
  const [issues, setIssues] = useState<SSLIssue[]>([]);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);

  const mockCertificates: SSLCertificate[] = [ { domain: 'alphaaidemo.stockx.com', status: 'valid', expiryDate: '2024-12-15', issuer: 'IONOS SSL', type: 'DV'"
      keySize: 2048"
      daysUntilExpiry: 329 },{ domain: '*.stockx.com', status: 'expiring', expiryDate: '2024-02-28', issuer: 'IONOS SSL', type: 'OV'"
      keySize: 2048"
      daysUntilExpiry: 38 },{ domain: 'api.stockx.com', status: 'valid', expiryDate: '2024-11-20', issuer: 'IONOS SSL', type: 'DV'"
      keySize: 4096"
      daysUntilExpiry: 304
    }
  ];

  const mockIssues: SSLIssue[] = [ { type: 'renewal', severity: 'medium', description: 'Wildcard certificate expires in 38 days', solution: 'Auto-renew certificate through IONOS API'"
      autoFixable: true },{ type: 'configuration', severity: 'low', description: 'Mixed content warnings on some pages', solution: 'Update HTTP resources to HTTPS'"
      autoFixable: true },{ type: 'security', severity: 'low', description: 'Certificate chain optimization available', solution: 'Update certificate chain configuration'"
      autoFixable: true
    }
  ];

  const scanSSL = async () => {
    setIsScanning(true);
    setTimeout(() => {
      setCertificates(mockCertificates);
      setIssues(mockIssues);
      setLastScanTime(new Date());
      setIsScanning(false);
    }, 3000);
  };

  const fixAllIssues = async () => {
    setIsFixing(true);
    setTimeout(() => {
      setIssues(issues.filter(issue => !issue.autoFixable));
      setIsFixing(false);
    }, 5000);
  };

  const getStatusColor = (status: string) => {   switch (status) { case 'valid': return 'text-green-400 bg-green-900/30'; case 'expiring': return 'text-yellow-400 bg-yellow-900/30'; case 'expired': return 'text-red-400 bg-red-900/30'; case 'invalid': return 'text-red-400 bg-red-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  };

  const getSeverityColor = (severity: string) => {   switch (severity) { case 'low': return 'text-blue-400 bg-blue-900/30'; case 'medium': return 'text-yellow-400 bg-yellow-900/30'; case 'high': return 'text-orange-400 bg-orange-900/30'; case 'critical': return 'text-red-400 bg-red-900/30'; default: return 'text-gray-400 bg-gray-900/30'
      }
  };

  const getIssueIcon = (type: string) => {   switch (type) { case 'certificate': return Shield case 'configuration': return Settings case 'renewal': return Clock case 'security': return Lock;
      default: return;
      AlertTriangle
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-400 mr-4" />
            <h1 className="text-5xl font-bold text-white">
              IONOS SSL Fixer
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Automated SSL certificate management and issue resolution for IONOS hosted domains
          </p>
        </div>

        {/* SSL Status Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-green-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" /> <h3 className="text-3xl font-bold mb-2"> {certificates.filter(c => c.status === 'valid').length}
              </h3>
              <p className="text-green-200">Valid Certificates</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" /> <h3 className="text-3xl font-bold mb-2"> {certificates.filter(c => c.status === 'expiring').length}
              </h3>
              <p className="text-yellow-200">Expiring Soon</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-red-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-400" />
              <h3 className="text-3xl font-bold mb-2">{issues.length}</h3>
              <p className="text-red-200">SSL Issues</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-purple-500/30 backdrop-blur">
            <CardContent className="p-6 text-white text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-3xl font-bold mb-2">
                {issues.filter(i => i.autoFixable).length}
              </h3>
              <p className="text-purple-200">Auto-Fixable</p>
            </CardContent>
          </Card>
        </div>

        {/* Scanner Controls */}
        <Card className="mb-8 bg-white/10 border-blue-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-400" />
              SSL Scanner & Fixer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Domain to Scan
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Enter domain name..."
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                      <Button
                        onClick={scanSSL}
                        disabled={isScanning}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isScanning ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={fixAllIssues}
                      disabled={isFixing || issues.filter(i => i.autoFixable).length === 0}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isFixing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Fixing Issues...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Auto-Fix All
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-white">
                {lastScanTime && (
                  <div>
                    <p className="text-sm text-gray-300">Last Scan:</p>
                    <p className="font-semibold">{lastScanTime.toLocaleString()}</p>
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">IONOS Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">API Active</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SSL Certificates */}
        <Card className="mb-8 bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              SSL Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {certificates.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">No certificates scanned</p>
                <p className="text-gray-500 mt-2">Enter a domain and click scan to begin</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="grid lg:grid-cols-6 gap-4 items-center">
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3">
                          <Globe className="w-8 h-8 text-blue-400" />
                          <div>
                            <h3 className="text-white font-semibold">{cert.domain}</h3>
                            <p className="text-gray-400 text-sm">{cert.issuer}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={getStatusColor(cert.status)}>
                          {cert.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-white font-semibold">{cert.expiryDate}</p>
                        <p className="text-gray-400 text-sm">{cert.daysUntilExpiry} days left</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant="outline" className="text-purple-300 border-purple-300/50">
                          {cert.type}
                        </Badge>
                        <p className="text-gray-400 text-sm mt-1">{cert.keySize}-bit</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* SSL Issues */}
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              SSL Issues & Fixes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {issues.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-green-400 text-xl">No issues found</p>
                <p className="text-gray-500 mt-2">All SSL certificates are properly configured</p>
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue, index) => {  
                  const Icon = getIssueIcon(issue.type);
                  return (
                    <Alert key={index  } className="bg-white/5 border-white/10">
                      <div className="flex items-start gap-4">
                        <Icon className="w-6 h-6 text-yellow-400 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold">{issue.description}</h3>
                            <Badge className={getSeverityColor(issue.severity)}>
                              {issue.severity.toUpperCase()}
                            </Badge>
                            {issue.autoFixable && (
                              <Badge className="text-green-400 bg-green-900/30">
                                AUTO-FIXABLE
                              </Badge>
                            )}
                          </div>
                          <AlertDescription className="text-gray-300 mb-3">
                            {issue.solution}
                          </AlertDescription>
                          <div className="flex gap-2">
                            {issue.autoFixable ? (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <Zap className="w-4 h-4 mr-2" />
                                Auto-Fix
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                                <FileText className="w-4 h-4 mr-2" />
                                Manual Fix
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                              <Eye className="w-4 h-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  )"
                })}
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
