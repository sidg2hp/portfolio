import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface Command {
  input: string;
  output: React.ReactNode;
}

export const useTerminal = () => {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('~');
  const [input, setInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openWindow, closeWindow } = useStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newHistory = [...history, { input: `${currentPath}$ ${trimmedCmd}`, output: '' }];
    setHistory(newHistory);
    setCommandHistory([...commandHistory, trimmedCmd]);
    setHistoryIndex(-1);
    setInput('');

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = '';
    setIsLoading(true);

    try {
      switch (command) {
        case 'help':
          output = (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-green-400">about</span> <span>Display information about me</span>
              <span className="text-green-400">projects</span> <span>List my projects</span>
              <span className="text-green-400">skills</span> <span>List my technical skills</span>
              <span className="text-green-400">experience</span> <span>Show my work experience</span>
              <span className="text-green-400">contact</span> <span>Show contact information</span>
              <span className="text-green-400">resume</span> <span>Open my resume</span>
              <span className="text-green-400">snake</span> <span>Play Snake game</span>
              <span className="text-green-400">neofetch</span> <span>Display system info</span>
              <span className="text-green-400">clear</span> <span>Clear terminal</span>
              <span className="text-green-400">ls</span> <span>List directory contents</span>
              <span className="text-green-400">cd</span> <span>Change directory</span>
              <span className="text-green-400">cat</span> <span>Concatenate files</span>
              <span className="text-green-400">whoami</span> <span>Print effective userid</span>
              <span className="text-green-400">sudo</span> <span>Execute a command as another user</span>
              <span className="text-green-400">exit</span> <span>Close terminal</span>
            </div>
          );
          break;
        case 'clear':
          setHistory([]);
          setIsLoading(false);
          return;
        case 'about':
          output = (
            <div className="p-2">
              <p>I’m Siddhartha Goswami, a Mathematics and Computing undergraduate at IIT Roorkee focused on AI engineering and intelligent systems.</p>
              <p className="mt-2">I build scalable machine learning and agentic AI applications, with experience in multi-agent frameworks, retrieval-augmented generation, and deep learning systems.</p>
              <p className="mt-2">I’m particularly interested in designing reliable, high-performance AI infrastructure that bridges research and real-world deployment.</p>
            </div>
          );
          break;
        case 'projects':
          const projRes = await axios.get('/api/projects');
          output = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projRes.data.map((p: any) => (
                <div key={p.id} className="flex flex-col space-y-1">
                  <div className="text-blue-400 font-bold hover:underline cursor-pointer">
                    <a href={p.link} target="_blank" rel="noreferrer">{p.name}</a>
                  </div>
                  <div className="text-gray-400 text-xs">{p.description}</div>
                </div>
              ))}
            </div>
          );
          break;
        case 'skills':
          const skillRes = await axios.get('/api/skills');
          output = (
            <div className="flex flex-col space-y-4">
              <div>
                <span className="text-yellow-400 font-bold border-b border-yellow-500">Languages</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillRes.data.languages.map((s: string) => <span key={s} className="bg-gray-700 px-2 py-0.5 rounded text-xs">{s}</span>)}
                </div>
              </div>
              <div>
                <span className="text-green-400 font-bold border-b border-green-500">Machine Learning & AI</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillRes.data.machine_learning.map((s: string) => <span key={s} className="bg-gray-700 px-2 py-0.5 rounded text-xs">{s}</span>)}
                </div>
              </div>
              <div>
                <span className="text-blue-400 font-bold border-b border-blue-500">Generative AI</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillRes.data.generative_ai.map((s: string) => <span key={s} className="bg-gray-700 px-2 py-0.5 rounded text-xs">{s}</span>)}
                </div>
              </div>
              <div>
                <span className="text-purple-400 font-bold border-b border-purple-500">Development & Tools</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillRes.data.development.map((s: string) => <span key={s} className="bg-gray-700 px-2 py-0.5 rounded text-xs">{s}</span>)}
                </div>
              </div>
            </div>
          );
          break;
        case 'experience':
          const expRes = await axios.get('/api/experience');
          output = (
            <div className="flex flex-col space-y-6 border-l-2 border-gray-600 pl-4">
              {expRes.data.map((exp: any) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-600 rounded-full border-2 border-[#300A24]"></div>
                  <div className="flex flex-col">
                    <span className="text-[#E95420] font-bold text-lg">{exp.role}</span>
                    <span className="text-blue-300 font-medium">{exp.organization}</span>
                    <span className="text-gray-500 text-xs italic mb-1">{exp.period}</span>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          );
          break;
        case 'contact':
          const contactRes = await axios.get('/api/contact');
          output = (
            <div className="flex flex-col space-y-2 text-sm">
              <div><span className="w-24 inline-block text-gray-400">Phone:</span> <span className="text-white">{contactRes.data.phone}</span></div>
              <div><span className="w-24 inline-block text-gray-400">Email:</span> <a href={`mailto:${contactRes.data.email}`} className="text-blue-400 hover:underline">{contactRes.data.email}</a></div>
              <div><span className="w-24 inline-block text-gray-400">GitHub:</span> <a href={contactRes.data.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{contactRes.data.github}</a></div>
              <div><span className="w-24 inline-block text-gray-400">LinkedIn:</span> <a href={contactRes.data.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Profile</a></div>
            </div>
          );
          break;
        case 'resume':
          openWindow('resume');
          output = <span className="text-green-400">Opening resume...</span>;
          break;
        case 'snake':
          openWindow('snake');
          output = <span className="text-green-400">Launching Snake...</span>;
          break;
        case 'neofetch':
          output = (
            <div className="flex space-x-4 font-mono text-sm">
              <div className="text-[#E95420] hidden sm:block">
                <pre>{`
            .-/+oossssoo+/-.
        \`:+ssssssssssssssssss+:\`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
   /ssssssssssshdmmNNmmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+ssssssssssssssssssyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.
              `}</pre>
              </div>
              <div className="flex flex-col justify-center space-y-1">
                <div className="font-bold text-[#E95420]">guest@portfolio</div>
                <div>-----------------</div>
                <div><span className="text-[#E95420] font-bold">OS</span>: Ubuntu 22.04 LTS (Web)</div>
                <div><span className="text-[#E95420] font-bold">Host</span>: Browser</div>
                <div><span className="text-[#E95420] font-bold">Kernel</span>: React 19.0.0</div>
                <div><span className="text-[#E95420] font-bold">Uptime</span>: Just now</div>
                <div><span className="text-[#E95420] font-bold">Packages</span>: npm</div>
                <div><span className="text-[#E95420] font-bold">Shell</span>: zsh</div>
                <div><span className="text-[#E95420] font-bold">Resolution</span>: {window.innerWidth}x{window.innerHeight}</div>
                <div><span className="text-[#E95420] font-bold">DE</span>: GNOME (Simulated)</div>
                <div><span className="text-[#E95420] font-bold">WM</span>: Framer Motion</div>
                <div><span className="text-[#E95420] font-bold">Theme</span>: Yaru-dark</div>
                <div><span className="text-[#E95420] font-bold">Icons</span>: Lucide React</div>
                <div><span className="text-[#E95420] font-bold">Terminal</span>: React Terminal</div>
                <div><span className="text-[#E95420] font-bold">CPU</span>: Virtual Core</div>
                <div><span className="text-[#E95420] font-bold">Memory</span>: Enough</div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-3 h-3 bg-black"></div>
                  <div className="w-3 h-3 bg-red-500"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <div className="w-3 h-3 bg-blue-500"></div>
                  <div className="w-3 h-3 bg-purple-500"></div>
                  <div className="w-3 h-3 bg-cyan-500"></div>
                  <div className="w-3 h-3 bg-white"></div>
                </div>
              </div>
            </div>
          );
          break;
        case 'ls':
          if (currentPath === '~') {
            output = (
              <div className="grid grid-cols-4 gap-2 text-blue-400 font-bold">
                <span>projects/</span>
                <span className="text-white font-normal">resume.pdf</span>
              </div>
            );
          } else if (currentPath === '~/projects') {
            const pRes = await axios.get('/api/projects');
            output = (
              <div className="grid grid-cols-2 gap-2 text-white">
                {pRes.data.map((p: any) => <span key={p.id}>{p.name}</span>)}
              </div>
            );
          }
          break;
        case 'cd':
          const target = args[0];
          if (!target || target === '~') {
            setCurrentPath('~');
          } else if (target === 'projects' && currentPath === '~') {
            setCurrentPath('~/projects');
          } else if (target === '..' && currentPath === '~/projects') {
            setCurrentPath('~');
          } else {
            output = <span className="text-red-500">cd: no such file or directory: {target}</span>;
          }
          break;
        case 'cat':
          const file = args[0];
          if (file === 'resume.pdf' && currentPath === '~') {
            output = <span className="text-gray-400">Binary file (resume.pdf) cannot be displayed. Use 'resume' command to open.</span>;
          } else {
            output = <span className="text-red-500">cat: {file}: No such file or directory</span>;
          }
          break;
        case 'whoami':
          output = 'guest';
          break;
        case 'sudo':
          output = <span className="text-red-500">guest is not in the sudoers file. This incident will be reported.</span>;
          break;
        case 'exit':
          closeWindow('terminal');
          break;
        default:
          output = <span className="text-red-500">Command not found: {command}. Type 'help' for available commands.</span>;
      }
    } catch (error) {
      output = <span className="text-red-500">Error executing command. Please try again.</span>;
    } finally {
      setIsLoading(false);
      // Update history with the result
      setHistory(prev => {
        const newHist = [...prev];
        newHist[newHist.length - 1].output = output;
        return newHist;
      });
    }
  };

  return {
    history,
    input,
    setInput,
    handleCommand,
    scrollRef,
    currentPath,
    isLoading
  };
};
