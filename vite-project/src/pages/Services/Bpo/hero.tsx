import React from "react";
import Button from "../../../components/Ui/Button";

import voiceImg from "../../../assets/About/about_footer/bpo.webp";
import chatImg from "../../../assets/About/about_footer/man.webp";
import backOfficeImg from "../../../assets/About/about_footer/telcalling.webp";

const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden bg-white text-gray-900
      py-6 sm:py-10 md:py-16"
    >
      {/* Soft background blobs */}
      <div
        className="absolute -top-40 -left-40 sm:-top-48 sm:-left-48
        w-[280px] sm:w-[420px] h-[280px] sm:h-[420px]
        bg-blue-200/40 rounded-full blur-[120px]"
      />
      <div
        className="absolute top-1/3 -right-40 sm:-right-48
        w-[260px] sm:w-[380px] h-[260px] sm:h-[380px]
        bg-indigo-200/40 rounded-full blur-[120px]"
      />

      {/* Circular wave */}
      <svg
        className="absolute -right-56 top-1/2 -translate-y-1/2
        w-[600px] h-[600px] md:w-[800px] md:h-[800px]
        opacity-30 hidden md:block"
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="140" stroke="#DB2777" strokeWidth="3">
          <animate
            attributeName="r"
            from="120"
            to="200"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.6"
            to="0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="300" cy="300" r="220" stroke="#DB2777" strokeWidth="2.5">
          <animate
            attributeName="r"
            from="200"
            to="300"
            dur="9s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="9s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* CONTENT */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6
        grid grid-cols-1 md:grid-cols-2 gap-0 sm:gap-14 md:gap-24 items-center"
      >
        {/* LEFT */}
        <div className="text-center md:text-left mt-16 sm:mt-2 md:mt-10">
          <h1
            className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl
            font-extrabold leading-tight"
          >
            Smart
            <span
              className="block text-transparent bg-clip-text
              bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Voice & Non-Voice
            </span>
            BPO Solutions
          </h1>

          <p
            className="mt-4 sm:mt-6 md:mt-2 text-gray-600
            max-w-xl mx-auto md:mx-0
            text-sm sm:text-base md:text-lg leading-relaxed"
          >
            Scalable, secure, AI-powered customer engagement across voice, chat,
            email & back-office operations.
          </p>

          <div
  className="mt-8 sm:mt-10 md:mt-8 flex flex-wrap gap-4 sm:gap-5
  justify-center md:justify-start"
>
  {/* 🌐 Contact Page */}
  <Button href="/contact">
    Get Started →
  </Button>

  {/* 📞 Call */}
  <Button
    href="tel:+919150331137"
    variant="ghost"
  >
    Talk to Sales
  </Button>
</div>


        </div>

        {/* RIGHT – FLOATING BUBBLES */}
        <div
          className="relative flex justify-center items-center
          h-[260px] sm:h-[320px] md:h-[460px]"
        >
          <div className="bubble xl scale-90 sm:scale-100">
            <img
              src={voiceImg}
              alt="Voice Support"
              className="w-16 sm:w-20 md:w-24"
            />
          </div>

          <div
            className="bubble md
            translate-x-20 sm:translate-x-28 md:translate-x-36
            -translate-y-12 sm:-translate-y-16 md:-translate-y-20
            animate-floatSlow"
          >
            <img
              src={chatImg}
              alt="Chat Support"
              className="w-12 sm:w-14 md:w-16"
            />
          </div>

          <div
            className="bubble sm
            -translate-x-20 sm:-translate-x-24 md:-translate-x-32
            translate-y-16 sm:translate-y-24 md:translate-y-32
            animate-floatSlower"
          >
            <img
              src={backOfficeImg}
              fetchPriority="high"
              alt="Back Office"
              className="w-9 sm:w-10 md:w-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
