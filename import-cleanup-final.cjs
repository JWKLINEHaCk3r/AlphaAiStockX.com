#!/usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');
const path = require('path');

console.log('🔧 Comprehensive Import Statement Cleanup');
console.log('=========================================');

async function fixImportStatements(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fixes = 0;

    // Fix malformed import statements
    // Pattern: import , { ... } from '...'
    content = content.replace(/import\s*,\s*\{\s*([^}]+)\s*\}\s*from\s*(['"][^'"]+['"])/g, 'import { $1 } from $2');
    
    // Pattern: import , { default as ... } from '...'
    content = content.replace(/import\s*,\s*\{\s*default\s+as\s+([^}]+)\s*\}\s*from\s*(['"][^'"]+['"])/g, 'import $1 from $2');
    
    // Pattern: import , ... from '...'
    content = content.replace(/import\s*,\s*([^{][^;]+)\s*from\s*(['"][^'"]+['"])/g, 'import $1 from $2');
    
    // Fix duplicate commas in function parameters and objects
    content = content.replace(/\(\s*,\s*/g, '(');
    content = content.replace(/,\s*,\s*/g, ', ');
    content = content.replace(/{\s*,\s*/g, '{ ');
    content = content.replace(/,\s*}/g, ' }');
    
    // Fix try/catch syntax
    content = content.replace(/try\s*,\s*{/g, 'try {');
    content = content.replace(/}\s*catch\s*\(\s*([^)]+)\s*\)\s*,\s*{/g, '} catch ($1) {');
    content = content.replace(/}\s*else\s*,\s*{/g, '} else {');
    
    // Fix object property syntax
    content = content.replace(/(\w+):\s*([^,{}]+),\s*,/g, '$1: $2,');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      fixes = 1;
      console.log(`✅ Fixed import statements in ${path.basename(filePath)}`);
    }

    return fixes;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log('🔍 Finding all TypeScript files...');
  
  try {
    const files = glob.sync('app/**/*.{ts,tsx}').filter(f => !f.includes('node_modules'));
    
    console.log(`📁 Found ${files.length} files to process`);
    
    let totalFixed = 0;
    let processedFiles = 0;

    for (const file of files) {
      const fixed = await fixImportStatements(file);
      totalFixed += fixed;
      processedFiles++;

      if (processedFiles % 50 === 0) {
        console.log(`Progress: ${processedFiles}/${files.length} files processed`);
      }
    }

    console.log(`\n✅ Import cleanup complete!`);
    console.log(`📊 Processed ${processedFiles} files`);
    console.log(`🔧 Fixed import statements in ${totalFixed} files`);
    console.log(`\n🚀 All import trace errors should now be resolved!`);
    
  } catch (error) {
    console.error('❌ Error during import cleanup:', error);
    process.exit(1);
  }
}

main().catch(console.error);
