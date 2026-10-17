import { Terminal, FileText, Gamepad2, User, HelpCircle, Activity } from 'lucide-react';
import React from 'react';

export interface AppDefinition {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  category: 'primary' | 'utility';
}

export const APPS: AppDefinition[] = [
  { id: 'about', title: 'About Siddhartha', icon: User, color: '#3465A4', category: 'primary' },
  { id: 'resume', title: 'Resume PDF', icon: FileText, color: '#E95420', category: 'primary' },
  { id: 'terminal', title: 'Terminal', icon: Terminal, color: '#4E9A06', category: 'utility' },
  { id: 'monitor', title: 'System Monitor', icon: Activity, color: '#204A87', category: 'utility' },
  { id: 'snake', title: 'Snake Game', icon: Gamepad2, color: '#75507B', category: 'utility' },
  { id: 'help', title: 'Quick Help', icon: HelpCircle, color: '#F57900', category: 'utility' },
];
