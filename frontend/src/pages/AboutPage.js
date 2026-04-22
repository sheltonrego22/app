import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ABOUT_HERO = "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-24-e1736166597319-822x1024.jpg.webp";

const milestones = [
  { year: "1976", title: "Dubai Rent A Car LLC", desc: "Car Rental, Leasing & Transportation Services — the foundation of a mobility empire in the UAE." },
  { year: "1978", title: "Europcar Franchise", desc: "UAE's first international car rental brand partnership, bringing world-class standards to the region." },
  { year: "1990", title: "Emirates Taxi & Royal Limousine", desc: "Launch of professional chauffeur services in Dubai, setting new standards for VIP transportation." },
  { year: "1994", title: "Eurogulf Garage & Used Cars", desc: "Establishment of A-Grade workshops and certified pre-owned vehicle trading operations." },
  { year: "1998", title: "Royal Limousine Luxury Coaches", desc: "Expansion into luxury coach transportation for corporate groups and events across Dubai." },
  { year: "2013", title: "Eurogulf Limo Abu Dhabi", desc: "Premium chauffeur services extended to the capital, covering the entire UAE corridor." },
  { year: "2018", title: "Eurogulf Luxury Coaches Abu Dhabi", desc: "Full-scale coach operations launched in Abu Dhabi for corporate and government clients." },
  { year: "2021", title: "Truckline — Commercial Fleet", desc: "Launch of commercial vehicle division — vans, trucks, and chiller units for logistics." },
  { year: "2024", title: "EGMG — Full Rebrand", desc: "Unified rebrand as Eurogulf Mobility Group, consolidating 50 years of excellence under one identity." },
];

const chartData = [
  { year: '2020', vehicles: 3000 },
  { year: '2021', vehicles: 4000 },
  { year: '2022', vehicles: 6000 },
  { year: '2023', vehicles: 8000 },
  { year: '2024', vehicles: 9000 },
  { year: '2025', vehicles: 12000 },
];

const coreValues = [
  { icon: Shield, title: "Fearless", desc: "We embrace bold decisions and take on challenges with courage. From launching the Europcar franchise in 1976 to expanding across all seven Emirates, fearlessness defines our journey." },
  { icon: Users, title: "Accountable", desc: "Every vehicle, every driver, every service touchpoint — we take ownership. ISO 9001:2015 certified operations and performance-graded teams ensure accountability at every level." },
  { icon: Award, title: "Innovative", desc: "From introducing electric vehicles to implementing GPS-tracked operations and two-way client reservation systems, we constantly evolve how the UAE moves." },
  { icon: Shield, title: "Respectful", desc: "We foster a culture of inclusion, dignity, and professionalism across 1,200+ employees and 14 locations. Every client and every colleague is treated with the respect they deserve." },
];

const EGMG_LOGO = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/yxpq5nol_Logo1.png";
const EUROPCAR_LOGO = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/xfzdgz6a_Logo2.png";

const DIVISION_LOGOS = {
  europcar: EUROPCAR_LOGO,
  goldcar: EGMG_LOGO,
  royallimo: EGMG_LOGO,
  emiratestaxi: EGMG_LOGO,
  truckline: EGMG_LOGO,
  usedcars: EGMG_LOGO,
};

const AWARD_IMAGES = [
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.18%E2%80%AFPM-1-1.png.webp", title: "ISO 9001:2015", desc: "Customer Focus, Leadership, Engagement, Process Approach, Improvement, Relationship Management." },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.28%E2%80%AFPM-e1723911915966-1.png.webp", title: "Business Travel Awards", desc: "Best Car Rental Company in the Middle East 2009." },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.55%E2%80%AFPM-1.png.webp", title: "Emirates Group Award", desc: "2008 Recognition of Support, 2011 Flight Crew Transportation Support." },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.05.04%E2%80%AFPM-1.png.webp", title: "World Travel Awards", desc: "Best Car Rental Company MENA — 2005-2019, 2022, 2023 & 2024." },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.45.02%E2%80%AFPM-1.png.webp", title: "MENA Travel Awards", desc: "Silver (2004-05), Gold (2006, 2008), Platinum (2012)." },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.46.28%E2%80%AFPM.png.webp", title: "ISO 45001:2018", desc: "Occupational Health and Safety Management System." },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.47.54%E2%80%AFPM-1.png.webp", title: "McDermott Award", desc: "Safest Transportation Service Provider 2010/2011." },
];

const divisions = [
  { name: "Europcar Dubai", desc: "International car rental — 14 UAE locations, airport access", href: "/europcar", logo: DIVISION_LOGOS.europcar },
  { name: "Goldcar UAE", desc: "Value-focused car rental brand for leisure travelers", href: "/goldcar", logo: DIVISION_LOGOS.goldcar },
  { name: "Royal Limousine", desc: "Premium chauffeur & VIP limousine services", href: "/royal-limousine", logo: DIVISION_LOGOS.royallimo },
  { name: "Emirates Taxi", desc: "ISO-certified professional taxi and transfers", href: "/emirates-taxi", logo: DIVISION_LOGOS.emiratestaxi },
  { name: "Truckline", desc: "Commercial vans, trucks, and chiller units", href: "/truckline", logo: DIVISION_LOGOS.truckline },
  { name: "Eurogulf Used Car", desc: "Certified pre-owned vehicles from managed fleet", href: "/used-cars", logo: DIVISION_LOGOS.usedcars },
];

function TimelineItem({ milestone, index, isActive, onClick }) {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`relative flex items-start gap-6 mb-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      data-testid={`timeline-item-${index}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <button onClick={onClick} className="text-left lg:text-inherit w-full">
          <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase">{milestone.year}</span>
          <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mt-1 mb-2">{milestone.title}</h3>
          <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="font-body text-sm text-[#666666] leading-relaxed">{milestone.desc}</p>
          </div>
          {!isActive && (
            <ChevronDown className="w-4 h-4 text-[#EE5A01] mt-1 inline-block" />
          )}
        </button>
      </div>
      {/* Node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`timeline-node ${isActive ? 'active' : ''}`} onClick={onClick} />
      </div>
      {/* Spacer for opposite side */}
      <div className="flex-1 hidden lg:block" />
    </div>
  );
}

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [timelineRef, timelineVisible] = useScrollAnimation();
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [chartRef, chartVisible] = useScrollAnimation();
  const [divisionsRef, divisionsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "About EGMG — Your Vision, Our Journey Since 1976"; }, []);

  return (
    <div data-testid="about-page">
      {/* ═══ HERO ═══ */}
      <section data-testid="about-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_HERO} alt="Dubai Skyline" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-black/70" />
          {/* Diagonal orange line */}
          <div className="absolute bottom-0 left-0 w-[120%] h-[3px] bg-[#EE5A01] origin-bottom-left -rotate-3" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-8xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Your Vision, Our Journey
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EE5A01] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Moving the UAE forward since 1976
          </p>
        </div>
      </section>

      {/* ═══ LEGACY TIMELINE ═══ */}
      <section data-testid="timeline-section" className="bg-black py-20 sm:py-28">
        <div ref={timelineRef} className="max-w-4xl mx-auto px-4">
          <div className={`text-center mb-16 ${timelineVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              Our Legacy
            </h2>
          </div>
          {/* Vertical line */}
          <div className="relative">
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-[2px] bg-[#EE5A01]/20 hidden lg:block" />
            <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#EE5A01]/20 lg:hidden" />
            {milestones.map((m, i) => (
              <TimelineItem
                key={m.year}
                milestone={m}
                index={i}
                isActive={activeTimeline === i}
                onClick={() => setActiveTimeline(activeTimeline === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISION & MISSION ═══ */}
      <section data-testid="vision-mission-section" className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh]">
        <div className="bg-[#EE5A01] p-12 sm:p-16 lg:p-20 flex flex-col justify-center">
          <span className="font-mono text-xs tracking-[0.2em] text-black/60 uppercase mb-4">Vision</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-snug">
            To be recognized as the leader in quality and competitiveness in our industry, inspiring trust and excellence.
          </h2>
        </div>
        <div className="bg-black p-12 sm:p-16 lg:p-20 flex flex-col justify-center">
          <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase mb-4">Mission</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#EE5A01] leading-snug">
            To deliver unparalleled quality in our services by embracing innovation, fostering talent, optimizing our operations, and ensuring customer satisfaction through sustainable initiatives.
          </h2>
        </div>
      </section>

      {/* ═══ CORE VALUES ═══ */}
      <section data-testid="values-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={valuesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${valuesVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              Our Values — F.A.I.R.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                data-testid={`value-card-${i}`}
                className={`bg-[#111111] border border-white/5 p-8 ${valuesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
                <v.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-3">{v.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIVISIONS ═══ */}
      <section data-testid="about-divisions" className="bg-black py-20 sm:py-28">
        <div ref={divisionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              Our Divisions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((d, i) => (
              <div
                key={d.name}
                data-testid={`about-division-${i}`}
                className={`bg-[#111111] border border-white/5 p-6 hover:border-[#EE5A01] transition-all group ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
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

      {/* ═══ LEADERSHIP / CULTURE ═══ */}
      <section data-testid="leadership-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="orange-accent-line mb-6" />
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-6">
                A Family Business. A Regional Force.
              </h2>
              <p className="font-body text-[#666666] leading-relaxed mb-6">
                For nearly 50 years, EGMG has been a family-owned business that expanded from one rental counter to the region's most comprehensive mobility group. We foster innovation, equality, and excellence at every level.
              </p>
              <p className="font-body text-[#666666] leading-relaxed mb-8">
                With over 1,200 professionals across 14 locations, we continue to invest in our people, technology, and sustainable practices to shape the future of mobility in the UAE.
              </p>
              <Link to="/contact" className="btn-primary inline-block">
                Get In Touch
              </Link>
            </div>
            <div className="relative bg-[#111111] border border-white/5 aspect-video flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1687754715959-41fed2161528?w=800&h=450&fit=crop"
                alt="EGMG Operations"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#EE5A01] flex items-center justify-center cursor-pointer hover:bg-[#d45000] transition-colors">
                  <Play className="w-6 h-6 text-black ml-1" fill="black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FLEET GROWTH CHART ═══ */}
      <section data-testid="fleet-growth-section" className="bg-black py-20 sm:py-28">
        <div ref={chartRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${chartVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Fleet Growth
            </h2>
            <p className="font-body text-[#666666]">
              From 3,000 to 12,000 vehicles in 5 years — a testament to our commitment to growth.
            </p>
          </div>
          {chartVisible && (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#666', fontFamily: 'JetBrains Mono', fontSize: 12 }}
                    tickFormatter={(v) => `${v / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{ background: '#111', border: '1px solid #333', fontFamily: 'Manrope' }}
                    labelStyle={{ color: '#EEEDE7' }}
                    itemStyle={{ color: '#EE5A01' }}
                    formatter={(v) => [`${v.toLocaleString()} vehicles`, 'Fleet Size']}
                  />
                  <Bar dataKey="vehicles" radius={[0, 0, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={i === chartData.length - 1 ? '#EE5A01' : '#F17B34'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>

      {/* ═══ AWARDS & RECOGNITION ═══ */}
      <section data-testid="awards-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Awards & Recognition
            </h2>
            <p className="font-body text-[#666666] max-w-lg mx-auto">Nearly two decades of industry accolades and internationally certified operations.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {AWARD_IMAGES.map((a, i) => (
              <div key={i} data-testid={`award-card-${i}`} className="bg-[#111111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all text-center group">
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
