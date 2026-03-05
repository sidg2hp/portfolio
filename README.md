# Ubuntu-themed Portfolio Website 🖥️

A production-ready portfolio website inspired by Ubuntu Linux (modern GNOME desktop style). It simulates a real Ubuntu desktop inside the browser, complete with a functional terminal, applications, games, and a modern UI.

![Ubuntu Desktop Preview](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6) <!-- Replace with your actual screenshot -->

## 🌟 Features

*   **Ubuntu Desktop Environment:**
    *   Authentic boot splash screen and lock screen.
    *   Classic GNOME-like desktop layout with a left vertical dock and top bar containing system icons (time, battery, network).
    *   Draggable, minimizable, and maximizable windows with smooth Framer Motion animations.
    *   Yaru dark theme with standard Ubuntu orange accents (`#E95420`).
*   **Functional Terminal App (`Terminal`):**
    *   Realistic GNOME terminal UI with a `guest@portfolio:~$` prompt and blinking cursor.
    *   Command history navigation (↑ ↓) and tab autocomplete.
    *   Built-in commands: `help`, `about`, `projects`, `skills`, `experience`, `contact`, `clear`, `ls`, `cd`, `cat`, `resume`, `snake`, `neofetch`, `whoami`, `exit`.
    *   Dynamic data fetching from backend APIs for projects, skills, and experience.
    *   `neofetch` displays a customized Ubuntu ASCII logo with portfolio data.
*   **System Monitor:** 
    *   Simulates real-time CPU, RAM, and Network usage with live-updating charts.
*   **Games & Fun (`Snake`):**
    *   Playable retro pixel-style snake game accessible via terminal (`snake`) or dock.
    *   Global high score tracking powered by SQLite.
*   **Resume Integration:**
    *   Dedicated app to view and download your resume.
    *   Uses a Google Drive embedded PDF viewer for high-quality rendering.
*   **User Authentication System:**
    *   JWT-based authentication with bcrypt for secure login/logout features.

## 🛠️ Tech Stack

**Frontend:**
*   **React 19**
*   **Vite** (Build Tool)
*   **TailwindCSS** (Styling & Yaru Theme)
*   **Framer Motion** (Window management, dragging, and animations)
*   **Zustand** (Global state management)
*   **Lucide React** (Icons)
*   **Recharts** (System Monitor graphs)

**Backend:**
*   **Express.js** (Node.js framework)
*   **Better-SQLite3** (Database for high scores and users)
*   **JSON Web Token (JWT)** & **Bcrypt.js** (Authentication)
*   **PDFKit** (For dynamic PDF generation if needed)

## 🚀 Setting Up Locally

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   Git

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sidg2hp/Portfolio-Website.git
    cd Portfolio-Website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory (you can copy `.env.example` if available) and add a secret key for JWT authentication:
    ```env
    JWT_SECRET=your_super_secret_jwt_key_here
    GEMINI_API_KEY=your_gemini_api_key_if_used
    ```

4.  **Run the application (Development Mode):**
    ```bash
    npm run dev
    ```
    This will start the full-stack server using `tsx` at `http://localhost:3000`.

## 📦 Building for Production

To build the optimized production assets:
```bash
npm run build
```

To run the production server:
```bash
npm run start
```
*(Ensure `NODE_ENV=production` is set in your environment).*

## 🌍 Deployment Options

### Deploying to Render (Recommended for Full-Stack Node + SQLite)

1.  Push your code to a GitHub repository.
2.  Log in to [Render](https://render.com/) and click **New > Web Service**.
3.  Connect your GitHub repo.
4.  Configure the service:
    *   **Runtime:** `Node`
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm run start`
5.  Set your Environment Variables on Render:
    *   `NODE_ENV=production`
    *   `JWT_SECRET=your_production_secret`
6.  Click **Create Web Service**.

## 👨‍💻 Author

**Siddhartha Goswami**
*   [GitHub (@sidg2hp)](https://github.com/sidg2hp)
*   [LinkedIn](https://www.linkedin.com/in/siddhartha-goswami-1a83681b2/)

---
*Built with ❤️ and simulating Linux.*
