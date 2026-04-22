import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Building2, Users, Car, Monitor, MapPin, Shield, Crown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HERO_IMG = "https://images.pexels.com/photos/12316002/pexels-photo-12316002.jpeg?auto=compress&cs=tinysrgb&w=1920";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/yxpq5nol_Logo1.png";
const PRODUCT_IMG = "https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file-4.webp";

const services = [
  { icon: Building2, label: "Corporate & Executive Transfers", desc: "Tailored transport solutions for boardroom executives, government officials, and high-profile corporate clients." },
  { icon: Users, label: "Dedicated Chauffeurs", desc: "Professionally trained, accredited drivers assigned exclusively to your schedule and preferences." },
  { icon: Plane, label: "Airport Transfers", desc: "Seamless meet-and-greet service across all UAE airports with real-time flight tracking." },
  { icon: Crown, label: "Dedicated Airport Co-ordinators", desc: "On-ground coordinators managing arrivals, departures, and VIP fast-track services." },
  { icon: Car, label: "VIP Parking Facilities", desc: "Secure, premium parking arrangements at key venues and airports across the UAE." },
  { icon: MapPin, label: "Intercity Services", desc: "Comfortable, chauffeured travel between Abu Dhabi, Dubai, and the Northern Emirates." },
];

const fleet = [
  { name: "BMW 7 Series", tag: "Executive Sedan", img: "https://images.unsplash.com/photo-1638980703460-8e542eb75007?w=500&h=300&fit=crop" },
  { name: "Audi A8", tag: "VIP Transfer", img: "https://images.unsplash.com/photo-1634052597957-bc7f1a191c3e?w=500&h=300&fit=crop" },
  { name: "Mercedes V-Class", tag: "Executive Van", img: "https://images.unsplash.com/photo-1608632937860-0072bd7a027a?w=500&h=300&fit=crop" },
  { name: "Tesla Model 3/Y", tag: "Electric Premium", img: "https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=500&h=300&fit=crop" },
  { name: "Volvo S90", tag: "Executive Sedan", img: "https://images.unsplash.com/photo-1658301839175-58d115aef1ef?w=500&h=300&fit=crop" },
];

export default function RoyalLimousinePage() {
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [fleetRef, fleetVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Royal Limousine — Premium Chauffeur Service | EGMG"; }, []);

  return (
    <div data-testid="royal-limousine-page">
      {/* HERO */}
      <section data-testid="royal-limousine-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Royal Limousine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Royal Limousine by EGMG" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Royal Treatment on the Move
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Eurogulf Royal Limousine offers premium chauffeur service for personal and corporate customers. With a professional, highly experienced team of well-trained and accredited chauffeurs, and a fleet of new, well-maintained vehicles, every trip is safe, punctual, and memorable.
          </p>
          <Link to="/book-chauffeur" data-testid="royal-limo-enquire-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Book a Chauffeur
          </Link>
        </div>
      </section>

      {/* ISO BADGE */}
      <section className="bg-[#111111] border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#EE5A01]" />
            <span className="font-heading font-bold text-sm text-[#EEEDE7] tracking-wider">ISO 9001:2015 CERTIFIED</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <span className="font-body text-sm text-[#666666] text-center">GPS-tracked, graded operations with quality-monitored drivers</span>
        </div>
      </section>

      {/* SERVICES */}
      <section data-testid="royal-limo-services" className="bg-black py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Our Services
            </h2>
            <p className="font-body text-[#666666] max-w-xl mx-auto">
              From airport transfers to dedicated chauffeur assignments, Royal Limousine covers every dimension of premium ground transportation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} data-testid={`royal-limo-service-${i}`} className={`bg-[#111111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all group ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 3) + 1}`}>
                <s.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.label}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section data-testid="royal-limo-fleet" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">
              Our Chauffeur Fleet
            </h2>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {fleet.map((v, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-[#111111] border border-white/5 overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#EE5A01] text-black font-mono text-[10px] tracking-wider px-3 py-1 uppercase">{v.tag}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading font-bold text-sm text-[#EEEDE7]">{v.name}</h4>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 bg-[#111111] border-[#EE5A01] text-[#EE5A01] hover:bg-[#EE5A01] hover:text-black" />
            <CarouselNext className="hidden sm:flex -right-4 bg-[#111111] border-[#EE5A01] text-[#EE5A01] hover:bg-[#EE5A01] hover:text-black" />
          </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Arrive in Command
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Whether it is a boardroom arrival or an airport departure, Royal Limousine ensures every moment reflects your stature.
          </p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Request a Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
