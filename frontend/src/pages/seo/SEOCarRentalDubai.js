import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin, Shield, Clock, Car } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BOOKING_URL = "https://www.europcar.com/en-db";

const benefits = [
  "Young fleet with average age of 1.5 years",
  "Airport pickup at DXB T1, T2, T3, DWC, and Sharjah",
  "14 locations across Dubai and Northern Emirates",
  "CDW insurance and 24/7 roadside assistance included",
  "Free delivery within Dubai, Sharjah, and Ajman",
  "Daily, weekly, and monthly options available",
];

const locations = [
  "Dubai International Airport (T1, T2, T3)", "Al Maktoum International (DWC)", "Sharjah International Airport",
  "Dubai HQ (Al Quoz)", "Dubai Hills Mall", "Atlantis The Palm", "Emirates Towers", "Jebel Ali", "Ras Al Khaimah", "Fujairah",
];

export default function SEOCarRentalDubai() {
  const [benefitsRef, benefitsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Car Rental Dubai | Rent a Car in Dubai from AED 99/day | Europcar by Eurogulf Mobility Group"; }, []);

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase block mb-4">Europcar Dubai · Part of Eurogulf Mobility Group</span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4">
            Car Rental Dubai
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">
            Rent a car in Dubai from Europcar with premium vehicles, flexible terms, and seamless airport pickup across all Dubai terminals. Daily, weekly, and monthly rentals available from one of the UAE's most trusted mobility providers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-[#2d8c3c] text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:opacity-90 transition-opacity text-center">Book Your Rental Now</a>
            <Link to="/contact" className="btn-ghost text-center">Get a Quote</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-6">Why Rent from Europcar Dubai?</h2>
          <p className="font-body text-[#999] leading-relaxed mb-8">
            Europcar Dubai, operated by Eurogulf Mobility Group, is one of the UAE's most established car rental providers. With a fleet of well-maintained vehicles, 14 convenient locations, and airport counters at every major Dubai terminal, we deliver a dependable rental experience for visitors, residents, and business travellers across Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.
          </p>
          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <div key={b} className={`flex items-start gap-3 bg-[#111] border border-white/5 p-4 ${benefitsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <Check className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-[#EEEDE7]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl text-[#EEEDE7] uppercase tracking-tight mb-6">Our Locations in Dubai & Northern Emirates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <div key={loc} className="flex items-center gap-2 bg-[#111] border border-white/5 p-3">
                <MapPin className="w-3.5 h-3.5 text-[#EE5A01] flex-shrink-0" />
                <span className="font-body text-sm text-[#EEEDE7]">{loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-black uppercase tracking-tight mb-4">Ready to Book?</h2>
          <p className="font-body text-black/70 mb-8">Reserve your car online in minutes. Airport pickup available at DXB and DWC.</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Book Online Now</a>
        </div>
      </section>
    </div>
  );
}
