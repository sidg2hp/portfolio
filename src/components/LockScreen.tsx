import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, any password works or just empty
    if (password.length >= 0) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center relative select-none"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop")' }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="z-10 flex flex-col items-center space-y-8 w-full max-w-sm">
        <div className="text-white text-6xl font-light tracking-tight mb-8">
          {format(new Date(), 'HH:mm')}
        </div>
        
        <div className="text-white text-xl font-medium mb-4">
          {format(new Date(), 'EEEE, MMMM d')}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#1E1E1E]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full flex flex-col items-center space-y-6 border border-white/10"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#E95420] to-[#772953] rounded-full flex items-center justify-center shadow-lg">
            <User size={48} className="text-white" />
          </div>
          
          <div className="text-white text-xl font-medium">Guest User</div>

          <form onSubmit={handleUnlock} className="w-full relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full bg-[#3E3E3E] text-white px-4 py-3 rounded-lg outline-none border border-transparent focus:border-[#E95420] transition-all placeholder-white/30 ${error ? 'animate-shake border-red-500' : ''}`}
              autoFocus
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </form>
          
          <div className="text-white/30 text-xs text-center">
            Press Enter to unlock
          </div>
        </motion.div>
      </div>
    </div>
  );
};
