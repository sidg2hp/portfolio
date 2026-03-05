import { Terminal, FileText, Gamepad2, User, HelpCircle, Activity } from 'lucide-react';
import React from 'react';

export interface AppDefinition {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export const APPS: AppDefinition[] = [
  { id: 'terminal', title: 'Terminal', icon: Terminal, color: '#4E9A06' },
  { id: 'resume', title: 'Resume', icon: FileText, color: '#E95420' },
  { id: 'snake', title: 'Snake Game', icon: Gamepad2, color: '#75507B' },
  { id: 'monitor', title: 'System Monitor', icon: Activity, color: '#204A87' },
  { id: 'about', title: 'About Me', icon: User, color: '#3465A4' },
  { id: 'help', title: 'Help', icon: HelpCircle, color: '#F57900' },
];
