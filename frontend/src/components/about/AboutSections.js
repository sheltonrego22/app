import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, MapPin, Globe, Eye, Target, Flag } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ABOUT_HERO, values, milestones, divisions, AWARD_IMAGES } from '@/data/about';

const h2 = "font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight";
const h2Lg = "font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] uppercase tracking-tight";

export function AboutHero() {
  return (
    <section data-testid="about-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={ABOUT_HERO} alt="Dubai Skyline" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute bottom-0 left-0 w-[120%] h-[3px] bg-[#EE5A01] origin-bottom-left -rotate-3" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
        <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">A Legacy of Movement</h1>
        <p className="font-body text-base sm:text-lg text-[#EEEDE7]/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Eurogulf Mobility Group brings together multiple transport and mobility capabilities under one operating platform, helping individuals and businesses access practical, reliable, and professionally managed solutions across the UAE.
        </p>
      </div>
    </section>
  );
}

export function WhoWeAre() {
  return (
    <>
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6" />
          <h2 className={`${h2} mb-6`}>Who We Are</h2>
          <p className="font-body text-[#999] leading-relaxed text-base">
            Eurogulf Mobility Group is a diversified mobility and transportation platform serving customers across multiple vehicle and service categories. The group combines self-drive rental, leasing, chauffeur-driven transport, commercial vehicle support, workshop capability, and used vehicle sales into one connected ecosystem.
          </p>
        </div>
      </section>
      <section className="bg-black py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
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
            <p className="font-body text-[#999] leading-relaxed text-sm">Each brand in the portfolio is designed to serve a specific mobility use case, while benefiting from the strength of the wider group.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#0a0a0a] py-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-sm text-[#999] leading-relaxed">
            Europcar is a central part of that ecosystem in Dubai and the Northern Emirates, with service coverage across Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain, while Abu Dhabi city operations remain under a separate franchise structure.
          </p>
        </div>
      </section>
    </>
  );
}

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

export function Timeline() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollAnimation();
  return (
    <section data-testid="timeline-section" className="bg-black py-20 sm:py-28">
      <div ref={ref} className="max-w-4xl mx-auto px-4">
        <div className={`text-center mb-16 ${visible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className={h2Lg}>Our Journey</h2>
        </div>
        <div className="relative">
          <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-[2px] bg-[#EE5A01]/20 hidden lg:block" />
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#EE5A01]/20 lg:hidden" />
          {milestones.map((m, i) => (
            <TimelineItem key={m.year} milestone={m} index={i} isActive={active === i} onClick={() => setActive(active === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisionValues() {
  return (
    <section data-testid="about-vision" className="bg-black py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#111111] border border-white/5 p-8">
            <Eye className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
            <h2 className="font-heading font-black text-2xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Vision</h2>
            <p className="font-body text-[#999] leading-relaxed">To be the UAE's most trusted integrated mobility partner, connecting rental, leasing, chauffeur, commercial and aftercare services into one seamless experience.</p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-8">
            <Target className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
            <h2 className="font-heading font-black text-2xl text-[#EEEDE7] uppercase tracking-tight mb-3">Our Mission</h2>
            <p className="font-body text-[#999] leading-relaxed">To move people and businesses safely, reliably and sustainably, supporting the UAE's public transport network with first-mile and last-mile mobility and building partnerships that make cities work better.</p>
          </div>
        </div>
        <div className="text-center mb-10">
          <Flag className="w-6 h-6 text-[#EE5A01] mx-auto mb-3" />
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight">Our F.A.I.R. Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.letter} data-testid={`about-value-${v.letter}`} className="bg-[#0a0a0a] border border-white/5 p-6 hover:border-[#EE5A01]/30 transition-all">
              <span className="font-heading font-black text-4xl text-[#EE5A01]">{v.letter}</span>
              <h3 className="font-heading font-bold text-base text-[#EEEDE7] mt-2 mb-2">{v.title}</h3>
              <p className="font-body text-sm text-[#666666] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandsGrid() {
  const [ref, visible] = useScrollAnimation();
  const reveal = visible ? 'scroll-visible' : 'scroll-hidden';
  return (
    <section data-testid="about-divisions" className="bg-[#0a0a0a] py-20 sm:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 ${reveal}`}>
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className={h2Lg}>Our Brands</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {divisions.map((d, i) => (
            <div key={d.name} data-testid={`about-division-${i}`} className={`bg-[#111111] border border-white/5 p-6 hover:border-[#EE5A01] transition-all group ${reveal} stagger-${(i % 4) + 1}`}>
              <div className="w-full h-10 flex items-center mb-4">
                <img src={d.logo} alt={d.name} className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" loading="lazy" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{d.name}</h3>
              <p className="font-body text-xs text-[#666666] leading-relaxed mb-3">{d.desc}</p>
              <Link to={d.href} className="inline-flex items-center gap-1 text-[#EE5A01] text-xs font-heading font-bold group-hover:gap-2 transition-all">Learn More <ArrowRight className="w-3 h-3" /></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsGrid() {
  return (
    <section data-testid="awards-section" className="bg-black py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="orange-accent-line mx-auto mb-6" />
          <h2 className={`${h2Lg} mb-4`}>Awards & Recognition</h2>
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
  );
}
