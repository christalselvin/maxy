import React from "react";
import {  Database, BarChart, PieChart } from "lucide-react";
import dashboard from "../../../assets/Service/It/dashboard.webp"; 

const PlatformSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden
      py-10 sm:py-20 md:py-24">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-2 md:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6 sm:space-y-8">

            {/* HEADING WITH HOVER UNDERLINE */}
            <div className="relative group w-fit">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Intelligent{" "}
                <span className="text-transparent bg-clip-text
                  bg-gradient-to-r from-blue-300 to-purple-300">
                  Dashboard
                </span>
              </h2>

              {/* underline */}
              <span
                className="absolute left-0 -bottom-2 h-[3px] w-0
                bg-gradient-to-r from-blue-400 to-purple-400
                rounded-full transition-all duration-300
                group-hover:w-full"
              />
            </div>

            <p className="text-base sm:text-lg text-blue-100 max-w-xl">
              Monitor real-time KPIs, workforce analytics, and operational
              performance with our secure, cloud-based platform.
            </p>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                <Database className="w-7 h-7 text-blue-300 mb-3" />
                <p className="font-semibold mb-1">Secure Cloud</p>
                <p className="text-sm text-blue-200">
                  Encrypted, compliant, and always available
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20">
                <BarChart className="w-7 h-7 text-purple-300 mb-3" />
                <p className="font-semibold mb-1">Advanced Analytics</p>
                <p className="text-sm text-blue-200">
                  Custom reports & performance insights
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mt-6 lg:mt-0">

            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-r
              from-blue-500/20 to-purple-500/20
              rounded-3xl blur-3xl" />

            <div className="relative bg-gradient-to-br
              from-gray-800 to-gray-900
              rounded-3xl p-1 shadow-2xl">

              <img
                src={dashboard}
                loading="lazy"
                alt="Analytics Dashboard"
                className="w-full h-[220px] sm:h-[280px] md:h-[340px]
                object-cover rounded-2xl"
              />

              {/* FLOATING BADGE */}
              <div className="absolute -bottom-5 -right-5
                bg-gradient-to-r from-blue-600 to-purple-600
                p-4 rounded-2xl shadow-xl">
                <div className="text-center">
                  <PieChart className="w-9 h-9 mx-auto mb-1 text-white" />
                  <span className="text-sm font-semibold">
                    Live Analytics
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
