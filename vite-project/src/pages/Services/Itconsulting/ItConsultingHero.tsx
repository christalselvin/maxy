import React from "react";
import { ArrowRight, Briefcase, Cpu, ShieldCheck, GraduationCap, Users } from "lucide-react";
import Button from "../../../components/Ui/Button";

const ItConsultingHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />
      </div>

      <div
        className="
          relative max-w-7xl mx-auto px-6
          py-20 sm:py-24 md:py-28 mt-8
          grid grid-cols-1 lg:grid-cols-2 gap-16 items-center
        "
      >
        {/* LEFT CONTENT */}
        <div>
          {/* H1 – SEO Correct */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-gray-900">
            IT Consulting,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Training & Placement
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed">
            We help individuals and organizations build future-ready technology
            skills, modern IT systems, and successful careers through expert
            consulting, hands-on training, and guaranteed placement support.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button href="tel:+919150331137"
              className="
                
              "
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button href="/contact"
              className="
                
              " variant="ghost"
            >
              View Courses
            </Button>
          </div>

          {/* KEY FOCUS AREAS */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Cpu className="w-7 h-7 text-indigo-600" />
              <span className="font-medium text-gray-700">
                IT Consulting & DevOps
              </span>
            </div>

            <div className="flex items-center gap-4">
              <GraduationCap className="w-7 h-7 text-indigo-600" />
              <span className="font-medium text-gray-700">
                Industry-Ready Training
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Users className="w-7 h-7 text-indigo-600" />
              <span className="font-medium text-gray-700">
                Placement Assistance
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="w-7 h-7 text-indigo-600" />
              <span className="font-medium text-gray-700">
                Security & Compliance
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Briefcase className="w-7 h-7 text-indigo-600" />
              <span className="font-medium text-gray-700">
                Corporate & Career Growth
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT INFO CARD (HIDDEN ON MOBILE) */}
        <div className="relative hidden lg:block mb-20">
          <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-indigo-200/50">
            <p className="text-2xl font-bold mb-6 text-gray-900">
              What We Deliver
            </p>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>• IT consulting for startups & enterprises</li>
              <li>• Job-oriented training with real projects</li>
              <li>• Resume, interview & placement support</li>
              <li>• Cloud, DevOps, AI & software skills</li>
              <li>• Long-term career mentorship</li>
            </ul>
          </div>

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-3xl blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default ItConsultingHero;
