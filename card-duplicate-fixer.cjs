const fs = require('fs');
const path = require('path');

// Find files with Card duplicate identifier issues
function findCardDuplicateFiles(dir, files = []) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      findCardDuplicateFiles(filePath, files);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for duplicate Card imports
        const cardImportPattern = /import.*Card.*from.*card/g;
        const matches = content.match(cardImportPattern);
        
        if (matches && matches.length > 1) {
          files.push(filePath);
        }
      } catch (error) {
        console.log(`Error reading ${filePath}: ${error.message}`);
      }
    }
  }
  
  return files;
}

// Fix Card duplicate imports
function fixCardDuplicates(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract all imports
    const lines = content.split('\n');
    const imports = [];
    const otherLines = [];
    let inImportSection = true;
    
    for (const line of lines) {
      if (line.trim().startsWith('import ')) {
        imports.push(line);
      } else if (line.trim() === '' && inImportSection) {
        // Empty line, continue
      } else {
        if (inImportSection && line.trim() !== '' && !line.trim().startsWith('//')) {
          inImportSection = false;
        }
        if (!inImportSection) {
          otherLines.push(line);
        }
      }
    }
    
    // Consolidate Card imports
    const cardImports = imports.filter(line => line.includes('card'));
    const otherImports = imports.filter(line => !line.includes('card'));
    
    if (cardImports.length > 1) {
      // Create consolidated Card import
      const consolidatedCardImport = "import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../../../components/ui/card';";
      
      // Rebuild content
      const newContent = [
        "'use client';",
        '',
        'import React from \'react\';',
        consolidatedCardImport,
        ...otherImports.filter(line => !line.includes('React from \'react\'')),
        '',
        ...otherLines
      ].join('\n');
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('🔍 Finding files with Card duplicate imports...');
const cardDuplicateFiles = findCardDuplicateFiles('./app');

console.log(`📁 Found ${cardDuplicateFiles.length} files with Card duplicates`);

let fixedCount = 0;
for (const filePath of cardDuplicateFiles) {
  if (fixCardDuplicates(filePath)) {
    console.log(`✅ Fixed ${filePath}`);
    fixedCount++;
  }
}

console.log(`\n🎉 Fixed ${fixedCount} Card duplicate files`);

// Test build
console.log('\n🔍 Testing build...');
const { execSync } = require('child_process');
try {
  execSync('npx next build --no-lint', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build still has issues, checking next error...');
}
