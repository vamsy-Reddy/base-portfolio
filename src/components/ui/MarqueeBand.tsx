"use client";

import { motion, useReducedMotion } from "framer-motion";
import TechIcon from "./TechIcon";

/**
 * Infinite typographic marquee of the tech stack, each term shown with its
 * official brand logo. Decorative (aria-hidden); content is duplicated so the
 * loop is seamless. Static (no animation) under reduced motion.
 */
export default function MarqueeBand({
  items,
  duration = 32,
}: {
  items: string[];
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border bg-bg-elevated/40 py-5 select-none"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent sm:w-32" />

      {reduce ? (
        <div className="container-px flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-medium tracking-tight text-text-muted">
          {items.map((it) => (
            <span key={it} className="inline-flex items-center gap-2">
              <TechIcon label={it} className="text-[0.9em] opacity-70" />
              {it}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex items-center whitespace-nowrap text-2xl font-medium tracking-tight text-text-muted sm:text-3xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        >
          {row.map((it, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="inline-flex items-center gap-3 px-7 sm:px-9">
                <TechIcon label={it} className="text-[0.82em] opacity-70" />
                <span>{it}</span>
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
              />
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
