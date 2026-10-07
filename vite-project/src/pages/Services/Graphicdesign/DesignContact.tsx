import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  Calendar,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
}

const DesignContact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    budget: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "Brand Identity",
    "UI/UX Design",
    "Print Design",
    "Web Design",
    "App Design",
    "Social Media",
    "Packaging Design",
    "Motion Graphics",
  ];

  const budgets = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ✅ UPDATED SUBMIT FUNCTION (SENDS TO WHATSAPP)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneNumber = "919150331137"; // Your WhatsApp number

    const text = `
New Project Inquiry:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Service: ${formData.service}
Budget: ${formData.budget}

Message:
${formData.message}
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");

    setIsSubmitting(false);
    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      budget: "",
    });
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to Make a
            <span className="block md:inline ml-0 md:ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Creative Splash?
            </span>
          </h2>

          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Start your design journey with us. Share your vision and let’s build
            something meaningful.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">

          {/* FORM */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                  <CheckCircle className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  We’ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Send size={18} className="text-cyan-600" />
                  Start Your Project
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="name" required placeholder="Your Name"
                      value={formData.name} onChange={handleChange} className="input" />
                    <input name="email" required placeholder="Email Address"
                      value={formData.email} onChange={handleChange} className="input" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="company" placeholder="Company"
                      value={formData.company} onChange={handleChange} className="input" />
                    <select name="service" required value={formData.service}
                      onChange={handleChange} className="input">
                      <option value="">Select Service</option>
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {budgets.map((b) => (
                      <label key={b}
                        className={`text-center px-3 py-2 rounded-xl border-2 text-sm cursor-pointer
                        ${formData.budget === b
                            ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                            : "border-gray-200"
                          }`}>
                        <input type="radio" name="budget" value={b}
                          checked={formData.budget === b}
                          onChange={handleChange} className="sr-only" />
                        {b}
                      </label>
                    ))}
                  </div>

                  <textarea name="message" required rows={4}
                    placeholder="Tell us about your project"
                    value={formData.message} onChange={handleChange}
                    className="input resize-none" />

                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                </form>
              </>
            )}
          </motion.div>

          {/* INFO SIDE */}
          <div className="space-y-5">
            {[
              { icon: Mail, text: "hr@maxotechs.com" },
              { icon: MapPin, text: "Marthandam, Tamil Nadu" },
              { icon: Clock, text: "Mon–Fri 9AM–6PM" },
            ].map((i, idx) => (
              <div key={idx}
                className="bg-white p-5 rounded-2xl shadow-xl border border-gray-200 flex gap-4">
                <i.icon className="text-cyan-600" size={22} />
                <span className="text-gray-700">{i.text}</span>
              </div>
            ))}

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
              <Calendar size={22} />
              <p className="mt-3 font-semibold">
                Book a 30-minute discovery call
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          outline: none;
        }
        .input:focus {
          border-color: #06b6d4;
        }
      `}</style>
    </section>
  );
};

export default DesignContact;
