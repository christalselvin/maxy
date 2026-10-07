import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart,
  Zap,
  Clock,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import Button from "../../../components/Ui/Button";


const colorMap = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    dot: "bg-purple-500",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    dot: "bg-red-500",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    dot: "bg-pink-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    dot: "bg-amber-500",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    dot: "bg-indigo-500",
  },
};


const metricSections = [
  {
    category: "Traffic & Engagement",
    metrics: [
      { label: "Website Traffic", value: "1.2M", change: "+45%", icon: <Globe />, color: "blue" },
      { label: "Social Engagement", value: "85K", change: "+32%", icon: <Users />, color: "purple" },
      { label: "Avg. Session Time", value: "4:32", change: "+28%", icon: <Clock />, color: "green" },
      { label: "Bounce Rate", value: "32%", change: "-18%", icon: <TrendingUp />, color: "red" },
    ],
  },
  {
    category: "Conversion & Revenue",
    metrics: [
      { label: "Conversion Rate", value: "8.5%", change: "+42%", icon: <Target />, color: "pink" },
      { label: "Revenue Generated", value: "$2.8M", change: "+65%", icon: <DollarSign />, color: "amber" },
      { label: "Customer Acquisition", value: "4.2K", change: "+38%", icon: <Users />, color: "purple" },
      { label: "Customer LTV", value: "$1,250", change: "+25%", icon: <TrendingUp />, color: "indigo" },
    ],
  },
  {
    category: "Performance & ROI",
    metrics: [
      { label: "Campaign ROI", value: "4.8x", change: "+22%", icon: <BarChart />, color: "purple" },
      { label: "Cost Per Lead", value: "$18.50", change: "-24%", icon: <DollarSign />, color: "green" },
      { label: "ROAS", value: "5.2:1", change: "+18%", icon: <TrendingUp />, color: "blue" },
      { label: "Marketing Efficiency", value: "92%", change: "+15%", icon: <Zap />, color: "amber" },
    ],
  },
];


const MarketingMetrics: React.FC = () => {
  return (
    <section className="py-0 sm:py-10 md:py-10 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real-Time
            <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Analytics Dashboard
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your marketing performance with live metrics and actionable insights
          </p>
        </motion.div>

        {/* METRICS GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {metricSections.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              className="bg-white rounded-2xl shadow-xl border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.2 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                <p className="text-sm text-gray-600 mt-1">Live performance metrics</p>
              </div>

              <div className="p-6 space-y-6">
                {section.metrics.map((m, i) => {
                  const c = colorMap[m.color as keyof typeof colorMap];
                  return (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${c.bg} ${c.text}`}>
                          {React.cloneElement(m.icon, { size: 22 })}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{m.label}</div>
                          <div className="text-2xl font-bold text-gray-900">{m.value}</div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1 font-bold ${
                          m.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <ArrowUpRight size={16} />
                        {m.change}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FINAL CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          

          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get a comprehensive marketing audit and personalized strategy to maximize ROI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact">
              Get Free Marketing Audit
            </Button>
            <Button href="/contact"  variant="ghost" >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingMetrics;
