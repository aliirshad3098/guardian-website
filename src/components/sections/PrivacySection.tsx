import { Smartphone, Ban, Eye, EyeOff } from "lucide-react";
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

const chip =
  "inline-flex items-center rounded-full border border-line bg-panel px-4 py-2 text-[14.5px] text-ink/85";

function Group({
  label,
  items,
  Icon,
}: {
  label: string;
  items: string[];
  Icon: typeof Smartphone;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          className="grid size-12 place-items-center rounded-2xl"
          style={{ background: "var(--accent-tint)" }}
        >
          <Icon className="size-5 text-accent" strokeWidth={1.8} aria-hidden />
        </span>
        <h3 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">{label}</h3>
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {items.map((t) => (
          <span key={t} className={chip}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PrivacySection() {
  const shown = partnerSees.filter((r) => r.yes);
  const hidden = partnerSees.filter((r) => !r.yes);

  return (
    <section>
      {/* Principle: a split layout. Statement on the left, proof on the right. */}
      <div className="mx-auto grid max-w-[1180px] gap-16 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Privacy by design</span>
          <h2 className="mt-5 text-[clamp(34px,4.6vw,52px)] leading-[1.08] tracking-[-0.03em]">
            Your data belongs <em className="text-accent">on your phone.</em>
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-muted">
            Guardian is built to protect your focus without turning your private activity into
            someone else's data.
          </p>
        </Reveal>

        <div className="flex flex-col gap-16">
          <Reveal>
            <Group label="Stays on your phone" items={onPhone} Icon={Smartphone} />
          </Reveal>
          <Reveal delayMs={100}>
            <Group label="Never happens" items={neverLeaves} Icon={Ban} />
          </Reveal>
        </div>
      </div>

      {/* Accountability partner, same visual language */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1180px] gap-16 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">Accountability partner</span>
            <h3 className="mt-5 text-[clamp(28px,3.4vw,40px)] leading-[1.1] tracking-[-0.025em]">
              What a partner can and can't see
            </h3>
          </Reveal>

          <div className="flex flex-col gap-16">
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  className="grid size-12 place-items-center rounded-2xl"
                  style={{ background: "var(--accent-tint)" }}
                >
                  <Eye className="size-5 text-accent" strokeWidth={1.8} aria-hidden />
                </span>
                <h4 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">Partner can see</h4>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {shown.map((r) => (
                  <span key={r.t} className={`${chip} border-accent/30`}>
                    {r.t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl border border-line">
                  <EyeOff className="size-5 text-ink-faint" strokeWidth={1.8} aria-hidden />
                </span>
                <h4 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">Stays private</h4>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {hidden.map((r) => (
                  <span key={r.t} className={`${chip} text-ink-muted`}>
                    {r.t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}