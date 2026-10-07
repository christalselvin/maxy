import React from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Palette,
  Scissors,
  Music,
  Eye,
  Play,
  Zap,
  Clock,

} from "lucide-react";
import type { LucideIcon } from "lucide-react";


interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon; // ✅ component type
  color: "blue" | "purple" | "pink" | "cyan" | "green" | "amber";
  duration: string;
  tools: string[];
}

const EditingProcess: React.FC = () => {
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Footage Review",
      description: "We analyze your raw footage and discuss your vision",
      icon: Upload,
      color: "blue",
      duration: "1–2 days",
      tools: ["Premiere Pro", "DaVinci Resolve", "Frame.io"],
    },
    {
      number: "02",
      title: "Rough Cut",
      description: "Creating the initial timeline and structure",
      icon: Scissors,
      color: "purple",
      duration: "2–3 days",
      tools: ["Storyboard", "Sequence Planning", "Pacing"],
    },
    {
      number: "03",
      title: "Fine Cut",
      description: "Refining edits, transitions, and timing",
      icon: Eye,
      color: "pink",
      duration: "3–4 days",
      tools: ["Precision Editing", "Transitions", "Rhythm"],
    },
    {
      number: "04",
      title: "Color Grading",
      description: "Enhancing visual tone and cinematic look",
      icon: Palette,
      color: "cyan",
      duration: "1–2 days",
      tools: ["DaVinci Resolve", "LUTs", "Color Theory"],
    },
    {
      number: "05",
      title: "Sound Design",
      description: "Adding music, effects, and audio mixing",
      icon: Music,
      color: "green",
      duration: "2–3 days",
      tools: ["Adobe Audition", "Sound Libraries", "Mixing"],
    },
    {
      number: "06",
      title: "Final Review",
      description: "Client feedback and final adjustments",
      icon: Play,
      color: "amber",
      duration: "1–2 days",
      tools: ["Client Portal", "Review Cycles", "Export"],
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full mb-4">
            <Zap size={16} />
            <span className="font-semibold">Our Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            From Raw Footage to
            <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Masterpiece
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A structured workflow that ensures cinematic quality and client satisfaction
          </p>
        </motion.div>

        {/* PROCESS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-3xl font-bold text-${step.color}-400`}>
                    {step.number}
                  </div>

                  <div className={`p-3 rounded-xl bg-${step.color}-500/10`}>
                    <Icon size={24} className={`text-${step.color}-400`} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 mb-4">{step.description}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock size={14} />
                  {step.duration}
                </div>

                <div className="flex flex-wrap gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 bg-gray-900 text-gray-300 rounded-full text-sm border border-gray-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get a free consultation and project estimate. No commitment required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold">
              Start Your Project
            </button>
            <button className="px-8 py-4 bg-gray-800 text-white rounded-xl border border-gray-700">
              Download Process PDF
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default EditingProcess;
