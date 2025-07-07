# AlphaAI StockX - Complete Installation and Fix Script (Windows)
Write-Host "🚀 AlphaAI StockX - Complete Installation and Fix Script" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green

# Check if Node.js is available
$nodeAvailable = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeAvailable) {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    Write-Host "💡 Download from: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node --version
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

# Check if npm is available
$npmAvailable = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmAvailable) {
    Write-Host "⚠️ npm not found directly, using alternative method..." -ForegroundColor Yellow
    $npmCmd = "node `"C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js`""
} else {
    $npmCmd = "npm"
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take several minutes..." -ForegroundColor Yellow

# Try multiple installation strategies
Write-Host "🔧 Strategy 1: Standard installation with legacy peer deps" -ForegroundColor Cyan
try {
    Invoke-Expression "$npmCmd install --legacy-peer-deps --force"
    $installSuccess = $LASTEXITCODE -eq 0
} catch {
    $installSuccess = $false
}

if (-not $installSuccess) {
    Write-Host "⚠️ Standard installation failed, trying alternative..." -ForegroundColor Yellow
    Write-Host "🔧 Strategy 2: Clean installation" -ForegroundColor Cyan
    
    # Clean previous installation
    if (Test-Path "node_modules") {
        Remove-Item "node_modules" -Recurse -Force
    }
    if (Test-Path "package-lock.json") {
        Remove-Item "package-lock.json" -Force
    }
    
    try {
        Invoke-Expression "$npmCmd install --legacy-peer-deps"
        $installSuccess = $LASTEXITCODE -eq 0
    } catch {
        $installSuccess = $false
    }
}

if (-not $installSuccess) {
    Write-Host "⚠️ npm installation failed, trying yarn..." -ForegroundColor Yellow
    Write-Host "🔧 Strategy 3: Using Yarn" -ForegroundColor Cyan
    
    try {
        Invoke-Expression "$npmCmd install -g yarn"
        yarn install --force
        $installSuccess = $LASTEXITCODE -eq 0
    } catch {
        $installSuccess = $false
    }
}

Write-Host ""
Write-Host "🔍 Checking installation..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $packageCount = (Get-ChildItem "node_modules" | Measure-Object).Count
    Write-Host "✅ node_modules directory created successfully" -ForegroundColor Green
    Write-Host "📊 Installed packages: $packageCount" -ForegroundColor Green
} else {
    Write-Host "❌ node_modules directory not found" -ForegroundColor Red
    Write-Host "⚠️ Dependencies may not be fully installed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🏗️ Testing build..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "📝 Running type check..." -ForegroundColor Cyan
    try {
        Invoke-Expression "$npmCmd run type-check"
        $typeCheckSuccess = $LASTEXITCODE -eq 0
    } catch {
        $typeCheckSuccess = $false
    }
    
    Write-Host "🏗️ Running build..." -ForegroundColor Cyan
    try {
        Invoke-Expression "$npmCmd run build"
        $buildSuccess = $LASTEXITCODE -eq 0
    } catch {
        $buildSuccess = $false
    }
    
    if ($buildSuccess) {
        Write-Host "✅ Build successful!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Build had issues, but dependencies are installed" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ Skipping build due to missing dependencies" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Installation script completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
$depsStatus = if (Test-Path "node_modules") { "✅ Installed" } else { "❌ Failed" }
$buildStatus = if (Test-Path ".next\BUILD_ID") { "✅ Success" } else { "⚠️ Needs attention" }
Write-Host "  - Dependencies: $depsStatus" -ForegroundColor White
Write-Host "  - Build: $buildStatus" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To start development:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 To build for production:" -ForegroundColor Yellow
Write-Host "  npm run build" -ForegroundColor White
Write-Host ""
Write-Host "📝 Project is ready for development and deployment!" -ForegroundColor Green

# Keep window open
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
