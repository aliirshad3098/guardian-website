/**
 * GradientMesh — animated multi-blob background glow, replacing the old
 * static single radial-gradient. Each blob drifts on its own independent
 * cycle (see blob-drift-a/b/c keyframes in styles.css) so there's no
 * visible repeat pattern, and mix-blend-mode:screen makes overlapping
 * colors mix additively (light-on-light) rather than stacking as flat
 * color — this is what gives the glow its depth. Purely decorative
 * (aria-hidden), and respects prefers-reduced-motion via the blob-a/b/c
 * animation utilities, which are neutralized by the global reduced-motion
 * override in styles.css.
 */
export function GradientMesh({ variant = "hero" }: { variant?: "hero" | "section" }) {
    const size = variant === "hero" ? 480 : 380;
    return (
      <div className="gradient-mesh" aria-hidden>
        <span
          className="blob-a"
          style={{
            width: size,
            height: size,
            left: "8%",
            top: "-10%",
            background: "radial-gradient(circle, var(--violet) 0%, transparent 70%)",
            opacity: 0.5,
          }}
        />
        <span
          className="blob-b"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            right: "5%",
            top: "-5%",
            background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)",
            opacity: 0.45,
          }}
        />
        <span
          className="blob-c"
          style={{
            width: size * 0.7,
            height: size * 0.7,
            left: "35%",
            top: "20%",
            background: "radial-gradient(circle, var(--violet-bright) 0%, transparent 70%)",
            opacity: 0.3,
          }}
        />
      </div>
    );
  }