import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Megaphone,
  Mail,
  Video,
  Smartphone,
  Users,
  ChevronRight,
  Zap,
} from "lucide-react";


const colorMap = {
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-500",
    gradient: "from-pink-500 to-rose-500",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-500",
    gradient: "from-red-500 to-orange-500",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
  },
};

/* ================= DATA ================= */

const services = [
  {
    title: "SEO Optimization",
    description: "Dominate search rankings with proven SEO strategies",
    icon: <Search size={24} />,
    color: "purple",
    features: ["Keyword Research", "Technical SEO", "Content Strategy", "Link Building"],
  },
  {
    title: "Social Media Marketing",
    description: "Build brand authority and engagement",
    icon: <Megaphone size={24} />,
    color: "pink",
    features: ["Content Creation", "Paid Ads", "Community Growth", "Analytics"],
  },
  {
    title: "Email Marketing",
    description: "Turn subscribers into customers",
    icon: <Mail size={24} />,
    color: "blue",
    features: ["Automation", "A/B Testing", "Segmentation", "Analytics"],
  },
  {
    title: "Content Marketing",
    description: "High-quality content that converts",
    icon: <Video size={24} />,
    color: "red",
    features: ["Blogs", "Videos", "Case Studies", "Infographics"],
  },
  {
    title: "PPC Advertising",
    description: "Instant traffic with measurable ROI",
    icon: <Smartphone size={24} />,
    color: "green",
    features: ["Google Ads", "Meta Ads", "Remarketing", "Tracking"],
  },
  {
    title: "Influencer Marketing",
    description: "Amplify reach with trusted voices",
    icon: <Users size={24} />,
    color: "indigo",
    features: ["Creator Research", "Campaigns", "Performance Tracking"],
  },
];


const MarketingServices: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-8 sm:py-20 md:py-7 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Marketing Solutions
            </span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
            End-to-end digital marketing services designed to grow traffic, leads, and revenue.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const c = colorMap[service.color as keyof typeof colorMap];

            return (
              <motion.div
                key={index}
                onClick={() => setActive(index)}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`
                  relative bg-white rounded-2xl p-6 cursor-pointer
                  border-2 ${active === index ? c.border : "border-gray-200"}
                  shadow-lg hover:shadow-2xl transition-all
                `}
              >
                {/* Hover Gradient Border */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity
                  bg-gradient-to-r ${c.gradient} blur-xl -z-10`}
                />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <Zap size={14} className={c.text} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`inline-flex items-center gap-2 font-semibold ${c.text}`}>
                  View Details
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketingServices;
