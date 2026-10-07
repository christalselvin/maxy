import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Eye, Heart, ChevronRight } from "lucide-react";

import branding from "../../../assets/Service/Graphicdesign/instagram.webp";
import uiux from "../../../assets/Service/Graphicdesign/ux.webp";
import Restaurant from "../../../assets/Service/Graphicdesign/Restaurant.webp";
import mobile from "../../../assets/Service/Graphicdesign/Mobile.webp";
import illustration from "../../../assets/Service/Graphicdesign/Illustrations.webp";
import web from "../../../assets/Service/Graphicdesign/webdesign.webp";
import Campaign from "../../../assets/Service/Graphicdesign/Campaign.webp";
import Wave from "../../../assets/Service/Graphicdesign/Wave.webp";

const COLOR_MAP = {
  cyan: "bg-cyan-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  amber: "bg-amber-500",
  teal: "bg-teal-500",
  rose: "bg-rose-500",
};

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  views: number;
  color: keyof typeof COLOR_MAP;
}

const PortfolioShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Oceanic Brand Identity",
      category: "branding",
      description: "Complete visual identity system for a modern brand.",
      image: branding,
      likes: 245,
      views: 1200,
      color: "cyan",
    },
    {
      id: 2,
      title: "Wave UI/UX Dashboard",
      category: "ui-ux",
      description: "User-centric UI/UX dashboard design.",
      image: uiux,
      likes: 189,
      views: 980,
      color: "blue",
    },
    {
      id: 3,
      title: "Seaside Restaurant Menu",
      category: "print",
      description: "Premium print design for hospitality brands.",
      image: Restaurant,
      likes: 156,
      views: 850,
      color: "emerald",
    },
    {
      id: 4,
      title: "Aqua Mobile App UI",
      category: "mobile",
      description: "Clean and modern mobile app interface design.",
      image: mobile,
      likes: 312,
      views: 1500,
      color: "purple",
    },
    {
      id: 5,
      title: "Marine Illustrations",
      category: "illustration",
      description: "Custom digital illustrations with creative depth.",
      image: illustration,
      likes: 278,
      views: 1350,
      color: "pink",
    },
    {
      id: 6,
      title: "Luxury Resort Website",
      category: "web",
      description: "Responsive website design with premium visuals.",
      image: web,
      likes: 198,
      views: 920,
      color: "amber",
    },
    {
      id: 7,
      title: "Creative Campaign Design",
      category: "campaign",
      description: "High-impact campaign creatives for marketing.",
      image: Campaign,
      likes: 220,
      views: 1100,
      color: "rose",
    },
    {
      id: 8,
      title: "Wave Pattern Collection",
      category: "pattern",
      description: "Custom pattern and texture design system.",
      image: Wave,
      likes: 165,
      views: 780,
      color: "teal",
    },
  ];

  const categories = [
    { id: "all", label: "All Works" },
    { id: "branding", label: "Branding" },
    { id: "ui-ux", label: "UI / UX" },
    { id: "print", label: "Print" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-10 px-6 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* FILTER BAR (USES setActiveFilter ✅) */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  activeFilter === cat.id
                    ? "bg-cyan-600 text-white shadow"
                    : "bg-white text-gray-600 border hover:bg-gray-50"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${COLOR_MAP[item.color]}`}
                  >
                    {item.category}
                  </span>
                </div>

                {item.likes > 200 && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                    <Star size={10} /> Featured
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-rose-500" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} className="text-blue-500" />
                      {item.views}
                    </span>
                  </div>

                  <span className="text-cyan-600 font-semibold flex items-center gap-1">
                    View Project <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioShowcase;
