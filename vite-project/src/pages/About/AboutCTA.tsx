// src/pages/About/AboutCTA.tsx
import Button from "../../components/Ui/Button";

export default function AboutCTA() {
  return (
    <section className="relative bg-gradient-to-r from-white via-emerald-50 to-indigo-50 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        
        <div
          className="
            bg-white/80 backdrop-blur-sm
            border border-white/60
            rounded-3xl shadow-lg
            p-6 md:p-8
            flex flex-col md:flex-row
            items-start md:items-center
            justify-between
            gap-6
          "
        >
          {/* TEXT */}
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold text-slate-800">
              Looking for the right digital solution?
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Share your requirements and we’ll help you choose the best
              technology, strategy, and execution plan for your business.
            </p>
          </div>

          {/* CTA BUTTONS */}
          {/* CTA BUTTONS */}
<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

  {/* 🟢 WhatsApp */}
  <Button
    href="https://wa.me/919150331137?text=Hello%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20request%20a%20quote%20for%20your%20services.%20Please%20share%20the%20details."
    className="w-full sm:w-auto px-6 py-3 font-medium"
  >
    Request a Proposal
  </Button>

  {/* 📞 Call */}
  <Button
    href="tel:+919150331137"
    variant="ghost"
    className="w-full sm:w-auto px-6 py-3"
  >
    Schedule a Call
  </Button>

</div>

        </div>

      </div>
    </section>
  );
}
