import React from 'react';
import { Download, FileText } from 'lucide-react';

export const ResumeApp: React.FC = () => {
  return (
    <div className="h-full w-full bg-[#525659] flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl w-full max-w-4xl h-full rounded-lg overflow-hidden flex flex-col">
        <div className="bg-[#323639] text-white p-2 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center space-x-2">
            <FileText size={18} />
            <span className="font-medium text-sm">resume.pdf</span>
          </div>
          <a
            href="https://drive.google.com/file/d/11n9IYV7lZZN-7RM5gwyHwSuryNhmYXdz/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 bg-[#E95420] hover:bg-[#C74215] px-3 py-1.5 rounded text-xs font-bold transition-colors"
          >
            <Download size={14} />
            <span>Open in Drive</span>
          </a>
        </div>

        <div className="flex-1 bg-gray-100 overflow-auto flex justify-center p-8">
          <iframe
            src="https://drive.google.com/file/d/1SToRZMzHtBUlrahoanp_g4eIlESEfkWG/preview"
            className="w-full h-full border border-gray-300 shadow-lg"
            title="Resume PDF"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};
