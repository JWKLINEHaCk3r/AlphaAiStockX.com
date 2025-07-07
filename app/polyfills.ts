// app/polyfills.ts - Global polyfills that execute before any other code
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  (global as any).self = global;
}

if (typeof global !== 'undefined' && typeof window === 'undefined') {
  (global as any).window = global;
}

export {};
