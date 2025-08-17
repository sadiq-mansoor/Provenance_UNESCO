# Deployment Guide - Making Your Media Literacy App Live

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: media-literacy-app
# - Directory: frontend
# - Override settings? No
```

### Option 2: Netlify
```bash
# Build the project
cd frontend
npm run build

# Deploy to Netlify
# 1. Go to netlify.com
# 2. Drag and drop the 'build' folder
# 3. Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Option 3: GitHub Pages
```bash
# Add to package.json in frontend folder:
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## 🔧 Production Setup

### 1. Environment Variables
Create production environment variables:

```env
# Production API Keys (get these from the services)
REACT_APP_TINEYE_USERNAME=your_production_tineye_username
REACT_APP_TINEYE_PASSWORD=your_production_tineye_password
REACT_APP_WHOIS_API_KEY=your_production_whois_key
REACT_APP_GOOGLE_API_KEY=your_production_google_key
REACT_APP_TWITTER_BEARER_TOKEN=your_production_twitter_token
REACT_APP_GPTZERO_API_KEY=your_production_gptzero_key
# ... add all other API keys
```

### 2. Build Optimization
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test build locally
npm install -g serve
serve -s build -l 3000
```

### 3. Domain Setup
- **Custom Domain**: Point your domain to the deployment platform
- **SSL Certificate**: Most platforms provide free SSL
- **CDN**: Enable for faster global access

## 🌐 Deployment Platforms Comparison

| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Vercel** | Free, Fast, Easy | Limited free tier | Small to medium apps |
| **Netlify** | Free, Great features | Build time limits | Static sites |
| **Heroku** | Full-stack support | Paid after free tier | Full applications |
| **AWS** | Scalable, Powerful | Complex setup | Large applications |
| **Google Cloud** | Reliable, Fast | Complex pricing | Enterprise apps |

## 📱 Mobile App Deployment

### React Native (if you want mobile app)
```bash
# Install React Native
npx react-native init MediaLiteracyApp

# Build for iOS
cd ios && pod install
npx react-native run-ios

# Build for Android
npx react-native run-android

# Deploy to App Store/Play Store
# Follow platform-specific guidelines
```

## 🔒 Security Considerations

### 1. API Key Security
```javascript
// Never expose API keys in client-side code
// Use environment variables
const apiKey = process.env.REACT_APP_API_KEY;

// Or use a backend proxy
const response = await fetch('/api/verify-url', {
  method: 'POST',
  body: JSON.stringify({ url: urlToScan })
});
```

### 2. CORS Configuration
```javascript
// Backend CORS setup (if using backend)
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

### 3. Rate Limiting
```javascript
// Implement rate limiting for API calls
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📊 Monitoring & Analytics

### 1. Google Analytics
```html
<!-- Add to public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking
```bash
# Install Sentry
npm install @sentry/react @sentry/tracing

# Initialize in index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🚀 Step-by-Step Live Deployment

### Step 1: Prepare Your Code
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

### Step 2: Choose Platform & Deploy
```bash
# For Vercel (easiest)
vercel --prod

# For Netlify
netlify deploy --prod

# For Heroku
heroku create your-app-name
git push heroku main
```

### Step 3: Configure Environment Variables
- Go to your deployment platform dashboard
- Add all environment variables
- Redeploy if needed

### Step 4: Test Everything
- Test all verification tools
- Check API integrations
- Verify mobile responsiveness
- Test error handling

### Step 5: Go Live!
- Your app is now live at your deployment URL
- Share with users
- Monitor performance

## 🔄 Continuous Deployment

### GitHub Actions (Automatic Deployment)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Post-Deployment Checklist

- [ ] All API keys are working
- [ ] SSL certificate is active
- [ ] Mobile responsiveness tested
- [ ] Error tracking is working
- [ ] Analytics are collecting data
- [ ] Performance is acceptable
- [ ] Security headers are set
- [ ] Backup strategy is in place

## 🆘 Troubleshooting

### Common Issues:
1. **API Keys Not Working**: Check environment variables
2. **Build Failures**: Check for missing dependencies
3. **CORS Errors**: Configure allowed origins
4. **Slow Loading**: Optimize images and code splitting

### Support:
- Check platform documentation
- Use platform-specific forums
- Monitor error logs
- Test in different browsers/devices

## 🎉 Your App is Live!

Once deployed, your Media Literacy app will be accessible to users worldwide. Remember to:

- Monitor usage and performance
- Update API keys when needed
- Add new features based on user feedback
- Keep dependencies updated
- Backup your data regularly

**Your app URL will be something like:**
- Vercel: `https://your-app.vercel.app`
- Netlify: `https://your-app.netlify.app`
- Heroku: `https://your-app.herokuapp.com`
