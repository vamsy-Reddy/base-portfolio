"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { content } from "@/content/content";
import { messages } from "@/i18n";

const LINKS = messages.nav.links;
const SECTION_IDS = LINKS.map((l) => l.href.replace("#", ""));

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section currently crossing the upper third of the viewport.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : ""
      }`}
    >
      <nav
        className="container-px flex h-16 items-center justify-between"
        aria-label={messages.nav.primary}
      >
        <a
          href="#top"
          aria-label={`${content.profile.name}, home`}
          className="inline-flex items-center"
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 32 32"
            aria-hidden
            className="transition-transform duration-300 hover:scale-110"
          >
            <defs>
              <linearGradient
                id="navMonogram"
                x1="5"
                y1="5"
                x2="27"
                y2="27"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#6ee7ff" />
                <stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="#0d0f16" />
            <rect
              x="0.75"
              y="0.75"
              width="30.5"
              height="30.5"
              rx="7.25"
              fill="none"
              stroke="#2b3142"
              strokeWidth="1.5"
            />
            <g
              fill="none"
              stroke="url(#navMonogram)"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.4 24 L16 7.8 L22.6 24" />
              <path d="M12 18.1 H20" />
            </g>
          </svg>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href.replace("#", "");
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-block px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-text"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                      style={{ boxShadow: "0 0 8px var(--glow)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={content.profile.resume}
            download
            className="hidden rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            {messages.nav.resume}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={messages.nav.toggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-text transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-text transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-text transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
        }}
      />

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="glass border-b border-border md:hidden">
          <ul className="container-px flex flex-col py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
