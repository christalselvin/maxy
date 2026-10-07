import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Search,
  TrendingUp,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Sparkles,
  Clock,
  Heart,
  Share2,
} from "lucide-react";
import { searchBlogsByTitle } from "../api/blogApi";

const BlogHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    try {
      const res = await searchBlogsByTitle(searchQuery);
      setSearchResults(res.blogs || []);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    handleSearch();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: any[] = [];
    const words = ["Blog", "Write", "Read", "Learn", "Share", "Create", "Story", "Article", "Post", "Ideas", "Words", "Content"];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 16 + 8,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        text: words[Math.floor(Math.random() * words.length)],
        color: i % 4 === 0 ? "#10b981" : i % 4 === 1 ? "#3b82f6" : i % 4 === 2 ? "#8b5cf6" : "#ec4899",
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(248, 250, 252, 0.8)");
      gradient.addColorStop(1, "rgba(241, 245, 249, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += Math.sin(time * 0.001 + particle.y * 0.01) * 0.3;
        particle.y += Math.cos(time * 0.001 + particle.x * 0.01) * 0.2;
        particle.rotation += 0.001;
        particle.opacity = 0.1 + Math.sin(time * 0.005 + particle.x * 0.01) * 0.2;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.font = `${particle.size}px Inter, sans-serif`;
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.text, 0, 0);
        ctx.restore();
      });

      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative floating orbs - hidden on small screens */}
      <motion.div
        className="hidden md:block absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full opacity-20"
        animate={{ y: [0, -40, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20"
        animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            
              

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Where Ideas
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Come to Life
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Discover thought-provoking articles, expert insights, and inspiring stories that fuel creativity and drive innovation. Join our community of curious minds.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-12 pr-32 py-4 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-base"
                />
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-shadow disabled:opacity-70"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["Technology", "Design", "Business", "Lifestyle", "Health", "Education"].map((tag) => (
                  <span
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-3 py-1.5 bg-white/50 backdrop-blur-sm text-gray-700 text-xs sm:text-sm rounded-full border border-gray-200 hover:border-emerald-300 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Search Results */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {isLoading ? (
                  <div className="p-8 text-center">
                    <Sparkles className="inline-block animate-spin mb-3" size={28} />
                    <p className="text-gray-600">Searching for "{searchQuery}"...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                    {searchResults.map((blog: any) => (
                      <div
                        key={blog._id}
                        className="p-4 sm:p-5 hover:bg-gray-50 transition cursor-pointer flex items-start justify-between gap-3"
                        onClick={() => console.log("Navigate to:", blog._id)}
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">{blog.title}</h3>
                          {blog.subheading && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.subheading}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User size={12} /> {blog.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} /> {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="text-emerald-600 flex-shrink-0 mt-1" size={18} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-600">
                    <p className="text-base">No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-2">Try different keywords or explore the categories above.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: BookOpen, value: "1,250+", label: "Articles Published", color: "emerald" },
                { icon: User, value: "50+", label: "Expert Writers", color: "blue" },
                { icon: TrendingUp, value: "2M+", label: "Monthly Readers", color: "purple" },
                { icon: Calendar, value: "Weekly", label: "New Content", color: "pink" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
                  <div className={`text-xl sm:text-2xl font-bold text-${stat.color}-700 mb-1 flex items-center justify-center gap-2`}>
                    <stat.icon size={18} />
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Article (Hidden on mobile, shown on lg+) */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Featured Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  <Sparkles size={14} />
                  <span>Featured Article</span>
                </div>
              </div>

              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured Article"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={14} /> <span className="font-medium">Sarah Johnson</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> <span>Mar 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} /> <span>8 min read</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-emerald-600 transition-colors cursor-pointer">
                  The Future of Web Design: AI-Powered Creativity
                </h2>

                <p className="text-gray-600 mb-6">
                  Explore how artificial intelligence is revolutionizing the way we design digital experiences. From automated layouts to personalized user interfaces...
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Web Design", "AI", "Technology", "Future", "Creativity"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart size={18} className="hover:text-red-500 cursor-pointer" />
                      <span className="text-sm">2.4K</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Share2 size={18} className="hover:text-blue-500 cursor-pointer" />
                      <span className="text-sm">Share</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold">
                    Read Full Article <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 w-64 border border-gray-200"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Trending Now</div>
                  <div className="text-sm text-gray-600">Most read this week</div>
                </div>
              </div>
              <div className="text-xl font-bold text-blue-700">+45%</div>
              <div className="text-sm text-gray-600">Reader engagement</div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-2xl p-6 w-56"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <PenTool className="text-white" size={20} />
                <div>
                  <div className="font-bold text-white">Weekly Digest</div>
                  <div className="text-emerald-100 text-sm">New articles every Monday</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-emerald-100 text-sm">New articles weekly</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-gray-600 text-sm mb-2">Scroll to explore</div>
        <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogHero;