import { Reveal } from "@/components/Reveal";
import { Smartphone, Ban } from "lucide-react";

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


type ColumnProps = { label: string; items: string[]; Icon: typeof Smartphone };

function PrivacyColumn({ label, items, Icon }: ColumnProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-t-2 border-accent pt-5">
        <div className="flex items-center gap-3">
          <span
            className="grid size-9 place-items-center rounded-lg"
            style={{ background: "var(--accent-tint)" }}
          >
            <Icon className="size-4 text-accent" strokeWidth={1.8} aria-hidden />
          </span>
          <h3 className="text-[18px] font-semibold text-ink">{label}</h3>
        </div>
        <span className="font-mono text-[12px] text-ink-faint">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="mt-2 divide-y divide-line">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3.5 py-4 text-left text-[15.5px] leading-relaxed text-ink/80">
            <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrivacySection() {
  return (
    <section>
      {/* centred header: eyebrow, large heading, short intro */}
      <header className="mx-auto max-w-[1180px] px-5 pb-10 pt-12 text-center md:px-8 md:pb-14 md:pt-16">
        <Reveal>
          <span className="eyebrow">Privacy by design</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(34px,5.4vw,56px)] leading-[1.08]">
            Your data belongs on <em className="text-accent">your phone</em>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
            Guardian is built to protect your focus without turning your private activity into
            someone else's data.
          </p>
        </Reveal>
      </header>

      <div className="mx-auto grid max-w-[1000px] gap-12 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-8 md:py-20">
        <Reveal>
          <PrivacyColumn label="Stays on your phone" items={onPhone} Icon={Smartphone} />
        </Reveal>
        <Reveal delayMs={100}>
          <PrivacyColumn label="Never happens" items={neverLeaves} Icon={Ban} />
        </Reveal>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-20 text-center md:px-8">
        <Reveal>
          <span className="eyebrow">Accountability partner</span>
          <h2 className="mt-5 text-[clamp(24px,3.2vw,32px)] font-medium leading-snug tracking-tight text-ink">
            What a partner can and can't see
          </h2>
        </Reveal>
        <ul className="mx-auto mt-10 max-w-xl divide-y divide-line border-y border-line text-left">
          {partnerSees.map((r) => (
            <li key={r.t} className="flex items-center gap-4 py-4">
              <span
                aria-hidden
                className="grid size-6 shrink-0 place-items-center rounded-full font-mono text-[12px]"
                style={{
                  background: "var(--accent-tint)",
                  color: r.yes ? "var(--accent)" : "var(--ink-faint)",
                }}
              >
                {r.yes ? "✓" : "—"}
              </span>
              <span className={r.yes ? "text-[15px] text-ink" : "text-[15px] text-ink-muted"}>{r.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}