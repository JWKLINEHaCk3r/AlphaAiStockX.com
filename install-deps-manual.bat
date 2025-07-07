@echo off
echo Installing AlphaAI StockX dependencies...
echo.

REM Try npm install with different strategies
echo Trying npm install with legacy peer deps...
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install --legacy-peer-deps --force

if %errorlevel% neq 0 (
    echo.
    echo npm install failed, trying with reduced options...
    node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install --legacy-peer-deps
)

if %errorlevel% neq 0 (
    echo.
    echo Standard npm install failed, trying yarn...
    node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install -g yarn
    yarn install --force
)

echo.
echo Installation complete!
echo.
pause
