import { Link } from "@tanstack/react-router";
import { MagneticButton } from "@/components/MagneticButton";
import { PhoneMockup } from "@/components/PhoneMockup";
import { Reveal } from "@/components/Reveal";
import { GradientMesh } from "@/components/GradientMesh";

import homeShot from "@/assets/home.jpg";
import partnerShot from "@/assets/partner.jpg";
import statsShot from "@/assets/stats.jpg";

const LEAD_WORDS = ["The", "habit", "you", "want", "to", "quit", "is", "the", "one"];
const EMPHASIS_WORDS = ["Guardian", "is", "built", "to", "stop."];

const TICKER_ITEMS = [
  "Adult sites",
  "Reels",
  "Fortress Mode",
  "Partner",
  "On-device AI",
  "Six languages",
];

const PHONES = [
  { src: homeShot, alt: "Guardian home screen showing protection active and a clean streak" },
  { src: partnerShot, alt: "Guardian Partner app showing protection status and pending approval requests" },
  { src: statsShot, alt: "Guardian stats screen" },
];

/**
 * KineticHero: the headline rises word by word, three phones sit in a row
 * below it, and a teal ticker runs along the bottom edge. Motion is CSS only
 * (keyframes live in styles.css), and prefers-reduced-motion is handled by
 * the global rule in styles.css, which lands each word at its final state.
 */
export function KineticHero() {
  return (
    <header className="relative overflow-hidden">
      <GradientMesh variant="hero" />

      <div className="relative mx-auto max-w-[1180px] px-5 pb-32 pt-28 text-center md:px-8 md:pt-40">
        <h1 className="mx-auto max-w-[16ch] text-balance text-[clamp(46px,9vw,120px)] leading-[0.95] tracking-[-0.05em]">
          {LEAD_WORDS.map((word, i) => (
            <span key={word}>
              {i > 0 && " "}
              <span className="word-rise inline-block" style={{ animationDelay: `${i * 70}ms` }}>
                {word}
              </span>
            </span>
          ))}{" "}
          {EMPHASIS_WORDS.map((word, i) => {
            const index = LEAD_WORDS.length + i;
            return (
              <span key={word}>
                {i > 0 && " "}
                <span
                  className="word-rise inline-block text-accent"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        <Reveal delayMs={600}>
          <p className="mx-auto mt-7 max-w-xl text-[18px] leading-relaxed text-ink-muted">
            Guardian filters adult content, blocks distracting apps and reels, and turns protection
            on by schedule. Free for users in Pakistan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton>
              <Link to="/download" className="btn-primary">
                Download for Android
              </Link>
            </MagneticButton>
            <Link to="/" hash="how" className="btn-ghost">
              See how it works
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 flex items-end justify-center gap-6">
          {PHONES.map((phone, i) => (
            <Reveal
              key={phone.alt}
              variant="fade"
              delayMs={800 + i * 120}
              className={i === 1 ? "w-[230px] md:w-[260px]" : "w-[180px] md:w-[210px]"}
            >
              <PhoneMockup
                src={phone.src}
                alt={phone.alt}
                rotateY={0}
                rotateX={0}
                floatDelay={`${i * 0.8}s`}
                floatDuration="7s"
              />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden whitespace-nowrap bg-accent py-3.5 text-[15px] font-bold uppercase tracking-wide text-[#e7f4f2]">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-7">
              {item} <span aria-hidden>•</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}