# Siddhartha Goswami · Portfolio

A recruiter-friendly Ubuntu portfolio desktop for Siddhartha Goswami, an AI/ML engineer and Mathematics & Computing undergraduate at IIT Roorkee. The Ubuntu workspace is the first-load experience: About and Resume are immediately available, while Terminal, System Monitor, and Snake add personality without hiding the work.

## What is included

- Ubuntu-inspired desktop opens immediately with the About app already visible.
- Resume-led project stories for Enterprise Knowledge Assistant, Video Blog App, and FlixPulse.
- Exact attached resume PDF served locally as `public/Siddhartha_Goswami_Resume.pdf`.
- About, Resume, Terminal, System Monitor, and Snake apps are available from the dock.
- The About app is a scrollable mini-portfolio with sticky section navigation and expandable project case studies.
- The System Monitor is a truthful portfolio evidence dashboard rather than fictional CPU/network telemetry.
- Terminal supports resume-backed `projects`, `project <name>`, `experience`, `achievements`, and command history with ↑/↓.
- Express API for terminal data and Snake high scores.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 and Motion for styling and animation
- Express + `tsx` for the full-stack development/production server
- SQLite via `better-sqlite3` for optional game/auth data
- Node.js `24.21.0` (pinned in `.nvmrc`)

## Setup

Prerequisites: Node.js 24.21.0 and npm.

```bash
git clone https://github.com/sidg2hp/portfolio.git
cd ubuntu-portfolio
npm ci
cp .env.example .env
```

The public portfolio works without environment variables. Set `JWT_SECRET` in `.env` only if you use the optional authentication endpoints.

## Run locally

```bash
npm run dev
```

Open <http://localhost:3000>. The Ubuntu desktop is the first screen; click About or Resume in the dock to begin. The same command is available as `make dev`. If port 3000 is already in use, the server automatically selects the next available port and prints the URL.

To choose a port explicitly:

```bash
PORT=4173 npm run dev
```

On Windows PowerShell:

```powershell
$env:PORT=4173; npm run dev
```

## Checks

The repository has one offline-friendly test command. It typechecks the complete TypeScript project and creates a production Vite bundle:

```bash
npm test
```

Equivalent Make target:

```bash
make test
```

## Production build and run

```bash
npm run build
NODE_ENV=production npm run start
```

The production server serves the built frontend, exact resume PDF, and API on port 3000. On Windows PowerShell, use `$env:NODE_ENV="production"; npm run start`.

## Docker

The Dockerfile pins the Node image, installs the lockfile dependencies, builds the frontend, and runs the Express server:

```bash
docker build -t siddhartha-portfolio .
docker run --rm -p 3000:3000 siddhartha-portfolio
```

Or:

```bash
make docker-build
make docker-run
```

## Content source

The canonical public profile content lives in `src/content/profile.ts`. Update that file when resume details change so the desktop About app stays aligned. The attached resume is kept unchanged as `public/Siddhartha_Goswami_Resume.pdf`; `/api/resume` serves that same file and `/api/resume?download=1` downloads it.

## Links

- GitHub: <https://github.com/sidg2hp>
- LinkedIn: <https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/>
- Email: <mailto:sidgos010304@gmail.com>
