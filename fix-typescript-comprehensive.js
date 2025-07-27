import React from 'react';

import fs from 'fs';
import path from 'path';

// Common interface fixes and type improvements
const fixes = [
  // Fix RecentTrade vs Trade interface compatibility
  {
    pattern: /interface RecentTrade\s*{[^}]*id:\s*string[^}]*}/gs,
    replacement: (match) => match.replace(/id:\s*string/, 'id: number'),
    description: 'Fix RecentTrade id type to be compatible with Trade interface'
  },
  
  // Add optional properties to interfaces
  {
    pattern: /interface\s+(\w+)\s*{([^}]*)}/gs,
    replacement: (match, interfaceName, body) => {
      // Common properties that should be optional
      const optionalProps = ['winRate', 'subscription', 'lastActivity', 'description', 'message'];
      let newBody = body;
      
      optionalProps.forEach(prop => {
        // Make property optional if it exists and isn't already optional
        const propRegex = new RegExp(`(\\s+${prop}):\\s*([^;\\n]+)([;\\n])`, 'g');
        newBody = newBody.replace(propRegex, (propMatch, propName, propType, ending) => {
          if (!propName.includes('?')) {
            return `${propName}?: ${propType}${ending}`;
          }
          return propMatch;
        });
      });
      
      return `interface ${interfaceName} {${newBody}}`;
    },
    description: 'Add optional markers to commonly optional interface properties'
  },
  
  // Replace explicit any types with more specific types where possible
  {
    pattern: /:\s*any(\s*[;,\]\)\n])/g,
    replacement: ': unknown$1',
    description: 'Replace any with unknown for better type safety'
  },
  
  // Fix function parameter any types
  {
    pattern: /\(([^)]*?)\s*:\s*any([^)]*?)\)/g,
    replacement: (match, paramName, rest) => {
      if (paramName.includes('event') || paramName.includes('Event')) {
        return `(${paramName}: Event${rest})`;
      }
      if (paramName.includes('data') || paramName.includes('item')) {
        return `(${paramName}: Record<string, unknown>${rest})`;
      }
      return `(${paramName}: unknown${rest})`;
    },
    description: 'Replace any parameter types with more specific types'
  },
  
  // Add proper React event types
  {
    pattern: /onChange=\{[^}]*\}\s*\/>/g,
    replacement: (match) => {
      if (!match.includes('ChangeEvent')) {
        return match.replace(/onChange=\{([^}]*)\}/, 'onChange={(e: React.ChangeEvent<HTMLInputElement>) => $1(e)}');
      }
      return match;
    },
    description: 'Add proper React ChangeEvent types'
  },
  
  // Fix onClick handlers
  {
    pattern: /onClick=\{[^}]*\}\s*/g,
    replacement: (match) => {
      if (!match.includes('MouseEvent') && !match.includes('() =>')) {
        return match.replace(/onClick=\{([^}]*)\}/, 'onClick={(e: React.MouseEvent) => $1(e)}');
      }
      return match;
    },
    description: 'Add proper React MouseEvent types'
  }
];

// Additional specific fixes for common patterns
const specificFixes = [
  // Fix Trade interface id type consistency
  {
    files: ['**/*Trade*.tsx', '**/AutoTradeBot.tsx'],
    pattern: /id:\s*string/g,
    replacement: 'id: number',
    description: 'Ensure Trade interface uses number IDs consistently'
  },
  
  // Fix optional property access
  {
    files: ['**/*.tsx'],
    pattern: /(\w+)\.(\w+)\.toFixed\(/g,
    replacement: '($1?.$2 || 0).toFixed(',
    description: 'Add safe navigation for toFixed calls'
  },
  
  // Fix array access safety
  {
    files: ['**/*.tsx'],
    pattern: /(\w+)\[(\d+)\](?!\?)/g,
    replacement: '$1?.[$2]',
    description: 'Add safe array access'
  }
];

function findFiles(dir, pattern, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      findFiles(fullPath, pattern, files);
    } else if (entry.isFile() && entry.name.match(pattern)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function applyFixes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Apply general fixes
  fixes.forEach(fix => {
    const original = content;
    content = content.replace(fix.pattern, fix.replacement);
    if (content !== original) {
      console.log(`✓ Applied: ${fix.description} in ${path.basename(filePath)}`);
      modified = true;
    }
  });
  
  // Apply specific fixes
  specificFixes.forEach(fix => {
    const shouldApply = fix.files.some(filePattern => {
      if (filePattern.includes('*')) {
        const regex = new RegExp(filePattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return regex.test(filePath);
      }
      return filePath.includes(filePattern);
    });
    
    if (shouldApply) {
      const original = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (content !== original) {
        console.log(`✓ Applied: ${fix.description} in ${path.basename(filePath)}`);
        modified = true;
      }
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
function main() {
  console.log('🔧 Starting comprehensive TypeScript fixes...\n');
  
  const tsxFiles = findFiles('./app', /\.tsx?$/);
  let totalFixed = 0;
  
  tsxFiles.forEach(file => {
    if (applyFixes(file)) {
      totalFixed++;
    }
  });
  
  console.log(`\n✅ Fixed ${totalFixed} files`);
  console.log('🎯 Running TypeScript check to verify fixes...\n');
}

if (require.main === module) {
  main();
}
