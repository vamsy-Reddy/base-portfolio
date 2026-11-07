import Reveal from "./Reveal";

/**
 * Standard section shell: anchor id, generous vertical rhythm, an eyebrow
 * label and a large heading. Keeps every section visually consistent.
 */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-24 sm:py-32 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="container-px">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="h-px w-8 bg-accent/60" />
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
              {intro}
            </p>
          )}
        </Reveal>

        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
