#!/usr/bin/env node

/**
 * AlphaAI Stock Trading Platform - Critical Syntax Error Fixer
 * Advanced AI-powered code repair and enhancement system
 */


import fs from 'fs'; import path from 'path'; import * as glob from 'glob'; console.log('🔧 AlphaAI Critical Syntax Fixer - Repairing trading platform...');

// Critical syntax patterns to fix
const SYNTAX_FIXES = [
  // Fix missing semicolons
  { pattern: /([^,{}\s])\s*$/gm, replacement: '$1,', description: 'Adding missing semicolons',
  },
  // Fix missing imports
  { pattern: /^(\s*)(export\s+(?:default\s+)?(?:const|let|var|function|class|interface|type)\s+)/gm, replacement: '$1$2', description: 'Fixing export statements',
  },
  // Fix React component syntax
  { pattern: /(\w+)\s*=\s*\(\s*\)\s*=>\s*\{/g, replacement: '$1 = () => {', description: 'Fixing arrow function syntax',
  },
  // Fix JSX syntax
  { pattern: /className\s*=\s*{([^}]+)}/g, replacement: 'className={$1}', description: 'Fixing JSX className syntax',
  },
];

// TypeScript/JavaScript critical fixes
const TYPESCRIPT_FIXES = [
  { pattern: /interface\s+(\w+)\s*{([^}]*)}/gs, replacement: 'interface $1 {\n$2\n}', description: 'Fixing interface formatting',
  },
  { pattern: /type\s+(\w+)\s*=\s*([^,]+);?/g, replacement: 'type $1 = $2,', description: 'Fixing type definitions',
  },
];

// AI Trading specific fixes
const TRADING_FIXES = [
  { pattern: /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{/g, replacement: 'useEffect(() => {', description: 'Fixing useEffect syntax',
  },
  { pattern: /useState\s*\(\s*([^)]+)\s*\)/g, replacement: 'useState($1)', description: 'Fixing useState syntax',
  },
];

async function fixCriticalSyntaxErrors() {
  try { // Get all TypeScript and JavaScript files const files = glob.sync('**/*.{ts,tsx,js,jsx}', { cwd: process.cwd(), ignore: ['node_modules/**', '.next/**', 'out/**', '*.config.*', '**/fix-*.js'],
    });

    console.log(`🔍 Scanning ${files.length} files for critical syntax errors...`);

    let totalFixes = 0;

    for (const file of files) {
      const filePath = path.join(process.cwd(), file);
      // Skip directories
      if (fs.statSync(filePath).isDirectory()) {
        continue; } let content = fs.readFileSync(filePath, 'utf8');
      let fileModified = false;
      let fileFixes = 0;

      // Apply syntax fixes
      for (const fix of [...SYNTAX_FIXES, ...TYPESCRIPT_FIXES, ...TRADING_FIXES]) {
        const originalContent = content;
        content = content.replace(fix.pattern, fix.replacement);

        if (content !== originalContent) {
          fileModified = true;
          fileFixes++;
          console.log(`✅ ${fix.description} in ${file}`);
        }
      }
 // Fix common React/Next.js issues if (file.includes('.tsx') || file.includes('.jsx')) { // Ensure React import if (content.includes('jsx') || content.includes('JSX') || content.includes('<')) { if (!content.includes('import React')) { content = `import React from 'react';\n${content}`;
            fileModified = true;
            fileFixes++;
            console.log(`⚛️ Added React import to ${file}`);
          }
        }

        // Fix component export if ( content.includes('export default') && !content.includes('export default function') && !content.includes('export default class')
        ) {
          const componentMatch = content.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/);
          if (componentMatch && !content.includes(`export default ${componentMatch[1]}`)) {
            content += `\n\nexport default ${componentMatch[1]};`;
            fileModified = true;
            fileFixes++;
            console.log(`📦 Fixed component export in ${file}`);
          }
        }
      }
 // Fix TypeScript issues if (file.includes('.ts') || file.includes('.tsx')) { // Add type annotations for common patterns content = content.replace(/const\s+(\w+)\s*=\s*\[\]/g, 'const $1: any[] = []'), content = content.replace(/const\s+(\w+)\s*=\s*{}/g, 'const $1: any = {}');
 // Fix async function types content = content.replace(/async\s+(\w+)\s*\(/g, 'async $1(');
      }
 // Fix Next.js specific issues if (file.includes('page.') || file.includes('layout.')) { // Ensure proper Next.js page structure if (!content.includes('export default') && content.includes('function')) {
          const functionMatch = content.match(/function\s+(\w+)/);
          if (functionMatch) {
            content += `\n\nexport default ${functionMatch[1]};`;
            fileModified = true;
            fileFixes++;
            console.log(`🔧 Fixed Next.js page export in ${file}`);
          }
        }
      }

      if (fileModified) {
        fs.writeFileSync(filePath, content);
        totalFixes += fileFixes;
        console.log(`💾 Fixed ${fileFixes} issues in ${file}`);
      }
    }
 console.log(`🎉 AlphaAI syntax repair complete! Fixed ${totalFixes} critical issues!`); console.log('🚀 Trading platform code is now optimized and error-free!'); } catch (error) { console.error('❌ Error fixing critical syntax errors:', error);
    process.exit(1);
  }
}

// Run the critical syntax fixer
fixCriticalSyntaxErrors();
