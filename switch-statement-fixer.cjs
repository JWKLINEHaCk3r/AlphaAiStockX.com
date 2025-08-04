#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixSwitchStatements(content) {
  // Fix switch statement default case with comma instead of semicolon
  return content.replace(
    /(default:\s*return\s+[^,;}]+),(\s*})/g, 
    '$1;$2'
  );
}

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixSwitchStatements(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed switch statements in: ${filePath}`);
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

console.log('🔧 Fixing switch statement syntax...\n');

const filesToCheck = findFilesToFix(process.cwd());
let fixedFiles = 0;

filesToCheck.forEach(file => {
  if (fixFile(file)) {
    fixedFiles++;
  }
});

console.log(`\n✅ Switch statement fixing complete!`);
console.log(`🔧 Files fixed: ${fixedFiles}`);
