import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Brush,
  ArrowRight,
  Award,
  Users,
  Clock,
} from "lucide-react";

import graphicdesign from "../../../assets/Service/Graphicdesign/graphicdesign.webp";
import Brand from "../../../assets/Service/Graphicdesign/brand.webp";
import webdesign from "../../../assets/Service/Graphicdesign/webdesign.webp";
import Button from "../../../components/Ui/Button";

const GraphicDesignHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const waves = [
      { y: canvas.height * 0.7, length: 0.01, amp: 20, speed: 0.02, color: "rgba(56,189,248,0.25)" },
      { y: canvas.height * 0.78, length: 0.015, amp: 14, speed: 0.015, color: "rgba(14,165,233,0.35)" },
    ];

    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
      g.addColorStop(0, "#ecfeff");
      g.addColorStop(1, "#cffafe");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach(w => {
        ctx.beginPath();
        ctx.moveTo(0, w.y);
        for (let x = 0; x < canvas.width; x++) {
          ctx.lineTo(x, w.y + Math.sin(x * w.length + t) * w.amp);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.fill();
      });

      t += 0.04;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-sky-100">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Graphic Design Services for
              <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent relative group">
                Modern Brands
                <motion.span
                  className="absolute left-0 -bottom-2 h-[3px] w-full bg-gradient-to-r from-cyan-500 to-blue-500 origin-left scale-x-0 group-hover:scale-x-100"
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-10 max-w-xl">
              We craft premium <strong>visual identities, branding, UI/UX design</strong> and
              creative assets that help businesses stand out, connect, and scale across
              digital platforms.
            </p>

            <div className="flex gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
>
                  Start Your Design Project <ArrowRight />
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Stat icon={<Award />} value="150+" label="Design Projects" />
              <Stat icon={<Users />} value="50+" label="Happy Clients" />
              <Stat icon={<Brush />} value="5+" label="Years Experience" />
              <Stat icon={<Clock />} value="24/7" label="Creative Support" />
            </div>
          </motion.div>

          {/* RIGHT – IMAGES */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* MAIN */}
            <motion.div
              className="relative z-0 bg-white rounded-3xl shadow-2xl p-4 rotate-3 hidden md:flex"
              whileHover={{ y: -10, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <img
                src={graphicdesign}
                alt="Graphic Design Services"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </motion.div>

            {/* BRAND */}
            <motion.div
              className="absolute -bottom-10 hidden md:flex -left-10 w-64 h-48 bg-white rounded-2xl shadow-xl p-3 -rotate-6 z-20"
              animate={{ y: [0, -14, 0] }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={Brand} alt="Branding Design" className="w-full h-full rounded-xl object-cover" />
            </motion.div>

            {/* WEB DESIGN */}
            <motion.div
              className="absolute -top-10 -right-10 w-56 hidden md:flex h-40 bg-white rounded-2xl shadow-xl p-3 rotate-12 z-20"
              animate={{ y: [0, 14, 0] }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={webdesign} alt="Web & UI UX Design" 
               className="w-full h-full rounded-xl object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="text-center bg-white/70 backdrop-blur p-4 rounded-xl shadow-sm"
  >
    <motion.div
      className="text-2xl font-bold flex justify-center gap-2 text-cyan-700"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {icon} {value}
    </motion.div>
    <div className="text-sm text-gray-600">{label}</div>
  </motion.div>
);

export default GraphicDesignHero;
