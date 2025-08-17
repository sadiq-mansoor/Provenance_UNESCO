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

const ForensicsDemo = ({ username = "Student" }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const forensicsQuestions = [
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
    }
  ];

  const handleAnswerSelect = (answerId) => {
    if (showResult) return;
    
    const newAnswers = { ...selectedAnswers };
    if (!newAnswers[currentQuestion]) newAnswers[currentQuestion] = [];
    
    if (newAnswers[currentQuestion].includes(answerId)) {
      newAnswers[currentQuestion] = newAnswers[currentQuestion].filter(id => id !== answerId);
    } else {
      newAnswers[currentQuestion].push(answerId);
    }
    
    setSelectedAnswers(newAnswers);
  };

  const calculateQuestionScore = () => {
    const question = forensicsQuestions[currentQuestion];
    const answers = selectedAnswers[currentQuestion];
    
    if (!answers) return 0;
    
    let questionScore = 0;
    
    answers.forEach(answerId => {
      const option = question.options.find(opt => opt.id === answerId);
      if (option && option.isForensic) {
        questionScore += option.points || 0;
      } else if (option && option.points === 0) {
        questionScore -= 5; // Penalty for wrong answers
      }
    });
    
    return Math.max(0, questionScore);
  };

  const handleSubmitAnswer = () => {
    const questionScore = calculateQuestionScore();
    setScore(score + questionScore);
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < forensicsQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
      }
    }, 4000);
  };

  const question = forensicsQuestions[currentQuestion];
  const selectedAnswerIds = selectedAnswers[currentQuestion] || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Microscope className="h-10 w-10 mr-3 text-blue-600" />
          Interactive Forensics Demo
        </h1>
        <div className="flex items-center justify-center space-x-6 text-gray-600">
          <span className="flex items-center">
            <Video className="h-4 w-4 mr-1" />
            Question {currentQuestion + 1} of {forensicsQuestions.length}
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Score: {score} points
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${((currentQuestion + 1) / forensicsQuestions.length) * 100}%` }}
          />
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
                  {question.simulationType === 'video' ? <Video className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{question.category}</h3>
                  <span className="text-blue-100 text-sm capitalize">{question.difficulty} Level</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                Interactive Simulation
              </div>
            </div>
            <h2 className="text-xl font-bold">{question.question}</h2>
          </div>

          {/* Scenario Display */}
          <div className="p-6 bg-gray-50 border-b">
            <h4 className="font-semibold text-gray-900 mb-3">Scenario Analysis:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Context:</span>
                <p className="text-gray-600">{question.scenario.context}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Source:</span>
                <p className="text-gray-600">{question.scenario.metadata}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Media URL:</span>
                <p className="text-gray-600">{question.scenario.videoUrl || question.scenario.audioUrl}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Interactive Simulation */}
            <div className="mb-6">
              <InteractiveSimulation 
                type={question.simulationType}
                mediaUrl={question.scenario.videoUrl || question.scenario.audioUrl}
                onAnalysisComplete={(clues) => {
                  console.log('Analysis complete:', clues);
                }}
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswerIds.includes(option.id);
                  
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";
                
                if (showResult) {
                  if (option.isForensic) {
                    buttonClass += "border-green-500 bg-green-50 ";
                  } else if (isSelected && !option.isForensic) {
                    buttonClass += "border-red-500 bg-red-50 ";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 ";
                  }
                } else {
                  if (isSelected) {
                    buttonClass += "border-violet-500 bg-violet-50 ";
                  } else {
                    buttonClass += "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 ";
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
                          {option.isForensic ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : isSelected ? (
                            <XCircle className="h-6 w-6 text-red-500" />
                          ) : null}
                          <span className="text-sm font-medium text-gray-600">
                            +{option.points}pts
                          </span>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
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

export default ForensicsDemo;
