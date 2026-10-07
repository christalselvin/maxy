import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Button from "../../components/Ui/Button";
import heroImage from "../../assets/About/About_hero.webp";

export default function AboutHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mq && mq.matches) {
      setMounted(true);
      return;
    }

    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const inClass = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-6";

  return (
    <header className="relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-black opacity-95" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${
                mounted
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-6 scale-95"
              }`}
            >
              <img
                src={heroImage}
                fetchPriority="high"
                alt="Digital agency team building software solutions"
                className="w-full max-w-md aspect-square object-cover rounded-2xl
                           transition-transform duration-500
                           hover:scale-105 hover:rotate-1"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight transition-all duration-700 ${inClass}`}
            >
              We build digital products and services that grow businesses.
            </h2>

            <p
              className={`mt-6 text-white/90 max-w-xl leading-relaxed transition-all duration-700 delay-150 ${inClass}`}
            >
              From websites and apps to branding, SEO, digital marketing, and
              BPO services — we help businesses in Marthandam, Nagercoil, and
              Kanyakumari scale with secure, conversion-focused solutions.
            </p>

            <div
              className={`
    mt-8
    flex flex-col gap-3
    w-full
    sm:flex-row sm:w-auto
    transition-all duration-700 delay-300
    ${inClass}
  `}
            >
              {/* 📞 Book a Call — CALL ACTION */}
              <Button
                href="tel:+919150331137"
                className="
      w-full sm:w-auto
      flex items-center justify-center gap-2
      bg-emerald-400 text-black
      px-6 py-3
      rounded-full
      font-medium shadow
    "
              >
                <Phone size={16} />
                Book a Call
              </Button>

              <Button
                href="/services/bpo"
                variant="ghost"
                className="
      w-full sm:w-auto
      flex items-center justify-center
      px-6 py-3
      text-white
      border border-white/30
      hover:bg-white/10
    "
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-24 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C220,80 440,0 720,40 C1000,80 1220,10 1440,50 L1440 100 L0 100 Z"
            fill="white"
          />
        </svg>
      </div>
    </header>
  );
}
