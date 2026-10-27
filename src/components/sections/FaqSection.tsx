import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "Does Guardian collect my data?",
    a: "No. Keyword detection and AI classification run on your phone. We never see your browsing history, and nothing is sold or shared.",
  },
  {
    q: "Will it block sites I actually need?",
    a: "You control the allow-list. Work, study and approved sites stay open — you decide where the line sits.",
  },
  {
    q: "Is Fortress Mode really unbreakable?",
    a: "Once a time-lock is set it cannot be released early, even with your password. Guardian generates and hides the password, then reveals it when the lock expires. That's the point.",
  },
  {
    q: "What if I forget my password?",
    a: "Five wrong attempts trigger a 10-minute lockout. If you set a decoy password, it opens a clean screen instead — it never unlocks settings.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. The domain blocklist is stored on your phone after the first download, so filtering continues without a connection. The AI layer improves when you're online.",
  },
  {
    q: "What is an accountability partner?",
    a: "Someone you trust — a friend, spouse or mentor — who holds the key to your protection settings. They see whether protection is on and any request to change it, never your activity.",
  },
  {
    q: "How does the app blocker work?",
    a: "Pick any app that pulls your focus and block it on a schedule or permanently. The block survives restarts and respects Fortress Mode, so relaunching won't bypass it.",
  },
  {
    q: "What does the reels blocker do?",
    a: "It detects and blocks short-video feeds inside the apps you already use. You keep the app for the parts you need; only the infinite scroll goes.",
  },
  {
    q: "Why does it need VPN and accessibility permissions?",
    a: "The local VPN is the only way Android allows domain filtering, and accessibility access lets Guardian check the address bar before a page renders. Both run entirely on-device.",
  },
  {
    q: "Is there a cost?",
    a: "Guardian is free for users in Pakistan. Protection is never behind a paywall.",
  },
];

export function FaqSection() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8">
        <Reveal className="text-center">
          <span className="eyebrow">FAQ</span>
          <h1 className="mt-5 text-[clamp(34px,5.4vw,56px)]">Questions, answered.</h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-muted">
            If something isn't here, write to us — we reply in English or Urdu.
          </p>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delayMs={Math.min(i * 50, 300)}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium text-ink">
                  {f.q}
                  <span className="font-mono text-ink-faint transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}