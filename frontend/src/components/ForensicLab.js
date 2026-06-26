import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  Brain, 
  Zap,
  Eye,
  BarChart3,
  Settings,
  ArrowRight,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

const ForensicLab = () => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [completedTools, setCompletedTools] = useState([]);
  const [score, setScore] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const forensicTools = [
    {
      id: 1,
      name: 'Metadata Inspector',
      description: 'Analyze EXIF and C2PA metadata to verify file authenticity',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      testFiles: [
        {
          name: 'sunset_original.jpg',
          type: 'real',
          metadata: {
            'Camera': 'Canon EOS R5',
            'Date': '2024-12-15 14:32:01',
            'GPS': '40.7128, -74.0060',
            'C2PA': 'Verified ✓',
            'Software': 'Adobe Lightroom 13.1'
          },
          analysis: 'Complete metadata chain with C2PA verification. Consistent timestamps and GPS data.'
        },
        {
          name: 'sunset_manipulated.jpg',
          type: 'fake',
          metadata: {
            'Camera': 'Unknown',
            'Date': '2024-12-15 14:32:01',
            'GPS': 'None',
            'C2PA': 'Missing ⚠️',
            'Software': 'GIMP 2.10.34'
          },
          analysis: 'Missing camera information, no GPS data, and no C2PA verification. Edited with GIMP.'
        }
      ]
    },
    {
      id: 2,
      name: 'Error Level Analysis',
      description: 'Detect image manipulation by analyzing compression artifacts',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      testFiles: [
        {
          name: 'portrait_original.jpg',
          type: 'real',
          elaResult: 'Uniform compression levels across the image. No signs of manipulation.',
          analysis: 'Consistent error levels indicate no post-processing manipulation.'
        },
        {
          name: 'portrait_faceswap.jpg',
          type: 'fake',
          elaResult: 'High error levels around face region. Inconsistent compression artifacts.',
          analysis: 'Face region shows different compression patterns, indicating digital manipulation.'
        }
      ]
    },
    {
      id: 3,
      name: 'Spectrogram Analysis',
      description: 'Visualize audio frequencies to detect AI-generated speech',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      testFiles: [
        {
          name: 'human_speech.wav',
          type: 'real',
          spectrogram: 'Natural frequency variations with organic breathing patterns.',
          analysis: 'Natural human speech patterns with expected frequency distribution.'
        },
        {
          name: 'ai_generated.wav',
          type: 'fake',
          spectrogram: 'Artificial frequency patterns with unnatural transitions.',
          analysis: 'Synthetic speech indicators: too-perfect transitions and missing micro-expressions.'
        }
      ]
    },
    {
      id: 4,
      name: 'AI Classifier',
      description: 'Use machine learning to detect AI-generated content',
      icon: Brain,
      color: 'from-red-500 to-red-600',
      testFiles: [
        {
          name: 'real_person.jpg',
          type: 'real',
          aiScore: '12% AI-generated probability',
          confidence: '94% confidence',
          analysis: 'Low AI probability with natural skin texture and eye reflections.'
        },
        {
          name: 'deepfake_person.jpg',
          type: 'fake',
          aiScore: '87% AI-generated probability',
          confidence: '91% confidence',
          analysis: 'High AI probability detected. Unnatural skin smoothing and eye asymmetry.'
        }
      ]
    },
    {
      id: 5,
      name: 'Compression Artifact Viewer',
      description: 'Compare JPEG compression patterns between authentic and manipulated images',
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      testFiles: [
        {
          name: 'landscape_original.jpg',
          type: 'real',
          compression: 'Single compression pass. Consistent 8x8 DCT blocks.',
          analysis: 'Original JPEG with single compression. Normal artifact distribution.'
        },
        {
          name: 'landscape_edited.jpg',
          type: 'fake',
          compression: 'Multiple compression passes. Inconsistent block boundaries.',
          analysis: 'Double compression detected. Evidence of re-encoding after editing.'
        }
      ]
    },
    {
      id: 6,
      name: 'Real-time Multi-Tool Analysis',
      description: 'Combined analysis using multiple detection methods',
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600',
      testFiles: [
        {
          name: 'news_authentic.mp4',
          type: 'real',
          multiAnalysis: {
            metadata: 'Complete ✓',
            visual: 'Natural ✓',
            audio: 'Human ✓',
            ai: 'Low risk ✓'
          },
          analysis: 'All detection methods confirm authenticity.'
        },
        {
          name: 'news_deepfake.mp4',
          type: 'fake',
          multiAnalysis: {
            metadata: 'Missing ⚠️',
            visual: 'Suspicious ⚠️',
            audio: 'Synthetic ⚠️',
            ai: 'High risk ⚠️'
          },
          analysis: 'Multiple red flags detected across all analysis methods.'
        }
      ]
    }
  ];

  const currentTool = forensicTools[activeToolIndex];
  const currentFile = currentTool.testFiles[currentFileIndex];
  const isCompleted = completedTools.includes(currentTool.id);

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentFile.type;
    if (isCorrect) {
      setScore(score + (isCompleted ? 5 : 20)); // Bonus points for first time
    }
    
    setTimeout(() => {
      if (currentFileIndex < currentTool.testFiles.length - 1) {
        setCurrentFileIndex(currentFileIndex + 1);
        setUserAnswer(null);
        setShowResult(false);
      } else {
        // Tool completed
        if (!isCompleted) {
          setCompletedTools([...completedTools, currentTool.id]);
        }
      }
    }, 2000);
  };

  const nextTool = () => {
    if (activeToolIndex < forensicTools.length - 1) {
      setActiveToolIndex(activeToolIndex + 1);
      setCurrentFileIndex(0);
      setUserAnswer(null);
      setShowResult(false);
    }
  };

  const resetTool = () => {
    setCurrentFileIndex(0);
    setUserAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6 lg:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3"
        >
          <Microscope className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-purple-600" />
          <span>Forensic Detection Lab</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto px-4"
        >
          Professional-grade forensic analysis tools for detecting manipulated media
        </motion.p>
      </div>

      {/* Score and Progress */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{score}</div>
          <div className="text-[10px] sm:text-xs lg:text-sm text-purple-100">Total Points</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{completedTools.length}/6</div>
          <div className="text-[10px] sm:text-xs lg:text-sm text-green-100">Tools Done</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-white">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{Math.round((completedTools.length / 6) * 100)}%</div>
          <div className="text-[10px] sm:text-xs lg:text-sm text-blue-100">Progress</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Tool Selection Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Detection Tools</h3>
          <div className="space-y-2 sm:space-y-3">
            {forensicTools.map((tool, index) => (
              <motion.button
                key={tool.id}
                onClick={() => {
                  setActiveToolIndex(index);
                  resetTool();
                }}
                className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-200 ${
                  activeToolIndex === index
                    ? 'bg-gradient-to-r ' + tool.color + ' text-white shadow-lg'
                    : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <tool.icon className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${
                    activeToolIndex === index ? 'text-white' : 'text-gray-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm lg:text-base truncate">{tool.name}</div>
                    <div className={`text-[10px] sm:text-xs ${
                      activeToolIndex === index ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {completedTools.includes(tool.id) ? '✓ Completed' : 'Available'}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Analysis Area */}
        <div className="lg:col-span-2">
          <motion.div 
            key={activeToolIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            {/* Tool Header */}
            <div className={`bg-gradient-to-r ${currentTool.color} p-4 sm:p-6 text-white`}>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <currentTool.icon className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{currentTool.name}</h2>
                  <p className="text-white/90 text-xs sm:text-sm lg:text-base line-clamp-2">{currentTool.description}</p>
                </div>
              </div>
            </div>

            {/* Analysis Interface */}
            <div className="p-4 sm:p-6">
              {currentFileIndex < currentTool.testFiles.length ? (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 break-words">
                      Analyzing: {currentFile.name}
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                      File {currentFileIndex + 1} of {currentTool.testFiles.length}
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Analysis Results</h4>
                    
                    {/* Tool-specific results */}
                    {currentTool.id === 1 && (
                      <div className="space-y-1.5 sm:space-y-2">
                        {Object.entries(currentFile.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs sm:text-sm gap-2">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {currentTool.id === 2 && (
                      <div className="text-xs sm:text-sm text-gray-700">
                        <p><strong>ELA Result:</strong> {currentFile.elaResult}</p>
                      </div>
                    )}
                    
                    {currentTool.id === 3 && (
                      <div className="text-xs sm:text-sm text-gray-700">
                        <p><strong>Spectrogram:</strong> {currentFile.spectrogram}</p>
                      </div>
                    )}
                    
                    {currentTool.id === 4 && (
                      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">AI Score:</span>
                          <span className="font-medium">{currentFile.aiScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confidence:</span>
                          <span className="font-medium">{currentFile.confidence}</span>
                        </div>
                      </div>
                    )}
                    
                    {currentTool.id === 5 && (
                      <div className="text-xs sm:text-sm text-gray-700">
                        <p><strong>Compression:</strong> {currentFile.compression}</p>
                      </div>
                    )}
                    
                    {currentTool.id === 6 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        {Object.entries(currentFile.multiAnalysis).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expert Analysis */}
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-1 text-xs sm:text-sm">Expert Analysis</h5>
                        <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">{currentFile.analysis}</p>
                      </div>
                    </div>
                  </div>

                  {/* Classification Question */}
                  {!showResult ? (
                    <div>
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                        Based on this analysis, is this file authentic?
                      </h4>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <motion.button
                          onClick={() => handleAnswer('real')}
                          className="p-3 sm:p-4 border-2 border-green-200 rounded-lg sm:rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                          <div className="font-semibold text-green-700 text-xs sm:text-sm">Authentic</div>
                          <div className="text-[10px] sm:text-xs text-green-600">Real content</div>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleAnswer('fake')}
                          className="p-3 sm:p-4 border-2 border-red-200 rounded-lg sm:rounded-xl hover:border-red-400 hover:bg-red-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <X className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mx-auto mb-1 sm:mb-2" />
                          <div className="font-semibold text-red-700 text-xs sm:text-sm">Manipulated</div>
                          <div className="text-[10px] sm:text-xs text-red-600">Fake/AI content</div>
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                      userAnswer === currentFile.type ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                        {userAnswer === currentFile.type ? (
                          <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                        )}
                        <span className={`font-semibold text-sm sm:text-base ${
                          userAnswer === currentFile.type ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {userAnswer === currentFile.type ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">
                        This file is {currentFile.type === 'real' ? 'authentic' : 'manipulated'}.
                        {userAnswer === currentFile.type ? ' +' + (isCompleted ? '5' : '20') + ' points' : ' No points awarded.'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Tool Completed!</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">Great work analyzing files with {currentTool.name}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 px-4">
                    <motion.button
                      onClick={resetTool}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2 inline" />
                      Try Again
                    </motion.button>
                    {activeToolIndex < forensicTools.length - 1 && (
                      <motion.button
                        onClick={nextTool}
                        className="px-4 sm:px-6 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700"
                        whileHover={{ scale: 1.02 }}
                      >
                        Next Tool
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 inline" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final Results */}
      {completedTools.length === 6 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white text-center"
        >
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">🎉 Lab Complete! 🎉</div>
          <div className="text-lg sm:text-xl mb-3 sm:mb-4">Final Score: {score} points</div>
          <div className="text-sm sm:text-base text-purple-100 px-4">
            You've mastered all 6 forensic detection tools. You're now ready to identify manipulated media with professional-grade accuracy!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ForensicLab;
