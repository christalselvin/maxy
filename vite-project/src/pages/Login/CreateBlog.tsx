import { useState, type ChangeEvent, type FormEvent } from "react";
import { createBlog } from "../api/blogApi";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    heading: "",
    subheading: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    image_link: "",
    video_link: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createBlog({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });

      alert("Blog created successfully!");

      setForm({
        title: "",
        heading: "",
        subheading: "",
        content: "",
        author: "",
        category: "",
        tags: "",
        image_link: "",
        video_link: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading *
                  </label>
                  <input
                    name="heading"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.heading}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheading
                </label>
                <input
                  name="subheading"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={form.subheading}
                  onChange={handleChange}
                />
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Content */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Blog Content
              </h3>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                required
                rows={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none font-mono text-sm"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your amazing blog post here... (supports Markdown if your backend does)"
              />
            </section>

            <hr className="border-gray-200" />

            {/* Meta & Media */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Metadata & Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    name="author"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.author}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    name="category"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    name="tags"
                    type="text"
                    placeholder="e.g. #react #tailwind #javascript"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.tags}
                    onChange={handleChange}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Separate tags with #
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    name="image_link"
                    type="url"
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.image_link}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL (optional)
                  </label>
                  <input
                    name="video_link"
                    type="url"
                    placeholder="YouTube, Vimeo, etc."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={form.video_link}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition shadow-lg"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;