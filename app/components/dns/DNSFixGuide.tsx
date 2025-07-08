import { Alert } from "@/components/ui/alert";
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
import { CheckCircle, AlertTriangle, Globe, Clock, Phone } from 'lucide-react';

export default function DNSFixGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNumber) ? prev.filter(n => n !== stepNumber) : [...prev, stepNumber]
    );
  };

  const steps = [
    {
      id: 1,
      title: 'Find Your Domain Registrar',
      description: 'Identify where you purchased alphaaistockx.com',
      action: 'Check your email receipts or use WHOIS lookup',
    },
    {
      id: 2,
      title: 'Login to Domain Registrar',
      description: 'Access your domain management panel',
      action: 'Use your registrar login credentials',
    },
    {
      id: 3,
      title: 'Update Nameservers',
      description: 'Point your domain to hosting provider servers',
      action: 'Update nameservers in domain registrar control panel',
    },
    {
      id: 4,
      title: 'Configure Hosting',
      description: 'Ensure domain is linked to hosting package',
      action: 'Verify in hosting control panel',
    },
    {
      id: 5,
      title: 'Wait for Propagation',
      description: 'DNS changes take 24-48 hours to spread globally',
      action: 'Monitor progress with DNS checker tools',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-6 w-6" />
              DNS ISSUE DETECTED: alphaaistockx.com
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-600 space-y-2">
              <p>
                <strong>Problem:</strong> Domain not resolving to hosting provider
              </p>
              <p>
                <strong>Status:</strong> DNS not pointing to correct nameservers
              </p>
              <p>
                <strong>Solution:</strong> Follow the steps below to fix DNS configuration
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {steps.map((step: any) => (
            <Card
              key={step.id}
              className={`transition-all duration-300 ${
                completedSteps.includes(step.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        completedSteps.includes(step.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span>
                      Step {step.id}: {step.title}
                    </span>
                  </div>
                  <Button
                    onClick={() => toggleStep(step.id)}
                    variant={completedSteps.includes(step.id) ? 'default' : 'outline'}
                    size="sm"
                  >
                    {completedSteps.includes(step.id) ? 'Completed' : 'Mark Done'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <strong>Action Required:</strong> {step.action}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-blue-500 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Globe className="h-6 w-6" />
              HOSTING NAMESERVERS (CRITICAL)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Primary Nameserver:</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-lg">ns1.yourhost.com</code>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Secondary Nameserver:</h4>
                <code className="bg-gray-100 px-3 py-1 rounded text-lg">ns2.yourhost.com</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 border-orange-500 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Phone className="h-6 w-6" />
              NEED IMMEDIATE HELP?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-600" />
                <div>
                  <strong>IONOS Support:</strong> 1-484-254-5555
                  <p className="text-sm text-gray-600">Available 24/7 for technical support</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <strong>Tell them:</strong> "My domain alphaaistockx.com is not resolving to my
                hosting package. I need help with DNS configuration."
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 border-purple-500 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Clock className="h-6 w-6" />
              DNS PROPAGATION CHECKER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>Use these tools to check if your DNS changes are working:</p>
              <div className="grid gap-2">
                <a
                  href="https://www.whatsmydns.net/#A/alphaaistockx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg border hover:border-purple-500 transition-colors"
                >
                  🔍 Check DNS Propagation Status
                </a>
                <a
                  href="https://dnschecker.org/#A/alphaaistockx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg border hover:border-purple-500 transition-colors"
                >
                  🌍 Global DNS Checker
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
