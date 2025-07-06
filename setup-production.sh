#!/bin/bash

# AlphaAiStockX Production Setup Script
echo "🚀 AlphaAiStockX Production Setup"
echo "=================================="

# Check if required environment variables are set
echo "📋 Checking environment configuration..."

# Generate a secure NextAuth secret if needed
if grep -q "your-super-secret-nextauth-secret-key-here" .env.local; then
    echo "🔑 Generating secure NextAuth secret..."
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    sed -i.bak "s/your-super-secret-nextauth-secret-key-here-minimum-32-characters/$NEXTAUTH_SECRET/" .env.local
    echo "✅ NextAuth secret generated"
fi

# Set up database
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push
echo "✅ Database initialized"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run build to ensure everything works
echo "🏗️ Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete! Next steps:"
    echo "1. Configure your API keys in .env.local:"
    echo "   - OPENAI_API_KEY for AI features"
    echo "   - ALPACA_API_KEY & ALPACA_SECRET_KEY for trading"
    echo "   - POLYGON_API_KEY for market data"
    echo ""
    echo "2. Start the development server:"
    echo "   npm run dev"
    echo ""
    echo "3. Access your platform at:"
    echo "   http://localhost:3000"
    echo ""
    echo "4. For production deployment:"
    echo "   ./deploy-to-netlify.sh"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
