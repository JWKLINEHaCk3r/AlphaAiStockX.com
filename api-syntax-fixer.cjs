const fs = require('fs');
const path = require('path');

function fixAllSyntaxIssues(content) {
  // Fix return statements ending with comma instead of semicolon
  content = content.replace(/return\s+NextResponse\.json\([^}]+}\s*\),\s*}/g, (match) => {
    return match.replace(/\),\s*}/, '); }');
  });
  
  // Fix object properties using semicolons instead of commas
  content = content.replace(/(\w+):\s*([^,{};\n]+);(\s*[^}])/g, '$1: $2,$3');
  
  // Fix standalone returns ending with comma
  content = content.replace(/\)\s*,\s*\n\s*}\s*catch/g, ');\n  } catch');
  content = content.replace(/\)\s*,\s*\n\s*}/g, ');\n}');
  
  // Fix try-catch block syntax
  content = content.replace(/}\s*catch\s*\(/g, '} catch (');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixAllSyntaxIssues(content);
    
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

function findApiFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.')) {
        files.push(...findApiFiles(fullPath));
      } else if (item.isFile() && item.name === 'route.ts') {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Process all API route files
const apiDir = './app/api';
const apiFiles = findApiFiles(apiDir);

console.log(`Processing ${apiFiles.length} API route files...`);

let fixedCount = 0;
for (const file of apiFiles) {
  if (processFile(file)) {
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} API route files with syntax issues.`);
