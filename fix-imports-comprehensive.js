#!/usr/bin/env node

const fs = require('fs'); const path = require('path'); console.log('🚀 Starting Comprehensive Import Fixing...');

// Define the correct import paths mapping
const IMPORT_MAPPINGS = { // UI Components '../../../components/ui/card': '../../components/ui/card', '../../../components/ui/alert': '../../components/ui/alert', '../../../components/ui/badge': '../../components/ui/badge', '../../../components/ui/button': '../../components/ui/button', '../../../components/ui/dialog': '../../components/ui/dialog', '../../../components/ui/input': '../../components/ui/input', '../../../components/ui/select': '../../components/ui/select', '../../../components/ui/tabs': '../../components/ui/tabs', '../../../components/ui/tooltip': '../../components/ui/tooltip', '../../../components/ui/dropdown-menu': '../../components/ui/dropdown-menu', '../../../components/ui/progress': '../../components/ui/progress', '../../../components/ui/slider': '../../components/ui/slider', '../../../components/ui/switch': '../../components/ui/switch', '../../../components/ui/textarea': '../../components/ui/textarea', '../../../components/ui/label': '../../components/ui/label', '../../../components/ui/form': '../../components/ui/form', '../../../components/ui/table': '../../components/ui/table', '../../../components/ui/accordion': '../../components/ui/accordion', '../../../components/ui/avatar': '../../components/ui/avatar', '../../../components/ui/checkbox': '../../components/ui/checkbox', '../../../components/ui/radio-group': '../../components/ui/radio-group', '../../../components/ui/sheet': '../../components/ui/sheet', '../../../components/ui/popover': '../../components/ui/popover', '../../../components/ui/calendar': '../../components/ui/calendar', '../../../components/ui/command': '../../components/ui/command', '../../../components/ui/navigation-menu': '../../components/ui/navigation-menu', '../../../components/ui/scroll-area': '../../components/ui/scroll-area', '../../../components/ui/separator': '../../components/ui/separator', '../../../components/ui/skeleton': '../../components/ui/skeleton', '../../../components/ui/toast': '../../components/ui/toast', '../../../components/ui/toggle': '../../components/ui/toggle', '../../../components/ui/toggle-group': '../../components/ui/toggle-group', '../../../components/ui/menubar': '../../components/ui/menubar', '../../../components/ui/context-menu': '../../components/ui/context-menu', '../../../components/ui/hover-card': '../../components/ui/hover-card', '../../../components/ui/aspect-ratio': '../../components/ui/aspect-ratio', '../../../components/ui/resizable': '../../components/ui/resizable', '../../../components/ui/sonner': '../../components/ui/sonner', '../../../components/ui/drawer': '../../components/ui/drawer', '../../../components/ui/carousel': '../../components/ui/carousel', '../../../components/ui/breadcrumb': '../../components/ui/breadcrumb', '../../../components/ui/pagination': '../../components/ui/pagination',
   // Fix relative path issues for components in app folder './components/ui/': '../components/ui/', '../components/ui/': '../../components/ui/',
   // Trading components './components/ui/trading-dashboard-demo': '../../components/ui/trading-dashboard-demo', '../components/ui/trading-dashboard-demo': '../../components/ui/trading-dashboard-demo', './components/trading-dashboard-demo': '../components/ui/trading-dashboard-demo', '../components/trading-dashboard-demo': '../../components/ui/trading-dashboard-demo',
   // Navigation components 'components/ui/navigation/index.tsx': '../components/ui/navigation/index', '../components/ui/navigation/index.tsx': '../../components/ui/navigation/index', './components/ui/navigation/index.tsx': '../components/ui/navigation/index',
   // Remove .tsx extensions from imports '.tsx': '', '.ts': '',
};

// Patterns to fix common import issues
const IMPORT_FIXES = [
  // Fix duplicate imports { pattern: /import\s+{\s*([^}]+)\s*}\s*from\s+['"]([^'"]+)['"]\s*;\s*import\s+{\s*([^}]+)\s*}\s*from\s+['"]([^'"]+)['"]\s*;/g,
    fix: (match, imports1, path1, imports2, path2) => { if (path1 === path2) { const allImports = [...new Set([...imports1.split(','), ...imports2.split(',')].map(i => i.trim()))]; return `import { ${allImports.join(', ')} } from '${path1}';`;
      }
      return match;
    }
  },
  
  // Fix malformed import syntax { pattern: /import\s+{\s*([^}]+)\s*}\s*from\s+['"]([^'"]+)['"]\s*,\s*;/g, fix: (match, imports, path) => `import { ${imports.trim()} } from '${path}';`
  },
  
  // Fix semicolon issues in imports
  {
    pattern: /import\s+([^,]+)\s*,\s*;/g,
    fix: (match, importStatement) => `import ${importStatement.trim()};`
  },
  
  // Fix React duplicate imports { pattern: /import\s+React\s+from\s+['"]react['"]\s*,\s*import\s+React\s+from\s+['"]react['"]\s*;/g, fix: "import React from 'react',"
  },
  
  // Fix use client directive placement { pattern: /(['"]use client['"])\s*,\s*(import.*)/g, fix: "'use client',\n\n$2"
  }
];

function fixImportsInFile(filePath) {
  if (!fs.existsSync(filePath)) return false; let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Apply import mappings for (const [oldPath, newPath] of Object.entries(IMPORT_MAPPINGS)) { const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (content.includes(oldPath)) {
      content = content.replace(regex, newPath);
      modified = true;
    }
  }
  
  // Apply import fixes
  for (const fix of IMPORT_FIXES) {
    const newContent = content.replace(fix.pattern, fix.fix);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }
   // Remove duplicate React imports const reactImports = content.match(/import\s+React.*from\s+['"]react['"]\s*;/g); if (reactImports && reactImports.length > 1) { content = content.replace(/import\s+React.*from\s+['"]react['"]\s*;/g, ''); content = "import React from 'react';\n" + content;
    modified = true;
  }
   // Fix malformed object syntax content = content.replace(/}\s*,\s*$/gm, '}'); content = content.replace(/,\s*;/g, ';'); content = content.replace(/;\s*,/g, ';');
  
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
    const stat = fs.statSync(fullPath); if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') { fixedCount += processDirectory(fullPath); } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      if (fixImportsInFile(fullPath)) {
        console.log(`✅ Fixed imports in: ${fullPath}`);
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
console.log(`🎉 Import fixing complete! Fixed ${fixedFiles} files.`);
