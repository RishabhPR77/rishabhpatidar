# Rishabh Patidar — Portfolio

My personal site: a minimal, single-page portfolio covering my experience, projects, skills and achievements.

**Live:** [rishabh.isonewho.codes](https://rishabh.isonewho.codes)

I'm a final-year B.Tech IT student at MITS Gwalior and an ISE Intern at MSG91. I build backend services, integrations and AI systems.

## Features

- Two-column layout on desktop: a pinned intro with a section index that highlights as you scroll. On phones it becomes a single column.
- A light, minimal look: white cards that lift on hover with a soft spotlight following the cursor, and a faint glow that tracks the mouse on desktop.
- Small motion details: the name animates in letter by letter, the experience timeline draws itself as you scroll, skills and lists stagger in, and the CGPA counts up. All animation turns off when the OS asks for reduced motion.
- GitHub and LinkedIn buttons in each platform's own colors and logo.
- A reading-progress bar and an estimated reading time.
- Copy-to-clipboard email button and a downloadable resume.
- Server-rendered with TanStack Start for fast first paint and proper meta tags.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animations
- [Lucide](https://lucide.dev) icons
- Vite, built with Nitro for Cloudflare Workers

## Running locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:8080.

Other scripts:

| Command           | What it does                       |
| ----------------- | ---------------------------------- |
| `npm run build`   | Production build into `.output/`   |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |
| `npm run format`  | Format the code with Prettier      |

## Editing the content

All text on the site lives in one file: [`src/lib/content.ts`](src/lib/content.ts). To change a job, add a project or update skills, edit that file. The layout picks it up automatically.

| What                    | Where                                            |
| ----------------------- | ------------------------------------------------ |
| Name, tagline, links    | `profile` in `src/lib/content.ts`                |
| About text, quick facts | `about`                                          |
| Jobs                    | `experience`                                     |
| Projects                | `featured` (with screenshot) and `otherProjects` |
| Skills, achievements    | `skills`, `achievements`                         |
| Resume PDF              | `public/Rishabh_Patidar_Resume.pdf`              |
| Project screenshots     | `public/thumbnails/*.webp`                       |

Screenshots are 1600 px wide WebP files. Keep new ones at a similar size so the page stays fast.

## Project structure

```
src/
├── lib/content.ts      # all portfolio copy and data
├── routes/
│   ├── __root.tsx      # HTML shell, fonts, theme script, default meta tags
│   └── index.tsx       # the portfolio page and its sections
├── styles.css          # Tailwind setup and light/dark color tokens
└── components/ui/      # shadcn/ui primitives (scaffolding, mostly unused)
public/                 # resume, favicon, project screenshots
```

## Contact

- Email: [rishabhpatidar400@gmail.com](mailto:rishabhpatidar400@gmail.com)
- LinkedIn: [linkedin.com/in/rishabh-ptdr](https://linkedin.com/in/rishabh-ptdr)
- GitHub: [github.com/RishabhPR77](https://github.com/RishabhPR77)
