import { useEffect, useRef, useState } from "react";

/**
 * useReveal — scroll-triggered reveal via IntersectionObserver.
 *
 * - Only ever toggles a boolean (visible/not) — the caller applies
 *   transform/opacity classes, so the actual animation stays on the
 *   GPU-accelerated properties (per web.dev's animation guidance: only
 *   transform and opacity avoid layout recalculation).
 * - Respects prefers-reduced-motion: if the user has that set, this
 *   returns `visible: true` immediately and never observes anything —
 *   content just renders in its final state, no motion at all.
 * - Unobserves after the first reveal (one-shot) — cheap, and scroll-reveal
 *   effects that replay on scroll-up read as visual noise more often than
 *   as polish.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, visible };
}
