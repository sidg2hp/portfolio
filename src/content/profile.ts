export const profile = {
  name: 'Siddhartha Goswami',
  role: 'AI Engineering Intern · AI / ML Builder',
  education: 'BS-MS Mathematics and Computing · IIT Roorkee · Aug 2023 – May 2028',
  location: 'Roorkee, India',
  email: 'sidgos010304@gmail.com',
  phone: '+91-8004927995',
  github: 'https://github.com/sidg2hp',
  linkedin: 'https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/',
  portfolio: 'https://portfolio-74zz.onrender.com/',
  intro:
    'Mathematics & Computing undergraduate at IIT Roorkee focused on Generative AI, Agentic Systems, RAG, and Machine Learning. Experienced in building end-to-end AI products across enterprise search and intelligent automation.',
  focus: ['Generative AI', 'Agentic Systems', 'RAG', 'Machine Learning'],
};

export const projects = [
  {
    number: '01',
    title: 'Enterprise Knowledge Assistant',
    type: 'Multi-agent search & decision support',
    description:
      'A production-minded assistant that routes enterprise questions across specialized HR, policy, precedent, and general-purpose agents.',
    highlights: [
      'Built a multi-agent enterprise search and decision-support system with LangGraph, routing domain-specific queries across specialized HR, policy, precedent, and general-purpose agents.',
      'Implemented hybrid GraphRAG retrieval combining Neo4j knowledge graphs, FAISS dense retrieval, and BM25 lexical search to capture both entity relationships and semantic relevance.',
      'Added a GenAI evaluation layer for groundedness and citation accuracy, then containerized the FastAPI backend, Next.js frontend, and Neo4j database with Docker Compose.',
    ],
    stack: ['Python', 'LangGraph', 'LangChain', 'Neo4j', 'FAISS', 'BM25', 'FastAPI', 'Docker'],
    link: 'https://github.com/sidg2hp',
    category: 'genai',
    accent: 'lime',
  },
  {
    number: '02',
    title: 'Video Blog App',
    type: 'AI media pipeline & transcript RAG',
    description:
      'A full-stack platform that turns YouTube videos into searchable, long-form knowledge — from ingestion and audio extraction to grounded generation.',
    highlights: [
      'Built a full-stack AI platform automating YouTube ingestion and audio extraction to transcription and long-form article generation.',
      'Implemented transcript-based RAG for contextual question answering, semantic search, summarization, quiz generation, and interactive mind maps grounded in source video content.',
      'Engineered backend services for media processing, transcript indexing, AI inference, and CRUD workflows with authentication and persistent content management.',
    ],
    stack: ['Django', 'AssemblyAI', 'Ollama', 'FFmpeg', 'yt-dlp', 'RAG'],
    link: 'https://github.com/sidg2hp/Vid2Article',
    category: 'genai',
    accent: 'orange',
  },
  {
    number: '03',
    title: 'FlixPulse',
    type: 'Personalized recommendation engine',
    description:
      'A recommendation product built on 5.7M+ ratings, combining collaborative filtering with a fast, explainable product layer.',
    highlights: [
      'Developed an end-to-end recommendation system over 5.7M+ ratings from 21K+ users and 1.2K+ movies using SVD matrix factorization and item-based collaborative filtering.',
      'Built a FastAPI + React product layer with cached recommendations, explainable item similarity, and popularity-based cold-start fallbacks; achieved MAP@10 = 0.743 and NDCG@10 = 0.834.',
      'Evaluated RMSE, MAE, MAP@10, NDCG@10, Hit Rate, Coverage, and Diversity, achieving 99.96% user coverage.',
    ],
    stack: ['Python', 'FastAPI', 'React', 'SVD', 'KNN', 'scikit-learn'],
    link: 'https://github.com/sidg2hp/flixpulse',
    category: 'ml',
    accent: 'blue',
  },
  {
    number: '04',
    title: 'Hybrid DGM–Monte Carlo Option Pricing',
    type: 'Scientific ML · quantitative finance',
    description:
      'A research-grade Deep Galerkin Method solver for multi-asset European option pricing under Black–Scholes, paired with a Monte Carlo control-variate method.',
    highlights: [
      'Solves the multi-dimensional Black–Scholes PDE with a DGM network, hard terminal constraints, automatic differentiation, and exact/Hutchinson Hessian traces.',
      'Validated at 0.11% relative L² error for 1D Black–Scholes and 0.61% for a 2D geometric basket in the repository experiments.',
      'Hybrid DGM–MC reports >99.999% variance reduction for dimensions up to 10; pure DGM becomes unstable in some deep-OTM, high-dimensional cases, which the repo documents honestly.',
    ],
    stack: ['Python', 'PyTorch', 'DGM', 'PDEs', 'Monte Carlo', 'Automatic Differentiation'],
    link: 'https://github.com/sidg2hp/option-pricing-DGM',
    category: 'ml',
    accent: 'violet',
  },
  {
    number: '05',
    title: 'Kairon: Deep Research Dual-Agent System',
    type: 'Agentic research prototype',
    description:
      'A focused dual-agent prototype that separates web research from answer drafting, using Tavily for retrieval and a local Ollama model for generation.',
    highlights: [
      'Research agent gathers current web information through TavilySearchResults.',
      'Drafting agent uses a retriever-backed workflow to turn gathered context into an answer.',
      'Small, clear codebase with separate agents, pipeline, utilities, and a runnable app; best presented as an agentic prototype rather than a production platform.',
    ],
    stack: ['Python', 'LangChain', 'Tavily', 'Ollama', 'FAISS', 'Streamlit'],
    link: 'https://github.com/sidg2hp/Deep-Research-Dual-Agent-System',
    category: 'genai',
    accent: 'purple',
  },
  {
    number: '06',
    title: 'NetSentinel',
    type: 'Systems programming · networking',
    description:
      'A concurrent TCP-based HTTP/HTTPS forward proxy in C with request parsing, domain filtering, logging, and CONNECT tunneling.',
    highlights: [
      'Uses POSIX sockets and a thread-per-connection concurrency model for simultaneous clients.',
      'Parses HTTP requests, supports HTTPS CONNECT tunneling, blocks configured domains with 403 responses, and logs client/request/status data.',
      'Includes a Makefile, modular headers/sources, and shell tests; the README notes no persistent keep-alive support and no TLS payload inspection.',
    ],
    stack: ['C', 'POSIX Sockets', 'pthreads', 'HTTP', 'HTTPS CONNECT', 'Make'],
    link: 'https://github.com/sidg2hp/NetSentineL',
    category: 'systems',
    accent: 'blue',
  },
  {
    number: '07',
    title: 'Multimodal Property Valuation',
    type: 'Multimodal ML research',
    description:
      'A research comparison that fuses tabular housing attributes with ResNet18 satellite-image embeddings to estimate property prices.',
    highlights: [
      'Uses leakage-safe preprocessing, train-only fitting, lazy image loading, and a PyTorch fusion model combining structured and visual features.',
      'The repo reports R² ≈ 0.822 for fusion versus 0.8964 for a tabular gradient-boosting baseline and ≈ 0.567 for image-only; the visual signal is useful but not yet better than tabular data.',
      'Strong discussion of limitations including spatial bias, static imagery, capture-date mismatch, and the need for attention or temporal modeling.',
    ],
    stack: ['Python', 'PyTorch', 'ResNet18', 'scikit-learn', 'Pandas', 'Satellite Imagery'],
    link: 'https://github.com/sidg2hp/MULTIMODAL-SAT-IMG',
    category: 'ml',
    accent: 'teal',
  },
];

export const skills = {
  'Languages': ['Python', 'C++', 'SQL', 'JavaScript / TypeScript'],
  'GenAI / LLM': ['LLMs', 'RAG', 'GraphRAG', 'LangChain', 'LangGraph', 'FAISS', 'BM25', 'Neo4j', 'Ollama', 'Tavily', 'Prompt Engineering', 'Agentic AI', 'LLM Evaluation'],
  'Data Science / ML': ['Pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'PyTorch', 'CNNs', 'RNNs / LSTMs', 'Transformers', 'Transfer Learning', 'Model Evaluation'],
  'Backend / Infrastructure': ['FastAPI', 'Django', 'REST APIs', 'PostgreSQL', 'Docker', 'Git', 'AWS (S3, Rekognition)', 'Linux / WSL'],
  'Math': ['Probability', 'Statistics', 'Linear Algebra', 'Optimization', 'Stochastic Processes'],
};

export const achievements = [
  ['3× Winner', 'Hackathons · won three hackathons for developing innovative technology solutions'],
  ['AIR 1489', 'JEE Advanced 2023 · top 0.05% among ~180k candidates'],
  ['AIR 841', 'KVPY SA 2020 · National Science Fellowship (DST, Government of India)'],
  ['Expert · 1607', 'Codeforces · sisyphus_7 · data structures, graph algorithms, and number theory'],
];

export const experience = {
  role: 'AI Engineering Intern',
  organization: 'Hiring Bazaar AI',
  period: 'Apr 2026 – Jun 2026',
  bullets: [
    'Built an end-to-end resume parsing and hybrid retrieval pipeline, combining BM25 lexical search with dense vector retrieval for automated candidate screening over unstructured resumes.',
    'Owned architecture, implementation, and deployment as the sole engineer, collaborating directly with the founding team to integrate the pipeline into the production hiring workflow.',
  ],
};
