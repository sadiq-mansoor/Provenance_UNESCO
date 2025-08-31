import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

const SimpleVideoTest = ({ isOpen, onClose }) => {
  console.log('SimpleVideoTest render - isOpen:', isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Maya and the Truth Compass</h2>
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-xl transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src="/images/maya-truth-compass.mp4" type="video/mp4" />
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Play className="h-16 w-16 mx-auto mb-4" />
                    <p>Video not found or failed to load</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Looking for: /images/maya-truth-compass.mp4
                    </p>
                  </div>
                </div>
              </video>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Join Maya on her journey to discover the Truth Compass and learn how to navigate the digital world with confidence.
              </p>
              <button
                onClick={onClose}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleVideoTest;