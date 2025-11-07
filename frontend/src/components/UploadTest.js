import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Shield, CheckCircle, Brain, Upload, FileImage, FileVideo, FileAudio,
  AlertTriangle, AlertCircle, Eye, Microscope, Clock, Camera, Link, Globe,
  Zap, Link2, FileText, Award, Info, MapPin, Calendar,
  ExternalLink, ChevronDown, ChevronUp, Cpu, TrendingUp,
  Activity, Layers, Database, Network, Gauge
} from 'lucide-react';

const FactCheckLab = () => {
  const [activeTab, setActiveTab] = useState('ai-provenance');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [modelLoadProgress, setModelLoadProgress] = useState(0);
  
  // Tool states
  const [activeTool, setActiveTool] = useState(null);
  const [toolResults, setToolResults] = useState({});
  const [isToolLoading, setIsToolLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [urlToScan, setUrlToScan] = useState('');
  const [sourceToCheck, setSourceToCheck] = useState('');
  const [claimToTrack, setClaimToTrack] = useState('');
  const [contentToAnalyze, setContentToAnalyze] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  
  // Track model loading progress
  useEffect(() => {
    if (isLoadingModels) {
      const interval = setInterval(() => {
        setModelLoadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoadingModels(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [isLoadingModels]);
  
  // Enhanced search functionality with real-time results
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Simulate search results for AI provenance
    const mockResults = [
      {
        id: 1,
        title: `AI Analysis Results for "${query}"`,
        source: 'AI Provenance Lab',
        confidence: 0.94,
        summary: 'Content shows signs of AI generation with 94% confidence.',
        details: {
          model: 'Stable Diffusion v2.1',
          generationDate: '2024-01-15',
          manipulationType: 'AI Generated'
        }
      },
      {
        id: 2,
        title: `Related Analysis: "${query}"`,
        source: 'Digital Forensics Hub',
        confidence: 0.87,
        summary: 'Similar patterns detected in known AI-generated content.',
        details: {
          model: 'Midjourney v5',
          generationDate: '2024-01-10',
          manipulationType: 'Style Transfer'
        }
      }
    ];
    
    setSearchResults(mockResults);
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  // Tool functions
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setActiveTool('reverse-image-search');
      setIsToolLoading(true);
      
      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('image', file);
        
        // Use Google Lens API or TinEye API for reverse image search
        const response = await fetch('https://api.tineye.com/rest/search/', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('your_tineye_username:your_tineye_password'),
            'Content-Type': 'multipart/form-data'
          },
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          setToolResults(prev => ({
            ...prev,
            'reverse-image-search': {
              found: data.results && data.results.length > 0,
              matches: data.results?.map(result => ({
                url: result.image_url,
                similarity: result.score / 100,
                date: result.date,
                title: result.title
              })) || [],
              analysis: data.results?.length > 0 
                ? `Found ${data.results.length} similar images online` 
                : 'No similar images found'
            }
          }));
        } else {
          // Fallback to Google Lens search
          const googleLensUrl = `https://lens.google.com/upload?ep=ccm&s=4&im=`;
          window.open(googleLensUrl, '_blank');
          setToolResults(prev => ({
            ...prev,
            'reverse-image-search': {
              found: true,
              matches: [],
              analysis: 'Opened Google Lens for manual reverse image search'
            }
          }));
        }
      } catch (error) {
        console.error('Reverse image search failed:', error);
        setToolResults(prev => ({
          ...prev,
          'reverse-image-search': {
            found: false,
            matches: [],
            analysis: 'Error performing reverse image search. Please try Google Lens manually.'
          }
        }));
      } finally {
        setIsToolLoading(false);
      }
    }
  };

  const handleUrlScan = async () => {
    if (!urlToScan) return;
    setIsToolLoading(true);
    setActiveTool('url-scanner');
    
    try {
      const url = new URL(urlToScan);
      
      // Basic URL validation
      if (!url.protocol || !url.hostname) {
        throw new Error('Invalid URL format');
      }
      
      // 1. Check SSL certificate (free API)
      let sslData = null;
      try {
        const sslResponse = await fetch(`https://api.ssllabs.com/api/v3/analyze?host=${url.hostname}&all=done`);
        if (sslResponse.ok) {
          sslData = await sslResponse.json();
        }
      } catch (sslError) {
        console.warn('SSL Labs API failed:', sslError);
      }
      
      // 2. Basic domain analysis (no API key required)
      const domainInfo = {
        hostname: url.hostname,
        protocol: url.protocol,
        path: url.pathname,
        hasSSL: url.protocol === 'https:',
        isLocalhost: url.hostname === 'localhost' || url.hostname === '127.0.0.1',
        isIP: /^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)
      };
      
      // 3. Check for suspicious patterns
      const suspiciousPatterns = [
        /bit\.ly|tinyurl|goo\.gl|t\.co/i, // URL shorteners
        /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, // IP addresses
        /[a-zA-Z0-9]{20,}/, // Very long random strings
        /[^a-zA-Z0-9.-]/ // Special characters in domain
      ];
      
      const suspiciousScore = suspiciousPatterns.reduce((score, pattern) => {
        return score + (pattern.test(urlToScan) ? 1 : 0);
      }, 0);
      
      // 4. Try to fetch basic info about the domain
      let domainAge = 'Unknown';
      let safety = 'unknown';
      
      try {
        // Use a free WHOIS service
        const whoisResponse = await fetch(`https://whois.whoisxmlapi.com/api/v1?domainName=${url.hostname}`);
        if (whoisResponse.ok) {
          const whoisData = await whoisResponse.json();
          if (whoisData.creationDate) {
            domainAge = Math.floor((Date.now() - new Date(whoisData.creationDate).getTime()) / (1000 * 60 * 60 * 24 * 365));
          }
        }
      } catch (whoisError) {
        console.warn('WHOIS lookup failed:', whoisError);
      }
      
      // Determine safety based on available data
      if (domainInfo.isLocalhost || domainInfo.isIP) {
        safety = 'suspicious';
      } else if (suspiciousScore > 1) {
        safety = 'suspicious';
      } else if (sslData?.endpoints?.[0]?.grade === 'A') {
        safety = 'safe';
      } else if (domainInfo.hasSSL) {
        safety = 'safe';
      }
      
      setToolResults(prev => ({
        ...prev,
        'url-scanner': {
          credibility: sslData?.endpoints?.[0]?.grade === 'A' ? 'high' : 'low',
          safety: safety,
          domainAge: domainAge,
          sslValid: sslData?.endpoints?.[0]?.grade !== 'F' && domainInfo.hasSSL,
          analysis: `Domain analysis complete. SSL Grade: ${sslData?.endpoints?.[0]?.grade || 'Unknown'}, Safety: ${safety}, Suspicious patterns: ${suspiciousScore}`,
          details: {
            sslGrade: sslData?.endpoints?.[0]?.grade || 'Unknown',
            suspiciousPatterns: suspiciousScore,
            domainInfo: domainInfo,
            recommendations: suspiciousScore > 1 ? 'Exercise caution - multiple suspicious patterns detected' : 'Domain appears safe'
          }
        }
      }));
    } catch (error) {
      console.error('URL scanning failed:', error);
      setToolResults(prev => ({
        ...prev,
        'url-scanner': {
          credibility: 'unknown',
          safety: 'unknown',
          domainAge: 'unknown',
          sslValid: false,
          analysis: 'Error scanning URL. Please check the URL format and try again.'
        }
      }));
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleSourceCheck = async () => {
    if (!sourceToCheck) return;
    setIsToolLoading(true);
    setActiveTool('source-checker');
    
    try {
      // Use Media Bias Fact Check API and other fact-checking databases
      const mediaBiasResponse = await fetch(`https://media-bias-fact-check-api.herokuapp.com/api/sources?name=${encodeURIComponent(sourceToCheck)}`);
      const mediaBiasData = await mediaBiasResponse.json();
      
      // Check AllSides Media Bias database
      const allSidesResponse = await fetch(`https://allsides.com/api/sources?name=${encodeURIComponent(sourceToCheck)}`);
      const allSidesData = await allSidesResponse.json();
      
      // Check FactCheck.org database
      const factCheckResponse = await fetch(`https://www.factcheck.org/api/sources?name=${encodeURIComponent(sourceToCheck)}`);
      const factCheckData = await factCheckResponse.json();
      
      // Check Snopes database
      const snopesResponse = await fetch(`https://www.snopes.com/api/sources?name=${encodeURIComponent(sourceToCheck)}`);
      const snopesData = await snopesResponse.json();
      
      // Aggregate results
      const sourceInfo = mediaBiasData.results?.[0] || allSidesData.results?.[0];
      const factCheckCount = (factCheckData.results?.length || 0) + (snopesData.results?.length || 0);
      
      setToolResults(prev => ({
        ...prev,
        'source-checker': {
          credibility: sourceInfo?.factual_reporting || 'unknown',
          bias: sourceInfo?.bias || 'unknown',
          factCheckRecord: factCheckCount,
          analysis: sourceInfo ? 
            `${sourceInfo.name} has a ${sourceInfo.factual_reporting} factual reporting rating and ${sourceInfo.bias} bias. Found ${factCheckCount} fact-checks.` :
            `Limited information available for ${sourceToCheck}. Found ${factCheckCount} fact-checks.`,
          details: {
            factualReporting: sourceInfo?.factual_reporting,
            biasRating: sourceInfo?.bias,
            country: sourceInfo?.country,
            traffic: sourceInfo?.traffic,
            factChecks: factCheckCount
          }
        }
      }));
    } catch (error) {
      console.error('Source checking failed:', error);
      setToolResults(prev => ({
        ...prev,
        'source-checker': {
          credibility: 'unknown',
          bias: 'unknown',
          factCheckRecord: 0,
          analysis: 'Error checking source. Please verify the source name and try again.'
        }
      }));
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleClaimTrack = async () => {
    if (!claimToTrack) return;
    setIsToolLoading(true);
    setActiveTool('claim-tracker');
    
    try {
      // Use Twitter API for claim tracking
      const twitterResponse = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(claimToTrack)}&max_results=100`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`
        }
      });
      const twitterData = await twitterResponse.json();
      
      // Use Facebook Graph API (requires app review)
      const facebookResponse = await fetch(`https://graph.facebook.com/v18.0/search?q=${encodeURIComponent(claimToTrack)}&type=post&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`);
      const facebookData = await facebookResponse.json();
      
      // Use Reddit API
      const redditResponse = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(claimToTrack)}&sort=new&t=week`);
      const redditData = await redditResponse.json();
      
      // Use Google Trends API
      const trendsResponse = await fetch(`https://trends.google.com/trends/api/widgetdata/multiline?hl=en-US&tz=-120&req={"time":"2024-01-01 2024-01-31","keywordGroups":[{"name":"claim","keywords":"${encodeURIComponent(claimToTrack)}","geo":"","time":"2024-01-01 2024-01-31"}]}&token=APP6_UEAAAAAY_${Date.now()}`);
      const trendsData = await trendsResponse.json();
      
      // Aggregate results
      const totalMentions = (twitterData.data?.length || 0) + (facebookData.data?.length || 0) + (redditData.data?.children?.length || 0);
      const platforms = [];
      if (twitterData.data?.length > 0) platforms.push('Twitter');
      if (facebookData.data?.length > 0) platforms.push('Facebook');
      if (redditData.data?.children?.length > 0) platforms.push('Reddit');
      
      // Get first mention date
      const allDates = [
        ...(twitterData.data?.map(tweet => tweet.created_at) || []),
        ...(facebookData.data?.map(post => post.created_time) || []),
        ...(redditData.data?.children?.map(post => post.data.created_utc) || [])
      ].filter(Boolean);
      
      const firstSeen = allDates.length > 0 ? new Date(Math.min(...allDates.map(date => new Date(date).getTime()))).toISOString().split('T')[0] : 'Unknown';
      
      setToolResults(prev => ({
        ...prev,
        'claim-tracker': {
          spread: totalMentions,
          platforms: platforms,
          firstSeen: firstSeen,
          analysis: `Claim has been mentioned ${totalMentions} times across ${platforms.length} platforms. First seen: ${firstSeen}`,
          details: {
            twitterMentions: twitterData.data?.length || 0,
            facebookMentions: facebookData.data?.length || 0,
            redditMentions: redditData.data?.children?.length || 0,
            trending: trendsData.timelineData?.some(point => point.value > 50) || false
          }
        }
      }));
    } catch (error) {
      console.error('Claim tracking failed:', error);
      setToolResults(prev => ({
        ...prev,
        'claim-tracker': {
          spread: 0,
          platforms: [],
          firstSeen: 'Unknown',
          analysis: 'Error tracking claim. Please check your API credentials and try again.'
        }
      }));
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleAIContentDetection = async () => {
    if (!contentToAnalyze) return;
    setIsToolLoading(true);
    setActiveTool('ai-content-detector');
    
    try {
      // Use OpenAI's GPTZero API for AI detection
      const gptZeroResponse = await fetch('https://api.gptzero.me/v2/predict/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GPTZERO_API_KEY}`
        },
        body: JSON.stringify({
          text: contentToAnalyze,
          model: 'gpt-4'
        })
      });
      const gptZeroData = await gptZeroResponse.json();
      
      // Use Originality.ai API
      const originalityResponse = await fetch('https://api.originality.ai/api/v1/scan/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_ORIGINALITY_API_KEY}`
        },
        body: JSON.stringify({
          content: contentToAnalyze,
          title: 'AI Content Detection'
        })
      });
      const originalityData = await originalityResponse.json();
      
      // Use Copyleaks AI Content Detector
      const copyleaksResponse = await fetch('https://api.copyleaks.com/v3/businesses/ai-detection/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_COPYLEAKS_API_KEY}`
        },
        body: JSON.stringify({
          text: contentToAnalyze,
          properties: {
            scanning: {
              aiDetection: {
                enabled: true
              }
            }
          }
        })
      });
      const copyleaksData = await copyleaksResponse.json();
      
      // Aggregate results from multiple AI detection services
      const aiScores = [
        gptZeroData.documents?.[0]?.completely_generated_prob || 0,
        originalityData.score || 0,
        copyleaksData.result?.ai?.score || 0
      ].filter(score => score !== null && score !== undefined);
      
      const averageAIScore = aiScores.length > 0 ? aiScores.reduce((a, b) => a + b, 0) / aiScores.length : 0;
      const confidence = aiScores.length > 0 ? Math.min(0.95, aiScores.length * 0.3) : 0.5;
      
      // Determine most likely AI model based on content characteristics
      const modelIndicators = {
        'GPT-4': contentToAnalyze.includes('Certainly') || contentToAnalyze.includes('I understand') || contentToAnalyze.length > 500,
        'Claude': contentToAnalyze.includes('I apologize') || contentToAnalyze.includes('Let me help') || contentToAnalyze.includes('Based on'),
        'Bard': contentToAnalyze.includes('Here\'s what I found') || contentToAnalyze.includes('According to'),
        'Unknown': true
      };
      
      const detectedModel = Object.keys(modelIndicators).find(model => modelIndicators[model]) || 'Unknown';
      
      setToolResults(prev => ({
        ...prev,
        'ai-content-detector': {
          aiProbability: averageAIScore,
          confidence: confidence,
          model: detectedModel,
          analysis: `Content analyzed by ${aiScores.length} AI detection services. Average AI probability: ${(averageAIScore * 100).toFixed(1)}%`,
          details: {
            gptZeroScore: gptZeroData.documents?.[0]?.completely_generated_prob || 0,
            originalityScore: originalityData.score || 0,
            copyleaksScore: copyleaksData.result?.ai?.score || 0,
            servicesUsed: aiScores.length
          }
        }
      }));
    } catch (error) {
      console.error('AI content detection failed:', error);
      setToolResults(prev => ({
        ...prev,
        'ai-content-detector': {
          aiProbability: 0,
          confidence: 0,
          model: 'Unknown',
          analysis: 'Error detecting AI content. Please check your API credentials and try again.'
        }
      }));
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleDigitalForensics = async () => {
    setIsToolLoading(true);
    setActiveTool('digital-forensics');
    
    try {
      // Use FotoForensics API for image analysis
      const fotoForensicsResponse = await fetch('https://fotoforensics.com/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_FOTOFORENSICS_API_KEY}`
        },
        body: JSON.stringify({
          image_url: uploadedImage || 'https://example.com/image.jpg'
        })
      });
      const fotoForensicsData = await fotoForensicsResponse.json();
      
      // Use Forensically API for metadata analysis
      const forensicallyResponse = await fetch('https://29a.ch/photo-forensics/api/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: uploadedImage || 'https://example.com/image.jpg'
        })
      });
      const forensicallyData = await forensicallyResponse.json();
      
      // Use ImageForensics API for manipulation detection
      const imageForensicsResponse = await fetch('https://imageforensics.com/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_IMAGEFORENSICS_API_KEY}`
        },
        body: JSON.stringify({
          image_url: uploadedImage || 'https://example.com/image.jpg',
          analysis_types: ['copy_move', 'noise_analysis', 'compression_artifacts']
        })
      });
      const imageForensicsData = await imageForensicsResponse.json();
      
      // Analyze results
      const manipulationDetected = fotoForensicsData.manipulation_score > 0.7 || 
                                  imageForensicsData.copy_move_detected || 
                                  imageForensicsData.noise_anomalies;
      
      const detectedTools = [];
      if (fotoForensicsData.tools_detected) detectedTools.push(...fotoForensicsData.tools_detected);
      if (imageForensicsData.software_signatures) detectedTools.push(...imageForensicsData.software_signatures);
      
      const metadataStatus = forensicallyData.exif_data ? 'EXIF data present' : 'EXIF data stripped';
      
      setToolResults(prev => ({
        ...prev,
        'digital-forensics': {
          manipulation: manipulationDetected,
          tools: detectedTools.length > 0 ? detectedTools : ['Unknown'],
          metadata: metadataStatus,
          analysis: manipulationDetected ? 
            'Image shows signs of digital manipulation based on forensic analysis' :
            'No significant signs of manipulation detected',
          details: {
            manipulationScore: fotoForensicsData.manipulation_score || 0,
            copyMoveDetected: imageForensicsData.copy_move_detected || false,
            noiseAnomalies: imageForensicsData.noise_anomalies || false,
            compressionArtifacts: imageForensicsData.compression_artifacts || false,
            exifData: forensicallyData.exif_data || null
          }
        }
      }));
    } catch (error) {
      console.error('Digital forensics failed:', error);
      setToolResults(prev => ({
        ...prev,
        'digital-forensics': {
          manipulation: false,
          tools: ['Analysis failed'],
          metadata: 'Unable to analyze',
          analysis: 'Error performing digital forensics analysis. Please check your API credentials and try again.'
        }
      }));
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleAchievementTracker = () => {
    setActiveTool('achievement-tracker');
    setAchievements([
      { id: 1, name: 'Fact Checker', description: 'Completed 10 fact-checks', earned: true, date: '2024-01-15' },
      { id: 2, name: 'AI Detector', description: 'Detected 5 AI-generated contents', earned: true, date: '2024-01-12' },
      { id: 3, name: 'Source Verifier', description: 'Verified 20 sources', earned: false, progress: 15 },
      { id: 4, name: 'Misinformation Fighter', description: 'Reported 50 fake news', earned: false, progress: 30 }
    ]);
  };

  const handleTemporalAnalysis = () => {
    setIsToolLoading(true);
    setActiveTool('temporal-analysis');
    
    // Simulate temporal analysis
    setTimeout(() => {
      setTimelineData([
        { date: '2024-01-15', event: 'Content first appeared', platform: 'Twitter' },
        { date: '2024-01-16', event: 'Viral spread', platform: 'Facebook' },
        { date: '2024-01-17', event: 'Fact-check published', platform: 'Snopes' },
        { date: '2024-01-18', event: 'Content debunked', platform: 'Multiple' }
      ]);
      setIsToolLoading(false);
    }, 1500);
  };

  const tabs = [
    { id: 'ai-provenance', name: 'AI Provenance Lab', icon: Brain },
    { id: 'search', name: 'Fact Search', icon: Search },
    { id: 'tools', name: 'Verification Tools', icon: Shield },
    { id: 'sources', name: 'Trusted Sources', icon: CheckCircle }
  ];

  const verificationTools = [
    {
      name: 'Reverse Image Search',
      description: 'Check if an image has been used elsewhere or modified',
      icon: Camera,
      action: 'Upload Image',
      handler: handleImageUpload,
      type: 'file-upload'
    },
    {
      name: 'URL Scanner',
      description: 'Analyze website credibility and safety',
      icon: Link,
      action: 'Scan URL',
      handler: handleUrlScan,
      type: 'input',
      placeholder: 'Enter URL to scan...',
      value: urlToScan,
      setValue: setUrlToScan
    },
    {
      name: 'Source Checker',
      description: 'Verify the credibility of news sources',
      icon: Globe,
      action: 'Check Source',
      handler: handleSourceCheck,
      type: 'input',
      placeholder: 'Enter source name...',
      value: sourceToCheck,
      setValue: setSourceToCheck
    },
    {
      name: 'Claim Tracker',
      description: 'Track how claims spread across platforms',
      icon: TrendingUp,
      action: 'Track Claim',
      handler: handleClaimTrack,
      type: 'input',
      placeholder: 'Enter claim to track...',
      value: claimToTrack,
      setValue: setClaimToTrack
    },
    {
      name: 'AI Content Detector',
      description: 'Advanced AI-generated content detection',
      icon: Zap,
      action: 'Detect AI',
      handler: handleAIContentDetection,
      type: 'textarea',
      placeholder: 'Enter content to analyze...',
      value: contentToAnalyze,
      setValue: setContentToAnalyze
    },
    {
      name: 'Digital Forensics',
      description: 'Deep technical analysis of media files',
      icon: Link2,
      action: 'Analyze',
      handler: handleDigitalForensics,
      type: 'button'
    },
    {
      name: 'Achievement Tracker',
      description: 'Track verification achievements and badges',
      icon: Award,
      action: 'View Achievements',
      handler: handleAchievementTracker,
      type: 'button'
    },
    {
      name: 'Temporal Analysis',
      description: 'Time-based content verification',
      icon: Calendar,
      action: 'Analyze Timeline',
      handler: handleTemporalAnalysis,
      type: 'button'
    }
  ];

  const trustedSources = [
    {
      name: 'Snopes',
      description: 'Fact-checking website for urban legends and rumors',
      url: 'snopes.com',
      category: 'General Fact-Checking',
      icon: Info
    },
    {
      name: 'FactCheck.org',
      description: 'Nonpartisan, nonprofit fact-checker',
      url: 'factcheck.org',
      category: 'Political Claims',
      icon: MapPin
    },
    {
      name: 'Reuters Fact Check',
      description: 'Professional news organization fact-checking',
      url: 'reuters.com/fact-check',
      category: 'News Verification',
      icon: Calendar
    },
    {
      name: 'WHO Myth Busters',
      description: 'Health-related misinformation debunking',
      url: 'who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters',
      category: 'Health Information',
      icon: Award
    },
    {
      name: 'AI Detection Network',
      description: 'Advanced AI content detection and analysis',
      url: 'aidetection.net',
      category: 'AI Analysis',
      icon: Zap
    },
    {
      name: 'Digital Forensics Lab',
      description: 'Technical media manipulation detection',
      url: 'digitalforensicslab.org',
      category: 'Technical Analysis',
      icon: Link2
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Fact-Check Lab</h2>
        <p className="text-sm sm:text-base text-gray-600">Tools and resources for verifying information</p>
          </div>
          {isLoadingModels && (
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs sm:text-sm text-gray-600">Loading AI Models...</span>
              </div>
              <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${modelLoadProgress}%` }}
                ></div>
              </div>
              <span className="text-xs sm:text-sm text-gray-600">{modelLoadProgress}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap gap-2 p-2 sm:space-x-1 sm:flex-nowrap sm:gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-colors min-w-[120px] sm:min-w-0 ${
                  activeTab === tab.id
                    ? 'bg-deepblue-100 text-deepblue-700 border border-deepblue-200'
                    : 'text-gray-600 hover:bg-deepblue-50 hover:text-deepblue-600'
                }`}
              >
                <tab.icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Search Results Display */}
        {activeTab === 'search' && searchResults.length > 0 && (
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="flex-1 w-full">
                      <h4 className="font-medium text-sm sm:text-base text-gray-900">{result.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{result.summary}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                        <span className="text-xs text-gray-500">Source: {result.source}</span>
                        <span className="text-xs text-gray-500">Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-3 py-1.5 sm:py-1 bg-blue-500 text-white text-xs sm:text-sm rounded hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6">
          {activeTab === 'search' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Search for fact-checks and verified information
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter claim, topic, or keywords..."
                    className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-deepblue-500 focus:border-deepblue-500"
                  />
                  <button className="btn-primary w-full sm:w-auto">
                    <Search className="h-4 w-4" />
                    <span className="sm:hidden ml-2">Search</span>
                  </button>
                </div>
              </div>
              
              <div className="text-center text-gray-500 py-6 sm:py-8">
                <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm sm:text-base">Enter a search query to find fact-checks and verified information</p>
              </div>
              
              {/* Enhanced Search Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Zap className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">AI Detection</span>
                </div>
                <div className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Link2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Deep Analysis</span>
                </div>
                <div className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Award className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Verified Sources</span>
                </div>
                <div className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Timeline Analysis</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Tool Results Display */}
              {activeTool && toolResults[activeTool] && (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
                  {activeTool === 'reverse-image-search' && (
                    <div className="space-y-4">
                      {uploadedImage && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                          <img src={uploadedImage} alt="Uploaded" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600">{toolResults[activeTool].analysis}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Found {toolResults[activeTool].matches.length} similar images</p>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        {toolResults[activeTool].matches.map((match, index) => (
                          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-white rounded border">
                            <span className="text-xs sm:text-sm text-blue-600 break-all">{match.url}</span>
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{(match.similarity * 100).toFixed(1)}% match</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTool === 'url-scanner' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="p-3 sm:p-4 bg-white rounded border">
                        <h4 className="font-medium text-sm sm:text-base text-gray-900">Credibility</h4>
                        <p className={`text-xs sm:text-sm ${toolResults[activeTool].credibility === 'high' ? 'text-green-600' : 'text-red-600'}`}>
                          {toolResults[activeTool].credibility.toUpperCase()}
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-white rounded border">
                        <h4 className="font-medium text-sm sm:text-base text-gray-900">Safety</h4>
                        <p className={`text-xs sm:text-sm ${toolResults[activeTool].safety === 'safe' ? 'text-green-600' : 'text-red-600'}`}>
                          {toolResults[activeTool].safety.toUpperCase()}
                        </p>
                      </div>
                      <div className="p-3 sm:p-4 bg-white rounded border">
                        <h4 className="font-medium text-sm sm:text-base text-gray-900">Domain Age</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{toolResults[activeTool].domainAge} years</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-white rounded border">
                        <h4 className="font-medium text-sm sm:text-base text-gray-900">SSL Valid</h4>
                        <p className={`text-xs sm:text-sm ${toolResults[activeTool].sslValid ? 'text-green-600' : 'text-red-600'}`}>
                          {toolResults[activeTool].sslValid ? 'YES' : 'NO'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTool === 'source-checker' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded border">
                          <h4 className="font-medium text-gray-900">Credibility</h4>
                          <p className={`text-sm ${toolResults[activeTool].credibility === 'reliable' ? 'text-green-600' : 'text-red-600'}`}>
                            {toolResults[activeTool].credibility.toUpperCase()}
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded border">
                          <h4 className="font-medium text-gray-900">Bias</h4>
                          <p className={`text-sm ${toolResults[activeTool].bias === 'neutral' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {toolResults[activeTool].bias.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{toolResults[activeTool].analysis}</p>
                    </div>
                  )}
                  
                  {activeTool === 'claim-tracker' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded border">
                          <h4 className="font-medium text-gray-900">Spread Count</h4>
                          <p className="text-2xl font-bold text-blue-600">{toolResults[activeTool].spread.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-white rounded border">
                          <h4 className="font-medium text-gray-900">First Seen</h4>
                          <p className="text-sm text-gray-600">{toolResults[activeTool].firstSeen}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {toolResults[activeTool].platforms.map((platform, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTool === 'ai-content-detector' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded border">
                          <h4 className="font-medium text-gray-900">AI Probability</h4>
                          <p className="text-2xl font-bold text-red-600">{(toolResults[activeTool].aiProbability * 100).toFixed(1)}%</p>
                        </div>
                        <div className="p-4 bg-white rounded border">
                          <h4 className="font-medium text-gray-900">Confidence</h4>
                          <p className="text-2xl font-bold text-blue-600">{(toolResults[activeTool].confidence * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{toolResults[activeTool].analysis}</p>
                    </div>
                  )}
                  
                  {activeTool === 'digital-forensics' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded border">
                        <h4 className="font-medium text-gray-900">Manipulation Detected</h4>
                        <p className={`text-lg font-bold ${toolResults[activeTool].manipulation ? 'text-red-600' : 'text-green-600'}`}>
                          {toolResults[activeTool].manipulation ? 'YES' : 'NO'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tools Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {toolResults[activeTool].tools.map((tool, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{toolResults[activeTool].analysis}</p>
                    </div>
                  )}
                  
                  {activeTool === 'achievement-tracker' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Your Achievements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                          <div key={achievement.id} className={`p-4 rounded border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900">{achievement.name}</h5>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                {achievement.earned && <p className="text-xs text-green-600">Earned: {achievement.date}</p>}
                              </div>
                              {achievement.earned ? (
                                <Award className="h-6 w-6 text-green-600" />
                              ) : (
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Progress: {achievement.progress}/20</p>
                                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                                    <div 
                                      className="h-2 bg-blue-500 rounded-full" 
                                      style={{ width: `${(achievement.progress / 20) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTool === 'temporal-analysis' && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Timeline Analysis</h4>
                      <div className="space-y-3">
                        {timelineData.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded border">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.event}</p>
                              <p className="text-xs text-gray-500">{item.platform}</p>
                            </div>
                            <span className="text-xs text-gray-500">{item.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {verificationTools.map((tool) => (
                <div key={tool.name} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-deepblue-300 transition-colors">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-gradient-to-r from-deepblue-100 to-violet-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <tool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-deepblue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{tool.description}</p>
                        
                        {/* Interactive Inputs */}
                        {tool.type === 'file-upload' && (
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={tool.handler}
                              className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {isToolLoading && activeTool === 'reverse-image-search' && (
                              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <span>Analyzing image...</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {tool.type === 'input' && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder={tool.placeholder}
                              value={tool.value}
                              onChange={(e) => tool.setValue(e.target.value)}
                              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button 
                              onClick={tool.handler}
                              disabled={!tool.value || isToolLoading}
                              className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                              {isToolLoading && activeTool === tool.name.toLowerCase().replace(/\s+/g, '-') ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Analyzing...</span>
                                </div>
                              ) : (
                                tool.action
                              )}
                            </button>
                          </div>
                        )}
                        
                        {tool.type === 'textarea' && (
                          <div className="space-y-2">
                            <textarea
                              placeholder={tool.placeholder}
                              value={tool.value}
                              onChange={(e) => tool.setValue(e.target.value)}
                              rows={3}
                              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button 
                              onClick={tool.handler}
                              disabled={!tool.value || isToolLoading}
                              className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                              {isToolLoading && activeTool === 'ai-content-detector' ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Analyzing...</span>
                                </div>
                              ) : (
                                tool.action
                              )}
                            </button>
                          </div>
                        )}
                        
                        {tool.type === 'button' && (
                          <button 
                            onClick={tool.handler}
                            className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-auto"
                          >
                        {tool.action}
                      </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-3 sm:space-y-4">
              {trustedSources.map((source) => (
                <div key={source.name} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-deepblue-300 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900">{source.name}</h3>
                        <span className="px-2 py-1 bg-gradient-to-r from-deepblue-100 to-violet-100 text-deepblue-700 text-xs rounded-full">
                          {source.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2">{source.description}</p>
                      <p className="text-blue-600 text-xs sm:text-sm break-all">{source.url}</p>
                    </div>
                    <button className="w-full sm:w-auto btn-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center space-x-2">
                      <ExternalLink className="h-3 w-3" />
                      <span>Visit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai-provenance' && (
            <AIProvenanceLab isLoadingModels={isLoadingModels} modelLoadProgress={modelLoadProgress} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AIProvenanceLab = ({ isLoadingModels, modelLoadProgress }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysisSteps, setAnalysisSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [models, setModels] = useState({});
  const [modelStatus, setModelStatus] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    aiAnalysis: true,
    technical: false,
    timeline: false,
    forensics: false
  });

  // Load AI models on component mount
  useEffect(() => {
    const loadAIModels = async () => {
      try {
        // Load pre-trained models (in production, you'd load real models)
        // For demo, we'll simulate model loading
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate loading various AI models
        const loadedModels = {
          deepfakeDetector: { loaded: true, accuracy: 0.94 },
          aiArtDetector: { loaded: true, accuracy: 0.91 },
          faceManipulation: { loaded: true, accuracy: 0.89 },
          styleTransfer: { loaded: true, accuracy: 0.87 },
          objectManipulation: { loaded: true, accuracy: 0.85 }
        };
        
        setModels(loadedModels);
      } catch (error) {
        console.error('Failed to load AI models:', error);
      }
    };

    loadAIModels();
  }, []);

  // Advanced AI analysis pipeline
  const runAIAnalysis = useCallback(async (imageData) => {
    if (!models.deepfakeDetector?.loaded) return null;

    // Simulate real AI model inference
    const analysisResults = {
      deepfake: {
        probability: Math.random() * 0.3 + (imageData.name?.includes('ai') ? 0.7 : 0),
        confidence: 0.94,
        model: 'FaceForensics++ Ensemble',
        detected_artifacts: ['temporal_inconsistency', 'blending_artifacts']
      },
      aiGeneration: {
        probability: Math.random() * 0.2 + (imageData.name?.includes('generated') ? 0.8 : 0),
        confidence: 0.91,
        model: 'AI-Art Detector v2.1',
        style_signatures: ['stable_diffusion', 'midjourney_v5']
      },
      faceManipulation: {
        probability: Math.random() * 0.25,
        confidence: 0.89,
        model: 'DeepFaceLab Detector',
        manipulation_type: 'face_swap'
      },
      frequencyAnalysis: {
        dct_anomalies: Math.random() > 0.5,
        jpeg_quality: Math.floor(Math.random() * 30) + 70,
        compression_artifacts: Math.random() > 0.6,
        recompression_count: Math.floor(Math.random() * 5)
      }
    };

    return analysisResults;
  }, [models]);

  // Comprehensive analysis pipeline
  const analyzeFile = useCallback(async (file) => {
    const steps = [
      'Preprocessing media file...',
      'Loading AI detection models...',
      'Running deepfake detection...',
      'Analyzing AI generation patterns...',
      'Checking face manipulation...',
      'Performing frequency domain analysis...',
      'Verifying C2PA credentials...',
      'Detecting SynthID watermarks...',
      'Analyzing metadata forensics...',
      'Cross-referencing with databases...',
      'Generating comprehensive report...'
    ];

    setAnalysisSteps(steps);
    setCurrentStep(0);

    // Simulate progressive analysis
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // Run AI analysis
    const aiResults = await runAIAnalysis(file);
    
    // Generate comprehensive results based on file characteristics
    const fileName = file.name.toLowerCase();
    let baseResult;

    if (fileName.includes('ai') || fileName.includes('generated') || fileName.includes('synthetic')) {
      baseResult = {
        authenticity: 'AI-Generated',
        confidence: 0.94,
        risk_level: 'high',
        mdm_classification: 'Disinformation',
        reason: 'Multiple AI generation signatures detected across ensemble models. High probability synthetic content.',
        traffic_light: 'red'
      };
    } else if (fileName.includes('old') || fileName.includes('2019') || fileName.includes('archive')) {
      baseResult = {
        authenticity: 'Authentic',
        confidence: 0.89,
        risk_level: 'medium',
        mdm_classification: 'Malinformation',
        reason: 'Authentic content detected but temporal context indicates potential misuse.',
        traffic_light: 'yellow'
      };
    } else {
      baseResult = {
        authenticity: 'Authentic',
        confidence: 0.91,
        risk_level: 'low',
        mdm_classification: 'Safe',
        reason: 'Content appears authentic with consistent metadata and no manipulation indicators.',
        traffic_light: 'green'
      };
    }

    return {
      ...baseResult,
      timestamp: new Date().toISOString(),
      file_name: file.name,
      analysis_id: `PA-${Date.now().toString(36)}`,
      
      // Advanced AI Analysis Results
      ai_analysis: {
        ensemble_verdict: baseResult.authenticity,
        overall_confidence: baseResult.confidence,
        deepfake_detection: aiResults?.deepfake || {
          probability: 0.15,
          confidence: 0.94,
          model: 'FaceForensics++ Ensemble',
          detected_artifacts: []
        },
        ai_generation: aiResults?.aiGeneration || {
          probability: 0.12,
          confidence: 0.91,
          model: 'AI-Art Detector v2.1',
          style_signatures: []
        },
        face_manipulation: aiResults?.faceManipulation || {
          probability: 0.08,
          confidence: 0.89,
          model: 'DeepFaceLab Detector',
          manipulation_type: 'none'
        },
        models_used: [
          { name: 'FaceForensics++', version: '2.1', accuracy: 0.94 },
          { name: 'DFDC Ensemble', version: '1.3', accuracy: 0.92 },
          { name: 'AI-Art Detector', version: '2.1', accuracy: 0.91 },
          { name: 'Celeb-DF', version: '1.0', accuracy: 0.89 }
        ]
      },

      // C2PA Analysis
      c2pa_metadata: fileName.includes('ai') ? {
        present: false,
        reason: 'No C2PA manifest found - typical of AI-generated content'
      } : {
        present: true,
        creator: fileName.includes('old') ? 'Reuters News Agency' : 'iPhone 15 Pro',
        signature_valid: true,
        certificate_chain: 'Valid',
        actions: fileName.includes('old') ? [
          { action: 'captured', software: 'Canon EOS R5', timestamp: '2019-03-15T14:30:00Z' },
          { action: 'edited', software: 'Adobe Premiere Pro', timestamp: '2019-03-15T16:45:00Z' }
        ] : [
          { action: 'captured', software: 'iOS Camera App', timestamp: '2024-08-16T10:30:00Z' }
        ]
      },

      // SynthID Detection
      synthid_watermark: fileName.includes('ai') ? {
        detected: true,
        watermark_type: 'Imagen SynthID',
        confidence: 0.87,
        generator: 'Google Imagen 2.0',
        watermark_strength: 'high',
        extraction_method: 'frequency_domain'
      } : {
        detected: false,
        scanned_types: ['imagen', 'dall_e', 'midjourney', 'stable_diffusion']
      },

      // Advanced Metadata Forensics
      metadata_forensics: {
        exif_analysis: {
          consistency: !fileName.includes('ai'),
          camera_fingerprint: fileName.includes('ai') ? 'none' : 'iPhone_15_Pro_A2848',
          timestamp_validity: !fileName.includes('ai'),
          gps_authenticity: true
        },
        compression_analysis: {
          quality_factor: fileName.includes('ai') ? 'inconsistent' : 'consistent',
          recompression_count: fileName.includes('ai') ? 3 : 1,
          artifact_patterns: fileName.includes('ai') ? 'artificial' : 'natural'
        },
        digital_signatures: {
          hash_verification: !fileName.includes('ai'),
          blockchain_record: false,
          timestamp_authority: fileName.includes('old') ? 'verified' : 'recent'
        }
      },

      // Technical Analysis
      technical_analysis: {
        file_integrity: !fileName.includes('ai'),
        pixel_analysis: {
          noise_patterns: fileName.includes('ai') ? 'synthetic' : 'natural',
          edge_consistency: !fileName.includes('ai'),
          color_distribution: fileName.includes('ai') ? 'anomalous' : 'normal'
        },
        frequency_domain: aiResults?.frequencyAnalysis || {
          dct_anomalies: false,
          jpeg_quality: 95,
          compression_artifacts: false,
          recompression_count: 1
        }
      },

      // Context Timeline
      context_timeline: fileName.includes('old') ? [
        { date: '2024-08-16', event: 'File uploaded to platform', verified: true, risk: 'medium' },
        { date: '2024-01-10', event: 'Viral spread on social media', verified: true, source: 'Social monitoring', risk: 'high' },
        { date: '2023-08-20', event: 'Reposted without context', verified: true, source: 'Content tracking', risk: 'high' },
        { date: '2019-03-15', event: 'Original publication by Reuters', verified: true, source: 'C2PA metadata', risk: 'low' },
        { date: '2019-03-15', event: 'Video captured in London', verified: true, source: 'Geolocation data', risk: 'low' }
      ] : [
        { date: '2024-08-16', event: 'File uploaded to platform', verified: true, risk: 'low' },
        { date: '2024-08-16', event: fileName.includes('ai') ? 'Generated by AI model' : 'Photo captured', verified: true, source: fileName.includes('ai') ? 'SynthID detection' : 'EXIF data', risk: fileName.includes('ai') ? 'high' : 'low' }
      ],

      // File Information
      file_info: {
        type: file.type.split('/')[1].toUpperCase(),
        size: file.size,
        dimensions: fileName.includes('ai') ? '1024x1024' : '4032x3024',
        color_depth: '24-bit',
        creation_date: fileName.includes('old') ? '2019-03-15' : '2024-08-16'
      },

      // MDM Classification Details
      mdm_details: {
        type: baseResult.mdm_classification,
        description: baseResult.mdm_classification === 'Disinformation' 
          ? 'Intentionally created synthetic content designed to appear authentic'
          : baseResult.mdm_classification === 'Malinformation'
          ? 'Authentic content being shared in misleading temporal context'
          : 'Authentic content with no misleading indicators',
        risk_factors: baseResult.mdm_classification === 'Disinformation'
          ? ['High AI generation confidence', 'No disclosure of synthetic origin', 'Realistic appearance', 'Multiple model signatures']
          : baseResult.mdm_classification === 'Malinformation'
          ? ['Content age (5+ years)', 'Missing temporal context', 'Recent viral sharing', 'Out-of-context usage']
          : [],
        recommendation: baseResult.mdm_classification === 'Disinformation'
          ? 'Do not share. Content is synthetically generated and may mislead viewers.'
          : baseResult.mdm_classification === 'Malinformation'
          ? 'Add clear context about original date and circumstances before sharing.'
          : 'Safe to share with standard attribution practices.'
      },

      // Geolocation (for relevant files)
      geolocation: fileName.includes('old') ? {
        location: 'London, UK',
        coordinates: '51.5074, -0.1278',
        confidence: 0.87,
        verification_method: 'EXIF GPS + landmark recognition'
      } : null,

      // Cross-platform verification
      cross_verification: {
        reverse_image_search: {
          matches_found: fileName.includes('old') ? 15 : fileName.includes('ai') ? 0 : 2,
          oldest_match: fileName.includes('old') ? '2019-03-15' : fileName.includes('ai') ? null : '2024-08-16',
          platforms: fileName.includes('old') ? ['Reuters', 'BBC', 'CNN', 'Twitter'] : []
        },
        blockchain_verification: {
          registered: false,
          hash_matches: 0
        }
      }
    };
  }, [runAIAnalysis]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setCurrentStep(0);

    try {
      const result = await analyzeFile(file);
      setAnalysisResult(result);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeFile]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onDrop([files[0]]);
    }
  };

  const getTrafficLightEmoji = (light) => {
    switch (light) {
      case 'green': return '🟢';
      case 'yellow': return '🟡';
      case 'red': return '🔴';
      default: return '⚪';
    }
  };

  const getTrafficLightText = (light) => {
    switch (light) {
      case 'green': return 'Safe';
      case 'yellow': return 'Needs Context';
      case 'red': return 'High Risk';
      default: return 'Unknown';
    }
  };

  const getMDMColor = (classification) => {
    switch (classification) {
      case 'Safe': return 'text-green-700 bg-green-50 border-green-200';
      case 'Misinformation': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Malinformation': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Disinformation': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">

        {/* Model Status Dashboard - Hidden on Mobile */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {Object.entries(models).map(([modelName, model]) => (
            <div key={modelName} className={`p-3 rounded-lg border ${
              model.loaded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                <Cpu className={`h-4 w-4 ${model.loaded ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-xs font-medium text-gray-700">
                  {modelName.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              {model.loaded && (
                <div className="text-xs text-green-600 text-center mt-1">
                  {Math.round(model.accuracy * 100)}% ACC
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {/* Upload Area - 2 columns */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:border-blue-400 hover:bg-gray-50 transition-all duration-300">
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,video/*,audio/*"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                <div className="flex space-x-2 sm:space-x-3">
                  <FileImage className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  <FileVideo className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  <FileAudio className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                
                <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 mb-1 sm:mb-2">
                    Upload Media File
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 px-2">
                    Advanced AI analysis for images, videos, and audio
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Test Files */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4 flex items-center">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              AI Test Scenarios
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => onDrop([new File([''], 'ai_generated_deepfake.jpg', { type: 'image/jpeg' })])}
                className="w-full text-left p-3 sm:p-4 text-xs sm:text-sm bg-white rounded-lg border hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">🔴 AI Deepfake Portrait</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded whitespace-nowrap">HIGH RISK</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Synthetic face with multiple AI signatures</p>
              </button>
              <button
                onClick={() => onDrop([new File([''], 'old_news_archive_2019.mp4', { type: 'video/mp4' })])}
                className="w-full text-left p-3 sm:p-4 text-xs sm:text-sm bg-white rounded-lg border hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">🟡 Archive News Footage</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded whitespace-nowrap">CONTEXT</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Authentic but potentially misused content</p>
              </button>
              <button
                onClick={() => onDrop([new File([''], 'authentic_photo_recent.jpg', { type: 'image/jpeg' })])}
                className="w-full text-left p-3 sm:p-4 text-xs sm:text-sm bg-white rounded-lg border hover:bg-green-50 hover:border-green-200 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">🟢 Authentic Photo</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded whitespace-nowrap">SAFE</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Verified authentic content with full provenance</p>
              </button>
            </div>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-600"></div>
                <span className="font-bold text-sm sm:text-base text-blue-700">Advanced AI Analysis in Progress</span>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {analysisSteps.map((step, idx) => (
                  <div key={idx} className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all ${
                    idx < currentStep ? 'bg-green-100 text-green-700' : 
                    idx === currentStep ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      idx < currentStep ? 'bg-green-500 text-white' :
                      idx === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {idx < currentStep ? '✓' : idx === currentStep ? '⟳' : idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-red-700 font-medium">{error}</p>
                  <p className="text-red-600 text-sm mt-1">Please try again or contact support</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Area - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {analysisResult ? (
            <>
              {/* Main Result Card */}
              <div className={`p-8 rounded-xl border-2 ${
                analysisResult.traffic_light === 'green' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
                analysisResult.traffic_light === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' :
                'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="text-6xl">
                      {getTrafficLightEmoji(analysisResult.traffic_light)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {getTrafficLightText(analysisResult.traffic_light)}
                      </h2>
                      <p className="text-xl font-medium text-gray-700 mb-1">
                        {analysisResult.authenticity}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className={`text-lg font-bold ${getConfidenceColor(analysisResult.confidence)}`}>
                          {Math.round(analysisResult.confidence * 100)}% Confidence
                        </span>
                        <span className="text-sm text-gray-500">
                          ID: {analysisResult.analysis_id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 rounded-xl border ${getMDMColor(analysisResult.mdm_classification)}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="h-6 w-6" />
                    <span className="font-bold text-lg">MDM: {analysisResult.mdm_classification}</span>
                  </div>
                  <p className="text-sm mb-4">{analysisResult.mdm_details.description}</p>
                  <div className="bg-white bg-opacity-50 rounded-lg p-3">
                    <p className="font-semibold text-sm">Recommendation:</p>
                    <p className="text-sm">{analysisResult.mdm_details.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* AI Analysis Results */}
              <div className="bg-white rounded-xl border shadow-sm">
                <button 
                  onClick={() => toggleSection('aiAnalysis')}
                  className="flex items-center justify-between w-full p-6 border-b"
                >
                  <div className="flex items-center space-x-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-bold">AI Model Analysis</h3>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {analysisResult.ai_analysis.models_used.length} Models
                    </span>
                  </div>
                  {expandedSections.aiAnalysis ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {expandedSections.aiAnalysis && (
                  <div className="p-6 space-y-6">
                    {/* Model Results Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                        <div className="flex items-center space-x-2 mb-3">
                          <Activity className="h-5 w-5 text-red-600" />
                          <h4 className="font-bold text-red-700">Deepfake Detection</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Probability:</span>
                            <span className="font-bold text-red-600">
                              {Math.round(analysisResult.ai_analysis.deepfake_detection.probability * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Model:</span>
                            <span className="text-sm font-medium">{analysisResult.ai_analysis.deepfake_detection.model}</span>
                          </div>
                          {analysisResult.ai_analysis.deepfake_detection.detected_artifacts.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-600 mb-1">Artifacts:</p>
                              <div className="flex flex-wrap gap-1">
                                {analysisResult.ai_analysis.deepfake_detection.detected_artifacts.map((artifact, idx) => (
                                  <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                    {artifact.replace(/_/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                        <div className="flex items-center space-x-2 mb-3">
                          <Layers className="h-5 w-5 text-orange-600" />
                          <h4 className="font-bold text-orange-700">AI Generation</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Probability:</span>
                            <span className="font-bold text-orange-600">
                              {Math.round(analysisResult.ai_analysis.ai_generation.probability * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Model:</span>
                            <span className="text-sm font-medium">{analysisResult.ai_analysis.ai_generation.model}</span>
                          </div>
                          {analysisResult.ai_analysis.ai_generation.style_signatures.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-600 mb-1">Signatures:</p>
                              <div className="flex flex-wrap gap-1">
                                {analysisResult.ai_analysis.ai_generation.style_signatures.map((sig, idx) => (
                                  <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                    {sig.replace(/_/g, ' ')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                        <div className="flex items-center space-x-2 mb-3">
                          <Eye className="h-5 w-5 text-blue-600" />
                          <h4 className="font-bold text-blue-700">Face Manipulation</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Probability:</span>
                            <span className="font-bold text-blue-600">
                              {Math.round(analysisResult.ai_analysis.face_manipulation.probability * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Type:</span>
                            <span className="text-sm font-medium">{analysisResult.ai_analysis.face_manipulation.manipulation_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Models Used - Hidden on Mobile */}
                    <div className="hidden md:block bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        AI Models Ensemble
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {analysisResult.ai_analysis.models_used.map((model, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border">
                            <div>
                              <span className="font-medium text-gray-900">{model.name}</span>
                              <span className="text-sm text-gray-500 ml-2">v{model.version}</span>
                            </div>
                            <span className="text-sm font-bold text-green-600">
                              {Math.round(model.accuracy * 100)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Credentials & SynthID */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-bold">Content Credentials (C2PA)</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {analysisResult.c2pa_metadata.present ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-700">Valid Manifest Found</span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Creator:</span>
                            <span className="text-sm font-medium">{analysisResult.c2pa_metadata.creator}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Signature:</span>
                            <span className={`text-sm font-medium ${
                              analysisResult.c2pa_metadata.signature_valid ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {analysisResult.c2pa_metadata.signature_valid ? 'Valid' : 'Invalid'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Certificate:</span>
                            <span className="text-sm font-medium">{analysisResult.c2pa_metadata.certificate_chain}</span>
                          </div>
                        </div>

                        {analysisResult.c2pa_metadata.actions && (
                          <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Edit History:</h5>
                            <div className="space-y-2">
                              {analysisResult.c2pa_metadata.actions.map((action, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm bg-blue-50 p-2 rounded">
                                  <Clock className="h-3 w-3 text-blue-500" />
                                  <span className="text-gray-700">{action.action} by {action.software}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">No Content Credentials detected</p>
                        <p className="text-sm text-gray-500 mt-1">{analysisResult.c2pa_metadata.reason}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-6 w-6 text-purple-600" />
                      <h3 className="text-lg font-bold">SynthID Detection</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {analysisResult.synthid_watermark.detected ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                          <span className="font-medium text-orange-700">Watermark Detected</span>
                        </div>
                        
                        <div className="bg-orange-50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Type:</span>
                            <span className="text-sm font-medium">{analysisResult.synthid_watermark.watermark_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Generator:</span>
                            <span className="text-sm font-medium">{analysisResult.synthid_watermark.generator}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Confidence:</span>
                            <span className="text-sm font-medium">
                              {Math.round(analysisResult.synthid_watermark.confidence * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Strength:</span>
                            <span className="text-sm font-medium capitalize">{analysisResult.synthid_watermark.watermark_strength}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-green-700 font-medium">No AI Watermarks</p>
                        <p className="text-sm text-gray-500 mt-2">Scanned for:</p>
                        <div className="flex flex-wrap justify-center gap-1 mt-2">
                          {analysisResult.synthid_watermark.scanned_types.map((type, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Advanced Forensics */}
              <div className="bg-white rounded-xl border shadow-sm">
                <button 
                  onClick={() => toggleSection('forensics')}
                  className="flex items-center justify-between w-full p-6 border-b"
                >
                  <div className="flex items-center space-x-3">
                    <Microscope className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-xl font-bold">Advanced Forensics</h3>
                  </div>
                  {expandedSections.forensics ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {expandedSections.forensics && (
                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* EXIF Analysis */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          EXIF Analysis
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Consistency:</span>
                            <span className={analysisResult.metadata_forensics.exif_analysis.consistency ? 'text-green-600' : 'text-red-600'}>
                              {analysisResult.metadata_forensics.exif_analysis.consistency ? 'Valid' : 'Issues'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Camera ID:</span>
                            <span className="text-gray-700 text-xs">{analysisResult.metadata_forensics.exif_analysis.camera_fingerprint}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Timestamp:</span>
                            <span className={analysisResult.metadata_forensics.exif_analysis.timestamp_validity ? 'text-green-600' : 'text-red-600'}>
                              {analysisResult.metadata_forensics.exif_analysis.timestamp_validity ? 'Valid' : 'Invalid'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Compression Analysis */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 flex items-center">
                          <Gauge className="h-4 w-4 mr-2" />
                          Compression
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Quality:</span>
                            <span className="text-gray-700">{analysisResult.metadata_forensics.compression_analysis.quality_factor}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Recompressions:</span>
                            <span className="text-gray-700">{analysisResult.metadata_forensics.compression_analysis.recompression_count}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Artifacts:</span>
                            <span className="text-gray-700">{analysisResult.metadata_forensics.compression_analysis.artifact_patterns}</span>
                          </div>
                        </div>
                      </div>

                      {/* Digital Signatures */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-900 flex items-center">
                          <Network className="h-4 w-4 mr-2" />
                          Digital Signatures
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Hash:</span>
                            <span className={analysisResult.metadata_forensics.digital_signatures.hash_verification ? 'text-green-600' : 'text-red-600'}>
                              {analysisResult.metadata_forensics.digital_signatures.hash_verification ? 'Valid' : 'Invalid'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Blockchain:</span>
                            <span className="text-gray-700">{analysisResult.metadata_forensics.digital_signatures.blockchain_record ? 'Found' : 'None'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Timestamp:</span>
                            <span className="text-gray-700">{analysisResult.metadata_forensics.digital_signatures.timestamp_authority}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pixel Analysis */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-3">Pixel-Level Analysis</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Noise Patterns</div>
                          <div className={`text-lg font-bold ${
                            analysisResult.technical_analysis.pixel_analysis.noise_patterns === 'natural' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {analysisResult.technical_analysis.pixel_analysis.noise_patterns}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Edge Consistency</div>
                          <div className={`text-lg font-bold ${
                            analysisResult.technical_analysis.pixel_analysis.edge_consistency ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {analysisResult.technical_analysis.pixel_analysis.edge_consistency ? 'Normal' : 'Anomalous'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Color Distribution</div>
                          <div className={`text-lg font-bold ${
                            analysisResult.technical_analysis.pixel_analysis.color_distribution === 'normal' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {analysisResult.technical_analysis.pixel_analysis.color_distribution}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Context Timeline */}
              <div className="bg-white rounded-xl border shadow-sm">
                <button 
                  onClick={() => toggleSection('timeline')}
                  className="flex items-center justify-between w-full p-6 border-b"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold">Provenance Timeline</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {analysisResult.context_timeline.length} Events
                    </span>
                  </div>
                  {expandedSections.timeline ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {expandedSections.timeline && (
                  <div className="p-6">
                    <div className="space-y-4">
                      {analysisResult.context_timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 pt-1">
                            <div className={`w-3 h-3 rounded-full ${
                              event.risk === 'low' ? 'bg-green-500' :
                              event.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">{event.event}</span>
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  event.risk === 'low' ? 'bg-green-100 text-green-700' :
                                  event.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {event.risk} risk
                                </span>
                                <span className="text-sm text-gray-500">{event.date}</span>
                              </div>
                            </div>
                            {event.source && (
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">Source:</span> {event.source}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cross-Platform Verification */}
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <Search className="h-6 w-6 text-cyan-600" />
                    <h3 className="text-xl font-bold">Cross-Platform Verification</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Reverse Image Search</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Matches Found:</span>
                          <span className="font-medium">{analysisResult.cross_verification.reverse_image_search.matches_found}</span>
                        </div>
                        {analysisResult.cross_verification.reverse_image_search.oldest_match && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Oldest Match:</span>
                            <span className="font-medium">{analysisResult.cross_verification.reverse_image_search.oldest_match}</span>
                          </div>
                        )}
                        {analysisResult.cross_verification.reverse_image_search.platforms.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Found on platforms:</p>
                            <div className="flex flex-wrap gap-1">
                              {analysisResult.cross_verification.reverse_image_search.platforms.map((platform, idx) => (
                                <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Blockchain Verification</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Registered:</span>
                          <span className={`font-medium ${analysisResult.cross_verification.blockchain_verification.registered ? 'text-green-600' : 'text-gray-600'}`}>
                            {analysisResult.cross_verification.blockchain_verification.registered ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Hash Matches:</span>
                          <span className="font-medium">{analysisResult.cross_verification.blockchain_verification.hash_matches}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Information */}
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-gray-600" />
                    <h3 className="text-xl font-bold">File Information</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Type</div>
                      <div className="text-lg font-bold text-blue-600">{analysisResult.file_info.type}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Size</div>
                      <div className="text-lg font-bold text-blue-600">
                        {(analysisResult.file_info.size / 1024 / 1024).toFixed(1)}MB
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Dimensions</div>
                      <div className="text-lg font-bold text-blue-600">{analysisResult.file_info.dimensions}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Color Depth</div>
                      <div className="text-lg font-bold text-blue-600">{analysisResult.file_info.color_depth}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Created</div>
                      <div className="text-lg font-bold text-blue-600">{analysisResult.file_info.creation_date}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geolocation (if available) */}
              {analysisResult.geolocation && (
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-6 w-6 text-red-600" />
                      <h3 className="text-xl font-bold">Geolocation Analysis</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="bg-red-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Location:</span>
                        <span className="text-sm font-medium">{analysisResult.geolocation.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Coordinates:</span>
                        <span className="text-sm font-medium font-mono">{analysisResult.geolocation.coordinates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <span className="text-sm font-medium">
                          {Math.round(analysisResult.geolocation.confidence * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Method:</span>
                        <span className="text-sm font-medium">{analysisResult.geolocation.verification_method}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-12 text-center">
              <Upload className="h-16 w-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Ready for Analysis</h3>
              <p className="text-gray-600 mb-4">Upload a media file to see comprehensive AI-powered analysis</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>• Deepfake Detection</span>
                <span>• AI Generation Analysis</span>
                <span>• Provenance Verification</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactCheckLab;
