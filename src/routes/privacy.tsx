import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Guardian PK keeps everything on your phone" },
      {
        name: "description",
        content:
          "Guardian filters and classifies on-device. No browsing history, no search content, no accounts required. Here is exactly what stays on your phone and what a partner can see.",
      },
      { property: "og:title", content: "Privacy — Guardian PK keeps everything on your phone" },
      {
        property: "og:description",
        content:
          "No browsing history collected, no search content uploaded, no ads, no selling data. Filtering runs locally.",
      },
    ],
  }),
  component: PrivacyPage,
});

const onPhone = [
  "Your browsing and search history",
  "The AI model that classifies searches",
  "The 4.6M domain blocklist",
  "Your password, decoy password and Fortress lock",
  "Streaks, blocked-attempt counts and activity times",
];

const neverLeaves = [
  "No search text is uploaded, ever",
  "No browsing history is stored on a server",
  "No ads, no trackers, no analytics on your activity",
  "No account required for core protection",
  "Nothing sold or shared with third parties",
];

const partnerSees = [
  { yes: true, t: "Whether protection is currently on" },
  { yes: true, t: "Requests to disable or change protection" },
  { yes: true, t: "Tamper or uninstall attempts" },
  { yes: false, t: "The sites you visit" },
  { yes: false, t: "What you searched for" },
  { yes: false, t: "Anything typed inside other apps" },
];

function PrivacyPage() {
  return (
    <main>
      <header className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <span className="eyebrow">Privacy</span>
        <h1 className="mt-5 max-w-2xl text-[clamp(34px,5.4vw,54px)]">
          The safest place for your data is <em className="text-cyan">your phone</em>.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          A tool that reads what you search has to earn trust. Guardian does it the only honest way:
          by never sending it anywhere.
        </p>
      </header>

      <div className="border-y border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-6 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <Reveal variant="left" className="panel-card p-8">
            <h2 className="text-[22px]">Stays on your phone</h2>
            <ul className="mt-5 space-y-3">
              {onPhone.map((t) => (
                <li key={t} className="flex gap-3 text-[14.5px] text-ink-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="right" delayMs={100} className="panel-card p-8">
            <h2 className="text-[22px]">Never happens</h2>
            <ul className="mt-5 space-y-3">
              {neverLeaves.map((t) => (
                <li key={t} className="flex gap-3 text-[14.5px] text-ink-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Accountability partner</span>
          <h2 className="mt-5 text-[clamp(26px,3.8vw,38px)]">What a partner can and can't see</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {partnerSees.map((r, i) => (
            <Reveal key={r.t} delayMs={Math.min(i * 40, 240)}>
              <div className="flex items-center gap-4 py-4">
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-full font-mono text-[12px]"
                  style={{
                    background: r.yes ? "var(--tint-cyan)" : "var(--tint-violet)",
                    color: r.yes ? "var(--cyan)" : "var(--ink-faint)",
                  }}
                >
                  {r.yes ? "✓" : "—"}
                </span>
                <span className={r.yes ? "text-[15px] text-ink" : "text-[15px] text-ink-muted"}>
                  {r.t}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal variant="blur">
              <h3 className="text-[19px]">Why a VPN permission?</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                Android only allows domain filtering through a local VPN. It runs entirely on your
                phone — no traffic is routed through us, because there is no server to route it to.
              </p>
            </Reveal>
            <Reveal variant="blur" delayMs={90}>
              <h3 className="text-[19px]">Why accessibility access?</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                It lets Guardian read the address bar and search field in real time so it can block
                a page before it renders. The text is checked on-device and discarded immediately.
              </p>
            </Reveal>
            <Reveal variant="blur" delayMs={180}>
              <h3 className="text-[19px]">Questions?</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                We answer in English or Urdu, usually within a day.
              </p>
              <Link to="/faq" className="btn-ghost mt-4">
                Read the FAQ
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}