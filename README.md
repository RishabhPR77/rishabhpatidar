# 🚀 Rishabh Patidar — Developer Portfolio

> Personal portfolio built with **React + Vite** — dark cosmos aesthetic, terminal-inspired design, fully responsive.

**Live Demo →** `[your-deployed-url-here]`

---

## ✨ Features

- **Typewriter hero** cycling through roles (Data Scientist, ML Engineer, Research Assistant...)
- **Animated scanline + grid background** for a data-terminal feel
- **Accordion project cards** with metrics grids and detailed bullet breakdowns
- **Color-coded skill pills** across 5 tech categories
- **Sticky navbar** that transforms on scroll with blur backdrop
- Fully responsive · Zero UI library dependencies · Pure CSS animations

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Styling | Plain CSS with custom properties (no Tailwind/UI libs) |
| Fonts | Syne (display) · JetBrains Mono (code) · Instrument Sans (body) |
| Animations | CSS keyframes only |
| Deployment | Vercel / Netlify (recommended) |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky nav with scroll-aware backdrop
│   │   ├── Hero.jsx          # Typewriter, stats, CTAs, grid background
│   │   ├── Skills.jsx        # Categorized skill pills + SectionHeader util
│   │   ├── Experience.jsx    # Research role + education card
│   │   ├── Projects.jsx      # Accordion cards with metrics
│   │   └── Achievements.jsx  # Hackathon cards + Contact section
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Design tokens (CSS variables)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Run locally

```bash
# 1. Clone the repo
git clone https://github.com/rishabhpatidar/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## ☁️ Deploy in 60 seconds

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite.

### Netlify

```bash
npm run build
# drag and drop the /dist folder at app.netlify.com/drop
```

---

## 🎨 Customization

All design tokens live in `src/index.css` under `:root`:

```css
:root {
  --cyan: #00d4ff;      /* primary accent */
  --amber: #ff8c42;     /* secondary accent */
  --bg: #04040a;        /* page background */
  --font-display: 'Syne', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

To update content, edit the data arrays at the top of each component — no config file needed.

---

## 📬 Contact

**Rishabh Patidar**

- 📧 [rishabhpatidar400@gmail.com](mailto:rishabhpatidar400@gmail.com)
- 💼 [linkedin.com/in/rishabh-ptdr](https://linkedin.com/in/rishabh-ptdr)
- 🐙 [github.com/rishabhpatidar](https://github.com/rishabhpatidar)
- 📞 +91 9098729516

---

<div align="center">
  <sub>Built with React + Vite · © 2026 Rishabh Patidar</sub>
</div>