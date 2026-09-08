import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
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
          "Guardian blocks adult content before it loads, understands English, Roman Urdu and Urdu, and keeps everything on your phone. Free for users in Pakistan.",
      },
      { property: "og:title", content: "Guardian PK — Quiet content blocking for Android" },
      {
        property: "og:description",
        content:
          "Network-level blocking, on-device AI in three languages, Fortress Mode and an accountability partner. Nothing leaves your phone.",
      },
    ],
  }),
  component: HomePage,
});

const facts = [
  { n: "4.6M+", l: "domains in the local blocklist" },
  { n: "3", l: "languages the on-device AI understands" },
  { n: "On-device", l: "every search classified locally, not on a server" },
  { n: "24/7", l: "quiet, background protection" },
];

const stages = [
  {
    tag: "Network",
    title: "VPN-level filtering",
    body: "A lightweight, on-device VPN checks every site your browser tries to reach against 4.6 million known domains before the page ever loads. No traffic leaves your phone to do this.",
  },
  {
    tag: "Understanding",
    title: "On-device AI",
    body: "If a search slips past the domain list, a model trained on English, Roman Urdu and Urdu search patterns catches it — without ever sending the search to a server.",
  },
  {
    tag: "Support",
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
    title: "Urge-surfing timer",
    body: "A guided pause that rides out the spike instead of fighting it. Most urges pass in minutes.",
    span: "md:col-span-2",
  },
];

function PhoneShot({
  src,
  alt,
  wrapperClassName,
  zIndexClassName,
  tiltClassName = "",
  interactive = true,
  floatDelay = "0s",
  floatDuration = "6s",
}: {
  src: string;
  alt: string;
  wrapperClassName: string;
  zIndexClassName: string;
  tiltClassName?: string;
  interactive?: boolean;
  floatDelay?: string;
  floatDuration?: string;
}) {
  return (
    <div
      className={`absolute ${zIndexClassName} ${wrapperClassName} ${
        interactive ? "hover:z-50" : ""
      }`}
    >
      <div
        className={`relative transition-transform duration-500 ease-out ${tiltClassName} ${
          interactive ? "hover:rotate-0" : ""
        }`}
      >
        <div
          className={`shot-frame float-shot transition-[transform,box-shadow] duration-500 ease-out ${
            interactive
              ? "cursor-pointer hover:[animation:none] hover:-translate-y-3 hover:scale-[1.12] hover:shadow-[0_45px_100px_-30px_rgba(0,0,0,0.55)]"
              : ""
          }`}
          style={{ animationDelay: floatDelay, animationDuration: floatDuration }}
        >
          <img src={src} alt={alt} loading="lazy" className="block w-full" />
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <main>
      {/* HERO */}
      <header className="relative overflow-hidden">
        <GradientMesh variant="hero" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="eyebrow">Built in Pakistan, for Pakistan</span>
            <h1 className="mt-5 text-[clamp(38px,6vw,60px)]">
              For the moments
              <br />
              willpower <em className="text-cyan">isn't enough</em>.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              Guardian blocks adult content before it loads. It understands what you're actually
              searching for in English, Roman Urdu or Urdu, and never sends what it reads off your
              phone.
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
            <p className="mt-5 font-mono text-[12.5px] text-ink-faint">
              Free for users in Pakistan. Private by default. No account required for core
              protection.
            </p>
          </div>

          <div className="relative mx-auto h-[520px] w-full max-w-[440px] sm:h-[580px] sm:max-w-[480px]">
            <PhoneShot
              src={partnerShot}
              alt="Guardian Partner app showing protection status and pending approval requests"
              wrapperClassName="bottom-0 right-0 w-[52%]"
              zIndexClassName="z-[1]"
              tiltClassName="rotate-[3deg]"
              floatDelay="2.4s"
              floatDuration="6.5s"
            />
            <PhoneShot
              src={homeShot}
              alt="Guardian home screen showing protection active and a clean streak"
              wrapperClassName="bottom-0 left-0 w-[50%]"
              zIndexClassName="z-[2]"
              tiltClassName="-rotate-[3deg]"
              floatDelay="0s"
            />
            <PhoneShot
              src={statsShot}
              alt="Guardian statistics screen showing weekly blocking activity"
              wrapperClassName="bottom-0 left-1/2 w-[54%] -translate-x-1/2"
              zIndexClassName="z-[3]"
              interactive={false}
              floatDelay="1.2s"
              floatDuration="7s"
            />
          </div>
        </div>
      </header>

      {/* FACTS */}
      <div className="border-y border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 divide-line px-5 md:grid-cols-4 md:divide-x md:px-8">
          {facts.map((f, i) => (
            <Reveal key={f.n} variant="blur" delayMs={i * 70} className="px-2 py-8 text-center">
              <div className="font-display text-[30px] text-cyan">{f.n}</div>
              <div className="mt-1.5 text-[13.5px] text-ink-muted">{f.l}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-5 text-[clamp(28px,4.2vw,42px)]">What happens to every search</h2>
            <p className="mt-4 text-ink-muted">
              Not three features bolted together. A single path a search travels through, in order,
              before anything ever loads.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {stages.map((s, i) => (
              <li key={s.title} className="bento-tile p-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] text-ink-faint">0{i + 1}</span>
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-cyan">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-3 text-[21px]">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* HIGHLIGHTS */}
      <section className="border-y border-line" style={{ background: "var(--panel-2)" }}>
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
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal
                key={h.title}
                variant="scale"
                delayMs={i * 80}
                className={`bento-tile p-8 ${h.span}`}
              >
                <span className="font-mono text-[12px] text-ink-faint">0{i + 1}</span>
                <h3 className="mt-3 text-[21px]">{h.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{h.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/features" className="btn-ghost">
              See every feature
            </Link>
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
          className="rounded-[22px] border border-line px-6 py-16 text-center"
          style={{
            background:
              "linear-gradient(140deg, color-mix(in oklab, var(--violet) 16%, var(--panel)), color-mix(in oklab, var(--cyan) 12%, var(--panel)))",
          }}
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