import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Globe, Users } from "lucide-react";

const colorMap = {
  yellow: {
    icon: "text-yellow-400",
    badge: "bg-yellow-500/10",
    bar: "from-yellow-500 to-yellow-300",
  },
  emerald: {
    icon: "text-emerald-400",
    badge: "bg-emerald-500/10",
    bar: "from-emerald-500 to-emerald-300",
  },
  blue: {
    icon: "text-blue-400",
    badge: "bg-blue-500/10",
    bar: "from-blue-500 to-blue-300",
  },
  purple: {
    icon: "text-purple-400",
    badge: "bg-purple-500/10",
    bar: "from-purple-500 to-purple-300",
  },
};

const stats = [
  { metric: "Load Time", value: "0.5s", change: "+40%", icon: Zap, color: "yellow" },
  { metric: "Conversion Rate", value: "4.8%", change: "+28%", icon: TrendingUp, color: "emerald" },
  { metric: "SEO Score", value: "98/100", change: "+15%", icon: Globe, color: "blue" },
  { metric: "User Engagement", value: "3.2 min", change: "+52%", icon: Users, color: "purple" },
];

const PerformanceMetrics: React.FC = () => {
  return (
    <section className="py-10 sm:py-18 md:py-8 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >

          {/* Hover underline heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold group inline-block">
            Real-time
            <span className="relative ml-2 text-emerald-400">
              Analytics
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Monitor website performance with live analytics and measurable business impact.
          </p>
        </motion.div>

        {/* METRICS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color as keyof typeof colorMap];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gray-800/60 backdrop-blur rounded-2xl p-6 border border-gray-700 hover:border-emerald-500 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.badge}`}>
                    <Icon className={colors.icon} size={24} />
                  </div>
                  <span className="text-emerald-400 font-semibold text-sm">
                    {stat.change}
                  </span>
                </div>

                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.metric}</div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${colors.bar}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${70 + i * 7}%` }}
                      transition={{ duration: 1.4 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
