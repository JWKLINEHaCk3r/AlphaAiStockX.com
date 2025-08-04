const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing syntax errors...');

function fixSyntaxErrors() {
    const directories = ['./app', './components', './pages', './lib', './hooks'];
    let fixedFiles = 0;

    directories.forEach(dir => {
        if (fs.existsSync(dir)) {
            const files = getAllFiles(dir, ['.tsx', '.ts', '.jsx', '.js']);
            
            files.forEach(file => {
                try {
                    let content = fs.readFileSync(file, 'utf8');
                    let modified = false;

                    // Fix common syntax errors
                    const originalContent = content;

                    // Fix missing semicolons
                    content = content.replace(/^(\s*)(import .+)(?<!;)$/gm, '$1$2;');
                    content = content.replace(/^(\s*)(export .+)(?<!;)$/gm, '$1$2;');

                    // Fix "use client" placement
                    if (content.includes('"use client"') || content.includes("'use client'")) {
                        content = content.replace(/['"]use client['"];?\s*/g, '');
                        if (hasClientFeatures(content)) {
                            content = '"use client";\n\n' + content;
                        }
                    }

                    // Fix bracket mismatches (simple cases)
                    const openBraces = (content.match(/{/g) || []).length;
                    const closeBraces = (content.match(/}/g) || []).length;
                    
                    if (openBraces > closeBraces) {
                        content += '\n'.repeat(openBraces - closeBraces) + '}'.repeat(openBraces - closeBraces);
                        modified = true;
                    }

                    if (content !== originalContent) {
                        fs.writeFileSync(file, content);
                        fixedFiles++;
                        console.log(`✅ Fixed syntax in: ${file}`);
                    }
                } catch (error) {
                    console.log(`❌ Error processing ${file}: ${error.message}`);
                }
            });
        }
    });

    console.log(`🎉 Fixed syntax errors in ${fixedFiles} files!`);
}

function hasClientFeatures(content) {
    const clientFeatures = [
        'useState', 'useEffect', 'useContext', 'useReducer',
        'onClick', 'onChange', 'onSubmit', 'onLoad',
        'addEventListener', 'window.', 'document.',
        'localStorage', 'sessionStorage'
    ];
    return clientFeatures.some(feature => content.includes(feature));
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

fixSyntaxErrors();