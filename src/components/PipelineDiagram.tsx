import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export type PipelineStep = {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
  tag: string;
  image?: ReactNode;
};

/**
 * Vertical timeline: icon boxes joined by a line on the left, text on the right.
 * A step with an `image` is shown inside a card with the picture below its text.
 * The connector draws in top-to-bottom when the diagram scrolls into view.
 */
export function PipelineDiagram({ steps }: { steps: PipelineStep[] }) {
  const { ref, visible } = useReveal<HTMLOListElement>();

  return (
    <ol ref={ref} className="mx-auto max-w-[760px]">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const last = i === steps.length - 1;
        const delay = `${i * 450 + 300}ms`;
        return (
          <li key={s.title} className={`relative grid grid-cols-[64px_1fr] gap-6 ${last ? "" : "pb-14"}`}>
            {!last && (
              <span
                aria-hidden
                className="absolute bottom-[-3.5rem] left-[31px] top-16 w-px overflow-hidden bg-line-strong"
              >
                <span
                  className="block h-full origin-top bg-accent transition-transform duration-[1000ms] ease-out"
                  style={{ transform: visible ? "scaleY(1)" : "scaleY(0)", transitionDelay: delay }}
                />
              </span>
            )}

            <div
              className="relative z-10 grid size-16 place-items-center rounded-2xl border border-line-strong bg-panel transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 450}ms`,
              }}
            >
              <Icon className="size-7 text-accent" strokeWidth={1.75} aria-hidden />
            </div>

            <div className={s.image ? "rounded-2xl border border-line bg-panel p-6 md:p-7" : "pt-3"}>
              <span className="font-mono text-[12px] text-ink-faint">
                {s.n} · {s.tag}
              </span>
              <h3 className="mt-2 text-[21px]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
              {s.image && (
                <div className="mt-5 overflow-hidden rounded-xl border border-line bg-panel-2 px-4 py-3">
                  {s.image}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}