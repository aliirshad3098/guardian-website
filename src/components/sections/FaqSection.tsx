import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "Does Guardian collect my data?",
    a: "Search checks and classification run on your phone. Guardian does not upload your browsing history, and your activity is not sold or shared.",
  },
  {
    q: "Will it block sites I actually need?",
    a: "You control the allow-list. Add trusted work, study or everyday sites so they remain accessible.",
  },
  {
    q: "Is Fortress Mode really unbreakable?",
    a: "Fortress Mode is designed to make impulsive changes harder during a time-lock. Review the in-app setup carefully so you understand exactly what is locked and when it can be changed.",
  },
  {
    q: "What if I forget my password?",
    a: "Guardian includes protections against repeated incorrect attempts. Set up your recovery and decoy options before relying on a locked configuration.",
  },
  {
    q: "Does it work offline?",
    a: "Core filtering can continue using the blocklist stored on your phone. Features that need fresh data or online AI support may require a connection.",
  },
  {
    q: "What is an accountability partner?",
    a: "Someone you trust who can see protection status and requests to change it, without seeing your searches or browsing history.",
  },
  {
    q: "How does the app blocker work?",
    a: "Choose apps to restrict on a schedule or more persistently. Availability and enforcement can depend on Android version and the permissions you grant.",
  },
  {
    q: "What does the reels blocker do?",
    a: "It aims to block short-video feeds inside supported apps while leaving other app functions available where supported.",
  },
  {
    q: "Why does Guardian need VPN and accessibility permissions?",
    a: "The local VPN supports domain filtering. Accessibility helps check supported address bars and search fields on-device. Both permissions are explained so you can make an informed choice.",
  },
  {
    q: "Is there a cost?",
    a: "Guardian is free for users in Pakistan. Check the download page for current availability and installation requirements.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">FAQ / HELP CENTRE</span>

            <h2 className="mt-5 text-[clamp(34px,5vw,50px)] leading-[1.08]">
              Good questions.
              <br />
              <em className="text-accent">Clear answers.</em>
            </h2>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-muted">
              Everything you need to know before getting started with Guardian.
            </p>

            <a href="mailto:support@guardian.pk" className="btn-ghost mt-6">
              Ask our team <span aria-hidden>↗</span>
            </a>
          </Reveal>

          <div
            className="overflow-hidden rounded-2xl border border-line"
            style={{ background: "var(--panel)" }}
          >
            {faqs.map((f, i) => (
              <Reveal key={f.q} delayMs={Math.min(i * 25, 180)}>
                <details className="group border-b border-line px-5 last:border-b-0 md:px-6">
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-[14.5px] font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="w-7 shrink-0 font-mono text-[11px] text-ink-faint">
                      {"0".concat(String(i + 1))}
                    </span>

                    <span className="flex-1">{f.q}</span>

                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-all group-open:rotate-45 group-open:border-accent group-open:text-accent">
                      +
                    </span>
                  </summary>

                  <p className="pb-5 pl-11 pr-8 text-[13.5px] leading-relaxed text-ink-muted">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}