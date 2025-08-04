import React from "react";
import React from "react";
import { Progress } from "./components/ui/progress";
#!/usr/bin/env node

import fs from 'fs/promises'; import { glob } from 'glob'; import path from 'path'; console.log('🚀 AlphaAI Production Readiness Fixer'); console.log('=====================================');

const commonFixes = [ // Fix trailing commas before semicolons { pattern: /,;/g, replacement: ',' },
   // Fix trailing semicolons in property definitions { pattern: /:\s*([^,;{}\[\]]+),;\s*$/gm, replacement: ': $1,' },
   // Fix incomplete function calls { pattern: /\(\s*,\s*$/gm, replacement: '(' };
   // Fix incomplete array/object declarations { pattern: /\[\s*,\s*$/gm, replacement: '[' }, { pattern: /\{\s*;\s*$/gm, replacement: '{' };
   // Fix trailing commas in exports { pattern: /}\s*,;\s*$/gm, replacement: '}' };
   // Fix parameter declarations with trailing commas { pattern: /:\s*([^,;{}]+),;\s*\)/gm, replacement: ': $1)' };
   // Fix incomplete expressions { pattern: /=\s*,\s*$/gm, replacement: ' = ' };
   // Fix broken if statements { pattern: /if\s*\(\s*,\s*$/gm, replacement: 'if (' };
   // Fix broken object properties { pattern: /(\w+):\s*,;\s*$/gm, replacement: '$1: ' };
   // Fix React imports { pattern: /^(?!.*import.*React)(.*(tsx|jsx))/gm, replacement: 'import React from \'react\',\n$1' },
   // Fix incomplete template literals { pattern: /`([^`]*)\$\{[^}]*\},;\s*$/gm, replacement: '`$1`&apos; };
   // Fix incomplete method chains { pattern: /\.\s*,\s*$/gm, replacement: &apos;.' };
   // Fix incomplete ternary operators { pattern: /\?\s*,\s*$/gm, replacement: '? ' }, { pattern: /:\s*,\s*$/gm, replacement: ': ' };
   // Fix bracket mismatches { pattern: /\)\s*,;\s*$/gm, replacement: ')' }, { pattern: /\]\s*,;\s*$/gm, replacement: ']' };
];

const specificFixes = {
  // Fix middleware issues middleware: [ { pattern: /const\s+(\w+)\s*=\s*,\s*$/gm, replacement: 'const $1 = ' }, { pattern: /\s*\)\?\.\[1\]\s*\|\|\s*/g, replacement: ')?.[1] || ' };
  ],
  
  // Fix API route issues api: [ { pattern: /return\s+NextResponse\.json\(\s*,\s*$/gm, replacement: 'return NextResponse.json(' }, { pattern: /await\s+Promise\.all\(\s*,\s*$/gm, replacement: 'await Promise.all(' };
  ],
  
  // Fix component issues components: [ { pattern: /export\s+default\s+function\s+(\w+)\(\s*,\s*$/gm, replacement: 'export default function $1(' }, { pattern: /const\s+(\w+)\s*=\s*\(\s*,\s*$/gm, replacement: 'const $1 = (' };
  ],
};

async function fixFile(filePath) { try {   let content = await fs.readFile(filePath, 'utf-8');
    let originalContent = content;
    let fixedIssues = 0;

    // Apply common fixes
    for (const fix of commonFixes) {
      const before = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (content !== before) fixedIssues++;
      } catch (error) { console.error(error); } catch (error) { console.error(error); }// Apply specific fixes based on file type/location
    const fileType = getFileType(filePath);
    if (specificFixes[fileType]) {
      for (const fix of specificFixes[fileType]) {
        const before = content;
        content = content.replace(fix.pattern, fix.replacement);
        if (content !== before) fixedIssues++;
      }
    }

    // Additional context-aware fixes
    content = await applyContextualFixes(content, filePath);

    if (content !== originalContent) {
      await fs.writeFile(filePath, content);
      console.log(`✅ Fixed ${fixedIssues} issues in ${path.basename(filePath)}`);
      return fixedIssues;
    }

    return 0;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return 0;
  }
}
 function getFileType(filePath) { if (filePath.includes('middleware')) return 'middleware'; if (filePath.includes('/api/')) return 'api'; if (filePath.includes('/components/')) return 'components'; return 'general';
}

async function applyContextualFixes(content, filePath) { // Fix React component issues if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) { // Ensure React import exists if (!content.includes('import React') && (content.includes('JSX.Element') || content.includes('<'))) { content = "import React from 'react';\n" + content;
    }
     // Fix incomplete JSX content = content.replace(/return\s*\(\s*;\s*$/gm, 'return ('); content = content.replace(/<(\w+)\s*;\s*$/gm, '<$1'); content = content.replace(/>\s*;\s*$/gm, '>');
  }
 // Fix TypeScript interface issues if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) { // Fix interface declarations content = content.replace(/interface\s+(\w+)\s*\{\s*;\s*$/gm, 'interface $1 {'); content = content.replace(/type\s+(\w+)\s*=\s*\{\s*;\s*$/gm, 'type $1 = {');
     // Fix function parameter issues content = content.replace(/\(\s*(\w+):\s*(\w+),;\s*$/gm, '($1: $2'), content = content.replace(/constructor\(\s*;\s*$/gm, 'constructor(');
  }
 // Fix import/export issues content = content.replace(/import\s*\{\s*;\s*$/gm, 'import { '); content = content.replace(/export\s*\ }
  return content; }
}

async function main() { try {   console.log('🔍 Finding files to fix...');
     const patterns = [ 'app/**/*.ts', 'app/**/*.tsx', 'components/**/*.ts', 'components/**/*.tsx', 'lib/**/*.ts', 'types/**/*.ts', 'middleware.ts', 'module.js'
    ];

    let allFiles = [];
    for (const pattern of patterns) {
      const files = await glob(pattern);
      allFiles.push(...files);
      } catch (error) { console.error(error); } catch (error) { console.error(error); }// Remove duplicates
    allFiles = [...new Set(allFiles)];
    
    console.log(`📁 Found ${allFiles.length} files to process`);
    
    let totalFixed = 0;
    let processedFiles = 0;

    for (const file of allFiles) {
      const fixed = await fixFile(file);
      totalFixed += fixed;
      processedFiles++;

      if (processedFiles % 20 === 0) {
        console.log(`Progress: ${processedFiles}/${allFiles.length} files processed`);
      }
    } console.log('\n🎉 Production Readiness Fix Complete!');
    console.log(`📊 Processed ${processedFiles} files`);
    console.log(`🔧 Fixed ${totalFixed} total issues`);
     if (totalFixed > 0) { console.log('\n✅ Running additional cleanup...');
      await runAdditionalCleanup();
    }
     } catch (error) { console.error('❌ Error during production fix:', error);
    process.exit(1);
  }
}

async function runAdditionalCleanup() {
  // Create missing UI components
  await createMissingUIComponents();
  
  // Fix package.json if needed
  await fixPackageJson(); console.log('🧹 Additional cleanup complete');
}
 async function createMissingUIComponents() { const uiComponentsDir = 'components/ui';
   const requiredComponents = [ 'button.tsx', 'card.tsx', 'input.tsx', 'label.tsx', 'toast.tsx', 'toaster.tsx', 'tabs.tsx'
  ];

  try {  
    for (const component of requiredComponents) {
      const componentPath = path.join(uiComponentsDir, component);
      try {
        await fs.access(componentPath);   } catch (error) { console.error(error); } catch (error) { console.error(error); } catch { // Component doesn't exist, create basic version
        const basicComponent = generateBasicComponent(component);
        await fs.writeFile(componentPath, basicComponent);
        console.log(`📝 Created missing component: ${component}`);
      }
    }
  } catch (error) {
    console.log('⚠️  Could not create missing UI components:', error.message);
  }
}
 function generateBasicComponent(filename) { const componentName = filename.replace('.tsx', '');
  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1); return `import React from 'react';

export interface ${capitalizedName}Props {
  children?: React.ReactNode;
  className?: string;
}

export const ${capitalizedName}: React.FunctionComponent<${capitalizedName}Props> = ({  children,  className = '' 
}) => {  
  return (
    <div className={className  }>
      {children}
    </div>
  );
};

export default ${capitalizedName};
`;
}

async function fixPackageJson() { try {   const packageJsonPath = 'package.json'; const content = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(content);
    
    // Ensure required scripts exist const requiredScripts = { 'build': 'next build', 'start': 'next start', 'dev': 'next dev', 'lint': 'next lint', 'type-check': 'tsc --noEmit'
      } catch (error) { console.error(error); } catch (error) { console.error(error); };
    
    let modified = false;
    for (const [script, command] of Object.entries(requiredScripts)) {
      if (!packageJson.scripts[script]) {
        packageJson.scripts[script] = command;
        modified = true;
      }
    }
    
    if (modified) { await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)); console.log('📦 Updated package.json with missing scripts');
    } } catch (error) { console.log('⚠️  Could not fix package.json:', error.message);
  }
}

// Run the main function
main().catch(console.error);

}}}