import type { LucideIcon } from "lucide-react";
import { Globe, Brain, ShieldCheck } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export type PipelineStep = { n: string; title: string; body: string; icon: LucideIcon; tag: string };

const icons = { Globe, Brain, ShieldCheck };
export { icons };

/**
 * Three-node flow. Connectors draw in left-to-right (vertical on mobile) when
 * the diagram scrolls into view, and a pulse travels along each one.
 */
export function PipelineDiagram({ steps }: { steps: PipelineStep[] }) {
  const { ref, visible } = useReveal<HTMLOListElement>();

  return (
    <ol ref={ref} className="grid gap-10 md:grid-cols-3 md:gap-0">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const last = i === steps.length - 1;
        const delay = `${i * 450 + 300}ms`;
        return (
          <li key={s.title} className="relative flex flex-col items-center px-2 text-center md:px-8">
            {!last && (
              <>
                {/* desktop: horizontal connector to the next node */}
                <span
                  aria-hidden
                  className="absolute top-8 hidden h-px overflow-hidden bg-line-strong md:block"
                  style={{ left: "calc(50% + 2.75rem)", right: "calc(-50% + 2.75rem)" }}
                >
                  <span
                    className="block h-full origin-left bg-accent transition-transform duration-[1000ms] ease-out"
                    style={{ transform: visible ? "scaleX(1)" : "scaleX(0)", transitionDelay: delay }}
                  />
                </span>
                {/* mobile: vertical connector to the next node */}
                <span
                  aria-hidden
                  className="absolute left-1/2 -bottom-10 top-20 w-px -translate-x-1/2 overflow-hidden bg-line-strong md:hidden"
                >
                  <span
                    className="block h-full origin-top bg-accent transition-transform duration-[1000ms] ease-out"
                    style={{ transform: visible ? "scaleY(1)" : "scaleY(0)", transitionDelay: delay }}
                  />
                </span>
              </>
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

            <span className="mt-5 font-mono text-[12px] text-ink-faint">
              {s.n} · {s.tag}
            </span>
            <h3 className="mt-2 text-[21px]">{s.title}</h3>
            <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink-muted">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
