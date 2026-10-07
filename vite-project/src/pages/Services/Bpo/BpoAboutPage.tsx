import {
  Globe,
  Headphones,
  Clock,
  TrendingUp,
  Lock,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import Button from "../../../components/Ui/Button";


const features = [
  {
    icon: Globe,
    title: "Multilingual Support",
    desc: "Native speakers in 20+ global languages.",
  },
  {
    icon: Clock,
    title: "24/7/365 Coverage",
    desc: "Always-on support with zero downtime.",
  },
  {
    icon: TrendingUp,
    title: "AI-Driven Growth",
    desc: "Upsell, churn & sentiment insights.",
  },
  {
    icon: Lock,
    title: "Your Data Is Safe",
    desc: "Protected by global security standards.",
  },
  {
    icon: Headphones,
    title: "Dedicated Teams",
    desc: "Agents trained only for your brand.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "Understand KPIs, users & CX gaps.",
  },
  {
    step: "02",
    title: "Custom Strategy",
    desc: "Solution + pricing within 48 hours.",
  },
  {
    step: "03",
    title: "Pilot Program",
    desc: "Paid pilot with live reporting.",
  },
  {
    step: "04",
    title: "Scale & Optimize",
    desc: "Full rollout + continuous improvement.",
  },
];

export default function BpoAboutPage() {
  return (
    <section className="bg-white overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(24px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-fadeUp { animation: fadeUp .8s ease-out both; }
        .animate-float { animation: floatSlow 8s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 10s linear infinite; }
      `}</style>

      <div className="relative bg-gradient-to-br from-indigo-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10 md:py:2 text-center animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight">
            Customer Experience
            <span
              className="block text-transparent bg-clip-text
              bg-gradient-to-r from-indigo-600 to-cyan-600 "
            >
              Reimagined
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            A modern BPO partner combining elite human talent with AI-driven
            intelligence.
          </p>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Button href="tel:+919150331137">Talk to an Expert</Button>
            <Button href="/contact" variant="ghost">
              Learn More
            </Button>{" "}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-0  sm:py-24 grid lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div className="animate-fadeUp">
          <p className="text-3xl sm:text-4xl font-bold mb-10">
            Why Companies Choose Us
          </p>

          <div className="space-y-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl
                  border border-gray-200 bg-white
                  hover:border-indigo-400 hover:bg-indigo-50/40
                  transition animate-fadeUp"
                >
                  <div
                    className="w-11 h-11 rounded-xl
                    bg-gradient-to-br from-indigo-500 to-cyan-500
                    flex items-center justify-center"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div>
                    <p className="font-semibold text-lg">{f.title}</p>
                    <p className="text-gray-600 text-sm">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative animate-fadeUp">
          <div
            className="absolute inset-0 bg-gradient-to-br
            from-indigo-200/40 to-cyan-200/40
            rounded-3xl blur-3xl animate-float"
          />
          <div className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-2xl">
            <p className="text-2xl font-bold mb-6">What This Means for You</p>
            <ul className="space-y-3 text-gray-700">
              <li>• Faster customer resolutions</li>
              <li>• Lower operational cost</li>
              <li>• Higher customer retention</li>
              <li>• Real-time CX insights</li>
              <li>• Scalable business growth</li>
              <li>• Improved agent productivity</li>
              <li>• Consistent service quality</li>
              <li>• Better customer experience</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="py-4 sm:py-10 md:py:2 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="text-4xl sm:text-5xl font-black text-center mb-16
            bg-gradient-to-r from-indigo-600 to-cyan-600
            bg-clip-text text-transparent"
          >
            How We Deliver Results
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative text-center animate-fadeUp">
                <div
                  className="text-6xl font-black text-indigo-100
                  absolute -top-10 left-1/2 -translate-x-1/2 select-none animate-float"
                >
                  {step.step}
                </div>

                <div
                  className="bg-white pt-14 pb-8 px-6 rounded-3xl
                  shadow-xl border border-indigo-200/50
                  hover:-translate-y-2 hover:shadow-2xl transition"
                >
                  <p className="text-xl font-bold mb-3">{step.title}</p>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        className="bg-gradient-to-r from-indigo-600 to-cyan-600
        animate-gradient py-8 sm:py-24"
      >
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <p className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build a Better CX?
          </p>
          <p className="text-white/90 mb-8">
            Speak directly with our senior strategists.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="tel:+919150331137">
              <PhoneCall className="w-5 h-5" /> Book a Call
            </Button>
            <Button
              href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
              variant="ghost"
            >
              <MessageCircle className="w-5 h-5" /> Chat Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
