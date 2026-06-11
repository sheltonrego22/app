import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Building2, Crown, Bus, Truck, Tag, ArrowRight, Check, X, Plane, Users, MapPin, Monitor, Snowflake, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const CAROUSEL_OPTS = { align: "start", loop: true };

const HERO_BG = "https://static.prod-images.emergentagent.com/jobs/a56c4b9d-53c0-46d6-8ecc-d67faee11d28/images/03d6711ff436da62df81b6c9cca8d1275c75b2ab6b777fee66e11032ac8b402a.png";
const BOOKING_URL = "https://www.europcar.com/";
const FLEET_GUIDE_URL = "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf";

const filterTabs = [
  { id: "all", label: "ALL" },
  { id: "rental", label: "RENTAL" },
  { id: "leasing", label: "LEASING" },
  { id: "chauffeur", label: "CHAUFFEUR" },
  { id: "coach", label: "COACH" },
  { id: "freight", label: "FREIGHT" },
  { id: "used", label: "USED CARS" },
];

const leasingComparison = [
  { feature: "Down Payment", lease: "No Down Payment", buy: "Mandatory Down Payment" },
  { feature: "Monthly Payments", lease: "Lower Monthly Payments", buy: "Higher Monthly Payments" },
  { feature: "Registration & Insurance", lease: "Free Registration & Insurance", buy: "Registration Costs" },
  { feature: "Maintenance", lease: "Free Maintenance", buy: "Unexpected Repair Expenses" },
  { feature: "Replacement Vehicle", lease: "Free Replacement", buy: "Additional Downtime Costs" },
  { feature: "Resale", lease: "No Resale Worries", buy: "Depreciation" },
];

const chauffeurServices = [
  { icon: Plane, label: "Airport Transfers" },
  { icon: Building2, label: "Corporate Transfers" },
  { icon: Users, label: "Dedicated Chauffeurs" },
  { icon: Car, label: "VIP Parking" },
  { icon: Monitor, label: "Exhibition & Events" },
  { icon: MapPin, label: "Intercity Services" },
  { icon: Plane, label: "Airport Coordinators" },
];

const chauffeurFleet = [
  { name: "Tesla Model 3/Y", img: "https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=500&h=300&fit=crop" },
  { name: "BMW 7 Series", img: "https://images.unsplash.com/photo-1638980703460-8e542eb75007?w=500&h=300&fit=crop" },
  { name: "Volvo S90", img: "https://images.unsplash.com/photo-1658301839175-58d115aef1ef?w=500&h=300&fit=crop" },
  { name: "Audi A8", img: "https://images.unsplash.com/photo-1634052597957-bc7f1a191c3e?w=500&h=300&fit=crop" },
  { name: "Mercedes V-Class", img: "https://images.unsplash.com/photo-1608632937860-0072bd7a027a?w=500&h=300&fit=crop" },
  { name: "Mercedes Sprinter", img: "https://images.unsplash.com/photo-1773766487829-d1df4d487980?w=500&h=300&fit=crop" },
];

function ServiceSection({ id, category, children }) {
  const [ref, visible] = useScrollAnimation();
  return (
    <section id={id} data-testid={`service-${id}`} className={`scroll-mt-24 ${visible ? '' : ''}`}>
      <div ref={ref} className={`${visible ? 'scroll-visible' : 'scroll-hidden'}`}>
        {children}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => { document.title = "Our Services — Eurogulf Mobility"; }, []);

  const shouldShow = (category) => activeFilter === "all" || activeFilter === category;

  return (
    <div data-testid="services-page">
      {/* ═══ HERO ═══ */}
      <section data-testid="services-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] mb-4 uppercase animate-fade-in">Complete Mobility Solutions</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Mobility Solutions for Every Need
          </h1>
          <p className="font-body text-base text-[#666666] max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            From individual travelers to enterprise fleets — Eurogulf Mobility Group delivers the UAE's most comprehensive transport solutions under one roof.
          </p>
          <a
            href={FLEET_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="fleet-guide-download"
            className="inline-flex items-center gap-2 mt-6 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Download className="w-4 h-4" />
            DOWNLOAD FLEET GUIDE (PDF)
          </a>
        </div>
      </section>

      {/* ═══ FILTER TABS ═══ */}
      <div data-testid="service-filter-tabs" className="bg-[#0a0a0a] border-b border-white/5 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                data-testid={`filter-tab-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`font-heading font-bold text-xs tracking-[0.1em] px-5 py-2.5 transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#EE5A01] text-black'
                    : 'text-[#666666] hover:text-[#EEEDE7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SERVICE 1: CAR RENTAL ═══ */}
      {shouldShow("rental") && (
        <ServiceSection id="car-rental" category="rental">
          <div className="bg-black py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden">
                  <img
                    src="https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-4.png.webp"
                    alt="Europcar Dubai Fleet"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Daily · Weekly · Monthly</span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                    Rent the Right Car, Anywhere in the UAE
                  </h2>
                  <p className="font-body text-[#666666] leading-relaxed mb-6">
                    Young, well-maintained fleet including locations at all 3 Dubai Airport terminals, Atlantis The Palm, Emirates Towers, Dubai Hills Mall, and more. Europcar — No.1 in Europe, No.3 Worldwide, present in 143 countries, 6,000+ locations.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Easy online booking", "24/7 Roadside assistance", "ISO-certified service", "International bookings in 143 countries"].map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#EE5A01]" />
                        </div>
                        <span className="font-body text-sm text-[#EEEDE7]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="rental-book-btn" className="btn-primary inline-block text-center">
                      Book Your Rental
                    </a>
                    <Link to="/europcar" className="btn-ghost inline-block text-center">
                      Europcar Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ServiceSection>
      )}

      {/* ═══ SERVICE 2: VEHICLE LEASING ═══ */}
      {shouldShow("leasing") && (
        <ServiceSection id="vehicle-leasing" category="leasing">
          <div className="bg-[#0a0a0a] py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Corporate Solutions</span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                    Lease Smarter. Drive Further.
                  </h2>
                  <p className="font-body text-[#666666] leading-relaxed mb-8">
                    Long-term fleet solutions for 500+ corporate clients. Fleet of 5,000+ leased vehicles managed with 3 A-Grade workshops. No down payment, free maintenance, free replacement vehicles.
                  </p>
                  {/* Comparison Table */}
                  <div className="border border-white/10 overflow-hidden mb-8">
                    <div className="grid grid-cols-3 bg-[#111111]">
                      <div className="p-3 font-heading font-bold text-xs text-[#666666] tracking-wider uppercase">Feature</div>
                      <div className="p-3 font-heading font-bold text-xs text-[#EE5A01] tracking-wider uppercase text-center">Leasing</div>
                      <div className="p-3 font-heading font-bold text-xs text-[#666666] tracking-wider uppercase text-center">Buying</div>
                    </div>
                    {leasingComparison.map((row) => (
                      <div key={row.feature} className="grid grid-cols-3 border-t border-white/5">
                        <div className="p-3 font-body text-xs text-[#EEEDE7]">{row.feature}</div>
                        <div className="p-3 flex items-center justify-center gap-2">
                          <Check className="w-3 h-3 text-[#EE5A01]" />
                          <span className="font-body text-xs text-[#EEEDE7]">{row.lease}</span>
                        </div>
                        <div className="p-3 flex items-center justify-center gap-2">
                          <X className="w-3 h-3 text-[#666666]" />
                          <span className="font-body text-xs text-[#666666]">{row.buy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/contact" data-testid="leasing-quote-btn" className="btn-primary inline-block text-center">
                      Request a Fleet Quote
                    </Link>
                    <Link to="/europcar" className="btn-ghost inline-block text-center">
                      Leasing Details
                    </Link>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1696934288553-c41a5456da7b?w=800&h=600&fit=crop"
                    alt="EGMG Fleet Management in Dubai"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </ServiceSection>
      )}

      {/* ═══ SERVICE 3: PREMIUM CHAUFFEUR (FLAGSHIP) ═══ */}
      {shouldShow("chauffeur") && (
        <ServiceSection id="chauffeur" category="chauffeur">
          <div className="bg-black py-20 sm:py-28 relative">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1693946953973-3d9ddaf7a977?w=800&h=600&fit=crop"
                alt="Chauffeur service on Dubai roads"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Eurogulf Limo + Royal Limousine</span>
                <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                  Arrive in Command.
                </h2>
                <p className="font-body text-base text-[#EE5A01] mb-4">Premium Chauffeur Service — Personal & Corporate</p>
                <p className="font-body text-[#666666] leading-relaxed mb-8">
                  ISO 9001:2015 certified premium chauffeur fleet. Well-trained, accredited drivers with GPS-tracked, graded operations. Available for airport transfers, corporate events, exhibitions, and intercity travel.
                </p>
              </div>

              {/* Service Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-14">
                {chauffeurServices.map((s) => (
                  <div key={s.label} className="bg-[#111111] border border-white/5 p-4 text-center">
                    <s.icon className="w-6 h-6 text-[#EE5A01] mx-auto mb-2" strokeWidth={1.5} />
                    <span className="font-body text-xs text-[#EEEDE7]">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Fleet Cards Carousel */}
              <h3 className="font-heading font-bold text-lg text-[#EEEDE7] uppercase tracking-wider mb-6">Our Chauffeur Fleet</h3>
              <Carousel opts={CAROUSEL_OPTS} className="w-full mb-10">
                <CarouselContent className="-ml-4">
                  {chauffeurFleet.map((v) => (
                    <CarouselItem key={v.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      <div className="bg-[#111111] border border-white/5 overflow-hidden">
                        <img src={v.img} alt={v.name} className="w-full h-48 object-cover" loading="lazy" />
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

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/book-chauffeur" data-testid="chauffeur-book-btn" className="btn-primary inline-block text-center py-4">
                  Book a Chauffeur
                </Link>
                <Link to="/royal-limousine" className="btn-ghost inline-block text-center py-4">
                  Royal Limousine Details
                </Link>
              </div>
            </div>
          </div>
        </ServiceSection>
      )}

      {/* ═══ SERVICE 4: BUS & COACH ═══ */}
      {shouldShow("coach") && (
        <ServiceSection id="coaches" category="coach">
          <div className="bg-[#0a0a0a] py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1759882608768-168d4c3a91c2?w=800&h=600&fit=crop"
                    alt="Luxury Coach"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Royal Limousine Coach + Eurogulf Coaches</span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                    Passenger Transportation at Scale
                  </h2>
                  <p className="font-body text-[#666666] leading-relaxed mb-6">
                    Luxury executive sedans, luxury SUVs, luxury mini vans, and full-size coaches for corporate groups, events, and intercity travel. Operations software with 2-way client reservation interface, built-in rates, live GPS tracking.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {["Executive Sedans", "Luxury Sedans", "Luxury SUVs", "Luxury Mini Vans", "Full-Size Coaches"].map((c) => (
                      <div key={c} className="bg-[#111111] border border-white/5 p-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#EE5A01] flex-shrink-0" />
                        <span className="font-body text-xs text-[#EEEDE7]">{c}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/contact" data-testid="coach-quote-btn" className="btn-primary inline-block text-center">
                      Get a Group Transfer Quote
                    </Link>
                    <Link to="/royal-limousine" className="btn-ghost inline-block text-center">
                      View Coaches & Limo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ServiceSection>
      )}

      {/* ═══ SERVICE 5: TRUCK LEASING ═══ */}
      {shouldShow("freight") && (
        <ServiceSection id="truck-leasing" category="freight">
          <div className="bg-black py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Truck Line</span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                    Commercial Solutions. Built for Business.
                  </h2>
                  <p className="font-body text-[#666666] leading-relaxed mb-6">
                    Vans, trucks, and chiller units for commercial and logistics operations across the UAE. Flexible lease terms with full maintenance and support.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {["Delivery Vans", "Box Trucks", "Chiller Units", "Flatbed Trucks"].map((t) => (
                      <span key={t} className="bg-[#111111] border border-white/5 px-4 py-2 font-body text-xs text-[#EEEDE7] flex items-center gap-2">
                        <Snowflake className={`w-3 h-3 text-[#EE5A01] ${t !== "Chiller Units" ? "hidden" : ""}`} />
                        <Truck className={`w-3 h-3 text-[#EE5A01] ${t === "Chiller Units" ? "hidden" : ""}`} />
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact" data-testid="truck-enquire-btn" className="btn-primary inline-block">
                    Enquire About Commercial Fleet
                  </Link>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file-3.webp"
                    alt="EGMG Truckline Commercial Fleet"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </ServiceSection>
      )}

      {/* ═══ SERVICE 6: USED CARS ═══ */}
      {shouldShow("used") && (
        <ServiceSection id="used-cars" category="used">
          <div className="bg-[#EEEDE7] py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1669485971006-d1f811a22700?w=800&h=600&fit=crop"
                    alt="Pre-owned vehicles in Dubai"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Eurogulf Used Car</span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mt-3 mb-4">
                    Quality Certified. Priced Right.
                  </h2>
                  <p className="font-body text-[#666666] leading-relaxed mb-6">
                    Certified pre-owned vehicles from the Eurogulf Mobility Group fleet — maintained to A-Grade workshop standards. Every vehicle undergoes a comprehensive inspection before listing.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Multi-point inspection", "Full service history", "Competitive pricing", "Warranty available"].map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#EE5A01]" />
                        </div>
                        <span className="font-body text-sm text-black">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" data-testid="used-cars-btn" className="btn-primary inline-block">
                    Browse Available Stock
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ServiceSection>
      )}

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Need a Custom Solution?
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Our team can design a bespoke mobility package for your organization. Get in touch today.
          </p>
          <Link to="/contact" data-testid="services-contact-btn" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
