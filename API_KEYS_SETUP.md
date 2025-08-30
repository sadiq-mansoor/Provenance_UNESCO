# 🔑 API Keys Setup Guide

This guide helps you configure real API keys for authentic data sources in your Provenance platform.

## 🎯 Overview

Your platform now integrates with real services instead of using mock data:

- **AI Detection**: Hugging Face models for real AI content detection
- **Fact-Checking**: Google Fact Check Tools API + pattern recognition
- **Media Sources**: NewsAPI for authentic news content
- **Image Analysis**: Advanced computer vision and metadata analysis

## 📋 Required API Keys

### 1. Google Fact Check Tools API (Recommended)

**Purpose**: Real-time fact-checking against Google's database

**Setup**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Fact Check Tools API"
4. Create credentials (API Key)
5. Add to `.env`: `GOOGLE_FACTCHECK_API_KEY=your_key_here`

**Cost**: Free tier available (1000 requests/day)

### 2. NewsAPI (Recommended)

**Purpose**: Authentic news content for training scenarios

**Setup**:
1. Go to [NewsAPI.org](https://newsapi.org/)
2. Sign up for free account
3. Get your API key from dashboard
4. Add to `.env`: `NEWS_API_KEY=your_key_here`

**Cost**: Free tier (1000 requests/day), paid plans available

## 🔧 Optional API Keys

### 3. OpenAI API (Optional)

**Purpose**: Enhanced AI detection and content analysis

**Setup**:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account and add payment method
3. Generate API key
4. Add to `.env`: `OPENAI_API_KEY=your_key_here`

**Cost**: Pay-per-use (GPT-4 Vision for image analysis)

### 4. Hugging Face API (Optional)

**Purpose**: Access to additional AI models

**Setup**:
1. Go to [Hugging Face](https://huggingface.co/)
2. Create account
3. Go to Settings > Access Tokens
4. Create new token
5. Add to `.env`: `HUGGINGFACE_API_KEY=your_key_here`

**Cost**: Free tier available, paid for premium models

### 5. TinEye API (Optional)

**Purpose**: Reverse image search for authenticity verification

**Setup**:
1. Go to [TinEye API](https://tineye.com/business/developer)
2. Sign up for developer account
3. Get API key and private key
4. Add to `.env`: 
   ```
   TINEYE_API_KEY=your_key_here
   TINEYE_PRIVATE_KEY=your_private_key_here
   ```

**Cost**: Paid service, various plans available

## ⚙️ Configuration Steps

### Step 1: Copy Environment File

```bash
# The setup script does this automatically, but you can also do it manually:
cp backend/.env.example backend/.env
```

### Step 2: Edit the .env File

Open `backend/.env` and add your API keys:

```env
# Real API Configuration for Provenance Platform

# Google Fact Check Tools API (Recommended)
GOOGLE_FACTCHECK_API_KEY=your_google_factcheck_api_key_here

# News API for authentic media samples (Recommended)
NEWS_API_KEY=your_news_api_key_here

# OpenAI API for advanced AI detection (Optional)
OPENAI_API_KEY=your_openai_api_key_here

# Hugging Face API for AI models (Optional)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# TinEye API for reverse image search (Optional)
TINEYE_API_KEY=your_tineye_api_key_here
TINEYE_PRIVATE_KEY=your_tineye_private_key_here

# Enable real sample downloads (Optional)
DOWNLOAD_REAL_SAMPLES=true
```

### Step 3: Test Configuration

Run the setup to verify your configuration:

```bash
python setup_real_data.py
```

## 🚀 What Works Without API Keys

Even without API keys, your platform still provides real functionality:

### ✅ Always Available:
- **AI Detection**: Hugging Face models (downloaded locally)
- **Technical Analysis**: Computer vision algorithms
- **Metadata Analysis**: EXIF and image data examination
- **Pattern Recognition**: Built-in misinformation patterns
- **Training Scenarios**: Pre-configured authentic vs AI samples

### 🔑 Enhanced with API Keys:
- **Real-time Fact-Checking**: Live verification against databases
- **Current News Content**: Fresh authentic media samples
- **Advanced AI Models**: Latest detection algorithms
- **Reverse Image Search**: Find original sources
- **Trending Topics**: Current misinformation monitoring

## 📊 API Usage and Limits

| Service | Free Tier | Rate Limits | Best For |
|---------|-----------|-------------|----------|
| Google Fact Check | 1000 req/day | 100 req/100sec | Fact verification |
| NewsAPI | 1000 req/day | 1000 req/day | Authentic samples |
| OpenAI | $5 credit | Pay-per-use | Advanced analysis |
| Hugging Face | Free models | Model dependent | AI detection |
| TinEye | Paid only | Plan dependent | Image verification |

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate keys regularly** for production use
4. **Monitor usage** to detect unauthorized access
5. **Use least privilege** - only enable needed permissions

## 🛠️ Troubleshooting

### Common Issues:

**"API key not configured"**
- Check that your `.env` file exists in the `backend/` directory
- Verify the key name matches exactly (case-sensitive)
- Ensure no extra spaces around the `=` sign

**"Rate limit exceeded"**
- You've hit the daily/hourly limit for that API
- Wait for the limit to reset or upgrade your plan
- The platform will fall back to offline methods

**"Invalid API key"**
- Double-check you copied the key correctly
- Verify the key is active in the provider's dashboard
- Some keys need to be activated after creation

**"Model download failed"**
- Check your internet connection
- Hugging Face models are large (1-5GB)
- The platform will use fallback detection methods

## 📞 Support

If you need help with API setup:

1. **Check the setup report**: `setup_report.json` shows what's working
2. **Review logs**: Look for specific error messages
3. **Test individual components**: Each service can be tested separately
4. **Use fallback modes**: The platform works without all APIs

## 🎯 Recommended Setup for Different Use Cases

### 🎓 **Educational/Demo**
- **Required**: None (works with built-in models)
- **Recommended**: NewsAPI for fresh content

### 🏢 **Professional/Research**
- **Required**: Google Fact Check API, NewsAPI
- **Recommended**: OpenAI API, Hugging Face API

### 🏭 **Production/Enterprise**
- **Required**: All APIs
- **Recommended**: Premium plans for higher limits

---

🌟 **Ready to go?** Run `python setup_real_environment.py` to get started!