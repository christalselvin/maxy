import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Search,
  Palette,
  Zap,
  TrendingUp,
  BarChart,
  ArrowRight,
} from "lucide-react";
import Button from "../../../components/Ui/Button";


type StepColor = "purple" | "pink";

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  duration: string;
  color: StepColor;
  items: string[];
  percent: string;
}


const colorMap: Record<
  StepColor,
  { badge: string; icon: string; progress: string }
> = {
  purple: {
    badge: "bg-purple-100 text-purple-700",
    icon: "bg-purple-100 text-purple-600",
    progress: "from-purple-500 to-pink-500",
  },
  pink: {
    badge: "bg-pink-100 text-pink-700",
    icon: "bg-pink-100 text-pink-600",
    progress: "from-pink-500 to-purple-500",
  },
};

const steps: Step[] = [
  {
    step: "01",
    title: "Audit & Analysis",
    desc: "Deep analysis of your current digital marketing performance",
    icon: <Search size={22} />,
    duration: "3–5 Days",
    color: "purple",
    items: ["SEO Audit", "Competitor Review", "Growth Gaps"],
    percent: "20%",
  },
  {
    step: "02",
    title: "Strategy Planning",
    desc: "Data-driven roadmap aligned with your business goals",
    icon: <Target size={22} />,
    duration: "1–2 Weeks",
    color: "pink",
    items: ["Channel Strategy", "Budget Planning", "Timeline"],
    percent: "40%",
  },
  {
    step: "03",
    title: "Creative Execution",
    desc: "High-impact creatives designed for conversions",
    icon: <Palette size={22} />,
    duration: "2–3 Weeks",
    color: "purple",
    items: ["Ads Design", "Content Creation", "Brand Messaging"],
    percent: "60%",
  },
  {
    step: "04",
    title: "Campaign Launch",
    desc: "Multi-channel deployment with automation",
    icon: <Zap size={22} />,
    duration: "Ongoing",
    color: "pink",
    items: ["Ads Launch", "Tracking Setup", "Automation"],
    percent: "80%",
  },
  {
    step: "05",
    title: "Optimization",
    desc: "Continuous performance improvements & scaling",
    icon: <TrendingUp size={22} />,
    duration: "Continuous",
    color: "purple",
    items: ["A/B Testing", "ROI Optimization", "Scaling"],
    percent: "95%",
  },
  {
    step: "06",
    title: "Reporting & Insights",
    desc: "Transparent reports with actionable insights",
    icon: <BarChart size={22} />,
    duration: "Monthly",
    color: "pink",
    items: ["Analytics", "Reports", "Forecasting"],
    percent: "100%",
  },
];


const MarketingStrategy: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-white py-10 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Data-Driven{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Marketing Strategy
            </span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            A proven 6-step framework designed to maximize ROI and scale growth.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${colorMap[s.color].badge}`}
                  >
                    {s.step}
                  </span>
                  <div className={`p-3 rounded-xl ${colorMap[s.color].icon}`}>
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{s.desc}</p>

                <p className="text-sm text-gray-500 mb-4">⏱ {s.duration}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* PROGRESS */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Completion</span>
                    <span className="font-semibold text-purple-600">
                      {s.percent}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: s.percent }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${colorMap[s.color].progress}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details.">
            Get Free Strategy Session
          </Button>

          <Button href="/contact" className="px-8 py-4 bg-white border rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2" variant="ghost">
            Connect US 
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingStrategy;
