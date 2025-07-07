// Custom loader to inject global polyfills
module.exports = function(source) {
  const polyfillCode = `
// Global polyfills for SSR compatibility
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}
if (typeof global !== 'undefined' && typeof global.window === 'undefined') {
  global.window = global;
}
`;
  
  return polyfillCode + source;
};
