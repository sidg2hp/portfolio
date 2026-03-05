import React from 'react';
import { motion } from 'motion/react';
import { User, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AboutApp: React.FC = () => {
  const { openWindow } = useStore();

  return (
    <div className="h-full w-full bg-[#3E3E3E] text-white p-8 flex flex-col items-center justify-center overflow-y-auto">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-[#2C2C2C] p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-white/5"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E95420] to-[#772953] p-1 mb-4 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#1E1E1E] flex items-center justify-center overflow-hidden">
              <User size={64} className="text-white/80" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Siddhartha Goswami</h1>
          <p className="text-[#E95420] font-medium">Mathematics and Computing Undergraduate</p>
          <p className="text-gray-400 text-sm mt-1">IIT Roorkee</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed text-center">
          <p>
            I’m a Mathematics and Computing undergraduate at IIT Roorkee focused on AI engineering and intelligent systems.
          </p>
          <p>
            I build scalable machine learning and agentic AI applications, with experience in multi-agent frameworks, retrieval-augmented generation, and deep learning systems.
          </p>
          <p>
            I’m particularly interested in designing reliable, high-performance AI infrastructure that bridges research and real-world deployment.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex justify-center space-x-6">
          <a href="https://github.com/sidg2hp" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E95420] transition-colors transform hover:scale-110" title="GitHub">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0077B5] transition-colors transform hover:scale-110" title="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="mailto:sidgos010304@gmail.com" className="text-gray-400 hover:text-[#EA4335] transition-colors transform hover:scale-110" title="Email">
            <Mail size={24} />
          </a>
          <button onClick={() => openWindow('resume')} className="text-gray-400 hover:text-green-500 transition-colors transform hover:scale-110" title="Resume">
            <FileText size={24} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
