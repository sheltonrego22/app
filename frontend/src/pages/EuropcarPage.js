import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Globe, MapPin, Clock, Wrench, Phone, ArrowRight, Shield, Car, Download, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LeasingLeadForm } from '@/components/europcar/LeasingLeadForm';

const HERO_IMG = "https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=1400&h=700&fit=crop";
const LOGO_URL = "/europcar-logo.png";
const FLEET_IMG = "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-4.png.webp";
const BOOKING_URL = "https://www.europcar.com/en-db";
const MONTHLY_URL = "https://www.europcardubai.ae";
const FLEET_GUIDE_URL = "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf";
const EUROPCAR_GREEN = "#2d8c3c";
const API = process.env.REACT_APP_BACKEND_URL;

const highlights = [
  { label: "Vehicles", value: "5,000+" },
  { label: "Fleet Age", value: "1.5 Yr Avg" },
  { label: "UAE Locations", value: "14" },
  { label: "Corporate Clients", value: "500+" },
  { label: "A-Grade Workshops", value: "3" },
  { label: "Customer Service", value: "24/7" },
];

const rentalComparison = [
  { feature: "Duration", daily: "1–6 days", weekly: "7–21 days", monthly: "22–30 days+" },
  { feature: "Insurance", daily: "CDW Included", weekly: "CDW Included", monthly: "CDW Included" },
  { feature: "Mileage", daily: "Unlimited UAE", weekly: "Unlimited UAE", monthly: "3,000 km/month" },
  { feature: "Delivery", daily: "AED 52.50/trip", weekly: "AED 52.50/trip", monthly: "FREE" },
  { feature: "Maintenance", daily: "Included", weekly: "Included", monthly: "Included" },
  { feature: "Roadside", daily: "24/7 Included", weekly: "24/7 Included", monthly: "24/7 Included" },
];

const leasingComparison = [
  { feature: "Down Payment", lease: "No Down Payment", buy: "Mandatory Down Payment" },
  { feature: "Monthly Payments", lease: "Lower, Predictable", buy: "Higher Monthly Payments" },
  { feature: "Registration & Insurance", lease: "Free", buy: "At Your Cost" },
  { feature: "Maintenance", lease: "Free Full Maintenance", buy: "Unexpected Costs" },
  { feature: "Replacement Vehicle", lease: "Free Replacement", buy: "Additional Cost" },
  { feature: "Resale", lease: "No Resale Worries", buy: "Depreciation Risk" },
  { feature: "Flexibility", lease: "Lease-to-Own Options", buy: "Fixed Ownership" },
];

const airportLocations = [
  "Dubai International Airport — Terminal 1",
  "Dubai International Airport — Terminal 2",
  "Dubai International Airport — Terminal 3",
  "Al Maktoum International Airport (DWC)",
  "Sharjah International Airport",
];

const branchLocations = [
  "Dubai HQ (Al Quoz)", "Dubai Hills Mall", "Atlantis The Palm", "Emirates Towers",
  "Sharjah Office", "Jebel Ali", "Ras Al Khaimah", "Fujairah", "Abu Dhabi",
];

export default function EuropcarPage() {
  const [rentalRef, rentalVisible] = useScrollAnimation();
  const [leasingRef, leasingVisible] = useScrollAnimation();
  const [intlRef, intlVisible] = useScrollAnimation();
  const [locationsRef, locationsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Europcar Dubai | Premium Car Rental & Operational Leasing UAE"; }, []);

  return (
    <div data-testid="europcar-page">
      {/* HERO */}
      <section data-testid="europcar-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Europcar Dubai Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: EUROPCAR_GREEN }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Europcar" className="h-10 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Europcar — Premium Car Rental and Long Term Leasing Services
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Europcar is one of the world's most established mobility brands, with origins dating back to Paris in 1949. In the UAE, Europcar serves customers across Dubai and the Northern Emirates through short-term rental, monthly mobility solutions, and long-term leasing support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-hero-book-btn" style={{ background: EUROPCAR_GREEN }} className="text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:opacity-90 transition-opacity inline-block text-center">
              Book a Car
            </a>
            <Link to="/leasing" className="btn-ghost inline-block text-center">Get a Lease Quote</Link>
            <a href={FLEET_GUIDE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EEEDE7] border border-white/30 px-5 py-3.5 hover:border-white/60 transition-all">
              <Download className="w-4 h-4" /> FLEET GUIDE
            </a>
          </div>
        </div>
      </section>

      {/* KEY FACTS BAR */}
      <section className="bg-[#111111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10">
          {highlights.map((h) => (
            <div key={h.label} className="text-center py-6 px-3">
              <div className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: EUROPCAR_GREEN }}>{h.value}</div>
              <div className="font-heading text-[10px] tracking-[0.15em] text-[#EEEDE7] mt-1 uppercase">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EUROPCAR INTERNATIONAL BRAND STORY */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">
            About Europcar
          </h2>
          <div className="space-y-4 font-body text-[#999] leading-relaxed">
            <p>
              Europcar is one of the world's most established mobility brands, with origins dating back to Paris in 1949 and decades of international expansion across Europe and beyond. Over time, the brand developed through subsidiaries, franchise growth, international network expansion, and evolving reservation capabilities, helping establish Europcar as a recognised global name in car rental and mobility services.
            </p>
            <p>
              In the UAE, Europcar serves customers across Dubai and the Northern Emirates through short-term rental, monthly mobility solutions, and long-term leasing support, with the brand positioned as a premium, service-led mobility offering within the wider Eurogulf Mobility Group ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* SHORT-TERM RENTAL */}
      <section data-testid="europcar-rental" className="bg-black py-20 sm:py-28">
        <div ref={rentalRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${rentalVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: EUROPCAR_GREEN }}>Daily · Weekly · Monthly</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Short-Term Rental
              </h2>
              <p className="font-body text-[#999] leading-relaxed mb-4">
                Daily and weekly rentals across Dubai and the Northern Emirates, supported by airport service points, downtown branches, and delivery options within the operating area. Designed for flexibility and convenience, this solution gives residents, visitors, and business users access to a young, well-maintained fleet and a dependable premium rental experience.
              </p>
              <p className="font-body text-sm text-[#666] mb-6">
                Delivery available within 3–4 hours to your home, hotel, or office within Dubai, Sharjah, and Ajman for AED 52.50 — or collect from any of our 14 branch locations.
              </p>

              {/* Comparison Table */}
              <div className="border border-white/10 overflow-hidden mb-8 text-xs">
                <div className="grid grid-cols-4 bg-[#111]">
                  <div className="p-3 font-heading font-bold text-[#666] tracking-wider uppercase"></div>
                  <div className="p-3 font-heading font-bold tracking-wider uppercase text-center" style={{ color: EUROPCAR_GREEN }}>Daily</div>
                  <div className="p-3 font-heading font-bold tracking-wider uppercase text-center" style={{ color: EUROPCAR_GREEN }}>Weekly</div>
                  <div className="p-3 font-heading font-bold tracking-wider uppercase text-center" style={{ color: EUROPCAR_GREEN }}>Monthly</div>
                </div>
                {rentalComparison.map((row) => (
                  <div key={row.feature} className="grid grid-cols-4 border-t border-white/5">
                    <div className="p-3 font-body text-[#EEEDE7]">{row.feature}</div>
                    <div className="p-3 font-body text-[#999] text-center">{row.daily}</div>
                    <div className="p-3 font-body text-[#999] text-center">{row.weekly}</div>
                    <div className="p-3 font-body text-[#999] text-center">{row.monthly}</div>
                  </div>
                ))}
              </div>

              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-rental-book" style={{ background: EUROPCAR_GREEN }} className="text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-3.5 hover:opacity-90 transition-opacity inline-block text-center">
                Book Your Rental Now
              </a>
            </div>
            <div className="relative overflow-hidden">
              <img src={FLEET_IMG} alt="Europcar Fleet" className="w-full h-[420px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY RENTAL */}
      <section className="py-16 sm:py-20" style={{ background: '#e8f5e9' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: EUROPCAR_GREEN }}>Monthly Rental / Subscription</span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mt-3 mb-4">Monthly Rental Made Easy</h2>
          <p className="font-body text-[#555] max-w-2xl mx-auto mb-4 leading-relaxed">
            A flexible medium-term mobility option for customers who want more than a short rental without commitment. Experience mileage and tenure flexibility, and access to a broad vehicle range, from economy cars and sedans to premium vehicles and full-size SUVs. Europcar monthly rental is built to deliver fair value, convenience, and consistent service across Dubai and the Northern Emirates.
          </p>
          <p className="font-body text-sm text-[#777] mb-8">Mileage packages available from 3,000 km/month, with upgrades to 4,000 and 5,000 km available on request.</p>
          <a href={MONTHLY_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-monthly-book" style={{ background: EUROPCAR_GREEN }} className="text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:opacity-90 transition-opacity inline-block text-center">
            Book Your Monthly Rental
          </a>
        </div>
      </section>

      {/* LONG-TERM LEASING */}
      <section data-testid="europcar-leasing" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={leasingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${leasingVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: EUROPCAR_GREEN }}>Long-Term Leasing</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Vehicle Long-Term Leasing
              </h2>
              <p className="font-heading text-base text-[#999] mb-4">Tailor-made leasing solutions for customers seeking longer-duration mobility for 12 months to 48 months or more.</p>
              <p className="font-body text-[#666] leading-relaxed mb-6">
                With customised mileage options, Europcar offers a practical alternative to ownership, including longer-term vehicle selection preferences, subject to commercial terms and availability. A smart solution for customers who want predictable monthly mobility, reduced ownership complexity, and the flexibility to align their vehicle choice with their personal needs.
              </p>

              {/* Lease vs Buy Table */}
              <div className="border border-white/10 overflow-hidden mb-8 text-xs">
                <div className="grid grid-cols-3 bg-[#111]">
                  <div className="p-3 font-heading font-bold text-[#666] tracking-wider uppercase">Feature</div>
                  <div className="p-3 font-heading font-bold tracking-wider uppercase text-center" style={{ color: EUROPCAR_GREEN }}>Leasing</div>
                  <div className="p-3 font-heading font-bold text-[#666] tracking-wider uppercase text-center">Buying</div>
                </div>
                {leasingComparison.map((row) => (
                  <div key={row.feature} className="grid grid-cols-3 border-t border-white/5">
                    <div className="p-3 font-body text-[#EEEDE7]">{row.feature}</div>
                    <div className="p-3 flex items-center justify-center gap-1.5">
                      <Check className="w-3 h-3" style={{ color: EUROPCAR_GREEN }} />
                      <span className="font-body text-[#EEEDE7]">{row.lease}</span>
                    </div>
                    <div className="p-3 font-body text-[#666] text-center">{row.buy}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <LeasingLeadForm API={API} />

              {/* Why Eurogulf Mobility Group Leasing */}
              <div className="mt-6 space-y-3">
                {["Leasing expertise since 1976", "ISO 9001:2015 certified operations", "Dedicated fleet management team", "3 A-grade in-house workshops", "24/7 roadside assistance and recovery", "500+ loyal corporate clients"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: EUROPCAR_GREEN }} />
                    <span className="font-body text-sm text-[#999]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL CAR HIRE */}
      <section className="bg-black py-20 sm:py-28 border-t border-white/5">
        <div ref={intlRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${intlVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: EUROPCAR_GREEN }}>Outbound Car Rental</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                One Account. 143 Countries. A Car Wherever You Land.
              </h2>
              <p className="font-body text-[#999] leading-relaxed mb-6">
                As the exclusive UAE operator of the Europcar franchise, Europcar Dubai connects UAE residents and businesses to the world's most comprehensive international car rental network. Whether you're travelling to Paris, New York, Sydney, or Cape Town — your Europcar account ensures a quality vehicle is available at your destination.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: "143", label: "Countries" },
                  { val: "6,000+", label: "Rental Locations" },
                  { val: "600+", label: "Airport Locations" },
                  { val: "Global", label: "Corporate Travel Partners" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#111] border border-white/5 p-4 text-center">
                    <p className="font-mono text-xl font-bold" style={{ color: EUROPCAR_GREEN }}>{s.val}</p>
                    <p className="font-body text-xs text-[#666] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.europcar.com" target="_blank" rel="noopener noreferrer" style={{ background: EUROPCAR_GREEN }} className="text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-3.5 hover:opacity-90 transition-opacity inline-block text-center">
                Book International
              </a>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1582187764383-b1fe05d947fb?w=800&h=500&fit=crop" alt="International car hire" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section data-testid="europcar-locations" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={locationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${locationsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">14 Locations Across the UAE</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading font-bold text-sm text-[#EE5A01] uppercase tracking-wider mb-4">Airport Locations</h3>
              <div className="space-y-3">
                {airportLocations.map((loc) => (
                  <div key={loc} className="bg-[#111] border border-white/5 p-4 flex items-center gap-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: EUROPCAR_GREEN }} />
                    <span className="font-body text-sm text-[#EEEDE7]">{loc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#EE5A01] uppercase tracking-wider mb-4">Branch Network</h3>
              <div className="space-y-3">
                {branchLocations.map((loc) => (
                  <div key={loc} className="bg-[#111] border border-white/5 p-4 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#666] flex-shrink-0" />
                    <span className="font-body text-sm text-[#EEEDE7]">{loc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: EUROPCAR_GREEN }} className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">Ready to Hit the Road?</h2>
          <p className="font-body text-white/70 mb-8 max-w-lg mx-auto">Whether it's a weekend getaway or a year-long corporate lease, Europcar Dubai has the perfect vehicle waiting for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors text-center">Book Online</a>
            <Link to="/contact" className="bg-transparent text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-all text-center">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
