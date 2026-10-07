import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getBlogs = async () => {
  const res = await axios.get(`${API_BASE_URL}/blogs`);
  return res.data;
};

export const createBlog = async (data: any) => {
  const res = await axios.post(`${API_BASE_URL}/blog`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const searchBlogsByTitle = async (title: string) => {
  const res = await axios.get(`${API_BASE_URL}/blogs/search`, {
    params: { title },
  });
  return res.data; // { count, blogs }
};
