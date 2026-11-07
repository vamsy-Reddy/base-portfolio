"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Section from "@/components/ui/Section";
import TechIcon from "@/components/ui/TechIcon";
import { content } from "@/content/content";
import { messages } from "@/i18n";
import type { SkillGroup } from "@/content/types";

const ACCENTS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"];

const chipList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};
const chip: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 22 },
  },
};

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const accent = ACCENTS[index % ACCENTS.length];

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(16rem 16rem at ${x}% ${y}%, color-mix(in oklab, ${accent} 16%, transparent), transparent 60%)`,
  );

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
    >
      {/* Cursor spotlight */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <h3 className="relative mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
        {group.label}
      </h3>
      <motion.ul
        variants={chipList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative flex flex-wrap gap-2"
      >
        {group.items.map((item) => (
          <motion.li
            key={item}
            variants={chip}
            whileHover={reduce ? undefined : { y: -2, scale: 1.08 }}
            className="inline-flex cursor-default items-center gap-2 rounded-lg border border-border bg-bg-elevated px-3 py-1.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            <TechIcon label={item} className="text-[1.05em] opacity-70" />
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow={messages.skills.eyebrow}
      title={messages.skills.title}
      intro={messages.skills.intro}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.skills.map((group, i) => (
          <SkillCard key={group.label} group={group} index={i} />
        ))}
      </div>
    </Section>
  );
}
