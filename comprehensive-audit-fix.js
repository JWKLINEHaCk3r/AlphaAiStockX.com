#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 COMPREHENSIVE PROJECT AUDIT & FIX');
console.log('====================================');

const projectRoot = process.cwd();
let issuesFound = [];
let issuesFixed = [];

// 1. Check project structure
function checkProjectStructure() {
    console.log('\n📁 Phase 1: Project Structure Audit');
    console.log('-----------------------------------');
    
    const requiredDirs = [
        'app',
        'components/ui', 
        'components/trading',
        'lib',
        'types',
        'public'
    ];
    
    requiredDirs.forEach(dir => {
        const dirPath = path.join(projectRoot, dir);
        if (!fs.existsSync(dirPath)) {
            console.log(`❌ Missing directory: ${dir}`);
            issuesFound.push(`Missing directory: ${dir}`);
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`✅ Created: ${dir}`);
            issuesFixed.push(`Created directory: ${dir}`);
        } else {
            console.log(`✅ Found: ${dir}`);
        }
    });
}

// 2. Check essential files
function checkEssentialFiles() {
    console.log('\n📄 Phase 2: Essential Files Audit');
    console.log('---------------------------------');
    
    const essentialFiles = [
        { path: 'app/layout.tsx', required: true },
        { path: 'app/page.tsx', required: true },
        { path: 'app/globals.css', required: true },
        { path: 'components/ui/button.tsx', required: false },
        { path: 'lib/utils.ts', required: false },
        { path: 'tsconfig.json', required: true },
        { path: 'next.config.mjs', required: false }
    ];
    
    essentialFiles.forEach(file => {
        const filePath = path.join(projectRoot, file.path);
        if (!fs.existsSync(filePath)) {
            console.log(`❌ Missing file: ${file.path}`);
            issuesFound.push(`Missing file: ${file.path}`);
            if (file.required) {
                createMissingFile(file.path);
            }
        } else {
            console.log(`✅ Found: ${file.path}`);
        }
    });
}

// 3. Create missing essential files
function createMissingFile(filePath) {
    const fullPath = path.join(projectRoot, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    switch (filePath) {
        case 'app/layout.tsx':
            fs.writeFileSync(fullPath, `import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlphaAI StockX - AI Trading Platform',
  description: 'Advanced AI-powered trading platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
`);
            break;
            
        case 'app/page.tsx':
            fs.writeFileSync(fullPath, `export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🚀 AlphaAI StockX
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Next-Generation AI-Powered Trading Platform
          </p>
        </header>
      </div>
    </div>
  )
}
`);
            break;
            
        case 'app/globals.css':
            fs.writeFileSync(fullPath, `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
`);
            break;
            
        case 'tsconfig.json':
            fs.writeFileSync(fullPath, JSON.stringify({
                "compilerOptions": {
                    "target": "es2022",
                    "lib": ["dom", "dom.iterable", "es6"],
                    "allowJs": true,
                    "skipLibCheck": true,
                    "strict": false,
                    "noEmit": true,
                    "esModuleInterop": true,
                    "module": "esnext",
                    "moduleResolution": "bundler",
                    "resolveJsonModule": true,
                    "isolatedModules": true,
                    "jsx": "preserve",
                    "incremental": true,
                    "plugins": [{ "name": "next" }],
                    "baseUrl": ".",
                    "paths": {
                        "@/*": ["./*"],
                        "@/components/*": ["./components/*"],
                        "@/lib/*": ["./lib/*"],
                        "@/types/*": ["./types/*"],
                        "@/app/*": ["./app/*"]
                    }
                },
                "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
                "exclude": ["node_modules"]
            }, null, 2));
            break;
    }
    
    console.log(`✅ Created: ${filePath}`);
    issuesFixed.push(`Created file: ${filePath}`);
}

// 4. Check dependencies
function checkDependencies() {
    console.log('\n📦 Phase 3: Dependencies Audit');
    console.log('------------------------------');
    
    try {
        const packagePath = path.join(projectRoot, 'package.json');
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        const criticalDeps = [
            'next',
            'react',
            'react-dom',
            'typescript',
            '@types/react',
            '@types/react-dom'
        ];
        
        const missingDeps = criticalDeps.filter(dep => 
            !pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]
        );
        
        if (missingDeps.length > 0) {
            console.log(`❌ Missing critical dependencies: ${missingDeps.join(', ')}`);
            issuesFound.push(`Missing dependencies: ${missingDeps.join(', ')}`);
        } else {
            console.log('✅ All critical dependencies present');
        }
        
    } catch (error) {
        console.log(`❌ Error reading package.json: ${error.message}`);
        issuesFound.push(`Package.json error: ${error.message}`);
    }
}

// 5. Check TypeScript compilation
function checkTypeScript() {
    console.log('\n🔧 Phase 4: TypeScript Compilation Check');
    console.log('---------------------------------------');
    
    try {
        execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
        console.log('✅ TypeScript compilation successful');
    } catch (error) {
        console.log('❌ TypeScript compilation errors found');
        const errorOutput = error.stdout?.toString() || error.stderr?.toString() || '';
        const errorLines = errorOutput.split('\n').slice(0, 10);
        errorLines.forEach(line => {
            if (line.trim()) console.log(`   ${line}`);
        });
        issuesFound.push('TypeScript compilation errors');
    }
}

// 6. Check for missing imports
function checkImports() {
    console.log('\n🔗 Phase 5: Import Validation');
    console.log('-----------------------------');
    
    // This is a simplified check - would need more sophisticated parsing
    const tsFiles = findFilesWithExtension(projectRoot, ['.tsx', '.ts']);
    let importIssues = 0;
    
    tsFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            
            // Check for common import issues
            if (content.includes('from "@/') && !fs.existsSync(path.join(projectRoot, 'tsconfig.json'))) {
                importIssues++;
            }
            
        } catch (error) {
            console.log(`❌ Error reading ${file}: ${error.message}`);
        }
    });
    
    if (importIssues > 0) {
        console.log(`❌ Found ${importIssues} potential import issues`);
        issuesFound.push(`${importIssues} import issues`);
    } else {
        console.log('✅ Import validation passed');
    }
}

// 7. Try build
function testBuild() {
    console.log('\n🏗️ Phase 6: Build Test');
    console.log('----------------------');
    
    try {
        console.log('Testing Next.js build...');
        execSync('npx next build --no-lint', { stdio: 'pipe', timeout: 60000 });
        console.log('✅ Build successful');
    } catch (error) {
        console.log('❌ Build failed');
        issuesFound.push('Build failure');
        
        // Extract key error info
        const errorOutput = error.stdout?.toString() || error.stderr?.toString() || '';
        const errorLines = errorOutput.split('\n').slice(0, 15);
        errorLines.forEach(line => {
            if (line.trim() && (line.includes('Error:') || line.includes('Failed'))) {
                console.log(`   ${line}`);
            }
        });
    }
}

// Helper function
function findFilesWithExtension(dir, extensions, files = []) {
    try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                findFilesWithExtension(fullPath, extensions, files);
            } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
                files.push(fullPath);
            }
        });
    } catch (error) {
        // Ignore errors for directories we can't read
    }
    
    return files;
}

// Generate summary
function generateSummary() {
    console.log('\n📊 AUDIT SUMMARY');
    console.log('================');
    console.log(`Issues Found: ${issuesFound.length}`);
    console.log(`Issues Fixed: ${issuesFixed.length}`);
    
    if (issuesFound.length > 0) {
        console.log('\n❌ Issues Found:');
        issuesFound.forEach((issue, i) => console.log(`   ${i + 1}. ${issue}`));
    }
    
    if (issuesFixed.length > 0) {
        console.log('\n✅ Issues Fixed:');
        issuesFixed.forEach((fix, i) => console.log(`   ${i + 1}. ${fix}`));
    }
    
    if (issuesFound.length === 0) {
        console.log('\n🎉 No critical issues found! Project looks good.');
    } else {
        console.log('\n⚠️  Some issues remain that may need manual attention.');
    }
}

// Run all checks
async function runAudit() {
    checkProjectStructure();
    checkEssentialFiles();
    checkDependencies();
    checkTypeScript();
    checkImports();
    testBuild();
    generateSummary();
}

runAudit().catch(error => {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
});
