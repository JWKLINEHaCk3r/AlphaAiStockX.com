#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔧 Comprehensive Import & Syntax Error Fixer');
console.log('==============================================');

async function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fixes = 0;

    // Fix import statement syntax
    const importPattern = /^(import[^;]*),\s*$/gm;
    if (importPattern.test(content)) {
      content = content.replace(importPattern, '$1;');
      fixes++;
    }

    // Fix semicolons in object literals
    content = content.replace(/([a-zA-Z_][a-zA-Z0-9_]*:\s*[^;,{}]+);(\s*[a-zA-Z_])/g, '$1,$2');
    content = content.replace(/([a-zA-Z_][a-zA-Z0-9_]*);(\s*[,}])/g, '$1$2');
    content = content.replace(/;\s*}/g, '\n}');

    // Fix incomplete expressions
    content = content.replace(/\+;$/gm, '');
    content = content.replace(/\+;\s*$/gm, '');
    content = content.replace(/([^+])\+;/g, '$1');

    // Fix object property syntax
    content = content.replace(/(\w+);(\s*[,}])/g, '$1$2');

    // Fix ternary operators
    content = content.replace(/\?\s*([^:;]+);(\s*:)/g, '? $1$2');
    content = content.replace(/:\s*([^;,}]+);(\s*[,}])/g, ': $1$2');

    // Fix function parameters
    content = content.replace(/Math\.min\(100;/g, 'Math.min(100,');
    content = content.replace(/Math\.max\(0,\s*Math\.min\(100;/g, 'Math.max(0, Math.min(100,');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${fixes} issues in ${path.basename(filePath)}`);
      return fixes;
    }

    return 0;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🔍 Finding files with import trace errors...');
  
  const criticalFiles = [
    'app/api/ai-tools/signal-bot/route.ts',
    'app/api/ai/signals/route.ts',
    'app/components/AITradingDashboard.tsx',
    'app/api/ai-tools/market-predictor/route.ts',
    'app/api/ai-tools/portfolio-optimizer/route.ts'
  ];

  let totalFixed = 0;
  
  for (const file of criticalFiles) {
    if (fs.existsSync(file)) {
      const fixed = await fixFile(file);
      totalFixed += fixed;
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  }

  // Find all TypeScript files and fix them
  try {
    const allFiles = glob.sync('app/**/*.{ts,tsx}').filter(f => !f.includes('node_modules'));
    
    for (const file of allFiles) {
      const fixed = await fixFile(file);
      totalFixed += fixed;
    }
  } catch (error) {
    console.log(`⚠️  Error globbing files: ${error.message}`);
  }

  console.log(`\n✅ Fixed ${totalFixed} total syntax issues`);
  console.log('🚀 Import trace errors should now be resolved!');
}

main().catch(console.error);
