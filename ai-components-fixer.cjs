#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = '/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com';

// Files that need to be removed and recreated due to severe corruption
const corruptedFiles = [
  'app/components/ai/ComputerVisionAnalysis.tsx',
  'app/components/ai/AIWhiteLabelAnalytics.tsx',
  'app/components/ai/AIDataVisualization.tsx',
  'app/components/ai/AIPatternRecognition.tsx',
  'app/components/ai/AISentimentAnalysis.tsx',
  'app/components/ai/AIPortfolioOptimizer.tsx',
  'app/components/ai/AIRiskAssessment.tsx',
  'app/components/ai/AIBacktester.tsx'
];

console.log('🔧 Starting comprehensive AI components cleanup...');

// Remove corrupted files
for (const filePath of corruptedFiles) {
  const fullPath = path.join(projectRoot, filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`❌ Removed corrupted file: ${filePath}`);
  }
}

// Create simple placeholder components
const components = [
  {
    file: 'app/components/ai/ComputerVisionAnalysis.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function ComputerVisionAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Computer Vision Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p>AI-powered image and chart analysis coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AIWhiteLabelAnalytics.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AIWhiteLabelAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI White Label Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>White label analytics dashboard coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AIDataVisualization.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AIDataVisualization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Data Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Advanced data visualization tools coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AIPatternRecognition.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AIPatternRecognition() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Pattern Recognition</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Pattern recognition analysis coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AISentimentAnalysis.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AISentimentAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Market sentiment analysis coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AIPortfolioOptimizer.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AIPortfolioOptimizer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Portfolio Optimizer</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Portfolio optimization tools coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AIRiskAssessment.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AIRiskAssessment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Risk assessment tools coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  },
  {
    file: 'app/components/ai/AIBacktester.tsx',
    content: `'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/card';

export default function AIBacktester() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Backtester</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Strategy backtesting tools coming soon.</p>
      </CardContent>
    </Card>
  );
}`
  }
];

// Create new clean components
for (const component of components) {
  const fullPath = path.join(projectRoot, component.file);
  const dir = path.dirname(fullPath);
  
  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, component.content);
  console.log(`✅ Created clean component: ${component.file}`);
}

console.log('🎉 AI components cleanup completed!');
console.log('✨ All corrupted files have been replaced with clean placeholders.');
