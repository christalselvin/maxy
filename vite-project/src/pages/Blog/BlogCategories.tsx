import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Palette, TrendingUp, Heart,
  Globe, BookOpen, Cpu, Users,
  Zap, Sparkles, ArrowRight, 
} from 'lucide-react';

interface Category {
  icon: React.ReactNode;
  title: string;
  description: string;
  articleCount: number;
  color: string;
  trending: boolean;
  latestArticle: string;
}

const BlogCategories: React.FC = () => {
  const categories: Category[] = [
    {
      icon: <Code className="text-blue-600" size={24} />,
      title: "Technology",
      description: "Latest tech trends, programming guides, and innovation insights",
      articleCount: 325,
      color: "blue",
      trending: true,
      latestArticle: "Building Modern Web Apps with Next.js 14"
    },
    {
      icon: <Palette className="text-purple-600" size={24} />,
      title: "Design",
      description: "UI/UX principles, creative processes, and visual storytelling",
      articleCount: 189,
      color: "purple",
      trending: true,
      latestArticle: "The Psychology of Color in Digital Interfaces"
    },
    {
      icon: <TrendingUp className="text-emerald-600" size={24} />,
      title: "Business",
      description: "Entrepreneurship, marketing strategies, and industry insights",
      articleCount: 267,
      color: "emerald",
      trending: false,
      latestArticle: "Sustainable Business Models for 2024"
    },
    {
      icon: <Heart className="text-pink-600" size={24} />,
      title: "Health & Wellness",
      description: "Mindfulness, fitness, nutrition, and mental wellbeing",
      articleCount: 142,
      color: "pink",
      trending: true,
      latestArticle: "Mindfulness Techniques for Busy Professionals"
    },
    {
      icon: <Globe className="text-cyan-600" size={24} />,
      title: "Travel",
      description: "Cultural experiences, hidden gems, and travel tips",
      articleCount: 98,
      color: "cyan",
      trending: false,
      latestArticle: "Digital Nomad Guide to Southeast Asia"
    },
    {
      icon: <BookOpen className="text-amber-600" size={24} />,
      title: "Education",
      description: "Learning strategies, skill development, and educational trends",
      articleCount: 156,
      color: "amber",
      trending: false,
      latestArticle: "The Future of Online Learning Platforms"
    },
    {
      icon: <Cpu className="text-indigo-600" size={24} />,
      title: "AI & Machine Learning",
      description: "Artificial intelligence developments and practical applications",
      articleCount: 203,
      color: "indigo",
      trending: true,
      latestArticle: "Building AI-Powered Chatbots with GPT-4"
    },
    {
      icon: <Users className="text-rose-600" size={24} />,
      title: "Productivity",
      description: "Time management, workflow optimization, and efficiency tips",
      articleCount: 178,
      color: "rose",
      trending: false,
      latestArticle: "Maximizing Remote Work Productivity"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="font-semibold">Explore Topics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dive Into Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 ml-3">
              Favorite Topics
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our carefully curated categories and discover content that matches your interests
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Trending badge */}
              {category.trending && (
                <div className="absolute -top-2 -right-2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                    <Zap size={10} />
                    <span>Trending</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Icon and title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-${category.color}-100`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 flex-grow">{category.description}</p>

                {/* Stats and latest article */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {category.articleCount} articles
                    </div>
                    {category.trending && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <TrendingUp size={14} />
                        <span className="text-xs font-semibold">Hot</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500 mb-2">Latest Article</div>
                    <div className="text-gray-900 font-medium text-sm">{category.latestArticle}</div>
                  </div>

                  {/* View button */}
                  <button className={`flex items-center gap-2 text-${category.color}-600 hover:text-${category.color}-700 font-semibold mt-4`}>
                    <span>Explore Category</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category stats */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">8+</div>
              <div className="text-emerald-100">Topic Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,250+</div>
              <div className="text-emerald-100">Total Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-emerald-100">Expert Writers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Daily</div>
              <div className="text-emerald-100">New Content</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogCategories;