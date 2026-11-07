"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { content } from "@/content/content";
import { messages } from "@/i18n";
import type { TimelineKind } from "@/content/types";

const KIND_DOT: Record<TimelineKind, string> = {
  work: "var(--accent)",
  edu: "var(--accent-2)",
  milestone: "var(--accent-3)",
};

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  // Progress of the scroll through the timeline, mapped to the fill line.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <Section
      id="journey"
      eyebrow={messages.journey.eyebrow}
      title={messages.journey.title}
      intro={messages.journey.intro}
    >
      <ol
        ref={listRef}
        className="relative ml-3 border-l border-border pl-8 sm:ml-4"
      >
        {/* Signature: scroll-driven progress line that fills the track */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -left-px top-0 w-px origin-top"
          style={{
            height: "100%",
            scaleY: fill,
            background:
              "linear-gradient(var(--accent), var(--accent-2), var(--accent-3))",
            boxShadow: "0 0 10px var(--glow)",
          }}
        />

        {content.timeline.map((item, i) => {
          const dot = KIND_DOT[item.kind];
          const kindLabel = messages.journey.kinds[item.kind];
          return (
            <Reveal as="li" key={`${item.title}-${i}`} delay={i * 0.04}>
              <div className="group relative pb-12 transition-transform duration-300 last:pb-0 hover:translate-x-1">
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg transition-transform duration-300 group-hover:scale-125"
                  style={{
                    background: dot,
                    boxShadow: `0 0 0 4px color-mix(in oklab, ${dot} 18%, transparent), 0 0 14px color-mix(in oklab, ${dot} 60%, transparent)`,
                  }}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-text-faint">
                    {item.date}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      background: `color-mix(in oklab, ${dot} 14%, transparent)`,
                      color: dot,
                    }}
                  >
                    {kindLabel}
                  </span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
                  {item.title}
                  {item.org && (
                    <span className="text-text-muted"> · {item.org}</span>
                  )}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-text-muted">
                  {item.summary}
                </p>
                {item.highlights && (
                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-sm text-text-muted"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: dot }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
