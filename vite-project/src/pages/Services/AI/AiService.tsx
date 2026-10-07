import type { ElementType } from "react";
import {
  Bot,
  Workflow,
  BarChart3,
  Cpu,
} from "lucide-react";

type Service = {
  title: string;
  desc: string;
  icon: ElementType;
};

const SERVICES: Service[] = [
  {
    title: "AI Chatbots",
    desc: "Smart conversational AI for customer support, sales, and automation.",
    icon: Bot,
  },
  {
    title: "Process Automation",
    desc: "Automate repetitive workflows to save time and reduce operational cost.",
    icon: Workflow,
  },
  {
    title: "Predictive Analytics",
    desc: "Data-driven insights and forecasting using machine learning models.",
    icon: BarChart3,
  },
  {
    title: "Custom AI Solutions",
    desc: "Tailor-made AI systems built specifically for your business needs.",
    icon: Cpu,
  },
];

export default function AIServices() {
  return (
    <section className="relative bg-white px-6 py-2 sm:py-16 md:py-8">
      <div className="max-w-6xl mx-auto">

        {/* SECTION HEADER (p tag only) */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 py-4">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900 inline-block relative">
  Our <span className="text-blue-600">AI Services</span>

  {/* permanent underline */}
  <span className="absolute left-0 -bottom-2 h-[4px] w-12 rounded-full
    bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />
</p>


          <p className="mt-4 text-gray-600 text-base md:text-lg">
            We help businesses leverage artificial intelligence to automate
            operations, gain insights, and scale faster.
          </p>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="
                  group relative bg-white rounded-2xl p-6
                  border border-gray-200
                  shadow-sm transition-all duration-300
                  hover:border-blue-500
                  hover:ring-2 hover:ring-blue-400/30
                  hover:shadow-xl
                "
              >
                {/* Soft glow */}
                <div
                  aria-hidden
                  className="
                    absolute inset-0 rounded-2xl
                    bg-blue-500/5 opacity-0
                    group-hover:opacity-100
                    blur-xl transition
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative z-10 mb-4 flex items-center justify-center
                    w-12 h-12 rounded-xl
                    bg-blue-50 text-blue-600
                    transition
                    group-hover:bg-blue-600 group-hover:text-white
                  "
                >
                  <Icon size={22} aria-hidden />
                </div>

                {/* Card title (p tag) */}
                <p className="relative z-10 text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </p>

                {/* Card description */}
                <p className="relative z-10 text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
