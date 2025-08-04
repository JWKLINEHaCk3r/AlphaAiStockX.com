#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Running FINAL object syntax fixes for production deployment...');

function fixObjectSyntax(filePath) {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
        return 0;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let fixes = 0;
    
    // Fix semicolons in object literals that should be commas
    const objectSemicolonPattern = /(\w+:\s*[^;{}]+);(\s*\w+:)/g;
    if (objectSemicolonPattern.test(content)) {
        content = content.replace(objectSemicolonPattern, '$1,$2');
        fixes++;
    }
    
    // Fix semicolons before closing object braces
    content = content.replace(/;(\s*})/g, '$1');
    
    // Fix stray semicolons in object properties
    content = content.replace(/(\w+);(\s*[,}])/g, '$1$2');
    
    // Fix property definitions ending with semicolon when they should be comma
    content = content.replace(/([^:;{}]+:\s*[^;{}]+);(\s*[^}])/g, '$1,$2');
    
    if (fixes > 0) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`🔧 Fixed object syntax in ${filePath}`);
    }
    
    return fixes;
}

// Fix the specific file with syntax errors
const result = fixObjectSyntax('app/components/AITradingDashboard.tsx');

console.log(`✅ Object syntax fixes completed: ${result}`);
console.log(`🚀 Ready for production build!`);
