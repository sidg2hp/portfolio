import React from 'react';
import { Activity, BriefcaseBusiness, FileText, FolderKanban, Terminal, User } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { AboutApp } from '../apps/About/AboutApp';
import { ResumeApp } from '../apps/Resume/ResumeApp';
import { SnakeApp } from '../apps/Snake/SnakeApp';
import { SystemMonitorApp } from '../apps/SystemMonitor/SystemMonitorApp';
import { TerminalApp } from '../apps/Terminal/TerminalApp';
import { ProjectsApp } from '../apps/Projects/ProjectsApp';
import { RecruiterApp } from '../apps/Recruiter/RecruiterApp';
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
        <div className="desktop-welcome-actions">
          <button onClick={() => openWindow('recruiter')}><BriefcaseBusiness size={14} /> Recruiter brief</button>
          <button onClick={() => openWindow('projects')}><FolderKanban size={14} /> Explore projects</button>
        </div>
      </section>

      <div className="desktop-icons desktop-icons-primary">
        <DesktopIcon name="Recruiter Brief" icon={<BriefcaseBusiness size={42} />} onActivate={() => openWindow('recruiter')} />
        <DesktopIcon name="About Siddhartha" icon={<User size={42} />} onActivate={() => openWindow('about')} />
        <DesktopIcon name="Projects" icon={<FolderKanban size={42} />} onActivate={() => openWindow('projects')} />
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
                title={window.id === 'about' ? 'About Siddhartha' : window.id === 'monitor' ? 'System Monitor' : window.id === 'resume' ? 'Siddhartha Goswami — Resume' : window.id === 'recruiter' ? 'Recruiter Brief' : window.id === 'projects' ? 'Projects' : window.id.charAt(0).toUpperCase() + window.id.slice(1)}
                initialWidth={window.id === 'about' ? 920 : window.id === 'resume' ? 900 : window.id === 'recruiter' ? 980 : window.id === 'projects' ? 980 : 800}
                initialHeight={window.id === 'about' ? 650 : window.id === 'resume' ? 680 : window.id === 'recruiter' ? 720 : window.id === 'projects' ? 720 : 600}
              >
                {window.id === 'terminal' && <TerminalApp />}
                {window.id === 'snake' && <SnakeApp />}
                {window.id === 'resume' && <ResumeApp />}
                {window.id === 'about' && <AboutApp />}
                {window.id === 'recruiter' && <RecruiterApp />}
                {window.id === 'projects' && <ProjectsApp />}
                {window.id === 'monitor' && <SystemMonitorApp />}
                {window.id === 'help' && <div className="p-6 text-white"><h2 className="mb-3 text-lg font-semibold">Workspace shortcuts</h2><ul className="space-y-2 text-sm text-white/70"><li><b className="text-[#ff9d72]">Ctrl/Cmd + K</b> — open Activities launcher</li><li><b className="text-[#ff9d72]">R</b> — open resume</li><li><b className="text-[#ff9d72]">P</b> — open projects</li><li><b className="text-[#ff9d72]">T</b> — open terminal</li><li><b className="text-[#ff9d72]">Esc</b> — close launcher</li></ul></div>}
              </Window>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};
