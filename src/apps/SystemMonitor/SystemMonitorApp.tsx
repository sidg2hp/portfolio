import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Cpu, HardDrive, Network, MemoryStick } from 'lucide-react';

const generateData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * 30) + 10,
  }));
};

export const SystemMonitorApp: React.FC = () => {
  const [cpuData, setCpuData] = useState(generateData(20));
  const [ramData, setRamData] = useState(generateData(20));
  const [netData, setNetData] = useState(generateData(20));
  const [activeTab, setActiveTab] = useState<'resources' | 'processes'>('resources');

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: Math.min(100, Math.max(5, prev[prev.length - 1].value + (Math.random() * 20 - 10))) }]);
      setRamData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: Math.min(100, Math.max(20, prev[prev.length - 1].value + (Math.random() * 10 - 5))) }]);
      setNetData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: Math.max(0, Math.random() * 100) }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentCpu = Math.round(cpuData[cpuData.length - 1].value);
  const currentRam = Math.round(ramData[ramData.length - 1].value);
  const currentNet = Math.round(netData[netData.length - 1].value);

  return (
    <div className="h-full bg-[#FAFAFA] text-[#333333] flex flex-col font-sans">
      {/* Header */}
      <div className="h-12 bg-[#F0F0F0] border-b border-[#DCDCDC] flex items-center px-4 space-x-6">
        <button 
          onClick={() => setActiveTab('resources')}
          className={`h-full border-b-2 px-2 font-medium text-sm transition-colors ${activeTab === 'resources' ? 'border-[#E95420] text-[#E95420]' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
        >
          Resources
        </button>
        <button 
          onClick={() => setActiveTab('processes')}
          className={`h-full border-b-2 px-2 font-medium text-sm transition-colors ${activeTab === 'processes' ? 'border-[#E95420] text-[#E95420]' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
        >
          Processes
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
        {activeTab === 'resources' ? (
          <>
            {/* CPU Section */}
            <div className="bg-white rounded-lg border border-[#DCDCDC] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Cpu className="text-[#E95420]" size={20} />
                  <span className="font-bold text-lg">CPU History</span>
                </div>
                <span className="text-2xl font-light">{currentCpu}%</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cpuData}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E95420" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#E95420" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '4px', border: 'none' }} itemStyle={{ color: '#fff' }} />
                    <Area type="monotone" dataKey="value" stroke="#E95420" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RAM & Network Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RAM Section */}
              <div className="bg-white rounded-lg border border-[#DCDCDC] p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MemoryStick className="text-[#772953]" size={20} />
                    <span className="font-bold text-lg">Memory</span>
                  </div>
                  <span className="text-2xl font-light">{currentRam}%</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ramData}>
                      <XAxis dataKey="time" hide />
                      <YAxis domain={[0, 100]} hide />
                      <Line type="monotone" dataKey="value" stroke="#772953" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  16.0 GiB Total • {((currentRam / 100) * 16).toFixed(1)} GiB Used
                </div>
              </div>

              {/* Network Section */}
              <div className="bg-white rounded-lg border border-[#DCDCDC] p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Network className="text-[#2C001E]" size={20} />
                    <span className="font-bold text-lg">Network</span>
                  </div>
                  <span className="text-2xl font-light">{currentNet} KB/s</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={netData}>
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Line type="monotone" dataKey="value" stroke="#2C001E" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Total Received: 1.2 GiB • Total Sent: 450 MiB
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border border-[#DCDCDC] overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#F5F5F5] text-gray-600 font-medium border-b border-[#DCDCDC]">
                <tr>
                  <th className="py-2 px-4">Process Name</th>
                  <th className="py-2 px-4">User</th>
                  <th className="py-2 px-4">% CPU</th>
                  <th className="py-2 px-4">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {[
                  { name: 'gnome-shell', user: 'guest', cpu: 12.5, id: 1042 },
                  { name: 'firefox', user: 'guest', cpu: 8.2, id: 2104 },
                  { name: 'node', user: 'guest', cpu: 4.1, id: 3021 },
                  { name: 'Xorg', user: 'root', cpu: 2.8, id: 982 },
                  { name: 'systemd', user: 'root', cpu: 0.1, id: 1 },
                  { name: 'kworker', user: 'root', cpu: 0.0, id: 45 },
                ].map((proc) => (
                  <tr key={proc.id} className="hover:bg-[#F9F9F9]">
                    <td className="py-2 px-4 font-medium">{proc.name}</td>
                    <td className="py-2 px-4 text-gray-500">{proc.user}</td>
                    <td className="py-2 px-4 text-[#E95420]">{proc.cpu}%</td>
                    <td className="py-2 px-4 text-gray-400">{proc.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
