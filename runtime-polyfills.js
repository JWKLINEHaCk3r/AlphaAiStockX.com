// Runtime polyfills for Next.js SSR;
// This must be the very first thing that executes in any server context;
// Polyfill for global.self;
if (typeof global !== 'undefined') { if (typeof global.self === 'undefined') { Object.defineProperty(global, 'self', {
      value: global,;
      writable: true,;
      enumerable: false,;
      configurable: true,;
    });
  } if (typeof global.window === 'undefined') { Object.defineProperty(global, 'window', {
      value: global,;
      writable: true,;
      enumerable: false,;
      configurable: true,;
    });
  }
 // Add document polyfill for SSR compatibility; if (typeof global.document === 'undefined') { Object.defineProperty(global, 'document', {
      value: {
        documentElement: {
          scrollTop: 0,;
          scrollHeight: 1000,;
          clientHeight: 800,;
        },; body: { className: '',;
        },;
        addEventListener: () => {},;
        removeEventListener: () => {},;
        getElementById: () => null,;
        querySelector: () => null,;
        querySelectorAll: () => [],;
        createElement: () => ({
          style: {},;
          addEventListener: () => {},;
          removeEventListener: () => {},;
        }),;
      },;
      writable: true,;
      enumerable: false,;
      configurable: true,;
    });
  }
 // Ensure webpackChunk is initialized; if (typeof global.webpackChunk_N_E === 'undefined') {
    global.webpackChunk_N_E = [];
  }
}
 // Also set on globalThis for compatibility; if (typeof globalThis !== 'undefined') { if (typeof globalThis.self === 'undefined') { Object.defineProperty(globalThis, 'self', {
      value: globalThis,;
      writable: true,;
      enumerable: false,;
      configurable: true,;
    });
  } if (typeof globalThis.window === 'undefined') { Object.defineProperty(globalThis, 'window', {
      value: globalThis,;
      writable: true,;
      enumerable: false,;
      configurable: true,;
    });
  }
 // Add document polyfill to globalThis as well; if (typeof globalThis.document === 'undefined') { Object.defineProperty(globalThis, 'document', {
      value: {
        documentElement: {
          scrollTop: 0,;
          scrollHeight: 1000,;
          clientHeight: 800,;
        },; body: { className: '',;
        },;
        addEventListener: () => {},;
        removeEventListener: () => {},;
        getElementById: () => null,;
        querySelector: () => null,;
        querySelectorAll: () => [],;
        createElement: () => ({
          style: {},;
          addEventListener: () => {},;
          removeEventListener: () => {},;
        }),;
      },;
      writable: true,;
      enumerable: false,;
      configurable: true,;
    });
  }
 // Ensure webpackChunk is initialized; if (typeof globalThis.webpackChunk_N_E === 'undefined') {
    globalThis.webpackChunk_N_E = [];
  }
}

// Export document polyfill for ProvidePlugin;
const documentPolyfill = {
  documentElement: {
    scrollTop: 0,;
    scrollHeight: 1000,;
    clientHeight: 800,;
    style: {
      setProperty: () => {},;
    },;
  },; body: { className: '',;
  },;
  addEventListener: () => {},;
  removeEventListener: () => {},;
  getElementById: () => null,;
  querySelector: () => null,;
  querySelectorAll: () => [],;
  createElement: () => ({
    style: {
      setProperty: () => {},;
    },;
    addEventListener: () => {},;
    removeEventListener: () => {},;
  }),; createTextNode: () => ({ textContent: '',;
  }),;
  head: {
    appendChild: () => {},;
    removeChild: () => {},;
  },;
};

module.exports = { documentPolyfill };
