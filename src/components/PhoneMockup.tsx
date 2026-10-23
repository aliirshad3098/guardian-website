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
 * Modern Android phone: thin metal frame, dark bezel, punch-hole camera,
 * side keys. Float is on the outer element and the 3D turn on the inner one,
 * so the two transforms never fight each other.
 */
export function PhoneMockup({
  src,
  alt,
  rotateY = 0,
  rotateX = 3,
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
          {/* side keys */}
          <span aria-hidden className="absolute -left-[3px] top-[19%] h-[6%] w-[3px] rounded-l-sm" style={{ background: "linear-gradient(90deg,#1a1a22,#3b3b46)" }} />
          <span aria-hidden className="absolute -left-[3px] top-[29%] h-[10%] w-[3px] rounded-l-sm" style={{ background: "linear-gradient(90deg,#1a1a22,#3b3b46)" }} />
          <span aria-hidden className="absolute -right-[3px] top-[25%] h-[13%] w-[3px] rounded-r-sm" style={{ background: "linear-gradient(270deg,#1a1a22,#3b3b46)" }} />

          {/* metal frame */}
          <div
            className="relative rounded-[2.9rem] p-[3px]"
            style={{
              background: "linear-gradient(145deg, #5a5a68 0%, #1b1b23 30%, #3a3a46 60%, #121218 100%)",
              boxShadow:
                "0 70px 100px -45px rgba(0,0,0,0.65), 0 30px 50px -28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            {/* black bezel */}
            <div className="rounded-[2.65rem] bg-[#060608] p-[7px]">
              {/* screen */}
              <div className="relative overflow-hidden rounded-[2.2rem] bg-black">
                {/* punch-hole camera */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[11px] z-10 size-[13px] -translate-x-1/2 rounded-full bg-[#050507] ring-1 ring-white/5"
                />
                <img src={src} alt={alt} loading="lazy" className="block w-full" />
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
            </div>
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