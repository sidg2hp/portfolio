import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Download, Github, GraduationCap, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { achievements, experience, profile, projects, skills } from '../../content/profile';
import { useStore } from '../../store/useStore';

const sections = [
  ['overview', 'Overview'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['achievements', 'Achievements'],
];

export const AboutApp: React.FC = () => {
  const { openWindow } = useStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id.replace('about-', ''));
      },
      { root, rootMargin: '-18% 0px -62% 0px', threshold: [0.05, 0.3, 0.7] },
    );
    sections.forEach(([id]) => {
      const element = root.querySelector(`#about-${id}`);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    contentRef.current?.querySelector(`#about-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="about-app" ref={contentRef}>
      <nav className="about-section-nav" aria-label="About app sections">
        {sections.map(([id, label]) => (
          <button key={id} className={activeSection === id ? 'is-active' : ''} onClick={() => scrollToSection(id)}>{label}</button>
        ))}
      </nav>

      <section className="about-hero-panel" id="about-overview">
        <div className="about-hero-copy">
          <p className="about-kicker"><span /> PERSONAL PORTFOLIO / 01</p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{profile.name}</motion.h1>
          <p className="about-role">{profile.role}</p>
          <p className="about-intro">{profile.intro}</p>
          <div className="about-meta-row">
            <span><GraduationCap size={15} /> {profile.education}</span>
            <span><MapPin size={15} /> {profile.location}</span>
          </div>
          <div className="about-actions">
            <button className="about-primary-action" onClick={() => openWindow('resume')}><span>Open full resume</span><ArrowUpRight size={16} /></button>
            <a className="about-secondary-action" href="/Siddhartha_Goswami_Resume.pdf" download><Download size={15} /> Download PDF</a>
          </div>
        </div>
        <div className="about-hero-signal" aria-hidden="true">
          <div className="about-orbit about-orbit-large" /><div className="about-orbit about-orbit-small" />
          <div className="about-signal-core"><Sparkles size={28} /></div>
          <span className="about-signal-label signal-label-top">AI / ML</span><span className="about-signal-label signal-label-bottom">BUILD → SHIP</span>
        </div>
      </section>

      <section className="about-proof-strip">
        <div><strong>5.7M+</strong><span>ratings in FlixPulse</span></div>
        <div><strong>21K+</strong><span>users modeled</span></div>
        <div><strong>1.2K+</strong><span>movies modeled</span></div>
        <div><strong>3×</strong><span>hackathon winner</span></div>
      </section>

      <section className="about-section-block" id="about-experience">
        <div className="about-section-heading"><p className="about-kicker">EXPERIENCE / 02</p><span>{experience.period}</span></div>
        <article className="about-experience-card">
          <div><p>{experience.role}</p><h2>{experience.organization}</h2></div>
          <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </article>
      </section>

      <section className="about-section-block" id="about-projects">
        <div className="about-section-heading"><p className="about-kicker">SELECTED WORK / 03</p><span>Click a project to expand</span></div>
        <div className="about-project-list">
          {projects.map((project) => {
            const expanded = expandedProject === project.title;
            return <article className={`about-project-row ${expanded ? 'is-expanded' : ''}`} key={project.title}>
              <button className="about-project-toggle" onClick={() => setExpandedProject(expanded ? null : project.title)} aria-expanded={expanded}>
                <span className="about-project-number">{project.number}</span>
                <div><p>{project.type}</p><h2>{project.title}</h2><span>{project.description}</span></div>
                <ArrowUpRight className="project-expand-icon" size={17} />
              </button>
              {expanded && <div className="about-project-details"><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="about-project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}<a href={project.link} target="_blank" rel="noreferrer"><Github size={13} /> GitHub</a></div></div>}
            </article>;
          })}
        </div>
      </section>

      <section className="about-lower-grid" id="about-skills">
        <div className="about-section-block">
          <div className="about-section-heading"><p className="about-kicker">TOOLKIT / 04</p><span>Technical skills</span></div>
          <div className="about-skills-list">{Object.entries(skills).map(([group, items]) => <div key={group}><b>{group}</b><p>{items.join(' · ')}</p></div>)}</div>
        </div>
        <div className="about-section-block" id="about-achievements">
          <div className="about-section-heading"><p className="about-kicker">PROOF / 05</p><span>Achievements</span></div>
          <div className="about-achievement-list">{achievements.map(([metric, detail]) => <div key={metric}><strong>{metric}</strong><span>{detail}</span></div>)}</div>
        </div>
      </section>

      <section className="about-contact-panel" id="about-contact">
        <div><p className="about-kicker">LET'S CONNECT</p><h2>Have a hard problem?</h2><p>Open to internships, research, and ambitious builds.</p></div>
        <div className="about-contact-links"><a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></div>
      </section>
    </div>
  );
};
