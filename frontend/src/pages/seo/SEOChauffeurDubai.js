import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const useCases = [
  "Airport transfers across UAE airports", "Corporate and VIP transport",
  "Staff and crew shuttle services", "Event and hospitality transport",
  "One-off journeys and managed arrangements", "Intercity transport across all 7 Emirates",
];

export default function SEOChauffeurDubai() {
  useEffect(() => { document.title = "Chauffeur Service Dubai | Premium Driven Transport | Eurogulf Premium Chauffeur"; }, []);

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase block mb-4">Eurogulf Premium Chauffeur · Part of Eurogulf Mobility Group</span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4">Chauffeur Service Dubai</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">
            Professional chauffeur-driven and managed transport solutions across the UAE. Airport transfers, corporate mobility, event logistics, and dedicated driver services, handled through specialist follow-up.
          </p>
          <Link to="/chauffeur-service" className="btn-primary inline-block">Submit Transport Enquiry</Link>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-6">Where This Service Fits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {useCases.map((uc) => (
              <div key={uc} className="flex items-start gap-3 bg-[#111] border border-white/5 p-4">
                <Check className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-[#EEEDE7]">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-black uppercase tracking-tight mb-4">Need Chauffeur Support?</h2>
          <p className="font-body text-black/70 mb-8">Submit an enquiry and our specialist team will follow up with availability and service details.</p>
          <Link to="/chauffeur-service" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Enquire Now</Link>
        </div>
      </section>
    </div>
  );
}
