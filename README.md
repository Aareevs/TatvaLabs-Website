# Tatva Labs — Official Website

A premium, modern marketing website for **Tatva Labs**, a technology-driven software development firm specializing in full stack development, startup MVPs, and AI integration. 

This is a fast, responsive, vanilla web application built without heavy frameworks or build steps, utilizing clean HTML5, CSS3, and modern Javascript.

---

## ⚡ Key Features

* **Premium Theme & Aesthetics**: Built with a sleek, dark-mode-first aesthetic incorporating glassmorphic navigation, harmonic accent colors, and custom gradient highlights.
* **Responsive Layout**: Native responsiveness with custom breakpoints for desktop, tablet, and mobile (collapsible slide-in menu).
* **Interactive Projects Showcase**: A curated gallery of projects (including Campus Critique, Motif, Vaani Setu, AlgoClash, Syntrox, and ATFRO) featuring high-contrast glassmorphic overlay links and custom-styled logos.
* **Performance-First Design**: Extremely fast loading speeds using only native SVGs, optimized image assets, and minimal scripts.
* **Micro-Animations**: Underpinned by native CSS transitions, intersection observer scroll reveals, and a dynamic statistical counter trigger.
* **Contact Form Validation**: Full client-side feedback validation on all input fields with clean visual success and error states.

---

## 🛠️ Technology Stack

* **Structure**: HTML5 (Semantic Structure)
* **Styling**: Vanilla CSS3 (Custom properties, CSS Grid, Flexbox, Custom Keyframe animations)
* **Logic**: Modern Vanilla JavaScript (ES6+ for Navbar states, scroll animations, statistics counter, and form validation)

---

## 📁 Directory Structure

```text
Tatva Labs/
├── index.html          # Homepage (Hero, Stats, Services, Projects, Team, CTA)
├── about.html          # About Us (Story, Mission, Team Profiles)
├── services.html       # Services Page (Full capabilities details & process timeline)
├── projects.html       # Projects Portfolio (Complete projects grid with overlays)
├── contact.html        # Contact Page (Office info, consulting book, interactive form)
├── assets/
│   └── images/         # Project logos & image assets
├── css/
│   ├── base.css        # Reset, global variables, design system tokens, typography
│   ├── components.css  # Shared elements (Buttons, Navbar, Footer, Tech Tags)
│   ├── home.css        # Homepage-specific styling
│   ├── about.css       # Team grids and about timelines
│   ├── services.css    # Services detail cards and timeline styles
│   ├── projects.css    # Portfolio cards, hover states, NDC NDAs
│   └── contact.css     # Contact layout and form validation cues
└── js/
    ├── main.js         # Navbar scroll logic and scroll reveal observer setup
    ├── counter.js      # Dynamic stats counting logic on visibility
    └── form.js         # Client-side form validation logic
```

---

## 🚀 Local Development

To run the project locally, you can use any static file server. For example:

### Using Node.js (npx)
```bash
npx serve .
# Or specifying a port:
npx serve . -p 3000
```

### Using Python
```bash
# Python 3
python3 -m http.server 8000
```

### Live Server (VS Code Extension)
1. Install **Live Server** by Ritwick Dey.
2. Click **Go Live** at the bottom-right corner of VS Code.

---

## 👥 Core Team

* **Awaneesh Gupta** — *Full Stack Developer*
* **Aareev** — *Full Stack Developer*
* **Shubham Barik** — *Full Stack Developer*
* **Shivansh** — *Marketing Lead*

---

## 📄 License & Ownership
Copyright © 2025 Tatva Labs. All rights reserved. Created and maintained by the **Tatva Labs** engineering team.
