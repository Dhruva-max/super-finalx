"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from '@/components/LoginScreen';
import OnboardingFlow from '@/components/OnboardingFlow';
import LoadingScreen from '@/components/LoadingScreen';
import RecommendationsScreen from '@/components/RecommendationsScreen';
import InternshipDetails from '@/components/InternshipDetails';
import ApplicationFlow from '@/components/ApplicationFlow';
import ApplicationStatus from '@/components/ApplicationStatus';

export type Screen = 
  | 'login' 
  | 'onboarding' 
  | 'loading' 
  | 'recommendations' 
  | 'details'
  | 'apply'
  | 'status';

export interface UserProfile {
  email: string;
  education: string;
  skills: string[];
  sectors: string[];
  location: string;
  name?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyInitials: string;
  location: string;
  mode: string;
  duration: string;
  stipend: string;
  matchScore: number;
  description: string;
  skills: string[];
  requirements: string[];
  verified: boolean;
}

export default function Home() {
   const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('loading');
  };

  const handleLoadingComplete = () => {
    setCurrentScreen('recommendations');
  };

   const handleInternshipSelect = (internship: Internship) => {
    setSelectedInternship(internship);
    setCurrentScreen('details');
  };

  const handleApplyClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setCurrentScreen('apply');
  };

  const handleApplicationSubmit = (data: any) => {
    const enhancedData = {
      ...data,
      internshipTitle: selectedInternship?.title,
      company: selectedInternship?.company
    };
    setApplicationData(enhancedData);
    setCurrentScreen('status');
  };

    const handleBack = () => {
    switch (currentScreen) {
      case 'status':
        setCurrentScreen('recommendations');
        break;
      case 'apply':
        setCurrentScreen('details');
        break;
      case 'details':
        setCurrentScreen('recommendations');
        break;
      case 'recommendations':
        setCurrentScreen('loading');
        break;
      case 'loading':
        setCurrentScreen('onboarding');
        break;
      case 'onboarding':
        setCurrentScreen('login');
        break;
      default:
        break;
    }
  };

  const handleBackFromOnboarding = () => {
    setCurrentScreen('login');
  };

  const handleBackFromRecommendations = () => {
    setCurrentScreen('onboarding');
  };

  const screenVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0
    }
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {currentScreen === 'login' && (
            <LoginScreen onLogin={handleLogin} />
          )}
          
           {currentScreen === 'onboarding' && (
            <OnboardingFlow 
              onComplete={handleOnboardingComplete}
              onBack={handleBackFromOnboarding}
            />
          )}
          
          {currentScreen === 'loading' && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}
          
           {currentScreen === 'recommendations' && (
            <RecommendationsScreen 
              userProfile={userProfile}
              onInternshipSelect={handleInternshipSelect}
              onBack={handleBackFromRecommendations}
            />
          )}
          
           {currentScreen === 'details' && selectedInternship && (
            <InternshipDetails 
              internship={selectedInternship}
              onBack={handleBack}
              onApply={() => handleApplyClick(selectedInternship)}
              userProfile={userProfile}
            />
          )}

          {currentScreen === 'apply' && selectedInternship && (
            <ApplicationFlow 
              internship={selectedInternship}
              userProfile={userProfile}
              onBack={handleBack}
              onSubmit={handleApplicationSubmit}
            />
          )}

          {currentScreen === 'status' && applicationData && (
            <ApplicationStatus 
              applicationData={applicationData}
              onBack={() => setCurrentScreen('recommendations')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}