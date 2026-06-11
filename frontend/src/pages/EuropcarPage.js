import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Globe, MapPin, Clock, Wrench, Phone, ArrowRight, Shield, Car, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const HERO_IMG = "https://images.unsplash.com/photo-1694377161535-da07da1b1632?w=1400&h=700&fit=crop";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/xfzdgz6a_Logo2.png";
const FLEET_IMG = "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Resize-image-project-4.png.webp";
const BOOKING_URL = "https://www.europcar.com/en-db";
const MONTHLY_URL = "https://www.europcardubai.com";
const FLEET_GUIDE_URL = "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf";
const EUROPCAR_GREEN = "#2d8c3c";

const highlights = [
  { label: "No. 1 in Europe", value: "#1" },
  { label: "No. 3 Worldwide", value: "#3" },
  { label: "Countries", value: "143" },
  { label: "Locations Globally", value: "6,000+" },
];

const rentalFeatures = [
  "Modern, well-maintained fleet across 14 UAE locations",
  "Quick and easy online booking system",
  "High customer service standards with ISO-standard KPIs",
  "Dedicated 24/7 customer support and roadside assistance",
  "All 3 Dubai Airport terminals covered",
  "Presence at Atlantis The Palm, Emirates Towers, Dubai Hills Mall",
];

const leasingFeatures = [
  "Tailored daily, weekly, monthly, and yearly leasing options",
  "Experienced team with deep knowledge of Dubai's automotive market",
  "24/7 customer care and roadside assistance",
  "Swift replacement and recovery process",
  "3 fully equipped A-Grade workshop facilities",
  "Fleet of 5,000+ leased vehicles managed",
];

const locations = [
  { name: "Dubai HQ — Al Quoz", hours: "Sun-Thu 8AM-6PM" },
  { name: "Dubai Airport Terminal 1", hours: "24/7" },
  { name: "Dubai Airport Terminal 2", hours: "24/7" },
  { name: "Dubai Airport Terminal 3", hours: "24/7" },
  { name: "Al Maktoum International (DWC)", hours: "Daily 6AM-12AM" },
  { name: "Emirates Towers", hours: "Daily 8AM-10PM" },
  { name: "Atlantis The Palm", hours: "Daily 8AM-10PM" },
  { name: "Dubai Hills Mall", hours: "Daily 10AM-10PM" },
  { name: "Sharjah Airport", hours: "24/7" },
  { name: "Sharjah Office", hours: "Sun-Thu 8AM-6PM" },
  { name: "Jebel Ali Free Zone", hours: "Sun-Thu 8AM-6PM" },
  { name: "Ras Al Khaimah", hours: "Sun-Thu 8AM-6PM" },
  { name: "Fujairah", hours: "Sun-Thu 8AM-6PM" },
  { name: "Abu Dhabi", hours: "Sun-Thu 8AM-6PM" },
];

export default function EuropcarPage() {
  const [rentalRef, rentalVisible] = useScrollAnimation();
  const [leasingRef, leasingVisible] = useScrollAnimation();
  const [locationsRef, locationsVisible] = useScrollAnimation();
  const [leaseForm, setLeaseForm] = useState({ name: '', phone: '', email: '' });
  const [leaseSubmitted, setLeaseSubmitted] = useState(false);
  const [leaseSubmitting, setLeaseSubmitting] = useState(false);

  useEffect(() => { document.title = "Europcar Dubai — Premium Car Rental & Leasing | Eurogulf Mobility"; }, []);

  return (
    <div data-testid="europcar-page">
      {/* HERO */}
      <section data-testid="europcar-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Europcar Dubai Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={LOGO_URL} alt="Europcar" className="h-10 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Mobility That Works for You
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            At Europcar Dubai, we deliver a premium car rental and vehicle leasing experience. As a leading global mobility provider with operations in over 143 countries, we offer flexible solutions for short-term rentals and long-term leasing alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-hero-book-btn" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Book Your Rental
            </a>
            <a href={FLEET_GUIDE_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-fleet-guide-btn" className="inline-flex items-center justify-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-3.5 hover:bg-[#EE5A01] hover:text-black transition-all animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Download className="w-4 h-4" />
              FLEET GUIDE (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#111111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {highlights.map((h) => (
            <div key={h.label} className="text-center py-8 px-4">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#EE5A01]">{h.value}</div>
              <div className="font-heading text-xs tracking-[0.15em] text-[#EEEDE7] mt-2 uppercase">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHORT-TERM RENTAL */}
      <section data-testid="europcar-rental" className="bg-black py-20 sm:py-28">
        <div ref={rentalRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${rentalVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Daily / Weekly / Monthly</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Short-Term Car Rentals
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                Whether you are a tourist exploring the Emirates, a business traveller needing reliable transport, or a resident seeking convenience and flexibility — our short-term rental services deliver on every front. A young, well-maintained fleet and ISO-certified service standards ensure every journey exceeds expectations.
              </p>
              <ul className="space-y-3 mb-8">
                {rentalFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{f}</span>
                  </li>
                ))}
              </ul>
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
      <section className="bg-[#f5f2ec] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Residents & Long-Stay Visitors</span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mt-3 mb-4">Monthly Car Rental</h2>
          <p className="font-body text-[#666] max-w-2xl mx-auto mb-8 leading-relaxed">
            Looking for a monthly rental? Skip the commitment of ownership and enjoy a fully insured, well-maintained vehicle — delivered to your door. Perfect for UAE residents, expats, and long-stay visitors needing flexible transport on their own terms.
          </p>
          <a href={MONTHLY_URL} target="_blank" rel="noopener noreferrer" data-testid="europcar-monthly-book" style={{ background: EUROPCAR_GREEN }} className="text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:opacity-90 transition-opacity inline-block text-center">
            Book Your Monthly Rental
          </a>
        </div>
      </section>

      {/* VEHICLE LEASING */}
      <section data-testid="europcar-leasing" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={leasingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${leasingVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="relative overflow-hidden order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1696934288553-c41a5456da7b?w=800&h=500&fit=crop" alt="Europcar Vehicle Leasing in Dubai" className="w-full h-[420px] object-cover" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">Corporate Solutions</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mt-3 mb-4">
                Vehicle Leasing Division
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                Our leasing division is built for individuals and businesses that require consistent, cost-effective mobility. With a fleet of over 5,000 leased vehicles managed through 3 A-Grade workshops, we offer solutions that scale with your operations — from a single executive sedan to entire corporate fleets.
              </p>
              <ul className="space-y-3 mb-8">
                {leasingFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="font-body text-sm text-[#EEEDE7]">{f}</span>
                  </li>
                ))}
              </ul>
              {!leaseSubmitted ? (
                <div data-testid="leasing-lead-form" className="bg-[#111] border border-white/5 p-6 mt-6">
                  <p className="font-body text-sm text-[#EEEDE7]/80 mb-4">
                    Want to find out more about leasing from Europcar? Leave us your details and one of our consultants will get back to you shortly.
                  </p>
                  <div className="space-y-3">
                    <Input
                      data-testid="lease-name"
                      value={leaseForm.name}
                      onChange={(e) => setLeaseForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your Name"
                      className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] rounded-none h-11"
                    />
                    <Input
                      data-testid="lease-phone"
                      value={leaseForm.phone}
                      onChange={(e) => setLeaseForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="Mobile Number"
                      className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] rounded-none h-11"
                    />
                    <Input
                      data-testid="lease-email"
                      type="email"
                      value={leaseForm.email}
                      onChange={(e) => setLeaseForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="Email Address"
                      className="bg-black border-[#333] text-[#EEEDE7] placeholder:text-[#444] focus:border-[#EE5A01] rounded-none h-11"
                    />
                    <button
                      data-testid="lease-submit"
                      disabled={leaseSubmitting || !leaseForm.name || !leaseForm.phone || !leaseForm.email}
                      onClick={async () => {
                        setLeaseSubmitting(true);
                        try {
                          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
                            full_name: leaseForm.name, phone: leaseForm.phone, email: leaseForm.email,
                            company: '', enquiry_type: 'Europcar Leasing', message: 'Leasing enquiry from Europcar page'
                          });
                        } catch {}
                        setLeaseSubmitted(true);
                        setLeaseSubmitting(false);
                      }}
                      style={{ background: EUROPCAR_GREEN }}
                      className="w-full text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-3.5 hover:opacity-90 transition-opacity disabled:opacity-50 text-center"
                    >
                      {leaseSubmitting ? 'Submitting...' : 'Find Out More About Leasing Now'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#111] border border-[#EE5A01]/30 p-6 mt-6 text-center">
                  <Check className="w-8 h-8 text-[#EE5A01] mx-auto mb-3" />
                  <p className="font-heading font-bold text-sm text-[#EEEDE7]">Thank you! Our leasing consultant will contact you shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-black py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Car, title: "Car Rentals & Leasing", desc: "Daily, weekly, monthly, and yearly solutions for every traveller and business across the UAE." },
              { icon: Wrench, title: "Fleet Management", desc: "End-to-end fleet management for 500+ corporate clients with 3 A-Grade workshop facilities." },
              { icon: Globe, title: "International Car Hire", desc: "Book through Europcar's global network spanning 143 countries and 6,000+ locations worldwide." },
            ].map((s, i) => (
              <div key={i} className="bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all group">
                <s.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-3">{s.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section data-testid="europcar-locations" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={locationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${locationsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              14 Locations Across the UAE
            </h2>
            <p className="font-body text-[#666666]">Airports, malls, and business districts — wherever you need us.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locations.map((loc, i) => (
              <div key={i} data-testid={`europcar-location-${i}`} className={`bg-[#111111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all ${locationsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{loc.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="w-3 h-3 text-[#EE5A01]" />
                      <span className="font-mono text-[10px] text-[#EE5A01]">{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EUROPCAR SOCIAL MEDIA ═══ */}
      <section data-testid="europcar-social" className="bg-black py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-3">Follow Europcar Dubai</h2>
            <p className="font-body text-[#666]">Stay connected with the latest offers, fleet updates, and Dubai travel inspiration.</p>
          </div>

          {/* Social Posts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {[
              { img: FLEET_IMG, caption: "Our fleet is ready to move you across the UAE — daily, weekly, or monthly." },
              { img: "https://images.unsplash.com/photo-1634823005888-11796723fd70?w=400&h=400&fit=crop", caption: "Explore Dubai in style with our premium fleet." },
              { img: "https://images.unsplash.com/photo-1694377161535-da07da1b1632?w=400&h=400&fit=crop", caption: "Now available at all 3 Dubai Airport terminals — 24/7." },
              { img: "https://images.unsplash.com/photo-1634823929885-b12342dfc408?w=400&h=400&fit=crop", caption: "From city drives to desert getaways — we have you covered." },
              { img: "https://images.unsplash.com/photo-1696934288553-c41a5456da7b?w=400&h=400&fit=crop", caption: "Corporate leasing solutions for businesses of every size." },
              { img: "https://images.unsplash.com/photo-1582187764383-b1fe05d947fb?w=400&h=400&fit=crop", caption: "Burj Khalifa views and Europcar rides — a perfect match." },
              { img: "https://images.unsplash.com/photo-1575538439014-1b8bc5fcaa1d?w=400&h=400&fit=crop", caption: "Book your weekend adventure with Europcar Dubai." },
              { img: "https://images.unsplash.com/photo-1669485971006-d1f811a22700?w=400&h=400&fit=crop", caption: "Dubai Marina cruising — made easy with Europcar." },
            ].map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/europcardubai/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group"
              >
                <img src={post.img} alt={post.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-3">
                  <p className="font-body text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://www.instagram.com/europcardubai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] bg-[#EE5A01] text-black px-5 py-2.5 hover:bg-[#d45000] transition-all">
              INSTAGRAM
            </a>
            <a href="https://www.facebook.com/europcar/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              FACEBOOK
            </a>
            <a href="https://www.linkedin.com/company/europcar-dubai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              LINKEDIN
            </a>
            <a href="https://www.youtube.com/@EurogulfMobilityGroup-x1n" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-heading font-bold text-xs tracking-[0.1em] text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all">
              YOUTUBE
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Whether it is a weekend getaway or a year-long corporate lease, Europcar Dubai has the perfect vehicle waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors text-center">
              Book Online
            </a>
            <Link to="/contact" className="bg-transparent text-black font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
