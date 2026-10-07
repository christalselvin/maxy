import React, { useEffect, useState } from "react";
import heroVideo from "../../assets/video/hero.webp";
import heroPoster from "../../assets/video/hero.webp";
import Button from "../../components/Ui/Button";

type HeroProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
};

const Hero: React.FC<HeroProps> = ({
  title = "MaxOTechs Corporate Solutions",
  subtitle =
    "MaxOTechs Corporate Solutions provides online and direct business services to help startups and enterprises grow efficiently.",
  ctaText = "Get Started",
}) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let idleId: number | ReturnType<typeof setTimeout> | null = null;

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => setShowVideo(true));
    } else {
      idleId = setTimeout(() => setShowVideo(true), 200);
    }

    return () => {
      if (idleId !== null) {
        clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroPoster})` }}
    >
      {showVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 bg-black/45 z-10" />

      <div className="relative z-20 flex flex-col justify-center h-full px-4 sm:px-6 md:px-10 items-center md:items-start text-center md:text-left">
        <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl">
          {title}
        </h1>

        <p className="mt-4 text-md sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
          {subtitle}
        </p>

        <Button   href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20learn%20more%20about%20your%20services.%20Please%20share%20the%20details."

        className="mt-8 px-10" variant="ghost">
          
          {ctaText}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
