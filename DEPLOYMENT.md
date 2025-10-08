# Deployment Guide

This guide will walk you through deploying the DID Management Platform to various hosting providers.

## Prerequisites

Before deploying, ensure you have:
- A GitHub repository with your code
- Node.js 18+ installed locally
- A backend API server accessible from your hosting provider

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment experience for Vite + React applications.

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Vercel will auto-detect Vite configuration
5. Configure environment variables if needed (see below)
6. Click "Deploy"

#### Step 3: Configure API Proxy (if needed)
If your API is on a different domain, add a `vercel.json` file:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-api-domain.com/api/:path*"
    }
  ]
}
```

### Option 2: Netlify

#### Step 1: Push to GitHub (same as above)

#### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### Step 3: Configure Redirects
Create a `netlify.toml` file:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-api-domain.com/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

#### Step 1: Update vite.config.ts
```typescript
export default defineConfig({
  base: '/DID/', // Replace with your repo name
  plugins: [react()],
  // ... rest of config
})
```

#### Step 2: Deploy Script
Add to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (Apache/Nginx)

#### Step 1: Build
```bash
npm run build
```

#### Step 2: Upload
Upload the contents of the `dist` folder to your web server.

#### Step 3: Configure Server
For Nginx, add to your config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}

location /api {
  proxy_pass http://your-api-server:port;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

For Apache, create `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

If your API requires authentication or specific configuration, create environment variables:

### Development (.env.local)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=your_api_key
```

### Production (Set in hosting provider dashboard)
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_KEY=your_production_api_key
```

Update `src/lib/api.ts` to use these variables:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    ...(import.meta.env.VITE_API_KEY && {
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
    })
  },
});
```

## Post-Deployment Checklist

- [ ] Test number search functionality
- [ ] Verify number purchase flow
- [ ] Test configuration modal
- [ ] Check owned numbers dashboard
- [ ] Test responsive design on mobile
- [ ] Verify API connectivity
- [ ] Check error handling and toast notifications
- [ ] Test all form validations
- [ ] Verify search filters work correctly
- [ ] Test number release functionality

## Monitoring and Analytics

Consider adding:
- Google Analytics
- Sentry for error tracking
- LogRocket for session replay

## Continuous Deployment

For automatic deployments on push:

### Vercel
- Automatically enabled when connected to GitHub
- Pushes to main branch automatically deploy to production
- Pull requests create preview deployments

### Netlify
- Same as Vercel - automatic on GitHub push
- Configure in Netlify dashboard under "Build & deploy"

### GitHub Actions (for custom deployment)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        # Add your deployment step here
```

## Troubleshooting

### Issue: API calls fail with CORS errors
**Solution**: Configure CORS on your backend API or use a proxy in your hosting provider's configuration.

### Issue: Routing doesn't work (404 on refresh)
**Solution**: Configure your hosting provider to redirect all routes to index.html (see server configuration above).

### Issue: Build fails
**Solution**: 
1. Check Node.js version (should be 18+)
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run build`

### Issue: Environment variables not working
**Solution**: 
1. Ensure variables are prefixed with `VITE_`
2. Rebuild after changing environment variables
3. Check hosting provider's environment variable configuration

## Support

For deployment issues, please check:
1. Hosting provider documentation
2. Project GitHub issues
3. [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)

