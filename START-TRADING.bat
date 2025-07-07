@echo off
echo.
echo 🚀 AlphaAI Trading Platform - One-Click Start
echo Activating 47 AI beings for market domination!
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! 
    echo Please run setup-ultimate-trading.ps1 first to install Node.js
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo ✅ Starting AlphaAI Trading Platform...
echo.

REM Start the development server
start /B npm run dev

REM Wait for server to start
echo ⏳ Waiting for trading platform to initialize...
timeout /t 5 /nobreak >nul

REM Open browser
echo 🌐 Opening trading dashboard in browser...
start http://localhost:3000

echo.
echo 🎉 AlphaAI Trading Platform is now LIVE!
echo.
echo 💡 Quick Start Guide:
echo   1. Click "Start Trading" to activate AI beings
echo   2. Set your risk level (Conservative/Aggressive/Quantum)
echo   3. Watch the AI make you money automatically!
echo.
echo 🗣️ Voice Commands (if enabled):
echo   - "Hey AlphaAI, start trading"
echo   - "AlphaAI, show my portfolio"
echo   - "What's the market sentiment?"
echo.
echo 📊 Dashboard Features:
echo   ✅ Real-time market data
echo   ✅ 47 AI beings status
echo   ✅ Automatic trade execution
echo   ✅ Live profit/loss tracking
echo   ✅ Risk management controls
echo.
echo 🛑 To stop trading: Press Ctrl+C in this window
echo.
echo Happy Trading! 💰
echo.

REM Keep window open
echo Press any key to close this window...
pause >nul
