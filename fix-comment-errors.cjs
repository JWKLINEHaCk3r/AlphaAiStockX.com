const fs = require('fs');
const path = require('path');

function fixCommentErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix broken comments (lines that start with words that should be comments)
    const brokenCommentRegex = /^(\s*)(Mock|Handle|Registration|Validate|Process)([^\/]*$)/gm;
    if (brokenCommentRegex.test(content)) {
      content = content.replace(brokenCommentRegex, '$1// $2$3');
      changed = true;
    }

    // Fix incomplete comment lines
    const incompleteCommentRegex = /^(\s*)\/\/(\s*)$/gm;
    if (incompleteCommentRegex.test(content)) {
      content = content.replace(incompleteCommentRegex, '$1// TODO: Complete this comment');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed comment errors in: ${filePath}`);
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
console.log(`Starting comment error fixes in: ${projectRoot}`);

const files = walkDirectory(path.join(projectRoot, 'app/api'));
let fixedCount = 0;

for (const file of files) {
  if (fixCommentErrors(file)) {
    fixedCount++;
  }
}

console.log(`\nCompleted! Fixed comment errors in ${fixedCount} files out of ${files.length} total files.`);
