import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { Window } from './Window';
import { TerminalApp } from '../apps/Terminal/TerminalApp';
import { SnakeApp } from '../apps/Snake/SnakeApp';
import { ResumeApp } from '../apps/Resume/ResumeApp';
import { AboutApp } from '../apps/About/AboutApp';
import { SystemMonitorApp } from '../apps/SystemMonitor/SystemMonitorApp';
import { BootScreen } from './BootScreen';
import { LockScreen } from './LockScreen';
import { DesktopIcon } from './DesktopIcon';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Terminal, User, Activity } from 'lucide-react';

export const Desktop: React.FC = () => {
  const { windows, booted, locked, setBooted, setLocked, openWindow } = useStore();

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => {
      setBooted(true);
      setLocked(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setBooted, setLocked]);

  if (!booted) {
    return <BootScreen />;
  }

  if (locked) {
    return <LockScreen onUnlock={() => setLocked(false)} />;
  }

  return (
    <div className="h-screen w-screen bg-cover bg-center overflow-hidden select-none font-sans relative"
         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop")' }}>
      
      {/* Overlay for Yaru theme tint */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <TopBar />
      <Dock />

      {/* Desktop Icons - Left side */}
      <div className="absolute top-10 left-20 flex flex-col gap-4 p-4 z-0">
        <DesktopIcon 
          name="Terminal" 
          icon={<Terminal size={48} className="text-gray-200" />} 
          onDoubleClick={() => openWindow('terminal')} 
        />
        <DesktopIcon 
          name="About Me" 
          icon={<User size={48} className="text-blue-400" />} 
          onDoubleClick={() => openWindow('about')} 
        />
        <DesktopIcon 
          name="System Monitor" 
          icon={<Activity size={48} className="text-green-400" />} 
          onDoubleClick={() => openWindow('monitor')} 
        />
      </div>

      {/* Centered Resume Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 scale-125">
        <DesktopIcon 
          name="Resume" 
          icon={<FileText size={48} className="text-red-500 fill-white" />} 
          onDoubleClick={() => openWindow('resume')} 
        />
      </div>

      <div className="absolute inset-0 pt-7 pl-16 pointer-events-none">
        <AnimatePresence>
          {windows.map((window) => (
            <div key={window.id} className="pointer-events-auto">
              <Window id={window.id} title={window.id === 'monitor' ? 'System Monitor' : window.id.charAt(0).toUpperCase() + window.id.slice(1)}>
                {window.id === 'terminal' && <TerminalApp />}
                {window.id === 'snake' && <SnakeApp />}
                {window.id === 'resume' && <ResumeApp />}
                {window.id === 'about' && <AboutApp />}
                {window.id === 'monitor' && <SystemMonitorApp />}
                {window.id === 'help' && <div className="p-4 text-white">Help content goes here...</div>}
              </Window>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
