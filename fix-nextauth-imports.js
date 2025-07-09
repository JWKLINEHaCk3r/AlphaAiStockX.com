#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files with getServerSession imports
function findFilesWithGetServerSession() {
  try {
    const result = execSync(
      'find . -name "*.ts" -o -name "*.tsx" | xargs grep -l "getServerSession" | grep -v node_modules | grep -v .next',
      { encoding: 'utf8' }
    );
    return result
      .trim()
      .split('\n')
      .filter(file => file.length > 0);
  } catch (error) {
    console.log('No files found with getServerSession');
    return [];
  }
}

// Fix the import and usage in a file
function fixFile(filePath) {
  console.log(`Fixing ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace import statements
  if (
    content.includes("import { getServerSession } from 'next-auth'") ||
    content.includes("import { getServerSession } from 'next-auth/next'")
  ) {
    content = content
      .replace(/import { getServerSession } from 'next-auth'(?:\/next)?;?\n?/g, '')
      .replace(/import { authOptions } from '@\/app\/lib\/auth';?\n?/g, '');

    // Add the new import at the top after other imports
    if (!content.includes("import { auth } from '@/app/lib/auth'")) {
      const importMatch = content.match(/(import.*?from.*?;[\s\n]*)+/);
      if (importMatch) {
        const importSection = importMatch[0];
        const replacement = importSection + "import { auth } from '@/app/lib/auth';\n";
        content = content.replace(importSection, replacement);
      } else {
        // If no imports found, add at the beginning
        content = "import { auth } from '@/app/lib/auth';\n" + content;
      }
    }
    modified = true;
  }

  // Replace usage patterns
  const patterns = [
    // Direct usage with authOptions
    {
      from: /const session = await getServerSession\(authOptions\);?/g,
      to: 'const session = await auth();',
    },
    // Usage with type casting
    {
      from: /const session = \(await getServerSession\(authOptions\)\) as.*?;/g,
      to: 'const session = await auth();',
    },
    // Usage in ternary or complex expressions
    {
      from: /\(await getServerSession\(authOptions\)\)\?\.user\?\.id/g,
      to: '(await auth())?.user?.id',
    },
    // Legacy usage with req, res parameters
    {
      from: /await getServerSession\(req, res, authOptions\)/g,
      to: 'await auth()',
    },
  ];

  patterns.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
    return true;
  } else {
    console.log(`⏭️  No changes needed for ${filePath}`);
    return false;
  }
}

// Main execution
console.log('🔍 Finding files with getServerSession imports...');
const files = findFilesWithGetServerSession();

if (files.length === 0) {
  console.log('✅ No files found with getServerSession imports');
  process.exit(0);
}

console.log(`📁 Found ${files.length} files to fix:`);
files.forEach(file => console.log(`  - ${file}`));

let fixedCount = 0;
files.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\n🎉 Fixed ${fixedCount} out of ${files.length} files`);
console.log('🏗️  Running build to verify fixes...');

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful! All NextAuth imports fixed.');
} catch (error) {
  console.log('❌ Build failed. Some issues may remain.');
  process.exit(1);
}
