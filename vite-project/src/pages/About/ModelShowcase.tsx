// File: src/components/ModelShowcase.tsx
import React from "react";
import Button from "../../components/Ui/Button";
import modelImg from "../../assets/About/campain.webp";

const ModelShowcase: React.FC<{
  title?: string;
  subtitle?: string;
  cta?: string;
}> = ({
  title = "Creative Campaign Strategy",
  subtitle =
    "Our Creative Campaign Strategy delivers data-driven and visually engaging campaigns that help brands reach the right audience and drive real results. Based in Marthandam and Nagercoil, we design performance-focused digital campaigns that increase visibility, engagement, and long-term growth.",
  cta = "View Case Study",
}) => {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">

              <span className="text-sm text-gray-500 tracking-wide uppercase">
                Featured Project
              </span>

              {/* Heading (NO underline) */}
              <h3 className="mt-4 text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {title}
              </h3>

              {/* Accent bar */}
              <div className="mt-4 h-1 w-14 bg-gradient-to-r from-emerald-400 to-indigo-400 rounded-full" />

              <p className="mt-6 text-gray-600 leading-relaxed">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

  {/* 🟢 WhatsApp — View Case Study */}
  <Button
  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
    className="px-6 py-3 bg-emerald-500 text-black hover:bg-emerald-600 shadow"
  >
    {cta}
  </Button>

  {/* 🌐 Learn More — Page Navigation */}
  <Button
    href="/services/digitalmarketing"   // change to your page route if different
    variant="ghost"
    className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
  >
    Learn More
  </Button>

</div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl group relative">
              <img
                src={modelImg}
                alt="Creative digital marketing campaign design and strategy"
                className="w-full h-96 md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ModelShowcase;
