import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CountUp } from "@/components/CountUp";
import { HeroPhones } from "@/components/HeroPhones";
import { PhoneMockup } from "@/components/PhoneMockup";
import { HowSection } from "@/components/sections/HowSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PrivacySection } from "@/components/sections/PrivacySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { GradientMesh } from "@/components/GradientMesh";

import homeShot from "@/assets/home.jpg";
import partnerShot from "@/assets/partner.jpg";
import statsShot from "@/assets/stats.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guardian PK — Quiet content blocking for Android" },
      {
        name: "description",
        content:
          "Guardian blocks adult content, distracting apps and reels on Android, with schedules and an accountability partner. Free for users in Pakistan.",
      },
      { property: "og:title", content: "Guardian PK — Quiet content blocking for Android" },
      {
        property: "og:description",
        content:
          "Network-level blocking, on-device AI in six languages, Fortress Mode and an accountability partner. Nothing leaves your phone.",
      },
    ],
  }),
  component: HomePage,
});

// Numeric values are counted up on scroll; the rest render as plain text.
const facts: { n: number | string; decimals?: number; suffix?: string; l: string }[] = [
  { n: 4.6, decimals: 1, suffix: "M+", l: "domains in the local blocklist" },
  { n: 6, l: "languages the on-device AI understands" },
  { n: "On-device", l: "every search classified locally, not on a server" },
  { n: "24/7", l: "quiet, background protection" },
];

const highlights = [
  {
    title: "Fortress Mode",
    body: "Time-locks your own password for a set number of days. It is auto-generated, so you can't recall it in a weak moment.",
    span: "md:col-span-2",
  },
  {
    title: "App Blocker",
    body: "Block chosen apps on a schedule or permanently. The block survives restarts and force-stops.",
    span: "",
  },
  {
    title: "Reels Blocker",
    body: "Strips short-video feeds out of the apps you keep, so a quick check doesn't turn into an hour.",
    span: "",
  },
  {
    title: "Accountability partner",
    body: "Pair with someone you trust. They get a separate partner view showing whether protection is on and any request to change it, never your searches or browsing history.",
    span: "md:col-span-2",
  },
];

function HighlightsGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-3" onMouseLeave={() => setActive(null)}>
      {highlights.map((h, i) => {
        const isActive = active === i;
        const dimmed = active !== null && !isActive;
        return (
          <div
            key={h.title}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={`h-full rounded-[18px] outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-accent ${h.span}`}
            style={{ opacity: dimmed ? 0.4 : 1 }}
          >
            <Reveal
              variant="scale"
              delayMs={i * 80}
              className="bento-tile h-full p-8"
              style={{ borderColor: isActive ? "var(--accent)" : undefined }}
            >
              <span
                className={`font-mono text-[12px] transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-ink-faint"
                }`}
              >
                0{i + 1}
              </span>
              <h3 className="mt-3 text-[21px]">{h.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{h.body}</p>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

function HomePage() {
  return (
    <main>
      {/* HERO */}
      <header className="relative overflow-hidden">
        <GradientMesh variant="hero" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="mt-5 max-w-[18ch] text-balance text-[clamp(36px,4.8vw,56px)] leading-[1.06]">
              The habit you want to quit is the one <em>Guardian is built to stop</em>.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              Guardian filters adult websites and searches, blocks distracting apps and reels, and
              turns protection on by schedule. It understands six languages.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Link to="/download" className="btn-primary">
                  Download for Android
                </Link>
              </MagneticButton>
              <Link to="/" hash="how" className="btn-ghost">
                See how it works
              </Link>
            </div>
          </div>

          <HeroPhones
            phones={[
              {
                src: homeShot,
                alt: "Guardian home screen showing protection active and a clean streak",
              },
              {
                src: partnerShot,
                alt: "Guardian Partner app showing protection status and pending approval requests",
              },
              {
                src: statsShot,
                alt: "Guardian statistics screen showing weekly blocking activity",
              },
            ]}
          />
        </div>
      </header>

      {/* FACTS */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 md:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal
              key={f.l}
              delayMs={i * 80}
              className={`px-6 py-9 text-center ${i % 2 === 0 ? "border-r border-line md:border-r" : ""} ${
                i < 2 ? "border-b border-line md:border-b-0" : ""
              } ${i === 3 ? "md:border-r-0" : ""}`}
            >
              <div className="font-display text-[34px] font-semibold tracking-tight text-accent">
                {typeof f.n === "number" ? (
                  <CountUp to={f.n} decimals={f.decimals ?? 0} suffix={f.suffix ?? ""} />
                ) : (
                  f.n
                )}
              </div>
              <div className="mt-2 text-[14px] leading-snug text-ink-muted">{f.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div id="how" className="scroll-mt-24">
        <HowSection />
      </div>

      {/* FEATURES, PRIVACY, FAQ (same content as their former pages) */}
      <div id="features" className="scroll-mt-24">
        <FeaturesSection />
      </div>
      {/* HIGHLIGHTS */}
      <section className="border-y border-line bg-panel-2">
        <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Built for the harder moments</span>
              <h2 className="mt-5 text-[clamp(26px,3.8vw,38px)]">
                For when a filter alone isn't enough
              </h2>
              <p className="mt-4 text-ink-muted">
                Willpower runs out sometimes. These are the tools Guardian has for exactly that
                moment.
              </p>
            </div>
          </Reveal>
          <HighlightsGrid />
        </div>
      </section>

      <div id="privacy" className="scroll-mt-24">
        <PrivacySection />
      </div>
      {/* BRAND STATEMENT */}
      <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-16">
        <Reveal className="relative overflow-hidden rounded-2xl border border-line px-6 py-10 md:px-12 md:py-12" style={{ background: "var(--panel-2)" }}>
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-10">
            <div className="grid size-14 place-items-center rounded-2xl border border-line bg-panel text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-7" aria-hidden="true"><path d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z"/><path d="M8.5 12.5 11 15l4.5-5"/></svg>
            </div>
            <div>
              <span className="eyebrow">Why we built Guardian</span>
              <blockquote className="mt-3 max-w-3xl text-[clamp(22px,3.2vw,32px)] font-medium leading-snug tracking-tight text-ink">
                “Not to punish a bad day. To make tomorrow a little easier than today.”
              </blockquote>
              <p className="mt-3 text-[13.5px] text-ink-muted">Built for the people doing the work, one day at a time.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <div id="faq" className="scroll-mt-24">
        <FaqSection />
      </div>

      {/* DOWNLOAD CTA */}
      <section className="px-4 pb-16 md:px-8 md:pb-20">
        <div className="relative mx-auto grid max-w-[1180px] overflow-hidden rounded-[20px] border border-white/10 bg-[#071b19] md:min-h-[320px] md:grid-cols-[0.85fr_1.15fr]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 18% 15%, rgba(76,160,112,0.28), transparent 45%), linear-gradient(105deg, #102d27 0%, #071b19 48%, #061311 100%)",
            }}
          />

          {/* Half-visible Guardian phone */}
          <div className="relative min-h-[230px] overflow-hidden md:min-h-[320px]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#071b19]/40" />
            <div className="absolute bottom-[-34%] left-[12%] w-[48%] max-w-[230px] sm:left-[18%] md:bottom-[-43%] md:left-[20%] md:w-[52%]">
              <PhoneMockup
                src={homeShot}
                alt="Guardian app showing protection status"
                rotateY={-7}
                rotateX={2}
                floatDelay="0s"
                floatDuration="7s"
              />
            </div>

            {/* Subtle layered landscape instead of the U-shaped outline */}
            <div className="pointer-events-none absolute inset-x-[-8%] bottom-0 h-[48%] opacity-70">
              <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="guardian-cta-landscape" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2b9a72" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#06221d" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <path d="M0 160 L70 115 L120 142 L205 54 L260 112 L330 30 L400 126 L470 76 L530 130 L600 88 L600 220 L0 220 Z" fill="url(#guardian-cta-landscape)" />
                <path d="M0 176 L70 132 L120 156 L205 70 L260 125 L330 48 L400 140 L470 91 L530 145 L600 105" fill="none" stroke="#55c99a" strokeOpacity="0.32" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Download message — no promotional chip */}
          <Reveal className="relative z-10 flex flex-col justify-center px-6 pb-10 pt-2 md:px-10 md:py-12 lg:px-14">
            <h2 className="max-w-[520px] font-display text-[clamp(28px,3.4vw,42px)] leading-[1.08] tracking-[-0.035em] text-white">
              A calmer mind
              <br />
              is just a download away.
            </h2>

            <p className="mt-4 max-w-[410px] text-[14px] leading-relaxed text-white/65">
              Guardian is free for users in Pakistan. Install it in minutes — no account needed.
            </p>

            <div className="mt-6">
              <MagneticButton>
                <Link
                  to="/download"
                  className="inline-flex min-h-[48px] items-center gap-3 rounded-lg bg-emerald-300 px-5 py-3 text-[13px] font-semibold text-[#062019] transition hover:bg-emerald-200"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[19px] fill-current">
                    <path d="M17.6 9.48 19.44 6.3a.5.5 0 0 0-.87-.5l-1.86 3.22a8.1 8.1 0 0 0-9.42 0L5.43 5.8a.5.5 0 0 0-.87.5L6.4 9.48A7.5 7.5 0 0 0 3 15.2h18a7.5 7.5 0 0 0-3.4-5.72ZM7.5 13a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm9 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8ZM5 16.2h14v4.1a1.7 1.7 0 0 1-1.7 1.7h-.8v-2.3a.8.8 0 0 0-1.6 0V22h-5.8v-2.3a.8.8 0 0 0-1.6 0V22h-.8A1.7 1.7 0 0 1 5 20.3v-4.1ZM3 16.2h1v4.1a2.7 2.7 0 0 0 2.7 2.7h.8v-2.3a.8.8 0 0 1 1.6 0V23h5.8v-2.3a.8.8 0 0 1 1.6 0V23h.8a2.7 2.7 0 0 0 2.7-2.7v-4.1h1a1 1 0 0 0 1-1v-.5H2v.5a1 1 0 0 0 1 1Z" />
                  </svg>
                  Download for Android
                  <span aria-hidden="true" className="ml-2 text-lg">→</span>
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}