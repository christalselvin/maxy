import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Briefcase,
  Clock,
  Tag,
} from "lucide-react";

const jobs = [
  {
    role: "Graphic Designer",
    department: "Design",
    experience: "1–3 Years",
    type: "Full-time",
    skills: ["Photoshop", "Illustrator", "Figma", "Branding"],

    overview:
      "We are looking for a creative Graphic Designer who can transform ideas into visually compelling designs.",

    responsibilities: [
      "Design logos and brand identity",
      "Create social media creatives",
      "Design website UI assets",
      "Collaborate with marketing teams",
    ],

    requirements: [
      "Strong portfolio",
      "Expert in design tools",
      "Creativity and attention to detail",
      "Ability to meet deadlines",
    ],
  },

  {
    role: "Digital Marketing Executive",
    department: "Marketing",
    experience: "1–4 Years",
    type: "Full-time",
    skills: ["SEO", "Ads", "Analytics", "Social Media"],

    overview:
      "Manage campaigns, SEO, and online growth strategies for clients.",

    responsibilities: [
      "Run marketing campaigns",
      "Manage social media",
      "Optimize SEO",
      "Analyze performance",
    ],

    requirements: [
      "Digital marketing experience",
      "Knowledge of tools",
      "Creative thinking",
    ],
  },

  {
    role: "Full Stack Developer",
    department: "Engineering",
    experience: "2–5 Years",
    type: "Full-time",
    skills: ["React", "Node.js", "MongoDB", "API"],

    overview:
      "Build scalable web applications using modern technologies.",

    responsibilities: [
      "Develop frontend & backend",
      "Work with databases",
      "Deploy applications",
    ],

    requirements: [
      "React & Node experience",
      "Database knowledge",
      "Problem-solving skills",
    ],
  },

  {
    role: "Frontend Developer",
    department: "Engineering",
    experience: "1–3 Years",
    type: "Full-time",
    skills: ["React", "Next.js", "Tailwind", "UI/UX"],

    overview:
      "Develop modern responsive user interfaces.",

    responsibilities: [
      "Build UI components",
      "Ensure responsiveness",
      "Optimize performance",
    ],

    requirements: [
      "Strong JavaScript",
      "CSS/Tailwind knowledge",
      "UI understanding",
    ],
  },
];

export default function Careers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <h1 className="text-5xl font-bold text-center mb-4">
          Careers at MaxoTechs
        </h1>
        <p className="text-center text-gray-600 mb-16">
          Join our team and build the future with us 🚀
        </p>

        {/* JOB LIST */}
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* JOB CARD */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between text-left"
              >
                <div>
                  <h2 className="text-2xl font-semibold">{job.role}</h2>

                  {/* BADGES */}
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {job.department}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {job.experience}
                    </span>

                    <span className="flex items-center gap-1">
                      <Tag size={14} /> {job.type}
                    </span>
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>

              {/* EXPANDED DETAILS */}
              {openIndex === index && (
                <div className="px-8 pb-8 border-t bg-gray-50 space-y-6">

                  {/* OVERVIEW */}
                  <div>
                    <h3 className="font-bold text-lg">Role Overview</h3>
                    <p className="text-gray-700 mt-2">{job.overview}</p>
                  </div>

                  {/* RESPONSIBILITIES */}
                  <div>
                    <h3 className="font-bold text-lg">What You’ll Do</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                      {job.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* REQUIREMENTS */}
                  <div>
                    <h3 className="font-bold text-lg">
                      What We’re Looking For
                    </h3>

                    <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
                      {job.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>

                    {/* 📩 SEND RESUME — BELOW HEADING */}
                    <p className="mt-6 text-gray-700">
                      📩 Send your resume and portfolio to{" "}
                      <a
                        href="mailto:hr@maxotechs.com"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        hr@maxotechs.com
                      </a>
                    </p>
                  </div>

                  {/* LOCATION */}
                  <div className="pt-4 border-t text-gray-600">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} />
                      Onsite — Marthandam, Kanyakumari
                    </p>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
