import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, Crown, Bus, Truck, Tag, ArrowRight, Shield, Clock, Headphones, MapPin, Instagram } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/a56c4b9d-53c0-46d6-8ecc-d67faee11d28/images/f4a76c0c341f3929b9bd7c03799a166ba64f50dcd4a0197c233ed71d963409f6.png";

const stats = [
  { value: 12000, suffix: "+", label: "Vehicles in Fleet" },
  { value: 1200, suffix: "+", label: "Professionals" },
  { value: 14, suffix: "", label: "UAE Locations" },
  { value: 1976, suffix: "", label: "Established" },
];

const services = [
  { icon: Car, title: "Europcar", subtitle: "Daily / Weekly / Monthly", desc: "Premium car rental and vehicle leasing across 143 countries. No. 1 in Europe, No. 3 worldwide — with 14 UAE locations and ISO-certified service.", link: "/europcar" },
  { icon: Tag, title: "Goldcar", subtitle: "Value Car Rental", desc: "Smart, fair, and value-for-money travel. Over three decades of low-cost segment leadership delivering competitive prices and 5-star fleet quality.", link: "/goldcar" },
  { icon: Crown, title: "Royal Limousine", subtitle: "Premium Chauffeur Service", desc: "ISO 9001:2015 certified chauffeur service for personal and corporate customers. GPS-tracked operations with accredited, performance-graded drivers.", link: "/royal-limousine" },
  { icon: Car, title: "Emirates Taxi", subtitle: "Professional Taxi Services", desc: "RTA-approved premium vehicles with well-trained chauffeurs. Award-winning service with quality-monitored operations and graded driver performance.", link: "/emirates-taxi" },
  { icon: Truck, title: "Truckline", subtitle: "Commercial Fleet Leasing", desc: "Specialized fleet leasing for businesses — cars, trucks, vans, and chiller units across all Emirates with 24/7 support and service.", link: "/truckline" },
  { icon: Building2, title: "Eurogulf Used Car Trading", subtitle: "Certified Pre-Owned", desc: "Reliable, high-quality pre-owned vehicles from EGMG's managed fleet. A-Grade workshop inspected with full service history.", link: "/used-cars" },
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
  { icon: Shield, title: "Commitment to Quality", desc: "Delivering exceptional and comprehensive mobility solutions backed by ISO 9001:2015 and ISO 45001:2018 certifications." },
  { icon: Clock, title: "Transparency & Reliability", desc: "Ensuring prompt replacements with reserved vehicles and drivers. Clear, honest service with no hidden costs." },
  { icon: Headphones, title: "24/7 Seamless Support", desc: "Round-the-clock recovery services across the UAE for hassle-free travel. Call us toll-free at 800 364." },
  { icon: MapPin, title: "14 Locations Across UAE", desc: "Airports, malls, and business districts from Dubai to Ras Al Khaimah and Fujairah — wherever you need us." },
];

const awards = [
  "WORLD TRAVEL AWARDS — BEST CAR RENTAL COMPANY MENA (2005-2024)",
  "ISO 9001:2015 CERTIFIED — QUALITY MANAGEMENT",
  "ISO 45001:2018 — OCCUPATIONAL HEALTH & SAFETY",
  "MENA TRAVEL AWARDS — PLATINUM AWARD 2012",
  "MCDERMOTT AWARD — SAFEST TRANSPORTATION PROVIDER",
  "EMIRATES GROUP AWARD — FLIGHT CREW SUPPORT RECOGNITION",
  "BUSINESS TRAVEL AWARDS — BEST CAR RENTAL MIDDLE EAST",
];

const DIVISION_LOGOS = {
  europcar: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/all-logos-old-and-new-3-1-06-1-e1745044285916.png.webp",
  goldcar: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/all-logos-old-and-new-3-1-08-1-e1745044394867.png.webp",
  royallimo: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/EGMG-logo-839-by-263-pixels-2-01-scaled-1.jpg.webp",
  emiratestaxi: "https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file.webp",
  truckline: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/EGMG-logo-839-by-263-pixels-2-13-scaled-1.jpg.webp",
  usedcars: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/EGMG-logo-839-by-263-pixels-2-03-scaled-1.jpg.webp",
};

const PARTNER_LOGOS = [
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-32.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-33.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-23.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-24.png.webp",
  "https://egmg.ae/wp-content/uploads/2025/06/Emirates-Logo.png-768x403-1.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-25.png.webp",
  "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-34.png.webp",
];

const divisions = [
  { name: "Europcar Dubai", desc: "International car rental leader", href: "/europcar", logo: DIVISION_LOGOS.europcar },
  { name: "Goldcar UAE", desc: "Value car rental brand", href: "/goldcar", logo: DIVISION_LOGOS.goldcar },
  { name: "Royal Limousine", desc: "Premium chauffeur services", href: "/royal-limousine", logo: DIVISION_LOGOS.royallimo },
  { name: "Emirates Taxi", desc: "Professional taxi services", href: "/emirates-taxi", logo: DIVISION_LOGOS.emiratestaxi },
  { name: "Truckline", desc: "Commercial vehicle solutions", href: "/truckline", logo: DIVISION_LOGOS.truckline },
  { name: "Eurogulf Used Car", desc: "Certified pre-owned vehicles", href: "/used-cars", logo: DIVISION_LOGOS.usedcars },
];

const whyChooseUs = [
  { title: "Commitment to Quality", desc: "We provide exceptional and comprehensive mobility solutions. Our dedication to quality means every vehicle is maintained to the highest standards and every driver is trained and accredited." },
  { title: "Transparency & Reliability", desc: "We ensure prompt replacements with reserved vehicles and drivers. Our clients trust us because we deliver on our promises — no hidden costs, no surprises." },
  { title: "24/7 Seamless Support", desc: "Our round-the-clock recovery services across the UAE ensure hassle-free travel for every client. Call us toll-free at 800 364, anytime, anywhere." },
];

const socialImages = [
  { img: "https://images.pexels.com/photos/10358879/pexels-photo-10358879.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", caption: "Our fleet against the iconic Dubai skyline" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-4.png.webp", caption: "Europcar fleet ready for the road" },
  { img: "https://images.unsplash.com/photo-1747176367536-c9cf668a5390?w=600&h=600&fit=crop", caption: "Luxury vehicles in the heart of Dubai" },
  { img: "https://images.pexels.com/photos/10358871/pexels-photo-10358871.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", caption: "Premium sedans with Dubai backdrop" },
  { img: "https://images.pexels.com/photos/10619938/pexels-photo-10619938.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", caption: "Dubai — Where we operate" },
  { img: "https://images.pexels.com/photos/33349003/pexels-photo-33349003.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", caption: "Sheikh Zayed Road — Our daily commute" },
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
            YOUR VISION, OUR JOURNEY — SINCE 1976
          </p>
          <h1 className="font-heading font-black text-4xl sm:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-[#EEEDE7] mb-2 animate-fade-in-up">
            WE MOVE YOU
          </h1>
          <h1 className="font-heading font-black text-4xl sm:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-[#EE5A01] mb-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            FORWARD.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            From premium chauffeur services to corporate fleet management, EGMG has been defining mobility across the UAE since 1976. One group. 12,000+ vehicles. Every journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <Link to="/services" data-testid="hero-explore-btn" className="btn-primary text-center">
              Explore Our Services
            </Link>
            <Link to="/book-chauffeur" data-testid="hero-book-btn" className="btn-ghost text-center">
              Book a Ride
            </Link>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {divisions.map((d, i) => (
              <Link
                key={d.name}
                to={d.href}
                data-testid={`division-card-${i}`}
                className={`bg-[#111111] border border-white/5 p-6 text-center group hover:border-[#EE5A01] transition-all duration-300 ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
                <div className="w-full h-12 flex items-center justify-center mx-auto mb-4">
                  <img src={d.logo} alt={d.name} className="h-10 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" loading="lazy" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{d.name}</h3>
                <p className="font-body text-xs text-[#666666]">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE EGMG ═══ */}
      <section data-testid="why-choose-section" className="bg-black py-20 sm:py-28">
        <div ref={testimonialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${testimonialsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              Why Choose EGMG
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                data-testid={`why-choose-${i}`}
                className={`bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all ${testimonialsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <div className="w-10 h-10 bg-[#EE5A01]/10 flex items-center justify-center mb-5">
                  <span className="font-heading font-black text-lg text-[#EE5A01]">0{i + 1}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL & VIDEO ═══ */}
      <section data-testid="social-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase">Follow Our Journey</p>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#EEEDE7]">
              @eurogulfmobility
            </h2>
          </div>

          {/* YouTube Shorts from EGMG */}
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="relative w-full overflow-hidden border border-white/5 rounded-sm" style={{ paddingBottom: '177%' }}>
              <iframe
                data-testid="youtube-embed-1"
                src="https://www.youtube.com/embed/Q2kHRGYeUcQ?rel=0&modestbranding=1"
                title="Moving Forward with EuroGulf Mobility Group"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="relative w-full overflow-hidden border border-white/5 rounded-sm" style={{ paddingBottom: '177%' }}>
              <iframe
                data-testid="youtube-embed-2"
                src="https://www.youtube.com/embed/KiCi2eo3PuE?rel=0&modestbranding=1"
                title="It's not just a fleet — It's the scale and innovation of EGMG"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Social Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {socialImages.map((item, i) => (
              <a
                key={i}
                href="https://www.instagram.com/eurogulfmobility/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`social-post-${i}`}
                className="relative aspect-square overflow-hidden group"
              >
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-start p-3">
                  <p className="font-body text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{item.caption}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="https://www.instagram.com/eurogulfmobility/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              <Instagram className="w-4 h-4" /> INSTAGRAM
            </a>
            <a href="https://www.youtube.com/@EurogulfMobilityGroup-x1n" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              YOUTUBE
            </a>
            <a href="https://www.linkedin.com/company/105403528/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              LINKEDIN
            </a>
            <a href="https://www.facebook.com/people/Eurogulf-Mobility-Group/61567335605176/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              FACEBOOK
            </a>
          </div>
        </div>
      </section>

      {/* ═══ TRUSTED BY / PARTNER LOGOS ═══ */}
      <section data-testid="partner-logos-section" className="bg-black py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs tracking-[0.2em] text-[#666666] text-center mb-10 uppercase">Trusted by Leading Organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {PARTNER_LOGOS.map((logo, i) => (
              <img key={i} src={logo} alt="Partner" data-testid={`partner-logo-${i}`} className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" loading="lazy" />
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
            <Link to="/book-chauffeur" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Book Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
