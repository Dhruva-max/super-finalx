"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function BottomTabBar({
  tabs,
  activeTab,
  onTabChange,
  className
}: BottomTabBarProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] bg-white border-t-thick safe-bottom",
      className
    )}>
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
                isActive ? "text-primary-blue" : "text-text-muted"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <div className={cn(
                "w-6 h-6 flex items-center justify-center",
                isActive ? "text-primary-blue" : "text-text-muted"
              )}>
                {tab.icon}
              </div>
              
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary-blue font-semibold" : "text-text-muted"
              )}>
                {tab.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-1 bg-primary-blue rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
