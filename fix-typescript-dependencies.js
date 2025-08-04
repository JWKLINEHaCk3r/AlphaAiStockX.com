import fs from 'fs';

console.log('🔧 Fixing TypeScript dependency conflicts...');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Fix TypeScript version to be compatible with ESLint
packageJson.devDependencies.typescript = '^5.8.4';
packageJson.devDependencies['@typescript-eslint/parser'] = '^8.30.0';
packageJson.devDependencies['@typescript-eslint/eslint-plugin'] = '^8.30.0';

// Also fix other compatible versions
packageJson.devDependencies.eslint = '^8.57.0';
packageJson.devDependencies['eslint-config-next'] = '^15.3.5';

console.log('✅ Fixed TypeScript to v5.8.4 (compatible with ESLint)');
console.log('✅ Fixed @typescript-eslint packages to v8.30.0');
console.log('✅ Fixed ESLint to stable v8.57.0');

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Dependencies fixed!');
