import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import hero from "../../../assets/Service/web/webdevelopment.webp";
import Button from "../../../components/Ui/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
      {/* Animated background blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-40 -right-40 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2  items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* LEFT CONTENT */}
          <div className="py-10 ">
            {/* SEO H1 */}
            <motion.h1
              className="text-4xl  sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Build{" "}
              <span className="relative inline-block group">
                <span className="text-indigo-600 relative z-10">Fast</span>
                <span className="absolute left-0 -bottom-1 h-[4px] w-full bg-indigo-200 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </span>
              ,<br />
              Launch{" "}
              <span className="relative inline-block group">
                <span className="text-cyan-600 relative z-10">Faster</span>
                <span className="absolute left-0 -bottom-1 h-[4px] w-full bg-cyan-200 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              High-performance web development focused on speed, SEO,
              scalability, and conversion. Built for startups and enterprises.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details.">
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button href="/contact"
                variant="ghost"
                className="inline-flex items-center gap-3 px-7 py-3"
              >
                <Terminal size={18} />
                View Demo Projects
              </Button>
            </motion.div>

            {/* STATS */}
            <motion.div
              className="mt-10 grid grid-cols-3 gap-4 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "2.5×", label: "Faster Load" },
                { value: "24/7", label: "Support" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-700">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT CARD */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8">
              {/* Badge */}
              {/* Small screen: animated dot */}

              <img
                src={hero}
                fetchPriority="high"
                decoding="async"
                alt="High performance web development dashboard"
                className="w-full md:w-full rounded-xl border border-gray-200 shadow-lg"
              />

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { value: "0.5s", label: "Load Time" },
                  { value: "100%", label: "SEO" },
                  { value: "A+", label: "Security" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 p-3 rounded-lg text-center"
                  >
                    <div className="font-bold text-indigo-600">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
