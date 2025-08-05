const fs = require('fs');
const path = require('path');

function fixObjectLiteralSyntax(content) {
  // Fix object properties that incorrectly use semicolons instead of commas
  
  // Fix single-line object properties (property: value; -> property: value,)
  content = content.replace(/(\w+):\s*([^,{;]+);(\s*(?:\w+:|}))/g, '$1: $2,$3');
  
  // Fix function parameter syntax (param: type; -> param: type,)
  content = content.replace(/(\w+):\s*([A-Za-z\[\]<>{}|\s]+);(\s*\w+:)/g, '$1: $2,$3');
  
  // Fix object literal properties in arrays and objects
  content = content.replace(/(\w+):\s*([^,{;]+);(\s*[}\]])/g, '$1: $2$3');
  
  // Fix missing commas in object literals
  content = content.replace(/(\w+):\s*([^,{;]+)(\s+\w+:)/g, '$1: $2,$3');
  
  // Fix email; username patterns (should be email, username)
  content = content.replace(/email;\s*username/g, 'email, username');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixObjectLiteralSyntax(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findTypeScriptFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.') && 
          !['node_modules', 'dist', 'build'].includes(item.name)) {
        files.push(...findTypeScriptFiles(fullPath));
      } else if (item.isFile() && /\.(ts|tsx)$/.test(item.name)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Process all TypeScript files
const rootDir = process.cwd();
const tsFiles = findTypeScriptFiles(rootDir);

console.log(`Processing ${tsFiles.length} TypeScript files...`);

let fixedCount = 0;
for (const file of tsFiles) {
  if (processFile(file)) {
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} files with object literal syntax issues.`);
