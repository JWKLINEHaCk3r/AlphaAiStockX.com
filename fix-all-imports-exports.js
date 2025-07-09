import { Card, CardContent } from './components/ui/card';
import { CardContent } from "./components/ui/card";
import { Card } from "./components/ui/card";
console.log('🔧 Fixing all exports and imports in AlphaAI StockX...');

// Function to fix React imports
function fixReactImports(content) {
  // Fix React imports for client components
  if (
    content.includes("'use client'") &&
    !content.includes('import React') &&
    content.includes('React.')
  ) {
    content = content.replace(
      /import \{ ([^}]+) \} from ['"]react['"];/g,
      "import React, { $1 } from 'react';"
    );
  }

  // Fix missing React import when JSX is used
  if ((content.includes('<') || content.includes('jsx')) && !content.includes('import React')) {
    content = "import React from 'react';\n" + content;
  }

  return content;
}

// Function to fix component imports
function fixComponentImports(content) {
  // Fix malformed Card imports
  const cardFixes = [
    {
<<<<<<< HEAD
      pattern: /import \{ Card, CardCoCard, CardContent, ([^}]+) \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: ""
    },
    {
      pattern: /import \{ Card, CardCoCard, CardContent \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: ""
    },
    {
      pattern: /import \{ CardCoCard, ([^}]+) \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: ""
    },
    {
      pattern: /import \{ CardCoCard \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: ""
    }
=======
      pattern:
        /import \{ Card, CardCoCard, CardContent, ([^}]+) \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: "import { Card, CardContent, $1 } from '@/components/ui/card';",
    },
    {
      pattern: /import \{ Card, CardCoCard, CardContent \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: "import { Card, CardContent } from '@/components/ui/card';",
    },
    {
      pattern: /import \{ CardCoCard, ([^}]+) \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: "import { CardContent, $1 } from '@/components/ui/card';",
    },
    {
      pattern: /import \{ CardCoCard \} from ['"]@\/components\/ui\/card['"];/g,
      replacement: "import { CardContent } from '@/components/ui/card';",
    },
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
  ];

  cardFixes.forEach(fix => {
    content = content.replace(fix.pattern, fix.replacement);
  });

  return content;
}

// Function to fix 'use client' directives
function fixUseClientDirectives(content) {
  const lines = content.split('\n');
  const newLines = [];
  let foundClient = false;

  for (const line of lines) {
    if (line.includes("'use client'") && foundClient) {
      // Skip duplicate 'use client'
      continue;
    } else if (line.includes("'use client'")) {
      foundClient = true;
      newLines.push(line);
    } else {
      newLines.push(line);
    }
  }

  return newLines.join('\n');
}

// Function to fix duplicate imports
function fixDuplicateImports(content) {
  // Fix duplicate imports from the same module
  const importRegex =
    /import \{([^}]+)\} from ['"]([^'"]+)['"];?\s*import \{([^}]+)\} from ['"]\2['"];?/g;
  content = content.replace(importRegex, "import { $1, $3 } from '$2';");

  return content;
}

// Function to fix export issues
function fixExportIssues(content) {
  // Count export default statements
  const exportMatches = content.match(/export default/g);
  if (exportMatches && exportMatches.length > 1) {
    const lines = content.split('\n');
    const exportLines = [];

    lines.forEach((line, index) => {
      if (line.includes('export default')) {
        exportLines.push(index);
      }
    });

    // Keep only the last export default
    if (exportLines.length > 1) {
      const newLines = lines.filter((line, index) => {
        return !exportLines.slice(0, -1).includes(index);
      });
      content = newLines.join('\n');
    }
  }

  return content;
}

// Function to fix import order (move imports after 'use client')
function fixImportOrder(content) {
  if (!content.includes("'use client'")) {
    return content;
  }

  const lines = content.split('\n');
  const newLines = [];
  let useClientFound = false;
  const importsBeforeClient = [];

  for (const line of lines) {
    if (line.includes("'use client'")) {
      useClientFound = true;
      newLines.push(line);
      // Add any imports that were before 'use client'
      importsBeforeClient.forEach(importLine => {
        newLines.push(importLine);
      });
      importsBeforeClient.length = 0;
    } else if (!useClientFound && line.match(/^import .+ from ['"][^'"]+['"];?$/)) {
      importsBeforeClient.push(line);
    } else {
      newLines.push(line);
    }
  }

  return newLines.join('\n');
}

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Apply all fixes
    content = fixReactImports(content);
    content = fixComponentImports(content);
    content = fixUseClientDirectives(content);
    content = fixDuplicateImports(content);
    content = fixExportIssues(content);
    content = fixImportOrder(content);

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${path.basename(filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to find all TSX files
function findTsxFiles(dir) {
  const files = [];

  function scanDir(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (stat.isFile() && item.endsWith('.tsx')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning ${currentDir}:`, error.message);
    }
  }

  scanDir(dir);
  return files;
}

// Main execution
async function main() {
  console.log('🔍 Scanning for TSX files...');

  const tsxFiles = findTsxFiles('./app');
  const componentFiles = findTsxFiles('./components');

  const allFiles = [...tsxFiles, ...componentFiles];

  console.log(`📁 Found ${allFiles.length} TSX files to process`);

  let fixedCount = 0;

  for (const file of allFiles) {
    if (processFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\n🎉 Processing complete!`);
  console.log(`✅ Fixed ${fixedCount} files`);
  console.log(`📋 Total files processed: ${allFiles.length}`);

  console.log('\n📝 Summary of fixes applied:');
  console.log('  ✅ Fixed React imports');
  console.log('  ✅ Fixed malformed component imports');
  console.log('  ✅ Removed duplicate "use client" directives');
  console.log('  ✅ Fixed duplicate imports');
  console.log('  ✅ Fixed multiple export defaults');
  console.log('  ✅ Fixed import order (moved imports after "use client")');

  console.log('\n🚀 Next steps:');
  console.log('1. Run: npm install --legacy-peer-deps --force');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run dev');
}

// Run the script
main().catch(console.error);
