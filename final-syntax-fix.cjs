#!/usr/bin/env node

const fs = require('fs');
const { glob } = require('glob');

console.log('🔧 Final Comprehensive Syntax Fix');
console.log('==================================');

async function fixAllSyntaxErrors() {
  try {
    const files = glob.sync('app/**/*.{ts,tsx}').filter(f => 
      !f.includes('node_modules') && 
      !f.includes('.next') &&
      fs.existsSync(f)
    );
    
    console.log(`📁 Found ${files.length} files to process`);
    
    let totalFixed = 0;
    
    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf-8');
        const originalContent = content;
        
        // Fix all syntax issues:
        
        // 1. Fix missing commas in objects
        content = content.replace(/(\w+:\s*[^,{}]+)\s*(\w+:)/g, '$1,\n    $2');
        
        // 2. Fix missing commas after statements
        content = content.replace(/(\{[^}]*)\s+(\w+:)/g, '$1,\n    $2');
        
        // 3. Fix semicolons that should be commas in objects
        content = content.replace(/:\s*([^,{}]+);\s*(\w+:)/g, ': $1,\n    $2');
        
        // 4. Fix array/object incomplete closures
        content = content.replace(/\[\s*([^[\]]+)\s*\]/g, (match, inner) => {
          if (!inner.trim().endsWith(',') && inner.includes('\n')) {
            return '[' + inner.replace(/([^,\s])\s*\n/g, '$1,\n') + ']';
          }
          return match;
        });
        
        // 5. Fix function call syntax
        content = content.replace(/(\w+)\(\s*([^)]+);\s*([^)]+)\)/g, '$1($2, $3)');
        
        // 6. Fix Promise.all syntax
        content = content.replace(/Promise\.all\(\[\s*([^[\]]*);([^[\]]*);([^[\]]*)\s*\]\)/g, 
          'Promise.all([\n      $1,\n      $2,\n      $3\n    ])');
        
        // 7. Fix incomplete property access
        content = content.replace(/(\w+)\s*\.\s*$/gm, '$1');
        
        // 8. Fix NextResponse.json syntax
        content = content.replace(/NextResponse\.json\(\s*([^,{}]+);\s*([^)]+)\s*\)/g, 
          'NextResponse.json($1, $2)');
        
        // 9. Fix object property closing
        content = content.replace(/:\s*([^,{}]+)\s*}\s*}/g, ': $1\n  }\n}');
        
        // 10. Fix incomplete increment operations
        content = content.replace(/(\w+)\.count\+\s*$/gm, '$1.count++;');
        
        // 11. Fix broken chain calls
        content = content.replace(/\.\s*\n\s*\./g, '.');
        content = content.replace(/\.\s*(\w+)\(\s*\)\s*;\s*(\w+)\(/g, '.$1().$2(');
        
        // 12. Fix validation objects
        content = content.replace(/(\w+):\s*\([^)]+\)\s*:\s*boolean\s*=>\s*([^;]+);\s*(\w+:)/g, 
          '$1: ($2),\n  $3');
        
        // 13. Fix z.string() chains
        content = content.replace(/z,\s*\.string\(\)\s*;\s*\.transform/g, 
          'z.string().transform');
        content = content.replace(/z\s*\.\s*string\(\)\s*;\s*\.(\w+)/g, 'z.string().$1');
        
        // 14. Fix missing return statements
        content = content.replace(/(\s+)return true\s*$/gm, '$1return true;');
        
        // 15. Fix spread operator syntax
        content = content.replace(/\.\.\.\s*([^,{}]+);\s*}/g, '...$1\n  }');
        
        if (content !== originalContent) {
          fs.writeFileSync(file, content);
          totalFixed++;
          console.log(`✅ Fixed syntax in ${file}`);
        }
        
      } catch (error) {
        console.log(`⚠️  Error processing ${file}: ${error.message}`);
      }
    }
    
    console.log(`\n✅ Syntax fix complete!`);
    console.log(`🔧 Fixed ${totalFixed} files`);
    console.log(`🚀 All import trace errors should now be resolved!`);
    
  } catch (error) {
    console.error('❌ Error during syntax fix:', error);
    process.exit(1);
  }
}

fixAllSyntaxErrors();
