import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download Guardian PK for Android" },
      {
        name: "description",
        content:
          "Install Guardian PK on Android 9 and up. Download the signed APK, allow the install, grant VPN and accessibility permissions — protection is running in minutes.",
      },
      { property: "og:title", content: "Download Guardian PK for Android" },
      {
        property: "og:description",
        content:
          "One signed APK, four short steps. Free for users in Pakistan, no account needed, everything stays on your phone.",
      },
    ],
  }),
  component: DownloadPage,
});

const steps = [
  {
    title: "Download the APK",
    body: "Get the signed build straight from this page — no mirrors, no account, no email address.",
  },
  {
    title: "Allow the install",
    body: "Android will ask to allow installs from this source. Grant it for this file, then open the download.",
  },
  {
    title: "Grant VPN + accessibility",
    body: "Guardian walks you through both on first launch. They power the domain filter and the real-time search check. Nothing leaves your phone.",
  },
  {
    title: "Set your password",
    body: "Choose a strong one — or hand it to a trusted partner. That single choice is what makes Fortress Mode work.",
  },
];

const specs = [
  ["Android", "9.0+"],
  ["Size", "~48 MB"],
  ["Permissions", "VPN · Accessibility"],
  ["Account", "Not required"],
  ["Price", "Free in Pakistan"],
];

function DownloadPage() {
  return (
    <main>
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[400px]"
          style={{
            background:
              "radial-gradient(circle 440px at 30% 40%, color-mix(in oklab, var(--violet) 20%, transparent), transparent 70%), radial-gradient(circle 400px at 75% 30%, color-mix(in oklab, var(--cyan) 16%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <span className="eyebrow">Install</span>
            <h1 className="mt-5 max-w-2xl text-[clamp(34px,5.4vw,54px)]">
              Set up in <em className="text-cyan">under two minutes</em>.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
              Guardian is an Android app that runs a local VPN and an on-device checker. There is no
              sign-up, and nothing is uploaded.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
            <ol className="space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.title} variant="left" delayMs={i * 90}>
                  <li className="panel-card flex gap-5 p-6">
                    <span className="font-mono text-[13px] text-cyan">0{i + 1}</span>
                    <div>
                      <h2 className="text-[19px]">{s.title}</h2>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal variant="scale" delayMs={150} className="h-fit lg:sticky lg:top-24">
              <div className="panel-card p-7">
                <div className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
                  At a glance
                </div>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {specs.map(([k, v]) => (
                    <li key={k} className="flex justify-between py-2.5 text-[14.5px]">
                      <span className="text-ink-muted">{k}</span>
                      <span className="text-ink">{v}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="btn-primary mt-6 w-full">
                  Download Guardian PK (APK)
                </a>
                <p className="mt-3 text-center font-mono text-[11.5px] text-ink-faint">
                  Signed build · check the publisher prompt on install
                </p>
                <Link to="/privacy" className="btn-ghost mt-3 w-full">
                  What it can access
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="border-t border-line" style={{ background: "var(--panel-2)" }}>
        <Reveal className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8">
          <h2 className="text-[clamp(24px,3.4vw,34px)]">Stuck on a step?</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            The FAQ covers permissions, forgotten passwords and Fortress Mode. Real people answer,
            in English or Urdu.
          </p>
          <Link to="/faq" className="btn-ghost mt-7">
            Read the FAQ
          </Link>
        </Reveal>
      </section>
    </main>
  );
}