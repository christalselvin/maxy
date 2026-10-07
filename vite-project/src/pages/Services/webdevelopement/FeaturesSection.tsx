import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Smartphone,
  Shield,
  Palette,
  BarChart,
  Users,
  ChevronRight,
  Check,
} from "lucide-react";
import Button from "../../../components/Ui/Button";

const FEATURES = [
  {
    icon: <Zap className="text-indigo-600" size={24} />,
    title: "Lightning Fast Performance",
    description:
      "Optimized for speed with industry-leading performance scores.",
    points: ["CDN Delivery", "Image Optimization", "Code Splitting"],
  },
  {
    icon: <Smartphone className="text-cyan-600" size={24} />,
    title: "Mobile-First Design",
    description:
      "Seamless experience across mobile, tablet, and desktop devices.",
    points: ["Touch Optimized", "Responsive UI", "PWA Ready"],
  },
  {
    icon: <Shield className="text-blue-600" size={24} />,
    title: "Enterprise-Grade Security",
    description:
      "Secure architecture with best-in-class protection standards.",
    points: ["SSL Security", "DDoS Protection", "GDPR Ready"],
  },
  {
    icon: <Palette className="text-purple-600" size={24} />,
    title: "Custom UI / UX",
    description:
      "Create memorable brand identities that stand out and connect with your audience",
    points: ["Brand Identity", "UX Research", "Micro-Animations"],
  },
  {
    icon: <BarChart className="text-emerald-600" size={24} />,
    title: "SEO & Analytics",
    description:
      "Search-engine optimized websites with actionable insights.",
    points: ["On-Page SEO", "Performance Metrics", "A/B Testing"],
  },
  {
    icon: <Users className="text-pink-600" size={24} />,
    title: "Team Collaboration",
    description:
      "Built for teams to collaborate, review, and iterate faster.",
    points: ["Live Preview", "Client Dashboard", "Version Control"],
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Everything You Need to{" "}
            <span className="relative inline-block text-indigo-600">
              Succeed Online
              <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-indigo-600 rounded-full" />
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Modern web solutions built for performance, scalability, and growth.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="
                group bg-white rounded-2xl
                border border-gray-200
                hover:border-indigo-400 hover:shadow-xl
                transition-all duration-300
                p-5 sm:p-6
                flex flex-col
              "
            >
              {/* ICON */}
              <div className="inline-flex p-4 rounded-2xl bg-gray-100 mb-4">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* DESCRIPTION (CLAMPED) */}
              <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                {feature.description}
              </p>

              {/* POINTS (CLAMPED HEIGHT) */}
              <ul className="space-y-2 mb-6">
                {feature.points.slice(0, 3).map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                    <span className="text-sm sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>

              {/* CTA ALWAYS BOTTOM */}
              <div className="mt-auto">
                <Button variant="ghost" className="inline-flex items-center gap-2">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
