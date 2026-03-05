import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Volume2, Power, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { user, isAuthenticated, login, logout, openWindow } = useStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      login({ id: 1, username: res.data.username }); // In real app, decode token
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="h-7 bg-[#1E1E1E] flex items-center justify-between px-4 select-none text-sm shadow-md z-50 relative">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-white cursor-pointer hover:text-gray-200">Activities</span>
        <span className="text-white/80 hover:text-white cursor-pointer transition-colors" onClick={() => openWindow('terminal')}>Terminal</span>
        <span className="text-white/80 hover:text-white cursor-pointer transition-colors" onClick={() => openWindow('monitor')}>System Monitor</span>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 font-medium text-white">
        {format(time, 'MMM d HH:mm')}
      </div>

      <div className="flex items-center space-x-3 text-white">
        <div className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer transition-colors">
          <Wifi size={16} />
          <Volume2 size={16} />
          <Battery size={16} />
          <div className="relative">
            <div 
              className="flex items-center space-x-1"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Power size={16} />
            </div>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-8 w-48 bg-[#3E3E3E] rounded-lg shadow-2xl border border-white/10 overflow-hidden py-1"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-gray-300 border-b border-white/10 mb-1">
                        Logged in as <span className="text-white font-bold">{user?.username}</span>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-[#E95420] hover:text-white transition-colors"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => { setShowLoginModal(true); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#E95420] hover:text-white transition-colors"
                    >
                      Log In
                    </button>
                  )}
                  <div className="border-t border-white/10 my-1"></div>
                  <button className="w-full text-left px-4 py-2 hover:bg-[#E95420] hover:text-white transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-[#E95420] hover:text-white transition-colors">
                    Power Off
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#3E3E3E] p-6 rounded-xl shadow-2xl w-80 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-4 text-center">Authentication</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#2C2C2C] text-white px-3 py-2 rounded border border-white/10 focus:border-[#E95420] outline-none"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#2C2C2C] text-white px-3 py-2 rounded border border-white/10 focus:border-[#E95420] outline-none"
                  />
                </div>
                {error && <div className="text-red-400 text-xs">{error}</div>}
                <div className="flex space-x-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#E95420] hover:bg-[#C74215] text-white py-2 rounded transition-colors"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
