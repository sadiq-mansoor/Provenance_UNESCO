# 🚀 Quick Deploy Guide - Make Your App Live in 5 Minutes!

## For Windows Users

### Option 1: Vercel (Easiest - Recommended)

1. **Install Vercel CLI**
   ```cmd
   npm install -g vercel
   ```

2. **Deploy**
   ```cmd
   cd frontend
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? → **No**
   - Project name → **media-literacy-app**
   - Directory → **./** (current directory)
   - Override settings? → **No**

4. **Your app is live!** 🎉
   - URL will be: `https://your-app.vercel.app`

### Option 2: Netlify (Drag & Drop)

1. **Build your app**
   ```cmd
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag the `build` folder to the deploy area
   - Your app is live! 🎉

### Option 3: GitHub Pages

1. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **Deploy**
   ```cmd
   npm install --save-dev gh-pages
   npm run deploy
   ```

## 🔧 Setup API Keys (Important!)

After deployment, you need to add your API keys:

### For Vercel:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to Settings → Environment Variables
4. Add each API key:
   ```
   REACT_APP_TINEYE_USERNAME=your_username
   REACT_APP_TINEYE_PASSWORD=your_password
   REACT_APP_WHOIS_API_KEY=your_key
   REACT_APP_GOOGLE_API_KEY=your_key
   REACT_APP_TWITTER_BEARER_TOKEN=your_token
   REACT_APP_GPTZERO_API_KEY=your_key
   ```

### For Netlify:
1. Go to your site dashboard
2. Site settings → Environment variables
3. Add the same variables as above

## 🎯 One-Command Deployment

Create a `deploy.bat` file in your project root:

```batch
@echo off
echo 🚀 Deploying Media Literacy App...
cd frontend
npm install
npm run build
echo ✅ Build complete!
echo 🌐 Deploying to Vercel...
vercel --prod
echo 🎉 Deployment complete!
pause
```

Then just double-click `deploy.bat` to deploy!

## 📱 Test Your Live App

After deployment, test these features:
- ✅ Reverse Image Search
- ✅ URL Scanner  
- ✅ Source Checker
- ✅ Claim Tracker
- ✅ AI Content Detector
- ✅ Digital Forensics

## 🔗 Your Live URLs

Your app will be available at:
- **Vercel**: `https://your-app-name.vercel.app`
- **Netlify**: `https://your-app-name.netlify.app`
- **GitHub Pages**: `https://yourusername.github.io/your-repo-name`

## 🆘 Need Help?

### Common Issues:
1. **Build fails** → Check for missing dependencies
2. **API keys not working** → Verify environment variables
3. **CORS errors** → Check API configuration
4. **Slow loading** → Optimize images and code

### Quick Fixes:
```cmd
# Clear cache and reinstall
rmdir /s node_modules
del package-lock.json
npm install

# Rebuild
npm run build

# Redeploy
vercel --prod
```

## 🎉 You're Live!

Your Media Literacy app is now accessible to users worldwide! 

**Next steps:**
- Share your app URL with users
- Monitor performance
- Add new features
- Keep API keys updated

**Remember:** The free tiers have limits, so monitor your usage!
