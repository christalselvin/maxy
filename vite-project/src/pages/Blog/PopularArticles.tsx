import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Clock, User, Calendar,
  Bookmark,  Heart,
  ArrowRight, Star, Zap, BarChart, BookOpen, 
} from 'lucide-react';

interface PopularArticle {
  id: number;
  rank: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  views: string;
  likes: number;
  comments: number;
  bookmarks: number;
  trending: boolean;
}

const PopularArticles: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<string>('weekly');

  const popularArticles: PopularArticle[] = [
    {
      id: 1,
      rank: 1,
      title: "Mastering React Hooks: A Complete Guide",
      excerpt: "Learn how to effectively use React Hooks to build modern, efficient applications.",
      author: "Alex Johnson",
      date: "Mar 15, 2024",
      readTime: "12 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
      views: "45.8K",
      likes: 3250,
      comments: 189,
      bookmarks: 1240,
      trending: true
    },
    {
      id: 2,
      rank: 2,
      title: "The Psychology of User Experience Design",
      excerpt: "Understanding how psychological principles shape effective UX design decisions.",
      author: "Maria Chen",
      date: "Mar 14, 2024",
      readTime: "8 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1200&auto=format&fit=crop",
      views: "38.2K",
      likes: 2890,
      comments: 156,
      bookmarks: 980,
      trending: true
    },
    {
      id: 3,
      rank: 3,
      title: "Building a Successful Startup in 2024",
      excerpt: "Essential strategies and insights for launching and scaling your startup.",
      author: "David Park",
      date: "Mar 13, 2024",
      readTime: "15 min read",
      category: "Business",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
      views: "32.5K",
      likes: 2450,
      comments: 134,
      bookmarks: 870,
      trending: false
    },
    {
      id: 4,
      rank: 4,
      title: "The Future of Artificial Intelligence",
      excerpt: "Exploring upcoming AI trends and their potential impact on society.",
      author: "Dr. Sarah Miller",
      date: "Mar 12, 2024",
      readTime: "20 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
      views: "29.8K",
      likes: 3120,
      comments: 245,
      bookmarks: 1560,
      trending: true
    },
    {
      id: 5,
      rank: 5,
      title: "Mindfulness and Modern Productivity",
      excerpt: "How mindfulness practices can dramatically improve work efficiency.",
      author: "Emma Wilson",
      date: "Mar 11, 2024",
      readTime: "7 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
      views: "27.4K",
      likes: 1980,
      comments: 89,
      bookmarks: 740,
      trending: false
    },
    {
      id: 6,
      rank: 6,
      title: "Sustainable Living in Urban Spaces",
      excerpt: "Practical tips for eco-friendly living in metropolitan areas.",
      author: "Lisa Rodriguez",
      date: "Mar 10, 2024",
      readTime: "9 min read",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1200&auto=format&fit=crop",
      views: "24.1K",
      likes: 1670,
      comments: 78,
      bookmarks: 620,
      trending: false
    }
  ];

  const timeFilters = [
    { id: 'daily', label: 'Today' },
    { id: 'weekly', label: 'This Week' },
    { id: 'monthly', label: 'This Month' },
    { id: 'alltime', label: 'All Time' }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full mb-4">
            <TrendingUp size={16} />
            <span className="font-semibold">Most Popular</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Readers Are
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 ml-3">
              Loving Right Now
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the articles that are capturing attention and sparking conversations
          </p>
        </motion.div>

        {/* Time filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${timeFilter === filter.id
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {timeFilter === filter.id && <Zap size={14} />}
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Popular articles grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left column - Top 3 articles */}
          <div className="lg:col-span-2 space-y-8">
            {popularArticles.slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Rank badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg
                    ${article.rank === 1 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                      article.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                      'bg-gradient-to-r from-amber-700 to-amber-800'}`}>
                    <span className="text-white font-bold text-lg">#{article.rank}</span>
                  </div>
                </div>

                {/* Trending badge */}
                {article.trending && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                      <TrendingUp size={10} />
                      <span>Trending</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:hidden"></div>
                  </div>

                  {/* Content */}
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">{article.excerpt}</p>

                    {/* Category and stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <EyeIcon  />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={14} className="hover:text-red-500 cursor-pointer" />
                            <span>{article.likes.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold">
                        Read Article
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column - Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Weekly digest */}
            <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <BookOpen className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Weekly Digest</h3>
                  <p className="text-emerald-100">Top articles delivered weekly</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-6">
                {popularArticles.slice(3).map((article) => (
                  <li key={article.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-emerald-100 hover:text-white cursor-pointer">
                      {article.title}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="w-full px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Reading stats */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BarChart className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Reading Stats</h3>
                  <p className="text-gray-600">Your weekly activity</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Articles Read</div>
                  <div className="text-3xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-green-600 font-semibold">+3 from last week</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Reading Time</div>
                  <div className="text-3xl font-bold text-gray-900">4h 32m</div>
                  <div className="text-sm text-blue-600 font-semibold">45 min/day average</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-2">Top Category</div>
                  <div className="text-xl font-bold text-emerald-700">Technology</div>
                  <div className="text-sm text-gray-600">8 articles this week</div>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Star className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pro Tip</h3>
                  <p>Save articles to read later</p>
                </div>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Bookmark size={18} />
                Create Reading List
              </button>
            </div>
          </motion.div>
        </div>

        {/* View all popular */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="group px-8 py-4 bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 font-semibold flex items-center gap-3 mx-auto">
            <span>View All Popular Articles</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default PopularArticles;