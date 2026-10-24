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
  /** Put the picture on the left and the text on the right for this row. */
  imageFirst?: boolean;
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
        const textEl = (
          <div>
            <Icon className="size-6 text-accent" strokeWidth={1.5} aria-hidden />
            <span className="mt-4 block font-mono text-[12px] text-ink-faint">
              {s.n} · {s.tag}
            </span>
            <h3 className="mt-2 text-[24px]">{s.title}</h3>
            <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-muted">{s.body}</p>
          </div>
        );
        return (
          <li
            key={s.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 600ms ease, transform 600ms ease",
              transitionDelay: delay,
            }}
          >
            {s.imageFirst ? (
              <>
                {s.image && (
                  <div className="rounded-2xl border border-line bg-panel px-8 py-10">{s.image}</div>
                )}
                {textEl}
              </>
            ) : (
              <>
                {textEl}
                {s.image && (
                  <div className="rounded-2xl border border-line bg-panel px-8 py-10">{s.image}</div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}