import { useEffect, useState } from "react";
import api from "../api/api";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image_link?: string;
  created_at: string;
}

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x250?text=No+Image";

const resolveImageUrl = (url?: string) => {
  if (!url) return FALLBACK_IMAGE;

  if (url.includes("share.google")) {
    return FALLBACK_IMAGE;
  }

  if (url.includes("drive.google.com/file/d/")) {
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  if (url.startsWith("http")) {
    return url;
  }

  return FALLBACK_IMAGE;
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blogs")
      .then(res => setBlogs(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading blogs...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Blogs</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map(blog => {
          const imageUrl = resolveImageUrl(blog.image_link);

          return (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={blog.title}
                className="h-40 w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{blog.title}</h3>

                <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                  {blog.content}
                </p>

                <div className="flex justify-between text-xs text-gray-500 mt-4">
                  <span>{blog.author}</span>
                  <span>{blog.created_at}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
