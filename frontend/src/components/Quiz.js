import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Brain, 
  Trophy, 
  RotateCcw, 
  AlertTriangle, 
  Search, 
  Eye, 
  Shield,
  Clock,
  Globe,
  Users,
  Star,
  Lightbulb,
  Target,
  Camera,
  MessageSquare,
  TrendingUp,
  Zap,
  Database,
  Mic,
  Video,
  Activity,
  Network,
  Bot,
  Fingerprint,
  Headphones,
  Smartphone,
  Monitor,
  Wifi,
  Hash,
  Play,
  Pause,
  Volume2,
  Download,
  Share2,
  BookOpen,
  Award,
  Settings,
  HelpCircle,
  BarChart3,
  PieChart,
  ArrowRight,
  ChevronDown,
  Filter,
  RefreshCw,
  ExternalLink,
  Copy,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Calendar,
  UserCheck,
  Verified,
  Info,
  Wrench,
  GameController2,
  GraduationCap,
  Certificate,
  Progress,
  Timer,
  Lock,
  Unlock,
  Layers,
  ScanLine,
  Microscope,
  Radar,
  Crosshair
} from 'lucide-react';

// Interactive Simulation Component for Media Analysis
const InteractiveSimulation = ({ type, mediaUrl, onAnalysisComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [analysisTools, setAnalysisTools] = useState({
    frameByFrame: false,
    facialLandmarks: false,
    spectralAnalysis: false,
    motionDetection: false,
    pixelAnalysis: false,
    compressionArtifacts: false
  });
  const [detectedClues, setDetectedClues] = useState([]);
  const [simulationResults, setSimulationResults] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Simulated deepfake detection results
  const simulateDeepfakeDetection = () => {
    const clues = [
      { type: 'facial', description: 'Inconsistent facial landmarks around mouth area', confidence: 87 },
      { type: 'temporal', description: 'Unnatural blinking pattern detected', confidence: 94 },
      { type: 'compression', description: 'Different compression artifacts on face vs background', confidence: 76 },
      { type: 'lighting', description: 'Inconsistent lighting direction on facial features', confidence: 82 }
    ];
    setDetectedClues(clues);
    setSimulationResults({ 
      overallConfidence: 85, 
      verdict: 'Likely Deepfake',
      riskLevel: 'High'
    });
    onAnalysisComplete && onAnalysisComplete(clues);
  };

  const simulateAudioAnalysis = () => {
    const clues = [
      { type: 'spectral', description: 'Unnatural formant frequencies in vowels', confidence: 89 },
      { type: 'prosodic', description: 'Inconsistent pitch patterns', confidence: 78 },
      { type: 'artifacts', description: 'Digital artifacts in high-frequency range', confidence: 92 },
      { type: 'temporal', description: 'Micro-pauses suggesting splicing', confidence: 71 }
    ];
    setDetectedClues(clues);
    setSimulationResults({ 
      overallConfidence: 83, 
      verdict: 'Likely Voice Clone',
      riskLevel: 'High'
    });
    onAnalysisComplete && onAnalysisComplete(clues);
  };

  const toggleTool = (tool) => {
    setAnalysisTools(prev => ({ ...prev, [tool]: !prev[tool] }));
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
    if (type === 'video' && videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    } else if (type === 'audio' && audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  return (
    <div className="interactive-simulation p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-200 rounded-xl">
      <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <Microscope className="h-5 w-5 mr-2 text-blue-600" />
        Interactive {type === 'video' ? 'Video' : 'Audio'} Analysis Lab
      </h4>
      
      {/* Media Player */}
      <div className="media-player mb-6">
        {type === 'video' ? (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-64 object-contain"
              src={mediaUrl || "data:video/mp4;base64,"}
              poster="/api/placeholder/640/360"
            />
            {analysisTools.frameByFrame && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                Frame Analysis Active
              </div>
            )}
            {analysisTools.facialLandmarks && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 w-32 h-32 border-2 border-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute top-4 left-8 w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute top-4 right-8 w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute bottom-8 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="audio-player bg-slate-800 p-6 rounded-lg">
            <audio ref={audioRef} src={mediaUrl || ""} className="hidden" />
            <div className="flex items-center justify-center mb-4">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Headphones className="h-16 w-16 text-white" />
              </div>
            </div>
            {analysisTools.spectralAnalysis && (
              <div className="spectral-display bg-slate-700 p-4 rounded-lg mt-4">
                <div className="text-white text-sm mb-2">Spectral Analysis:</div>
                <div className="grid grid-cols-12 gap-1 h-16">
                  {Array.from({length: 12}).map((_, i) => (
                    <div key={i} className="bg-blue-400 rounded-t" style={{height: `${Math.random() * 100}%`}}></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Media Controls */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={playPause}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <div className="text-sm text-slate-600">
            {type === 'video' ? 'Video' : 'Audio'} Sample for Analysis
          </div>
        </div>
      </div>

      {/* Analysis Tools Panel */}
      <div className="tools-panel mb-6">
        <h5 className="font-semibold text-slate-700 mb-3 flex items-center">
          <Wrench className="h-4 w-4 mr-2" />
          Analysis Tools
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {type === 'video' ? (
            <>
              <button
                onClick={() => toggleTool('frameByFrame')}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  analysisTools.frameByFrame 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                <ScanLine className="h-4 w-4 mx-auto mb-1" />
                Frame-by-Frame
              </button>
              <button
                onClick={() => toggleTool('facialLandmarks')}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  analysisTools.facialLandmarks 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-green-50'
                }`}
              >
                <Crosshair className="h-4 w-4 mx-auto mb-1" />
                Facial Landmarks
              </button>
              <button
                onClick={() => toggleTool('motionDetection')}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  analysisTools.motionDetection 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-purple-50'
                }`}
              >
                <Activity className="h-4 w-4 mx-auto mb-1" />
                Motion Detection
              </button>
              <button
                onClick={() => toggleTool('pixelAnalysis')}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  analysisTools.pixelAnalysis 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-red-50'
                }`}
              >
                <Layers className="h-4 w-4 mx-auto mb-1" />
                Pixel Analysis
              </button>
              <button
                onClick={() => toggleTool('compressionArtifacts')}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  analysisTools.compressionArtifacts 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-yellow-50'
                }`}
              >
                <Hash className="h-4 w-4 mx-auto mb-1" />
                Compression
              </button>
              <button
                onClick={simulateDeepfakeDetection}
                className="p-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-pink-700"
              >
                <Radar className="h-4 w-4 mx-auto mb-1" />
                Run Analysis
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => toggleTool('spectralAnalysis')}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  analysisTools.spectralAnalysis 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                <BarChart3 className="h-4 w-4 mx-auto mb-1" />
                Spectral Analysis
              </button>
              <button
                onClick={simulateAudioAnalysis}
                className="p-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-teal-700"
              >
                <Volume2 className="h-4 w-4 mx-auto mb-1" />
                Voice Analysis
              </button>
            </>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {detectedClues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="analysis-results"
        >
          <h5 className="font-semibold text-slate-700 mb-3 flex items-center">
            <Flag className="h-4 w-4 mr-2 text-red-500" />
            Detection Results
          </h5>
          
          {simulationResults && (
            <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-800">Overall Assessment:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  simulationResults.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                  simulationResults.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {simulationResults.verdict}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-800">
                {simulationResults.overallConfidence}% Confidence
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {detectedClues.map((clue, index) => (
              <div key={index} className="clue-item p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-slate-700 capitalize">{clue.type} Analysis</span>
                  <span className="text-sm font-semibold text-red-600">{clue.confidence}%</span>
                </div>
                <p className="text-sm text-slate-600">{clue.description}</p>
                <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                    style={{ width: `${clue.confidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const AdvancedMediaLiteracyQuiz = ({ username = "Student" }) => {
  const [questions] = useState([
    {
      id: 1,
      type: 'ai_generated_content',
      question: "Analyze this AI-generated news article. What sophisticated techniques can you use to identify it as artificial content?",
      scenario: {
        headline: "Local Mayor Announces Revolutionary Green Energy Initiative",
        content: "The writing style is unnaturally perfect with no grammatical errors, uses generic stock phrases like 'groundbreaking initiative' and 'transformative impact,' lacks specific quotes or concrete details, and contains no spelling mistakes typical of rushed journalism.",
        metadata: "Published 2 minutes after event supposedly occurred",
        technicalClues: ["Perfect grammar throughout", "Generic corporate language", "No specific quotes or names", "Instant publication timing", "No byline or author credentials"]
      },
      options: [
        { 
          id: 'a', 
          text: "Use AI detection tools like GPTZero or Originality.ai",
          correct: true,
          points: 25,
          category: "Technical Detection"
        },
        { 
          id: 'b', 
          text: "Check for unnatural perfection in writing style",
          correct: true,
          points: 25,
          category: "Pattern Recognition"
        },
        { 
          id: 'c', 
          text: "Look for lack of specific details, quotes, or human errors",
          correct: true,
          points: 25,
          category: "Content Analysis"
        },
        { 
          id: 'd', 
          text: "Trust it because it reads professionally",
          correct: false,
          points: 0,
          category: "Critical Error"
        }
      ],
      explanation: "AI-generated content often lacks the natural imperfections of human writing. Look for overly perfect grammar, generic language, missing specific details, and use specialized AI detection tools.",
      category: "AI Content Detection",
      difficulty: "expert",
      learningObjectives: ["Recognize AI-generated text patterns", "Use technical detection tools", "Understand the uncanny valley of AI writing"]
    },
    {
      id: 2,
      type: 'psychological_manipulation',
      question: "This post is designed to make you angry and share immediately. What psychological tactics are being used?",
      scenario: {
        post: "URGENT: They're trying to SILENCE this information! Share before it gets DELETED! You won't believe what THEY don't want you to know!",
        engagement: "10K angry reactions, 5K shares in 20 minutes",
        comments: "Mostly outraged responses, very few asking for sources"
      },
      options: [
        { 
          id: 'a', 
          text: "Fear of missing out (FOMO) - 'share before deleted'",
          isTactic: true,
          points: 20
        },
        { 
          id: 'b', 
          text: "Us vs. Them mentality - 'THEY don't want you to know'",
          isTactic: true,
          points: 20
        },
        { 
          id: 'c', 
          text: "Urgency manipulation - 'URGENT', 'immediate action'",
          isTactic: true,
          points: 20
        },
        { 
          id: 'd', 
          text: "Emotional triggering - ALL CAPS, inflammatory language",
          isTactic: true,
          points: 20
        }
      ],
      explanation: "This uses multiple psychological manipulation tactics to bypass critical thinking. Take a pause when you feel strong emotions, and always verify before sharing.",
      category: "Psychological Awareness",
      difficulty: "intermediate"
    },
    {
      id: 3,
      type: 'algorithm_literacy',
      question: "Your social media feed is showing you increasingly extreme content. What's happening and how do you break the cycle?",
      scenario: {
        pattern: "Started with mild political content, now seeing conspiracy theories and extreme viewpoints",
        behavior: "You've been clicking and engaging with controversial posts",
        result: "Feed becoming an echo chamber of similar extreme content"
      },
      options: [
        { 
          id: 'a', 
          text: "Algorithms amplify content that gets engagement (clicks, shares, comments)",
          correct: true,
          points: 25
        },
        { 
          id: 'b', 
          text: "Actively seek diverse sources and perspectives",
          correct: true,
          points: 25
        },
        { 
          id: 'c', 
          text: "Use 'Not Interested' or hide similar content features",
          correct: true,
          points: 25
        },
        { 
          id: 'd', 
          text: "The algorithm knows what's best for me",
          correct: false,
          points: 0
        }
      ],
      explanation: "Social media algorithms create filter bubbles and can radicalize users gradually. Actively diversify your sources and be aware of how engagement affects what you see.",
      category: "Algorithm Awareness",
      difficulty: "advanced"
    },
    {
      id: 4,
      type: 'microtargeting_awareness',
      question: "You see a political ad that seems perfectly tailored to your concerns. How might this ad be targeting you specifically?",
      scenario: {
        ad: "Ad about local education funding that mentions your specific neighborhood and concerns",
        targeting: "Shows up only to parents aged 30-45 in your zip code",
        data: "Uses your browsing history, location data, and social media activity"
      },
      options: [
        { 
          id: 'a', 
          text: "It uses your personal data to create targeted messaging",
          isTargeting: true,
          points: 25
        },
        { 
          id: 'b', 
          text: "It's designed to confirm your existing beliefs",
          isTargeting: true,
          points: 25
        },
        { 
          id: 'c', 
          text: "It may show different messages to different groups",
          isTargeting: true,
          points: 25
        },
        { 
          id: 'd', 
          text: "It's just a coincidence that it matches your interests",
          isTargeting: false,
          points: 0
        }
      ],
      explanation: "Microtargeting uses your personal data to create custom messages designed to manipulate your emotions and decisions. Be aware that different people may see completely different versions of the same campaign.",
      category: "Data Privacy & Targeting",
      difficulty: "advanced"
    },
    {
      id: 5,
      type: 'network_analysis',
      question: "You notice several accounts sharing the same exact message with slight variations. What might this indicate?",
      scenario: {
        pattern: "20+ accounts posting similar content within 2 hours",
        accounts: "Mix of real-looking profiles with generic photos",
        content: "Slight variations of the same political message",
        timing: "All posted during peak engagement hours"
      },
      options: [
        { 
          id: 'a', 
          text: "Coordinated inauthentic behavior (bot network)",
          isIndicator: true,
          points: 30
        },
        { 
          id: 'b', 
          text: "Astroturfing - fake grassroots movement",
          isIndicator: true,
          points: 25
        },
        { 
          id: 'c', 
          text: "Information warfare or influence operation",
          isIndicator: true,
          points: 25
        },
        { 
          id: 'd', 
          text: "Organic viral content that people genuinely care about",
          isIndicator: false,
          points: 0
        }
      ],
      explanation: "Coordinated networks of fake accounts are used to artificially amplify messages and create false impressions of popularity. Look for unnatural posting patterns and identical messaging.",
      category: "Network Analysis",
      difficulty: "expert"
    },
    {
      id: 6,
      type: 'emotional_regulation',
      question: "You just read something that made you extremely angry and want to share it immediately. What should you do first?",
      scenario: {
        emotion: "Feeling outraged and compelled to share",
        content: "Article claiming something shocking about a group you disagree with",
        impulse: "Strong urge to share with angry commentary"
      },
      options: [
        { 
          id: 'a', 
          text: "Take a deep breath and pause before reacting",
          isBestPractice: true,
          points: 25
        },
        { 
          id: 'b', 
          text: "Ask yourself: 'Why am I feeling this way?'",
          isBestPractice: true,
          points: 25
        },
        { 
          id: 'c', 
          text: "Verify the information before sharing",
          isBestPractice: true,
          points: 25
        },
        { 
          id: 'd', 
          text: "Share immediately while the emotion is strong",
          isBestPractice: false,
          points: 0
        }
      ],
      explanation: "Strong emotions are often deliberately triggered by fake news. The 'emotional hijack' makes us skip critical thinking. Always pause and verify when you feel strong urges to share.",
      category: "Emotional Intelligence",
      difficulty: "intermediate"
    },
    {
      id: 7,
      type: 'source_evaluation',
      question: "Analyze this news headline and source. What red flags do you notice?",
      scenario: {
        headline: "SHOCKING: Scientists Discover Miracle Cure That Big Pharma Doesn't Want You to Know!",
        source: "TruthSeeker99.blogspot.com",
        author: "Anonymous Whistleblower",
        date: "Yesterday",
        shareCount: "50K shares in 2 hours"
      },
      options: [
        { 
          id: 'a', 
          text: "Emotional language and clickbait headline",
          isFlag: true,
          weight: 25
        },
        { 
          id: 'b', 
          text: "Unreliable source (personal blog)",
          isFlag: true,
          weight: 25
        },
        { 
          id: 'c', 
          text: "Anonymous author with no credentials",
          isFlag: true,
          weight: 25
        },
        { 
          id: 'd', 
          text: "Rapid viral spread without verification",
          isFlag: true,
          weight: 25
        }
      ],
      explanation: "This example shows multiple classic fake news indicators: sensationalized language, unreliable source, anonymous authorship, and suspicious viral spread. Always verify through multiple credible sources.",
      category: "Source Verification",
      difficulty: "intermediate"
    },
    {
      id: 8,
      type: 'prebunking_training',
      question: "You're about to see a technique used to spread misinformation. Can you identify the manipulation tactic before being exposed to fake content?",
      scenario: {
        warning: "The following will demonstrate a common fake news pattern",
        technique: "Inoculation against misinformation",
        preview: "This will show how false balance and cherry-picking work"
      },
      inoculation: {
        tactic: "False Balance",
        description: "Presenting fringe views as equally valid to scientific consensus",
        example: "Climate change articles that give equal time to climate deniers vs. 97% of climate scientists"
      },
      options: [
        { 
          id: 'a', 
          text: "Now I can recognize false balance when I see it",
          isPrebunked: true,
          points: 30
        },
        { 
          id: 'b', 
          text: "I understand how cherry-picking data works",
          isPrebunked: true,
          points: 25
        },
        { 
          id: 'c', 
          text: "I'm more aware of manipulation tactics",
          isPrebunked: true,
          points: 25
        },
        { 
          id: 'd', 
          text: "This doesn't help me recognize fake news",
          isPrebunked: false,
          points: 0
        }
      ],
      explanation: "Prebunking works by exposing you to weakened forms of misinformation techniques, building immunity like a vaccine. When you encounter real fake news using these tactics, you'll recognize them.",
      category: "Prebunking Training",
      difficulty: "advanced"
    },
    {
      id: 9,
      type: 'lateral_reading',
      question: "Instead of reading this article top-to-bottom, demonstrate lateral reading to verify its credibility:",
      scenario: {
        article: "Breaking study shows shocking health effects",
        source: "HealthNews24.com - About page claims 'trusted health information'",
        task: "Verify the source's credibility using lateral reading"
      },
      lateralSteps: [
        "Open new tabs to research the website",
        "Check Wikipedia or fact-checking sites about the source",
        "Look up the study authors and their credentials",
        "See what other sources say about this topic"
      ],
      options: [
        { 
          id: 'a', 
          text: "Read the entire article first, then check sources",
          isLateral: false,
          points: 0
        },
        { 
          id: 'b', 
          text: "Immediately research the website's reputation",
          isLateral: true,
          points: 25
        },
        { 
          id: 'c', 
          text: "Check what other credible sources say about this topic",
          isLateral: true,
          points: 25
        },
        { 
          id: 'd', 
          text: "Look up the study and authors mentioned",
          isLateral: true,
          points: 25
        }
      ],
      explanation: "Lateral reading means leaving the article to verify the source's credibility before reading the content. This prevents you from being influenced by convincing-sounding misinformation.",
      category: "Lateral Reading",
      difficulty: "advanced"
    },
    {
      id: 10,
      type: 'video_deepfake_detection',
      question: "Analyze this suspicious video using the tools provided. What evidence suggests this might be a deepfake?",
      hasSimulation: true,
      simulationType: 'video',
      scenario: {
        videoUrl: "/test-media/suspicious-video.mp4",
        context: "Political figure making controversial statement",
        metadata: "Posted 1 hour ago, already viral with 100K shares",
        claimsToVerify: ["Check facial consistency", "Analyze blinking patterns", "Look for compression artifacts"]
      },
      options: [
        {
          id: 'a',
          text: "Inconsistent facial landmarks and lighting suggest manipulation",
          isForensic: true,
          points: 30
        },
        {
          id: 'b',
          text: "Unnatural blinking pattern detected by analysis tools",
          isForensic: true,
          points: 25
        },
        {
          id: 'c',
          text: "Different compression artifacts on face vs background",
          isForensic: true,
          points: 25
        },
        {
          id: 'd',
          text: "Video quality is too good to be fake",
          isForensic: false,
          points: 0
        }
      ],
      explanation: "Modern deepfakes can be detected through careful analysis of facial landmarks, temporal inconsistencies like blinking patterns, and technical artifacts like compression differences. Always use multiple detection methods.",
      category: "Video Forensics",
      difficulty: "expert",
      toolsRequired: ['frameByFrame', 'facialLandmarks', 'compressionArtifacts']
    },
    {
      id: 11,
      type: 'audio_deepfake_detection', 
      question: "Listen to this audio clip and use spectral analysis to determine if it's a voice clone.",
      hasSimulation: true,
      simulationType: 'audio',
      scenario: {
        audioUrl: "/test-media/suspicious-audio.mp3",
        context: "Celebrity endorsement of controversial product",
        metadata: "Audio surfaced on social media, no official confirmation",
        claimsToVerify: ["Analyze voice patterns", "Check for digital artifacts", "Compare to known samples"]
      },
      options: [
        {
          id: 'a',
          text: "Unnatural formant frequencies detected in vowel sounds",
          isForensic: true,
          points: 30
        },
        {
          id: 'b',
          text: "Digital artifacts visible in high-frequency spectral analysis",
          isForensic: true, 
          points: 25
        },
        {
          id: 'c',
          text: "Inconsistent pitch patterns suggest synthetic generation",
          isForensic: true,
          points: 25
        },
        {
          id: 'd',
          text: "Audio sounds natural, must be authentic",
          isForensic: false,
          points: 0
        }
      ],
      explanation: "Voice cloning technology has advanced rapidly. Detection requires spectral analysis, examination of formant frequencies, and identification of digital artifacts. Always cross-reference with verified audio samples.",
      category: "Audio Forensics",
      difficulty: "expert",
      toolsRequired: ['spectralAnalysis']
    },
    {
      id: 12,
      type: 'cognitive_bias_awareness',
      question: "You see a news story that confirms something you already believe strongly. What cognitive bias might be affecting your judgment?",
      scenario: {
        situation: "Article supports your political views perfectly",
        reaction: "You immediately think 'Finally, someone telling the truth!'",
        behavior: "Want to share without checking other sources"
      },
      biases: [
        { name: "Confirmation Bias", description: "Seeking information that confirms existing beliefs" },
        { name: "Motivated Reasoning", description: "Finding ways to justify what you want to believe" },
        { name: "Tribal Thinking", description: "Accepting information from your 'team' uncritically" }
      ],
      options: [
        { 
          id: 'a', 
          text: "Confirmation bias - accepting info that confirms my beliefs",
          isBias: true,
          points: 25
        },
        { 
          id: 'b', 
          text: "I should check sources that disagree with this",
          isBias: false,
          isCorrectAction: true,
          points: 30
        },
        { 
          id: 'c', 
          text: "This feels true, so it probably is",
          isBias: true,
          points: 0
        },
        { 
          id: 'd', 
          text: "I need to be extra skeptical of information I want to believe",
          isBias: false,
          isCorrectAction: true,
          points: 25
        }
      ],
      explanation: "We're most vulnerable to fake news that confirms our existing beliefs. When something feels 'obviously true,' that's when we need to be most careful and check multiple sources.",
      category: "Cognitive Bias Training",
      difficulty: "intermediate"
    }
  ]);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [skillBreakdown, setSkillBreakdown] = useState({
    technicalAnalysis: 0,
    visualForensics: 0,
    networkAnalysis: 0,
    psychologicalDefense: 0,
    algorithmicLiteracy: 0,
    sourceVerification: 0,
    realTimeFactCheck: 0,
    futurePreparedness: 0,
    crossPlatformTracking: 0,
    narrativeAnalysis: 0
  });
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [masteryLevel, setMasteryLevel] = useState('novice');

  // Calculate mastery level based on performance
  useEffect(() => {
    const totalMaxScore = getTotalMaxScore();
    const percentage = (score / totalMaxScore) * 100;
    
    if (percentage >= 90) setMasteryLevel('expert');
    else if (percentage >= 75) setMasteryLevel('advanced');
    else if (percentage >= 60) setMasteryLevel('intermediate');
    else setMasteryLevel('novice');
  }, [score]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = useCallback((answerId) => {
    if (showResult) return;
    
    const question = questions[currentQuestion];
    const newAnswers = { ...selectedAnswers };
    
    // Allow multiple selections for advanced analysis questions
    if (question.type.includes('analysis') || question.type.includes('detection') || question.type.includes('forensics') || 
        question.type === 'source_evaluation' || question.type === 'bias_detection' || question.type === 'ai_generated_content' ||
        question.type === 'psychological_manipulation' || question.type === 'algorithm_literacy' ||
        question.type === 'microtargeting_awareness' || question.type === 'network_analysis' ||
        question.type === 'emotional_regulation' || question.type === 'prebunking_training' ||
        question.type === 'lateral_reading' || question.type === 'cognitive_bias_awareness') {
      if (!newAnswers[currentQuestion]) newAnswers[currentQuestion] = [];
      
      if (newAnswers[currentQuestion].includes(answerId)) {
        newAnswers[currentQuestion] = newAnswers[currentQuestion].filter(id => id !== answerId);
      } else {
        newAnswers[currentQuestion].push(answerId);
      }
    } else {
      // Single selection for other question types
      newAnswers[currentQuestion] = answerId;
    }
    
    setSelectedAnswers(newAnswers);
  }, [currentQuestion, selectedAnswers, showResult, questions]);

  const calculateQuestionScore = useCallback(() => {
    const question = questions[currentQuestion];
    const answers = selectedAnswers[currentQuestion];
    
    if (!answers) return 0;
    
    let questionScore = 0;
    const maxPossibleScore = question.options.reduce((max, opt) => Math.max(max, opt.points || 0), 0);
    
    if (Array.isArray(answers)) {
      // Multiple selection scoring
      answers.forEach(answerId => {
        const option = question.options.find(opt => opt.id === answerId);
        if (option && (option.correct || option.isFlag || option.isTactic || option.isTargeting || 
                      option.isIndicator || option.isBestPractice || option.isPrebunked || 
                      option.isLateral || option.isCorrectAction || option.isForensic)) {
          questionScore += option.points || option.weight || 0;
        } else if (option && option.points === 0) {
          questionScore -= 5; // Penalty for wrong answers in multi-select
        }
      });
    } else {
      // Single selection scoring
      const option = question.options.find(opt => opt.id === answers);
      if (option && (option.correct || option.isTactic || option.isTargeting || 
                    option.isIndicator || option.isBestPractice || option.isPrebunked ||
                    option.isLateral || option.isCorrectAction)) {
        questionScore = option.points || 0;
      }
    }
    
    return Math.max(0, Math.min(questionScore, maxPossibleScore));
  }, [currentQuestion, selectedAnswers, questions]);

  const handleSubmitAnswer = useCallback(() => {
    const questionScore = calculateQuestionScore();
    const newScore = score + questionScore;
    setScore(newScore);
    
    // Update skill breakdown with more granular categories
    const question = questions[currentQuestion];
    const newSkillBreakdown = { ...skillBreakdown };
    
    const categoryMappings = {
      'AI Content Detection': 'technicalAnalysis',
      'Synthetic Media Detection': 'technicalAnalysis', 
      'Digital Forensics': 'visualForensics',
      'Network Analysis & Bot Detection': 'networkAnalysis',
      'Network Analysis': 'networkAnalysis',
      'Information Warfare Analysis': 'narrativeAnalysis',
      'Algorithmic Literacy': 'algorithmicLiteracy',
      'Algorithm Awareness': 'algorithmicLiteracy',
      'Privacy & Micro-targeting Defense': 'psychologicalDefense',
      'Data Privacy & Targeting': 'psychologicalDefense',
      'Real-time Verification': 'realTimeFactCheck',
      'Memetic Analysis': 'narrativeAnalysis',
      'Future Preparedness': 'futurePreparedness',
      'Cross-platform Analysis': 'crossPlatformTracking',
      'Psychological Defense': 'psychologicalDefense',
      'Psychological Awareness': 'psychologicalDefense',
      'Emotional Intelligence': 'psychologicalDefense',
      'Source Verification': 'sourceVerification',
      'Prebunking Training': 'psychologicalDefense',
      'Lateral Reading': 'sourceVerification',
      'Cognitive Bias Training': 'psychologicalDefense',
      'Video Forensics': 'visualForensics',
      'Audio Forensics': 'visualForensics'
    };
    
    const skillCategory = categoryMappings[question.category] || 'sourceVerification';
    newSkillBreakdown[skillCategory] += questionScore;
    
    setSkillBreakdown(newSkillBreakdown);
    
    // Determine mastery level based on performance
    const totalPossible = questions.length * 30; // Assuming average 30 points per question
    const currentPercentage = (newScore / totalPossible) * 100;
    
    if (currentPercentage >= 85) setMasteryLevel('expert');
    else if (currentPercentage >= 70) setMasteryLevel('advanced');
    else if (currentPercentage >= 55) setMasteryLevel('intermediate');
    else setMasteryLevel('novice');
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 4000); // Longer time to read explanations
  }, [calculateQuestionScore, score, currentQuestion, questions, skillBreakdown]);

  const resetQuiz = useCallback(() => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setMasteryLevel('novice');
    setSkillBreakdown({
      technicalAnalysis: 0,
      visualForensics: 0,
      networkAnalysis: 0,
      psychologicalDefense: 0,
      algorithmicLiteracy: 0,
      sourceVerification: 0,
      realTimeFactCheck: 0,
      futurePreparedness: 0,
      crossPlatformTracking: 0,
      narrativeAnalysis: 0
    });
    setStartTime(Date.now());
    setTimeSpent(0);
  }, []);

  const getTotalMaxScore = () => {
    return questions.reduce((total, question) => {
      const maxQuestionScore = question.options.reduce((max, option) => 
        Math.max(max, option.points || option.weight || 0), 0);
      return total + maxQuestionScore;
    }, 0);
  };

  const getPerformanceLevel = (score) => {
    const totalMaxScore = getTotalMaxScore();
    const percentage = (score / totalMaxScore) * 100;
    if (percentage >= 90) return { level: "Misinformation Expert", color: "text-purple-600", desc: "Elite-level fake news detection and defense capabilities!", icon: Shield };
    if (percentage >= 75) return { level: "Advanced Analyst", color: "text-green-600", desc: "Strong technical and analytical skills for modern threats", icon: Search };
    if (percentage >= 60) return { level: "Digital Detective", color: "text-blue-600", desc: "Solid foundation with room for advanced techniques", icon: Eye };
    return { level: "Media Literacy Student", color: "text-orange-600", desc: "Building essential skills - keep practicing!", icon: Brain };
  };

  const skillDisplayNames = {
    technicalAnalysis: 'AI & Technical Analysis',
    visualForensics: 'Digital Forensics',
    networkAnalysis: 'Network & Bot Analysis',
    psychologicalDefense: 'Psychological Defense',
    algorithmicLiteracy: 'Algorithm Awareness',
    sourceVerification: 'Source Verification',
    realTimeFactCheck: 'Real-time Fact-checking',
    futurePreparedness: 'Future Threat Prep',
    crossPlatformTracking: 'Cross-platform Tracking',
    narrativeAnalysis: 'Narrative Analysis'
  };

  // Enhanced skill display with icons and descriptions
  const getSkillDisplayInfo = (skillKey) => {
    const iconMap = {
      technicalAnalysis: Camera,
      visualForensics: Video,
      networkAnalysis: Network,
      psychologicalDefense: Brain,
      algorithmicLiteracy: Bot,
      sourceVerification: Database,
      realTimeFactCheck: Mic,
      futurePreparedness: TrendingUp,
      crossPlatformTracking: Hash,
      narrativeAnalysis: MessageSquare
    };

    const descriptionMap = {
      technicalAnalysis: 'AI detection and technical analysis skills',
      visualForensics: 'Digital media forensics and manipulation detection',
      networkAnalysis: 'Bot detection and network analysis',
      psychologicalDefense: 'Psychological manipulation resistance',
      algorithmicLiteracy: 'Algorithm awareness and understanding',
      sourceVerification: 'Source credibility assessment',
      realTimeFactCheck: 'Real-time information verification',
      futurePreparedness: 'Future threat preparation',
      crossPlatformTracking: 'Cross-platform information tracking',
      narrativeAnalysis: 'Narrative and propaganda analysis'
    };

    return {
      name: skillDisplayNames[skillKey],
      icon: iconMap[skillKey],
      description: descriptionMap[skillKey]
    };
  };

  // Welcome Screen
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glow text-center"
        >
          {/* Hero Section */}
          <div className="hero-gradient text-white p-8 rounded-t-2xl">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Shield className="h-16 w-16 mx-auto mb-4 text-electric-400" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 editorial-heading text-white">
              Media Literacy Training
            </h1>
            <p className="text-xl text-violet-100 mb-2">
              Advanced Misinformation Detection Quiz
            </p>
            <p className="text-violet-200">
              Welcome, {username}! Test your skills against modern fake news.
            </p>
          </div>

          {/* Context Section */}
          <div className="p-8 bg-white/95 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h3 className="text-xl font-bold text-deepblue-800 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-violet-600" />
                  What You'll Learn
                </h3>
                <ul className="space-y-3 text-softgray-700">
                  <li className="flex items-start">
                    <Zap className="h-4 w-4 mr-2 mt-0.5 text-electric-500 flex-shrink-0" />
                    Detect AI-generated content and deepfakes
                  </li>
                  <li className="flex items-start">
                    <Brain className="h-4 w-4 mr-2 mt-0.5 text-violet-500 flex-shrink-0" />
                    Recognize psychological manipulation tactics
                  </li>
                  <li className="flex items-start">
                    <Users className="h-4 w-4 mr-2 mt-0.5 text-deepblue-500 flex-shrink-0" />
                    Identify bot networks and astroturfing
                  </li>
                  <li className="flex items-start">
                    <Search className="h-4 w-4 mr-2 mt-0.5 text-neon-500 flex-shrink-0" />
                    Master lateral reading and fact-checking
                  </li>
                  <li className="flex items-start">
                    <Monitor className="h-4 w-4 mr-2 mt-0.5 text-electric-500 flex-shrink-0" />
                    Analyze digital media and deepfakes
                  </li>
                  <li className="flex items-start">
                    <Smartphone className="h-4 w-4 mr-2 mt-0.5 text-violet-500 flex-shrink-0" />
                    Mobile misinformation detection
                  </li>
                  <li className="flex items-start">
                    <Wifi className="h-4 w-4 mr-2 mt-0.5 text-deepblue-500 flex-shrink-0" />
                    Network and connectivity analysis
                  </li>
                  <li className="flex items-start">
                    <Headphones className="h-4 w-4 mr-2 mt-0.5 text-neon-500 flex-shrink-0" />
                    Audio and voice deepfake detection
                  </li>
                  <li className="flex items-start">
                    <Fingerprint className="h-4 w-4 mr-2 mt-0.5 text-violet-500 flex-shrink-0" />
                    Digital identity verification
                  </li>
                </ul>
              </div>
              
              <div className="text-left">
                <h3 className="text-xl font-bold text-deepblue-800 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-violet-600" />
                  Quiz Features
                </h3>
                <div className="space-y-3 text-softgray-700">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                    <span><strong className="text-deepblue-800">{questions.length} Questions</strong> - Expert-level scenarios</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mr-3"></div>
                    <span><strong className="text-deepblue-800">Real-time Scoring</strong> - Instant feedback</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-neon-500 rounded-full mr-3"></div>
                    <span><strong className="text-deepblue-800">Skill Tracking</strong> - Detailed analysis</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                    <span><strong className="text-deepblue-800">Multiple Formats</strong> - Single & multi-select</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mr-3"></div>
                    <span><strong className="text-deepblue-800">Mastery Tracking</strong> - {masteryLevel.charAt(0).toUpperCase() + masteryLevel.slice(1)} level</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Section */}
            <div className="mb-8 p-4 bg-gradient-to-r from-electric-50 to-violet-50 border border-violet-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-semibold text-deepblue-800 mb-2">Important Context</h4>
                  <p className="text-softgray-700 text-sm leading-relaxed">
                    This quiz contains realistic examples of misinformation techniques for educational purposes only. 
                    The scenarios are designed to teach detection skills and should not be shared as actual news. 
                    Take your time to analyze each question carefully.
                  </p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              onClick={() => setQuizStarted(true)}
              className="btn-primary text-lg px-10 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-5 w-5 mr-2" />
              Start Quiz
            </motion.button>
            
            <p className="text-softgray-500 text-sm mt-4">
              Estimated time: 15-20 minutes
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (quizComplete) {
    const performance = getPerformanceLevel(score);
    const maxScore = getTotalMaxScore();
    
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-4">
              Final Score: {score} / {maxScore} points
            </p>
            <div className={`text-2xl font-bold ${performance.color} mb-2`}>
              {performance.level} Level
            </div>
            <p className="text-gray-600">{performance.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Skill Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(skillBreakdown).map(([skill, points]) => (
                  <div key={skill} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-blue-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${Math.min((points / 100) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{points}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Key Takeaways
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start">
                  <Shield className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Always verify sources before sharing
                </li>
                <li className="flex items-start">
                  <Search className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Use fact-checking websites and reverse image search
                </li>
                <li className="flex items-start">
                  <Eye className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Watch for emotional language and bias indicators
                </li>
                <li className="flex items-start">
                  <Users className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Seek multiple perspectives on important topics
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-4 text-gray-600">
              <Clock className="h-4 w-4 inline mr-1" />
              Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </div>
            <button
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Practice Again</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswerIds = selectedAnswers[currentQuestion] || [];
  const isMultiSelect = question.type.includes('analysis') || question.type.includes('detection') || 
                       question.type.includes('forensics') || question.type === 'source_evaluation' || 
                       question.type === 'bias_detection' || question.type === 'ai_generated_content' ||
                       question.type === 'psychological_manipulation' || question.type === 'algorithm_literacy' ||
                       question.type === 'microtargeting_awareness' || question.type === 'network_analysis' ||
                       question.type === 'emotional_regulation' || question.type === 'prebunking_training' ||
                       question.type === 'lateral_reading' || question.type === 'cognitive_bias_awareness';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Shield className="h-10 w-10 mr-3 text-blue-600" />
          Media Literacy Training
        </h1>
        <div className="flex items-center justify-center space-x-6 text-gray-600">
          <span className="flex items-center">
            <Brain className="h-4 w-4 mr-1" />
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Score: {score} points
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Question Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  {question.type === 'ai_generated_content' && <Zap className="h-6 w-6" />}
                  {question.type === 'deepfake_detection' && <Eye className="h-6 w-6" />}
                  {question.type === 'psychological_manipulation' && <Brain className="h-6 w-6" />}
                  {question.type === 'algorithm_literacy' && <Globe className="h-6 w-6" />}
                  {question.type === 'microtargeting_awareness' && <Target className="h-6 w-6" />}
                  {question.type === 'network_analysis' && <Users className="h-6 w-6" />}
                  {question.type === 'emotional_regulation' && <Shield className="h-6 w-6" />}
                  {question.type === 'prebunking_training' && <Lightbulb className="h-6 w-6" />}
                  {question.type === 'lateral_reading' && <Search className="h-6 w-6" />}
                  {question.type === 'cognitive_bias_awareness' && <AlertTriangle className="h-6 w-6" />}
                  {question.type === 'source_evaluation' && <Search className="h-6 w-6" />}
                  {question.type === 'image_analysis' && <Eye className="h-6 w-6" />}
                  {question.type === 'bias_detection' && <AlertTriangle className="h-6 w-6" />}
                  {question.type === 'fact_checking' && <Shield className="h-6 w-6" />}
                  {question.type === 'platform_analysis' && <Globe className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{question.category}</h3>
                  <span className="text-blue-100 text-sm capitalize">{question.difficulty} Level</span>
                </div>
              </div>
              {isMultiSelect && (
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  Multiple Selection
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">{question.question}</h2>
          </div>

          {/* Scenario Display */}
          {question.scenario && (
            <div className="p-6 bg-gray-50 border-b">
              <h4 className="font-semibold text-gray-900 mb-3">Scenario Analysis:</h4>
              
              {question.scenario.headline && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
                  <h5 className="font-semibold text-red-900">Headline:</h5>
                  <p className="text-red-800">"{question.scenario.headline}"</p>
                </div>
              )}
              
              {question.scenario.image && (
                <div className="mb-4">
                  <img
                    src={question.scenario.image}
                    alt="Scenario"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                  {question.scenario.claim && (
                    <p className="text-center mt-2 text-gray-600 italic">
                      Claim: "{question.scenario.claim}"
                    </p>
                  )}
                </div>
              )}
              
              {question.scenario.content && (
                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                  <h5 className="font-semibold text-blue-900">Content Analysis:</h5>
                  <p className="text-blue-800">{question.scenario.content}</p>
                </div>
              )}
              
              {question.scenario.excerpt && (
                <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                  <h5 className="font-semibold text-yellow-900">News Excerpt:</h5>
                  <p className="text-yellow-800 italic">"{question.scenario.excerpt}"</p>
                </div>
              )}
              
              {question.scenario.metadata && (
                <div className="mb-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r">
                  <h5 className="font-semibold text-orange-900">Metadata:</h5>
                  <p className="text-orange-800">{question.scenario.metadata}</p>
                </div>
              )}
              
              {question.scenario.technicalClues && (
                <div className="mb-4 p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r">
                  <h5 className="font-semibold text-purple-900">Technical Clues:</h5>
                  <ul className="list-disc list-inside text-purple-800">
                    {question.scenario.technicalClues.map((clue, index) => (
                      <li key={index} className="text-sm">{clue}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {question.scenario.source && (
                  <div>
                    <span className="font-medium text-gray-700">Source:</span>
                    <p className="text-gray-600">{question.scenario.source}</p>
                  </div>
                )}
                {question.scenario.author && (
                  <div>
                    <span className="font-medium text-gray-700">Author:</span>
                    <p className="text-gray-600">{question.scenario.author}</p>
                  </div>
                )}
                {question.scenario.date && (
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <p className="text-gray-600">{question.scenario.date}</p>
                  </div>
                )}
                {question.scenario.shareCount && (
                  <div>
                    <span className="font-medium text-gray-700">Viral Status:</span>
                    <p className="text-gray-600">{question.scenario.shareCount}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Inoculation Content for Prebunking */}
            {question.inoculation && (
              <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                <h5 className="font-semibold text-yellow-900 mb-2">
                  🛡️ Misinformation Inoculation: {question.inoculation.tactic}
                </h5>
                <p className="text-yellow-800 mb-2">{question.inoculation.description}</p>
                <p className="text-sm text-yellow-700 italic">Example: {question.inoculation.example}</p>
              </div>
            )}
            
            {/* Lateral Reading Steps */}
            {question.lateralSteps && (
              <div className="mb-4 p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r">
                <h5 className="font-semibold text-purple-900 mb-2">📖 Lateral Reading Process:</h5>
                <ol className="list-decimal list-inside space-y-1 text-purple-800">
                  {question.lateralSteps.map((step, index) => (
                    <li key={index} className="text-sm">{step}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {/* Cognitive Biases Display */}
            {question.biases && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
                <h5 className="font-semibold text-red-900 mb-2">🧠 Common Cognitive Biases:</h5>
                <div className="space-y-2">
                  {question.biases.map((bias, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-red-800">{bias.name}:</span>
                      <span className="text-red-700 ml-1">{bias.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Simulation for Video/Audio Analysis */}
            {question.hasSimulation && (
              <div className="mb-6">
                <InteractiveSimulation 
                  type={question.simulationType}
                  mediaUrl={question.scenario.videoUrl || question.scenario.audioUrl}
                  onAnalysisComplete={(clues) => {
                    console.log('Analysis complete:', clues);
                  }}
                />
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = Array.isArray(selectedAnswerIds) 
                  ? selectedAnswerIds.includes(option.id)
                  : selectedAnswerIds === option.id;
                  
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";
                
                if (showResult) {
                  if (option.correct || option.isFlag || option.isTactic || option.isTargeting || 
                      option.isIndicator || option.isBestPractice || option.isPrebunked || 
                      option.isLateral || option.isCorrectAction || option.isForensic ||
                      (option.isBias !== undefined && option.points > 0)) {
                    buttonClass += "border-green-500 bg-green-50 ";
                  } else if (isSelected && (!option.correct && !option.isFlag && !option.isTactic && 
                            !option.isTargeting && !option.isIndicator && !option.isBestPractice && 
                            !option.isPrebunked && !option.isLateral && !option.isCorrectAction && 
                            (option.points === 0 || option.isBias === true))) {
                    buttonClass += "border-red-500 bg-red-50 ";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 ";
                  }
                } else {
                  if (isSelected) {
                    buttonClass += "border-violet-500 bg-violet-50 ";
                  } else {
                    buttonClass += "border-gray-200 hover:border-deepblue-300 bg-white hover:bg-violet-50 ";
                  }
                }
                
                return (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-violet-500 bg-violet-500' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-medium">{option.text}</span>
                      </div>
                      
                      {showResult && (
                        <div className="flex items-center space-x-2">
                          {(option.correct || option.isFlag || option.isTactic || option.isTargeting || 
                            option.isIndicator || option.isBestPractice || option.isPrebunked || 
                            option.isLateral || option.isCorrectAction || 
                            (option.isBias !== undefined && option.points > 0)) ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : isSelected ? (
                            <XCircle className="h-6 w-6 text-red-500" />
                          ) : null}
                          {option.points !== undefined && (
                            <span className="text-sm font-medium text-gray-600">
                              +{option.points}pts
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Explanation & Learning Points
                </h4>
                <p className="text-blue-800 leading-relaxed">{question.explanation}</p>
                
                <div className="mt-4 p-4 bg-white rounded border border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      +{calculateQuestionScore()} points
                    </div>
                    <div className="text-sm text-gray-600">Question Score</div>
                  </div>
                </div>
              </motion.div>
            )}

            {!showResult && selectedAnswerIds.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmitAnswer}
                  className="btn-primary px-8 py-3 text-lg font-semibold"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdvancedMediaLiteracyQuiz;
