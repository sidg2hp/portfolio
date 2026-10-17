import React from 'react';
import { ArrowUpRight, Download, Github, GraduationCap, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { achievements, profile, projects, skills } from '../../content/profile';
import { useStore } from '../../store/useStore';

export const AboutApp: React.FC = () => {
  const { openWindow } = useStore();

  return (
    <div className="about-app">
      <section className="about-hero-panel">
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
          <div className="about-orbit about-orbit-large" />
          <div className="about-orbit about-orbit-small" />
          <div className="about-signal-core"><Sparkles size={28} /></div>
          <span className="about-signal-label signal-label-top">AI / ML</span>
          <span className="about-signal-label signal-label-bottom">BUILD → SHIP</span>
        </div>
      </section>

      <section className="about-proof-strip">
        <div><strong>5.7M+</strong><span>ratings modeled</span></div>
        <div><strong>3</strong><span>AI products featured</span></div>
        <div><strong>2028</strong><span>expected graduation</span></div>
        <div><strong>Expert</strong><span>Codeforces · 1607</span></div>
      </section>

      <section className="about-section-block">
        <div className="about-section-heading"><p className="about-kicker">SELECTED WORK / 02</p><span>What I build</span></div>
        <div className="about-project-list">
          {projects.map((project) => (
            <article className="about-project-row" key={project.title}>
              <span className="about-project-number">{project.number}</span>
              <div><p>{project.type}</p><h2>{project.title}</h2><span>{project.description}</span></div>
              <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}><Github size={17} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="about-lower-grid">
        <div className="about-section-block">
          <div className="about-section-heading"><p className="about-kicker">TOOLKIT / 03</p><span>Technical skills</span></div>
          <div className="about-skills-list">
            {Object.entries(skills).map(([group, items]) => <div key={group}><b>{group}</b><p>{items.join(' · ')}</p></div>)}
          </div>
        </div>
        <div className="about-section-block">
          <div className="about-section-heading"><p className="about-kicker">PROOF / 04</p><span>Achievements</span></div>
          <div className="about-achievement-list">{achievements.map(([metric, detail]) => <div key={metric}><strong>{metric}</strong><span>{detail}</span></div>)}</div>
        </div>
      </section>

      <section className="about-contact-panel">
        <div><p className="about-kicker">LET'S CONNECT</p><h2>Have a hard problem?</h2><p>Open to internships, research, and ambitious builds.</p></div>
        <div className="about-contact-links">
          <a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
        </div>
      </section>
    </div>
  );
};
