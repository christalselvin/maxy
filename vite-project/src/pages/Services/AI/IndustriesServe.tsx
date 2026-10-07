import React from "react";
interface Industry {
  title: string;
  desc: string;
  useCases: string[];
  outcomes: string[];
}

const INDUSTRIES: Industry[] = [
  {
    title: "Healthcare & MedTech",
    desc:
      "Improving patient outcomes, operational efficiency, and clinical decision-making with AI.",
    useCases: [
      "Medical data analysis",
      "AI-assisted diagnostics",
      "Patient engagement automation",
    ],
    outcomes: [
      "Faster diagnosis",
      "Reduced administrative load",
      "Improved care quality",
    ],
  },
  {
    title: "Finance & FinTech",
    desc:
      "Secure, compliant AI solutions for risk management, fraud detection, and personalization.",
    useCases: [
      "Fraud detection",
      "Credit risk scoring",
      "AI-driven financial insights",
    ],
    outcomes: [
      "Reduced fraud",
      "Better compliance",
      "Smarter financial decisions",
    ],
  },
  {
    title: "E-commerce & Retail",
    desc:
      "Enhancing customer experience and operational efficiency across digital commerce platforms.",
    useCases: [
      "Personalized recommendations",
      "Demand forecasting",
      "Customer support automation",
    ],
    outcomes: [
      "Higher conversions",
      "Lower inventory costs",
      "Improved customer loyalty",
    ],
  },
  {
    title: "Manufacturing & Supply Chain",
    desc:
      "Driving efficiency, quality control, and predictive maintenance with AI.",
    useCases: [
      "Predictive maintenance",
      "Quality inspection",
      "Supply chain optimization",
    ],
    outcomes: [
      "Reduced downtime",
      "Improved production quality",
      "Lower operational costs",
    ],
  },
  {
    title: "Education & EdTech",
    desc:
      "Personalized learning experiences and intelligent education platforms.",
    useCases: [
      "Adaptive learning systems",
      "Student performance analytics",
      "AI tutoring assistants",
    ],
    outcomes: [
      "Better learning outcomes",
      "Personalized education",
      "Scalable digital classrooms",
    ],
  },
  {
    title: "Customer Support & BPO",
    desc:
      "Reducing response times and improving service quality with conversational AI.",
    useCases: [
      "AI chatbots",
      "Voice assistants",
      "Sentiment analysis",
    ],
    outcomes: [
      "24/7 support",
      "Lower support costs",
      "Higher customer satisfaction",
    ],
  },
];

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50 px-6 py-10 md:py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Industries <span className="text-blue-600">We Serve</span>
          </p>

          <p className="mt-5 text-lg text-gray-600">
            We build AI-powered solutions tailored to industry-specific
            challenges, regulations, and growth opportunities.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, index) => (
            <div
              key={industry.title}
              className="
                group relative rounded-2xl p-8
                bg-white/70 backdrop-blur-md
                border border-white/60
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                hover:border-blue-500
              "
            >
              {/* Index */}
              <p className="text-sm font-semibold text-blue-600">
                {String(index + 1).padStart(2, "0")}
              </p>

              {/* Title */}
              <p className="mt-3 text-xl font-bold text-gray-900">
                {industry.title}
              </p>

              {/* Description */}
              <p className="mt-4 text-gray-600">
                {industry.desc}
              </p>

              {/* Use cases */}
              <div className="mt-6">
                <p className="font-semibold text-gray-900">
                  AI Use Cases
                </p>

                <ul className="mt-3 space-y-2">
                  {industry.useCases.map((use) => (
                    <li
                      key={use}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="mt-6">
                <p className="font-semibold text-gray-900">
                  Key Outcomes
                </p>

                <ul className="mt-3 space-y-2 text-gray-600">
                  {industry.outcomes.map((outcome) => (
                    <li key={outcome}>• {outcome}</li>
                  ))}
                </ul>
              </div>

              {/* Subtle glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                group-hover:opacity-100 transition
                bg-gradient-to-br from-blue-500/5 to-indigo-500/10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
