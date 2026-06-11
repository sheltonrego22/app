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
    name: "Europcar Dubai",
    year: "1978",
    logo: LOGOS.europcar,
    desc: "Premium car rental and leasing, powered by Europe's #1 rental brand. Present in 143 countries with 6,000+ locations. 5,000+ vehicles, 14 UAE locations, fleet age avg. 1.5 years.",
    href: "/europcar",
  },
  {
    name: "Goldcar Dubai",
    year: "2019",
    logo: LOGOS.goldcar,
    desc: "Smart, affordable car hire — best price, no compromise. Europe's largest low-cost car rental brand with 35+ years of experience, now available across all Europcar Dubai outlets and Sharjah Airport.",
    href: "/goldcar",
  },
  {
    name: "Eurogulf Chauffeur",
    year: "1990",
    logo: LOGOS.egmg,
    desc: "Professional managed transportation across all 7 Emirates. 800+ RTA-approved drivers, premium sedan and SUV fleet, luxury coaches, airport transfers, corporate events, and staff transport solutions.",
    href: "/chauffeur-service",
  },
  {
    name: "Truckline Transport",
    year: "2021",
    logo: LOGOS.truckline,
    desc: "Commercial vehicle leasing built for UAE businesses. Toyota Hiace, Nissan Urvan, 3-ton and 4.2-ton trucks, freezer and chiller units. Dedicated account manager, in-house maintenance, 24/7 recovery.",
    href: "/truckline",
  },
  {
    name: "Eurogulf Used Cars",
    year: "1994",
    logo: LOGOS.usedcars,
    desc: "Certified pre-owned vehicles, backed by 50 years of fleet expertise. Professionally maintained by EGMG's 3 A-grade workshops, complete service history, transparent pricing.",
    href: "/used-cars",
  },
  {
    name: "Eurogulf Autocare",
    year: "1994",
    logo: LOGOS.egmg,
    desc: "A-grade service and maintenance for every vehicle in your fleet. Three fully equipped service centres, ISO-certified technicians, insurance panel approved. The backbone of EGMG's 10,000-vehicle fleet.",
    href: "/autocare",
  },
];

export default function BusinessesPage() {
  const [gridRef, gridVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Our Businesses — Eurogulf Mobility"; }, []);

  return (
    <div data-testid="businesses-page">
      {/* HERO */}
      <section data-testid="businesses-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Six Brands. One Group.</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Our Brands
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            EGMG holds the portfolio. The brands deliver the service. Six distinct mobility brands, each serving a specific customer need — from premium car rental to luxury chauffeur, commercial fleets to certified pre-owned vehicles.
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
