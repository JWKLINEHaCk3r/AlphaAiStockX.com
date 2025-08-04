#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkAndFixExports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.tsx');
    
    // Check if it's a component file (starts with capital letter)
    if (!fileName[0] || fileName[0] !== fileName[0].toUpperCase()) {
      return false;
    }
    
    // Check if function is declared but not exported
    const functionDeclarationRegex = new RegExp(`function\\s+${fileName}\\s*\\(`, 'g');
    const defaultExportRegex = new RegExp(`export\\s+default\\s+(function\\s+)?${fileName}`, 'g');
    const hasFunction = functionDeclarationRegex.test(content);
    const hasDefaultExport = defaultExportRegex.test(content);
    
    if (hasFunction && !hasDefaultExport) {
      // Add export default if missing
      const fixedContent = content.replace(
        new RegExp(`(function\\s+${fileName}\\s*\\([^}]*\\}\\s*$)`, 'm'),
        `export default $1`
      );
      
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`✅ Added export default to: ${filePath}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error checking ${filePath}:`, error.message);
    return false;
  }
}

function findComponentFiles(dir) {
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
        } else if (item.endsWith('.tsx') && item[0] === item[0].toUpperCase()) {
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

console.log('🔧 Checking component exports...\n');

const aiToolsDir = path.join(process.cwd(), 'app/components/ai-tools');
const componentFiles = findComponentFiles(aiToolsDir);

let fixedFiles = 0;
componentFiles.forEach(file => {
  if (checkAndFixExports(file)) {
    fixedFiles++;
  }
});

console.log(`\n✅ Export checking complete!`);
console.log(`🔧 Files fixed: ${fixedFiles}`);
