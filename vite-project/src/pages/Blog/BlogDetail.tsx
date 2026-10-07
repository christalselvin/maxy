// src/pages/BlogDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, PlayCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BlogPost {
  _id: string;
  title: string;
  heading?: string;
  subheading?: string;
  content: string;
  author: string;
  created_at: string;
  category?: string;
  tags?: string[];
  image_link?: string;
  video_link?: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blogs`);
        const allBlogs: BlogPost[] = res.data;

        const currentBlog = allBlogs.find((b) => b._id === id);

        if (!currentBlog) {
          setError(true);
          setLoading(false);
          return;
        }

        setBlog(currentBlog);

        // Related posts logic - safely handle optional category
        let related: BlogPost[] = [];

        if (currentBlog.category) {
          const lowerCategory = currentBlog.category.toLowerCase();
          related = allBlogs
            .filter((b) => b._id !== id && b.category?.toLowerCase() === lowerCategory)
            .slice(0, 3);
        }

        // If less than 3 from same category, fill with random others
        if (related.length < 3) {
          const remaining = allBlogs
            .filter((b) => b._id !== id && !related.includes(b))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3 - related.length);

          related = [...related, ...remaining];
        }

        setRelatedPosts(related);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Article Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-600 hover:underline text-lg font-medium"
        >
          <ArrowLeft size={22} /> Back to Articles
        </button>
      </div>
    );
  }

  const embedUrl = blog.video_link ? getYouTubeEmbedUrl(blog.video_link) : null;

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition mb-8 text-lg font-medium"
        >
          <ArrowLeft size={22} />
          Back to Articles
        </button>
      </div>

      {/* Hero Title */}
      <header className="max-w-5xl mx-auto px-6 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600">
            {blog.title}
          </span>
        </motion.h1>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Featured Image */}
          {blog.image_link && (
            <div className="relative w-full h-96 md:h-[520px] overflow-hidden">
              <img src={blog.image_link} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          )}

          {/* YouTube Video - Centered */}
          {embedUrl && (
            <div className="p-8 md:p-12 bg-gray-900">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
                  <iframe
                    src={embedUrl}
                    title="Embedded Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-3 text-white bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                    <PlayCircle size={28} />
                    <span className="text-xl font-semibold">Watch Featured Video</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Heading */}
            {blog.heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 group">
                <span className="relative inline-block pb-2">
                  {blog.heading}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </span>
              </h2>
            )}

            {/* Subheading */}
            {blog.subheading && (
              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-12 pl-8 md:pl-16 border-l-4 border-emerald-500">
                {blog.subheading}
              </p>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8 text-justify mb-16">
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content.replace(/\n/g, '<br/>'),
                }}
              />
            </div>

            {/* Meta Info */}
            <div className="mt-16 pt-10 border-t-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 text-gray-600">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-lg">
                    <User size={24} className="text-emerald-600" />
                    <span className="font-semibold text-gray-900">{blog.author || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Calendar size={24} className="text-blue-600" />
                    <span className="font-medium">Posted on {blog.created_at}</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <Clock size={24} className="text-purple-600" />
                    <span>~8 min read</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {blog.category && (
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-gray-800">Category:</span>
                      <span className="px-5 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium text-lg">
                        {blog.category}
                      </span>
                    </div>
                  )}
                  {blog.tags && blog.tags.length > 0 && (
                    <div>
                      <span className="text-lg font-semibold text-gray-800 block mb-3">Tags:</span>
                      <div className="flex flex-wrap gap-3">
                        {blog.tags.map((tag) => (
                          <span key={tag} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-8 mt-12">
                <button className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition text-lg font-medium">
                  <Heart size={28} /> Like
                </button>
                <button className="flex items-center gap-3 text-gray-600 hover:text-blue-500 transition text-lg font-medium">
                  <Share2 size={28} /> Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Related Articles
              </span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <motion.div
                  key={post._id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer border border-gray-200"
                  onClick={() => navigate(`/blog/${post._id}`)}
                >
                  {post.image_link ? (
                    <img src={post.image_link} alt={post.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">{post.title[0]}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 hover:text-emerald-600 transition">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.subheading || post.content.substring(0, 100) + "..."}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <ArrowRight className="text-emerald-600" size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogDetail;