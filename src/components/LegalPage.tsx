import type { ReactNode } from "react";

/**
 * Shared layout for policy pages. Deliberately free of scroll-reveal effects so
 * the text is readable even before (or without) JavaScript.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main>
      <div className="mx-auto max-w-[760px] px-5 py-16 md:px-8 md:py-24">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-4 text-[clamp(34px,4.6vw,48px)] leading-[1.08] tracking-[-0.03em]">{title}</h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: {updated}</p>

        <div className="mt-12 space-y-10 text-[16px] leading-relaxed text-ink [&_h2]:mb-3 [&_h2]:text-[22px] [&_h2]:tracking-[-0.02em] [&_p]:text-ink-muted [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-ink-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </div>
    </main>
  );
}