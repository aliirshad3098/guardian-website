import type { ReactNode } from "react";

type Chip = { label: string; className: string };

type Props = {
  src: string;
  alt: string;
  /** Turn around the vertical axis, in degrees. Keep between 8 and 18 for a natural look. */
  rotateY?: number;
  /** Tilt around the horizontal axis, in degrees. */
  rotateX?: number;
  floatDelay?: string;
  floatDuration?: string;
  chips?: Chip[];
  className?: string;
  children?: ReactNode;
};

/**
 * Realistic modern Android phone frame.
 * - Fixed 9:19.5 body so every screenshot sits *inside* the screen, not on top of it.
 * - Screenshot uses object-cover + object-top so status-bar / UI align with the punch-hole.
 * - Thin metal rim, dark bezel, side keys, glass specular, soft ground shadow.
 */
export function PhoneMockup({
  src,
  alt,
  rotateY = 0,
  rotateX = 4,
  floatDelay = "0s",
  floatDuration = "6s",
  chips = [],
  className = "",
  children,
}: Props) {
  return (
    <div className={`relative ${className}`} style={{ perspective: "1600px" }}>
      <div
        className="float-shot relative mx-auto w-full"
        style={{
          animationDelay: floatDelay,
          animationDuration: floatDuration,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative mx-auto w-full"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── side keys (volume up / down + power) ── */}
          <span
            aria-hidden
            className="absolute -left-[2.5px] top-[18%] z-10 h-[5.5%] w-[2.5px] rounded-l-[1px]"
            style={{
              background: "linear-gradient(90deg, #0c0c10, #3a3a44 55%, #1c1c24)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          />
          <span
            aria-hidden
            className="absolute -left-[2.5px] top-[26%] z-10 h-[9%] w-[2.5px] rounded-l-[1px]"
            style={{
              background: "linear-gradient(90deg, #0c0c10, #3a3a44 55%, #1c1c24)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          />
          <span
            aria-hidden
            className="absolute -right-[2.5px] top-[28%] z-10 h-[12%] w-[2.5px] rounded-r-[1px]"
            style={{
              background: "linear-gradient(270deg, #0c0c10, #3a3a44 55%, #1c1c24)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          />

          {/* ── outer metal chassis ── */}
          <div
            className="relative w-full overflow-hidden rounded-[2.55rem]"
            style={{
              aspectRatio: "9 / 19.5",
              background:
                "linear-gradient(145deg, #6e6e7a 0%, #2a2a32 18%, #121218 42%, #2e2e38 68%, #0a0a0e 100%)",
              padding: "2.5px",
              boxShadow: [
                "0 50px 80px -30px rgba(0,0,0,0.7)",
                "0 20px 36px -16px rgba(0,0,0,0.55)",
                "0 0 0 1px rgba(255,255,255,0.04)",
                "inset 0 1px 0 rgba(255,255,255,0.22)",
                "inset 0 -1px 0 rgba(0,0,0,0.5)",
              ].join(", "),
            }}
          >
            {/* mid rim (slightly lighter inset ring) */}
            <div
              className="relative h-full w-full overflow-hidden rounded-[2.4rem]"
              style={{
                background: "#050507",
                padding: "6px",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* ── active screen area ── */}
              <div
                className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-black"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                {/* screenshot — fills the glass, cropped to phone AR */}
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-top"
                />

                {/* punch-hole camera */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[9px] z-20 -translate-x-1/2"
                >
                  <div
                    className="size-[11px] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, #1a1a28 0%, #050508 55%, #000 100%)",
                      boxShadow:
                        "0 0 0 1.5px #0a0a0c, 0 0 0 2.5px rgba(255,255,255,0.04), inset 0 0 3px rgba(80,120,255,0.25)",
                    }}
                  />
                </div>

                {/* thin speaker slit under the camera */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[24px] z-20 h-[2px] w-8 -translate-x-1/2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />

                {/* glass specular highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(125deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 22%, transparent 40%, transparent 78%, rgba(255,255,255,0.04) 100%)",
                  }}
                />

                {/* bottom home-indicator bar (gesture nav) */}
                <div
                  aria-hidden
                  className="absolute bottom-[6px] left-1/2 z-20 h-[3px] w-[28%] -translate-x-1/2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.28)" }}
                />
              </div>
            </div>
          </div>

          {/* floating status chips */}
          {chips.map((c) => (
            <div
              key={c.label}
              className={`absolute z-30 flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[12.5px] font-medium text-white ${c.className}`}
              style={{
                background: "rgba(10, 14, 18, 0.78)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow:
                  "0 16px 36px -14px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <span className="size-1.5 rounded-full bg-[#2fe39a] shadow-[0_0_6px_#2fe39a]" />
              {c.label}
            </div>
          ))}
          {children}
        </div>

        {/* soft ground contact shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-3 left-1/2 h-5 w-[70%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: "rgba(0,0,0,0.45)" }}
        />
      </div>
    </div>
  );
}