import { useEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/PhoneMockup";

export type HeroPhone = {
  src: string;
  alt: string;
};

const EASE = "cubic-bezier(0.645, 0.045, 0.355, 1)";

/**
 * Three positions on one 3D stage: front (large, centred), left and right
 * (smaller, turned away). All three stay visible. Each phone moves between
 * positions with a 3D transform, so the change reads as a rotation.
 */
const SLOTS = [
  { transform: "translate3d(0%, 0%, 0) rotateY(0deg) scale(1)", zIndex: 30, opacity: 1 },
  { transform: "translate3d(-64%, 10%, -90px) rotateY(22deg) scale(0.8)", zIndex: 20, opacity: 0.92 },
  { transform: "translate3d(64%, 10%, -90px) rotateY(-22deg) scale(0.8)", zIndex: 20, opacity: 0.92 },
];

/**
 * Hovering a side phone briefly, or clicking / pressing Enter on it, brings it to
 * the front. Automatic rotation pauses while the pointer is over the group and for
 * a few seconds after a manual selection.
 */
export function HeroPhones({ phones, intervalMs = 3800 }: { phones: HeroPhone[]; intervalMs?: number }) {
  // order[0] is the front phone, order[1] the left one, order[2] the right one
  const [order, setOrder] = useState<number[]>(() => phones.map((_, i) => i));
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pinTimer = useRef<number | undefined>(undefined);
  const hoverTimer = useRef<number | undefined>(undefined);
  const paused = hovering || pinned;

  // automatic rotation: front -> right, left -> front, right -> left
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setOrder((o) => [o[1] ?? 0, o[2] ?? 0, o[0] ?? 0]);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, intervalMs]);

  useEffect(
    () => () => {
      window.clearTimeout(pinTimer.current);
      window.clearTimeout(hoverTimer.current);
    },
    [],
  );

  const bringToFront = (k: number) => {
    setOrder((o) => [k, ...o.filter((x) => x !== k)]);
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
      style={{ perspective: "1400px" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        leaveSide();
      }}
    >
      {order.map((k, slot) => {
        const phone = phones[k];
        const pos = SLOTS[slot];
        if (!phone || !pos) return null;
        const isFront = slot === 0;
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
            className="absolute rounded-[2.5rem] outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              left: "27%",
              top: "3%",
              width: "46%",
              zIndex: pos.zIndex,
              opacity: pos.opacity,
              transform: pos.transform,
              transformStyle: "preserve-3d",
              transition: `transform 1300ms ${EASE}, opacity 1300ms ${EASE}`,
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
  );
}