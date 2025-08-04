const fs = require('fs');
const path = require('path');

console.log('🚀 AlphaAI UI Import Fixer - Powering up the trading platform...');

function fixAllUIImports() {
    const directories = ['./app', './components', './pages', './lib', './hooks', './__tests__'];
    let processedFiles = 0;
    let fixedFiles = 0;

    const uiComponents = {
        'Card': '@/components/ui/card',
        'CardContent': '@/components/ui/card',
        'CardHeader': '@/components/ui/card',
        'CardTitle': '@/components/ui/card',
        'Button': '@/components/ui/button',
        'Input': '@/components/ui/input',
        'Badge': '@/components/ui/badge',
        'Progress': '@/components/ui/progress',
        'Toast': '@/components/ui/toast',
        'Toaster': '@/components/ui/toaster',
        'Calendar': '@/components/ui/calendar'
    };

    directories.forEach(dir => {
        if (fs.existsSync(dir)) {
            const files = getAllFiles(dir, ['.tsx', '.ts', '.jsx', '.js']);
            processedFiles += files.length;
            
            files.forEach(file => {
                try {
                    let content = fs.readFileSync(file, 'utf8');
                    let modified = false;
                    let importsToAdd = [];

                    // Check for missing imports
                    Object.entries(uiComponents).forEach(([component, importPath]) => {
                        if (usesComponent(content, component) && !hasImport(content, importPath)) {
                            if (!importsToAdd.find(imp => imp.path === importPath)) {
                                importsToAdd.push({
                                    path: importPath,
                                    components: []
                                });
                            }
                            const importGroup = importsToAdd.find(imp => imp.path === importPath);
                            if (!importGroup.components.includes(component)) {
                                importGroup.components.push(component);
                            }
                        }
                    });

                    // Add React import if needed
                    if (needsReactImport(content) && !hasReactImport(content)) {
                        content = 'import React from "react";\n' + content;
                        modified = true;
                        console.log(`⚛️ Added React import to ${file}`);
                    }

                    // Add UI component imports
                    importsToAdd.forEach(({ path, components }) => {
                        const importStatement = `import { ${components.join(', ')} } from "${path}";\n`;
                        content = importStatement + content;
                        modified = true;
                        console.log(`✅ Added ${components.join(', ')} import to ${file}`);
                    });

                    if (modified) {
                        fs.writeFileSync(file, content);
                        fixedFiles++;
                        console.log(`💾 Updated ${file}`);
                    }
                } catch (error) {
                    console.log(`❌ Error processing ${file}: ${error.message}`);
                }
            });
        }
    });

    console.log(`📝 Found ${processedFiles} files to process`);
    console.log(`🎉 AlphaAI UI Import fixing complete! Trading platform is now powered up!`);
    console.log(`✨ Fixed ${fixedFiles} files with missing imports`);
}

function usesComponent(content, component) {
    const patterns = [
        new RegExp(`<${component}[\\s>]`),
        new RegExp(`${component}\\(`),
        new RegExp(`\\b${component}\\b`)
    ];
    return patterns.some(pattern => pattern.test(content));
}

function hasImport(content, importPath) {
    return content.includes(`from "${importPath}"`) || content.includes(`from '${importPath}'`);
}

function needsReactImport(content) {
    const reactFeatures = ['useState', 'useEffect', 'useContext', 'JSX', '<div', '<span', 'React.'];
    return reactFeatures.some(feature => content.includes(feature));
}

function hasReactImport(content) {
    return content.includes('import React') || content.includes('import * as React');
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

// Run the fixer
fixAllUIImports();
