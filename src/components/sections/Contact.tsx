import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import Magnetic from "@/components/ui/Magnetic";
import { content } from "@/content/content";
import { messages } from "@/i18n";

export default function Contact() {
  const { profile, socials } = content;
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-24 sm:py-32"
      aria-labelledby="contact-title"
    >
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-14">
            {/* Drifting ambient gradient */}
            <div
              aria-hidden
              className="animate-drift-a absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-2), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="animate-drift-b absolute -bottom-28 -left-16 h-72 w-72 rounded-full opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--accent), transparent 70%)",
              }}
            />

            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {messages.contact.eyebrow}
              </p>
              <h2
                id="contact-title"
                className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
              >
                <AnimatedText as="span" text={messages.contact.title} />
              </h2>
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-text-muted">
                {messages.contact.intro}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.5}>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[color:var(--accent-contrast)] shadow-[0_0_30px_-8px_var(--glow)] transition-shadow hover:shadow-[0_0_40px_-4px_var(--glow)]"
                  >
                    {profile.email}
                  </a>
                </Magnetic>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
                >
                  {messages.contact.ctaResume}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    <span className="text-text-faint">{s.label}</span>
                    <span className="font-mono text-text transition-transform group-hover:translate-x-0.5">
                      {s.handle ?? s.href}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
