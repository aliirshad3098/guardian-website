import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

import fortressShot from "@/assets/fortress.jpg";
import pairingShot from "@/assets/pairing.jpg";
import BlockerShot from "@/assets/blocker.jpg";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Guardian PK for Android" },
      {
        name: "description",
        content:
          "Fortress Mode, accountability partner, app blocker, reels blocker, urge-surfing timer, decoy password and on-device AI in English, Roman Urdu and Urdu.",
      },
      { property: "og:title", content: "Features — Guardian PK for Android" },
      {
        property: "og:description",
        content:
          "Every tool Guardian gives you: network filtering, on-device AI, Fortress Mode, partner support and focus blockers.",
      },
    ],
  }),
  component: FeaturesPage,
});

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
  },
];

const grid = [
  {
    title: "On-device AI",
    body: "Search intent classified locally in English, Roman Urdu and Urdu. Nothing is uploaded.",
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

function FeaturesPage() {
  return (
    <main>
      <header className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <span className="eyebrow">Features</span>
          <h1 className="mt-5 max-w-2xl text-[clamp(34px,5.4vw,54px)]">
            Everything Guardian does, in <em className="text-cyan">plain language</em>.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
            Protection you can rely on when motivation is low — and privacy you don't have to trade
            away to get it.
          </p>
        </Reveal>
      </header>

      <div className="border-y border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <div className="space-y-16 md:space-y-24">
            {sections.map((s) => (
              <Reveal
                key={s.title}
                variant={s.reverse ? "right" : "left"}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
              >
                <div className={s.reverse ? "md:order-2" : undefined}>
                  <span className="eyebrow">{s.eyebrow}</span>
                  <h2 className="mt-4 text-[clamp(26px,3.6vw,36px)]">{s.title}</h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">{s.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[14.5px] text-ink-muted">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`mx-auto w-full max-w-[300px] ${s.reverse ? "md:order-1" : ""}`}>
                  <div className="shot-frame">
                    <img src={s.image} alt={s.alt} loading="lazy" className="block w-full" />
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
            <Reveal key={g.title} variant="scale" delayMs={i * 60} className="panel-card p-7">
              <h3 className="text-[19px]">{g.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{g.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/download" className="btn-primary">
            Download for Android
          </Link>
          <Link to="/privacy" className="btn-ghost">
            How privacy works
          </Link>
        </div>
      </section>
    </main>
  );
}