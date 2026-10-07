import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Star, Eye, ThumbsUp,
  Filter, ChevronRight
} from 'lucide-react';

const COLOR_MAP: Record<string, { ring: string; bg: string }> = {
  blue: { ring: 'bg-blue-500/20', bg: 'bg-blue-500' },
  purple: { ring: 'bg-purple-500/20', bg: 'bg-purple-500' },
  pink: { ring: 'bg-pink-500/20', bg: 'bg-pink-500' },
  cyan: { ring: 'bg-cyan-500/20', bg: 'bg-cyan-500' },
  green: { ring: 'bg-green-500/20', bg: 'bg-green-500' },
  red: { ring: 'bg-red-500/20', bg: 'bg-red-500' },
  amber: { ring: 'bg-amber-500/20', bg: 'bg-amber-500' },
  violet: { ring: 'bg-violet-500/20', bg: 'bg-violet-500' },
};

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  client: string;
  color: keyof typeof COLOR_MAP;
  featured: boolean;
}

const VideoPortfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Mountain Cinematic",
      category: "cinematic",
      description: "Cinematic landscape storytelling with dramatic color grading",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
      duration: "3:45",
      views: "2.4M",
      likes: "125K",
      client: "Nature Channel",
      color: "blue",
      featured: true
    },
    {
      id: 2,
      title: "Tech Startup Promo",
      category: "corporate",
      description: "High-impact corporate video for AI startup branding",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      duration: "2:15",
      views: "850K",
      likes: "42K",
      client: "TechFlow AI",
      color: "purple",
      featured: true
    },
    {
      id: 3,
      title: "Urban Music Video",
      category: "music",
      description: "High-energy music video with beat-synced edits",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
      duration: "4:20",
      views: "5.2M",
      likes: "310K",
      client: "Urban Records",
      color: "pink",
      featured: true
    },
    {
      id: 4,
      title: "Product Launch",
      category: "commercial",
      description: "Luxury product reveal with cinematic motion graphics",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
      duration: "1:45",
      views: "1.8M",
      likes: "89K",
      client: "LuxTech",
      color: "cyan",
      featured: false
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'music', label: 'Music Videos' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-1 md:py-0 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional Video Editing
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              That Captivates Audiences
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A curated showcase of cinematic, corporate, and social media video projects
            crafted by our creative video editing agency.
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition
                ${activeFilter === cat.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                }`}
            >
              {activeFilter === cat.id && <Filter size={14} className="inline mr-1" />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {filteredItems.map((item, i) => {
            const color = COLOR_MAP[item.color];

            return (
              <motion.div
                key={item.id}
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedVideo(item.id)}
              >
                {/* THUMB */}
                <div className="relative h-48">
                  <img
                    src={item.thumbnail}
                    loading="lazy"
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Play className="text-white" />
                    </div>
                  </div>

                  {item.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs rounded-full flex items-center gap-1">
                      <Star size={10} /> Featured
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${color.ring}`}>
                      <div className={`w-5 h-5 rounded-full ${color.bg}`} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{item.client}</div>
                      <div className="text-xs text-gray-500">Client</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1"><Eye size={14} /> {item.views}</span>
                      <span className="flex items-center gap-1"><ThumbsUp size={14} /> {item.likes}</span>
                    </div>
                    <span className="text-blue-400 flex items-center gap-1">
                      View <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MODAL */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-gray-900 rounded-2xl p-8 text-white max-w-xl"
              onClick={e => e.stopPropagation()}
            >
              Video Preview – {portfolioItems.find(v => v.id === selectedVideo)?.title}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPortfolio;
