import { Reveal } from "@/components/Reveal";

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

function Box({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="h-full rounded-2xl border border-line bg-panel p-8 md:p-10">
      <h3 className="text-[18px] font-semibold text-ink">{label}</h3>
      <ul className="mt-6 divide-y divide-line">
        {items.map((t) => (
          <li key={t} className="py-3.5 text-[15px] leading-relaxed text-ink/85">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlainList({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((t) => (
        <li key={t} className={`py-4 text-[15px] leading-relaxed ${muted ? "text-ink-muted" : "text-ink"}`}>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function PrivacySection() {
  const shown = partnerSees.filter((r) => r.yes).map((r) => r.t);
  const hidden = partnerSees.filter((r) => !r.yes).map((r) => r.t);

  return (
    <section>
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-14 md:gap-16 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Privacy by design</span>
          <h2 className="mt-5 text-[clamp(34px,4.6vw,52px)] leading-[1.08] tracking-[-0.03em]">
            Your data belongs on your phone.
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-muted">
            Guardian is built to protect your focus without turning your private activity into
            someone else's data.
          </p>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal>
            <Box label="Stays on your phone" items={onPhone} />
          </Reveal>
          <Reveal delayMs={100}>
            <Box label="Never happens" items={neverLeaves} />
          </Reveal>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-14 md:gap-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">Accountability partner</span>
            <h3 className="mt-5 text-[clamp(28px,3.4vw,40px)] leading-[1.1] tracking-[-0.025em]">
              What a partner can and can't see
            </h3>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <Box label="Partner can see" items={shown} />
            </Reveal>
            <Reveal delayMs={100}>
              <Box label="Stays private" items={hidden} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}