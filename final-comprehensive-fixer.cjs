const fs = require('fs');
const path = require('path');

function fixAllRemainingIssues(content) {
  // Fix incomplete lines and multi-line statements
  content = content.replace(/`\[.*?\]\s*Action:.*?reason}\`;\s*\.\.\.l/g, (match) => {
    return match.replace('...l', '...prevLog');
  });
  
  // Fix useEffect patterns with incomplete syntax
  content = content.replace(/}, \d+\); } else \{[^}]+\}\s*}/g, (match) => {
    return match.replace(/}, (\d+)\); } else \{([^}]+)\}\s*}/g, '}, $1);\n      } else {\n        $2\n      }');
  });
  
  // Fix array spread patterns  
  content = content.replace(/setLog\(l =>/g, 'setLog(prevLog =>');
  content = content.replace(/\.\.\.l\]/g, '...prevLog]');
  
  // Fix incomplete function definitions
  content = content.replace(/const strategies: AIStrategy\[\] = \[ \{[^}]+run: async[^}]+\{[^}]+\}\s*\)\s*$/gm, (match) => {
    if (!match.includes('}];')) {
      return match + '\n  }];';
    }
    return match;
  });
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixAllRemainingIssues(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Fix the specific problematic file
const problemFile = './app/components/ai/AITradeCopilotFuturistic.tsx';

console.log('Fixing remaining syntax issues...');

if (processFile(problemFile)) {
  console.log('Fixed AITradeCopilotFuturistic.tsx');
} else {
  console.log('No changes needed for AITradeCopilotFuturistic.tsx');
}
