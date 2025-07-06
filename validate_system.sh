#!/bin/bash

echo "🚀 AlphaAI Trading System Final Validation"
echo "==========================================="

# Test 1: Check if core files exist
echo -e "\n📁 Checking core system files..."
FILES_TO_CHECK=(
    "ai_trader/alpha_ai_engine.py"
    "ai_trader/alpha_ai_master.py" 
    "ai_trader/alpha_ai_api.py"
    "ai_trader/automated_execution_engine.py"
    "ai_trader/real_time_market_data.py"
    "app/components/trading/LiveAITradingDashboard.tsx"
    "app/ai-trading/page.tsx"
    "start_alpha_ai.sh"
)

all_files_exist=true
for file in "${FILES_TO_CHECK[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_files_exist=false
    fi
done

# Test 2: Check if Node.js dependencies are installed
echo -e "\n📦 Checking Node.js setup..."
if [[ -d "node_modules" ]]; then
    echo "✅ node_modules directory exists"
    
    # Check key dependencies
    if [[ -d "node_modules/next" ]]; then
        echo "✅ Next.js installed"
    else
        echo "❌ Next.js not found"
    fi
    
    if [[ -d "node_modules/react" ]]; then
        echo "✅ React installed"  
    else
        echo "❌ React not found"
    fi
else
    echo "❌ node_modules not found - need to run npm install"
fi

# Test 3: Check if AI trader requirements exist
echo -e "\n🤖 Checking AI trader setup..."
if [[ -f "ai_trader/requirements.txt" ]]; then
    echo "✅ AI trader requirements.txt exists"
    echo "📋 Required packages:"
    cat ai_trader/requirements.txt | head -10
else
    echo "❌ AI trader requirements.txt missing"
fi

# Test 4: Check startup script
echo -e "\n🚀 Checking startup scripts..."
if [[ -f "start_alpha_ai.sh" && -x "start_alpha_ai.sh" ]]; then
    echo "✅ Main startup script ready"
else
    echo "❌ Startup script missing or not executable"
fi

# Test 5: Validate project structure
echo -e "\n🏗️  Project structure validation..."
if [[ -f "package.json" ]]; then
    echo "✅ package.json exists"
    # Check if it has the required scripts
    if grep -q '"dev":' package.json && grep -q '"build":' package.json; then
        echo "✅ Build scripts configured"
    else
        echo "❌ Build scripts missing"
    fi
else
    echo "❌ package.json missing"
fi

# Test 6: Check TypeScript configuration
echo -e "\n⚙️  TypeScript configuration..."
if [[ -f "tsconfig.json" ]]; then
    echo "✅ TypeScript config exists"
else
    echo "❌ TypeScript config missing"
fi

# Summary
echo -e "\n📊 VALIDATION SUMMARY"
echo "===================="
if $all_files_exist; then
    echo "✅ All core AI trading files present"
else
    echo "❌ Some core files missing"
fi

echo -e "\n🎯 NEXT STEPS:"
echo "1. Run 'npm install' if node_modules missing"
echo "2. Install Python dependencies: 'pip install -r ai_trader/requirements.txt'"
echo "3. Start the system: './start_alpha_ai.sh'"
echo "4. Access the dashboard at http://localhost:3000/ai-trading"

echo -e "\n✅ AlphaAI Trading System validation complete!"
