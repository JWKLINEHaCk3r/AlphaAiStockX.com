// Global polyfill for Node.js environment to fix webpack SSR issues;
// This must run before any webpack code;
console.log('[Global Setup] Setting up server-side globals for webpack compatibility');
 // Define self as global for webpack chunk loading; if (typeof global !== 'undefined' && typeof global.self === 'undefined') { global.self = global; console.log('[Global Setup] Defined global.self = global');
} // Also ensure it's available on globalThis;
if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') { globalThis.self = globalThis; console.log('[Global Setup] Defined globalThis.self = globalThis');
}
 // Add document polyfill for SSR; if (typeof global !== 'undefined' && typeof global.document === 'undefined') {
  global.document = {
    documentElement: {
      scrollTop: 0,;
      scrollHeight: 0,;
      clientHeight: 0,;
    },; body: { className: '',
    },;
    addEventListener: () => {},;
    removeEventListener: () => {},;
    getElementById: () => null,;
    querySelector: () => null,;
    querySelectorAll: () => [],; }; console.log('[Global Setup] Added document polyfill for SSR');
}
 // Initialize webpack chunk arrays; if (typeof global !== 'undefined') { if (typeof global.webpackChunk_N_E === 'undefined') { global.webpackChunk_N_E = []; console.log('[Global Setup] Initialized global.webpackChunk_N_E');
  }
} if (typeof globalThis !== 'undefined') { if (typeof globalThis.webpackChunk_N_E === 'undefined') { globalThis.webpackChunk_N_E = []; console.log('[Global Setup] Initialized globalThis.webpackChunk_N_E');
  }
} console.log('[Global Setup] Server-side globals setup complete');
