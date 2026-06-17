import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const benefits = [
  "Tailor-made solutions from 12 to 48 months or more",
  "Customised mileage options", "No down payment required",
  "Fixed, predictable monthly payments", "Registration and insurance included",
  "Full maintenance coverage", "Replacement vehicle guarantee",
  "Lease-to-own options available",
];

export default function SEOCarLeasingDubai() {
  useEffect(() => { document.title = "Car Leasing Dubai | Long-Term Vehicle Leasing UAE | Europcar by Eurogulf Mobility Group"; }, []);

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase block mb-4">Europcar Dubai · Leasing Division</span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4">Car Leasing Dubai</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">
            A practical alternative to vehicle ownership. Europcar offers tailor-made long-term leasing solutions for individuals and businesses, with customised mileage and predictable monthly costs.
          </p>
          <Link to="/europcar" className="bg-[#2d8c3c] text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:opacity-90 transition-opacity inline-block">Explore Leasing Options</Link>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-6">Leasing Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-[#111] border border-white/5 p-4">
                <Check className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-[#EEEDE7]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-black uppercase tracking-tight mb-4">Ready to Lease?</h2>
          <p className="font-body text-black/70 mb-8">Submit your details and a leasing specialist will follow up with a tailored proposal.</p>
          <Link to="/europcar" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
