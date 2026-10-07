import Button from "../../components/Ui/Button";
import heroGraphic from "../../assets/Home_Images/home_service.webp";
import { Link } from "react-router-dom";


type FeatureCardProps = { title: string; desc: string };

const FeatureCard = ({ title, desc }: FeatureCardProps) => {
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition p-6 relative">
      <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
      <p className="text-lg font-semibold text-gray-800 mb-2">{title}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
};

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN */}
            <div className="md:col-span-7 lg:col-span-6">
              {/* Semantic heading for SEO */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight pt-5">
                Digital Services & Web Solutions
              </h2>

              <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
                MaxOTechs — trusted partner for website development, digital marketing,
                branding, video editing and cloud migration. We help businesses increase
                visibility, drive traffic, and convert customers online.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
  <Link to="/contact">
    <Button className="px-6 py-3" variant="primary">
      Get a Free Quote
    </Button>
  </Link>
</div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end">
              <div className="w-auto max-w-md relative">
                <img
                  src={heroGraphic}
                  loading="lazy"
                  alt="Team collaboration and digital analytics illustration"
                  className="w-full h-auto object-cover rounded-xl shadow-lg mt-2 md:mt-10"
                />

                {/* BADGE */}
                <div className="absolute md:top-64 hidden -left-20 bg-white px-6 py-1.5 rounded-xl text-xs font-semibold shadow-md border border-gray-100 cursor-pointer">
                  <span className="block w-full bg-transparent">
                    Trusted by global organizations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                title="Website Development"
                desc="Custom responsive websites built for global search visibility — fast, mobile-friendly, and optimized for conversions."
              />
              <FeatureCard
                title="SEO & Local Search"
                desc="Complete SEO services: keyword research, Google Business Profile optimization, on-page SEO, technical fixes, and citation building."
              />
              <FeatureCard
                title="Branding & Graphic Design"
                desc="Logo design, brand identity systems, and creative graphic assets that help your brand stand out anywhere in the world."
              />
              <FeatureCard
                title="App & Software Development"
                desc="Mobile app development and software solutions for startups, enterprises, and digital platforms."
              />
              <FeatureCard
                title="Video Production & Editing"
                desc="Professional video editing, promotional videos, ads, reels, animations, and brand storytelling."
              />
              <FeatureCard
                title="BPO — Voice & Non-Voice"
                desc="Customer support, telesales, live chat, ticketing, and back-office outsourcing."
              />
              <FeatureCard
                title="Training & Academy"
                desc="Learn SEO, digital marketing, web development, app development, freelancing and more online."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
