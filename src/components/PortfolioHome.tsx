import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  TerminalSquare,
  Trophy,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { achievements, profile, projects, skills } from '../content/profile';

interface PortfolioHomeProps {
  onOpenDesktop: () => void;
}

const navItems = [
  ['Work', '#work'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
];

const accentClasses = {
  lime: 'text-lime-300 border-lime-300/30 bg-lime-300/10',
  orange: 'text-orange-300 border-orange-300/30 bg-orange-300/10',
  blue: 'text-sky-300 border-sky-300/30 bg-sky-300/10',
};

export const PortfolioHome: React.FC<PortfolioHomeProps> = ({ onOpenDesktop }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="portfolio-shell min-h-screen overflow-x-hidden bg-[#08110e] text-stone-100">
      <div className="portfolio-noise" aria-hidden="true" />
      <nav className="portfolio-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="Siddhartha Goswami home">
          <span className="brand-dot" />
          SG<span className="brand-slash">/</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/api/resume" className="nav-resume" onClick={() => setMenuOpen(false)}>
            Resume <ArrowUpRight size={14} />
          </a>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <section id="top" className="hero-section page-frame">
        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow-line" /> Available for meaningful problems
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Building useful
            <span className="hero-accent"> intelligence.</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {profile.intro}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <a className="button button-primary" href="#work">
              Explore selected work <ArrowDownRight size={17} />
            </a>
            <a className="button button-quiet" href="/api/resume">
              <FileText size={16} /> View resume
            </a>
          </motion.div>
          <div className="hero-links" aria-label="Social links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={16} /> Say hello
            </a>
          </div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="signal-card">
            <div className="signal-card-header">
              <span className="signal-status"><span /> system online</span>
              <span className="signal-id">/01</span>
            </div>
            <div className="signal-graphic" aria-hidden="true">
              <div className="signal-grid" />
              <div className="signal-ring ring-one" />
              <div className="signal-ring ring-two" />
              <div className="signal-core"><BrainCircuit size={34} /></div>
              <span className="signal-label label-a">retrieval</span>
              <span className="signal-label label-b">reasoning</span>
              <span className="signal-label label-c">shipping</span>
            </div>
            <div className="signal-footer">
              <span>research → product</span>
              <span className="signal-arrow">↗</span>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="ticker" aria-label="Areas of focus">
        <div className="ticker-track">
          {[...profile.focus, ...profile.focus].map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span>{item}</span><i>✳</i>
            </React.Fragment>
          ))}
        </div>
      </div>

      <section id="work" className="page-frame content-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work / 01</p>
            <h2>Systems with a point of view.</h2>
          </div>
          <p className="section-summary">A few projects where I cared equally about the model, the evidence, and the experience around it.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              className={`project-card project-card-${project.accent}`}
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="project-topline">
                <span className="project-number">{project.number}</span>
                <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="project-icon"><Sparkles size={18} /></div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-highlights">
                {project.highlights.map((highlight) => <li key={highlight}><Check size={14} /> {highlight}</li>)}
              </ul>
              <div className="tag-row">
                {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="about" className="page-frame split-section">
        <div className="split-intro">
          <p className="section-kicker">About / 01</p>
          <h2>Curious by default. Rigorous when it matters.</h2>
          <p>{profile.education}</p>
        </div>
        <div className="about-body">
          <p>I’m a Mathematics & Computing undergraduate at IIT Roorkee focused on generative AI, agentic systems, RAG, and machine learning.</p>
          <p>My favorite work sits at the intersection of research and product: taking a difficult problem, making the system legible, and shipping something people can trust.</p>
          <div className="about-metrics">
            <div><strong>5.7M+</strong><span>ratings in FlixPulse</span></div>
            <div><strong>21K+</strong><span>users modeled</span></div>
            <div><strong>1.2K+</strong><span>movies modeled</span></div>
          </div>
        </div>
      </section>

      <section id="skills" className="page-frame content-section skills-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Toolkit / 02</p>
            <h2>From first principles to production.</h2>
          </div>
          <Code2 className="section-mark" size={30} />
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([group, items]) => (
            <div className="skill-group" key={group}>
              <h3>{group}</h3>
              <div className="skill-list">{items.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-frame experience-section">
        <div className="section-heading">
          <div>
          <p className="section-kicker">Experience / 04</p>
            <h2>Close to the problem.</h2>
          </div>
          <BriefcaseBusiness className="section-mark" size={30} />
        </div>
        <div className="experience-row">
          <div className="experience-date">APR — JUN<br /><span>2026</span></div>
          <div><p className="experience-label">AI Engineering Intern · Hiring Bazaar AI</p><h3>Owned an end-to-end resume intelligence pipeline.</h3><p>Built hybrid retrieval combining BM25 lexical search with dense vectors for automated candidate screening, and integrated it into the production hiring workflow as the sole engineer.</p></div>
          <ArrowUpRight className="experience-arrow" size={24} />
        </div>
      </section>

      <section className="page-frame achievement-section">
        <div className="achievement-heading"><Trophy size={22} /><p className="section-kicker">Proof of work</p></div>
        <div className="achievement-grid">
          {achievements.map(([metric, detail]) => <div key={metric} className="achievement"><strong>{metric}</strong><span>{detail}</span></div>)}
        </div>
      </section>

      <section id="contact" className="page-frame contact-section">
        <div>
          <p className="section-kicker">Have a hard problem?</p>
          <h2>Let’s make it useful.</h2>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={19} /></a>
          <p>{profile.location} · Open to internships, research, and ambitious builds.</p>
          <button className="desktop-link" onClick={onOpenDesktop}><TerminalSquare size={16} /> Enter Ubuntu desktop mode <ChevronRight size={16} /></button>
        </div>
      </section>

      <footer className="portfolio-footer page-frame">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="footer-note">Designed with intent, built with code.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
};
