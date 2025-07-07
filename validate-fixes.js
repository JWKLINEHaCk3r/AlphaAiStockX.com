const fs = require('fs');
const path = require('path');

console.log('🔍 Validating AlphaAI StockX Fixes...');
console.log('=====================================');

// Key files to check
const keyFiles = [
  'app/dashboard/page.tsx',
  'app/components/ai/AITradingAdvisor.tsx',
  'app/components/trading/AIModelTraining.tsx',
  'components/ui/card.tsx',
  'app/components/PortfolioOptimizer.tsx'
];

// Validation checks
const checks = {
  hasReactImport: (content) => content.includes('import React'),
  hasUseClient: (content) => content.includes("'use client'"),
  hasValidExport: (content) => {
    const exportMatches = content.match(/export default/g);
    return exportMatches && exportMatches.length === 1;
  },
  noMalformedCardImports: (content) => !content.includes('CardCoCard'),
  noDuplicateUseClient: (content) => {
    const matches = content.match(/'use client'/g);
    return !matches || matches.length <= 1;
  },
  correctImportOrder: (content) => {
    if (!content.includes("'use client'")) return true;
    const lines = content.split('\n');
    let useClientIndex = -1;
    let firstImportAfterClient = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("'use client'")) {
        useClientIndex = i;
      }
      if (useClientIndex >= 0 && lines[i].match(/^import .+ from/)) {
        firstImportAfterClient = i;
        break;
      }
    }
    
    return firstImportAfterClient > useClientIndex || firstImportAfterClient === -1;
  }
};

let totalChecks = 0;
let passedChecks = 0;
const results = [];

console.log('\n📁 Checking key files...\n');

keyFiles.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${filePath} - File not found`);
    return;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const fileResults = {
    file: filePath,
    checks: {},
    score: 0,
    total: 0
  };
  
  console.log(`📄 ${filePath}`);
  
  Object.entries(checks).forEach(([checkName, checkFn]) => {
    totalChecks++;
    fileResults.total++;
    
    try {
      const passed = checkFn(content);
      fileResults.checks[checkName] = passed;
      
      if (passed) {
        passedChecks++;
        fileResults.score++;
        console.log(`  ✅ ${checkName}`);
      } else {
        console.log(`  ❌ ${checkName}`);
      }
    } catch (error) {
      console.log(`  ⚠️  ${checkName} - Error: ${error.message}`);
    }
  });
  
  const percentage = Math.round((fileResults.score / fileResults.total) * 100);
  console.log(`  📊 Score: ${fileResults.score}/${fileResults.total} (${percentage}%)\n`);
  
  results.push(fileResults);
});

// Overall results
console.log('🎯 Overall Results');
console.log('==================');
console.log(`✅ Passed: ${passedChecks}/${totalChecks} checks`);
console.log(`📊 Success Rate: ${Math.round((passedChecks / totalChecks) * 100)}%`);

// Detailed summary
console.log('\n📋 Summary by Check Type:');
const checkSummary = {};
Object.keys(checks).forEach(checkName => {
  checkSummary[checkName] = {
    passed: 0,
    total: 0
  };
});

results.forEach(result => {
  Object.entries(result.checks).forEach(([checkName, passed]) => {
    checkSummary[checkName].total++;
    if (passed) checkSummary[checkName].passed++;
  });
});

Object.entries(checkSummary).forEach(([checkName, summary]) => {
  const percentage = Math.round((summary.passed / summary.total) * 100);
  const status = percentage === 100 ? '✅' : percentage >= 80 ? '⚠️' : '❌';
  console.log(`  ${status} ${checkName}: ${summary.passed}/${summary.total} (${percentage}%)`);
});

// Status assessment
const overallPercentage = Math.round((passedChecks / totalChecks) * 100);
let status = '';
let recommendation = '';

if (overallPercentage >= 95) {
  status = '🎉 EXCELLENT';
  recommendation = 'Project is ready for production deployment!';
} else if (overallPercentage >= 85) {
  status = '✅ GOOD';
  recommendation = 'Project is ready with minor optimizations possible.';
} else if (overallPercentage >= 70) {
  status = '⚠️ NEEDS ATTENTION';
  recommendation = 'Some issues need to be addressed before deployment.';
} else {
  status = '❌ CRITICAL ISSUES';
  recommendation = 'Significant fixes needed before proceeding.';
}

console.log(`\n🎯 Project Status: ${status}`);
console.log(`💡 Recommendation: ${recommendation}`);

// Next steps
console.log('\n🚀 Next Steps:');
if (overallPercentage >= 85) {
  console.log('1. Install dependencies: npm install --legacy-peer-deps --force');
  console.log('2. Run type check: npm run type-check');
  console.log('3. Build project: npm run build');
  console.log('4. Start development: npm run dev');
  console.log('5. Deploy to production!');
} else {
  console.log('1. Review failed checks above');
  console.log('2. Run fix-all-imports-exports.js again if needed');
  console.log('3. Manually fix any remaining issues');
  console.log('4. Re-run this validation script');
}

console.log('\n✨ Validation complete!');

module.exports = {
  results,
  overallPercentage,
  status,
  recommendation
};
