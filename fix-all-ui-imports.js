import { NavigationMenuLink } from "./components/ui/navigation";
import { NavigationMenuItem } from "./components/ui/navigation";
import { NavigationMenuTrigger } from "./components/ui/navigation";
import { NavigationMenuContent } from "./components/ui/navigation";
import { NavigationMenuList } from "./components/ui/navigation";
import { NavigationMenu } from "./components/ui/navigation";
import { Calendar } from "./components/ui/calendar";
import { PopoverTrigger } from "./components/ui/popover";
import { PopoverContent } from "./components/ui/popover";
import { Popover } from "./components/ui/popover";
import { ScrollArea } from "./components/ui/scroll-area";
import { Toaster } from "./components/ui/toaster";
import { Toast } from "./components/ui/toast";
import { TabsTrigger } from "./components/ui/tabs";
import { TabsList } from "./components/ui/tabs";
import { TabsContent } from "./components/ui/tabs";
import { Tabs } from "./components/ui/tabs";
import { AlertTitle } from "./components/ui/alert";
import { AlertDescription } from "./components/ui/alert";
import { Alert } from "./components/ui/alert";
import { DialogTrigger } from "./components/ui/dialog";
import { DialogTitle } from "./components/ui/dialog";
import { DialogHeader } from "./components/ui/dialog";
import { DialogFooter } from "./components/ui/dialog";
import { DialogDescription } from "./components/ui/dialog";
import { DialogContent } from "./components/ui/dialog";
import { Dialog } from "./components/ui/dialog";
import { AvatarImage } from "./components/ui/avatar";
import { AvatarFallback } from "./components/ui/avatar";
import { Avatar } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { Slider } from "./components/ui/slider";
import { Switch } from "./components/ui/switch";
import { Checkbox } from "./components/ui/checkbox";
import { SelectValue } from "./components/ui/select";
import { SelectTrigger } from "./components/ui/select";
import { SelectItem } from "./components/ui/select";
import { SelectContent } from "./components/ui/select";
import { Select } from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
// REMOVE ALL STATIC UI COMPONENT IMPORTS ABOVE THIS LINE
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
        // Only warn if not a .d.ts file, otherwise skip silently
        if (!filePath.endsWith('.d.ts')) {
          console.warn(`⏭️ Skipped non-file: ${filePath}`);
        }
        continue;
      }
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Fix missing UI component imports
      for (const [component, relComponentPath] of Object.entries(UI_COMPONENTS)) {
        // Only add import if the component file exists (tsx or ts)
        const absComponentPathTsx = path.join(process.cwd(), relComponentPath + '.tsx');
        const absComponentPathTs = path.join(process.cwd(), relComponentPath + '.ts');
        if (!isFile(absComponentPathTsx) && !isFile(absComponentPathTs)) continue;
        const componentRegex = new RegExp(`\\b${component}\\b`, 'g');
        // Remove any existing alias import for this component
        content = content.replace(new RegExp(`import.*\\b${component}\\b.*from.*['"]@/components[^'"]*['"];?\\n?`, 'g'), '');
        // Prefer .tsx, fallback to .ts
        const absComponentPath = isFile(absComponentPathTsx) ? absComponentPathTsx : absComponentPathTs;
        const importPath = getRelativeImportPath(filePath, absComponentPath);
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
        const importPath = getRelativeImportPath(filePath, absComponentPath);
        // Only add import if the component is actually used in the file
        const componentUsageRegex = new RegExp(`\b${component}\b`, 'g');
        const importStatement = `import { ${component} } from "${importPath}";\n`;
        // Only add if not already present
        if (componentUsageRegex.test(content) && !content.includes(importStatement)) {
          // Place import at the top, after fs/path/glob imports
          const importBlockEnd = content.indexOf('\n', content.indexOf('glob')); // after glob import
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
