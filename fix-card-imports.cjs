const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🎴 Fixing Card imports...');

async function fixCardImports() {
  try {
    const files = await glob('**/*.{tsx,ts}', {
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
        
        // Fix various card import patterns
        content = content.replace(/from\s+['"]@\/components\/ui\/card['"]/g, 'from "@/components/ui/card.js"');
        content = content.replace(/from\s+['"]\.\/card['"]/g, 'from "./card.js"');
        content = content.replace(/from\s+['"]\.\.\/card['"]/g, 'from "../card.js"');
        content = content.replace(/from\s+['"]\.\.\/\.\.\/card['"]/g, 'from "../../card.js"');
        content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/card['"]/g, 'from "../../../card.js"');
        content = content.replace(/from\s+['"]components\/ui\/card['"]/g, 'from "components/ui/card.js"');
        
        // Fix directory imports to specific files
        content = content.replace(/from\s+['"]@\/components\/ui\/card\/index['"]/g, 'from "@/components/ui/card.js"');
        content = content.replace(/from\s+['"]\.\/index['"]/g, 'from "./card.js"');
        
        if (content !== originalContent) {
          fs.writeFileSync(file, content);
          fixedCount++;
          console.log(`✅ Fixed card import in ${file}`);
        }
        
      } catch (error) {
        if (error.code !== 'EISDIR') {
          console.log(`⚠️ Warning: Could not process ${file}: ${error.message}`);
        }
      }
    }
    
    console.log(`✅ Fixed card imports in ${fixedCount} files`);
  } catch (error) {
    console.error('❌ Error fixing card imports:', error);
  }
}

fixCardImports().catch(console.error);
