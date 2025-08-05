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
const issues = [];

console.log('🔍 Starting comprehensive module and import audit...\n');

tsFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let newContent = content;
    const fileIssues = [];

    // 1. Fix malformed import paths with excessive ../
    const malformedImports = content.match(/import.*from\s+["']\.\.\/\.\.\/\.\..*["']/g);
    if (malformedImports) {
      fileIssues.push('Malformed import paths');
      newContent = newContent.replace(/["']\.\.\/\.\.\/\.\.\/\.\.\//g, '"../')
        .replace(/["']\.\.\/\.\.\/\.\.([^.\/])/g, '"../../$1');
    }

    // 2. Fix circular imports (importing from self)
    const fileName = path.basename(filePath, path.extname(filePath));
    const circularImportRegex = new RegExp(`import.*from\\s+["']\\.\/${fileName}["']`, 'g');
    if (circularImportRegex.test(content)) {
      fileIssues.push('Circular import (self-reference)');
      newContent = newContent.replace(circularImportRegex, '// Removed circular import');
    }

    // 3. Fix duplicate React imports
    const reactImports = content.match(/import.*React.*from\s+['"]react['"];?/g);
    if (reactImports && reactImports.length > 1) {
      fileIssues.push('Duplicate React imports');
      const lines = newContent.split('\n');
      let reactImportFound = false;
      newContent = lines.filter(line => {
        if (line.includes('import') && line.includes('React') && line.includes('from') && line.includes('react')) {
          if (reactImportFound) {
            return false; // Skip duplicate
          }
          if (line.includes('import React from')) {
            // Replace with star import
            line = "import * as React from 'react';";
          }
          reactImportFound = true;
        }
        return true;
      }).join('\n');
    }

    // 4. Fix semicolons instead of commas in object literals
    // This is complex - let's target common patterns
    newContent = newContent
      // Object properties in interfaces/types
      .replace(/:\s*([^;,{}]+);(\s*[a-zA-Z_])/g, ': $1,$2')
      // Object properties in object literals  
      .replace(/([a-zA-Z_][a-zA-Z0-9_]*:\s*[^;,{}]+);(\s*[a-zA-Z_])/g, '$1,$2')
      // Function parameters/return types
      .replace(/([a-zA-Z_][a-zA-Z0-9_]*:\s*[^;,{}]+);(\s*\})/g, '$1$2');

    // 5. Fix malformed spread props
    newContent = newContent
      .replace(/`\},\{\.\.\.props/g, '`}\n      {...props')
      .replace(/\)\},\{\.\.\.props/g, ')}\n    {...props')
      .replace(/className\)},\{\.\.\.props/g, 'className)}\n    {...props');

    // 6. Fix opening brace followed by comma
    newContent = newContent.replace(/\{,(\s*[a-zA-Z_])/g, '{$1');

    // 7. Fix semicolon followed by comma
    newContent = newContent.replace(/;,(\s*[a-zA-Z_])/g, ';$1');

    // 8. Fix missing commas in arrays and object literals
    newContent = newContent
      // Array elements
      .replace(/(['"]\s*)\n(\s*)([a-zA-Z_])/g, '$1,\n$2$3')
      // Object properties (careful not to break interfaces)
      .replace(/([a-zA-Z0-9_]+:\s*[^,;{}]+)\n(\s*)([a-zA-Z_][a-zA-Z0-9_]*:)/g, '$1,\n$2$3');

    // 9. Fix JSX prop syntax errors
    newContent = newContent.replace(/className="[^"]*";(\s*[a-zA-Z_])/g, (match, after) => {
      return match.replace(';', '') + '\n      ' + after;
    });

    // 10. Fix malformed type annotations
    newContent = newContent.replace(/<;/g, '<');

    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      totalFiles++;
      issues.push({ file: filePath, issues: fileIssues });
      console.log(`✅ Fixed: ${path.relative(projectRoot, filePath)}`);
      if (fileIssues.length > 0) {
        console.log(`   Issues: ${fileIssues.join(', ')}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Comprehensive audit complete!`);
console.log(`📊 Summary:`);
console.log(`   • Files processed: ${tsFiles.length}`);
console.log(`   • Files fixed: ${totalFiles}`);
console.log(`   • Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log(`\n📋 Detailed Issues:`);
  issues.forEach(({ file, issues }) => {
    console.log(`   ${path.relative(projectRoot, file)}: ${issues.join(', ')}`);
  });
}
