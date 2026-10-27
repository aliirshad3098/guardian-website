import { useEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/PhoneMockup";

export type HeroPhone = {
  src: string;
  alt: string;
};

const EASE = "cubic-bezier(0.645, 0.045, 0.355, 1)";
/** Distance (px) from the ring's centre to each phone. Larger = more depth. */
const RADIUS = 240;

/**
 * Phones sit on a 3D ring. The whole ring turns, so the phone in front changes
 * and the others recede in real perspective. The ring only ever turns forward.
 * Hovering a phone briefly, or clicking / pressing Enter on it, brings it to the
 * front. Rotation pauses while the pointer is over the group and for a few
 * seconds after a manual selection.
 */
export function HeroPhones({ phones, intervalMs = 3800 }: { phones: HeroPhone[]; intervalMs?: number }) {
  const count = phones.length;
  const stepDeg = 360 / count;

  // `turn` only goes up, so the ring always rotates the same way
  const [turn, setTurn] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pinTimer = useRef<number | undefined>(undefined);
  const hoverTimer = useRef<number | undefined>(undefined);
  const paused = hovering || pinned;

  const front = ((turn % count) + count) % count;

  // automatic forward rotation
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTurn((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [paused, intervalMs]);

  useEffect(
    () => () => {
      window.clearTimeout(pinTimer.current);
      window.clearTimeout(hoverTimer.current);
    },
    [],
  );

  // rotate forward (never backwards) until phone k is in front
  const bringToFront = (k: number) => {
    setTurn((t) => {
      const current = ((t % count) + count) % count;
      return t + ((k - current + count) % count);
    });
    setPinned(true);
    window.clearTimeout(pinTimer.current);
    pinTimer.current = window.setTimeout(() => setPinned(false), 6000);
  };

  const hoverSide = (k: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => bringToFront(k), 650);
  };
  const leaveSide = () => window.clearTimeout(hoverTimer.current);

  return (
    <div
      className="relative mx-auto h-[520px] w-full max-w-[480px] sm:h-[580px]"
      style={{ perspective: "1600px" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        leaveSide();
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${-turn * stepDeg}deg)`,
          transition: `transform 1300ms ${EASE}`,
        }}
      >
        {phones.map((phone, k) => {
          const isFront = k === front;
          return (
            <div
              key={k}
              tabIndex={0}
              role={isFront ? undefined : "button"}
              aria-label={isFront ? undefined : `Bring ${phone.alt} to front`}
              onMouseEnter={isFront ? undefined : () => hoverSide(k)}
              onMouseLeave={isFront ? undefined : leaveSide}
              onFocus={isFront ? undefined : () => bringToFront(k)}
              onClick={isFront ? undefined : () => bringToFront(k)}
              onKeyDown={
                isFront
                  ? undefined
                  : (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        bringToFront(k);
                      }
                    }
              }
              className="absolute left-1/2 top-[2%] w-[46%] rounded-[2.5rem] outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                transform: `translateX(-50%) rotateY(${k * stepDeg}deg) translateZ(${RADIUS}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                cursor: isFront ? "default" : "pointer",
              }}
            >
              <PhoneMockup
                src={phone.src}
                alt={phone.alt}
                rotateY={0}
                rotateX={0}
                floatDelay={`${k * 0.8}s`}
                floatDuration="7s"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}