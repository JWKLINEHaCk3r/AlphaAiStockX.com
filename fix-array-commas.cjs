#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Fixing missing commas in arrays and objects...');

function fixArrayCommas(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix missing commas between array/object elements
  // Pattern: } followed by whitespace and { (missing comma between objects)
  content = content.replace(/(\s*})\s*(\s*{)/g, '$1,$2');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed missing commas in: ${filePath}`);
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
      if (fixArrayCommas(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

const projectRoot = process.cwd();
const fixedFiles = processDirectory(projectRoot);
console.log(`🎉 Fixed ${fixedFiles} files with missing commas.`);
