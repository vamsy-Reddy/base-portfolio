/**
 * English message catalog — the single source of truth for all UI copy
 * (labels, headings, buttons, a11y strings). Portfolio *data* (projects,
 * timeline, skills) lives in `src/content/content.ts`; this file is the
 * presentational *copy*.
 *
 * Conventions:
 *  - `{token}` is interpolated at render via `t()` (see `./index.ts`).
 *  - `[[text]]` marks a gradient-highlighted span (see <Highlight/>).
 *
 * To add a locale: copy this file to e.g. `fr.ts`, translate the values,
 * and switch the active export in `./index.ts`. No component changes needed.
 */
export const en = {
  nav: {
    links: [
      { href: "#about", label: "About" },
      { href: "#journey", label: "Journey" },
      { href: "#projects", label: "Work" },
      { href: "#skills", label: "Skills" },
      { href: "#contact", label: "Contact" },
    ],
    resume: "Resume",
    toggleMenu: "Toggle Menu",
    primary: "Primary",
  },

  hero: {
    name: "Atchi Vamsi [[Krishna Reddy]]",
    stack: "{role} · {years} Years · React · JavaScript",
    ctaWork: "View My Work",
    ctaResume: "Download Resume",
    scroll: "Scroll",
    ariaIntro: "Introduction",
  },

  about: {
    eyebrow: "How I Learn",
    title:
      "I Came To The Browser From [[Mechanical Engineering]], And I Brought The Engineering Mindset With Me.",
    intro:
      "Two engineering degrees before my first component. That path shapes how I work: model the system, respect the constraints, measure before optimizing. Here's how I actually learn.",
    stats: {
      years: "Years Shipping",
      projects: "Projects Built",
      tech: "Technologies",
      degrees: "Engineering Degrees",
    },
  },

  journey: {
    eyebrow: "The Path",
    title: "From Machines To Interfaces",
    intro:
      "Four years of shipping frontend at Imaginnovate, and the pivot that got me here.",
    kinds: { work: "Role", edu: "Education", milestone: "Milestone" },
  },

  projects: {
    eyebrow: "Selected Work",
    title: "Things I've Built",
    intro:
      "A mix of production logistics UI and self-directed builds. Open any card for the problem, the approach, and what shipped.",
    featured: "Featured",
    openCaseStudy: "Open case study: {title}",
    fields: {
      problem: "Problem",
      approach: "Approach",
      impact: "Impact",
      stack: "Stack",
    },
    live: "Live",
    code: "Code",
    close: "Close",
    closeOverlay: "Close case study",
  },

  skills: {
    eyebrow: "Toolkit",
    title: "What I Build With",
    intro:
      "Deep in the React ecosystem, with a testing and performance habit, plus the areas I'm actively growing into.",
  },

  contact: {
    eyebrow: "Get In Touch",
    title: "Let's Build Something [[Fast And Thoughtful]].",
    intro:
      "I'm always up for interesting frontend work and collaborations. The quickest way to reach me is email, and I reply promptly.",
    ctaResume: "Download Resume",
  },

  footer: {
    tagline: "Built With Next.js · React Three Fiber · Framer Motion",
    rights: "© {year} {name}",
  },

  a11y: {
    skip: "Skip To Content",
  },
} as const;

export type Messages = typeof en;
