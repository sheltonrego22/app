import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Truck, Wrench, Clock, Users, BarChart3, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const stats = [
  { value: "1,500+", label: "Vehicles Managed" },
  { value: "24/7", label: "Operational Support" },
  { value: "98.5%", label: "Fleet Uptime" },
  { value: "Since 2006", label: "Partnership Duration" },
];

const services = [
  { icon: Truck, title: "Vehicle Leasing", desc: "Full operational lease of 1,500+ vehicles — sedans, SUVs, pickup trucks, and utility vehicles — registered, insured, and maintained by Eurogulf Mobility Group." },
  { icon: BarChart3, title: "Fleet Management System", desc: "Web-based fleet operations software with real-time GPS tracking, live allocation, utilisation reporting, and predictive maintenance scheduling." },
  { icon: Wrench, title: "Maintenance & Support", desc: "Comprehensive servicing through five Eurogulf Mobility Group-owned workshops. SLA-backed turnaround with dedicated mechanics assigned to the municipality account." },
  { icon: Shield, title: "RFID & Car Sharing System", desc: "RFID-enabled access control, vehicle pooling and sharing system, and sterilisation protocols — all managed through a centralised platform." },
  { icon: Clock, title: "Replacement & Roadside", desc: "Guaranteed replacement vehicles within 90 minutes. 24/7 roadside assistance, recovery, and accident management with a single point of contact." },
  { icon: Users, title: "Dedicated Operations Team", desc: "On-site Eurogulf Mobility Group team embedded within Dubai Municipality operations — fleet coordinators, workshop liaisons, and a senior account manager." },
];

export default function DubaiMunicipalityPage() {
  const [servRef, servVisible] = useScrollAnimation();
  const [impactRef, impactVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Dubai Municipality Partnership — Eurogulf Mobility"; }, []);

  return (
    <div data-testid="dubai-municipality-page">
      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Flagship Corporate Partnership</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Dubai Municipality
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Full fleet management for one of the UAE's most important government entities. Over 1,500 vehicles leased, maintained, tracked, and managed by Eurogulf Mobility Group — supporting the operations that keep Dubai running.
          </p>
          <Link to="/contact" className="btn-primary animate-fade-in inline-block" style={{ animationDelay: '0.4s' }}>Explore Corporate Fleet Solutions</Link>
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

      {/* SERVICES PROVIDED */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={servRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">What We Deliver</h2>
            <p className="font-body text-[#666] max-w-xl mx-auto">A fully managed fleet ecosystem — from vehicle acquisition to disposal — operating at government-grade reliability standards.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${servVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <s.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[#f5f2ec] py-20 sm:py-28">
        <div ref={impactRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${impactVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-3">Why This Partnership Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Operational Continuity", desc: "Dubai Municipality's field teams depend on reliable transport every day. Our 98.5% uptime guarantee ensures they're never off the road." },
              { title: "Cost Efficiency", desc: "By transitioning from ownership to operational leasing, the municipality reduced fleet TCO by an estimated 20% — freeing capital for core civic projects." },
              { title: "Environmental Compliance", desc: "Our fleet meets the latest UAE emissions standards and includes hybrid and electric vehicles aligned with Dubai's Clean Energy Strategy 2050." },
              { title: "Scalability", desc: "The partnership has grown from an initial fleet of 200 vehicles to over 1,500 — demonstrating the model's scalability and Eurogulf Mobility Group's delivery capability." },
            ].map((item, i) => (
              <div key={item.title} className={`bg-white border border-black/5 p-6 flex gap-4 ${impactVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <Check className="w-6 h-6 text-[#EE5A01] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold text-base text-black mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-[#666] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Need a Fleet Partner at This Scale?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">If you manage a fleet of 50 or 5,000 vehicles, Eurogulf Mobility Group has the infrastructure, technology, and experience to deliver.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Talk to Our Fleet Specialists</Link>
        </div>
      </section>
    </div>
  );
}
