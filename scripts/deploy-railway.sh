#!/bin/bash

echo "🚀 Deploying AlphaAI StockX to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway login

# Initialize Railway project (if not already initialized)
if [ ! -f "railway.toml" ]; then
    echo "🎯 Initializing Railway project..."
    railway link
fi

# Deploy to Railway
echo "�� Deploying to Railway..."
railway up

echo "✅ Deployment to Railway completed!"
