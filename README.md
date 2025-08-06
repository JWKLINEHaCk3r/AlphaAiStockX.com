# AlphaAI StockX - Advanced Trading Platform

![AlphaAI StockX](https://img.shields.io/badge/Next.js-15.4.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)
![Railway](https://img.shields.io/badge/Railway-Deploy-success)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00ad9f)

A comprehensive AI-powered stock trading platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time Portfolio Management** - Track your investments with live updates
- **AI Trading Assistant** - Automated trading suggestions and execution
- **Advanced Analytics** - Comprehensive market analysis and insights
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern UI Components** - Built with Radix UI and Tailwind CSS

## 🏗️ Tech Stack

- **Framework**: Next.js 15.4.4 (App Router)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.0
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Deployment**: Railway, Netlify, GitHub Actions

## 🌐 Live Deployments

- **Railway**: [https://alphaai-stockx-production.up.railway.app](https://alphaai-stockx-production.up.railway.app)
- **Netlify**: [https://alphaai-stockx.netlify.app](https://alphaai-stockx.netlify.app)

## 🛠️ Installation & Development

```bash
# Clone the repository
git clone https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com.git
cd AlphaAiStockX.com/__tests__/components/AlphaAiStockX4

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm run start
```

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy
npm run deploy:railway
```

### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run deploy:netlify
```

## 🔧 Environment Variables

Create `.env.local` for development:

```env
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1

# API Keys (optional for demo)
ALPHA_VANTAGE_API_KEY=your-api-key
FINNHUB_API_KEY=your-api-key
POLYGON_API_KEY=your-api-key
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── portfolio/         # Portfolio management
│   ├── ai-trading/        # AI trading features
│   └── analytics/         # Market analytics
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   ├── navigation/       # Navigation components
│   └── trading/          # Trading-specific components
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🚀 Deployment Status

### Railway Configuration
- **Build Command**: Automatic detection
- **Start Command**: `npm start`
- **Environment**: Production
- **Health Check**: `/` endpoint
- **Auto-deploy**: Enabled on main branch

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Functions**: Edge Functions enabled
- **Redirects**: SPA redirect configured

### GitHub Actions
- **CI/CD**: Automated testing and deployment
- **Matrix Build**: Node.js 18.x and 20.x
- **Type Checking**: TypeScript validation
- **Linting**: ESLint validation
- **Auto Deploy**: On main branch push

## 📊 Performance

- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com](https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com)
- **Documentation**: [https://docs.alphaai-stockx.com](https://docs.alphaai-stockx.com)
- **Support**: [support@alphaai-stockx.com](mailto:support@alphaai-stockx.com)

---

Built with ❤️ by the AlphaAI Team
