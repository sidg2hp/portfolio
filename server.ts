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
const JWT_SECRET = process.env.JWT_SECRET || 'ubuntu-secret-key-change-me';

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
    name: "deep-research-agent",
    title: "Deep Research Dual-Agent System",
    description: "Autonomous multi-agent system coordinating Researcher and Writer agents for end-to-end research automation.",
    tech: ["Python", "LangGraph", "Tavily API", "Streamlit"],
    link: "https://github.com/sidg2hp/Deep-Research-Agent"
  },
  {
    id: 2,
    name: "pdf-rag-system",
    title: "PDF-Based RAG System",
    description: "Scalable semantic search system over technical PDFs using vector embeddings and FAISS indexing.",
    tech: ["LangChain", "FAISS", "DeepSeek", "DeepSeek-R1-14B"],
    link: "https://github.com/sidg2hp/PDF-RAG-System"
  },
  {
    id: 3,
    name: "satellite-imagery-analysis",
    title: "Multimodal Satellite Imagery Analysis",
    description: "Multimodal ML pipeline combining satellite imagery (CNNs) with structured housing data.",
    tech: ["PyTorch", "CNNs", "Pandas"],
    link: "https://github.com/sidg2hp/Satellite-Imagery-Analysis"
  },
  {
    id: 4,
    name: "netsentinel-proxy",
    title: "NetSentinel: Network Proxy Server",
    description: "High-performance, multi-threaded HTTP/HTTPS proxy server using low-level socket APIs.",
    tech: ["C++", "Socket Programming", "Linux"],
    link: "https://github.com/sidg2hp/NetSentinel"
  },
  {
    id: 5,
    name: "stock-sentiment-analysis",
    title: "Stock Market Sentiment Analysis",
    description: "Analyzed sentiment from 10,000+ financial news articles to predict stock movements with 85% accuracy.",
    tech: ["Python", "spaCy", "Scikit-learn"],
    link: "https://github.com/sidg2hp/Stock-Sentiment-Analysis"
  },
  {
    id: 6,
    name: "ai-blog-generator",
    title: "AI Blog Generator",
    description: "Full-stack system converting YouTube videos into structured blog posts using LLMs.",
    tech: ["Django", "AssemblyAI", "Tailwind CSS"],
    link: "https://github.com/sidg2hp/AI-Blog-Generator"
  }
];

const SKILLS = {
  languages: ["Python", "C++", "SQL", "JavaScript", "Solidity", "HTML", "CSS"],
  machine_learning: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "NLTK", "spaCy"],
  generative_ai: ["LangChain", "LangGraph", "RAG", "FAISS", "Ollama", "DeepSeek Models"],
  development: ["Django", "Streamlit", "React", "Tailwind CSS", "Docker", "Git", "Linux/WSL"]
};

const EXPERIENCE = [
  {
    id: 1,
    role: "Coordinator",
    organization: "Placement & Internship Cell, IIT Roorkee",
    period: "Jul 2024 – Present",
    description: "Coordinating placement and internship activities for the institute."
  },
  {
    id: 2,
    role: "Editor",
    organization: "WatchOut! (Campus Media Body)",
    period: "Dec 2024 – Present",
    description: "Editorial role in the official campus media body of IIT Roorkee."
  },
  {
    id: 3,
    role: "Editor",
    organization: "Kshitij (Literary Magazine)",
    period: "Dec 2024 – Present",
    description: "Editorial role in the literary magazine of IIT Roorkee."
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
  doc.fontSize(14).font('Helvetica-Bold').text('ACHIEVEMENTS & CERTIFICATIONS', { underline: true });
  doc.moveDown(0.5);
  const achievements = [
    "AIR 1489 in JEE Advanced 2023 among 160,000+ candidates",
    "AIR 841 in KVPY 2020 (Kishore Vaigyanik Protsahan Yojana)",
    "Machine Learning Specialization — Andrew Ng (Stanford University, Coursera)",
    "Introduction to Generative AI — Google Cloud Skills Boost",
    "Summer Analytics 2024 — IIT Guwahati (Machine Learning Workshop)"
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
