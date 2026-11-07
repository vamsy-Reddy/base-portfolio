# Atchi Sai Krishna — Developer Portfolio

An interactive, 3D developer portfolio. A cursor-reactive GPU particle hero
(React Three Fiber + custom GLSL) sets the tone; the content tells the story of
what and how I learn, with every project opening into a real case study.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
React Three Fiber + drei + postprocessing · Framer Motion · Lenis.

---

## The one thing to know: content is data-driven

**Everything on the site is generated from a single typed file:**
[`src/content/content.ts`](src/content/content.ts) (shape in
[`src/content/types.ts`](src/content/types.ts)).

### Add a new project

Append one object to the `projects` array — it automatically becomes a 3D tilt
card, a grid entry, and a case-study modal. No component changes:

```ts
{
  slug: "my-new-project",
  title: "My New Project",
  tagline: "One-line hook shown on the card.",
  role: "Frontend",
  period: "2026",
  featured: false,            // true → large, full-width hero card
  problem: "What needed solving.",
  approach: "What I did.",
  impact: "What shipped / the result.",
  tech: ["React", "TypeScript"],
  links: { live: "https://…", repo: "https://…" }, // optional
  accent: "#6ee7ff",          // optional card glow color
}
```

Add a job or milestone the same way via the `timeline` array; add skills via
`skills`; edit the hero/contact copy via `profile`. Update the résumé by
replacing the PDF in [`public/`](public/) and pointing `profile.resume` at it.

---

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script             | What it does                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Dev server (Turbopack)                    |
| `npm run build`    | Production build                          |
| `npm start`        | Serve the production build                |
| `npm run typecheck`| `tsc --noEmit`                            |
| `npm run lint`     | ESLint                                    |
| `npm run format`   | Prettier write                            |
| `npm run test`     | Unit tests (Vitest + RTL)                 |
| `npm run test:e2e` | End-to-end smoke tests (Playwright)       |

First e2e run only: `npx playwright install chromium`.

## Environment

Set the canonical site URL so SEO/OG tags and sitemap use absolute URLs:

```bash
# .env.local  (and in Vercel project settings)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Falls back to `http://localhost:3000` in development.

## Accessibility & performance

- Fully usable without WebGL — a static backdrop replaces the 3D scene, and all
  content is progressively enhanced.
- Respects `prefers-reduced-motion` (no smooth scroll, no looping animation).
- The Canvas is lazy-loaded (`ssr: false`), caps DPR and particle count per
  device, and pauses rendering when off-screen or the tab is hidden.

## SEO

Per-page metadata, Open Graph + Twitter cards, a generated OG image
([`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx)), `sitemap.xml`,
`robots.txt`, and JSON-LD `Person` structured data.

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel, set `NEXT_PUBLIC_SITE_URL`, deploy.
No other configuration required.
