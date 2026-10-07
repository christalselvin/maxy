import { useState } from "react";
import Button from "../../components/Ui/Button";

function WaterFillCard({
  label,
  value,
  fillPercent = 80,
  className = "",
}: {
  label: string;
  value: string;
  fillPercent?: number;
  className?: string;
}) {
  const [hover, setHover] = useState(false);
  const clamp = Math.max(0, Math.min(100, fillPercent));

  const gradId = `g1-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={`group relative w-40 sm:w-44 h-48 bg-white/60 backdrop-blur-sm
      border border-white/40 rounded-2xl overflow-hidden
      shadow-lg hover:shadow-2xl transition transform-gpu hover:-translate-y-1
      mx-auto ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
    >
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-slate-900">
        <div className="relative group cursor-pointer">
          <div className="text-sm font-medium text-slate-600">
            {label}
          </div>
          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
        </div>

        <div className="mt-2 text-3xl font-extrabold tracking-tight">
          {value}
        </div>
      </div>

      {/* Abstract Fill Layer */}
      <div
        className="absolute left-0 bottom-0 w-full z-10 overflow-hidden transition-all duration-700 ease-out"
        style={{ height: hover ? `${clamp}%` : "0%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(34,197,94,0.95), rgba(79,70,229,0.95))",
          }}
        />

        {/* Soft abstract wave */}
        <svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          className="w-full block relative z-20"
          style={{ transform: "translateY(-1px)" }}
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>
          <path
            d="M0 12 C30 2 60 18 100 10 C140 2 170 16 200 10 L200 20 L0 20 Z"
            fill={`url(#${gradId})`}
          />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export default function AboutContent() {
  return (
    <section className="px-6 md:px-16 lg:px-24 -mt-6 bg-gradient-to-br from-emerald-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT CONTENT */}
          <article className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60">
            {/* Mission heading */}
            <div className="relative w-fit group cursor-pointer">
              <h3 className="text-2xl font-bold text-slate-800">
                Our mission
              </h3>
              <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </div>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Our mission is to deliver reliable, scalable, and innovative
              digital and IT solutions that help businesses grow. Based in
              Marthandam and Nagercoil, we support brands with
              performance-driven technology services.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg grid place-items-center bg-emerald-100 text-emerald-700 font-semibold">
                  1
                </div>
                <div>
                  <div className="relative w-fit group cursor-pointer font-semibold text-slate-800">
                    Validate fast
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
                  </div>
                  <p className="text-sm text-slate-500">
                    Prototype quickly, test with real users, and iterate early.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg grid place-items-center bg-indigo-100 text-indigo-700 font-semibold">
                  2
                </div>
                <div>
                  <div className="relative w-fit group cursor-pointer font-semibold text-slate-800">
                    Build reliable
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
                  </div>
                  <p className="text-sm text-slate-500">
                    Maintainable systems with long-term performance.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">

  <Button
  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
>
  Get a Quote
</Button>


  <Button
    href="/services/itconsulting"   
    variant="ghost"
    className="px-6 py-3"
  >
    Explore Services
  </Button>

</div>

          </article>

          {/* METRIC CARDS */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <WaterFillCard label="Newly Launched" value="2026" fillPercent={68} />
            <WaterFillCard label="Team Strength" value="4 Members" fillPercent={75} />
            <WaterFillCard label="Ready Projects Pipeline" value="10+ Leads" fillPercent={100} />
          </div>
        </div>
      </div>
    </section>
  );
}
