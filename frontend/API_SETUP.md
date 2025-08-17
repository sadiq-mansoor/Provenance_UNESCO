# API Setup Guide for Real Detection Tools

This guide will help you set up all the required API keys for the real detection functionality.

## Required API Keys

### 1. Reverse Image Search
- **TinEye API**: Sign up at https://tineye.com/api/ for reverse image search
- **Alternative**: Google Lens (free, opens in new tab)

### 2. URL Scanner
- **WHOIS API**: Get API key from https://whois.whoisxmlapi.com/
- **Google Safe Browsing**: Get API key from https://console.cloud.google.com/
- **VirusTotal**: Get API key from https://www.virustotal.com/gui/join-us
- **SSL Labs**: Free API, no key required

### 3. Source Checker
- **Media Bias Fact Check**: Contact for API access
- **AllSides**: Contact for API access
- **FactCheck.org**: Public API available
- **Snopes**: Public API available

### 4. Claim Tracker
- **Twitter API**: Apply at https://developer.twitter.com/
- **Facebook Graph API**: Apply at https://developers.facebook.com/
- **Reddit API**: Free, no key required
- **Google Trends**: Free, no key required

### 5. AI Content Detection
- **GPTZero**: Get API key from https://gptzero.me/
- **Originality.ai**: Get API key from https://originality.ai/
- **Copyleaks**: Get API key from https://api.copyleaks.com/

### 6. Digital Forensics
- **FotoForensics**: Contact for API access
- **Forensically**: Free API available
- **ImageForensics**: Contact for API access

## Environment Variables Setup

Create a `.env` file in the frontend directory with the following variables:

```env
# Reverse Image Search APIs
REACT_APP_TINEYE_USERNAME=your_tineye_username
REACT_APP_TINEYE_PASSWORD=your_tineye_password

# URL Scanner APIs
REACT_APP_WHOIS_API_KEY=your_whois_api_key
REACT_APP_GOOGLE_API_KEY=your_google_api_key
REACT_APP_VIRUSTOTAL_API_KEY=your_virustotal_api_key

# Source Checker APIs
REACT_APP_MEDIA_BIAS_API_KEY=your_media_bias_api_key
REACT_APP_ALLSIDES_API_KEY=your_allsides_api_key

# Claim Tracker APIs
REACT_APP_TWITTER_BEARER_TOKEN=your_twitter_bearer_token
REACT_APP_FACEBOOK_ACCESS_TOKEN=your_facebook_access_token

# AI Content Detection APIs
REACT_APP_GPTZERO_API_KEY=your_gptzero_api_key
REACT_APP_ORIGINALITY_API_KEY=your_originality_api_key
REACT_APP_COPYLEAKS_API_KEY=your_copyleaks_api_key

# Digital Forensics APIs
REACT_APP_FOTOFORENSICS_API_KEY=your_fotoforensics_api_key
REACT_APP_IMAGEFORENSICS_API_KEY=your_imageforensics_api_key
```

## Free Alternatives

If you don't want to pay for API keys, the following tools will work with free alternatives:

1. **Reverse Image Search**: Opens Google Lens in new tab
2. **URL Scanner**: Uses free SSL Labs API and basic domain checks
3. **Source Checker**: Uses public fact-checking databases
4. **Claim Tracker**: Uses Reddit API and Google Trends (both free)
5. **AI Content Detection**: Limited to basic text analysis
6. **Digital Forensics**: Basic metadata analysis only

## Setup Instructions

1. Copy the `.env` variables above
2. Replace `your_*` values with actual API keys
3. Restart your development server
4. Test each tool to ensure API keys are working

## Troubleshooting

- If an API call fails, the tool will show an error message
- Check browser console for detailed error information
- Ensure API keys have proper permissions and quotas
- Some APIs require approval processes (Twitter, Facebook)

## Cost Considerations

- Most APIs offer free tiers with limited requests
- Premium APIs can cost $10-100/month depending on usage
- Consider using free alternatives for development/testing
