import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createServer as createNetServer } from 'node:net';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

const parsedPort = Number(process.env.PORT ?? 3000);
const requestedPort = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

const findAvailablePort = async (startPort: number) => {
  for (let port = startPort; port < startPort + 20; port += 1) {
    const available = await new Promise<boolean>((resolve) => {
      const probe = createNetServer();
      probe.once('error', () => resolve(false));
      probe.once('listening', () => probe.close(() => resolve(true)));
      probe.listen(port, '0.0.0.0');
    });

    if (available) return port;
  }

  throw new Error(`No available port found between ${startPort} and ${startPort + 19}`);
};

const PORT = await findAvailablePort(requestedPort);
const HMR_PORT = await findAvailablePort(PORT + 1);

if (PORT !== requestedPort) {
  console.warn(`Port ${requestedPort} is already in use; using port ${PORT} instead.`);
}

// Middleware
app.use(express.json());

// Database Setup
const db = new Database('portfolio.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS highscores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT
  );
`);

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    name: "enterprise-knowledge-assistant",
    title: "Enterprise Knowledge Assistant",
    description: "Built a multi-agent enterprise search and decision-support system with LangGraph, routing domain-specific queries across specialized HR, policy, precedent, and general-purpose agents. Implemented hybrid GraphRAG with Neo4j, FAISS, and BM25; added groundedness/citation evaluation and Docker Compose deployment for the FastAPI backend, Next.js frontend, and Neo4j database.",
    tech: ["Python", "LangGraph", "LangChain", "Neo4j", "FAISS", "BM25", "FastAPI", "Docker"],
    link: "https://github.com/sidg2hp"
  },
  {
    id: 2,
    name: "video-blog-app",
    title: "Video Blog App",
    description: "Built a full-stack AI platform automating YouTube ingestion and audio extraction to transcription and long-form article generation. Added transcript RAG for Q&A, semantic search, summarization, quizzes, and interactive mind maps grounded in source video content.",
    tech: ["Django", "AssemblyAI", "Ollama", "FFmpeg", "yt-dlp", "RAG"],
    link: "https://github.com/sidg2hp"
  },
  {
    id: 3,
    name: "flixpulse",
    title: "FlixPulse: Personalized Recommendation Engine",
    description: "Developed a recommendation system over 5.7M+ ratings from 21K+ users and 1.2K+ movies using SVD matrix factorization and item-based collaborative filtering. Built cached, explainable recommendations with cold-start fallbacks; achieved MAP@10 = 0.743, NDCG@10 = 0.834, and 99.96% user coverage.",
    tech: ["Python", "FastAPI", "React", "SVD", "KNN", "scikit-learn"],
    link: "https://github.com/sidg2hp"
  },
  {
    id: 4,
    name: "option-pricing-DGM",
    title: "Hybrid DGM–Monte Carlo Option Pricing",
    description: "Deep Galerkin Method solver for multi-asset European option pricing under Black–Scholes, paired with a Monte Carlo control-variate method. The repository reports 0.11% 1D error, 0.61% 2D error, and >99.999% variance reduction in tested settings, while documenting high-dimensional pure-DGM limitations.",
    tech: ["Python", "PyTorch", "DGM", "PDEs", "Monte Carlo", "Automatic Differentiation"],
    link: "https://github.com/sidg2hp/option-pricing-DGM"
  },
  {
    id: 5,
    name: "Deep-Research-Dual-Agent-System",
    title: "Kairon: Deep Research Dual-Agent System",
    description: "Focused agentic prototype separating web research through Tavily from answer drafting with a retriever-backed LangChain workflow and local Ollama generation.",
    tech: ["Python", "LangChain", "Tavily", "Ollama", "FAISS", "Streamlit"],
    link: "https://github.com/sidg2hp/Deep-Research-Dual-Agent-System"
  },
  {
    id: 6,
    name: "NetSentineL",
    title: "NetSentinel: Concurrent HTTP/HTTPS Proxy",
    description: "C-based TCP forward proxy using POSIX sockets and pthreads, with HTTP parsing, HTTPS CONNECT tunneling, configurable domain blocking, activity logging, Makefile, and shell tests.",
    tech: ["C", "POSIX Sockets", "pthreads", "HTTP", "HTTPS CONNECT", "Make"],
    link: "https://github.com/sidg2hp/NetSentineL"
  },
  {
    id: 7,
    name: "MULTIMODAL-SAT-IMG",
    title: "Multimodal Property Valuation",
    description: "Research comparison fusing structured housing attributes with ResNet18 satellite-image embeddings. The README reports fusion R² ≈ 0.822 versus 0.8964 for a tabular baseline, making the limitation part of the result.",
    tech: ["Python", "PyTorch", "ResNet18", "scikit-learn", "Pandas", "Satellite Imagery"],
    link: "https://github.com/sidg2hp/MULTIMODAL-SAT-IMG"
  },
];

const SKILLS = {
  languages: ["Python", "C++", "SQL", "JavaScript/TypeScript"],
  generative_ai: ["LLMs", "RAG", "GraphRAG", "LangChain", "LangGraph", "FAISS", "BM25", "Neo4j", "Ollama", "Tavily", "Prompt Engineering", "Agentic AI", "LLM Evaluation"],
  machine_learning: ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "PyTorch", "CNNs", "RNNs/LSTMs", "Transformers", "Transfer Learning", "Model Evaluation"],
  development: ["FastAPI", "Django", "REST APIs", "PostgreSQL", "Docker", "Git", "AWS (S3, Rekognition)", "Linux/WSL"],
  math: ["Probability", "Statistics", "Linear Algebra", "Optimization", "Stochastic Processes"]
};

const EXPERIENCE = [
  {
    id: 1,
    role: "AI Engineering Intern",
    organization: "Hiring Bazaar AI",
    period: "Apr 2026 – Jun 2026",
    description: "Built an end-to-end resume parsing and hybrid retrieval pipeline, combining BM25 lexical search with dense vector retrieval for automated candidate screening over unstructured resumes. Owned architecture, implementation, and deployment as the sole engineer, collaborating directly with the founding team to integrate it into the production hiring workflow."
  }
];

const ACHIEVEMENTS = [
  { title: "3x Hackathon Winner", description: "Won three hackathons for developing innovative technology solutions." },
  { title: "AIR 1489", description: "JEE Advanced 2023, top 0.05% among ~180k candidates nationwide." },
  { title: "AIR 841", description: "KVPY SA 2020, National Science Fellowship (DST, Government of India)." },
  { title: "Codeforces Expert", description: "sisyphus_7, maximum rating 1607; solved problems across data structures, graph algorithms, and number theory." },
];

const CONTACT = {
  phone: "+91-8004927995",
  email: "sidgos010304@gmail.com",
  linkedin: "https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/",
  github: "https://github.com/sidg2hp"
};

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  if (!JWT_SECRET) return res.status(503).json({ error: "Authentication is not configured" });

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
    const info = stmt.run(username, hashedPassword, email || '');
    res.json({ success: true, userId: info.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  if (!JWT_SECRET) return res.status(503).json({ error: "Authentication is not configured" });

  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;

  if (!user) return res.status(400).json({ error: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(403).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username: user.username });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: (req as any).user });
});

// Data Routes
app.get('/api/projects', (req, res) => {
  setTimeout(() => {
    res.json(PROJECTS);
  }, 800);
});

app.get('/api/skills', (req, res) => {
  setTimeout(() => {
    res.json(SKILLS);
  }, 600);
});

app.get('/api/experience', (req, res) => {
  setTimeout(() => {
    res.json(EXPERIENCE);
  }, 700);
});

app.get('/api/achievements', (req, res) => {
  res.json(ACHIEVEMENTS);
});

app.get('/api/contact', (req, res) => {
  res.json(CONTACT);
});

app.get('/api/highscore', (req, res) => {
  const row = db.prepare('SELECT MAX(score) as highscore FROM highscores').get() as { highscore: number };
  res.json({ highscore: row ? row.highscore || 0 : 0 });
});

app.post('/api/highscore', (req, res) => {
  const { score } = req.body;
  if (typeof score === 'number') {
    db.prepare('INSERT INTO highscores (score) VALUES (?)').run(score);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid score" });
  }
});

app.get('/api/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'public', 'Siddhartha_Goswami_Resume.pdf');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Content-Disposition', req.query.download === '1'
    ? 'attachment; filename=Siddhartha_Goswami_Resume.pdf'
    : 'inline; filename=Siddhartha_Goswami_Resume.pdf');
  res.sendFile(resumePath);
});

// Vite Middleware
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: { port: HMR_PORT } },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
