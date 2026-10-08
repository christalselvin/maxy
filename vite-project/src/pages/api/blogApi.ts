import axios from "axios";

const API_BASE_URL =
  import.meta.env.DEV
    ? (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
    : "";

export const getBlogs = async () => (await axios.get(`${API_BASE_URL}/blogs`)).data;
export const createBlog = async (data: any) => (await axios.post(`${API_BASE_URL}/blog`, data, { headers: { "Content-Type": "application/json" } })).data;
export const searchBlogsByTitle = async (title: string) => (await axios.get(`${API_BASE_URL}/blogs/search`, { params: { title } })).data;
