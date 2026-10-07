import {
  Phone,
  MessageSquare,
  Database,
  Bot,
  ArrowRight,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import Button from "../../../components/Ui/Button";

const services = [
  {
    title: "Voice Support",
    desc: "24/7 inbound & outbound calling with trained agents and AI assistance to reduce handle time and improve CX.",
    icon: Phone,
    color: "from-blue-500 to-blue-700",
    lightColor: "from-blue-50 to-blue-100",
  },
  {
    title: "Chat & Email",
    desc: "Omnichannel chat, WhatsApp, email and social platforms with smart routing and sentiment AI.",
    icon: MessageSquare,
    color: "from-indigo-500 to-indigo-700",
    lightColor: "from-indigo-50 to-indigo-100",
  },
  {
    title: "Back Office",
    desc: "KYC, data entry, verification and processing with 99.9% accuracy and strong QA controls.",
    icon: Database,
    color: "from-sky-500 to-sky-700",
    lightColor: "from-sky-50 to-sky-100",
  },
  {
    title: "AI Automation",
    desc: "Voice bots, chatbots, call routing, analytics and auto quality scoring for faster decisions.",
    icon: Bot,
    color: "from-cyan-500 to-cyan-700",
    lightColor: "from-cyan-50 to-cyan-100",
  },
];

const stats = [
  { number: "98%", label: "Customer Satisfaction", color: "from-blue-500 to-blue-700" },
  { number: "3.2s", label: "Avg Response Time", color: "from-indigo-500 to-indigo-700" },
  { number: "250k+", label: "Monthly Interactions", color: "from-sky-500 to-sky-700" },
  { number: "24/7", label: "Global Coverage", color: "from-cyan-500 to-cyan-700" },
];

export default function BpoServices() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30 px-4 sm:px-6 py-4 sm:py-16">

      {/* LOCAL ANIMATIONS */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSoft {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeUp {
          animation: fadeUp .7s ease-out both;
        }
        .animate-float {
          animation: floatSoft 6s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="text-center animate-fadeUp mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Elite Customer Experience
          </h1>

          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Scalable Voice & Non-Voice BPO powered by Humans + AI
          </p>

         <Button
  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
  className="mt-6"
>
  Book Free Strategy Call <ArrowRight />
</Button>

        </div>

        {/* STATS (UPDATED ANIMATION) */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="relative group animate-fadeUp text-center
              bg-white rounded-2xl p-4 sm:p-6
              shadow-md border border-blue-100
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl overflow-hidden"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                {s.number}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                {s.label}
              </p>

              {/* Bottom underline */}
              <div
                className={`absolute bottom-0 left-0 h-[3px] w-0
                bg-gradient-to-r ${s.color}
                transition-all duration-300 group-hover:w-full`}
              />
            </div>
          ))}
        </div>

        {/* SERVICES */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="relative group rounded-3xl p-6 border border-gray-100
              bg-white shadow-lg
              transition-all duration-300 ease-out
              hover:-translate-y-2 hover:shadow-2xl
              animate-fadeUp overflow-hidden"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Hover background */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-br ${s.lightColor}
                transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color}
                flex items-center justify-center mb-4 animate-float`}
              >
                <s.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title with underline */}
              <p className="relative inline-block text-xl font-semibold text-gray-900 mb-2">
                {s.title}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-0
                  bg-gradient-to-r ${s.color}
                  transition-all duration-300 group-hover:w-full`}
                />
              </p>

              <p className="relative text-gray-600 text-sm leading-relaxed">
                {s.desc}
              </p>

              {/* Card bottom underline */}
              <div
                className={`absolute bottom-0 left-0 h-[3px] w-0
                bg-gradient-to-r ${s.color}
                transition-all duration-300 group-hover:w-full`}
              />
            </div>
          ))}
        </div>

        {/* WHY US */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-6 sm:p-10 text-white animate-fadeUp">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Why Businesses Choose Us
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              {
                Icon: Shield,
                title: "Secure & Compliant",
                desc: "ISO, GDPR & enterprise-grade security",
              },
              {
                Icon: Zap,
                title: "Fast Onboarding",
                desc: "Go live in under 7 days",
              },
              {
                Icon: Users,
                title: "Expert Team",
                desc: "Trained agents + AI workflows",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group animate-fadeUp transition-all duration-300
                hover:-translate-y-2"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <item.Icon
                  className="mx-auto w-12 h-12 mb-4
                  transition-transform duration-300
                  group-hover:scale-110 group-hover:rotate-6"
                />
                <p className="font-semibold">{item.title}</p>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-16 text-center animate-fadeUp">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Scale Your Support?
          </h2>
          <p className="text-gray-700 mb-6">
            Get a free 30-minute consultation with our experts
          </p>
          <Button>
            Schedule Free Call <ArrowRight />
          </Button>
        </div>

      </div>
    </section>
  );
}
