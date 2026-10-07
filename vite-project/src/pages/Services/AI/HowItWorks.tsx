import { motion } from "framer-motion";
import img from "../../../assets/Service/Ai/plan.webp";
import img1 from "../../../assets/Service/Ai/team.webp";
import img2 from "../../../assets/Service/Ai/Ai.webp";
import img3 from "../../../assets/Service/Ai/succes.webp";

const steps = [
  {
    step: "01",
    title: "Strategy & Discovery",
    desc: "We analyze your business goals, challenges, and data to identify where technology and AI can create measurable impact.",
    extra: [
      "Stakeholder discussions and requirement validation",
      "Opportunity mapping using data and KPIs",
      "Clear roadmap, scope, timelines, and success metrics",
    ],
    img: img,
  },
  {
    step: "02",
    title: "Design & System Planning",
    desc: "We design user experience, workflows, and system architecture with scalability, security, and performance in mind.",
    extra: [
      "User journeys, wireframes, and UX flows",
      "Cloud architecture and data pipeline planning",
      "Security, compliance, and scalability strategy",
    ],
    img: img1,
  },
  {
    step: "03",
    title: "Development & Integration",
    desc: "Our team builds secure, scalable solutions using modern technologies and integrates them seamlessly into your workflow.",
    extra: [
      "AI model development and API integration",
      "Continuous testing and performance optimization",
      "Seamless integration with existing systems",
    ],
    img: img2,
  },
  {
    step: "04",
    title: "Launch, Monitor & Scale",
    desc: "We deploy, monitor performance, optimize continuously, and support long-term growth with data-driven improvements.",
    extra: [
      "Production deployment and monitoring setup",
      "Performance tuning and model refinement",
      "Ongoing support and scaling strategies",
    ],
    img: img3,
  },
];

export default function HowItWorksRef1() {
  return (
    <section className="w-full bg-white py-0 md:py-8">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* HEADER */}
        <div className="text-center py-4 md:py-4">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900 inline-block relative">
            How We Build <span className="text-blue-600">Smart Solutions</span>
            <span className="absolute left-0 -bottom-2 h-[4px] w-16 rounded-full bg-gradient-to-r hidden md:flex from-blue-500 via-cyan-400 to-indigo-500" />
          </p>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A proven delivery framework that transforms ideas into scalable,
            secure, and high-performance AI solutions.
          </p>
        </div>

        {/* STEPS */}
        {steps.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 md:gap-12 items-center group"
          >
            {/* IMAGE */}
            <div className={i % 2 !== 0 ? "md:order-2" : ""}>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="
                  w-full max-w-md lg:max-w-sm
                  mx-auto rounded-2xl shadow-md
                "
              />
            </div>

            {/* CONTENT */}
            <div>
              <p className="text-blue-600 font-bold tracking-widest text-sm">
                STEP {item.step}
              </p>

              {/* TITLE */}
              <div className="relative w-fit mt-3">
                <p className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {item.title}
                </p>
                {/* Hover underline only for lg+ */}
                <span className="hidden lg:block absolute left-0 -bottom-1 h-[3px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
              </div>

              <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                {item.desc}
              </p>

              {/* BULLETS
                  - Always visible on mobile/tablet
                  - Hover-only animation on lg+
              */}
              <ul
                className="
                  mt-4 space-y-2 text-sm text-gray-500 max-w-xl
                  opacity-100 translate-y-0
                  lg:opacity-0 lg:translate-y-1
                  lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                  transition-all duration-300
                "
              >
                {item.extra.map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
