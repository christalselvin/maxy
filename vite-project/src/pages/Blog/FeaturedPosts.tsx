// src/components/FeaturedPosts.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, User, Clock, ArrowRight,
  BookOpen, Heart, MessageSquare,
  Star, TrendingUp, Sparkles
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BlogPost {
  _id: string;
  title: string;
  subheading?: string;
  content: string;
  author: string;
  created_at: string;
  category?: string;
  tags?: string[];
  image_link?: string;
}

const FeaturedPosts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        setPosts(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'technology', label: 'Technology' },
    { id: 'design', label: 'Design' },
    { id: 'business', label: 'Business' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'health', label: 'Health' }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category?.toLowerCase() === activeCategory.toLowerCase());

  const isFeatured = (index: number) => index === 0;
  const isTrending = (post: BlogPost) => {
    const postDate = new Date(post.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return postDate > weekAgo;
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <Sparkles className="animate-spin text-emerald-600 mx-auto mb-4" size={40} />
          <p className="text-xl text-gray-600">Loading amazing articles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 ml-3">Articles & Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked articles covering the latest trends and insights across various topics
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {activeCategory === category.id && <Sparkles size={14} />}
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-gray-600 text-lg">No articles found in this category yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const featured = isFeatured(index);
              const trending = isTrending(post);

              return (
                <motion.div
                  key={post._id}
                  className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer
                    ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/blog/${post._id}`)} // ← Full page navigation
                >
                  {/* Badges */}
                  {featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                        <Star size={10} /> Featured
                      </div>
                    </div>
                  )}
                  {trending && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                        <TrendingUp size={10} /> Trending
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden bg-gray-200`}>
                    {post.image_link ? (
                      <img src={post.image_link} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                        <BookOpen size={48} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    {post.category && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2"><User size={14} /> {post.author || "Anonymous"}</div>
                      <div className="flex items-center gap-2"><Calendar size={14} /> {post.created_at.split(" ")[0]}</div>
                      <div className="flex items-center gap-2"><Clock size={14} /> 5 min read</div>
                    </div>

                    <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.subheading || post.content.substring(0, 150) + "..."}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2"><Heart size={18} className="hover:text-red-500 transition" /> —</div>
                        <div className="flex items-center gap-2"><MessageSquare size={18} className="hover:text-blue-500 transition" /> —</div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/blog/${post._id}`); }}
                        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        Read Article <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold flex items-center gap-3 mx-auto">
            Browse All Articles <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPosts;