import { content } from "@/content/content";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in the environment
 * (e.g. the Vercel production URL) — falls back to localhost in dev.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const displayName = content.profile.name;

export const site = {
  url: SITE_URL,
  name: `${displayName} · ${content.profile.role}`,
  shortName: displayName,
  title: `${displayName} · ${content.profile.role}`,
  description:
    "Frontend engineer with 4 years building fast, resilient React/TypeScript interfaces for high-traffic logistics platforms. Explore the work, the journey, and how I learn.",
  locale: "en_US",
} as const;
