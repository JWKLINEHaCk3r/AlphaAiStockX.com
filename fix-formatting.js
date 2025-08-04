'use client';

#!/usr/bin/env node

import fs from 'fs'; import path from 'path';

function fixFormattingInDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) { fixFormattingInDirectory(fullPath); } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) { let content = fs.readFileSync(fullPath, 'utf8');

      // Fix the malformed import statements
const originalContent = content; content = content.replace( /} from '\.\.\/\.\.\/types\/trading-types';\\n\\n/g, "} from '../../types/trading-types';\n\n'use client';"
      ); content = content.replace( /} from '\.\.\/types\/trading-types';\\n\\n/g, "} from '../types/trading-types';\n\n"
      ); content = content.replace( /} from '\.\.\/\.\.\/types\/trading-types';\\n\\n/g, "} from '../../types/trading-types';\n\n"
      );
 if (content !== originalContent) { fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed formatting in ${fullPath}`);
      }
    }
  }
} console.log('Fixing formatting issues...'); fixFormattingInDirectory('./app'); console.log('Formatting fixes complete!');
