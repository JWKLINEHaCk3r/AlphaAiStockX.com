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
  } catch (e) {
    return false;
  }
}

// UI Components mapping for automatic import resolution (relative paths)
const UI_COMPONENTS = {
  'Button': 'components/ui/button',
  'Card': 'components/ui/card',
  'Input': 'components/ui/input',
  'Label': 'components/ui/label',
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
  'NavigationMenu': 'components/ui/navigation',
  'NavigationMenuList': 'components/ui/navigation',
  'NavigationMenuContent': 'components/ui/navigation',
  'NavigationMenuTrigger': 'components/ui/navigation',
  'NavigationMenuItem': 'components/ui/navigation',
  'NavigationMenuLink': 'components/ui/navigation'
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
        console.warn(`⏭️ Skipped non-file: ${filePath}`);
        continue;
      }
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Fix missing UI component imports
      for (const [component, relComponentPath] of Object.entries(UI_COMPONENTS)) {
        const componentRegex = new RegExp(`\\b${component}\\b`, 'g');
        // Remove any existing alias import for this component
        content = content.replace(new RegExp(`import.*\\b${component}\\b.*from.*['"]@/components[^'"]*['"];?\\n?`, 'g'), '');
        const absComponentPath = path.join(process.cwd(), relComponentPath + '.tsx');
        const importPath = getRelativeImportPath(filePath, absComponentPath);
        const importRegex = new RegExp(`import.*\\b${component}\\b.*from.*['"]${importPath}['"]`, 'g');
        if (componentRegex.test(content) && !importRegex.test(content)) {
          // Add import at the top
          const importStatement = `import { ${component} } from "${importPath}";\n`;
          content = importStatement + content;
          modified = true;
          console.log(`✅ Added ${component} import to ${file}`);
        }
      }

      // Fix trading component imports
      for (const [component, relComponentPath] of Object.entries(TRADING_COMPONENTS)) {
        const componentRegex = new RegExp(`\\b${component}\\b`, 'g');
        content = content.replace(new RegExp(`import.*\\b${component}\\b.*from.*['"]@/components[^'"]*['"];?\\n?`, 'g'), '');
        const absComponentPath = path.join(process.cwd(), relComponentPath + '.tsx');
        const importPath = getRelativeImportPath(filePath, absComponentPath);
        const importRegex = new RegExp(`import.*\\b${component}\\b.*from.*['"]${importPath}['"]`, 'g');
        if (componentRegex.test(content) && !importRegex.test(content)) {
          const importStatement = `import { ${component} } from "${importPath}";\n`;
          content = importStatement + content;
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

      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`💾 Updated ${file}`);
      }
    }

    console.log('🎉 AlphaAI UI Import fixing complete! Trading platform is now powered up!');
  } catch (error) {
    console.error('❌ Error fixing UI imports:', error);
    process.exit(1);
  }
}

// Run the fixer
fixUIImports();
