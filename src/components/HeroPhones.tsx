import { useEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/PhoneMockup";

export type HeroPhone = {
  src: string;
  alt: string;
  chips?: { label: string; className: string }[];
};

/** Three positions: front (centre), left and right. Changing a phone's slot animates it. */
const SLOTS = [
  { style: { left: "25%", top: "0%", width: "50%", zIndex: 30 }, rotateY: 0 },
  { style: { left: "0%", top: "16%", width: "44%", zIndex: 20 }, rotateY: 8 },
  { style: { left: "56%", top: "16%", width: "44%", zIndex: 20 }, rotateY: -8 },
];

/**
 * Three phones that take turns in front. A timer rotates them; hovering a side
 * phone (briefly) or clicking/pressing Enter on it brings it to the front.
 * Rotation pauses while the pointer is over the group and for a short time after
 * a manual selection.
 */
export function HeroPhones({ phones, intervalMs = 3800 }: { phones: HeroPhone[]; intervalMs?: number }) {
  // order[0] is the front phone, order[1] the left one, order[2] the right one
  const [order, setOrder] = useState<number[]>(() => phones.map((_, i) => i));
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pinTimer = useRef<number | undefined>(undefined);
  const hoverTimer = useRef<number | undefined>(undefined);
  const paused = hovering || pinned;

  // automatic rotation
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setOrder((o) => [o[1] ?? 0, o[2] ?? 0, o[0] ?? 0]);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, intervalMs]);

  // clear pending timers on unmount
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

  // hovering a side phone for a moment brings it forward (avoids flicker when passing over)
  const hoverSide = (k: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => bringToFront(k), 350);
  };
  const leaveSide = () => window.clearTimeout(hoverTimer.current);

  return (
    <div
      className="relative mx-auto h-[500px] w-full max-w-[480px] sm:h-[580px]"
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
            className={`absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[2.5rem] ${
              isFront ? "cursor-default" : ""
            }`}
            style={{ ...pos.style }}
          >
            <PhoneMockup
              src={phone.src}
              alt={phone.alt}
              rotateY={pos.rotateY}
              rotateX={3}
              floatDelay={`${k * 0.8}s`}
              floatDuration="7s"
              {...(phone.chips ? { chips: phone.chips } : {})}
            />
          </div>
        );
      })}
    </div>
  );
}