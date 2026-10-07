import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Clock,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import Button from "../../../components/Ui/Button";



const colorMap = {
  blue: { bg: "bg-blue-100", icon: "text-blue-600" },
  purple: { bg: "bg-purple-100", icon: "text-purple-600" },
  green: { bg: "bg-green-100", icon: "text-green-600" },
  red: { bg: "bg-red-100", icon: "text-red-600" },
  pink: { bg: "bg-pink-100", icon: "text-pink-600" },
  amber: { bg: "bg-amber-100", icon: "text-amber-600" },
  teal: { bg: "bg-teal-100", icon: "text-teal-600" },
  indigo: { bg: "bg-indigo-100", icon: "text-indigo-600" },
};

type ColorKey = keyof typeof colorMap;


interface MetricItem {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: ColorKey;
}

interface MetricSection {
  category: string;
  metrics: MetricItem[];
}


const MarketingMetrics: React.FC = () => {
  const metricSections: MetricSection[] = [
    {
      category: "Traffic & Engagement",
      metrics: [
        {
          label: "Website Traffic",
          value: "1.2M",
          change: "+45%",
          icon: <Globe size={22} />,
          color: "blue",
        },
        {
          label: "Social Engagement",
          value: "85K",
          change: "+32%",
          icon: <Users size={22} />,
          color: "purple",
        },
        {
          label: "Avg. Session Time",
          value: "4:32",
          change: "+28%",
          icon: <Clock size={22} />,
          color: "green",
        },
        {
          label: "Bounce Rate",
          value: "32%",
          change: "-18%",
          icon: <TrendingUp size={22} />,
          color: "red",
        },
      ],
    },
    {
      category: "Conversion & Revenue",
      metrics: [
        {
          label: "Conversion Rate",
          value: "8.5%",
          change: "+42%",
          icon: <Target size={22} />,
          color: "pink",
        },
        {
          label: "Revenue Generated",
          value: "$2.8M",
          change: "+65%",
          icon: <DollarSign size={22} />,
          color: "amber",
        },
        {
          label: "Customer Acquisition",
          value: "4.2K",
          change: "+38%",
          icon: <Users size={22} />,
          color: "teal",
        },
        {
          label: "Customer LTV",
          value: "$1,250",
          change: "+25%",
          icon: <TrendingUp size={22} />,
          color: "indigo",
        },
      ],
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Real-Time Marketing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Analytics Dashboard
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Monitor traffic, engagement, and conversions with crystal-clear insights.
          </p>
        </motion.div>

        {/* METRICS */}
        <div className="grid md:grid-cols-2 gap-8">
          {metricSections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl border shadow-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-white">
                <p className="font-semibold text-gray-900">
                  {section.category}
                </p>
              </div>

              <div className="px-6">
                {section.metrics.map((metric, j) => {
                  const c = colorMap[metric.color];
                  return (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: j * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between py-4 border-b last:border-0 group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl ${c.bg} ${c.icon} transition group-hover:scale-110`}
                        >
                          {metric.icon}
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            {metric.label}
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            {metric.value}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1 text-sm font-semibold ${
                          metric.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <ArrowUpRight size={16} />
                        {metric.change}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Request a free audit and get tailored recommendations to scale faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact">Get Free Audit</Button>
            <Button href="tel:+919150331137" variant="ghost">Schedule Demo</Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MarketingMetrics;
