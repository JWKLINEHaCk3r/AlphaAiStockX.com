#!/usr/bin/env node

/**
 * AlphaAI Stock Trading Platform - UI Import Fixer
 * Comprehensive fix for all UI component imports and dependencies
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🚀 AlphaAI UI Import Fixer - Powering up the trading platform...');

// UI Components mapping for automatic import resolution
const UI_COMPONENTS = {
  'Button': '@/components/ui/button',
  'Card': '@/components/ui/card',
  'CardContent': '@/components/ui/card',
  'CardDescription': '@/components/ui/card',
  'CardFooter': '@/components/ui/card',
  'CardHeader': '@/components/ui/card',
  'CardTitle': '@/components/ui/card',
  'Input': '@/components/ui/input',
  'Label': '@/components/ui/label',
  'Textarea': '@/components/ui/textarea',
  'Select': '@/components/ui/select',
  'SelectContent': '@/components/ui/select',
  'SelectItem': '@/components/ui/select',
  'SelectTrigger': '@/components/ui/select',
  'SelectValue': '@/components/ui/select',
  'Checkbox': '@/components/ui/checkbox',
  'Switch': '@/components/ui/switch',
  'Slider': '@/components/ui/slider',
  'Progress': '@/components/ui/progress',
  'Badge': '@/components/ui/badge',
  'Avatar': '@/components/ui/avatar',
  'AvatarFallback': '@/components/ui/avatar',
  'AvatarImage': '@/components/ui/avatar',
  'Dialog': '@/components/ui/dialog',
  'DialogContent': '@/components/ui/dialog',
  'DialogDescription': '@/components/ui/dialog',
  'DialogFooter': '@/components/ui/dialog',
  'DialogHeader': '@/components/ui/dialog',
  'DialogTitle': '@/components/ui/dialog',
  'DialogTrigger': '@/components/ui/dialog',
  'Alert': '@/components/ui/alert',
  'AlertDescription': '@/components/ui/alert',
  'AlertTitle': '@/components/ui/alert',
  'Tabs': '@/components/ui/tabs',
  'TabsContent': '@/components/ui/tabs',
  'TabsList': '@/components/ui/tabs',
  'TabsTrigger': '@/components/ui/tabs',
  'Toast': '@/components/ui/toast',
  'Toaster': '@/components/ui/toaster',
  'ScrollArea': '@/components/ui/scroll-area',
  'Popover': '@/components/ui/popover',
  'PopoverContent': '@/components/ui/popover',
  'PopoverTrigger': '@/components/ui/popover',
  'Calendar': '@/components/ui/calendar',
  'NavigationMenu': '@/components/ui/navigation',
  'NavigationMenuList': '@/components/ui/navigation',
  'NavigationMenuContent': '@/components/ui/navigation',
  'NavigationMenuTrigger': '@/components/ui/navigation',
  'NavigationMenuItem': '@/components/ui/navigation',
  'NavigationMenuLink': '@/components/ui/navigation'
};

// AI Trading specific components
const TRADING_COMPONENTS = {
  'TradingDashboard': '@/components/ui/trading-dashboard-demo',
  'VoiceControl': '@/components/ui/voice-control',
  'AnimatedBackground': '@/components/ui/animated-background-client',
  'Enhanced3DEffects': '@/components/ui/enhanced-effects',
  'Advanced3DEffects': '@/components/ui/advanced-3d-effects'
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
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Fix missing UI component imports
      for (const [component, importPath] of Object.entries(UI_COMPONENTS)) {
        const componentRegex = new RegExp(`\\b${component}\\b`, 'g');
        const importRegex = new RegExp(`import.*${component}.*from.*['"]${importPath}['"]`, 'g');
        
        if (componentRegex.test(content) && !importRegex.test(content)) {
          // Add import at the top
          const importStatement = `import { ${component} } from "${importPath}";\n`;
          content = importStatement + content;
          modified = true;
          console.log(`✅ Added ${component} import to ${file}`);
        }
      }

      // Fix trading component imports
      for (const [component, importPath] of Object.entries(TRADING_COMPONENTS)) {
        const componentRegex = new RegExp(`\\b${component}\\b`, 'g');
        const importRegex = new RegExp(`import.*${component}.*from.*['"]${importPath}['"]`, 'g');
        
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
