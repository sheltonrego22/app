import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const EUROPCAR_LOGO = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/xfzdgz6a_Logo2.png";

const LOGOS = {
  egmg: EGMG_LOGO,
  europcar: EUROPCAR_LOGO,
  goldcar: EGMG_LOGO,
  usedcars: EGMG_LOGO,
  royallimo: EGMG_LOGO,
  truckline: EGMG_LOGO,
};

const divisions = [
  {
    name: "Europcar",
    year: "1978",
    logo: LOGOS.europcar,
    desc: "At Europcar Dubai, we deliver premium car rental and vehicle leasing across 143 countries. Flexible short-term rentals and long-term corporate leasing solutions, backed by a fleet of 12,000+ vehicles across 14 UAE locations.",
    href: "/europcar",
  },
  {
    name: "Goldcar",
    year: "1978",
    logo: LOGOS.goldcar,
    desc: "A leading brand in the low-cost car rental segment, Goldcar offers smart, fair, and value-for-money travel. Attractive pricing, 5-star fleet quality, and 30+ years of brand leadership in the value segment.",
    href: "/goldcar",
  },
  {
    name: "Royal Limousine",
    year: "1998",
    logo: LOGOS.royallimo,
    desc: "Premium chauffeur service for personal and corporate clients. Highly trained, accredited chauffeurs with a fleet of new, well-maintained vehicles ensure every trip is safe, punctual, and memorable.",
    href: "/royal-limousine",
  },
  {
    name: "Emirates Taxi",
    year: "2000",
    logo: LOGOS.egmg,
    desc: "ISO 9001:2015 certified premium chauffeur service with RTA-approved vehicles. Quality-monitored operations with performance-graded drivers delivering consistently exceptional service.",
    href: "/emirates-taxi",
  },
  {
    name: "Truckline",
    year: "2021",
    logo: LOGOS.truckline,
    desc: "Specialized commercial fleet leasing — cars, trucks, vans, and chiller units for business operations across all Emirates. 24/7 support, free maintenance, and no down payment.",
    href: "/truckline",
  },
  {
    name: "Eurogulf Used Car Trading",
    year: "1994",
    logo: LOGOS.usedcars,
    desc: "Reliable, high-quality pre-owned vehicles from EGMG's managed fleet. A-Grade workshop inspected, full service history, and competitive pricing with over 1,000 satisfied customers.",
    href: "/used-cars",
  },
];

export default function BusinessesPage() {
  const [gridRef, gridVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Our Businesses — Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="businesses-page">
      {/* HERO */}
      <section data-testid="businesses-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Six Divisions. One Vision.</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Our Businesses
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From car rental to premium chauffeur services, commercial fleet leasing to certified pre-owned vehicles — Eurogulf Mobility Group covers every dimension of mobility in the UAE.
          </p>
        </div>
      </section>

      {/* DIVISION CARDS */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {divisions.map((d, i) => (
              <Link
                key={d.name}
                to={d.href}
                data-testid={`business-card-${i}`}
                className={`block bg-[#111111] border border-white/5 hover:border-[#EE5A01]/30 transition-all group ${gridVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
                  {/* Logo */}
                  <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-center bg-white/5 p-4 min-h-[80px]">
                    <img
                      src={d.logoAlt || d.logo}
                      alt={d.name}
                      className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                      <h2 className="font-heading font-black text-xl text-[#EEEDE7] uppercase tracking-tight">{d.name}</h2>
                      <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider">EST. {d.year}</span>
                    </div>
                    <p className="font-body text-sm text-[#666666] leading-relaxed max-w-2xl">{d.desc}</p>
                  </div>
                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#EE5A01]/10 flex items-center justify-center group-hover:bg-[#EE5A01] transition-colors">
                      <ArrowRight className="w-5 h-5 text-[#EE5A01] group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Need a Mobility Solution?
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Whether it is a single rental car or an entire commercial fleet, Eurogulf Mobility Group has the right division for you.
          </p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
