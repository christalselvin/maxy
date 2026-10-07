import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, CheckCircle, Users, 
  Star, ArrowRight,
  Shield, Gift
} from 'lucide-react';

const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    "Weekly curated articles",
    "Exclusive content & insights",
    "Early access to new features",
    "Community discussions",
    "Free resources & templates",
    "No spam, unsubscribe anytime"
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full mb-4">
            <Mail size={16} />
            <span className="font-semibold">Stay Updated</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 ml-3">
              Community of Readers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the best articles delivered directly to your inbox. Join 50,000+ readers who stay ahead with our weekly digest.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Newsletter form */}
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-6">
                  <CheckCircle className="text-white" size={40} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome Aboard!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for subscribing! Check your email for a confirmation message 
                  and your first weekly digest will arrive next Monday.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Subscribe Another Email
                </button>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Mail className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Weekly Digest</h3>
                    <p className="text-gray-600">The best articles, delivered weekly</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interests (Optional)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Technology', 'Design', 'Business', 'Lifestyle', 'Health', 'Education'].map((interest) => (
                        <label key={interest} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded text-emerald-500" />
                          <span className="text-gray-700">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          Subscribe Now
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                    
                    <div className="text-center text-sm text-gray-500">
                      <Shield className="inline mr-2 text-emerald-500" size={14} />
                      Your email is safe with us. No spam, ever.
                    </div>
                  </div>
                </form>
              </>
            )}
          </motion.div>

          {/* Benefits and stats */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Benefits card */}
            <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Gift className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Subscribe & Get</h3>
                  <p className="text-emerald-100">Exclusive benefits for our subscribers</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-green-300" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-emerald-400/30">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Free</div>
                  <div className="text-emerald-100">No credit card required</div>
                </div>
              </div>
            </div>

            {/* Community stats */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community Stats</h3>
                  <p className="text-gray-600">Join our growing community</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">50K+</div>
                  <div className="text-gray-600">Subscribers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700 mb-2">92%</div>
                  <div className="text-gray-600">Open Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700 mb-2">4.8/5</div>
                  <div className="text-gray-600">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-700 mb-2">Weekly</div>
                  <div className="text-gray-600">Delivery</div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Star className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">What Readers Say</h3>
                  <p className="text-purple-100">Real feedback from our community</p>
                </div>
              </div>
              <p className="text-white/90 italic mb-4">
                "The weekly digest is my favorite email of the week. I always discover 
                something valuable that I wouldn't have found otherwise."
              </p>
              <div className="text-white font-semibold">— Sarah Johnson, Product Designer</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;