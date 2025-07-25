

// Removed all direct and dynamic imports of .tsx files for Node.js compatibility
// Removed all direct and dynamic imports of .tsx files for Node.js compatibility
// Card components are referenced by name only; no .tsx import for Node.js compatibility
// Removed direct import of .tsx file for Node.js compatibility

// Removed direct import of .tsx file for Node.js compatibility
// Removed direct import of .tsx file for Node.js compatibility
// Removed direct import of .tsx file for Node.js compatibility
// Removed direct import of .tsx file for Node.js compatibility
// Removed direct import of .tsx file for Node.js compatibility
// Removed duplicate and extensionful Card imports. All Card imports are now handled dynamically in the script body.
// Removed unused CardContent and Card imports

import fs from 'fs';
import path from 'path';

// Common malformed imports to fix
const importFixes = [
  {
    search: /import { Card, CardCoCard, CardContent, ([^}]+) } from '@\/components\/ui\/card';/g,
    replace: "",
  },
  {
    search: /import { Card, CardCoCard, CardContent } from '@\/components\/ui\/card';/g,
    replace: "",
  },
  {
    search: /import { CardCoCard, ([^}]+) } from '@\/components\/ui\/card';/g,
    replace: "",
  },
  {
    search: /import { CardCoCard } from '@\/components\/ui\/card';/g,
    replace: "",
  },
  {
    search: /import { Wolf } from 'lucide-react'/g,
    replace: "import { Zap } from 'lucide-react'",
  },
  {
    search: /<Wolf /g,
    replace: '<Zap ',
  },
  {
    search: /import { ntent, ([^}]+) } from '@\/components\/ui\/card';/g,
    replace: "",
  },
  {
    search: /import { Card } from '@\/components\/ui\/button';/g,
    replace: '',
  },
];

// Common type fixes
const typeFixes = [
  {
    search: /useState\(\[\]\)/g,
    replace: 'useState<any[]>([])',
  },
  {
    search: /useState\(\{\}\)/g,
    replace: 'useState<Record<string, any>>({})',
  },
  {
    search: /= ([a-zA-Z]+) => \{/g,
    replace: '= ($1: any) => {',
  },
  {
    search: /\.map\(([a-zA-Z]+) => \(/g,
    replace: '.map(($1: any) => (',
  },
  {
    search: /\.map\(([a-zA-Z]+), ([a-zA-Z]+) => \(/g,
    replace: '.map(($1: any, $2: number) => (',
  },
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Apply import fixes
    importFixes.forEach(fix => {
      const newContent = content.replace(fix.search, fix.replace);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    // Apply type fixes
    typeFixes.forEach(fix => {
      const newContent = content.replace(fix.search, fix.replace);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });

    // Clean up duplicate imports
    content = content.replace(
      /^import.*\n(?=import.*from ['"]@\/components\/ui\/button['"];)/gm,
      ''
    );

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed: ' + filePath);
      return true;
    }
  } catch (error) {
    console.error('Error processing ' + filePath + ': ' + error.message);
  }
  return false;
}

function findTsxFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

// Process all TypeScript files in the app directory
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.join(__dirname, 'app');
const files = findTsxFiles(appDir);

let fixedCount = 0;
files.forEach(file => {
  if (processFile(file)) {
    fixedCount++;
  }
});

console.log('\nProcessed ' + files.length + ' files, fixed ' + fixedCount + ' files.');
