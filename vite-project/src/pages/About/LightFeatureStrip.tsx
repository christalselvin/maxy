// src/components/FeatureModelStrip.tsx
import { Link } from "react-router-dom";
import Button from "../../components/Ui/Button";

import imgSoftware from "../../assets/About/about_footer/softwaredevelopemnt.webp";
import imgAI from "../../assets/About/about_footer/ai.webp";
import imgSeo from "../../assets/About/about_footer/growth.webp";
import imgBpo from "../../assets/About/about_footer/man.webp";
import imgimgCreative from "../../assets/About/about_footer/photoshop.webp"; // replace with AI image if available
import imgIT from "../../assets/About/softwaredevelopement.webp"; // replace with IT image if available

export type Item = {
  id: string;
  title: string;
  summary: string;
  img: string;
  link: string;
};


const DEFAULT_ITEMS: Item[] = [
  {
    id: "software",
    title: "Software Development",
    summary:
      "Custom software solutions tailored to business workflows, automation, and scalability.",
    img: imgSoftware,
    link: "/services/softwaredevelopment",
  },
  {
    id: "ai",
    title: "AI Solutions",
    summary:
      "AI-powered tools, automation systems, and intelligent solutions for modern businesses.",
    img: imgAI,
    link: "/services/ai",
  },
  {
    id: "seo",
    title: "SEO & Digital Growth",
    summary:
      "Search engine optimization and growth strategies built for long-term visibility.",
    img: imgSeo,
    link: "/services/digitalmarketing",
  },
  {
    id: "creative",
    title: "Creative & Branding",
    summary:
      "Brand identities and creative designs that make businesses memorable.",
    img: imgimgCreative,
    link: "/services/grahicdesign",
  },
  {
    id: "bpo",
    title: "BPO — Voice & Non-Voice",
    summary:
      "Customer support, lead generation, and back-office outsourcing services.",
    img: imgBpo,
    link: "/services/bpo",
  },
  {
    id: "it",
    title: "IT Consulting",
    summary:
      "Strategic IT consulting to optimize infrastructure, security, and digital transformation.",
    img: imgIT,
    link: "/services/itconsulting",
  },
];

type Props = {
  items?: Item[];
  heading?: string;
  sub?: string;
};

export default function FeatureModelStrip({
  items = DEFAULT_ITEMS,
  heading = "Featured Work & Capabilities",
  sub = "A glimpse into our software development, AI services, SEO, branding, BPO, and IT consulting expertise.",
}: Props) {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {heading}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {sub}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <article
              key={it.id}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* Title */}
              <div className="absolute left-4 bottom-4 z-10">
                <h3 className="text-white text-lg font-semibold drop-shadow">
                  {it.title}
                </h3>
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 z-20 flex items-end p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-full bg-white/85 backdrop-blur-md rounded-xl p-4 border border-white/60 shadow-lg">
                  <p className="text-sm text-slate-700">
                    {it.summary}
                  </p>

                  <div className="mt-4 flex gap-3">
                    {/* Learn More */}
                    <Link to={it.link}>
                      <Button className="px-4 py-2 text-sm">
                        Learn more
                      </Button>
                    </Link>

                    {/* Contact */}
                    <Link to="/contact">
                      <Button variant="ghost" className="px-4 py-2 text-sm">
                        Contact us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
