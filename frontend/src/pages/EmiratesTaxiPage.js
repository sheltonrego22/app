import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Car, Users, Clock, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1602430937171-f5c4c13af14b?w=1400&h=700&fit=crop";
const LOGO_URL = "/egmg-logo-transparent.png";

const certifications = [
  { icon: Shield, title: "ISO 9001:2015 Certified", desc: "Our operations are certified under the ISO 9001:2015 standard, ensuring world-class quality management across every service touchpoint." },
  { icon: Award, title: "Award-Winning Service", desc: "Recognized with numerous awards for exceptional service in the UAE's competitive transportation industry." },
  { icon: Car, title: "RTA-Approved Fleet", desc: "Every vehicle in our fleet is an RTA-approved premium car, meeting the highest safety and comfort standards set by Dubai's Roads and Transport Authority." },
  { icon: Users, title: "Performance-Graded Drivers", desc: "Our quality department closely monitors operations and drivers, assessing performance through a rigorous grading system that ensures consistency." },
];

const features = [
  "Professional, highly experienced chauffeur team",
  "Well-trained and accredited drivers",
  "Fleet of new, well-maintained premium vehicles",
  "Safe, punctual, and memorable personal trips",
  "Reliable corporate transportation solutions",
  "24/7 availability across Dubai and the UAE",
];

export default function EmiratesTaxiPage() {
  const [certsRef, certsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Emirates Taxi — Premium Chauffeur Service | Eurogulf Mobility"; }, []);

  return (
    <div data-testid="emirates-taxi-page">
      {/* HERO */}
      <section data-testid="emirates-taxi-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Emirates Taxi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Emirates Taxi by EGMG" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Reliable. Safe. Comfortable.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Emirates Taxi offers premium chauffeur service for personal and corporate customers. With a professional and highly experienced team, well-trained and accredited chauffeurs, and a fleet of new, well-maintained cars, every trip is safe, punctual, and memorable.
          </p>
          <Link to="/book-chauffeur" data-testid="emirates-taxi-enquire-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Book a Ride
          </Link>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section data-testid="emirates-taxi-certs" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={certsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${certsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Certified Excellence
            </h2>
            <p className="font-body text-[#666666] max-w-lg mx-auto">
              Our commitment to quality is not just a promise — it is independently certified and award-winning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((c, idx) => (
              <div key={c.title} className={`bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all group ${certsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${idx + 1}`}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EE5A01]/20 transition-colors">
                    <c.icon className="w-7 h-7 text-[#EE5A01]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{c.title}</h3>
                    <p className="font-body text-sm text-[#666666] leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Personal & Corporate</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Transportation Solutions for All Your Needs
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                Whether you need a reliable daily commute, a premium corporate transfer, or a punctual airport pickup, Emirates Taxi delivers. Our quality department ensures that every driver and every vehicle meets the exacting standards our clients have come to trust.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary inline-block">
                Request a Booking
              </Link>
            </div>
            <div className="relative overflow-hidden bg-[#111111] border border-white/5 p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Clock className="w-16 h-16 text-[#EE5A01] mx-auto mb-6" strokeWidth={1} />
                <p className="font-heading font-black text-5xl text-[#EE5A01] mb-2">24/7</p>
                <p className="font-heading font-bold text-lg text-[#EEEDE7] uppercase tracking-wider">Availability</p>
                <p className="font-body text-sm text-[#666666] mt-3">Across Dubai and the UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Every Trip. Safe & Punctual.
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Experience the Emirates Taxi difference — ISO-certified quality, RTA-approved vehicles, and award-winning service.
          </p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
