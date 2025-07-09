// Polyfills for server-side rendering
if (typeof global !== 'undefined' && typeof self === 'undefined') {
  // Define self as global for server-side compatibility
  global.self = global;
}

// Polyfill for WebGL context in Node.js environment
if (typeof global !== 'undefined' && typeof window === 'undefined') {
  global.window = global;
  global.document = {
    documentElement: {
      scrollTop: 0,
      scrollHeight: 1000,
      clientHeight: 800,
    },
    body: {
      className: '',
    },
    createElement: () => ({
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    createElementNS: () => ({
      style: {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  global.navigator = {
    userAgent: 'node.js',
  };
}
