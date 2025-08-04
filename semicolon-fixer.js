#!/usr/bin/env node

import fs from 'fs/promises'; import { glob } from 'glob'; console.log('🔧 Fixing semicolon to comma syntax errors...'); const files = await glob('app/**/*.{ts,tsx}');

for (const file of files) { try {   let content = await fs.readFile(file, 'utf-8');
    const original = content;
     // Fix object property semicolons to commas content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*[^;,{  } catch (error) { console.error(error); } catch (error) { console.error(error); }]+);(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*\[[^\]]*\]);(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*\{[^}]*\});(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*'[^']*');(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*"[^"]*");(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*`[^`]*`);(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*\d+);(\s*)$/gm, '$1,$2'); content = content.replace(/^(\s*[a-zA-Z_$][\w$]*\s*:\s*(?:true|false|null|undefined));(\s*)$/gm, '$1,$2');
     // Fix array and object literal commas content = content.replace(/(\w+:\s*[^,;{}]+);(\s*})/gm, '$1$2'); content = content.replace(/(\w+:\s*[^,;{}]+);(\s*\])/gm, '$1$2'); content = content.replace(/;(\s*})/gm, '$1'); content = content.replace(/;(\s*\])/gm, '$1');
    
    if (content !== original) {
      await fs.writeFile(file, content);
      console.log(`✅ Fixed ${file}`);
    }
  } catch (error) {
    console.log(`❌ Error fixing ${file}: ${error.message}`);
  }
} console.log('🎉 Semicolon fix complete!');
