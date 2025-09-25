"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressHeader from '@/components/ui/ProgressHeader';
import YellowCard from '@/components/ui/YellowCard';
import ChatBubble from '@/components/ui/ChatBubble';
import ChoiceChip from '@/components/ui/ChoiceChip';
import PillButton from '@/components/ui/PillButton';
import { UserProfile } from '@/app/page';
import { 
  educationOptions, 
  skillsOptions, 
  sectorsOptions, 
  locationOptions,
  chatMessages 
} from '@/lib/mockData';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export default function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    skills: [],
    sectors: []
  });
  const [cityInput, setCityInput] = useState('');

  const totalSteps = 5;

  const handleEducationSelect = (education: string) => {
    setProfile(prev => ({ ...prev, education }));
    setTimeout(() => setCurrentStep(2), 500);
  };

  const handleSkillToggle = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  const handleSectorToggle = (sector: string) => {
    setProfile(prev => {
      const currentSectors = prev.sectors || [];
      if (currentSectors.includes(sector)) {
        return { ...prev, sectors: currentSectors.filter(s => s !== sector) };
      } else if (currentSectors.length < 3) {
        return { ...prev, sectors: [...currentSectors, sector] };
      }
      return prev;
    });
  };

  const handleLocationSelect = (location: string) => {
    setProfile(prev => ({ ...prev, location }));
    setTimeout(() => setCurrentStep(5), 500);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

   const handleComplete = () => {
    const finalProfile: UserProfile = {
      email: 'user@example.com', // Mock email
      education: profile.education || '',
      skills: profile.skills || [],
      sectors: profile.sectors || [],
      location: profile.location || cityInput || '',
      name: 'User'
    };
    
    // Small delay to show completion, then navigate
    setTimeout(() => {
      onComplete(finalProfile);
    }, 500);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2: return (profile.skills?.length || 0) > 0;
      case 3: return (profile.sectors?.length || 0) > 0;
      case 4: return profile.location || cityInput;
      default: return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <ChatBubble message={chatMessages.education} />
            <div className="grid grid-cols-2 gap-3">
              {educationOptions.map((option) => (
                <ChoiceChip
                  key={option}
                  selected={profile.education === option}
                  onClick={() => handleEducationSelect(option)}
                >
                  {option}
                </ChoiceChip>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <ChatBubble message={chatMessages.skills} />
            <div className="grid grid-cols-2 gap-3">
              {skillsOptions.map((skill) => (
                <ChoiceChip
                  key={skill}
                  selected={profile.skills?.includes(skill)}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </ChoiceChip>
              ))}
            </div>
            <div className="flex justify-end">
              <PillButton onClick={handleNext} disabled={!canProceed()}>
                Continue
              </PillButton>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <ChatBubble message={chatMessages.sectors} />
            <p className="text-sm text-text-muted">Select up to 3 sectors</p>
            <div className="grid grid-cols-2 gap-3">
              {sectorsOptions.map((sector) => (
                <ChoiceChip
                  key={sector}
                  selected={profile.sectors?.includes(sector)}
                  onClick={() => handleSectorToggle(sector)}
                  disabled={!profile.sectors?.includes(sector) && (profile.sectors?.length || 0) >= 3}
                >
                  {sector}
                </ChoiceChip>
              ))}
            </div>
            <div className="flex justify-end">
              <PillButton onClick={handleNext} disabled={!canProceed()}>
                Continue
              </PillButton>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <ChatBubble message={chatMessages.location} />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {locationOptions.map((location) => (
                <ChoiceChip
                  key={location}
                  selected={profile.location === location}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </ChoiceChip>
              ))}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-dark">
                Or type a specific city:
              </label>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Type city or Remote..."
                className="w-full px-4 py-3 rounded-full border-2 border-accent-yellow bg-white text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all"
              />
              <p className="text-xs text-text-muted">Example: Delhi, Bengaluru, Remote</p>
            </div>
            <div className="flex justify-end">
              <PillButton onClick={handleNext} disabled={!canProceed()}>
                Continue
              </PillButton>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <ChatBubble message={chatMessages.confirmation} />
            
            {/* Profile Summary */}
            <div className="bg-chip-background border-2 border-border-dark rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-dark">Education:</span>
                <span className="text-text-muted">{profile.education}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-text-dark">Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {profile.skills?.map((skill) => (
                    <span key={skill} className="bg-white px-2 py-1 rounded-lg text-xs border border-chip-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-text-dark">Sectors:</span>
                <div className="flex flex-wrap gap-1">
                  {profile.sectors?.map((sector) => (
                    <span key={sector} className="bg-white px-2 py-1 rounded-lg text-xs border border-chip-border">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-dark">Location:</span>
                <span className="text-text-muted">{profile.location || cityInput}</span>
              </div>
            </div>

             <div className="flex gap-3">
              <PillButton 
                variant="white" 
                onClick={() => setCurrentStep(1)}
                className="flex-1"
              >
                Edit Profile
              </PillButton>
              <PillButton 
                variant="primary" 
                onClick={handleComplete}
                className="flex-1"
                disabled={!profile.education || !profile.skills?.length || !profile.sectors?.length}
              >
                Complete Profile
              </PillButton>
            </div>

            <p className="text-xs text-text-muted text-center">
              Your answers are autosaved. You can change them anytime.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

   return (
    <div 
      className="ios-scroll-fix" 
      style={{ backgroundColor: '#FBFCFD' }}
    >
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={currentStep === 1 ? onBack : () => setCurrentStep(prev => prev - 1)}
        title="Tell us about you"
      />
      
      <div className="ios-scroll-content px-4 pb-8">
        <YellowCard className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </YellowCard>
      </div>
    </div>
  );
}
