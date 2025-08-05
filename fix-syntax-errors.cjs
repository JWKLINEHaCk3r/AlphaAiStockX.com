const fs = require('fs');
const path = require('path');

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix switch statement comma issues
    const switchCaseCommaRegex = /(case\s+[^:]+:\s*return\s+[^,;]+),(\s*$)/gm;
    if (switchCaseCommaRegex.test(content)) {
      content = content.replace(switchCaseCommaRegex, '$1;$2');
      changed = true;
    }

    // Fix default case comma issues in switch statements
    const defaultCaseCommaRegex = /(default:\s*return\s+[^,;]+),(\s*$)/gm;
    if (defaultCaseCommaRegex.test(content)) {
      content = content.replace(defaultCaseCommaRegex, '$1;$2');
      changed = true;
    }

    // Fix object literal comma issues at start of line
    const objectCommaRegex = /(\{\s*),/g;
    if (objectCommaRegex.test(content)) {
      content = content.replace(objectCommaRegex, '$1');
      changed = true;
    }

    // Fix array comma issues at start
    const arrayCommaRegex = /(\[\s*),/g;
    if (arrayCommaRegex.test(content)) {
      content = content.replace(arrayCommaRegex, '$1');
      changed = true;
    }

    // Fix stray commas after closing braces/parentheses
    const strayCommaRegex = /(\}\s*),(\s*[\[\{])/g;
    if (strayCommaRegex.test(content)) {
      content = content.replace(strayCommaRegex, '$1,$2');
      changed = true;
    }

    // Fix missing commas between object elements
    const missingCommaRegex = /(\})\s*(\{)/g;
    if (missingCommaRegex.test(content)) {
      content = content.replace(missingCommaRegex, '$1,\n    $2');
      changed = true;
    }

    // Fix unterminated string literals that continue on next line  
    const unterminatedStringRegex = /('[^']*)\n\s*([^']*')/g;
    if (unterminatedStringRegex.test(content)) {
      content = content.replace(unterminatedStringRegex, '$1 $2');
      changed = true;
    }

    // Fix stray commas in JSX attributes
    const jsxCommaRegex = /(\s+className="[^"]*")\s*,(\s*)/g;
    if (jsxCommaRegex.test(content)) {
      content = content.replace(jsxCommaRegex, '$1$2');
      changed = true;
    }

    // Fix React.Children.map syntax issues
    const childrenMapRegex = /(React\.Children\.map\(children)\s*([^,)]+)\s*=>/g;
    if (childrenMapRegex.test(content)) {
      content = content.replace(childrenMapRegex, '$1, ($2) =>');
      changed = true;
    }

    // Fix interface/type comma/semicolon issues
    const interfaceCommaRegex = /(\w+:\s*[^,;]+),(\s*$)/gm;
    if (interfaceCommaRegex.test(content)) {
      content = content.replace(interfaceCommaRegex, '$1;$2');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed syntax errors in: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  return false;
}

function walkDirectory(dir, fileExtensions = ['.ts', '.tsx', '.js', '.jsx']) {
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
console.log(`Starting syntax error fixes in: ${projectRoot}`);

const files = walkDirectory(projectRoot);
let fixedCount = 0;

for (const file of files) {
  if (fixSyntaxErrors(file)) {
    fixedCount++;
  }
}

console.log(`\nCompleted! Fixed syntax errors in ${fixedCount} files out of ${files.length} total files.`);
