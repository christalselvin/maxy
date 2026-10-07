import { useEffect, useState } from "react";
import { getBlogs } from "../api/blogApi";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getBlogs().then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <img
          key={blog._id}
          src={blog.image_link}
          alt="blog"
          className="w-full h-48 object-cover border"
        />
      ))}
    </div>
  );
};

export default BlogPage;
