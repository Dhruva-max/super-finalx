"use client";

import React, { useState } from 'react';
import { UserProfile } from '@/app/page';

interface ApplicationStatusProps {
  applicationData: any;
  onBack: () => void;
}

export default function ApplicationStatus({ applicationData, onBack }: ApplicationStatusProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const timelineSteps = [
    {
      title: 'Application Submitted',
      description: 'Your application has been received',
      status: 'completed',
      date: new Date().toLocaleDateString()
    },
    {
      title: 'AI + Department Screening',
      description: 'Reviewing your profile and resume',
      status: 'in-progress',
      date: 'Est. 2-3 days'
    },
    {
      title: 'Interview Slot',
      description: 'If selected, interview will be scheduled',
      status: 'pending',
      date: 'Est. 5-7 days'
    },
    {
      title: 'Final Decision',
      description: 'Selection result will be communicated',
      status: 'pending',
      date: 'Est. 10-14 days'
    }
  ];

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
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2"
            style={{ color: '#2E6CF6' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Matches</span>
          </button>
          
          <h1 className="font-bold text-lg" style={{ color: '#111827' }}>
            Application Status
          </h1>
          
          <div className="w-20" />
        </div>
      </div>

       {/* Content */}
      <div className="ios-scroll-content p-4 space-y-6">
        {/* Success Message */}
        <div className="text-center space-y-4">
          <div 
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
            style={{
              backgroundColor: '#10B981',
              border: '3px solid #000000'
            }}
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h2 className="font-bold text-xl mb-2" style={{ color: '#111827' }}>
              Application Submitted Successfully!
            </h2>
            <p style={{ color: '#6B7280' }}>
              We've received your application and will review it soon.
            </p>
          </div>
        </div>

        {/* Application ID Card */}
        <div className="relative">
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
            style={{ border: '3px solid #000000' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: '#111827' }}>
                  Application ID
                </h3>
                <p 
                  className="font-mono text-lg px-3 py-1 rounded-lg inline-block"
                  style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: '2px solid #000000'
                  }}
                >
                  {applicationData.applicationId}
                </p>
              </div>
              
              <div 
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  border: '2px solid #000000'
                }}
              >
                Under Review
              </div>
            </div>
            
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              Expected review time: 5-7 business days
            </p>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-3 text-blue-600 text-sm font-medium flex items-center space-x-1"
            >
              <span>{showDetails ? 'Hide' : 'Show'} application details</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDetails && (
              <div className="mt-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Position:</span>
                    <span style={{ color: '#6B7280' }}>{applicationData.internshipTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Company:</span>
                    <span style={{ color: '#6B7280' }}>{applicationData.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Applied on:</span>
                    <span style={{ color: '#6B7280' }}>{new Date(applicationData.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Availability:</span>
                    <span style={{ color: '#6B7280' }}>{applicationData.availability}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Timeline */}
        <div className="relative">
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
            style={{ border: '3px solid #000000' }}
          >
            <h3 className="font-bold text-lg mb-4" style={{ color: '#111827' }}>
              Live Timeline
            </h3>
            
            <div className="space-y-4">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 
                        step.status === 'completed' ? '#10B981' :
                        step.status === 'in-progress' ? '#F59E0B' : '#E5E7EB',
                      border: '2px solid #000000'
                    }}
                  >
                    {step.status === 'completed' ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : step.status === 'in-progress' ? (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 
                          className="font-semibold text-sm"
                          style={{ 
                            color: step.status === 'pending' ? '#6B7280' : '#111827'
                          }}
                        >
                          {step.title}
                        </h4>
                        <p 
                          className="text-xs mt-1"
                          style={{ color: '#6B7280' }}
                        >
                          {step.description}
                        </p>
                      </div>
                      
                      <span 
                        className="text-xs font-medium"
                        style={{ color: '#6B7280' }}
                      >
                        {step.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Follow-ups */}
        <div className="relative">
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
            style={{ border: '3px solid #000000' }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: '#2E6CF6',
                  border: '2px solid #000000'
                }}
              >
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <h3 className="font-bold text-lg" style={{ color: '#111827' }}>
                AI Follow-ups
              </h3>
            </div>
            
            <div className="space-y-3">
              <div 
                className="p-3 rounded-2xl"
                style={{
                  backgroundColor: '#F3F4F6',
                  border: '2px solid #E5E7EB'
                }}
              >
                <p className="text-sm" style={{ color: '#111827' }}>
                  Thanks for applying! Can you confirm your graduation year and preferred start date?
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: 'white',
                    color: '#111827',
                    border: '2px solid #000000'
                  }}
                >
                  Open Chat
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-full font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: '#2E6CF6',
                    color: 'white',
                    border: '2px solid #000000'
                  }}
                >
                  Quick Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white p-4 safe-bottom"
        style={{ borderTop: '3px solid #000000' }}
      >
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-full font-semibold transition-all"
            style={{
              backgroundColor: 'white',
              color: '#111827',
              border: '3px solid #000000'
            }}
          >
            Back to Matches
          </button>
          <button
            className="flex-1 py-3 rounded-full font-semibold transition-all"
            style={{
              backgroundColor: '#2E6CF6',
              color: 'white',
              border: '3px solid #000000'
            }}
          >
            Apply to More
          </button>
        </div>
      </div>
    </div>
  );
}