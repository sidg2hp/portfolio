import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Database,
  Gauge,
  Github,
  GitBranch,
  Layers3,
  Network,
  Search,
  Sparkles,
  Target,
  Workflow,
  Server,
  FlaskConical,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { projects } from '../../content/profile';

type Project = (typeof projects)[number];
export type ProjectFilter = 'all' | 'genai' | 'ml' | 'systems';
export type ProjectsView = 'recruiter' | 'technical';

export interface ProjectsAppProps {
  /** Optional starting filter; the component owns filter state after mounting. */
  initialFilter?: ProjectFilter;
  /** Optional starting audience view; the component owns view state after mounting. */
  initialView?: ProjectsView;
}

interface ProjectMetric {
  value: string;
  label: string;
}

interface ArchitectureStep {
  label: string;
  detail: string;
  icon: LucideIcon;
}

const filterOptions: Array<{ id: ProjectFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'genai', label: 'GenAI / RAG' },
  { id: 'ml', label: 'ML / Product' },
  { id: 'systems', label: 'Systems / Research' },
];

const projectCategories: Record<string, Exclude<ProjectFilter, 'all'>> = {
  'Enterprise Knowledge Assistant': 'genai',
  'Video Blog App': 'genai',
  FlixPulse: 'ml',
  'Hybrid DGM–Monte Carlo Option Pricing': 'ml',
  'Kairon: Deep Research Dual-Agent System': 'genai',
  NetSentinel: 'systems',
  'Multimodal Property Valuation': 'ml',
};

const projectMetrics: Record<string, ProjectMetric[]> = {
  FlixPulse: [
    { value: '5.7M+', label: 'ratings' },
    { value: '21K+', label: 'users' },
    { value: '1.2K+', label: 'movies' },
    { value: '0.743', label: 'MAP@10' },
    { value: '0.834', label: 'NDCG@10' },
    { value: '99.96%', label: 'user coverage' },
  ],
  'Hybrid DGM–Monte Carlo Option Pricing': [
    { value: '0.11%', label: '1D rel. L² error' },
    { value: '0.61%', label: '2D rel. L² error' },
    { value: '>99.999%', label: 'variance reduction' },
  ],
};

const recruiterSummaries: Record<string, string> = {
  'Enterprise Knowledge Assistant':
    'An agentic GraphRAG system with six-domain LangGraph routing, hybrid retrieval adapters, inspectable citations, deterministic evaluation, and safe abstention.',
  'Video Blog App':
    'A complete media-to-knowledge product that makes long-form video searchable, teachable, and interactive.',
  FlixPulse:
    'A measurable recommendation product that combines strong offline quality with a usable, explainable frontend.',
  'Hybrid DGM–Monte Carlo Option Pricing':
    'A mathematically serious scientific-ML system with clear validation, baselines, ablations, and an honest account of where high-dimensional pure DGM becomes unstable.',
  'Kairon: Deep Research Dual-Agent System':
    'A focused agentic prototype that cleanly separates web research from drafting without overstating itself as a production research platform.',
  NetSentinel:
    'A systems project that demonstrates networking fundamentals beyond the AI stack: sockets, concurrency, protocol parsing, filtering, logging, and tests.',
  'Multimodal Property Valuation':
    'A useful multimodal research study because it reports both the promise and the limitation: visual features help image-only prediction, but tabular data remains stronger.',
};

const architectures: Record<string, ArchitectureStep[]> = {
  'Enterprise Knowledge Assistant': [
    { label: 'User query', detail: 'question', icon: Search },
    { label: 'LangGraph workflow', detail: 'domain + retrieval steps', icon: Workflow },
    { label: 'Hybrid retrieval', detail: 'BM25 · vector · FAISS', icon: Database },
    { label: 'GraphRAG traversal', detail: 'entities · relations · citations', icon: Network },
    { label: 'Grounding gate', detail: 'Ollama · citations · abstention', icon: Check },
  ],
  'Video Blog App': [
    { label: 'YouTube video', detail: 'source media', icon: Search },
    { label: 'Media pipeline', detail: 'yt-dlp · FFmpeg · AssemblyAI', icon: Workflow },
    { label: 'Transcript index', detail: 'searchable context', icon: Database },
    { label: 'RAG + Ollama', detail: 'grounded generation', icon: Sparkles },
    { label: 'Knowledge product', detail: 'articles · Q&A · quizzes · maps', icon: Layers3 },
  ],
  FlixPulse: [
    { label: 'Ratings data', detail: '5.7M+ interactions', icon: Database },
    { label: 'Recommendation models', detail: 'SVD + item KNN', icon: GitBranch },
    { label: 'FastAPI layer', detail: 'cached + explainable results', icon: Workflow },
    { label: 'React product', detail: 'personalized discovery', icon: Target },
  ],
  'Hybrid DGM–Monte Carlo Option Pricing': [
    { label: 'Market model', detail: 'multi-asset Black–Scholes', icon: Database },
    { label: 'DGM solver', detail: 'PDE + autodiff Hessians', icon: FlaskConical },
    { label: 'Validation', detail: 'analytical + MC baselines', icon: Check },
    { label: 'Hybrid estimator', detail: 'DGM control variate', icon: Gauge },
  ],
  'Kairon: Deep Research Dual-Agent System': [
    { label: 'Question', detail: 'research prompt', icon: Search },
    { label: 'Research agent', detail: 'Tavily web search', icon: Network },
    { label: 'Retriever', detail: 'context assembly', icon: Database },
    { label: 'Drafting agent', detail: 'Ollama answer', icon: Sparkles },
  ],
  NetSentinel: [
    { label: 'TCP listener', detail: 'POSIX sockets', icon: Server },
    { label: 'Connection thread', detail: 'pthreads', icon: Workflow },
    { label: 'HTTP parser', detail: 'GET + CONNECT', icon: Search },
    { label: 'Filter + relay', detail: '403s · logs · tunnel', icon: Network },
  ],
  'Multimodal Property Valuation': [
    { label: 'Property record', detail: 'tabular features', icon: Database },
    { label: 'Satellite image', detail: 'ResNet18 embedding', icon: FlaskConical },
    { label: 'Fusion head', detail: 'feature concatenation', icon: Workflow },
    { label: 'Price estimate', detail: 'log-price regression', icon: Target },
  ],
};

const getProjectId = (project: Project) => `projects-app-project-${project.number}`;

export const ProjectsApp: React.FC<ProjectsAppProps> = ({
  initialFilter = 'all',
  initialView = 'recruiter',
}) => {
  const [filter, setFilter] = useState<ProjectFilter>(initialFilter);
  const [view, setView] = useState<ProjectsView>(initialView);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (filter === 'all') return true;
        return projectCategories[project.title] === filter;
      }),
    [filter],
  );

  const toggleProject = (title: string) => {
    setExpandedProject((current) => (current === title ? null : title));
  };

  return (
    <main className="projects-app" aria-label="Projects">
      <header className="projects-app-header">
        <div className="projects-app-heading">
          <p className="projects-app-eyebrow">SELECTED WORK / 03</p>
          <h1 className="projects-app-title">Systems that move from idea to impact.</h1>
          <p className="projects-app-intro">
            Explore the AI products, retrieval systems, and recommendation engines behind the portfolio.
          </p>
        </div>

        <div className="projects-app-controls" aria-label="Project controls">
          <div className="projects-app-control-group" role="group" aria-label="Filter projects">
            <span className="projects-app-control-label">FILTER</span>
            <div className="projects-app-filter-list">
              {filterOptions.map((option) => {
                const isActive = filter === option.id;
                return (
                  <button
                    className={`projects-app-filter-button ${isActive ? 'projects-app-filter-button-active' : ''}`}
                    type="button"
                    key={option.id}
                    aria-pressed={isActive}
                    onClick={() => setFilter(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="projects-app-control-group" role="group" aria-label="Project detail view">
            <span className="projects-app-control-label">VIEW</span>
            <div className="projects-app-view-toggle">
              {(['recruiter', 'technical'] as const).map((option) => {
                const isActive = view === option;
                return (
                  <button
                    className={`projects-app-view-button ${isActive ? 'projects-app-view-button-active' : ''}`}
                    type="button"
                    key={option}
                    aria-pressed={isActive}
                    onClick={() => setView(option)}
                  >
                    {option === 'recruiter' ? 'Recruiter' : 'Technical'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="projects-app-results-bar" aria-live="polite">
        <span>{filteredProjects.length} projects</span>
        <span className="projects-app-results-view">
          {view === 'recruiter' ? 'Outcomes and product context' : 'Implementation and architecture'}
        </span>
      </div>

      <section className="projects-app-project-list" aria-label="Project list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            const isExpanded = expandedProject === project.title;
            const metrics = projectMetrics[project.title] ?? [];
            const architecture = architectures[project.title] ?? [];
            const projectId = getProjectId(project);

            return (
              <article
                className={`projects-app-card projects-app-card-${project.accent} ${isExpanded ? 'projects-app-card-expanded' : ''}`}
                key={project.title}
              >
                <button
                  className="projects-app-card-toggle"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={projectId}
                  onClick={() => toggleProject(project.title)}
                >
                  <span className="projects-app-card-number">{project.number}</span>
                  <span className="projects-app-card-heading">
                    <span className="projects-app-card-type">{project.type}</span>
                    <span className="projects-app-card-title">{project.title}</span>
                    <span className="projects-app-card-description">{project.description}</span>
                  </span>
                  <span className="projects-app-card-chevron" aria-hidden="true">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {metrics.length > 0 && (
                  <div className="projects-app-metrics" aria-label={`${project.title} metrics`}>
                    {metrics.map((metric) => (
                      <span className="projects-app-metric-chip" key={`${metric.value}-${metric.label}`}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {isExpanded && (
                  <div className="projects-app-card-details" id={projectId}>
                    {view === 'recruiter' ? (
                      <div className="projects-app-recruiter-detail">
                        <p className="projects-app-detail-label">WHY IT MATTERS</p>
                        <p className="projects-app-recruiter-summary">{recruiterSummaries[project.title]}</p>
                        <p className="projects-app-detail-note">
                          Built as an end-to-end system with a clear path from source data to a usable product.
                        </p>
                      </div>
                    ) : (
                      <div className="projects-app-technical-detail">
                        <div className="projects-app-detail-column">
                          <p className="projects-app-detail-label">IMPLEMENTATION NOTES</p>
                          <ul className="projects-app-highlights">
                            {project.highlights.map((highlight) => (
                              <li key={highlight}>
                                <Check size={15} aria-hidden="true" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="projects-app-stack" aria-label="Technology stack">
                            {project.stack.map((technology) => (
                              <span className="projects-app-stack-chip" key={technology}>
                                {technology}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="projects-app-architecture" aria-label={`${project.title} architecture`}>
                      <div className="projects-app-architecture-heading">
                        <div>
                          <p className="projects-app-detail-label">SYSTEM PATH</p>
                          <h2 className="projects-app-architecture-title">How the pieces connect</h2>
                        </div>
                        <span className="projects-app-architecture-caption">simplified view</span>
                      </div>
                      <div className="projects-app-architecture-flow">
                        {architecture.map((step, index) => (
                          <React.Fragment key={step.label}>
                            <div className="projects-app-architecture-step">
                              <span className="projects-app-architecture-icon">
                                <step.icon size={16} aria-hidden="true" />
                              </span>
                              <span className="projects-app-architecture-step-copy">
                                <strong>{step.label}</strong>
                                <span>{step.detail}</span>
                              </span>
                            </div>
                            {index < architecture.length - 1 && (
                              <ArrowRight className="projects-app-architecture-arrow" size={18} aria-hidden="true" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="projects-app-detail-footer">
                      <a className="projects-app-source-link" href={project.link} target="_blank" rel="noreferrer">
                        <Github size={15} aria-hidden="true" />
                        View source
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        ) : (
          <div className="projects-app-empty-state">
            <p className="projects-app-detail-label">NO PROJECTS FOUND</p>
            <p>Try another project filter.</p>
          </div>
        )}
      </section>
    </main>
  );
};
