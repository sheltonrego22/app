import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ABOUT_HERO = "https://images.pexels.com/photos/1645603/pexels-photo-1645603.jpeg?auto=compress&cs=tinysrgb&w=1920";

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
];

const coreValues = [
  { icon: Shield, title: "Safety & Security", desc: "Careful driving practices, comprehensive insurance coverage, rigorous vehicle maintenance schedules, and real-time GPS tracking across our entire fleet." },
  { icon: Users, title: "Customer Service", desc: "Professional training programs, strict conduct & behaviour standards, transparent billing, and 24/7 multi-language support for all clients." },
  { icon: Award, title: "Quality", desc: "ISO 9001:2015 certified operations, impeccable vehicle presentation, professional driver appearance, and guaranteed punctuality on every service." },
];

const divisions = [
  { name: "Europcar Dubai", desc: "International car rental — 14 UAE locations, airport access" },
  { name: "Goldcar UAE", desc: "Value-focused car rental brand for leisure travelers" },
  { name: "Eurogulf Chauffeur", desc: "ISO-certified premium chauffeur and VIP transport" },
  { name: "Royal Limousine", desc: "Luxury coaches and limousine services" },
  { name: "Emirates Taxi", desc: "Professional city taxi and transfer services" },
  { name: "Truck Line Transport", desc: "Commercial vans, trucks, and chiller units" },
  { name: "Eurogulf Used Car", desc: "Certified pre-owned vehicles from managed fleet" },
  { name: "Eurogulf Service Center", desc: "3 A-Grade workshops for full fleet maintenance" },
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

  useEffect(() => { document.title = "About EGMG — 50 Years of Mobility Excellence"; }, []);

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
            50 Years. One Vision.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EE5A01] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Trusted by over 500 companies. Loved by thousands of individuals.
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
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                data-testid={`value-card-${i}`}
                className={`bg-[#111111] border border-white/5 p-8 ${valuesVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {divisions.map((d, i) => (
              <div
                key={d.name}
                data-testid={`about-division-${i}`}
                className={`bg-[#111111] border border-white/5 p-6 hover:border-[#EE5A01] transition-all group ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(i % 4) + 1}`}
              >
                <div className="w-12 h-12 bg-[#EE5A01]/10 flex items-center justify-center mb-4 group-hover:bg-[#EE5A01]/20 transition-colors">
                  <span className="font-heading font-black text-[#EE5A01]">{d.name.charAt(0)}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{d.name}</h3>
                <p className="font-body text-xs text-[#666666] leading-relaxed mb-3">{d.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-1 text-[#EE5A01] text-xs font-heading font-bold group-hover:gap-2 transition-all">
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
              From 3,000 to 9,000 vehicles in 4 years — a testament to our commitment to growth.
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
    </div>
  );
}
