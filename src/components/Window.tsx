import React, { useRef, useEffect } from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
}

export const Window: React.FC<WindowProps> = ({ id, title, children, initialWidth = 800, initialHeight = 600 }) => {
  const { windows, activeWindowId, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useStore();
  const windowState = windows.find((w) => w.id === id);
  const isActive = activeWindowId === id;
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  if (!windowState || windowState.minimized) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: windowState.maximized ? 1 : 1, 
        opacity: 1,
        width: windowState.maximized ? '100vw' : initialWidth,
        height: windowState.maximized ? 'calc(100vh - 28px)' : initialHeight,
        x: windowState.maximized ? 0 : undefined,
        y: windowState.maximized ? 28 : undefined,
        borderRadius: windowState.maximized ? 0 : '12px',
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{ 
        position: 'absolute', 
        zIndex: windowState.zIndex,
        top: windowState.maximized ? 0 : '10%',
        left: windowState.maximized ? 0 : '15%',
      }}
      onMouseDown={() => focusWindow(id)}
      className={clsx(
        "bg-[#3E3E3E] shadow-2xl overflow-hidden flex flex-col border border-white/10",
        isActive ? "shadow-black/50" : "shadow-black/20"
      )}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={(e) => {
          dragControls.start(e);
          focusWindow(id);
        }}
        className="h-10 bg-[#2C2C2C] flex items-center justify-between px-4 select-none cursor-default"
      >
        <div className="text-white font-medium text-sm">{title}</div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors"
          >
            {windowState.maximized ? <Square size={12} /> : <Maximize2 size={12} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-6 h-6 rounded-full bg-[#E95420] hover:bg-[#C74215] flex items-center justify-center text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#1E1E1E] text-white">
        {children}
      </div>
    </motion.div>
  );
};
