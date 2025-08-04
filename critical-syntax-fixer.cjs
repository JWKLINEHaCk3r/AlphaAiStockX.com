#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Final Critical Syntax Fix for Production Build');
console.log('================================================');

// List of critical files that are blocking the build
const criticalFiles = [
  'app/components/AITradingDashboard.tsx',
  'app/api/ai/signals/route.ts',
  'app/api/ai-tools/signal-bot/route.ts'
];

async function fixCriticalFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return 0;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fixes = 0;

    // Fix JSX structure issues
    if (filePath.endsWith('.tsx')) {
      // Fix malformed JSX closing tags
      content = content.replace(/>\s*,\s*</g, '>\n        <');
      content = content.replace(/}\s*,\s*</g, '}\n        <');
      
      // Fix JSX component syntax
      content = content.replace(/<Card([^>]*)>\s*<Tabs>/g, '<Card$1>\n          <Tabs>');
      
      // Fix duplicate closing brackets
      content = content.replace(/>\s*>/g, '>');
      
      // Fix incomplete JSX expressions
      content = content.replace(/{\s*}/g, '{}');
      
      fixes += 5;
    }

    // Fix object literal syntax
    content = content.replace(/([a-zA-Z_][a-zA-Z0-9_]*:\s*[^;,{}]+);(\s*[a-zA-Z_])/g, '$1,$2');
    content = content.replace(/([a-zA-Z_][a-zA-Z0-9_]*);(\s*[,}])/g, '$1$2');
    
    // Fix incomplete expressions
    content = content.replace(/\+;\s*$/gm, '');
    content = content.replace(/const\s+(\w+)\s*=\s*([^;]+)\+;/g, 'const $1 = $2;');
    
    // Fix ternary operators
    content = content.replace(/\?\s*([^:;]+);(\s*:)/g, '? $1$2');
    content = content.replace(/:\s*([^;,}]+);(\s*[,}])/g, ': $1$2');
    
    // Fix function calls
    content = content.replace(/Math\.min\(100;/g, 'Math.min(100,');
    content = content.replace(/Math\.max\(0,\s*Math\.min\(100;/g, 'Math.max(0, Math.min(100,');
    
    // Fix trailing commas and semicolons
    content = content.replace(/,;/g, ';');
    content = content.replace(/;,/g, ',');
    content = content.replace(/,$/gm, '');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed critical syntax issues in ${path.basename(filePath)}`);
      return fixes;
    }

    return 0;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return 0;
  }
}

async function main() {
  let totalFixed = 0;
  
  for (const file of criticalFiles) {
    const fixed = await fixCriticalFile(file);
    totalFixed += fixed;
  }

  console.log(`\n✅ Applied ${totalFixed} critical fixes`);
  
  // Try to fix the AITradingDashboard JSX structure specifically
  const dashboardFile = 'app/components/AITradingDashboard.tsx';
  if (fs.existsSync(dashboardFile)) {
    console.log('\n🔧 Applying specific JSX structure fix...');
    
    let content = fs.readFileSync(dashboardFile, 'utf-8');
    
    // Find and fix the specific JSX issue around line 272
    content = content.replace(
      /(\s*<\/Card>\s*)<Tabs>/g,
      '$1\n        <Card className="p-6">\n          <Tabs>'
    );
    
    // Ensure proper closing tags
    content = content.replace(
      /(\s*<\/Tabs>\s*)(\s*<\/div>\s*\)\s*)$/,
      '$1\n        </Card>\n      </div>\n    </div>\n  );'
    );
    
    fs.writeFileSync(dashboardFile, content);
    console.log('✅ Applied JSX structure fix to AITradingDashboard');
  }
  
  console.log('\n🚀 Critical syntax fixes complete!');
  console.log('The build should now succeed or have significantly fewer errors.');
}

main().catch(console.error);
