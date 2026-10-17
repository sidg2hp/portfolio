export const profile = {
  name: 'Siddhartha Goswami',
  role: 'AI / ML Engineer & Builder',
  education: 'BS-MS Mathematics & Computing · IIT Roorkee',
  location: 'Roorkee, India',
  email: 'sidgos010304@gmail.com',
  phone: '+91-8004927995',
  github: 'https://github.com/sidg2hp',
  linkedin: 'https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/',
  portfolio: 'https://portfolio-74zz.onrender.com/',
  intro:
    'I build reliable AI products where strong mathematical foundations meet useful interfaces — from GraphRAG assistants and agentic workflows to personalized recommendation systems.',
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
      'LangGraph routing across domain-specific agents',
      'Hybrid GraphRAG with Neo4j, FAISS, and BM25',
      'Groundedness and citation evaluation with traceable document IDs',
    ],
    stack: ['Python', 'LangGraph', 'Neo4j', 'FAISS', 'BM25', 'FastAPI'],
    link: 'https://github.com/sidg2hp',
    accent: 'lime',
  },
  {
    number: '02',
    title: 'Video Blog App',
    type: 'AI media pipeline & transcript RAG',
    description:
      'A full-stack platform that turns YouTube videos into searchable, long-form knowledge — from ingestion and audio extraction to grounded generation.',
    highlights: [
      'YouTube ingestion, FFmpeg extraction, and AssemblyAI transcription',
      'Transcript-based RAG for Q&A, semantic search, summaries, and quizzes',
      'Persistent content management with authentication and CRUD workflows',
    ],
    stack: ['Django', 'AssemblyAI', 'Ollama', 'FFmpeg', 'yt-dlp', 'RAG'],
    link: 'https://github.com/sidg2hp',
    accent: 'orange',
  },
  {
    number: '03',
    title: 'FlixPulse',
    type: 'Personalized recommendation engine',
    description:
      'A recommendation product built on 5.7M+ ratings, combining collaborative filtering with a fast, explainable product layer.',
    highlights: [
      'SVD matrix factorization and item-based KNN recommendations',
      'MAP@10 = 0.743 and NDCG@10 = 0.834',
      '99.96% user coverage with cold-start and popularity fallbacks',
    ],
    stack: ['Python', 'FastAPI', 'React', 'SVD', 'KNN', 'scikit-learn'],
    link: 'https://github.com/sidg2hp',
    accent: 'blue',
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
  ['AIR 1489', 'JEE Advanced 2023 · top 0.05% among ~180k candidates'],
  ['AIR 841', 'KVPY SA 2020 · National Science Fellowship (DST, Government of India)'],
  ['Expert · 1607', 'Codeforces · sisyphus_7'],
];
