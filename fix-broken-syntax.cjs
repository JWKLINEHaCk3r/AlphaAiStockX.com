const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing broken syntax caused by automatic fixes...');

const filesToFix = [
  'app/ai-trading/page.tsx',
  'app/api/ai/models/[modelId]/subscribe/route.ts',
  'app/api/ai/models/route.ts',
  'app/api/ai/signals/route.ts',
  'app/api/auth/register/route.ts'
];

filesToFix.forEach(file => {
  try {
    if (!fs.existsSync(file)) {
      console.log('⚠️ File not found:', file);
      return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Fix use client directive placement
    if (file.includes('ai-trading/page.tsx')) {
      content = `'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AITradingDashboard = dynamic(() => import('../components/AITradingDashboard'), {
  ssr: false
});

export default function AITradingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AITradingDashboard />
    </div>
  );
}`;
    }
    
    // Fix broken destructuring and catch blocks
    content = content.replace(/const\s*\{\s*([^}]+)\s*\}\s*catch\s*\([^)]*\)\s*\{\s*[^}]*\}\s*catch\s*\([^)]*\)\s*\{\s*[^}]*\}\s*=\s*([^;]+);/g, 'const { $1 } = $2;');
    
    // Fix broken object literals with catch blocks
    content = content.replace(/(\s+)\}\s*catch\s*\([^)]*\)\s*\{\s*[^}]*\}\s*catch\s*\([^)]*\)\s*\{\s*[^}]*\}\s*,/g, '$1},');
    
    // Remove duplicate catch blocks
    content = content.replace(/catch\s*\([^)]*\)\s*\{\s*[^}]*\}\s*catch\s*\([^)]*\)\s*\{\s*[^}]*\}/g, 'catch (error) { console.error(error); }');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log('✅ Fixed', file);
    } else {
      console.log('⏭️ No changes needed for', file);
    }
    
  } catch (error) {
    console.error('❌ Error fixing', file, ':', error.message);
  }
});

console.log('🎉 Syntax fixes completed!');
