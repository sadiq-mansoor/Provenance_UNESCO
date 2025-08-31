import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';

const WelcomeVideoModal = ({ isOpen, onClose, onSkip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    if (videoRef && isOpen) {
      const video = videoRef;
      
      const handleEnded = () => {
        setIsPlaying(false);
        setTimeout(() => onClose(), 1000);
      };

      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [videoRef, isOpen, onClose]);

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 rounded-t-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Maya and the Truth Compass</h3>
                  <p className="text-white/70 text-sm">Welcome to Provenance</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black rounded-b-2xl overflow-hidden">
              <video
                ref={setVideoRef}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                playsInline
                controls
              >
                <source src="/images/maya-truth-compass.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Simple play overlay when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button
                    onClick={togglePlay}
                    className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Simple bottom bar */}
            <div className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 rounded-b-2xl p-3 -mt-2">
              <div className="flex items-center justify-between">
                <p className="text-white/80 text-sm">Interactive Story Experience</p>
                <button
                  onClick={() => { onSkip(); onClose(); }}
                  className="text-white/70 hover:text-white text-sm px-3 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeVideoModal;