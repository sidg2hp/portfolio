import React, { useEffect, useRef } from 'react';
import { useTerminal } from './useTerminal';
import { Loader2 } from 'lucide-react';

export const TerminalApp: React.FC = () => {
  const { history, input, setInput, handleCommand, scrollRef, currentPath, isLoading, navigateHistory } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleCommand(input);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setInput(navigateHistory('up'));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setInput(navigateHistory('down'));
    }
  };

  return (
    <div 
      className="h-full bg-[#300A24] text-white font-mono p-2 overflow-y-auto text-sm"
      onClick={() => inputRef.current?.focus()}
      ref={scrollRef}
    >
      <div className="mb-2 text-gray-400">
         Welcome to Siddhartha&apos;s Ubuntu-inspired portfolio workspace <br />
         * This is a simulated terminal for exploring the portfolio <br />
         * Type &apos;help&apos; to see available commands <br />
         <br />
      </div>

      {history.map((entry, index) => (
        <div key={index} className="mb-1">
          <div className="flex">
            <span className="text-[#4E9A06] font-bold mr-2">guest@portfolio:</span>
            <span className="text-[#3465A4] font-bold mr-2">{entry.input.split('$')[0].replace('~', '')}</span>
            <span className="text-white">$ {entry.input.split('$')[1]}</span>
          </div>
          <div className="text-gray-300 ml-2 whitespace-pre-wrap">{entry.output}</div>
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center ml-2 text-gray-400">
          <Loader2 className="animate-spin mr-2" size={14} />
          <span>Processing...</span>
        </div>
      )}

      {!isLoading && (
        <div className="flex items-center">
          <span className="text-[#4E9A06] font-bold mr-2">guest@portfolio:</span>
          <span className="text-[#3465A4] font-bold mr-2">{currentPath}</span>
          <span className="text-white mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none flex-1 text-white caret-white"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      )}
    </div>
  );
};
