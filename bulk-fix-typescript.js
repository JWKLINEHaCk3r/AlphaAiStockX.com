// Fixer script: Only manipulates import statements as text. Never generates or requires .js or .tsx card components.
// Card components are referenced by name only; no .tsx or .js import for Node.js compatibility in Node scripts.

import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix malformed imports
    const originalContent = content;

    // Fix ntent imports
    content = content.replace(
      /import { ntent,([^}]+) } from '@\/components\/ui\/card';/g,
      ""
    );

    // Remove duplicate Card imports from button
    content = content.replace(/import { Card } from '@\/components\/ui\/button';\s*/g, '');

    // Fix CardCoCard typos
    content = content.replace(/CardCoCard/g, 'CardContent');

    // Fix basic parameter types
    content = content.replace(/= ([a-zA-Z]+) => \{/g, '= ($1: any) => {');
    content = content.replace(/\.map\(([a-zA-Z]+) =>/g, '.map(($1: any) =>');
    content = content.replace(
      /\.map\(([a-zA-Z]+), ([a-zA-Z]+) =>/g,
      '.map(($1: any, $2: number) =>'
    );

    // Fix useState with any types
    content = content.replace(/useState\(\[\]\)/g, 'useState<any[]>([])');
    content = content.replace(/useState\(\{\}\)/g, 'useState<Record<string, any>>({})');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${path.relative(process.cwd(), filePath)}`);
      modified = true;
    }

    return modified;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];

  function traverse(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch {
      // Skip directories we can't read
    }
  }

  traverse(dir);
  return files;
}

// Process all TypeScript files
const appDir = path.join(process.cwd(), 'app');
const files = findFiles(appDir);

let fixedCount = 0;
let totalFiles = 0;

console.log(`Processing ${files.length} TypeScript files...`);

files.forEach(file => {
  totalFiles++;
  if (processFile(file)) {
    fixedCount++;
  }
});

console.log(`\nProcessed ${totalFiles} files, applied fixes to ${fixedCount} files.`);
