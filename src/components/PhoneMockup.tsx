import type { ReactNode } from "react";

type Chip = { label: string; className: string };

type Props = {
  src: string;
  alt: string;
  /** Turn around the vertical axis, in degrees. Keep between 4 and 9 for a natural look. */
  rotateY?: number;
  /** Tilt around the horizontal axis, in degrees. */
  rotateX?: number;
  floatDelay?: string;
  floatDuration?: string;
  chips?: Chip[];
  className?: string;
  children?: ReactNode;
};

/* Phone geometry, in SVG units. The whole frame is one 400 x 820 box. */
const W = 400;
const H = 820;
const SCREEN = { x: 18, y: 23, w: 364, h: 774, rx: 52 };

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Modern Android phone built as a single SVG frame (metal edge, black bezel,
 * screen cutout, side keys, camera) with the screenshot sitting exactly in the
 * cutout. Float is on the outer element and the 3D turn on the inner one, so
 * the two transforms never fight each other.
 */
export function PhoneMockup({
  src,
  alt,
  rotateY = 0,
  rotateX = 2,
  floatDelay = "0s",
  floatDuration = "6s",
  chips = [],
  className = "",
  children,
}: Props) {
  return (
    <div className={`relative ${className}`} style={{ perspective: "2400px" }}>
      <div
        className="float-shot relative"
        style={{ animationDelay: floatDelay, animationDuration: floatDuration, transformStyle: "preserve-3d" }}
      >
        <div
          className="relative"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
            {/* screenshot, placed exactly inside the screen cutout */}
            <div
              className="absolute overflow-hidden bg-black"
              style={{
                left: pct(SCREEN.x, W),
                top: pct(SCREEN.y, H),
                width: pct(SCREEN.w, W),
                height: pct(SCREEN.h, H),
                borderRadius: `${(SCREEN.rx / SCREEN.w) * 100}% / ${(SCREEN.rx / SCREEN.h) * 100}%`,
              }}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* glass reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(118deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.05) 100%)",
                }}
              />
            </div>

            {/* the phone body, drawn over the screenshot with a screen-shaped hole */}
            <svg
              aria-hidden
              viewBox={`0 0 ${W} ${H}`}
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ filter: "drop-shadow(0 40px 40px rgba(0,0,0,0.45))" }}
            >
              <defs>
                <linearGradient id="gp-metal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6a6a78" />
                  <stop offset="30%" stopColor="#1b1b23" />
                  <stop offset="60%" stopColor="#3a3a46" />
                  <stop offset="100%" stopColor="#121218" />
                </linearGradient>
                <linearGradient id="gp-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1a1a22" />
                  <stop offset="100%" stopColor="#3b3b46" />
                </linearGradient>
              </defs>

              {/* side keys (left and right edges) */}
              <rect x="-3" y="150" width="6" height="40" rx="2" fill="url(#gp-side)" />
              <rect x="-3" y="215" width="6" height="80" rx="2" fill="url(#gp-side)" />
              <rect x={W - 3} y="200" width="6" height="110" rx="2" fill="url(#gp-side)" />

              {/* metal frame with a screen-shaped hole (evenodd) */}
              <path
                fillRule="evenodd"
                fill="url(#gp-metal)"
                d={`
                  M 70 0 H ${W - 70} Q ${W} 0 ${W} 70 V ${H - 70} Q ${W} ${H} ${W - 70} ${H}
                  H 70 Q 0 ${H} 0 ${H - 70} V 70 Q 0 0 70 0 Z
                  M ${SCREEN.x + SCREEN.rx} ${SCREEN.y}
                  H ${SCREEN.x + SCREEN.w - SCREEN.rx}
                  Q ${SCREEN.x + SCREEN.w} ${SCREEN.y} ${SCREEN.x + SCREEN.w} ${SCREEN.y + SCREEN.rx}
                  V ${SCREEN.y + SCREEN.h - SCREEN.rx}
                  Q ${SCREEN.x + SCREEN.w} ${SCREEN.y + SCREEN.h} ${SCREEN.x + SCREEN.w - SCREEN.rx} ${SCREEN.y + SCREEN.h}
                  H ${SCREEN.x + SCREEN.rx}
                  Q ${SCREEN.x} ${SCREEN.y + SCREEN.h} ${SCREEN.x} ${SCREEN.y + SCREEN.h - SCREEN.rx}
                  V ${SCREEN.y + SCREEN.rx}
                  Q ${SCREEN.x} ${SCREEN.y} ${SCREEN.x + SCREEN.rx} ${SCREEN.y} Z
                `}
              />

              {/* black bezel ring, sitting just inside the metal edge */}
              <path
                fillRule="evenodd"
                fill="#050507"
                d={`
                  M 66 9 H ${W - 66} Q ${W - 9} 9 ${W - 9} 66 V ${H - 66} Q ${W - 9} ${H - 9} ${W - 66} ${H - 9}
                  H 66 Q 9 ${H - 9} 9 ${H - 66} V 66 Q 9 9 66 9 Z
                  M ${SCREEN.x + SCREEN.rx} ${SCREEN.y}
                  H ${SCREEN.x + SCREEN.w - SCREEN.rx}
                  Q ${SCREEN.x + SCREEN.w} ${SCREEN.y} ${SCREEN.x + SCREEN.w} ${SCREEN.y + SCREEN.rx}
                  V ${SCREEN.y + SCREEN.h - SCREEN.rx}
                  Q ${SCREEN.x + SCREEN.w} ${SCREEN.y + SCREEN.h} ${SCREEN.x + SCREEN.w - SCREEN.rx} ${SCREEN.y + SCREEN.h}
                  H ${SCREEN.x + SCREEN.rx}
                  Q ${SCREEN.x} ${SCREEN.y + SCREEN.h} ${SCREEN.x} ${SCREEN.y + SCREEN.h - SCREEN.rx}
                  V ${SCREEN.y + SCREEN.rx}
                  Q ${SCREEN.x} ${SCREEN.y} ${SCREEN.x + SCREEN.rx} ${SCREEN.y} Z
                `}
              />

              {/* punch-hole camera, centred in the top of the screen */}
              <circle cx={W / 2} cy={SCREEN.y + 16} r="6" fill="#050507" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </svg>
          </div>

          {/* floating glass chips */}
          {chips.map((c) => (
            <div
              key={c.label}
              className={`absolute z-20 flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[12.5px] font-medium text-white ${c.className}`}
              style={{
                background: "rgba(12, 18, 20, 0.72)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 18px 40px -18px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <span className="size-2 rounded-full bg-[#2fe39a]" />
              {c.label}
            </div>
          ))}
          {children}
        </div>

        {/* soft ground shadow */}
        <div
          aria-hidden
          className="absolute -bottom-5 left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-[50%] blur-xl"
          style={{ background: "rgba(0,0,0,0.4)" }}
        />
      </div>
    </div>
  );
}