"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "@/content/types";
import { messages, t } from "@/i18n";
import TechIcon from "@/components/ui/TechIcon";

/**
 * A project card with a cursor-driven 3D tilt, layered depth (preserve-3d) and
 * an accent glow. Featured projects get a distinct two-column layout with a
 * decorative depth panel. Rendered as a button so it's keyboard-accessible.
 */
export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const accent = project.accent ?? "#6ee7ff";
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(18rem 18rem at ${x} ${y}, ${accent}22, transparent 60%)`,
  );

  function handleMove(e: React.PointerEvent) {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const depth = reduce ? {} : { transform: "translateZ(38px)" };
  const featured = project.featured;
  const shownTech = project.tech.slice(0, featured ? 7 : 4);
  const extraTech = project.tech.length - shownTech.length;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(project)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={reduce ? undefined : { y: -4 }}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors hover:border-border-strong ${
        featured ? "md:col-span-2 md:p-0" : "p-6"
      }`}
      aria-label={t(messages.projects.openCaseStudy, { title: project.title })}
    >
      {/* Cursor-follow glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBackground }}
      />
      {/* Top edge accent */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      {featured ? (
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          {/* Left: content */}
          <div className="relative p-6 md:p-9" style={depth}>
            <CardHeader project={project} accent={accent} />
            <h3 className="relative mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="relative mt-2 max-w-md text-text-muted">
              {project.tagline}
            </p>
            <TechRow
              shownTech={shownTech}
              extraTech={extraTech}
              reduce={reduce}
            />
            <OpenHint />
          </div>

          {/* Right: decorative depth panel (no fabricated screenshot) */}
          <div
            aria-hidden
            className="relative hidden min-h-[15rem] overflow-hidden border-l border-border md:block"
            style={{
              background: `radial-gradient(130% 90% at 100% 0%, ${accent}1f, transparent 55%), radial-gradient(120% 90% at 0% 100%, color-mix(in oklab, var(--accent-2) 8%, transparent), transparent 55%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <span
              className="absolute right-6 top-4 font-mono text-[7rem] font-bold leading-none text-text/5"
              style={reduce ? {} : { transform: "translateZ(20px)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border text-xl font-bold"
              style={{
                borderColor: `${accent}55`,
                color: accent,
                background: `${accent}12`,
                ...(reduce ? {} : { transform: "translateZ(55px)" }),
              }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={depth}>
            <CardHeader project={project} accent={accent} />
            <h3 className="relative mt-4 text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="relative mt-2 text-text-muted">{project.tagline}</p>
          </div>
          <div className="mt-auto" style={depth}>
            <TechRow
              shownTech={shownTech}
              extraTech={extraTech}
              reduce={reduce}
            />
          </div>
        </>
      )}
    </motion.button>
  );
}

function CardHeader({ project, accent }: { project: Project; accent: string }) {
  return (
    <div className="relative flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        {project.featured && (
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
            style={{ background: `${accent}1a`, color: accent }}
          >
            {messages.projects.featured}
          </span>
        )}
        <span className="font-mono text-xs text-text-faint">
          {project.role}
          {project.period ? ` · ${project.period}` : ""}
        </span>
      </div>
      <span
        aria-hidden
        className="text-text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text"
      >
        ↗
      </span>
    </div>
  );
}

function TechRow({
  shownTech,
  extraTech,
  reduce,
}: {
  shownTech: string[];
  extraTech: number;
  reduce: boolean | null;
}) {
  return (
    <div className="relative flex flex-wrap gap-2 pt-6">
      {shownTech.map((tech) => (
        <motion.span
          key={tech}
          whileHover={reduce ? undefined : { y: -2, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[11px] text-text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <TechIcon label={tech} className="text-[1.1em]" />
          {tech}
        </motion.span>
      ))}
      {extraTech > 0 && (
        <span className="rounded-md px-2.5 py-1 font-mono text-[11px] text-text-faint">
          +{extraTech}
        </span>
      )}
    </div>
  );
}

function OpenHint() {
  return (
    <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-1">
      Open case study
      <span aria-hidden>→</span>
    </span>
  );
}
