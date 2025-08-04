const fs = require('fs');

function fixSwitchStatements(content) {
  // Find and fix inline switch statements
  const switchRegex = /(\w+)\s*=>\s*{\s*switch\s*\([^}]+?\):\s*return\s*[^;]+,\s*}\s*;/g;
  
  content = content.replace(switchRegex, (match) => {
    // Fix the trailing comma to semicolon in the default case
    return match.replace(/,\s*}\s*;/, '; }');
  });
  
  // More specific fix for the exact pattern we see
  content = content.replace(
    /(const\s+\w+\s*=\s*\([^)]+\)\s*=>\s*{\s*switch\s*\([^)]+\)\s*{[^}]+)default:\s*return\s*'[^']+',(\s*}\s*};)/g,
    '$1default: return \'text-gray-400\';$2'
  );
  
  // Fix any remaining trailing commas in return statements
  content = content.replace(/return\s*'[^']+',(\s*}\s*})/g, "return 'text-gray-400';$1");
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixSwitchStatements(content);
    
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

// Fix the specific problematic files
const files = [
  './app/components/ai-tools/AINewsSentiment.tsx',
  './app/components/ai-tools/AIInsiderUnusual.tsx'
];

let fixedCount = 0;
for (const file of files) {
  if (processFile(file)) {
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} files with switch statement issues.`);
