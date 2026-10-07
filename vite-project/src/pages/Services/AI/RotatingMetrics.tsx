// src/pages/Services/AI/AIRotatingCTA.tsx
import { ArrowRight } from "lucide-react";
import Button from "../../../components/Ui/Button";

export default function AIRotatingCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1437] via-[#0A1B4F] to-[#060C2A] px-6 py-10 md:py-4 text-white">

      {/* LOCAL KEYFRAMES */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spinSlower {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="relative z-10">
          <p className="text-3xl md:text-5xl font-extrabold leading-tight">
            Need Custom AI for Your <br />
            <span className="text-blue-400">Business Growth?</span>
          </p>

          <p className="mt-6 text-blue-100 max-w-md leading-relaxed">
            We design and deploy AI systems that automate operations, improve
            decision-making, and help businesses scale faster with confidence.
          </p>

          <div className="mt-8">
  <Button
    href="tel:+919150331137"
    className="group inline-flex items-center gap-4 rounded-full
    bg-white/10 backdrop-blur-md border border-white/20
    px-7 py-3 text-white
    hover:bg-white hover:text-blue-900 transition-all duration-300"
  >
    Speak With AI Expert
    <span
      className="flex h-10 w-10 items-center justify-center rounded-full
      bg-white text-blue-900 group-hover:translate-x-1 transition"
    >
      <ArrowRight size={18} />
    </span>
  </Button>
</div>

        </div>

        {/* RIGHT ROTATING VISUAL */}
        <div className="relative flex justify-center items-center h-[300px] sm:h-[360px] md:h-[420px]">

          {/* OUTER RING */}
          <div
            className="absolute"
            style={{ animation: "spinSlow 22s linear infinite" }}
          >
            <Orbit
              sizeMobile={220}
              sizeSmall={260}
              sizeDesktop={340}
            />
          </div>

          {/* MIDDLE RING */}
          <div
            className="absolute"
            style={{ animation: "spinReverse 28s linear infinite" }}
          >
            <Orbit
              sizeMobile={160}
              sizeSmall={200}
              sizeDesktop={240}
            />
          </div>

          {/* INNER RING */}
          <div
            className="absolute"
            style={{ animation: "spinSlower 34s linear infinite" }}
          >
            <Orbit
              sizeMobile={100}
              sizeSmall={120}
              sizeDesktop={150}
            />
          </div>

          {/* CORE */}
          <div
            className="relative z-10 h-20 w-20 sm:h-24 sm:w-24 rounded-full
            bg-gradient-to-br from-blue-500 to-indigo-600
            shadow-[0_0_50px_rgba(59,130,246,0.6)]
            flex items-center justify-center animate-pulse"
          >
            <span className="text-lg sm:text-xl font-bold">AI</span>
          </div>
        </div>
      </div>

      {/* GLOW EFFECTS */}
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
    </section>
  );
}

function Orbit({
  sizeMobile,
  sizeSmall,
  sizeDesktop,
}: {
  sizeMobile: number;   // 320px
  sizeSmall: number;    // 375–425px
  sizeDesktop: number; // tablet & up
}) {
  return (
    <div
      className="
        relative rounded-full border border-white/20
        w-[var(--size)]
        h-[var(--size)]
      "
      style={{
        // CSS variable trick (no Tailwind config needed)
        ["--size" as any]: `${sizeDesktop}px`,
      }}
    >
      <style>{`
        @media (max-width: 425px) {
          div[style*="--size"] { --size: ${sizeSmall}px; }
        }
        @media (max-width: 360px) {
          div[style*="--size"] { --size: ${sizeMobile}px; }
        }
      `}</style>

      <span
        className="absolute -top-2 left-1/2 h-3.5 w-3.5 rounded-full
        bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)]
        -translate-x-1/2"
      />
    </div>
  );
}
