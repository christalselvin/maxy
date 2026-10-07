import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, ChevronRight, Zap } from "lucide-react";
import Button from "../../../components/Ui/Button";

import ecommerce from "../../../assets/Service/Digitalmarket/Growth.webp";
import performance from "../../../assets/Service/Digitalmarket/Performance.webp";
import influencer from "../../../assets/Service/Digitalmarket/Influencer.webp";
import seoImg from "../../../assets/Service/Digitalmarket/seo.webp";
import email from "../../../assets/Service/Digitalmarket/Email.webp";


interface Campaign {
  id: number;
  title: string;
  category: "social" | "content" | "seo" | "email";
  description: string;
  image: string;
  duration: string;
  client: string;
  results: {
    metric: string;
    value: string;
  }[];
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "E-commerce Social Media Growth",
    category: "social",
    description:
      "High-performing social media marketing campaign driving conversions and brand engagement.",
    image: ecommerce,
    duration: "3 Months",
    client: "FashionForward",
    results: [
      { metric: "Revenue Growth", value: "+320%" },
      { metric: "ROAS", value: "5.8x" },
      { metric: "Engagement", value: "+280%" },
    ],
  },
  {
    id: 2,
    title: "B2B SaaS Performance Marketing",
    category: "content",
    description:
      "Content-driven demand generation campaign focused on lead quality and growth.",
    image: performance,
    duration: "4 Months",
    client: "TechFlow Inc",
    results: [
      { metric: "Qualified Leads", value: "+450%" },
      { metric: "Free Trials", value: "+380%" },
      { metric: "MQL Growth", value: "+220%" },
    ],
  },
  {
    id: 3,
    title: "Influencer Marketing Campaign",
    category: "social",
    description:
      "Influencer-led brand awareness campaign generating organic reach and trust.",
    image: influencer,
    duration: "2 Months",
    client: "Lifestyle Co",
    results: [
      { metric: "Reach", value: "+600%" },
      { metric: "Engagement", value: "+310%" },
      { metric: "Sales Lift", value: "+180%" },
    ],
  },
  {
    id: 4,
    title: "SEO Growth Strategy",
    category: "seo",
    description:
      "SEO campaign improving keyword rankings, organic traffic, and inbound leads.",
    image: seoImg,
    duration: "6 Months",
    client: "StartupBoost",
    results: [
      { metric: "Organic Traffic", value: "+520%" },
      { metric: "Top-10 Keywords", value: "120+" },
      { metric: "Inbound Leads", value: "+240%" },
    ],
  },
  {
    id: 5,
    title: "Email Marketing Automation",
    category: "email",
    description:
      "Lifecycle email marketing automation improving retention and repeat purchases.",
    image: email,
    duration: "3 Months",
    client: "RetailX",
    results: [
      { metric: "Open Rate", value: "+65%" },
      { metric: "CTR", value: "+48%" },
      { metric: "Revenue", value: "+210%" },
    ],
  },
];


const CampaignShowcase: React.FC = () => {
  const [filter, setFilter] = useState<"all" | Campaign["category"]>("all");

  const filteredCampaigns =
    filter === "all"
      ? campaigns
      : campaigns.filter((c) => c.category === filter);

  return (
    <section className="py-10 sm:py-20 md:py-1 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Campaigns That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Drive Growth
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Real-world digital marketing campaigns delivering measurable
            business outcomes.
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["all", "social", "content", "seo", "email"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  filter === item
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white border text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item === "all" ? "All Campaigns" : item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign, index) => (
            <motion.article
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={campaign.image}
                  loading="lazy"
                  alt={`${campaign.title} digital marketing campaign`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />

                {index === 0 && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-amber-400 bg-black/60 px-2 py-1 rounded-full text-xs">
                    <Zap size={12} />
                    Featured
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{campaign.title}</h3>

                <p className="text-sm text-gray-600 mb-4">
                  {campaign.description}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{campaign.client}</p>
                    <p className="text-xs text-gray-500">{campaign.duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {campaign.results.map((r) => (
                    <div
                      key={r.metric}
                      className="bg-gray-50 rounded-lg p-2 text-center"
                    >
                      <p className="text-sm font-bold text-purple-700">
                        {r.value}
                      </p>
                      <p className="text-xs text-gray-500">{r.metric}</p>
                    </div>
                  ))}
                </div>

                <Button
                  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  View Case Study
                  <ChevronRight size={16} />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignShowcase;
