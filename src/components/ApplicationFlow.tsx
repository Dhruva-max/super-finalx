"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Internship, UserProfile } from '@/app/page';

interface ApplicationFlowProps {
  internship: Internship;
  userProfile: UserProfile | null;
  onBack: () => void;
  onSubmit: (applicationData: any) => void;
}

export default function ApplicationFlow({
  internship,
  userProfile,
  onBack,
  onSubmit
}: ApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    fullName: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: '',
    resume: null as File | null,
    resumeUrl: '',
    coverLetter: '',
    availability: 'Immediately',
    workHours: '40 hours/week',
    workMode: 'Hybrid'
  });

  const totalSteps = 3;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setApplicationData(prev => ({
        ...prev,
        resume: file,
        resumeUrl: URL.createObjectURL(file)
      }));
    } else {
      alert('Please upload a PDF file only');
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const finalData = {
      ...applicationData,
      internshipId: internship.id,
      applicationId: `${internship.company.substring(0, 2).toUpperCase()}-${internship.title.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9999)}`,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };
    onSubmit(finalData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl mb-2" style={{ color: '#111827' }}>
                Personal Information
              </h2>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                Please verify your details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={applicationData.fullName}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                  style={{
                    border: '3px solid #000000',
                    color: '#111827',
                    fontSize: '16px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2E6CF6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(46, 108, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#000000';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                  style={{
                    border: '3px solid #000000',
                    color: '#111827',
                    fontSize: '16px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2E6CF6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(46, 108, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#000000';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                  style={{
                    border: '3px solid #000000',
                    color: '#111827',
                    fontSize: '16px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2E6CF6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(46, 108, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#000000';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl mb-2" style={{ color: '#111827' }}>
                Upload Documents
              </h2>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                Upload your resume and write a cover letter
              </p>
            </div>

            <div className="space-y-4">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Resume (PDF only) *
                </label>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer hover:bg-gray-50"
                  style={{
                    borderColor: applicationData.resume ? '#10B981' : '#000000',
                    backgroundColor: applicationData.resume ? '#F0FDF4' : 'white'
                  }}
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  {applicationData.resume ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#111827' }}>
                          {applicationData.resume.name}
                        </p>
                        <p style={{ color: '#6B7280', fontSize: '12px' }}>
                          {(applicationData.resume.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        className="text-blue-600 text-sm underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setApplicationData(prev => ({ ...prev, resume: null, resumeUrl: '' }));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#111827' }}>
                          Click to upload resume
                        </p>
                        <p style={{ color: '#6B7280', fontSize: '12px' }}>
                          PDF files only, max 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-white transition-all focus:outline-none resize-none"
                  style={{
                    border: '3px solid #000000',
                    color: '#111827',
                    fontSize: '16px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2E6CF6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(46, 108, 246, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#000000';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Why are you interested in this internship? What makes you a good fit?"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl mb-2" style={{ color: '#111827' }}>
                Availability & Preferences
              </h2>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                Tell us about your availability
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  When can you start?
                </label>
                <select
                  value={applicationData.availability}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                  style={{
                    border: '3px solid #000000',
                    color: '#111827',
                    fontSize: '16px'
                  }}
                >
                  <option value="Immediately">Immediately</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  How many hours can you work per week?
                </label>
                <select
                  value={applicationData.workHours}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, workHours: e.target.value }))}
                  className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                  style={{
                    border: '3px solid #000000',
                    color: '#111827',
                    fontSize: '16px'
                  }}
                >
                  <option value="20 hours/week">20 hours/week (Part-time)</option>
                  <option value="30 hours/week">30 hours/week</option>
                  <option value="40 hours/week">40 hours/week (Full-time)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Preferred work mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Remote', 'Hybrid', 'On-site'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setApplicationData(prev => ({ ...prev, workMode: mode }))}
                      className="py-2 px-3 rounded-full text-sm font-medium transition-all"
                      style={{
                        backgroundColor: applicationData.workMode === mode ? '#2E6CF6' : 'white',
                        color: applicationData.workMode === mode ? 'white' : '#111827',
                        border: '2px solid #000000'
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div 
                className="p-4 rounded-2xl"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: '2px solid #000000'
                }}
              >
                <h3 className="font-bold text-sm mb-2">Application Summary</h3>
                <div className="space-y-1 text-xs">
                  <p>📧 {applicationData.email}</p>
                  <p>📄 Resume: {applicationData.resume?.name || 'Not uploaded'}</p>
                  <p>🗓️ Start: {applicationData.availability}</p>
                  <p>⏰ Hours: {applicationData.workHours}</p>
                  <p>🏢 Mode: {applicationData.workMode}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return applicationData.fullName && applicationData.email && applicationData.phone;
      case 2:
        return applicationData.resume;
      case 3:
        return true;
      default:
        return false;
    }
  };

   return (
    <div 
      className="ios-scroll-fix" 
      style={{ backgroundColor: '#FBFCFD' }}
    >
      {/* Header */}
      <div 
        className="safe-top p-4 border-b-3"
        style={{ 
          backgroundColor: 'white',
          borderColor: '#000000'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={currentStep === 1 ? onBack : () => setCurrentStep(prev => prev - 1)}
            className="flex items-center space-x-2"
            style={{ color: '#2E6CF6' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="text-center">
            <h1 className="font-bold text-lg" style={{ color: '#111827' }}>
              Apply to {internship.company}
            </h1>
            <p style={{ color: '#6B7280', fontSize: '12px' }}>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          
          <div className="w-16" /> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div 
          className="w-full h-2 rounded-full"
          style={{
            backgroundColor: 'white',
            border: '2px solid #000000'
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              backgroundColor: '#10B981',
              width: `${(currentStep / totalSteps) * 100}%`
            }}
          />
        </div>
      </div>

       {/* Content */}
      <div className="ios-scroll-content p-4 pb-20">
        <div className="relative">
          {/* Yellow Shadow */}
          <div 
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              right: '-8px',
              bottom: '-8px',
              backgroundColor: '#FFCD3A',
              borderRadius: '28px',
              zIndex: -1
            }}
          />
          
          <div 
            className="bg-white p-6 rounded-3xl"
            style={{
              border: '3px solid #000000'
            }}
          >
            {renderStep()}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white p-4 safe-bottom"
        style={{ borderTop: '3px solid #000000' }}
      >
        <div className="flex space-x-3">
          {currentStep < totalSteps ? (
            <>
              <button
                onClick={currentStep === 1 ? onBack : () => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-3 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: 'white',
                  color: '#111827',
                  border: '3px solid #000000'
                }}
              >
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 py-3 rounded-full font-semibold transition-all disabled:opacity-50"
                style={{
                  backgroundColor: canProceed() ? '#2E6CF6' : '#9CA3AF',
                  color: 'white',
                  border: '3px solid #000000'
                }}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-3 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: 'white',
                  color: '#111827',
                  border: '3px solid #000000'
                }}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: '3px solid #000000'
                }}
              >
                Submit Application
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}