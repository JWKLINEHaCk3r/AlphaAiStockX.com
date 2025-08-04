#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting Comprehensive Syntax Fixing...');

// Array syntax fixes
const SYNTAX_FIXES = [
  // Fix missing commas in arrays and objects
  {
    pattern: /}\s*\n\s*{/g,
    fix: '},\n    {'
  },
  
  // Fix missing commas in array elements
  {
    pattern: /'\s*\n\s*'/g,
    fix: "',\n        '"
  },
  
  // Fix missing commas in object properties
  {
    pattern: /}\s*(?=\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:)/g,
    fix: '},'
  },
  
  // Fix semicolon/comma issues in import statements
  {
    pattern: /,\s*;/g,
    fix: ';'
  },
  
  // Fix malformed JSX attributes
  {
    pattern: /,\s*>/g,
    fix: '>'
  },
  
  // Fix malformed function calls
  {
    pattern: /,\s*\)/g,
    fix: ')'
  },
  
  // Fix extra semicolons
  {
    pattern: /;\s*,/g,
    fix: ','
  }
];

function fixSyntaxInFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Apply syntax fixes
  for (const fix of SYNTAX_FIXES) {
    const newContent = content.replace(fix.pattern, fix.fix);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }
  
  // Fix specific patterns in different file types
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    // Fix array element syntax
    content = content.replace(/^(\s*{\s*[^}]+)\s*$/gm, (match, p1) => {
      if (p1.includes(':') && !p1.trim().endsWith(',') && !p1.trim().endsWith('{')) {
        return p1 + ',';
      }
      return match;
    });
    
    // Fix object closing braces
    content = content.replace(/}\s*\n\s*\{/g, '},\n    {');
    
    // Fix array items without commas
    content = content.replace(/('.*?')\s*\n\s*('/g, "$1,\n        $2");
    
    // Fix JSX attribute issues
    content = content.replace(/,\s*>/g, '>');
    content = content.replace(/,\s*\/>/g, '/>');
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  let fixedCount = 0;
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      fixedCount += processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      if (fixSyntaxInFile(fullPath)) {
        console.log(`✅ Fixed syntax in: ${fullPath}`);
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

// Start processing
const projectRoot = process.cwd();
console.log(`📁 Processing directory: ${projectRoot}`);

const fixedFiles = processDirectory(projectRoot);
console.log(`🎉 Syntax fixing complete! Fixed ${fixedFiles} files.`);
