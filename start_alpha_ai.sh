#!/bin/bash

# AlphaAI Complete Trading Platform Launcher
# Starts both the AI trading engine and Next.js frontend

set -e

echo "🚀 Starting AlphaAI Complete Trading Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the AlphaAiStockX.com root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

print_status "Checking system requirements..."

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js 18+ required. Found: $(node --version)"
    exit 1
fi

# Check Python version
PYTHON_VERSION=$(python3 --version | awk '{print $2}' | cut -d. -f1,2)
REQUIRED_PYTHON="3.8"
if [ "$(printf '%s\n' "$REQUIRED_PYTHON" "$PYTHON_VERSION" | sort -V | head -n1)" != "$REQUIRED_PYTHON" ]; then
    print_error "Python 3.8+ required. Found: $PYTHON_VERSION"
    exit 1
fi

print_success "System requirements check passed"

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
    print_success "Frontend dependencies installed"
else
    print_status "Frontend dependencies already installed"
fi

# Setup AI trading system
cd ai_trader

# Check if virtual environment exists
if [ ! -d "alpha_ai_env" ]; then
    print_status "Setting up AI trading system..."
    
    # Make setup script executable
    chmod +x setup.sh
    
    # Run setup (this will install Python dependencies)
    ./setup.sh
    
    print_success "AI trading system setup complete"
else
    print_status "AI trading environment already exists"
fi

# Activate virtual environment
source alpha_ai_env/bin/activate

# Check if all Python dependencies are installed
print_status "Checking Python dependencies..."
python -c "
import sys
required_modules = ['torch', 'sklearn', 'pandas', 'numpy', 'talib', 'yfinance', 'fastapi', 'uvicorn']
missing = []
for module in required_modules:
    try:
        __import__(module)
    except ImportError:
        missing.append(module)
if missing:
    print(f'Missing modules: {missing}')
    sys.exit(1)
else:
    print('All required modules are installed')
" 2>/dev/null || {
    print_warning "Some Python dependencies are missing. Installing..."
    pip install -r requirements.txt
}

print_success "Python dependencies verified"

# Go back to root directory
cd ..

# Create PID file directory
mkdir -p .pids

# Function to cleanup on exit
cleanup() {
    print_status "Shutting down AlphaAI Trading Platform..."
    
    # Kill all background processes
    if [ -f .pids/trading_engine.pid ]; then
        kill $(cat .pids/trading_engine.pid) 2>/dev/null || true
        rm -f .pids/trading_engine.pid
    fi
    
    if [ -f .pids/api_server.pid ]; then
        kill $(cat .pids/api_server.pid) 2>/dev/null || true
        rm -f .pids/api_server.pid
    fi
    
    if [ -f .pids/nextjs.pid ]; then
        kill $(cat .pids/nextjs.pid) 2>/dev/null || true
        rm -f .pids/nextjs.pid
    fi
    
    print_success "AlphaAI Trading Platform stopped"
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

print_status "Starting AlphaAI components..."

# Start AI Trading Engine
print_status "🤖 Starting AI Trading Engine..."
cd ai_trader
source alpha_ai_env/bin/activate
nohup python alpha_ai_master.py > ../logs/trading_engine.log 2>&1 &
TRADING_PID=$!
echo $TRADING_PID > ../.pids/trading_engine.pid
cd ..

# Wait a moment for trading engine to start
sleep 3

# Start API Server
print_status "🌐 Starting API Server..."
cd ai_trader
source alpha_ai_env/bin/activate
nohup python alpha_ai_api.py > ../logs/api_server.log 2>&1 &
API_PID=$!
echo $API_PID > ../.pids/api_server.pid
cd ..

# Wait for API server to start
sleep 5

# Test API connection
print_status "Testing API connection..."
if curl -s http://localhost:8000/health > /dev/null; then
    print_success "API server is responding"
else
    print_warning "API server may still be starting up..."
fi

# Start Next.js frontend
print_status "⚛️  Starting Next.js Frontend..."
nohup npm run dev > logs/nextjs.log 2>&1 &
NEXTJS_PID=$!
echo $NEXTJS_PID > .pids/nextjs.pid

# Wait for Next.js to start
sleep 10

# Create logs directory if it doesn't exist
mkdir -p logs

print_success "🎉 AlphaAI Trading Platform is now running!"
echo ""
echo -e "${PURPLE}=================================${NC}"
echo -e "${PURPLE}  AlphaAI Trading Platform${NC}"
echo -e "${PURPLE}=================================${NC}"
echo ""
echo -e "${CYAN}🌐 Frontend (Next.js):${NC} http://localhost:3000"
echo -e "${CYAN}🤖 AI Trading Dashboard:${NC} http://localhost:3000/dashboard"
echo -e "${CYAN}📊 API Server:${NC} http://localhost:8000"
echo -e "${CYAN}🔗 API Documentation:${NC} http://localhost:8000/docs"
echo -e "${CYAN}📈 WebSocket:${NC} ws://localhost:8000/ws/market-data"
echo ""
echo -e "${YELLOW}📋 Process IDs:${NC}"
echo -e "   Trading Engine: $TRADING_PID"
echo -e "   API Server: $API_PID"
echo -e "   Next.js Frontend: $NEXTJS_PID"
echo ""
echo -e "${YELLOW}📁 Log Files:${NC}"
echo -e "   Trading Engine: logs/trading_engine.log"
echo -e "   API Server: logs/api_server.log"
echo -e "   Next.js: logs/nextjs.log"
echo ""
echo -e "${GREEN}💰 The AI is now analyzing markets and ready to trade!${NC}"
echo ""
echo -e "${BLUE}Commands:${NC}"
echo -e "   View trading logs: tail -f logs/trading_engine.log"
echo -e "   View API logs: tail -f logs/api_server.log"
echo -e "   Stop platform: Press Ctrl+C"
echo ""

# Function to check if services are running
check_services() {
    local all_running=true
    
    if ! kill -0 $TRADING_PID 2>/dev/null; then
        print_error "Trading engine has stopped"
        all_running=false
    fi
    
    if ! kill -0 $API_PID 2>/dev/null; then
        print_error "API server has stopped"
        all_running=false
    fi
    
    if ! kill -0 $NEXTJS_PID 2>/dev/null; then
        print_error "Next.js frontend has stopped"
        all_running=false
    fi
    
    if [ "$all_running" = false ]; then
        print_error "Some services have stopped. Check log files for details."
        cleanup
    fi
}

# Monitor services
print_status "Monitoring services... (Press Ctrl+C to stop)"
while true; do
    check_services
    sleep 30
done
