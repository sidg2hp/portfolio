import React from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { achievements, experience, profile, projects } from '../../content/profile';

const buildTimeline = [
  {
    label: '2023',
    title: 'Started at IIT Roorkee',
    detail: 'BS-MS Mathematics and Computing',
  },
  {
    label: '2024–25',
    title: 'Built applied AI systems',
    detail: 'Agentic search, transcript RAG, and recommendation products',
  },
  {
    label: 'Apr–Jun 2026',
    title: experience.role,
    detail: `${experience.organization} · ${experience.period}`,
  },
];

export const RecruiterApp: React.FC = () => {
  return (
    <main className="recruiter-app-shell">
      <header className="recruiter-app-header">
        <div className="recruiter-app-identity">
          <p className="recruiter-app-eyebrow">
            <span className="recruiter-app-eyebrow-mark" aria-hidden="true" />
            RECRUITER BRIEF / AI &amp; ML
          </p>
          <h1 className="recruiter-app-name">{profile.name}</h1>
          <p className="recruiter-app-role">{profile.role}</p>
          <p className="recruiter-app-intro">{profile.intro}</p>
          <div className="recruiter-app-meta" aria-label="Candidate details">
            <span>
              <GraduationCap size={15} aria-hidden="true" />
              {profile.education}
            </span>
            <span>
              <MapPin size={15} aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </div>

        <aside className="recruiter-app-availability" aria-label="Availability">
          <div className="recruiter-app-availability-icon" aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <p className="recruiter-app-label">AVAILABILITY</p>
          <strong>Open to internships, research, and ambitious builds.</strong>
          <span className="recruiter-app-status">
            <span className="recruiter-app-status-dot" aria-hidden="true" />
            Available for a conversation
          </span>
        </aside>
      </header>

      <nav className="recruiter-app-actions" aria-label="Recruiter actions">
        <a
          className="recruiter-app-action recruiter-app-action-primary"
          href="/Siddhartha_Goswami_Resume.pdf"
          download
        >
          <Download size={16} aria-hidden="true" />
          Download resume
        </a>
        <a className="recruiter-app-action" href={`mailto:${profile.email}`}>
          <Mail size={16} aria-hidden="true" />
          Email Siddhartha
        </a>
        <a
          className="recruiter-app-action recruiter-app-action-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} aria-hidden="true" />
          GitHub
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a
          className="recruiter-app-action recruiter-app-action-link"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={16} aria-hidden="true" />
          LinkedIn
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>

      <section className="recruiter-app-section" aria-labelledby="recruiter-app-work-heading">
        <div className="recruiter-app-section-heading">
          <div>
            <p className="recruiter-app-label">SELECTED WORK</p>
            <h2 id="recruiter-app-work-heading">Three systems worth a closer look.</h2>
          </div>
          <span className="recruiter-app-section-count">03 PROJECTS</span>
        </div>
        <div className="recruiter-app-project-grid">
          {projects.slice(0, 3).map((project) => (
            <article className="recruiter-app-project-card" key={project.title}>
              <div className="recruiter-app-project-topline">
                <span>{project.number}</span>
                <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="recruiter-app-project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="recruiter-app-project-description">{project.description}</p>
              <ul className="recruiter-app-project-highlights">
                {project.highlights.slice(0, 2).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="recruiter-app-project-stack" aria-label={`${project.title} technology stack`}>
                {project.stack.slice(0, 5).map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiter-app-split-section" aria-label="Experience and achievements">
        <div className="recruiter-app-panel">
          <div className="recruiter-app-section-heading">
            <div>
              <p className="recruiter-app-label">EXPERIENCE</p>
              <h2>Production ownership.</h2>
            </div>
            <BriefcaseBusiness size={20} aria-hidden="true" />
          </div>
          <article className="recruiter-app-experience-card">
            <div className="recruiter-app-experience-heading">
              <div>
                <h3>{experience.role}</h3>
                <p>{experience.organization}</p>
              </div>
              <span>{experience.period}</span>
            </div>
            <ul>
              {experience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="recruiter-app-panel">
          <div className="recruiter-app-section-heading">
            <div>
              <p className="recruiter-app-label">SIGNALS</p>
              <h2>Evidence of range.</h2>
            </div>
          </div>
          <div className="recruiter-app-achievements">
            {achievements.map(([metric, detail]) => (
              <div className="recruiter-app-achievement" key={metric}>
                <strong>{metric}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recruiter-app-timeline-section" aria-labelledby="recruiter-app-timeline-heading">
        <div className="recruiter-app-section-heading">
          <div>
            <p className="recruiter-app-label">BUILD TIMELINE</p>
            <h2 id="recruiter-app-timeline-heading">A short path from fundamentals to shipped systems.</h2>
          </div>
          <CalendarDays size={20} aria-hidden="true" />
        </div>
        <ol className="recruiter-app-timeline">
          {buildTimeline.map((milestone) => (
            <li className="recruiter-app-timeline-item" key={milestone.label}>
              <span className="recruiter-app-timeline-marker" aria-hidden="true" />
              <div>
                <span className="recruiter-app-timeline-date">{milestone.label}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
};
