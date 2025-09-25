"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import YellowCard from '@/components/ui/YellowCard';
import { loadingMessages } from '@/lib/mockData';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rotate messages every 2 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Cleanup on unmount
    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const BrainIcon = () => (
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-24 h-24 bg-primary-blue rounded-full border-thick flex items-center justify-center relative"
    >
      {/* Pulsing glow effect */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-primary-blue rounded-full opacity-30"
      />
      
      {/* Brain Icon */}
      <svg 
        className="w-12 h-12 text-white z-10" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </motion.div>
  );

   return (
    <div 
      className="min-h-screen flex items-center justify-center p-4" 
      style={{ backgroundColor: '#FBFCFD' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <YellowCard className="text-center space-y-8">
          {/* AI Brain Animation */}
          <div className="flex justify-center">
            <BrainIcon />
          </div>

          {/* Main Loading Message */}
          <div className="space-y-4">
            <motion.h2
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-display font-bold text-xl text-text-dark"
            >
              {loadingMessages[currentMessageIndex]}
            </motion.h2>
            
            <p className="text-text-muted text-sm">
              Usually takes 5–10 seconds
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-text-muted">
              {Math.round(Math.min(progress, 100))}% complete
            </p>
          </div>

          {/* Additional Status Messages */}
          <div className="space-y-2">
            <motion.div 
              className="flex items-center justify-center gap-2"
              animate={{ opacity: progress > 25 ? 1 : 0.3 }}
            >
              <div className="w-2 h-2 bg-success-green rounded-full" />
              <span className="text-xs text-text-muted">Profile analyzed</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center gap-2"
              animate={{ opacity: progress > 50 ? 1 : 0.3 }}
            >
              <div className="w-2 h-2 bg-success-green rounded-full" />
              <span className="text-xs text-text-muted">Internships matched</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center gap-2"
              animate={{ opacity: progress > 75 ? 1 : 0.3 }}
            >
              <div className="w-2 h-2 bg-success-green rounded-full" />
              <span className="text-xs text-text-muted">Recommendations ready</span>
            </motion.div>
          </div>

          {/* Gear Animation as Additional Visual */}
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-8 h-8 text-accent-yellow"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
              </svg>
            </motion.div>
          </div>
        </YellowCard>
      </motion.div>
    </div>
  );
}
