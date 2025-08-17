import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  BookOpen, 
  Video, 
  ExternalLink, 
  Clock, 
  Users, 
  Award, 
  Lightbulb,
  Target,
  CheckCircle,
  ArrowRight,
  Youtube,
  Share2,
  Eye,
  Brain,
  Shield,
  AlertTriangle,
  TrendingUp,
  Globe,
  Zap,
  Headphones,
  FileText,
  Mic,
  Camera,
  Star,
  Gamepad2,
  Trophy,
  Bookmark,
  MessageSquare,
  Radio,
  Newspaper,
  GraduationCap,
  ChevronRight,
  Timer,
  Download,
  Sparkles,
  Microscope
} from 'lucide-react';

const LearningHub = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const tabs = [
    { 
      id: 'training', 
      label: 'Training', 
      icon: Brain, 
      color: 'blue',
      description: 'Interactive quizzes and exercises'
    },
    { 
      id: 'videos', 
      label: 'Videos', 
      icon: Video, 
      color: 'purple',
      description: 'Educational video content' 
    },
    { 
      id: 'podcasts', 
      label: 'Podcasts', 
      icon: Headphones, 
      color: 'green',
      description: 'Expert discussions and interviews'
    },
    { 
      id: 'stories', 
      label: 'Stories', 
      icon: Newspaper, 
      color: 'orange',
      description: 'Case studies and real examples'
    }
  ];

  const trainingContent = [
    {
      id: 1,
      title: 'Advanced Media Literacy Quiz',
      description: 'Test your skills with expert-level questions on deepfakes, AI content, and psychological manipulation.',
      type: 'Interactive Quiz',
      duration: '15-20 min',
      difficulty: 'Expert',
      questions: 12,
      completionRate: '73%',
      points: 300,
      link: '/quiz',
      features: ['Multi-select questions', 'Real-time scoring', 'Skill breakdown', 'Video analysis'],
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      stats: {
        'Questions:': 12,
        'Max Points:': 300,
        'Completion Rate:': '73%'
      }
    },
    {
      id: 2,
      title: 'Forensic Detection Lab',
      description: 'Hands-on forensic analysis laboratory with 5-6 professional detection tools. Each exercise provides real vs. fake media samples, real-time analysis results, and precision-based scoring for accurate classification.',
      type: 'Interactive Lab',
      duration: '30-40 min',
      difficulty: 'Expert',
      exercises: 6,
      testFiles: 12,
      points: 200,
      link: '/forensic-lab',
      features: ['Metadata Inspector', 'Error Level Analysis', 'Spectrogram Tool', 'AI Classifier Demo', 'Compression Artifact Viewer', 'Real-time Results'],
      icon: Microscope,
      color: 'from-purple-500 to-purple-600',
      stats: {
        'Detection Tools:': 6,
        'Test Files:': '12 (6 real, 6 fake)',
        'Precision Scoring:': 'Active'
      }
    },
    {
      id: 3,
      title: 'Bias Detection Workshop',
      description: 'Learn to identify cognitive biases and psychological manipulation in news and social media.',
      type: 'Workshop',
      duration: '25-30 min',
      difficulty: 'Intermediate',
      scenarios: 8,
      points: 150,
      status: 'Coming Soon',
      features: ['Bias scenarios', 'Psychology insights', 'Self-assessment', 'Improvement tips'],
      icon: Target,
      color: 'from-green-500 to-green-600'
    }
  ];

  const videosContent = [
    {
      id: 'cSKGa_7XJkg',
      title: 'How false news can spread',
      speaker: 'Noah Tavlin',
      platform: 'TED-Ed',
      duration: '4:58',
      views: '8.2M',
      difficulty: 'Beginner',
      featured: true,
      description: 'Learn how false news spreads faster than real news and what psychological factors make misinformation so compelling and viral.',
      thumbnailUrl: 'https://img.youtube.com/vi/cSKGa_7XJkg/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/cSKGa_7XJkg',
      keyTopics: ['Psychology of misinformation', 'Viral spread patterns', 'Confirmation bias', 'Social media amplification'],
      learningObjectives: [
        'Understand the mechanics of false news spread',
        'Recognize psychological vulnerabilities',
        'Identify viral misinformation patterns',
        'Develop critical thinking defenses'
      ]
    },
    {
      id: 'q-Y-z6HmRgI',
      title: 'How to choose your news',
      speaker: 'Damon Brown',
      platform: 'TED-Ed',
      duration: '4:47',
      views: '2.1M',
      difficulty: 'Beginner',
      description: 'Essential skills for evaluating news sources and avoiding misinformation.',
      thumbnailUrl: 'https://img.youtube.com/vi/q-Y-z6HmRgI/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=q-Y-z6HmRgI'
    },
    {
      id: 'E91bGT9BjYk',
      title: 'How to spot a misleading graph',
      speaker: 'Lea Gaslowitz',
      platform: 'TED-Ed',
      duration: '4:46',
      views: '1.8M',
      difficulty: 'Intermediate',
      description: 'Learn to identify manipulative data visualization techniques.',
      thumbnailUrl: 'https://img.youtube.com/vi/E91bGT9BjYk/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=E91bGT9BjYk'
    }
  ];

  const podcastsContent = [
    {
      id: 1,
      title: 'The Psychology of Misinformation',
      host: 'Dr. Sarah Chen',
      platform: 'Media Literacy Podcast',
      duration: '45:32',
      episode: 'Episode 127',
      description: 'Deep dive into the psychological mechanisms that make people susceptible to false information.',
      topics: ['Cognitive biases', 'Emotional manipulation', 'Social proof', 'Authority figures'],
      releaseDate: '2025-01-15',
      downloads: '125K',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Deepfakes and Digital Forensics',
      host: 'Prof. Michael Rodriguez',
      platform: 'Tech Ethics Today',
      duration: '38:15',
      episode: 'Episode 94',
      description: 'Expert insights into detecting AI-generated content and the future of digital authentication.',
      topics: ['AI detection', 'Digital watermarks', 'C2PA standards', 'Future threats'],
      releaseDate: '2025-01-10',
      downloads: '89K',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Social Media Echo Chambers',
      host: 'Dr. Jessica Park',
      platform: 'Digital Society',
      duration: '52:18',
      episode: 'Episode 203',
      description: 'How algorithms create filter bubbles and what we can do to break free from them.',
      topics: ['Algorithm design', 'Filter bubbles', 'Echo chambers', 'Information diversity'],
      releaseDate: '2025-01-08',
      downloads: '156K',
      rating: 4.7
    }
  ];

  const storiesContent = [
    {
      id: 1,
      title: 'The Great Twitter Hack of 2020',
      category: 'Case Study',
      readTime: '8 min',
      difficulty: 'Intermediate',
      description: 'How social engineering and insider threats led to one of the biggest social media security breaches.',
      keyLessons: ['Social engineering tactics', 'Insider threats', 'Verification importance', 'Crisis response'],
      author: 'Cybersecurity Research Team',
      publishDate: '2024-12-15',
      tags: ['Social Engineering', 'Platform Security', 'Verification']
    },
    {
      id: 2,
      title: 'The Deepfake Election Campaign',
      category: 'Real World Impact',
      readTime: '12 min',
      difficulty: 'Advanced',
      description: 'A detailed analysis of how deepfake technology was used in a recent political campaign and its implications.',
      keyLessons: ['Political misinformation', 'Deepfake detection', 'Media verification', 'Public awareness'],
      author: 'Political Media Analysis Lab',
      publishDate: '2024-12-10',
      tags: ['Deepfakes', 'Politics', 'Elections', 'AI Ethics']
    },
    {
      id: 3,
      title: 'COVID-19 Infodemic Investigation',
      category: 'Health Misinformation',
      readTime: '15 min',
      difficulty: 'Intermediate',
      description: 'Tracking the spread of health misinformation during the pandemic and lessons learned.',
      keyLessons: ['Health misinformation', 'Fact-checking', 'Source verification', 'Crisis communication'],
      author: 'Global Health Communication Institute',
      publishDate: '2024-12-05',
      tags: ['Health', 'Pandemic', 'Fact-checking', 'Public Health']
    }
  ];

  const VideoModal = ({ video, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{video.title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video mb-6 rounded-xl overflow-hidden">
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {video.learningObjectives?.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Topics Covered</h4>
                <ul className="space-y-2">
                  {video.keyTopics?.map((topic, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'training':
        return (
          <div className="space-y-8">
            <div className="grid gap-6">
              {trainingContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {item.duration}
                            </span>
                            <span className="flex items-center">
                              <Target className="h-4 w-4 mr-1" />
                              {item.difficulty}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Coming Soon' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.status || 'Available'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {item.status !== 'Coming Soon' && (
                        <Link to={item.link}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                          >
                            <span>Start Training</span>
                            <ArrowRight className="h-4 w-4" />
                          </motion.button>
                        </Link>
                      )}
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                        <ul className="space-y-2">
                          {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Stats</h4>
                        <div className="space-y-2">
                          {item.stats && Object.entries(item.stats).map(([key, value], idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-600">{key}</span>
                              <span className={`font-medium ${
                                key.includes('Points') ? 'text-blue-600' : 
                                key.includes('Rate') || key.includes('Success') ? 'text-green-600' : 
                                key.includes('Status') ? 'text-orange-600' : ''
                              }`}>
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-8">
            {/* Featured Video */}
            {videosContent.find(v => v.featured) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden shadow-2xl mb-8"
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div className="relative">
                    <div className="aspect-video rounded-xl overflow-hidden bg-black relative group cursor-pointer">
                      <img 
                        src={videosContent.find(v => v.featured).thumbnailUrl}
                        alt={videosContent.find(v => v.featured).title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedVideo(videosContent.find(v => v.featured))}
                          className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all duration-300"
                        >
                          <Play className="h-12 w-12 text-purple-600 ml-1" />
                        </motion.button>
                      </div>
                      
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                        <Youtube className="h-4 w-4" />
                        <span>Featured</span>
                      </div>
                      
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {videosContent.find(v => v.featured).duration}
                      </div>
                    </div>
                  </div>

                  <div className="text-white">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">Featured Video</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-2">{videosContent.find(v => v.featured).title}</h2>
                    <p className="text-purple-100 text-lg mb-4">by {videosContent.find(v => v.featured).speaker}</p>
                    
                    <p className="text-purple-50 leading-relaxed mb-6">
                      {videosContent.find(v => v.featured).description}
                    </p>
                    
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVideo(videosContent.find(v => v.featured))}
                        className="btn-secondary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2"
                      >
                        <Play className="h-5 w-5" />
                        <span>Watch Now</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Videos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videosContent.filter(v => !v.featured).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Video className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-500">{video.platform}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{video.views}</span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{video.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                    
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'podcasts':
        return (
          <div className="space-y-6">
            {podcastsContent.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {podcast.platform}
                      </span>
                      <span className="text-sm text-gray-500">{podcast.episode}</span>
                      <span className="text-sm text-gray-500">{podcast.duration}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{podcast.title}</h3>
                    <p className="text-gray-600 mb-4">{podcast.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {podcast.host}</span>
                        <span>{podcast.downloads} downloads</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{podcast.rating}</span>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Listen</span>
                      </motion.button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {podcast.topics.map((topic, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'stories':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {storiesContent.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {story.category}
                  </span>
                  <span className="text-sm text-gray-500">{story.readTime}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    story.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    story.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {story.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{story.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Lessons</h4>
                  <ul className="space-y-1">
                    {story.keyLessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <div>By {story.author}</div>
                    <div>{story.publishDate}</div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Read Story</span>
                  </motion.button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Learning Hub
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Master media literacy through comprehensive training, expert videos, insightful podcasts, and real-world case studies
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                isActive
                  ? `bg-${tab.color}-600 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <div className="text-left">
                <div>{tab.label}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {tab.description}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default LearningHub;
