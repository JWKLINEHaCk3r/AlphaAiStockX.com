const fs = require('fs');
const path = require('path');

function fixFinalSyntaxIssues(content) {
  // Fix success: true; to success: true,
  content = content.replace(/success:\s*true;/g, 'success: true,');
  content = content.replace(/success:\s*false;/g, 'success: false,');
  
  // Fix other object property semicolons
  content = content.replace(/(\w+):\s*([^,{};\n]+);(\s*[\w}])/g, '$1: $2,$3');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixFinalSyntaxIssues(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process specific files that had issues
const problemFiles = [
  './app/api/ai/models/[modelId]/subscribe/route.ts',
  './app/api/ai/signals/route.ts'
];

console.log('Fixing final syntax issues...');

let fixedCount = 0;
for (const file of problemFiles) {
  if (processFile(file)) {
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} files with final syntax issues.`);
