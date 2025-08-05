#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Finding and fixing malformed import paths...');

function fixMalformedImports(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix malformed paths like '../.../../' 
  const oldContent = content;
  content = content.replace(/\.\.\/\.\.\/\.\.\//g, '../../');
  content = content.replace(/\.\.\/\.\.\//g, '../../');
  content = content.replace(/\.\.\.\.\//g, '../');
  content = content.replace(/\.\.\.\.\.\//g, '../../');
  
  if (content !== oldContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed malformed imports in: ${filePath}`);
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
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      fixedCount += processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      if (fixMalformedImports(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

const projectRoot = process.cwd();
const fixedFiles = processDirectory(projectRoot);
console.log(`🎉 Fixed ${fixedFiles} files with malformed import paths.`);
