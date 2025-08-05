const fs = require('fs');
const path = require('path');

function fixAllAPIIssues(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix incomplete comments (words that should be part of comments)
    const incompleteCommentWords = ['Return', 'Handle', 'Mock', 'Registration', 'Validate', 'Process', 'Fetch', 'Update', 'Delete', 'Create'];
    for (const word of incompleteCommentWords) {
      const regex = new RegExp(`^(\\s*)${word}([^/\\n]*)$`, 'gm');
      if (regex.test(content)) {
        content = content.replace(regex, `$1// ${word}$2`);
        changed = true;
      }
    }

    // Fix array element semicolons (should be commas)
    const arrayElementSemicolonRegex = /(\s*\})\s*;\s*(\n\s*\{)/g;
    if (arrayElementSemicolonRegex.test(content)) {
      content = content.replace(arrayElementSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix function call semicolons (NextResponse.json)
    const nextResponseSemicolonRegex = /(NextResponse\.json\(\s*\{[^}]+\})\s*;\s*(\n\s*\{)/g;
    if (nextResponseSemicolonRegex.test(content)) {
      content = content.replace(nextResponseSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix object property value semicolons inside objects
    const objPropertySemicolonRegex = /(\w+:\s*[^,;{}]+);(\s*\n\s*\w+:)/g;
    if (objPropertySemicolonRegex.test(content)) {
      content = content.replace(objPropertySemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix number value semicolons
    const numberSemicolonRegex = /(\d+\.?\d*);(\s*\n\s*\w+:)/g;
    if (numberSemicolonRegex.test(content)) {
      content = content.replace(numberSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix string value semicolons
    const stringSemicolonRegex = /('[^']*'|"[^"]*");(\s*\n\s*\w+:)/g;
    if (stringSemicolonRegex.test(content)) {
      content = content.replace(stringSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix boolean value semicolons
    const booleanSemicolonRegex = /(true|false);(\s*\n\s*\w+:)/g;
    if (booleanSemicolonRegex.test(content)) {
      content = content.replace(booleanSemicolonRegex, '$1,$2');
      changed = true;
    }

    // Fix NextResponse.json parameter semicolons
    const nextResponseParamSemicolonRegex = /(NextResponse\.json\([^)]+);(\s*\n\s*\{)/g;
    if (nextResponseParamSemicolonRegex.test(content)) {
      content = content.replace(nextResponseParamSemicolonRegex, '$1,$2');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed all API issues in: ${filePath}`);
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
console.log(`Starting comprehensive API fixes in: ${projectRoot}`);

const files = walkDirectory(path.join(projectRoot, 'app/api'));
let fixedCount = 0;

for (const file of files) {
  if (fixAllAPIIssues(file)) {
    fixedCount++;
  }
}

console.log(`\nCompleted! Fixed comprehensive API issues in ${fixedCount} files out of ${files.length} total files.`);
