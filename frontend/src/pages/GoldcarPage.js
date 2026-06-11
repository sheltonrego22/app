import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Clock, Shield, Car } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1546412414-c2658fffe7d9?w=1400&h=700&fit=crop";
const LOGO_URL = "/egmg-logo-transparent.png";
const PRODUCT_IMG = "https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file-5.webp";
const BOOKING_URL = "https://www.goldcar.com/en-gb/car-rental/locations/dubai/";

const strengths = [
  { icon: Shield, title: "High Standards of Quality", desc: "With over three decades of industry experience, we deliver reliable service backed by proven operational excellence and consistent quality." },
  { icon: Clock, title: "24-Hour Customer Service", desc: "Round-the-clock roadside assistance ensures you are never left stranded. Our support team is just one call away, day or night." },
  { icon: Star, title: "5-Star Vehicle Fleet", desc: "A wide selection of well-maintained vehicles — from compact options to spacious family cars and SUVs — tailored to every travel need and budget." },
];

const benefits = [
  "Competitive prices through website and partner channels",
  "Available at all Europcar outlets in Dubai & Northern Emirates",
  "Exclusive outlet at Sharjah International Airport",
  "Brand leadership in low-cost segment for 30+ years",
  "Large customer base enables highly competitive pricing",
  "Full insurance and roadside assistance included",
];

export default function GoldcarPage() {
  const [strengthsRef, strengthsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Goldcar Dubai — Smart, Affordable Car Rental | Eurogulf Mobility"; }, []);

  return (
    <div data-testid="goldcar-page">
      {/* HERO */}
      <section data-testid="goldcar-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Goldcar Rental" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Goldcar by EGMG" className="h-10 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Smart Travel, Fair Prices
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Goldcar is a leading brand in the low-cost car rental segment, offering a smart, fair, and value-for-money travel experience. Rent a car at very attractive prices and enjoy a service in accordance with the price you pay.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="goldcar-hero-book-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Book at Best Prices
          </a>
        </div>
      </section>

      {/* WHY GOLDCAR */}
      <section data-testid="goldcar-strengths" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={strengthsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${strengthsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Why Goldcar Leads the Low-Cost Segment
            </h2>
            <p className="font-body text-[#666666] max-w-lg mx-auto">
              Our DNA is built on smart, fair pricing and quality service. Over three decades of brand leadership proves it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strengths.map((s, idx) => (
              <div key={s.title} className={`bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all group ${strengthsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${idx + 1}`}>
                <s.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-3">{s.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Value-Driven Mobility</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                More Road, Less Cost
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                Whether you are a leisure traveller on a budget or a resident looking for dependable daily transport, Goldcar delivers the perfect balance of affordability and reliability. Available across all Europcar outlets in Dubai and the Northern Emirates, with an exclusive counter at Sharjah International Airport.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{b}</span>
                  </li>
                ))}
              </ul>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
                View Fleet & Prices
              </a>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1714156313350-297f464ab12f?w=800&h=500&fit=crop" alt="Goldcar fleet in Dubai" className="w-full h-[420px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Travel Smart. Pay Less.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Explore the UAE your way with Goldcar. Affordable rates, exclusive online offers, and quick service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors text-center">
              Book Goldcar
            </a>
            <Link to="/contact" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
