#!/usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');

console.log('🔧 FINAL Comprehensive Cleanup');
console.log('===============================');

async function fixAllRemainingIssues() {
  try {
    const files = glob.sync('app/**/*.{ts,tsx}').filter(f => 
      !f.includes('node_modules') && 
      !f.includes('.next') &&
      fs.existsSync(f)
    );
    
    console.log(`📁 Processing ${files.length} files for final cleanup...`);
    
    let totalFixed = 0;
    
    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf-8');
        const originalContent = content;
        
        // Fix all remaining syntax issues:
        
        // 1. Fix trailing commas in objects/arrays
        content = content.replace(/,\s*([}\]])/g, '$1');
        
        // 2. Fix objects with trailing commas before properties
        content = content.replace(/,\s*\n\s*([a-zA-Z_$][a-zA-Z0-9_$]*\s*:)/g, ',\n    $1');
        
        // 3. Fix function parameter syntax
        content = content.replace(/\{\s*([^}]+);\s*([^}]+)\s*\}/g, '{ $1, $2 }');
        
        // 4. Fix duplicate 'use client' directives
        const useClientMatches = content.match(/"use client";?/g);
        if (useClientMatches && useClientMatches.length > 1) {
          content = content.replace(/"use client";?/g, '');
          content = '"use client";\n' + content;
        }
        
        // 5. Move 'use client' to top if not already there
        if (content.includes('"use client"') && !content.trim().startsWith('"use client"')) {
          content = content.replace(/"use client";?\s*/g, '');
          content = '"use client";\n' + content;
        }
        
        // 6. Fix semicolons that should be commas in JSX attributes
        content = content.replace(/(\w+="[^"]*");\s*(\w+=)/g, '$1 $2');
        
        // 7. Fix semicolons in object properties
        content = content.replace(/(\w+:\s*[^,{};\n]+);\s*(\w+:)/g, '$1,\n    $2');
        
        // 8. Fix Inter font import syntax
        content = content.replace(/const inter = Inter\(\{,\s*subsets: \['latin'\]\s*\}\);/g, 
          'const inter = Inter({ subsets: [\'latin\'] });');
        
        // 9. Fix incomplete array/object syntax
        content = content.replace(/\{\s*,\s*/g, '{ ');
        content = content.replace(/,\s*,/g, ',');
        
        // 10. Fix useState declarations
        content = content.replace(/useState\(\{\s*([^}]+),\s*([^}]+)\s*\}\);/g, 
          'useState({ $1, $2 });');
        
        // 11. Clean up duplicate imports
        const lines = content.split('\n');
        const cleanedLines = [];
        const seenImports = new Set();
        
        for (const line of lines) {
          if (line.trim().startsWith('import ')) {
            if (!seenImports.has(line.trim())) {
              seenImports.add(line.trim());
              cleanedLines.push(line);
            }
          } else {
            cleanedLines.push(line);
          }
        }
        
        content = cleanedLines.join('\n');
        
        // 12. Final cleanup of malformed syntax patterns
        content = content.replace(/\s*,\s*\n\s*([}\]])/g, '\n$1');
        content = content.replace(/([{,])\s*,/g, '$1');
        
        if (content !== originalContent) {
          fs.writeFileSync(file, content);
          totalFixed++;
          console.log(`✅ Fixed ${file}`);
        }
        
      } catch (error) {
        console.log(`⚠️  Error processing ${file}: ${error.message}`);
      }
    }
    
    console.log(`\n✅ Final cleanup complete!`);
    console.log(`🔧 Fixed ${totalFixed} files`);
    console.log(`🚀 All syntax errors should now be resolved!`);
    
  } catch (error) {
    console.error('❌ Error during final cleanup:', error);
    process.exit(1);
  }
}

fixAllRemainingIssues();
