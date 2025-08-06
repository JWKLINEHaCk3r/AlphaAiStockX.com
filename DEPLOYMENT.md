# 🚀 AlphaAI StockX - Manual Deployment Guide

## Prerequisites

Ensure you have the following installed:
- Node.js 18+ 
- npm or pnpm
- Git

## 1. GitHub Deployment

```bash
# Navigate to project directory
cd /Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4

# Create GitHub repository (if not exists)
# Go to GitHub and create new repository: AlphaAiStockX.com

# Add remote and push
git remote add origin https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com.git
git branch -M main
git push -u origin main
```

## 2. Railway Deployment

### Option A: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project (or connect existing)
railway link

# Deploy
railway deploy
```

### Option B: Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select the AlphaAiStockX.com repository
6. Configure environment variables:
   - `NODE_ENV=production`
   - `NEXT_TELEMETRY_DISABLED=1`
   - `NPM_CONFIG_LEGACY_PEER_DEPS=true`

## 3. Netlify Deployment

### Option A: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option B: Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select the AlphaAiStockX.com repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Configure environment variables:
   - `NODE_ENV=production`
   - `NEXT_TELEMETRY_DISABLED=1`

## 4. Environment Variables

### Railway Environment Variables
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NPM_CONFIG_LEGACY_PEER_DEPS=true
PNPM_CONFIG_AUTO_INSTALL_PEERS=true
PNPM_CONFIG_STRICT_PEER_DEPENDENCIES=false
```

### Netlify Environment Variables
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NPM_CONFIG_LEGACY_PEER_DEPS=true
```

## 5. Post-Deployment

### Verify Deployments
1. **GitHub**: Repository should be live at https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com
2. **Railway**: Get deployment URL from Railway dashboard
3. **Netlify**: Get deployment URL from Netlify dashboard

### Configure Custom Domains (Optional)
- Railway: Add custom domain in project settings
- Netlify: Add custom domain in site settings

### Set up Monitoring
- Enable GitHub Actions for CI/CD
- Set up error tracking (Sentry, LogRocket)
- Configure analytics (Google Analytics, Vercel Analytics)

## 6. Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check TypeScript compilation errors

**Environment Variables:**
- Ensure all required env vars are set
- Check for typos in variable names
- Verify secrets are properly configured

**Git Issues:**
- Check remote repository URL
- Verify GitHub permissions
- Ensure main branch is default

### Support Commands

```bash
# Check build locally
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Check Git status
git status

# Check remotes
git remote -v
```

## 7. Success Confirmation

After successful deployment, verify:

✅ GitHub repository is live and updated
✅ Railway app is deployed and accessible
✅ Netlify site is deployed and accessible
✅ All pages load correctly
✅ No console errors
✅ Mobile responsiveness works
✅ SEO meta tags are present

## 8. Next Steps

1. Configure API keys for real data
2. Set up database (if needed)
3. Configure authentication
4. Set up monitoring and analytics
5. Add custom domain
6. Enable HTTPS
7. Configure CDN

---

**Deployment URLs:**
- GitHub: https://github.com/JWKLINEHaCk3r/AlphaAiStockX.com
- Railway: [Your Railway URL]
- Netlify: [Your Netlify URL]
