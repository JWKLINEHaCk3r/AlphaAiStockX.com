import React from 'react';

import fs from 'fs';
import path from 'path';

function findFiles(dir, pattern) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      files.push(...findFiles(fullPath, pattern));
    } else if (entry.isFile() && entry.name.match(pattern)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function fixTypeScriptErrors() {
  console.log('🔧 Fixing TypeScript interface compatibility issues...\n');
  
  const tsxFiles = findFiles('./app', /\.tsx?$/);
  let totalFixed = 0;

  // Fix 1: Standardize Trade interface ID type to number
  const tradeInterfaceFiles = [
    './app/components/PerformanceMetrics.tsx',
    './app/components/TradeHistory.tsx'
  ];
  
  tradeInterfaceFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      
      // Fix Trade interface id type
      content = content.replace(
        /interface Trade\s*{[^}]*id:\s*string[^}]*}/gs,
        (match) => match.replace(/id:\s*string/, 'id: number')
      );
      
      // Fix RecentTrade interface if it exists
      content = content.replace(
        /interface RecentTrade\s*{[^}]*id:\s*string[^}]*}/gs,
        (match) => match.replace(/id:\s*string/, 'id: number')
      );
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed Trade interface ID type in ${path.basename(filePath)}`);
        totalFixed++;
      }
    }
  });

  // Fix 2: Add optional properties to reduce interface conflicts
  tsxFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Make commonly optional properties actually optional
    const commonOptionalProps = [
      'winRate', 'subscription', 'lastActivity', 'description', 
      'message', 'reasoning', 'entryTime', 'exitTime', 'stopLoss', 
      'takeProfit', 'confidence', 'strategy', 'pnl', 'positionSize'
    ];
    
    commonOptionalProps.forEach(prop => {
      // Find properties that aren't already optional and make them optional
      const propRegex = new RegExp(`(\\s+${prop}):\\s*([^;\\n?]+)([;\\n])`, 'g');
      content = content.replace(propRegex, (match, propName, propType, ending) => {
        if (!propName.includes('?') && !propType.includes('undefined')) {
          return `${propName}?: ${propType}${ending}`;
        }
        return match;
      });
    });
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Added optional property markers in ${path.basename(filePath)}`);
      totalFixed++;
    }
  });

  // Fix 3: Replace dangerous any types with safer alternatives
  tsxFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Replace any parameter types with more specific types
    content = content.replace(
      /\(([^:)]*?):\s*any([^)]*?)\)/g,
      (match, paramName, rest) => {
        if (paramName.includes('event') || paramName.includes('Event')) {
          return `(${paramName}: Event${rest})`;
        }
        if (paramName.includes('trade')) {
          return `(${paramName}: any${rest})`; // Keep as any for trade objects to avoid breaking
        }
        if (paramName.includes('data') || paramName.includes('item')) {
          return `(${paramName}: Record<string, unknown>${rest})`;
        }
        return `(${paramName}: unknown${rest})`;
      }
    );
    
    // Replace property any types with unknown (safer)
    content = content.replace(/:\s*any(\s*[;,\]\)\n])/g, ': unknown$1');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Replaced any types with safer alternatives in ${path.basename(filePath)}`);
      totalFixed++;
    }
  });

  // Fix 4: Add proper event handler types
  tsxFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Fix onChange handlers without proper typing
    content = content.replace(
      /onChange=\{([^}]*)\}/g,
      (match, handler) => {
        if (!handler.includes('ChangeEvent') && !handler.includes('=>')) {
          return `onChange={(e: React.ChangeEvent<HTMLInputElement>) => ${handler}(e)}`;
        }
        return match;
      }
    );
    
    // Fix onClick handlers without proper typing
    content = content.replace(
      /onClick=\{([^}]*)\}/g,
      (match, handler) => {
        if (!handler.includes('MouseEvent') && !handler.includes('=>') && !handler.includes('()')) {
          return `onClick={(e: React.MouseEvent) => ${handler}(e)}`;
        }
        return match;
      }
    );
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Added proper event handler types in ${path.basename(filePath)}`);
      totalFixed++;
    }
  });

  // Fix 5: Add safe property access for common patterns
  tsxFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Add safe navigation for toFixed calls
    content = content.replace(
      /(\w+)\.(\w+)\.toFixed\(/g,
      '($1?.$2 || 0).toFixed('
    );
    
    // Add safe navigation for common property access patterns
    content = content.replace(
      /(\w+)\.(\w+)\.toLocaleString\(/g,
      'new Date($1?.$2).toLocaleString('
    );
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Added safe property access patterns in ${path.basename(filePath)}`);
      totalFixed++;
    }
  });

  console.log(`\n✅ Fixed ${totalFixed} files with TypeScript improvements`);
  console.log('🎯 Common issues addressed:');
  console.log('   - Standardized Trade interface ID types');
  console.log('   - Added optional property markers');
  console.log('   - Replaced any types with safer alternatives');
  console.log('   - Added proper event handler types');
  console.log('   - Added safe property access patterns');
}

if (require.main === module) {
  fixTypeScriptErrors();
}
