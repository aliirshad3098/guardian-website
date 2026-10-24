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
 * Left-aligned rows: text on the left, picture on the right.
 * Rows stack (text first, then picture) on small screens.
 */
export function PipelineDiagram({ steps }: { steps: PipelineStep[] }) {
  const { ref, visible } = useReveal<HTMLOListElement>();

  return (
    <ol ref={ref} className="flex flex-col gap-16 text-left md:gap-20">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const delay = `${i * 150}ms`;
        return (
          <li
            key={s.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 700ms ease, transform 700ms ease",
              transitionDelay: delay,
            }}
          >
            <div>
              <div className="grid size-14 place-items-center rounded-2xl border border-line-strong bg-panel">
                <Icon className="size-6 text-accent" strokeWidth={1.75} aria-hidden />
              </div>
              <span className="mt-5 block font-mono text-[12px] text-ink-faint">
                {s.n} · {s.tag}
              </span>
              <h3 className="mt-2 text-[24px]">{s.title}</h3>
              <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-muted">{s.body}</p>
            </div>

            {s.image && (
              <div className="overflow-hidden rounded-2xl border border-line bg-panel-2 px-6 py-8">
                {s.image}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}