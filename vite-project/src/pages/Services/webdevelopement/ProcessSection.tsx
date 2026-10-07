import React from "react";
import { motion } from "framer-motion";
import { Eye, Palette, Code, Shield } from "lucide-react";

interface Phase {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ProcessSection: React.FC = () => {
  const phases: Phase[] = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We dive deep into your business goals and create a detailed project roadmap",
      icon: <Eye />,
    },
    {
      step: "02",
      title: "UI/UX Design",
      description:
        "Wireframes and prototypes that focus on user experience and conversions",
      icon: <Palette />,
    },
    {
      step: "03",
      title: "Development",
      description:
        "Agile development with weekly updates and demo sessions",
      icon: <Code />,
    },
    {
      step: "04",
      title: "Testing & QA",
      description:
        "Rigorous testing across devices, browsers, and performance metrics",
      icon: <Shield />,
    },
    {
      step: "05",
      title: "Launch & Support",
      description:
        "Deployment, monitoring, and ongoing maintenance",
      icon: <RocketIcon />,
    },
  ];

  return (
    <section className="py-3 sm:py-14 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            From concept to
            <span className="text-emerald-600 ml-2">launch</span>
          </h2>
        </div>

        <div className="relative">

          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-200 to-cyan-200 hidden lg:block" />

          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`relative mb-12 lg:mb-0 lg:flex items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 border-emerald-500 rounded-full hidden lg:block z-10" />

              {/* CARD */}
              <div
                className={`lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                }`}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative group"
                >
                  {/* Gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-[2px] rounded-2xl bg-white" />

                  {/* Card content */}
                  <div className="relative rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white rounded-xl mb-6">
                      <span className="text-xl font-bold">
                        {phase.step}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {phase.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base">
                      {phase.description}
                    </p>

                    <div className="mt-4 text-emerald-600 font-semibold text-sm">
                      Duration: 1–2 weeks
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="lg:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RocketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export default ProcessSection;
