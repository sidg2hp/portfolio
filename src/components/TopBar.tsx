import React, { useEffect, useState } from 'react';
import { Battery, FileText, Mail, Terminal, User, Volume2, Wifi } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { openWindow } = useStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="ubuntu-topbar">
      <div className="topbar-left">
        <span className="ubuntu-logo" aria-label="Ubuntu portfolio">●</span>
        <button onClick={() => openWindow('about')}>Activities</button>
        <button onClick={() => openWindow('about')}><User size={13} /> About</button>
        <button onClick={() => openWindow('resume')}><FileText size={13} /> Resume</button>
      </div>
      <div className="topbar-clock">{format(time, 'EEE MMM d · HH:mm')}</div>
      <div className="topbar-right">
        <a href="mailto:sidgos010304@gmail.com" aria-label="Email Siddhartha"><Mail size={14} /></a>
        <Wifi size={15} /><Volume2 size={15} /><Battery size={16} />
        <button className="topbar-terminal" onClick={() => openWindow('terminal')} aria-label="Open terminal"><Terminal size={14} /></button>
      </div>
    </header>
  );
};
