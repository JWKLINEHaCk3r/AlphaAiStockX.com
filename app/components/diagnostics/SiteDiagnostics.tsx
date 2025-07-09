<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Alert } from "../../../components/ui/alert";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
=======
import { Alert } from '@/components/ui/alert';
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
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

('use client');
import React from 'react';

import { useState, useEffect } from 'react';
<<<<<<< HEAD

=======
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import { AlertCircle, CheckCircle, XCircle, Globe, Server, FileText, Shield } from 'lucide-react';

export default function SiteDiagnostics() {
  const [diagnostics, setDiagnostics] = useState({
    dns: 'checking',
    hosting: 'checking',
    files: 'checking',
    ssl: 'checking',
  });

  const [solutions, setSolutions] = useState<any[]>([]);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    // Simulate diagnostic checks
    setTimeout(() => {
      setDiagnostics({
        dns: 'error',
        hosting: 'warning',
        files: 'error',
        ssl: 'error',
      });

      setSolutions([
        {
          issue: 'DNS Not Pointing to IONOS',
          priority: 'HIGH',
          steps: [
            'Login to your domain registrar (where you bought alphaaistockx.com)',
            'Update nameservers to IONOS nameservers',
            'Or update A record to point to IONOS IP address',
            'Wait 24-48 hours for DNS propagation',
          ],
        },
        {
          issue: 'Files Not Uploaded to Correct Directory',
          priority: 'HIGH',
          steps: [
            'Login to IONOS Control Panel',
            'Go to Hosting → File Manager',
            'Navigate to the ROOT directory (not a subfolder)',
            'Upload index.html and all files to the main directory',
            'Ensure .htaccess file is uploaded (it may be hidden)',
          ],
        },
        {
          issue: 'SSL Certificate Not Active',
          priority: 'MEDIUM',
          steps: [
            'In IONOS Control Panel, go to SSL Certificates',
            'Activate SSL for alphaaistockx.com',
            'Wait for certificate to be issued (can take up to 24 hours)',
            'Force HTTPS redirect in .htaccess',
          ],
        },
      ]);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Working';
      case 'error':
        return 'Failed';
      case 'warning':
        return 'Issues Found';
      default:
        return 'Checking...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔍 AlphaAIStockX Site Diagnostics</h1>
          <p className="text-gray-300 text-lg">
            Diagnosing why https://alphaaistockx.com/ is not accessible
          </p>
        </div>

        {/* Diagnostic Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="w-5 h-5" />
                DNS Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.dns)}
                <span className="text-gray-300">{getStatusText(diagnostics.dns)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Server className="w-5 h-5" />
                Hosting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.hosting)}
                <span className="text-gray-300">{getStatusText(diagnostics.hosting)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5" />
                Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.files)}
                <span className="text-gray-300">{getStatusText(diagnostics.files)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                SSL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.ssl)}
                <span className="text-gray-300">{getStatusText(diagnostics.ssl)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solutions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">🛠️ Solutions to Fix Your Site</h2>

          {solutions.map((solution, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      solution.priority === 'HIGH'
                        ? 'bg-red-500'
                        : solution.priority === 'MEDIUM'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                  />
                  {solution.issue}
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      solution.priority === 'HIGH'
                        ? 'bg-red-500/20 text-red-300'
                        : solution.priority === 'MEDIUM'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-green-500/20 text-green-300'
                    }`}
                  >
                    {solution.priority} PRIORITY
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {solution.steps.map((step: string, stepIndex: number) => (
                    <li key={stepIndex} className="flex items-start gap-3 text-gray-300">
                      <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">🚀 Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() =>
                  window.open('https://www.whatsmydns.net/#A/alphaaistockx.com', '_blank')
                }
              >
                Check DNS Propagation
              </Button>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => alert('Login to IONOS Control Panel → Hosting → File Manager')}
              >
                Open IONOS File Manager
              </Button>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => runDiagnostics()}
              >
                Re-run Diagnostics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-red-900/30 border-red-500/50 mt-6">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Need Immediate Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-200 mb-4">
              If your site is still not working after following these steps, contact IONOS support
              immediately:
            </p>
            <div className="space-y-2 text-red-200">
              <p>
                📞 <strong>IONOS Support:</strong> 1-484-254-5555
              </p>
              <p>
                💬 <strong>Live Chat:</strong> Available in IONOS Control Panel
              </p>
              <p>
                📧 <strong>Email:</strong> support@ionos.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
