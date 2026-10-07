import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Cpu,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Button from "../../../components/Ui/Button";

import ITConsulting from "../../../assets/Service/It/ITConsulting.webp";
import PlacementSupport from "../../../assets/Service/It/PlacementSupport.webp";
import TrainingPrograms from "../../../assets/Service/It/TrainingPrograms.webp";

const services = [
  {
    title: "IT Consulting",
    description:
      "Strategic technology consulting to modernize infrastructure, reduce cost, and improve system reliability.",
    features: [
      "Architecture & system audits",
      "Cloud & DevOps strategy",
      "Security & compliance planning",
    ],
    image: ITConsulting,
    icon: <FileText className="w-7 h-7" />,
  },
  {
    title: "Training Programs",
    description:
      "Industry-aligned IT training designed to make candidates job-ready with real-world skills.",
    features: [
      "Hands-on project training",
      "Mentor-led sessions",
      "Career-focused curriculum",
    ],
    image: TrainingPrograms,
    icon: <Cpu className="w-7 h-7" />,
  },
  {
    title: "Placement Support",
    description:
      "End-to-end placement assistance connecting skilled professionals with trusted companies.",
    features: [
      "Interview preparation",
      "Resume & profile building",
      "Direct hiring partner access",
    ],
    image: PlacementSupport,
    icon: <Shield className="w-7 h-7" />,
  },
];

const ServicesSection: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Services
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Consulting, training, and placement solutions designed to deliver
            real business and career outcomes.
          </p>
        </motion.div>

        {/* SERVICES */}
        <div className="space-y-10 md:space-y-14">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`
                group grid md:grid-cols-2 gap-6 md:gap-12 items-center
                rounded-2xl p-5 sm:p-8
                transition-all duration-300
                ${
                  index === active
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50"
                    : "bg-gray-50"
                }
              `}
            >
              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={index % 2 ? "md:order-2" : ""}
              >
                <div className="relative">
                  <img
                    src={service.image}
                    loading="lazy"
                    alt={service.title}
                    className="w-full h-[200px] sm:h-[240px] md:h-[280px]
                      object-cover rounded-xl shadow-md"
                  />

                  {/* ICON BADGE */}
                  <div
                    className="absolute -bottom-4 -right-4
                      w-12 h-12 rounded-lg
                      bg-gradient-to-br from-blue-600 to-indigo-600
                      flex items-center justify-center text-white shadow-lg"
                  >
                    {service.icon}
                  </div>
                </div>
              </motion.div>

              {/* CONTENT */}
              <div className={index % 2 ? "md:order-1" : ""}>
                <div className="relative w-fit">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <span
                    className="absolute left-0 -bottom-1 h-[3px] w-0
                    bg-blue-600 rounded-full
                    transition-all duration-300
                    group-hover:w-full"
                  />
                </div>

                <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {service.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <Button href="/contact" className="inline-flex items-center gap-2">
                    Request Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
