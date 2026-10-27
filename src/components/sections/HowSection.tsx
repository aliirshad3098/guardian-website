import { useEffect, useRef, useState } from "react";

export function FilterArt() {
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      <defs>
        <radialGradient id="fa-core" cx="35%" cy="30%" r="75%">
          <stop offset="0%" style={{ stopColor: "var(--accent-bright)" }} stopOpacity="0.9" />
          <stop offset="60%" style={{ stopColor: "var(--accent)" }} stopOpacity="0.35" />
          <stop offset="100%" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fa-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--accent)" }} stopOpacity="0.18" />
          <stop offset="100%" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#fa-halo)" />
      {/* latitude rings of a globe */}
      {[-60, -30, 0, 30, 60].map((y, i) => (
        <ellipse key={y} cx="200" cy={200 + y * 1.6} rx={Math.sqrt(160 * 160 - (y * 1.6) ** 2) * 0.9} ry="26" fill="none" stroke="var(--accent)" strokeOpacity={0.16 + i * 0.02} strokeWidth="1" />
      ))}
      {/* orbit ring */}
      <ellipse cx="200" cy="200" rx="168" ry="62" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" transform="rotate(-18 200 200)" />
      <ellipse cx="200" cy="200" rx="132" ry="128" fill="none" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 6" />
      {/* core */}
      <circle cx="200" cy="200" r="78" fill="url(#fa-core)" />
      <circle cx="200" cy="200" r="78" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.2" />
      {/* checked-domain points on the sphere */}
      {[[170, 180], [222, 196], [196, 232], [236, 224], [178, 226]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--accent-bright)" />
      ))}
      {/* travelling check pulse along the orbit */}
      <circle r="6" fill="var(--accent-bright)">
        <animateMotion dur="5s" repeatCount="indefinite" path="M32,200 A168,62 0 1,0 368,200 A168,62 0 1,0 32,200" />
      </circle>
      <circle r="3" fill="var(--accent)" opacity="0.7">
        <animateMotion dur="7s" repeatCount="indefinite" path="M68,200 A132,128 0 1,0 332,200 A132,128 0 1,0 68,200" />
      </circle>
    </svg>
  );
}

export function NeuralArt() {
  const layers = [
    { x: 70, ys: [110, 200, 290] },
    { x: 200, ys: [80, 150, 220, 290, 340] },
    { x: 330, ys: [130, 200, 270] },
  ];
  const links: [number, number, number, number][] = [];
  for (let c = 0; c < layers.length - 1; c++) {
    const from = layers[c];
    const to = layers[c + 1];
    if (!from || !to) continue;
    for (const y1 of from.ys) for (const y2 of to.ys) links.push([from.x, y1, to.x, y2]);
  }
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="na-line" x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
          <stop offset="0.5" style={{ stopColor: "var(--accent-bright)" }} stopOpacity="0.9" />
          <stop offset="1" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* faint hex lattice */}
      {[0, 1, 2, 3, 4].map((r) => (
        <line key={r} x1="0" x2="400" y1={40 + r * 80} y2={40 + r * 80} stroke="var(--accent)" strokeOpacity="0.06" />
      ))}
      {links.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="1" />
      ))}
      {/* a few bright signal lines */}
      {links.slice(0, 6).map(([x1, y1, x2, y2], i) => (
        <line key={`s${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#na-line)" strokeWidth="1.6" strokeDasharray="30 200">
          <animate attributeName="stroke-dashoffset" from="230" to="0" dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" />
        </line>
      ))}
      {layers.flatMap((l) =>
        l.ys.map((y) => (
          <g key={`${l.x}-${y}`}>
            <circle cx={l.x} cy={y} r="13" fill="none" stroke="var(--accent)" strokeOpacity="0.35" />
            <circle cx={l.x} cy={y} r="5" fill="var(--accent-bright)" />
          </g>
        )),
      )}
    </svg>
  );
}

export function ShieldArt() {
  // hexagon rings around a central shield, with two people nodes linked to it
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      <defs>
        <radialGradient id="sa-core" cx="50%" cy="40%" r="60%">
          <stop offset="0%" style={{ stopColor: "var(--accent-bright)" }} stopOpacity="0.35" />
          <stop offset="100%" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#sa-core)" />
      {[150, 115, 80].map((r, i) => (
        <polygon key={r} points={hex(r)} fill="none" stroke="var(--accent)" strokeOpacity={0.18 + i * 0.14} strokeWidth="1.2" />
      ))}
      {/* central shield */}
      <path
        d="M200 140 L240 156 L240 204 C240 240 222 262 200 272 C178 262 160 240 160 204 L160 156 Z"
        fill="var(--panel)"
        stroke="var(--accent-bright)"
        strokeWidth="2"
      />
      <path d="M182 204 L196 218 L220 190" fill="none" stroke="var(--accent-bright)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* two linked people nodes */}
      {[70, 330].map((x) => (
        <g key={x}>
          <circle cx={x} cy="200" r="30" fill="var(--panel)" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.4" />
          <circle cx={x} cy="192" r="8" fill="var(--accent)" fillOpacity="0.7" />
          <path d={`M${x - 14} 214 Q${x} 198 ${x + 14} 214`} fill="var(--accent)" fillOpacity="0.7" />
        </g>
      ))}
      <line x1="100" y1="200" x2="160" y2="200" stroke="var(--accent)" strokeOpacity="0.5" strokeDasharray="4 5" />
      <line x1="240" y1="200" x2="300" y2="200" stroke="var(--accent)" strokeOpacity="0.5" strokeDasharray="4 5" />
      <circle r="4" fill="var(--accent-bright)">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M100,200 L160,200" />
      </circle>
      <circle r="4" fill="var(--accent-bright)">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M300,200 L240,200" />
      </circle>
    </svg>
  );
}

const STEPS = [
  {
    n: "01",
    tag: "Network",
    title: "Network-level filtering",
    body: "Guardian runs a lightweight on-device VPN. Every site your browser requests is checked against a local list of 4.6 million known domains before the page loads. Nothing leaves your phone.",
    art: <FilterArt />,
    alt: "Illustration of a globe with orbiting domain checks",
  },
  {
    n: "02",
    tag: "Understanding",
    title: "On-device language understanding",
    body: "Searches that pass the domain list are reviewed by an on-device model trained on English, Roman Urdu, Urdu, Chinese, Bengali and Hindi. Your queries are never sent to a server.",
    art: <NeuralArt />,
    alt: "Illustration of a layered neural network",
  },
  {
    n: "03",
    tag: "Support",
    title: "Accountability partner",
    body: "Link a trusted person to your account. They are notified if protection is turned off, and they can see your protection status. They never see your browsing history or search content.",
    art: <ShieldArt />,
    alt: "Illustration of a shield linking two people",
  },
];

const css = `
.hp-track{height:340vh;position:relative}
.hp-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.hp-head{position:absolute;top:0;left:0;right:0;z-index:3;width:100%;max-width:1160px;margin:0 auto;padding:64px 48px 0;box-sizing:border-box;text-align:center}
.hp-eb{color:var(--accent);font-size:14px;font-weight:600}
.hp-h2{font-size:clamp(34px,5.4vw,56px);line-height:1.08;letter-spacing:-.025em;font-weight:650;margin:20px auto 0;max-width:20ch;color:var(--ink)}
.hp-row{position:absolute;top:0;left:0;height:100%;display:flex;will-change:transform}
.hp-panel{flex:0 0 100vw;height:100%;display:flex;align-items:center;justify-content:center;padding:130px 48px 150px;box-sizing:border-box}
.hp-inner{width:100%;max-width:1080px;display:grid;grid-template-columns:1fr 1fr;gap:88px;align-items:center}
.hp-txt{will-change:transform,opacity}
.hp-count{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;color:var(--ink-faint);letter-spacing:.04em;display:flex;align-items:center;gap:12px}
.hp-count:after{content:"";height:1px;width:56px;background:var(--line-strong)}
.hp-h3{font-size:clamp(30px,3.4vw,44px);line-height:1.1;letter-spacing:-.028em;font-weight:650;margin:22px 0 20px;color:var(--ink)}
.hp-p{font-size:17px;line-height:1.75;color:var(--ink-muted);margin:0;max-width:44ch}
.hp-media{justify-self:end;width:100%;max-width:360px}
.hp-img{width:100%;display:block;will-change:transform,opacity}
.hp-nav{position:absolute;left:0;right:0;bottom:40px;z-index:3;width:100%;max-width:1160px;margin:0 auto;padding:0 48px;box-sizing:border-box;display:flex;gap:48px}
.hp-btn{all:unset;cursor:pointer;flex:1;position:relative;padding-top:18px;color:var(--ink-faint);font-size:14px;font-weight:500;transition:color .4s}
.hp-btn:before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:var(--line)}
.hp-btn i{position:absolute;left:0;right:0;top:0;height:2px;background:var(--accent);transform-origin:left;transform:scaleX(var(--p,0))}
.hp-btn span{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;margin-right:10px;color:var(--ink-faint)}
.hp-btn.on{color:var(--ink)}
.hp-btn:focus-visible{outline:2px solid var(--accent);outline-offset:6px}
@media(max-width:900px){
  .hp-track{height:auto}
  .hp-pin{position:static;height:auto;overflow:visible}
  .hp-head{position:static;padding:80px 28px 0;max-width:none}
  .hp-row{position:static;display:block;height:auto}
  .hp-panel{flex:none;height:auto;padding:64px 28px}
  .hp-inner{grid-template-columns:1fr;gap:36px}
  .hp-media{justify-self:start}
  .hp-nav{display:none}
}
@media(prefers-reduced-motion:reduce){.hp-txt,.hp-img{transition:none}}
`;

export function HowSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const txtRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const navRefs = useRef<HTMLButtonElement[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const row = rowRef.current;
    if (!track || !row) return;

    const N = STEPS.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = () => window.innerWidth <= 900;
    let target = 0;
    let cur = 0;
    let raf = 0;
    let lastActive = 0;

    const targetFromScroll = () => {
      const r = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / total));
    };

    const render = () => {
      if (isMobile()) {
        row.style.transform = "";
        return;
      }
      const max = (N - 1) * window.innerWidth;
      row.style.transform = `translate3d(${-cur * max}px,0,0)`;
      const pos = cur * (N - 1);
      for (let i = 0; i < N; i++) {
        const a = 1 - Math.min(1, Math.abs(pos - i));
        const t = txtRefs.current[i];
        const im = imgRefs.current[i];
        const nb = navRefs.current[i];
        if (t) {
          t.style.opacity = String(0.25 + 0.75 * a);
          t.style.transform = `translate3d(${((pos - i) * -40).toFixed(1)}px,0,0)`;
        }
        if (im) {
          im.style.transform = `translate3d(${((pos - i) * -70).toFixed(1)}px,0,0) scale(${(0.94 + 0.06 * a).toFixed(4)})`;
          im.style.opacity = String(0.35 + 0.65 * a);
        }
        if (nb) nb.style.setProperty("--p", String(i <= pos ? Math.min(1, pos - i + 1) : 0));
      }
      const act = Math.round(pos);
      if (act !== lastActive) {
        lastActive = act;
        setActive(act);
      }
    };

    const loop = () => {
      target = targetFromScroll();
      cur = reduce ? target : cur + (target - cur) * 0.12;
      render();
      if (Math.abs(target - cur) > 0.0005) {
        raf = requestAnimationFrame(loop);
      } else {
        cur = target;
        render();
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = track.offsetTop + (i / (STEPS.length - 1)) * (track.offsetHeight - window.innerHeight);
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <style>{css}</style>
      <div ref={trackRef} className="hp-track">
        <div className="hp-pin">
          <div className="hp-head">
            <div className="hp-eb">How it works</div>
            <h2 className="hp-h2">How every search is filtered</h2>
          </div>

          <div ref={rowRef} className="hp-row">
            {STEPS.map((s, i) => (
              <div key={s.n} className="hp-panel">
                <div className="hp-inner">
                  <div
                    ref={(el) => {
                      if (el) txtRefs.current[i] = el;
                    }}
                    className="hp-txt"
                  >
                    <div className="hp-count">
                      {s.n} / 03 &nbsp;{s.tag}
                    </div>
                    <h3 className="hp-h3">{s.title}</h3>
                    <p className="hp-p">{s.body}</p>
                  </div>
                  <div className="hp-media">
                    <div
                      ref={(el) => {
                        if (el) imgRefs.current[i] = el;
                      }}
                      className="hp-img"
                      role="img"
                      aria-label={s.alt}
                    >
                      {s.art}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav className="hp-nav" aria-label="How it works steps">
            {STEPS.map((s, i) => (
              <button
                key={s.n}
                ref={(el) => {
                  if (el) navRefs.current[i] = el;
                }}
                type="button"
                onClick={() => goTo(i)}
                className={`hp-btn ${active === i ? "on" : ""}`}
                aria-current={active === i ? "step" : undefined}
              >
                <span>{s.n}</span>
                {s.tag}
                <i />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}