import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const capabilities = [
  "Commercial vehicle leasing discussions", "Specialist fleet configurations",
  "Configured business-use vehicle solutions", "Workshop and maintenance support",
  "Dedicated account management", "Group-backed operational infrastructure",
];

export default function SEOCommercialLeasing() {
  useEffect(() => { document.title = "Commercial Vehicle Leasing UAE | Fleet Solutions | Truckline by Eurogulf Mobility Group"; }, []);

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase block mb-4">Truckline Transport · Part of Eurogulf Mobility Group</span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4">Commercial Vehicle Leasing UAE</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">
            Truckline delivers commercial mobility solutions for businesses that rely on vehicles to support operations, logistics, service delivery, and workforce movement across the UAE.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Request Fleet Consultation</Link>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-6">What We Support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((c) => (
              <div key={c} className="flex items-start gap-3 bg-[#111] border border-white/5 p-4">
                <Check className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-[#EEEDE7]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-black uppercase tracking-tight mb-4">Need a Commercial Fleet Discussion?</h2>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Speak to Our Team</Link>
        </div>
      </section>
    </div>
  );
}
