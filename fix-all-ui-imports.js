
// Removed all direct and dynamic imports of .tsx files for Node.js compatibility
// Card component is referenced by name only; no .tsx import for Node.js compatibility
// ...existing code...
// ...existing code...
// ...existing code...



// All static UI component imports removed as per script instructions
// Only keep fs, path, glob imports for script operation
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

console.log('🚀 AlphaAI UI Import Fixer - Powering up the trading platform...');

// Utility to get relative import path from a file to a component
function getRelativeImportPath(filePath, componentPath) {
  const fromDir = path.dirname(filePath);
  let relPath = path.relative(fromDir, componentPath);
  if (!relPath.startsWith('.')) relPath = './' + relPath;
  // Remove .tsx/.ts/.js/.jsx extension for import
  relPath = relPath.replace(/\\/g, '/').replace(/\.(tsx|ts|js|jsx)$/, '');
  return relPath;
}


// Helper: Check if a path is a file
function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

// Helper: Check if a path is a file or directory
function isFileOrDir(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.isFile() || stat.isDirectory();
  } catch {
    return false;
  }
}

// Utility: Log missing critical UI components for CI/CD clarity
function logMissingComponent(componentPath) {
  if (!isFileOrDir(componentPath)) {
    console.warn('Missing UI component: ' + componentPath);
  }
}

// UI Components mapping for automatic import resolution (relative paths)
const UI_COMPONENTS = {
  'Button': 'components/ui/button',
// Fixer script: Only manipulates import statements as text. Never generates or requires .js or .tsx card components.
// Card components are referenced by name only; no .tsx or .js import for Node.js compatibility in Node scripts.
// Removed all direct and dynamic imports of .tsx files for Node.js compatibility
// Card component is referenced by name only; no .tsx import for Node.js compatibility
  'Textarea': 'components/ui/textarea',
  'Select': 'components/ui/select',
  'SelectContent': 'components/ui/select',
  'SelectItem': 'components/ui/select',
  'SelectTrigger': 'components/ui/select',
  'SelectValue': 'components/ui/select',
  'Checkbox': 'components/ui/checkbox',
  'Switch': 'components/ui/switch',
  'Slider': 'components/ui/slider',
  'Progress': 'components/ui/progress',
  'Badge': 'components/ui/badge',
  'Avatar': 'components/ui/avatar',
  'AvatarFallback': 'components/ui/avatar',
  'AvatarImage': 'components/ui/avatar',
  'Dialog': 'components/ui/dialog',
  'DialogContent': 'components/ui/dialog',
  'DialogDescription': 'components/ui/dialog',
  'DialogFooter': 'components/ui/dialog',
  'DialogHeader': 'components/ui/dialog',
  'DialogTitle': 'components/ui/dialog',
  'DialogTrigger': 'components/ui/dialog',
  'Alert': 'components/ui/alert',
  'AlertDescription': 'components/ui/alert',
  'AlertTitle': 'components/ui/alert',
  'Tabs': 'components/ui/tabs',
  'TabsContent': 'components/ui/tabs',
  'TabsList': 'components/ui/tabs',
  'TabsTrigger': 'components/ui/tabs',
  'Toast': 'components/ui/toast',
  'Toaster': 'components/ui/toaster',
  'ScrollArea': 'components/ui/scroll-area',
  'Popover': 'components/ui/popover',
  'PopoverContent': 'components/ui/popover',
  'PopoverTrigger': 'components/ui/popover',
  'Calendar': 'components/ui/calendar',
  // Navigation imports must use index for ESM/Netlify compatibility
  'NavigationMenu': 'components/ui/navigation/index',
  'NavigationMenuList': 'components/ui/navigation/index',
  'NavigationMenuContent': 'components/ui/navigation/index',
  'NavigationMenuTrigger': 'components/ui/navigation/index',
  'NavigationMenuItem': 'components/ui/navigation/index',
  'NavigationMenuLink': 'components/ui/navigation/index'
};

// Only include trading components that exist in the codebase
const TRADING_COMPONENTS = {
  'TradingDashboard': 'components/ui/trading-dashboard-demo',
  'VoiceControl': 'components/ui/voice-control',
  'AnimatedBackground': 'components/ui/animated-background-client'
};

async function fixUIImports() {
  try {
    // Get all TypeScript and JavaScript files
    const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
      cwd: process.cwd(),
      ignore: ['node_modules/**', '.next/**', 'out/**', '*.config.*']
    });

    console.log(`📝 Found ${files.length} files to process`);

    for (const file of files) {
      const filePath = path.join(process.cwd(), file);
      if (!isFile(filePath)) {
        // Only warn if not a .d.ts file, otherwise skip silently
        if (!filePath.endsWith('.d.ts')) {
          console.warn(`⏭️ Skipped non-file: ${filePath}`);
        }
        continue;
      }
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Group NavigationMenu* components for a single import
      const navMenuComponents = [];
      for (const [component, relComponentPath] of Object.entries(UI_COMPONENTS)) {
        // Only add import if the component file or directory exists (tsx, ts, or index)
        const absComponentPathTsx = path.join(process.cwd(), relComponentPath + '.tsx');
        const absComponentPathTs = path.join(process.cwd(), relComponentPath + '.ts');
        const absComponentPathDir = path.join(process.cwd(), relComponentPath);
        const absComponentPathIndexTsx = path.join(absComponentPathDir, 'index.tsx');
        const absComponentPathIndexTs = path.join(absComponentPathDir, 'index.ts');
        if (!isFileOrDir(absComponentPathTsx) && !isFileOrDir(absComponentPathTs) && !isFileOrDir(absComponentPathDir) && !isFileOrDir(absComponentPathIndexTsx) && !isFileOrDir(absComponentPathIndexTs)) {
          logMissingComponent(relComponentPath);
          continue;
        }
        const componentRegex = new RegExp(`\\b${component}\\b`, 'g');
        // Remove any existing alias import for this component
        content = content.replace(new RegExp(`import.*\\b${component}\\b.*from.*['"]@/components[^'"]*['"];?\\n?`, 'g'), '');
        // Group NavigationMenu* components
        if (relComponentPath.startsWith('components/ui/navigation/index')) {
          if (componentRegex.test(content)) navMenuComponents.push(component);
          continue;
        }
        // Prefer .tsx, fallback to .ts
        const absComponentPath = isFile(absComponentPathTsx) ? absComponentPathTsx : absComponentPathTs;
        let importPath = getRelativeImportPath(filePath, absComponentPath);
        const importRegex = new RegExp(`import.*\\b${component}\\b.*from.*['"]${importPath}['"]`, 'g');
        if (componentRegex.test(content) && !importRegex.test(content)) {
          // Remove duplicate imports for this component
          content = content.replace(new RegExp(`import.*\\b${component}\\b.*from.*['"][^'"]*['"];?\\n?`, 'g'), '');
          // Add import at the top
          const importStatement = `import { ${component} } from "${importPath}";\n`;
          content = importStatement + content;
          modified = true;
          console.log(`✅ Added ${component} import to ${file}`);
        }
      }
      // Add grouped NavigationMenu* import if needed
      if (navMenuComponents.length > 0) {
        // Remove all existing NavigationMenu* imports
        content = content.replace(/import\s*\{[^}]*NavigationMenu[^}]*\}\s*from\s*['\"][^'\"]*['\"];?\n?/g, '');
        // Add grouped import at the top
        const importStatement = `import { ${navMenuComponents.join(", ")} } from "./components/ui/navigation/index";\n`;
        content = importStatement + content;
        modified = true;
        console.log(`✅ Added grouped NavigationMenu imports to ${file}`);
      }

      // Fix trading component imports
      for (const [component, relComponentPath] of Object.entries(TRADING_COMPONENTS)) {
        // Only add import if the component file exists (tsx or ts)
        const absComponentPathTsx = path.join(process.cwd(), relComponentPath + '.tsx');
        const absComponentPathTs = path.join(process.cwd(), relComponentPath + '.ts');
        if (!isFile(absComponentPathTsx) && !isFile(absComponentPathTs)) continue;
        // Remove all existing imports for this component (including alias, static, broken, or from any path)
        const importCleanupRegex = new RegExp(`import\\s*\\{?\\s*${component}\\s*\\}?\\s*from\\s*['\"][^'\"]*['\"];?\\n?`, 'g');
        content = content.replace(importCleanupRegex, '');
        // Prefer .tsx, fallback to .ts
        const absComponentPath = isFile(absComponentPathTsx) ? absComponentPathTsx : absComponentPathTs;
        let importPath = getRelativeImportPath(filePath, absComponentPath);

        const componentUsageRegex = new RegExp(`\\b${component}\\b`, 'g');
        const importStatement = `import { ${component} } from "${importPath}";\n`;
        // Only add if not already present
        if (componentUsageRegex.test(content) && !content.includes(importStatement)) {
          const importBlockEnd = content.indexOf('\n', content.indexOf('glob'));
          content = content.slice(0, importBlockEnd + 1) + importStatement + content.slice(importBlockEnd + 1);
          modified = true;
          console.log(`🤖 Added AI Trading ${component} import to ${file}`);
        }
      }

      // Fix React imports
      if ((/jsx|tsx/.test(path.extname(file)) || /React/.test(content)) && !/import.*React.*from.*['"]react['"]/.test(content)) {
        content = `import React from 'react';\n` + content;
        modified = true;
        console.log(`⚛️ Added React import to ${file}`);
      }


      //     console.warn(`⚠️ Navigation import skipped: components/ui/navigation not found for ${file}`);
      //   }
      // }

      // Add NavigationMenu import for navigation usage (handled above, no-op here)
    }
  } catch (error) {
    console.error('Error fixing UI imports:', error);
    process.exit(1);
  }
}

// Run the fixer
fixUIImports();