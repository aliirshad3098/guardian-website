import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { PhoneMockup } from "@/components/PhoneMockup";
import { GradientMesh } from "@/components/GradientMesh";

import homeShot from "@/assets/home.jpg";
import partnerShot from "@/assets/partner.jpg";
import statsShot from "@/assets/stats.jpg";

const LEAD_WORDS = ["The", "habit", "you", "want", "to", "quit", "is", "the", "one"];
const EMPHASIS_WORDS = ["Guardian", "is", "built", "to", "stop."];

const ROW_A = ["Quiet", "Block", "Focus", "Quiet", "Block", "Focus", "Quiet", "Block", "Focus"];
const ROW_B = ["Reels", "Ads", "Fortress", "Reels", "Ads", "Fortress", "Reels", "Ads", "Fortress"];

const PHONES = [
  {
    src: homeShot,
    alt: "Guardian home screen showing protection active and a clean streak",
    width: "w-[170px] md:w-[210px]",
  },
  {
    src: partnerShot,
    alt: "Guardian Partner app showing protection status and pending approval requests",
    width: "w-[200px] md:w-[250px]",
  },
  {
    src: statsShot,
    alt: "Guardian statistics screen showing weekly blocking activity",
    width: "w-[170px] md:w-[210px]",
  },
];

/**
 * ShowcaseHero: oversized headline that rises word by word, two outlined
 * marquee rows running in opposite directions behind it, and three phones
 * that enter in sequence. The whole group tilts toward the pointer on
 * desktop. Colours come from the site's theme tokens, so it works in light
 * and dark mode. Keyframes live in showcase-hero.css, and reduced motion is
 * respected.
 */
export function ShowcaseHero() {
  const heroRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const tilt = tiltRef.current;
    if (!hero || !tilt) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 8}deg)`;
    };
    const onLeave = () => {
      tilt.style.transform = "";
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <header ref={heroRef} className="relative overflow-hidden">
      <GradientMesh variant="hero" />

      <div className="marquee marquee-top" aria-hidden>
        <div className="marquee-track">
          {[...ROW_A, ...ROW_A].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>
      <div className="marquee marquee-bottom" aria-hidden>
        <div className="marquee-track marquee-track-reverse">
          {[...ROW_B, ...ROW_B].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1180px] px-5 pb-20 pt-32 text-center md:px-8 md:pb-28 md:pt-44">
        <h1 className="mx-auto max-w-[18ch] text-balance text-[clamp(38px,5.6vw,80px)] font-black leading-[0.92] tracking-[-0.06em]">
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

        <p
          className="word-rise mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-ink-muted md:text-[19px]"
          style={{ animationDelay: "750ms" }}
        >
          Guardian filters adult content, blocks distracting apps and reels, and turns protection on
          by schedule. It understands six languages, and nothing leaves your device.
        </p>

        <div
          className="word-rise mt-9 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: "850ms" }}
        >
          <Link to="/download" className="btn-primary">
            Download for Android
          </Link>
          <Link to="/" hash="how" className="btn-ghost">
            See how it works
          </Link>
        </div>

        <div className="mt-16 flex justify-center" style={{ perspective: "1400px" }}>
          <div
            ref={tiltRef}
            className="flex items-end justify-center gap-4 transition-transform duration-500 ease-out md:gap-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            {PHONES.map((phone, i) => (
              <div
                key={phone.alt}
                className={`word-rise ${phone.width}`}
                style={{ animationDelay: `${1000 + i * 150}ms` }}
              >
                <PhoneMockup
                  src={phone.src}
                  alt={phone.alt}
                  rotateY={0}
                  rotateX={0}
                  floatDelay={`${i * 0.9}s`}
                  floatDuration="7s"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}