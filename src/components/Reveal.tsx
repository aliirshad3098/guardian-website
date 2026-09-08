import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export type RevealVariant = "fade" | "scale" | "blur" | "left" | "right";

/**
 * Hidden/visible class pairs per variant. Every variant only ever touches
 * opacity/transform/filter — same GPU-safe rule as the original fade — so
 * this stays consistent with useReveal's reduced-motion handling (that
 * hook still just flips a boolean; the variant only decides what CSS
 * responds to it).
 */
const VARIANTS: Record<RevealVariant, { hidden: string; visible: string; transition: string }> = {
  fade: {
    hidden: "opacity-0 translate-y-6",
    visible: "opacity-100 translate-y-0",
    transition: "transition-[opacity,transform] duration-700 ease-out",
  },
  scale: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
    transition: "transition-[opacity,transform] duration-700 ease-out",
  },
  blur: {
    hidden: "opacity-0 blur-md translate-y-3",
    visible: "opacity-100 blur-none translate-y-0",
    transition: "transition-[opacity,transform,filter] duration-700 ease-out",
  },
  left: {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
    transition: "transition-[opacity,transform] duration-700 ease-out",
  },
  right: {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
    transition: "transition-[opacity,transform] duration-700 ease-out",
  },
};

/**
 * Reveal — wraps content that should animate into view on scroll.
 * Usage: <Reveal><section>...</section></Reveal>
 * For a staggered group (e.g. a grid of cards), pass `delayMs` per item —
 * see index.tsx's `stages.map` for the pattern.
 *
 * `variant` picks the entrance style — defaults to "fade" (the original
 * fade+lift) so existing call sites are unaffected. Use "scale" for cards/
 * tiles, "blur" for hero-adjacent or emphasis moments, "left"/"right" for
 * content that should feel like it's sliding in from a direction (e.g.
 * alternating image/text rows).
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  style,
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  style?: CSSProperties;
  variant?: RevealVariant;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const v = VARIANTS[variant];

  return (
    <div
      ref={ref}
      className={`${v.transition} ${visible ? v.visible : v.hidden} ${className}`}
      style={{ ...style, transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}