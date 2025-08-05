#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Fixing UI component import paths...');

function fixUIImportPaths(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Get the relative path depth from the file to the root
  const relativePath = path.relative(process.cwd(), filePath);
  const depth = relativePath.split(path.sep).length - 1;
  
  // Calculate the correct path to components/ui from this file
  const pathToComponents = '../'.repeat(depth) + 'components/ui/';
  
  // Fix imports from "../../components/ui/" to the correct path
  content = content.replace(/from\s+["']\.\.\/\.\.\/components\/ui\/([^"']+)["']/g, 
    `from "${pathToComponents}$1"`);
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed UI import paths in: ${filePath}`);
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
      if (fixUIImportPaths(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

const projectRoot = process.cwd();
const fixedFiles = processDirectory(projectRoot);
console.log(`🎉 Fixed ${fixedFiles} files with incorrect UI import paths.`);
