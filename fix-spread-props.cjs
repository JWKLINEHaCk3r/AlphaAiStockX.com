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

tsFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix malformed spread props pattern
    let newContent = content.replace(/`\},\{\.\.\.props/g, '`}\n      {...props');
    
    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      totalFiles++;
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`\nFixed spread-props pattern in ${totalFiles} files.`);
