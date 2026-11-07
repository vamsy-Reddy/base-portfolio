"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { content } from "@/content/content";

/**
 * Award-style intro curtain: on the first load of a session, a full-screen
 * panel shows the name and a 0 to 100 counter, then wipes upward to reveal the
 * page. Skipped entirely for reduced motion, and shown only once per session
 * (sessionStorage) so it never nags on re-navigation. Decorative (aria-hidden);
 * the real content is in the DOM underneath the whole time.
 */
const SEEN_KEY = "intro-seen";

export default function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }

    // Already shown this session: skip the sequence (next frame, not sync).
    if (seen) {
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1100;
    let rafId = 0;
    let timeoutId = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.round(p * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Flag only on completion, so StrictMode's double-invoked effect in dev
        // doesn't suppress the very first run.
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          // ignore (private mode etc.)
        }
        timeoutId = window.setTimeout(() => setDone(true), 220);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-8 sm:px-10 sm:py-10"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.25em] text-text-faint">
            <span>{content.profile.name}</span>
            <span className="hidden sm:inline">{content.profile.location}</span>
          </div>

          <div className="flex items-end justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-balance text-lg text-text-muted sm:text-xl"
            >
              Frontend engineer, building fast, resilient interfaces.
            </motion.p>
            <span className="font-mono text-6xl font-semibold tabular-nums text-text sm:text-8xl">
              {count}
            </span>
          </div>

          {/* Progress line */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
            style={{ scaleX: count / 100 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
