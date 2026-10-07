import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    company: "FinTech Solutions",
    rating: 5,
    text: "A reliable partner. They modernized our IT processes and reduced operational costs within months.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Laura Bianchi",
    company: "Healthcare Group",
    rating: 5,
    text: "Excellent training programs and continuous support. The team is highly professional.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Alessandro Conti",
    company: "E-Commerce Hub",
    rating: 4,
    text: "Clear services, fast communication, and real results. Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-6 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What Our{" "}
            <span className="relative inline-block">
              Clients Say
              <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-blue-600 rounded-full" />
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from companies that trust our IT consulting,
            training, and placement services.
          </p>
        </motion.div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="
                bg-white p-6 sm:p-8 rounded-3xl
                border border-gray-100 shadow-md
                transition-all duration-300
                hover:shadow-xl
              "
            >
              {/* STARS */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-gray-600 italic mb-6 text-sm sm:text-base leading-relaxed">
                “{t.text}”
              </p>

              {/* AUTHOR */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  loading="lazy"
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {t.name}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
