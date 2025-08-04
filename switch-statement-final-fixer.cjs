const fs = require('fs');
const path = require('path');

function fixSwitchStatements(content) {
  // Fix inline switch statements with trailing commas in default case
  content = content.replace(
    /(default:\s*return\s*'[^']+'),(\s*}\s*};)/g,
    '$1;$2'
  );
  
  // Also fix other patterns
  content = content.replace(
    /(default:\s*return\s*`[^`]+`),(\s*}\s*};)/g,
    '$1;$2'
  );
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixSwitchStatements(content);
    
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

function findTsxFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.') && 
          !['node_modules', 'dist', 'build'].includes(item.name)) {
        files.push(...findTsxFiles(fullPath));
      } else if (item.isFile() && item.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

// Process all TSX files
const rootDir = process.cwd();
const tsxFiles = findTsxFiles(rootDir);

console.log(`Processing ${tsxFiles.length} TSX files...`);

let fixedCount = 0;
for (const file of tsxFiles) {
  if (processFile(file)) {
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} files with switch statement issues.`);
