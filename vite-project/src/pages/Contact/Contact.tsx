import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "../../components/Ui/Button";

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // ✅ Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // ✅ Send to WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const phoneNumber = "919150331137"; // 🔴 Your WhatsApp number

    const text = `
New Contact Message:

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");

    setLoading(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 sm:px-6 py-16 sm:py-20 md:py-40">
      
      <motion.div className="absolute inset-0 pointer-events-none ">
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-20" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto mt-10">
        
        {/* HEADER */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
            Let’s Build Something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Amazing Together
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your project. We’ll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* CONTACT INFO */}
          <motion.div className="space-y-6">
            {[
              { icon: <Mail />, title: "Email", value: "hr@maxotechs.com" },
              { icon: <Phone />, title: "Phone", value: "+91 9150331137" },
              { icon: <MapPin />, title: "Location", value: "Tamil Nadu, India" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.title}</div>
                  <div className="text-gray-600">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* FORM */}
          <motion.div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200">
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="hr@maxotechs.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={18} />
              </Button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
