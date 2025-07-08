import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
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

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Shield, Settings, RefreshCw, FileCode } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function IONOSSSLFixer() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNumber) ? prev.filter(n => n !== stepNumber) : [...prev, stepNumber]
    );
  };

  const steps = [
    {
      id: 1,
      title: 'Verify SSL Certificate Installation',
      icon: <Shield className="w-6 h-6" />,
      priority: 'CRITICAL',
      description: 'Check if SSL is properly installed on IONOS',
      actions: [
        'Login to IONOS Control Panel',
        "Go to 'Domains & SSL' → 'SSL Certificates'",
        "Check if alphaaistockx.com has an 'Active' certificate",
        "If not active, click 'Order SSL Certificate' or 'Activate Free SSL'",
        "Choose 'DV Certificate' (Domain Validation) - it's FREE",
        'Wait for certificate activation (typically 5-30 minutes)',
      ],
    },
    {
      id: 2,
      title: 'Assign SSL Certificate to Domain',
      icon: <Settings className="w-6 h-6" />,
      priority: 'CRITICAL',
      description: 'Ensure SSL certificate is properly assigned',
      actions: [
        "In IONOS Control Panel, go to 'Domains & SSL' → 'SSL Certificates'",
        "Find your domain and click 'Assign'",
        'Select the hosting package where your website is hosted',
        'Save the changes',
        'Wait for the SSL configuration to complete (usually a few minutes)',
      ],
    },
    {
      id: 3,
      title: 'Add HTTPS Redirect in .htaccess',
      icon: <FileCode className="w-6 h-6" />,
      priority: 'HIGH',
      description: 'Force all traffic to use HTTPS',
      actions: [
        'Go to IONOS File Manager',
        "Navigate to your domain's root directory",
        'Create or edit the .htaccess file',
        'Add the following code:',
        `# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`,
        'Save the file and upload it to the root directory',
      ],
    },
    {
      id: 4,
      title: 'Clear Browser Cache & Test',
      icon: <RefreshCw className="w-6 h-6" />,
      priority: 'MEDIUM',
      description: 'Clear your browser cache and test the site',
      actions: [
        'Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)',
        "Select 'Cached images and files' and clear them",
        'Try accessing https://alphaaistockx.com in a private/incognito window',
        'Test on a different browser or device',
      ],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔒 SSL Protocol Error Fix</h1>
          <p className="text-gray-300 text-lg">
            Follow these steps to fix ERR_SSL_PROTOCOL_ERROR on alphaaistockx.com
          </p>
        </div>

        <Alert className="mb-6 border-amber-500 bg-amber-950/50">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertTitle className="text-amber-300">What's Happening?</AlertTitle>
          <AlertDescription className="text-amber-200">
            ERR_SSL_PROTOCOL_ERROR means your SSL certificate isn't properly configured. This guide
            will fix it!
          </AlertDescription>
        </Alert>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Fix Progress</span>
            <span className="text-white">
              {completedSteps.length}/{steps.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step: any) => (
            <Card key={step.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStep(step.id)}
                      className={`w-8 h-8 p-0 ${
                        completedSteps.includes(step.id)
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300'
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        step.id
                      )}
                    </Button>
                    {step.icon}
                    <div>
                      <div className="text-white">{step.title}</div>
                      <div
                        className={`text-xs px-2 py-1 rounded border inline-block mt-1 ${getPriorityColor(step.priority)}`}
                      >
                        {step.priority}
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{step.description}</p>
                <ol className="space-y-2">
                  {step.actions.map((action: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {action.startsWith('# Force') ||
                      action.startsWith('RewriteEngine') ||
                      action.startsWith('RewriteCond') ||
                      action.startsWith('RewriteRule') ? (
                        <pre className="bg-gray-900 text-gray-100 p-2 rounded-md font-mono text-sm whitespace-pre-wrap">
                          {action}
                        </pre>
                      ) : (
                        action
                      )}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advanced Troubleshooting */}
        <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Still Not Working? Advanced Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">🔍 Check SSL Certificate Status:</h4>
                <p className="text-white/90 mb-2">
                  Use this online tool to check your SSL certificate status:
                </p>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={() =>
                    window.open(
                      'https://www.ssllabs.com/ssltest/analyze.html?d=alphaaistockx.com',
                      '_blank'
                    )
                  }
                >
                  Check SSL Status
                </Button>
              </div>

              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">📞 Contact IONOS Support:</h4>
                <p className="text-white/90">Phone: 1-484-254-5555</p>
                <p className="text-white/90">Live Chat: Available in IONOS Control Panel</p>
                <p className="text-white/90">
                  Tell them: "I'm getting ERR_SSL_PROTOCOL_ERROR on my site alphaaistockx.com and
                  need help with SSL configuration"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        {completedSteps.length === steps.length && (
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 mt-6">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">All Steps Completed! 🎉</h3>
              <p className="text-white/90 mb-4">
                Your SSL should now be working correctly. It may take a few minutes for changes to
                take effect.
              </p>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => window.open('https://alphaaistockx.com', '_blank')}
              >
                Test Your Site
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
