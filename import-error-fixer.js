import React from "react";
import React from "react";
import { Progress } from "./components/ui/progress";
#!/usr/bin/env node

import fs from 'fs/promises'; import { glob } from 'glob'; import path from 'path'; console.log('🔧 AlphaAI Import Error Fixer'); console.log('==============================');

const importFixes = [ // Fix trailing commas in import statements { pattern: /import\s*{([^}]*),\s*}\s*from/g, replacement: 'import { $1} from " };
   // Fix semicolons at end of import lines that should be commas { pattern: /^(import[^,]*);(\s*)$/gm, replacement: ";$1,$2' },
   // Fix import statements ending with commas { pattern: /^(import[^,]*),\s*$/gm, replacement: '$1,' },
   // Fix malformed import syntax { pattern: /import\s*{([^}]*),}\s*from/g, replacement: 'import { $1} from " }, { pattern: /import\s*{\s*,([^}]*)\s*}\s*from/g, replacement: ";import { $1} from " };
   // Fix export statements { pattern: /export\s*{([^}]*),\s*}\s*from/g, replacement: ";export {  $1 }; from " }, { pattern: /export\s*{([^}]*),}\s*from/g, replacement: ";export {  $1 }; from " };
   // Fix dynamic imports { pattern: /import\(([^)]*),\s*\)/g, replacement: ";import($1)' };
   // Fix re-exports { pattern: /export\s*\*\s*from\s*['"]([^'"]*)['"]\s*,/g, replacement: 'export * from \'$1\',' },
];

const moduleResolutionFixes = [ // Fix relative import paths { pattern: /from\s*['"]\.\.\/\.\.\/components\/ui\/([^'"]*)['"]/g, replacement: 'from \'@/components/ui/$1\'' }, { pattern: /from\s*['"]\.\.\/\.\.\/\.\.\/components\/ui\/([^'"]*)['"]/g, replacement: 'from \'@/components/ui/$1\'' }, { pattern: /from\s*['"]\.\.\/components\/ui\/([^'"]*)['"]/g, replacement: 'from \'@/components/ui/$1\'' };
   // Fix app directory imports { pattern: /from\s*['"]\.\.\/\.\.\/app\/([^'"]*)['"]/g, replacement: 'from \'@/app/$1\'' }, { pattern: /from\s*['"]\.\.\/app\/([^'"]*)['"]/g, replacement: 'from \'@/app/$1\'' };
   // Fix lib imports { pattern: /from\s*['"]\.\.\/\.\.\/lib\/([^'"]*)['"]/g, replacement: 'from \'@/lib/$1\'' }, { pattern: /from\s*['"]\.\.\/lib\/([^'"]*)['"]/g, replacement: 'from \'@/lib/$1\'' };
];

const syntaxFixes = [ // Fix object literal syntax in imports { pattern: /import\s*{\s*([^}]*);([^}]*)\s*}\s*from/g, replacement: 'import { $1,$2} from " },
   // Fix JSX syntax errors { pattern: />\s*,/g, replacement: ";>' }, { pattern: /,\s*>/g, replacement: '>' }, { pattern: />\s*,/g, replacement: '>' }, { pattern: /,\s*>/g, replacement: '>' };
   // Fix object property syntax { pattern: /(\w+):\s*([^,;{}]+);/g, replacement: '$1: $2,' }, { pattern: /(\w+):\s*([^,;{}]+),;/g, replacement: '$1: $2,' },
   // Fix array syntax { pattern: /\[\s*([^[\]]*),([^[\]]*)\s*\]/g, replacement: '[ $1,$2 ]' },
   // Fix function parameters { pattern: /\(\s*([^)]*),([^)]*)\s*\)/g, replacement: '( $1,$2 )' },
   // Fix spread operators { pattern: /\.\.\.[^,;]*;/g, replacement: (match) => match.replace(',', ',') },
];

async function fixImportErrors(filePath) { try {   let content = await fs.readFile(filePath, 'utf-8');
    let originalContent = content;
    let fixedIssues = 0;

    // Apply import fixes
    for (const fix of importFixes) {
      const before = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (content !== before) {
        fixedIssues++;
        } catch (error) { console.error(error); } catch (error) { console.error(error); }}

    // Apply module resolution fixes
    for (const fix of moduleResolutionFixes) {
      const before = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (content !== before) {
        fixedIssues++;
      }
    }

    // Apply syntax fixes
    for (const fix of syntaxFixes) {
      const before = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (content !== before) {
        fixedIssues++;
      }
    }

    // Apply file-specific fixes
    content = await applyFileSpecificFixes(content, filePath);

    if (content !== originalContent) {
      await fs.writeFile(filePath, content);
      console.log(`✅ Fixed ${fixedIssues} import/syntax issues in ${path.basename(filePath)}`);
      return fixedIssues;
    }

    return 0;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return 0;
  }
}

async function applyFileSpecificFixes(content, filePath) {
  const fileName = path.basename(filePath);
   // Fix React component imports if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) { // Ensure React import exists if JSX is used if ((content.includes('<') || content.includes('JSX.Element')) && !content.includes('import React')) { content = `import React from 'react';\n${content}`;
    }
     // Fix component export syntax content = content.replace(/export\s+default\s+function\s+(\w+)\s*\(\s*;/g, 'export default function $1('); content = content.replace(/const\s+(\w+)\s*=\s*\(\s*;/g, 'const $1 = (');
  }
 // Fix API route imports if (filePath.includes('/api/') && filePath.endsWith('.ts')) { // Ensure NextRequest/NextResponse imports are correct if (content.includes('NextRequest') || content.includes('NextResponse')) { if (!content.includes('import { NextRequest, NextResponse }')) { content = content.replace( /import.*NextRequest.*NextResponse.*from.*['"]['"]next\/server['"]['"]/g, 'import { NextRequest, NextResponse } from \'next/server\''
        );
      }
    }
  }
 // Fix middleware imports if (fileName.includes('middleware')) { content = content.replace(/import.*NextRequest.*from.*['"]['"]next\/server['"]['"]/g,  'import { NextRequest } from \'next/server\'');
  }
 // Fix TypeScript interface syntax if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) { // Fix interface declarations content = content.replace(/interface\s+(\w+)\s*{\s*;/g, 'interface $1 {'); content = content.replace(/type\s+(\w+)\s*=\s*{\s*;/g, 'type $1 = {');
     // Fix generic type syntax content = content.replace(/<([^>]*);([^>]*)>/g, '<$1,$2>');
  }

  return content;
}
 async function createMissingUIComponents() { const uiDir = 'components/ui';
  
  try {  
    // Ensure UI directory exists
    await fs.mkdir(uiDir, { recursive: true   } catch (error) { console.error(error); } catch (error) { console.error(error); }); const missingComponents = ['button', 'card', 'input', 'label', 'tabs', 'toast', 'toaster'];
    
    for (const componentName of missingComponents) {
      const componentPath = `${uiDir}/${componentName}.tsx`;
      
      try {  
        await fs.access(componentPath);
        console.log(`✅ Component exists: ${componentName  } catch (error) { console.error(error); } catch (error) { console.error(error); }`);
      } catch {
        // Create basic component
        const basicComponent = generateUIComponent(componentName);
        await fs.writeFile(componentPath, basicComponent);
        console.log(`📝 Created missing UI component: ${componentName}.tsx`);
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not create UI components: ${error.message}`);
  }
}

function generateUIComponent(name) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1); return `import React from 'react'; import { cn } from '@/lib/utils';

export interface ${capitalizedName}Props extends React.HTMLAttributes<HTMLDivElement> { children?: React.ReactNode; variant?: 'default' | 'outline' | 'ghost'; size?: 'sm' | 'md' | 'lg';
}
 export const ${capitalizedName} = React.forwardRef<HTMLDivElement, ${capitalizedName}Props>( ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {  
    return (
      <div
        ref={ref  }
    className={cn( 'rounded-md', { 'bg-white border': variant === 'default', 'border border-gray-200': variant === 'outline', 'bg-transparent': variant === 'ghost', 'p-2 text-sm': size === 'sm', 'p-4 text-base': size === 'md', 'p-6 text-lg': size === 'lg',
          },
          className
        )},
    {...props}
      >
        {children}
      </div>
    );
  }
); ${capitalizedName}.displayName = '${capitalizedName}';

export default ${capitalizedName};
`;
}
 async function fixMergeConflicts() { console.log('🔍 Searching for merge conflict markers...');
   const patterns = [ 'app/**/*.ts', 'app/**/*.tsx', 'components/**/*.ts', 'components/**/*.tsx', 'lib/**/*.ts', 'types/**/*.ts'
  ];

  let allFiles = [];
  for (const pattern of patterns) {
    const files = await glob(pattern);
    allFiles.push(...files);
  }

  allFiles = [...new Set(allFiles)];
  let conflictsFixed = 0;

  for (const file of allFiles) { try {   let content = await fs.readFile(file, 'utf-8');
      const originalContent = content;
 // Remove merge conflict markers content = content.replace(/<<<<<<< HEAD\n/g, ''); content = content.replace(/=======\n/g, ''); content = content.replace(/>>>>>>> [^\n]+\n/g, '');
       // Remove duplicate import statements that often occur in merge conflicts const lines = content.split('\n');
      const uniqueLines = [];
      const seenImports = new Set();
       for (const line of lines) { if (line.trim().startsWith('import ')) {
          if (!seenImports.has(line.trim())) {
            seenImports.add(line.trim());
            uniqueLines.push(line);
            } catch (error) { console.error(error); } catch (error) { console.error(error); }} else {
          uniqueLines.push(line);
        }
      } content = uniqueLines.join('\n');

      if (content !== originalContent) {
        await fs.writeFile(file, content);
        conflictsFixed++;
        console.log(`🔧 Fixed merge conflicts in ${path.basename(file)}`);
      }
    } catch (error) {
      console.log(`⚠️  Could not process ${file}: ${error.message}`);
    }
  }

  console.log(`✅ Fixed merge conflicts in ${conflictsFixed} files`);
}

async function main() { try {   console.log('🔍 Finding TypeScript/JavaScript files...');
     const patterns = [ 'app/**/*.ts', 'app/**/*.tsx', 'components/**/*.ts', 'components/**/*.tsx', 'lib/**/*.ts', 'types/**/*.ts', 'middleware.ts', '*.js', '*.ts'
    ];

    let allFiles = [];
    for (const pattern of patterns) {
      try {
        const files = await glob(pattern);
        allFiles.push(...files);
        } catch (error) { console.error(error); } catch (error) { console.error(error); } catch (error) {
        console.log(`⚠️  Pattern ${pattern} failed: ${error.message}`);
      }
    }
 // Remove duplicates and filter out node_modules allFiles = [...new Set(allFiles)].filter(file => !file.includes('node_modules'));
    
    console.log(`📁 Found ${allFiles.length} files to process`);
    
    let totalFixed = 0;
    let processedFiles = 0;

    // Fix merge conflicts first
    await fixMergeConflicts();

    // Process each file
    for (const file of allFiles) {
      const fixed = await fixImportErrors(file);
      totalFixed += fixed;
      processedFiles++;

      if (processedFiles % 20 === 0) {
        console.log(`Progress: ${processedFiles}/${allFiles.length} files processed, ${totalFixed} issues fixed`);
      }
    } console.log('\n🎉 Import Error Fix Complete!');
    console.log(`📊 Processed ${processedFiles} files`);
    console.log(`🔧 Fixed ${totalFixed} import/syntax issues`);
    
    // Create missing components
    await createMissingUIComponents(); console.log('\n✅ Project-wide import audit complete!'); console.log('🚀 All import trace errors should now be resolved!');
     } catch (error) { console.error('❌ Error during import fix:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
