import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.js';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';
import { Progress } from "../../../components/ui/progress";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import React from 'react';
'use client';

import { useState } from 'react';
import { CheckCircle, AlertTriangle, Globe, Upload, Settings, Shield } from 'lucide-react';

export default function IONOSQuickFix() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNumber) ? prev.filter(n => n !== stepNumber) : [...prev, stepNumber]
    );
  };

  const steps = [
    {
      id: 1,
      title: 'Check Domain DNS Settings',
      icon: <Globe className="w-6 h-6" />,
      priority: 'CRITICAL',
      description: 'Verify your domain is pointing to IONOS servers',
      actions: [
        'Login to your domain registrar (where you bought alphaaistockx.com)',
        'Check if nameservers are set to IONOS nameservers:',
        'ns1.ionos.com and ns2.ionos.com',
        'If not, update them and wait 24-48 hours for propagation',
      ],
    },
    {
      id: 2,
      title: 'Upload Files to Correct Directory',
      icon: <Upload className="w-6 h-6" />,
      priority: 'CRITICAL',
      description: 'Ensure files are in the root directory of your hosting',
      actions: [
        'Login to IONOS Control Panel',
        'Go to Hosting → File Manager',
        "Navigate to your domain's ROOT directory (not a subfolder)",
        'Upload index.html, .htaccess, and all other files',
        'Verify .htaccess file is uploaded (may appear hidden)',
      ],
    },
    {
      id: 3,
      title: 'Activate SSL Certificate',
      icon: <Shield className="w-6 h-6" />,
      priority: 'HIGH',
      description: 'Enable HTTPS for your domain',
      actions: [
        'In IONOS Control Panel, go to SSL Certificates',
        "Click 'Activate SSL' for alphaaistockx.com",
        "Choose 'Let's Encrypt' (free option)",
        'Wait for certificate activation (up to 24 hours)',
      ],
    },
    {
      id: 4,
      title: 'Configure Hosting Settings',
      icon: <Settings className="w-6 h-6" />,
      priority: 'MEDIUM',
      description: 'Ensure proper hosting configuration',
      actions: [
        'In IONOS Control Panel, go to Hosting Settings',
        'Set Document Root to the correct directory',
        'Enable PHP if needed (though not required for static site)',
        'Check that the domain is properly assigned to hosting package',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚨 IONOS Quick Fix for AlphaAIStockX
          </h1>
          <p className="text-gray-300 text-lg">
            Follow these steps to get your site online immediately
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Progress</span>
            <span className="text-white">
              {completedSteps.length}/{steps.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map(step => (
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
                  {step.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {action}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Actions */}
        <Card className="bg-gradient-to-r from-red-600 to-orange-600 border-0 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Still Not Working? Emergency Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() => window.open('https://www.ionos.com/help', '_blank')}
              >
                Contact IONOS Support
              </Button>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                onClick={() =>
                  window.open('https://www.whatsmydns.net/#A/alphaaistockx.com', '_blank')
                }
              >
                Check DNS Propagation
              </Button>
            </div>
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <h4 className="text-white font-semibold mb-2">📞 IONOS Support Contact:</h4>
              <p className="text-white/90">Phone: 1-484-254-5555</p>
              <p className="text-white/90">Live Chat: Available in IONOS Control Panel</p>
              <p className="text-white/90">
                Tell them: "My domain alphaaistockx.com is not resolving to my hosting"
              </p>
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
                Your site should be live within 24 hours. DNS changes can take time to propagate.
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
