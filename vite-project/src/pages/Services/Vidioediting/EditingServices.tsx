import React from 'react';
import { motion } from 'framer-motion';
import {
  Film, Video, Music, Tv,
  Palette, Globe,
  ChevronRight, Star, Clock
} from 'lucide-react';
import Button from '../../../components/Ui/Button';
import vidio from "../../../assets/Service/Digitalmarket/snap.gif";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  iconColor: string;
  price: string;
  turnaround: string;
}

const services: Service[] = [
  {
    icon: <Film size={32} />,
    title: "Cinematic Editing",
    description: "Hollywood-style editing with dramatic pacing and storytelling",
    features: ["Color Grading", "Sound Design", "Visual Effects", "Motion Graphics"],
    iconColor: "text-cyan-400",
    price: "$1,500+",
    turnaround: "5–7 days",
  },
  {
    icon: <Video size={32} />,
    title: "Corporate Videos",
    description: "Professional business videos aligned with your brand",
    features: ["Brand Integration", "Interview Editing", "B-roll", "Subtitles"],
    iconColor: "text-teal-400",
    price: "$800+",
    turnaround: "3–5 days",
  },
  {
    icon: <Music size={32} />,
    title: "Music Videos",
    description: "Rhythmic, high-energy edits synced to music",
    features: ["Beat Sync", "Visual Effects", "Color Theory", "Storyboarding"],
    iconColor: "text-emerald-400",
    price: "$2,000+",
    turnaround: "7–10 days",
  },
  {
    icon: <Tv size={32} />,
    title: "YouTube Content",
    description: "Retention-optimized edits for creators",
    features: ["Jump Cuts", "Graphics Pack", "SEO Cuts", "Thumbnails"],
    iconColor: "text-cyan-400",
    price: "$500+",
    turnaround: "2–3 days",
  },
  {
    icon: <Globe size={32} />,
    title: "Social Media Clips",
    description: "Short-form content for reels & shorts",
    features: ["Vertical Format", "Trends", "Fast Cuts", "Text Animations"],
    iconColor: "text-green-400",
    price: "$300+",
    turnaround: "24–48h",
  },
  {
    icon: <Palette size={32} />,
    title: "Color Grading",
    description: "Cinematic color correction & LUTs",
    features: ["LUT Creation", "Skin Tones", "Mood", "HDR"],
    iconColor: "text-teal-400",
    price: "$400+",
    turnaround: "2–3 days",
  },
];

const EditingServices: React.FC = () => {
  return (
    <section className="relative overflow-x-hidden py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Professional
            <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              Video Editing Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            High-end video editing solutions crafted for brands, creators, and businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

          {/* SERVICE CARDS */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl
                           p-5 md:p-6 border border-gray-700
                           transition-colors duration-300 overflow-hidden
                           hover:border-gray-500/80"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 ring-1 ring-white/10">
                    <div className={service.iconColor}>{service.icon}</div>
                  </div>
                  <Star size={16} className="text-yellow-400 opacity-70" />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm md:text-base">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.iconColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <div>
                    <div className="text-xl font-bold text-white">{service.price}</div>
                    <span className="text-xs text-gray-400">Starting</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock size={14} />
                    {service.turnaround}
                  </div>
                </div>

                <div className={`mt-4 flex items-center gap-1 font-semibold ${service.iconColor} text-sm`}>
                  View Portfolio <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            className="relative bg-gradient-to-br from-gray-800 to-gray-900
                       rounded-2xl md:rounded-3xl p-5 md:p-6
                       border border-gray-700 shadow-2xl
                       self-start overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <img
                src={vidio}
                loading="lazy"
                alt="service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Custom Editing Packages
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Every project is tailored to your creative vision.
              </p>

              <div className="space-y-3 text-xs text-gray-300 mb-5">
                <p>• Dedicated Editor</p>
                <p>• Fast Turnaround</p>
                <p>• Unlimited Revisions</p>
                <p>• Premium Assets</p>
              </div>

              <div className="space-y-3">
                <Button href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details." variant="primary" className="w-full">
                  Get Custom Quote
                </Button>
                <Button href='/contact' variant="ghost" className="w-full">
                  Connect Us
                </Button>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-700 text-center text-xs text-gray-400">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Free consultation included
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EditingServices;
