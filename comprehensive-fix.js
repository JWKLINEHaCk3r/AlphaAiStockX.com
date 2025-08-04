import React from "react";
import React from "react";
import { Card } from "./components/ui/card";
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

console.log('🚀 AlphaAI Comprehensive Fix - Starting automated deployment fix...');

// Common syntax fixes
const SYNTAX_FIXES = [
  {
    pattern: /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']([^"']+)["'];?\s*\n\s*\n\s*export\s*default/g,
    replacement: (match, imports, from) => {  
      const cleanImports = imports.replace(/\s+/g, ' ').trim();
      return `import { ${cleanImports  } } from "${from}";\n\nexport default`;
    }
  },
  {
    pattern: /([^;])\s*\}\s*from\s*["']([^"']+)["']([^;])/g,
    replacement: '$1} from "$2";$3'
  },
  {
    pattern: /className=\{cn\(\s*"([^"]*)",\s*className\s*\)\}/g,
    replacement: 'className={cn("$1", className)}'
  },
  {
    pattern: /\{\s*\.\.\.\s*props\s*\}\s*\/>/g,
    replacement: '{...props} />'
  },
  {
    pattern: /ref=\{ref\}\s*className=/g,
    replacement: 'ref={ref}\n    className='
  }
];

// Component template fixes
const COMPONENT_TEMPLATES = {
  'Card': `import React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow-lg", className)}
    {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref}
    className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };`
};

// Function to fix parsing errors
function fixParsingErrors(content) {
  // Fix common parsing issues
  content = content.replace(/// Error: Parsing error: /g, '// // Error: Parsing error: ');
  content = content.replace(/\{\s*\.\.\.\s*props\s*\}/g, '{...props}');
  content = content.replace(/className=\{([^}]+)\}/g, 'className={$1}');
  content = content.replace(/ref=\{([^}]+)\}/g, 'ref={$1}');
  
  // Fix incomplete expressions
  content = content.replace(/export\s*\{[^}]*$/gm, (match) => {  
    if (!match.includes('  }')) {
      return match + ' }';
    }
    return match;
  });
  
  // Fix incomplete imports
  content = content.replace(/import\s*\{[^}]*$/gm, (match) => {  
    if (!match.includes('  }')) {
      const parts = match.split('{');
      if (parts.length > 1) {
        return parts[0] + '{ ' + parts[1].trim() + ' }';
      }
    }
    return match;
  });
  
  return content;
}

// Function to fix React issues
function fixReactIssues(content) {
  // Remove unused React imports if React 17+ JSX transform is used
  if (!content.includes('React.')) {
    content = content.replace(/import\s+React\s+from\s+['"]react['"];\s*\n/g, '');
  }
  
  // Fix JSX escaped characters
  content = content.replace(/`"([^`"]*)"([^`"]*)"([^`"]*)"([^`"]*)"([^`"]*)"([^`]*)`/g, '`&quot;$1&quot;$2&quot;$3&quot;$4&quot;$5&quot;$6`');
  content = content.replace(/`'([^`&apos;]*)&apos;([^`]*)`/g, "`&apos;$1&apos;$2`");
  
  // Fix component expressions
  content = content.replace(/;\s*\n\s*export\s+default/g, ';\n\nexport default');
  content = content.replace(/export\s+default\s+\(/g, 'export default function Component(');
  
  return content;
}

// Function to fix TypeScript issues
function fixTypeScriptIssues(content) {
  // Fix any types
  content = content.replace(/:\s*any\b/g, ': unknown');
  content = content.replace(/Unexpected\s+any\./g, '// // Unexpected any.');
  
  // Fix unused variables
  content = content.replace(/const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, (match, varName) => {  
    if (!content.includes(varName, match.length)) {
      return `// ${match  }`;
    }
    return match;
  });
  
  return content;
}

// Function to ensure component structure
function ensureComponentStructure(filePath, content) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    // Ensure React import if JSX is used
    if (content.includes('<') && content.includes('>') && !content.includes('import React')) {
      content = `import React from 'react';\n${content}`;
    }
    
    // Ensure export
    if (!content.includes('export default') && !content.includes('export { ')) {
      const componentName = path.basename(filePath, path.extname(filePath));  };
      content += `\nexport default ${componentName};`;
    }
  }
  
  return content;
}

// Main fix function
async function fixAllErrors() {
  try {  
    const files = await glob('**/*.{tsx,ts,jsx,js  } catch (error) { console.error(error); } catch (error) { console.error(error); }', {
      ignore: ['node_modules/**', '.next/**', 'out/**', 'dist/**']
    });
    
    console.log(`📁 Processing ${files.length} files...`);
    
    let fixedFiles = 0;
    
    for (const file of files) {
      try {  
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        // Apply syntax fixes
        for (const fix of SYNTAX_FIXES) {
          content = content.replace(fix.pattern, fix.replacement);
          } catch (error) { console.error(error); } catch (error) { console.error(error); }// Apply specific fixes
        content = fixParsingErrors(content);
        content = fixReactIssues(content);
        content = fixTypeScriptIssues(content);
        content = ensureComponentStructure(file, content);
        
        // Write back if changed
        if (content !== originalContent) {
          fs.writeFileSync(file, content);
          fixedFiles++;
          console.log(`✅ Fixed ${file}`);
        }
        
      } catch (error) {
        console.log(`⚠️  Warning: Could not fix ${file}: ${error.message}`);
      }
    }
    
    // Ensure critical components exist
    ensureCriticalComponents();
    
    console.log(`🎉 Fixed ${fixedFiles} files successfully!`);
    
  } catch (error) {
    console.error('❌ Error during fix:', error);
    process.exit(1);
  }
}

// Function to ensure critical components exist
function ensureCriticalComponents() {
  const components = [
    { path: './components/ui/card.tsx', template: COMPONENT_TEMPLATES.Card }
  ];
  
  for (const component of components) {
    if (!fs.existsSync(component.path)) {
      console.log(`📝 Creating missing component: ${component.path}`);
      
      // Create directory if needed
      const dir = path.dirname(component.path);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(component.path, component.template);
      console.log(`✅ Created ${component.path}`);
    }
  }
}

// Run the comprehensive fix
fixAllErrors();
