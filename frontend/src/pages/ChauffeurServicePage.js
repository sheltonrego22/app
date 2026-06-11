import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, Shield, Check, Users, Car, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=1400&h=700&fit=crop";

const serviceTypes = [
  { icon: Plane, title: "Airport Transfer", desc: "DXB, DWC, AUH, SHJ — meet and greet included. Flight tracking for delayed arrivals.", tag: "From AED 250" },
  { icon: MapPin, title: "One-Way Trip", desc: "Point-to-point across the UAE. Fixed fare, no surge pricing, no hidden fees.", tag: "From AED 180" },
  { icon: Clock, title: "Half-Day (5h)", desc: "Driver at your disposal within Dubai. Ideal for meetings, site visits, or city tours.", tag: "From AED 650" },
  { icon: Car, title: "Full-Day (10h)", desc: "Cross-city availability with hourly breaks. Perfect for events or multi-stop itineraries.", tag: "From AED 1,200" },
];

const trustPoints = [
  { icon: Shield, title: "Fully Insured", desc: "Comprehensive coverage on every ride. Passengers and luggage fully covered." },
  { icon: Users, title: "Vetted Drivers", desc: "Trained, professional, multilingual chauffeurs licensed by UAE authorities." },
  { icon: Check, title: "Fixed Fares", desc: "No surge, no hidden fees. The price you see is the price you pay." },
];

const fleet = [
  { name: "Lexus ES 350", type: "Executive Sedan", pax: "Up to 3", img: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Audi A6 / BMW 5 Series", type: "Premium Sedan", pax: "Up to 4", img: "https://images.pexels.com/photos/37098542/pexels-photo-37098542.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Mercedes V-Class", type: "Executive Van", pax: "Up to 6", img: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "GMC Yukon / Suburban", type: "Premium SUV", pax: "Up to 6", img: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=500&h=300&fit=crop" },
];

const steps = [
  { num: "01", title: "Choose Your Service", desc: "Airport transfer, one-way trip, half-day, or full-day disposal." },
  { num: "02", title: "Select Vehicle & Time", desc: "Pick your preferred vehicle class and schedule your pickup." },
  { num: "03", title: "Confirm & Ride", desc: "Your professional chauffeur arrives on time. Track in real time." },
];

export default function ChauffeurServicePage() {
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [fleetRef, fleetVisible] = useScrollAnimation();
  const [stepsRef, stepsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Chauffeur Service Dubai — Eurogulf Mobility"; }, []);

  return (
    <div data-testid="chauffeur-service-page">
      {/* HERO */}
      <section data-testid="chauffeur-service-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Chauffeur service in Dubai" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Royal Limousine by Eurogulf Mobility</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Skip the Wheel. We'll Drive.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Chauffeur-driven airport transfers, half-day and full-day rides across the UAE. Fixed fares, no surge pricing, professional drivers in premium vehicles.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/book-chauffeur" className="btn-primary">Book Now</Link>
            <a href="tel:800364" className="btn-ghost">Call 800 364</a>
          </div>
        </div>
      </section>

      {/* TRUST POINTS */}
      <section className="bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex items-center gap-4 py-6 px-6 justify-center">
              <t.icon className="w-6 h-6 text-[#EE5A01] flex-shrink-0" />
              <div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{t.title}</h3>
                <p className="font-body text-xs text-[#666]">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">Our Chauffeur Services</h2>
            <p className="font-body text-[#666] max-w-lg mx-auto">From airport arrivals to full-day corporate disposals. Every ride is fixed-fare, fully insured, and driven by a licensed professional.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {serviceTypes.map((s, i) => (
              <div key={s.title} className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all group ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="flex items-start justify-between mb-4">
                  <s.icon className="w-8 h-8 text-[#EE5A01]" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-[#EE5A01] tracking-wider">{s.tag}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={stepsRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${stepsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className={`text-center ${stepsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="w-14 h-14 bg-[#EE5A01] flex items-center justify-center mx-auto mb-5">
                  <span className="font-heading font-black text-lg text-black">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Chauffeur Fleet</h2>
            <p className="font-body text-[#666]">Premium vehicles maintained to the highest standards. Your comfort is our priority.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fleet.map((v, i) => (
              <div key={v.name} className={`bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{v.name}</h3>
                  <p className="font-mono text-[10px] text-[#EE5A01] tracking-wider mt-0.5">{v.type} · {v.pax}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Ready to Ride?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Book your chauffeur in under 60 seconds. Fixed fares, no surge, professional drivers.</p>
          <Link to="/book-chauffeur" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Book Your Chauffeur</Link>
        </div>
      </section>
    </div>
  );
}
