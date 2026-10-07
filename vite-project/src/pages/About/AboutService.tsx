import { Link } from "react-router-dom";

import imgWeb from "../../assets/About/website_developement.webp";
import imgSeo from "../../assets/About/seo.webp";
import imgBranding from "../../assets/About/graphicdesign.webp";
import imgApp from "../../assets/About/softwaredevelopement.webp";
import imgVideo from "../../assets/About/vidioediting.webp";
import imgBpo from "../../assets/About/bpo.webp";
import imgTraining from "../../assets/About/traning.webp";
import imgEcom from "../../assets/About/ecommerce.webp";


const SERVICES = [
  {
    title: "Website Development",
    desc: "High-performance, responsive websites built for speed, accessibility, and conversions.",
    img: imgWeb,
    link: "/services/webdevelopement",
  },
  {
    title: "SEO & Local Search",
    desc: "Search engine optimization and local SEO services to improve visibility and leads.",
    img: imgSeo,
    link: "/services/digitalmarketing",
  },
  {
    title: "Branding & Graphic Design",
    desc: "Logo design, brand identity systems, and creative visuals that stand out.",
    img: imgBranding,
    link: "/services/grahicdesign",
  },
  {
    title: "App & Software Development",
    desc: "Scalable web apps, mobile apps, and custom software solutions.",
    img: imgApp,
    link: "/services/webdevelopement",
  },
  {
    title: "Video Production & Editing",
    desc: "Professional video editing, promotional videos, and brand storytelling.",
    img: imgVideo,
    link: "/services/vidioediting",
  },
  {
    title: "BPO — Voice & Non-Voice",
    desc: "Customer support, lead generation, and back-office outsourcing services.",
    img: imgBpo,
    link: "/services/bpo",
  },
  {
    title: "Training & Academy",
    desc: "Practical IT, software, and digital marketing training with real-world focus.",
    img: imgTraining,
    link: "/services/itconsulting",
  },
  {
    title: "E-commerce Solutions",
    desc: "Online store development, payment integration, and conversion optimization.",
    img: imgEcom,
    link: "/services/webdevelopement",
  },
];

const ServiceCard = ({ s }: { s: typeof SERVICES[number] }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">

      <div className="relative h-44 overflow-hidden">
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800">
          {s.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          {s.desc}
        </p>

        <div className="mt-4">
          {/* ✅ Goes to correct page */}
          <Link
            to={s.link}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default function AboutService() {
  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-extrabold text-slate-800">
          Our Services
        </h2>

        <p className="mt-3 max-w-3xl text-slate-600">
          We are a full-service digital and IT solutions company in
          <strong> Marthandam</strong>, <strong>Nagercoil</strong>, and
          <strong> Kanyakumari</strong>.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
