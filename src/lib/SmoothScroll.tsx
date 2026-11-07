"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, useReducedMotion } from "framer-motion";

/**
 * Lenis-powered smooth scrolling. Mounts once at the app root.
 * Disabled entirely when the user prefers reduced motion, so native
 * (instant) scrolling is preserved for accessibility.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
