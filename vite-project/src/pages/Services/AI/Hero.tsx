import { ArrowRight } from "lucide-react";
import brain from "../../../assets/Service/Ai/brain.webp";
import Button from "../../../components/Ui/Button";

export default function AIHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 px-6 py-4 sm:py-16 md:py-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div className="order-2 md:order-1">
          {/* PAGE H1 */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Transform Your Business with <br />
            <span className="text-blue-600">AI-Powered Solutions</span>
          </h1>

          <p className="mt-5 text-gray-600 text-base md:text-lg max-w-prose">
            We build intelligent automation systems, AI chatbots, predictive
            models, and smart workflows that reduce cost, improve efficiency,
            and accelerate business growth.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* 🟢 WhatsApp */}
            <Button
              href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-md shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Free Consultation
              <ArrowRight className="ml-2" size={18} />
            </Button>

            {/* 🌐 Contact Page */}
            <Button href="/contact" variant="ghost" className="px-6 py-3">
              Learn More
            </Button>
          </div>

          {/* FEATURES WITH BLUE UNDERLINE ON HOVER */}
          <ul className="mt-8 grid grid-cols-2 gap-5 text-sm text-gray-700">
            {[
              "Scalable Automation",
              "Conversational AI",
              "Predictive Models",
              "Workflow Integration",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 group">
                {/* dot */}
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-500 shrink-0" />

                {/* text + underline */}
                <span className="relative inline-block font-medium">
                  {item}
                  <span
                    className="
                      absolute left-0 -bottom-1
                      h-[2px] w-0
                      bg-blue-500 rounded-full
                      transition-all duration-300
                      group-hover:w-full
                    "
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div
            className="
              relative flex items-center justify-center
              w-full max-w-[300px] sm:max-w-[320px] md:max-w-lg
              h-[260px] sm:h-[300px] md:h-auto
            "
          >
            {/* GLOW */}
            <div
              aria-hidden
              className="
                absolute w-[75%] h-[75%]
                rounded-full bg-blue-500/35
                blur-[65px]
                md:w-[85%] md:h-[85%] md:blur-[90px]
              "
            />

            {/* IMAGE */}
            {/* BOTTOM IMAGE — DOWN LITTLE ON MOBILE */}
<div className="mt-24 md:mt-24 flex justify-center">
  <div className="w-full max-w-sm md:max-w-2xl px-4">
    <img
      src={brain}
      fetchPriority="high"
      alt="AI-powered brain representing intelligent automation and machine learning"
      className="
        relative z-10
        w-full h-auto object-contain
        drop-shadow-[0_0_35px_rgba(59,130,246,0.55)]
        transition-transform duration-500
      "
    />
  </div>
</div>

          </div>
        </div>
      </div>

      {/* DECORATIVE GLOW */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
      />
    </section>
  );
}
