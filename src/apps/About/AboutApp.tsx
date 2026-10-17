import React from 'react';
import { motion } from 'motion/react';
import { User, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { profile } from '../../content/profile';

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
          <p className="text-[#E95420] font-medium">{profile.role}</p>
          <p className="text-gray-400 text-sm mt-1">{profile.education}</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed text-center">
          <p>
             I’m a Mathematics and Computing undergraduate at IIT Roorkee focused on Generative AI, Agentic Systems, RAG, and Machine Learning.
          </p>
          <p>
             I build end-to-end AI products across enterprise search, intelligent automation, and personalization.
          </p>
          <p>
             I’m particularly interested in reliable AI systems that bridge research and real-world deployment.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex justify-center space-x-6">
           <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#E95420] transition-colors transform hover:scale-110" title="GitHub">
            <Github size={24} />
          </a>
           <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0077B5] transition-colors transform hover:scale-110" title="LinkedIn">
            <Linkedin size={24} />
          </a>
           <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-[#EA4335] transition-colors transform hover:scale-110" title="Email">
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
