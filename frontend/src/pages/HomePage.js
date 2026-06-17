import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, Crown, Truck, Tag, ArrowRight, Wrench, Award, CheckCircle, Users, Briefcase } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';

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

const PARTNER_LOGOS = [
  { name: "Al Khoory Automobiles", url: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-32.png.webp" },
  { name: "IMT Dubai", url: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-33.png.webp" },
  { name: "Europcar", url: "/europcar-logo.png" },
  { name: "ADNOC", url: "https://logo.clearbit.com/adnoc.ae?size=200" },
  { name: "Emirates", url: "https://egmg.ae/wp-content/uploads/2025/06/Emirates-Logo.png-768x403-1.webp" },
  { name: "DP World", url: "https://logo.clearbit.com/dpworld.com?size=200" },
  { name: "Dubai Holding", url: "https://logo.clearbit.com/dubaiholding.com?size=200" },
];

const awards = [
  { title: "Car Rental Global Award, Best Performance 2023", sub: "Middle East & Africa Region" },
  { title: "Best Business Performance 2018", sub: "Middle East & Africa Region" },
  { title: "Best Car Rental Company in the Middle East", sub: "Business Travel Awards" },
  { title: "ISO 9001:2015", sub: "Quality Management" },
  { title: "ISO 10002:2014", sub: "Customer Satisfaction" },
];

const socialImages = [
  { img: "https://images.unsplash.com/photo-1607414851776-f2fcc379fb48?w=600&h=600&fit=crop", caption: "Dubai skyline at golden hour" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-4.png.webp", caption: "Europcar fleet ready for the road" },
  { img: "https://images.unsplash.com/photo-1546412414-c2658fffe7d9?w=600&h=600&fit=crop", caption: "Sheikh Zayed Road, Dubai" },
  { img: "https://images.unsplash.com/photo-1652707228067-25672fa0b082?w=600&h=600&fit=crop", caption: "Dubai Marina by night" },
  { img: "https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=600&h=600&fit=crop", caption: "Dubai streets and skyline" },
  { img: "https://images.unsplash.com/photo-1459787915554-b34915863013?w=600&h=600&fit=crop", caption: "Aerial view of Dubai" },
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
  const [partnersRef, partnersVisible] = useScrollAnimation();
  const [municipalityRef, municipalityVisible] = useScrollAnimation();

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

      {/* ═══ CORPORATE PARTNER SHOWCASE ═══ */}
      <section data-testid="partner-logos-section" className="bg-[#0a0a0a] py-16 sm:py-20">
        <div ref={partnersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 ${partnersVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">
              Trusted by the UAE's Most Recognised Names
            </h2>
            <p className="font-body text-sm text-[#666] max-w-2xl mx-auto">
              From global airlines and luxury hospitality groups to government authorities and multinational corporations, the UAE's most demanding organisations have relied on Eurogulf Mobility Group for decades.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center mb-8">
            {PARTNER_LOGOS.map((logo) => (
              <div key={logo.name} data-testid={`partner-logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col items-center gap-2 group">
                <div className="h-12 sm:h-14 w-full flex items-center justify-center">
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="max-h-12 sm:max-h-14 w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                  <span className="hidden font-heading font-bold text-xs text-[#EEEDE7]/50 group-hover:text-[#EEEDE7]/90 transition-colors tracking-wider uppercase">{logo.name}</span>
                </div>
                <span className="font-body text-[9px] text-[#555] group-hover:text-[#999] transition-colors tracking-wider uppercase">{logo.name}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/partners" className="font-heading text-xs tracking-wider text-[#EE5A01] uppercase hover:underline">View All Partners & Clients →</Link>
          </div>
        </div>
      </section>

      {/* ═══ AWARDS & CERTIFICATIONS ═══ */}
      <section data-testid="awards-section" className="bg-[#f5f2ec] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="orange-accent-line mx-auto mb-4" />
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-black uppercase tracking-tight">Recognised for Excellence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {awards.map((a) => (
              <div key={a.title} className="bg-white border border-black/5 p-5 text-center">
                <div className="w-10 h-10 bg-[#EE5A01]/10 flex items-center justify-center mx-auto mb-3">
                  {a.title.startsWith("ISO") ? <CheckCircle className="w-5 h-5 text-[#EE5A01]" /> : <Award className="w-5 h-5 text-[#EE5A01]" />}
                </div>
                <p className="font-heading font-bold text-xs text-black uppercase tracking-wider leading-relaxed">{a.title}</p>
                <p className="font-body text-[10px] text-[#666] mt-1">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DUBAI MUNICIPALITY PARTNERSHIP ═══ */}
      <section data-testid="municipality-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={municipalityRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${municipalityVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Marquee Partnership</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-2 mb-4">
                Proud Partners of Dubai Municipality
              </h2>
              <p className="font-body text-[#999] leading-relaxed mb-4">
                Among the many distinctions that define the group's standing, none speaks more clearly to its operational capability than the partnership with Dubai Municipality, one of the most respected government authorities in the region.
              </p>
              <p className="font-body text-[#999] leading-relaxed mb-6">
                As a proud supplier and strategic partner, Eurogulf Mobility Group provides full fleet management solutions across a fleet exceeding 1,500 vehicles, operated by a dedicated team working directly from Dubai Municipality's Transportation Department.
              </p>
              <Link to="/dubai-municipality" className="btn-primary inline-block">Explore This Partnership</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1,500+", label: "Vehicles Managed" },
                { value: "98.5%", label: "Fleet Uptime" },
                { value: "24/7", label: "Support Coverage" },
                { value: "5", label: "Dedicated Workshops" },
              ].map((s) => (
                <div key={s.label} className="bg-[#111] border border-white/5 p-5 text-center">
                  <p className="font-heading font-black text-2xl text-[#EE5A01]">{s.value}</p>
                  <p className="font-body text-xs text-[#666] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED SOCIALS ═══ */}
      <section data-testid="featured-socials" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">What's Happening at Eurogulf Mobility Group</h2>
            <p className="font-body text-[#666]">Stories from across our brands and community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <div className="bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all">
              <div className="h-48 bg-gradient-to-br from-[#EE5A01]/20 to-black flex items-center justify-center">
                <span className="font-heading font-black text-5xl text-[#EE5A01] opacity-30">IMT</span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">Events</span>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mt-2 mb-2">Main Mobility Partner for IMT Dubai Vaudeville 2026</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">Driving the spotlight at the UAE's premier events. Eurogulf Mobility Group is proud to be the official mobility partner for IMT Dubai's Vaudeville 2026.</p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all">
              <div className="h-48 bg-gradient-to-br from-green-500/10 to-black flex items-center justify-center">
                <span className="font-heading font-black text-5xl text-green-500/30">♥</span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">Health & Wellbeing</span>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mt-2 mb-2">Together for Healthier Journeys</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">Marking World Health Day 2026, Eurogulf Mobility Group reaffirms its commitment to traveller well-being through safer vehicles, trained drivers, and wellness-first mobility.</p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/5 overflow-hidden group hover:border-[#EE5A01]/30 transition-all">
              <div className="h-48 bg-gradient-to-br from-[#EE5A01]/10 to-black flex items-center justify-center">
                <span className="font-heading font-black text-5xl text-[#EE5A01]/30">★</span>
              </div>
              <div className="p-6">
                <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">Careers</span>
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mt-2 mb-2">Drive Your Career with Eurogulf</h3>
                <p className="font-body text-sm text-[#666] leading-relaxed">Now hiring: professional drivers and a Process Analyst for ISO 9001 excellence. Join a team that powers mobility across the UAE.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://www.instagram.com/eurogulfmobility/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              FOLLOW ON INSTAGRAM
            </a>
            <a href="https://www.linkedin.com/company/105403528/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              FOLLOW ON LINKEDIN
            </a>
          </div>
        </div>
      </section>

      {/* ═══ VIDEOS & GALLERY ═══ */}
      <section data-testid="social-section" className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase">See Us in Action</p>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#EEEDE7]">
              @eurogulfmobility
            </h2>
          </div>

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
                title="It's not just a fleet — It's the scale and innovation of Eurogulf Mobility Group"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {socialImages.map((item) => (
              <a
                key={item.caption}
                href="https://www.instagram.com/eurogulfmobility/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group"
              >
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-start p-3">
                  <p className="font-body text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{item.caption}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="https://www.instagram.com/eurogulfmobility/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              INSTAGRAM
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
