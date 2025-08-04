#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fixPatterns = [
  // Complex object property semicolon fixes
  {
    pattern: /(\w+):\s*([^,;{}]+);/g,
    replacement: '$1: $2,',
    description: 'Fix property: value; to property: value,'
  },
  // Array element semicolon fixes  
  {
    pattern: /(\s*});\s*\{/g,
    replacement: '$1, {',
    description: 'Fix array element }; to },'
  },
  // NextResponse.json parameter fixes
  {
    pattern: /NextResponse\.json\(\s*(\{[^}]+)\s*;\s*(\{[^}]+)\s*\)/g,
    replacement: 'NextResponse.json($1, $2)',
    description: 'Fix NextResponse.json( params ; to NextResponse.json( params ,'
  },
  // Object ending semicolon fixes
  {
    pattern: /(\w+:\s*[^,;{}]+);(\s*})/g,
    replacement: '$1$2',
    description: 'Fix trailing property semicolons before }'
  },
  // Function call parameter semicolon fixes
  {
    pattern: /(\([^)]*)\s*;\s*(\{[^}]*\}\s*\))/g,
    replacement: '$1, $2',
    description: 'Fix function parameter semicolons'
  }
];

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixedContent = content;
    let fileChanged = false;

    fixPatterns.forEach(({ pattern, replacement, description }) => {
      const before = fixedContent;
      fixedContent = fixedContent.replace(pattern, replacement);
      if (before !== fixedContent) {
        fileChanged = true;
        console.log(`  ✓ Applied: ${description}`);
      }
    });

    if (fileChanged) {
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findFilesToFix(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];
  
  function scan(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(item)) {
            scan(fullPath);
          }
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning ${currentDir}:`, error.message);
    }
  }
  
  scan(dir);
  return files;
}

// Main execution
console.log('🔧 Starting comprehensive syntax fixing...\n');

const projectRoot = process.cwd();
const filesToCheck = findFilesToFix(projectRoot);

console.log(`📁 Found ${filesToCheck.length} files to check\n`);

let fixedFiles = 0;
filesToCheck.forEach(file => {
  if (fixFile(file)) {
    fixedFiles++;
  }
});

console.log(`\n✅ Comprehensive syntax fixing complete!`);
console.log(`📊 Files processed: ${filesToCheck.length}`);
console.log(`🔧 Files fixed: ${fixedFiles}`);
