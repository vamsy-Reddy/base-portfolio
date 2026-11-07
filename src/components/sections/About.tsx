"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Highlight from "@/components/ui/Highlight";
import AnimatedText from "@/components/ui/AnimatedText";
import Counter from "@/components/ui/Counter";
import { content } from "@/content/content";
import { messages } from "@/i18n";

const ACCENTS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--accent)"];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-14%", "16%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  const techCount = content.skills.reduce((n, g) => n + g.items.length, 0);
  const stats = [
    { to: content.profile.yearsExperience, label: messages.about.stats.years },
    { to: content.projects.length, label: messages.about.stats.projects },
    { to: techCount, label: messages.about.stats.tech },
    { to: content.education.length, label: messages.about.stats.degrees },
  ];

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Parallax decorative accents */}
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, var(--accent-2), transparent 70%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: blobY2 }}
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full opacity-[0.12] blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />
      </motion.div>

      <Section
        id="about"
        eyebrow={messages.about.eyebrow}
        title={<Highlight text={messages.about.title} />}
      >
        {/* Signature: word-by-word intro reveal */}
        <AnimatedText
          text={messages.about.intro}
          as="p"
          className="max-w-3xl text-balance text-xl leading-relaxed text-text-muted sm:text-2xl"
        />

        {/* Animated real stats (derived from content, not fabricated) */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full bg-surface p-6 sm:p-7">
                <div
                  className="text-4xl font-semibold tracking-tight sm:text-5xl"
                  style={{ color: ACCENTS[i % ACCENTS.length] }}
                >
                  <Counter to={s.to} />
                </div>
                <p className="mt-2 text-sm text-text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Learning notes */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {content.learning.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="font-mono text-sm"
                    style={{ color: ACCENTS[i % ACCENTS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border transition-colors group-hover:bg-border-strong" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {note.title}
                </h3>
                <p className="mt-3 leading-relaxed text-text-muted">
                  {note.body}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
