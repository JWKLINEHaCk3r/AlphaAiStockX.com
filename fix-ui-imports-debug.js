import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";


#!/usr/bin/env node
// Fixer script: Only manipulates import statements as text. Never generates or requires .js or .tsx card components.
// Card components are referenced by name only; no .tsx or .js import for Node.js compatibility in Node scripts.
// Removed direct import of .tsx file for Node.js compatibility
// Removed duplicate and extensionful Card imports. All Card imports are now handled dynamically in the script body.
import path from 'path';

console.log('🔍 Starting UI imports fixer...');

// Check if app/components exists
const projectRoot = process.cwd();
const appDir = path.join(projectRoot, 'app', 'components');

console.log('Project root:', projectRoot);
console.log('App dir:', appDir);
console.log('App dir exists:', fs.existsSync(appDir));

if (!fs.existsSync(appDir)) {
  console.error('❌ app/components directory not found');
  process.exit(1);
}

// Find tsx files
function findTsxFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        findTsxFiles(filePath, fileList);
      } else if (file.endsWith('.tsx')) {
        fileList.push(filePath);
      }
    });
  } catch (error) {
    console.error('Error reading directory:', dir, error.message);
  }

  return fileList;
}

const tsxFiles = findTsxFiles(appDir);
console.log(`📁 Found ${tsxFiles.length} .tsx files`);

// Show first few files
tsxFiles.slice(0, 5).forEach(file => {
  console.log('-', path.relative(projectRoot, file));
});

if (tsxFiles.length > 5) {
  console.log(`... and ${tsxFiles.length - 5} more`);
}

let fixedCount = 0;

// Process each file
tsxFiles.forEach((filePath, index) => {
  try {
    console.log(
      `\n[${index + 1}/${tsxFiles.length}] Processing:`,
      path.relative(projectRoot, filePath)
    );

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check for missing Card imports
    const usesCard =
      /\bCard\b(?!\w)/.test(content) && !/Card.*from.*@\/components\/ui\/card/.test(content);
    const usesCardContent =
      /\bCardContent\b/.test(content) &&
      !/CardContent.*from.*@\/components\/ui\/card/.test(content);
    const usesCardHeader =
      /\bCardHeader\b/.test(content) && !/CardHeader.*from.*@\/components\/ui\/card/.test(content);
    const usesCardTitle =
      /\bCardTitle\b/.test(content) && !/CardTitle.*from.*@\/components\/ui\/card/.test(content);
    const usesCardDescription =
      /\bCardDescription\b/.test(content) &&
      !/CardDescription.*from.*@\/components\/ui\/card/.test(content);

    if (usesCard || usesCardContent || usesCardHeader || usesCardTitle || usesCardDescription) {
      console.log('  → Found missing Card imports');

      const cardComponents = [];
      if (/\bCard\b(?!\w)/.test(content)) cardComponents.push('Card');
      if (/\bCardContent\b/.test(content)) cardComponents.push('CardContent');
      if (/\bCardHeader\b/.test(content)) cardComponents.push('CardHeader');
      if (/\bCardTitle\b/.test(content)) cardComponents.push('CardTitle');
      if (/\bCardDescription\b/.test(content)) cardComponents.push('CardDescription');

      if (cardComponents.length > 0) {
        const cardImport = ``;

        // Find the last import line
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
          const nextLineIndex = content.indexOf('\n', lastImportIndex);

          if (nextLineIndex !== -1) {
            content =
              content.slice(0, nextLineIndex + 1) +
              cardImport +
              '\n' +
              content.slice(nextLineIndex + 1);
            modified = true;
            console.log('  → Added:', cardImport);
          }
        }
      }
    }

    // Fix Badge variant issues
    if (/variant="outline"/.test(content)) {
      console.log('  → Found Badge variant="outline" issues');
      content = content.replace(/\s*variant="outline"/g, '');
      modified = true;
      console.log('  → Removed variant="outline" attributes');
    }

    // Fix lucide-react imports
    if (/from ['"]lucide-react['"]/.test(content)) {
      console.log('  → Found lucide-react imports');
      content = content.replace(/import\s*{[^}]*}\s*from\s*['"]lucide-react['"];\s*\n?/g, '');
      modified = true;
      console.log('  → Removed lucide-react imports');
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log('  ✅ File updated');
      fixedCount++;
    } else {
      console.log('  ⏭️  No changes needed');
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n✨ Fixed ${fixedCount} files out of ${tsxFiles.length} total`);
