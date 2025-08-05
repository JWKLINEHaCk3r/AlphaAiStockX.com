# 🚀 AlphaAI StockX Deployment Guide

This guide covers deploying the AlphaAI StockX trading platform to multiple cloud platforms.

## 🌟 Supported Platforms

- **Netlify** - Static/Serverless deployment with CDN
- **Railway** - Full-stack deployment with database support
- **Docker** - Containerized deployment for any platform

## 🚀 Quick Deploy

### Deploy to Both Platforms
```bash
pnpm run deploy
```

### Deploy to Specific Platform
```bash
# Netlify only
pnpm run deploy:netlify

# Railway only
pnpm run deploy:railway

# Docker build
pnpm run deploy:docker
```

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Required Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret key
- `OPENAI_API_KEY` - For AI trading features
- `ALPHA_VANTAGE_API_KEY` - Stock market data
- `FINNHUB_API_KEY` - Financial data API

### 2. Database Setup
The application requires PostgreSQL. For Railway, a database will be automatically provisioned.

### 3. Build Verification
Test local build before deployment:
```bash
pnpm install
pnpm build
pnpm start
```

## 🌐 Netlify Deployment

### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm install && pnpm build`
3. Set publish directory: `.next`
4. Configure environment variables in Netlify dashboard

### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

### Netlify Configuration
The `netlify.toml` file includes:
- Next.js plugin for optimized builds
- Redirect rules for SPA routing
- Environment-specific settings

## 🚂 Railway Deployment

### Automatic Deployment
1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Next.js app
3. Configure environment variables in Railway dashboard
4. Deploy with zero configuration

### Manual Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway link

# Deploy
railway up
```

### Railway Configuration
The `railway.json` file includes:
- Nixpacks builder configuration
- Health check endpoints
- Production environment settings

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t alphaaistockx .
```

### Run Container
```bash
docker run -p 3000:3000 alphaaistockx
```

### Docker Compose (Optional)
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://...
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=alphaaistockx
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## ⚙️ Configuration Files

### netlify.toml
- Build settings and plugins
- Redirect rules
- Environment-specific configurations

### railway.json
- Build and deployment settings
- Health check configuration
- Environment variables

### Dockerfile
- Multi-stage build optimization
- Production-ready Node.js setup
- Security best practices

## 🔧 Environment Variables

### Production URLs
Update these based on your deployment:
```
NEXTAUTH_URL=https://your-app.netlify.app
# or
NEXTAUTH_URL=https://your-app.railway.app
```

### Database
- **Netlify**: Use external PostgreSQL (PlanetScale, Supabase, etc.)
- **Railway**: Provision PostgreSQL add-on
- **Docker**: Use Docker Compose with PostgreSQL

## 📊 Monitoring & Performance

### Health Checks
The app includes health check endpoints:
- `/api/health` - Basic health status
- `/api/health/db` - Database connectivity

### Performance Monitoring
Consider adding:
- Vercel Analytics
- Sentry for error tracking
- LogRocket for user sessions

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to git
2. **CORS**: Configure allowed origins
3. **Rate Limiting**: Implement API rate limits
4. **Authentication**: Use secure session management
5. **HTTPS**: Always use SSL in production

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check TypeScript errors

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check network connectivity
   - Ensure database exists

3. **Environment Variables**
   - Verify all required variables are set
   - Check variable names (case sensitive)
   - Escape special characters

### Getting Help
- Check deployment logs in platform dashboard
- Verify environment variables are set correctly
- Test local build before deploying

## 🎯 Production Optimization

1. **Caching**: Configure Redis for session storage
2. **CDN**: Use platform CDN for static assets
3. **Database**: Set up connection pooling
4. **Monitoring**: Add performance monitoring
5. **Backups**: Implement database backups

---

**Happy Deploying! 🚀**

Your AlphaAI StockX platform will be live and ready to revolutionize AI-powered trading!
