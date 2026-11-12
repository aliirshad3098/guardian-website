import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PhoneMockup } from "@/components/PhoneMockup";

import fortressShot from "@/assets/fortress.jpg";
import pairingShot from "@/assets/pairing.jpg";
import BlockerShot from "@/assets/blocker.jpg";
import partnerAddShot from "@/assets/partner-add-connection.jpg";
import accountabilityShot from "@/assets/accountability-card.jpg";
import autoBlockShot from "@/assets/auto-blocking-schedule.jpg";

const sections = [
  {
    eyebrow: "Commitment",
    title: "Fortress Mode",
    body: "Lock protection for a set number of days. Guardian generates the password itself, hides it, and only reveals it when the lock expires — so a weak moment can't undo a good decision.",
    points: [
      "Auto-generated password you never see",
      "Cannot be released early, even by you",
      "Survives restarts, force-stops and reinstall attempts",
    ],
    image: fortressShot,
    alt: "Guardian Fortress Mode screen showing an active time lock",
  },
  {
    eyebrow: "Support",
    title: "Accountability partner",
    body: "Pair with someone you trust. They get a separate partner view showing whether protection is on and any request to change it — never your searches or browsing history.",
    points: [
      "Simple pairing code, no accounts to manage",
      "Partner approves changes to protection",
      "Status only — activity is never shared",
    ],
    image: pairingShot,
    alt: "Guardian partner pairing screen with a pairing code",
    reverse: true,
  },
  {
    eyebrow: "Support",
    title: "Add another connection",
    body: "Open the menu on your Guardian Partner app and tap Add another connection to link a new Guardian user to your partner account.",
    points: [
      "Found in the Guardian Partner menu",
      "Add more connections whenever you need them",
      "Manage every connection from one place",
    ],
    image: partnerAddShot,
    alt: "Guardian Partner menu with the Add another connection option highlighted",
  },
  {
    eyebrow: "Accountability",
    title: "See your partner status at a glance",
    body: "The home screen shows whether your accountability partner is linked, so you always know who is keeping you on track.",
    points: [
      "Accountability card on the home screen",
      "Shows when a partner is linked",
      "One tap to open partner settings",
    ],
    image: accountabilityShot,
    alt: "Guardian home screen with the Accountability card showing Partner linked",
    reverse: true,
  },
  {
    eyebrow: "Schedule",
    title: "Auto blocking at the times you choose",
    body: "Turn on Auto Blocking and set the time windows you want. Guardian turns protection on by itself during those hours, so you don't have to remember to do it.",
    points: [
      "Pick your own start and end times",
      "Protection turns on automatically in each window",
      "Add as many schedules as you need",
    ],
    image: autoBlockShot,
    alt: "Guardian Schedule screen with the Auto Blocking toggle and Add Schedule button highlighted",
  },
  {
    eyebrow: "Focus",
    title: "App & Reels blockers",
    body: "Block whole apps on a schedule, or strip only the short-video feeds out of apps you want to keep. A quick check stops turning into an hour.",
    points: [
      "Per-app schedules or permanent blocks",
      "Reels and shorts removed at the source",
      "Works alongside Fortress Mode",
    ],
    image: BlockerShot,
    alt: "Guardian Blocker showing apps in the list",
    reverse: true,
  },
];

const grid = [
  {
    title: "On-device AI",
    body: "Search intent classified locally in English, Roman Urdu, Urdu, Chinese, Bengali and Hindi. Nothing is uploaded.",
  },
  {
    title: "4.6M domain blocklist",
    body: "Stored on your phone after first download, so filtering keeps working offline.",
  },
  {
    title: "Decoy password",
    body: "Opens a harmless-looking screen instead of settings. Real settings stay sealed.",
  },
  {
    title: "Urge-surfing timer",
    body: "A guided pause that rides out the spike. Most urges pass in a few minutes.",
  },
  {
    title: "Streaks & insights",
    body: "See clean days, blocked attempts and the times of day you're most at risk.",
  },
  {
    title: "Tamper resistance",
    body: "Uninstall and force-stop attempts are detected and reported to your partner.",
  },
];

/**
 * UFlow: three labels arranged in a U with a line through them.
 * An arrow travels along the U as the section scrolls into and past the view.
 */
function UFlow({ points }: { points: string[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const arrowRef = useRef<SVGPathElement>(null);

  // Track the box size in pixels so the U and the arrow share one coordinate system.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => setSize({ w: box.clientWidth, h: box.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const top = h * 0.28;
  const x1 = w * 0.16;
  const x2 = w * 0.84;
  const d = `M ${x1} ${top} C ${x1} ${h}, ${x2} ${h}, ${x2} ${top}`;

  // Move the arrow along the path based on how far the section has scrolled.
  useEffect(() => {
    const box = boxRef.current;
    const path = pathRef.current;
    if (!box || !path) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.85 - rect.top) / (rect.height + vh * 0.5);
      const t = Math.min(1, Math.max(0, raw));
      const len = path.getTotalLength();
      const at = path.getPointAtLength(t * len);
      const ahead = path.getPointAtLength(Math.min(len, t * len + 2));
      const behind = path.getPointAtLength(Math.max(0, t * len - 2));
      const deg = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      // Write straight to the DOM: avoids a React re-render on every scroll frame,
      // which is what made the arrow trail behind on phones.
      arrowRef.current?.setAttribute(
        "transform",
        `translate(${at.x} ${at.y}) rotate(${deg})`,
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [size]);

  return (
    <div ref={boxRef} className="relative mt-7 h-[300px] w-full max-w-[420px] sm:h-[240px]">
      <svg
        aria-hidden
        className="absolute inset-0 size-full"
        viewBox={w ? `0 0 ${w} ${h}` : undefined}
      >
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          ref={arrowRef}
          d="M -7 -6 L 7 0 L -7 6 Z"
          fill="var(--accent)"
          transform="translate(0 0)"
        />
      </svg>
      {points.map((p, i) => (
        <p
          key={p}
          className={`absolute w-[36%] text-center text-[13px] leading-snug text-ink-muted sm:w-[34%] sm:text-[14px] ${
            ["left-0 top-0", "left-1/2 bottom-[66px] -translate-x-1/2", "right-0 top-0"][i]
          }`}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section>
      <header className="mx-auto max-w-[1180px] px-5 pb-10 pt-12 text-center md:px-8 md:pb-14 md:pt-16">
        <Reveal>
          <span className="eyebrow">Features</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(34px,5.4vw,56px)] leading-[1.08]">
            Protection that holds when motivation runs low, <em>with privacy intact</em>.
          </h2>
        </Reveal>
      </header>

      <div className="relative z-10 border-y border-line bg-panel">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="space-y-16 md:space-y-24">
            {sections.map((s) => (
              <Reveal
                key={s.title}
                variant={s.reverse ? "right" : "left"}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
              >
                <div className={`flex flex-col items-center text-center ${s.reverse ? "md:order-2" : ""}`}>
                  <span className="eyebrow">{s.eyebrow}</span>
                  <h2 className="mt-4 text-[clamp(26px,3.6vw,36px)]">{s.title}</h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">{s.body}</p>
                  <UFlow points={s.points} />
                </div>
                <div className={`flex w-full items-center justify-center py-6 ${s.reverse ? "md:order-1" : ""}`}>
                  <div className="w-[230px] shrink-0 sm:w-[240px]">
                  <PhoneMockup
                    src={s.image}
                    alt={s.alt}
                    rotateY={0}
                    rotateX={0}
                    floatDelay={s.reverse ? "1.2s" : "0s"}
                  />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Also included</span>
          <h2 className="mt-5 text-[clamp(26px,3.8vw,38px)]">The rest of the toolkit</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((g, i) => (
            <Reveal key={g.title} variant="scale" delayMs={i * 60} className="panel-card p-7 text-center">
              <h3 className="text-[19px]">{g.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{g.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/download" className="btn-primary">
            Download for Android
          </Link>
          <Link to="/" hash="privacy" className="btn-ghost">
            How privacy works
          </Link>
        </div>
      </section>
    </section>
  );
}