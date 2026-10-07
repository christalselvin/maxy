import React from 'react';
import { motion } from 'framer-motion';
import {
  Play, Star, Users,
  Award, Zap, ArrowRight,
  CheckCircle
} from 'lucide-react';
import Button from '../../../components/Ui/Button';

const FinalCTA: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Their video editing transformed our corporate content into a cinematic experience. Engagement increased by 300%.",
      author: "Sarah Chen",
      role: "Marketing Director, TechFlow",
      rating: 5
    },
    {
      quote:
        "The music video they edited went viral, crossing 5 million views in the first week. Exceptional creative quality.",
      author: "Marcus Rodriguez",
      role: "Artist Manager, Urban Records",
      rating: 5
    },
    {
      quote:
        "Professional video editors with fast turnaround and premium results. They exceeded every expectation.",
      author: "Emma Wilson",
      role: "Producer, Nature Channel",
      rating: 5
    }
  ];

  return (
    <section className="py-20 md:py-14 px-6 bg-gradient-to-br from-gray-900 via-black to-blue-900/30">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Video Editing & Visual Storytelling?
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Join 500+ brands who trust our professional video editing services
            for cinematic-quality results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 mb-16">

          {/* TESTIMONIALS */}
          <div className="lg:col-span-2 space-y-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-7 border border-gray-700"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(59,130,246,0.25)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Users className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{t.author}</h3>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>

                <p className="text-gray-300 italic mb-5">“{t.quote}”</p>

                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="text-yellow-400 fill-yellow-400"
                      size={18}
                    />
                  ))}
                  <span className="ml-2 text-gray-400 text-sm">5.0 Rating</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BENEFITS */}
          <motion.div
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-5">
                <Award className="text-white" size={28} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Why Choose Our Video Editing Agency
              </h3>
              <p className="text-gray-400 text-sm">
                Trusted by global brands
              </p>
            </div>

            <div className="space-y-5">
              {[
                ["Award-Winning Editors", "25+ industry recognitions"],
                ["Fast Turnaround", "48-hour delivery options"],
                ["Unlimited Revisions", "Until you're satisfied"],
                ["4K & 8K Output", "Cinema-grade quality"],
                ["24/7 Support", "Always available"]
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="text-green-400 mt-1" size={18} />
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <div className="text-gray-400 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <div className="text-3xl font-bold text-white">Starting at $500</div>
              <div className="text-gray-400 text-sm">
                Flexible pricing packages
              </div>
            </div>
          </motion.div>
        </div>

        {/* FINAL CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg mb-7">
            <Zap size={18} />
            <span className="font-semibold">Limited-Time Offer</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get 15% Off Your First Video Project
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              + Free Cinematic Color Grading
            </span>
          </h3>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Start today and receive professional color grading worth $400 —
            absolutely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details." className="group px-8 py-4 flex items-center gap-3">
              Claim Your Discount
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>

            <Button  href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
            variant="ghost" className="px-8 py-4 flex items-center gap-3">
              <Play size={18} />
              Watch Showreel
            </Button>
          </div>

          {/* TRUST STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              ["500+", "Happy Clients"],
              ["25+", "Industry Awards"],
              ["98%", "Retention Rate"],
              ["4.9/5", "Average Rating"]
            ].map(([value, label], i) => (
              <motion.div
                key={i}
                className="bg-white/5 rounded-xl p-4"
                whileHover={{ y: -4 }}
              >
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
