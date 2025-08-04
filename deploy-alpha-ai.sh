#!/bin/bash
set -e

echo "🚀 AlphaAI StockX Deployment Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Environment Check
print_status "Checking environment..."
node_version=$(node --version)
npm_version=$(npm --version)
print_status "Node.js: $node_version"
print_status "NPM: $npm_version"

# Step 2: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next out dist

# Step 3: Install dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Step 4: Run fixes
print_status "Running automated fixes..."
if [ -f "comprehensive-fix.js" ]; then
    node comprehensive-fix.js
    print_success "Comprehensive fixes applied"
fi

if [ -f "fix-use-client-v2.js" ]; then
    node fix-use-client-v2.js
    print_success "Use client directives fixed"
fi

# Step 5: Build the application
print_status "Building the application..."
NEXT_TELEMETRY_DISABLED=1 npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Step 6: Check build output
if [ -d ".next" ]; then
    print_success ".next directory exists"
    if [ -f ".next/BUILD_ID" ]; then
        print_success "BUILD_ID file exists"
        BUILD_ID=$(cat .next/BUILD_ID)
        print_status "Build ID: $BUILD_ID"
    else
        print_warning "BUILD_ID file not found"
    fi
else
    print_error ".next directory not found!"
    exit 1
fi

# Step 7: Start the application
print_status "Starting the production server..."
npm start &
SERVER_PID=$!

# Wait a few seconds for server to start
sleep 5

# Step 8: Health check
print_status "Performing health check..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Server is responding!"
    print_success "🎉 AlphaAI StockX is now running at http://localhost:3000"
else
    print_warning "Server may not be responding yet, please check manually"
fi

echo ""
echo "=================================="
echo "🎯 Deployment Summary:"
echo "- Build: ✅ Complete"
echo "- Server: ✅ Started (PID: $SERVER_PID)"
echo "- URL: http://localhost:3000"
echo "- Admin: http://localhost:3000/admin"
echo "- AI Tools: http://localhost:3000/ai-tools"
echo "- Trading: http://localhost:3000/ai-trading"
echo "=================================="
echo ""
echo "To stop the server: kill $SERVER_PID"
echo "To view logs: tail -f ~/.pm2/logs/alphaaistockx-*.log (if using PM2)"

# Optional: Start with PM2 for production
read -p "Would you like to start with PM2 for production? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Installing PM2..."
    npm install -g pm2 2>/dev/null || true
    
    print_status "Stopping current server..."
    kill $SERVER_PID 2>/dev/null || true
    
    print_status "Starting with PM2..."
    pm2 delete alphaaistockx 2>/dev/null || true
    pm2 start npm --name "alphaaistockx" -- start
    pm2 save
    print_success "AlphaAI StockX is now running with PM2!"
    pm2 status
fi

print_success "🎊 AlphaAI StockX deployment completed successfully!"
