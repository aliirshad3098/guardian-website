import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved =
      typeof localStorage !== "undefined" ? localStorage.getItem("guardian-theme") : null;
    const isDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("guardian-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      aria-pressed={dark}
      className="relative h-8 w-14 shrink-0 rounded-full border border-line-strong bg-panel-2 transition-colors"
    >
      <span
        className={`absolute top-1 grid size-6 place-items-center rounded-full bg-panel text-ink shadow transition-all duration-300 ${
          dark ? "left-[30px]" : "left-1"
        }`}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
            <path d="M20.5 14.5a8.5 8.5 0 1 1-9-11.9 7 7 0 0 0 9 11.9z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="size-3.5"
          >
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
          </svg>
        )}
      </span>
    </button>
  );
}
