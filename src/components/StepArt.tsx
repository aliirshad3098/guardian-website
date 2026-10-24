/**
 * Futuristic line illustrations for the How-it-works steps.
 * Drawn in SVG with currentColor, so they follow the accent colour and theme.
 */

export function NetworkArt() {
    return (
      <svg viewBox="0 0 400 220" className="h-auto w-full text-accent" aria-hidden>
        <defs>
          <radialGradient id="net-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="110" r="100" fill="url(#net-glow)" />
        {[52, 84, 116].map((r) => (
          <circle key={r} cx="200" cy="110" r={r} fill="none" stroke="currentColor" strokeOpacity="0.18" />
        ))}
        {[
          [120, 56],
          [282, 62],
          [306, 168],
          [116, 172],
          [200, 14],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1="200" y1="110" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.35" />
            <circle cx={x} cy={y} r="4" fill="currentColor" />
          </g>
        ))}
        <circle cx="200" cy="110" r="18" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="110" r="6" fill="currentColor" />
        <circle cx="200" cy="110" r="18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <animate attributeName="r" values="18;100" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.7;0" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
  
  export function AIArt() {
    const cols = [
      { x: 80, ys: [56, 110, 164] },
      { x: 200, ys: [36, 84, 136, 184] },
      { x: 320, ys: [56, 110, 164] },
    ];
    const links: [number, number, number, number][] = [];
    for (let c = 0; c < cols.length - 1; c++) {
      const from = cols[c];
      const to = cols[c + 1];
      if (!from || !to) continue;
      for (const y1 of from.ys) for (const y2 of to.ys) links.push([from.x, y1, to.x, y2]);
    }
    const core = cols[1];
    return (
      <svg viewBox="0 0 400 220" className="h-auto w-full text-accent" aria-hidden>
        {links.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.16" />
        ))}
        {cols.flatMap((c) =>
          c.ys.map((y) => (
            <circle key={`${c.x}-${y}`} cx={c.x} cy={y} r="8" fill="var(--panel)" stroke="currentColor" strokeWidth="1.5" />
          )),
        )}
        {(core?.ys ?? []).map((y) => (
          <circle key={`core-${y}`} cx="200" cy={y} r="3" fill="currentColor" />
        ))}
        <circle r="4" fill="currentColor">
          <animateMotion dur="3.4s" repeatCount="indefinite" path="M80 56 L200 84 L320 110" />
        </circle>
        <circle r="4" fill="currentColor">
          <animateMotion dur="3.4s" begin="1.7s" repeatCount="indefinite" path="M80 164 L200 136 L320 164" />
        </circle>
      </svg>
    );
  }
  
  export function PartnerArt() {
    return (
      <svg viewBox="0 0 400 220" className="h-auto w-full text-accent" aria-hidden>
        <line
          x1="110"
          y1="110"
          x2="290"
          y2="110"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeDasharray="6 6"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite" />
        </line>
        <circle cx="110" cy="110" r="34" fill="var(--panel)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="110" cy="102" r="10" fill="currentColor" fillOpacity="0.8" />
        <path d="M94 128c3-9 29-9 32 0" fill="currentColor" fillOpacity="0.8" />
        <circle cx="290" cy="110" r="34" fill="var(--panel)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="290" cy="102" r="10" fill="currentColor" fillOpacity="0.8" />
        <path d="M274 128c3-9 29-9 32 0" fill="currentColor" fillOpacity="0.8" />
        <path
          d="M200 74l20 8v16c0 14-9 25-20 31-11-6-20-17-20-31V82l20-8z"
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M192 110l6 6 11-11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="4" fill="currentColor">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M110 110 L290 110" />
        </circle>
      </svg>
    );
  }