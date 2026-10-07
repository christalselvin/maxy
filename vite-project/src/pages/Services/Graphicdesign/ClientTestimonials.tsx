import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  Globe,
  Briefcase,
  Users,
} from "lucide-react";

import img1 from "../../../assets/Service/Graphicdesign/Avathar/boy.webp";
import img2 from "../../../assets/Service/Graphicdesign/Avathar/man.webp";
import img3 from "../../../assets/Service/Graphicdesign/Avathar/men.webp";

/* ✅ SAFE COLOR MAP */
const COLOR_MAP = {
  cyan: "bg-cyan-100 text-cyan-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  project: string;
  color: keyof typeof COLOR_MAP;
}

const ClientTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "Oceanic Brands",
      content:
        "The team transformed our brand identity completely. Our engagement increased by 300% after the redesign.",
      rating: 5,
      image: img1,
      project: "Complete Brand Overhaul",
      color: "cyan",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "WaveTech Solutions",
      content:
        "The UI design looks stunning and improved our user retention by 45%.",
      rating: 5,
      image: img2,
      project: "Mobile App Design",
      color: "blue",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Creative Director",
      company: "Coastal Living Magazine",
      content:
        "The visual storytelling elevated our brand presence significantly.",
      rating: 5,
      image: img3,
      project: "Magazine Layout Design",
      color: "purple",
    },
  ];

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const active = testimonials[currentIndex];

  return (
    <section className="py-10 px-6 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients
            <span className="ml-3 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from businesses we’ve helped transform through design
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* TESTIMONIAL */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentIndex}
              className="bg-white rounded-3xl shadow-2xl p-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Quote className="text-white" size={28} />
              </div>

              <p className="text-2xl italic text-gray-800 mb-8">
                “{active.content}”
              </p>

              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
                <span className="ml-2 text-gray-600">5.0 Rating</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={active.image}
                    loading="lazy"
                    alt={active.name}
                    className="w-16 h-16 rounded-full border-2 border-cyan-500"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{active.name}</h3>
                    <p className="text-gray-600">
                      {active.role} • {active.company}
                    </p>
                  </div>
                </div>

              </div>

              {/* NAV */}
              <div className="absolute -bottom-6 right-8 flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="p-3 bg-white rounded-full shadow-lg"
                >
                  <ChevronLeft className="text-cyan-600" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg"
                >
                  <ChevronRight />
                </button>
              </div>
            </motion.div>

            {/* DOTS */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-3 rounded-full transition-all ${
                    i === currentIndex
                      ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "w-3 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="space-y-6">
            <Stat icon={<Award />} value="98%" label="Client Satisfaction" />
            <Stat icon={<Globe />} value="25+" label="Countries Served" />
            <Stat icon={<Briefcase />} value="85%" label="Repeat Business" />
            <Stat icon={<Users />} value="12+" label="Team Members" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <motion.div className="bg-white rounded-2xl p-8 shadow-xl border">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-cyan-100 rounded-xl text-cyan-600">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-600">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default ClientTestimonials;
