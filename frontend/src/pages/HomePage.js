import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, Crown, Truck, Tag, ArrowRight, Wrench, Users, Briefcase } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import { PartnerShowcase, AwardsSection, MunicipalitySection } from '@/components/home/TrustSections';
import { FeaturedSocials, VideosGallery } from '@/components/home/SocialSections';

const HERO_BG = "https://images.unsplash.com/photo-1459787915554-b34915863013?w=1600&h=900&fit=crop&q=80";
const EGMG_LOGO = "/egmg-logo-transparent.png";

const stats = [
  { value: 1976, suffix: "", label: "Founded", isYear: true },
  { value: 12000, suffix: "+", label: "Vehicles" },
  { value: 1200, suffix: "+", label: "Professionals" },
  { value: 14, suffix: "", label: "UAE Locations" },
  { value: 7, suffix: "", label: "Emirates Served" },
];

const brands = [
  { icon: Car, title: "Europcar", promise: "Premium self-drive rental, monthly mobility, and long-term leasing support across Dubai and the Northern Emirates.", link: "/europcar", cta: "Explore Europcar" },
  { icon: Tag, title: "Goldcar", promise: "Budget short-term rentals for customers seeking accessible and practical rental options within the wider group ecosystem.", link: "/goldcar", cta: "Explore Goldcar" },
  { icon: Truck, title: "Truckline Transport", promise: "Commercial vehicle leasing and fleet management solutions for operational, logistics, and workforce mobility needs.", link: "/truckline", cta: "Explore Truckline" },
  { icon: Crown, title: "Eurogulf Premium Chauffeur", promise: "Managed transport and driven services for airport transfer, VIP, staff movement, and event mobility.", link: "/chauffeur-service", cta: "Explore Chauffeur" },
  { icon: Wrench, title: "Eurogulf Auto Garage", promise: "Vehicle service, repair, maintenance, and workshop support within the wider transport ecosystem.", link: "/autocare", cta: "Learn More" },
  { icon: Building2, title: "Eurogulf Used Cars", promise: "Approved used vehicle sales backed by the wider group platform.", link: "/used-cars", cta: "Browse Vehicles" },
];

const servicesStrip = [
  "Car Rental", "Long-Term Leasing", "Chauffeur Services", "Coach & Bus Transport",
  "Commercial Fleet Leasing", "Used Car Trading", "Fleet Management", "Event Transportation", "International Car Hire"
];




function StatItem({ value, suffix, label, isYear }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useCounter(value, 2000, isVisible);
  const displayValue = isYear ? count.toString() : count.toLocaleString();
  return (
    <div ref={ref} className="text-center px-3 py-6" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EE5A01]">
        {displayValue}{suffix}
      </div>
      <div className="font-heading text-[10px] sm:text-xs tracking-[0.15em] text-[#EEEDE7] mt-2 uppercase">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [brandsRef, brandsVisible] = useScrollAnimation();
  const [introRef, introVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Eurogulf Mobility Group | Integrated Mobility Solutions UAE | Since 1976"; }, []);

  return (
    <div data-testid="home-page">
      {/* ═══ HERO SECTION ═══ */}
      <section data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility" className="h-14 sm:h-16 w-auto mx-auto mb-6 animate-fade-in" />
          <p className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-6 animate-fade-in">WE MOVE YOU! · Since 1976</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-8xl leading-[0.9] tracking-tight text-[#EEEDE7] mb-6 animate-fade-in-up">
            50 Years of Moving the UAE Forward.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            From a single Europcar franchise in 1976 to a multi-brand mobility powerhouse, Eurogulf Mobility Group connects people, businesses, and governments across all seven Emirates.
          </p>

          {/* ═══ DUAL-ACTION BOOKING WIDGET ═══ */}
          <div data-testid="hero-booking-widget" className="max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/book-chauffeur"
                data-testid="hero-b2c-btn"
                className="group bg-[#EE5A01] hover:bg-[#d45000] transition-all p-5 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-black" />
                  <span className="font-heading font-bold text-xs tracking-[0.1em] text-black uppercase">Private Journey</span>
                </div>
                <p className="font-body text-xs text-black/70 mb-3">Book a chauffeur, rent a car, or arrange an airport transfer for yourself.</p>
                <span className="inline-flex items-center gap-1.5 font-heading font-bold text-[11px] text-black tracking-wider group-hover:gap-2.5 transition-all">
                  BOOK NOW <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <Link
                to="/contact"
                data-testid="hero-b2b-btn"
                className="group bg-transparent border-2 border-[#EEEDE7]/30 hover:border-[#EE5A01] transition-all p-5 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-5 h-5 text-[#EE5A01]" />
                  <span className="font-heading font-bold text-xs tracking-[0.1em] text-[#EEEDE7] uppercase">Corporate Solutions</span>
                </div>
                <p className="font-body text-xs text-[#EEEDE7]/60 mb-3">Fleet leasing, staff transport, event logistics, and managed mobility for your business.</p>
                <span className="inline-flex items-center gap-1.5 font-heading font-bold text-[11px] text-[#EE5A01] tracking-wider group-hover:gap-2.5 transition-all">
                  GET A QUOTE <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-[1px] h-12 bg-[#EE5A01]/40" />
          <span className="font-mono text-[10px] text-[#666666] tracking-[0.2em]">SCROLL</span>
        </div>
      </section>

      {/* ═══ LIVE TRUST SIGNAL ═══ */}
      <section data-testid="trust-signal" className="bg-[#EE5A01] py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
          <span className="font-heading font-black text-sm sm:text-base text-black tracking-tight">12,000+ Vehicles</span>
          <span className="hidden sm:block w-1.5 h-1.5 bg-black/40 rounded-full" />
          <span className="font-heading font-black text-sm sm:text-base text-black tracking-tight">1,200+ Professionals</span>
          <span className="hidden sm:block w-1.5 h-1.5 bg-black/40 rounded-full" />
          <span className="font-heading font-black text-sm sm:text-base text-black tracking-tight">Moving the UAE since 1976</span>
        </div>
      </section>

      {/* ═══ GROUP STATS BAR ═══ */}
      <section data-testid="stats-section" className="bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-white/10">
          {stats.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </section>

      {/* ═══ GROUP INTRODUCTION ═══ */}
      <section data-testid="group-intro" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={introRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start ${introVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="lg:col-span-3">
              <div className="orange-accent-line mb-6" />
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-6">
                A Legacy Built on Movement
              </h2>
              <div className="space-y-4 font-body text-[#999] leading-relaxed">
                <p>
                  For half a century, Eurogulf Mobility Group has been at the foundation of the UAE's transportation landscape. What began in 1976 as Dubai Rent A Car LLC, the exclusive operator of the Europcar franchise for Dubai and the Northern Emirates, has evolved into one of the region's most diversified, trusted, and recognised mobility groups.
                </p>
                <p>
                  Today, Eurogulf Mobility Group manages a portfolio of six distinct mobility brands, each serving a specific customer need: from premium car rental and corporate leasing, to luxury chauffeur services, affordable short-term hire, commercial vehicle leasing, and pre-owned vehicle trading. With a professionally managed fleet exceeding 12,000 vehicles, a team of over 1,200 dedicated employees, and a presence spanning 14 locations across the UAE, Eurogulf Mobility Group is the nation's most complete mobility partner.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#EE5A01] uppercase mb-2">Our Brand Portfolio</p>
              {["Europcar", "Goldcar", "Truckline", "Eurogulf Premium Chauffeur", "Eurogulf Auto Garage", "Eurogulf Used Cars"].map((name, i) => (
                <div key={name} className={`bg-[#111] border border-white/5 p-4 flex items-center gap-3 hover:border-[#EE5A01]/30 transition-all ${introVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                  <div className="w-2 h-2 bg-[#EE5A01] flex-shrink-0" />
                  <span className="font-heading font-bold text-sm text-[#EEEDE7]">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OUR BRANDS (Six Cards) ═══ */}
      <section data-testid="brands-section" className="bg-black py-20 sm:py-28">
        <div ref={brandsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${brandsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Our Brands
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brands.map((b, i) => (
              <Link
                key={b.title}
                to={b.link}
                data-testid={`brand-card-${i}`}
                className={`service-card bg-[#111111] border border-white/5 p-7 group ${brandsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
              >
                <b.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-2">{b.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed mb-4">{b.promise}</p>
                <span className="inline-flex items-center gap-2 text-[#EE5A01] text-sm font-heading font-bold group-hover:gap-3 transition-all">
                  {b.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW STRIP ═══ */}
      <section data-testid="services-strip" className="bg-[#EE5A01] py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-heading font-black text-lg sm:text-xl text-black uppercase tracking-tight mb-4">
            Every Mobility Need. One Group.
          </h3>
          <p className="font-body text-sm text-black/70">
            {servicesStrip.join(" · ")}
          </p>
        </div>
      </section>

      <PartnerShowcase />
      <AwardsSection />
      <MunicipalitySection />
      <FeaturedSocials />
      <VideosGallery />


      {/* ═══ CTA BANNER ═══ */}
      <section data-testid="cta-banner" className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-black uppercase tracking-tight mb-2">
            WE MOVE YOU!
          </h2>
          <p className="font-body text-black/70 mb-6">Whether you're renting for a day or managing a fleet of 1,000, we have a solution built for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/europcar" data-testid="cta-rent-btn" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors text-center">
              Rent a Car
            </Link>
            <Link to="/book-chauffeur" data-testid="cta-chauffeur-btn" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Get a Chauffeur
            </Link>
            <Link to="/contact" data-testid="cta-corporate-btn" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Corporate Fleet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
