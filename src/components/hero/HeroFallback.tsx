/**
 * Static, dependency-free hero backdrop. Rendered when WebGL is unavailable or
 * the user prefers reduced motion, a still frame in the spirit of the live flow
 * field: near-black space with soft teal/violet wisps and a centered vignette.
 * No motion, no discrete particles, so it stays calm and on-brand.
 */
export default function HeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Soft flowing wisps, layered radial glows in the accent colors. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 42rem at 78% 18%, color-mix(in oklab, var(--accent-2) 24%, transparent), transparent 62%)," +
            "radial-gradient(52rem 40rem at 92% 72%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 60%)," +
            "radial-gradient(40rem 34rem at 62% 48%, color-mix(in oklab, var(--accent-2) 16%, transparent), transparent 58%)",
          filter: "blur(2px)",
        }}
      />
      {/* Centered vignette so the composition stays cinematic. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 85% at 55% 45%, transparent 35%, color-mix(in oklab, var(--bg) 72%, transparent) 100%)",
        }}
      />
      {/* Keep the left (headline) side calm and dark. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--bg) 55%, transparent) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
