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

console.log('🔧 Fixing import statements and object properties...\n');

tsFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let newContent = content;

    // Fix import statements that lost commas
    newContent = newContent
      // Fix import { NextRequest NextResponse } pattern
      .replace(/import\s*\{\s*(\w+)\s+(\w+)\s*\}/g, 'import { $1, $2 }')
      // Fix multi-line imports that lost commas
      .replace(/import\s*\{\s*(\w+)\s*\n\s*(\w+)\s*\}/g, 'import {\n  $1,\n  $2\n}')
      // Fix object properties that lost commas (but keep proper object syntax)
      .replace(/(\w+:\s*[^,}\n]+)\s+(\w+:)/g, '$1,\n      $2')
      // Fix simple object shorthand that lost commas
      .replace(/(\w+)\s+(\w+)\s*\}/g, '$1,\n      $2\n    }');

    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      totalFiles++;
      console.log(`✅ Fixed imports/objects: ${path.relative(projectRoot, filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Import and object fix complete!`);
console.log(`📊 Files fixed: ${totalFiles}`);
