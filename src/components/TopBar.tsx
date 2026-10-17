import React, { useEffect, useMemo, useState } from 'react';
import { Battery, Command, FileText, Mail, Search, Terminal, User, Volume2, Wifi, X } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { APPS } from '../config/apps';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { openWindow } = useStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setLauncherOpen(true);
      }
      if (event.key === 'Escape') setLauncherOpen(false);
      if (!event.ctrlKey && !event.metaKey && !event.altKey && !(event.target instanceof HTMLInputElement)) {
        const shortcuts: Record<string, string> = { r: 'resume', p: 'projects', t: 'terminal' };
        const appId = shortcuts[event.key.toLowerCase()];
        if (appId) launch(appId);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  const matchingApps = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return APPS.filter((app) => !normalized || app.title.toLowerCase().includes(normalized) || app.id.includes(normalized));
  }, [query]);

  const launch = (id: string) => {
    openWindow(id);
    setLauncherOpen(false);
    setQuery('');
  };

  return (
    <>
      <header className="ubuntu-topbar">
        <div className="topbar-left">
          <span className="ubuntu-logo" aria-label="Ubuntu portfolio">●</span>
          <button onClick={() => setLauncherOpen(true)}>Activities</button>
          <button onClick={() => launch('recruiter')}><User size={13} /> Recruiter brief</button>
          <button onClick={() => launch('projects')}><FileText size={13} /> Projects</button>
        </div>
        <div className="topbar-clock">{format(time, 'EEE MMM d · HH:mm')}</div>
        <div className="topbar-right">
          <button className="topbar-launcher-hint" onClick={() => setLauncherOpen(true)} aria-label="Open Activities launcher"><Command size={13} /> K</button>
          <a href="mailto:sidgos010304@gmail.com" aria-label="Email Siddhartha"><Mail size={14} /></a>
          <Wifi size={15} /><Volume2 size={15} /><Battery size={16} />
          <button className="topbar-terminal" onClick={() => launch('terminal')} aria-label="Open terminal"><Terminal size={14} /></button>
        </div>
      </header>

      {launcherOpen && <div className="activities-backdrop" onClick={() => setLauncherOpen(false)}>
        <section className="activities-launcher" role="dialog" aria-modal="true" aria-label="Activities launcher" onClick={(event) => event.stopPropagation()}>
          <div className="activities-launcher-header"><div><p>WORKSPACE LAUNCHER</p><h2>What do you want to explore?</h2></div><button onClick={() => setLauncherOpen(false)} aria-label="Close launcher"><X size={18} /></button></div>
          <label className="activities-search"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search apps and actions…" /><kbd>Ctrl K</kbd></label>
          <div className="activities-app-grid">
            {matchingApps.map((app) => { const Icon = app.icon; return <button className="activities-app-card" key={app.id} onClick={() => launch(app.id)}><span className="activities-app-icon" style={{ backgroundColor: app.color }}><Icon size={19} /></span><span><strong>{app.title}</strong><small>{app.category === 'primary' ? 'Recruiter-first' : 'Workspace utility'}</small></span></button>; })}
          </div>
          {matchingApps.length === 0 && <div className="activities-empty">No apps match “{query}”. Try <b>resume</b>, <b>projects</b>, or <b>terminal</b>.</div>}
          <div className="activities-quick-actions"><button onClick={() => launch('resume')}><FileText size={14} /> Open resume</button><a href="/Siddhartha_Goswami_Resume.pdf" download><FileText size={14} /> Download PDF</a><a href="mailto:sidgos010304@gmail.com"><Mail size={14} /> Email Siddhartha</a></div>
        </section>
      </div>}
    </>
  );
};
