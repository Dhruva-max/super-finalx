"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import JobCard from '@/components/ui/JobCard';
import ChoiceChip from '@/components/ui/ChoiceChip';
import { UserProfile, Internship } from '@/app/page';
import { mockInternships } from '@/lib/mockData';

interface RecommendationsScreenProps {
  userProfile: UserProfile | null;
  onInternshipSelect: (internship: Internship) => void;
  onBack: () => void;
}

export default function RecommendationsScreen({
  userProfile,
  onInternshipSelect,
  onBack
}: RecommendationsScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [savedInternships, setSavedInternships] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('match');

  const filterOptions = ['All', 'Best match', 'Remote', 'Delhi NCR', 'Part-time'];
  
  const filteredInternships = mockInternships.filter(internship => {
    switch (selectedFilter) {
      case 'Remote':
        return internship.mode.includes('Remote');
      case 'Delhi NCR':
        return internship.location.includes('Delhi');
      case 'Best match':
        return internship.matchScore >= 90;
      case 'Part-time':
        return internship.duration.includes('3-4') || internship.duration.includes('2-4');
      default:
        return true;
    }
  });

  const sortedInternships = [...filteredInternships].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'stipend':
        // Simple stipend comparison (extract number from string)
        const aStipend = parseInt(a.stipend.replace(/[^\d]/g, '')) || 0;
        const bStipend = parseInt(b.stipend.replace(/[^\d]/g, '')) || 0;
        return bStipend - aStipend;
      default:
        return b.matchScore - a.matchScore;
    }
  });

  const handleSave = (internshipId: string) => {
    setSavedInternships(prev => 
      prev.includes(internshipId) 
        ? prev.filter(id => id !== internshipId)
        : [...prev, internshipId]
    );
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 space-y-6"
    >
      <div className="w-24 h-24 mx-auto bg-chip-background border-2 border-chip-border rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div>
        <h3 className="font-display font-bold text-lg text-text-dark mb-2">
          No matches found
        </h3>
        <p className="text-text-muted text-sm mb-4">
          Let's refine your profile to find better matches
        </p>
        <button
          onClick={onBack}
          className="bg-primary-blue text-white px-6 py-2 rounded-full border-thick font-semibold hover:scale-105 transition-transform"
        >
          Update Profile
        </button>
      </div>
      
      <div className="space-y-2 text-xs text-text-muted">
        <p>• Try selecting different skills or sectors</p>
        <p>• Consider expanding your location preferences</p>
        <p>• Check if your education level matches available internships</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-app-background">
 
      
      <div className="px-4 pb-8 space-y-4">
        {/* Header Section */}
        <div className="space-y-4">
          <div>
            <h2 className="font-display font-bold text-2xl text-text-dark">
              Your Top Matches
            </h2>
            <p className="text-text-muted text-sm">
              {sortedInternships.length} internships picked just for you
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((filter) => (
              <ChoiceChip
                key={filter}
                selected={selectedFilter === filter}
                onClick={() => setSelectedFilter(filter)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {filter}
              </ChoiceChip>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-border-dark rounded-lg px-3 py-1 text-sm font-medium text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue"
            >
              <option value="match">Match score</option>
              <option value="stipend">Stipend</option>
            </select>
          </div>
        </div>

        {/* Internship Cards */}
        <div className="space-y-4">
          {sortedInternships.length > 0 ? (
            sortedInternships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <JobCard
                  internship={internship}
                  onDetails={() => onInternshipSelect(internship)}
                  onSave={() => handleSave(internship.id)}
                  saved={savedInternships.includes(internship.id)}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Bottom Actions (if internships exist) */}
        {sortedInternships.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 pt-4"
          >
            <button
              onClick={onBack}
              className="flex-1 bg-white text-text-dark border-thick py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button className="flex-1 bg-success-green text-white border-thick py-3 rounded-full font-semibold hover:scale-105 transition-transform">
              See All ({mockInternships.length})
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}