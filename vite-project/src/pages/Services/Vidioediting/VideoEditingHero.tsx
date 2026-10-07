import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Video, Play, Zap } from "lucide-react";

import Button from "../../../components/Ui/Button";

import back from "../../../assets/Service/Vidioediting/back.webp";
import vidio from "../../../assets/Service/Vidioediting/from.mp4";
import back1 from "../../../assets/Service/Vidioediting/kack.mp4";

const VideoEditingHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas(); // initial size

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      type: "wave" | "sparkle" | "timeline";
    }> = [];

    for (let i = 0; i < 200; i++) {
      const type = i % 3 === 0 ? "wave" : i % 3 === 1 ? "sparkle" : "timeline";
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (type === "wave" ? 6 : 3) + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color:
          type === "wave"
            ? "#06b6d4"
            : type === "sparkle"
              ? "#10b981"
              : "#34d399",
        opacity: Math.random() * 0.5 + 0.1,
        type,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.8)");
      gradient.addColorStop(0.5, "rgba(20, 40, 50, 0.6)");
      gradient.addColorStop(1, "rgba(30, 58, 68, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * 0.01 + time * 0.05) * 30 +
          Math.sin(x * 0.02 + time * 0.03) * 15;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      const barCount = Math.max(20, Math.floor(canvas.width / 20)); // fewer bars on mobile
      const barWidth = canvas.width / barCount;
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.sin(time * 0.05 + i * 0.3) * 80 + 20; // reduced amplitude
        const x = i * barWidth;
        const g = ctx.createLinearGradient(
          0,
          canvas.height / 2 - barHeight / 2,
          0,
          canvas.height / 2 + barHeight / 2,
        );
        g.addColorStop(0, "rgba(16, 185, 129, 0.4)");
        g.addColorStop(1, "rgba(6, 182, 212, 0.2)");
        ctx.fillStyle = g;
        ctx.fillRect(
          x,
          canvas.height / 2 - barHeight / 2,
          barWidth - 2,
          barHeight,
        );
      }

      particles.forEach((particle) => {
        switch (particle.type) {
          case "wave":
            particle.x += Math.sin(time * 0.02 + particle.y * 0.01) * 0.5;
            particle.y += Math.cos(time * 0.02 + particle.x * 0.01) * 0.3;
            break;
          case "sparkle":
            particle.x += particle.speedX * 0.5;
            particle.y += particle.speedY * 0.5;
            particle.opacity =
              0.2 + Math.sin(time * 0.05 + particle.x * 0.01) * 0.3;
            break;
          case "timeline":
            particle.x += 1;
            if (particle.x > canvas.width) {
              particle.x = 0;
              particle.y = Math.random() * canvas.height;
            }
            break;
        }

        ctx.beginPath();
        if (particle.type === "timeline") {
          ctx.rect(particle.x, particle.y, particle.size, 1);
        } else {
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-teal-900/30">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Background Video/GIF */}
      <div className="absolute inset-0 opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={back}
          className="w-full h-full object-cover"
        >
          <source src={vidio} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/70" />
      </div>

      <div className="relative mt-12 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Professional
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Video Editing Services
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              We transform raw footage into cinematic stories through
              <strong>
                {" "}
                professional video editing, motion graphics, color grading, and
                post-production
              </strong>
              . Trusted by brands, creators, and businesses worldwide.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
                variant="primary"
                className="group hover:scale-[1.02] transition-transform w-full sm:w-auto"
              >
                Start Your Video Project
              </Button>

              <Button
                href="/contact"
                variant="ghost"
                className="w-full sm:w-auto"
              >
                Watch Showreel
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Editor Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="relative h-48 sm:h-64 mb-4 sm:mb-6 bg-black rounded-xl overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={back}
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                >
                  <source src={back1} type="video/mp4" />
                </video>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                  <div className="text-white font-semibold text-sm sm:text-base">
                    Cinematic Sequence Preview
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    00:32 / 02:45
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/80 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="text-white text-sm font-semibold">
                    Timeline
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="text-emerald-400" size={14} />
                    <span className="text-gray-400 text-xs sm:text-sm">
                      4K 60fps
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                      <Play className="text-white" size={16} />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                      <Video className="text-cyan-400" size={16} />
                    </button>
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm font-mono">
                    00:32:15
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { color: "from-cyan-500 to-teal-500", label: "Color Grade" },
                  { color: "from-emerald-500 to-green-500", label: "Effects" },
                  { color: "from-lime-500 to-green-600", label: "Audio" },
                  { color: "from-teal-500 to-cyan-600", label: "Transitions" },
                ].map((effect, i) => (
                  <motion.div
                    key={i}
                    className={`bg-gradient-to-br ${effect.color} rounded-lg p-2 sm:p-3 text-center`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-white text-xs sm:text-sm font-semibold">
                      {effect.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Cards - smaller on mobile */}
            <motion.div
              className="absolute  hidden md:flex-bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 w-48 sm:w-64"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-white text-xs sm:text-sm ">
                <div className="font-bold">4K Ready</div>
                <div className="text-cyan-100 ">Ultra HD Export</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 w-44 sm:w-56"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <div className="text-white text-xs sm:text-sm">
                <div className="font-bold">25+</div>
                <div className="text-emerald-100">Industry Awards</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoEditingHero;
