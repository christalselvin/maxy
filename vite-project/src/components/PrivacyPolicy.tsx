const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-16 py-7">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are committed to protecting your privacy and handling your personal information responsibly. 
            This policy explains what data we collect, how we use it, and your rights.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Last updated: February 14, 2026
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <ul className="space-y-2 text-blue-600 dark:text-blue-400">
            <li><a href="#collection" className="hover:underline">1. Information We Collect</a></li>
            <li><a href="#use" className="hover:underline">2. How We Use Your Information</a></li>
            <li><a href="#sharing" className="hover:underline">3. Sharing & Disclosure</a></li>
            <li><a href="#security" className="hover:underline">4. Data Security</a></li>
            <li><a href="#rights" className="hover:underline">5. Your Rights & Choices</a></li>
            <li><a href="#cookies" className="hover:underline">6. Cookies & Tracking</a></li>
            <li><a href="#changes" className="hover:underline">7. Changes to This Policy</a></li>
            <li><a href="#contact" className="hover:underline">8. Contact Us</a></li>
          </ul>
        </nav>

        {/* Main Sections */}
        <div className="space-y-16">
          <section id="collection" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              1. Information We Collect
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We collect information in the following ways:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Information you provide</strong>: Name, email, phone, company details when you contact us, sign up, or submit forms.</li>
                <li><strong>Automatically collected</strong>: IP address, browser type, device info, pages visited, time/date of access, referring site (via logs and analytics).</li>
                <li><strong>Cookies & similar tech</strong>: See section 6 for details.</li>
              </ul>
              <p className="mt-6">
                We do not collect sensitive personal data (e.g., health, race, religion) unless explicitly required for a service and with your consent.
              </p>
            </div>
          </section>

          <section id="use" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              2. How We Use Your Information
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We use your data to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide, maintain, and improve our services and website</li>
                <li>Respond to inquiries, support requests, or communications</li>
                <li>Send important updates, service announcements, or (with consent) marketing emails</li>
                <li>Analyze usage trends and enhance user experience (aggregated/anonymized)</li>
                <li>Comply with legal obligations, prevent fraud, or enforce our terms</li>
              </ul>
              <p className="mt-6 italic text-gray-500 dark:text-gray-500">
                We never sell your personal information to third parties.
              </p>
            </div>
          </section>

          <section id="sharing" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              3. Sharing & Disclosure
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We may share data with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Service providers (hosting, analytics, email — bound by strict contracts)</li>
                <li>Legal authorities when required by law or to protect rights/safety</li>
                <li>Business transfers (merger, acquisition — with notice where possible)</li>
              </ul>
              <p className="mt-6">
                We do not share with advertisers or unrelated third parties for their own purposes.
              </p>
            </div>
          </section>

          <section id="security" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              4. Data Security
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We use reasonable technical, administrative, and physical safeguards, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Encryption in transit (TLS/SSL) and at rest where applicable</li>
                <li>Access controls and regular security reviews</li>
                <li>Data minimization and retention limits</li>
              </ul>
              <p className="mt-6">
                No method is 100% secure — we continuously improve protections.
              </p>
            </div>
          </section>

          <section id="rights" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              5. Your Rights & Choices
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>Depending on your location, you may have rights to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access, correct, update, or delete your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-6">
                To exercise rights, contact us at the email below. We respond within statutory timeframes.
              </p>
            </div>
          </section>

          <section id="cookies" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              6. Cookies & Tracking Technologies
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We use cookies for functionality, analytics, and (optional) preferences. You can manage via browser settings or our consent banner.</p>
              <p className="mt-4">
                For details, see our <a  className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</a>.
              </p>
            </div>
          </section>

          <section id="changes" className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
              7. Changes to This Policy
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We may update this policy. Changes will be posted here with an updated date. Significant changes may include notice via email or site banner.</p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Questions or requests? Reach out at
            </p>
            <a 
              href="mailto:hr@maxotechs.com" 
              className="mt-3 inline-block text-xl font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              hr@maxotechs.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;