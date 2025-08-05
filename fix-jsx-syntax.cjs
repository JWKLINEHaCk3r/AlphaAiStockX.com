const fs = require('fs');
const path = require('path');

// Get all TypeScript and TSX files
function getAllTsFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !entry.name.startsWith('.') && 
        !['node_modules', 'dist', 'build', '.next'].includes(entry.name)) {
      getAllTsFiles(fullPath, files);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const projectRoot = process.cwd();
const tsFiles = getAllTsFiles(projectRoot);

let totalFiles = 0;

console.log('🔧 Fixing JSX attribute syntax errors...\n');

tsFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let newContent = content;

    // Fix JSX attributes with commas instead of proper spacing
    // Pattern: attribute="value", should be attribute="value" 
    newContent = newContent
      // Fix type="text", -> type="text"
      .replace(/(\w+="[^"]*"),(\s*\w+)/g, '$1$2')
      // Fix type='text', -> type='text'
      .replace(/(\w+='[^']*'),(\s*\w+)/g, '$1$2')
      // Fix more complex patterns
      .replace(/(\w+="[^"]*"),(\s*[\w\-]+)/g, '$1\n              $2')
      .replace(/(\w+='[^']*'),(\s*[\w\-]+)/g, '$1\n              $2')
      // Fix boolean attributes followed by comma
      .replace(/(\w+),(\s*[\w\-]+=)/g, '$1\n              $2')
      .replace(/(\w+),(\s*[\w\-]+\s)/g, '$1\n              $2')
      // Fix JSX closing with comma
      .replace(/,(\s*\/?>)/g, '$1');

    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      totalFiles++;
      console.log(`✅ Fixed JSX syntax: ${path.relative(projectRoot, filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 JSX syntax fix complete!`);
console.log(`📊 Files fixed: ${totalFiles}`);
