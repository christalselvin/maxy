import Button from "../../components/Ui/Button";
import aboutImg from "../../assets/Home_Images/about.webp";
import { Globe, Smartphone, Megaphone, Palette } from "lucide-react";
import { Link } from "react-router-dom";
export default function AboutStartup() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4  py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-4xl sm:text-5xl font-extrabold leading-tight">
              We create digital products that grow with you.
            </p>

            <p className="text-lg text-gray-600 max-w-xl">
              We’re a fast-moving team focused on building performant web and mobile products,
              marketing engines, and cloud solutions that help startups and SMBs go to market quickly.
            </p>

            <div className="flex gap-3 items-center">
  <a
  href="tel:+919876543210"
  className="px-6 py-3 bubbly-button"
>
  Book a free call
</a>


  <Link to="/services/ai">
    <Button
      variant="ghost"
      className="px-6 py-3"
    >
      View services
    </Button>
  </Link>
</div>

       {/* Static counters */}
            <div className="flex gap-8 mt-6">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91]">0+</div>
                <div className="text-sm text-gray-600 mt-1">Years experience</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91]">0</div>
                <div className="text-sm text-gray-600 mt-1">Projects done</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91]">0%</div>
                <div className="text-sm text-gray-600 mt-1">Focus on delivery</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-3xl overflow-hidden">
              <img
                src={aboutImg}
                loading="lazy"
                alt="Digital product and team collaboration illustration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Who we are + Core Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
        
        {/* Left: Who we are */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-2 shadow">
          <div className="relative w-fit group cursor-pointer">
            <p className="text-2xl font-semibold">Who we are</p>
            <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
          </div>

          <p className="mt-4 text-gray-600">
            We are a full-service digital and IT solutions company in Marthandam and Nagercoil,
            dedicated to helping businesses, startups, and enterprises achieve sustainable growth
            through technology-driven innovation. With a strong focus on reliability, scalability,
            and measurable results, we deliver end-to-end digital solutions that empower brands in a
            competitive digital landscape.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Product Design", desc: "User-centered design, prototypes, and usability testing." },
              { title: "Support & Optimization", desc: "Ongoing updates and performance improvements." },
              { title: "Growth", desc: "Acquisition playbooks, analytics, and conversion optimization." },
              { title: "Continuous Support", desc: "Regular updates and fixes to ensure system stability." },
            ].map((item) => (
              <div key={item.title}>
                <div className="relative w-fit group cursor-pointer">
                  <p className="font-semibold">{item.title}</p>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Core expertise */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="relative w-fit group cursor-pointer">
              <p className="font-semibold">Core expertise</p>
              <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                {
                  title: "Web Development",
                  desc: "React, Next.js, Node, SSR, and performance-focused builds",
                  icon: <Globe size={18} aria-hidden />,
                },
                {
                  title: "App Development",
                  desc: "React Native / Flutter for fast cross-platform apps",
                  icon: <Smartphone size={18} aria-hidden />,
                },
                {
                  title: "Branding & Graphic Design",
                  desc: "Brand identity, logos, guidelines, and creative visuals",
                  icon: <Palette size={18} aria-hidden />,
                },
                {
                  title: "Marketing",
                  desc: "SEO, paid ads, content strategy, and analytics",
                  icon: <Megaphone size={18} aria-hidden />,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 group cursor-pointer">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0B3D91] text-white">
                    {item.icon}
                  </div>
                  <div>
                    <div className="relative w-fit">
                      <div className="font-medium">{item.title}</div>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
                    </div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#e6f0ff] to-white pb-6 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold">Ready to get started?</p>
          <p className="text-gray-600 mt-3">
            We help early-stage companies move from idea to product — quickly and confidently.
          </p>

          
          <div className="mt-4 mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
  

  <a
  href="tel:+919876543210"
  className="px-8 py-3 bubbly-button"
>
  Book a Discovery Call
</a>


  {/* Contact Page Link */}
  <Link to="/contact">
    <Button
      variant="ghost"
      className="px-6 py-3"
    >
      Contact Sales
    </Button>
  </Link>

</div>

        </div>
      </section>
    </div>
  );
}
