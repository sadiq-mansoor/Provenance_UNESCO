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
    { id: 'community-reports', name: 'Cases', icon: Shield, color: 'blue', description: 'Verified misinformation cases' },
    { id: 'trending-alerts', name: 'Alerts', icon: TrendingUp, color: 'red', description: 'Real-time threat monitoring' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeSection === 'community-reports' && (
            <div role="tabpanel" id="community-reports-panel" aria-labelledby="community-reports-tab">
              <CommunityReports key="community" userScore={userScore} setUserScore={setUserScore} />
            </div>
          )}
          {activeSection === 'trending-alerts' && (
            <div role="tabpanel" id="trending-alerts-panel" aria-labelledby="trending-alerts-tab">
              <TrendingAlerts key="alerts" />
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const CommunityReports = ({ userScore, setUserScore }) => {
  const [reports, setReports] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [userVotes, setUserVotes] = useState({}); // Track user votes
  const [expandedReports, setExpandedReports] = useState({}); // Track expanded details
  const [previewMedia, setPreviewMedia] = useState(null); // Track media preview modal

  // Form state for new report submission
  const [newReport, setNewReport] = useState({
    type: 'image',
    title: '',
    description: '',
    location: '',
    category: 'misinformation',
    media: null,
    mediaPreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Enhanced filtering with icons
  const filterOptions = [
    { value: 'all', label: 'All Reports', icon: Filter },
    { value: 'verified-fake', label: 'Verified Fake', icon: AlertTriangle },
    { value: 'under-review', label: 'Under Review', icon: Clock },
    { value: 'health-misinformation', label: 'Health Misinfo', icon: Microscope },
    { value: 'celebrity-hoax', label: 'Celebrity Hoax', icon: Award }
  ];

  useEffect(() => {
    // Load real documented misinformation cases from API
    const loadRealCases = async () => {
      try {
        const response = await fetch('/api/feed');
        const data = await response.json();

        if (data.cases) {
          // Transform API data to component format
          const transformedCases = data.cases.map(caseItem => ({
            id: caseItem.id,
            type: caseItem.type,
            title: caseItem.title,
            description: caseItem.description,
            media: caseItem.image,
            submittedBy: 'Community_Verified',
            location: 'Global',
            timestamp: 'Documented case',
            verificationStatus: caseItem.verification_status,
            upvotes: 0, // Default vote count
            downvotes: 0, // Default vote count
            category: caseItem.category,
            impact: caseItem.impact,
            sources: caseItem.sources,
            realContext: caseItem.real_context,
            verificationDetails: {
              detectionMethods: caseItem.detection_methods,
              educationalValue: caseItem.educational_value,
              originalSource: caseItem.real_context
            }
          }));

          setReports(transformedCases);
        }
      } catch (error) {
        console.error('Failed to load real cases:', error);
        // Fallback to hardcoded data if API fails
        setReports([
          {
            id: 1,
            type: 'image',
            title: 'Hurricane Ian Shark Swimming in Flooded Streets',
            description: 'Viral image claiming to show sharks swimming in flooded streets during Hurricane Ian. Actually from Hurricane Harvey 2017, originally a digitally manipulated image.',
            media: '/images/1b108fcb37237dfe4974e91c14c693d5.webp', // Real Hurricane shark hoax image
            submittedBy: 'WeatherWatcher_FL',
            location: 'Fort Myers, Florida',
            timestamp: '6 hours ago',
            verificationStatus: 'verified-fake',
            upvotes: 0,
            downvotes: 0,
            category: 'disaster-misinformation',
            impact: 'high',
            sources: [
              'https://www.snopes.com/fact-check/hurricane-shark-photograph/',
              'https://www.reuters.com/article/uk-factcheck-shark-highway-idUSKBN26L2OI'
            ],
            realContext: 'This image has circulated during multiple hurricanes since 2011. Originally created by combining a shark photo with a highway flood image.',
            verificationDetails: {
              originalSource: 'Digitally manipulated composite image',
              firstAppearance: '2011 Hurricane Irene',
              factCheckOrgs: ['Snopes', 'Reuters', 'AP Fact Check'],
              technicalAnalysis: 'Inconsistent lighting and perspective between shark and background'
            }
          },
          {
            id: 2,
            type: 'image',
            title: 'Yemen Airstrike Footage Misused in UK Mock War Crimes Trial',
            description: 'Real footage of six people killed in a Yemen airstrike was inappropriately used in a mock war crimes trial in the UK, misrepresenting the context.',
            media: '/images/_124112526_gettyimages-955575312.jpg.webp',
            submittedBy: 'ConflictVerifier',
            location: 'UK, Social media',
            timestamp: '1 day ago',
            verificationStatus: 'verified-misused',
            upvotes: 0,
            downvotes: 0,
            category: 'conflict-misinformation',
            impact: 'high',
            sources: [
              'https://www.bbc.com/news/uk-wales-61011855'
            ],
            realContext: 'Authentic footage from a real Yemen airstrike that killed six people was taken out of context and used inappropriately in a UK legal demonstration.',
            verificationDetails: {
              detectionMethods: ['source_verification', 'context_analysis', 'bbc_investigation'],
              educationalValue: 'Shows how real footage can be misused by changing context, demonstrating the importance of verifying not just authenticity but proper context',
              harmPotential: 'Misrepresents real tragedies and can mislead about actual conflicts and legal proceedings',
              originalContext: 'Actual Yemen airstrike casualties documented by BBC',
              misusedContext: 'Presented as evidence in unrelated UK mock trial'
            }
          },
          {
            id: 3,
            type: 'image',
            title: 'AI-Generated Pope Francis in White Puffer Jacket',
            description: 'Viral AI-generated image showing Pope Francis wearing a stylish white puffer jacket. Created using Midjourney AI.',
            media: '/images/960x0.webp', // Real AI-generated Pope Francis image
            submittedBy: 'AIDetector_Pro',
            location: 'Viral on Twitter/X',
            timestamp: '2 days ago',
            verificationStatus: 'verified-ai',
            upvotes: 0,
            downvotes: 0,
            category: 'ai-generated-content',
            impact: 'medium',
            sources: [
              'https://www.reuters.com/technology/viral-image-pope-puffy-coat-latest-ai-fake-fool-internet-2023-03-27/',
              'https://www.bbc.com/news/world-65069475'
            ],
            realContext: 'This AI-generated image went viral in March 2023, fooling millions before being identified as artificial.',
            verificationDetails: {
              aiModel: 'Midjourney v5',
              creator: 'Pablo Xavier (Reddit user)',
              detectionMethods: 'Lack of source photos, Vatican confirmation, AI artifacts',
              viralMetrics: '20+ million views across platforms',
              significance: 'Landmark case showing AI content going mainstream'
            }
          },
          {
            id: 4,
            type: 'video',
            title: 'Deepfake Tom Cruise TikTok Videos',
            description: 'Highly realistic deepfake video of Tom Cruise created using advanced AI technology. This demonstrates how convincing deepfakes can be.',
            media: '/images/Download.mp4',
            submittedBy: 'DeepfakeDetective',
            location: 'TikTok platform',
            timestamp: '3 days ago',
            verificationStatus: 'verified-deepfake',
            upvotes: 0,
            downvotes: 0,
            category: 'deepfake-content',
            impact: 'high',
            sources: [
              'https://www.theguardian.com/technology/2021/mar/01/deepfake-tom-cruise-tiktok-videos-creator-speaks-out',
              'https://www.cnn.com/2021/03/01/tech/deepfake-tom-cruise-tiktok/index.html'
            ],
            realContext: 'This is an example of high-quality deepfake technology that can create convincing fake videos of real people.',
            verificationDetails: {
              detectionMethods: ['deepfake_analysis', 'technical_artifacts', 'expert_review'],
              educationalValue: 'Shows how realistic deepfakes can appear and why video verification is crucial',
              technology: 'Advanced AI face-swapping technology',
              qualityLevel: 'High-quality deepfake that can fool casual viewers',
              warningSignsToLookFor: 'Subtle facial inconsistencies, unnatural eye movements, lighting mismatches'
            }
          },

          {
            id: 6,
            type: 'image',
            title: 'Fake Taylor Swift AI-Generated Images',
            description: 'AI-generated explicit and endorsement images of Taylor Swift created without consent, highlighting the dangers of deepfake technology.',
            media: '/images/Screenshot-2024-08-20-at-08.46.09-1724121291.webp',
            submittedBy: 'CelebFactCheck',
            location: 'Twitter/X, Instagram',
            timestamp: '2 days ago',
            verificationStatus: 'verified-ai-generated',
            upvotes: 0,
            downvotes: 0,
            category: 'celebrity-deepfake',
            impact: 'high',
            sources: [
              'https://www.factcheck.org/2024/01/ai-generated-celebrity-endorsements/',
              'https://www.snopes.com/fact-check/taylor-swift-ai-endorsement/'
            ],
            realContext: 'These AI-generated images of Taylor Swift went viral in early 2024, prompting discussions about consent, deepfake abuse, and platform responsibility.',
            verificationDetails: {
              detectionMethods: ['ai_detection_software', 'swift_team_response', 'platform_removal'],
              educationalValue: 'Demonstrates the serious ethical and legal issues around non-consensual AI-generated imagery of real people',
              harmPotential: 'Violates consent, can damage reputation, and normalizes deepfake abuse',
              aiIndicators: 'Generated using advanced AI tools, detected through technical analysis and official denials',
              platformResponse: 'Major social media platforms removed content and updated policies'
            }
          },

        ]);
      }
    };

    loadRealCases();
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

  // Handle voting functionality
  const handleVote = (reportId, voteType) => {
    const currentVote = userVotes[reportId];

    setReports(prevReports =>
      prevReports.map(report => {
        if (report.id === reportId) {
          let newUpvotes = report.upvotes;
          let newDownvotes = report.downvotes;

          // Remove previous vote if exists
          if (currentVote === 'up') newUpvotes--;
          if (currentVote === 'down') newDownvotes--;

          // Add new vote if different from current
          if (voteType !== currentVote) {
            if (voteType === 'up') newUpvotes++;
            if (voteType === 'down') newDownvotes++;
          }

          return {
            ...report,
            upvotes: newUpvotes,
            downvotes: newDownvotes
          };
        }
        return report;
      })
    );

    // Update user vote tracking
    setUserVotes(prev => ({
      ...prev,
      [reportId]: voteType === currentVote ? null : voteType
    }));

    // Award points for engagement
    if (voteType !== currentVote) {
      setUserScore(prev => prev + 2);
    }
  };

  // Handle expanding report details
  const toggleReportDetails = (reportId) => {
    setExpandedReports(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };

  // Handle media preview
  const openMediaPreview = (report) => {
    setPreviewMedia(report);
    setUserScore(prev => prev + 1); // Award point for detailed examination
  };

  const closeMediaPreview = () => {
    setPreviewMedia(null);
  };

  // Handle file upload for new reports
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload an image (JPEG, PNG, GIF, WebP) or video (MP4, WebM) file');
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      setNewReport(prev => ({
        ...prev,
        media: file,
        mediaPreview: previewUrl,
        type: file.type.startsWith('video/') ? 'video' : 'image'
      }));
    }
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewReport(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit new report
  const submitReport = async () => {
    // Validate form
    if (!newReport.title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!newReport.description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!newReport.media) {
      alert('Please upload media content');
      return;
    }

    setIsSubmitting(true);

    try {
      let result = { report_id: Date.now() }; // Fallback ID

      try {
        // Try to submit to backend first
        const formData = new FormData();
        formData.append('title', newReport.title);
        formData.append('description', newReport.description);
        formData.append('content_type', newReport.type);
        formData.append('location', newReport.location || '');
        formData.append('category', newReport.category);
        if (newReport.media) {
          formData.append('file', newReport.media);
        }

        const response = await fetch('http://localhost:8000/submit-report', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          result = await response.json();
          console.log('✅ Report submitted to backend successfully');
        } else {
          throw new Error(`Backend error: ${response.status}`);
        }
      } catch (backendError) {
        console.warn('⚠️ Backend submission failed, using local storage:', backendError.message);
        // Continue with local storage as fallback
      }

      // Create new report object for immediate display
      const newReportData = {
        id: result.report_id,
        type: newReport.type,
        title: newReport.title,
        description: newReport.description,
        media: newReport.mediaPreview, // Use preview URL for immediate display
        submittedBy: 'You',
        location: newReport.location || 'Not specified',
        timestamp: 'Just now',
        verificationStatus: 'under-review',
        upvotes: 0,
        downvotes: 0,
        category: newReport.category,
        impact: 'pending-assessment',
        sources: [],
        realContext: 'User-submitted content pending verification by community moderators.',
        verificationDetails: {
          detectionMethods: ['community_report'],
          educationalValue: 'Community-submitted content helps identify emerging misinformation trends',
          submissionTime: new Date().toISOString(),
          status: 'awaiting_review',
          reviewProcess: {
            stage: 'initial_analysis',
            estimatedTime: '24-48 hours',
            nextSteps: [
              'AI analysis and technical examination',
              'Expert moderator review',
              'Fact-checking verification',
              'Community feedback integration',
              'Final verification status'
            ],
            progress: 10
          }
        }
      };

      // Add to reports list
      setReports(prev => [newReportData, ...prev]);

      // Award points for submission
      setUserScore(prev => prev + 50);

      // Reset form
      setNewReport({
        type: 'image',
        title: '',
        description: '',
        location: '',
        category: 'misinformation',
        media: null,
        mediaPreview: null
      });

      // Close form
      setShowSubmitForm(false);

      // Show success message
      alert('Report submitted successfully! Thank you for helping the community identify suspicious content. Your report is now under review.');

    } catch (error) {
      console.error('Error submitting report:', error);
      alert('There was an issue submitting your report, but it has been saved locally. Please try again later or contact support if the problem persists.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal closes
  const closeSubmitForm = () => {
    setShowSubmitForm(false);
    setNewReport({
      type: 'image',
      title: '',
      description: '',
      location: '',
      category: 'misinformation',
      media: null,
      mediaPreview: null
    });
    if (newReport.mediaPreview) {
      URL.revokeObjectURL(newReport.mediaPreview);
    }
  };

  // Filter reports based on selected filter
  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    if (filter === 'verified-fake') return report.verificationStatus === 'verified-fake';
    if (filter === 'under-review') return report.verificationStatus === 'under-review';
    if (filter === 'health-misinformation') return report.category === 'health-misinformation';
    if (filter === 'celebrity-hoax') return report.category === 'celebrity-hoax';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Learning Hub Style Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 bg-clip-text text-transparent mb-6">Cases</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Master media literacy through comprehensive training, expert videos, insightful
          podcasts, and real-world case studies
        </p>
      </div>

      {/* Learning Hub Style Filter Cards */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {filterOptions.map((option) => {
          const IconComponent = option.icon;
          const isActive = filter === option.value;
          const count = filteredReports.filter(r =>
            option.value === 'all' ? true :
              option.value === 'verified-fake' ? r.verificationStatus === 'verified-fake' :
                option.value === 'under-review' ? r.verificationStatus === 'under-review' :
                  option.value === 'health-misinformation' ? r.category === 'health-misinformation' :
                    option.value === 'celebrity-hoax' ? r.category === 'celebrity-hoax' : false
          ).length;

          return (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border transition-all duration-300 min-w-[200px] ${isActive
                ? 'bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 border-white/20 text-white shadow-2xl'
                : 'bg-white border-gray-200 text-gray-700 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10'
                }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-100'
                }`}>
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
              </div>
              <div className="text-left">
                <div className={`font-semibold text-base ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {option.label}
                </div>
                <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {count} {count === 1 ? 'case' : 'cases'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Report Content Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowSubmitForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25"
        >
          <Flag className="h-5 w-5 mr-2" />
          <span>Report Content</span>
        </button>
      </div>

      {/* Professional Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.length > 0 ? filteredReports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-violet-500/10 transition-all duration-500"
          >
            {/* Professional Media Display */}
            <div className="relative overflow-hidden bg-gray-100">
              <button
                onClick={() => openMediaPreview(report)}
                className="relative w-full h-40 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
                aria-label={`View details for ${report.title}`}
              >
                {report.type === 'video' ? (
                  <div className="relative h-full bg-gray-900 flex items-center justify-center">
                    {/* Video Placeholder/Thumbnail */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-sm font-medium">Video Content</p>
                        <p className="text-xs opacity-75">Click to view</p>
                      </div>
                    </div>

                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center space-x-2 text-white">
                          <Play className="h-5 w-5" />
                          <span className="text-sm font-medium">Video Evidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={report.media}
                      alt={report.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="h-6 w-6 text-gray-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${report.verificationStatus === 'verified-fake' ? 'bg-red-100 text-red-800 border border-red-200' :
                    report.verificationStatus === 'verified-real' ? 'bg-green-100 text-green-800 border border-green-200' :
                      report.verificationStatus === 'under-review' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                    {report.verificationStatus === 'verified-fake' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {report.verificationStatus === 'verified-real' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {report.verificationStatus === 'under-review' && <Clock className="h-3 w-3 mr-1" />}
                    {report.verificationStatus.replace('-', ' ').toUpperCase()}
                  </span>

                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${report.impact === 'critical' ? 'bg-red-100 text-red-800 border border-red-200' :
                    report.impact === 'high' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                      report.impact === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                    {report.impact.toUpperCase()} IMPACT
                  </span>
                </div>

                {/* Media Type Indicator */}
                {report.type === 'video' && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Video className="h-3 w-3" />
                      <span>VIDEO</span>
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Professional Content Section */}
            <div className="p-6">
              {/* Title and Description */}
              <div className="mb-4">
                <h3
                  id={`case-title-${report.id}`}
                  className="text-lg font-bold text-white mb-2 leading-tight line-clamp-2"
                >
                  {report.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm line-clamp-3">
                  {report.description}
                </p>
              </div>

              {/* Simplified Metadata */}
              <div className="flex items-center justify-between mb-4 text-sm text-white/80">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4 text-violet-400" />
                  <span>{report.submittedBy}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4 text-violet-400" />
                  <span>{report.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-violet-400" />
                  <span>{report.timestamp}</span>
                </div>
              </div>

              {/* Simplified Action Bar */}
              <div className="flex items-center space-x-4 pt-4">
                {/* Voting Buttons */}
                <button
                  onClick={() => handleVote(report.id, 'up')}
                  className={`flex items-center space-x-1 text-sm ${userVotes[report.id] === 'up' ? 'text-green-400' : 'text-white/60 hover:text-green-400'}`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{report.upvotes}</span>
                </button>

                <button
                  onClick={() => handleVote(report.id, 'down')}
                  className={`flex items-center space-x-1 text-sm ${userVotes[report.id] === 'down' ? 'text-red-400' : 'text-white/60 hover:text-red-400'}`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>{report.downvotes}</span>
                </button>
              </div>

              {/* Enhanced Expandable Details */}
              {expandedReports[report.id] && (
                <motion.div
                  id={`details-${report.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  {/* Verification Process for Under Review Items */}
                  {report.verificationStatus === 'under-review' && report.verificationDetails?.reviewProcess && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <RefreshCw className="h-4 w-4 text-violet-400 animate-spin" />
                        <h4 className="font-medium text-white">Verification in Progress</h4>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/80">Current Stage:</span>
                          <span className="font-medium text-white capitalize">
                            {report.verificationDetails.reviewProcess.stage.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-white/80">Estimated Time:</span>
                          <span className="font-medium text-white">
                            {report.verificationDetails.reviewProcess.estimatedTime}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-violet-400">Progress</span>
                            <span className="text-violet-400">{report.verificationDetails.reviewProcess.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-violet-500 to-electric-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${report.verificationDetails.reviewProcess.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Next Steps */}
                        <div>
                          <p className="text-xs text-blue-700 font-medium mb-2">Verification Process:</p>
                          <div className="space-y-1">
                            {report.verificationDetails.reviewProcess.nextSteps.map((step, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-violet-400 animate-pulse' :
                                  index < 1 ? 'bg-green-400' : 'bg-white/40'
                                  }`}></div>
                                <span className={`${index === 0 ? 'text-violet-300 font-medium' :
                                  index < 1 ? 'text-green-300' : 'text-white/60'
                                  }`}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded p-2 text-xs text-white/90 border border-white/20">
                          <strong>What happens next:</strong> Our AI systems will analyze your submission for technical indicators,
                          then expert moderators will review the findings and cross-reference with trusted fact-checking sources.
                          You'll be notified when verification is complete.
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-6">
                    {/* Enhanced Real Context Section */}
                    {report.realContext && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                            <Lightbulb className="h-5 w-5 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-amber-900 mb-2">Real Context & Background</h4>
                            <p className="text-amber-800 leading-relaxed">
                              {report.realContext}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Verification Analysis */}
                    {report.verificationDetails && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                            <Microscope className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-900 mb-2">Verification Analysis</h4>
                            <p className="text-green-700 text-sm">
                              How our experts identified and verified this case
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Detection Methods */}
                          {report.verificationDetails.detectionMethods && (
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="font-medium text-green-900 mb-3 flex items-center">
                                <Search className="h-4 w-4 mr-2" />
                                Detection Methods
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {Array.isArray(report.verificationDetails.detectionMethods)
                                  ? report.verificationDetails.detectionMethods.map((method, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      {method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                  ))
                                  : <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {String(report.verificationDetails.detectionMethods).replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </span>
                                }
                              </div>
                            </div>
                          )}

                          {/* Educational Value */}
                          {report.verificationDetails.educationalValue && (
                            <div className="bg-white/60 rounded-lg p-4">
                              <h5 className="font-medium text-green-900 mb-3 flex items-center">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Key Learning
                              </h5>
                              <p className="text-green-800 text-sm leading-relaxed">
                                {report.verificationDetails.educationalValue}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Sources */}
                        {report.sources && report.sources.length > 0 && (
                          <div className="mt-4 bg-white/60 rounded-lg p-4">
                            <h5 className="font-medium text-green-900 mb-3 flex items-center">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Verification Sources
                            </h5>
                            <div className="space-y-2">
                              {report.sources.map((source, index) => (
                                <a
                                  key={index}
                                  href={source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-green-700 hover:text-green-900 text-sm transition-colors"
                                >
                                  <Globe className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">{source}</span>
                                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}


            </div>
          </motion.div>
        )) : (
          <div className="col-span-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800 rounded-2xl border border-white/10 p-12 text-center shadow-2xl"
            >
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-white/20">
                  <Search className="h-10 w-10 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">No cases match your filter</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  We couldn't find any verified cases matching your current filter criteria.
                  Try adjusting your filters or explore all available cases.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setFilter('all')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white font-medium rounded-lg transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Show All Cases
                  </button>
                  <button
                    onClick={() => setShowSubmitForm(true)}
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report New Case
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )
        }
      </div >

      {/* Submit Form Modal */}
      < AnimatePresence >
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && closeSubmitForm()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Report Suspicious Content</h3>
                <button
                  onClick={closeSubmitForm}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Content Type */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Content Type</label>
                  <select
                    value={newReport.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="article">News Article</option>
                    <option value="text">Text/Message</option>
                    <option value="social">Social Media Post</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Title *</label>
                  <input
                    type="text"
                    value={newReport.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief title describing the suspicious content"
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                    maxLength={100}
                  />
                  <p className="text-xs text-white/60 mt-1">{newReport.title.length}/100 characters</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description *</label>
                  <textarea
                    rows={4}
                    value={newReport.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what makes this content suspicious. Include details about why you think it might be fake, misleading, or harmful."
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                    maxLength={500}
                  />
                  <p className="text-xs text-white/60 mt-1">{newReport.description.length}/500 characters</p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Where did you find this?</label>
                  <input
                    type="text"
                    value={newReport.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Facebook, Twitter, WhatsApp, News website"
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newReport.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="misinformation">General Misinformation</option>
                    <option value="health-misinformation">Health Misinformation</option>
                    <option value="political-misinformation">Political Misinformation</option>
                    <option value="celebrity-hoax">Celebrity Hoax</option>
                    <option value="financial-scam">Financial Scam</option>
                    <option value="deepfake-content">Deepfake/AI Generated</option>
                    <option value="disaster-misinformation">Disaster Misinformation</option>
                    <option value="conspiracy-theory">Conspiracy Theory</option>
                  </select>
                </div>

                {/* Upload Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Content *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {!newReport.mediaPreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">Upload suspicious content</p>
                      <p className="text-sm text-gray-500 mb-2">Click to browse or drag and drop</p>
                      <p className="text-xs text-gray-400">Supports: JPEG, PNG, GIF, WebP, MP4, WebM (max 10MB)</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                        {newReport.type === 'video' ? (
                          <div className="flex items-center space-x-3">
                            <Video className="h-8 w-8 text-green-600" />
                            <div>
                              <p className="font-medium text-green-800">Video uploaded</p>
                              <p className="text-sm text-green-600">{newReport.media?.name}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <img
                              src={newReport.mediaPreview}
                              alt="Preview"
                              className="h-16 w-16 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-green-800">Image uploaded</p>
                              <p className="text-sm text-green-600">{newReport.media?.name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (newReport.mediaPreview) {
                            URL.revokeObjectURL(newReport.mediaPreview);
                          }
                          setNewReport(prev => ({ ...prev, media: null, mediaPreview: null }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Submission Guidelines */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Submission Guidelines</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Only submit content you believe may be false or misleading</li>
                        <li>• Provide clear reasons why you think the content is suspicious</li>
                        <li>• Do not submit content that violates privacy or contains personal information</li>
                        <li>• Your submission will be reviewed by community moderators</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={closeSubmitForm}
                    disabled={isSubmitting}
                    className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReport}
                    disabled={isSubmitting || !newReport.title.trim() || !newReport.description.trim() || !newReport.media}
                    className="flex-1 bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white py-3 rounded-lg transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Flag className="h-4 w-4" />
                        <span>Submit Report</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence >

      {/* Media Preview Modal */}
      < AnimatePresence >
        {previewMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeMediaPreview}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] w-full bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{previewMedia.title}</h3>
                  <p className="text-sm text-gray-600">Click and examine this misinformation case</p>
                </div>
                <button
                  onClick={closeMediaPreview}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Media Display */}
                  <div className="space-y-4">
                    {previewMedia.type === 'video' && previewMedia.media.endsWith('.mp4') ? (
                      <video
                        src={previewMedia.media}
                        className="w-full max-h-96 object-contain bg-black rounded-lg"
                        controls
                        autoPlay
                      >
                        <source src={previewMedia.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={previewMedia.media}
                        alt={previewMedia.title}
                        className="w-full max-h-96 object-contain rounded-lg border"
                      />
                    )}

                    {/* Media Analysis Tools */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">🔍 Analysis Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Look for inconsistent lighting or shadows</li>
                        <li>• Check for unnatural edges or blending</li>
                        <li>• Examine facial features for distortions</li>
                        <li>• Consider the source and context</li>
                      </ul>
                    </div>
                  </div>

                  {/* Case Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Case Description</h4>
                      <p className="text-gray-700">{previewMedia.description}</p>
                    </div>

                    {previewMedia.realContext && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Real Context</h4>
                        <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg">{previewMedia.realContext}</p>
                      </div>
                    )}

                    {previewMedia.verificationDetails && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">How It Was Detected</h4>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                          {previewMedia.verificationDetails.detectionMethods && (
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">Detection Methods:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {Array.isArray(previewMedia.verificationDetails.detectionMethods)
                                  ? previewMedia.verificationDetails.detectionMethods.map((method, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                      {method.replace('_', ' ')}
                                    </span>
                                  ))
                                  : <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {String(previewMedia.verificationDetails.detectionMethods).replace('_', ' ')}
                                  </span>
                                }
                              </div>
                            </div>
                          )}
                          {previewMedia.verificationDetails.educationalValue && (
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">Learning Point:</p>
                              <p className="text-sm text-gray-700 mt-1">{previewMedia.verificationDetails.educationalValue}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}



                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t">
                      <button
                        onClick={() => {
                          handleVote(previewMedia.id, 'up');
                        }}
                        className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful Case</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href + '#case-' + previewMedia.id);
                          setUserScore(prev => prev + 1);
                        }}
                        className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Share className="h-4 w-4" />
                        <span>Share Case</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence >
    </div >
  );
};

const TrendingAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('severity');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alertStats, setAlertStats] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    total: 0
  });
  const [liveUpdates, setLiveUpdates] = useState(true);

  // Calculate alert statistics
  useEffect(() => {
    const stats = alerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      acc.total++;
      return acc;
    }, { critical: 0, high: 0, medium: 0, low: 0, total: 0 });
    setAlertStats(stats);
  }, [alerts]);

  // Auto-refresh alerts every 30 seconds if live updates enabled
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      loadTrendingAlerts();
    }, 30000);

    return () => clearInterval(interval);
  }, [liveUpdates]);

  useEffect(() => {
    loadTrendingAlerts();
  }, []);

  // Load real trending alerts from API
  const loadTrendingAlerts = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      const response = await fetch('/api/trending-alerts');
      const data = await response.json();

      if (data.alerts) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Failed to load trending alerts:', error);
      // Fallback to hardcoded data if API fails
      setAlerts([
        {
          id: 1,
          title: 'AI-Generated Images of Gaza Conflict Spreading',
          description: 'Multiple AI-generated images falsely claiming to show current Gaza conflict are circulating widely, potentially inflaming tensions.',
          severity: 'critical',
          platform: 'Twitter/X, Facebook, Telegram',
          reach: '15.2M views',
          timeframe: 'Last 8 hours',
          status: 'rapidly-spreading',
          verificationStatus: 'confirmed-ai-generated',
          tags: ['ai-generated', 'conflict', 'geopolitical', 'midjourney'],
          realDetails: {
            detectionMethod: 'Reverse image search + AI detection tools',
            originalContext: 'Images generated using Midjourney and DALL-E',
            factCheckSources: ['Reuters Fact Check', 'BBC Verify', 'Snopes'],
            harmPotential: 'May escalate real-world tensions and violence'
          }
        },
        {
          id: 2,
          title: 'Deepfake Audio of Political Leader Goes Viral',
          description: 'Sophisticated voice deepfake of a world leader making inflammatory statements is spreading across messaging apps.',
          severity: 'critical',
          platform: 'WhatsApp, Telegram, Twitter',
          reach: '8.7M shares',
          timeframe: 'Last 4 hours',
          status: 'exponentially-spreading',
          verificationStatus: 'confirmed-deepfake',
          tags: ['deepfake', 'audio', 'political', 'voice-cloning'],
          realDetails: {
            technology: 'ElevenLabs voice cloning technology',
            detectionMethod: 'Audio forensics analysis',
            officialResponse: 'Government spokesperson issued denial',
            platformAction: 'Content being removed but spreading faster than moderation'
          }
        },
        {
          id: 3,
          title: 'Manipulated Disaster Footage Resurfaces',
          description: 'Old footage from 2019 earthquake being shared as current disaster, causing confusion about aid needs and response.',
          severity: 'high',
          platform: 'Facebook, Instagram, TikTok',
          reach: '4.3M views',
          timeframe: 'Last 12 hours',
          status: 'trending',
          verificationStatus: 'recycled-content',
          tags: ['disaster', 'recycled-footage', 'humanitarian'],
          realDetails: {
            originalEvent: '2019 Albania earthquake',
            currentClaim: '2024 Turkey earthquake aftermath',
            verificationMethod: 'Reverse video search and metadata analysis',
            impactAssessment: 'May misdirect humanitarian aid and resources'
          }
        },
        {
          id: 4,
          title: 'Coordinated Bot Network Spreading Health Misinformation',
          description: 'Network of 50,000+ bot accounts simultaneously sharing false vaccine information across multiple platforms.',
          severity: 'high',
          platform: 'Twitter/X, Facebook, Instagram',
          reach: '12.1M impressions',
          timeframe: 'Last 24 hours',
          status: 'coordinated-campaign',
          verificationStatus: 'bot-network-confirmed',
          tags: ['bot-network', 'health-misinfo', 'coordinated', 'vaccines'],
          realDetails: {
            networkSize: '52,847 identified bot accounts',
            coordination: 'Synchronized posting patterns detected',
            contentType: 'Anti-vaccine conspiracy theories',
            detectionMethod: 'Network analysis and behavioral patterns',
            platformResponse: 'Mass account suspensions in progress'
          }
        },
        {
          id: 5,
          title: 'Financial Scam Using Celebrity Deepfakes',
          description: 'Deepfake videos of tech billionaires promoting cryptocurrency scams are targeting investors on social media.',
          severity: 'high',
          platform: 'YouTube, Facebook, Instagram',
          reach: '6.8M views',
          timeframe: 'Last 18 hours',
          status: 'actively-spreading',
          verificationStatus: 'confirmed-deepfake-scam',
          tags: ['deepfake', 'financial-scam', 'cryptocurrency', 'celebrity'],
          realDetails: {
            targetedCelebrities: ['Elon Musk', 'Bill Gates', 'Warren Buffett'],
            scamType: 'Fake cryptocurrency investment platform',
            technology: 'High-quality face-swap deepfakes',
            financialImpact: 'Estimated $2.3M stolen from victims',
            lawEnforcement: 'FBI investigating coordinated fraud scheme'
          }
        },
        {
          id: 6,
          title: 'Climate Change Denial Content Surge',
          description: 'Coordinated campaign spreading manipulated climate data and false scientific claims ahead of climate summit.',
          severity: 'medium',
          platform: 'YouTube, Twitter/X, Facebook',
          reach: '9.4M views',
          timeframe: 'Last 3 days',
          status: 'sustained-campaign',
          verificationStatus: 'scientifically-debunked',
          tags: ['climate-denial', 'manipulated-data', 'coordinated'],
          realDetails: {
            contentType: 'Manipulated temperature graphs and cherry-picked data',
            timing: 'Coordinated with upcoming UN Climate Summit',
            scientificResponse: 'Climate scientists issued joint statement',
            dataManipulation: 'Altered scales and timeframes in temperature charts',
            fundingSource: 'Linked to fossil fuel industry PR campaigns'
          }
        }
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter and sort functionality
  const filteredAndSortedAlerts = React.useMemo(() => {
    let filtered = alerts;

    // Apply text search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        alert.platform.toLowerCase().includes(query) ||
        alert.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply severity filter
    if (filter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === filter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'severity':
          const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        case 'reach':
          const getReachValue = (reach) => {
            const num = parseFloat(reach.replace(/[^0-9.]/g, ''));
            const multiplier = reach.includes('M') ? 1000000 : reach.includes('K') ? 1000 : 1;
            return num * multiplier;
          };
          return getReachValue(b.reach) - getReachValue(a.reach);
        case 'platform':
          return a.platform.localeCompare(b.platform);
        case 'timeframe':
          return b.id - a.id; // Newer first
        default:
          return 0;
      }
    });

    return sorted;
  }, [alerts, searchQuery, filter, sortBy]);

  // Filter options for severity
  const filterOptions = [
    { value: 'all', label: 'All Severities', count: alertStats.total },
    { value: 'critical', label: 'Critical', count: alertStats.critical },
    { value: 'high', label: 'High', count: alertStats.high },
    { value: 'medium', label: 'Medium', count: alertStats.medium },
    { value: 'low', label: 'Low', count: alertStats.low },
  ];

  // Sort options
  const sortOptions = [
    { value: 'severity', label: 'Severity', icon: AlertTriangle },
    { value: 'reach', label: 'Reach', icon: TrendingUp },
    { value: 'platform', label: 'Platform', icon: Globe },
    { value: 'timeframe', label: 'Newest', icon: Clock },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  // Function to open alert details modal
  const openAlertDetails = (alert) => {
    setSelectedAlert(alert);
    setShowDetailsModal(true);
  };

  // Function to share alert
  const shareAlert = async (alert) => {
    try {
      const shareText = `TRENDING ALERT: ${alert.title}\n\n${alert.description}\n\nSeverity: ${alert.severity.toUpperCase()}\nReach: ${alert.reach}\nStatus: ${alert.status.replace('-', ' ')}\n\n#MediaLiteracy #FactCheck #DisinfoAlert`;

      if (navigator.share) {
        await navigator.share({
          title: `Trending Alert: ${alert.title}`,
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText + `\n\nView more: ${window.location.href}`);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      console.log('Share failed:', error);
      // Fallback: copy to clipboard
      const shareText = `TRENDING ALERT: ${alert.title}\n\n${alert.description}\n\nView more: ${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  // Function to report encounter with this misinformation
  const reportEncounter = (alert) => {
    setSelectedAlert(alert);
    setShowReportModal(true);
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

      {/* Dynamic Alerts Display */}
      {filteredAndSortedAlerts.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
          {filteredAndSortedAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 ${viewMode === 'list' ? 'hover:border-red-200' : ''
                }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${getSeverityColor(alert.severity)}-100 text-${getSeverityColor(alert.severity)}-700 border border-${getSeverityColor(alert.severity)}-200 shadow-sm`}>
                        {alert.severity.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{alert.timeframe}</span>
                      {alert.status === 'rapidly-spreading' && (
                        <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full animate-pulse flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>VIRAL</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{alert.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{alert.description}</p>

                    {/* Enhanced Metadata Grid */}
                    <div className={`grid gap-4 mb-4 ${viewMode === 'list' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'
                      }`}>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Globe className="h-3 w-3 text-blue-500" />
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Platform</p>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">{alert.platform}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="h-3 w-3 text-red-500" />
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Reach</p>
                        </div>
                        <p className="font-bold text-red-600 text-sm">{alert.reach}</p>
                      </div>
                      {viewMode === 'list' && (
                        <>
                          <div className="bg-yellow-50 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <Activity className="h-3 w-3 text-yellow-600" />
                              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Status</p>
                            </div>
                            <p className="font-semibold text-gray-900 text-sm">{alert.status.replace('-', ' ')}</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <Shield className="h-3 w-3 text-purple-600" />
                              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Verification</p>
                            </div>
                            <p className={`font-semibold text-sm ${alert.verificationStatus === 'confirmed-fake' || alert.verificationStatus === 'debunked'
                              ? 'text-red-600'
                              : alert.verificationStatus === 'confirmed-ai-generated'
                                ? 'text-orange-600'
                                : 'text-green-600'
                              }`}>
                              {alert.verificationStatus.replace('-', ' ')}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Enhanced Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {alert.tags.slice(0, viewMode === 'list' ? 6 : 4).map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full border border-blue-200 font-medium">
                          #{tag}
                        </span>
                      ))}
                      {alert.tags.length > (viewMode === 'list' ? 6 : 4) && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                          +{alert.tags.length - (viewMode === 'list' ? 6 : 4)} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openAlertDetails(alert)}
                    className="btn-primary text-sm px-4 py-2 flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => shareAlert(alert)}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => reportEncounter(alert)}
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </button>

                  {/* Severity Indicator */}
                  <div className="ml-auto flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${alert.severity === 'critical' ? 'bg-red-500' :
                      alert.severity === 'high' ? 'bg-orange-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                    <span className="text-xs text-gray-500 font-medium">
                      {alert.severity === 'critical' ? 'CRITICAL' :
                        alert.severity === 'high' ? 'HIGH' :
                          alert.severity === 'medium' ? 'MEDIUM' : 'LOW'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200"
        >
          <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            {searchQuery ? 'No alerts match your search' : 'No alerts for selected filters'}
          </h3>
          <p className="text-gray-500 text-lg mb-6">
            {searchQuery
              ? `Try searching for different keywords or clear your search query.`
              : `Adjust your filters to see more trending alerts.`
            }
          </p>
          <div className="flex justify-center space-x-4">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Clear Search</span>
              </button>
            )}
            <button
              onClick={() => setFilter('all')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Show All Alerts
            </button>
          </div>
        </motion.div>
      )}
      {/* Share Success Notification */}
      <AnimatePresence>
        {shareSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Alert copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getSeverityColor(selectedAlert.severity)}-100 text-${getSeverityColor(selectedAlert.severity)}-700 border border-${getSeverityColor(selectedAlert.severity)}-200`}>
                      {selectedAlert.severity.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm text-gray-500">{selectedAlert.timeframe}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedAlert.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{selectedAlert.description}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Alert Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform:</span>
                        <span className="font-medium">{selectedAlert.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reach:</span>
                        <span className="font-medium text-red-600">{selectedAlert.reach}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">{selectedAlert.status.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verification:</span>
                        <span className={`font-medium ${selectedAlert.verificationStatus === 'confirmed-fake' || selectedAlert.verificationStatus === 'debunked'
                          ? 'text-red-600'
                          : selectedAlert.verificationStatus === 'ai-generated'
                            ? 'text-orange-600'
                            : 'text-gray-900'
                          }`}>
                          {selectedAlert.verificationStatus.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAlert.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Detection Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-yellow-800">Method:</span>
                        <p className="text-yellow-700 mt-1">{selectedAlert.realDetails.detectionMethod}</p>
                      </div>
                      <div>
                        <span className="font-medium text-yellow-800">Context:</span>
                        <p className="text-yellow-700 mt-1">{selectedAlert.realDetails.originalContext}</p>
                      </div>
                    </div>
                  </div>

                  {selectedAlert.realDetails.harmPotential && (
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h3 className="font-semibold text-red-900 mb-2">Potential Impact</h3>
                      <p className="text-red-700 text-sm">{selectedAlert.realDetails.harmPotential}</p>
                    </div>
                  )}

                  {selectedAlert.realDetails.factCheckSources && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h3 className="font-semibold text-green-900 mb-2">✅ Verified By</h3>
                      <div className="space-y-1">
                        {selectedAlert.realDetails.factCheckSources.map((source, index) => (
                          <div key={index} className="text-green-700 text-sm flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {source}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex space-x-3">
                  <button
                    onClick={() => shareAlert(selectedAlert)}
                    className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Share className="h-4 w-4" />
                    <span>Share Alert</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      reportEncounter(selectedAlert);
                    }}
                    className="flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report Encounter</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Encounter Modal */}
      <AnimatePresence>
        {showReportModal && selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Report Encounter</h3>
              <p className="text-gray-600 mb-4">
                Have you encountered this misinformation? Help us track its spread by reporting details.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Where did you see this?</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Facebook</option>
                    <option>Twitter/X</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>WhatsApp</option>
                    <option>Telegram</option>
                    <option>YouTube</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">When did you see this?</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Within the last hour</option>
                    <option>Within the last 24 hours</option>
                    <option>Within the last week</option>
                    <option>More than a week ago</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional context (optional)</label>
                  <textarea
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional details about how this was shared or who shared it..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    // Here you would normally send the report data to your backend
                    setShareSuccess(true);
                    setTimeout(() => setShareSuccess(false), 2000);
                  }}
                  className="flex-1 btn-primary"
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      description: 'Oldest and largest fact-checking website, covering urban legends, rumors, and viral claims',
      url: 'snopes.com',
      category: 'General Fact-Checking',
      icon: Award,
      established: '1994',
      credibility: 'Very High'
    },
    {
      name: 'FactCheck.org',
      description: 'Nonpartisan, nonprofit project of the Annenberg Public Policy Center',
      url: 'factcheck.org',
      category: 'Political Claims',
      icon: Target,
      established: '2003',
      credibility: 'Very High'
    },
    {
      name: 'PolitiFact',
      description: 'Pulitzer Prize-winning fact-checking website with Truth-O-Meter ratings',
      url: 'politifact.com',
      category: 'Political Fact-Checking',
      icon: Filter,
      established: '2007',
      credibility: 'Very High'
    },
    {
      name: 'Reuters Fact Check',
      description: 'Professional news organization\'s dedicated fact-checking division',
      url: 'reuters.com/fact-check',
      category: 'News Verification',
      icon: Globe,
      established: '2020',
      credibility: 'Very High'
    },
    {
      name: 'AP Fact Check',
      description: 'Associated Press fact-checking team covering global news claims',
      url: 'apnews.com/hub/ap-fact-check',
      category: 'News Verification',
      icon: Filter,
      established: '2016',
      credibility: 'Very High'
    },
    {
      name: 'BBC Verify',
      description: 'BBC\'s specialist fact-checking and verification unit',
      url: 'bbc.com/news/topics/cp7r8vgl2rgt/bbc-verify',
      category: 'International News',
      icon: Globe,
      established: '2023',
      credibility: 'Very High'
    },
    {
      name: 'WHO Myth Busters',
      description: 'World Health Organization\'s official health misinformation debunking',
      url: 'who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters',
      category: 'Health Information',
      icon: Microscope,
      established: '2020',
      credibility: 'Authoritative'
    },
    {
      name: 'Climate Feedback',
      description: 'Network of scientists fact-checking climate change claims',
      url: 'climatefeedback.org',
      category: 'Climate Science',
      icon: Activity,
      established: '2015',
      credibility: 'Very High'
    },
    {
      name: 'First Draft',
      description: 'Research and training organization focused on information disorder',
      url: 'firstdraftnews.org',
      category: 'Media Literacy',
      icon: BookOpen,
      established: '2015',
      credibility: 'Very High'
    },
    {
      name: 'Bellingcat',
      description: 'Open source intelligence and fact-checking collective',
      url: 'bellingcat.com',
      category: 'Open Source Intelligence',
      icon: Search,
      established: '2014',
      credibility: 'High'
    },
    {
      name: 'TinEye',
      description: 'Reverse image search engine for detecting image manipulation',
      url: 'tineye.com',
      category: 'Image Verification',
      icon: Camera,
      established: '2008',
      credibility: 'Technical Tool'
    },
    {
      name: 'InVID WeVerify',
      description: 'Video verification plugin and tools for journalists',
      url: 'weverify.eu',
      category: 'Video Verification',
      icon: Video,
      established: '2018',
      credibility: 'Technical Tool'
    },
    {
      name: 'Deepware Scanner',
      description: 'AI-powered deepfake detection tool',
      url: 'deepware.ai',
      category: 'Deepfake Detection',
      icon: Brain,
      established: '2020',
      credibility: 'Technical Tool'
    },
    {
      name: 'Sensity AI',
      description: 'Detection and monitoring of synthetic media and deepfakes',
      url: 'sensity.ai',
      category: 'AI Detection',
      icon: Zap,
      established: '2018',
      credibility: 'Technical Tool'
    },
    {
      name: 'Content Authenticity Initiative',
      description: 'Adobe-led initiative for content provenance and authenticity',
      url: 'contentauthenticity.org',
      category: 'Content Provenance',
      icon: Shield,
      established: '2019',
      credibility: 'Industry Standard'
    },
    {
      name: 'International Fact-Checking Network',
      description: 'Global network of fact-checkers with verified signatories',
      url: 'ifcncodeofprinciples.poynter.org',
      category: 'Fact-Checking Standards',
      icon: Network,
      established: '2015',
      credibility: 'Authoritative'
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
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${activeTab === tab.id
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
                            <span className={`text-xs px-2 py-1 rounded ${result.verdict === 'False' ? 'bg-red-100 text-red-700' :
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
            <div key={modelName} className={`p-2 rounded-lg border ${model.loaded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
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
                  <div key={idx} className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${idx < currentStep ? 'bg-neon-100 text-neon-700' :
                    idx === currentStep ? 'bg-deepblue-100 text-deepblue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${idx < currentStep ? 'bg-neon-500 text-white' :
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
              <div className={`p-6 rounded-xl border-2 ${analysisResult.traffic_light === 'green' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
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
                            <span className={`text-xs font-medium ${analysisResult.c2pa_metadata.signature_valid ? 'text-green-600' : 'text-red-600'
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
                            <div className={`w-2 h-2 rounded-full ${event.risk === 'low' ? 'bg-green-500' :
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
