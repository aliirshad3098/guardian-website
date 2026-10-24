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

export function FeaturesSection() {
  return (
    <section>
      <header className="mx-auto max-w-[1180px] px-5 pb-12 pt-20 text-center md:px-8 md:pb-16 md:pt-28">
        <Reveal>
          <span className="eyebrow">Features</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(34px,5.4vw,56px)] leading-[1.08]">
            Protection that holds when motivation runs low, <em>with privacy intact</em>.
          </h1>
        </Reveal>
      </header>

      <div className="relative z-10 mx-4 -mt-12 md:mx-auto md:max-w-[1180px]">
        <div className="float-card px-5 py-16 md:px-12 md:py-24">
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
                  <ul className="mt-6 w-fit space-y-2.5 text-left">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[14.5px] text-ink-muted">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
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