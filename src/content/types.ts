/**
 * Content model for the portfolio.
 *
 * Everything the site renders is derived from `content` (see `content.ts`).
 * To add a future project, append one `Project` object — it will automatically
 * appear as a 3D card, in the projects grid, and (optionally) in the timeline.
 * No component edits required. This file is the single source of truth for shape.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Short handle shown in the UI, e.g. "@vamsy-Reddy". */
  handle?: string;
}

export interface Profile {
  name: string;
  /** Short role shown in the hero, e.g. "Frontend Engineer". */
  role: string;
  /** One-line value proposition under the name. */
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  /** Years of professional experience, used in copy. */
  yearsExperience: number;
  /** Path (in /public) to the downloadable résumé. */
  resume: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export type TimelineKind = "work" | "edu" | "milestone";

export interface TimelineItem {
  /** Human-readable date range, e.g. "Oct 2022 to Apr 2025". */
  date: string;
  title: string;
  org?: string;
  kind: TimelineKind;
  summary: string;
  /** Optional bullet highlights. */
  highlights?: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** One-line hook shown on the card face. */
  tagline: string;
  role: string;
  period?: string;
  /** Larger, front-and-center treatment when true. */
  featured?: boolean;
  /** Case-study fields — the substance technical reviewers read. */
  problem: string;
  approach: string;
  impact: string;
  tech: string[];
  links?: {
    live?: string;
    repo?: string;
  };
  /** Hex accent used for the card's 3D glow/gradient. */
  accent?: string;
}

export interface LearningNote {
  title: string;
  body: string;
}

export interface EducationItem {
  degree: string;
  org: string;
  date: string;
}

export interface Content {
  profile: Profile;
  socials: SocialLink[];
  skills: SkillGroup[];
  timeline: TimelineItem[];
  projects: Project[];
  learning: LearningNote[];
  education: EducationItem[];
}
