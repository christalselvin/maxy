import React from "react";
import {
  ChevronRight,
  Play,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
} from "lucide-react";
import Button from "../../../components/Ui/Button";
import ITConsulting from "../../../assets/Service/It/PlacementSupport.webp";

const IMAGES = {
  hero:
    ITConsulting,
};

const stats = [
  {
    value: "95%",
    label: "Placement Success Rate",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    value: "30+",
    label: "Industry Mentors",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    value: "24/7",
    label: "Technical Support",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    value: "100%",
    label: "Secure Consulting",
    icon: <Shield className="w-5 h-5" />,
  },
];

const SecondSection: React.FC = () => {
  return (
    <section className="relative text-white py-12 md:py-14 pb-36">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          loading="lazy"
          
          alt="IT consulting and training professionals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-cyan-900/85" />

        {/* Glow blobs */}
        <div className="absolute top-16 left-10 w-64 h-64 bg-indigo-500/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/40 rounded-full blur-3xl" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">
            IT Consulting
          </span>
          <br />
          <span className="text-white">
            Training & Placement Solutions
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90">
          We help businesses modernize technology while training and placing
          skilled professionals into real-world IT roles.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Button  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
          className="px-8 py-4 rounded-xl font-semibold flex items-center gap-3">
            Get IT Consultation
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Button href="/contact"
            variant="ghost"
            className="px-8 py-4 rounded-xl font-semibold flex items-center gap-3"
          >
            <Play className="w-5 h-5" />
            Explore Training
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur p-4 rounded-xl
                         border border-white/30 hover:bg-white/30 transition"
            >
              <div className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-1">
                {stat.icon}
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm opacity-90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= WAVE DIVIDER ================= */}
      <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#008079"
            d="M0,40 C240,80 480,0 720,40 960,80 1200,0 1440,40 L1440,120 L0,120 Z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-120 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </section>
  );
};

export default SecondSection;
