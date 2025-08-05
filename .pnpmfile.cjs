// .pnpmfile.cjs - Handle build script approvals for AlphaAI StockX
module.exports = {
  hooks: {
    readPackage(pkg, context) {
      // Auto-approve build scripts for known safe packages
      const approvedBuildPackages = [
        '@prisma/client',
        '@prisma/engines', 
        '@tailwindcss/oxide',
        '@tensorflow/tfjs-node',
        'bcrypt',
        'ccxt',
        'core-js',
        'cypress',
        'prisma',
        'sharp',
        'unrs-resolver'
      ];

      // Remove build script warnings for approved packages
      if (approvedBuildPackages.includes(pkg.name)) {
        if (pkg.scripts && pkg.scripts.install) {
          // Keep the install script but mark as approved
          context.log(`Auto-approving build script for ${pkg.name}`);
        }
      }

      return pkg;
    }
  }
};
