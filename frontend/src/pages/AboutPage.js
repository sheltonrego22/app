import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight, ChevronDown, Lightbulb, Heart } from 'lucide-react';
import { useScrollAnimation, useCounter } from '@/hooks/useScrollAnimation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ABOUT_HERO = "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/file-24-e1736166597319-822x1024.jpg.webp";

const milestones = [
  { year: "1976", title: "Dubai Rent A Car LLC Founded", desc: "The foundation of EGMG — established with the acquisition of the exclusive Europcar franchise for Dubai and the Northern Emirates, bringing European rental standards to a rapidly developing UAE." },
  { year: "1978", title: "Europcar UAE Launched", desc: "EGMG becomes the official Europcar operator, introducing international-standard car rental services to Dubai and the region for the first time." },
  { year: "1990", title: "Emirates Taxi & Royal Limousine", desc: "EGMG expands into professional chauffeur services, launching Emirates Taxi and Royal Limousine — establishing what would become the group's managed transportation division." },
  { year: "1994", title: "Eurogulf Garage & Used Cars", desc: "The group builds its automotive aftercare capabilities with the launch of Eurogulf Garage and Eurogulf Used Cars Trading, creating a closed-loop ecosystem for fleet management." },
  { year: "1998", title: "Royal Limousine Luxury Coaches", desc: "The expansion of passenger transportation into premium coaches, enabling EGMG to serve airlines, cruise operators, DMCs, and event organisers at scale." },
  { year: "2013", title: "Eurogulf Limo — Abu Dhabi", desc: "EGMG extends its chauffeur operations to Abu Dhabi, becoming one of the very few transport operators licensed to provide professional chauffeur services across all seven Emirates of the UAE." },
  { year: "2018", title: "Eurogulf Luxury Coaches — Abu Dhabi", desc: "Coach and bus operations expanded into the capital, reinforcing EGMG's unmatched all-Emirates transportation footprint." },
  { year: "2021", title: "Truckline Transport Launched", desc: "EGMG enters the commercial vehicle leasing and logistics segment with the launch of Truckline Transport, offering vans, trucks, and chiller units to UAE businesses." },
  { year: "2024", title: "Eurogulf Mobility Group", desc: "The formal consolidation of all group entities under the Eurogulf Mobility Group (EGMG) brand — reflecting the scope, scale, and ambition of the organisation." },
];

const chartData = [
  { year: '2020', vehicles: 3000 },
  { year: '2021', vehicles: 4000 },
  { year: '2022', vehicles: 6000 },
  { year: '2023', vehicles: 8000 },
  { year: '2024', vehicles: 9000 },
  { year: '2025', vehicles: 10000 },
];

const coreValues = [
  { icon: Shield, title: "Fearless", desc: "We pursue growth, innovation, and bold decisions without hesitation. In an industry defined by logistics and precision, we embrace ambition and are unafraid to lead." },
  { icon: Users, title: "Accountable", desc: "We take full ownership of every commitment we make — to our customers, our partners, and our people. Our word is our contract." },
  { icon: Lightbulb, title: "Innovative", desc: "We continuously invest in technology, processes, and service design to stay ahead of the evolving needs of the market." },
  { icon: Heart, title: "Respectful", desc: "We treat every individual — customer, employee, partner, or community member — with dignity, fairness, and the highest professional standards." },
];

const EGMG_LOGO = "/egmg-logo-transparent.png";
const EUROPCAR_LOGO = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/xfzdgz6a_Logo2.png";

const divisions = [
  { name: "Europcar Dubai", desc: "Premium car rental and leasing, powered by Europe's #1 rental brand", href: "/europcar", logo: EUROPCAR_LOGO },
  { name: "Goldcar Dubai", desc: "Smart, affordable car hire — best price, no compromise", href: "/goldcar", logo: EGMG_LOGO },
  { name: "Eurogulf Chauffeur", desc: "Professional managed transportation across all 7 Emirates", href: "/chauffeur-service", logo: EGMG_LOGO },
  { name: "Truckline Transport", desc: "Commercial vehicle leasing built for UAE businesses", href: "/truckline", logo: EGMG_LOGO },
  { name: "Eurogulf Used Cars", desc: "Certified pre-owned vehicles, backed by 50 years of fleet expertise", href: "/used-cars", logo: EGMG_LOGO },
  { name: "Eurogulf Autocare", desc: "A-grade service and maintenance for every vehicle in your fleet", href: "/autocare", logo: EGMG_LOGO },
];

const AWARD_IMAGES = [
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.18%E2%80%AFPM-1-1.png.webp", title: "ISO 9001:2015", desc: "Quality Management Systems" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.28%E2%80%AFPM-e1723911915966-1.png.webp", title: "Business Travel Awards", desc: "Best Car Rental Company in the Middle East" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.04.55%E2%80%AFPM-1.png.webp", title: "Emirates Group Award", desc: "Flight Crew Transportation Support Recognition" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-13-at-6.05.04%E2%80%AFPM-1.png.webp", title: "Car Rental Global Award", desc: "Best Performance 2023 — Middle East & Africa Region" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.45.02%E2%80%AFPM-1.png.webp", title: "MENA Travel Awards", desc: "Silver, Gold & Platinum (2004–2012)" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.46.28%E2%80%AFPM.png.webp", title: "ISO 10002:2014", desc: "Customer Satisfaction Management" },
  { img: "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-09-09-at-2.47.54%E2%80%AFPM-1.png.webp", title: "McDermott Award", desc: "Safest Transportation Service Provider" },
];

function TimelineItem({ milestone, index, isActive, onClick }) {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`relative flex items-start gap-6 mb-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      data-testid={`timeline-item-${index}`}
    >
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
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [chartRef, chartVisible] = useScrollAnimation();
  const [divisionsRef, divisionsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "About Eurogulf Mobility Group | 50 Years of UAE Mobility | Est. 1976"; }, []);

  return (
    <div data-testid="about-page">
      {/* ═══ HERO ═══ */}
      <section data-testid="about-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_HERO} alt="Dubai Skyline" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 w-[120%] h-[3px] bg-[#EE5A01] origin-bottom-left -rotate-3" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Five Decades at the Heart of the UAE's Mobility Story.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EE5A01] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover the story behind the UAE's most diversified mobility group
          </p>
        </div>
      </section>

      {/* ═══ OPENING COPY ═══ */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-8" />
          <div className="space-y-5 font-body text-[#999] leading-relaxed text-base sm:text-lg">
            <p>
              In 1976, a vision took shape in Dubai: to bring world-class vehicle rental services to a city and a nation on the cusp of transformation. Dubai Rent A Car LLC was founded that year, securing the exclusive Europcar franchise for Dubai and the Northern Emirates — a decision that would prove foundational to the company's next five decades of growth.
            </p>
            <p>
              What followed was not simply the expansion of a car rental business. It was the deliberate and disciplined construction of a mobility group — a portfolio of complementary transportation brands, each developed in response to a clear market need, each built to the standards that the UAE's most discerning customers and most demanding institutions have come to expect.
            </p>
            <p>
              Today, Eurogulf Mobility Group stands as one of the UAE's most established, most trusted, and most awarded transportation organisations. With over 10,000 vehicles under management, 1,200 employees, and operations spanning all seven Emirates, EGMG is not merely a participant in the UAE's mobility sector — it has helped shape it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ LEGACY TIMELINE ═══ */}
      <section data-testid="timeline-section" className="bg-black py-20 sm:py-28">
        <div ref={timelineRef} className="max-w-4xl mx-auto px-4">
          <div className={`text-center mb-16 ${timelineVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              A Journey Built Over 50 Years
            </h2>
          </div>
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
            To be recognised as the leader in quality and competitiveness in our industry, inspiring trust and excellence.
          </h2>
        </div>
        <div className="bg-black p-12 sm:p-16 lg:p-20 flex flex-col justify-center">
          <span className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase mb-4">Mission</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#EE5A01] leading-snug">
            To deliver unparalleled quality in our services by embracing innovation, fostering talent, optimising our operations, and ensuring customer satisfaction through sustainable initiatives.
          </h2>
        </div>
      </section>

      {/* ═══ CORE VALUES — F.A.I.R. ═══ */}
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

      {/* ═══ OUR BRANDS ═══ */}
      <section data-testid="about-divisions" className="bg-black py-20 sm:py-28">
        <div ref={divisionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${divisionsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight">
              Our Brands
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

      {/* ═══ FLEET GROWTH CHART ═══ */}
      <section data-testid="fleet-growth-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={chartRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${chartVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">Fleet Growth</h2>
            <p className="font-body text-[#666666]">From 3,000 to 10,000+ vehicles — a testament to our commitment to growth.</p>
          </div>
          {chartVisible && (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#666', fontFamily: 'JetBrains Mono', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontFamily: 'JetBrains Mono', fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', fontFamily: 'Manrope' }} labelStyle={{ color: '#EEEDE7' }} itemStyle={{ color: '#EE5A01' }} formatter={(v) => [`${v.toLocaleString()} vehicles`, 'Fleet Size']} />
                  <Bar dataKey="vehicles" radius={[0, 0, 0, 0]}>
                    {chartData.map((entry) => (
                      <Cell key={entry.year} fill={entry.year === '2025' ? '#EE5A01' : '#F17B34'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>

      {/* ═══ AWARDS & RECOGNITION ═══ */}
      <section data-testid="awards-section" className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Validated by the Industry. Trusted by Our Clients.
            </h2>
            <p className="font-body text-[#666666] max-w-2xl mx-auto">Eurogulf Mobility Group's commitment to operational excellence is not a claim — it is a record. Over five decades of service, the group has earned recognition from the world's most respected automotive and business organisations.</p>
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
