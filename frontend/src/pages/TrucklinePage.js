import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Settings, Wrench, Shield, Package, Snowflake, HardHat, UtensilsCrossed, Building, Fuel, Landmark, Check, Phone, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1698348186158-253ce97914f9?w=1400&h=700&fit=crop";

const clientLogos = [
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-4.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-3.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-2.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-9.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-8.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-11.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-10.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-7.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-6.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-5.png.webp",
];

export default function TrucklinePage() {
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [fleetRef, fleetVisible] = useScrollAnimation();
  const [whyRef, whyVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Truckline Transport | Operational Vehicle Leasing & Fleet Management UAE"; }, []);

  return (
    <div data-testid="truckline-page">
      {/* HERO */}
      <section data-testid="truckline-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Commercial fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Truckline · Powered by Eurogulf Mobility</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Truckline Transport — Commercial Vehicle Leasing and Fleet Management Solutions
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Commercial mobility solutions built around operational need, business efficiency, and long-term fleet practicality.
          </p>
          <Link to="/contact" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>Request Fleet Consultation</Link>
        </div>
      </section>

      {/* ABOUT TRUCKLINE */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={aboutRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${aboutVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">About Truckline</h2>
            <p className="font-body text-[#999] leading-relaxed">
              Truckline delivers commercial mobility solutions for businesses that rely on vehicles to support operations, logistics, service delivery, and workforce movement. As part of the wider Eurogulf Mobility ecosystem, Truckline is positioned to support tailored fleet requirements rather than a fixed one-size-fits-all leasing proposition.
            </p>
          </div>
        </div>
      </section>

      {/* COMMERCIAL FLEET SUPPORT */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">Commercial Fleet Support</h2>
            <p className="font-body text-[#999] leading-relaxed">
              Truckline can support discussions around commercial vehicle leasing, specialist operational requirements, and configured business-use vehicle needs, subject to technical, commercial, and operational confirmation. Public-facing language remains capability-led and should not promise specific body-build formats, payload capacities, or seating configurations unless separately approved.
            </p>
          </div>
        </div>
      </section>

      {/* WHY TRUCKLINE IS DIFFERENT */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={whyRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${whyVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">Why Truckline is Different</h2>
            <p className="font-body text-[#999] leading-relaxed">
              What strengthens Truckline is the wider platform behind it: mobility expertise, group support capability, workshop infrastructure, and a broader ecosystem that can support more than just vehicle supply. This creates a stronger proposition for customers seeking reliability, accountability, and long-term operational value.
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="bg-black py-14 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-mono text-xs tracking-[0.2em] text-[#666] text-center mb-8 uppercase">Trusted by Leading Businesses</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {clientLogos.map((logo, idx) => (
              <img key={logo} src={logo} alt={`Client ${idx + 1}`} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Need a Commercial Fleet Discussion?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Share your requirement and our team will review and come back with the appropriate next steps.
          </p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">
            Request Fleet Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
