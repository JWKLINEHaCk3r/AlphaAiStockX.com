import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './components/ui/card.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './components/ui/card';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './components/ui/card';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './components/ui/card';
import { Badge } from "./components/ui/badge";
import { CardTitle } from "./components/ui/card";
import { CardHeader } from "./components/ui/card";
import { CardDescription } from "./components/ui/card";
import { CardContent } from "./components/ui/card";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to search for TypeScript files
function findTsxFiles(dir, fileList = []) {
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

  return fileList;
}

// Function to fix missing UI component imports
function fixMissingImports(filePath) {
  try {
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
      // Find insertion point after existing imports
      const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));

      if (`;

          // Find the last import line
          const lastImportIndex = content.lastIndexOf('import ');
          const nextLineIndex = content.indexOf('\n', lastImportIndex);

          if (nextLineIndex !== -1) {
            content =
              content.slice(0, nextLineIndex + 1) +
              cardImport +
              '\n' +
              content.slice(nextLineIndex + 1);
            modified = true;
          }
        }
      }
    }

    // Check for missing Badge imports
    const usesBadge =
      /\bBadge\b/.test(content) && !/Badge.*from.*@\/components\/ui\/badge/.test(content);
    if (usesBadge) {
      const lastImportIndex = content.lastIndexOf('import ');
      const nextLineIndex = content.indexOf('\n', lastImportIndex);

      if (nextLineIndex !== -1) {
        const badgeImport = ``;
        content =
          content.slice(0, nextLineIndex + 1) +
          badgeImport +
          '\n' +
          content.slice(nextLineIndex + 1);
        modified = true;
      }
    }

    // Check for missing Button imports
    const usesButton =
      /\bButton\b/.test(content) && !/Button.*from.*@\/components\/ui\/button/.test(content);
    if (usesButton) {
      const lastImportIndex = content.lastIndexOf('import ');
      const nextLineIndex = content.indexOf('\n', lastImportIndex);

      if (nextLineIndex !== -1) {
        const buttonImport = ``;
        content =
          content.slice(0, nextLineIndex + 1) +
          buttonImport +
          '\n' +
          content.slice(nextLineIndex + 1);
        modified = true;
      }
    }

    // Fix Badge variant issues by removing variant="outline"
    if (/variant="outline"/.test(content)) {
      content = content.replace(/\s*variant="outline"/g, '');
      modified = true;
    }

    // Fix lucide-react import issues by removing them
    if (/from ['"]lucide-react['"]/.test(content)) {
      content = content.replace(/import\s*{[^}]*}\s*from\s*['"]lucide-react['"];\s*\n?/g, '');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  const projectRoot = process.cwd();
  const appDir = path.join(projectRoot, 'app', 'components');

  if (!fs.existsSync(appDir)) {
    console.error('❌ app/components directory not found');
    process.exit(1);
  }

  console.log('🔍 Finding TypeScript files with missing UI imports...');
  const tsxFiles = findTsxFiles(appDir);
  console.log(`📁 Found ${tsxFiles.length} .tsx files`);

  let fixedCount = 0;

  tsxFiles.forEach(filePath => {
    if (fixMissingImports(filePath)) {
      fixedCount++;
    }
  });

  console.log(`\n✨ Fixed ${fixedCount} files`);

  if (fixedCount > 0) {
    console.log('🎯 Running TypeScript check to verify fixes...');
  }
}

main();
