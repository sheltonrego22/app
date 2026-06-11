import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Radio, MapPin, Gauge, Zap, Eye, BarChart3, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const techAreas = [
  { icon: Radio, title: "GPS Fleet Tracking & Telematics", desc: "Real-time GPS monitoring across our 10,000+ vehicle fleet. Live location, speed alerts, geofencing, and route optimisation — giving fleet managers full visibility and control." },
  { icon: Gauge, title: "Predictive Maintenance", desc: "Sensor-driven diagnostics that predict component failures before they happen. Reduced downtime, fewer breakdowns, and extended vehicle lifecycle across five Eurogulf Mobility workshops." },
  { icon: MapPin, title: "Smart Allocation & Dispatching", desc: "AI-powered vehicle assignment that matches driver availability, vehicle type, and proximity to deliver the fastest possible response — critical for our chauffeur and taxi operations." },
  { icon: Eye, title: "Driver Behaviour Analytics", desc: "Telematics-driven scoring for acceleration, braking, speed, and idle time. Coaching insights that improve safety, reduce fuel costs, and elevate service quality." },
  { icon: Zap, title: "Electric & Hybrid Fleet Integration", desc: "Charge-cycle management, range optimisation, and energy-cost analytics for our growing EV fleet — supporting the UAE's Net Zero 2050 strategy." },
  { icon: BarChart3, title: "Fleet Operations Software", desc: "Web-based fleet management platform for vehicle lifecycle tracking, maintenance scheduling, insurance management, and consolidated reporting — used across all Eurogulf Mobility divisions." },
];

const futureVision = [
  { title: "Autonomous Fleet Readiness", desc: "Monitoring UAE regulatory frameworks for autonomous vehicles and preparing our fleet infrastructure for ADAS and Level 4 autonomy integration." },
  { title: "Smart Parking & Payment", desc: "Cashless, RFID-enabled vehicle access, parking management, and digital toll integration across our managed fleet." },
  { title: "Connected Mobility Ecosystem", desc: "A unified digital platform connecting rental bookings, chauffeur dispatch, fleet management, and maintenance scheduling into a single customer experience." },
  { title: "AI-Powered Customer Service", desc: "Natural language booking, real-time ride tracking, and predictive customer support — reducing friction at every touchpoint." },
];

export default function MobilityTechPage() {
  const [techRef, techVisible] = useScrollAnimation();
  const [futureRef, futureVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Mobility Technology & Innovation — Eurogulf Mobility"; }, []);

  return (
    <div data-testid="mobility-tech-page">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0a0a0a_0%,#111_40%,#000_100%)]" />
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#EE5A01]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Innovation & Technology</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Technology That Moves
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            How Eurogulf Mobility is investing in smart fleet technology, AI-driven operations, and connected mobility to deliver the future of transport in the UAE.
          </p>
        </div>
      </section>

      {/* TECH AREAS */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={techRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${techVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Technology Stack</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">The platforms, systems, and intelligence powering our 10,000+ vehicle operation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techAreas.map((t, i) => (
              <div key={t.title} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${techVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <t.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{t.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section className="bg-[#f5f2ec] py-20 sm:py-28">
        <div ref={futureRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${futureVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-3">The Road Ahead</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">Where we are investing to prepare for the future of UAE mobility.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {futureVision.map((f, i) => (
              <div key={f.title} className={`bg-white border border-black/5 p-6 ${futureVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <h3 className="font-heading font-bold text-base text-black mb-2">{f.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Partner with Us on Innovation</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Interested in fleet technology, smart mobility, or sustainability partnerships? Let's talk.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Contact Our Team</Link>
        </div>
      </section>
    </div>
  );
}
