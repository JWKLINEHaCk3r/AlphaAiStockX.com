#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Running comprehensive JSX and syntax fixes...');

const filePath = 'app/components/AITradingDashboard.tsx';
const fullPath = path.join(process.cwd(), filePath);

if (!fs.existsSync(fullPath)) {
    console.log('❌ File not found');
    process.exit(1);
}

let content = fs.readFileSync(fullPath, 'utf8');

// Fix trailing commas in JSX attributes
content = content.replace(/className="[^"]*",(\s*[>\n])/g, (match, ending) => {
    return match.replace(',', '') + ending;
});

// Fix general trailing commas in JSX props
content = content.replace(/(\w+="[^"]*"),(\s*[>\n])/g, '$1$2');
content = content.replace(/(\w+={[^}]*}),(\s*[>\n])/g, '$1$2');

// Fix object property separators (semicolons to commas)
content = content.replace(/(\w+:\s*[^;{}]+);(\s*\w+:)/g, '$1,$2');

// Fix spread operators
content = content.replace(/\.\.\.prev;/g, '...prev,');

// Fix property names
content = content.replace(/(\w+);(\s*[,}])/g, '$1$2');

// Fix return statements
content = content.replace(/return,/g, 'return;');

// Fix JSX structure - ensure Card components are properly closed
content = content.replace(/<Card([^>]*)>\s*(?!.*<\/Card>)/g, '<Card$1>\n          </Card>');

fs.writeFileSync(fullPath, content, 'utf8');

console.log('✅ Comprehensive syntax fixes applied to AITradingDashboard.tsx');
console.log('🚀 File should now compile correctly!');
