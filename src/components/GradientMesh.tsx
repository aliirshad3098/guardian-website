/**
 * Backdrop texture for hero and section bands. A faint grid, masked so it
 * fades out from one corner. Flat and quiet: no colour blobs, no motion.
 */
export function GradientMesh(_props: { variant?: "hero" | "section" }) {
  return <div aria-hidden className="grid-bg" />;
}
