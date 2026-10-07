import { useEffect, useRef, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Home_Images/Logo/maxotech_logo_black.webp";

export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState(true);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const onNavClick = () => setOpen(false);

  
  useEffect(() => {
   let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowHamburger(false); // scroll down
    } else {
      setShowHamburger(true); // scroll up
    }

    lastScrollY = currentScrollY;
  };

    window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <>
      {/* DESKTOP / TABLET: centered full navbar (shown md and up) */}
      <div className="flex absolute top-5 left-0 w-full justify-center z-40">
        <nav
          className="flex items-center justify-between w-[95%] md:w-[85%] lg:w-[75%] bg-white/90 backdrop-blur-md rounded-full shadow-xl px-4 py-3"
          aria-label="Main navigation"
        >
          <Link to="/" onClick={onNavClick} className="flex items-center gap-2 ml-2 md:ml-3">
          <img
            src={logo}
            alt="MaxoTechs Logo"
            className="h-7 md:h-9 w-auto object-contain -mt-2"
            />
           </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition">
              About Us
            </Link>

            <div className="relative group">
              <button className="hover:text-blue-600 transition">
                Services ▾
              </button>

              {/* Dropdown stays open while hovering the whole group */}
              <div className="absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/services/ai"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  AI Services
                </Link>

                <Link
                  to="/services/bpo"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  BPO — Voice & Non-Voice
                </Link>

                <Link
                  to="/services/itconsulting"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  IT Consulting
                </Link>

                <Link
                  to="/services/webdevelopement"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Web Development
                </Link>

                <Link
                  to="/services/digitalmarketing"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Digital Marketing
                </Link>

                <Link
                  to="/services/grahicdesign"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Graphic Design
                </Link>

                <Link
                  to="/services/vidioediting"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Video Editing
                </Link>
              </div>
            </div>

            <Link to="/student-portal" className="hover:text-blue-600 transition">
              Student Portal
            </Link>

            <Link to="/blog" className="hover:text-blue-600 transition">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact Us
            </Link>

            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>
          </div>
 
             <div className="hidden min-[380px]:flex items-center lg:static absolute left-56 lg:left-auto">
            <a
              href="tel:+919876543210"
               className="flex items-center gap-2 bg-black text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm hover:bg-gray-900 transition"
            >
              <Phone size={16} />
              Book a call
            </a>
          </div>
        </nav>
      </div>

      {/* MOBILE: only show small floating hamburger (right side) */}
      <div
  className={`lg:hidden fixed top-7 right-4 z-50 transition-all duration-300
  ${open ? "hidden" : ""}
  ${showHamburger ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"}
`}
>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-3 rounded-full bg-white shadow-lg"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay (shows when menu open) */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      {/* Slide-in panel (mobile) */}
      <div
        ref={panelRef}
        className={`fixed top-0 left-0 h-full w-64 max-w-[85vw] z-50 transform transition-transform duration-300 bg-white shadow-lg ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2 ml-1">
  <img
    src={logo}
    alt="MaxoTechs Logo"
    className="h-7 w-auto object-contain"
  />
</div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-4">
          <Link
            to="/"
            onClick={onNavClick}
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <hr className="border-gray-200" />

          <Link
            to="/about"
            onClick={onNavClick}
            className="hover:text-blue-600 transition"
          >
            About Us
          </Link>

          <div>
            <button className="w-full text-left flex items-center justify-between py-2 font-medium text-gray-700 hover:text-blue-600">
              Services
              <span className="text-sm text-gray-400">▾</span>
            </button>
            <div className="mt-1 pl-3">
              <Link
                to="/services/ai"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                AI Services
              </Link>
              <Link
                to="/services/bpo"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                Bpo- Voice & Non Voice
              </Link>
              <Link
                to="/services/itconsulting"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                It Consulting
              </Link>
              <Link
                to="/services/webdevelopement"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                Web Develoment
              </Link>
              <Link
                to="/services/digitalmarketing"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                Digital Marketing
              </Link>
              <Link
                to="/services/grahicdesign"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                Graphic Design
              </Link>
              <Link
                to="/services/vidioediting"
                onClick={onNavClick}
                className="block py-2 text-sm text-gray-600 hover:text-blue-600"
              >
                Video Editing
              </Link>
            </div>
          </div>

          <Link
            to="/student-portal"
            onClick={onNavClick}
            className="block text-gray-700 font-medium py-2 hover:text-blue-600"
          >
            Student Portal
          </Link>

          <Link to="/blog" className="hover:text-blue-600 transition">
            Blog
          </Link>

          <Link
            to="/contact"
            onClick={onNavClick}
            className="block text-gray-700 font-medium py-2 hover:text-blue-600"
          >
            Contact Us
          </Link>

          <div className="mt-4 ">
            <button
              onClick={onNavClick}
              className="w-full flex items-center justify-start gap-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-900 transition"
            >
              <Phone size={16} />
              Book a call
            </button>
          </div>
        </div>
      </div>
    </>
  );
}