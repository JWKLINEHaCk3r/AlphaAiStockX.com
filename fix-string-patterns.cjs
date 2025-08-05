const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing string patterns and switch statements...\n');

function fixFilePatterns(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const originalContent = content;

  // Fix broken strings across lines (specific patterns found)
  const brokenStringPatterns = [
    // Multi-line string breaks
    /(['"`])([^'"`\n]*)\n\s*([^'"`\n]*)(['"`])/g,
    // Switch statement commas instead of semicolons
    /return\s+(['"`][^'"`]*['"`]),$/gm,
    // Fix unterminated strings with line breaks
    /(['"`][^'"`]*)\n\s*([^'"`\n]*['"`])/g,
  ];

  brokenStringPatterns.forEach(pattern => {
    const newContent = content.replace(pattern, (match, ...groups) => {
      if (groups.length === 4) {
        // Multi-line string fix
        return `${groups[0]}${groups[1].trim()} ${groups[2].trim()}${groups[3]}`;
      } else if (groups.length === 1) {
        // Switch statement fix
        return groups[0].replace(/,$/, ';');
      } else if (groups.length === 2) {
        // Unterminated string fix
        return `${groups[0].trim()} ${groups[1].trim()}`;
      }
      return match;
    });
    
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  // Fix specific broken string patterns found in files
  const specificFixes = [
    // aiNote patterns
    {
      pattern: /aiNote:\s*['"`]([^'"`\n]*)\n\s*([^'"`\n]*)['"`]/g,
      replacement: `aiNote: '$1 $2'`
    },
    // Switch case return patterns
    {
      pattern: /case\s+'([^']+)':\s*return\s+'([^']+)',/g,
      replacement: `case '$1': return '$2';`
    },
    // Broken className patterns
    {
      pattern: /className="([^"]*),\n\s*([^"]*)"/g,
      replacement: `className="$1 $2"`
    }
  ];

  specificFixes.forEach(({ pattern, replacement }) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  if (modified && content !== originalContent) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir);
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (entry !== 'node_modules' && entry !== '.next' && entry !== '.git') {
        fixedCount += processDirectory(fullPath);
      }
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      try {
        if (fixFilePatterns(fullPath)) {
          console.log(`✅ Fixed patterns: ${fullPath}`);
          fixedCount++;
        }
      } catch (error) {
        console.log(`❌ Error processing ${fullPath}: ${error.message}`);
      }
    }
  }

  return fixedCount;
}

// Process the entire project
const projectRoot = __dirname;
const fixedCount = processDirectory(projectRoot);

console.log(`\n🎉 String pattern fix complete!`);
console.log(`📊 Files fixed: ${fixedCount}`);
