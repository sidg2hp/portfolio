import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

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
    description: "Multi-agent enterprise search and decision-support system with domain routing, hybrid GraphRAG retrieval, and traceable evaluation.",
    tech: ["Python", "LangGraph", "Neo4j", "FAISS", "BM25", "FastAPI"],
    link: "https://github.com/sidg2hp"
  },
  {
    id: 2,
    name: "video-blog-app",
    title: "Video Blog App",
    description: "Full-stack AI platform automating YouTube ingestion, audio extraction, transcription, transcript RAG, and long-form article generation.",
    tech: ["Django", "AssemblyAI", "Ollama", "FFmpeg", "yt-dlp", "RAG"],
    link: "https://github.com/sidg2hp"
  },
  {
    id: 3,
    name: "flixpulse",
    title: "FlixPulse: Personalized Recommendation Engine",
    description: "Recommendation system over 5.7M+ ratings using SVD matrix factorization, item-based collaborative filtering, and cold-start fallbacks.",
    tech: ["Python", "FastAPI", "React", "SVD", "KNN", "scikit-learn"],
    link: "https://github.com/sidg2hp"
  },
];

const SKILLS = {
  languages: ["Python", "C++", "SQL", "JavaScript/TypeScript"],
  machine_learning: ["PyTorch", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Transformers", "CNNs", "RNNs/LSTMs"],
  generative_ai: ["LLMs", "RAG", "GraphRAG", "LangChain", "LangGraph", "FAISS", "BM25", "Neo4j", "Ollama", "Agentic AI"],
  development: ["FastAPI", "Django", "REST APIs", "PostgreSQL", "Docker", "Git", "AWS (S3, Rekognition)", "Linux/WSL"]
};

const EXPERIENCE = [
  {
    id: 1,
    role: "AI Engineering Intern",
    organization: "Hiring Bazaar AI",
    period: "Apr 2026 – Jun 2026",
    description: "Built and deployed a resume parsing and hybrid retrieval pipeline using BM25 and dense vectors for automated candidate screening."
  }
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
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=Siddhartha_Goswami_Resume.pdf');

  doc.pipe(res);

  // Header
  doc.fontSize(24).font('Helvetica-Bold').text('SIDDHARTHA GOSWAMI', { align: 'center' });
  doc.fontSize(10).font('Helvetica').text('IIT Roorkee, Uttarakhand, India', { align: 'center' });
  doc.moveDown(0.5);
  
  // Contact Links
  const contactY = doc.y;
  doc.text('+91-8004927995 | ', { continued: true, align: 'center' });
  doc.fillColor('blue').text('sidgos010304@gmail.com', { link: 'mailto:sidgos010304@gmail.com', continued: true, underline: true });
  doc.fillColor('black').text(' | ', { continued: true, underline: false });
  doc.fillColor('blue').text('LinkedIn', { link: CONTACT.linkedin, continued: true, underline: true });
  doc.fillColor('black').text(' | ', { continued: true, underline: false });
  doc.fillColor('blue').text('GitHub', { link: CONTACT.github, underline: true });
  doc.fillColor('black');
  
  doc.moveDown(1);

  // Education
  doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).text('Indian Institute of Technology Roorkee', { continued: true });
  doc.font('Helvetica').text('Roorkee, India', { align: 'right' });
  doc.font('Helvetica-Oblique').text('BS-MS Mathematics and Computing', { continued: true });
  doc.text('Aug 2023 - May 2028 (Expected)', { align: 'right' });
  doc.moveDown(1);

  // Technical Skills
  doc.fontSize(14).font('Helvetica-Bold').text('TECHNICAL SKILLS', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica-Bold').text('Programming Languages: ', { continued: true }).font('Helvetica').text(SKILLS.languages.join(', '));
  doc.font('Helvetica-Bold').text('Machine Learning & AI: ', { continued: true }).font('Helvetica').text(SKILLS.machine_learning.join(', '));
  doc.font('Helvetica-Bold').text('Generative AI: ', { continued: true }).font('Helvetica').text(SKILLS.generative_ai.join(', '));
  doc.font('Helvetica-Bold').text('Development & Tools: ', { continued: true }).font('Helvetica').text(SKILLS.development.join(', '));
  doc.moveDown(1);

  // Key Projects
  doc.fontSize(14).font('Helvetica-Bold').text('KEY PROJECTS', { underline: true });
  doc.moveDown(0.5);

  PROJECTS.forEach(project => {
    doc.fontSize(11).font('Helvetica-Bold').text(project.title, { continued: true });
    doc.font('Helvetica-Oblique').text(` | ${project.tech.join(', ')}`, { continued: true });
    doc.fillColor('blue').text(' GitHub', { link: project.link, align: 'right', underline: true });
    doc.fillColor('black');
    doc.fontSize(10).font('Helvetica').text(project.description);
    doc.moveDown(0.5);
  });
  doc.moveDown(0.5);

  // Experience
  doc.fontSize(14).font('Helvetica-Bold').text('EXPERIENCE & LEADERSHIP', { underline: true });
  doc.moveDown(0.5);
  
  EXPERIENCE.forEach(exp => {
    doc.fontSize(11).font('Helvetica-Bold').text(exp.role, { continued: true });
    doc.font('Helvetica').text(' — ' + exp.organization);
    doc.fontSize(10).font('Helvetica-Oblique').text(exp.period, { align: 'right' });
    doc.font('Helvetica').text(exp.description);
    doc.moveDown(0.5);
  });
  doc.moveDown(1);

  // Achievements
  doc.fontSize(14).font('Helvetica-Bold').text('ACHIEVEMENTS & COMPETITIVE PROGRAMMING', { underline: true });
  doc.moveDown(0.5);
  const achievements = [
    "AIR 1489 in JEE Advanced 2023 — top 0.05% among ~180,000 candidates",
    "AIR 841 in KVPY SA 2020 — National Science Fellowship (DST, Government of India)",
    "Codeforces: sisyphus_7 — Rated Expert (maximum rating 1607)"
  ];
  
  achievements.forEach(ach => {
    doc.fontSize(10).font('Helvetica').text(`•  ${ach}`);
    doc.moveDown(0.2);
  });

  doc.end();
});

// Vite Middleware
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
