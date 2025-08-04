const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔧 Fixing critical syntax errors...');

async function fixSyntaxErrors() {
  try {
    const files = await glob('**/*.{tsx,ts,jsx,js}', {
      ignore: ['node_modules/**', '.next/**', 'out/**', 'dist/**']
    });
    
    let fixedCount = 0;
    
    for (const file of files) {
      try {
        if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
          continue;
        }
        
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;
        
        // Fix common syntax errors
        
        // 1. Fix missing semicolons in exports
        content = content.replace(/export\s*\{([^}]+)\}(?!\s*;)/g, 'export { $1 };');
        
        // 2. Fix missing import statements for React
        if (content.includes('jsx') || content.includes('<') && !content.includes('import React')) {
          content = 'import React from "react";\n' + content;
        }
        
        // 3. Fix malformed try-catch blocks
        content = content.replace(/try\s*\{([^}]*)\}\s*(?!catch|finally)/g, 'try { $1 } catch (error) { console.error(error); }');
        
        // 4. Fix arrow function syntax
        content = content.replace(/=>\s*\{([^}]*)\}(?!\s*[,;)])/g, '=> { $1 }');
        
        // 5. Fix missing closing brackets
        const openBrackets = (content.match(/\{/g) || []).length;
        const closeBrackets = (content.match(/\}/g) || []).length;
        if (openBrackets > closeBrackets) {
          const diff = openBrackets - closeBrackets;
          content += '\n' + '}'.repeat(diff);
        }
        
        // 6. Fix console.log statements
        content = content.replace(/console\.log\(/g, 'console.log(');
        
        if (content !== originalContent) {
          fs.writeFileSync(file, content);
          fixedCount++;
          console.log('✅ Fixed syntax errors in ' + file);
        }
        
      } catch (error) {
        if (error.code !== 'EISDIR') {
          console.log('⚠️ Warning: Could not process ' + file + ': ' + error.message);
        }
      }
    }
    
    console.log('✅ Fixed syntax errors in ' + fixedCount + ' files');
  } catch (error) {
    console.error('❌ Error fixing syntax:', error);
  }
}

fixSyntaxErrors().catch(console.error);
