const fs = require('fs');
const path = require('path');

console.log('🎯 Fixing Card component imports...');

function fixCardImports() {
    const directories = ['./app', './components', './pages', './__tests__'];
    let fixedFiles = 0;

    directories.forEach(dir => {
        if (fs.existsSync(dir)) {
            const files = getAllFiles(dir, ['.tsx', '.ts', '.jsx', '.js']);
            
            files.forEach(file => {
                try {
                    let content = fs.readFileSync(file, 'utf8');
                    let modified = false;

                    // Check if file uses Card components but doesn't import them
                    if (usesCardComponents(content) && !hasCardImport(content)) {
                        // Add Card import at the top
                        const cardImport = 'import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";\n';
                        content = cardImport + content;
                        modified = true;
                    }

                    if (modified) {
                        fs.writeFileSync(file, content);
                        fixedFiles++;
                        console.log(`✅ Fixed Card imports in: ${file}`);
                    }
                } catch (error) {
                    console.log(`❌ Error processing ${file}: ${error.message}`);
                }
            });
        }
    });

    console.log(`🎉 Fixed Card imports in ${fixedFiles} files!`);
}

function usesCardComponents(content) {
    const cardUsagePatterns = [
        /<Card[\s>]/,
        /<CardContent[\s>]/,
        /<CardHeader[\s>]/,
        /<CardTitle[\s>]/
    ];
    
    return cardUsagePatterns.some(pattern => pattern.test(content));
}

function hasCardImport(content) {
    return content.includes('@/components/ui/card') || 
           content.includes('./ui/card') ||
           content.includes('../ui/card');
}

function getAllFiles(dir, extensions) {
    let files = [];
    
    try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                files = files.concat(getAllFiles(fullPath, extensions));
            } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
                files.push(fullPath);
            }
        }
    } catch (error) {
        console.log(`Error reading directory ${dir}: ${error.message}`);
    }
    
    return files;
}

// Run the fix
fixCardImports();