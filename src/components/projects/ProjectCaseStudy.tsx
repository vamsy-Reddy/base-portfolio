"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/content/types";
import { messages } from "@/i18n";
import TechIcon from "@/components/ui/TechIcon";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {label}
      </h4>
      <p className="leading-relaxed text-text-muted">{children}</p>
    </div>
  );
}

/**
 * Accessible modal case study. Closes on Escape / backdrop click, locks body
 * scroll, moves focus to the dialog on open and restores it on close.
 */
export default function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const accent = project.accent ?? "#6ee7ff";

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={messages.projects.closeOverlay}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        tabIndex={-1}
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-bg-elevated p-7 outline-none sm:rounded-3xl sm:p-9"
        style={{ boxShadow: `0 -1px 60px -20px ${accent}55` }}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-text-faint">
              {project.role}
              {project.period ? ` · ${project.period}` : ""}
            </p>
            <h3
              id="case-title"
              className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-text-muted">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-7 space-y-6">
          <Field label="Problem">{project.problem}</Field>
          <Field label="Approach">{project.approach}</Field>
          <Field label="Impact">{project.impact}</Field>
        </div>

        <div className="mt-7">
          <h4 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted"
              >
                <TechIcon label={t} className="text-[1.1em]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {(project.links?.live || project.links?.repo) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[color:var(--accent-contrast)]"
              >
                Live ↗
              </a>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
              >
                Code ↗
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
