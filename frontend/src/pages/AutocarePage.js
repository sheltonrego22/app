import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Clock, CheckCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const services = [
  { title: "Mechanical Repairs", desc: "Comprehensive engine, transmission, and drivetrain servicing for all vehicle makes and models." },
  { title: "Body Repairs", desc: "Including chassis alignment, panel beating, and professional paint finishing to factory standards." },
  { title: "Electrical Repairs", desc: "Full diagnostic and repair services for all vehicle electrical systems and components." },
  { title: "Exterior & Interior Detailing", desc: "Professional detailing services restoring your vehicle to showroom condition." },
  { title: "24/7 Recovery Service", desc: "Round-the-clock vehicle recovery and roadside assistance across the UAE." },
  { title: "Vehicle Sterilisation", desc: "Complete interior sterilisation service for fleet and individual vehicles." },
];

const insurancePartners = ["GIG", "QIC", "Oman Insurance", "Tokio Marine", "Noor Takaful"];

const features = [
  { icon: Shield, title: "A-Grade Insurance Panel", desc: "Approved on the panels of the UAE's most reputed insurance companies." },
  { icon: Wrench, title: "3 Service Centres", desc: "Three fully equipped A-grade workshops supporting EGMG's 10,000-vehicle fleet." },
  { icon: Clock, title: "ISO Certified", desc: "ISO 9001:2015 certified technicians and quality management systems." },
  { icon: CheckCircle, title: "30+ Years Experience", desc: "Over three decades as the backbone of EGMG's fleet maintenance operations." },
];

export default function AutocarePage() {
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Eurogulf Auto Garage | Vehicle Service, Repair & Workshop Support"; }, []);

  return (
    <div data-testid="autocare-page">
      {/* HERO */}
      <section data-testid="autocare-hero" className="relative min-h-[70vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">Eurogulf Auto Garage</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Eurogulf Auto Garage
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Automotive support and technical servicing capability positioned as part of the wider EGMG mobility ecosystem. Vehicle servicing, repair, workshop support, and maintenance capability within the wider mobility group.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact" className="btn-primary">Book a Service</Link>
            <a href="tel:800364" className="btn-ghost">Call 800 364</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">About Eurogulf Auto Garage</h2>
          <div className="space-y-4 font-body text-[#999] leading-relaxed">
            <p>
              Eurogulf Auto Garage has been the silent engine behind EGMG's operational excellence for over three decades. As the in-house workshop infrastructure supporting one of the UAE's largest vehicle fleets, our service centres are built and operated to standards that most retail garages simply cannot match.
            </p>
            <p>
              All three Eurogulf Auto Garage facilities hold A-grade status on the panels of the UAE's most reputed insurance companies — a recognition of our technical standards, safety practices, and quality of output. Now, these same world-class services are available to external clients and fleet operators seeking uncompromising maintenance quality.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-black py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                data-testid={`autocare-service-${i}`}
                className={`bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <Wrench className="w-7 h-7 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${featuresVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Why Eurogulf Auto Garage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                data-testid={`autocare-feature-${i}`}
                className={`bg-[#111] border border-white/5 p-6 text-center ${featuresVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <f.icon className="w-8 h-8 text-[#EE5A01] mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{f.title}</h3>
                <p className="font-body text-xs text-[#666] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE PARTNERS */}
      <section className="bg-black py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="font-heading font-bold text-lg text-[#EEEDE7] uppercase tracking-wider mb-6">Insurance Partners</h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {insurancePartners.map((p) => (
              <div key={p} className="bg-[#111] border border-white/5 px-6 py-3">
                <span className="font-heading font-bold text-sm text-[#EEEDE7]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER RECEPTION */}
      <section className="bg-[#f5f2ec] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-black uppercase tracking-tight mb-4">Customer Reception</h3>
          <p className="font-body text-[#666] mb-6">
            Our service centres feature comfortable customer reception areas with refreshments while you wait. Alternatively, we offer vehicle collection and delivery services for your convenience.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:800364" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#EE5A01] transition-colors font-body"><Phone className="w-4 h-4" /> 800 364</a>
            <a href="https://wa.me/97145063030" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#EE5A01] transition-colors font-body"><MessageSquare className="w-4 h-4" /> WhatsApp</a>
            <a href="mailto:autocare@eurogulf.ae" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#EE5A01] transition-colors font-body"><Mail className="w-4 h-4" /> Email</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Book Your Vehicle Service</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Whether you need routine maintenance or comprehensive repairs — Eurogulf Auto Garage delivers A-grade workshop quality.
          </p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
