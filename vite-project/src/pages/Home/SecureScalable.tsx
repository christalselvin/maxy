import React from "react";
import {
  Shield,
  Cpu,
  Cloud,
  Lock,
  Layers,
  Zap,
} from "lucide-react";


const FeatureCard: React.FC<{
  title: string;
  desc: string;
  icon?: React.ReactNode;
  icons?: React.ReactNode[]; // ✅ 3 icons inside card
}> = ({ title, desc, icon, icons }) => (
  <article
    className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-sm
    border border-transparent transition-all duration-300
    hover:border-blue-500 hover:shadow-md hover:-translate-y-1"
    aria-labelledby={`fc-${title.replace(/\s+/g, "-").toLowerCase()}`}
  >
    <div className="flex items-start gap-3 sm:gap-4">
      {/* MAIN ICON */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg
        bg-gradient-to-br from-blue-600 to-indigo-600
        flex items-center justify-center text-white shrink-0">
        {icon}
      </div>

      <div className="w-full">
        <p
          id={`fc-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-base sm:text-lg font-semibold text-gray-800 mb-1
          group-hover:text-blue-600 transition"
        >
          {title}
        </p>

        <p className="text-sm sm:text-base text-gray-600">
          {desc}
        </p>

        {/* ✅ ICON ROW (3 ICONS) */}
        {icons && (
          <div className="mt-4 flex items-center gap-4">
            {icons.map((ic, idx) => (
              <span
                key={idx}
                className="w-8 h-8 flex items-center justify-center
                rounded-lg bg-blue-50 text-blue-600
                group-hover:scale-110 transition"
              >
                {ic}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </article>
);

const SecureScalable: React.FC = () => {
  return (
    <section
      className="lg:py-20 bg-gradient-to-b from-white to-gray-50"
      id="architecture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto md:-mt-8 lg:-mt-20">
          <p className="group inline-block text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 relative">
            Secure &amp; Scalable Architecture
            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px]
              w-0 h-[4px] bg-blue-600 rounded-md
              transition-all duration-300 group-hover:w-[55%]" />
          </p>

          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            We design systems that protect your data and grow with your users.
            Reliable performance, enterprise-grade security, and operational
            observability — built from day one.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <FeatureCard
            title="Built for Modern Business Needs"
            desc="Secure architectures that protect your digital assets using industry standards."
            icon={<Shield size={20} />}
            icons={[
              <Lock size={16} />,
              <Cloud size={16} />,
              <Zap size={16} />,
            ]}
          />

          <FeatureCard
            title="Scalable Infrastructure for Growth"
            desc="Cloud-native systems that scale seamlessly as your business grows."
            icon={<Layers size={20} />}
            icons={[
              <Cloud size={16} />,
              <Cpu size={16} />,
              <Zap size={16} />,
            ]}
          />

          <FeatureCard
            title="High-Performance System Design"
            desc="Optimized backend and frontend systems built for speed and reliability."
            icon={<Cpu size={20} />}
            icons={[
              <Zap size={16} />,
              <Layers size={16} />,
              <Shield size={16} />,
            ]}
          />
        </div>

        {/* ARCHITECTURE + CHECKLIST */}
        <div className="mt-10 sm:mt-12 grid gap-8 lg:grid-cols-2 items-start">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
            <p className="group inline-block text-base sm:text-lg font-semibold text-gray-800 relative">
              Built for Creativity, Consistency & Brand Growth
              <span className="absolute left-0 bottom-[-6px]
                w-0 h-[3px] bg-blue-600 rounded-md
                transition-all duration-300 group-hover:w-full" />
            </p>

            <p className="mt-2 text-sm sm:text-base text-gray-600">
              We follow industry-best practices to deliver consistent,
              scalable, and maintainable systems.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Consistent architecture",
                  desc: "Clear structure and maintainability",
                },
                {
                  title: "Scalable systems",
                  desc: "Optimized for growth",
                },
                {
                  title: "Reusable components",
                  desc: "Faster development cycles",
                },
                {
                  title: "Quality assurance",
                  desc: "Testing, monitoring, and compliance",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 group">
                  <div className="mt-1 text-green-600">✔</div>
                  <div className="relative inline-block">
                    <div className="text-sm font-medium text-gray-800">
                      {item.title}
                    </div>
                    <span className="absolute left-0 -bottom-1
                      h-[3px] w-0 bg-blue-600 rounded-md
                      transition-all duration-300 group-hover:w-full" />
                    <div className="text-xs text-gray-500 mt-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            <section className="group bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition">
              <p className="inline-block text-base sm:text-lg font-semibold text-gray-800 relative">
                Concept & System Design
                <span className="absolute left-0 bottom-[-6px]
                  w-0 h-[3px] bg-blue-600 rounded-md
                  transition-all duration-300 group-hover:w-full" />
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Architecture planning</li>
                <li>• Technology selection</li>
                <li>• Performance strategy</li>
              </ul>
            </section>

            <section className="group bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition">
              <p className="inline-block text-base sm:text-lg font-semibold text-gray-800 relative">
                Execution & Optimization
                <span className="absolute left-0 bottom-[-6px]
                  w-0 h-[3px] bg-blue-600 rounded-md
                  transition-all duration-300 group-hover:w-full" />
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Development & deployment</li>
                <li>• Monitoring & scaling</li>
                <li>• Continuous improvement</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecureScalable;
