import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { PhoneMockup } from "@/components/PhoneMockup";
import { GradientMesh } from "@/components/GradientMesh";
import homeShot from "@/assets/home.jpg";

const LEAD_WORDS = ["The", "habit", "you", "want", "to", "quit", "is", "the", "one"];
const EMPHASIS_WORDS = ["Guardian", "is", "built", "to", "stop."];

const ROW_A = ["Quiet", "Block", "Focus", "Quiet", "Block", "Focus", "Quiet", "Block", "Focus"];
const ROW_B = ["Reels", "Ads", "Fortress", "Reels", "Ads", "Fortress", "Reels", "Ads", "Fortress"];

/**
 * ShowcaseHero: oversized headline that rises word by word, two outlined
 * marquee rows running in opposite directions behind it, and a phone that
 * tilts toward the pointer. Colours come from the site's theme tokens, so it
 * works in light and dark mode. All motion is CSS or a single pointer
 * listener, and reduced motion is respected.
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
      tilt.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 9}deg)`;
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
        <h1 className="mx-auto max-w-[16ch] text-balance text-[clamp(50px,9vw,128px)] font-black leading-[0.92] tracking-[-0.06em]">
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

        <div
          className="word-rise mt-16 flex justify-center"
          style={{ animationDelay: "1000ms", perspective: "1400px" }}
        >
          <div
            ref={tiltRef}
            className="w-[240px] transition-transform duration-500 ease-out md:w-[280px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <PhoneMockup
              src={homeShot}
              alt="Guardian home screen showing protection active and a clean streak"
              rotateY={0}
              rotateX={0}
              floatDelay="0s"
              floatDuration="7s"
            />
          </div>
        </div>
      </div>
    </header>
  );
}