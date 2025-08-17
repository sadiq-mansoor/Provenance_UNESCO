import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Share, AlertTriangle, CheckCircle, Eye, 
  Users, BookOpen, TrendingUp, Shield, Camera, Video, Link,
  FileText, BarChart3, Globe, User, Clock, ThumbsUp, ThumbsDown,
  Flag, ExternalLink, Play, Pause, Volume2, VolumeX, RefreshCw,
  Award, Target, Brain, Lightbulb, Search, Filter, Upload,
  FileImage, FileVideo, FileAudio, AlertCircle, Microscope,
  Zap, Link2, Info, MapPin, Calendar, ChevronDown, ChevronUp,
  Cpu, Activity, Layers, Network, Gauge, Database
} from 'lucide-react';

const MediaLiteracyPlatform = () => {
  const [activeSection, setActiveSection] = useState('community-reports');
  const [userScore, setUserScore] = useState(250);
  const [userLevel, setUserLevel] = useState('Detective');

  // Calculate user level based on score
  useEffect(() => {
    if (userScore >= 500) setUserLevel('Expert');
    else if (userScore >= 300) setUserLevel('Detective');
    else if (userScore >= 150) setUserLevel('Analyst');
    else setUserLevel('Beginner');
  }, [userScore]);
  
  // Enhanced user level display with icons
  const getUserLevelInfo = (level) => {
    const levelInfo = {
      'Expert': { icon: Award, color: 'text-purple-600', badge: 'bg-purple-100 text-purple-800' },
      'Detective': { icon: Target, color: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' },
      'Analyst': { icon: BarChart3, color: 'text-green-600', badge: 'bg-green-100 text-green-800' },
      'Beginner': { icon: Heart, color: 'text-orange-600', badge: 'bg-orange-100 text-orange-800' }
    };
    return levelInfo[level] || levelInfo['Beginner'];
  };

  const sections = [
    { id: 'community-reports', name: 'Community Reports', icon: Users, color: 'blue' },
    { id: 'trending-alerts', name: 'Trending Alerts', icon: TrendingUp, color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-deepblue-100 text-deepblue-700 border border-deepblue-200'
                    : 'text-gray-600 hover:bg-deepblue-50 hover:text-deepblue-600'
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeSection === 'community-reports' && <CommunityReports key="community" userScore={userScore} setUserScore={setUserScore} />}
          {activeSection === 'trending-alerts' && <TrendingAlerts key="alerts" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CommunityReports = ({ userScore, setUserScore }) => {
  const [reports, setReports] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Enhanced filtering with icons
  const filterOptions = [
    { value: 'all', label: 'All Reports', icon: Filter },
    { value: 'verified-fake', label: 'Verified Fake', icon: AlertTriangle },
    { value: 'under-review', label: 'Under Review', icon: Clock },
    { value: 'health-misinformation', label: 'Health Misinfo', icon: Microscope },
    { value: 'celebrity-hoax', label: 'Celebrity Hoax', icon: Award }
  ];

  useEffect(() => {
    // Simulate loading community reports
    setReports([
      {
        id: 1,
        type: 'image',
        title: 'Fake Celebrity Death Announcement',
        description: 'Saw this circulating on WhatsApp groups claiming a famous actor died. The image looks manipulated.',
        media: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500',
        submittedBy: 'Sarah_M',
        location: 'Lahore, Pakistan',
        timestamp: '2 hours ago',
        verificationStatus: 'verified-fake',
        upvotes: 45,
        downvotes: 2,
        category: 'celebrity-hoax',
        impact: 'high',
        sources: ['https://example.com/debunk1', 'https://example.com/debunk2']
      },
      {
        id: 2,
        type: 'video',
        title: 'Misleading Medical Cure Video',
        description: 'This video claims a simple home remedy can cure serious diseases. No scientific backing provided.',
        media: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500',
        submittedBy: 'DrAhmed_Official',
        location: 'Karachi, Pakistan',
        timestamp: '5 hours ago',
        verificationStatus: 'under-review',
        upvotes: 78,
        downvotes: 12,
        category: 'health-misinformation',
        impact: 'critical'
      },
      {
        id: 3,
        type: 'news',
        title: 'Fabricated Political Statement',
        description: 'Screenshot of a fake news article with false quotes from a political figure.',
        media: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=500',
        submittedBy: 'NewsWatcher_pk',
        location: 'Islamabad, Pakistan',
        timestamp: '1 day ago',
        verificationStatus: 'verified-fake',
        upvotes: 156,
        downvotes: 8,
        category: 'political-misinformation',
        impact: 'high'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified-fake': return 'red';
      case 'verified-real': return 'green';
      case 'under-review': return 'yellow';
      default: return 'gray';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Community Reports</h2>
            <p className="text-gray-600">Help others by sharing suspicious content you've encountered</p>
          </div>
          <button
            onClick={() => setShowSubmitForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Flag className="h-4 w-4" />
            <span>Report Content</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto">
          {filterOptions.map((option) => {
            const IconComponent = option.icon;
            return (
            <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filter === option.value
                  ? 'bg-deepblue-100 text-deepblue-700 border border-deepblue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-deepblue-50 hover:text-deepblue-600'
              }`}
            >
                <IconComponent className="h-4 w-4" />
                <span className="capitalize">{option.label}</span>
            </button>
            );
          })}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Media */}
            <div className="relative">
              <img 
                src={report.media} 
                alt={report.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(report.verificationStatus)}-100 text-${getStatusColor(report.verificationStatus)}-700 border border-${getStatusColor(report.verificationStatus)}-200`}>
                  {report.verificationStatus.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getImpactColor(report.impact)}-100 text-${getImpactColor(report.impact)}-700 border border-${getImpactColor(report.impact)}-200`}>
                  {report.impact.toUpperCase()} IMPACT
                </span>
              </div>
              {report.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-3">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-600 mb-4">{report.description}</p>
              
              {/* Metadata */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{report.submittedBy}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{report.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{report.timestamp}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{report.upvotes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                    <ThumbsDown className="h-4 w-4" />
                    <span>{report.downvotes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                    <MessageCircle className="h-4 w-4" />
                    <span>Discuss</span>
                  </button>
                </div>
                <button className="text-gray-600 hover:text-gray-700">
                  <Share className="h-4 w-4" />
                </button>
              </div>

              {/* Sources (if verified) */}
              {report.sources && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Verification Sources:</p>
                  <div className="space-y-1">
                    {report.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Source {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Form Modal */}
      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Report Suspicious Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Image</option>
                    <option>Video</option>
                    <option>News Article</option>
                    <option>Text/Message</option>
                    <option>Social Media Post</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Brief title describing the content"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what makes this content suspicious..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Content</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSubmitForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSubmitForm(false);
                      setUserScore(prev => prev + 25);
                    }}
                    className="flex-1 btn-primary"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TrendingAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts([
      {
        id: 1,
        title: 'Viral Video Claiming Miracle Cure',
        description: 'A video promoting an unverified health remedy is spreading rapidly across social platforms.',
        severity: 'high',
        platform: 'Multi-platform',
        reach: '2.3M views',
        timeframe: 'Last 6 hours',
        status: 'actively-spreading',
        verificationStatus: 'debunked',
        tags: ['health', 'misinformation', 'viral']
      },
      {
        id: 2,
        title: 'False Emergency Alert',
        description: 'Fake emergency notification about a natural disaster is causing unnecessary panic.',
        severity: 'critical',
        platform: 'WhatsApp, Telegram',
        reach: '500K shares',
        timeframe: 'Last 2 hours',
        status: 'rapidly-spreading',
        verificationStatus: 'confirmed-fake',
        tags: ['emergency', 'panic', 'hoax']
      },
      {
        id: 3,
        title: 'Deepfake Celebrity Endorsement',
        description: 'AI-generated video of a celebrity endorsing a cryptocurrency scam.',
        severity: 'high',
        platform: 'TikTok, Instagram',
        reach: '1.8M views',
        timeframe: 'Last 12 hours',
        status: 'trending',
        verificationStatus: 'ai-generated',
        tags: ['deepfake', 'crypto-scam', 'celebrity']
      }
    ]);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trending Alerts</h2>
            <p className="text-gray-600">Real-time monitoring of viral misinformation</p>
          </div>
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-200">
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            <span className="font-medium">{alerts.length} Active Alerts</span>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getSeverityColor(alert.severity)}-100 text-${getSeverityColor(alert.severity)}-700 border border-${getSeverityColor(alert.severity)}-200`}>
                      {alert.severity.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm text-gray-500">{alert.timeframe}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{alert.title}</h3>
                  <p className="text-gray-600 mb-4">{alert.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Platform</p>
                      <p className="font-medium text-gray-900">{alert.platform}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Reach</p>
                      <p className="font-medium text-gray-900">{alert.reach}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                      <p className="font-medium text-gray-900">{alert.status.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Verification</p>
                      <p className={`font-medium ${
                        alert.verificationStatus === 'confirmed-fake' || alert.verificationStatus === 'debunked' 
                          ? 'text-red-600' 
                          : alert.verificationStatus === 'ai-generated'
                          ? 'text-orange-600'
                          : 'text-gray-900'
                      }`}>
                        {alert.verificationStatus.replace('-', ' ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {alert.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="btn-primary text-sm px-4 py-2">
                  View Details
                </button>
                <button className="btn-secondary text-sm px-4 py-2">
                  Share Alert
                </button>
                <button className="btn-primary text-sm px-4 py-2">
                  Report Encounter
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const FactCheckLab = ({ userLevel, getUserLevelInfo }) => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Enhanced search functionality
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Simulate search results
    const mockResults = [
      {
        id: 1,
        title: `Fact-check results for "${query}"`,
        source: 'Snopes',
        verdict: 'False',
        confidence: 0.95,
        summary: 'This claim has been debunked by multiple fact-checking organizations.',
        url: 'https://snopes.com/fact-check/example'
      },
      {
        id: 2,
        title: `Related fact-check: "${query}"`,
        source: 'FactCheck.org',
        verdict: 'Misleading',
        confidence: 0.87,
        summary: 'This claim contains some truth but is presented in a misleading way.',
        url: 'https://factcheck.org/example'
      }
    ];
    
    setSearchResults(mockResults);
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  const tabs = [
    { id: 'search', name: 'Fact Search', icon: Search },
    { id: 'tools', name: 'Verification Tools', icon: Shield },
    { id: 'sources', name: 'Trusted Sources', icon: CheckCircle },
    { id: 'ai-provenance', name: 'AI Provenance Lab', icon: Brain }
  ];

  const verificationTools = [
    {
      name: 'Reverse Image Search',
      description: 'Check if an image has been used elsewhere or modified',
      icon: Camera,
      action: 'Upload Image'
    },
    {
      name: 'URL Scanner',
      description: 'Analyze website credibility and safety',
      icon: Link,
      action: 'Scan URL'
    },
    {
      name: 'Source Checker',
      description: 'Verify the credibility of news sources',
      icon: Globe,
      action: 'Check Source'
    },
    {
      name: 'Claim Tracker',
      description: 'Track how claims spread across platforms',
      icon: TrendingUp,
      action: 'Track Claim'
    },
    {
      name: 'Audio Analysis',
      description: 'Detect voice deepfakes and audio manipulation',
      icon: Volume2,
      action: 'Analyze Audio'
    },
    {
      name: 'Video Forensics',
      description: 'Advanced video manipulation detection',
      icon: Video,
      action: 'Analyze Video'
    },
    {
      name: 'Network Analysis',
      description: 'Analyze social media networks and bot detection',
      icon: Network,
      action: 'Analyze Network'
    },
    {
      name: 'Performance Metrics',
      description: 'Track verification accuracy and performance',
      icon: Gauge,
      action: 'View Metrics'
    }
  ];

  const trustedSources = [
    {
      name: 'Snopes',
      description: 'Fact-checking website for urban legends and rumors',
      url: 'snopes.com',
      category: 'General Fact-Checking',
      icon: Award
    },
    {
      name: 'FactCheck.org',
      description: 'Nonpartisan, nonprofit fact-checker',
      url: 'factcheck.org',
      category: 'Political Claims',
      icon: Target
    },
    {
      name: 'Reuters Fact Check',
      description: 'Professional news organization fact-checking',
      url: 'reuters.com/fact-check',
      category: 'News Verification',
      icon: Filter
    },
    {
      name: 'WHO Myth Busters',
      description: 'Health-related misinformation debunking',
      url: 'who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters',
      category: 'Health Information',
      icon: Microscope
    },
    {
      name: 'AI Detection Lab',
      description: 'Advanced AI-generated content detection',
      url: 'aidetectionlab.org',
      category: 'AI Content',
      icon: Zap
    },
    {
      name: 'Digital Forensics Hub',
      description: 'Technical media manipulation detection',
      url: 'digitalforensicshub.com',
      category: 'Technical Analysis',
      icon: Link2
    },
    {
      name: 'Info Verification Network',
      description: 'Real-time information verification',
      url: 'infoverification.net',
      category: 'Real-time',
      icon: Info
    },
    {
      name: 'Geographic Fact Checker',
      description: 'Location-based fact verification',
      url: 'geofactcheck.org',
      category: 'Geographic',
      icon: MapPin
    },
    {
      name: 'Temporal Analysis Lab',
      description: 'Time-based information verification',
      url: 'temporallab.org',
      category: 'Temporal',
      icon: Calendar
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
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fact-Check Lab</h2>
        <p className="text-gray-600">Tools and resources for verifying information</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Community Trust Score: 4.8/5</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span>Accuracy: 94.2%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {(() => {
                const levelInfo = getUserLevelInfo(userLevel);
                const IconComponent = levelInfo.icon;
                return (
                  <>
                    <IconComponent className={`h-4 w-4 ${levelInfo.color}`} />
                    <span className={levelInfo.color}>Level: {userLevel}</span>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-deepblue-100 text-deepblue-700 border border-deepblue-200'
                    : 'text-gray-600 hover:bg-deepblue-50 hover:text-deepblue-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'search' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search for fact-checks and verified information
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter claim, topic, or keywords..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                  <button className="btn-primary px-6 py-3">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
                  {searchResults.map((result) => (
                    <div key={result.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{result.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{result.summary}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">Source: {result.source}</span>
                            <span className="text-xs text-gray-500">Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              result.verdict === 'False' ? 'bg-red-100 text-red-700' :
                              result.verdict === 'Misleading' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {result.verdict}
                            </span>
                          </div>
                        </div>
                        <button className="ml-4 btn-primary text-sm px-3 py-1">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <div className="text-center text-gray-500 py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>Enter a search query to find fact-checks and verified information</p>
                </div>
              )}
              
              {/* Enhanced Search Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Pause className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Pause Analysis</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Volume2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Audio Check</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <VolumeX className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Mute Alerts</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <RefreshCw className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Refresh Data</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verificationTools.map((tool) => (
                <div key={tool.name} className="border border-gray-200 rounded-lg p-6 hover:border-violet-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-deepblue-100 to-violet-100 p-3 rounded-lg">
                      <tool.icon className="h-6 w-6 text-deepblue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <button className="btn-primary text-sm px-4 py-2">
                    {tool.action}
                  </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-4">
              {trustedSources.map((source) => (
                <div key={source.name} className="border border-gray-200 rounded-lg p-4 hover:border-violet-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{source.name}</h3>
                        <span className="px-2 py-1 bg-gradient-to-r from-deepblue-100 to-violet-100 text-deepblue-700 text-xs rounded-full">
                          {source.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{source.description}</p>
                      <p className="text-blue-600 text-sm">{source.url}</p>
                    </div>
                    <button className="ml-4 btn-primary text-sm px-4 py-2 flex items-center space-x-2">
                      <ExternalLink className="h-3 w-3" />
                      <span>Visit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai-provenance' && (
            <AIProvenanceLab />
          )}
        </div>
      </div>
    </motion.div>
  );
};


const AIProvenanceLab = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysisSteps, setAnalysisSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [models, setModels] = useState({});
  const [isLoadingModels, setIsLoadingModels] = useState(true);
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
        setIsLoadingModels(true);
        
        // Simulate loading various AI models
        await new Promise(resolve => setTimeout(resolve, 2000));
        
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
      } finally {
        setIsLoadingModels(false);
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-deepblue-100 to-violet-100 text-deepblue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
          <Brain className="h-5 w-5" />
          <span>AI-Powered Provenance Analysis</span>
          {isLoadingModels && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-deepblue-600 ml-2"></div>}
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-deepblue-600 via-violet-600 to-electric-600 bg-clip-text text-transparent mb-4">
          AI Provenance Lab
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
          Enterprise-grade media authenticity analysis powered by ensemble AI models, 
          advanced forensics, and comprehensive provenance verification
        </p>

        {/* Model Status Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto mb-8">
          {Object.entries(models).map(([modelName, model]) => (
            <div key={modelName} className={`p-2 rounded-lg border ${
              model.loaded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                <Cpu className={`h-3 w-3 ${model.loaded ? 'text-green-600' : 'text-gray-400'}`} />
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

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upload Area - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-deepblue-400 hover:bg-gray-50 transition-all duration-300">
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,video/*,audio/*"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-3">
                  <FileImage className="h-8 w-8 text-gray-400" />
                  <FileVideo className="h-8 w-8 text-gray-400" />
                  <FileAudio className="h-8 w-8 text-gray-400" />
                </div>
                
                <Upload className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Upload Media File
                  </p>
                  <p className="text-gray-500">
                    Advanced AI analysis for images, videos, and audio
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Test Files */}
          <div className="bg-gradient-to-r from-gray-50 to-deepblue-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              AI Test Scenarios
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onDrop([new File([''], 'ai_generated_deepfake.jpg', { type: 'image/jpeg' })])}
                className="w-full text-left p-3 text-sm bg-white rounded-lg border hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span>🔴 AI Deepfake Portrait</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">HIGH RISK</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Synthetic face with multiple AI signatures</p>
              </button>
              <button
                onClick={() => onDrop([new File([''], 'old_news_archive_2019.mp4', { type: 'video/mp4' })])}
                className="w-full text-left p-3 text-sm bg-white rounded-lg border hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span>🟡 Archive News Footage</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">CONTEXT</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Authentic but potentially misused content</p>
              </button>
              <button
                onClick={() => onDrop([new File([''], 'authentic_photo_recent.jpg', { type: 'image/jpeg' })])}
                className="w-full text-left p-3 text-sm bg-white rounded-lg border hover:bg-green-50 hover:border-green-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span>🟢 Authentic Photo</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">SAFE</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Verified authentic content with full provenance</p>
              </button>
            </div>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="bg-gradient-to-r from-deepblue-50 to-violet-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-deepblue-600"></div>
                <span className="font-bold text-deepblue-700">AI Analysis in Progress</span>
              </div>
              
              <div className="space-y-2">
                {analysisSteps.map((step, idx) => (
                  <div key={idx} className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${
                    idx < currentStep ? 'bg-neon-100 text-neon-700' : 
                    idx === currentStep ? 'bg-deepblue-100 text-deepblue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx < currentStep ? 'bg-neon-500 text-white' :
                      idx === currentStep ? 'bg-deepblue-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {idx < currentStep ? '✓' : idx === currentStep ? '⟳' : idx + 1}
                    </div>
                    <span className="text-xs font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
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
              <div className={`p-6 rounded-xl border-2 ${
                analysisResult.traffic_light === 'green' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
                analysisResult.traffic_light === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' :
                'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">
                      {getTrafficLightEmoji(analysisResult.traffic_light)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {getTrafficLightText(analysisResult.traffic_light)}
                      </h2>
                      <p className="text-lg font-medium text-gray-700 mb-1">
                        {analysisResult.authenticity}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className={`text-md font-bold ${getConfidenceColor(analysisResult.confidence)}`}>
                          {Math.round(analysisResult.confidence * 100)}% Confidence
                        </span>
                        <span className="text-sm text-gray-500">
                          ID: {analysisResult.analysis_id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl border ${getMDMColor(analysisResult.mdm_classification)}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-bold text-md">MDM: {analysisResult.mdm_classification}</span>
                  </div>
                  <p className="text-sm mb-3">{analysisResult.mdm_details.description}</p>
                  <div className="bg-white bg-opacity-50 rounded-lg p-2">
                    <p className="font-semibold text-sm">Recommendation:</p>
                    <p className="text-sm">{analysisResult.mdm_details.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* AI Analysis Results */}
              <div className="bg-white rounded-xl border shadow-sm">
                <button 
                  onClick={() => toggleSection('aiAnalysis')}
                  className="flex items-center justify-between w-full p-4 border-b"
                >
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-bold">AI Model Analysis</h3>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      {analysisResult.ai_analysis.models_used.length} Models
                    </span>
                  </div>
                  {expandedSections.aiAnalysis ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                
                {expandedSections.aiAnalysis && (
                  <div className="p-4 space-y-4">
                    {/* Model Results Grid */}
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="h-4 w-4 text-red-600" />
                          <h4 className="font-bold text-red-700 text-sm">Deepfake Detection</h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Probability:</span>
                            <span className="font-bold text-red-600 text-sm">
                              {Math.round(analysisResult.ai_analysis.deepfake_detection.probability * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {analysisResult.ai_analysis.deepfake_detection.model}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Layers className="h-4 w-4 text-orange-600" />
                          <h4 className="font-bold text-orange-700 text-sm">AI Generation</h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Probability:</span>
                            <span className="font-bold text-orange-600 text-sm">
                              {Math.round(analysisResult.ai_analysis.ai_generation.probability * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {analysisResult.ai_analysis.ai_generation.model}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <h4 className="font-bold text-blue-700 text-sm">Face Manipulation</h4>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Probability:</span>
                            <span className="font-bold text-blue-600 text-sm">
                              {Math.round(analysisResult.ai_analysis.face_manipulation.probability * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {analysisResult.ai_analysis.face_manipulation.manipulation_type}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Models Used */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center text-sm">
                        <Database className="h-4 w-4 mr-2" />
                        AI Models Ensemble
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {analysisResult.ai_analysis.models_used.map((model, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border">
                            <div>
                              <span className="font-medium text-gray-900 text-sm">{model.name}</span>
                              <span className="text-xs text-gray-500 ml-1">v{model.version}</span>
                            </div>
                            <span className="text-xs font-bold text-green-600">
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
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h3 className="text-md font-bold">Content Credentials</h3>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {analysisResult.c2pa_metadata.present ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-700 text-sm">Valid Manifest Found</span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Creator:</span>
                            <span className="text-xs font-medium">{analysisResult.c2pa_metadata.creator}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Signature:</span>
                            <span className={`text-xs font-medium ${
                              analysisResult.c2pa_metadata.signature_valid ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {analysisResult.c2pa_metadata.signature_valid ? 'Valid' : 'Invalid'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-3">
                        <AlertCircle className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">No Content Credentials</p>
                        <p className="text-xs text-gray-500 mt-1">{analysisResult.c2pa_metadata.reason}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <h3 className="text-md font-bold">SynthID Detection</h3>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {analysisResult.synthid_watermark.detected ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="font-medium text-orange-700 text-sm">Watermark Detected</span>
                        </div>
                        
                        <div className="bg-orange-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Type:</span>
                            <span className="text-xs font-medium">{analysisResult.synthid_watermark.watermark_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600">Generator:</span>
                            <span className="text-xs font-medium">{analysisResult.synthid_watermark.generator}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-3">
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <p className="text-green-700 font-medium text-sm">No AI Watermarks</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl border shadow-sm">
                <button 
                  onClick={() => toggleSection('timeline')}
                  className="flex items-center justify-between w-full p-4 border-b"
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <h3 className="text-lg font-bold">Provenance Timeline</h3>
                  </div>
                  {expandedSections.timeline ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                
                {expandedSections.timeline && (
                  <div className="p-4">
                    <div className="space-y-3">
                      {analysisResult.context_timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 pt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              event.risk === 'low' ? 'bg-green-500' :
                              event.risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900 text-sm">{event.event}</span>
                              <span className="text-xs text-gray-500">{event.date}</span>
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
            </>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Ready for Analysis</h3>
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

export default MediaLiteracyPlatform;
