# Siddhartha Goswami · Portfolio

A fast, responsive portfolio for Siddhartha Goswami, an AI/ML engineer and Mathematics & Computing undergraduate at IIT Roorkee. The primary experience is a recruiter-friendly case-study site; the original Ubuntu desktop, terminal, resume viewer, and Snake game remain available as an optional interactive mode.

## What is included

- Immediate hero section with clear positioning, resume access, and contact links.
- Resume-led project stories for Enterprise Knowledge Assistant, Video Blog App, and FlixPulse.
- Experience, skills, education, competitive programming, and achievement sections.
- Responsive layout with keyboard-friendly navigation and a mobile menu.
- Optional Ubuntu desktop mode with Terminal, Resume, About, System Monitor, and Snake apps.
- Express API for the terminal data, generated resume PDF, and Snake high scores.

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

The public portfolio works without environment variables. Set `JWT_SECRET` in `.env` if you use the optional authentication endpoints.

## Run locally

```bash
npm run dev
```

Open <http://localhost:3000>. The same command is available as `make dev`.

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

The production server serves the built frontend and API on port 3000. On Windows PowerShell, use `$env:NODE_ENV="production"; npm run start`.

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

The canonical public profile content lives in `src/content/profile.ts`. Update that file when resume details change so the home page and desktop About app stay aligned. The generated `/api/resume` endpoint is the first-party resume view used by the UI.

## Links

- GitHub: <https://github.com/sidg2hp>
- LinkedIn: <https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/>
- Email: <mailto:sidgos010304@gmail.com>
