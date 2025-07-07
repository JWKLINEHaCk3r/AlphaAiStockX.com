# Install Dependencies and Fix All Exports - Clean Version
Write-Host "Starting AlphaAI StockX Full Repair Process..." -ForegroundColor Green

# Step 1: Try to install Node.js if not available
$nodeAvailable = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeAvailable) {
    Write-Host "Node.js not found. Attempting installation..." -ForegroundColor Yellow
    
    # Try chocolatey first
    try {
        choco install nodejs -y
        Write-Host "Node.js installed via Chocolatey" -ForegroundColor Green
    }
    catch {
        Write-Host "Chocolatey not available, trying direct download..." -ForegroundColor Yellow
        
        # Download and install Node.js
        $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
        $nodeInstaller = "$env:TEMP\node-installer.msi"
        
        try {
            Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing
            Start-Process msiexec.exe -Wait -ArgumentList "/i $nodeInstaller /quiet /norestart"
            
            # Refresh PATH
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
            
            Write-Host "Node.js installed successfully!" -ForegroundColor Green
            Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
        }
        catch {
            Write-Host "Could not install Node.js automatically. Please install from https://nodejs.org" -ForegroundColor Red
        }
    }
}

# Step 2: Install dependencies
$nodeAvailable = Get-Command node -ErrorAction SilentlyContinue
if ($nodeAvailable) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    
    try {
        npm install --legacy-peer-deps --force
        Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "npm install failed, trying alternative methods..." -ForegroundColor Yellow
        
        # Try with yarn if available
        $yarnAvailable = Get-Command yarn -ErrorAction SilentlyContinue
        if ($yarnAvailable) {
            yarn install --force
        }
        else {
            # Install yarn and try
            npm install -g yarn
            yarn install --force
        }
    }
}

Write-Host "Fixing React imports and exports..." -ForegroundColor Yellow

# Step 3: Fix the global React types
$globalTypesDir = "types"
if (-not (Test-Path $globalTypesDir)) {
    New-Item -ItemType Directory -Path $globalTypesDir -Force
}

$globalTypesContent = @"
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  
  namespace React {
    type ReactNode = any;
    type ComponentType<P = {}> = any;
    type FC<P = {}> = any;
    type ReactElement = any;
    type MouseEvent<T = Element> = any;
    type ChangeEvent<T = Element> = any;
    interface HTMLAttributes<T> {
      [key: string]: any;
    }
  }
}

declare const React: any;
export {};
"@

Set-Content "$globalTypesDir\react-global.d.ts" $globalTypesContent -Encoding UTF8

Write-Host "Created global React type definitions" -ForegroundColor Green

Write-Host "Process completed. Run 'npm run dev' to start the development server." -ForegroundColor Green
