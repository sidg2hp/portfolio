import React from 'react';
import clsx from 'clsx';
import { motion } from 'motion/react';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onActivate: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon, onActivate }) => {
  const [selected, setSelected] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum={false}
      className={clsx(
        "desktop-icon flex flex-col items-center justify-center p-2 rounded w-24 cursor-pointer transition-colors duration-200",
        selected ? "bg-white/20 border border-white/30" : "hover:bg-white/10 border border-transparent"
      )}
      role="button"
      tabIndex={0}
      aria-label={`Open ${name}`}
      onClick={() => { setSelected(true); onActivate(); }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onActivate();
        }
      }}
    >
      <div className="mb-1 text-white drop-shadow-md">
        {icon}
      </div>
      <span className={clsx(
        "text-white text-xs text-center font-medium drop-shadow-md break-words w-full line-clamp-2",
        selected ? "bg-[#E95420] rounded px-1" : ""
      )}>
        {name}
      </span>
    </motion.div>
  );
};
