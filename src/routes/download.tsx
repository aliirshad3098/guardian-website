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

const downloads = [
  {
    name: "Guardian PK (full app)",
    size: "120 MB",
    note: "Install this first. It runs the content filter and protection.",
  },
  {
    name: "AI model",
    size: "50 MB",
    note: "On-device checker that reads search intent. Runs locally, nothing uploaded.",
  },
  {
    name: "VPN block list",
    size: "10 MB",
    note: "The domain blocklist, stored on your phone so it works offline.",
  },
  {
    name: "Partner app",
    size: "20 MB",
    note: "For your accountability partner's phone. Shows status and approval requests.",
  },
];

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
  ["Permissions", "Accessibility · Usage Access · Overlay · Device Admin · VPN · Notifications"],
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
                  Download full app (120 MB)
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

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <span className="eyebrow">Downloads</span>
            <h2 className="mt-4 text-[clamp(26px,3.6vw,36px)]">Four files, one setup</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {downloads.map((d, i) => (
              <Reveal key={d.name} variant="left" delayMs={i * 80}>
                <div className="panel-card flex h-full flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[18px]">{d.name}</h3>
                    <span className="font-mono text-[13px] text-cyan">{d.size}</span>
                  </div>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{d.note}</p>
                  <a href="#" className="btn-ghost mt-5 w-full">
                    Download
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <span className="eyebrow">Permissions</span>
            <h2 className="mt-4 text-[clamp(26px,3.6vw,36px)]">What each permission does</h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
              Guardian needs these to work. Each one is explained in plain language, and none of them
              send your activity anywhere.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {permissions.map((p, i) => (
              <Reveal key={p.name} variant="left" delayMs={i * 60}>
                <div className="panel-card h-full p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[18px]">{p.name}</h3>
                    <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-cyan">
                      {p.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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