const fs = require('fs');
const path = require('path');

function fixAPIRouteErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix function parameter comma issues (semicolon instead of comma)
    const paramCommaRegex = /(\w+:\s*[^,;]+);(\s*\w+:)/g;
    if (paramCommaRegex.test(content)) {
      content = content.replace(paramCommaRegex, '$1,$2');
      changed = true;
    }

    // Fix object property semicolon issues in API responses
    const objPropSemicolonRegex = /(\w+:\s*[^,;]+);(\s*\w+:)/g;
    if (objPropSemicolonRegex.test(content)) {
      content = content.replace(objPropSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix string literal semicolon issues
    const stringLiteralSemicolonRegex = /('[^']*');(\s*\w+:)/g;
    if (stringLiteralSemicolonRegex.test(content)) {
      content = content.replace(stringLiteralSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix number literal semicolon issues
    const numberLiteralSemicolonRegex = /(\d+\.?\d*);(\s*\w+:)/g;
    if (numberLiteralSemicolonRegex.test(content)) {
      content = content.replace(numberLiteralSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix comment break issues
    const commentBreakRegex = /(\/\/.*?)\s+(\w+)/g;
    if (commentBreakRegex.test(content)) {
      content = content.replace(commentBreakRegex, '$1\n    $2');
      changed = true;
    }

    // Fix missing comma before closing brace in JSON
    const missingCommaBeforeBraceRegex = /([^,\s])(\s*\})/g;
    if (missingCommaBeforeBraceRegex.test(content)) {
      // Only add comma if the line doesn't already have one
      content = content.replace(/([^,\s{])(\s*\n\s*\})/g, '$1$2');
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed API route errors in: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  return false;
}

function walkDirectory(dir, fileExtensions = ['.ts', '.tsx']) {
  const files = [];
  
  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath);
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(entry)) {
          walk(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(entry);
        if (fileExtensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

// Main execution
const projectRoot = process.cwd();
console.log(`Starting API route error fixes in: ${projectRoot}`);

const files = walkDirectory(path.join(projectRoot, 'app/api'));
let fixedCount = 0;

for (const file of files) {
  if (fixAPIRouteErrors(file)) {
    fixedCount++;
  }
}

console.log(`\nCompleted! Fixed API route errors in ${fixedCount} files out of ${files.length} total files.`);
