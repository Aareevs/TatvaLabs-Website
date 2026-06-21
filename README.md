# Tatva Labs — Official Website

A premium, highly interactive marketing website for **Tatva Labs**, a technology-driven software development firm specializing in full-stack engineering, startup MVPs, custom business applications, and AI integration.

The application has been rebuilt using a modern React & Vite framework, utilizing Tailwind CSS, Framer Motion, and 3D Spline scenes to deliver a state-of-the-art interactive experience.

---

## ⚡ Key Features

* **Sleek Dark Mode & Radial Glows**: Designed with a premium dark-mode aesthetic featuring custom background grids, floating neon particles, and subtle amber radial glows.
* **Fluid Page Transitions & Scroll Reveals**: Smooth layout animations, magnetic button hover interactions, and lazy scroll reveals powered by **Framer Motion**.
* **Interactive 3D Spline Elements**: Integrates responsive 3D interactive workspaces and tech-core reactors using `@splinetool/react-spline`.
* **Projects Showcase**: A curated gallery of projects (Campus Critique, Motif, Vaani Setu, AlgoClash, Syntrox, ATFRO, and Ingredio) with modern glassmorphism project detail layouts.
* **Responsive Layouts**: Designed to be responsive with collapsible sidebar menus on mobile and optimized tablet layouts.
* **Production-Ready Assets**: Fully optimized asset directory mounted within the Vite `public/` folder, resolving correctly on Vercel deployments.

---

## 🛠️ Technology Stack

* **Core Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) (Fast Hot Module Replacement)
* **Routing**: [React Router DOM v6](https://reactrouter.com/) (Single Page Application routing)
* **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + Custom CSS base styles
* **Animations**: [Framer Motion v12](https://www.framer.com/motion/) (Spotlights, magnets, transitions, page shifts)
* **3D Integration**: [Spline Runtime](https://spline.design/) (Interactive 3D viewport scenes)

---

## 📁 Directory Structure

```text
Tatva Labs/
├── public/                 # Static assets directory
│   └── assets/
│       └── images/         # Project logos & member profile photos
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ui/             # SplineScene wrappers
│   │   ├── animations/     # Framer Motion utility components (Magnetic, Spotlight, Grid, etc.)
│   │   ├── CTASection.jsx  # Reusable Call-To-Action component
│   │   ├── Counter.jsx     # Statistical numbers counter
│   │   ├── Footer.jsx      # Bottom footer with radial gradients
│   │   ├── Navbar.jsx      # Navigation header
│   │   ├── Reveal.jsx      # Intersection observer scroll reveal wrapper
│   │   └── TeamSection.jsx # Meet the Team cards (About page)
│   ├── css/                # Page & component styles
│   ├── pages/              # Single Page Application views
│   │   ├── Home.jsx        # Landing page (Hero, Stats, Services, Featured, CTA)
│   │   ├── About.jsx       # About us page (Story, Milestones, Mission, Team)
│   │   ├── Services.jsx    # Our capabilities & process timeline
│   │   ├── Projects.jsx    # Showcase grid portfolio
│   │   └── Contact.jsx     # Consultations book form & inputs validation
│   ├── App.jsx             # React app routes tree
│   └── main.jsx            # Vite index bundle entrypoint
├── index.html              # Main HTML frame
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite dev server & ports setup
└── package.json            # Node project dependency configurations
```

---

## 🚀 Local Development

Follow these steps to set up the repository and launch the local server:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   The local environment will be open at: **http://localhost:3000/**

3. **Build the production package**:
   ```bash
   npm run build
   ```
   This will bundle and optimize the project in the `dist/` directory, copying the `public/` assets as-is for Vercel/CDN serving.

---

## 👥 Core Team

* **Awaneesh Gupta** — *Full Stack Developer*
* **Aareev** — *Full Stack Developer*
* **Shubham Barik** — *Full Stack Developer*
* **Shivansh** — *Marketing Lead*

---

## 📄 License & Ownership

Copyright © 2026 Tatva Labs. All rights reserved. Created and maintained by the **Tatva Labs** engineering team.
