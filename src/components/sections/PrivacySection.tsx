import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

const partnerSees = [
  { yes: true, t: "Protection status", d: "Whether Guardian is switched on" },
  { yes: true, t: "Change requests", d: "Requests to disable or change protection" },
  { yes: true, t: "Tamper alerts", d: "Attempts to bypass or uninstall protection" },
  { yes: false, t: "Browsing history", d: "The websites you visit" },
  { yes: false, t: "Searches and typing", d: "Search terms or text in other apps" },
  { yes: false, t: "Other app content", d: "Anything typed inside other apps" },
];

const privacyProof = [
  {
    n: "01",
    title: "Processed on your phone",
    body: "Searches and page checks are evaluated locally on your device.",
  },
  {
    n: "02",
    title: "No browsing history sent to us",
    body: "Guardian does not route your traffic through our servers.",
  },
  {
    n: "03",
    title: "Your protection, your choice",
    body: "You control the allow-list and choose who you trust as a partner.",
  },
];

export function PrivacySection() {
  return (
    <section className="overflow-hidden">
      <header className="mx-auto max-w-[1180px] px-5 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Privacy by design</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(34px,5.2vw,54px)] leading-[1.08]">
            Your data belongs <em className="text-accent">on your phone.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            Guardian protects your focus without turning private activity into someone else's data.
          </p>
        </Reveal>
      </header>

      <div className="border-y border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-4 px-5 py-10 md:grid-cols-3 md:px-8 md:py-14">
          {privacyProof.map((item, i) => (
            <Reveal
              key={item.n}
              delayMs={i * 70}
              className="panel-card p-6 md:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-faint">
                  {item.n} / PRIVACY
                </span>
                <span
                  className="grid size-9 place-items-center rounded-full text-accent"
                  style={{ background: "var(--accent-tint)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path
                      d={
                        i === 0
                          ? "M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z"
                          : i === 1
                            ? "M5 12.5 9.2 17 19 7"
                            : "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      }
                    />
                  </svg>
                </span>
              </div>
              <h3 className="mt-6 text-[19px] font-semibold">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="max-w-md">
            <span className="eyebrow">Accountability partner</span>
            <h3 className="mt-5 text-[clamp(28px,3.6vw,38px)] leading-tight">
              Support, without surveillance.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              A partner helps you stay accountable. They can see protection-related events, not your private browsing activity.
            </p>
          </Reveal>

          <Reveal
            delayMs={100}
            className="overflow-hidden rounded-2xl border border-line"
            style={{ background: "var(--panel)" }}
          >
            <div className="grid grid-cols-2 border-b border-line px-5 py-4 md:px-6">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                <span className="size-2 rounded-full bg-accent" />
                Partner can see
              </div>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-ink-muted">
                <span
                  className="size-2 rounded-full"
                  style={{ background: "var(--ink-faint)" }}
                />
                Always private
              </div>
            </div>

            {partnerSees.map((item, i) => (
              <div
                key={item.t}
                className={`grid grid-cols-2 gap-3 px-5 py-4 md:px-6 ${
                  i < partnerSees.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px]"
                    style={{
                      background: item.yes ? "var(--accent-tint)" : "transparent",
                      color: "var(--accent)",
                    }}
                  >
                    {item.yes ? "✓" : "—"}
                  </span>
                  <div>
                    <p
                      className={`text-[13.5px] font-medium ${
                        item.yes ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {item.yes ? item.t : "—"}
                    </p>
                    {item.yes && (
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                        {item.d}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px]"
                    style={{
                      background: !item.yes ? "var(--accent-tint)" : "transparent",
                      color: "var(--ink-faint)",
                    }}
                  >
                    {!item.yes ? "✓" : "—"}
                  </span>
                  <div>
                    {!item.yes && (
                      <>
                        <p className="text-[13.5px] font-medium text-ink">
                          {item.t}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                          {item.d}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line" style={{ background: "var(--panel-2)" }}>
        <div className="mx-auto grid max-w-[1180px] gap-5 px-5 py-10 md:grid-cols-2 md:px-8 md:py-12">
          <Reveal className="flex gap-4 rounded-xl border border-line bg-panel p-5">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl text-accent"
              style={{ background: "var(--accent-tint)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="size-5"
                aria-hidden="true"
              >
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 7h6M9 11h6M10 17h4" />
              </svg>
            </span>
            <div>
              <h3 className="text-[16px] font-semibold">Why VPN permission?</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                Android uses a local VPN interface for domain filtering. Guardian does not send your traffic through a Guardian server.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={80} className="flex gap-4 rounded-xl border border-line bg-panel p-5">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl text-accent"
              style={{ background: "var(--accent-tint)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M12 3 19 6v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <h3 className="text-[16px] font-semibold">Why accessibility access?</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                It helps Guardian check supported address bars and search fields on-device so it can apply blocking rules before a page opens.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line px-5 py-4 md:col-span-2">
            <div>
              <p className="text-[14px] font-semibold">Still have a question?</p>
              <p className="mt-1 text-[13px] text-ink-muted">
                We reply in English or Urdu, usually within a day.
              </p>
            </div>
            <Link to="/" hash="faq" className="btn-ghost">
              Explore FAQs <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}