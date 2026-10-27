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
    <section id="privacy" className="border-y border-line">
      {/* Section introduction */}
      
      <header className="mx-auto max-w-[1180px] px-5 pb-10 pt-14 text-center md:px-8 md:pb-14 md:pt-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="eyebrow">Privacy by design</span>
        
          <h2 className="mt-5 max-w-3xl text-[clamp(34px,5.2vw,54px)] leading-[1.08]">
            Your data belongs <em className="text-accent">on your phone.</em>
          </h2>
        
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            Guardian is built to protect your focus without turning your private activity into someone else’s data.
          </p>
        </Reveal>
      </header>


      {/* Three principles: typography and dividers instead of cards */}
      <div
        className="border-y border-line"
        style={{ background: "var(--panel-2)" }}
      >
        <div className="mx-auto grid max-w-[1180px] px-5 md:grid-cols-3 md:px-8">
          {privacyProof.map((item, i) => (
            <Reveal
              key={item.n}
              delayMs={i * 60}
              className={[
                "py-7 md:py-9",
                i !== 0 ? "border-t border-line md:border-l md:border-t-0 md:pl-7" : "",
                i !== 2 ? "md:pr-7" : "",
              ].join(" ")}
            >
              <span className="font-mono text-xs text-ink-faint">
                {item.n}
              </span>

              <h3 className="mt-4 text-[18px] font-semibold leading-snug">
                {item.title}
              </h3>

              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Accountability partner: two clean lists instead of a mixed table */}
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal className="max-w-md">
          <span className="eyebrow">Accountability partner</span>

          <h3 className="mt-5 text-[clamp(28px,3.6vw,38px)] leading-tight">
            Support, without surveillance.
          </h3>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            A partner helps you stay accountable. They can see
            protection-related events, not your private browsing activity.
          </p>
        </Reveal>

        <Reveal delayMs={80} className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold text-accent">Partner can see</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {partnerSees
                .filter((r) => r.yes)
                .map((r) => (
                  <li key={r.t} className="py-4">
                    <p className="text-[14px] font-medium text-ink">{r.t}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{r.d}</p>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold text-ink-muted">Stays private</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {partnerSees
                .filter((r) => !r.yes)
                .map((r) => (
                  <li key={r.t} className="py-4">
                    <p className="text-[14px] font-medium text-ink">{r.t}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{r.d}</p>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}