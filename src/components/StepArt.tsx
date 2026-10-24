/**
 * Flat, restrained diagrams for the How-it-works steps.
 * Hairline strokes, one accent colour, no glow and no animation.
 */

export function NetworkArt() {
    return (
      <svg viewBox="0 0 400 200" className="h-auto w-full text-ink-muted" aria-hidden fill="none">
        {/* device */}
        <rect x="40" y="62" width="60" height="96" rx="10" stroke="currentColor" strokeWidth="1.25" />
        <line x1="62" y1="74" x2="78" y2="74" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        {/* path */}
        <line x1="100" y1="110" x2="300" y2="110" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.25" />
        {/* filter */}
        <circle cx="200" cy="110" r="22" stroke="currentColor" strokeWidth="1.25" className="text-accent" />
        <path d="M200 98v24M188 110h24" stroke="currentColor" strokeWidth="1.25" className="text-accent" strokeLinecap="round" />
        {/* internet */}
        <circle cx="342" cy="110" r="30" stroke="currentColor" strokeWidth="1.25" />
        <ellipse cx="342" cy="110" rx="12" ry="30" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="312" y1="110" x2="372" y2="110" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
    );
  }
  
  export function AIArt() {
    const cols = [
      { x: 90, ys: [60, 110, 160] },
      { x: 200, ys: [45, 92, 138, 185] },
      { x: 310, ys: [60, 110, 160] },
    ];
    const links: [number, number, number, number][] = [];
    for (let c = 0; c < cols.length - 1; c++) {
      const from = cols[c];
      const to = cols[c + 1];
      if (!from || !to) continue;
      for (const y1 of from.ys) for (const y2 of to.ys) links.push([from.x, y1, to.x, y2]);
    }
    return (
      <svg viewBox="0 0 400 220" className="h-auto w-full text-ink-muted" aria-hidden fill="none">
        {links.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        ))}
        {cols.flatMap((c) =>
          c.ys.map((y) => (
            <circle key={`${c.x}-${y}`} cx={c.x} cy={y} r="6" stroke="currentColor" strokeWidth="1.25" fill="var(--panel)" />
          )),
        )}
        <circle cx="200" cy="92" r="6" className="text-accent" fill="currentColor" />
      </svg>
    );
  }
  
  export function PartnerArt() {
    return (
      <svg viewBox="0 0 400 200" className="h-auto w-full text-ink-muted" aria-hidden fill="none">
        <line x1="120" y1="100" x2="280" y2="100" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.25" />
        <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="100" cy="92" r="8" stroke="currentColor" strokeWidth="1.25" />
        <path d="M86 116c2-7 26-7 28 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="300" cy="100" r="30" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="300" cy="92" r="8" stroke="currentColor" strokeWidth="1.25" />
        <path d="M286 116c2-7 26-7 28 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path
          d="M200 78l14 5v12c0 10-6 18-14 22-8-4-14-12-14-22V83l14-5z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
          className="text-accent"
        />
      </svg>
    );
  }