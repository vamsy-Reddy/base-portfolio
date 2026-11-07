"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Word-by-word reveal. Each word rises and fades in behind a clip mask, with a
 * stagger, when the text scrolls into view. Honors the same `[[highlight]]`
 * markers as <Highlight/> (those words get the gradient treatment) and the
 * user's reduced-motion setting (renders the text statically). The full text is
 * exposed to screen readers once via aria-label; the animated words are hidden.
 */
const HILITE = /(\[\[.*?\]\])/g;

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface Word {
  w: string;
  hl: boolean;
}

function toWords(text: string): Word[] {
  const parts = text.split(HILITE).filter(Boolean);
  const out: Word[] = [];
  for (const part of parts) {
    const hl = part.startsWith("[[") && part.endsWith("]]");
    const clean = hl ? part.slice(2, -2) : part;
    for (const w of clean.split(/\s+/)) {
      if (w === "") continue;
      out.push({ w, hl });
    }
  }
  return out;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const word: Variants = {
  hidden: { y: "0.85em", opacity: 0 },
  show: {
    y: "0em",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AnimatedText({
  text,
  as = "p",
  className,
  stagger,
  once = true,
}: {
  text: string;
  as?: Tag;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = toWords(text);
  const plain = words.map((w) => w.w).join(" ");

  if (reduce) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={i} className={w.hl ? "text-gradient" : undefined}>
            {w.w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[as] as React.ElementType;
  const vars: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } } }
    : container;

  return (
    <MotionTag
      className={className}
      variants={vars}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      aria-label={plain}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-flex overflow-hidden"
          // Pad/clip so descenders (g, y) aren't cut by the reveal mask.
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            variants={word}
            className={`inline-block ${w.hl ? "text-gradient" : ""}`}
          >
            {w.w}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
}
