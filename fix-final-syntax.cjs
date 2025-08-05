const fs = require('fs');
const path = require('path');

function fixSpecificSyntaxIssues(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix function parameter semicolons - specifically for NextRequest parameters
    content = content.replace(/(request:\s*NextRequest);/g, '$1,');
    changed = true;

    // Fix object property semicolons within objects
    content = content.replace(/(\w+:\s*'[^']*');(\s*\n\s*\w+:)/g, '$1,$2');
    content = content.replace(/(\w+:\s*\d+\.?\d*);(\s*\n\s*\w+:)/g, '$1,$2');
    content = content.replace(/(\w+:\s*true|false);(\s*\n\s*\w+:)/g, '$1,$2');
    changed = true;

    // Fix object property semicolons in user objects
    content = content.replace(/(email);(\s*\n\s*username)/g, '$1,$2');
    changed = true;

    // Fix health status semicolons
    content = content.replace(/(status:\s*'healthy');/g, '$1,');
    changed = true;

    // Fix message semicolons
    content = content.replace(/(message:\s*'[^']*');/g, '$1,');
    changed = true;

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed specific syntax issues in: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  return false;
}

// Process specific files that are still failing
const apiFiles = [
  'app/api/ai/models/[modelId]/subscribe/route.ts',
  'app/api/ai/models/route.ts', 
  'app/api/ai/signals/route.ts',
  'app/api/auth/register/route.ts',
  'app/api/health/route.ts'
];

const projectRoot = process.cwd();
console.log(`Fixing specific remaining syntax issues...`);

let fixedCount = 0;
for (const file of apiFiles) {
  const fullPath = path.join(projectRoot, file);
  if (fs.existsSync(fullPath)) {
    if (fixSpecificSyntaxIssues(fullPath)) {
      fixedCount++;
    }
  }
}

console.log(`\nCompleted! Fixed specific syntax issues in ${fixedCount} files.`);
