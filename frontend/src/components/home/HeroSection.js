import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { HERO_VIDEO, HERO_POSTER, STATS } from '@/data/home';

export function HeroSection() {
  return (
    <section data-testid="hero-section" className="relative overflow-hidden bg-[#121212] text-white">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={HERO_POSTER} aria-hidden="true">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <div className="absolute -right-24 top-0 hidden lg:block h-full w-[38%] bg-[#EE5A01]/90 [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] mix-blend-multiply" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-36 min-h-[calc(100svh-64px)] lg:min-h-[calc(100vh-76px)] flex flex-col justify-center">
        <span className="chip-orange w-fit animate-fade-in">We Move You!</span>
        <h1 className="mt-5 font-heading font-black text-4xl sm:text-5xl lg:text-7xl leading-[1.02] tracking-tight text-white max-w-3xl animate-fade-in-up">
          The UAE's most trusted name in mobility.
        </h1>
        <p className="mt-6 font-body text-base sm:text-lg text-white/80 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.15s' }}>
          Since 1976, Eurogulf Mobility Group has moved families, business travellers, airlines and government fleets across all seven Emirates. Rental, leasing, chauffeur, coaches, commercial vehicles and aftercare, under one name.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link to="/services#personal" data-testid="hero-cta-personal" className="btn-primary">For You <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/services" data-testid="hero-cta-business" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#121212]">For Business</Link>
        </div>
        <a href="https://www.youtube.com/@eurogulfmobility" target="_blank" rel="noopener noreferrer" className="mt-10 hidden sm:inline-flex items-center gap-3 text-white/70 hover:text-white font-heading font-semibold text-xs w-fit transition-colors">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/40 group-hover:border-white"><Play className="w-4 h-4 fill-current" /></span>
          Watch the group film
        </a>
      </div>

    </section>
  );
}

export function StatsBand() {
  return (
    <div data-testid="stats-band" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.14)] divide-x divide-y lg:divide-y-0 divide-black/5 overflow-hidden">
        {STATS.map((s, i) => (
          <div key={s.label} data-testid={`stat-${i}`} className="px-5 py-5 lg:px-8 lg:py-7 [&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l">
            <p className="font-heading font-black text-3xl lg:text-4xl text-[#EE5A01] leading-none tracking-tight">{s.prefix ? <span className="text-lg lg:text-xl text-[#121212] font-bold mr-1 align-middle">{s.prefix}</span> : null}{s.value}</p>
            <p className="mt-2 font-body text-xs lg:text-sm text-[#666666]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
