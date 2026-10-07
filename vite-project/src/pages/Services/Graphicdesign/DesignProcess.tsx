import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Code,
  Rocket,
  MessageSquare,
  FileText,
  Sparkles,
  Users,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "../../../components/Ui/Button";

/* SAFE COLOR MAP */
const COLOR_MAP = {
  cyan: {
    text: "text-cyan-600",
    bg: "bg-cyan-100",
    dot: "from-cyan-500 to-blue-500",
    bar: "from-cyan-400 to-blue-500",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-100",
    dot: "from-blue-500 to-blue-400",
    bar: "from-blue-400 to-blue-500",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-100",
    dot: "from-purple-500 to-purple-400",
    bar: "from-purple-400 to-purple-500",
  },
  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-100",
    dot: "from-emerald-500 to-emerald-400",
    bar: "from-emerald-400 to-emerald-500",
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-100",
    dot: "from-amber-500 to-amber-400",
    bar: "from-amber-400 to-amber-500",
  },
  rose: {
    text: "text-rose-600",
    bg: "bg-rose-100",
    dot: "from-rose-500 to-rose-400",
    bar: "from-rose-400 to-rose-500",
  },
};

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon; // ✅ component type
  color: keyof typeof COLOR_MAP;
  duration: string;
}

const DesignProcess: React.FC = () => {
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery & Research",
      description:
        "We analyze your brand, competitors, audience behavior, and goals to build a strong strategic foundation.",
      icon: Search,
      color: "cyan",
      duration: "1–2 weeks",
    },
    {
      number: "02",
      title: "Strategy & Planning",
      description:
        "We define creative direction, user journeys, and design strategy aligned with your business objectives.",
      icon: Target,
      color: "blue",
      duration: "1 week",
    },
    {
      number: "03",
      title: "Concept & Design",
      description:
        "High-fidelity UI concepts and visual systems designed to convert effectively.",
      icon: Palette,
      color: "purple",
      duration: "2–3 weeks",
    },
    {
      number: "04",
      title: "Review & Refine",
      description:
        "Collaborative feedback cycles ensure pixel-perfect execution.",
      icon: MessageSquare,
      color: "emerald",
      duration: "1–2 weeks",
    },
    {
      number: "05",
      title: "Development & Assets",
      description:
        "Final assets optimized for web, mobile, and marketing platforms.",
      icon: Code,
      color: "amber",
      duration: "1 week",
    },
    {
      number: "06",
      title: "Launch & Support",
      description:
        "Launch assistance, handover, and continuous improvements.",
      icon: Rocket,
      color: "rose",
      duration: "Ongoing",
    },
  ];

  return (
    <section className="px-6 bg-gradient-to-b from-white to-cyan-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From
            <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Concept to Creation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured, collaborative process that ensures your vision becomes reality
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            const c = COLOR_MAP[step.color];
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div
                  className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-200
                  ${index % 2 === 0 ? "lg:mt-12" : "lg:-mt-12"}`}
                >
                  <div className="flex justify-between mb-6">
                    <div className={`text-3xl font-bold ${c.text}`}>
                      {step.number}
                    </div>
                    <span className="text-sm text-gray-500">
                      {step.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${c.bg}`}>
                      <Icon size={24} className={c.text} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6">{step.description}</p>

                  <div className="space-y-3">
                    <div className="flex gap-2"><Users size={16} /> Team collaboration</div>
                    <div className="flex gap-2"><FileText size={16} /> Documentation</div>
                    <div className="flex gap-2"><Sparkles size={16} /> Creative workshops</div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${c.bar}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min((index + 1) * 20, 100)}%` }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div className="mt-20 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="tel:+919150331137" className="px-8 py-4">Connect Us</Button>
            <Button  href="/contact" className="px-8 py-4" variant="ghost">
              Schedule Consultation
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default DesignProcess;
