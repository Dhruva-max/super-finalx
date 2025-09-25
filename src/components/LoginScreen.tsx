"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import YellowCard from '@/components/ui/YellowCard';
import PillButton from '@/components/ui/PillButton';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(email, password);
    } else {
      // Trigger shake animation on error
      const card = document.querySelector('.login-card');
      card?.classList.add('animate-shake');
      setTimeout(() => {
        card?.classList.remove('animate-shake');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern flex items-center justify-center p-4" 
         style={{ backgroundColor: '#FBFCFD' }}>
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Yellow Shadow */}
        <div 
          className="absolute"
          style={{
            top: '8px',
            left: '8px',
            right: '-8px',
            bottom: '-8px',
            backgroundColor: '#FFCD3A',
            borderRadius: '28px',
            zIndex: -1
          }}
        />
        
        <YellowCard className="login-card space-y-6">
          {/* Header */}
          <div className="text-center">
             <h1 className="font-display font-extrabold text-3xl mb-2" style={{ color: '#111827' }}>
              Intern-Setu
            </h1>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
               <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                Email
              </label>
               <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                style={{
                  border: '3px solid #000000',
                  color: '#111827',
                  fontSize: '16px',
                  borderRadius: '24px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2E6CF6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(46, 108, 246, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
               <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                Password
              </label>
               <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-white transition-all focus:outline-none"
                style={{
                  border: '3px solid #000000',
                  color: '#111827',
                  fontSize: '16px',
                  borderRadius: '24px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2E6CF6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(46, 108, 246, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary-blue bg-white border-2 border-border-dark rounded focus:ring-primary-blue focus:ring-2"
              />
               <label htmlFor="remember" className="ml-2 text-sm" style={{ color: '#111827' }}>
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <PillButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="bg-primary-blue text-accent-yellow font-bold"
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </PillButton>
          </form>

          {/* Toggle Sign Up/Login */}
          <div className="text-center">
             <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-sm hover:underline transition-colors"
              style={{ color: '#2E6CF6' }}
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </YellowCard>
      </motion.div>
    </div>
  );
}
