const fs = require('fs');
const path = require('path');

// Function to find all corrupted TypeScript/TSX files
function findCorruptedFiles(dir, corrupted = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findCorruptedFiles(filePath, corrupted);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for corruption patterns
        const corruptionPatterns = [
          /import.*Card.*from.*card\.js';/,  // Wrong extension
          /import.*Card.*from.*card\.tsx';/, // Wrong extension
          /import.*React.*from 'react';\s*import.*React.*from 'react';/, // Duplicate React import
          /import.*Card.*Card/, // Duplicate Card import
          /}\s*const \[/, // Missing semicolon before const
          /}\),/, // Invalid syntax pattern
          /;\s*,/, // Invalid punctuation
        ];
        
        let isCorrupted = false;
        for (const pattern of corruptionPatterns) {
          if (pattern.test(content)) {
            isCorrupted = true;
            break;
          }
        }
        
        if (isCorrupted) {
          corrupted.push(filePath);
        }
      } catch (error) {
        console.log(`Error reading file ${filePath}: ${error.message}`);
      }
    }
  }
  
  return corrupted;
}

// Function to fix corrupted imports in a file
function fixCorruptedFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Fix import patterns
    const fixes = [
      // Fix wrong Card import extensions
      {
        pattern: /import\s*{\s*([^}]*Card[^}]*)\s*}\s*from\s*['"]([^'"]*card)\.js['"];?/g,
        replacement: "import { $1 } from '$2';"
      },
      {
        pattern: /import\s*{\s*([^}]*Card[^}]*)\s*}\s*from\s*['"]([^'"]*card)\.tsx['"];?/g,
        replacement: "import { $1 } from '$2';"
      },
      // Remove duplicate React imports
      {
        pattern: /import\s+React\s+from\s+['"]react['"];\s*import\s+React\s+from\s+['"]react['"];?/g,
        replacement: "import React from 'react';"
      },
      // Fix invalid syntax patterns
      {
        pattern: /}\s*const\s*\[/g,
        replacement: "};\n\n  const ["
      },
      {
        pattern: /}\),/g,
        replacement: "});"
      },
      {
        pattern: /;\s*,/g,
        replacement: ";"
      }
    ];
    
    for (const fix of fixes) {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }
    
    // Remove duplicate imports for same module
    const lines = content.split('\n');
    const cleanedLines = [];
    const seenImports = new Set();
    
    for (const line of lines) {
      if (line.trim().startsWith('import ')) {
        // Normalize the import line for comparison
        const normalizedLine = line.trim().replace(/\s+/g, ' ');
        if (!seenImports.has(normalizedLine)) {
          seenImports.add(normalizedLine);
          cleanedLines.push(line);
        } else {
          changed = true;
        }
      } else {
        cleanedLines.push(line);
      }
    }
    
    if (changed) {
      const fixedContent = cleanedLines.join('\n');
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`Error fixing file ${filePath}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('🔍 Finding corrupted files...');
const corruptedFiles = findCorruptedFiles('./app');

console.log(`📁 Found ${corruptedFiles.length} corrupted files`);

let fixedCount = 0;
for (const filePath of corruptedFiles) {
  if (fixCorruptedFile(filePath)) {
    console.log(`✅ Fixed ${filePath}`);
    fixedCount++;
  } else {
    console.log(`⚠️  Could not auto-fix ${filePath}`);
  }
}

console.log(`\n🎉 Fixed ${fixedCount} out of ${corruptedFiles.length} corrupted files`);

// Test build
console.log('\n🔍 Testing build...');
const { execSync } = require('child_process');
try {
  execSync('npx next build --no-lint', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build still has issues');
}
