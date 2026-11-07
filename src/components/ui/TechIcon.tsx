import { createElement } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiCssmodules,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiAntdesign,
  SiSass,
  SiTestinglibrary,
  SiJest,
  SiGit,
  SiGithub,
  SiDocker,
  SiVite,
  SiNextdotjs,
  SiGraphql,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiThreedotjs,
  SiFramer,
} from "react-icons/si";

/**
 * Maps the technology labels used across the content (and their common
 * aliases) to official brand marks (Simple Icons, via react-icons). Keyed by
 * the lowercased label. Anything without a brand mark (concepts like
 * "Responsive Design", or tools with no icon like Playwright) resolves to null
 * and simply renders as text wherever it's used.
 */
const ICONS: Record<string, IconType> = {
  react: SiReact,
  "react.js": SiReact,
  javascript: SiJavascript,
  "javascript (es6+)": SiJavascript,
  typescript: SiTypescript,
  html5: SiHtml5,
  css3: SiCss,
  "css modules": SiCssmodules,
  "redux toolkit": SiRedux,
  redux: SiRedux,
  "tailwind css": SiTailwindcss,
  "material ui": SiMui,
  "ant design": SiAntdesign,
  sass: SiSass,
  "react testing library": SiTestinglibrary,
  rtl: SiTestinglibrary,
  jest: SiJest,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  "docker compose": SiDocker,
  vite: SiVite,
  "next.js": SiNextdotjs,
  "next.js (ssr/ssg)": SiNextdotjs,
  graphql: SiGraphql,
  "node.js": SiNodedotjs,
  "node.js / express": SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  "three.js": SiThreedotjs,
  "react three fiber": SiThreedotjs,
  "framer motion": SiFramer,
};

export function getTechIcon(label: string): IconType | null {
  return ICONS[label.trim().toLowerCase()] ?? null;
}

export default function TechIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const icon = getTechIcon(label);
  if (!icon) return null;
  // createElement (not <Icon/>) so the linter doesn't treat a looked-up,
  // already-static component as one created during render.
  return createElement(icon, { "aria-hidden": true, className });
}
