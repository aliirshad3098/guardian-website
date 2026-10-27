import { useEffect, useRef, useState } from "react";
import homeShot from "@/assets/home.jpg";
import statsShot from "@/assets/stats.jpg";
import partnerShot from "@/assets/partner.jpg";

const STEPS = [
  {
    n: "01",
    tag: "Network",
    title: "Network-level filtering",
    body: "Guardian runs a lightweight on-device VPN. Every site your browser requests is checked against a local list of 4.6 million known domains before the page loads. Nothing leaves your phone.",
    img: statsShot,
    alt: "Guardian statistics screen showing weekly blocking activity",
  },
  {
    n: "02",
    tag: "Understanding",
    title: "On-device language understanding",
    body: "Searches that pass the domain list are reviewed by an on-device model trained on English, Roman Urdu, Urdu, Chinese, Bengali and Hindi. Your queries are never sent to a server.",
    img: homeShot,
    alt: "Guardian home screen showing protection active",
  },
  {
    n: "03",
    tag: "Support",
    title: "Accountability partner",
    body: "Link a trusted person to your account. They are notified if protection is turned off, and they can see your protection status. They never see your browsing history or search content.",
    img: partnerShot,
    alt: "Guardian Partner app showing protection status",
  },
];

const css = `
.hp-track{height:340vh;position:relative}
.hp-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.hp-head{position:absolute;top:0;left:0;right:0;z-index:3;width:100%;max-width:1160px;margin:0 auto;padding:56px 48px 0;box-sizing:border-box;text-align:left}
.hp-eb{color:var(--accent);font-size:13px;font-weight:600;letter-spacing:.02em}
.hp-h2{font-size:clamp(28px,3.2vw,40px);line-height:1.1;letter-spacing:-.025em;font-weight:650;margin:10px 0 0;color:var(--ink)}
.hp-row{position:absolute;top:0;left:0;height:100%;display:flex;will-change:transform}
.hp-panel{flex:0 0 100vw;height:100%;display:flex;align-items:center;justify-content:center;padding:120px 48px 110px;box-sizing:border-box}
.hp-inner{width:100%;max-width:1080px;display:grid;grid-template-columns:1fr 1fr;gap:88px;align-items:center}
.hp-txt{will-change:transform,opacity}
.hp-count{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;color:var(--ink-faint);letter-spacing:.04em;display:flex;align-items:center;gap:12px}
.hp-count:after{content:"";height:1px;width:56px;background:var(--line-strong)}
.hp-h3{font-size:clamp(30px,3.4vw,44px);line-height:1.1;letter-spacing:-.028em;font-weight:650;margin:22px 0 20px;color:var(--ink)}
.hp-p{font-size:17px;line-height:1.75;color:var(--ink-muted);margin:0;max-width:44ch}
.hp-media{justify-self:end;width:100%;max-width:340px}
.hp-img{width:100%;display:block;border-radius:24px;border:1px solid var(--line);box-shadow:0 40px 80px -40px rgba(0,0,0,.45);will-change:transform,opacity}
.hp-nav{position:absolute;left:0;right:0;bottom:48px;z-index:3;width:100%;max-width:1160px;margin:0 auto;padding:0 48px;box-sizing:border-box;display:flex;gap:48px}
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
  const imgRefs = useRef<HTMLImageElement[]>([]);
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
                    <img
                      ref={(el) => {
                        if (el) imgRefs.current[i] = el;
                      }}
                      src={s.img}
                      alt={s.alt}
                      className="hp-img"
                      loading="lazy"
                    />
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