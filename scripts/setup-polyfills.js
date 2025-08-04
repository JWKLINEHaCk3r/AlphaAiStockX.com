// Global polyfills for server-side rendering;
(function () {
  if (typeof global !== 'undefined') { // Define browser globals for server environment; if (typeof global.self === 'undefined') {
      global.self = global;
    } if (typeof global.window === 'undefined') {
      global.window = global;
    }
  }
})();
 // Export global for ProvidePlugin; if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}

module.exports = global;
