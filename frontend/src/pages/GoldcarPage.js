import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Clock, Shield, Car, Globe, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1546412414-c2658fffe7d9?w=1400&h=700&fit=crop";
const LOGO_URL = "/goldcar-logo.png";
const BOOKING_URL = "https://www.goldcar.com/en-gb/car-rental/locations/dubai/";

const strengths = [
  { icon: Shield, title: "High Standards of Quality", desc: "With over 35 years of industry experience, Goldcar delivers reliable service backed by proven operational excellence and the standards of the Europcar Mobility Group." },
  { icon: Clock, title: "24-Hour Customer Service", desc: "Round-the-clock roadside assistance ensures you are never left stranded. Our support team is just one call away, day or night." },
  { icon: Star, title: "5-Star Vehicle Fleet", desc: "A wide selection of well-maintained standard and compact vehicles — young fleet, backed by a globally recognised, ISO-certified operator." },
];

const whatMakesDifferent = [
  "Best-in-market rental rates with transparent pricing",
  "Access to the full Europcar Dubai branch and airport network",
  "Young, well-maintained fleet of standard and compact vehicles",
  "The backing of a globally recognised, ISO-certified operator",
  "Simple, fast booking — online, by phone, or at the airport",
];

export default function GoldcarPage() {
  const [strengthsRef, strengthsVisible] = useScrollAnimation();
  const [aboutRef, aboutVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Goldcar Dubai | Budget Short Term Rentals"; }, []);

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
            Smart Travel Starts Here.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A value-led self-drive mobility offering designed for customers seeking accessible, practical rental solutions with straightforward convenience.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="goldcar-hero-book-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Book at Best Prices
          </a>
        </div>
      </section>

      {/* INTERNATIONAL BRAND STORY */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={aboutRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${aboutVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">
              The Brand That Reinvented Affordable Car Rental
            </h2>
            <div className="space-y-4 font-body text-[#999] leading-relaxed">
              <p>
                Goldcar is the largest low-cost car rental brand in Europe, with over 35 years of experience in delivering smart, fair, and value-for-money travel experiences to millions of customers across the continent. The brand manages a fleet of more than 60,000 vehicles through a network of 100 offices spanning Spain, Portugal, Italy, France, Greece, Croatia, Turkey, Malta, and beyond.
              </p>
              <p>
                Goldcar is a brand of the Europcar Mobility Group — the same global organisation that brings Europcar's premium standards to over 143 countries. As part of this ecosystem, Goldcar customers benefit from the group's operational infrastructure, safety standards, and customer service capabilities, while enjoying the most competitive rental rates in the market.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { val: "35+", label: "Years Experience" },
                { val: "60,000+", label: "Global Fleet" },
                { val: "100+", label: "Offices Worldwide" },
                { val: "#1", label: "Low-Cost in Europe" },
              ].map((s) => (
                <div key={s.label} className="bg-[#111] border border-white/5 p-4 text-center">
                  <p className="font-mono text-xl font-bold text-[#EE5A01]">{s.val}</p>
                  <p className="font-body text-xs text-[#666] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY GOLDCAR */}
      <section data-testid="goldcar-strengths" className="bg-black py-20 sm:py-28">
        <div ref={strengthsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${strengthsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Affordable Car Hire. Expertly Delivered.
            </h2>
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

      {/* GOLDCAR IN UAE */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Goldcar in the UAE</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                What Makes Goldcar Different
              </h2>
              <p className="font-body text-[#999] leading-relaxed mb-6">
                In the UAE, Goldcar services are offered through all Europcar Dubai outlets across Dubai and the Northern Emirates, with an exclusive dedicated counter at Sharjah International Airport — making Goldcar the smart choice for budget-conscious travellers arriving through one of the region's fastest-growing aviation hubs.
              </p>
              <ul className="space-y-3 mb-8">
                {whatMakesDifferent.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[#111] border border-[#EE5A01]/20 p-5 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#EE5A01]" />
                  <span className="font-heading font-bold text-sm text-[#EEEDE7]">Exclusive Location</span>
                </div>
                <p className="font-body text-sm text-[#999]">Sharjah International Airport counter — dedicated Goldcar service for all Sharjah arrivals.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block text-center">
                  Book Goldcar at Sharjah Airport
                </a>
                <Link to="/europcar" className="btn-ghost inline-block text-center">Find a Location</Link>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=800&h=500&fit=crop" alt="Goldcar fleet in Dubai" className="w-full h-[420px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Travel Smart. Pay Less.</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Explore the UAE your way with Goldcar. Affordable rates, exclusive online offers, and quick service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors text-center">Book Goldcar</a>
            <Link to="/contact" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
