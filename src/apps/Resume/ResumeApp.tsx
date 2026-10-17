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
          <div className="flex items-center gap-2">
            <a
              href="/Siddhartha_Goswami_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-[#E95420] hover:bg-[#C74215] px-3 py-1.5 rounded text-xs font-bold transition-colors"
            >
              <FileText size={14} />
              <span>Open PDF</span>
            </a>
            <a
              href="/api/resume?download=1"
              className="flex items-center space-x-1 border border-white/20 hover:border-[#E95420] px-3 py-1.5 rounded text-xs font-bold transition-colors"
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        </div>

        <div className="flex-1 bg-gray-100 overflow-auto flex justify-center p-8">
          <iframe
            src="/Siddhartha_Goswami_Resume.pdf"
            className="w-full h-full border border-gray-300 shadow-lg"
            title="Resume PDF"
            allow="autoplay"
          />
          <p className="mt-3 text-center text-xs text-gray-500">Can’t view the PDF inline? <a className="underline" href="/Siddhartha_Goswami_Resume.pdf">Open it in a new tab</a>.</p>
        </div>
      </div>
    </div>
  );
};
