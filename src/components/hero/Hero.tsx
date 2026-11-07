"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { content } from "@/content/content";
import { messages, t } from "@/i18n";
import Highlight from "@/components/ui/Highlight";
import Magnetic from "@/components/ui/Magnetic";
import HeroFallback from "./HeroFallback";

// 3D is client-only and lazy — never blocks first paint or SSR.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const { profile } = content;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label={messages.hero.ariaIntro}
    >
      {/* Background: live 3D, or static fallback when reduced motion is set. */}
      <div className="absolute inset-0 -z-10">
        {reduce ? <HeroFallback /> : <HeroCanvas />}
        {/* Legibility veil for the text. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--bg) 35%, transparent) 0%, transparent 30%, color-mix(in oklab, var(--bg) 70%, transparent) 100%)",
          }}
        />
      </div>

      <div className="container-px">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-sm text-text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <Highlight text={messages.hero.name} />
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-xl font-medium text-text-muted sm:text-2xl"
          >
            {t(messages.hero.stack, {
              role: profile.role,
              years: profile.yearsExperience,
            })}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Magnetic strength={0.45}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[color:var(--accent-contrast)] shadow-[0_0_30px_-10px_var(--glow)] transition-shadow hover:shadow-[0_0_40px_-6px_var(--glow)]"
              >
                {messages.hero.ctaWork}
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/50 px-6 py-3 text-sm font-semibold text-text backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                {messages.hero.ctaResume}
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: reduce ? 1 : [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: reduce ? 0 : Infinity }}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-text-faint"
        >
          {messages.hero.scroll}
          <span className="h-10 w-px bg-gradient-to-b from-text-faint to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
