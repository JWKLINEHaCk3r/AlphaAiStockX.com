#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixInterfaceSyntax(content) {
  // Fix interface properties with trailing commas instead of semicolons
  return content.replace(
    /^(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*\??:\s*[^,;}]+),(\s*$)/gm,
    '$1$2;$3'
  );
}

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixInterfaceSyntax(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed interface syntax in: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findFilesToFix(dir, extensions = ['.ts', '.tsx']) {
  const files = [];
  
  function scan(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!['node_modules', '.next', '.git'].includes(item)) {
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

console.log('🔧 Fixing interface syntax...\n');

const filesToCheck = findFilesToFix(process.cwd());
let fixedFiles = 0;

filesToCheck.forEach(file => {
  if (fixFile(file)) {
    fixedFiles++;
  }
});

console.log(`\n✅ Interface syntax fixing complete!`);
console.log(`🔧 Files fixed: ${fixedFiles}`);
