import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Fuel, Building, Zap, Users, Leaf, Sun, Battery, Recycle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EV_IMG = "https://images.unsplash.com/photo-1590250509584-efadf48e7a3c?w=1200&h=600&fit=crop";
const SOLAR_IMG = "https://images.unsplash.com/photo-1775644125504-ab20f983e905?w=1200&h=600&fit=crop";

const pillars = [
  {
    icon: Fuel,
    title: "Fuel Efficiency",
    desc: "Our 3 A-Grade workshops maintain and optimize 12,000+ vehicles for fuel efficiency, reducing consumption and emissions across operations spanning all seven Emirates.",
    stat: "3",
    statLabel: "A-Grade workshop facilities",
  },
  {
    icon: Sun,
    title: "Eco-Friendly Operations",
    desc: "Our offices and workshops across 14 UAE locations are designed for energy efficiency, implementing waste reduction and recycling programmes aligned with the UAE's sustainability vision.",
    stat: "14",
    statLabel: "UAE locations optimized",
  },
  {
    icon: Zap,
    title: "Electric Vehicles (EVs)",
    desc: "Eurogulf Mobility Group is accelerating the shift to electric mobility with Tesla and hybrid vehicles in our chauffeur fleet, supporting Dubai's Clean Energy Strategy and the UAE Net Zero 2050 initiative.",
    stat: "EV",
    statLabel: "Fleet expansion underway",
  },
  {
    icon: Users,
    title: "Employee Welfare",
    desc: "ISO 45001:2018 certified occupational health and safety standards for our 1,200+ employees. F.A.I.R. values ensure a respectful, inclusive workplace across all divisions.",
    stat: "1,200+",
    statLabel: "Team members protected",
  },
];

const initiatives = [
  { icon: Leaf, title: "Low-Carbon Fleet", desc: "Integrating hybrid and electric vehicles into our chauffeur and corporate fleet divisions" },
  { icon: Battery, title: "EV Readiness", desc: "Preparing infrastructure at key UAE locations for electric vehicle charging and support" },
  { icon: Recycle, title: "Waste Reduction", desc: "Implementing recycling programmes and reducing single-use materials across all workshops" },
  { icon: Sun, title: "UAE Net Zero 2050", desc: "Aligning operations with the UAE's national strategy for carbon neutrality by 2050" },
];

export default function SustainabilityPage() {
  const [pillarsRef, pillarsVisible] = useScrollAnimation();
  const [initiativesRef, initiativesVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Sustainability — Eurogulf Mobility Group | Driving a Greener Future"; }, []);

  return (
    <div data-testid="sustainability-page">
      {/* ═══ HERO ═══ */}
      <section data-testid="sustainability-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={EV_IMG} alt="Electric Vehicle Charging" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-[#EE5A01] to-green-500" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <p className="font-mono text-xs tracking-[0.2em] text-green-400 mb-4 uppercase animate-fade-in">Environmental Responsibility</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-6 animate-fade-in-up">
            Driving a Greener Future
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            At Eurogulf Mobility Group, our journey toward sustainability is more than a goal — it's a commitment to shaping a cleaner, smarter, and more responsible future for mobility.
          </p>
        </div>
      </section>

      {/* ═══ INTRO TEXT ═══ */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="orange-accent-line mx-auto mb-8" />
          <p className="font-body text-lg text-[#EEEDE7]/80 leading-relaxed">
            We believe that transportation should not only move people but also protect the environment. That's why we are actively integrating eco-conscious practices across our operations — from low-carbon fleet initiatives and solar-powered facilities to the gradual introduction of electric vehicles into our offering.
          </p>
        </div>
      </section>

      {/* ═══ FOUR PILLARS ═══ */}
      <section data-testid="sustainability-pillars" className="bg-black py-20 sm:py-28">
        <div ref={pillarsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${pillarsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Our Four Pillars
            </h2>
            <p className="font-body text-[#666666] max-w-lg mx-auto">
              A comprehensive approach to sustainable mobility across every dimension of our operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                data-testid={`pillar-card-${i}`}
                className={`bg-[#111111] border border-white/5 p-8 hover:border-green-500/30 transition-all duration-300 group ${pillarsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <p.icon className="w-7 h-7 text-green-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">{p.title}</h3>
                    <p className="font-body text-sm text-[#666666] leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold text-[#EE5A01]">{p.stat}</span>
                      <span className="font-body text-xs text-[#666666]">{p.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMAGE BREAK ═══ */}
      <section className="relative h-[40vh] overflow-hidden">
        <img src={SOLAR_IMG} alt="Solar Powered Facilities" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <p className="font-heading font-black text-3xl sm:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              Sustainable by Design
            </p>
          </div>
        </div>
      </section>

      {/* ═══ KEY INITIATIVES ═══ */}
      <section data-testid="initiatives-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={initiativesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${initiativesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">
              Key Initiatives
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {initiatives.map((init, i) => (
              <div
                key={init.title}
                data-testid={`initiative-${i}`}
                className={`bg-[#111111] border border-white/5 p-6 text-center hover:border-green-500/20 transition-all ${initiativesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <init.icon className="w-8 h-8 text-green-400 mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{init.title}</h3>
                <p className="font-body text-xs text-[#666666] leading-relaxed">{init.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-green-900 to-[#0a0a0a] py-16 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
            Partner With Us for a Greener Future
          </h2>
          <p className="font-body text-[#EEEDE7]/60 mb-8 max-w-lg mx-auto">
            Join Eurogulf Mobility Group in building sustainable mobility solutions. Contact us to learn how we're making every journey more responsible.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
