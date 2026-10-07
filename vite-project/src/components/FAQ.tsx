'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We provide end-to-end digital solutions including Software Development, Web & Mobile App Development, AI Services, BPO (Voice & Non-Voice), IT Consulting, Graphic Design, Video Editing, and Digital Marketing — tailored for startups, SMEs, and enterprises.",
  },
  {
    question: "Do you build both web and mobile applications?",
    answer:
      "Yes. We develop scalable web applications and cross-platform mobile apps (Android & iOS) using modern technologies like React, Next.js, Flutter, React Native, Node.js, and cloud platforms.",
  },
  {
    question: "What AI services do you offer?",
    answer:
      "Our AI services include chatbots, automation tools, data analysis, machine learning solutions, and AI integrations that improve business efficiency and customer experience.",
  },
  {
    question: "What BPO services do you provide?",
    answer:
      "We offer Voice and Non-Voice BPO services such as customer support, technical support, data entry, back-office operations, and business process outsourcing to help companies scale efficiently.",
  },
  {
    question: "Do you offer IT consulting?",
    answer:
      "Yes. Our IT consulting services help businesses choose the right technologies, optimize infrastructure, improve security, and plan digital transformation strategies.",
  },
  {
    question: "Can you handle graphic design and branding?",
    answer:
      "Absolutely. We create logos, brand identity, UI/UX design, social media creatives, marketing materials, and professional visual assets tailored to your brand.",
  },
  {
    question: "Do you provide video editing services?",
    answer:
      "Yes. We offer professional video editing for promotional videos, social media content, YouTube videos, ads, corporate presentations, and motion graphics.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend on project scope. Small projects may take a few weeks, while complex platforms may take several months. We provide a detailed timeline after requirement analysis.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes. We provide post-launch support, updates, performance monitoring, and maintenance packages to ensure your systems run smoothly.",
  },
  {
    question: "How can I start a project with you?",
    answer:
      "Simply contact us through our website, email, or phone. We'll schedule a free consultation to understand your requirements and provide a proposal.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-32 ">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find quick answers to the most common questions about our services, process, and collaboration.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Last updated: February 14, 2026
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  )}
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`px-6 pb-5 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're here to help — feel free to reach out anytime.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;