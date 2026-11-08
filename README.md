# Atchi Vamsi Krishna Reddy — Developer Portfolio

An interactive, award‑style developer portfolio. A generative **WebGL light‑strand**
hero, a cohesive site‑wide motion system, and a **data‑driven content model** so the
whole site regenerates from a single typed file.

> Built with **Next.js (App Router)**, **React Three Fiber + custom GLSL**, **Framer Motion**, **Lenis**, and **Tailwind CSS v4**.

**Live:** https://portfolio-three-phi-ave3oib35p.vercel.app

---

## Highlights

- **Generative 3D hero** — thousands of fine luminous strands flow through a curl‑noise
  field (GPU‑rendered as one `LineSegments` draw), with localized cursor deformation,
  depth layers, and `prefers-reduced-motion` / no‑WebGL fallbacks.
- **Site‑wide motion system** — scroll reveals, an animated nav with a scroll‑progress
  bar and active‑section indicator, magnetic buttons, a custom cursor, an intro curtain,
  an infinite tech marquee with brand logos, and a subtle film‑grain overlay.
- **Signature interaction per section** — animated stat counters and word‑by‑word reveals
  (About), a scroll‑driven progress‑line timeline (Journey), 3D tilt cards + case‑study
  modals (Projects), cursor‑spotlight cards (Skills), a magnetic CTA (Contact).
- **Data‑driven & flexible** — every section renders from `src/content/content.ts`.
  Adding a project is a one‑object edit.
- **Centralized copy** — all UI strings live in a typed i18n catalog (`src/i18n/en.ts`).
- **Production‑ready** — SEO (metadata, OG image, sitemap, robots, JSON‑LD), accessibility,
  device‑scaled rendering, and unit + e2e tests.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| 3D / shaders | three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, custom GLSL |
| Animation | Framer Motion · Lenis (smooth scroll) |
| Styling | Tailwind CSS v4 (CSS‑first) · dark‑first design tokens |
| Icons | react-icons (Simple Icons) |
| Testing | Vitest + React Testing Library (unit) · Playwright (e2e) |
| Tooling | ESLint · Prettier · TypeScript strict |

## Getting started

Requires **Node.js ≥ 20** (developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

```bash
npm run dev         # start the dev server
npm run build       # production build
npm run start       # serve the production build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run format      # Prettier
npm run test        # Vitest (unit)
npm run test:e2e    # Playwright (e2e)
```

## Project structure

```
src/
  app/            # App Router: layout, page, SEO (sitemap, robots, opengraph-image), globals.css
  components/
    hero/         # LightField (WebGL strands), HeroCanvas, shaders/, HeroFallback
    sections/     # About, Journey, Projects, Skills, Contact
    projects/     # ProjectCard (3D tilt), ProjectCaseStudy (modal)
    ui/           # Nav, Footer, Section, Reveal, AnimatedText, Counter, Magnetic,
                  # MarqueeBand, CustomCursor, Intro, TechIcon, Highlight
  content/        # content.ts (single source of truth) + types.ts
  i18n/           # en.ts (UI copy catalog) + index.ts (t() helper)
  lib/            # SmoothScroll, useDeviceProfile, site
public/           # resume PDF, icons
tests/e2e/        # Playwright smoke tests
```

## Editing content (the flexible part)

All content is typed and lives in **`src/content/content.ts`**. The UI maps over it, so
changes appear everywhere automatically.

**Add a project** — append one object to `projects`:

```ts
{
  slug: "my-project",
  title: "My Project",
  tagline: "One‑line hook shown on the card.",
  role: "Frontend",
  featured: false,            // true gives a larger, distinct layout
  problem: "…",
  approach: "…",
  impact: "…",
  tech: ["React", "TypeScript"],
  links: { live: "https://…", repo: "https://…" },
  accent: "#6ee7ff",
}
```

It becomes a 3D card with a case‑study modal, no component edits required. Timeline roles
(`timeline`), skill groups (`skills`), and learning notes (`learning`) work the same way.
Wording for labels/headings lives in **`src/i18n/en.ts`**.

## Accessibility & performance

- Respects `prefers-reduced-motion` globally (static hero fallback, motion disabled).
- Fully usable without WebGL (progressive enhancement).
- 3D rendering is device‑scaled (DPR + strand budget) and **pauses when off‑screen or the
  tab is hidden**.
- Semantic landmarks, keyboard navigation, visible focus, and a skip link.

## Deployment

Deploys to **Vercel** with zero configuration (Next.js is auto‑detected). Import the
repository at [vercel.com/new](https://vercel.com/new) for automatic deploys on every push.

Optional environment variable for correct canonical/OG URLs:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
