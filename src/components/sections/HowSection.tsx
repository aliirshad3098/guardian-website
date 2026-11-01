import { useEffect, useRef } from "react";

// How it works: a pinned horizontal flow. Cards slide, and connector lines
// join the live card edges through a central hub.

const CSS = `.gh-how{--bad:#b42318;--ease:cubic-bezier(.22,1,.36,1)}[data-theme="dark"] .gh-how{--bad:#f87171}.gh-how *{box-sizing:border-box}.gh-how, .gh-how{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip}.gh-how .track{height:300vh;position:relative}.gh-how .pin{position:sticky;top:76px;height:calc(100vh - 76px);overflow:hidden}.gh-how .head{position:absolute;top:14px;left:0;right:0;text-align:center;z-index:2}.gh-how .eb{display:block;font-size:13px;font-weight:600;color:var(--accent);margin:0 0 4px}.gh-how .h2{font-size:clamp(30px,3.6vw,44px);font-weight:650;letter-spacing:-.025em;line-height:1.1;margin:0}.gh-how .h2 em{font-style:normal;color:var(--accent)}.gh-how .row{position:absolute;top:0;left:0;height:100%;width:300vw;display:flex;will-change:transform}.gh-how .panel{position:relative;flex:0 0 100vw;height:100%;display:flex;align-items:center;justify-content:center;padding:100px 48px 130px;box-sizing:border-box}.gh-how .card{position:relative;width:min(1080px,100%);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;background:var(--panel);border:1px solid var(--line-strong);border-radius:28px;padding:40px 52px;box-shadow:0 1px 2px rgba(15,23,42,.04),0 24px 60px -30px rgba(15,23,42,.18);will-change:transform,opacity,filter}.gh-how .meta{display:flex;gap:12px;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;color:var(--ink-faint);letter-spacing:.04em}.gh-how h3{font-size:clamp(22px,2.1vw,28px);font-weight:650;letter-spacing:-.025em;line-height:1.1;margin:14px 0 12px}.gh-how p{margin:0;font-size:15px;line-height:1.75;color:var(--ink-muted)}.gh-how .stat{margin-top:26px;padding-top:18px;border-top:1px solid var(--line-strong);display:flex;align-items:baseline;gap:12px}.gh-how .stat b{font-size:34px;font-weight:650;letter-spacing:-.02em;color:var(--accent);font-variant-numeric:tabular-nums}.gh-how .stat span{font-size:13px;color:var(--ink-muted)}.gh-how .art svg{width:100%;height:auto;display:block;overflow:visible}.gh-how .txt>*{opacity:0;transform:translateY(14px);transition:opacity .7s var(--ease),transform .7s var(--ease)}.gh-how .txt>*:nth-child(1){transition-delay:.05s}.gh-how .txt>*:nth-child(2){transition-delay:.12s}.gh-how .txt>*:nth-child(3){transition-delay:.2s}.gh-how .txt>*:nth-child(4){transition-delay:.28s}.gh-how .panel.on .txt>*{opacity:1;transform:none}.gh-how .in{fill:none;stroke:var(--line-strong);stroke-width:1;stroke-dasharray:260;stroke-dashoffset:260;transition:stroke-dashoffset 1.2s var(--ease)}.gh-how .in.on{stroke:var(--accent);stroke-width:1.8}.gh-how .panel.on .in{stroke-dashoffset:0}.gh-how .panel.on .in.on{transition-delay:.15s}.gh-how .node{fill:var(--ink-faint);transition:fill .5s}.gh-how .node.on{fill:var(--accent)}.gh-how .lab{font-size:11px;font-weight:500;fill:var(--ink-faint)}.gh-how .lab.on{font-weight:600;fill:var(--ink)}.gh-how .dot{fill:var(--accent-bright)}.gh-how .core{fill:var(--panel);stroke:var(--ink-faint);stroke-width:1;transition:stroke .6s}.gh-how .panel.on .core{stroke:var(--accent)}.gh-how .out{fill:none;stroke-width:1.4;stroke-dasharray:200;stroke-dashoffset:200;transition:stroke-dashoffset 1.1s var(--ease) .5s}.gh-how .out.ok{stroke:var(--accent)}.gh-how .out.no{stroke:var(--bad);opacity:.85}.gh-how .panel.on .out{stroke-dashoffset:0}.gh-how .tick, .gh-how .cross{fill:none;stroke-width:2;stroke-linecap:round;opacity:0;transition:opacity .4s .9s}.gh-how .tick{stroke:var(--accent)}.gh-how .cross{stroke:var(--bad)}.gh-how .panel.on .tick, .gh-how .panel.on .cross{opacity:1}.gh-how .res{font-size:10px;font-weight:700;opacity:0;transition:opacity .4s 1s}.gh-how .res.ok{fill:var(--accent)}.gh-how .res.no{fill:var(--bad)}.gh-how .panel.on .res{opacity:1}.gh-how .nav{position:absolute;left:0;right:0;bottom:36px;display:flex;justify-content:center;gap:12px;z-index:2;background:transparent}.gh-how .nav button{all:unset;cursor:pointer;position:relative;display:flex;align-items:center;gap:10px;padding:10px 18px 14px;background:transparent;border-radius:0;box-shadow:none;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:14px;font-weight:500;line-height:1.2;color:var(--ink-faint);transition:color .4s}.gh-how .nav button span{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px}.gh-how .nav button i{position:absolute;left:18px;right:18px;bottom:0;height:2px;background:var(--line-strong);border-radius:2px;overflow:hidden}.gh-how .nav button i:after{content:"";position:absolute;inset:0;background:var(--accent);transform:scaleX(var(--f,0));transform-origin:left}.gh-how .nav button.on{color:var(--ink)}.gh-how .nav button.on span{color:var(--accent)}.gh-how .links{position:absolute;left:0;top:0;width:300vw;height:100%;z-index:0;pointer-events:none;overflow:visible}.gh-how .row .end{z-index:0;pointer-events:none}@keyframes drawWire{to{stroke-dashoffset:0}}.gh-how .end{position:absolute;width:11px;height:11px;margin:-5.5px 0 0 -5.5px;border-radius:50%;background:var(--panel);border:1.5px solid var(--ink-faint);box-shadow:0 0 0 3px rgba(20,184,166,0);transition:background .5s,border-color .5s,transform .5s;transform:scale(.8)}.gh-how .end.lit{background:#0f766e;border-color:#0f766e;transform:scale(1);box-shadow:0 0 0 4px rgba(20,184,166,.15)}.gh-how .rail{fill:none;stroke:#2f9e92;stroke-linecap:round;stroke-width:2.8px;stroke-dasharray:1 1;stroke-dashoffset:1}.gh-how .run{fill:none;stroke:#14b8a6;stroke-linecap:round;stroke-width:4.2px;stroke-dasharray:.14 .86;stroke-dashoffset:.14;opacity:0}.gh-how .hub{position:absolute;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;background:var(--panel);border:1.5px solid var(--ink-faint);transition:border-color .5s,box-shadow .5s;opacity:0}.gh-how .hub img{position:absolute;inset:8px;width:38px;height:38px;border-radius:50%;object-fit:cover}.gh-how .hub.lit{border-color:#0f766e;box-shadow:0 0 0 6px rgba(20,184,166,.12)}.gh-how .panel{z-index:1}@media(max-width:1024px){.gh-how .links{position:absolute;left:0;top:0;width:100%;height:0;overflow:visible}.gh-how .track{height:auto}.gh-how .pin{position:static;height:auto;overflow:visible}.gh-how .head{position:static;text-align:left;padding:48px 24px 0}.gh-how .h2{font-size:32px}.gh-how .row{position:relative;display:block;width:auto;height:auto}.gh-how .panel{height:auto;padding:96px 16px}.gh-how .card{grid-template-columns:1fr;gap:24px;padding:32px 24px}.gh-how .txt>*{opacity:1;transform:none}.gh-how .in, .gh-how .out{stroke-dashoffset:0}.gh-how .tick, .gh-how .cross, .gh-how .res{opacity:1}.gh-how .nav{display:none}}@media(max-height:700px) and (min-width:1025px){.gh-how .card{padding:22px 44px}.gh-how .art svg{max-width:300px;margin:0 auto}.gh-how h3{font-size:22px;margin:8px 0}.gh-how p{font-size:14px;line-height:1.6}.gh-how .h2{font-size:30px}.gh-how .panel{padding:96px 48px 120px}}@media(prefers-reduced-motion:reduce){.gh-how *{transition:none!important;animation:none!important}}`;

const MARKUP = `<section class="track" id="track"><div class="pin"> <div class="head"><span class="eb">How it works</span><h2 class="h2">How every search is <em>filtered</em></h2></div> <div class="row" id="row"><svg class="links" aria-hidden="true"><path class="rail" data-g="0" data-j="0" data-d="0.00" data-r="0" pathLength="1" d="M0 0"/><path class="run" data-r="0" pathLength="1" d="M0 0"/><path class="rail" data-g="0" data-j="1" data-d="0.04" data-r="1" pathLength="1" d="M0 0"/><path class="run" data-r="1" pathLength="1" d="M0 0"/><path class="rail" data-g="0" data-j="2" data-d="0.08" data-r="2" pathLength="1" d="M0 0"/><path class="run" data-r="2" pathLength="1" d="M0 0"/><path class="rail" data-g="0" data-j="3" data-d="0.04" data-r="3" pathLength="1" d="M0 0"/><path class="run" data-r="3" pathLength="1" d="M0 0"/><path class="rail" data-g="0" data-j="4" data-d="0.08" data-r="4" pathLength="1" d="M0 0"/><path class="run" data-r="4" pathLength="1" d="M0 0"/><path class="rail" data-g="0" data-j="5" data-d="0.12" data-r="5" pathLength="1" d="M0 0"/><path class="run" data-r="5" pathLength="1" d="M0 0"/><path class="rail" data-g="1" data-j="0" data-d="0.00" data-r="6" pathLength="1" d="M0 0"/><path class="run" data-r="6" pathLength="1" d="M0 0"/><path class="rail" data-g="1" data-j="1" data-d="0.04" data-r="7" pathLength="1" d="M0 0"/><path class="run" data-r="7" pathLength="1" d="M0 0"/><path class="rail" data-g="1" data-j="2" data-d="0.08" data-r="8" pathLength="1" d="M0 0"/><path class="run" data-r="8" pathLength="1" d="M0 0"/><path class="rail" data-g="1" data-j="3" data-d="0.04" data-r="9" pathLength="1" d="M0 0"/><path class="run" data-r="9" pathLength="1" d="M0 0"/><path class="rail" data-g="1" data-j="4" data-d="0.08" data-r="10" pathLength="1" d="M0 0"/><path class="run" data-r="10" pathLength="1" d="M0 0"/><path class="rail" data-g="1" data-j="5" data-d="0.12" data-r="11" pathLength="1" d="M0 0"/><path class="run" data-r="11" pathLength="1" d="M0 0"/></svg><i class="end" data-r="0" data-s="0"></i><i class="end" data-r="0" data-s="1"></i><i class="end" data-r="1" data-s="0"></i><i class="end" data-r="1" data-s="1"></i><i class="end" data-r="2" data-s="0"></i><i class="end" data-r="2" data-s="1"></i><i class="end" data-r="3" data-s="0"></i><i class="end" data-r="3" data-s="1"></i><i class="end" data-r="4" data-s="0"></i><i class="end" data-r="4" data-s="1"></i><i class="end" data-r="5" data-s="0"></i><i class="end" data-r="5" data-s="1"></i><i class="end" data-r="6" data-s="0"></i><i class="end" data-r="6" data-s="1"></i><i class="end" data-r="7" data-s="0"></i><i class="end" data-r="7" data-s="1"></i><i class="end" data-r="8" data-s="0"></i><i class="end" data-r="8" data-s="1"></i><i class="end" data-r="9" data-s="0"></i><i class="end" data-r="9" data-s="1"></i><i class="end" data-r="10" data-s="0"></i><i class="end" data-r="10" data-s="1"></i><i class="end" data-r="11" data-s="0"></i><i class="end" data-r="11" data-s="1"></i><i class="hub" data-g="0"><img alt="" src="/logo.png"></i><i class="hub" data-g="1"><img alt="" src="/logo.png"></i><section class="panel" data-i="0"><div class="card"> <div class="txt"> <h3>Network-level filtering</h3><p>Guardian runs a lightweight on-device VPN. Every site your browser requests is checked against a local list of 4.6 million known domains before the page loads. Nothing leaves your phone.</p> </div> <div class="art"><svg viewBox="0 0 400 300" aria-hidden="true"><path id="s0i0" class="in on" d="M70 70 C130 70 140 150 168 150"/><circle class="node on" cx="66" cy="70" r="4.5"/><text class="lab on" x="0" y="74">Domains</text><circle class="dot" r="3.2"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#s0i0"/></animateMotion></circle><path id="s0i1" class="in " d="M70 150 C130 150 140 150 168 150"/><circle class="node " cx="66" cy="150" r="3.5"/><text class="lab " x="0" y="154">Query</text><path id="s0i2" class="in " d="M70 230 C130 230 140 150 168 150"/><circle class="node " cx="66" cy="230" r="3.5"/><text class="lab " x="0" y="234">Partner</text><circle class="core" cx="200" cy="150" r="30"/><image href="/logo.png" x="180" y="130" width="40" height="40"/><path class="out ok" d="M232 150 C260 150 280 110 352 110"/><path class="out no" d="M232 150 C260 150 280 190 352 190"/><path class="tick" d="M358 110 l5 5 l9 -10"/><path class="cross" d="M358 186 l10 10 m0 -10 l-10 10"/><text class="res ok" x="372" y="134">Allowed</text><text class="res no" x="372" y="214">Blocked</text></svg></div> </div></section><section class="panel" data-i="1"><div class="card"> <div class="txt"> <h3>On-device language understanding</h3><p>Searches that pass the domain list are reviewed by an on-device model trained on English, Roman Urdu, Urdu, Chinese, Bengali and Hindi. Your queries are never sent to a server.</p> </div> <div class="art"><svg viewBox="0 0 400 300" aria-hidden="true"><path id="s1i0" class="in " d="M70 70 C130 70 140 150 168 150"/><circle class="node " cx="66" cy="70" r="3.5"/><text class="lab " x="0" y="74">Domains</text><path id="s1i1" class="in on" d="M70 150 C130 150 140 150 168 150"/><circle class="node on" cx="66" cy="150" r="4.5"/><text class="lab on" x="0" y="154">Query</text><circle class="dot" r="3.2"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#s1i1"/></animateMotion></circle><path id="s1i2" class="in " d="M70 230 C130 230 140 150 168 150"/><circle class="node " cx="66" cy="230" r="3.5"/><text class="lab " x="0" y="234">Partner</text><circle class="core" cx="200" cy="150" r="30"/><image href="/logo.png" x="180" y="130" width="40" height="40"/><path class="out ok" d="M232 150 C260 150 280 110 352 110"/><path class="out no" d="M232 150 C260 150 280 190 352 190"/><path class="tick" d="M358 110 l5 5 l9 -10"/><path class="cross" d="M358 186 l10 10 m0 -10 l-10 10"/><text class="res ok" x="372" y="134">Allowed</text><text class="res no" x="372" y="214">Blocked</text></svg></div> </div></section><section class="panel" data-i="2"><div class="card"> <div class="txt"> <h3>Accountability partner</h3><p>Link a trusted person to your account. They are notified if protection is turned off, and they can see your protection status. They never see your browsing history or search content.</p> </div> <div class="art"><svg viewBox="0 0 400 300" aria-hidden="true"><path id="s2i0" class="in " d="M70 70 C130 70 140 150 168 150"/><circle class="node " cx="66" cy="70" r="3.5"/><text class="lab " x="0" y="74">Domains</text><path id="s2i1" class="in " d="M70 150 C130 150 140 150 168 150"/><circle class="node " cx="66" cy="150" r="3.5"/><text class="lab " x="0" y="154">Query</text><path id="s2i2" class="in on" d="M70 230 C130 230 140 150 168 150"/><circle class="node on" cx="66" cy="230" r="4.5"/><text class="lab on" x="0" y="234">Partner</text><circle class="dot" r="3.2"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#s2i2"/></animateMotion></circle><circle class="core" cx="200" cy="150" r="30"/><image href="/logo.png" x="180" y="130" width="40" height="40"/><path class="out ok" d="M232 150 C260 150 280 110 352 110"/><path class="out no" d="M232 150 C260 150 280 190 352 190"/><path class="tick" d="M358 110 l5 5 l9 -10"/><path class="cross" d="M358 186 l10 10 m0 -10 l-10 10"/><text class="res ok" x="372" y="134">Allowed</text><text class="res no" x="372" y="214">Blocked</text></svg></div> </div></section></div> <nav class="nav" id="nav"><button data-i="0"><span>01</span>Network<i></i></button><button data-i="1"><span>02</span>Understanding<i></i></button><button data-i="2"><span>03</span>Support<i></i></button></nav> </div></section>`;

export function HowSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ac = new AbortController();
    let alive = true;

    const qs = <T extends Element = HTMLElement>(sel: string): T => root.querySelector(sel) as T;
    const qsa = <T extends Element = HTMLElement>(sel: string): T[] =>
      Array.from(root.querySelectorAll<T>(sel));

    interface Conn {
      rails: SVGPathElement[];
      runs: SVGPathElement[];
      ends: HTMLElement[];
      hubs: HTMLElement[];
      svg: SVGSVGElement;
    }

    const at = <T,>(list: T[], i: number): T => list[i] as T;

    const track = qs("#track");
    const row = qs("#row");
    const panels = qsa(".panel");
    const cards = panels.map((p) => p.querySelector(".card") as HTMLElement);
    const btns = qsa<HTMLButtonElement>(".nav button");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counted: boolean[] = [false, false, false];
    let target = 0;
    let cur = 0;
    let conn: Conn | null = null;

    const ease = (t: number): number => 1 - Math.pow(1 - t, 3);

    function countTo(el: HTMLElement): void {
      const raw = el.dataset["count"] ?? "";
      const num = parseFloat(raw);
      const suf = raw.replace(/[0-9.]/g, "");
      if (reduce || isNaN(num)) {
        el.textContent = raw;
        return;
      }
      const t0 = performance.now();
      const step = (now: number): void => {
        const k = Math.min((now - t0) / 1200, 1);
        el.textContent = (num * ease(k)).toFixed(num % 1 ? 1 : 0) + suf;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    function frame(): void {
      if (!alive) return;

      cur += (target - cur) * (reduce ? 1 : 0.1);
      if (Math.abs(target - cur) < 0.0004) cur = target;
      const W = window.innerWidth;
      const f = cur * 2;

      if (W > 1024) {
        row.style.transform = `translate3d(${-cur * 2 * W}px,0,0)`;
        panels.forEach((p, i) => {
          const d = Math.min(Math.abs(i - f), 1.2);
          const a = Math.max(0, 1 - d);
          const card = at(cards, i);
          card.style.transform = `perspective(1200px) rotateY(${(i - f) * -8}deg) scale(${1 - d * 0.08})`;
          card.style.opacity = (0.35 + 0.65 * a).toFixed(3);
          card.style.filter = `blur(${(d * 2.5).toFixed(2)}px)`;
          const on = d < 0.35;
          p.classList.toggle("on", on);
          if (on && !counted[i]) {
            counted[i] = true;
            const c = p.querySelector<HTMLElement>("[data-count]");
            if (c) countTo(c);
          }
        });
      }

      // connectors: left card -> hub -> right card, built from live card edges
      if (!conn) {
        conn = {
          rails: qsa<SVGPathElement>(".rail"),
          runs: qsa<SVGPathElement>(".run"),
          ends: qsa(".end"),
          hubs: qsa(".hub"),
          svg: qs<SVGSVGElement>(".links"),
        };
      }
      const C = conn;
      const rowRect = row.getBoundingClientRect();
      const pinRect = qs(".pin").getBoundingClientRect();
      const vertical = window.innerWidth <= 1024;
      const SH = vertical ? row.offsetHeight : pinRect.height;
      const SW = row.offsetWidth;
      if (C.svg.getAttribute("viewBox") !== `0 0 ${SW} ${SH}`) {
        C.svg.setAttribute("viewBox", `0 0 ${SW} ${SH}`);
      }
      if (vertical) {
        C.svg.style.width = `${SW}px`;
        C.svg.style.height = `${SH}px`;
      } else {
        C.svg.style.width = "";
        C.svg.style.height = "";
      }
      const FR = [0.34, 0.5, 0.66];

      C.rails.forEach((r, idx) => {
        const g = Number(r.dataset["g"]);
        const j = Number(r.dataset["j"]);
        const k = j % 3;
        const out = j >= 3;
        const a = at(cards, g).getBoundingClientRect();
        const b = at(cards, g + 1).getBoundingClientRect();
        let d: string;
        let sx: number, sy: number, ex: number, ey: number;
        if (vertical) {
          // stacked cards: each line runs from the card above, into the hub, out to the card below
          const x1 = a.left + a.width * at(FR, k) - rowRect.left;
          const x2 = b.left + b.width * at(FR, k) - rowRect.left;
          const y1 = a.bottom - rowRect.top;
          const y2 = b.top - rowRect.top;
          const xm = a.left + a.width / 2 - rowRect.left;
          const ym = (y1 + y2) / 2;
          const span = y2 - y1;
          d = !out
            ? `M${x1.toFixed(1)} ${y1.toFixed(1)} C${x1.toFixed(1)} ${(y1 + span * 0.42).toFixed(1)}, ${(xm).toFixed(1)} ${(ym - span * 0.18).toFixed(1)}, ${xm.toFixed(1)} ${ym.toFixed(1)}`
            : `M${xm.toFixed(1)} ${ym.toFixed(1)} C${xm.toFixed(1)} ${(ym + span * 0.18).toFixed(1)}, ${x2.toFixed(1)} ${(y2 - span * 0.42).toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
          sx = out ? xm : x1;
          sy = out ? ym : y1;
          ex = out ? x2 : xm;
          ey = out ? y2 : ym;
        } else {
          const x1 = a.right - rowRect.left;
          const x2 = b.left - rowRect.left;
          const y1 = a.top + a.height * at(FR, k) - pinRect.top;
          const y2 = b.top + b.height * at(FR, k) - pinRect.top;
          const xm = (x1 + x2) / 2;
          const ym = a.top + a.height / 2 - pinRect.top;
          const span = x2 - x1;
          d = !out
            ? `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + span * 0.42).toFixed(1)} ${y1.toFixed(1)}, ${(xm - span * 0.18).toFixed(1)} ${ym.toFixed(1)}, ${xm.toFixed(1)} ${ym.toFixed(1)}`
            : `M${xm.toFixed(1)} ${ym.toFixed(1)} C${(xm + span * 0.18).toFixed(1)} ${ym.toFixed(1)}, ${(x2 - span * 0.42).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
          sx = out ? xm : x1;
          sy = out ? ym : y1;
          ex = out ? x2 : xm;
          ey = out ? y2 : ym;
        }
        r.setAttribute("d", d);
        at(C.runs, idx).setAttribute("d", d);

        const e0 = at(C.ends, idx * 2);
        const e1 = at(C.ends, idx * 2 + 1);
        e0.style.left = sx + "px";
        e0.style.top = sy + "px";
        e1.style.left = ex + "px";
        e1.style.top = ey + "px";

        const dl = Number(r.dataset["d"]);
        const draw = Math.min(
          Math.max((f - g - (out ? 0.12 : -0.05) - dl) / (out ? 0.32 : 0.3), 0),
          1,
        );
        r.style.strokeDashoffset = (1 - draw).toFixed(4);
        const q = Math.min(Math.max((f - g - 0.1 - dl) / 0.6, 0), 1);
        at(C.runs, idx).style.strokeDashoffset = (0.14 - 1.14 * q).toFixed(4);
        at(C.runs, idx).style.opacity = (Math.sin(Math.PI * q) * (draw > 0.9 ? 1 : draw)).toFixed(
          3,
        );
        e0.style.opacity = draw > 0.05 ? "1" : "0";
        e1.style.opacity = draw > 0.9 ? "1" : "0";
      });

      C.hubs.forEach((h) => {
        const g = Number(h.dataset["g"]);
        const a = at(cards, g).getBoundingClientRect();
        const b = at(cards, g + 1).getBoundingClientRect();
        const xm = vertical ? a.left + a.width / 2 - rowRect.left : (a.right + b.left) / 2 - rowRect.left;
        const ym = vertical ? (a.bottom + b.top) / 2 - rowRect.top : a.top + a.height / 2 - pinRect.top;
        h.style.left = xm + "px";
        h.style.top = ym + "px";
        const arrive = Math.min(Math.max((f - g - 0.1) / 0.3, 0), 1);
        h.style.opacity = arrive.toFixed(3);
        h.classList.toggle("lit", arrive > 0.95);
      });

      const idx = Math.min(Math.round(f), 2);
      btns.forEach((b, k) => {
        b.classList.toggle("on", k === idx);
        b.style.setProperty("--f", String(Math.min(Math.max(f - k, 0), 1)));
      });

      requestAnimationFrame(frame);
    }

    window.addEventListener(
      "scroll",
      () => {
        const r = track.getBoundingClientRect();
        const total = track.offsetHeight - window.innerHeight;
        target = Math.min(Math.max(-r.top / total, 0), 1);
      },
      { passive: true, signal: ac.signal },
    );

    btns.forEach((b, i) => {
      b.onclick = () =>
        window.scrollTo({
          top: track.offsetTop + (i / 2) * (track.offsetHeight - window.innerHeight),
          behavior: reduce ? "auto" : "smooth",
        });
    });

    if (window.innerWidth <= 1024) counted.fill(true);
    frame();

    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div ref={rootRef} className="gh-how" dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </>
  );
}