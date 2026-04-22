import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, MapPin, Check, Snowflake, Package, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1698348186158-253ce97914f9?w=1400&h=700&fit=crop";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/yxpq5nol_Logo1.png";
const PRODUCT_IMG = "https://egmg.ae/wp-content/uploads/2025/06/Adobe-Express-file-3.webp";

const services = [
  { icon: Truck, title: "Trucks & Vans Leasing", desc: "A comprehensive range of well-maintained commercial vehicles — from compact delivery vans to heavy-duty trucks — available on flexible lease terms." },
  { icon: MapPin, title: "Services All Over UAE", desc: "Operations covering all seven Emirates, ensuring your business has consistent access to vehicles and logistical support wherever you operate." },
  { icon: Clock, title: "24/7 Support & Services", desc: "Round-the-clock roadside assistance, fleet maintenance, and customer support to keep your business moving without interruption." },
];

const vehicleTypes = [
  { icon: Package, label: "Delivery Vans", desc: "Compact and mid-size vans for last-mile delivery and urban logistics." },
  { icon: Truck, label: "Box Trucks", desc: "Enclosed cargo trucks for secure, high-volume commercial transport." },
  { icon: Snowflake, label: "Chiller Units", desc: "Temperature-controlled vehicles for food, pharmaceutical, and cold-chain logistics." },
  { icon: Truck, label: "Flatbed Trucks", desc: "Open-deck trucks for construction materials, equipment, and heavy cargo." },
];

const benefits = [
  "No down payment required on lease agreements",
  "Free maintenance and servicing included",
  "Free replacement vehicles during downtime",
  "Flexible short-term and long-term lease options",
  "Dedicated account management for corporate clients",
  "Comprehensive insurance coverage included",
];

export default function TrucklinePage() {
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [vehiclesRef, vehiclesVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Truckline — Commercial Fleet Leasing | EGMG"; }, []);

  return (
    <div data-testid="truckline-page">
      {/* HERO */}
      <section data-testid="truckline-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Truckline Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Truckline by EGMG" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Empowering Businesses, One Journey at a Time
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Truckline Transport offers specialized fleet leasing services for businesses, providing a range of well-maintained cars, trucks, and vans to support commercial operations across all Emirates.
          </p>
          <Link to="/contact" data-testid="truckline-enquire-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Get a Fleet Quote
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section data-testid="truckline-services" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} data-testid={`truckline-service-${i}`} className={`bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all group ${servicesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <s.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-3">{s.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VEHICLE TYPES */}
      <section data-testid="truckline-vehicles" className="bg-black py-20 sm:py-28">
        <div ref={vehiclesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Commercial Fleet</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Vehicles Built for Business
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-8">
                From last-mile delivery vans to temperature-controlled chiller units and heavy-duty flatbed trucks, Truckline equips your business with the right vehicle for every operation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicleTypes.map((v, i) => (
                  <div key={i} className={`bg-[#111111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all ${vehiclesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                    <v.icon className="w-6 h-6 text-[#EE5A01] mb-3" strokeWidth={1.5} />
                    <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{v.label}</h3>
                    <p className="font-body text-xs text-[#666666] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Why Truckline</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Lease Smarter
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                Truckline eliminates the burden of fleet ownership. No capital outlay. No maintenance headaches. Just reliable vehicles, serviced and ready when you need them.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary inline-block">
                Enquire About Commercial Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED CLIENTS */}
      <section className="bg-[#0a0a0a] py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Our Clients</span>
            <h2 className="font-heading font-bold text-xl text-[#EEEDE7] uppercase tracking-tight mt-2">
              Trusted by Leading Businesses Across the UAE
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-4.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-3.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-2.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-9.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-8.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-11.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-10.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-7.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-6.png.webp",
              "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/l-5.png.webp",
            ].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={`Truckline client ${i + 1}`}
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Power Your Logistics
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            From a single delivery van to an entire commercial fleet, Truckline has you covered across all seven Emirates.
          </p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
