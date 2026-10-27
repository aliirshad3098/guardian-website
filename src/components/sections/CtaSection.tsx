import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PhoneMockup } from "@/components/PhoneMockup";
import homeShot from "@/assets/home.jpg";

/**
 * Closing call to action. The zig-zag graphic sits on the back layer and the phone
 * on the front layer, so the line always passes behind the device.
 */
export function CtaSection() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-24">
      <Reveal
        className="relative mx-auto grid max-w-[1180px] overflow-hidden rounded-[28px] border border-line md:grid-cols-[1fr_1.1fr]"
        style={{ background: "linear-gradient(120deg,#0b2a25 0%,#06120f 70%)" }}
      >
        {/* left: phone with the zig-zag behind it */}
        <div className="relative min-h-[380px] overflow-hidden">
          <svg
            viewBox="0 0 560 400"
            preserveAspectRatio="none"
            className="absolute inset-0 z-0 h-full w-full"
            aria-hidden
          >
            <polyline
              points="0,250 80,215 160,262 240,190 320,236 400,170 480,222 560,186"
              fill="none"
              stroke="#2dd4bf"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points="0,300 90,270 170,310 260,250 350,290 430,240 520,268 560,256"
              fill="none"
              stroke="#2dd4bf"
              strokeOpacity="0.18"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="absolute left-1/2 top-10 z-10 w-[230px] -translate-x-1/2">
            <PhoneMockup src={homeShot} alt="Guardian home screen showing protection active" rotateY={0} rotateX={0} />
          </div>
        </div>

        {/* right: copy and action */}
        <div className="relative z-10 flex flex-col justify-center px-8 py-16 text-white md:px-14">
          <h2 className="text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            A calmer mind
            <br />
            is just a download away.
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/70">
            Guardian is free for users in Pakistan. Install it in minutes, no account needed.
          </p>
          <div className="mt-9">
            <Link
              to="/download"
              className="inline-flex items-center gap-3 rounded-xl bg-[#6ee7b7] px-6 py-3.5 text-[15px] font-semibold text-[#04201c] transition-transform hover:-translate-y-px"
            >
              Download for Android
              <ArrowRight className="size-4" strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}