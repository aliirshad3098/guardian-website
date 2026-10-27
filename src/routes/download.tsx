
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download Guardian PK for Android" },
      {
        name: "description",
        content:
          "Download Guardian PK for Android 9 and above. Install the app and configure the permissions required for your protection settings.",
      },
      { property: "og:title", content: "Download Guardian PK for Android" },
      {
        property: "og:description",
        content:
          "Install Guardian PK on Android. No account required. Free in Pakistan.",
      },
    ],
  }),
  component: DownloadPage,
});

const permissions = [
  {
    name: "Accessibility",
    tag: "Core protection",
    body:
      "Supports on-device content detection and the app's applicable bypass-prevention controls.",
  },
  {
    name: "Usage Access",
    tag: "App control",
    body:
      "Identifies the foreground app so Guardian can apply your app-blocking and scheduled usage rules.",
  },
  {
    name: "Display over other apps",
    tag: "Block screen",
    body:
      "Allows Guardian to display its blocking screen over other apps when a blocking rule is triggered.",
  },
  {
    name: "Device Admin",
    tag: "Device security",
    body:
      "Enables the device-administrator capabilities implemented by Guardian. It does not make uninstalling impossible.",
  },
  {
    name: "VPN",
    tag: "Website filtering",
    body:
      "Applies Guardian's local domain-filtering rules to help block restricted websites.",
  },
  {
    name: "Notifications",
    tag: "Alerts",
    body:
      "Provides notifications for supported protection events, partner requests and streak milestones.",
  },
];

const steps = [
  {
    number: "01",
    title: "Install Guardian PK",
    body:
      "Download the APK and open it. If Android requests permission to install apps from your browser, allow it for this installation.",
  },
  {
    number: "02",
    title: "Configure permissions",
    body:
      "Follow the in-app setup and enable the permissions needed for your chosen protection features.",
  },
  {
    number: "03",
    title: "Secure your settings",
    body:
      "Create a strong password and configure your blocking rules. Set up a trusted partner if you use accountability features.",
  },
];

const specs = [
  { label: "Platform", value: "Android" },
  { label: "Minimum version", value: "Android 9+" },
  { label: "App size", value: "120 MB" },
  { label: "Account", value: "Not required" },
  { label: "Availability", value: "Free in Pakistan" },
];

function DownloadPage() {
  return (
    <main>
      {/* Download hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-bg" />

        <div className="relative mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              GUARDIAN PK / ANDROID
            </p>

            <h1 className="mt-5 max-w-3xl text-[clamp(36px,5.4vw,58px)] leading-[1.08]">
              Get <em className="text-accent">Guardian PK.</em>
              <br />
              Take control of your screen.
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted md:text-[17px]">
              Install Guardian, configure your protection settings and
              choose how you want to manage apps and websites on your device.
            </p>
          </Reveal>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Installation steps */}
            <div>
              <h2 className="text-xl">Get started</h2>

              <div className="mt-6 divide-y divide-line border-y border-line">
                {steps.map((step, index) => (
                  <Reveal
                    key={step.number}
                    variant="left"
                    delayMs={index * 70}
                  >
                    <div className="flex gap-5 py-6">
                      <span
                        className="pt-0.5 font-mono text-sm text-accent"
                        aria-hidden
                      >
                        {step.number}
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-[17px]">{step.title}</h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Download card */}
            <Reveal
              variant="scale"
              delayMs={120}
              className="h-fit lg:sticky lg:top-24"
            >
              <div className="panel-card p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-background text-accent"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="29"
                      height="29"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>

                  <div className="min-w-0 pt-1">
                    <h2 className="text-xl">Guardian PK</h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      Android application
                    </p>
                  </div>
                </div>

                <div className="my-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-line py-5">
                  {specs.map((spec) => (
                    <div key={spec.label} className="min-w-0">
                      <p className="text-xs text-ink-muted">
                        {spec.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Replace # with the real APK download URL */}
                <a
                  href="#"
                  className="btn-primary flex w-full items-center justify-center gap-2"
                  aria-label="Download Guardian PK Android application"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12m-5-5 5 5 5-5" />
                    <path d="M5 17v3h14v-3" />
                  </svg>
                  Download for Android
                </a>

                <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
                  APK installation required. Review the app publisher
                  and requested permissions before proceeding.
                </p>

              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Permissions */}
      <section
        id="permissions"
        className="border-t border-line"
        style={{ background: "var(--panel-2)" }}
      >
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              DEVICE ACCESS
            </p>

            <h2 className="mt-4 max-w-2xl text-[clamp(28px,3.8vw,40px)] leading-tight">
              Permissions needed for protection
            </h2>

            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Guardian uses Android permissions to enforce the features
              you enable. Each permission serves a specific purpose
              on your device.
            </p>
          </Reveal>

          <div className="mt-10 border-y border-line">
            {permissions.map((permission, index) => (
              <Reveal
                key={permission.name}
                variant="left"
                delayMs={index * 45}
              >
                <div className="grid gap-3 border-b border-line py-5 last:border-b-0 sm:grid-cols-[minmax(180px,0.8fr)_minmax(0,1.6fr)] sm:gap-8 sm:py-6">
                  <div>
                    <h3 className="text-[16px] font-medium">
                      {permission.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-accent">
                      {permission.tag}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-ink-muted">
                    {permission.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-ink-muted">
            Android may display additional system prompts depending on
            your device and the features you enable. Review each prompt
            before granting access.
          </p>
        </div>
      </section>

      {/* Support */}
      <section className="border-t border-line">
        <Reveal className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl">
                Need help setting up?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
                Find guidance for permissions, passwords and
                Guardian's protection features in the FAQ.
              </p>
            </div>

            <Link
              to="/"
              hash="faq"
              className="btn-ghost inline-flex shrink-0 items-center justify-center"
            >
              View FAQs
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
