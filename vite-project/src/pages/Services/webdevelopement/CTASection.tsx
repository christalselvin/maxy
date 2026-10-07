import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Button from "../../../components/Ui/Button";

const CTASection: React.FC = () => {
  return (
    <section className="relative py-6 sm:py-20 md:py-8 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden">

      {/* Background blobs */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-1/4 -left-24 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-24 w-64 h-64 bg-cyan-300/30 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug sm:leading-tight break-words"
        >
          Ready to elevate your
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
            digital presence?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-words">
          Trusted by fast-growing startups and enterprises to build
          high-performance, SEO-optimized web experiences.
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button href="/contact">
            Start Free Trial
            <TrendingUp className="w-5 h-5" />
          </Button>

          <Button href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
            variant="ghost"
            className="border border-indigo-300 text-indigo-700 hover:bg-indigo-50"
          >
            Book a Demo
          </Button>
        </motion.div>

        {/* Stats Card (Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "inset 0 0 0 4px rgba(99,102,241,0.9), 0 25px 50px rgba(99,102,241,0.25)",
          }}
          className="
            mt-12 sm:mt-16
            bg-white/80 backdrop-blur
            rounded-3xl
            p-6 sm:p-8
            shadow-xl
            transition-all
          "
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "20+", label: "Experts" },
              { value: "50+", label: "Projects" },
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-indigo-700">
                  {item.value}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
