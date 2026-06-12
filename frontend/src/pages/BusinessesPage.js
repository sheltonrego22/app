import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const EUROPCAR_LOGO = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/xfzdgz6a_Logo2.png";

const divisions = [
  {
    name: "Europcar",
    subtitle: "Premium Car Rental and Long Term Leasing Services",
    logo: EUROPCAR_LOGO,
    desc: "Europcar serves Dubai and the Northern Emirates through premium self-drive rental, monthly rental solutions, and long-term leasing support. The approved operating framework supports daily, weekly, and monthly rental enquiries, while leasing and more complex fleet needs are routed to specialist follow-up.",
    href: "/europcar",
  },
  {
    name: "Goldcar",
    subtitle: "Budget Short Term Rentals",
    logo: EGMG_LOGO,
    desc: "A value-oriented self-drive offering positioned within the wider EGMG mobility portfolio.",
    href: "/goldcar",
  },
  {
    name: "Truckline Transport",
    subtitle: "Commercial Vehicle Leasing and Fleet Management Solutions",
    logo: EGMG_LOGO,
    desc: "Truckline supports commercial vehicle leasing, specialist fleet discussions, and wider operational mobility requirements for business customers. Public-facing copy remains solution-led and capability-focused.",
    href: "/truckline",
  },
  {
    name: "Eurogulf Premium Chauffeur",
    subtitle: "Managed Transport and Driven Services",
    logo: EGMG_LOGO,
    desc: "Premium chauffeur-driven and managed transport services for airport transfers, VIP transport, staff movement, event mobility, and other business or hospitality transport requirements. Managed transport services are routed through specialist follow-up.",
    href: "/chauffeur-service",
  },
  {
    name: "Eurogulf Auto Garage",
    subtitle: "Workshop & Maintenance",
    logo: EGMG_LOGO,
    desc: "Vehicle servicing, repair, workshop support, and maintenance capability within the wider mobility group.",
    href: "/autocare",
  },
  {
    name: "Eurogulf Used Cars",
    subtitle: "Pre-Owned Vehicles",
    logo: EGMG_LOGO,
    desc: "Approved used vehicle sales delivered within the wider Eurogulf ecosystem.",
    href: "/used-cars",
  },
];

export default function BusinessesPage() {
  const [gridRef, gridVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Our Brands — Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="businesses-page">
      {/* HERO */}
      <section data-testid="businesses-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Specialist Brands for Every Mobility Need
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The group's portfolio is structured so customers can access the right solution through the right specialist brand, while still benefiting from a connected operating platform and shared service standards.
          </p>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="bg-[#0a0a0a] py-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-body text-[#999] leading-relaxed">
            EGMG's brand portfolio reflects the breadth of mobility and automotive support it offers across the UAE. Each brand plays a distinct role within the group, helping customers and partners access the right service, vehicle, or mobility model for their needs.
          </p>
        </div>
      </section>

      {/* BRAND CARDS */}
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
                  <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-center bg-white/5 p-4 min-h-[80px]">
                    <img src={d.logo} alt={d.name} className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="font-heading font-black text-xl text-[#EEEDE7] uppercase tracking-tight mb-1">{d.name}</h2>
                    <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">{d.subtitle}</span>
                    <p className="font-body text-sm text-[#666666] leading-relaxed mt-2 max-w-2xl">{d.desc}</p>
                  </div>
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
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Need a Mobility Solution?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Whether it is a single rental car or a corporate fleet discussion, Eurogulf Mobility Group has the right brand for you.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
