"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "../../../components/ui/card";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent"
      CardTitle }
    } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card.js";
 interface BuildValidationResult { status: 'idle' | 'running' | 'success' | 'error'"
    message: string;
  details?: string[];
}

interface BuildValidatorProps {
  onValidationComplete?: (result: BuildValidationResult) => void
}
 export default function BuildValidator({ onValidationComplete }: BuildValidatorProps) { const [buildStatus, setBuildStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle'); const [lintStatus, setLintStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle'); const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [isRunning, setIsRunning] = useState(false);
  
  const runBuildValidation = async () => {  
    setIsRunning(true);
     // Reset statuses setBuildStatus('running'); setLintStatus('idle'); setTestStatus('idle');
    
    try {  
      // Simulate build process await new Promise(resolve => setTimeout(resolve, 2000)); setBuildStatus('success');
       // Simulate lint process setLintStatus('running'); await new Promise(resolve => setTimeout(resolve, 1500)); setLintStatus('success');
       // Simulate test process setTestStatus('running'); await new Promise(resolve => setTimeout(resolve, 1000)); setTestStatus('success');
      
      if (onValidationComplete) { onValidationComplete({ status: 'success', message: 'All validations passed successfully', details: ['Build completed', 'Linting passed', 'Tests passed']
            } catch (error) { console.error(error); } catch (error) { console.error(error); });
      }
       } catch (error) { setBuildStatus('error'); setLintStatus('error'); setTestStatus('error');
      
      if (onValidationComplete) { onValidationComplete({ status: 'error', message: 'Validation failed', details: ['Build failed', 'Linting failed', 'Tests failed']
        });
      }
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {  
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'running':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
      }
  };

  const getStatusColor = (status: string) => {  
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'running':
        return 'text-blue-600';
      default:
        return 'text-gray-400';
      }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          Build Validator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Button
            onClick={runBuildValidation}
            disabled={isRunning}
            className="px-6 py-2" > {isRunning ? 'Running Validation...' : 'Start Validation'}
          </Button>
        </div>

        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span>Build Status:</span>
            {getStatusIcon(buildStatus)} <span className={getStatusColor(buildStatus)}> {buildStatus === 'idle' ? 'Not started' : buildStatus === 'running' ? 'Building...' : buildStatus === 'success' ? 'Success' : 'Failed'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Lint Status:</span>
            {getStatusIcon(lintStatus)} <span className={getStatusColor(lintStatus)}> {lintStatus === 'idle' ? 'Not started' : lintStatus === 'running' ? 'Linting...' : lintStatus === 'success' ? 'Success' : 'Failed'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Test Status:</span>
            {getStatusIcon(testStatus)} <span className={getStatusColor(testStatus)}> {testStatus === 'idle' ? 'Not started' : testStatus === 'running' ? 'Testing...' : testStatus === 'success' ? 'Success' : 'Failed'}
            </span>
          </div>
        </div> {buildStatus === 'success' && lintStatus === 'success' && testStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">All validations passed!</span>
            </div>
            <p className="text-green-700 mt-1">
              Your project is ready for deployment.
            </p> </div> )},{(buildStatus === 'error' || lintStatus === 'error' || testStatus === 'error') && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">Validation failed!</span>
            </div>
            <p className="text-red-700 mt-1">
              Please fix the issues before deploying.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
