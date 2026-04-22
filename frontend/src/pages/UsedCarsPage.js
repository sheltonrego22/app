import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Tag, Wrench, Users, Star, Car } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1651043186518-efbce5e409e9?w=1400&h=700&fit=crop";
const LOGO_URL = "/egmg-logo-transparent.png";

const highlights = [
  { value: "1,000+", label: "Satisfied Customers" },
  { value: "30+", label: "Years in Used Cars" },
  { value: "A-Grade", label: "Workshop Inspected" },
];

const strengths = [
  { icon: Shield, title: "Quality Pre-Owned Vehicles at Great Value", desc: "Every vehicle comes from EGMG's managed fleet, maintained to A-Grade workshop standards throughout its lifecycle." },
  { icon: Wrench, title: "On-Site Service & Maintenance", desc: "Full servicing and reconditioning performed in-house at our certified workshops before every vehicle is listed for sale." },
  { icon: Tag, title: "Hassle-Free Car Selling", desc: "Looking to sell? We offer a transparent, fair process to purchase your vehicle — quick valuations, no hidden fees." },
];

const buyingBenefits = [
  "Comprehensive multi-point inspection on every vehicle",
  "Full service history from EGMG managed fleet",
  "Competitive pricing with transparent documentation",
  "Wide selection of brands including Toyota, Nissan, Honda, and more",
  "On-site financing and insurance assistance",
  "Warranty options available on select vehicles",
];

export default function UsedCarsPage() {
  const [strengthsRef, strengthsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Eurogulf Used Cars — Quality Pre-Owned Vehicles | EGMG"; }, []);

  return (
    <div data-testid="used-cars-page">
      {/* HERO */}
      <section data-testid="used-cars-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Used Cars Showroom" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Eurogulf Used Cars by EGMG" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Quality Pre-Owned at Unbeatable Prices
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            At Eurogulf Used Cars, we specialize in offering reliable, high-quality pre-owned vehicles. With years of experience in the industry, our team provides a hassle-free buying experience tailored to individual needs and budgets.
          </p>
          <Link to="/contact" data-testid="used-cars-enquire-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Browse Available Stock
          </Link>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#111111] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 divide-x divide-white/10">
          {highlights.map((h) => (
            <div key={h.label} className="text-center py-8 px-4">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#EE5A01]">{h.value}</div>
              <div className="font-heading text-xs tracking-[0.15em] text-[#EEEDE7] mt-2 uppercase">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY EUROGULF */}
      <section data-testid="used-cars-strengths" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={strengthsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${strengthsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Why Choose Eurogulf Used Cars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strengths.map((s, i) => (
              <div key={i} data-testid={`used-cars-strength-${i}`} className={`bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all group ${strengthsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <s.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-3">{s.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Since 1994</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Trusted for Three Decades
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                Since 1994, Eurogulf Used Car Trading has built a reputation for transparency and value. Every vehicle in our showroom comes from our own managed fleet — serviced, inspected, and certified by EGMG's A-Grade workshops. No surprises, no hidden histories.
              </p>
              <ul className="space-y-3 mb-8">
                {buyingBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary inline-block">
                Enquire About Stock
              </Link>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1705102791477-508373b19e36?w=800&h=500&fit=crop" alt="Used Cars Showroom" className="w-full h-[420px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Find Your Next Car
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Visit our showroom or get in touch to browse the latest pre-owned vehicles at competitive prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors text-center">
              Contact Us
            </Link>
            <a href="tel:800364" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Call 800 364
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
