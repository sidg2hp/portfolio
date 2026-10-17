import React, { useState } from 'react';
import { Activity, BarChart3, BriefcaseBusiness, CheckCircle2, Database, Gauge, Network, Trophy } from 'lucide-react';
import { achievements, experience, projects } from '../../content/profile';

type MonitorTab = 'metrics' | 'systems' | 'timeline';

export const SystemMonitorApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MonitorTab>('metrics');

  return (
    <div className="portfolio-monitor">
      <header className="monitor-header">
        <div><p>PORTFOLIO MONITOR / EVIDENCE MODE</p><h1>What shipped, measured.</h1></div>
        <span className="monitor-live"><i /> live profile</span>
      </header>
      <nav className="monitor-tabs" aria-label="Portfolio monitor sections">
        {([['metrics', 'Impact metrics'], ['systems', 'Systems'], ['timeline', 'Experience & proof']] as const).map(([id, label]) => <button key={id} className={activeTab === id ? 'is-active' : ''} onClick={() => setActiveTab(id)}>{label}</button>)}
      </nav>
      <div className="monitor-content">
        {activeTab === 'metrics' && <>
          <div className="monitor-note"><Activity size={17} /> This is a portfolio dashboard, not host telemetry. Every figure below comes from Siddhartha’s project work.</div>
          <div className="monitor-metric-grid">
            <Metric icon={<Database size={19} />} value="5.7M+" label="ratings in FlixPulse" detail="21K+ users · 1.2K+ movies" />
            <Metric icon={<Gauge size={19} />} value="0.743" label="MAP@10" detail="NDCG@10 = 0.834" />
            <Metric icon={<BarChart3 size={19} />} value="99.96%" label="user coverage" detail="cold-start fallbacks included" />
            <Metric icon={<Trophy size={19} />} value="3×" label="hackathon winner" detail="innovative technology solutions" />
          </div>
          <div className="monitor-metric-table"><div className="monitor-table-head"><span>Signal</span><span>Source</span><span>Status</span></div>{[['Hybrid retrieval', 'Hiring Bazaar AI', 'deployed'], ['Evidence retrieval + abstention', 'Enterprise Knowledge Assistant', 'tested'], ['Transcript RAG', 'Video Blog App', 'shipped'], ['Collaborative filtering', 'FlixPulse', 'evaluated']].map(([signal, source, status]) => <div className="monitor-table-row" key={signal}><span>{signal}</span><span>{source}</span><b><CheckCircle2 size={13} /> {status}</b></div>)}</div>
        </>}
        {activeTab === 'systems' && <div className="monitor-system-list">{projects.map((project) => <article key={project.title}><div className="monitor-system-icon"><Network size={18} /></div><div><p>{project.type}</p><h2>{project.title}</h2><span>{project.description}</span><div>{project.stack.map((stack) => <em key={stack}>{stack}</em>)}</div></div><span className="monitor-index">{project.number}</span></article>)}</div>}
        {activeTab === 'timeline' && <div className="monitor-timeline"><article className="monitor-timeline-card"><BriefcaseBusiness size={19} /><div><p>{experience.period}</p><h2>{experience.role} · {experience.organization}</h2>{experience.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}</div></article><div className="monitor-achievements">{achievements.map(([metric, detail]) => <div key={metric}><strong>{metric}</strong><span>{detail}</span></div>)}</div></div>}
      </div>
    </div>
  );
};

const Metric: React.FC<{ icon: React.ReactNode; value: string; label: string; detail: string }> = ({ icon, value, label, detail }) => <article className="monitor-metric"><div className="monitor-metric-icon">{icon}</div><strong>{value}</strong><span>{label}</span><small>{detail}</small></article>;
