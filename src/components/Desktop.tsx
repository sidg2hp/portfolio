import React from 'react';
import { Activity, FileText, Terminal, User } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { AboutApp } from '../apps/About/AboutApp';
import { ResumeApp } from '../apps/Resume/ResumeApp';
import { SnakeApp } from '../apps/Snake/SnakeApp';
import { SystemMonitorApp } from '../apps/SystemMonitor/SystemMonitorApp';
import { TerminalApp } from '../apps/Terminal/TerminalApp';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { TopBar } from './TopBar';
import { Window } from './Window';
import { profile } from '../content/profile';

export const Desktop: React.FC = () => {
  const { windows, openWindow } = useStore();

  return (
    <main className="ubuntu-desktop-shell min-h-screen w-screen overflow-hidden select-none font-sans">
      <div className="ubuntu-wallpaper" aria-hidden="true">
        <div className="wallpaper-glow wallpaper-glow-one" />
        <div className="wallpaper-glow wallpaper-glow-two" />
        <div className="wallpaper-grid" />
        <div className="wallpaper-lines" />
      </div>

      <TopBar />
      <Dock />

      <section className="desktop-welcome" aria-label="Portfolio workspace introduction">
        <div className="desktop-welcome-kicker"><span /> WORKSPACE / ONLINE</div>
        <h1>Welcome to<br /><strong>{profile.name}</strong></h1>
        <p>{profile.role} · {profile.location}</p>
        <div className="desktop-welcome-hint"><span>01</span> Start with <b>About Siddhartha</b></div>
      </section>

      <div className="desktop-icons desktop-icons-primary">
        <DesktopIcon name="About Siddhartha" icon={<User size={42} />} onActivate={() => openWindow('about')} />
        <DesktopIcon name="Resume PDF" icon={<FileText size={42} />} onActivate={() => openWindow('resume')} />
      </div>

      <div className="desktop-icons desktop-icons-utilities">
        <DesktopIcon name="Terminal" icon={<Terminal size={36} />} onActivate={() => openWindow('terminal')} />
        <DesktopIcon name="System Monitor" icon={<Activity size={36} />} onActivate={() => openWindow('monitor')} />
      </div>

      <div className="desktop-shortcut-note">
        <span className="shortcut-dot" /> Select an app to explore
      </div>

      <div className="desktop-window-layer">
        <AnimatePresence>
          {windows.map((window) => (
            <div key={window.id} className="pointer-events-auto">
              <Window
                id={window.id}
                title={window.id === 'about' ? 'About Siddhartha' : window.id === 'monitor' ? 'System Monitor' : window.id === 'resume' ? 'Siddhartha Goswami — Resume' : window.id.charAt(0).toUpperCase() + window.id.slice(1)}
                initialWidth={window.id === 'about' ? 920 : window.id === 'resume' ? 900 : 800}
                initialHeight={window.id === 'about' ? 650 : window.id === 'resume' ? 680 : 600}
              >
                {window.id === 'terminal' && <TerminalApp />}
                {window.id === 'snake' && <SnakeApp />}
                {window.id === 'resume' && <ResumeApp />}
                {window.id === 'about' && <AboutApp />}
                {window.id === 'monitor' && <SystemMonitorApp />}
                {window.id === 'help' && <div className="p-6 text-white">Use the About app for a quick profile, Resume PDF for the full resume, and Terminal for the portfolio command line.</div>}
              </Window>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};
