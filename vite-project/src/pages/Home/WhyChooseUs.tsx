import React, { useEffect, useRef, useState } from "react";
import videoFile from "../../assets/video/whychooseus.mp4";
import { Layers, TrendingUp, MapPin, Sparkles } from "lucide-react";

type GuaranteeItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const guarantees: GuaranteeItem[] = [
  {
    title: "End-to-End Digital & IT Services",
    description:
      "Complete IT consulting, software development, digital marketing, and cloud solutions under one roof.",
    icon: <Layers size={22} />,
  },
  {
    title: "Scalable & Performance-Driven Solutions",
    description:
      "High-performance, secure, and scalable systems designed to grow with your business.",
    icon: <TrendingUp size={22} />,
  },
  {
    title: "Local Expertise with Global Standards",
    description:
      "Trusted digital and IT solutions company in Marthandam and Nagercoil following global best practices.",
    icon: <MapPin size={22} />,
  },
  {
    title: "Creative Technology & Digital Growth",
    description:
      "Technology, design, and marketing strategies combined to build strong brands and online growth.",
    icon: <Sparkles size={22} />,
  },
];

const GuaranteeCard: React.FC<{
  item: GuaranteeItem;
  isActive: boolean;
}> = ({ item, isActive }) => (
  <div className="relative group cursor-pointer">
    <div
      aria-hidden
      className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        isActive ? "ring-2 ring-blue-100" : "ring-0"
      }`}
    />

    <div className="relative z-10 bg-white rounded-2xl h-full p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Hexagon icon */}
      <div
        className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
        style={{
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
        }}
      >
        {item.icon}
      </div>

      {/* Title underline on hover */}
      <div className="relative mt-4 inline-block">
        <p className="text-lg font-semibold text-gray-800">{item.title}</p>
        <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-blue-600 rounded-md transition-all duration-300 group-hover:w-full" />
      </div>

      <p className="mt-3 text-sm text-gray-500">{item.description}</p>
    </div>
  </div>
);

const WhyChooseUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    try {
      v.setAttribute("playsinline", "true");
      // @ts-ignore
      v.setAttribute("webkit-playsinline", "true");
    } catch {}

    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [mounted]);

  const handleUserPlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          {/* LEFT */}
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Why Choose Our Digital & IT Services
            </p>

            <p className="mt-4 text-gray-500 max-w-xl">
              We are a trusted digital and IT solutions company in Marthandam,
              Nagercoil, and Kanyakumari, helping startups and businesses with
              scalable software, digital marketing, and IT consulting.
            </p>

            {/* 🔷 CUBE VIDEO MODEL */}
            <div className="mt-6">
              <div className="relative w-72 h-72 md:w-96 md:h-96 perspective-[1200px]">
                
                {/* floating cube */}
                <div className="absolute inset-0 animate-[float_6s_ease-in-out_infinite]">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 shadow-2xl
                    transform rotate-x-[10deg] rotate-y-[-12deg] transition-transform duration-500
                    hover:rotate-x-0 hover:rotate-y-0">

                    <video
                      ref={videoRef}
                      className="object-cover w-full h-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Why choose our IT and digital services video"
                    >
                      <source src={videoFile} type="video/mp4" />
                    </video>

                    {!isPlaying && (
                      <button
                        onClick={handleUserPlay}
                        aria-label="Play video"
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                      >
                        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow">
                          ▶
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* cube shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-full" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guarantees.map((g, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <GuaranteeCard item={g} isActive={activeIndex === i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
