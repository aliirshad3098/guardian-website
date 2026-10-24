import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CountUp } from "@/components/CountUp";
import { PipelineDiagram } from "@/components/PipelineDiagram";
import { Globe, Brain, ShieldCheck, Timer, EyeOff, ShieldAlert } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";

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

const stages = [
  {
    n: "01",
    tag: "Network",
    icon: Globe,
    title: "VPN-level filtering",
    body: "A lightweight, on-device VPN checks every site your browser tries to reach against 4.6 million known domains before the page ever loads. No traffic leaves your phone to do this.",
  },
  {
    n: "02",
    tag: "Understanding",
    icon: Brain,
    title: "On-device AI",
    body: "If a search slips past the domain list, a model trained on English, Roman Urdu, Urdu, Chinese, Bengali and Hindi search patterns catches it — without ever sending the search to a server.",
  },
  {
    n: "03",
    tag: "Support",
    icon: ShieldCheck,
    title: "Accountability partner",
    body: "If protection is turned off, an optional trusted partner is notified. They see your protection status, never your browsing history or search content.",
  },
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
      <header className="hero-sky relative mx-3 mt-3 overflow-hidden rounded-[28px] md:mx-6 md:mt-6">
        <div className="relative mx-auto max-w-[1000px] px-5 pt-16 text-center md:pt-24">
          <span className="eyebrow">Android · Made in Pakistan</span>
          <h1 className="mx-auto mt-5 max-w-[20ch] text-balance text-[clamp(38px,5.6vw,64px)] leading-[1.04] tracking-[-0.03em]">
            The habit you want to quit is the one <em>Guardian is built to stop</em>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
            Guardian filters adult websites and searches, blocks distracting apps and reels, and
            turns protection on by schedule. It understands six languages.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton>
              <Link
                to="/download"
                className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-bg transition-transform hover:-translate-y-px"
              >
                Download for Android
              </Link>
            </MagneticButton>
            <Link to="/" hash="how" className="btn-ghost">
              See how it works
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-ink-faint">
            Free for users in Pakistan. Core protection works without an account.
          </p>
        </div>

        <div className="relative mx-auto mt-16 h-[440px] max-w-[900px] md:h-[460px]">
          <div className="absolute left-[22%] top-[18%] z-10 w-[190px] md:w-[200px]">
            <PhoneMockup src={partnerShot} alt="Guardian Partner app showing protection status and pending approval requests" rotateY={8} rotateX={3} floatDelay="1.6s" floatDuration="7s" />
          </div>
          <div className="absolute right-[22%] top-[18%] z-10 w-[190px] md:w-[200px]">
            <PhoneMockup src={statsShot} alt="Guardian statistics screen showing weekly blocking activity" rotateY={-8} rotateX={3} floatDelay="0.8s" floatDuration="6.5s" />
          </div>
          <div className="absolute left-1/2 top-0 z-20 w-[220px] -translate-x-1/2 md:w-[230px]">
            <PhoneMockup src={homeShot} alt="Guardian home screen showing protection active and a clean streak" rotateY={0} rotateX={3} floatDelay="0s" floatDuration="6s" />
          </div>
          <div className="absolute left-0 top-[30%] hidden items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel px-4 py-2.5 text-[13.5px] font-medium text-ink shadow-[0_16px_36px_-18px_rgba(15,40,80,0.35)] md:flex">
            <Timer className="size-4 text-accent" strokeWidth={2} aria-hidden />
            Urge-surfing timer
          </div>
          <div className="absolute left-6 top-[56%] hidden items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel px-4 py-2.5 text-[13.5px] font-medium text-ink shadow-[0_16px_36px_-18px_rgba(15,40,80,0.35)] md:flex">
            <EyeOff className="size-4 text-accent" strokeWidth={2} aria-hidden />
            Decoy password
          </div>
          <div className="absolute right-0 top-[30%] hidden items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel px-4 py-2.5 text-[13.5px] font-medium text-ink shadow-[0_16px_36px_-18px_rgba(15,40,80,0.35)] md:flex">
            <Brain className="size-4 text-accent" strokeWidth={2} aria-hidden />
            On-device AI
          </div>
          <div className="absolute right-6 top-[56%] hidden items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel px-4 py-2.5 text-[13.5px] font-medium text-ink shadow-[0_16px_36px_-18px_rgba(15,40,80,0.35)] md:flex">
            <ShieldAlert className="size-4 text-accent" strokeWidth={2} aria-hidden />
            Tamper resistance
          </div>
        </div>
      </header>

      {/* FACTS */}
      <section className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="float-card grid grid-cols-2 md:grid-cols-4">
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
      <section id="how" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 text-[clamp(30px,4.2vw,44px)]">What happens to every search</h2>
            <p className="mt-4 text-ink-muted">
              Not three features bolted together. A single path a search travels through, in order,
              before anything ever loads.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={120} className="mt-20">
          <PipelineDiagram steps={stages} />
        </Reveal>
      </section>

      {/* HIGHLIGHTS */}
      <section className="px-4 md:px-8">
        <div className="float-card mx-auto max-w-[1180px] px-6 py-20 md:px-12 md:py-24">
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
          <div className="mt-10 text-center">
            <Link to="/features" className="btn-ghost">
              See every feature
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
        <Reveal>
          <span className="eyebrow">Why we built this</span>
          <blockquote className="mt-6 text-[clamp(24px,3.4vw,34px)] font-medium leading-snug tracking-tight text-ink">
            “Guardian isn't here to punish a bad day. It's here so tomorrow is a little easier than
            today was.”
          </blockquote>
          <p className="mt-6 text-[14.5px] text-ink-muted">
            Built for the people actually trying, not the people watching them
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1180px] px-5 pb-24 md:px-8">
        <Reveal className="relative overflow-hidden rounded-[24px] bg-accent px-6 py-16 text-center text-white">
          <h2 className="text-[clamp(28px,4vw,40px)] text-white">Start your first clean day.</h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">
            Guardian is free for users in Pakistan. Install it in under two minutes — no account
            needed.
          </p>
          <MagneticButton className="mt-8">
            <Link to="/download" className="btn-primary bg-white !text-accent hover:bg-white/90">
              Download for Android
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </main>
  );
}