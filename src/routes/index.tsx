import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { GradientMesh } from "@/components/GradientMesh";

import homeShot from "@/assets/home.jpg";
import fortressShot from "@/assets/fortress.jpg";
import blockerShot from "@/assets/blocker.jpg";
import partnerShot from "@/assets/partner.jpg";
import statsShot from "@/assets/stats.jpg";
import { PhoneMockup } from "@/components/PhoneMockup";
import { BrainCircuit, Globe2, ShieldCheck, Cpu, Wifi, Languages } from "lucide-react";

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

const facts = [
  { n: "4.6M+", l: "domains on-device" },
  { n: "6", l: "languages supported" },
  { n: "On-device", l: "search classification" },
  { n: "Offline", l: "domain filtering continues" },
];

const stages = [
  {
    tag: "Network",
    title: "VPN-level filtering",
    body: "Known domains are checked on your phone before the site loads.",
  },
  {
    tag: "Understanding",
    title: "On-device AI",
    body: "Searches are classified locally in Urdu, Roman Urdu, English, Chinese, Bengali and Hindi.",
  },
  {
    tag: "Support",
    title: "Accountability partner",
    body: "A trusted partner can see protection status — never browsing history.",
  },
];

const highlights = [
  {
    title: "Fortress Mode",
    body: "Create a time lock that helps protect the commitment you made to yourself.",
    image: fortressShot,
    alt: "Guardian Fortress Mode interface",
    span: "",
  },
  {
    title: "App Blocker",
    body: "Choose the apps you want to limit, then block them on your terms.",
    image: blockerShot,
    alt: "Guardian app blocker interface",
    span: "",
  },
  {
    title: "Accountability",
    body: "Bring a trusted person into your plan without sharing private browsing activity.",
    image: partnerShot,
    alt: "Guardian accountability partner interface",
    span: "",
  },
];

function HomePage() {
  return (
    <main>
      {/* HERO */}
      <header className="relative overflow-hidden">
        <GradientMesh variant="hero" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="mt-5 max-w-[17ch] text-balance text-[clamp(34px,4.4vw,50px)] leading-[1.12]">
              The habit you want to quit is the one{" "}
              <em className="text-cyan">Guardian is built to stop</em>.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              Guardian filters adult websites and searches, blocks distracting apps and reels, and
              turns protection on by schedule. Its AI classifies search queries in Urdu, Roman Urdu, English, Chinese, Bengali and Hindi.
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

          <div className="relative mx-auto h-[500px] w-full max-w-[480px] sm:h-[580px]">
            {/* Left: accountability partner app */}
            <div className="absolute left-0 top-[16%] z-10 w-[44%]">
              <PhoneMockup
                src={partnerShot}
                alt="Guardian Partner app showing protection status and pending approval requests"
                rotateY={8}
                rotateX={3}
                floatDelay="1.6s"
                floatDuration="7s"
                chips={[{ label: "Partner linked", className: "-right-6 bottom-[18%]" }]}
              />
            </div>
            {/* Right: weekly activity */}
            <div className="absolute right-0 top-[16%] z-10 w-[44%]">
              <PhoneMockup
                src={statsShot}
                alt="Guardian statistics screen showing weekly blocking activity"
                rotateY={-8}
                rotateX={3}
                floatDelay="0.8s"
                floatDuration="6.5s"
                chips={[{ label: "Reels blocked", className: "-left-8 top-[14%]" }]}
              />
            </div>
            {/* Centre: Guardian home app */}
            <div className="absolute left-1/2 top-0 z-20 w-[50%] -translate-x-1/2">
              <PhoneMockup
                src={homeShot}
                alt="Guardian home screen showing protection status and a clean streak"
                rotateY={0}
                rotateX={3}
                floatDelay="0s"
                floatDuration="6s"
              />
            </div>
          </div>
        </div>
      </header>

      {/* FACTS */}
      <div className="float-card relative z-10 mx-4 -mt-12 md:mx-auto md:max-w-[1180px]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 divide-line px-5 md:grid-cols-4 md:divide-x md:px-8">
          {facts.map((f, i) => (
            <Reveal key={f.n} variant="blur" delayMs={i * 70} className="px-2 py-8 text-center">
              <div className="font-display text-[30px] text-cyan">{f.n}</div>
              <div className="mt-1.5 text-[13.5px] text-ink-muted">{f.l}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* PRODUCT SHOWCASE: PROTECTION */}
      <section id="how" className="showcase-section mx-auto max-w-[1180px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
        <div className="showcase-grid">
          <Reveal className="showcase-copy">
            <span className="showcase-kicker">Key features</span>
            <h2>Complete protection.<br />In your hands.</h2>
            <p>
              Guardian PK combines on-device AI, DNS filtering and smart blocking to help keep
              harmful content away — before it reaches you.
            </p>
            <div className="protection-points">
              <div><span className="point-icon"><BrainCircuit size={19} /></span><span>AI classification<br /><small>In real time</small></span></div>
              <div><span className="point-icon"><Globe2 size={19} /></span><span>DNS VPN<br /><small>Filtering</small></span></div>
              <div><span className="point-icon"><Wifi size={19} /></span><span>Works offline<br /><small>Private & secure</small></span></div>
            </div>
          </Reveal>
          <Reveal delayMs={100} className="protection-visual">
            <div className="protection-orbit" aria-hidden="true" />
            <div className="protection-phone">
              <PhoneMockup src={homeShot} alt="Guardian home screen showing the app's protection controls" rotateY={-5} rotateX={2} floatDuration="7s" />
            </div>
            <div className="protection-label protection-label-ai"><span><BrainCircuit size={20} /></span><div><strong>AI classification</strong><small>6 languages</small></div></div>
            <div className="protection-label protection-label-dns"><span><Globe2 size={20} /></span><div><strong>DNS VPN</strong><small>Filtering</small></div></div>
            <div className="protection-label protection-label-device"><span><Cpu size={20} /></span><div><strong>On-device</strong><small>Processing</small></div></div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT SHOWCASE: MULTILINGUAL CLASSIFICATION */}
      <section className="language-section">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="language-grid">
            <Reveal className="language-copy">
              <span className="showcase-kicker">AI classification</span>
              <h2>Smart filtering with<br />6 languages.</h2>
              <p>
                Guardian's on-device AI classifies search queries across six languages, helping
                protection work with the way people actually search.
              </p>
              <div className="language-pills" aria-label="Supported languages">
                {['Urdu', 'Roman Urdu', 'English', 'Chinese', 'Bengali', 'Hindi'].map((language) => (
                  <span key={language}>{language}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delayMs={100} className="classification-visual">
              <div className="classification-halo" aria-hidden="true" />
              <div className="classification-phone">
                <div className="classification-topbar"><span>9:41</span><span>Guardian PK</span><span>•••</span></div>
                <div className="classification-title"><Languages size={17} /><strong>Content classification</strong></div>
                <div className="classification-tabs"><span>Safe</span><span>Adult</span><span>Blocked</span></div>
                <div className="classification-row"><span className="classification-mark safe">ع</span><div><strong>Urdu content</strong><small>Classified on device</small></div><span className="classification-status" /></div>
                <div className="classification-row"><span className="classification-mark safe">En</span><div><strong>English content</strong><small>Classified on device</small></div><span className="classification-status" /></div>
                <div className="classification-row"><span className="classification-mark safe">Ro</span><div><strong>Roman Urdu</strong><small>Classified on device</small></div><span className="classification-status" /></div>
                <div className="classification-row"><span className="classification-mark blocked">!</span><div><strong>Adult content</strong><small>Blocked by protection</small></div><span className="classification-status blocked-status" /></div>
                <div className="classification-private"><ShieldCheck size={15} /><span>Processed locally on your device</span></div>
              </div>
              <div className="classification-note"><strong>Better detection.</strong><br />Safer browsing.</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative overflow-hidden py-24">
        <GradientMesh variant="section" />
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <span className="eyebrow">Why we built this</span>
          <blockquote className="mt-6 font-display text-[clamp(24px,3.6vw,36px)] italic leading-tight">
            "Guardian isn't here to punish a bad day. It's here so tomorrow is a little easier than
            today was."
          </blockquote>
          <p className="mt-6 font-mono text-[12.5px] text-ink-muted">
            Built for the people actually trying, not the people watching them
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1180px] px-5 pb-24 md:px-8">
        <Reveal
          className="cta-panel rounded-[18px] px-6 py-16 text-center"
        >
          <h2 className="text-[clamp(26px,4vw,40px)]">Start your first clean day.</h2>
          <p className="mx-auto mt-4 max-w-md text-ink-muted">
            Guardian is free for users in Pakistan. Install it in under two minutes — no account
            needed.
          </p>
          <MagneticButton className="mt-8">
            <Link to="/download" className="btn-primary">
              Download for Android
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </main>
  );
}