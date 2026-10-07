import React, { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  feedback: string;
  image?: string;
  stars?: number;
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Sharma",
    role: "Founder, TechNova",
    feedback:
      "Their team delivered outstanding results. Transparent, fast, and highly reliable.",
    image: "https://i.pravatar.cc/120?img=1",
    stars: 5,
  },
  {
    id: "t2",
    name: "Sophia Patel",
    role: "CEO, BrightEdge",
    feedback:
      "Amazing experience! The scalable solutions helped us grow without limits.",
    image: "https://i.pravatar.cc/120?img=5",
    stars: 5,
  },
  {
    id: "t3",
    name: "Liam Johnson",
    role: "Product Manager, VertoX",
    feedback:
      "Professional, detail-oriented, and extremely efficient. Highly recommended.",
    image: "https://i.pravatar.cc/120?img=12",
    stars: 4,
  },
  {
    id: "t4",
    name: "Isabella Martinez",
    role: "CTO, CyberWay",
    feedback:
      "The onboarding was smooth, and the delivery speed was incredible.",
    image: "https://i.pravatar.cc/120?img=20",
    stars: 5,
  },
  {
    id: "t5",
    name: "Priya Desai",
    role: "Director, CloudLoop",
    feedback:
      "Highly experienced team. They helped us scale operations with zero downtime.",
    image: "https://i.pravatar.cc/120?img=30",
    stars: 5,
  },
];

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => {
  return (
    <div className="group relative h-full rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.02]">
      
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 to-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Glass card */}
      <div className="relative h-full rounded-2xl bg-white/70 backdrop-blur-lg p-6 shadow-md transition-all duration-300 group-hover:shadow-xl">
        
        <div className="flex items-center gap-4">
          <img
            src={t.image}
            alt={`${t.name} testimonial`}
            className="w-14 h-14 rounded-xl object-cover ring-1 ring-white/50"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{t.name}</p>
            <p className="text-xs text-gray-500">{t.role}</p>

            {/* Stars */}
            <div className="mt-1 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < (t.stars ?? 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <blockquote className="mt-4 text-sm text-gray-700 leading-relaxed">
          “{t.feedback}”
        </blockquote>

        <div className="mt-4 text-xs text-gray-400">
          Verified client • Marthandam & Nagercoil
        </div>
      </div>
    </div>
  );
};

const TestimonialsAdvanced: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const intervalRef = useRef<number | null>(null);

  const autoplayMs = 5000;
  const n = testimonials.length;

  // Responsive slides
  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Auto scroll every 5 seconds
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, autoplayMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [n]);

  // Visible slides
  const visible = Array.from({ length: slidesPerView }).map(
    (_, i) => testimonials[(index + i) % n]
  );

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* SEO heading */}
        <p className="text-3xl font-extrabold text-gray-900 mb-2">
          Trusted Client Testimonials
        </p>

        <p className="text-gray-600 mb-6 max-w-3xl">
          Businesses across Marthandam, Nagercoil, and Kanyakumari trust our
          digital and IT solutions for scalable growth, performance, and
          long-term success.
        </p>

        <div className="overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500">
            {visible.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0"
                style={{
                  width:
                    slidesPerView === 1
                      ? "100%"
                      : slidesPerView === 2
                      ? "48%"
                      : "31%",
                }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAdvanced;
