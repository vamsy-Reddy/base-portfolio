import { Fragment } from "react";

/**
 * Renders a catalog string, wrapping any `[[marked]]` segment in a styled
 * span (gradient by default). Keeps copy editable in the message catalog
 * while preserving inline emphasis. Pure render — safe in server components.
 */
export default function Highlight({
  text,
  className = "text-gradient",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[[") && part.endsWith("]]") ? (
          <span key={i} className={className}>
            {part.slice(2, -2)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
