import { content } from "@/content/content";
import { messages, t } from "@/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10">
      <div className="container-px flex flex-col items-center justify-between gap-4 text-sm text-text-faint sm:flex-row">
        <p>{t(messages.footer.rights, { year, name: content.profile.name })}</p>
        <p className="font-mono text-xs">{messages.footer.tagline}</p>
        <div className="flex gap-4">
          {content.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
