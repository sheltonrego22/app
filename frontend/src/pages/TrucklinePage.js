import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Settings, Wrench, Shield, Package, Snowflake, HardHat, UtensilsCrossed, Building, Fuel, Landmark, Check, Phone, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1698348186158-253ce97914f9?w=1400&h=700&fit=crop";
const PRODUCT_IMG = "https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file-3.webp";

const stats = [
  { value: "12,000+", label: "Vehicles under management" },
  { value: "5", label: "Eurogulf Mobility Group-owned workshops" },
  { value: "<90 min", label: "Mobile breakdown SLA" },
  { value: "ISO 9001", label: "& 14001 certified" },
];

const services = [
  {
    icon: Truck,
    title: "Commercial Vehicle Leasing",
    desc: "From light-commercial vans to refrigerated trucks and heavy-duty 7-tonne movers — full operational lease with all costs included.",
    features: ["Pickups, vans, refrigerated, flatbed, tippers", "Full operating lease (Reg, insurance, service)", "12 to 60-month tenures", "Up to 8% discount on multi-vehicle agreements"],
  },
  {
    icon: Settings,
    title: "Fleet Management",
    desc: "Hands-off fleet operations — telematics, maintenance scheduling, fuel cards, accident management and consolidated monthly invoicing.",
    features: ["Real-time GPS telematics dashboard", "Predictive maintenance scheduling", "WPS-compliant driver payroll", "Single monthly invoice across the fleet"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    desc: "Five Eurogulf Mobility Group-owned workshops across Dubai and the Northern Emirates with manufacturer-approved technicians. SLA-backed turnaround.",
    features: ["Full mechanical, electrical, body & paint", "Genuine OEM parts on every job", "48-hour SLA on scheduled servicing", "Mobile breakdown response in <90 min"],
  },
  {
    icon: Shield,
    title: "Risk Management",
    desc: "Industry-leading accident management programme — single point of contact from claim to recovery, with cost-per-incident reporting.",
    features: ["24/7 claims hotline", "In-house assessors at every workshop", "Driver behaviour scoring & coaching", "Compliance reporting (RTA · GSO · MoEW)"],
  },
];

const sectors = [
  { icon: Package, title: "Logistics & Distribution", desc: "Last-mile delivery vans, 3-tonne movers, refrigerated boxes" },
  { icon: HardHat, title: "Construction & MEP", desc: "Crew cabs, flatbeds, tippers, dewatering trucks" },
  { icon: UtensilsCrossed, title: "Food & Beverage", desc: "Insulated cargo vans, temperature-controlled trucks, branded delivery vans" },
  { icon: Building, title: "Hospitality & Retail", desc: "Concierge vans, supply runs, staff transport (15–30 seaters)" },
  { icon: Fuel, title: "Oil, Gas & Industrial", desc: "Heavy-duty pickups, 4x4 utility vehicles, plant trucks" },
  { icon: Landmark, title: "Government & Public Sector", desc: "Tendered fleet contracts with audit-grade reporting" },
];

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
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [sectorsRef, sectorsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Truckline Transport | Commercial Vehicle Leasing UAE | Vans, Trucks & Chiller Units | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="truckline-page">
      {/* HERO */}
      <section data-testid="truckline-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Truckline commercial fleet in Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Truckline · Powered by Eurogulf Mobility</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Commercial Vehicle Leasing Built for the UAE's Most Demanding Operations.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From last-mile delivery vans to temperature-controlled chiller trucks — Truckline Transport provides UAE businesses with the commercial fleet they need, without the burden of ownership. Every contract includes a dedicated account manager, in-house maintenance, and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="#enquire" className="btn-primary">Request a Fleet Quote</a>
            <a href="tel:+97145063030" className="btn-ghost">Call the Team</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-8 px-4">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#EE5A01]">{s.value}</div>
              <div className="font-heading text-xs tracking-[0.1em] text-[#EEEDE7] mt-2 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUR SERVICES */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Four Services. One Contract.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="flex items-center gap-3 mb-4">
                  <s.icon className="w-8 h-8 text-[#EE5A01]" strokeWidth={1.5} />
                  <h3 className="font-heading font-bold text-lg text-[#EEEDE7]">{s.title}</h3>
                </div>
                <p className="font-body text-sm text-[#666] mb-4 leading-relaxed">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                      <span className="font-body text-xs text-[#EEEDE7]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={sectorsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${sectorsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Sectors We Serve</h2>
            <p className="font-body text-[#666]">From last-mile to last quarter.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((s, i) => (
              <div key={s.title} className={`bg-[#111] border border-white/5 p-6 text-center hover:border-[#EE5A01]/30 transition-all ${sectorsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <s.icon className="w-7 h-7 text-[#EE5A01] mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{s.title}</h3>
                <p className="font-body text-xs text-[#666]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="bg-[#0a0a0a] py-14 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-mono text-xs tracking-[0.2em] text-[#666] text-center mb-8 uppercase">Trusted by Leading Businesses Across the UAE</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {clientLogos.map((logo, idx) => (
              <img key={logo} src={logo} alt={`Truckline client ${idx + 1}`} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY CTA */}
      <section id="enquire" className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Tell Us Your Fleet. We'll Quote in 48h.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Send us a brief — vehicle types, quantity, tenure and any operational constraints. Our commercial team will come back with a tailored operating-lease proposal within two business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:truckline@egmg.ae?subject=Fleet%20Quote%20Request" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors text-center flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Email Truckline
            </a>
            <Link to="/contact" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Send a Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
