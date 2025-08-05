#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Final Object Syntax Fixer');
console.log('============================');

const file = 'app/components/AITradingDashboard.tsx';

try {
  let content = fs.readFileSync(file, 'utf-8');
  const originalContent = content;

  // Fix object properties that need commas
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if this line is an object property that needs a comma
    if (line.match(/^\s*\w+:\s*[^,{}\[\]]+$/) && i < lines.length - 1) {
      const nextLine = lines[i + 1];
      // If next line is another property or closing brace, add comma
      if (nextLine.match(/^\s*\w+:/) || nextLine.match(/^\s*}/)) {
        line = line + ',';
      }
    }
    
    // Fix specific known issues
    line = line.replace(/marketCondition: 'Bullish'$/, "marketCondition: 'Bullish',");
    line = line.replace(/volatility: 0\.2$/, "volatility: 0.2,");
    line = line.replace(/recommendations: \['Diversify portfolio'\]$/, "recommendations: ['Diversify portfolio'],");
    line = line.replace(/riskAnalysis: { riskScore: 3, volatility: 0\.2 }$/, "riskAnalysis: { riskScore: 3, volatility: 0.2 }");
    
    fixedLines.push(line);
  }

  content = fixedLines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('✅ Fixed object syntax in AITradingDashboard.tsx');
  } else {
    console.log('ℹ️  No changes needed');
  }

} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}

console.log('🚀 Object syntax fix complete!');
