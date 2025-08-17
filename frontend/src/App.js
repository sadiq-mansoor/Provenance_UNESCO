import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, Brain, Users, Trophy, Home, Shield, Eye, 
  Zap, BookOpen, Award, CheckCircle2, AlertTriangle,
  Microscope, Globe, Camera
} from 'lucide-react';
import UploadTest from './components/UploadTest';
import Quiz from './components/Quiz';
import ForensicLab from './components/ForensicLab';
import ForensicsDemo from './components/ForensicsDemo';
import LearningHub from './components/LearningHub';
import SocialFeed from './components/SocialFeed';
import Leaderboard from './components/Leaderboard';
import './index.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleUsernameSubmit = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  if (!username) {
    return <UsernamePrompt onSubmit={handleUsernameSubmit} />;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage username={username} />} />
            <Route path="/upload" element={<UploadTest />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/forensic-lab" element={<ForensicLab />} />
            <Route path="/resources" element={<LearningHub />} />
            <Route path="/feed" element={<SocialFeed />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function UsernamePrompt({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="animated-bg absolute inset-0 opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-violet-400 to-electric-400 rounded-2xl opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-electric-400 to-neon-400 rounded-full opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-violet-400 to-deepblue-400 transform rotate-45 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card max-w-2xl w-full mx-6 relative z-10"
      >
        {/* Glowing Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-500 to-electric-500 rounded-3xl mb-6 shadow-2xl floating-element"
          >
            <Shield className="h-12 w-12 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold text-white mb-4 neon-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Provenance
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 leading-relaxed mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Become a digital truth seeker! Learn to spot AI-generated content and protect yourself from misinformation
          </motion.p>
          
          {/* Animated Feature Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="glass-card px-4 py-2 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-electric-400" />
              <span className="text-white/90 text-sm font-medium">Real-time Analysis</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center space-x-2">
              <Eye className="h-4 w-4 text-violet-400" />
              <span className="text-white/90 text-sm font-medium">Deepfake Detection</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center space-x-2">
              <Brain className="h-4 w-4 text-neon-400" />
              <span className="text-white/90 text-sm font-medium">AI Training</span>
            </div>
          </motion.div>
        </div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div>
            <label htmlFor="username" className="block text-lg font-semibold text-white/90 mb-4">
              Choose your username
            </label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 text-white text-lg placeholder-white/50 backdrop-blur-sm"
              placeholder="Enter your username..."
              required
            />
          </div>
          
          <motion.button 
            type="submit" 
            className="btn-neon w-full text-xl py-6 font-bold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Analysis
          </motion.button>
        </motion.form>
        
        {/* Trust Badges */}
        <motion.div 
          className="mt-8 pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <div className="flex items-center justify-center space-x-8 text-sm text-white/70">
            <div className="flex items-center space-x-2 interactive-hover">
              <CheckCircle2 className="h-4 w-4 text-neon-400" />
              <span>Industry Verified</span>
            </div>
            <div className="flex items-center space-x-2 interactive-hover">
              <Shield className="h-4 w-4 text-electric-400" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2 interactive-hover">
              <Award className="h-4 w-4 text-violet-400" />
              <span>Educational Certified</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Changed threshold to 50px for smoother transition
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ease-in-out transform ${
      isScrolled 
        ? 'bg-white/10 backdrop-blur-md shadow-2xl border-b border-white/10 mx-4 mt-2 rounded-2xl translate-y-0' 
        : 'bg-transparent backdrop-blur-none shadow-none border-none mx-4 mt-4 rounded-none -translate-y-1'
    }`}>
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div 
              className="bg-gradient-to-br from-violet-500 to-electric-500 p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 floating-element"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Shield className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-deepblue-700 to-violet-700 bg-clip-text text-transparent">
                Provenance
              </span>
              <div className="text-xs text-softgray-500 font-medium">Media Literacy Platform</div>
            </div>
          </Link>
          
          <div className="flex space-x-2">
            <NavLink to="/" icon={Home} text="Hub" />
            <NavLink to="/feed" icon={Globe} text="Cases" />
            <NavLink to="/upload" icon={Microscope} text="Scan" />
            <NavLink to="/resources" icon={BookOpen} text="Learn" />
            <NavLink to="/leaderboard" icon={Award} text="Ranks" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon: Icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-bold text-softgray-700 hover:text-violet-700 hover:bg-gradient-to-r hover:from-violet-50 hover:to-electric-50 transition-all duration-300 group interactive-hover"
    >
      <Icon className="h-5 w-5 group-hover:scale-125 group-hover:text-violet-600 transition-all duration-300" />
      <span className="group-hover:animate-pulse">{text}</span>
    </Link>
  );
}

function HomePage({ username }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Dashboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-0"
        >
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold mb-6 neon-text"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Hey {username}!
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-softgray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Empowering youth to spot truth in the digital age, together we build a more informed and resilient world.
          </motion.p>
        </motion.div>
      </div>

      {/* Full-width blue container after "Hey demo!" section */}
      <motion.div 
        className="relative mb-28 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Large Typography Impact */}
        <div className="relative bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 rounded-3xl p-20 md:p-32 overflow-hidden my-0 mx-8 max-w-none">
          {/* Geometric Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute -top-20 -left-20 w-80 h-80 bg-electric-500 rounded-full opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500 opacity-10"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Bold Statement */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-6"
              >
                <div className="inline-flex items-center space-x-2 bg-electric-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <span>FAKE NEWS CRISIS</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-5xl md:text-7xl font-black text-white leading-none mb-6"
              >
                WHY AI <span className="bg-gradient-to-r from-electric-400 to-neon-400 bg-clip-text text-transparent">DETECTION</span>
                <br />
                MATTERS
              </motion.h2>

              <motion.p
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-white/80 text-lg leading-relaxed mb-8"
              >
                Fake news, misleading stories, and AI-generated content have become one of the biggest challenges of 2025. While they've unlocked new creativity, they also threaten the trust we place in information. Provenance is a Media Literacy Platform that helps people verify content, recognize mis-, dis-, and malinformation, and navigate today's digital world with confidence.
              </motion.p>

              {/* Keyboard Image Integration */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="relative mb-8 inline-block max-w-md"
              >
                <img 
                  src="/images/fake-news-keyboard.jpg" 
                  alt="Fake News vs Facts keyboard keys"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-electric-500/20 to-violet-500/20 rounded-2xl"></div>
              </motion.div>
            </div>

            {/* Right Side - Visual Elements & Stats */}
            <div className="relative">
              {/* Muting Misinformation Illustration */}
              <motion.div
                initial={{ x: 50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
                className="relative mb-8"
              >
                <img 
                  src="/images/mute-misinformation.png" 
                  alt="Muting Misinformation illustration"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deepblue-900/30 to-transparent rounded-2xl"></div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="space-y-6"
              >
                {/* Large Number Display */}
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-6xl font-black text-electric-400 mb-2">73%</div>
                  <div className="text-white/70 text-sm uppercase tracking-wide">
                    of users can't identify deepfakes
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-neon-400 mb-1">2.4B</div>
                    <div className="text-white/70 text-xs">Fake posts daily</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-violet-400 mb-1">15s</div>
                    <div className="text-white/70 text-xs">To create deepfake</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Quote */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2.0, type: "spring" }}
                className="absolute -top-4 -right-4 bg-electric-500 text-white p-3 rounded-2xl shadow-2xl transform rotate-12 z-10"
              >
                <div className="text-xl font-bold">"STOP"</div>
                <div className="text-xs">Misinformation</div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement Section in constrained container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-violet-50 to-electric-50 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-100/20 to-electric-100/20"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-softgray-900 mb-6">
                THE SOLUTION
              </h3>
              <p className="text-xl text-softgray-700 leading-relaxed mb-8">
                Train the next generation of digital natives to identify AI-generated content, 
                understand provenance signals, and protect information integrity through 
                hands-on detection training.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
                  <CheckCircle2 className="h-5 w-5 text-neon-500" />
                  <span className="font-semibold text-softgray-800">C2PA Verified</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
                  <Eye className="h-5 w-5 text-electric-500" />
                  <span className="font-semibold text-softgray-800">SynthID Detection</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Feature Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <FeatureCard
            to="/upload"
            icon={Microscope}
            title="Content Analysis"
            description="Verify media authenticity with advanced detection algorithms and detailed provenance reports."
            color="violet"
            emoji=""
            delay={0}
          />
          <FeatureCard
            to="/feed"
            icon={Globe}
            title="Case Research"
            description="Analyze documented misinformation campaigns and learn from real-world examples."
            color="neon"
            emoji=""
            delay={0.1}
          />
          <FeatureCard
            to="/leaderboard"
            icon={Award}
            title="Progress Tracking"
            description="Monitor learning outcomes and benchmark performance against industry standards."
            color="deepblue"
            emoji=""
            delay={0.2}
          />
        </motion.div>
        
        {/* The Problem vs Solution Infographic */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-300 transform -translate-x-12 translate-y-12 geometric-clip"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-300" />
                  <span className="text-red-200 font-bold uppercase tracking-wide">The Problem</span>
                </div>
                
                <h3 className="text-4xl font-black mb-6 editorial-heading">
                  MISINFORMATION
                  <br />
                  EPIDEMIC
                </h3>
                
                <div className="space-y-4 text-red-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>AI content spreads 6x faster than real news</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>73% of young people can't spot deepfakes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Elections, disasters, and crises targeted</span>
                  </div>
                </div>
                
                <div className="mt-8 text-6xl font-black text-red-300 opacity-50">
                  WARNING
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-gradient-to-br from-neon-600 to-electric-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-28 h-28 bg-neon-300 rounded-full transform -translate-x-14 -translate-y-14"></div>
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-electric-300 transform translate-x-18 translate-y-18 diagonal-split"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <Shield className="h-6 w-6 text-neon-200" />
                  <span className="text-neon-100 font-bold uppercase tracking-wide">The Solution</span>
                </div>
                
                <h3 className="text-4xl font-black mb-6 editorial-heading">
                  PROVENANCE
                  <br />
                  TRAINING
                </h3>
                
                <div className="space-y-4 text-neon-100">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-neon-300" />
                    <span>Real-time C2PA content verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-neon-300" />
                    <span>SynthID watermark detection training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-neon-300" />
                    <span>Hands-on scenario-based learning</span>
                  </div>
                </div>
                
                <div className="mt-8 text-6xl font-black text-neon-200 opacity-50">
                  PROTECTION
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="card-glow text-center"
        >
          <h3 className="text-2xl font-bold text-softgray-900 mb-8">Powered by Industry Leaders</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <motion.div 
              className="flex flex-col items-center space-y-3 interactive-hover"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-deepblue-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-bold text-softgray-700">C2PA Coalition</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center space-y-3 interactive-hover"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-electric-500 to-neon-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-bold text-softgray-700">Google SynthID</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center space-y-3 interactive-hover"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-deepblue-500 rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-bold text-softgray-700">Linux Foundation</span>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center space-y-3 interactive-hover"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-neon-500 to-electric-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-bold text-softgray-700">Meta Research</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function FeatureCard({ to, icon: Icon, title, description, color, emoji, delay = 0 }) {
  const colorClasses = {
    violet: 'from-violet-500 to-violet-600',
    electric: 'from-electric-500 to-electric-600',
    neon: 'from-neon-500 to-neon-600',
    deepblue: 'from-deepblue-500 to-deepblue-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        rotateY: 5,
      }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <Link to={to} className="block">
        <div className="card-interactive pixel-border relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-electric-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating emoji */}
          <motion.div 
            className="absolute top-4 right-4 text-2xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {emoji}
          </motion.div>
          
          {/* Icon with glow effect */}
          <motion.div 
            className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-6 shadow-2xl relative z-10`}
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)"
            }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="h-10 w-10 text-white" />
          </motion.div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-softgray-900 mb-4 group-hover:text-violet-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-softgray-600 leading-relaxed mb-6">
              {description}
            </p>
            
            {/* Animated CTA */}
            <motion.div 
              className="flex items-center text-violet-600 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <span className="text-lg">Get Started</span>
              <motion.svg 
                className="w-6 h-6 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.div>
          </div>
          
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
      </Link>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="mt-20 mx-4 mb-4">
      <div className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 rounded-3xl">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-violet-500 to-electric-500 p-3 rounded-2xl shadow-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-deepblue-700 to-violet-700 bg-clip-text text-transparent">
                    Provenance
                  </h3>
                  <p className="text-white/70 text-sm">Media Literacy Platform</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                Empowering the next generation with cutting-edge media literacy skills to combat misinformation and protect digital truth.
              </p>
              <div className="flex space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-violet-100 to-electric-100 rounded-xl flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Globe className="h-6 w-6 text-violet-600" />
                </motion.div>
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-electric-100 to-neon-100 rounded-xl flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <BookOpen className="h-6 w-6 text-electric-600" />
                </motion.div>
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-neon-100 to-violet-100 rounded-xl flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <Award className="h-6 w-6 text-neon-600" />
                </motion.div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Access</h4>
              <ul className="space-y-3">
                <li><Link to="/upload" className="text-white/70 hover:text-violet-300 transition-colors duration-200 flex items-center space-x-2"><Microscope className="h-4 w-4" /><span>Media Scanner</span></Link></li>
                <li><Link to="/feed" className="text-white/70 hover:text-violet-300 transition-colors duration-200 flex items-center space-x-2"><Globe className="h-4 w-4" /><span>Case Studies</span></Link></li>
                <li><Link to="/leaderboard" className="text-white/70 hover:text-violet-300 transition-colors duration-200 flex items-center space-x-2"><Trophy className="h-4 w-4" /><span>Leaderboard</span></Link></li>
              </ul>
            </div>
            
            {/* Tech Info */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Powered By</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                  <span className="text-white/70">C2PA Content Credentials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                  <span className="text-white/70">Google SynthID Detection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-400 rounded-full"></div>
                  <span className="text-white/70">Advanced AI Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-deepblue-400 rounded-full"></div>
                  <span className="text-white/70">Real-time Processing</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © 2025 Provenance. Built for digital truth seekers worldwide.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-white/60">Made with</span>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">dedication</span>
                <span className="text-white/70 font-medium">for youth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
