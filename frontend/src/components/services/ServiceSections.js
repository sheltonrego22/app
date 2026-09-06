import { Link } from 'react-router-dom';
import { Check, X, Plane, Building2, Users, Car, Monitor, MapPin, Truck, Snowflake, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const CAROUSEL_OPTS = { align: "start", loop: true };
const BOOKING_URL = "https://www.europcar.com/";

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
  { name: "Mercedes E-Class / S-Class", img: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Cadillac Escalade / GMC Yukon", img: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=500&h=300&fit=crop" },
  { name: "Mercedes V-Class", img: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "GMC Denali", img: "https://images.unsplash.com/photo-1767285610734-f0858d5248fe?w=500&h=300&fit=crop" },
  { name: "Mercedes Sprinter", img: "https://images.unsplash.com/photo-1767749995450-7b63ab7cd4fd?w=500&h=300&fit=crop" },
];

function ServiceSection({ id, children }) {
  const [ref, visible] = useScrollAnimation();
  return (
    <section id={id} data-testid={`service-${id}`} className="scroll-mt-24">
      <div ref={ref} className={visible ? 'scroll-visible' : 'scroll-hidden'}>{children}</div>
    </section>
  );
}

export function CarRentalSection() {
  return (
    <ServiceSection id="car-rental">
      <div className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden">
              <img src="https://egmg.ae/wp-content/uploads/2025/06/Resize-image-project-4.png" alt="Europcar Dubai Fleet" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Daily · Weekly · Monthly</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">Rent the Right Car, Anywhere in the UAE</h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">Young, well-maintained fleet including locations at all 3 Dubai Airport terminals, Atlantis The Palm, Emirates Towers, Dubai Hills Mall, and more.</p>
              <ul className="space-y-3 mb-8">
                {["Easy online booking", "24/7 Roadside assistance", "ISO-certified service", "International bookings in 143 countries"].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-[#EE5A01]" /></div>
                    <span className="font-body text-sm text-[#EEEDE7]">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="rental-book-btn" className="btn-primary inline-block text-center">Book Your Rental</a>
                <Link to="/europcar" className="btn-ghost inline-block text-center">Europcar Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}

export function LeasingSection() {
  return (
    <ServiceSection id="vehicle-leasing">
      <div className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Corporate Solutions</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">Lease Smarter. Drive Further.</h2>
              <p className="font-body text-[#666666] leading-relaxed mb-8">Long-term fleet solutions for 500+ corporate clients. No down payment, free maintenance, free replacement vehicles.</p>
              <div className="border border-white/10 overflow-hidden mb-8">
                <div className="grid grid-cols-3 bg-[#111111]">
                  <div className="p-3 font-heading font-bold text-xs text-[#666666] tracking-wider uppercase">Feature</div>
                  <div className="p-3 font-heading font-bold text-xs text-[#EE5A01] tracking-wider uppercase text-center">Leasing</div>
                  <div className="p-3 font-heading font-bold text-xs text-[#666666] tracking-wider uppercase text-center">Buying</div>
                </div>
                {leasingComparison.map((row) => (
                  <div key={row.feature} className="grid grid-cols-3 border-t border-white/5">
                    <div className="p-3 font-body text-xs text-[#EEEDE7]">{row.feature}</div>
                    <div className="p-3 flex items-center justify-center gap-2"><Check className="w-3 h-3 text-[#EE5A01]" /><span className="font-body text-xs text-[#EEEDE7]">{row.lease}</span></div>
                    <div className="p-3 flex items-center justify-center gap-2"><X className="w-3 h-3 text-[#666666]" /><span className="font-body text-xs text-[#666666]">{row.buy}</span></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" data-testid="leasing-quote-btn" className="btn-primary inline-block text-center">Request a Fleet Quote</Link>
                <Link to="/europcar" className="btn-ghost inline-block text-center">Leasing Details</Link>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=800&h=600&fit=crop" alt="Eurogulf Mobility Group Fleet" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}

export function ChauffeurSection() {
  return (
    <ServiceSection id="chauffeur">
      <div className="bg-black py-20 sm:py-28 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Eurogulf Premium Chauffeur</span>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">Arrive in Command.</h2>
            <p className="font-body text-base text-[#EE5A01] mb-4">Managed Transport and Driven Services</p>
            <p className="font-body text-[#666666] leading-relaxed mb-8">Professional chauffeur-driven and managed transport solutions. Available for airport transfers, corporate events, staff transport, and intercity travel.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-14">
            {chauffeurServices.map((s) => (
              <div key={s.label} className="bg-[#111111] border border-white/5 p-4 text-center">
                <s.icon className="w-6 h-6 text-[#EE5A01] mx-auto mb-2" strokeWidth={1.5} />
                <span className="font-body text-xs text-[#EEEDE7]">{s.label}</span>
              </div>
            ))}
          </div>
          <h3 className="font-heading font-bold text-lg text-[#EEEDE7] uppercase tracking-wider mb-6">Our Fleet</h3>
          <Carousel opts={CAROUSEL_OPTS} className="w-full mb-10">
            <CarouselContent className="-ml-4">
              {chauffeurFleet.map((v) => (
                <CarouselItem key={v.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-[#111111] border border-white/5 overflow-hidden">
                    <img src={v.img} alt={v.name} className="w-full h-48 object-cover" loading="lazy" />
                    <div className="p-4"><h4 className="font-heading font-bold text-sm text-[#EEEDE7]">{v.name}</h4></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 bg-[#111111] border-[#EE5A01] text-[#EE5A01] hover:bg-[#EE5A01] hover:text-black" />
            <CarouselNext className="hidden sm:flex -right-4 bg-[#111111] border-[#EE5A01] text-[#EE5A01] hover:bg-[#EE5A01] hover:text-black" />
          </Carousel>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/book-chauffeur" data-testid="chauffeur-book-btn" className="btn-primary inline-block text-center py-4">Book a Chauffeur</Link>
            <Link to="/chauffeur-service" className="btn-ghost inline-block text-center py-4">Eurogulf Premium Chauffeur Details</Link>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}

export function CoachSection() {
  return (
    <ServiceSection id="coaches">
      <div className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1759882608768-168d4c3a91c2?w=800&h=600&fit=crop" alt="Luxury Coach" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Eurogulf Premium Chauffeur · Luxury Coaches</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">Passenger Transportation at Scale</h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">Luxury coaches and managed transport for corporate groups, events, and intercity travel.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["Executive Sedans", "Luxury SUVs", "Luxury Mini Vans", "Full-Size Coaches"].map((c) => (
                  <div key={c} className="bg-[#111111] border border-white/5 p-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#EE5A01] flex-shrink-0" />
                    <span className="font-body text-xs text-[#EEEDE7]">{c}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" data-testid="coach-quote-btn" className="btn-primary inline-block text-center">Get a Group Transfer Quote</Link>
                <Link to="/chauffeur-service" className="btn-ghost inline-block text-center">View Chauffeur & Coaches</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}

export function TruckSection() {
  return (
    <ServiceSection id="truck-leasing">
      <div className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Truckline Transport</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">Commercial Solutions. Built for Business.</h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">Vans, trucks, and chiller units for commercial and logistics operations across the UAE.</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Delivery Vans", "Box Trucks", "Chiller Units", "Flatbed Trucks"].map((t) => (
                  <span key={t} className="bg-[#111111] border border-white/5 px-4 py-2 font-body text-xs text-[#EEEDE7] flex items-center gap-2">
                    {t === "Chiller Units" ? <Snowflake className="w-3 h-3 text-[#EE5A01]" /> : <Truck className="w-3 h-3 text-[#EE5A01]" />}
                    {t}
                  </span>
                ))}
              </div>
              <Link to="/contact" data-testid="truck-enquire-btn" className="btn-primary inline-block">Enquire About Commercial Fleet</Link>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file-3.webp" alt="Truckline Fleet" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}

export function UsedCarsSection() {
  return (
    <ServiceSection id="used-cars">
      <div className="bg-[#EEEDE7] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=800&h=600&fit=crop" alt="Pre-owned vehicles" className="w-full h-[400px] object-cover" loading="lazy" />
            </div>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Eurogulf Used Cars</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mt-3 mb-4">Quality Certified. Priced Right.</h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">Certified pre-owned vehicles from the Eurogulf Mobility Group fleet, maintained to A-Grade workshop standards.</p>
              <ul className="space-y-3 mb-8">
                {["Multi-point inspection", "Full service history", "Competitive pricing", "Warranty available"].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-[#EE5A01]" /></div>
                    <span className="font-body text-sm text-black">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/used-cars" data-testid="used-cars-btn" className="btn-primary inline-block">Browse Available Stock</Link>
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}
