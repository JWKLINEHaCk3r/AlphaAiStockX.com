// Webpack polyfill for server-side rendering;
// This ensures that 'self' is defined before webpack code executes;
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}

if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}

// Ensure window is also available for compatibility;
if (typeof global !== 'undefined' && typeof global.window === 'undefined') {
  global.window = global;
}

if (typeof globalThis !== 'undefined' && typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis;
}

console.log('[Webpack Polyfill] Applied server-side globals');
