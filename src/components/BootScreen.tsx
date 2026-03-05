import React from 'react';
import { motion } from 'motion/react';

export const BootScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[#2C001E] flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center space-y-8"
      >
        <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative">
          <div className="absolute inset-0 border-t-4 border-[#E95420] rounded-full animate-spin" />
          <span className="text-4xl font-bold tracking-tighter">ubuntu</span>
        </div>
        <div className="text-white/50 text-sm font-mono animate-pulse">
          Loading system components...
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 text-white/30 text-xs">
        Powered by React & Vite
      </div>
    </div>
  );
};
