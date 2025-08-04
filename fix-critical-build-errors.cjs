#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Running FINAL critical syntax fixes for production deployment...');

// Critical files with syntax errors that prevent builds
const criticalFiles = [
    'app/components/AITradingDashboard.tsx',
    'app/api/ai-tools/market-predictor/route.ts',
    'app/api/ai-tools/portfolio-optimizer/route.ts',
    'app/api/ai-tools/signal-generator/route.ts',
    'app/api/ai-tools/pattern-recognizer/route.ts'
];

let totalFixes = 0;

function fixCriticalSyntax(filePath) {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return 0;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let fixes = 0;
    
    // Fix import statements - change commas to semicolons at end of import lines
    const importCommaPattern = /^(import[^;]*),\s*$/gm;
    if (importCommaPattern.test(content)) {
        content = content.replace(importCommaPattern, '$1;');
        fixes++;
        console.log(`✅ Fixed import syntax in ${filePath}`);
    }
    
    // Fix trailing commas in import statements
    const trailingCommaImports = /import\s*{[^}]*},\s*from/g;
    if (trailingCommaImports.test(content)) {
        content = content.replace(/import\s*{([^}]*),\s*}\s*from/g, 'import { $1 } from');
        fixes++;
        console.log(`✅ Fixed trailing comma in imports in ${filePath}`);
    }
    
    // Fix object literal syntax - ensure proper comma/semicolon usage
    content = content.replace(/,(\s*})/g, '$1'); // Remove trailing commas before closing braces
    content = content.replace(/;(\s*,)/g, '$1'); // Fix semicolon before comma
    
    if (fixes > 0) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`🔧 Applied ${fixes} critical fixes to ${filePath}`);
    }
    
    return fixes;
}

// Process critical files
criticalFiles.forEach(file => {
    totalFixes += fixCriticalSyntax(file);
});

// Also fix any additional import syntax issues in the app directory
const appDir = path.join(process.cwd(), 'app');

function fixImportsRecursively(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            fixImportsRecursively(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            const relativePath = path.relative(process.cwd(), fullPath);
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            // Fix import statements ending with commas
            if (content.includes('} from') && /import[^;]*,\s*$/m.test(content)) {
                content = content.replace(/^(import[^;]*),\s*$/gm, '$1;');
                changed = true;
                totalFixes++;
            }
            
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`🔧 Fixed import syntax in ${relativePath}`);
            }
        }
    });
}

fixImportsRecursively(appDir);

console.log(`\n✅ CRITICAL FIXES COMPLETED!`);
console.log(`🔧 Total critical syntax fixes applied: ${totalFixes}`);
console.log(`🚀 Project should now build successfully for production!`);
console.log(`\n🎯 Ready to deploy with: ./deploy-production.sh`);
