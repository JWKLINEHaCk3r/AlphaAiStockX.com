#!/usr/bin/env node

import fs from 'fs/promises'; import { glob } from 'glob'; console.log('🚀 Final Build Syntax Fixer');

async function fixFile(filePath) { try { let content = await fs.readFile(filePath, 'utf-8');
    let originalContent = content;
     // Fix array elements with semicolons content = content.replace(/'([^']+)';/g, "'$1',"); content = content.replace(/"([^"]+)";/g, '"$1",');
     // Fix object properties ending with semicolons in arrays/objects content = content.replace(/:\s*([^,;{}]+)\s*;\s*$/gm, ': $1,'); content = content.replace(/:\s*([0-9.]+)\s*;\s*$/gm, ': $1,'); content = content.replace(/:\s*(true|false|null|undefined)\s*;\s*$/gm, ': $1,');
     // Fix incomplete object syntax content = content.replace(/}\s*;\s*(\{)/gm, '},\n$1');
     // Fix NextResponse.json syntax content = content.replace(/NextResponse\.json\(\s*\{\s*([^}]+)\s*\}\s*;\s*\{/gm, 'NextResponse.json(\n        { $1 },\n        {');
     // Fix const declarations inside objects content = content.replace(/^\s*}\s*,\s*const\s+/gm, '};\n  const ');
     // Remove trailing semicolons before closing brackets content = content.replace(/;\s*(\]|\})/gm, '$1');
     // Fix header objects content = content.replace(/'([^']+)':\s*'([^']+)';/g, "'$1': '$2',");
    
    if (content !== originalContent) {
      await fs.writeFile(filePath, content);
      console.log(`✅ Fixed ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}
 const problematicFiles = [ 'app/components/AITradingDashboard.tsx', 'app/api/ai-tools/market-predictor/route.ts', 'app/api/ai-tools/portfolio-optimizer/route.ts', 'app/api/ai-tools/signal-bot/route.ts', 'app/api/ai/signals/route.ts'
];

let totalFixed = 0;
for (const file of problematicFiles) {
  const fixed = await fixFile(file);
  if (fixed) totalFixed++;
}

console.log(`🎉 Fixed ${totalFixed} problematic files!`);
