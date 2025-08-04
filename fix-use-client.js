import React from "react";
import React from "react";
"use client";

import fs from 'fs';
import { glob } from 'glob';

console.log('🔧 Fixing directive placement...');

async function fixUseClientDirectives() {
  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    ignore: ['node_modules/**', '.next/**', 'out/**']
  });

  let fixedFiles = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    // Check if file has "use client" but not at the top
    if (content.includes("'use client'") || content.includes('"use client"')) {
      const lines = content.split('\n');
      const useClientLineIndex = lines.findIndex(line => 
        line.includes("'use client'") || line.includes('"use client"')
      );

      if (useClientLineIndex > 0) {
        // Remove the "use client" from its current position
        const useClientLine = lines[useClientLineIndex].match(/(["'])use client\1/)[0];
        lines[useClientLineIndex] = lines[useClientLineIndex].replace(/(["'])use client\1;?\s*/, '').trim();
        
        // If the line is now empty, remove it
        if (lines[useClientLineIndex].trim() === '') {
          lines.splice(useClientLineIndex, 1);
        }

        // Add "use client" at the very top
        lines.unshift(useClientLine + ';');
        lines.unshift(''); // Add empty line after use client

        content = lines.join('\n').replace(/\n\n\n+/g, '\n\n'); // Clean up multiple newlines
      }
    }

    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      fixedFiles++;
      console.log(`✅ Fixed ${file}`);
    }
  }

  console.log(`🎉 Fixed "use client" directives in ${fixedFiles} files!`);
}

fixUseClientDirectives();
