import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download Guardian PK for Android" },
      {
        name: "description",
        content:
          "Install Guardian PK on Android 9 and up. Download the full app, AI model, VPN block list and partner app, then grant the permissions that keep protection running.",
      },
      { property: "og:title", content: "Download Guardian PK for Android" },
      {
        property: "og:description",
        content:
          "Full app 120 MB, AI model 50 MB, block list 10 MB, partner app 20 MB. Free in Pakistan, no account needed.",
      },
    ],
  }),
  component: DownloadPage,
});

const permissions = [
  {
    name: "Accessibility",
    tag: "Most important",
    body: "The AI model runs on top of this permission. Bypass protection also depends on it, so every other setting stays locked. Without it, the AI model does not work.",
  },
  {
    name: "Usage Access",
    tag: "Required",
    body: "Lets Guardian see which app is open. Blocked apps get blocked, and timed apps are blocked during their set hours and then allowed again.",
  },
  {
    name: "Display over other apps",
    tag: "Required",
    body: "Lets Guardian show the block screen on top of other apps, so the block is visible the moment you open one.",
  },
  {
    name: "Device Admin",
    tag: "Required",
    body: "Gives Guardian uninstall protection. The app cannot be removed easily, even by a force-stop or reinstall attempt.",
  },
  {
    name: "VPN",
    tag: "Required",
    body: "Runs the local domain filter that blocks adult and distracting websites. Traffic is not sent anywhere.",
  },
  {
    name: "Notifications",
    tag: "Recommended",
    body: "Lets you hear about blocks, partner requests and streak milestones right away.",
  },
];

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
    title: "Grant the permissions",
    body: "Guardian walks you through each permission on first launch. Accessibility is the most important one, because the AI model and bypass protection depend on it.",
  },
  {
    title: "Set your password",
    body: "Choose a strong one — or hand it to a trusted partner. That single choice is what makes Fortress Mode work.",
  },
];

const specs = [
  ["Android", "9.0+"],
  ["Size", "120 MB (full app)"],
  ["Account", "Not required"],
  ["Price", "Free in Pakistan"],
];

function DownloadPage() {
  return (
    <main>
      <div className="relative overflow-hidden">
        <div aria-hidden className="grid-bg" />
        <div className="relative mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <span className="eyebrow">Install</span>
            <h1 className="mt-5 max-w-2xl text-[clamp(34px,5.4vw,54px)]">
              Set up in <em className="text-accent">under two minutes</em>.
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
                    <span className="font-mono text-[13px] text-accent">0{i + 1}</span>
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
                  Download full app (120 MB)
                </a>
                <p className="mt-3 text-center font-mono text-[11.5px] text-ink-faint">
                  Signed build · check the publisher prompt on install
                </p>
                <Link to="/" hash="privacy" className="btn-ghost mt-3 w-full">
                  What it can access
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <main className="border-t border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <span className="eyebrow">Permissions</span>
            <h2 className="mt-4 text-[clamp(26px,3.6vw,36px)]">Permissions, clearly explained</h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
              A quick overview of the access Android asks you to enable. These controls help Guardian block apps and websites on your device.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Required permissions overview">
            {permissions.map((p) => (
              <span key={p.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-background/60 px-3.5 py-2 text-[13px] text-ink-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {p.name === "Display over other apps" ? "Overlay" : p.name}
              </span>
            ))}
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {permissions.map((p, i) => (
              <Reveal key={p.name} variant="left" delayMs={i * 55}>
                <div className="panel-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-background font-mono text-[12px] text-accent">
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="text-[16px] leading-snug">{p.name}</h3>
                      <span className="mt-2 inline-flex rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <main className="border-t border-line" style={{ background: "var(--panel-2)" }}>
        <Reveal className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8">
          <h2 className="text-[clamp(24px,3.4vw,34px)]">Stuck on a step?</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            The FAQ covers permissions, forgotten passwords and Fortress Mode. Real people answer,
            in English or Urdu.
          </p>
          <Link to="/" hash="faq" className="btn-ghost mt-7">
            Read the FAQ
          </Link>
        </Reveal>
      </main>
    </main>
  );
}