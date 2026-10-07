import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Globe,
  Terminal,
  Server,
  Database,
  Cloud,
  Cpu,
  ShieldCheck,
  GitBranch,
  Layers,
  Monitor,
  Boxes,
} from "lucide-react";
import Button from "../../../components/Ui/Button";

const technologies = [
  { name: "React", icon: Code, color: "from-cyan-500 to-blue-500" },
  { name: "Next.js", icon: Globe, color: "from-gray-500 to-gray-700" },
  { name: "TypeScript", icon: Terminal, color: "from-blue-500 to-indigo-500" },
  { name: "Node.js", icon: Server, color: "from-emerald-500 to-cyan-500" },
  { name: "MongoDB", icon: Database, color: "from-green-500 to-emerald-500" },
  { name: "AWS Cloud", icon: Cloud, color: "from-orange-500 to-amber-500" },
  { name: "Docker", icon: Boxes, color: "from-sky-500 to-blue-500" },
  { name: "Microservices", icon: Layers, color: "from-indigo-500 to-purple-500" },
  { name: "System Design", icon: Cpu, color: "from-fuchsia-500 to-pink-500" },
  { name: "Security", icon: ShieldCheck, color: "from-red-500 to-rose-500" },
  { name: "Git & CI/CD", icon: GitBranch, color: "from-orange-600 to-yellow-500" },
  { name: "Web Performance", icon: Monitor, color: "from-teal-500 to-cyan-500" },
];

const TechnologyStack: React.FC = () => {
  return (
    <section className="py-10 sm:py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Modern{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Technology Stack
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            We use industry-leading technologies to build fast, secure,
            scalable, and SEO-optimized web applications.
          </p>
        </motion.div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 mb-14">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="
                group bg-white rounded-2xl p-4 sm:p-5
                border border-gray-200
                hover:shadow-xl hover:-translate-y-2
                transition-all duration-300
                text-center
              "
            >
              {/* ICON */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`
                  mx-auto mb-4 w-14 h-14 rounded-xl
                  flex items-center justify-center
                  bg-gradient-to-br ${tech.color}
                  text-white shadow-lg
                `}
              >
                <tech.icon size={28} />
              </motion.div>

              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                {tech.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            bg-gradient-to-r from-indigo-600 to-cyan-600
            rounded-3xl p-6 sm:p-8
            flex flex-col md:flex-row
            items-center justify-between gap-6
            text-white
          "
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to build your next web product?
            </h3>
            <p className="text-white/90 mt-1 text-sm sm:text-base">
              Get expert guidance, clean architecture, and fast delivery.
            </p>
          </div>

          <Button  href="tel:+919150331137" className="bg-white text-indigo-700 hover:bg-gray-100">
            Schedule a Free Call
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default TechnologyStack;
