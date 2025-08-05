#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Finding and fixing all malformed import paths...');

function fixMalformedImports(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix various malformed import patterns
  content = content.replace(/from\s+['"]\.\.\/\.\.\.\/\.\.\//g, 'from "../../');
  content = content.replace(/from\s+['"]\.\.\/\.\.\.\/\.\.\//g, "from '../../");
  content = content.replace(/from\s+['"]\.\.\/\.\.\.\//g, 'from "../../');
  content = content.replace(/from\s+['"]\.\.\/\.\.\.\//g, "from '../../");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\//g, 'from "../../');
  content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\//g, "from '../../");
  
  // Handle import statements with these patterns
  content = content.replace(/import\s+.*\s+from\s+['"]\.\.\/\.\.\.\/\.\.\//g, (match) => {
    return match.replace(/['"]\.\.\/\.\.\.\/\.\.\//g, '"../../');
  });
  
  content = content.replace(/import\s+.*\s+from\s+['"]\.\.\/\.\.\.\//g, (match) => {
    return match.replace(/['"]\.\.\/\.\.\.\//g, '"../../');
  });
  
  // Fix patterns in the middle of import statements
  content = content.replace(/['"]\.\.\/\.\.\.\/\.\.\//g, '"../../');
  content = content.replace(/['"]\.\.\/\.\.\.\//g, '"../../');
  
  // Handle single quotes too
  content = content.replace(/'\.\.\/\.\.\.\/\.\.\//g, "'../../");
  content = content.replace(/'\.\.\/\.\.\.\//g, "'../../");
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
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
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== '.next') {
      fixedCount += processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js'))) {
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
