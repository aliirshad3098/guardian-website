import { useEffect, useState } from "react";

/**
 * ScrollProgress — thin bar pinned under the nav showing how far down the
 * current page the reader is. Driven directly by scroll position (not an
 * auto-playing animation), so it stays useful and un-intrusive even under
 * prefers-reduced-motion — there's no motion to reduce, just a width that
 * tracks the scrollbar.
 *
 * Resets to 0 on route change (see `key={pathname}` at the call site in
 * __root.tsx) so it always reflects the page currently on screen.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, doc.scrollTop / scrollable)));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2.5px]">
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, var(--violet), var(--cyan))",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}