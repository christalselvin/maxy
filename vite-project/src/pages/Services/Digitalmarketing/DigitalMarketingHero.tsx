import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Target,
  BarChart,
  ArrowRight,
  Play,
  Users,
  Globe,
  Shield,
} from "lucide-react";
import Button from "../../../components/Ui/Button";

const statColors: Record<string, string> = {
  purple: "text-purple-400",
  pink: "text-pink-400",
  blue: "text-blue-400",
  green: "text-green-400",
};

const DigitalMarketingHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      o: Math.random() * 0.3 + 0.1,
      w: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += Math.sin(t * 0.01 + p.w) * 0.4;
        p.y += Math.cos(t * 0.01 + p.w) * 0.4;

        if (p.x < 0) p.x = canvas.width;
        if (p.y < 0) p.y = canvas.height;
        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.4)";
        ctx.globalAlpha = p.o;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      t++;
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-40">
        <div className="grid lg:grid-cols-2  items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Amplify Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-10 max-w-2xl">
              We craft data-driven marketing strategies that boost engagement,
              conversions, and ROI across all digital channels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              
<Button
  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
>
                Start Free Audit
                <ArrowRight size={20} />
              </Button>

              <Button href="/contact" className="" variant="ghost">
                <Play size={20} className="text-purple-600" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Users, value: "250+", label: "Clients" },
                { icon: Globe, value: "40%", label: "Growth" },
                { icon: BarChart, value: "3.5x", label: "ROI" },
                { icon: Target, value: "24/7", label: "Monitoring" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="bg-gray-100 backdrop-blur p-4 rounded-xl text-center"
                >
                  <s.icon className="mx-auto mb-2 text-purple-600" />
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -20, 70] }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div
              className="
    bg-gradient-to-br from-gray-900 to-gray-800
    rounded-3xl shadow-2xl
    p-6
    w-full
    max-w-[520px]      /* controls width */
    min-h-[520px]      /* controls height */
    mx-auto md:w-[480px] md:h-[100px]
  "
            >
              <div className="flex gap-2 mb-6">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              <h3 className="text-white font-bold mb-6">Marketing Dashboard</h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    label: "Impressions",
                    value: "1.2M",
                    change: "+24%",
                    color: "purple",
                  },
                  {
                    label: "Clicks",
                    value: "45.8K",
                    change: "+18%",
                    color: "pink",
                  },
                  {
                    label: "Conversions",
                    value: "2.4K",
                    change: "+32%",
                    color: "blue",
                  },
                  {
                    label: "ROI",
                    value: "3.8x",
                    change: "+15%",
                    color: "green",
                  },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-gray-800/60 rounded-xl p-4"
                  >
                    <div className="text-white text-xl font-bold">
                      {s.value}
                    </div>
                    <div className="text-gray-400 text-sm">{s.label}</div>
                    <div
                      className={`${statColors[s.color]} text-sm font-semibold`}
                    >
                      {s.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated Bars */}
              <div className="relative h-40 flex items-end gap-2">
                {[30, 60, 45, 80, 65, 90, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
                    initial={{ height: "0%" }}
                    animate={{ height: [`0%`, `${h}%`, `${h - 10}%`, `${h}%`] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -bottom-10 -left-6 bg-white rounded-2xl p-5 shadow-xl hidden md:flex mb-0 md:mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Rocket className="text-purple-600 mb-2" />
              <div className="font-bold">Campaign Launched</div>
              <div className="text-purple-700 text-xl font-bold">+245%</div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6  sm:right-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-5 shadow-xl "
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Shield size={18} />
              <div className="font-bold mt-1">AI Optimized</div>
              <div className="text-lg font-bold">99.8%</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingHero;
