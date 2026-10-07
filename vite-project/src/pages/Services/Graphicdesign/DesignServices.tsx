import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brush,
  Layers,
  FileText,
  Globe,
  Smartphone,
  Camera,
  ChevronRight,
} from "lucide-react";

import instgram from "../../../assets/Service/Graphicdesign/instagram.webp";
import uiux from "../../../assets/Service/Graphicdesign/ux.webp";
import Restaurant from "../../../assets/Service/Graphicdesign/Restaurant.webp";
import Mobile from "../../../assets/Service/Graphicdesign/Mobile.webp";
import Illustrations from "../../../assets/Service/Graphicdesign/Illustrations.webp";
import Resort from "../../../assets/Service/Graphicdesign/Website.webp";
import Button from "../../../components/Ui/Button";


const COLOR_MAP = {
  pink: { bg: "bg-pink-50", text: "text-pink-600", icon: "text-pink-500" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: "text-emerald-500",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    icon: "text-purple-500",
  },
  amber: { bg: "bg-amber-50", text: "text-amber-600", icon: "text-amber-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", icon: "text-rose-500" },
};

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: keyof typeof COLOR_MAP;
  image: string;
}

const DesignServices: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  const services: Service[] = [
    {
      icon: <Brush size={20} />,
      title: "Brand Identity & Visual Identity",
      description: "Distinct branding systems that make your business memorable.",
      features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines"],
      color: "pink",
      image: instgram,
    },
    {
      icon: <Layers size={24} />,
      title: "UI / UX Design",
      description: "User-centered interfaces built for clarity and conversion.",
      features: ["Wireframing", "Prototyping", "User Testing", "Design Systems"],
      color: "blue",
      image: uiux,
    },
    {
      icon: <FileText size={24} />,
      title: "Print & Marketing Design",
      description: "High-impact print designs that elevate brand presence.",
      features: ["Business Cards", "Brochures", "Packaging", "Posters"],
      color: "emerald",
      image: Restaurant,
    },
    {
      icon: <Globe size={24} />,
      title: "Web Design Services",
      description: "Modern, responsive web design optimized for performance.",
      features: ["Responsive Design", "Animation", "CMS", "SEO Ready"],
      color: "purple",
      image: Mobile,
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile App Design",
      description: "Elegant app interfaces for iOS and Android platforms.",
      features: ["iOS & Android", "Dashboard UI", "Onboarding"],
      color: "amber",
      image: Illustrations,
    },
    {
      icon: <Camera size={24} />,
      title: "Social Media Design",
      description: "Scroll-stopping visuals crafted for engagement.",
      features: ["Posts", "Stories", "Banners", "Reels"],
      color: "rose",
      image: Resort,
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 bg-gradient-to-b from-white to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT SERVICE CARDS */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {services.map((service, index) => {
              const active = activeService === index;
              const color = COLOR_MAP[service.color];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  onMouseEnter={() => setActiveService(index)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all
                    ${
                      active
                        ? "border-cyan-500 shadow-2xl ring-2 ring-cyan-400/30"
                        : "border-gray-200 shadow-lg hover:shadow-xl"
                    }`}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.bg} ${color.text}`}
                    animate={{ rotate: active ? 6 : 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    {service.icon}
                  </motion.div>

                  <p className="font-bold mb-2">{service.title}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-2 text-sm">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex gap-2 items-center">
                        <ChevronRight size={14} className={color.icon} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT IMAGE PREVIEW */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl
              p-5 sm:p-6 pb-4
              md:h-[420px] lg:h-[520px]
              flex flex-col shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeService}
                src={services[activeService].image}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-40 md:h-44 lg:h-64 object-cover rounded-2xl mb-4"
              />
            </AnimatePresence>

            <p className="text-white font-bold text-lg mb-2">
              {services[activeService].title}
            </p>

            <p className="text-gray-300 text-sm mb-4">
              {services[activeService].description}
            </p>

            <Button
  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details." className="mt-auto py-3"
>
              Get a Design Quote
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DesignServices;
