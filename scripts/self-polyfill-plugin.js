class SelfPolyfillPlugin {
  constructor() {
    this.name = 'SelfPolyfillPlugin';
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      compilation.hooks.processAssets.tap({
        name: this.name,
        stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
      }, (assets) => {
        Object.keys(assets).forEach((filename) => {
          if (filename.includes('vendors') && filename.endsWith('.js')) {
            const asset = assets[filename];
            const source = asset.source();
            
            if (typeof source === 'string' && source.includes('self.webpackChunk')) {
              // Replace self.webpackChunk with a safer alternative
              const polyfillCode = `
if (typeof self === 'undefined') {
  if (typeof global !== 'undefined') {
    global.self = global;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.self = globalThis;
  }
}
`;
              
              const modifiedSource = polyfillCode + source.replace(/self\.webpackChunk/g, '(typeof self !== "undefined" ? self : global).webpackChunk');
              
              compilation.updateAsset(filename, {
                source: () => modifiedSource,
                size: () => modifiedSource.length
              });
            }
          }
        });
      });
    });
  }
}

module.exports = SelfPolyfillPlugin;
