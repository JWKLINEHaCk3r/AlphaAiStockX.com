const fs = require('fs');
const path = require('path');

console.log('Post-build: Fixing webpack chunk loading for SSR...');

const vendorsPath = path.join(process.cwd(), '.next', 'server', 'vendors.js');

if (fs.existsSync(vendorsPath)) {
  console.log(`Post-build: Found vendors.js at ${vendorsPath}`);
  
  let content = fs.readFileSync(vendorsPath, 'utf8');
  
  // Add polyfill at the beginning
  const polyfill = `
// SSR polyfill for webpack chunk loading
if (typeof self === 'undefined') {
  if (typeof global !== 'undefined') {
    global.self = global;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.self = globalThis;
  }
}

`;
  
  // Replace self.webpackChunk with safer alternatives
  content = content.replace(
    /\(self\.webpackChunk_N_E=self\.webpackChunk_N_E\|\|\[\]\)/g,
    '(typeof self !== "undefined" ? self : global).webpackChunk_N_E = (typeof self !== "undefined" ? self : global).webpackChunk_N_E || []'
  );
  
  // Also handle other self references
  content = content.replace(
    /self\.webpackChunk/g,
    '(typeof self !== "undefined" ? self : global).webpackChunk'
  );
  
  // Add polyfill at the beginning
  content = polyfill + content;
  
  fs.writeFileSync(vendorsPath, content);
  console.log('Post-build: Successfully patched vendors.js');
} else {
  console.log('Post-build: vendors.js not found, skipping patch');
}

console.log('Post-build: Patch script completed');
