import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, Crown, Bus, Truck, Tag, ArrowRight, Shield, Clock, Headphones, MapPin, Star, Quote, Instagram } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/a56c4b9d-53c0-46d6-8ecc-d67faee11d28/images/f4a76c0c341f3929b9bd7c03799a166ba64f50dcd4a0197c233ed71d963409f6.png";
const BOOKING_URL = "https://www.europcar.com/";

const stats = [
  { value: 9000, suffix: "+", label: "Vehicles in Fleet" },
  { value: 1200, suffix: "+", label: "Professionals" },
  { value: 14, suffix: "", label: "UAE Locations" },
  { value: 50, suffix: "", label: "Years of Excellence" },
];

const services = [
  { icon: Car, title: "Car Rental", subtitle: "Daily / Weekly / Monthly", desc: "Young, well-maintained fleet available across 14 UAE locations with 24/7 roadside assistance.", link: "/services#car-rental" },
  { icon: Building2, title: "Vehicle Leasing & Fleet Management", subtitle: "Corporate Solutions", desc: "Long-term fleet solutions for 500+ corporate clients with 5,000+ managed vehicles.", link: "/services#vehicle-leasing" },
  { icon: Crown, title: "Premium Chauffeur & VIP Limo", subtitle: "Personal & Corporate", desc: "ISO-certified premium chauffeur fleet with well-trained, accredited drivers.", link: "/services#chauffeur" },
  { icon: Bus, title: "Bus & Coach Transportation", subtitle: "Group & Events", desc: "Luxury coaches and executive vehicles for corporate groups, events, and intercity travel.", link: "/services#coaches" },
  { icon: Truck, title: "Truck Leasing & Logistics", subtitle: "Commercial Fleet", desc: "Vans, trucks, and chiller units for commercial and logistics operations across the UAE.", link: "/services#truck-leasing" },
  { icon: Tag, title: "Used Car Trading", subtitle: "Certified Pre-Owned", desc: "Quality certified pre-owned vehicles maintained to A-Grade workshop standards.", link: "/services#used-cars" },
];

const fleetVehicles = [
  { name: "BMW 7 Series", tag: "Executive Sedan", img: "https://images.unsplash.com/photo-1638980703460-8e542eb75007?w=600&h=400&fit=crop" },
  { name: "Audi A8", tag: "VIP Transfer", img: "https://images.unsplash.com/photo-1634052597957-bc7f1a191c3e?w=600&h=400&fit=crop" },
  { name: "Mercedes V-Class", tag: "Executive Van", img: "https://images.unsplash.com/photo-1608632937860-0072bd7a027a?w=600&h=400&fit=crop" },
  { name: "Tesla Model 3/Y", tag: "Electric Premium", img: "https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=600&h=400&fit=crop" },
  { name: "Volvo S90", tag: "Executive Sedan", img: "https://images.unsplash.com/photo-1658301839175-58d115aef1ef?w=600&h=400&fit=crop" },
  { name: "GMC Denali", tag: "Luxury SUV", img: "https://images.unsplash.com/photo-1767285610734-f0858d5248fe?w=600&h=400&fit=crop" },
  { name: "Luxury Coach", tag: "Coach", img: "https://images.unsplash.com/photo-1759882608768-168d4c3a91c2?w=600&h=400&fit=crop" },
];

const trustPillars = [
  { icon: Shield, title: "ISO 9001:2015 Certified Excellence", desc: "International quality management standards across all operations." },
  { icon: Clock, title: "50 Years of UAE Heritage", desc: "Serving the region since 1976 with unwavering commitment." },
  { icon: Headphones, title: "24/7 Customer & Roadside Support", desc: "Round-the-clock assistance wherever you are in the UAE." },
  { icon: MapPin, title: "Live GPS Fleet Tracking", desc: "Real-time fleet monitoring for safety and efficiency." },
];

const awards = [
  "EUROPCAR GLOBAL AWARD — BEST PERFORMANCE 2023 MEA REGION",
  "BEST BUSINESS PERFORMANCE 2018 MEA",
  "BEST CAR RENTAL COMPANY MIDDLE EAST",
  "ISO 9001:2015 CERTIFIED",
  "ISO 10002:2014 CERTIFIED",
];

const divisions = [
  { name: "Europcar Dubai", desc: "International car rental leader" },
  { name: "Goldcar UAE", desc: "Value car rental brand" },
  { name: "Eurogulf Chauffeur", desc: "Premium chauffeur services" },
  { name: "Royal Limousine", desc: "VIP limousine & coaches" },
  { name: "Emirates Taxi", desc: "Professional taxi services" },
  { name: "Truck Line", desc: "Commercial vehicle solutions" },
  { name: "Eurogulf Used Car", desc: "Certified pre-owned vehicles" },
  { name: "Eurogulf Service Center", desc: "A-Grade vehicle maintenance" },
];

const testimonials = [
  { quote: "EGMG has been our sole fleet partner for 8 years. Their reliability and professionalism are unmatched in the UAE market.", name: "Ahmed Al-Rashid", company: "Al Futtaim Group", rating: 5 },
  { quote: "From airport transfers to executive chauffeur services, EGMG delivers a consistently premium experience every single time.", name: "Sarah Chen", company: "HSBC Middle East", rating: 5 },
  { quote: "We lease over 200 vehicles through EGMG. Their fleet management and maintenance services have reduced our operational costs by 30%.", name: "Michael Torres", company: "DHL Express UAE", rating: 5 },
];

const instagramImages = [
  "https://images.unsplash.com/photo-1638980703460-8e542eb75007?w=400&h=400&fit=crop",
  "https://images.pexels.com/photos/1645603/pexels-photo-1645603.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1634052597957-bc7f1a191c3e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1735320863905-ed428b59a2eb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1773766487829-d1df4d487980?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1759882608768-168d4c3a91c2?w=400&h=400&fit=crop",
];

function StatItem({ value, suffix, label }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useCounter(value, 2000, isVisible);
  return (
    <div ref={ref} className="text-center px-4 py-6" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold text-[#EE5A01]">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-heading text-sm tracking-[0.15em] text-[#EEEDE7] mt-2 uppercase">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [fleetRef, fleetVisible] = useScrollAnimation();
  const [trustRef, trustVisible] = useScrollAnimation();
  const [divisionsRef, divisionsVisible] = useScrollAnimation();
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "EGMG — Eurogulf Mobility Group | WE MOVE YOU!"; }, []);

  return (
    <div data-testid="home-page">
      {/* ═══ HERO SECTION ═══ */}
      <section data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Diagonal accent line */}
        <div className="absolute top-0 right-[15%] w-[2px] h-[40%] bg-[#EE5A01]/30 rotate-[-20deg] origin-top hidden lg:block" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#EE5A01] mb-6 uppercase animate-fade-in">
            UAE'S MOST TRUSTED MOBILITY GROUP — SINCE 1976
          </p>
          <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-[#EEEDE7] mb-2 animate-fade-in-up">
            WE MOVE YOU
          </h1>
          <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-[#EE5A01] mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            FORWARD.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            From premium chauffeur services to fleet management for 500+ corporate clients, EGMG has been defining mobility across the UAE for 50 years. One group. Every journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <Link to="/services" data-testid="hero-explore-btn" className="btn-primary text-center">
              Explore Our Services
            </Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="hero-book-btn" className="btn-ghost text-center">
              Book a Ride
            </a>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-[1px] h-12 bg-[#EE5A01]/40" />
          <span className="font-mono text-[10px] text-[#666666] tracking-[0.2em]">SCROLL</span>
        </div>
      </section>

      {/* ═══ STATISTICS BAR ═══ */}
      <section data-testid="stats-section" className="bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ═══ */}
      <section data-testid="services-overview" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              One Group. Every Journey.
            </h2>
            <p className="font-body text-base text-[#666666] max-w-lg mx-auto">
              From Daily Rentals to Monthly Subscription, Corporate Truck & Van Leasing to Customised Commercial / Non-Commercial Fleet Solutions. EGMG has been moving the UAE for over 50 years
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <Link
                key={s.title}
                to={s.link}
                data-testid={`service-card-${i}`}
                className={`service-card bg-[#111111] border border-white/5 p-7 group ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <s.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-1">{s.title}</h3>
                <p className="font-mono text-xs text-[#EE5A01] tracking-wider mb-3">{s.subtitle}</p>
                <p className="font-body text-sm text-[#666666] leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-[#EE5A01] text-sm font-heading font-bold group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLEET CAROUSEL ═══ */}
      <section data-testid="fleet-section" className="bg-black py-20 sm:py-28">
        <div ref={fleetRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${fleetVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Our Fleet. Engineered for Every Need.
            </h2>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {fleetVehicles.map((v, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div data-testid={`fleet-card-${i}`} className="bg-[#111111] border border-white/5 overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#EE5A01] text-black font-mono text-[10px] tracking-wider px-3 py-1 uppercase">{v.tag}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-lg text-[#EEEDE7]">{v.name}</h3>
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

      {/* ═══ WHY EGMG / TRUST PILLARS ═══ */}
      <section data-testid="trust-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={trustRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`${trustVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
              <div className="orange-accent-line mb-6" />
              <blockquote className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#EE5A01] leading-snug mb-6">
                "As UAE's most trusted name in mobility, EGMG is committed to delivering unmatched service."
              </blockquote>
              <p className="font-body text-[#666666]">
                For 50 years, we have set the standard for quality, reliability, and innovation in the transportation industry.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustPillars.map((t, i) => (
                <div
                  key={t.title}
                  data-testid={`trust-pillar-${i}`}
                  className={`bg-[#111111] border border-white/5 p-6 ${trustVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
                >
                  <t.icon className="w-7 h-7 text-[#EE5A01] mb-3" strokeWidth={1.5} />
                  <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{t.title}</h3>
                  <p className="font-body text-xs text-[#666666] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AWARDS TICKER ═══ */}
      <section data-testid="awards-section" className="bg-black border-y border-white/5 py-5 overflow-hidden">
        <div className="marquee-track animate-marquee">
          {[...awards, ...awards].map((a, i) => (
            <span key={i} className="font-mono text-xs text-[#666666] tracking-[0.15em] uppercase flex-shrink-0 px-8">
              {a}
              <span className="ml-8 text-[#EE5A01]">&#9670;</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══ DIVISION SHOWCASE ═══ */}
      <section data-testid="divisions-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={divisionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              The EGMG Family of Brands
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {divisions.map((d, i) => (
              <Link
                key={d.name}
                to="/services"
                data-testid={`division-card-${i}`}
                className={`bg-[#111111] border border-white/5 p-6 text-center group hover:border-[#EE5A01] transition-all duration-300 ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
                <div className="w-14 h-14 bg-[#EE5A01]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#EE5A01]/20 transition-colors">
                  <span className="font-heading font-black text-lg text-[#EE5A01]">{d.name.charAt(0)}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{d.name}</h3>
                <p className="font-body text-xs text-[#666666]">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section data-testid="testimonials-section" className="bg-black py-20 sm:py-28">
        <div ref={testimonialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${testimonialsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-testid={`testimonial-${i}`}
                className={`bg-[#111111] border border-white/5 p-8 ${testimonialsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <Quote className="w-8 h-8 text-[#EE5A01] mb-4" />
                <p className="font-body text-[#EEEDE7]/80 text-sm leading-relaxed mb-6">{t.quote}</p>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#EE5A01] text-[#EE5A01]" />
                  ))}
                </div>
                <p className="font-heading font-bold text-sm text-[#EE5A01]">{t.name}</p>
                <p className="font-body text-xs text-[#666666]">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM FEED ═══ */}
      <section data-testid="instagram-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase">Follow Our Journey</p>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#EEEDE7]">
              @eurogulfmobilitygroup
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {instagramImages.map((img, i) => (
              <a
                key={i}
                href="https://www.instagram.com/eurogulfmobilitygroup/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`instagram-post-${i}`}
                className="relative aspect-square overflow-hidden group"
              >
                <img src={img} alt="EGMG Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-[#EE5A01]/0 group-hover:bg-[#EE5A01]/70 transition-all duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section data-testid="cta-banner" className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-black uppercase tracking-tight mb-4">
            Ready to Move?
          </h2>
          <p className="font-body text-black/70 text-base mb-8 max-w-lg mx-auto">
            Whether it's a single ride or a fleet of 500, EGMG has the solution. Let's get you moving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" data-testid="cta-contact-btn" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors text-center">
              Contact Us
            </Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Book Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
