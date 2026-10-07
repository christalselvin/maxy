import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  GitBranch,
  Cpu,
  Upload,
  Download,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface Stat {
  label: string;
  value: string;
}

const InteractiveDemo: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Drag & Drop Builder",
      description: "Create stunning layouts without writing code",
      icon: <Layers size={24} className="text-emerald-600" />,
      features: ["Visual Editor", "Pre-built Templates", "Real-time Preview"],
    },
    {
      title: "API Integration",
      description: "Connect with 500+ services and platforms",
      icon: <GitBranch size={24} className="text-blue-600" />,
      features: ["REST & GraphQL", "Webhook Support", "Auto-generated Docs"],
    },
    {
      title: "AI-Powered Analytics",
      description: "Get intelligent insights and recommendations",
      icon: <Cpu size={24} className="text-purple-600" />,
      features: ["Predictive Analytics", "User Behavior", "Conversion Tips"],
    },
  ];

  const codeLines: string[] = [
    "<div className='container'>",
    "  <Header />",
    "  <HeroSection />",
    "  <Features />",
    "  <Footer />",
    "</div>",
  ];

  const stats: Stat[] = [
    { label: "Speed", value: "A+" },
    { label: "SEO", value: "100" },
    { label: "Accessibility", value: "98%" },
  ];

  return (
    <section className="py-10 md:8 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            See it in <span className="text-emerald-600">Action</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature Cards */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="
                  bg-white p-6 rounded-2xl
                  border border-gray-200
                  hover:border-emerald-500
                  hover:shadow-xl
                  transition-all duration-300
                "
              >
                <div className="flex gap-4">
                  <div className=" bg-emerald-50 rounded-xl">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.features.map((f, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-gray-100 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 shadow-2xl relative">
              {/* Floating badges */}
              <motion.div
                className="absolute hidden md:flex -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Upload size={16} className="inline mr-2  " />
                Live Preview
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-white text-gray-900 px-6 py-3 rounded-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Download size={16} className="inline mr-2" />
                Export Code
              </motion.div>

              {/* Code window */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex gap-2 mb-6">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                </div>

                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    className="font-mono text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {line}
                  </motion.div>
                ))}

                <div className="mt-6 text-emerald-400 font-mono text-sm">
                  ✓ Component loaded successfully
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gray-800/60 p-3 rounded-lg text-center"
                  >
                    <div className="text-xl font-bold text-emerald-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
