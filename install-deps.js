const { exec } = require('child_process');

console.log('🚀 Installing AlphaAI StockX dependencies...');

// Use node's child_process to run npm install
exec(
  'npm install --legacy-peer-deps --force',
  { maxBuffer: 1024 * 1024 * 10 },
  (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error installing dependencies:', error);
      console.log('⚠️ Trying alternative installation methods...');

      // Try with reduced verbosity
      exec('npm install --legacy-peer-deps --silent', (err2, out2, err2_stderr) => {
        if (err2) {
          console.error('❌ Alternative installation failed:', err2);
          console.log('📋 Dependencies may need manual installation');
          console.log('💡 Try running: npm install --legacy-peer-deps --force');
        } else {
          console.log('✅ Dependencies installed successfully with alternative method!');
          console.log(out2);
        }
      });
    } else {
      console.log('✅ Dependencies installed successfully!');
      console.log(stdout);
    }

    if (stderr) {
      console.log('⚠️ Warnings:', stderr);
    }
  }
);
