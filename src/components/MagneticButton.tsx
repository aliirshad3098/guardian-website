import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * MagneticButton — wraps a button/link so it subtly follows the cursor
 * within a bounded range while hovered, and snaps back on leave. A classic
 * 2026 CTA pattern (see design-trends research: "looks impressive,
 * strengthens CTAs"). Kept intentionally subtle (max ~10px pull, damped)
 * — this is meant to feel alive, not gimmicky.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  maxOffset = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLSpanElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (e.pointerType !== "mouse") return; // no magnetic pull on touch
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const mx = Math.max(-maxOffset, Math.min(maxOffset, relX * strength));
    const my = Math.max(-maxOffset, Math.min(maxOffset, relY * strength));
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }

  return (
    <span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`magnetic inline-flex ${className}`}
    >
      {children}
    </span>
  );
}