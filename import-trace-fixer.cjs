#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Comprehensive Import Trace Error Fixer');
console.log('==========================================');

const criticalFiles = [
  'app/api/ai-tools/signal-bot/route.ts',
  'app/api/ai/signals/route.ts',
  'app/components/AITradingDashboard.tsx'
];

function fixObjectLiteralSyntax(content) {
  // Fix object properties missing commas
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if this line is an object property that needs a comma
    if (line.match(/^\s*[\w'"]+:\s*[^,{}\[\]]+\s*$/) && i < lines.length - 1) {
      const nextLine = lines[i + 1];
      // If next line is another property, closing brace, or bracket, add comma
      if (nextLine.match(/^\s*[\w'"]+:/) || 
          nextLine.match(/^\s*[}\]]/) || 
          nextLine.match(/^\s*\)/)) {
        line = line + ',';
      }
    }
    
    // Fix specific patterns
    line = line.replace(/accuracy: 0\.947$/, 'accuracy: 0.947,');
    line = line.replace(/data: signal$/, 'data: signal,');
    line = line.replace(/message: 'success'$/, 'message: \'success\',');
    
    fixedLines.push(line);
  }
  
  return fixedLines.join('\n');
}

function fixFunctionCallSyntax(content) {
  // Fix NextResponse.json calls missing commas
  content = content.replace(
    /NextResponse\.json\(\s*{([^}]+)}\s*{([^}]+)}\s*\)/g,
    'NextResponse.json({ $1 }, { $2 })'
  );
  
  // Fix headers object syntax
  content = content.replace(
    /'Content-Type': 'text\/event-stream'\s*'Cache-Control'/g,
    "'Content-Type': 'text/event-stream', 'Cache-Control'"
  );
  
  return content;
}

function fixJSXSyntax(content) {
  // Fix JSX component structure
  content = content.replace(/>\s*{/g, '>\n      {');
  content = content.replace(/}\s*</g, '}\n      <');
  
  // Fix duplicate closing brackets
  content = content.replace(/>\s*>/g, '>');
  
  return content;
}

async function fixFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return 0;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fixes = 0;

    // Apply different fixes based on file type
    if (filePath.endsWith('.tsx')) {
      content = fixJSXSyntax(content);
      fixes++;
    }
    
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      content = fixObjectLiteralSyntax(content);
      content = fixFunctionCallSyntax(content);
      fixes += 2;
    }

    // Additional specific fixes
    content = content.replace(/;(\s*[,}])/g, '$1'); // Remove semicolons before commas/braces
    content = content.replace(/,;/g, ','); // Fix comma-semicolon sequences
    content = content.replace(/([^,]\s*){/g, '$1, {'); // Add missing commas before objects
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed import trace errors in ${path.basename(filePath)}`);
      return fixes;
    }

    return 0;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🔍 Fixing critical files with import trace errors...');
  
  let totalFixed = 0;
  
  for (const file of criticalFiles) {
    const fixed = await fixFile(file);
    totalFixed += fixed;
  }

  // Also fix any additional files found with build errors
  try {
    const { execSync } = require('child_process');
    console.log('\n🔍 Scanning for additional files with import trace errors...');
    
    // Get list of files with syntax errors from build output
    const buildOutput = execSync('npm run build 2>&1 || true', { encoding: 'utf-8' });
    const errorFiles = buildOutput.match(/\.\/app\/[^\s]+\.(ts|tsx)/g) || [];
    
    const uniqueFiles = [...new Set(errorFiles)].map(f => f.replace('./', ''));
    
    for (const file of uniqueFiles) {
      if (!criticalFiles.includes(file) && fs.existsSync(file)) {
        const fixed = await fixFile(file);
        totalFixed += fixed;
      }
    }
  } catch (error) {
    console.log('⚠️  Could not scan build output, continuing with manual fixes...');
  }

  console.log(`\n✅ Fixed import trace errors in ${totalFixed} locations`);
  console.log('🚀 Import trace error fix complete!');
}

main().catch(console.error);
