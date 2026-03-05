import React from 'react';
import { useStore } from '../store/useStore';
import { APPS } from '../config/apps';
import { motion } from 'motion/react';
import clsx from 'clsx';

export const Dock: React.FC = () => {
  const { openWindow, activeWindowId, windows } = useStore();

  return (
    <div className="fixed left-0 top-7 bottom-0 w-16 bg-[#1E1E1E]/90 backdrop-blur-md flex flex-col items-center py-2 space-y-2 z-40 border-r border-white/5 shadow-2xl">
      {APPS.map((app) => {
        const isOpen = windows.some((w) => w.id === app.id);
        const isActive = activeWindowId === app.id;
        const Icon = app.icon;

        return (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWindow(app.id)}
            className="relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/10"
          >
            {/* Active Indicator */}
            {isOpen && (
              <div className={clsx(
                "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#E95420] transition-all duration-300",
                isActive ? "h-8 rounded-r-md" : "h-1"
              )} />
            )}

            {/* Icon */}
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style={{ backgroundColor: app.color }}
            >
              <Icon size={24} className="text-white" />
            </div>

            {/* Tooltip */}
            <div className="absolute left-14 bg-[#1E1E1E] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-white/10 z-50">
              {app.title}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
