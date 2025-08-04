#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Finding and fixing quote mismatches in import statements...');

function fixQuoteMismatches(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix mismatched quotes in import statements
  // Pattern: from "something'
  content = content.replace(/from\s+"([^"]*?)'/g, 'from "$1"');
  
  // Pattern: from 'something"
  content = content.replace(/from\s+'([^']*?)"/g, "from '$1'");
  
  // Pattern: import ... from "something'
  content = content.replace(/import\s+.*?\s+from\s+"([^"]*?)'/g, (match, path) => {
    return match.replace(`"${path}'`, `"${path}"`);
  });
  
  // Pattern: import ... from 'something"
  content = content.replace(/import\s+.*?\s+from\s+'([^']*?)"/g, (match, path) => {
    return match.replace(`'${path}"`, `'${path}'`);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed quote mismatches in: ${filePath}`);
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
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js'))) {
      if (fixQuoteMismatches(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

const projectRoot = process.cwd();
const fixedFiles = processDirectory(projectRoot);
console.log(`🎉 Fixed ${fixedFiles} files with quote mismatches.`);
