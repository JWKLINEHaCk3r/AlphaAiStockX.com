# 🚀 AlphaAI StockX - Advanced AI Trading Platform

A comprehensive AI-powered stock trading platform built with Next.js, React, and TypeScript.

## ✨ Features

- 🤖 **AI Trading Bot** - Automated trading with machine learning algorithms
- 📊 **Portfolio Management** - Track and manage your investments
- 📈 **Market Analysis** - Real-time market data and technical analysis
- 🔔 **Trading Signals** - AI-generated buy/sell recommendations
- 👤 **User Authentication** - Secure login and user management
- 🛡️ **Admin Panel** - Comprehensive administration interface
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🌐 **Production Ready** - Optimized for deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom UI Components
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL
- **Deployment**: Docker, Netlify, Vercel
- **AI/ML**: OpenAI API, Alpha Vantage API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com.git
   cd AlphaAiStockX.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t alphaai-stockx .
docker run -p 3000:3000 alphaai-stockx
```

### Netlify Deployment
```bash
npm run build
# Deploy the 'out' directory to Netlify
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run ai:power-up` - Fix all imports and components

## 📂 Project Structure

```
AlphaAiStockX.com/
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── ui/               # UI components
│   └── admin/            # Admin components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── __tests__/            # Test files
├── netlify/              # Netlify functions
└── docs/                 # Documentation
```

## 🔑 Environment Variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/alphaai
OPENAI_API_KEY=your-openai-key
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@alphaaistockx.com or join our Slack channel.

## 🔗 Links

- **Live Demo**: [https://alphaaistockx.netlify.app](https://alphaaistockx.netlify.app)
- **Documentation**: [https://docs.alphaaistockx.com](https://docs.alphaaistockx.com)
- **API Reference**: [https://api.alphaaistockx.com](https://api.alphaaistockx.com)

---

Made with ❤️ by the AlphaAI StockX Team
