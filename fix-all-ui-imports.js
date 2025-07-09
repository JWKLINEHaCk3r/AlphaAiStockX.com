<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from './components/ui/card';
import { Advanced3DEffects } from "./components/ui/advanced-3d-effects";
import { Enhanced3DEffects } from "./components/ui/enhanced-effects";
import { AnimatedBackground } from "./components/ui/animated-background-client";
import { VoiceControl } from "./components/ui/voice-control";
import { TradingDashboard } from "./components/ui/trading-dashboard-demo";
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
import { CardTitle } from "./components/ui/card";
import { CardHeader } from "./components/ui/card";
import { CardFooter } from "./components/ui/card";
import { CardDescription } from "./components/ui/card";
import { CardContent } from "./components/ui/card";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
// AlphaAI Stock Trading Platform - UI Import Fixer (Node.js ESM compatible)
// This script uses only Node.js and npm modules, not Next.js path aliases
=======
const { Advanced3DEffects } = require("@/components/ui/advanced-3d-effects");
const { Enhanced3DEffects } = require("@/components/ui/enhanced-effects");
const { AnimatedBackground } = require("@/components/ui/animated-background-client");
const { VoiceControl } = require("@/components/ui/voice-control");
const { TradingDashboard } = require("@/components/ui/trading-dashboard-demo");
const { NavigationMenuLink } = require("@/components/ui/navigation");
const { NavigationMenuItem } = require("@/components/ui/navigation");
const { NavigationMenuTrigger } = require("@/components/ui/navigation");
const { NavigationMenuContent } = require("@/components/ui/navigation");
const { NavigationMenuList } = require("@/components/ui/navigation");
const { NavigationMenu } = require("@/components/ui/navigation");
const { Calendar } = require("@/components/ui/calendar");
const { PopoverTrigger } = require("@/components/ui/popover");
const { PopoverContent } = require("@/components/ui/popover");
const { Popover } = require("@/components/ui/popover");
const { ScrollArea } = require("@/components/ui/scroll-area");
const { Toaster } = require("@/components/ui/toaster");
const { Toast } = require("@/components/ui/toast");
const { TabsTrigger } = require("@/components/ui/tabs");
const { TabsList } = require("@/components/ui/tabs");
const { TabsContent } = require("@/components/ui/tabs");
const { Tabs } = require("@/components/ui/tabs");
const { AlertTitle } = require("@/components/ui/alert");
const { AlertDescription } = require("@/components/ui/alert");
const { Alert } = require("@/components/ui/alert");
const { DialogTrigger } = require("@/components/ui/dialog");
const { DialogTitle } = require("@/components/ui/dialog");
const { DialogHeader } = require("@/components/ui/dialog");
const { DialogFooter } = require("@/components/ui/dialog");
const { DialogDescription } = require("@/components/ui/dialog");
const { DialogContent } = require("@/components/ui/dialog");
const { Dialog } = require("@/components/ui/dialog");
const { AvatarImage } = require("@/components/ui/avatar");
const { AvatarFallback } = require("@/components/ui/avatar");
const { Avatar } = require("@/components/ui/avatar");
const { Badge } = require("@/components/ui/badge");
const { Progress } = require("@/components/ui/progress");
const { Slider } = require("@/components/ui/slider");
const { Switch } = require("@/components/ui/switch");
const { Checkbox } = require("@/components/ui/checkbox");
const { SelectValue } = require("@/components/ui/select");
const { SelectTrigger } = require("@/components/ui/select");
const { SelectItem } = require("@/components/ui/select");
const { SelectContent } = require("@/components/ui/select");
const { Select } = require("@/components/ui/select");
const { Textarea } = require("@/components/ui/textarea");
const { Label } = require("@/components/ui/label");
const { Input } = require("@/components/ui/input");
const { CardTitle } = require("@/components/ui/card");
const { CardHeader } = require("@/components/ui/card");
const { CardFooter } = require("@/components/ui/card");
const { CardDescription } = require("@/components/ui/card");
const { CardContent } = require("@/components/ui/card");
const { Card } = require("@/components/ui/card");
const { Button } = require("@/components/ui/button");
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

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

// UI Components mapping for automatic import resolution (relative paths)
const UI_COMPONENTS = {
  'Button': 'components/ui/button',
  'Card': 'components/ui/card',
  'CardContent': 'components/ui/card',
  'CardDescription': 'components/ui/card',
  'CardFooter': 'components/ui/card',
  'CardHeader': 'components/ui/card',
  'CardTitle': 'components/ui/card',
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

const TRADING_COMPONENTS = {
  'TradingDashboard': 'components/ui/trading-dashboard-demo',
  'VoiceControl': 'components/ui/voice-control',
  'AnimatedBackground': 'components/ui/animated-background-client',
  'Enhanced3DEffects': 'components/ui/enhanced-effects',
  'Advanced3DEffects': 'components/ui/advanced-3d-effects'
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
