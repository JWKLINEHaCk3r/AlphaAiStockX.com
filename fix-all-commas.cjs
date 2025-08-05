#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Fixing all types of missing commas...');

function fixAllCommas(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix missing commas in object properties (identifier: value } identifier: value)
  content = content.replace(/(\w+:\s*[^,\n}]+)\s*}\s*(\w+:)/g, '$1 }, $2');
  
  // Fix missing commas between object elements ({ ... } { ... })
  content = content.replace(/(\s*})\s*(\s*{)/g, '$1,$2');
  
  // Fix missing commas in arrays and objects where line ends without comma
  // Pattern: value } newline identifier:
  content = content.replace(/(\w+:\s*[^,\n}]+)\s*}\s*\n\s*(\w+:)/g, '$1 },\n    $2');
  
  // Pattern: value newline identifier: (within objects)
  content = content.replace(/(\w+:\s*[^,\n}]+)\s*\n\s*(\w+:)/g, '$1,\n    $2');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed all comma issues in: ${filePath}`);
    return true;
  }
  
  return false;
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  let fixedCount = 0;
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== '.next') {
      fixedCount += processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      if (fixAllCommas(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

const projectRoot = process.cwd();
const fixedFiles = processDirectory(projectRoot);
console.log(`🎉 Fixed ${fixedFiles} files with all types of comma issues.`);
