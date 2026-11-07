import { en, type Messages } from "./en";

/**
 * Active locale messages. Swap this (or branch on a locale) to add languages.
 * Imported throughout the app as `messages` / `t`.
 */
export const messages: Messages = en;
export type { Messages };

/**
 * Interpolate `{token}` placeholders in a catalog string.
 * @example t(messages.footer.rights, { year: 2026, name: "Ada" })
 */
export function t(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
