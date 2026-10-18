import { create } from 'zustand';
import React from 'react';

export interface AppConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  width?: number;
  height?: number;
}

interface WindowState {
  id: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface User {
  id: number;
  username: string;
}

interface DesktopState {
  windows: WindowState[];
  activeWindowId: string | null;
  booted: boolean;
  locked: boolean;
  user: User | null;
  isAuthenticated: boolean;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setBooted: (booted: boolean) => void;
  setLocked: (locked: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useStore = create<DesktopState>((set) => ({
  windows: [],
  activeWindowId: null,
  booted: false,
  locked: false,
  user: null,
  isAuthenticated: false,

  openWindow: (id) => set((state) => {
    const nextZIndex = Math.max(0, ...state.windows.map((window) => window.zIndex)) + 1;
    if (state.windows.find((w) => w.id === id)) {
      return {
        activeWindowId: id,
        windows: state.windows.map((w) => 
          w.id === id ? { ...w, minimized: false, zIndex: nextZIndex } : w
        ),
      };
    }
    return {
      windows: [...state.windows, { id, minimized: false, maximized: false, zIndex: nextZIndex }],
      activeWindowId: id,
    };
  }),

  closeWindow: (id) => set((state) => {
    const remaining = state.windows.filter((w) => w.id !== id);
    const nextActive = state.activeWindowId === id
      ? remaining.filter((window) => !window.minimized).sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
      : state.activeWindowId;

    return { windows: remaining, activeWindowId: nextActive };
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => w.id === id ? { ...w, minimized: true } : w),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => w.id === id ? { ...w, maximized: !w.maximized } : w),
  })),

  focusWindow: (id) => set((state) => ({
    activeWindowId: id,
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, zIndex: Math.max(0, ...state.windows.map((ww) => ww.zIndex)) + 1 } : w
    ),
  })),

  setBooted: (booted) => set({ booted }),
  setLocked: (locked) => set({ locked }),
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
