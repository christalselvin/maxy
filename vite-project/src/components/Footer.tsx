import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Home_Images/Logo/maxotech_logo.webp";


// ✅ Lucide Icons
import { Pin, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

type Props = {
  company?: string;
};

const SocialIcon: React.FC<{ name: string; href: string }> = ({
  name,
  href,
}) => {
  const icons: Record<string, React.ReactNode> = {
    pinterest: <Pin size={18} />,
    linkedin: <Linkedin size={18} />,
    facebook: <Facebook size={18} />,
    instagram: <Instagram size={18} />,
    youtube: <Youtube size={18} />, // ✅ Added YouTube
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/60 hover:bg-white text-gray-700 shadow-sm transition"
    >
      {icons[name]}
    </a>
  );
};

const Footer: React.FC<Props> = ({ company = "Your Company" }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                {company.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{company}</p>
                <p className="text-sm text-gray-500">Quality you can trust</p>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Providing AI, IT, Digital Marketing, Design & Development
              services.
            </p>

            {/* ✅ Lucide Social Icons */}
            <div className="flex gap-2">
              <SocialIcon
                name="pinterest"
                href="https://in.pinterest.com/Maxotechs/"
              />
              <SocialIcon
                name="linkedin"
                href="https://www.linkedin.com/company/max-o-techs/"
              />
              <SocialIcon name="facebook" href="https://facebook.com/" />
              <SocialIcon
                name="instagram"
                href="https://www.instagram.com/maxotechs/"
              />
              <SocialIcon name="youtube" href="https://youtube.com/" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-sm mb-3">Company</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/Careers" className="hover:underline">
                    Carrier
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm mb-3">Services</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/services/ai">AI Services</Link>
                </li>
                <li>
                  <Link to="/services/bpo">BPO Services</Link>
                </li>
                <li>
                  <Link to="/services/itconsulting">IT Consulting</Link>
                </li>
                <li>
                  <Link to="/services/webdevelopement">Web Development</Link>
                </li>
                <li>
                  <Link to="/services/digitalmarketing">Digital Marketing</Link>
                </li>
                <li>
                  <Link to="/services/grahicdesign">Graphic Design</Link>
                </li>
                <li>
                  <Link to="/services/vidioediting">Video Editing</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          {/* CTA */}
<div className="space-y-4 text-center md:text-left">
  {/* Logo */}
  <img
    src={logo}
    alt="MaxoTechs Logo"
    className="h-20 w-auto object-contain mx-auto md:mx-0"
  />

  <p className="font-semibold text-sm">Get in touch</p>

  <p className="text-sm text-gray-500">
    Let’s discuss your project and grow your business.
  </p>

  <Link
    to="/contact"
    className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
  >
    Contact Us
  </Link>
</div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          {/* Left side */}
          <span>
            © {year} {company}. All rights reserved.
          </span>

          {/* Right side — now clickable links */}
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-gray-700 transition"
            >
              Privacy & Policy
            </Link>

            <Link to="/faq" className="hover:text-gray-700 transition">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
