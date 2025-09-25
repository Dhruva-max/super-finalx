"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  avatar?: string;
  className?: string;
}

export default function ChatBubble({
  message,
  isUser = false,
  avatar,
  className
}: ChatBubbleProps) {
  const bubbleClasses = isUser ? "chat-bubble-user ml-12" : "chat-bubble-ai mr-12";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-end gap-3 mb-4", className)}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-primary-blue rounded-full border-2 border-border-dark flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt="AI Avatar" className="w-full h-full rounded-full" />
          ) : (
            <div className="text-white font-bold text-sm">AI</div>
          )}
        </div>
      )}
      
      <div className={bubbleClasses}>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-accent-yellow rounded-full border-2 border-border-dark flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="w-full h-full rounded-full" />
          ) : (
            <div className="text-text-dark font-bold text-sm">U</div>
          )}
        </div>
      )}
    </motion.div>
  );
}