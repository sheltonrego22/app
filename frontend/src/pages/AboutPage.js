import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight, ChevronDown, Lightbulb, Heart, MapPin, Globe } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';

const ABOUT_HERO = "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-24-e1736166597319-822x1024.jpg.webp";
const EGMG_LOGO = "/egmg-logo-transparent.png";
const EUROPCAR_LOGO = "/europcar-logo.png";

const milestones = [
  { year: "1976", title: "Dubai Rent A Car LLC Founded", desc: "The foundation of Eurogulf Mobility Group, established with the acquisition of the exclusive Europcar franchise for Dubai and the Northern Emirates, bringing European rental standards to a rapidly developing UAE." },
  { year: "1978", title: "Europcar UAE Launched", desc: "Eurogulf Mobility Group becomes the official Europcar operator, introducing international-standard car rental services to Dubai and the region for the first time." },
  { year: "1990", title: "Emirates Taxi & Royal Limousine", desc: "Eurogulf Mobility Group expands into professional chauffeur services, launching Emirates Taxi and Royal Limousine, establishing what would become the group's managed transportation division." },
  { year: "1994", title: "Eurogulf Garage & Used Cars", desc: "The group builds its automotive aftercare capabilities with the launch of Eurogulf Garage and Eurogulf Used Cars Trading, creating a closed-loop ecosystem for fleet management." },
  { year: "1998", title: "Royal Limousine Luxury Coaches", desc: "The expansion of passenger transportation into premium coaches, enabling the group to serve airlines, cruise operators, DMCs, and event organisers at scale." },
  { year: "2013", title: "Eurogulf Limo: Abu Dhabi", desc: "Eurogulf Mobility Group extends its chauffeur operations to Abu Dhabi, becoming one of the very few transport operators licensed to provide professional chauffeur services across all seven Emirates of the UAE." },
  { year: "2018", title: "Eurogulf Luxury Coaches: Abu Dhabi", desc: "Coach and bus operations expanded into the capital, reinforcing the group's unmatched all-Emirates transportation footprint." },
  { year: "2021", title: "Truckline Transport Launched", desc: "Eurogulf Mobility Group enters the commercial vehicle leasing and logistics segment with the launch of Truckline Transport, offering vans, trucks, and chiller units to UAE businesses." },
  { year: "2024", title: "Eurogulf Mobility Group", desc: "The formal consolidation of all group entities under the Eurogulf Mobility Group brand, reflecting the scope, scale, and ambition of the organisation." },
];

const GOLDCAR_LOGO = "/goldcar-logo.png";

const divisions = [
  { name: "Europcar", desc: "Premium self-drive rental, monthly mobility, and long-term leasing support across Dubai and the Northern Emirates", href: "/europcar", logo: EUROPCAR_LOGO },
  { name: "Goldcar", desc: "Budget short-term rentals for customers seeking accessible and practical options", href: "/goldcar", logo: GOLDCAR_LOGO },
  { name: "Truckline Transport", desc: "Commercial vehicle leasing and fleet management solutions for operational needs", href: "/truckline", logo: EGMG_LOGO },
  { name: "Eurogulf Premium Chauffeur", desc: "Managed transport and driven services for airport transfer, VIP, staff, and events", href: "/chauffeur-service", logo: EGMG_LOGO },
  { name: "Eurogulf Auto Garage", desc: "Vehicle service, repair, maintenance, and workshop support within the wider ecosystem", href: "/autocare", logo: EGMG_LOGO },
  { name: "Eurogulf Used Cars", desc: "Approved used vehicle sales backed by the wider group platform", href: "/used-cars", logo: EGMG_LOGO },
];

const AWARD_IMAGES = [
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.18%E2%80%AFPM-1-1.png.webp", title: "ISO 9001:2015", desc: "Quality Management Systems" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.28%E2%80%AFPM-e1723911915966-1.png.webp", title: "Business Travel Awards", desc: "Best Car Rental Company in the Middle East" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.55%E2%80%AFPM-1.png.webp", title: "Emirates Group Award", desc: "Flight Crew Transportation Support Recognition" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.05.04%E2%80%AFPM-1.png.webp", title: "Car Rental Global Award", desc: "Best Performance 2023, Middle East & Africa Region" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.45.02%E2%80%AFPM-1.png.webp", title: "MENA Travel Awards", desc: "Silver, Gold & Platinum (2004 to 2012)" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.46.28%E2%80%AFPM.png.webp", title: "ISO 10002:2014", desc: "Customer Satisfaction Management" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.47.54%E2%80%AFPM-1.png.webp", title: "McDermott Award", desc: "Safest Transportation Service Provider" },
];

function TimelineItem({ milestone, index, isActive, onClick }) {
  const isEven = index % 2 === 0;
  return (
    <div className={`relative flex items-start gap-6 mb-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} data-testid={`timeline-item-${index}`}>
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <button onClick={onClick} className="text-left lg:text-inherit w-full">
          <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">{milestone.year}</span>
          <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mt-1 mb-2">{milestone.title}</h3>
          <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="font-body text-sm text-[#666666] leading-relaxed">{milestone.desc}</p>
          </div>
          {!isActive && <ChevronDown className="w-4 h-4 text-[#EE5A01] mt-1 inline-block" />}
        </button>
      </div>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`timeline-node ${isActive ? 'active' : ''}`} onClick={onClick} />
      </div>
      <div className="flex-1 hidden lg:block" />
    </div>
  );
}

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [timelineRef, timelineVisible] = useScrollAnimation();
  const [divisionsRef, divisionsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "About Eurogulf Mobility Group | Integrated Mobility Ecosystem UAE"; }, []);

  return (
    <div data-testid="about-page">
      {/* HERO */}
      <section data-testid="about-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_HERO} alt="Dubai Skyline" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 w-[120%] h-[3px] bg-[#EE5A01] origin-bottom-left -rotate-3" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            A Legacy of Movement
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Eurogulf Mobility Group brings together multiple transport and mobility capabilities under one operating platform, helping individuals and businesses access practical, reliable, and professionally managed solutions across the UAE.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">Who We Are</h2>
          <div className="space-y-5 font-body text-[#999] leading-relaxed text-base">
            <p>
              Eurogulf Mobility Group is a diversified mobility and transportation platform serving customers across multiple vehicle and service categories. The group combines self-drive rental, leasing, chauffeur-driven transport, commercial vehicle support, workshop capability, and used vehicle sales into one connected ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* UAE PRESENCE */}
      <section className="bg-black py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#EE5A01]" />
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight">UAE Presence</h2>
              </div>
              <p className="font-body text-[#999] leading-relaxed">
                Headquartered in Al Quoz, Dubai, the group is supported by a broader network of operating locations across the UAE through the businesses within its portfolio. This structure helps maintain stronger service access, more responsive support, and better operational continuity across different customer needs.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-[#EE5A01]" />
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight">How the Portfolio Works</h2>
              </div>
              <p className="font-body text-[#999] leading-relaxed text-sm">
                Each brand in the portfolio is designed to serve a specific mobility use case, while benefiting from the strength of the wider group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EUROPCAR NOTE */}
      <section className="bg-[#0a0a0a] py-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-sm text-[#999] leading-relaxed">
            Europcar is a central part of that ecosystem in Dubai and the Northern Emirates, with service coverage across Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain, while Abu Dhabi city operations remain under a separate franchise structure.
          </p>
        </div>
      </section>

      {/* LEGACY TIMELINE */}
      <section data-testid="timeline-section" className="bg-black py-20 sm:py-28">
        <div ref={timelineRef} className="max-w-4xl mx-auto px-4">
          <div className={`text-center mb-16 ${timelineVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-[2px] bg-[#EE5A01]/20 hidden lg:block" />
            <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#EE5A01]/20 lg:hidden" />
            {milestones.map((m, i) => (
              <TimelineItem key={m.year} milestone={m} index={i} isActive={activeTimeline === i} onClick={() => setActiveTimeline(activeTimeline === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR BRANDS */}
      <section data-testid="about-divisions" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={divisionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">Our Brands</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((d, i) => (
              <div key={d.name} data-testid={`about-division-${i}`} className={`bg-[#111111] border border-white/5 p-6 hover:border-[#EE5A01] transition-all group ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}>
                <div className="w-full h-10 flex items-center mb-4">
                  <img src={d.logo} alt={d.name} className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" loading="lazy" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{d.name}</h3>
                <p className="font-body text-xs text-[#666666] leading-relaxed mb-3">{d.desc}</p>
                <Link to={d.href} className="inline-flex items-center gap-1 text-[#EE5A01] text-xs font-heading font-bold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section data-testid="awards-section" className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">Awards & Recognition</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {AWARD_IMAGES.map((a) => (
              <div key={a.title} className="bg-[#111111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all text-center group">
                <div className="w-full h-20 flex items-center justify-center mb-4">
                  <img src={a.img} alt={a.title} className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <h3 className="font-heading font-bold text-xs text-[#EEEDE7] mb-1 uppercase tracking-wider">{a.title}</h3>
                <p className="font-body text-[10px] text-[#666666] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
