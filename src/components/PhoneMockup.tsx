import type { ReactNode } from "react";

type Chip = { label: string; className: string };

type Props = {
  src: string;
  alt: string;
  /** Rotation around the vertical axis (degrees). Negative turns the right edge toward the viewer. */
  rotateY?: number;
  /** Tilt around the horizontal axis (degrees). */
  rotateX?: number;
  floatDelay?: string;
  floatDuration?: string;
  chips?: Chip[];
  className?: string;
  children?: ReactNode;
};

/**
 * A 3D-looking Android phone that floats gently and tilts in space.
 * The outer element floats (CSS animation uses transform), the inner element
 * carries the static 3D rotation, so the two transforms never fight.
 */
export function PhoneMockup({
  src,
  alt,
  rotateY = 0,
  rotateX = 5,
  floatDelay = "0s",
  floatDuration = "6s",
  chips = [],
  className = "",
  children,
}: Props) {
  return (
    <div className={`relative ${className}`} style={{ perspective: "1600px" }}>
      <div
        className="float-shot relative"
        style={{ animationDelay: floatDelay, animationDuration: floatDuration, transformStyle: "preserve-3d" }}
      >
        <div
          className="relative transition-transform duration-700 ease-out"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* side buttons */}
          <span aria-hidden className="absolute -left-[3px] top-[22%] h-[7%] w-[3px] rounded-l-sm bg-[#2a2a33]" />
          <span aria-hidden className="absolute -left-[3px] top-[33%] h-[11%] w-[3px] rounded-l-sm bg-[#2a2a33]" />
          <span aria-hidden className="absolute -right-[3px] top-[28%] h-[14%] w-[3px] rounded-r-sm bg-[#2a2a33]" />

          {/* body */}
          <div
            className="relative rounded-[2.6rem] p-[9px]"
            style={{
              background: "linear-gradient(150deg, #3a3a46 0%, #15151c 45%, #2b2b35 100%)",
              boxShadow:
                "0 60px 90px -40px rgba(0,0,0,0.6), 0 25px 45px -25px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {/* screen */}
            <div className="relative overflow-hidden rounded-[2.1rem] bg-black">
              {/* camera pill */}
              <div className="absolute left-1/2 top-[10px] z-10 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
              <img src={src} alt={alt} loading="lazy" className="block w-full" />
              {/* glass reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
                }}
              />
            </div>
          </div>

          {/* floating chips, like the reference: glass pills that sit in front of the phone */}
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

        {/* ground shadow */}
        <div
          aria-hidden
          className="absolute -bottom-6 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[50%] blur-xl"
          style={{ background: "rgba(0,0,0,0.45)" }}
        />
      </div>
    </div>
  );
}
