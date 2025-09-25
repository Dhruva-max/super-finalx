"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Internship, UserProfile } from '@/app/page';
import PillButton from '@/components/ui/PillButton';

interface InternshipDetailsProps {
  internship: Internship;
  onBack: () => void;
  onApply: () => void;
  userProfile: UserProfile | null;
}

export default function InternshipDetails({
  internship,
  onBack,
  onApply,
  userProfile
}: InternshipDetailsProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [saved, setSaved] = useState(false);

   const handleApply = () => {
    onApply();
  };

  const getSkillMatch = (skill: string) => {
    if (userProfile?.skills.includes(skill)) return 'have';
    // Simple logic for skills to develop vs optional
    const developSkills = ['Python', 'JavaScript', 'React', 'Data Analysis'];
    if (developSkills.includes(skill)) return 'develop';
    return 'optional';
  };

  const getSkillColor = (matchType: string) => {
    switch (matchType) {
      case 'have': return 'bg-success-green text-white';
      case 'develop': return 'bg-accent-yellow text-text-dark';
      default: return 'bg-chip-background text-text-muted border border-chip-border';
    }
  };

   return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 ios-scroll-fix"
      style={{ backgroundColor: '#FBFCFD' }}
    >
      {/* Header */}
      <div className="safe-top bg-white border-b-2 border-border-dark px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-display font-bold text-xl text-text-dark">
            Internship Details
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 rounded-full border-2 border-border-dark transition-colors ${
              saved ? 'bg-accent-yellow' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="p-2 rounded-full border-2 border-border-dark bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

       {/* Content */}
      <div className="ios-scroll-content px-4 pb-24">
        {/* Company Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-thick rounded-3xl p-6 mb-6 shadow-yellow-sticker"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-success-green rounded-2xl border-thick flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{internship.companyInitials}</span>
              </div>
              
              <div>
                <h2 className="font-display font-bold text-xl text-text-dark leading-tight">
                  {internship.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-text-dark">{internship.company}</span>
                  {internship.verified && (
                    <div className="w-5 h-5 bg-success-green rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-text-muted text-sm mt-1">Government • Large Organization</p>
              </div>
            </div>
            
            <div className="bg-accent-yellow rounded-lg px-3 py-1 border-2 border-border-dark">
              <span className="font-bold text-sm text-success-green">{internship.matchScore}% match</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <div className="bg-white border-2 border-border-dark rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm font-medium">{internship.duration}</span>
          </div>
          
          <div className="bg-white border-2 border-border-dark rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z"/>
            </svg>
            <span className="text-sm font-medium">{internship.matchScore}% AI match</span>
          </div>
          
          <div className="bg-white border-2 border-border-dark rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3L12 12V7h1.5v4.3l3.8 3.8-1 1z"/>
            </svg>
            <span className="text-sm font-medium">{internship.stipend}</span>
          </div>
          
          <div className="bg-white border-2 border-border-dark rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-sm font-medium">{internship.location} • {internship.mode}</span>
          </div>
        </motion.div>

        {/* About the role */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-thick rounded-3xl p-6 mb-6"
        >
          <h3 className="font-display font-bold text-lg text-text-dark mb-3">About the role</h3>
          <p className="text-text-muted leading-relaxed mb-4">
            {internship.description}
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-text-dark">Responsibilities:</h4>
            <ul className="space-y-1 text-sm text-text-muted">
              <li>• Analyze large datasets using Python and Excel</li>
              <li>• Create comprehensive reports on policy impacts</li>
              <li>• Collaborate with senior analysts on government initiatives</li>
              <li>• Present findings to stakeholders and policy makers</li>
            </ul>
          </div>
        </motion.section>

        {/* Key skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-thick rounded-3xl p-6 mb-6"
        >
          <h3 className="font-display font-bold text-lg text-text-dark mb-3">Key skills</h3>
          <div className="grid grid-cols-2 gap-2">
            {internship.skills.map((skill) => {
              const matchType = getSkillMatch(skill);
              return (
                <span 
                  key={skill}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${getSkillColor(matchType)}`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
          
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success-green rounded"></div>
              <span className="text-text-muted">Skills you have</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent-yellow rounded"></div>
              <span className="text-text-muted">Skills to develop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-chip-background border border-chip-border rounded"></div>
              <span className="text-text-muted">Optional skills</span>
            </div>
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-thick rounded-3xl p-6 mb-6"
        >
          <h3 className="font-display font-bold text-lg text-text-dark mb-3">Requirements</h3>
          <ul className="space-y-2">
            {internship.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success-green rounded-full mt-2"></div>
                <span className="text-text-muted text-sm">{requirement}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Match Explanation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-success-green border-thick rounded-3xl p-6 mb-6 text-white"
        >
          <h3 className="font-display font-bold text-lg mb-3">Why you're a good fit</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Skills alignment</span>
              <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <span className="text-sm font-bold">85%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Location match</span>
              <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
              <span className="text-sm font-bold">100%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Education fit</span>
              <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
              <span className="text-sm font-bold">95%</span>
            </div>
          </div>
          
          <p className="text-sm mt-4 opacity-90">
            Your background in data analysis and interest in public policy make you an excellent candidate for this role.
          </p>
        </motion.section>

        {/* AI Suggestions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary-blue border-thick rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-blue font-bold text-sm">AI</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm">
                This role matches your interest in civic data analysis. Want me to help tailor your application?
              </p>
              
              <div className="flex gap-2">
                <button className="bg-white text-primary-blue px-4 py-2 rounded-full text-sm font-semibold border-2 border-white hover:bg-gray-50 transition-colors">
                  Draft cover note
                </button>
                <button className="bg-accent-yellow text-text-dark px-4 py-2 rounded-full text-sm font-semibold border-2 border-accent-yellow hover:bg-yellow-400 transition-colors">
                  Tailor resume
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-border-dark safe-bottom px-4 py-3">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => setSaved(!saved)}
            className="bg-white text-text-dark border-thick py-3 px-6 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Save for Later
          </button>
          
          <PillButton
            onClick={handleApply}
            disabled={isApplying}
            variant="primary"
            size="lg"
            className="flex-1"
          >
            {isApplying ? 'Applying...' : 'Apply Now'}
          </PillButton>
        </div>
      </div>
    </motion.div>
  );
}